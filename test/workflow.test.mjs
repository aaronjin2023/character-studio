import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, mkdir, symlink, utimes, cp, copyFile, realpath, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { randomUUID, createHash } from 'node:crypto';

const { validateRequest, buildPrompt, pathFromEvents, pathFromThread, readQuotaImage, generateAPI } = await import('../generation.mjs');
const { settingsKey, savedMatches, matchesHistory, charactersFor, referenceSlots, roleMismatch, poseCount, STYLE_REVISIONS } = await import('../public/job-settings.js');
const { validateExtraction, extractionTask, extractionKey, extractionParts } = await import('../extraction.mjs');
const { ROOT, DATA, saveUpload, findAsset, assetPath, libraryPath, imageType, boundedBytes, CATALOG, listResources } = await import('../catalog.mjs');
const { createServer } = await import('../server.mjs');
const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aQ1kAAAAASUVORK5CYII=', 'base64');
const request = { provider:'quota', selections:{ pose:'full_single_P018_front', costume:'SPR-0161', face:'f71f980dde3' }, prompt:'自然微笑', style:'photo', background:'studio', size:'1024x1536', quality:'medium' };
const apiKey = 'test-secret-never-persist';
const apiRequest = { ...request, provider:'api', apiKey, model:'gpt-image-2', baseURL:'https://image-provider.example/v1' };
const pairCharacters = [
  {costume:'SPR-0161',face:'f71f980dde3',gender:'female',position:'画面左侧人物'},
  {costume:'local-male-wuxia-costume',face:'local-male-wuxia-face',gender:'male',position:'画面右侧人物'}
];

test('camera direction and shot size independently control prompts, gallery filters and reuse', () => {
  const base = validateRequest(request);
  const {cameraDirection, cameraPitch, shotSize, cameraRevision, ...legacy} = base;
  const saved = {...legacy, id:'old', status:'completed', imageURL:'/old.png', createdAt:'2026-11-01'};
  assert.deepEqual([cameraDirection, cameraPitch, shotSize], ['reference','reference','full']);
  assert.deepEqual(savedMatches([saved], base), [saved]);
  assert.equal(matchesHistory(saved, {cameraDirection:'reference', shotSize:'full'}), true);
  for (const change of [{cameraDirection:'right'}, {cameraPitch:'level'}, {shotSize:'medium'}]) {
    const changed = validateRequest({...request, ...change});
    assert.deepEqual(savedMatches([saved], changed), []);
    assert.equal(matchesHistory(saved, change), false);
  }
  for (const subjectType of ['human','animal','fantasy-humanoid','fantasy-beast']) {
    const job = {...base, subjectType, characters:[{...base.characters[0], species:'参考物种', anatomy:'保持固有肢体结构', surface:'surface'}], cameraDirection:'left', shotSize:'close'};
    const prompt = buildPrompt(job);
    assert.match(prompt, /向左绕主体/);
    assert.match(prompt, /头部特写/);
    assert.doesNotMatch(prompt, /全身参考图必须|部位完整入镜|只定义.*镜头角度/);
  }
  assert.match(buildPrompt({...base, cameraDirection:'right', shotSize:'wide'}), /沿所选方向退远/);
  assert.match(buildPrompt({...base, shotSize:'medium'}), /沿骨架原有观察方向/);
  const views = ['front','front-left','front-right','side-left','side-right','rear-left','rear-right','back'];
  const pitches = ['reference','level','high','low','overhead'];
  const keys = new Set();
  for (const cameraDirection of views) for (const cameraPitch of pitches) {
    const job = validateRequest({...request, cameraDirection, cameraPitch});
    keys.add(settingsKey(job));
    assert.equal(matchesHistory({...saved, ...job}, {cameraDirection, cameraPitch}), true);
    assert.doesNotMatch(buildPrompt(job), /undefined/);
  }
  assert.equal(keys.size, views.length * pitches.length);
  assert.match(buildPrompt({...base,cameraDirection:'back',cameraPitch:'high'}), /正后方约180°[\s\S]*向下俯拍/);
  assert.match(buildPrompt({...base,cameraDirection:'side-left',cameraPitch:'overhead'}), /左侧约90°[\s\S]*垂直向下约90°/);
  const above = validateRequest({...request,cameraPitch:'overhead'});
  assert.doesNotMatch(buildPrompt(above), /头部到最低支撑点完整可见/);
  assert.deepEqual(savedMatches([{...saved,cameraPitch:'overhead'}], above), []);
  const leftSide = validateRequest({...request,cameraDirection:'side-left'});
  assert.deepEqual(savedMatches([{...saved,cameraDirection:'side-left'}],leftSide),[]);
  assert.match(buildPrompt(leftSide), /左肩、左臂和左髋在近侧/);
  assert.doesNotMatch(buildPrompt({...base, outputType:'character-sheet'}), /机位方向：/);
  assert.equal(matchesHistory({...saved, outputType:'character-sheet'}, {shotSize:'full'}), false);
  for (const change of [{cameraDirection:'up'}, {cameraPitch:'steep'}, {shotSize:'fisheye'}, {shotSize:null}, {outputType:'character-sheet', cameraPitch:'low'}, {outputType:'character-sheet', shotSize:'close'}]) {
    assert.throws(() => validateRequest({...request, ...change}), /机位方向|俯仰角度|景别/);
  }
});

test('multi-character requests validate every role, preserve legacy cache identity and reference order', () => {
  const pair = validateRequest({...request,selections:{pose:'pair60_P001_front'},characters:pairCharacters});
  assert.equal(pair.characters.length,2);
  assert.deepEqual(referenceSlots(pair).map(slot=>[slot.kind,slot.id]),[['pose','pair60_P001_front'],['costume','SPR-0161'],['face','f71f980dde3'],['costume','local-male-wuxia-costume'],['face','local-male-wuxia-face']]);
  assert.equal(settingsKey(request),settingsKey({...request,characters:charactersFor(request)}));
  for(const characters of [[],Array(7).fill(pairCharacters[0]),[null],[{...pairCharacters[0],face:'../secret'}],[{...pairCharacters[0],gender:'bad'}],[{...pairCharacters[0],position:''},pairCharacters[1]]]) assert.throws(()=>validateRequest({...request,characters}));
  for(const characters of [[...pairCharacters].reverse(),[{...pairCharacters[0],position:'后方'},pairCharacters[1]],[pairCharacters[0],{...pairCharacters[1],face:'local-male-modern-face'}],[pairCharacters[0],{...pairCharacters[1],costume:'SPR-0004'}]]) assert.notEqual(settingsKey(pair),settingsKey({...pair,characters}));
  const prompt = buildPrompt(pair);
  for(const text of ['2 个角色','图4只定义此角色的整套衣装','图5只定义此角色的脸型','画面右侧人物','成年男性','允许反串','不交换']) assert.ok(prompt.includes(text),text);
});

test('skeleton and face types match while costume type is independent; male assets are project-local', async () => {
  const malePose=await findAsset('pose','local-male-P018-front'), maleFace=await findAsset('face','local-male-modern-face'), femaleFace=await findAsset('face','f71f980dde3');
  const male={gender:'male',costume:'SPR-0161',face:maleFace.id,position:''};
  assert.equal(roleMismatch([male],malePose,[maleFace]),'');
  assert.match(roleMismatch([male],malePose,[femaleFace]),/不匹配/);
  assert.match(roleMismatch([{...male,gender:'female'}],malePose,[maleFace]),/不匹配/);
  assert.equal(roleMismatch(pairCharacters,{roleGenders:['female','male'],personCount:2},[femaleFace,maleFace]),'');
  assert.match(roleMismatch(pairCharacters,{roleGenders:['male','female'],personCount:2},[femaleFace,maleFace]),/角色 1/);
  assert.equal(poseCount(await findAsset('pose','pair60_P001_front')),2);
  for(const [kind,id] of [['pose',malePose.id],['face',maleFace.id],['face','local-male-wuxia-face'],['costume','local-male-modern-costume'],['costume','local-male-wuxia-costume']]) {
    assert.equal((await findAsset(kind,id)).gender,'male');
    assert.equal(imageType(await readFile(await assetPath(kind,id))),'image/png');
  }
});

test('multi-person extraction uses one shared skeleton and a distinct face/costume per positioned role', () => {
  const job=validateExtraction({...request,sourceId:`upload-${randomUUID()}`,title:'双人',inferHidden:true,subjects:pairCharacters});
  assert.deepEqual(job.subjects,pairCharacters.map(({gender,position})=>({gender,position})));
  assert.deepEqual(extractionParts(job).map(part=>part.key),['pose','costume-1','face-1','costume-2','face-2']);
  assert.match(extractionTask(job,'pose').resolvedPrompt,/全部 2 个人物/);
  assert.match(extractionTask(job,'pose').resolvedPrompt,/成年男性/);
  assert.match(extractionTask(job,'face-2').resolvedPrompt,/只提取角色 2（画面右侧人物，男性）/);
  assert.match(extractionTask(job,'costume-1').resolvedPrompt,/反串/);
  assert.throws(()=>extractionTask(job,'face-3'));
  assert.equal(extractionParts({...job,subjects:[...job.subjects,{gender:'reference',position:'后排'}]}).length,7);
  assert.notEqual(extractionKey(job),extractionKey({...job,subjects:[...job.subjects].reverse()}));
});

test('saved-image matching includes generation settings but excludes credentials and runtime metadata', () => {
  assert.equal(settingsKey(request),settingsKey({...request,model:'Codex 内置图像生成',id:'other',status:'completed'}));
  assert.equal(settingsKey(apiRequest),settingsKey({...apiRequest,apiKey:'different',baseURL:'https://image-provider.example/v1/'}));
  for (const update of [{prompt:'不同要求'},{prompt:' 自然微笑 '},{provider:'api'},{style:'anime'},{style:'illustration'},{background:'white'},{size:'1024x1024'},{quality:'high'},{selections:{...request.selections,pose:'another'}},{characters:[{...charactersFor(request)[0],position:' '}]},{characters:[{...charactersFor(request)[0],gender:'female'}]}]) assert.notEqual(settingsKey(request),settingsKey({...request,...update}));
  for (const update of [{model:'another-model'},{baseURL:'https://another.example/v1'}]) assert.notEqual(settingsKey(apiRequest),settingsKey({...apiRequest,...update}));
});

test('saved preview matches all current settings and excludes older drawing-style instructions', () => {
  const photo = {...request,id:'photo',status:'completed',imageURL:'/photo',createdAt:'2026-11-01T00:00:00Z'};
  const anime = {...photo,...validateRequest({...request,style:'anime'}),id:'anime',imageURL:'/anime',createdAt:'2026-11-01T00:02:00Z'};
  const oldAnime = {...anime,id:'old-anime',styleRevision:undefined};
  const jobs = [anime,photo,oldAnime,{...photo,id:'failed',status:'failed'}];
  assert.deepEqual(savedMatches(jobs,validateRequest(request)).map(j=>j.id),['photo']);
  assert.deepEqual(savedMatches(jobs,validateRequest({...request,style:'anime'})).map(j=>j.id),['anime']);
  assert.deepEqual(savedMatches(jobs,validateRequest({...request,style:'illustration'})),[]);
  for(const field of ['style','background','size','quality','provider']) assert.deepEqual(savedMatches([{...photo,[field]:undefined}],request),[]);
  const exact = {...request,prompt:' 自然微笑\n',characters:[{...charactersFor(request)[0],position:' 中间 '}]};
  assert.equal(validateRequest(exact).prompt,exact.prompt);
  assert.equal(validateRequest(exact).characters[0].position,exact.characters[0].position);
  assert.equal(settingsKey(validateRequest(exact)),settingsKey(exact));
});

test('drawing styles explicitly redraw photographic references in the selected medium', () => {
  for(const style of ['anime','illustration']) {
    const job=validateRequest({...request,style});
    assert.equal(job.styleRevision,STYLE_REVISIONS[style]);
    const prompt=buildPrompt(job);
    assert.ok(prompt.startsWith('画面风格（最终绘制媒介）'));
    assert.match(prompt,/所选画风优先于参考图片的原始渲染方式/);
    assert.ok(prompt.includes(style==='anime'?'赛璐璐':'可见笔触'));
  }
});

test('character sheets use an independent type, a complete reference-board prompt and one character', () => {
  assert.equal(validateRequest(request).outputType,'image');
  assert.equal(settingsKey(request),settingsKey({...request,outputType:'image'}));
  const sheet=validateRequest({...request,outputType:'character-sheet',style:'anime'});
  assert.equal(sheet.outputType,'character-sheet');
  assert.notEqual(settingsKey({...sheet,outputType:'image'}),settingsKey(sheet));
  const prompt=buildPrompt(sheet);
  for(const phrase of ['全身多视角','面部特写','四种表情','独立拆件','材质细节','姿势还原','同一角色','图2只定义','图3只定义','赛璐璐']) assert.ok(prompt.includes(phrase),phrase);
  assert.equal(prompt.includes('不要拼图、分屏'),false);
  assert.ok(buildPrompt(request).includes('不要拼图、分屏'));
  assert.match(buildPrompt({...sheet,background:'transparent'}),/透明底的分区资料图/);
  assert.throws(()=>validateRequest({...request,outputType:'character-sheet',characters:pairCharacters}),/1 个角色/);
  for(const outputType of ['poster',null,42]) assert.throws(()=>validateRequest({...request,outputType}),/生成类型无效/);
});

