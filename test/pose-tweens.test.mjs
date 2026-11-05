import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';
import {DATA,saveResource,saveUpload,assetPath} from '../catalog.mjs';
import {createServer} from '../server.mjs';
import {tweenSource,tweenSettings,tweenPrompt} from '../pose-tweens.mjs';
import {tweenRequest} from '../public/pose-tweens.js';
import {settingsKey,referenceSlots,outputLabel,matchesHistory} from '../public/job-settings.js';
import {setupPoseTweens} from '../public/pose-tweens-ui.js';

assert.equal(DATA,process.env.STUDIO_DATA_DIR,'Use the isolated fixture preload');
assert.match(DATA,/character-studio-test-/);
const png=await readFile(join(DATA,'local-assets/pose/local-baiyi-01-pose.png'));
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const input={startPoseId:'full_single_P018_front',endPoseId:'full_sexy_P001_high',count:5};

test('tween count excludes endpoints; progress, references and cache describe each exact frame',async()=>{
  const source=await tweenSource(input);
  for(const count of [5,10])for(let frameIndex=1;frameIndex<=count;frameIndex++){
    const job=tweenSettings({...input,count,frameIndex,provider:'quota'},source);
    assert.match(tweenPrompt(job),new RegExp(`t=${frameIndex}/${count+1}`));
    assert.equal(outputLabel(job),'骨架补间');
    assert.deepEqual(referenceSlots(job),[{kind:'pose',id:input.startPoseId},{kind:'pose',id:input.endPoseId}]);
    assert.ok(matchesHistory({...job,status:'completed',imageURL:'/image'},{outputType:'pose-tween',people:'1'}));
    for(const patch of [{count:count+1},{frameIndex:frameIndex+1},{startPoseId:'other'},{endPoseId:'other'},{startHash:'new'},{endHash:'new'},{tweenRevision:2},{size:'1024x1024'},{provider:'api',model:'other',baseURL:'https://example.com'}])assert.notEqual(settingsKey(job),settingsKey({...job,...patch}));
  }
  for(const count of [0,-1,1.5,31,'5',NaN])assert.throws(()=>tweenRequest({...input,count}));
  assert.throws(()=>tweenRequest({...input,endPoseId:input.startPoseId}));
  assert.throws(()=>tweenRequest({...input,startPoseId:'../outside'}));
  assert.throws(()=>tweenSettings({...input,frameIndex:6,provider:'quota'},source));
});

test('endpoint metadata rejects incompatible counts, types, species and anatomy',async()=>{
  await assert.rejects(tweenSource({...input,endPoseId:'pair60_P001_front'}),/数量不一致/);
  await assert.rejects(tweenSource({...input,endPoseId:'local-male-P018-front'}),/类型.*不一致/);
  const pose=async(subjectType,species,anatomy)=>saveResource({id:randomUUID(),createdAt:new Date().toISOString(),subjectType},'pose','测试骨架',png,{species,anatomy});
  const cat=await pose('animal','猫'),dog=await pose('animal','狗');
  await assert.rejects(tweenSource({...input,endPoseId:cat.id}),/同一主体类别/);
  await assert.rejects(tweenSource({...input,startPoseId:cat.id,endPoseId:dog.id}),/物种.*不一致/);
  const naga=await pose('fantasy-humanoid','娜迦','六臂蛇尾'),other=await pose('fantasy-humanoid','娜迦','双臂蛇尾');
  await assert.rejects(tweenSource({...input,startPoseId:naga.id,endPoseId:other.id}),/身体结构.*不一致/);
  const upload=await saveUpload('pose',png,'未知人数.png');
  assert.equal((await tweenSource({...input,startPoseId:upload.id})).metadata.personCount,1);
  await assert.rejects(tweenSource({...input,startPoseId:upload.id,endPoseId:'pair60_P001_front'}),/数量不一致/);
});

