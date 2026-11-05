import { generateComfy, checkComfy, workflowFor } from './comfy.mjs';
import { pipelineIdentity } from './public/providers.js';
import {loadTags,withTags,updateTags} from './resource-tags.mjs';
import {expressionSource,expressionJobs,expressionSettings,expressionPrompt,publishExpression} from './expressions.mjs';
import {EXPRESSIONS} from './public/expressions.js';
import {conversionSource,conversionSettings,conversionPrompt,artworkSettings} from './resource-conversion.mjs';
import {localRelight,prepareRelight,finishRelight} from './relight.mjs';
import http from 'node:http';
import { loadSettings, publicSettings, saveSettings, resolveProvider, jobKey, pruneCredentials, comfyWorkflows, comfyToken } from './settings.mjs';
import { batchRequests } from './public/batch.js';
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir, rename, readdir, stat, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID, randomBytes } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { ROOT, DATA, CATALOG, KINDS, assetPath, findAsset, saveUpload, listResources, listUploads, saveResource, imageType, MAX_IMAGE_BYTES } from './catalog.mjs';
import { validateRequest, validateProvider, buildPrompt, relightPrompt, withPartReferences, generateQuota, generateAPI, quotaStatus } from './generation.mjs';
import { validateExtraction, extractionKey, extractionTask, extractionParts, POSE_STYLE_ID } from './extraction.mjs';
import { subjectsFor } from './public/extraction-settings.js';
import { settingsKey, savedMatches, referenceSlots, poseCount, roleMismatch, isSceneJob, usesSceneLighting, SCENE_LIGHT_REVISION, faceRole } from './public/job-settings.js';
import { subjectTypeFor, subjectFor, resourceMatchesSubject } from './public/subject-types.js';
import { effectFor } from './public/effects.js';