test('gallery combines type, style, people, aspect, provider and status filters including legacy and archived images', () => {
  const image={...request,id:'old-image',status:'completed',imageURL:'/image',createdAt:'2026-11-01T01:00:00Z'};
  const sheet={...image,id:'sheet',outputType:'character-sheet',title:'黑衣男士样稿',provider:'imported',size:'1254x1254',personCount:1};
  assert.equal(matchesHistory(image,{outputType:'image',style:'photo',people:'1',size:'portrait'}),true);
  assert.equal(matchesHistory(sheet,{outputType:'character-sheet',style:'photo',people:'1',size:'square',provider:'imported',query:'黑衣'}),true);
  for(const filter of [{outputType:'image'},{style:'anime'},{people:'2'},{people:'multi'},{size:'portrait'},{provider:'api'},{status:'failed'},{query:'不存在'}]) assert.equal(matchesHistory(sheet,filter),false);
  assert.equal(matchesHistory({...image,characters:pairCharacters},{people:'2'}),true);
  assert.equal(matchesHistory({...image,characters:[...pairCharacters,pairCharacters[0]]},{people:'multi'}),true);
  assert.equal(matchesHistory({...image,status:'failed',imageURL:null},{status:'failed',outputType:'image'}),true);
  assert.equal(matchesHistory({...image,size:undefined},{size:'square'}),false);
  assert.equal(matchesHistory({...sheet,type:'extraction'},{status:'all'}),false);
});

test('generated gallery searches prompt, reference names and IDs with inclusive local dates and provider filters', () => {
  const job = { ...request, id:'task-123', status:'completed', imageURL:'/image', createdAt:new Date(2026,9,31,14).toISOString(), references:[{title:'白衣武侠',id:'local-baiyi-01-pose'}] };
  assert.equal(matchesHistory(job,{query:'白衣 自然微笑',from:'2026-10-31',to:'2026-10-31',provider:'quota'}),true);
  for (const query of ['task-123','LOCAL-BAIYI','SPR-0161']) assert.equal(matchesHistory(job,{query}),true);
  for (const filter of [{query:'不存在'},{from:'2026-11-01'},{to:'2026-10-30'},{provider:'api'}]) assert.equal(matchesHistory(job,filter),false);
  assert.equal(matchesHistory({...job,status:'failed'}),false);
  assert.equal(matchesHistory({...job,status:'failed'},{status:'all'}),true);
  assert.equal(matchesHistory({...job,type:'extraction'},{status:'all'}),false);
});

test('extraction validates inputs and builds distinct resources using the existing skeleton style', () => {
  const input = { ...apiRequest, sourceId:`upload-${randomUUID()}`, title:'测试资源', prompt:'保留刺绣', inferHidden:true };
  const job = validateExtraction(input);
  assert.equal(job.apiKey,undefined); assert.equal(job.selections,undefined);
  for (const update of [{sourceId:'../../file'},{title:''},{title:'x'.repeat(81)},{prompt:'x'.repeat(4001)},{inferHidden:'yes'},{baseURL:'http://example.com'}]) assert.throws(()=>validateExtraction({...input,...update}));
  const pose = extractionTask({...job,id:randomUUID()},'pose');
  assert.match(pose.resolvedPrompt,/图1是姿势的唯一来源/); assert.match(pose.resolvedPrompt,/图2只提供用户现有骨架库/); assert.match(pose.resolvedPrompt,/合理补全/);
  assert.match(extractionTask({...job,inferHidden:false},'pose').resolvedPrompt,/不编造下肢站姿/);
  assert.equal(extractionTask(job,'costume').background,'transparent');
  assert.equal(extractionTask(job,'face').size,'1024x1024');
  assert.equal(extractionKey(job),extractionKey({...job,title:'另一个名称',id:'new'}));
  assert.notEqual(extractionKey(job),extractionKey({...job,inferHidden:false}));
});

test('extraction assigns detachable head ornaments to clothing and isolates legacy results',()=>{
  const input={provider:'quota',sourceId:`upload-${randomUUID()}`,title:'头饰拆解',prompt:'',inferHidden:false};
  for(const subjectType of ['human','fantasy-humanoid','animal','fantasy-beast']){
    const job=validateExtraction({...input,subjectType,subjects:[{gender:'reference',position:'',species:'有角的角色',anatomy:'单头，双角，四肢'}]});
    const {headwearRevision,...legacy}=job;
    assert.equal(headwearRevision,1);
    assert.notEqual(extractionKey(job),extractionKey(legacy));
    const face=extractionTask(job,'face').resolvedPrompt;
    assert.match(face,/Remove all detachable head and face ornaments/);
    assert.match(face,/natural horns, fur, feathers/);
    assert.doesNotMatch(face,/发型和可见发饰/);
    assert.doesNotMatch(extractionTask(legacy,'face').resolvedPrompt,/Remove all detachable/);
    assert.equal(extractionTask(job,'pose').resolvedPrompt,extractionTask(legacy,'pose').resolvedPrompt);
    if(job.resourceKinds.includes('costume'))assert.match(extractionTask(job,'costume').resolvedPrompt,/Arrange each removable ornament separately/);
  }
  const pose=validateExtraction({...input,resourceKinds:['pose']});
  assert.equal(pose.headwearRevision,undefined);
  assert.equal(extractionKey(pose),extractionKey({...pose,headwearRevision:undefined}));
});

test('all gallery paths stay in the project and resolve without fetching external images', async () => {
  for (const kind of ['pose','costume','face']) assert.ok(CATALOG[kind].length > 0);
  const realFetch = globalThis.fetch;
  globalThis.fetch = () => { throw new Error('图库读取不得联网'); };
  try {
    for (const kind of ['pose','costume','face']) {
      for (const item of CATALOG[kind]) {
        if (item.local) continue;
        for (const thumb of [false,true]) {
          assert.equal(await assetPath(kind,item.id,thumb),libraryPath(kind,thumb ? item.thumb : item.full));
          assert.ok((await assetPath(kind,item.id,thumb)).startsWith(join(DATA,'library',kind)));
        }
      }
    }
  } finally { globalThis.fetch = realFetch; }
  for (const path of ['../private.png','/tmp/private.png','img/../../private.png','https://example.com/a.png']) assert.throws(()=>libraryPath('pose',path));
  await assert.rejects(findAsset('pose','../../auth.json'));
  await assert.rejects(findAsset('face',request.selections.pose));
});

test('local library assets are available in every category independently of the public gallery', async () => {
  for (const kind of ['pose','costume','face']) {
    const id = `local-baiyi-01-${kind}`;
    const item = await findAsset(kind,id);
    assert.equal(CATALOG[kind][0].id,id);
    assert.match(item.title,/合成测试/);
    assert.equal(new Set(CATALOG[kind].map(x=>x.id)).size,CATALOG[kind].length);
    const full = await assetPath(kind,id);
    assert.equal(await assetPath(kind,id,true),full);
    assert.equal(imageType(await readFile(full)),'image/png');
  }
  await assert.rejects(findAsset('face','local-baiyi-01-pose'));
});

test('a relocated project reads gallery images from its own directory', async () => {
  const moved = await realpath(await mkdtemp(join(tmpdir(),'character-studio-moved-')));
  await mkdir(join(moved,'data'));
  await cp(join(ROOT,'public'),join(moved,'public'),{recursive:true});
  for (const file of ['package.json','catalog.mjs']) await copyFile(join(ROOT,file),join(moved,file));
  for (const file of ['catalogs.json','local-catalogs.json']) await copyFile(join(DATA,file),join(moved,'data',file));
  process.env.STUDIO_DATA_DIR=join(moved,'data');
  let relocated;
  try { relocated = await import(pathToFileURL(join(moved,'catalog.mjs')).href); }
  finally { process.env.STUDIO_DATA_DIR=DATA; }
  for (const kind of ['pose','costume','face']) {
    for (const thumb of [false,true]) {
      const original = await assetPath(kind,request.selections[kind],thumb);
      const destination = await relocated.assetPath(kind,request.selections[kind],thumb);
      assert.ok(destination.startsWith(join(moved,'data/library',kind)));
      await mkdir(dirname(destination),{recursive:true});
      await copyFile(original,destination);
      assert.deepEqual(await readFile(destination),await readFile(original));
    }
  }
});

test('request validation strips secrets, rejects bad providers, sizes and endpoints', () => {
  const result = validateRequest({ ...apiRequest, other:'ignored' });
  assert.equal(result.apiKey, undefined); assert.equal(result.other, undefined);
  for (const update of [{provider:'auto'}, {size:'10x10'}, {quality:'ultra'}, {style:'unknown'}, {prompt:'x'.repeat(4001)}, {selections:{}}, {baseURL:'http://untrusted.example'}, {baseURL:'https://key@api.example/v1'}, {apiKey:'bad key'}, {model:'a\nAuthorization: bad'}]) assert.throws(() => validateRequest({ ...apiRequest, ...update }));
  assert.equal(validateRequest(apiRequest).baseURL, apiRequest.baseURL);
});

test('prompt assigns all three references and preserves anatomy and clothing', () => {
  const text = buildPrompt(request);
  assert.ok(text.indexOf('图1') < text.indexOf('图2') && text.indexOf('图2') < text.indexOf('图3'));
  for (const phrase of ['固定的人体比例','不要机械拉伸','五官和发型','自然微笑']) assert.ok(text.includes(phrase));
});

test('CLI parser only accepts a dedicated absolute result path or image event', () => {
  assert.equal(pathFromEvents([{type:'item.completed',item:{type:'agent_message',text:'/tmp/image.png'}}]), '/tmp/image.png');
  assert.equal(pathFromEvents([{item:{type:'imageGeneration',savedPath:'/tmp/generated.png'}}]), '/tmp/generated.png');
  assert.equal(pathFromEvents([{item:{type:'imageGeneration',savedPath:'/tmp/generated.png'}},{type:'item.completed',item:{type:'agent_message',text:'/wrong/work/generated.png'}}]), '/tmp/generated.png');
  assert.equal(pathFromEvents([{type:'item.completed',item:{type:'agent_message',text:'Here: /tmp/image.png'}}]), null);
  assert.equal(pathFromEvents([{type:'item.completed',item:{type:'agent_message',text:'../image.png'}}]), null);
});

test('quota output recovers the exact work-prefixed image while rejecting stale, missing and escaped files', async () => {
  const dir = await mkdtemp(join(tmpdir(),'quota-image-'));
  const generatedRoot = join(dir,'generated_images'), cwd = join(dir,'work','job-1');
  const folder = join(generatedRoot,'thread-1');
  await mkdir(folder,{recursive:true});
  const actual = join(folder,'exec-image.png');
  await writeFile(actual,png);
  const options = {cwd,started:Date.now(),generatedRoot};
  assert.deepEqual(await readQuotaImage(actual,options),png);
  assert.deepEqual(await readQuotaImage(join(cwd,'generated_images','thread-1','exec-image.png'),options),png);
  await assert.rejects(readQuotaImage(join(cwd,'generated_images','thread-1','missing.png'),options),/未找到对应文件/);
  const outside = join(dir,'outside.png');
  await writeFile(outside,png);
  await assert.rejects(readQuotaImage(outside,options),/生成目录之外/);
  await symlink(outside,join(folder,'escape.png'));
  await assert.rejects(readQuotaImage(join(cwd,'generated_images','thread-1','escape.png'),options),/生成目录之外/);
  await assert.rejects(readQuotaImage(`${cwd}/generated_images/thread-1/../exec-image.png`,options),/无效的图片路径/);
  await utimes(actual,1,1);
  await assert.rejects(readQuotaImage(actual,options),/本次生成的新图片/);
});

test('missing CLI paths recover only one fresh image from the exact session, never blocked or ambiguous output', async () => {
  const generatedRoot = await mkdtemp(join(tmpdir(),'quota-session-'));
  const thread = randomUUID(), folder = join(generatedRoot,thread);
  await mkdir(folder);
  const events = [{type:'thread.started',thread_id:thread}], options = {started:Date.now(),generatedRoot};
  assert.equal(await pathFromThread(events,options),null);
  const other = join(generatedRoot,randomUUID()); await mkdir(other); await writeFile(join(other,'exec-other.png'),png);
  assert.equal(await pathFromThread(events,options),null);
  const image = join(folder,'exec-image.png'); await writeFile(image,png);
  assert.equal(await pathFromThread(events,options),image);
  assert.equal(await pathFromThread([...events,{item:{text:'moderation_blocked'}}],options),null);
  assert.equal(await pathFromThread([{type:'thread.started',thread_id:'../../private'}],options),null);
  const second = join(folder,'exec-second.png'); await writeFile(second,png);
  assert.equal(await pathFromThread(events,options),null);
  await utimes(second,1,1);
  assert.equal(await pathFromThread(events,options),image);
  await utimes(image,1,1);
  assert.equal(await pathFromThread(events,options),null);
});