test('UI uses the typed count immediately and recovers a lost response with the same request ID',async()=>{
  const previous=Object.fromEntries(['document','localStorage','Option'].map(key=>[key,globalThis[key]])),drafts=new Map(),posts=[],records=[];
  let nodes=new Map(),lost=true;
  const node=()=>({value:'',textContent:'',children:[],append(...items){this.children.push(...items);},replaceChildren(...items){this.children=items;},setAttribute(){},removeAttribute(){}});
  const field=id=>{if(!nodes.has(id))nodes.set(id,node());return nodes.get(id);};
  globalThis.document={getElementById:id=>field(id.replace('tween-',''))};
  globalThis.Option=class{constructor(text,value){this.textContent=text;this.value=value;}};
  globalThis.localStorage={getItem:key=>drafts.get(key),setItem:(key,value)=>drafts.set(key,value)};
  const flush=async()=>{for(let i=0;i<8;i++)await new Promise(resolve=>setImmediate(resolve));};
  const setup=()=>setupPoseTweens({
    state:{catalogs:{pose:[]},uploads:[],settings:{}},canGenerate:()=>true,element:node,assetURL:()=>'/pose.png',showImage(){},onResources(){},onJobs(){},openPage(){},
    request:async(path,options)=>{
      if(!options)return path==='/api/pose-tweens'?records:records[0];
      const payload=JSON.parse(options.body);posts.push({id:options.headers['Idempotency-Key'],payload});
      if(lost){lost=false;records.push({...payload,id:posts[0].id,name:'补间测试',createdAt:new Date().toISOString(),items:[]});throw new Error('response lost');}
      return records[0];
    }
  });
  try{
    let ui=setup();ui.enter();await flush();
    field('start').value=input.startPoseId;field('start').onchange();field('end').value=input.endPoseId;field('end').onchange();
    field('count').value='10';field('count').oninput();assert.match(field('count-help').textContent,/12 张顺序图/);assert.equal(field('submit').disabled,false);
    field('form').onsubmit({preventDefault(){}});await flush();assert.equal(posts[0].payload.count,10);assert.equal(field('recover').hidden,false);
    nodes=new Map();ui=setup();ui.enter();await flush();assert.equal(field('count').value,10);assert.equal(field('start').disabled,true);
    await ui.refresh();assert.equal(posts.length,1,'polling must never resubmit');
    field('recover').onclick();await flush();assert.deepEqual(posts[1],posts[0]);assert.equal(field('recover').hidden,true);
    field('count').value='';field('count').oninput();await ui.refresh();assert.equal(field('count').value,'');assert.equal(field('submit').disabled,true);
  }finally{for(const [key,value] of Object.entries(previous)){if(value===undefined)delete globalThis[key];else globalThis[key]=value;}}
});