const jobs = new Map();
let active = null;
let queue = [], batches = {};
const transientKeys = new Map();
let mutation = Promise.resolve();
function mutate(fn) { const result = mutation.then(fn); mutation = result.catch(() => {}); return result; }
const queueFile = join(DATA, 'queue.json');
async function saveQueue(ids = queue, records = batches) {
  await mkdir(DATA, {recursive:true});
  await writeFile(`${queueFile}.tmp`, JSON.stringify({ids, batches:records}), {mode:0o600});
  await rename(`${queueFile}.tmp`, queueFile);
}
const csrf = randomBytes(32).toString('hex');
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const jobFile = id => join(DATA, 'jobs', id, 'job.json');
async function saveJob(job) {
  await mkdir(join(DATA, 'jobs', job.id), { recursive: true });
  await writeFile(`${jobFile(job.id)}.tmp`, JSON.stringify(job, null, 2), { mode: 0o600 });
  await rename(`${jobFile(job.id)}.tmp`, jobFile(job.id));
}
async function loadJobs() {
  jobs.clear(); transientKeys.clear(); active = null;
  const ledger = await readFile(queueFile, 'utf8').then(JSON.parse).catch(error => { if (error.code === 'ENOENT') return {ids:[],batches:{}}; throw error; });
  batches = ledger.batches || {};
  for (const id of await readdir(join(DATA, 'jobs')).catch(() => [])) {
    if (!uuid.test(id)) continue;
    try {
      const job = JSON.parse(await readFile(jobFile(id), 'utf8'));
      if (job.status === 'running' || (job.status === 'queued' && (!ledger.ids.includes(id) || ((job.provider === 'api' || (job.provider==='comfyui'&&job.comfy.requiresToken)) && !jobKey(job)) || (job.provider==='comfyui'&&!Object.keys(comfyWorkflows(job)).length)))) {
        job.status = 'interrupted'; job.message = '服务曾停止，已开始或凭据不可恢复的任务未自动重试。'; await saveJob(job);
      }
      jobs.set(id, job);
    } catch { /* Leave incomplete files for recovery instead of deleting them. */ }
  }
  queue = ledger.ids.filter(id => jobs.get(id)?.status === 'queued');
  await saveQueue();
  await pruneCredentials([...jobs.values()]);
}
function pump() {
  void mutate(async () => {
    if (active || !queue.length) return;
    queue = queue.filter(id=>jobs.get(id)?.status==='queued');
    if (!queue.length) {await saveQueue();return;}
    const job = jobs.get(queue[0]), controller = new AbortController();
    active = {id:job.id, controller};
    try {
      job.status = 'running'; job.startedAt = new Date().toISOString(); job.message = '正在准备生成…';
      await saveJob(job);
      queue = queue.slice(1); await saveQueue();
      void runJob(job, jobKey(job) || transientKeys.get(job.id), controller).catch(error => {
        console.error('任务保存失败：', error.code || 'WRITE_FAILED');
      }).finally(() => {
        void mutate(async () => { active = null; transientKeys.delete(job.id); await pruneCredentials([...jobs.values()]); }).finally(pump).catch(() => {});
      });
    } catch (error) { active = null; job.status='interrupted';job.message='队列状态保存失败，未调用模型；请检查磁盘后重新提交。';await saveJob(job).catch(()=>{});throw error; }
  }).catch(error => console.error('队列启动失败：', error.code || 'QUEUE_FAILED'));
}
async function prepare(input, requestID, extracting, pending = [], source) {
  const connection = resolveProvider(input);
  const resolved = {...input, ...connection};
  const expression=!extracting&&input.outputType==='expression';
  const conversion=!extracting&&input.outputType==='resource-conversion';
  const relight=!extracting&&input.outputType==='scene-relight';
  let original;
  if(relight){
    if(!localRelight)throw new Error('锁定底图的现场光校正需要 macOS Vision。');
    original=jobs.get(input.sourceJobId);
    if(!original || original.status!=='completed' || !original.output || !usesSceneLighting(original))throw new Error('请选择一张已完成、带背景的摄影类人物成图。');
    source={bytes:await readFile(join(DATA,'jobs',original.id,original.output))};
  }
  if(expression)source||=await expressionSource(input.sourceFaceId,jobs.values());
  if(conversion)source=await conversionSource(input.sourceKind,input.sourceAssetId);
  if(extracting&&input.renderMode!==undefined){
    if(input.renderMode!=='live-action')throw new Error('未知的资源制作方案。');
    source=await artworkSettings(resolved);
  }
  const data = extracting ? source?.data??validateExtraction(resolved) : expression?expressionSettings(resolved,source):conversion?conversionSettings(resolved,source):relight?{
    ...validateProvider(resolved),outputType:'scene-relight',sourceJobId:original.id,sourceHash:createHash('sha256').update(source.bytes).digest('hex'),
    sceneLightRevision:SCENE_LIGHT_REVISION,relightRevision:2,sceneLight:original.sceneLight??'auto',subjectType:'human',style:original.style,effect:original.effect??'none',
    background:'opaque',size:original.size,quality:original.quality,selections:original.selections,characters:original.characters,
    title:'现场光校正 · '+(original.references?.find(ref=>ref.kind==='background')?.title||'人物图片'),prompt:''
  }:validateRequest(resolved);
  if(!extracting && ['image','character-sheet'].includes(data.outputType)){
    data.characters=await Promise.all(data.characters.map(async(role,index)=>{
      if(!role.expressionAssetId && role.face.startsWith('resource-'))role=faceRole(role,await findAsset('face',role.face));
      if(role.expressionAssetId){
        const variant=await findAsset('face',role.expressionAssetId);
        if(variant.expression?.sourceFaceId!==role.face)throw new Error(`角色 ${index+1} 的表情不属于所选头像，请重新选择。`);
        const parent=await findAsset('face',role.face);
        if(!resourceMatchesSubject('face',parent,data.subjectType))throw new Error(`角色 ${index+1} 的原头像类别不匹配。`);
      }
      return role;
    }));
    data.selections.face=data.characters[0].face;
  }
  const key = extracting ? extractionKey : settingsKey;
  const previousID = jobs.get(requestID);
  if(extracting && !data.renderMode && subjectTypeFor(data)==='human' && extractionParts(data).some(part=>part.kind==='pose')){
    if(previousID?.poseStyleId)data.poseStyleId=previousID.poseStyleId;
    else if(!previousID && !CATALOG.pose.some(item=>item.id===POSE_STYLE_ID)){
      const poses=[...await listUploads(),...await listResources(),...CATALOG.pose.map(item=>({...item,kind:'pose'}))];
      const style=poses.find(item=>item.kind==='pose' && subjectTypeFor(item)==='human');
      if(!style)throw new Error('请先在骨架资源库上传一张人物骨架，作为拆解的画法参考；也可以先只制作头像和衣服。');
      data.poseStyleId=style.id;
    }
  }
  if(relight && previousID?.outputType==='scene-relight')data.relightRevision=previousID.relightRevision;
  let backgroundAsset;
  if (!extracting && data.outputType === 'image' && data.selections.background) {
    if (previousID && (previousID.outputType ?? 'image') === 'image' && previousID.selections?.background === data.selections.background) {
      data.sceneLight = previousID.sceneLight ?? 'auto';
      if(previousID.sceneLightRevision===undefined)delete data.sceneLightRevision;
      else data.sceneLightRevision=previousID.sceneLightRevision;
    } else {
      backgroundAsset = await findAsset('background', data.selections.background);
      data.sceneLight = backgroundAsset.sceneLight ?? 'auto';
    }
  }
  if (previousID) {
    if ((previousID.type === 'extraction') !== extracting || key(previousID) !== key(data)) {
      const error = new Error('请求编号已用于不同配置，请重新提交；本次没有调用模型。'); error.status = 409; throw error;
    }
    return {job:previousID, reused:true};
  }
  const existing = [...jobs.values(), ...pending];
  if(expression){
    const matching=expressionJobs(existing,source,data.expressionId);
    const waiting=matching.find(job=>['queued','running'].includes(job.status));if(waiting)return {job:waiting,reused:true};
    if(input.regenerate!==true){
      const saved=matching.find(job=>job.output);
      if(saved){
        await publishExpression(saved);saved.status='completed';saved.message='表情头像已保存并加入资料库。';await saveJob(saved);return {job:saved,reused:true};
      }
    }
  }
  if (extracting) {
    await findAsset('source', data.sourceId);
    const previous = existing.findLast(job => job.type === 'extraction' && (job.status !== 'cancelled'||(data.renderMode&&Object.keys(job.outputs||{}).length)) && extractionKey(job) === extractionKey(data));
    if (previous) return {job:previous,reused:true};
  } else if (input.regenerate !== true) {
    const waiting = existing.find(job => job.type !== 'extraction' && ['queued','running'].includes(job.status) && settingsKey(job) === settingsKey(data));
    if (waiting) return {job:waiting,reused:true};
    const matches = savedMatches(existing, data);
    for (const job of matches) if (job.output && await stat(join(DATA, 'jobs', job.id, job.output)).then(info => info.isFile()).catch(() => false)) return {job,reused:true};
    if (matches.length) throw new Error('已有相同配置的成图记录，但图片文件缺失。请先检查保存目录；本次未重新生成。');
  }
  const job = {...data, id:requestID, createdAt:new Date().toISOString(), queuedAt:new Date().toISOString(), status:'queued', message:'已加入队列，等待开始。', ...(connection.credentialId ? {credentialId:connection.credentialId} : {})};
  if (extracting) job.outputs = {};
  else {
    job.references = relight ? original.references : await Promise.all(referenceSlots(data).map(async ({kind,id,characterIndex}) => ({kind,characterIndex,...(kind === 'background' && backgroundAsset ? backgroundAsset : await findAsset(kind,id))})));
    if (!isSceneJob(data)&&!expression&&!conversion&&!relight) {
      for(const slot of referenceSlots(data))for(const ref of slot.extras||[]){
        const part=await findAsset('source',ref.id);
        if(part.partKind!==ref.key)throw new Error(`所选图片不属于${ref.label}资源。`);
      }
      if (job.references.some(ref => !resourceMatchesSubject(ref.kind,ref,data.subjectType))) throw new Error('资源主体类别不匹配，请使用当前类别的骨架和参考图。');
      const count = poseCount(job.references[0]);
      if (count && count !== data.characters.length) throw new Error(`这张骨架包含 ${count} 个主体，请配置 ${count} 个角色。`);
      const mismatch = roleMismatch(data.characters, job.references[0], job.references.filter(ref=>ref.kind==='face'), data.subjectType, job.references.filter(ref=>ref.kind==='surface'));
      if (mismatch) throw new Error(mismatch);
    }
    job.resolvedPrompt = relight?relightPrompt(original):expression?expressionPrompt(job):conversion?conversionPrompt(job):buildPrompt(job);
  }
  if(job.provider==='comfyui') {
    const counts=extracting?[...new Set(extractionParts(job).map(part=>part.kind==='pose'&&subjectTypeFor(job)==='human'?2:1))]:[referenceSlots(job).length];
    for(const count of counts)workflowFor(comfyWorkflows(job),count);
  }
  if(expression||conversion||relight||data.renderMode==='live-action'){
    job.sourceSnapshot=`reference.${{'image/png':'png','image/jpeg':'jpg','image/webp':'webp'}[imageType(source.bytes)]}`;
    await mkdir(join(DATA,'jobs',job.id),{recursive:true});await writeFile(join(DATA,'jobs',job.id,job.sourceSnapshot),source.bytes,{mode:0o600});
  }
  return {job, apiKey:connection.apiKey, reused:false};
}
async function enqueue(entries, record) {
  const fresh = entries.filter(entry=>!entry.reused);
  if (queue.length + fresh.length > 500) throw new Error('等待队列最多 500 项，请先等待完成或取消部分任务。');
  for (const {job} of fresh) await saveJob(job);
  const ids = [...queue, ...fresh.map(({job})=>job.id)];
  const records = record ? {...batches,[record.id]:record} : batches;
  await saveQueue(ids, records);
  queue = ids; batches = records;
  for (const {job,apiKey} of fresh) { jobs.set(job.id,job); if (apiKey && !job.credentialId) transientKeys.set(job.id,apiKey); }
}
function batchResult(record) { return {id:record.id,...(record.type?{type:record.type,faceId:record.faceId}:{}),items:record.jobIds.map(id=>jobs.get(id)), count:record.jobIds.length, queued:record.jobIds.filter(id=>jobs.get(id)?.status==='queued').length}; }
async function body(req, max) {
  let size = 0; const chunks = [];
  for await (const chunk of req) { size += chunk.length; if (size > max) throw new Error('请求超过大小限制。'); chunks.push(chunk); }
  return Buffer.concat(chunks);
}
function send(res, code, value) { res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(value)); }
async function sendFile(res, path, contentType, download) {
  const bytes = await readFile(path);
  res.writeHead(200, { 'Content-Type': contentType || imageType(bytes), 'Content-Length': bytes.length, 'Cache-Control': contentType?.startsWith('text/') ? 'no-cache' : 'private, max-age=3600', ...(download ? { 'Content-Disposition': `attachment; filename="${download}"` } : {}) });
  res.end(bytes);
}

