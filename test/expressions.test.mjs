import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,readFile,writeFile,unlink} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';
import {EXPRESSIONS} from '../public/expressions.js';
import {settingsKey,referenceSlots,matchesHistory} from '../public/job-settings.js';
const {createServer}=await import('../server.mjs');
const {expressionSettings,expressionPrompt,expressionSource,publishExpression}=await import('../expressions.mjs');
const {DATA,saveUpload}=await import('../catalog.mjs');
assert.equal(DATA,process.env.STUDIO_DATA_DIR,'Tests require the isolated fixture preload');
const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aQ1kAAAAASUVORK5CYII=','base64');
const count=EXPRESSIONS.length;
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));

test('fixed expression suite preserves source identity, species, style and exact cache boundaries',()=>{
  assert.equal(EXPRESSIONS.length,24);assert.equal(new Set(EXPRESSIONS.map(item=>item.id)).size,count);assert.equal(EXPRESSIONS.filter(item=>item.strong).length,12);
  const source={source:{id:'avatar',title:'角色',subjectType:'fantasy-beast',species:'狮鹫',anatomy:'鹰头，喙与狮耳'},hash:'a'.repeat(64)};
  const job=expressionSettings({provider:'quota',expressionId:'smile'},source);
  assert.deepEqual(referenceSlots(job),[{kind:'face',id:'avatar'}]);assert.equal(job.size,'1024x1024');
  const prompt=expressionPrompt({...job,references:[source.source]});assert.match(prompt,/原图绘制媒介/);assert.match(prompt,/喙/);assert.match(prompt,/不添加人类/);
  assert.equal(job.expressionRevision,1);assert.doesNotMatch(prompt,/高强度面部表演/);
  assert.deepEqual(EXPRESSIONS.filter(item=>!item.strong).map(item=>item.id),['neutral','smile','laugh','surprised','confused','angry','sad','crying','shy','nervous','tired','proud']);
  for(const spec of EXPRESSIONS.filter(item=>item.strong)){
    const intense=expressionSettings({provider:'quota',expressionId:spec.id},source);
    const text=expressionPrompt({...intense,references:[source.source]});
    assert.match(text,/高强度面部表演/);assert.match(text,/身份特征不变/);assert.match(text,/实际头部结构/);assert.match(text,/不添加人类牙齿/);assert.ok(text.includes(spec.prompt));
    assert.notEqual(settingsKey(job),settingsKey(intense));
  }
  for(const patch of [{expressionId:'sad'},{sourceHash:'b'.repeat(64)},{sourceFaceId:'other'},{expressionRevision:2}])assert.notEqual(settingsKey(job),settingsKey({...job,...patch}));
  assert.ok(matchesHistory({...job,status:'completed',imageURL:'/saved',createdAt:new Date().toISOString()},{outputType:'expression'}));
});