test('5 and 10 frames queue in order, snapshot both endpoints, resume missing frames and survive restart',async()=>{
  const original=globalThis.fetch,requests=[];let hold=true,release,fail=true;
  globalThis.fetch=async(url,options)=>{
    if(!String(url).startsWith('https://tween.example/'))return original(url,options);
    const prompt=options.body.get('prompt'),images=await Promise.all(options.body.getAll('image[]').map(async image=>Buffer.from(await image.arrayBuffer())));
    requests.push({prompt,images});
    if(hold){hold=false;await new Promise(resolve=>release=resolve);}
    if(fail&&prompt.includes('t=3/6')){fail=false;return Response.json({error:{message:'模拟第三帧失败'}},{status:400});}
    return Response.json({data:[{b64_json:png.toString('base64')}]});
  };
  let server=await createServer(),base,csrf;
  const start=async()=>{await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));base=`http://127.0.0.1:${server.address().port}`;csrf=(await get('/api/bootstrap')).csrf;};
  const get=async path=>(await original(base+path)).json();
  const post=(path,input,id=randomUUID())=>original(base+path,{method:'POST',headers:{'X-Studio-Token':csrf,'Content-Type':'application/json','Idempotency-Key':id},body:JSON.stringify(input)});
  const wait=async id=>{for(let i=0;i<500;i++){const job=await get('/api/jobs/'+id);if(!['queued','running'].includes(job.status))return job;await sleep(10);}throw new Error('tween timeout');};
  try{
    await start();await post('/api/settings',{provider:'api',model:'tween-test',baseURL:'https://tween.example/v1',apiKey:'fake-tween-key'});
    for(const bad of [{...input,count:0},{...input,count:31},{...input,endPoseId:'pair60_P001_front'},{...input,endPoseId:input.startPoseId}])assert.equal((await post('/api/pose-tweens',bad)).status,400);
    assert.equal(requests.length,0);assert.equal((await get('/api/pose-tweens')).length,0);
    const startPose=await saveUpload('pose',png,'start.png'),endBytes=Buffer.concat([png,Buffer.from('end')]),endPose=await saveUpload('pose',endBytes,'end.png');
    const payload={startPoseId:startPose.id,endPoseId:endPose.id,count:5},batchID=randomUUID();
    const response=await post('/api/pose-tweens',payload,batchID);assert.equal(response.status,202);const batch=await response.json();
    assert.equal(batch.count,5);assert.deepEqual(batch.items.map(job=>job.frameIndex),[1,2,3,4,5]);
    for(let i=0;i<200&&!release;i++)await sleep(5);assert.ok(release);
    const repeated=await(await post('/api/pose-tweens',payload,batchID)).json();assert.deepEqual(repeated.items.map(job=>job.id),batch.items.map(job=>job.id));
    const reused=await(await post('/api/pose-tweens',payload)).json();assert.deepEqual(reused.items.map(job=>job.id),batch.items.map(job=>job.id));
    assert.equal((await post('/api/pose-tweens',{...payload,count:10},batchID)).status,409);
    assert.equal((await post(`/api/jobs/${batch.items[3].id}/cancel`,{})).status,200);
    // Queued frames must still use submission-time references if a source file changes.
    const endPath=await assetPath('pose',endPose.id);await writeFile(endPath,Buffer.concat([png,Buffer.from('later')]));
    release();for(const job of batch.items)await wait(job.id);
    assert.equal(requests.length,4);
    for(const request of requests){assert.equal(request.images.length,2);assert.deepEqual(request.images,[png,endBytes]);}
    const detail=await get('/api/batches/'+batchID);assert.deepEqual(detail.items.map(job=>job.status),['completed','completed','failed','cancelled','completed']);
    await writeFile(endPath,endBytes);
    const fill=await(await post('/api/pose-tweens',payload)).json();for(const job of fill.items)assert.equal((await wait(job.id)).status,'completed');
    assert.equal(requests.length,6);
    for(const index of [0,1,4])assert.equal(fill.items[index].id,batch.items[index].id);
    for(const index of [2,3])assert.notEqual(fill.items[index].id,batch.items[index].id);
    const saved=await get('/api/batches/'+fill.id);assert.deepEqual(saved.items.map(job=>job.frameIndex),[1,2,3,4,5]);
    assert.equal(saved.startPoseId,startPose.id);assert.equal(saved.endPoseId,endPose.id);
    assert.equal(JSON.stringify(saved).includes('fake-tween-key'),false);
    const imported=await(await post(`/api/jobs/${saved.items[2].id}/import`,{title:'第三张补间'})).json();
    assert.equal(imported.kind,'pose');assert.equal(imported.personCount,1);assert.equal(imported.poseTween.frameIndex,3);assert.equal(imported.poseTween.count,5);assert.equal(imported.poseTween.startPoseId,startPose.id);assert.ok(imported.tags.includes('骨架补间'));
    assert.equal((await original(base+`/assets/pose/${imported.id}`)).status,200);
    assert.ok((await get('/api/bootstrap')).catalogs.pose.some(item=>item.id===imported.id));
    await new Promise(resolve=>server.close(resolve));server=await createServer();await start();
    assert.equal((await get('/api/batches/'+fill.id)).items[2].resourceId,imported.id);
    const again=await(await post('/api/pose-tweens',payload)).json();assert.deepEqual(again.items.map(job=>job.id),fill.items.map(job=>job.id));assert.equal(requests.length,6);
    const ten=await(await post('/api/pose-tweens',{...payload,count:10})).json();assert.equal(ten.count,10);
    for(const job of ten.items)assert.equal((await wait(job.id)).status,'completed');assert.equal(requests.length,16);
    for(let i=0;i<10;i++)assert.ok(requests[i+6].prompt.includes(`t=${i+1}/11`));
    assert.ok((await get('/api/pose-tweens')).some(item=>item.id===ten.id&&item.count===10));
  }finally{release?.();globalThis.fetch=original;if(server.listening)await new Promise(resolve=>server.close(resolve));}
});