test('upload rejects executable formats, oversized data and cross-category reuse', async () => {
  assert.throws(() => imageType(Buffer.from('<svg onload="alert(1)">')));
  await assert.rejects(saveUpload('pose',Buffer.alloc(20*1024*1024+1),'bad.png'));
  const uploaded = await saveUpload('face',png,'<b>my-face</b>.png');
  assert.equal(uploaded.category,'我的上传');
  assert.deepEqual(await readFile(await assetPath('face',uploaded.id)),png);
  await assert.rejects(findAsset('pose',uploaded.id));
  await assert.rejects(boundedBytes(new Response(Buffer.alloc(10)),5));
});

test('API sends three ordered image files and redacts credentials from provider errors', async () => {
  const paths = [];
  for (const kind of ['pose','costume','face']) { const item = await saveUpload(kind,png,`${kind}.png`); paths.push(await assetPath(kind,item.id)); }
  const job = validateRequest(apiRequest);
  const result = await generateAPI(job,paths,apiKey,()=>{}, { fetcher: async (url,options) => {
    assert.equal(url,'https://image-provider.example/v1/images/edits');
    assert.equal(options.headers.Authorization,`Bearer ${apiKey}`);
    assert.deepEqual(options.body.getAll('image[]').map(f=>f.name),['1-pose.png','2-costume.png','3-face.png']);
    assert.equal(options.body.get('n'),'1'); assert.equal(options.body.get('model'),'gpt-image-2');
    assert.equal(options.body.has('input_fidelity'),false);
    assert.equal(options.redirect,'error');
    return Response.json({data:[{b64_json:png.toString('base64')}],usage:{total_tokens:1}});
  }});
  assert.deepEqual(result.bytes,png);
  await assert.rejects(generateAPI(job,paths,apiKey,()=>{}, { fetcher:async()=>Response.json({error:{message:`bad ${apiKey}`}},{status:401}) }), e=>e.message.includes('[密钥已隐藏]')&&!e.message.includes(apiKey));
  await assert.rejects(generateAPI(job,paths,apiKey,()=>{}, { fetcher:async()=>Response.json({data:[]}) }), /未返回/);
});

test('HTTP workflow: origin guard, upload, idempotency, single-flight, real output download, no key persistence', async () => {
  const realFetch = globalThis.fetch;
  const server = await createServer();
  await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  let release, calls = 0;
  globalThis.fetch = async (url, options) => {
    if (String(url).startsWith('https://image-provider.example/')) {
      calls++;
      await new Promise(resolve => { release = resolve; });
      return Response.json({data:[{b64_json:png.toString('base64')}]});
    }
    return realFetch(url,options);
  };
  try {
    assert.equal((await realFetch(`${base}/api/jobs`,{headers:{Origin:'https://evil.example'}})).status,403);
    assert.equal((await realFetch(`${base}/api/jobs`,{method:'POST',body:'{}'})).status,403);
    assert.equal((await realFetch(`${base}/.env`)).status,404);
    const bootstrap = await (await realFetch(`${base}/api/bootstrap`)).json();
    assert.ok(bootstrap.csrf); assert.equal(bootstrap.catalogs.pose.filter(item=>!item.id.startsWith('upload-')).length,CATALOG.pose.length);
    for (const kind of ['pose','costume','face']) {
      const galleryImage = await realFetch(`${base}/assets/${kind}/${request.selections[kind]}`);
      assert.equal(galleryImage.status,200);
      assert.equal(galleryImage.headers.get('content-type'),'image/png');
      const id = `local-baiyi-01-${kind}`;
      assert.ok(bootstrap.catalogs[kind].some(x=>x.id===id));
      for (const suffix of ['', '?thumb=1']) {
        const image = await realFetch(`${base}/assets/${kind}/${id}${suffix}`);
        assert.equal(image.status,200);
        assert.equal(image.headers.get('content-type'),'image/png');
        assert.deepEqual(Buffer.from(await image.arrayBuffer()),await readFile(await assetPath(kind,id)));
      }
    }
    const headers = {'X-Studio-Token':bootstrap.csrf};
    const selections = {};
    for (const kind of ['pose','costume','face']) {
      const response = await realFetch(`${base}/api/uploads/${kind}`,{method:'POST',headers,body:png});
      assert.equal(response.status,201); selections[kind] = (await response.json()).id;
    }
    const id = randomUUID(), payload = {...apiRequest,selections};
    const submit = (taskID, changes = {}) => realFetch(`${base}/api/jobs`,{method:'POST',headers:{...headers,'Content-Type':'application/json','Idempotency-Key':taskID},body:JSON.stringify({...payload,...changes})});
    assert.equal((await submit(id)).status,202);
    assert.equal((await submit(id)).status,200);
    assert.equal((await submit(id,{style:'anime'})).status,409);
    assert.equal((await submit(randomUUID())).status,200); // Identical active work is reused.
    for (let i=0;i<100&&!release;i++) await new Promise(r=>setTimeout(r,10));
    assert.equal(calls,1); release();
    let job;
    for (let i=0;i<100;i++) { job = await (await realFetch(`${base}/api/jobs/${id}`)).json(); if(job.status==='completed') break; await new Promise(r=>setTimeout(r,20)); }
    assert.equal(job.status,'completed'); assert.equal(JSON.stringify(job).includes(apiKey),false);
    assert.equal(job.references.length,3);
    const output = await realFetch(`${base}${job.imageURL}?download=1`);
    assert.equal(output.headers.get('content-type'),'image/png');
    assert.match(output.headers.get('content-disposition'),/attachment/);
    assert.deepEqual(Buffer.from(await output.arrayBuffer()),png);
    const stored = await readFile(join(process.env.STUDIO_DATA_DIR,'jobs',id,'job.json'),'utf8');
    assert.equal(stored.includes(apiKey),false);
    const reusedResponse = await submit(randomUUID());
    assert.equal(reusedResponse.status,200);
    const reused = await reusedResponse.json();
    assert.equal(reused.id,id); assert.equal(reused.reused,true); assert.equal(calls,1);
    const regeneratedID = randomUUID(); release = null;
    assert.equal((await submit(regeneratedID,{regenerate:true})).status,202);
    for (let i=0;i<100&&!release;i++) await new Promise(r=>setTimeout(r,10));
    assert.equal(calls,2); release();
    let regenerated;
    for (let i=0;i<100;i++) { regenerated=await (await realFetch(`${base}/api/jobs/${regeneratedID}`)).json(); if(regenerated.status==='completed') break; await new Promise(r=>setTimeout(r,20)); }
    assert.equal(regenerated.status,'completed');
    await unlink(join(process.env.STUDIO_DATA_DIR,'jobs',id,job.output));
    await unlink(join(process.env.STUDIO_DATA_DIR,'jobs',regeneratedID,regenerated.output));
    const missing = await submit(randomUUID());
    assert.equal(missing.status,400); assert.match((await missing.json()).error,/图片文件缺失/); assert.equal(calls,2);
    assert.equal((await realFetch(`${base}/api/jobs/${randomUUID()}`)).status,404);
    assert.equal((await realFetch(`${base}/assets/pose/unknown`)).status,400);
  } finally {
    globalThis.fetch = realFetch;
    await new Promise(resolve=>server.close(resolve));
  }
});

test('each changed generation setting creates a separate image and only exact requests reuse it', async () => {
  const realFetch=globalThis.fetch, forms=[];
  const server=await createServer(); await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base=`http://127.0.0.1:${server.address().port}`;
  globalThis.fetch=async(url,options)=> {
    if(['https://image-provider.example/','https://another.example/'].some(host=>String(url).startsWith(host))) {
      forms.push(options.body); return Response.json({data:[{b64_json:png.toString('base64')}]});
    }
    return realFetch(url,options);
  };
  try {
    const {csrf}=await(await realFetch(`${base}/api/bootstrap`)).json();
    const original={...apiRequest,prompt:`配置匹配测试 ${randomUUID()}`};
    const variants=[{}, {outputType:'character-sheet'}, {style:'anime'}, {style:'illustration'}, {background:'white'}, {size:'1024x1024'}, {quality:'high'}, {prompt:original.prompt+' '}, {selections:{...original.selections,costume:'SPR-0004'}}, {selections:{...original.selections,face:'local-baiyi-01-face'}}, {selections:{...original.selections,pose:'full_sexy_P001_high'}}, {characters:[{...charactersFor(original)[0],position:'中央'}]}, {characters:[{...charactersFor(original)[0],gender:'female'}]}, {model:'another-model'}, {baseURL:'https://another.example/v1'}];
    const submit=(payload,id=randomUUID())=>realFetch(`${base}/api/jobs`,{method:'POST',headers:{'Content-Type':'application/json','X-Studio-Token':csrf,'Idempotency-Key':id},body:JSON.stringify(payload)});
    for(const [index,change] of variants.entries()) {
      const payload={...original,...change},id=randomUUID(),response=await submit(payload,id);
      assert.equal(response.status,202,JSON.stringify(change));
      let job;
      for(let i=0;i<100;i++) {job=await(await realFetch(`${base}/api/jobs/${id}`)).json();if(job.status==='completed')break;await new Promise(resolve=>setTimeout(resolve,10));}
      assert.equal(job.status,'completed'); assert.equal(forms.length,index+1);
      const retryID=randomUUID(); let again;
      for(let i=0;i<100;i++) {again=await submit(payload,retryID);if(again.status!==409)break;await new Promise(resolve=>setTimeout(resolve,10));}
      assert.equal(again.status,200,JSON.stringify(change)); assert.equal((await again.json()).id,id); assert.equal(forms.length,index+1);
      assert.equal((await submit({...payload,quality:payload.quality==='high'?'low':'high'},id)).status,409);
      if(payload.style==='anime') assert.match(forms.at(-1).get('prompt'),/赛璐璐/);
      assert.equal(job.outputType,payload.outputType || 'image');
      if(payload.outputType==='character-sheet') assert.match(forms.at(-1).get('prompt'),/全身多视角/);
    }
  } finally {globalThis.fetch=realFetch;await new Promise(resolve=>server.close(resolve));}
});