test('a saved basic set gains only the new strong expressions without replacing existing faces',async()=>{
  const face=await saveUpload('face',png,'旧套组测试'),source=await expressionSource(face.id),legacy=[];
  for(const spec of EXPRESSIONS.filter(item=>!item.strong)){
    const job={...expressionSettings({provider:'quota',expressionId:spec.id},source),id:randomUUID(),createdAt:new Date().toISOString(),status:'completed',references:[{...face,kind:'face'}],output:'result.png'};
    job.imageURL=`/api/jobs/${job.id}/image`;
    await mkdir(join(DATA,'jobs',job.id),{recursive:true});await writeFile(join(DATA,'jobs',job.id,job.output),png);
    await publishExpression(job,png);await writeFile(join(DATA,'jobs',job.id,'job.json'),JSON.stringify(job));legacy.push(job);
  }
  const original=globalThis.fetch,generated=[];
  globalThis.fetch=async(url,options)=>{
    if(!String(url).startsWith('https://expression-upgrade.example/'))return original(url,options);
    generated.push(options.body.get('prompt'));return Response.json({data:[{b64_json:png.toString('base64')}]});
  };
  const server=await createServer();
  try{
    await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const base=`http://127.0.0.1:${server.address().port}`;
    const get=async path=>(await original(base+path)).json(),csrf=(await get('/api/bootstrap')).csrf;
    const post=async(path,input)=>(await original(base+path,{method:'POST',headers:{'X-Studio-Token':csrf,'Content-Type':'application/json','Idempotency-Key':randomUUID()},body:JSON.stringify(input)})).json();
    await post('/api/settings',{provider:'api',model:'upgrade-test',baseURL:'https://expression-upgrade.example/v1',apiKey:'fake-upgrade-key'});
    const before=await get(`/api/expression-sets?faceId=${face.id}`);assert.equal(before.items.length,count);assert.equal(before.items.filter(item=>item.saved).length,legacy.length);assert.equal(generated.length,0);
    const batch=await post('/api/expression-sets',{faceId:face.id});assert.equal(batch.count,count);
    for(let i=0;i<400;i++){const result=await get(`/api/batches/${batch.id}`);if(result.items.every(job=>job.status==='completed'))break;await sleep(10);}
    const after=await get(`/api/expression-sets?faceId=${face.id}`);assert.equal(after.items.filter(item=>item.saved).length,count);
    assert.equal(generated.length,EXPRESSIONS.filter(item=>item.strong).length);assert.ok(generated.every(prompt=>prompt.includes('高强度面部表演')));
    for(const old of legacy){const saved=after.items.find(item=>item.id===old.expressionId).saved;assert.equal(saved.id,old.id);assert.equal(saved.resourceId,old.resourceId);}
    const rage=after.items.find(item=>item.id==='rage').saved;
    const resource=(await get('/api/bootstrap')).catalogs.face.find(item=>item.id===rage.resourceId);assert.equal(resource.expression.sourceFaceId,face.id);assert.ok(resource.tags.includes('暴怒'));
    await post('/api/expression-sets',{faceId:face.id});assert.equal(generated.length,count-legacy.length);
  }finally{globalThis.fetch=original;await new Promise(resolve=>server.close(resolve));}
});

