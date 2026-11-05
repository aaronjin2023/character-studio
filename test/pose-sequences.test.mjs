import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,writeFile,unlink} from 'node:fs/promises';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';
import {DATA,saveUpload,assetPath} from '../catalog.mjs';
import {createServer} from '../server.mjs';
import {sequenceSource,sequenceSettings,sequencePrompt} from '../pose-sequences.mjs';
import {sequenceRequest,sequenceFrames} from '../public/pose-sequences.js';
import {setupPoseSequences} from '../public/pose-sequences-ui.js';
import {settingsKey,outputLabel,matchesHistory} from '../public/job-settings.js';
assert.equal(DATA,process.env.STUDIO_DATA_DIR);assert.match(DATA,/character-studio-test-/);
const png=await readFile(join(DATA,'local-assets/pose/local-baiyi-01-pose.png'));
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const baseInput={action:'右手三步上篮，跨步、起跳、出手、落地',count:8};

test('optional endpoints count toward total; all motion and source settings isolate cache',async()=>{
  for(const count of [2,5,10,30])assert.equal(sequenceRequest({...baseInput,count}).count,count);
  for(const count of [0,1,31,2.5,'8'])assert.throws(()=>sequenceRequest({...baseInput,count}));
  for(const action of ['',null,'x'.repeat(2001)])assert.throws(()=>sequenceRequest({...baseInput,action}));
  assert.throws(()=>sequenceRequest({...baseInput,stylePoseId:'../private'}));
  assert.throws(()=>sequenceRequest({...baseInput,count:2,startPoseId:'a',endPoseId:'b'}));
  assert.deepEqual(sequenceFrames({count:5}),[1,2,3,4,5]);
  assert.deepEqual(sequenceFrames({count:5,startPoseId:'a'}),[2,3,4,5]);
  assert.deepEqual(sequenceFrames({count:5,endPoseId:'b'}),[1,2,3,4]);
  assert.deepEqual(sequenceFrames({count:5,startPoseId:'a',endPoseId:'b'}),[2,3,4]);
  const source=await sequenceSource({...baseInput,outputType:'pose-plan'});
  assert.equal(source.spec.stylePoseId,'local-male-P018-front');assert.equal(source.refs.length,1);
  const job=sequenceSettings({...baseInput,outputType:'pose-plan',provider:'quota'},source);
  assert.equal(outputLabel(job),'动作骨架方案');assert.match(sequencePrompt(job),/右手三步上篮/);assert.match(sequencePrompt(job),/自行设计符合动作的起始姿势/);
  for(const patch of [{action:'顶心肘'},{count:10},{stylePoseId:'other'},{startPoseId:'other'},{endPoseId:'other'},{referenceHashes:['changed']},{poseMetadata:{personCount:2}},{sequenceRevision:2},{provider:'api',model:'other',baseURL:'https://example.com'}])assert.notEqual(settingsKey(job),settingsKey({...job,...patch}));
  const plan={...job,id:randomUUID()},frame=sequenceSettings({outputType:'pose-frame',provider:'quota',frameIndex:4},{plan,planHash:'a'});
  for(const patch of [{frameIndex:5},{planId:randomUUID()},{planHash:'b'}])assert.notEqual(settingsKey(frame),settingsKey({...frame,...patch}));
  assert.match(sequencePrompt(frame),/图 2 是已查看的完整动作方案/);assert.match(sequencePrompt(frame),/t=3\/7=/);
  assert.ok(matchesHistory({...frame,status:'completed',imageURL:'/img'},{outputType:'pose-frame',query:'上篮'}));
  await assert.rejects(sequenceSource({...baseInput,outputType:'pose-plan',stylePoseId:'local-male-P018-front',startPoseId:'full_single_P018_front'}),/类型.*不一致/);
  await assert.rejects(sequenceSource({...baseInput,outputType:'pose-plan',startPoseId:'full_single_P018_front',endPoseId:'pair60_P001_front'}),/数量不一致/);
});