test('extraction saves partial results, resumes only missing parts, imports idempotently and survives reopening', async () => {
  const realFetch = globalThis.fetch;
  let server = await createServer();
  await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  let base = `http://127.0.0.1:${server.address().port}`;
  let calls = 0, release, resumeRelease;
  const bodies = [];
  globalThis.fetch = async (url, options) => {
    if (!String(url).startsWith('https://image-provider.example/')) return realFetch(url,options);
    calls++; bodies.push(options.body);
    if (calls === 1) await new Promise(resolve => { release = resolve; });
    if (calls === 2) return Response.json({error:{message:'模拟衣服生成失败'}},{status:400});
    if (calls === 3) await new Promise(resolve => { resumeRelease = resolve; });
    return Response.json({data:[{b64_json:png.toString('base64')}]});
  };
  try {
    const bootstrap = await (await realFetch(`${base}/api/bootstrap`)).json();
    const headers = {'X-Studio-Token':bootstrap.csrf,'Content-Type':'application/json'};
    const uploaded = await realFetch(`${base}/api/uploads/source`,{method:'POST',headers,body:png});
    assert.equal(uploaded.status,201);
    const source = await uploaded.json(), id = randomUUID();
    const payload = {...apiRequest,sourceId:source.id,title:'拆解测试',prompt:'保留刺绣',inferHidden:true};
    const post = (path,body,key=randomUUID()) => realFetch(`${base}${path}`,{method:'POST',headers:{...headers,'Idempotency-Key':key},body:JSON.stringify(body)});
    assert.equal((await post('/api/extractions',payload,id)).status,202);
    assert.equal((await post('/api/extractions',payload,id)).status,200);
    const waiting = await (await post('/api/jobs',apiRequest)).json();
    assert.equal(waiting.status,'queued');
    assert.equal((await post(`/api/jobs/${waiting.id}/cancel`,{})).status,200);
    for(let i=0;i<100&&!release;i++) await new Promise(resolve=>setTimeout(resolve,10));
    assert.equal(calls,1); release();
    const waitFor = async status => {
      for(let i=0;i<100;i++) {
        const job=await (await realFetch(`${base}/api/jobs/${id}`)).json();
        if(job.status===status) return job;
        await new Promise(resolve=>setTimeout(resolve,20));
      }
      assert.fail(`task never reached ${status}`);
    };
    let job = await waitFor('failed');
    assert.deepEqual(Object.keys(job.outputs),['pose']); assert.equal(calls,2);
    assert.equal((await realFetch(`${base}/api/jobs`)).status,200);
    assert.equal((await (await realFetch(`${base}/api/jobs`)).json()).some(item=>item.id===id),false);
    assert.equal((await (await realFetch(`${base}/api/extractions`)).json()).some(item=>item.id===id),true);
    assert.deepEqual(Buffer.from(await (await realFetch(`${base}/api/extractions/${id}/image/source`)).arrayBuffer()),png);
    const poseImage = await realFetch(`${base}${job.outputs.pose.imageURL}?download=1`);
    assert.equal(poseImage.status,200); assert.match(poseImage.headers.get('content-disposition'),/attachment/);
    assert.deepEqual(Buffer.from(await poseImage.arrayBuffer()),png);
    assert.equal((await realFetch(`${base}/api/extractions/${id}/image/costume`)).status,404);
    assert.equal((await post(`/api/extractions/${id}/import`,{kinds:['costume'],title:'测试'})).status,400);
    assert.equal((await post(`/api/extractions/${id}/import`,{kinds:['../../private'],title:'测试'})).status,400);
    const firstImport = await (await post(`/api/extractions/${id}/import`,{kinds:['pose'],title:'测试资源'})).json();
    const secondImport = await (await post(`/api/extractions/${id}/import`,{kinds:['pose'],title:'测试资源'})).json();
    assert.equal(firstImport[0].id,secondImport[0].id); assert.equal((await listResources()).length,1);
    await assert.rejects(findAsset('face',firstImport[0].id));
    assert.equal((await post(`/api/extractions/${id}/resume`,{})).status,400);
    let finishSlowBody;
    const halfReceived = new Promise(resolve => server.on('request', req => { if (req.headers['x-slow-test']) req.once('data', resolve); }));
    const slowBody = new ReadableStream({ start(controller) { finishSlowBody = controller; controller.enqueue(Buffer.from('{')); } });
    const slowResume = realFetch(`${base}/api/extractions/${id}/resume`, { method:'POST', headers:{...headers,'x-slow-test':'1'}, body:slowBody, duplex:'half' });
    await halfReceived;
    assert.equal((await post(`/api/extractions/${id}/resume`,{apiKey})).status,202);
    for(let i=0;i<100&&!resumeRelease;i++) await new Promise(resolve=>setTimeout(resolve,10));
    assert.ok(resumeRelease); assert.equal(calls,3);
    finishSlowBody.enqueue(Buffer.from(JSON.stringify({apiKey}).slice(1))); finishSlowBody.close();
    assert.equal((await slowResume).status,200); assert.equal(calls,3);
    resumeRelease();
    job = await waitFor('completed');
    assert.equal(calls,4); assert.deepEqual(Object.keys(job.outputs),['pose','costume','face']);
    assert.equal((await post(`/api/extractions/${id}/resume`,{apiKey})).status,200); assert.equal(calls,4);
    const reused = await (await post('/api/extractions',payload)).json();
    assert.equal(reused.id,id); assert.equal(reused.reused,true); assert.equal(calls,4);
    const imported = await (await post(`/api/extractions/${id}/import`,{kinds:['pose','costume','face'],title:'审核通过'})).json();
    assert.equal(imported.length,3); assert.equal((await listResources()).length,3);
    for(const resource of imported) {
      const image = await realFetch(`${base}/assets/${resource.kind}/${resource.id}`);
      assert.equal(image.status,200); assert.deepEqual(Buffer.from(await image.arrayBuffer()),png);
      assert.equal((await findAsset(resource.kind,resource.id)).category,'我的资源');
    }
    assert.deepEqual(bodies[0].getAll('image[]').map(file=>file.name),['1-source.png','2-pose-style.png']);
    assert.match(bodies[0].get('prompt'),/图2只提供用户现有骨架库/);
    assert.deepEqual(bodies[2].getAll('image[]').map(file=>file.name),['1-source.png']);
    assert.equal(bodies[2].get('background'),'transparent'); assert.equal(bodies[3].get('size'),'1024x1024');
    const stored = await readFile(join(process.env.STUDIO_DATA_DIR,'jobs',id,'job.json'),'utf8');
    assert.equal(stored.includes(apiKey),false);
    const rebuilt = await (await realFetch(`${base}/api/bootstrap`)).json();
    for(const resource of imported) assert.ok(rebuilt.catalogs[resource.kind].some(item=>item.id===resource.id));
    const composed = await post('/api/jobs',{...apiRequest,selections:Object.fromEntries(imported.map(item=>[item.kind,item.id]))});
    assert.equal(composed.status,202);
    const composition = await composed.json();
    for(let i=0;i<100;i++) { const result=await(await realFetch(`${base}/api/jobs/${composition.id}`)).json(); if(result.status==='completed') break; await new Promise(resolve=>setTimeout(resolve,20)); }
    assert.equal((await(await realFetch(`${base}/api/jobs/${composition.id}`)).json()).status,'completed'); assert.equal(calls,5);
    await new Promise(resolve=>server.close(resolve));
    server = await createServer(); await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
    base = `http://127.0.0.1:${server.address().port}`;
    const reopened = await(await realFetch(`${base}/api/bootstrap`)).json();
    for(const resource of imported) assert.ok(reopened.catalogs[resource.kind].some(item=>item.id===resource.id));
    assert.equal((await(await realFetch(`${base}/api/jobs/${id}`)).json()).status,'completed');
  } finally {
    globalThis.fetch = realFetch;
    await new Promise(resolve=>server.close(resolve));
  }
});

test('multi-character HTTP generation rejects body/face mismatches before spending and sends all references', async () => {
  const realFetch=globalThis.fetch, server=await createServer();
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base=`http://127.0.0.1:${server.address().port}`, forms=[];
  globalThis.fetch=async(url,options)=>{
    if(!String(url).startsWith('https://image-provider.example/')) return realFetch(url,options);
    forms.push(options.body); return Response.json({data:[{b64_json:png.toString('base64')}]});
  };
  try {
    const {csrf}=await(await realFetch(`${base}/api/bootstrap`)).json();
    const submit=payload=>realFetch(`${base}/api/jobs`,{method:'POST',headers:{'X-Studio-Token':csrf,'Content-Type':'application/json','Idempotency-Key':randomUUID()},body:JSON.stringify({...apiRequest,...payload})});
    const wait=async id=>{for(let i=0;i<100;i++){const job=await(await realFetch(`${base}/api/jobs/${id}`)).json();if(!['queued','running'].includes(job.status))return job;await new Promise(resolve=>setTimeout(resolve,10));}assert.fail('unfinished');};
    const mismatched=await submit({selections:{pose:'local-male-P018-front'},characters:[{...pairCharacters[0],gender:'male'}]});
    assert.equal(mismatched.status,400); assert.match((await mismatched.json()).error,/不匹配/); assert.equal(forms.length,0);
    const missingPerson=await submit({selections:{...request.selections,pose:'pair60_P001_front'}});
    assert.equal(missingPerson.status,400); assert.equal(forms.length,0);
    const crossdress=await submit({prompt:'反串验证',selections:{pose:'local-male-P018-front'},characters:[{...pairCharacters[1],costume:'SPR-0161',position:''}]});
    assert.equal(crossdress.status,202); assert.equal((await wait((await crossdress.json()).id)).status,'completed');
    const payload={prompt:'双人顺序验证',selections:{pose:'pair60_P001_front'},characters:pairCharacters};
    const pair=await submit(payload); assert.equal(pair.status,202);
    const job=await wait((await pair.json()).id); assert.equal(job.status,'completed'); assert.equal(job.references.length,5);
    assert.deepEqual(forms[1].getAll('image[]').map(file=>file.name),['1-pose.png','2-costume.png','3-face.png','4-costume.png','5-face.png']);
    for(const [index,slot] of referenceSlots(job).entries()) assert.deepEqual(Buffer.from(await forms[1].getAll('image[]')[index].arrayBuffer()),await readFile(await assetPath(slot.kind,slot.id)));
    assert.equal((await(await submit(payload)).json()).reused,true); assert.equal(forms.length,2);
    const uploaded=await saveUpload('pose',png,'三人自定义骨架');
    const three=await submit({prompt:'三人顺序验证',selections:{pose:uploaded.id},characters:[...pairCharacters,{...pairCharacters[1],face:'local-male-modern-face',position:'后排人物'}]});
    assert.equal(three.status,202); assert.equal((await wait((await three.json()).id)).status,'completed'); assert.equal(forms[2].getAll('image[]').length,7);
  } finally { globalThis.fetch=realFetch; await new Promise(resolve=>server.close(resolve)); }
});

test('multi-person extraction preserves per-person outputs on failure, resumes and imports distinct reusable resources', async () => {
  const realFetch=globalThis.fetch,server=await createServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base=`http://127.0.0.1:${server.address().port}`;let calls=0;
  globalThis.fetch=async(url,options)=>{
    if(!String(url).startsWith('https://image-provider.example/')) return realFetch(url,options);
    calls++;if(calls===4)return Response.json({error:{message:'模拟角色二衣服失败'}},{status:400});
    return Response.json({data:[{b64_json:png.toString('base64')}]});
  };
  try {
    const {csrf}=await(await realFetch(`${base}/api/bootstrap`)).json(),headers={'X-Studio-Token':csrf,'Content-Type':'application/json'};
    const post=(path,data)=>realFetch(`${base}${path}`,{method:'POST',headers:{...headers,'Idempotency-Key':randomUUID()},body:JSON.stringify(data)});
    const source=await saveUpload('source',png,'双人源照片');
    const subjects=[{position:'画面左侧',gender:'male'},{position:'画面右侧',gender:'female'}];
    const response=await post('/api/extractions',{...apiRequest,sourceId:source.id,title:'双人拆解',inferHidden:true,subjects});assert.equal(response.status,202);const {id}=await response.json();
    const wait=async status=>{for(let i=0;i<100;i++){const job=await(await realFetch(`${base}/api/jobs/${id}`)).json();if(job.status===status)return job;await new Promise(resolve=>setTimeout(resolve,10));}assert.fail('unfinished');};
    let job=await wait('failed');assert.deepEqual(Object.keys(job.outputs),['pose','costume-1','face-1']);assert.equal(calls,4);
    assert.equal((await post(`/api/extractions/${id}/resume`,{apiKey})).status,202);
    job=await wait('completed');assert.equal(calls,6);assert.equal(Object.keys(job.outputs).length,5);
    const keys=extractionParts(job).map(part=>part.key);
    const imported=await(await post(`/api/extractions/${id}/import`,{kinds:keys,title:'双人反串',costumeGender:'female'})).json();
    assert.equal(imported.length,5);assert.equal(new Set(imported.map(item=>item.id)).size,5);
    const pose=imported.find(item=>item.kind==='pose');assert.equal(pose.personCount,2);assert.deepEqual(pose.roleGenders,['male','female']);
    for(const item of imported.filter(item=>item.kind==='costume'))assert.equal(item.gender,'female');
    for(const [index,gender] of ['male','female'].entries())assert.equal(imported.find(item=>item.kind==='face'&&item.characterIndex===index).gender,gender);
    for(const item of imported){assert.equal((await realFetch(`${base}/assets/${item.kind}/${item.id}`)).status,200);assert.equal((await findAsset(item.kind,item.id)).characterIndex,item.characterIndex);}
    const repeat=await(await post(`/api/extractions/${id}/import`,{kinds:keys,title:'双人反串',costumeGender:'female'})).json();assert.deepEqual(repeat.map(item=>item.id),imported.map(item=>item.id));assert.equal(calls,6);
    const characters=subjects.map((subject,index)=>({...subject,...Object.fromEntries(imported.filter(item=>item.characterIndex===index).map(item=>[item.kind,item.id]))}));
    const composition=await post('/api/jobs',{...apiRequest,selections:{pose:pose.id},characters});assert.equal(composition.status,202);const compositionID=(await composition.json()).id;
    for(let i=0;i<100;i++){const job=await(await realFetch(`${base}/api/jobs/${compositionID}`)).json();if(job.status==='completed')break;await new Promise(resolve=>setTimeout(resolve,10));}
    assert.equal((await(await realFetch(`${base}/api/jobs/${compositionID}`)).json()).status,'completed');assert.equal(calls,7);
  } finally {globalThis.fetch=realFetch;await new Promise(resolve=>server.close(resolve));}
});

