import test from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {readFile,writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {validateRequest,buildPrompt} from '../generation.mjs';
import {settingsKey,referenceSlots,matchesHistory,outputLabel} from '../public/job-settings.js';
import {effectsFor,STYLE_OPTIONS} from '../public/effects.js';
import {createServer} from '../server.mjs';
import {setupStyleTransfer} from '../public/style-transfer-ui.js';

const input={outputType:'style-transfer',provider:'quota',sourceId:`upload-${randomUUID()}`,style:'watercolor',effect:'none',size:'1024x1536',quality:'medium',background:'opaque',prompt:''};
const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aQ1kAAAAASUVORK5CYII=','base64');
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));

test('whole-photo transfer applies every medium without requiring or stripping characters and separates exact cache identities',()=>{
  const base={...validateRequest(input),sourceHash:'a'.repeat(64)};
  assert.equal(base.subjectType,'picture');assert.equal(outputLabel(base),'照片转风格');
  assert.deepEqual(referenceSlots(base),[{kind:'source',id:input.sourceId}]);
  for(const style of STYLE_OPTIONS){
    const job=validateRequest({...input,style:style.id});const prompt=buildPrompt(job);
    assert.ok(prompt.includes(style.prompt));assert.match(prompt,/保留原有主体数量/);assert.match(prompt,/不拆解资源/);
    assert.doesNotMatch(prompt,/移除.*人物|背景只|头饰单独摆放|图1只定义人物骨架/);
    for(const effect of effectsFor(style.id))assert.ok(buildPrompt(validateRequest({...input,style:style.id,effect:effect.id})).includes(effect.prompt));
  }
  for(const patch of [{style:'oil'},{sourceId:`upload-${randomUUID()}`},{sourceHash:'b'.repeat(64)},{transferRevision:0},{effect:effectsFor('watercolor')[0].id},{prompt:'暖色'},{size:'1536x1024'},{quality:'high'},{provider:'api',baseURL:'https://example.com',model:'different'}])assert.notEqual(settingsKey(base),settingsKey({...base,...patch}));
  for(const patch of [{sourceId:'../../etc/passwd'},{sourceId:''},{prompt:3},{background:'transparent'},{style:'missing'},{style:'watercolor',effect:effectsFor('manga')[0].id},{cameraPitch:'high'}])assert.throws(()=>validateRequest({...input,...patch}));
  assert.ok(matchesHistory({...base,status:'completed',imageURL:'/image',createdAt:new Date().toISOString()},{outputType:'style-transfer',style:'watercolor',subjectType:'picture'}));
  assert.equal(matchesHistory({...base,status:'completed',imageURL:'/image',createdAt:new Date().toISOString()},{people:'0'}),false);
});

test('transfer UI recovers an ambiguous submission with the same request after reload and clears results on style change',async()=>{
  const oldDocument=globalThis.document,oldStorage=globalThis.localStorage,nodes=new Map(),storage=new Map(),calls=[];
  const node=()=>({value:'',hidden:false,disabled:false,textContent:'',addEventListener(event,handler){this[event]=handler;},removeAttribute(key){delete this[key];}});
  const get=id=>{if(!nodes.has(id))nodes.set(id,node());return nodes.get(id);};
  globalThis.document={getElementById:get};globalThis.localStorage={getItem:key=>storage.get(key),setItem:(key,value)=>storage.set(key,value)};
  const original={...validateRequest(input),sourceHash:'hash',id:randomUUID(),imageURL:'/saved.png',status:'completed',message:'已保存'};
  const state={jobs:[original],settings:{provider:'quota'}};
  const setup=()=>setupStyleTransfer({state,assetURL:()=>'/source.png',showImage(){},canGenerate:()=>true,connectionSettings:()=>({provider:'quota'}),syncEffects:value=>{get('transfer-effect').value=value||'none';},onJobs:async()=>{},openPage(){},request:async(path,options)=>{
    calls.push({id:options.headers['Idempotency-Key'],body:JSON.parse(options.body)});
    if(calls.length===1)throw Error('response lost');
    return {...original,...calls[0].body,id:calls[0].id};
  }});
  const settled=async()=>{for(let i=0;i<100&&get('transfer-recover').disabled;i++)await sleep(1);};
  try{
    const ui=setup();ui.init();ui.open(original);assert.equal(get('transfer-result').hidden,false);
    get('transfer-style').value='oil';get('transfer-style').change();assert.equal(get('transfer-result').hidden,true);
    get('transfer-form').onsubmit({preventDefault(){},submitter:{id:'transfer-start'}});await settled();
    assert.equal(calls.length,1);assert.equal(get('transfer-recover').hidden,false);assert.equal(get('transfer-style').disabled,true);
    const reloaded=setup();reloaded.init();assert.equal(calls.length,1);assert.equal(get('transfer-style').value,'oil');
    get('transfer-recover').onclick();await settled();assert.equal(calls.length,2);assert.equal(calls[1].id,calls[0].id);assert.deepEqual(calls[1].body,calls[0].body);
    assert.equal(get('transfer-recover').hidden,true);assert.equal(get('transfer-result').hidden,false);
  }finally{globalThis.document=oldDocument;if(oldStorage===undefined)delete globalThis.localStorage;else globalThis.localStorage=oldStorage;}
});