async function generateTask(task,paths,apiKey,onStatus,controller,owner=task,part='image') {
  const signal=controller.signal;
  signal.throwIfAborted();
  if(task.provider==='comfyui')workflowFor(comfyWorkflows(task),paths.length);
  if(task.provider==='comfyui')return generateComfy(task,paths,apiKey,comfyWorkflows(task),onStatus,{signal,onRemote:async remote=>{owner.remoteJobs={...owner.remoteJobs,[part]:remote};await saveJob(owner);}});
  return task.provider==='quota'?generateQuota(task,paths,onStatus,{signal}):generateAPI(task,paths,apiKey,onStatus,{signal});
}

async function runJob(job, apiKey, controller) {
  try {
    if (job.type === 'extraction') {
      await runExtraction(job, apiKey, controller);
    } else {
      job.status = 'running'; job.message = '正在准备原始参考图…'; await saveJob(job);
      const paths = job.sourceSnapshot?[join(DATA,'jobs',job.id,job.sourceSnapshot)]:await Promise.all(referenceSlots(job).map(({kind,id}) => assetPath(kind, id)));
      if (controller.signal.aborted) throw new Error('任务已取消。');
      const onStatus = text => { job.message = text; };
      let baseMask;
      if(job.outputType==='scene-relight'){
        onStatus('正在锁定原图中的人物范围…');
        baseMask=await prepareRelight(job.id,paths[0],controller.signal);
      }
      const inputs=['image','character-sheet'].includes(job.outputType)?await withPartReferences(job,paths,controller.signal):paths;
      const result = await generateTask(job,inputs,apiKey,onStatus,controller);
      if(baseMask){
        onStatus('正在检查参考图的对齐情况并校正原图光照…');
        result.bytes=await finishRelight(job.id,paths[0],result.bytes,baseMask,controller.signal);
      }
      const extension = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp' }[imageType(result.bytes)];
      await writeFile(join(DATA, 'jobs', job.id, `result.${extension}`), result.bytes, { mode: 0o600 });
      job.output = `result.${extension}`; job.imageURL = `/api/jobs/${job.id}/image`; job.model = result.model; job.usage = result.usage;
      if(job.outputType==='expression')await mutate(()=>publishExpression(job,result.bytes));
      job.status = 'completed'; job.message = '图片已生成并保存到本地。';
      if(job.outputType==='expression')job.message='表情头像已保存、添加表情标签并加入头像库。';
    }
  } catch (error) {
    job.status = controller.signal.aborted ? 'cancelled' : 'failed';
    job.message = controller.signal.aborted ? '已停止等待；已提交的云端任务可能仍消耗额度。' : String(error.message).slice(0, 600);
  } finally {
    if(job.outputType==='scene-relight')await rm(join(DATA,'work',job.id,'light'),{recursive:true,force:true}).catch(()=>{});
    apiKey = null;
    const finished = { ...job, finishedAt: new Date().toISOString() };
    // Publish completion only after saving, so immediate reuse cannot race the active-task lock.
    job.status = 'running';
    try { await saveJob(finished); Object.assign(job, finished); }
    catch (error) {job.status='interrupted';job.message='任务结果状态无法保存，请检查磁盘；不会自动重新生成。';throw error;}
  }
}

