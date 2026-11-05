import { readFile, writeFile, mkdir, readdir, rename } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import {normalizeTags} from './public/tags.js';
import {PART_LABELS,SCENE_PROPS} from './public/job-settings.js';
import { subjectTypeFor, subjectFor, validateSubjectType, validateSpecies, validateAnatomy, resourceKindsFor, SCENE_KINDS } from './public/subject-types.js';

export const ROOT = dirname(fileURLToPath(import.meta.url));
export const DATA = process.env.STUDIO_DATA_DIR || join(ROOT, 'data');
export const KINDS = ['pose', 'costume', 'face', 'surface', 'background', 'foreground'];
const [publicCatalog, localCatalog] = await Promise.all(['catalogs.json', 'local-catalogs.json'].map(async file => {
  try { return JSON.parse(await readFile(join(DATA, file), 'utf8')); }
  catch (error) { if (error.code === 'ENOENT') return {}; throw error; }
}));
export const CATALOG = Object.fromEntries(KINDS.map(kind => [kind, [...(localCatalog[kind] || []).map(item => ({ ...item, local: true })), ...(publicCatalog[kind] || []).map(item => ({ ...item, gender: kind === 'pose' && /双人/.test(item.group) ? 'unisex' : 'female' }))]]));
const index = new Map(KINDS.flatMap(kind => CATALOG[kind].map(item => [`${kind}:${item.id}`, item])));
export const MAX_IMAGE_BYTES = 20 * 1024 * 1024;