test('all four endpoint modes generate only missing frames using the original snapshots and one shared plan',async()=>{
  const original=globalThis.fetch,requests=[];let hold=true,release,fail=true;
  globalThis.fetch=async(url,options)=>{
    if(!String(url).startsWith('https://motion.example/'))return original(url,options);
    const prompt=options.body.get('prompt'),images=await Promise.all(options.body.getAll('image[]').map(async image=>Buffer.from(await image.arrayBuffer())));
    requests.push({prompt,images});
    if(hold){hold=false;await new Promise(resolve=>release=resolve);}
    if(fail&&prompt.includes('本次仅输出第 3/8 帧')){fail=false;return Response.json({error:{message:'模拟单帧失败'}},{status:400});}
    return Response.json({data:[{b64_json:Buffer.concat([png,Buffer.from(`result-${requests.length}`)]).toString('base64')}]});
  };
  let server=await createServer(),base,csrf;
  const get=async path=>(await original(base+path)).json();
  const start=async()=>{await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));base=`http://127.0.0.1:${server.address().port}`;csrf=(await get('/api/bootstrap')).csrf;};
  const post=(path,input,id=randomUUID())=>original(base+path,{method:'POST',headers:{'X-Studio-Token':csrf,'Content-Type':'application/json','Idempotency-Key':id},body:JSON.stringify(input)});
  const wait=async id=>{for(let i=0;i<500;i++){const job=await get(`/api/jobs/${id}`);if(!['queued','running'].includes(job.status))return job;await sleep(10);}throw new Error('motion timeout');};
  try{
    await start();await post('/api/settings',{provider:'api',model:'motion-test',baseURL:'https://motion.example/v1',apiKey:'fake-motion-key'});
    assert.equal((await post('/api/jobs',{...baseInput,outputType:'pose-plan',action:''})).status,400);assert.equal(requests.length,0);
    const startPose=await saveUpload('pose',png,'start.png'),endBytes=Buffer.concat([png,Buffer.from('end')]),endPose=await saveUpload('pose',endBytes,'end.png');
    const input={...baseInput,outputType:'pose-plan',startPoseId:startPose.id,endPoseId:endPose.id},planID=randomUUID();
    const plan=await(await post('/api/jobs',input,planID)).json();assert.equal(plan.id,planID);
    for(let i=0;i<200&&!release;i++)await sleep(5);assert.ok(release);
    assert.equal((await post('/api/pose-sequences',{planId:plan.id})).status,400);
    release();assert.equal((await wait(plan.id)).status,'completed');assert.equal(requests.length,1);assert.equal(requests[0].images.length,3);
    assert.equal((await(await post('/api/jobs',input)).json()).id,plan.id);
    assert.equal((await post('/api/jobs',{...input,action:'改变动作'},planID)).status,409);
    assert.equal((await post(`/api/jobs/${plan.id}/import`,{title:'不能作为骨架'})).status,400);
    const planBytes=await readFile(join(DATA,'jobs',plan.id,'result.png'));
    // Generation and endpoint playback must survive deletion/change of the original assets.
    await writeFile(await assetPath('pose',startPose.id),Buffer.concat([png,Buffer.from('changed')]));
    await unlink(await assetPath('pose',endPose.id));
    assert.deepEqual(Buffer.from(await(await original(base+`/api/pose-sequences/${plan.id}/start`)).arrayBuffer()),png);
    assert.deepEqual(Buffer.from(await(await original(base+`/api/pose-sequences/${plan.id}/end`)).arrayBuffer()),endBytes);
    hold=true;release=null;const batchID=randomUUID(),batch=await(await post('/api/pose-sequences',{planId:plan.id},batchID)).json();
    assert.equal(batch.count,6);assert.equal(batch.totalCount,8);assert.deepEqual(batch.items.map(job=>job.frameIndex),[2,3,4,5,6,7]);
    for(let i=0;i<200&&!release;i++)await sleep(5);assert.ok(release);
    const repeated=await(await post('/api/pose-sequences',{planId:plan.id},batchID)).json();assert.deepEqual(repeated.items.map(job=>job.id),batch.items.map(job=>job.id));
    const cachedWaiting=await(await post('/api/pose-sequences',{planId:plan.id})).json();assert.deepEqual(cachedWaiting.items.map(job=>job.id),batch.items.map(job=>job.id));
    const cancelled=batch.items.find(job=>job.frameIndex===4);assert.equal((await post(`/api/jobs/${cancelled.id}/cancel`,{})).status,200);
    release();for(const job of batch.items)await wait(job.id);assert.equal(requests.length,6);
    for(const request of requests.slice(1))assert.deepEqual(request.images,[png,png,endBytes,planBytes]);
    let view=await get(`/api/pose-sequences/${plan.id}`);assert.equal(view.items.length,8);assert.equal(view.items[0].assetId,startPose.id);assert.equal(view.items[7].assetId,endPose.id);assert.equal(view.items[2].job.status,'failed');assert.equal(view.items[3].job.status,'cancelled');
    const fill=await(await post('/api/pose-sequences',{planId:plan.id})).json();for(const job of fill.items)assert.equal((await wait(job.id)).status,'completed');assert.equal(requests.length,8);
    const imported=await(await post(`/api/jobs/${fill.items[0].id}/import`,{title:'上篮第二帧'})).json();
    assert.equal(imported.kind,'pose');assert.equal(imported.poseSequence.planId,plan.id);assert.equal(imported.poseSequence.frameIndex,2);assert.equal(imported.poseSequence.count,8);assert.equal(imported.personCount,1);assert.ok(imported.tags.includes('动作骨架序列'));
    await new Promise(resolve=>server.close(resolve));server=await createServer();await start();
    view=await get(`/api/pose-sequences/${plan.id}`);assert.equal(view.items[1].saved.resourceId,imported.id);assert.equal(JSON.stringify(view).includes('fake-motion-key'),false);
    await post('/api/pose-sequences',{planId:plan.id});assert.equal(requests.length,8);
    assert.equal((await post('/api/pose-sequences',{planId:randomUUID()},batchID)).status,409);
    for(const endpoints of [{},{startPoseId:'full_single_P018_front'},{endPoseId:'full_single_P018_front'}]){
      const before=requests.length,p=await(await post('/api/jobs',{...baseInput,count:3,outputType:'pose-plan',...endpoints})).json();assert.equal((await wait(p.id)).status,'completed');
      const b=await(await post('/api/pose-sequences',{planId:p.id})).json();assert.equal(b.totalCount,3);assert.equal(b.count,3-Object.keys(endpoints).length);
      for(const job of b.items)assert.equal((await wait(job.id)).status,'completed');
      assert.equal(requests.length,before+1+b.count);assert.equal((await get(`/api/pose-sequences/${p.id}`)).items.length,3);
    }
    const different=await(await post('/api/jobs',{...baseInput,outputType:'pose-plan',action:'向前跨步然后收势'})).json();assert.notEqual(different.id,plan.id);await wait(different.id);
    const lastCount=requests.length,reroll=await(await post('/api/jobs',{...baseInput,outputType:'pose-plan',action:'向前跨步然后收势',regenerate:true})).json();assert.notEqual(reroll.id,different.id);await wait(reroll.id);assert.equal(requests.length,lastCount+1);
    assert.ok((await get('/api/pose-sequences')).some(p=>p.id===plan.id));
  }finally{release?.();globalThis.fetch=original;if(server.listening)await new Promise(resolve=>server.close(resolve));}
});