async function runExtraction(job, apiKey, controller) {
  job.status = 'running'; job.message = '正在准备源照片…'; await saveJob(job);
  const source = job.sourceSnapshot?join(DATA,'jobs',job.id,job.sourceSnapshot):await assetPath('source', job.sourceId);
  const parts = extractionParts(job);
  for (const [i, part] of parts.entries()) {
    const { key, kind, title } = part;
    if (job.outputs[key]) continue;
    if (controller.signal.aborted) throw new Error('任务已取消。');
    job.currentKind = key;
    const task = extractionTask(job, key);
    const paths = kind === 'pose' && subjectTypeFor(job) === 'human' ? [source, await assetPath('pose', job.poseStyleId || POSE_STYLE_ID)] : [source];
    const onStatus = text => { job.message = `${i + 1}/${parts.length} · ${title}：${text}`; };
    const result = await generateTask(task,paths,apiKey,onStatus,controller,job,key);
    const extension = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp' }[imageType(result.bytes)];
    const output = `${key}.${extension}`;
    await writeFile(join(DATA, 'jobs', job.id, output), result.bytes, { mode: 0o600 });
    job.outputs[key] = { output, imageURL: `/api/extractions/${job.id}/image/${key}`, model: result.model, usage: result.usage };
    await saveJob(job);
  }
  job.currentKind = null; job.status = 'completed'; job.message = `${parts.length} 项资源已保存，预览后可选择加入资料库。`;
}