test('scene resources validate text/image input, effects and reference layers without changing legacy matching', async () => {
  const {EFFECTS}=await import('../public/effects.js');
  const {isSceneJob}=await import('../public/job-settings.js');
  const base={...apiRequest,outputType:'background',title:'林间空地',prompt:'晨雾与开阔地面',background:'opaque',effect:'window-light'};
  const scene=validateRequest(base);
  assert.ok(isSceneJob(scene));assert.deepEqual(scene.characters,[]);assert.deepEqual(referenceSlots(scene),[]);
  assert.match(buildPrompt(scene),/完整的不透明环境背景/);assert.match(buildPrompt(scene),/柔和窗光/);
  assert.equal(scene.effectRevision,2);
  const sourceId=`upload-${randomUUID()}`;
  const foreground=validateRequest({...base,outputType:'foreground',background:'transparent',prompt:'',sourceId});
  assert.deepEqual(referenceSlots(foreground),[{kind:'source',id:sourceId}]);
  assert.match(buildPrompt(foreground),/真正的透明底 PNG/);
  for(const change of [{title:''},{title:'x'.repeat(81)},{prompt:'',sourceId:''},{sourceId:'../../private'},{background:'transparent'},{effect:'unknown'},{effect:null},{effect:'woodblock',style:'photo'}])assert.throws(()=>validateRequest({...base,...change}));
  assert.equal(validateRequest({...base,effect:'woodblock',style:'woodblock'}).effect,'woodblock');
  const withLayers=validateRequest({...request,selections:{...request.selections,background:'bg-1',foreground:'fg-1'},effect:'neon-night',style:'cinematic'});
  assert.deepEqual(referenceSlots(withLayers).map(ref=>ref.kind),['pose','costume','face','background','foreground']);
  const prompt=buildPrompt(withLayers);assert.match(prompt,/根据 5 张参考图/);assert.match(prompt,/图4定义人物后方/);assert.match(prompt,/图5定义镜头前方/);
  assert.match(buildPrompt({...withLayers,outputType:'character-sheet'}),/背景与前景用于姿势还原分区/);
  assert.throws(()=>validateRequest({...withLayers,background:'transparent'}),/透明底/);
  assert.equal(settingsKey(request),settingsKey({...request,effect:'none',effectRevision:0}));
  for(const change of [{effect:'dramatic-light',effectRevision:1},{selections:{...request.selections,background:'bg-1'}},{selections:{...request.selections,foreground:'fg-1'}}])assert.notEqual(settingsKey(request),settingsKey({...request,...change}));
  for(const change of [{sourceId},{title:'另一名称'},{effect:'neon-night',style:'cinematic'},{effectRevision:3},{outputType:'foreground',background:'transparent'}])assert.notEqual(settingsKey(scene),settingsKey({...scene,...change}));
  assert.equal(matchesHistory({...scene,status:'completed',imageURL:'/test',createdAt:new Date().toISOString()},{people:'0',outputType:'background',effect:'window-light'}),true);
  assert.equal(matchesHistory({...scene,status:'completed',imageURL:'/test',createdAt:new Date().toISOString()},{people:'1'}),false);
  assert.equal(EFFECTS.length,117);assert.equal(new Set(EFFECTS.map(effect=>effect.id)).size,117);
  for(const effect of EFFECTS){assert.match(effect.source.path,/\/(style|SKILL)\.md$/);assert.ok((await readFile(join(ROOT,'data/effect-sources',`${effect.id}.md`),'utf8')).length>100);}
});

test('the scene light stays in world space as the camera moves', () => {
  const image = {...validateRequest({...request,selections:{...request.selections,background:'beach'}}),sceneLight:'left',references:[{kind:'pose',angle:'正面'}]};
  assert.match(buildPrompt(image), /从接触点伸向画面右侧/);
  assert.match(buildPrompt({...image,cameraDirection:'back'}), /从接触点伸向画面左侧/);
  assert.match(buildPrompt({...image,cameraDirection:'side-left'}), /从接触点伸向靠近镜头/);
  assert.match(buildPrompt({...image,cameraDirection:'side-left',cameraPitch:'overhead'}), /从接触点伸向画面下方/);
  assert.match(buildPrompt({...image,references:[],cameraDirection:'back'}), /原视角方位不明确/);
  assert.match(buildPrompt({...image,sceneLight:'diffuse'}), /柔和漫射光/);
  assert.doesNotMatch(buildPrompt(image), /真实棚拍摄影/);
  assert.notEqual(settingsKey(image),settingsKey({...image,sceneLight:'right'}));
  assert.equal(settingsKey({...image,sceneLight:undefined}),settingsKey({...image,sceneLight:'auto'}));
  assert.throws(()=>validateRequest({...request,sceneLight:'left'}), /主光/);
  assert.throws(()=>validateRequest({...request,outputType:'background',sceneLight:'invalid'}), /主光/);
});

test('text-only API uses generations JSON while image references use edits with original bytes', async () => {
  const scene=validateRequest({...apiRequest,outputType:'foreground',background:'transparent',title:'花枝',prompt:'近景花枝',effect:'minimal-ink',style:'ink'});
  await generateAPI(scene,[],apiKey,()=>{},{fetcher:async(url,options)=>{
    assert.equal(url,'https://image-provider.example/v1/images/generations');assert.equal(options.redirect,'error');assert.equal(options.headers['Content-Type'],'application/json');
    const payload=JSON.parse(options.body);assert.equal(payload.background,'transparent');assert.equal(payload.output_format,'png');assert.equal(payload.n,1);assert.match(payload.prompt,/写意留白水墨/);
    return Response.json({data:[{b64_json:png.toString('base64')}]});
  }});
  const source=await saveUpload('source',png,'scene.png'),job={...scene,sourceId:source.id};
  await generateAPI(job,[await assetPath('source',source.id)],apiKey,()=>{},{fetcher:async(url,options)=>{
    assert.equal(url,'https://image-provider.example/v1/images/edits');assert.equal(options.headers['Content-Type'],undefined);assert.equal(options.body.getAll('image[]').length,1);assert.equal(options.body.get('image[]').name,'1-source.png');
    assert.deepEqual(Buffer.from(await options.body.get('image[]').arrayBuffer()),png);return Response.json({data:[{b64_json:png.toString('base64')}]});
  }});
});

test('background and foreground create, import, compose, filter and reload without extra model calls', async () => {
  const realFetch=globalThis.fetch,calls=[];
  let server=await createServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));let base=`http://127.0.0.1:${server.address().port}`;
  globalThis.fetch=async(url,options)=>{
    if(String(url).startsWith('https://scene-provider.example/')){calls.push({url:String(url),body:options.body});return Response.json({data:[{b64_json:png.toString('base64')}]});}
    return realFetch(url,options);
  };
  try{
    let {csrf}=await(await realFetch(`${base}/api/bootstrap`)).json();
    const post=(path,payload,id=randomUUID())=>realFetch(base+path,{method:'POST',headers:{'X-Studio-Token':csrf,'Idempotency-Key':id,'Content-Type':'application/json'},body:JSON.stringify(payload)});
    const wait=async id=>{for(let i=0;i<100;i++){const job=await(await realFetch(`${base}/api/jobs/${id}`)).json();if(['completed','failed'].includes(job.status)){await new Promise(resolve=>setTimeout(resolve,15));return job;}await new Promise(resolve=>setTimeout(resolve,10));}throw new Error('mock task did not finish');};
    const payload={...apiRequest,baseURL:'https://scene-provider.example/v1',outputType:'background',title:'场景测试 '+randomUUID(),prompt:'草地',background:'opaque',effect:'window-light',sceneLight:'right'};
    const id=randomUUID();assert.equal((await post('/api/jobs',payload,id)).status,202);const job=await wait(id);assert.equal(job.status,'completed');assert.equal(calls.length,1);assert.ok(calls[0].url.endsWith('/generations'));
    assert.equal((await post('/api/jobs',{...payload,effect:'neon-night',style:'cinematic'},id)).status,409);assert.equal(calls.length,1);
    const reused=await post('/api/jobs',payload);assert.equal((await reused.json()).id,id);assert.equal(calls.length,1);
    const background=await(await post(`/api/jobs/${id}/import`,{title:'背景资源'})).json();assert.equal(background.kind,'background');assert.ok(background.id.startsWith('resource-'));
    assert.equal(background.sceneLight,'right');
    assert.equal((await post('/api/jobs',{...payload,sceneLight:'left'},id)).status,409);
    assert.equal((await(await post(`/api/jobs/${id}/import`,{title:'背景资源'})).json()).id,background.id);assert.equal(calls.length,1);
    const source=await saveUpload('source',png,'image-reference.png');
    const fgID=randomUUID(),fgPayload={...payload,sceneLight:undefined,title:'前景测试',outputType:'foreground',background:'transparent',sourceId:source.id,prompt:'花枝'};
    assert.equal((await post('/api/jobs',fgPayload,fgID)).status,202);assert.equal((await wait(fgID)).status,'completed');assert.ok(calls[1].url.endsWith('/edits'));assert.equal(calls[1].body.getAll('image[]').length,1);
    const foreground=await(await post(`/api/jobs/${fgID}/import`,{title:'前景资源'})).json();assert.equal(foreground.kind,'foreground');
    const composition={...apiRequest,baseURL:payload.baseURL,prompt:'场景组合 '+randomUUID(),effect:'neon-night',style:'cinematic',selections:{...apiRequest.selections,background:background.id,foreground:foreground.id}};
    const before=calls.length;assert.equal((await post('/api/jobs',{...composition,selections:{...composition.selections,background:foreground.id}})).status,400);assert.equal(calls.length,before);
    const composedID=randomUUID();assert.equal((await post('/api/jobs',composition,composedID)).status,202);const composed=await wait(composedID);assert.equal(composed.status,'completed');assert.equal(calls.at(-1).body.getAll('image[]').length,5);assert.match(composed.resolvedPrompt,/图4定义人物后方/);assert.match(composed.resolvedPrompt,/图5定义镜头前方/);
    assert.equal(composed.sceneLight,'right');assert.match(calls.at(-1).body.get('prompt'),/从接触点伸向画面左侧/);
    const beforeRepeat=calls.length;assert.equal((await(await post('/api/jobs',composition)).json()).id,composedID);assert.equal(calls.length,beforeRepeat);
    const batch=await(await post('/api/batches',{mode:'wardrobe',poses:[composed.selections.pose],costumes:[composed.characters[0].costume],faces:[composed.characters[0].face],settings:{...composition,characters:composed.characters}})).json();
    assert.deepEqual(batch.items.map(item=>[item.id,item.sceneLight]),[[composedID,'right']]);assert.equal(calls.length,beforeRepeat);
    assert.equal((await post(`/api/jobs/${composedID}/import`,{title:'错误入库'})).status,400);
    assert.equal(JSON.stringify(composed).includes(apiKey),false);assert.equal((await readFile(join(process.env.STUDIO_DATA_DIR,'jobs',id,'job.json'),'utf8')).includes(apiKey),false);
    await new Promise(resolve=>server.close(resolve));server=await createServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));base=`http://127.0.0.1:${server.address().port}`;
    const boot=await(await realFetch(`${base}/api/bootstrap`)).json();csrf=boot.csrf;assert.ok(boot.catalogs.background.some(item=>item.id===background.id));assert.ok(boot.catalogs.foreground.some(item=>item.id===foreground.id));
    for(const item of [background,foreground])assert.deepEqual(Buffer.from(await(await realFetch(`${base}/assets/${item.kind}/${item.id}`)).arrayBuffer()),png);
    const history=await(await realFetch(`${base}/api/jobs`)).json();assert.ok(history.some(item=>item.id===id&&matchesHistory(item,{outputType:'background',effect:'window-light',people:'0'})));
    assert.equal(calls.length,beforeRepeat);
  }finally{globalThis.fetch=realFetch;await new Promise(resolve=>server.close(resolve));}
});

test('each visual medium and distilled preset keeps independent prompts, cache identity and gallery filters', async () => {
  const {STYLE_OPTIONS,EFFECTS}=await import('../public/effects.js');
  assert.equal(STYLE_OPTIONS.length,12);
  const keys=new Set();
  for(const style of STYLE_OPTIONS){
    for(const outputType of ['image','character-sheet','background','foreground']){
      const scene=['background','foreground'].includes(outputType);
      const job=validateRequest({...request,style:style.id,outputType,...(scene?{title:'风格测试',background:outputType==='foreground'?'transparent':'opaque'}:{})});
      const prompt=buildPrompt(job);
      if (style.id === 'photo' && outputType === 'background') {
        assert.match(prompt,/真实环境摄影/);assert.doesNotMatch(prompt,/棚拍/);
      } else assert.ok(prompt.includes(style.prompt));
      assert.match(prompt,/所选画风优先于参考图片/);
      if(['manga','comic','oil','ink','watercolor','woodblock'].includes(style.id))assert.doesNotMatch(prompt,/真实棚拍摄影|真实皮肤和衣料质感|干净浅灰色摄影棚背景/);
      const key=settingsKey(job);assert.equal(keys.has(key),false);keys.add(key);
      const saved={...job,status:'completed',imageURL:'/image',createdAt:'2026-11-01T00:00:00Z'};
      assert.equal(matchesHistory(saved,{style:style.id,outputType}),true);
      assert.equal(matchesHistory(saved,{style:style.id==='photo'?'oil':'photo'}),false);
    }
  }
  for(const preset of EFFECTS){
    assert.ok(STYLE_OPTIONS.some(style=>style.id===preset.medium));
    const job=validateRequest({...request,style:preset.medium,effect:preset.id});
    assert.ok(buildPrompt(job).includes(preset.prompt));
    assert.throws(()=>validateRequest({...request,style:preset.medium==='photo'?'oil':'photo',effect:preset.id}));
  }
});