test('UI persists optional endpoints and motion text, and recovers lost plan and frame submissions without duplicating IDs',async()=>{
  const previous=Object.fromEntries(['document','localStorage','Option'].map(key=>[key,globalThis[key]])),drafts=new Map(),posts=[],plans=[];
  let nodes=new Map(),lostPlan=true,lostFrames=true;
  const node=()=>({value:'',textContent:'',children:[],append(...items){this.children.push(...items);},replaceChildren(...items){this.children=items;},setAttribute(){},removeAttribute(){}});
  const field=id=>{if(!nodes.has(id))nodes.set(id,node());return nodes.get(id);};
  globalThis.document={getElementById:id=>field(id.replace('motion-',''))};globalThis.Option=class{constructor(text,value){this.textContent=text;this.value=value;}};
  globalThis.localStorage={getItem:key=>drafts.get(key),setItem:(key,value)=>drafts.set(key,value)};
  const flush=async()=>{for(let i=0;i<12;i++)await new Promise(resolve=>setImmediate(resolve));};
  const setup=()=>setupPoseSequences({state:{catalogs:{pose:[]},uploads:[],settings:{},resourceMode:'pose-sequences'},canGenerate:()=>true,element:node,assetURL:()=>'/pose.png',showImage(){},onResources(){},onJobs(){},openPage(){},request:async(path,options)=>{
    if(!options)return path==='/api/pose-sequences'?plans:{plan:plans[0],items:[]};
    const payload=JSON.parse(options.body);posts.push({path,id:options.headers['Idempotency-Key'],payload});
    if(path==='/api/jobs'){if(!plans.length)plans.push({...payload,id:posts[0].id,title:'上篮',createdAt:new Date().toISOString(),status:'completed',message:'完成',imageURL:'/plan'});if(lostPlan){lostPlan=false;throw new Error('response lost');}return plans[0];}
    if(lostFrames){lostFrames=false;throw new Error('response lost');}return {planId:plans[0].id,count:5,totalCount:5};
  }});
  try{
    let ui=setup();ui.enter();await flush();field('action').value='三步上篮';field('action').oninput();field('count').value='5';field('count').oninput();assert.equal(field('plan-start').disabled,false);
    field('form').onsubmit({preventDefault(){}});await flush();assert.equal(field('recover').hidden,false);assert.equal(posts[0].payload.count,5);assert.equal(posts[0].payload.startPoseId,'');
    nodes=new Map();ui=setup();ui.enter();await flush();assert.equal(field('action').value,'三步上篮');assert.equal(field('action').disabled,true);assert.equal(posts.length,1);
    field('recover').onclick();await flush();assert.deepEqual(posts[1],posts[0]);assert.equal(field('recover').hidden,true);assert.equal(field('frames-start').disabled,false);
    field('frames-start').onclick();await flush();assert.equal(field('recover').hidden,false);await ui.refresh();assert.equal(posts.length,3);
    nodes=new Map();ui=setup();ui.enter();await flush();field('recover').onclick();await flush();assert.deepEqual(posts[3],posts[2]);assert.equal(field('recover').hidden,true);
    field('count').value='';field('count').oninput();await ui.refresh();assert.equal(field('count').value,'');assert.equal(field('plan-start').disabled,true);
  }finally{for(const [key,value] of Object.entries(previous)){if(value===undefined)delete globalThis[key];else globalThis[key]=value;}}
});