export async function createServer() {
  await loadSettings();
  await loadTags();
  await loadJobs();
  const server = http.createServer(async (req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('Content-Security-Policy', "default-src 'self'; img-src 'self' blob:; style-src 'self'; script-src 'self'; connect-src 'self'; font-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'");
    const host = req.headers.host;
    const port = req.socket.localPort;
    if (![`127.0.0.1:${port}`, `localhost:${port}`].includes(host)) return send(res, 403, { error: '只允许本机访问。' });
    const origin = req.headers.origin;
    if (origin && ![`http://127.0.0.1:${port}`, `http://localhost:${port}`].includes(origin)) return send(res, 403, { error: '不接受跨站请求。' });
    if (req.method === 'POST' && req.headers['x-studio-token'] !== csrf) return send(res, 403, { error: '页面会话已过期，请刷新后重试。' });
    try {
      const url = new URL(req.url, `http://${host}`);
      const path = url.pathname;
      if (req.method === 'GET' && path === '/api/bootstrap') {
        const resources = [...await listResources(),...await listUploads()];
        const safeCatalog = Object.fromEntries(KINDS.map(k => [k, [...resources.filter(item => item.kind === k), ...CATALOG[k]].map(({ thumb, full, ...item }) => withTags(k,item))]));
        return send(res, 200, { csrf, localRelight, partAssets:resources.filter(item=>item.partKind), mcpPath:join(ROOT, 'mcp.mjs'), settings:publicSettings(), catalogs: safeCatalog, quota: await quotaStatus(), defaults: Object.fromEntries(Object.entries({pose:'full_single_P018_front',costume:'SPR-0161',face:'f71f980dde3'}).map(([kind,id])=>[kind,safeCatalog[kind].some(item=>item.id===id)?id:''])) });
      }
      if (req.method === 'GET' && ['/api/jobs', '/api/extractions'].includes(path)) return send(res, 200, [...jobs.values()].filter(job => (job.type === 'extraction') === (path === '/api/extractions')).sort((a,b) => b.createdAt.localeCompare(a.createdAt)));
      if(req.method==='POST'&&path==='/api/resource-tags'){
        const input=JSON.parse((await body(req,800000)).toString());
        return send(res,200,await mutate(()=>updateTags(input)));
      }
      const extractionImage = path.match(/^\/api\/extractions\/([0-9a-f-]+)\/image\/(source|pose|(?:costume|face|surface)(?:-[1-6])?)$/);
      if (req.method === 'GET' && extractionImage) {
        const job = jobs.get(extractionImage[1]), kind = extractionImage[2];
        if (job?.type !== 'extraction') return send(res, 404, { error: '拆解任务不存在。' });
        if (kind === 'source') return await sendFile(res, job.sourceSnapshot?join(DATA,'jobs',job.id,job.sourceSnapshot):await assetPath('source', job.sourceId));
        if (!job.outputs[kind]) return send(res, 404, { error: '该资源尚未生成。' });
        return await sendFile(res, join(DATA, 'jobs', job.id, job.outputs[kind].output), null, url.searchParams.has('download') ? job.outputs[kind].output : null);
      }
      const importRoute = path.match(/^\/api\/extractions\/([0-9a-f-]+)\/import$/);
      if (req.method === 'POST' && importRoute) {
        const job = jobs.get(importRoute[1]);
        if (job?.type !== 'extraction') return send(res, 404, { error: '拆解任务不存在。' });
        const input = JSON.parse((await body(req, 2000)).toString());
        const parts = extractionParts(job), subjects = subjectsFor(job);
        if (!Array.isArray(input.kinds) || !input.kinds.length || input.kinds.length > parts.length || input.kinds.some(key => !parts.some(part => part.key === key) || !job.outputs[key])) throw new Error('请选择已经生成的资源。');
        if (typeof input.title !== 'string' || !input.title.trim() || input.title.length > 80) throw new Error('请输入 80 字以内的资源名称。');
        if (input.gender != null && !['male', 'female', 'unisex', 'unspecified'].includes(input.gender)) throw new Error('资源类型无效。');
        if (input.costumeGender != null && !['male', 'female', 'unisex', 'unspecified'].includes(input.costumeGender)) throw new Error('服装类型无效。');
        const resources = [];
        for (const key of new Set(input.kinds)) {
          const part = parts.find(part => part.key === key), subject = subjects[part.characterIndex];
          const gender = !subjectFor(job).hasGender ? 'unspecified' : part.kind === 'pose' ? (subjects.length === 1 && subjects[0].gender !== 'reference' ? subjects[0].gender : 'unisex') : part.kind === 'costume' ? input.costumeGender || 'unisex' : subject?.gender !== 'reference' ? subject.gender : input.gender || 'unspecified';
          resources.push(await saveResource(job, part.kind, `${input.title.trim().slice(0, 64)} · ${part.title}`, await readFile(join(DATA, 'jobs', job.id, job.outputs[key].output)), { key, gender, personCount: subjects.length, roleGenders: subjects.map(subject => subject.gender), characterIndex: part.characterIndex, species: part.kind === 'pose' ? subjects.length === 1 ? subjects[0].species : undefined : subject?.species, roleSpecies: subjects.map(subject => subject.species), anatomy: part.kind === 'pose' ? subjects.length === 1 ? subjects[0].anatomy : undefined : subject?.anatomy, roleAnatomies: subjects.map(subject => subject.anatomy) }));
        }
        return send(res, 200, resources.map(item=>withTags(item.kind,item)));
      }
      const resumeRoute = path.match(/^\/api\/extractions\/([0-9a-f-]+)\/resume$/);
      if (req.method === 'POST' && resumeRoute) {
        const input = JSON.parse((await body(req,6000)).toString());
        const result = await mutate(async () => {
          const job = jobs.get(resumeRoute[1]);
          if (job?.type !== 'extraction') throw new Error('拆解任务不存在。');
          if (['completed','queued','running'].includes(job.status)) return {job,reused:true};
          const connection = resolveProvider(input.apiKey ? {...job,...input} : input);
          if (connection.provider !== job.provider || (job.provider === 'api' && (connection.model !== job.model || connection.baseURL !== job.baseURL)) || JSON.stringify(pipelineIdentity(connection))!==JSON.stringify(pipelineIdentity(job))) throw new Error('继续拆解需恢复原任务的通道、模型、服务地址和 ComfyUI 工作流。');
          const next = {...job,status:'queued',message:'等待继续拆解未完成资源…',queuedAt:new Date().toISOString(),credentialId:connection.credentialId};
          delete next.finishedAt;
          await enqueue([{job:next,apiKey:connection.apiKey}]);
          return {job:next};
        });
        send(res,result.reused?200:202,result.job); pump(); return;
      }
      const imageRoute = path.match(/^\/api\/jobs\/([0-9a-f-]+)\/image$/);
      if (req.method === 'GET' && imageRoute) {
        const job = jobs.get(imageRoute[1]);
        if (!job?.output) return send(res, 404, { error: '图片尚未生成。' });
        return await sendFile(res, join(DATA, 'jobs', job.id, job.output), null, url.searchParams.has('download') ? `character-${job.id.slice(0,8)}.${job.output.split('.').at(-1)}` : null);
      }
      const sceneImport = path.match(/^\/api\/jobs\/([0-9a-f-]+)\/import$/);
      if (req.method === 'POST' && sceneImport) {
        const job = jobs.get(sceneImport[1]);
        if (!job || (!isSceneJob(job)&&job.outputType!=='resource-conversion') || job.status !== 'completed' || !job.output) return send(res, 400, {error:'请先完成场景制作或资源转绘，再审核入库。'});
        const input = JSON.parse((await body(req, 2000)).toString());
        if(job.outputType==='resource-conversion'){
          const source=job.references[0];
          return send(res,200,withTags(job.sourceKind,await saveResource(job,job.sourceKind,input.title,await readFile(join(DATA,'jobs',job.id,job.output)),{gender:source.gender||'unspecified',species:source.species,anatomy:source.anatomy,tags:['写实化']})));
        }
        return send(res, 200, withTags(job.outputType,await saveResource(job, job.outputType, input.title, await readFile(join(DATA, 'jobs', job.id, job.output)), {gender:'unisex'})));
      }
      const jobRoute = path.match(/^\/api\/jobs\/([0-9a-f-]+)$/);
      if (req.method === 'GET' && jobRoute) return send(res, jobs.has(jobRoute[1]) ? 200 : 404, jobs.get(jobRoute[1]) || { error: '任务不存在。' });
      if (req.method === 'GET' && path === '/api/comfy/workflows') return send(res,200,comfyWorkflows());
      if (req.method === 'POST' && path === '/api/comfy/check') {const settings=publicSettings();return send(res,200,await checkComfy(settings.comfy,comfyToken()));}
      if (req.method === 'GET' && path === '/api/settings') return send(res,200,publicSettings());
      if (req.method === 'POST' && path === '/api/settings') {
        const input = JSON.parse((await body(req,600000)).toString());
        return send(res,200,await mutate(async()=>{const result=await saveSettings(input);await pruneCredentials([...jobs.values()]);return result;}));
      }
      if (req.method === 'GET' && path === '/api/queue') return send(res,200,{settings:publicSettings(),running:active?jobs.get(active.id):null,waiting:queue.map((id,index)=>({...jobs.get(id),position:index+1})),recent:[...jobs.values()].filter(job=>['completed','failed','interrupted','cancelled'].includes(job.status)).sort((a,b)=>(b.finishedAt||b.createdAt).localeCompare(a.finishedAt||a.createdAt)).slice(0,20)});
      const cancelRoute = path.match(/^\/api\/jobs\/([0-9a-f-]+)\/cancel$/);
      if (req.method === 'POST' && cancelRoute) {
        return send(res,200,await mutate(async()=>{
          const job = jobs.get(cancelRoute[1]);
          if (!job) throw new Error('任务不存在。');
          if (job.status === 'cancelled') return job;
          if (job.status === 'queued') {
            const next = {...job,status:'cancelled',message:'已取消，未开始的图片没有调用模型。',finishedAt:new Date().toISOString()};
            await saveJob(next);Object.assign(job,next);queue=queue.filter(id=>id!==job.id);await saveQueue();transientKeys.delete(job.id);await pruneCredentials([...jobs.values()]);return job;
          }
          if (active?.id === job.id && req.headers['x-stop-running'] === 'true') {active.controller.abort();return {message:'已请求停止等待。'};}
          const error=new Error('任务已开始，无法作为等待任务取消。');error.status=409;throw error;
        }));
      }
      if(req.method==='GET'&&path==='/api/expression-sets'){
        const source=await expressionSource(url.searchParams.get('faceId'),jobs.values());
        const items=EXPRESSIONS.map(expression=>{
          const matching=expressionJobs(jobs.values(),source,expression.id);
          return {id:expression.id,label:expression.label,job:matching.find(job=>['queued','running'].includes(job.status))||matching[0]||null,saved:matching.find(job=>job.status==='completed'&&job.output)||null};
        });
        return send(res,200,{faceId:source.source.id,items});
      }
      if(req.method==='POST'&&path==='/api/expression-sets'){
        const input=JSON.parse((await body(req,2000)).toString()),id=req.headers['idempotency-key'];
        if(typeof id!=='string'||!uuid.test(id))throw new Error('请求编号无效，请刷新页面。');
        if(typeof input.faceId!=='string'||(input.replaceExisting!==undefined&&typeof input.replaceExisting!=='boolean'))throw new Error('请选择头像；替代已有必须为勾选状态。');
        if(input.replaceExpressions!==undefined&&(!Array.isArray(input.replaceExpressions)||input.replaceExpressions.length>EXPRESSIONS.length||input.replaceExpressions.some(id=>!EXPRESSIONS.some(expression=>expression.id===id))))throw new Error('重抽表情必须是有效的表情编号列表。');
        if(input.replaceExisting===true&&input.replaceExpressions!==undefined)throw new Error('请指定重抽表情，不要同时提交整套替代。');
        const replaceExpressions=EXPRESSIONS.filter(expression=>input.replaceExpressions?.includes(expression.id)||(input.replaceExpressions===undefined&&input.replaceExisting===true)).map(expression=>expression.id);
        // Preserve idempotency for submissions from older clients.
        const signature=createHash('sha256').update(JSON.stringify(input.replaceExpressions===undefined?{faceId:input.faceId,replaceExisting:input.replaceExisting===true}:{faceId:input.faceId,replaceExpressions})).digest('hex');
        const result=await mutate(async()=>{
          if(batches[id]){if(batches[id].type!=='expression-set'||batches[id].signature!==signature){const error=new Error('批次编号已用于其他配置。');error.status=409;throw error;}return batchResult(batches[id]);}
          const source=await expressionSource(input.faceId,jobs.values());
          if(replaceExpressions.some(expressionId=>expressionJobs(jobs.values(),source,expressionId).some(job=>['queued','running'].includes(job.status)))){const error=new Error('勾选的表情仍在制作，请等待完成后再重抽。');error.status=409;throw error;}
          const entries=[];
          for(const [index,expression] of EXPRESSIONS.entries()){
            const entry=await prepare({outputType:'expression',sourceFaceId:input.faceId,expressionId:expression.id,regenerate:replaceExpressions.includes(expression.id)},randomUUID(),false,entries.map(item=>item.job),source);
            if(!entry.reused)Object.assign(entry.job,{batchId:id,batchIndex:index+1,batchName:`${source.source.title.slice(0,50)} · 表情头像组`});entries.push(entry);
          }
          const record={id,signature,type:'expression-set',faceId:source.source.id,jobIds:entries.map(entry=>entry.job.id)};
          await enqueue(entries,record);return batchResult(record);
        });
        send(res,202,result);pump();return;
      }
      if (req.method === 'POST' && ['/api/jobs','/api/extractions','/api/batches'].includes(path)) {
        const input = JSON.parse((await body(req,path==='/api/batches'?100000:20000)).toString());
        const id = req.headers['idempotency-key'];
        if (typeof id !== 'string' || !uuid.test(id)) throw new Error('请求编号无效，请刷新页面。');
        const result = await mutate(async()=>{
          if (path === '/api/batches') {
            const requests = batchRequests(input);
            const signature = createHash('sha256').update(JSON.stringify(input)).digest('hex');
            if (batches[id]) { if(batches[id].signature!==signature){const error=new Error('批次编号已用于不同配置。');error.status=409;throw error;}return {code:200,data:batchResult(batches[id])}; }
            const entries=[];
            for (const [index,payload] of requests.entries()) {
              const entry=await prepare(payload,randomUUID(),false,entries.map(entry=>entry.job));
              if (!entry.reused) Object.assign(entry.job,{batchId:id,batchIndex:index+1,batchName:typeof input.name==='string'?input.name.slice(0,80):'模特商品展示'});
              entries.push(entry);
            }
            const record={id,signature,jobIds:entries.map(({job})=>job.id)};
            await enqueue(entries,record);return {code:202,data:batchResult(record)};
          }
          const entry=await prepare(input,id,path==='/api/extractions');
          if (!entry.reused) await enqueue([entry]);
          return {code:entry.reused?200:202,data:{...entry.job,...(entry.reused?{reused:true}:{})}};
        });
        send(res,result.code,result.data);pump();return;
      }
      const batchRoute=path.match(/^\/api\/batches\/([0-9a-f-]+)$/);
      if(req.method==='GET'&&batchRoute)return send(res,batches[batchRoute[1]]?200:404,batches[batchRoute[1]]?batchResult(batches[batchRoute[1]]):{error:'批次不存在。'});
      const uploadRoute = path.match(/^\/api\/uploads\/(pose|costume|face|surface|background|foreground|source)$/);
      if (req.method === 'POST' && uploadRoute) {
        const bytes = await body(req, MAX_IMAGE_BYTES);
        return send(res, 201, await saveUpload(uploadRoute[1], bytes, decodeURIComponent(req.headers['x-file-name'] || '我的图片'), {partKind:req.headers['x-part-kind'],subjectType:req.headers['x-subject-type'], species:decodeURIComponent(req.headers['x-species'] || ''), anatomy:decodeURIComponent(req.headers['x-anatomy'] || '')}));
      }
      const assetRoute = path.match(/^\/assets\/(pose|costume|face|surface|background|foreground|source)\/([\w-]+)$/);
      if (req.method === 'GET' && assetRoute) return await sendFile(res, await assetPath(assetRoute[1], assetRoute[2], url.searchParams.has('thumb')));
      const effectSource = path.match(/^\/api\/effect-sources\/(manga-[a-z0-9-]+)$/);
      if (req.method === 'GET' && effectSource && effectFor(effectSource[1])?.creatorType) return await sendFile(res, join(ROOT, 'data/effect-sources', `${effectSource[1]}.md`), 'text/plain; charset=utf-8');
      const files = { '/expressions.js':['expressions.js','text/javascript; charset=utf-8'], '/tags.js':['tags.js','text/javascript; charset=utf-8'], '/providers.js':['providers.js','text/javascript; charset=utf-8'], '/comfy-workflows.example.json':['comfy-workflows.example.json','application/json; charset=utf-8'], '/batch.js':['batch.js','text/javascript; charset=utf-8'], '/': ['index.html', 'text/html; charset=utf-8'], '/app.js': ['app.js', 'text/javascript; charset=utf-8'], '/job-settings.js': ['job-settings.js', 'text/javascript; charset=utf-8'], '/effects.js': ['effects.js', 'text/javascript; charset=utf-8'], '/manga-effects.js': ['manga-effects.js', 'text/javascript; charset=utf-8'], '/subject-types.js': ['subject-types.js', 'text/javascript; charset=utf-8'], '/extraction-settings.js': ['extraction-settings.js', 'text/javascript; charset=utf-8'], '/style.css': ['style.css', 'text/css; charset=utf-8'], '/font.woff2': ['font.woff2', 'font/woff2'], '/favicon.svg': ['favicon.svg', 'image/svg+xml'] };
      if (req.method === 'GET' && files[path]) return await sendFile(res, join(ROOT, 'public', files[path][0]), files[path][1]);
      send(res, 404, { error: '未找到该页面。' });
    } catch (error) { if (!res.headersSent) send(res, error.status || 400, { error: error.code === 'ENOENT' ? '文件不存在。' : String(error.message).slice(0, 600) }); else res.end(); }
  });
  server.once('listening', pump);
  return server;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const server = await createServer();
  const port = Number(process.env.PORT || 3190);
  server.listen(port, '127.0.0.1', () => console.log(`人物工坊 http://127.0.0.1:${port}`));
  server.on('error', error => { console.error(error.code === 'EADDRINUSE' ? `端口 ${port} 已占用，请设置 PORT 后重试。` : error.message); process.exitCode = 1; });
}