test('selective extraction rejects empty/unknown kinds, normalizes selection order and preserves legacy full tasks', () => {
  const input={...apiRequest,sourceId:`upload-${randomUUID()}`,title:'选项测试',inferHidden:true};
  const legacy=validateExtraction(input);
  assert.deepEqual(legacy.resourceKinds,['pose','costume','face']);
  assert.equal(extractionKey({...legacy,resourceKinds:undefined}),extractionKey(legacy));
  for(const resourceKinds of [[],null,'face',['unknown'],['face','face'],['pose','costume','face','face'],[{}],[0],['constructor']])assert.throws(()=>validateExtraction({...input,resourceKinds}));
  const face=validateExtraction({...input,resourceKinds:['face']});
  assert.deepEqual(extractionParts(face).map(p=>p.key),['face']);
  assert.throws(()=>extractionTask(face,'pose'));
  assert.throws(()=>extractionTask(face,'costume'));
  assert.notEqual(extractionKey(face),extractionKey(legacy));
  assert.notEqual(extractionKey(face),extractionKey({...face,resourceKinds:['costume']}));
  assert.equal(extractionKey({...face,resourceKinds:['face','costume']}),extractionKey({...face,resourceKinds:['costume','face']}));
  const subjects=[{position:'左边',gender:'female'},{position:'右边',gender:'male'}];
  assert.deepEqual(extractionParts(validateExtraction({...input,subjects,resourceKinds:['face']})).map(p=>p.key),['face-1','face-2']);
  assert.deepEqual(extractionParts(validateExtraction({...input,subjects,resourceKinds:['pose']})).map(p=>p.key),['pose']);
  assert.deepEqual(extractionParts(validateExtraction({...input,subjects,resourceKinds:['face','costume']})).map(p=>p.key),['costume-1','face-1','costume-2','face-2']);
});

test('selected-only extraction makes no unselected calls, resumes selected missing parts, imports and survives restart', async () => {
  const realFetch=globalThis.fetch,calls=[];
  let server=await createServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));let base=`http://127.0.0.1:${server.address().port}`;
  globalThis.fetch=async(url,options)=>{
    if(!String(url).startsWith('https://selective-provider.example/'))return realFetch(url,options);
    calls.push(options.body);
    if(calls.length===4)return Response.json({error:{message:'模拟第二个头像失败'}},{status:400});
    return Response.json({data:[{b64_json:png.toString('base64')}]});
  };
  try{
    let {csrf}=await(await realFetch(`${base}/api/bootstrap`)).json();
    const post=(path,payload,id=randomUUID())=>realFetch(base+path,{method:'POST',headers:{'X-Studio-Token':csrf,'Content-Type':'application/json','Idempotency-Key':id},body:JSON.stringify(payload)});
    const wait=async id=>{for(let i=0;i<150;i++){const job=await(await realFetch(`${base}/api/jobs/${id}`)).json();if(['completed','failed'].includes(job.status)){await new Promise(resolve=>setTimeout(resolve,10));return job;}await new Promise(resolve=>setTimeout(resolve,10));}throw new Error('mock extraction did not finish');};
    const source=await saveUpload('source',png,'selective-source.png');
    const payload={...apiRequest,baseURL:'https://selective-provider.example/v1',sourceId:source.id,title:'选择制作测试',inferHidden:true,resourceKinds:['face']};
    assert.equal((await post('/api/extractions',{...payload,resourceKinds:[]})).status,400);assert.equal(calls.length,0);
    const id=randomUUID();assert.equal((await post('/api/extractions',payload,id)).status,202);
    let job=await wait(id);assert.equal(job.status,'completed');assert.equal(calls.length,1);assert.deepEqual(Object.keys(job.outputs),['face']);assert.deepEqual(job.resourceKinds,['face']);
    assert.deepEqual(calls[0].getAll('image[]').map(file=>file.name),['1-source.png']);
    assert.equal((await post('/api/extractions',{...payload,resourceKinds:['costume']},id)).status,409);
    assert.equal((await(await post('/api/extractions',payload)).json()).id,id);assert.equal(calls.length,1);
    assert.equal((await realFetch(`${base}/api/extractions/${id}/image/pose`)).status,404);
    assert.equal((await post(`/api/extractions/${id}/import`,{kinds:['pose'],title:'不可导入'})).status,400);
    const imported=await(await post(`/api/extractions/${id}/import`,{kinds:['face'],title:'仅头像',gender:'female'})).json();assert.equal(imported.length,1);assert.equal(imported[0].kind,'face');
    const clothes=await(await post('/api/extractions',{...payload,resourceKinds:['costume']})).json();assert.notEqual(clothes.id,id);assert.equal((await wait(clothes.id)).status,'completed');assert.equal(calls.length,2);
    const pairPayload={...payload,subjects:[{position:'左边',gender:'female'},{position:'右边',gender:'male'}]};
    const pair=await(await post('/api/extractions',pairPayload)).json();job=await wait(pair.id);assert.equal(job.status,'failed');assert.deepEqual(Object.keys(job.outputs),['face-1']);assert.equal(calls.length,4);
    await new Promise(resolve=>server.close(resolve));server=await createServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));base=`http://127.0.0.1:${server.address().port}`;({csrf}=await(await realFetch(`${base}/api/bootstrap`)).json());
    job=await(await realFetch(`${base}/api/jobs/${pair.id}`)).json();assert.deepEqual(job.resourceKinds,['face']);
    assert.equal((await post(`/api/extractions/${pair.id}/resume`,{apiKey})).status,202);
    job=await wait(pair.id);assert.equal(job.status,'completed');assert.deepEqual(Object.keys(job.outputs),['face-1','face-2']);assert.equal(calls.length,5);
    assert.match(calls[4].get('prompt'),/只提取角色 2/);
    for(const body of calls){assert.equal(body.getAll('image[]').length,1);assert.doesNotMatch(body.get('prompt'),/图2只提供/);}
    const pairImport=await(await post(`/api/extractions/${pair.id}/import`,{kinds:['face-1','face-2'],title:'两张头像'})).json();assert.deepEqual(pairImport.map(item=>item.kind),['face','face']);assert.deepEqual(pairImport.map(item=>item.gender),['female','male']);
    assert.equal(calls.length,5);assert.equal(JSON.stringify(job).includes(apiKey),false);
  }finally{globalThis.fetch=realFetch;await new Promise(resolve=>server.close(resolve));}
});

test('subject categories validate distinct resource roles, preserve legacy human defaults and isolate identity', async () => {
  const {subjectTypeFor,resourceKindsFor}=await import('../public/subject-types.js');
  assert.equal(subjectTypeFor(request),'human');assert.equal(subjectTypeFor({kind:'background'}),'scene');
  assert.equal(settingsKey(request),settingsKey({...request,subjectType:'human',subjectRevision:1}));
  const animal={...request,subjectType:'animal',characters:[{surface:'coat-ref',face:'head-ref',species:'猫',position:''}]};
  const validated=validateRequest(animal);assert.deepEqual(resourceKindsFor(validated),['pose','surface','face']);
  assert.deepEqual(referenceSlots(validated).map(ref=>ref.kind),['pose','surface','face']);
  assert.equal(settingsKey(validated),settingsKey({...validated,characters:[{...validated.characters[0],species:' 猫 '}]}));
  for(const update of [{subjectType:'human'},{subjectRevision:2},{characters:[{...validated.characters[0],species:'狗'}]},{characters:[{...validated.characters[0],surface:'other'}]}])assert.notEqual(settingsKey(validated),settingsKey({...validated,...update}));
  for(const subjectType of [null,'fantasy','building','constructor',1])assert.throws(()=>validateRequest({...animal,subjectType}));
  for(const update of [{species:''},{species:[]},{species:'x'.repeat(81)},{surface:undefined},{surface:'../escape'}])assert.throws(()=>validateRequest({...animal,characters:[{...animal.characters[0],...update}]}));
  const input={...request,subjectType:'animal',sourceId:`upload-${randomUUID()}`,title:'动物',inferHidden:true,subjects:[{species:'猫',position:''}]};
  const extraction=validateExtraction(input);assert.deepEqual(extraction.resourceKinds,['pose','surface','face']);
  assert.notEqual(extractionKey(extraction),extractionKey({...extraction,subjectType:'human'}));
  assert.notEqual(extractionKey(extraction),extractionKey({...extraction,subjects:[{species:'狗',position:''}]}));
  assert.throws(()=>validateExtraction({...input,resourceKinds:['costume']}));
  assert.throws(()=>validateExtraction({...input,subjectType:'human',resourceKinds:['surface']}));
  const faceOnly=validateExtraction({...input,resourceKinds:['face']});assert.deepEqual(extractionParts(faceOnly).map(part=>part.title),['头部']);
  const pose={subjectType:'animal',personCount:1,roleSpecies:['猫']},face={subjectType:'animal',species:'猫'},surface={...face};
  assert.equal(roleMismatch(validated.characters,pose,[face],'animal',[surface]),'');
  assert.match(roleMismatch(validated.characters,pose,[{...face,species:'狗'}],'animal',[surface]),/物种不匹配/);
  assert.match(roleMismatch(validated.characters,pose,[face],'animal',[{...surface,species:'狗'}]),/物种不匹配/);
  assert.match(roleMismatch(validated.characters,{...pose,subjectType:'human'},[face],'animal',[surface]),/类别不匹配/);
  const saved={...validated,status:'completed',imageURL:'/image',createdAt:new Date().toISOString()};
  assert.equal(matchesHistory(saved,{subjectType:'animal',query:'猫'}),true);assert.equal(matchesHistory(saved,{subjectType:'human'}),false);
  assert.equal(matchesHistory({...saved,...request,subjectType:undefined},{subjectType:'human'}),true);
});

test('animal extraction and every visual type use species anatomy and surface prompts instead of human clothing templates', async () => {
  const {STYLE_OPTIONS,EFFECTS}=await import('../public/effects.js');
  for(const species of ['猫','鹦鹉','金鱼']) {
    const extracted=validateExtraction({...request,subjectType:'animal',sourceId:`upload-${randomUUID()}`,title:species,inferHidden:true,subjects:[{species,position:''}]});
    const pose=extractionTask(extracted,'pose');assert.match(pose.resolvedPrompt,/不套用人体或统一四足模板/);assert.match(pose.resolvedPrompt,/合理补全/);assert.doesNotMatch(extractionTask({...extracted,inferHidden:false},'pose').resolvedPrompt,/合理补全/);
    assert.match(extractionTask(extracted,'surface').resolvedPrompt,/活体动物的体表/);assert.equal(extractionTask(extracted,'surface').background,'white');
    assert.match(extractionTask(extracted,'face').resolvedPrompt,/头部特写/);assert.doesNotMatch(pose.resolvedPrompt,/图2只提供/);
    for(const style of STYLE_OPTIONS)for(const outputType of ['image','character-sheet']){
      const job=validateRequest({...request,subjectType:'animal',style:style.id,outputType,characters:[{species,surface:'coat',face:'head',position:''}]});
      const prompt=buildPrompt(job);assert.ok(prompt.includes(species));assert.match(prompt,/主体类别：动物/);assert.match(prompt,/图2只定义此动物的体表/);assert.match(prompt,/图3定义此动物的头部/);assert.doesNotMatch(prompt,/成年男性|成年女性|衣服自然穿在|真实皮肤和衣料|成束头发/);
      if(outputType==='character-sheet')assert.match(prompt,/正面、四分之三、侧面、背面/);
      else assert.match(prompt,/恰好 1 只动物/);
    }
  }
  for(const effect of EFFECTS){const job=validateRequest({...request,subjectType:'animal',style:effect.medium,effect:effect.id,characters:[{species:'猫',surface:'coat',face:'head'}]});assert.ok(buildPrompt(job).includes(effect.promptLabel ? effect.prompt : effect.description));}
});