test('photo transfer snapshots the source, queues, cancels, reuses exact results and preserves history across restart',async()=>{
  const original=globalThis.fetch,forms=[];let release,server=await createServer(),base,csrf;
  globalThis.fetch=async(url,options)=>{
    if(!String(url).startsWith('https://transfer.example/'))return original(url,options);
    forms.push({prompt:options.body.get('prompt'),bytes:Buffer.from(await options.body.get('image[]').arrayBuffer())});
    if(forms.length===1)await new Promise(resolve=>release=resolve);
    return Response.json({data:[{b64_json:png.toString('base64')}]});
  };
  const start=async()=>{await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));base=`http://127.0.0.1:${server.address().port}`;csrf=(await(await original(base+'/api/bootstrap')).json()).csrf;};
  const get=async path=>(await original(base+path)).json();
  const post=(path,body,id=randomUUID())=>original(base+path,{method:'POST',headers:{'X-Studio-Token':csrf,'Content-Type':'application/json','Idempotency-Key':id},body:JSON.stringify(body)});
  const wait=async id=>{for(let i=0;i<200;i++){const job=await get(`/api/jobs/${id}`);if(!['queued','running'].includes(job.status))return job;await sleep(10);}throw Error('transfer timeout');};
  try{
    await start();assert.equal((await original(base+'/style-transfer-ui.js')).status,200);await post('/api/settings',{provider:'api',model:'test-image',baseURL:'https://transfer.example/v1',apiKey:'fake-transfer-key'});
    const source=await(await original(base+'/api/uploads/source',{method:'POST',headers:{'X-Studio-Token':csrf},body:png})).json();
    const payload={...input,sourceId:source.id};delete payload.provider;
    const id=randomUUID(),first=await(await post('/api/jobs',payload,id)).json();assert.equal(first.status,'queued');
    for(let i=0;i<100&&!release;i++)await sleep(5);assert.equal(typeof release,'function');
    assert.equal((await(await post('/api/jobs',payload)).json()).id,id);assert.equal(forms.length,1);
    const second=await(await post('/api/jobs',{...payload,style:'oil'})).json();assert.notEqual(second.id,id);assert.equal(second.status,'queued');
    assert.equal((await post(`/api/jobs/${second.id}/cancel`,{})).status,200);
    assert.equal((await post('/api/jobs',{...payload,style:'oil'},id)).status,409);
    const path=join(process.env.STUDIO_DATA_DIR,'uploads',source.id+'.png');await writeFile(path,Buffer.concat([png,Buffer.from('changed')]));
    assert.deepEqual(await readFile(join(process.env.STUDIO_DATA_DIR,'jobs',id,first.sourceSnapshot)),png);
    release();const completed=await wait(id);assert.equal(completed.status,'completed');assert.deepEqual(forms[0].bytes,png);assert.equal(forms.length,1);
    await writeFile(path,png);assert.equal((await(await post('/api/jobs',payload)).json()).id,id);assert.equal(forms.length,1);
    const changed=await(await post('/api/jobs',{...payload,style:'oil'})).json();assert.notEqual(changed.id,id);assert.equal((await wait(changed.id)).status,'completed');assert.equal(forms.length,2);
    const effect=await(await post('/api/jobs',{...payload,effect:effectsFor('watercolor')[0].id})).json();assert.equal((await wait(effect.id)).status,'completed');assert.equal(forms.length,3);
    for(let i=0;i<100&&(await get('/api/queue')).running;i++)await sleep(5);
    await new Promise(resolve=>server.close(resolve));server=await createServer();await start();assert.equal((await(await post('/api/jobs',payload)).json()).id,id);
    assert.equal((await original(base+completed.imageURL)).status,200);assert.ok((await get('/api/jobs')).some(job=>job.id===id));
    assert.equal((await post(`/api/jobs/${id}/import`,{title:'不应入资源库'})).status,400);
    assert.ok(!(await readFile(join(process.env.STUDIO_DATA_DIR,'jobs',id,'job.json'),'utf8')).includes('fake-transfer-key'));
    await writeFile(path,Buffer.concat([png,Buffer.from('changed')]));const newSource=await(await post('/api/jobs',payload)).json();assert.notEqual(newSource.id,id);assert.equal((await wait(newSource.id)).status,'completed');assert.equal(forms.length,4);
  }finally{release?.();globalThis.fetch=original;await new Promise(resolve=>server.close(resolve));}
});