test('full-suite queue deduplicates, resumes only missing images, tags resources and safely replaces versions',async()=>{
  const original=globalThis.fetch;let calls=0,release,failed=false,replaceFailure=false;const references=[],sceneInputs=[];
  globalThis.fetch=async(url,options)=>{
    if(!String(url).startsWith('https://expression.example/'))return original(url,options);
    calls++;references.push(Buffer.from(await options.body.get('image[]').arrayBuffer()));
    if(calls===1)await new Promise(resolve=>release=resolve);
    const prompt=options.body.get('prompt');
    if(options.body.getAll('image[]').length>1)sceneInputs.push(await Promise.all(options.body.getAll('image[]').map(async file=>Buffer.from(await file.arrayBuffer()))));
    if((!failed||replaceFailure)&&prompt.includes('「哭泣」')){failed=true;replaceFailure=false;return Response.json({error:{message:'模拟单张失败'}},{status:400});}
    const bytes=options.body.getAll('image[]').length===1 && prompt.includes('「微笑」')?Buffer.concat([png,Buffer.from('smile')]):png;
    return Response.json({data:[{b64_json:bytes.toString('base64')}]});
  };
  let server=await createServer(),base,csrf;
  const start=async()=>{await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));base=`http://127.0.0.1:${server.address().port}`;csrf=(await(await original(base+'/api/bootstrap')).json()).csrf;};
  const get=async path=>(await original(base+path)).json();
  const post=(path,input,id=randomUUID())=>original(base+path,{method:'POST',headers:{'X-Studio-Token':csrf,'Content-Type':'application/json','Idempotency-Key':id},body:JSON.stringify(input)});
  const wait=async id=>{for(let i=0;i<400;i++){const batch=await get(`/api/batches/${id}`);if(batch.items.every(job=>!['running','queued'].includes(job.status)))return batch;await sleep(10);}throw new Error('suite timed out');};
  try{
    await start();await post('/api/settings',{provider:'api',model:'test-image',baseURL:'https://expression.example/v1',apiKey:'fake-expression-key'});
    const source=await(await original(base+'/api/uploads/face',{method:'POST',headers:{'X-Studio-Token':csrf},body:png})).json();const input={faceId:source.id},batchId=randomUUID();
    const first=await(await post('/api/expression-sets',input,batchId)).json();assert.equal(first.count,count);
    for(let i=0;i<100&&!release;i++)await sleep(5);assert.equal(calls,1);
    const duplicate=await(await post('/api/expression-sets',input)).json();assert.deepEqual(duplicate.items.map(job=>job.id),first.items.map(job=>job.id));
    assert.equal((await post('/api/expression-sets',{...input,replaceExisting:true})).status,409);
    assert.equal((await post('/api/expression-sets',{...input,replaceExisting:'true'})).status,400);
    // A mutable source cannot alter the already queued snapshot.
    await writeFile(join(process.env.STUDIO_DATA_DIR,'uploads',`${source.id}.png`),Buffer.concat([png,Buffer.from('changed')]));
    release();const partial=await wait(first.id);assert.equal(calls,count);assert.equal(partial.items.filter(job=>job.status==='completed').length,count-1);assert.ok(references.every(bytes=>bytes.equals(png)));
    await writeFile(join(process.env.STUDIO_DATA_DIR,'uploads',`${source.id}.png`),png);
    const filled=await(await post('/api/expression-sets',input)).json();const complete=await wait(filled.id);assert.equal(calls,count+1);assert.ok(complete.items.every(job=>job.status==='completed'));
    let boot=await get('/api/bootstrap'),assets=boot.catalogs.face.filter(item=>item.expression?.sourceFaceId===source.id&&!item.superseded);assert.equal(assets.length,count);for(const item of assets){assert.ok(item.tags.includes('表情'));assert.ok(item.tags.includes(item.expression.label));}
    const oldIds=assets.map(item=>item.id);const neutral=assets.find(item=>item.expression.id==='neutral');
    await post('/api/resource-tags',{items:[{kind:'face',id:neutral.id}],add:['主角']});
    assert.equal((await post('/api/expression-sets',input)).status,202);assert.equal(calls,count+1);
    const retried=await(await post('/api/expression-sets',input,batchId)).json();assert.deepEqual(retried.items.map(job=>job.id),first.items.map(job=>job.id));assert.equal(calls,count+1);
    replaceFailure=true;const replaced=await(await post('/api/expression-sets',{...input,replaceExisting:true})).json();const replacement=await wait(replaced.id);assert.equal(calls,2*count+1);assert.equal(replacement.items.filter(job=>job.status==='failed').length,1);
    boot=await get('/api/bootstrap');assets=boot.catalogs.face.filter(item=>item.expression?.sourceFaceId===source.id&&!item.superseded);assert.equal(assets.length,count);assert.equal(assets.filter(item=>oldIds.includes(item.id)).length,1);assert.ok(assets.find(item=>item.expression.id==='neutral').tags.includes('主角'));
    assert.equal((await original(base+`/assets/face/${neutral.id}`)).status,200);
    const current=await get(`/api/expression-sets?faceId=${source.id}`);const crying=current.items.find(item=>item.id==='crying');assert.equal(crying.job.status,'failed');assert.equal(crying.saved.status,'completed');
    await post('/api/expression-sets',input);assert.equal(calls,2*count+1);
    // Lost publication can be repaired from a saved result without another model call.
    const latest=assets.find(item=>item.expression.id==='smile');await unlink(join(process.env.STUDIO_DATA_DIR,'resources',`${latest.id}.json`));
    await post('/api/expression-sets',input);assert.equal(calls,2*count+1);assert.ok((await get('/api/bootstrap')).catalogs.face.some(item=>item.id===latest.id&&!item.superseded));
    await unlink(join(process.env.STUDIO_DATA_DIR,'resources',`${latest.id}.png`));await post('/api/expression-sets',input);assert.equal(calls,2*count+1);assert.equal((await original(base+`/assets/face/${latest.id}`)).status,200);
    for(let i=0;i<100&&(await get('/api/queue')).running;i++)await sleep(5);
    await new Promise(resolve=>server.close(resolve));server=await createServer();await start();await post('/api/expression-sets',input);assert.equal(calls,2*count+1);
    const file=await readFile(join(process.env.STUDIO_DATA_DIR,'jobs',complete.items[0].id,'job.json'),'utf8');assert.equal(file.includes('fake-expression-key'),false);
    // Load before submission, then reroll only selected expressions and retain every other job.
    const before=await get(`/api/expression-sets?faceId=${source.id}`);assert.equal(before.items.filter(item=>item.saved?.imageURL).length,count);assert.equal(calls,2*count+1);
    for(const value of ['smile',null,['invalid'],[1]])assert.equal((await post('/api/expression-sets',{...input,replaceExpressions:value})).status,400);
    assert.equal((await post('/api/expression-sets',{...input,replaceExisting:true,replaceExpressions:['smile']})).status,400);
    const singleId=randomUUID();replaceFailure=true;
    const selected=await(await post('/api/expression-sets',{...input,replaceExpressions:['crying','neutral']},singleId)).json();await wait(selected.id);assert.equal(calls,2*count+3);
    const after=await get(`/api/expression-sets?faceId=${source.id}`);
    for(const item of after.items){const old=before.items.find(previous=>previous.id===item.id);if(item.id==='neutral')assert.notEqual(item.saved.id,old.saved.id);else assert.equal(item.saved.id,old.saved.id);}
    assert.equal(after.items.find(item=>item.id==='crying').job.status,'failed');
    assert.equal((await post('/api/expression-sets',{...input,replaceExpressions:['neutral','crying','neutral']},singleId)).status,202);assert.equal(calls,2*count+3);
    assert.equal((await post('/api/expression-sets',{...input,replaceExpressions:['smile']},singleId)).status,409);
    const one=await(await post('/api/expression-sets',{...input,replaceExpressions:['crying']})).json();await wait(one.id);assert.equal(calls,2*count+4);
    assert.equal((await post('/api/expression-sets',{...input,replaceExpressions:[]})).status,202);assert.equal(calls,2*count+4);
    const originalSet=await get(`/api/expression-sets?faceId=${source.id}`);
    const savedIds=originalSet.items.map(item=>item.saved.id);
    await post('/api/settings',{provider:'quota'});
    const fromChild=await get(`/api/expression-sets?faceId=${originalSet.items[0].saved.resourceId}`);
    assert.equal(fromChild.faceId,source.id);assert.deepEqual(fromChild.items.map(item=>item.saved.id),savedIds);
    await post('/api/settings',{provider:'api',model:'another-model',baseURL:'https://expression.example/v1',apiKey:'fake-expression-key'});
    const reused=await(await post('/api/expression-sets',{faceId:originalSet.items[0].saved.resourceId})).json();
    assert.equal(reused.faceId,source.id);assert.deepEqual(reused.items.map(job=>job.id),savedIds);assert.equal(calls,2*count+4);
    const redraw=await(await post('/api/expression-sets',{...input,replaceExpressions:['smile']})).json();
    await wait(redraw.id);assert.equal(calls,2*count+5);
    const updated=await get(`/api/expression-sets?faceId=${source.id}`);
    for(const [i,item] of updated.items.entries()){
      if(item.id==='smile'){assert.notEqual(item.saved.id,savedIds[i]);assert.equal(item.saved.model,'another-model');}
      else assert.equal(item.saved.id,savedIds[i]);
    }
    const active=(await get('/api/bootstrap')).catalogs.face.filter(item=>item.expression?.sourceFaceId===source.id&&!item.superseded);
    assert.equal(active.length,count);assert.equal(active.find(item=>item.expression.id==='smile').sourceJobId,updated.items.find(item=>item.id==='smile').saved.id);
    const smile=active.find(item=>item.expression.id==='smile');
    const roles=[{face:source.id,expressionAssetId:smile.id,costume:'SPR-0004',position:'左侧'},{face:'local-male-modern-face',costume:'local-male-modern-costume',position:'右侧'}];
    const scene={selections:{pose:'pair60_P008_front'},characters:roles,style:'photo',size:'1536x1024',quality:'medium',background:'studio',prompt:''};
    assert.equal((await post('/api/jobs',{...scene,characters:[roles[0],{...roles[1],expressionAssetId:smile.id}]})).status,400);
    assert.equal(calls,2*count+5);
    const sceneJob=await(await post('/api/jobs',scene)).json();
    for(let i=0;i<400;i++){if((await get(`/api/jobs/${sceneJob.id}`)).status==='completed')break;await sleep(10);}
    assert.equal((await get(`/api/jobs/${sceneJob.id}`)).status,'completed');
    assert.equal(sceneJob.characters[0].face,source.id);
    assert.match(sceneJob.resolvedPrompt,/角色 1沿用图3所示的「微笑」/);
    assert.equal(sceneInputs.length,1);assert.ok(sceneInputs[0][2].equals(Buffer.concat([png,Buffer.from('smile')])));
    assert.equal(sceneJob.references[4].id,roles[1].face);
    const legacy={...scene,characters:[{...roles[0],face:smile.id,expressionAssetId:undefined},roles[1]]};
    assert.equal((await(await post('/api/jobs',legacy)).json()).id,sceneJob.id);assert.equal(calls,2*count+6);
  }finally{release?.();globalThis.fetch=original;await new Promise(resolve=>server.close(resolve));}
});