export function imageType(bytes) {
  if (bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) return 'image/png';
  if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return 'image/jpeg';
  if (bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP') return 'image/webp';
  throw new Error('请选择 PNG、JPEG 或 WebP 图片。');
}

export async function boundedBytes(response, max = MAX_IMAGE_BYTES) {
  if (Number(response.headers.get('content-length')) > max) throw new Error('图片超过大小限制。');
  let size = 0;
  const chunks = [];
  for await (const chunk of response.body) {
    size += chunk.length;
    if (size > max) throw new Error('响应超过大小限制。');
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

export async function findAsset(kind, id) {
  if (![...KINDS, 'source'].includes(kind) || typeof id !== 'string' || !/^[\w-]{1,100}$/.test(id)) throw new Error('参考图编号无效。');
  if (id.startsWith('upload-') || id.startsWith('resource-')) {
    const folder = id.startsWith('upload-') ? 'uploads' : 'resources';
    const item = JSON.parse(await readFile(join(DATA, folder, `${id}.json`), 'utf8').catch(() => { throw new Error('本地图片不存在。'); }));
    if (item.kind !== kind) throw new Error('上传图片分类不匹配。');
    if (!['.png', '.jpg', '.webp'].includes(item.extension)) throw new Error('图片格式无效。');
    return item;
  }
  const item = index.get(`${kind}:${id}`);
  if (!item) throw new Error('图库中找不到这张参考图。');
  return item;
}

export async function assetPath(kind, id, thumb = false) {
  const item = await findAsset(kind, id);
  if (id.startsWith('upload-')) return join(DATA, 'uploads', `${id}${item.extension}`);
  if (id.startsWith('resource-')) return join(DATA, 'resources', `${id}${item.extension}`);
  if (item.local) return join(DATA, 'local-assets', kind, `${id}.png`);
  return libraryPath(kind, thumb ? item.thumb : item.full);
}

export function libraryPath(kind, relative) {
  if (!KINDS.includes(kind) || typeof relative !== 'string' || !/^(?:[\w-]+\/)*[\w-]+\.(png|jpe?g|webp)$/i.test(relative)) throw new Error('图库文件路径无效。');
  return join(DATA, 'library', kind, relative);
}

export async function saveUpload(kind, bytes, name, metadata = {}) {
  if (![...KINDS, 'source'].includes(kind)) throw new Error('图片分类无效。');
  const subjectType = SCENE_KINDS.includes(kind) ? 'scene' : validateSubjectType(metadata.subjectType);
  if (kind !== 'source' && subjectType !== 'scene' && !resourceKindsFor({subjectType}).includes(kind)) throw new Error('资源类型与主体类别不匹配。');
  const config = subjectFor({subjectType});
  const species = config?.hasSpecies ? validateSpecies(metadata.species || '', false) : undefined;
  const anatomy = config?.fantasy ? validateAnatomy(metadata.anatomy || '', false) : undefined;
  if (!bytes.length || bytes.length > MAX_IMAGE_BYTES) throw new Error('图片需小于 20 MB。');
  const mime = imageType(bytes);
  const extension = { 'image/png': '.png', 'image/jpeg': '.jpg', 'image/webp': '.webp' }[mime];
  const id = `upload-${randomUUID()}`;
  const item = { id, kind, title: String(name || '我的图片').slice(0, 80), category: '我的上传', extension, ...(kind === 'source' ? {} : {subjectType, species, anatomy}) };
  if(metadata.partKind!==undefined){
    if(kind!=='source'||typeof metadata.partKind!=='string'||!(Object.hasOwn(PART_LABELS,metadata.partKind)||Object.hasOwn(SCENE_PROPS,metadata.partKind)))throw new Error('小件资源类别无效。');
    item.partKind=metadata.partKind;
  }
  await mkdir(join(DATA, 'uploads'), { recursive: true });
  await writeFile(join(DATA, 'uploads', `${id}${extension}`), bytes, { mode: 0o600 });
  await writeFile(join(DATA, 'uploads', `${id}.json`), JSON.stringify(item), { mode: 0o600 });
  return item;
}

export async function listResources() {
  const files = await readdir(join(DATA, 'resources')).catch(error => { if (error.code === 'ENOENT') return []; throw error; });
  const items = await Promise.all(files.filter(file => /^resource-[\w-]+\.json$/.test(file)).map(file => readFile(join(DATA, 'resources', file), 'utf8').then(JSON.parse)));
  const seen=new Set();
  return items.filter(item => KINDS.includes(item.kind)||(item.kind==='source'&&item.partKind)).sort((a,b)=>(b.publishedAt||b.createdAt).localeCompare(a.publishedAt||a.createdAt)).map(item=>{
    if(!item.expression)return item;
    const slot=JSON.stringify([item.expression.sourceFaceId,item.expression.id]),superseded=seen.has(slot);
    seen.add(slot);return {...item,superseded};
  });
}

export async function listUploads() {
  const files=await readdir(join(DATA,'uploads')).catch(error=>{if(error.code==='ENOENT')return [];throw error;});
  const items=await Promise.all(files.filter(file=>/^upload-[\w-]+\.json$/.test(file)).map(file=>readFile(join(DATA,'uploads',file),'utf8').then(JSON.parse)));
  return items.filter(item=>KINDS.includes(item.kind)||(item.kind==='source'&&item.partKind));
}

export async function saveResource(job, kind, title, bytes, { key = kind, gender = 'unspecified', personCount = 1, characterIndex, roleGenders, species, roleSpecies, anatomy, roleAnatomies,expression,partKind,tags=[] } = {}) {
  if (!(KINDS.includes(kind)||(kind==='source'&&Object.hasOwn(PART_LABELS,partKind))) || !/^[0-9a-f-]{36}$/.test(job.id)) throw new Error('资源编号无效。');
  if (typeof title !== 'string' || !title.trim() || title.length > 80) throw new Error('请输入 80 字以内的资源名称。');
  if (!bytes.length || bytes.length > MAX_IMAGE_BYTES) throw new Error('图片需小于 20 MB。');
  if (!new RegExp(`^${kind}(?:-[1-6])?$`).test(key) || !['male', 'female', 'unisex', 'unspecified'].includes(gender)) throw new Error('资源分类无效。');
  const subjectType = subjectTypeFor({...job, kind});
  if (kind!=='source' && subjectType !== 'scene' && !resourceKindsFor({subjectType}).includes(kind)) throw new Error('资源类型与主体类别不匹配。');
  const id = `resource-${job.id}-${key}`;
  const extension = { 'image/png': '.png', 'image/jpeg': '.jpg', 'image/webp': '.webp' }[imageType(bytes)];
  const folder = join(DATA, 'resources');
  const config = subjectFor({subjectType});
  const item = { id, kind, subjectType, title: title.trim(), category: '我的资源', extension, gender, ...(config?.hasSpecies ? { species, ...(kind === 'pose' ? {roleSpecies} : {}) } : {}), ...(config?.fantasy ? { anatomy, ...(kind === 'pose' ? {roleAnatomies} : {}) } : {}), ...(kind === 'pose' ? { personCount, roleGenders } : { characterIndex }), createdAt: job.createdAt, sourceJobId: job.id };
  if (kind === 'background') {
    // Reimporting a legacy job must preserve the light assigned to its approved background.
    item.sceneLight = job.sceneLight ?? await readFile(join(folder, `${id}.json`), 'utf8').then(data => JSON.parse(data).sceneLight ?? 'auto').catch(error => { if (error.code === 'ENOENT') return 'auto'; throw error; });
  }
  if(partKind)item.partKind=partKind;
  if(job.outputType==='pose-frame')item.poseSequence={planId:job.planId,action:job.action,stylePoseId:job.stylePoseId,startPoseId:job.startPoseId,endPoseId:job.endPoseId,frameIndex:job.frameIndex,count:job.count,revision:job.sequenceRevision};
  if(job.outputType==='pose-tween')item.poseTween={startPoseId:job.startPoseId,endPoseId:job.endPoseId,startHash:job.startHash,endHash:job.endHash,frameIndex:job.frameIndex,count:job.count,revision:job.tweenRevision};
  if(job.outputType==='costume-piece')item.series={id:job.seriesId,pieceId:job.pieceId,sourceAssetId:job.sourceAssetId,sourceHash:job.sourceHash,planHash:job.planHash,revision:job.seriesRevision};
  if(tags.length)item.tags=normalizeTags(tags);
  if(job.renderMode==='live-action'){
    item.tags=normalizeTags([...tags,'写实化','原画真人化']);
    item.conversion={sourceKind:'source',sourceAssetId:job.sourceId,sourceHash:job.sourceHash,revision:job.conversionRevision,artworkRevision:job.artworkRevision};
  }
  if(job.outputType==='resource-conversion')item.conversion={sourceKind:job.sourceKind,sourceAssetId:job.sourceAssetId,sourceHash:job.sourceHash,revision:job.conversionRevision};
  if(expression){if(kind!=='face'||!/^[a-f0-9]{64}$/.test(expression.key))throw new Error('表情资源标识无效。');Object.assign(item,{expression,tags:normalizeTags(tags),publishedAt:new Date().toISOString()});}
  await mkdir(folder, { recursive: true });
  // Metadata is the catalog entry; publish it only after the image is durable.
  const temp = join(folder, `${id}.${randomUUID()}.tmp`);
  await writeFile(`${temp}.image`, bytes, { mode: 0o600 });
  await rename(`${temp}.image`, join(folder, `${id}${extension}`));
  await writeFile(temp, JSON.stringify(item), { mode: 0o600 });
  await rename(temp, join(folder, `${id}.json`));
  return item;
}

export function assetURL(kind, id, thumb = false) {
  return `/assets/${kind}/${encodeURIComponent(id)}${thumb ? '?thumb=1' : ''}`;
}