test('multi-animal extraction resumes, imports, composes and reuses with category/species metadata through restart', async () => {
  const realFetch=globalThis.fetch,calls=[];
  let server=await createServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));let base=`http://127.0.0.1:${server.address().port}`;
  globalThis.fetch=async(url,options)=>{
    if(!String(url).startsWith('https://animal-provider.example/'))return realFetch(url,options);
    calls.push(options.body);
    if(calls.length===4)return Response.json({error:{message:'模拟第二只体表失败'}},{status:400});
    return Response.json({data:[{b64_json:png.toString('base64')}]});
  };
  try{
    let {csrf}=await(await realFetch(`${base}/api/bootstrap`)).json();
    const post=(path,payload,id=randomUUID())=>realFetch(base+path,{method:'POST',headers:{'X-Studio-Token':csrf,'Content-Type':'application/json','Idempotency-Key':id},body:JSON.stringify(payload)});
    const wait=async id=>{for(let i=0;i<200;i++){const job=await(await realFetch(`${base}/api/jobs/${id}`)).json();if(['completed','failed'].includes(job.status))return job;await new Promise(resolve=>setTimeout(resolve,10));}throw new Error('animal mock did not finish');};
    const source=await saveUpload('source',png,'animals.png');
    const payload={...apiRequest,baseURL:'https://animal-provider.example/v1',subjectType:'animal',sourceId:source.id,title:'猫与鸟',inferHidden:true,subjects:[{species:'猫',position:'左侧'},{species:'鹦鹉',position:'右侧'}]};
    const id=randomUUID();assert.equal((await post('/api/extractions',payload,id)).status,202);
    let job=await wait(id);assert.equal(job.status,'failed');assert.deepEqual(Object.keys(job.outputs),['pose','surface-1','face-1']);
    await new Promise(resolve=>server.close(resolve));server=await createServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));base=`http://127.0.0.1:${server.address().port}`;({csrf}=await(await realFetch(`${base}/api/bootstrap`)).json());
    assert.equal((await post(`/api/extractions/${id}/resume`,{apiKey})).status,202);job=await wait(id);assert.equal(job.status,'completed');assert.equal(calls.length,6);
    for(const form of calls){assert.equal(form.getAll('image[]').length,1);assert.equal(form.getAll('image[]')[0].name,'1-source.png');}
    assert.match(calls[4].get('prompt'),/动物 2 的体表/);
    const resources=await(await post(`/api/extractions/${id}/import`,{kinds:['pose','surface-1','face-1','surface-2','face-2'],title:'动物审核'})).json();
    assert.equal(resources.length,5);assert.ok(resources.every(item=>item.subjectType==='animal'));assert.deepEqual(resources[0].roleSpecies,['猫','鹦鹉']);assert.equal(resources[1].species,'猫');assert.equal(resources[4].species,'鹦鹉');
    assert.equal((await realFetch(`${base}/api/extractions/${id}/image/surface-1`)).status,200);assert.equal((await realFetch(`${base}/assets/surface/${resources[1].id}`)).status,200);
    assert.equal((await(await post('/api/extractions',payload)).json()).id,id);assert.equal(calls.length,6);
    const characters=payload.subjects.map((subject,index)=>({...subject,surface:resources[1+index*2].id,face:resources[2+index*2].id}));
    const generation={...apiRequest,baseURL:payload.baseURL,subjectType:'animal',selections:{pose:resources[0].id},characters};
    const wrong=await post('/api/jobs',{...generation,characters:[{...characters[0],face:characters[1].face},characters[1]]});assert.equal(wrong.status,400);assert.match((await wrong.json()).error,/物种不匹配/);assert.equal(calls.length,6);
    assert.equal((await post('/api/jobs',{...apiRequest,baseURL:payload.baseURL,selections:{...request.selections,pose:resources[0].id}})).status,400);assert.equal(calls.length,6);
    const generated=await(await post('/api/jobs',generation)).json();job=await wait(generated.id);assert.equal(job.status,'completed');assert.equal(calls.length,7);
    assert.deepEqual(calls[6].getAll('image[]').map(file=>file.name),['1-pose.png','2-surface.png','3-face.png','4-surface.png','5-face.png']);assert.match(job.resolvedPrompt,/恰好 2 只动物/);
    assert.equal((await(await post('/api/jobs',generation)).json()).id,generated.id);assert.equal(calls.length,7);
    const upload=await realFetch(`${base}/api/uploads/pose`,{method:'POST',headers:{'X-Studio-Token':csrf,'X-Subject-Type':'animal','X-Species':encodeURIComponent('猫'),'Content-Type':'image/png'},body:png});assert.equal(upload.status,201);const singlePose=await upload.json();assert.equal(singlePose.species,'猫');
    const sheet=await(await post('/api/jobs',{...generation,selections:{pose:singlePose.id},characters:[{...characters[0],position:''}],outputType:'character-sheet',style:'anime'})).json();job=await wait(sheet.id);assert.equal(job.status,'completed');assert.match(job.resolvedPrompt,/动物资料图/);assert.match(job.resolvedPrompt,/赛璐璐/);assert.equal(calls.length,8);
    await new Promise(resolve=>server.close(resolve));server=await createServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));base=`http://127.0.0.1:${server.address().port}`;
    const boot=await(await realFetch(`${base}/api/bootstrap`)).json();csrf=boot.csrf;assert.equal(boot.catalogs.surface.filter(item=>item.sourceJobId===id).length,2);
    assert.equal((await(await post('/api/jobs',generation)).json()).id,generated.id);assert.equal(calls.length,8);
    assert.equal(JSON.stringify(job).includes(apiKey),false);assert.equal((await readFile(join(process.env.STUDIO_DATA_DIR,'jobs',sheet.id,'job.json'),'utf8')).includes(apiKey),false);
  }finally{globalThis.fetch=realFetch;await new Promise(resolve=>server.close(resolve));}
});

test('100 author schemes pass explicit artist/work targets with compatible media and local sources', async () => {
  const { MANGA_EFFECTS } = await import('../public/manga-effects.js');
  const { EFFECTS, effectsFor } = await import('../public/effects.js');
  const hash = bytes => createHash('sha256').update(bytes).digest('hex');
  const manifest = JSON.parse(await readFile(join(ROOT,'data/effect-sources/manifest.json'),'utf8'));
  const authors = JSON.parse(await readFile(join(ROOT,manifest.mangaAuthors.file),'utf8'));
  assert.equal(hash(await readFile(join(ROOT,manifest.mangaAuthors.file))),manifest.mangaAuthors.sha256);
  assert.equal(MANGA_EFFECTS.length,100);
  assert.equal(MANGA_EFFECTS.filter(effect=>effect.creatorType==='manga-artist').length,80);
  assert.equal(MANGA_EFFECTS.filter(effect=>effect.creatorType==='illustrator').length,20);
  assert.equal(new Set(MANGA_EFFECTS.map(effect=>effect.label)).size,100);
  assert.equal(new Set(MANGA_EFFECTS.map(effect=>effect.prompt)).size,100);
  assert.equal(effectsFor('manga').filter(effect=>effect.creatorType).length,100);
  assert.equal(effectsFor('comic').filter(effect=>effect.creatorType).length,100);
  assert.equal(effectsFor('illustration').filter(effect=>effect.creatorType).length,20);
  for(const medium of ['photo','anime','oil','ink','watercolor','film','editorial','cinematic']) assert.equal(effectsFor(medium).filter(effect=>effect.creatorType).length,0);
  assert.deepEqual(EFFECTS.filter(effect=>!effect.creatorType).map(effect=>effect.id),['dramatic-light','window-light','luminous-mist','quiet-distance','pastel-symmetry','neon-night','impression-color','monumental-ink','minimal-ink','woodblock','clear-line','handdrawn-nature','classic-manga','bold-comic','noir-comic','monochrome-editorial','warm-film']);
  const keys = new Set();
  for(const effect of MANGA_EFFECTS) {
    const entry=manifest.effects.find(item=>item.id===effect.id), author=authors.find(item=>`manga-${item.id}`===effect.id);
    assert.ok(entry && author);
    assert.equal(hash(await readFile(join(ROOT,entry.file))),entry.sha256);
    assert.equal(effect.source.revision,`local-sha256:${entry.sha256}`);
    assert.equal(entry.files.length,4);
    assert.deepEqual(effect.focus,author.recent_focus);
    assert.match(effect.revision,/^[a-f0-9]{64}$/);
    assert.doesNotMatch(effect.prompt,/浮空港|机械鸟|修理员|快递员|深蓝|黄绿|窄长面部|修长角色/);
    for(const style of effect.mediums) for(const outputType of ['image','character-sheet','background','foreground']) {
      const scene=['background','foreground'].includes(outputType);
      const base={...request,style,effect:effect.id,outputType,...(scene?{title:'试验场景',background:outputType==='foreground'?'transparent':'opaque'}:{})};
      for(const subjectType of scene?['scene']:['human','animal']) {
        const job=validateRequest({...base,...(subjectType==='animal'?{subjectType,characters:[{species:'豹猫',surface:'leopard-coat',face:'leopard-head'}]}:{})});
        const prompt=buildPrompt(job);
        assert.ok(prompt.includes(effect.prompt));
        assert.ok(prompt.includes(effect.label));
        assert.ok(prompt.includes(author.name));
        assert.ok(prompt.includes(effect.display.work));
        assert.ok(prompt.includes(effect.promptLabel));
        assert.match(prompt,/彩色时保留参考配色/);
        if(subjectType==='animal') assert.match(prompt,/保持原物种体态/);
        const key=settingsKey(job);assert.equal(keys.has(key),false);keys.add(key);
        const saved={...job,status:'completed',imageURL:'/test',createdAt:'2026-11-01T00:00:00Z'};
        assert.equal(savedMatches([saved],job).length,1);
        assert.equal(savedMatches([saved],{...job,effectRevision:'old-version'}).length,0);
        assert.equal(matchesHistory(saved,{style,effect:effect.id}),true);
        assert.equal(matchesHistory(saved,{effect:'classic-manga'}),false);
      }
    }
    for(const style of ['photo',...(effect.creatorType==='manga-artist'?['illustration']:[])]) assert.throws(()=>validateRequest({...request,style,effect:effect.id}),/不匹配/);
  }
});

test('author schemes and research cards are served locally without opening arbitrary paths', async () => {
  const server=await createServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base=`http://127.0.0.1:${server.address().port}`;
  try {
    const module=await fetch(`${base}/manga-effects.js`);assert.equal(module.status,200);assert.match(module.headers.get('content-type'),/javascript/);assert.match(await module.text(),/export const MANGA_EFFECTS/);
    for(const id of ['manga-araki-hirohiko','manga-shirabii']) {
      const response=await fetch(`${base}/api/effect-sources/${id}`);
      assert.equal(response.status,200);assert.match(response.headers.get('content-type'),/text\/plain/);
      assert.equal(await response.text(),await readFile(join(ROOT,'data/effect-sources',`${id}.md`),'utf8'));
    }
    for(const path of ['/api/effect-sources/manga-missing','/api/effect-sources/%2e%2e%2fmanifest.json','/api/effect-sources/manga-araki-hirohiko.md','/api/effect-sources/../../server.mjs']) assert.equal((await fetch(base+path)).status,404);
  } finally {await new Promise(resolve=>server.close(resolve));}
});

test('author labels show works and genres while request display overrides cannot change resolved style', async () => {
  const {MANGA_EFFECTS}=await import('../public/manga-effects.js');
  const {effectLabel,effectFor}=await import('../public/effects.js');
  assert.equal(effectLabel(undefined),'');
  assert.equal(effectLabel(effectFor('manga-oda-eiichiro')),'尾田荣一郎 ·《航海王》 · 热血／冒险');
  assert.match(effectLabel(effectFor('manga-obata-takeshi')),/《死亡笔记》（作画）/);
  assert.match(effectLabel(effectFor('manga-abec-bunbun')),/《刀剑神域》（插画）/);
  assert.equal(effectLabel(effectFor('classic-manga')),'经典黑白漫画 · 手冢治虫 ·《铁臂阿童木》 · 科幻／冒险');
  for(const effect of MANGA_EFFECTS) {
    assert.ok(effect.display.work.trim() && effect.display.genre.trim());
    assert.ok(effectLabel(effect).includes(effect.display.work));
    assert.ok(effectLabel(effect).includes(effect.display.genre));
    const job=validateRequest({...request,style:effect.medium,effect:effect.id});
    const withDisplay={...job,display:{work:'仅用于展示的作品',genre:'仅用于展示的类型'}};
    assert.equal(buildPrompt(withDisplay),buildPrompt(job));
    assert.equal(settingsKey(withDisplay),settingsKey(job));
    assert.ok(buildPrompt(job).includes(effect.display.work));
  }
});

test('author fidelity fix invalidates weak-style results and reaches the API payload', async () => {
  const {effectFor}=await import('../public/effects.js');
  const job=validateRequest({...apiRequest,style:'comic',effect:'manga-araki-hirohiko'});
  const old={...job,effectRevision:'a7f0a799cf0761cc744bb68d3c213f7f40ce0cdab420e8d38cb07151e97aade0',status:'completed',createdAt:'2026-11-01T12:20:22.821Z',imageURL:'/old'};
  assert.equal(savedMatches([old],job).length,0);
  assert.equal(matchesHistory(old,{effect:'manga-araki-hirohiko'}),true);
  const prompt=buildPrompt(job);
  for(const text of ['荒木飞吕彦','JOJO的奇妙冒险','棱面','交叉排线','五官关系和设计特征用目标画风重新造型','不能只在写实人物外加速度线']) assert.ok(prompt.includes(text),text);
  await generateAPI({...job,resolvedPrompt:prompt},[],apiKey,()=>{},{fetcher:async(url,options)=>{
    const payload=JSON.parse(options.body);
    assert.equal(payload.prompt,prompt);
    assert.ok(payload.prompt.includes(effectFor(job.effect).promptLabel));
    return Response.json({data:[{b64_json:png.toString('base64')}]});
  }});
});

test('legacy comic artist presets retain named targets for people, animals and scenes', async () => {
  const {effectFor}=await import('../public/effects.js');
  const previous = {'clear-line':2,'classic-manga':1,'bold-comic':1,'noir-comic':1};
  for (const [id, revision] of Object.entries(previous)) {
    const effect = effectFor(id);
    assert.ok(effect.revision > revision);
    for (const outputType of ['image','character-sheet','background','foreground']) {
      const scene = ['background','foreground'].includes(outputType);
      for (const subjectType of scene ? ['scene'] : ['human','animal']) {
        const job = validateRequest({...request,style:effect.medium,effect:id,outputType,
          ...(scene ? {title:'漫画场景',background:outputType==='foreground'?'transparent':'opaque'} : {}),
          ...(subjectType==='animal' ? {subjectType,characters:[{species:'豹猫',surface:'leopard-coat',face:'leopard-head'}]} : {})});
        const prompt = buildPrompt(job);
        assert.ok(prompt.includes(effect.source.name));
        assert.ok(prompt.includes(effect.display.work));
        assert.ok(prompt.includes(effect.prompt));
        const old = {...job,effectRevision:revision,status:'completed',imageURL:'/old',createdAt:'2026-11-01T00:00:00Z'};
        assert.equal(savedMatches([old],job).length,0);
        assert.equal(matchesHistory(old,{effect:id}),true);
      }
    }
  }
});

const fantasyRoles = [
  {species:'天使',anatomy:'人形躯干，两臂两腿，背部一对羽翼，羽毛只覆盖翅膀',gender:'female',position:'左侧'},
  {species:'娜迦',anatomy:'人形上身，两臂，腰部连接一条鳞片蛇尾，无双腿',gender:'male',position:'右侧'}
];
const griffin = {species:'狮鹫',anatomy:'鹰头与双前爪，狮躯与双后腿，背部一对羽翼、一条狮尾；前半羽毛，后半兽毛',position:''};

test('fantasy structures are required, isolate cached results and keep humanoid clothing independent', async () => {
  const {resourceKindsFor,resourceMatchesSubject}=await import('../public/subject-types.js');
  const characters=fantasyRoles.map((role,i)=>({...role,costume:`clothes-${i}`,face:`head-${i}`,surface:`surface-${i}`}));
  const humanoid=validateRequest({...request,subjectType:'fantasy-humanoid',characters});
  assert.deepEqual(resourceKindsFor(humanoid),['pose','costume','face','surface']);
  assert.deepEqual(referenceSlots(humanoid).map(r=>[r.kind,r.characterIndex]),[['pose',undefined],['costume',0],['face',0],['surface',0],['costume',1],['face',1],['surface',1]]);
  for(const update of [{anatomy:''},{anatomy:null},{anatomy:'x'.repeat(601)},{species:''},{surface:undefined}]) assert.throws(()=>validateRequest({...humanoid,characters:[{...characters[0],...update}]}));
  for(const subjectType of ['outer-god','fantasy','building']) assert.throws(()=>validateRequest({...humanoid,subjectType}));
  const old={...humanoid,status:'completed',imageURL:'/test',createdAt:'2026-11-01T00:00:00Z'};
  const changed={...humanoid,characters:[{...characters[0],anatomy:'人形躯干，两臂两腿，背部三对羽翼'},characters[1]]};
  assert.equal(savedMatches([old],changed).length,0);
  assert.equal(matchesHistory(old,{subjectType:'fantasy-humanoid',query:'娜迦 无双腿'}),true);
  assert.equal(matchesHistory(old,{subjectType:'animal'}),false);
  const pose={subjectType:'fantasy-humanoid',personCount:2,roleSpecies:fantasyRoles.map(r=>r.species),roleAnatomies:fantasyRoles.map(r=>r.anatomy),roleGenders:fantasyRoles.map(r=>r.gender)};
  const faces=fantasyRoles.map(role=>({...role,subjectType:'fantasy-humanoid'}));
  assert.equal(roleMismatch(characters,pose,faces,'fantasy-humanoid',faces),'');
  assert.match(roleMismatch(changed.characters,pose,faces,'fantasy-humanoid',faces),/结构设定不匹配/);
  assert.match(roleMismatch(characters,pose,[{...faces[0],gender:'male'},faces[1]],'fantasy-humanoid',faces),/头像不匹配/);
  assert.equal(resourceMatchesSubject('costume',{subjectType:'human'},'fantasy-humanoid'),true);
  assert.equal(resourceMatchesSubject('face',{subjectType:'human'},'fantasy-humanoid'),false);
  assert.equal(resourceMatchesSubject('surface',{subjectType:'animal'},'fantasy-beast'),false);
  const beast=validateRequest({...request,subjectType:'fantasy-beast',characters:[{...griffin,gender:'male',surface:'coat',face:'head'}]});
  assert.equal(beast.characters[0].gender,'reference');
  assert.deepEqual(resourceKindsFor(beast),['pose','surface','face']);
});

test('fantasy extraction and all visual types preserve declared anatomy and dynamic reference roles', async () => {
  const {STYLE_OPTIONS}=await import('../public/effects.js');
  for(const [subjectType,subjects] of [['fantasy-humanoid',fantasyRoles],['fantasy-beast',[griffin]]]) {
    const job=validateExtraction({...request,subjectType,subjects,sourceId:`upload-${randomUUID()}`,title:'幻想种',inferHidden:true});
    assert.equal(extractionParts(job).length,subjectType==='fantasy-humanoid'?7:3);
    assert.deepEqual(extractionParts(validateExtraction({...job,resourceKinds:['face']})).map(p=>p.key),subjects.length===1?['face']:['face-1','face-2']);
    assert.notEqual(extractionKey(job),extractionKey({...job,subjects:[{...subjects[0],anatomy:'另一结构'},...subjects.slice(1)]}));
    for(const part of extractionParts(job)) {
      const task=extractionTask(job,part.key);for(const role of subjects)assert.ok(task.resolvedPrompt.includes(role.anatomy));
      assert.doesNotMatch(task.resolvedPrompt,/图2只提供|保持自然人体比例/);
      if(part.kind==='costume')assert.equal(task.background,'transparent');
      if(part.kind==='surface'&&subjectType==='fantasy-humanoid')assert.match(task.resolvedPrompt,/不透明打底覆盖/);
    }
    assert.match(extractionTask({...job,inferHidden:false},'pose').resolvedPrompt,/隐藏部位保持省略/);
    for(const style of STYLE_OPTIONS) for(const outputType of ['image','character-sheet']) {
      const characters=(outputType==='character-sheet'?subjects.slice(0,1):subjects).map((role,i)=>({...role,face:`head-${i}`,surface:`surface-${i}`,costume:`clothes-${i}`}));
      const generated=validateRequest({...request,subjectType,style:style.id,outputType,characters,selections:{pose:'pose',background:'background',foreground:'foreground'}});
      const prompt=buildPrompt(generated);
      for(const role of characters)assert.ok(prompt.includes(role.anatomy));
      assert.match(prompt,/名称不替代具体设定/);assert.doesNotMatch(prompt,/保持自然、固定的人体比例/);
      if(subjectType==='fantasy-humanoid'&&outputType==='image')assert.match(prompt,/图7对应角色 2：只定义各身体部位/);
      if(subjectType==='fantasy-beast')assert.match(prompt,/图2对应角色 1：只定义各身体部位/);
      assert.ok(prompt.includes(`图${referenceSlots(generated).length}：定义镜头前方`));
      if(outputType==='character-sheet')assert.match(prompt,/正面、四分之三、侧面、背面/);
    }
  }
});

test('fantasy resources survive partial failure, import, generation and restart without losing anatomy', async () => {
  const realFetch=globalThis.fetch,calls=[];
  let server=await createServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));let base=`http://127.0.0.1:${server.address().port}`;
  globalThis.fetch=async(url,options)=>{
    if(!String(url).startsWith('https://fantasy-provider.example/'))return realFetch(url,options);
    calls.push(options.body);
    if(calls.length===4)return Response.json({error:{message:'模拟体表生成失败'}},{status:400});
    return Response.json({data:[{b64_json:png.toString('base64')}]});
  };
  try {
    let {csrf}=await(await realFetch(`${base}/api/bootstrap`)).json();
    const post=(path,payload,id=randomUUID())=>realFetch(base+path,{method:'POST',headers:{'X-Studio-Token':csrf,'Content-Type':'application/json','Idempotency-Key':id},body:JSON.stringify(payload)});
    const wait=async id=>{for(let i=0;i<200;i++){const job=await(await realFetch(`${base}/api/jobs/${id}`)).json();if(['completed','failed'].includes(job.status))return job;await new Promise(resolve=>setTimeout(resolve,10));}throw new Error('fantasy mock did not finish');};
    const source=await saveUpload('source',png,'fantasy.png');
    for(const [subjectType,subjects] of [['fantasy-humanoid',fantasyRoles],['fantasy-beast',[griffin]]]) {
      const payload={...apiRequest,baseURL:'https://fantasy-provider.example/v1',subjectType,sourceId:source.id,title:'幻想设定',inferHidden:true,subjects};
      const start=calls.length,id=randomUUID();assert.equal((await post('/api/extractions',payload,id)).status,202);
      let job=await wait(id);
      if(subjectType==='fantasy-humanoid'){
        assert.equal(job.status,'failed');assert.deepEqual(Object.keys(job.outputs),['pose','costume-1','face-1']);
        await new Promise(resolve=>server.close(resolve));server=await createServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));base=`http://127.0.0.1:${server.address().port}`;({csrf}=await(await realFetch(`${base}/api/bootstrap`)).json());
        assert.equal((await post(`/api/extractions/${id}/resume`,{apiKey})).status,202);job=await wait(id);
      }
      assert.equal(job.status,'completed');
      const parts=extractionParts(job);assert.equal(calls.length-start,parts.length+(subjectType==='fantasy-humanoid'?1:0));
      for(const form of calls.slice(start)){assert.equal(form.getAll('image[]').length,1);assert.equal(form.getAll('image[]')[0].name,'1-source.png');}
      const resources=await(await post(`/api/extractions/${id}/import`,{kinds:parts.map(p=>p.key),title:'审核幻想种',costumeGender:'male'})).json();
      assert.equal(resources.length,parts.length);assert.deepEqual(resources[0].roleAnatomies,subjects.map(r=>r.anatomy));
      for(const item of resources.slice(1)){assert.equal(item.anatomy,subjects[item.characterIndex].anatomy);assert.equal((await findAsset(item.kind,item.id)).anatomy,item.anatomy);}
      const characters=subjects.map((role,index)=>({...role,...Object.fromEntries(resources.filter(item=>item.characterIndex===index).map(item=>[item.kind,item.id]))}));
      if(subjectType==='fantasy-humanoid')characters[0].costume=(await saveUpload('costume',png,'普通人物衣服')).id;
      const input={...apiRequest,baseURL:payload.baseURL,subjectType,characters,selections:{pose:resources[0].id},style:'comic',effect:'manga-araki-hirohiko'};
      const before=calls.length;
      const wrong=await post('/api/jobs',{...input,characters:[{...characters[0],anatomy:'与资源不同的身体结构'},...characters.slice(1)]});assert.equal(wrong.status,400);assert.match((await wrong.json()).error,/结构设定不匹配/);assert.equal(calls.length,before);
      const generated=await(await post('/api/jobs',input)).json();job=await wait(generated.id);assert.equal(job.status,'completed');
      assert.equal(calls.length,before+1);assert.equal(calls.at(-1).getAll('image[]').length,parts.length);
      assert.equal(calls.at(-1).get('prompt'),job.resolvedPrompt);assert.match(job.resolvedPrompt,/荒木飞吕彦/);
      for(const role of subjects)assert.ok(job.resolvedPrompt.includes(role.anatomy));
      assert.equal((await(await post('/api/jobs',input)).json()).id,job.id);assert.equal(calls.length,before+1);
      const upload=await realFetch(`${base}/api/uploads/face`,{method:'POST',headers:{'X-Studio-Token':csrf,'X-Subject-Type':subjectType,'X-Species':encodeURIComponent(subjects[0].species),'X-Anatomy':encodeURIComponent(subjects[0].anatomy),'Content-Type':'image/png'},body:png});
      assert.equal(upload.status,201);assert.equal((await upload.json()).anatomy,subjects[0].anatomy);
      await new Promise(resolve=>server.close(resolve));server=await createServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));base=`http://127.0.0.1:${server.address().port}`;({csrf}=await(await realFetch(`${base}/api/bootstrap`)).json());
      const saved=await(await realFetch(`${base}/api/jobs/${job.id}`)).json();assert.deepEqual(saved.characters,job.characters);assert.equal((await(await post('/api/jobs',input)).json()).id,job.id);
      assert.equal((await readFile(join(process.env.STUDIO_DATA_DIR,'jobs',id,'job.json'),'utf8')).includes(apiKey),false);
    }
  } finally {globalThis.fetch=realFetch;await new Promise(resolve=>server.close(resolve));}
});
