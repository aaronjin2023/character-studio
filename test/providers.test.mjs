import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,writeFile,readFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';
const {validateWorkflows,fillWorkflow,generateComfy}=await import('../comfy.mjs');
const {createServer}=await import('../server.mjs');
const {settingsKey}=await import('../public/job-settings.js');
const {extractionKey}=await import('../public/extraction-settings.js');
const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aQ1kAAAAASUVORK5CYII=','base64');
const key='fake-comfy-token-only-for-tests';
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const graph=(count=0)=>({outputNode:'out',workflow:{...Object.fromEntries(Array.from({length:count},(_,i)=>[`i${i+1}`,{class_type:'LoadImage',inputs:{image:`{{image${i+1}}}`}}])),generate:{class_type:'MockGeneration',inputs:{text:'{{prompt}}',width:'{{width}}',height:'{{height}}',seed:'{{seed}}',...Object.fromEntries(Array.from({length:count},(_,i)=>[`reference${i+1}`,[`i${i+1}`,0]]))}},out:{class_type:'SaveImage',inputs:{images:['generate',0]}}}});
const workflows={'0':graph(),'1':graph(1),'2':graph(2),'3':graph(3)};
const hash=validateWorkflows(workflows).hash;
const comfy={baseURL:'https://comfy.example',authHeader:'bearer',workflowHash:hash,requiresToken:true};
const scene={outputType:'background',title:'测试场景',prompt:'水墨竹林',style:'ink',effect:'none',background:'opaque',size:'1536x1024',quality:'medium'};

test('Comfy workflow validation preserves exact reference coverage and cache identity',()=>{
  const inputs=fillWorkflow(graph(1),{prompt:'literal {{image2}}',image1:'remote/test.png',width:1536,height:1024,seed:42});
  assert.equal(inputs.generate.inputs.text,'literal {{image2}}');assert.equal(inputs.generate.inputs.width,1536);assert.equal(inputs.i1.inputs.image,'remote/test.png');
  assert.throws(()=>validateWorkflows({'1':graph(0)}),/image1/);
  const disconnected=graph(1);delete disconnected.workflow.generate.inputs.reference1;assert.throws(()=>validateWorkflows({'1':disconnected}),/image1/);
  assert.throws(()=>validateWorkflows({'0':graph(1)}),/多余/);
  assert.throws(()=>validateWorkflows({'0':{...graph(),outputNode:'missing'}}));
  assert.throws(()=>validateWorkflows({'0':{workflow:{nodes:[]},outputNode:'nodes'}}),/API 格式/);
  const secret=graph();secret.workflow.generate.inputs.api_key=key;assert.throws(()=>validateWorkflows({'0':secret}),/不能包含密钥/);
  const unusedSecret=graph();unusedSecret.workflow.unused={class_type:'Other',inputs:{api_key:key}};assert.throws(()=>validateWorkflows({'0':unusedSecret}),/不能包含密钥/);
  const job={...scene,provider:'comfyui',comfy};
  assert.notEqual(settingsKey(job),settingsKey({...job,comfy:{...comfy,workflowHash:'b'.repeat(64)}}));
  const extraction={provider:'comfyui',comfy,sourceId:'source',prompt:'',inferHidden:true};assert.notEqual(extractionKey(extraction),extractionKey({...extraction,comfy:{...comfy,baseURL:'https://other.example'}}));
});

test('Comfy uploads references in order, substitutes typed inputs, polls once submitted and downloads exactly one output',async()=>{
  const path=join(process.env.STUDIO_DATA_DIR,'source.png');await writeFile(path,png);const calls=[];let polls=0,remote;
  const fetcher=async(url,options)=>{
    calls.push({url:String(url),options});assert.equal(options.headers.Authorization,`Bearer ${key}`);assert.equal(options.redirect,'error');
    if(String(url).endsWith('/upload/image')){assert.equal(options.body.get('type'),'input');return Response.json({name:'reference.png',subfolder:'studio',type:'input'});}
    if(String(url).endsWith('/prompt')){const body=JSON.parse(options.body);assert.equal(body.prompt.i1.inputs.image,'studio/reference.png');assert.equal(body.prompt.generate.inputs.text,'完整提示词');assert.equal(body.prompt.generate.inputs.width,1536);return Response.json({prompt_id:'remote-test',node_errors:{}});}
    if(String(url).includes('/history/'))return Response.json(++polls===1?{}:{'remote-test':{status:{completed:true,status_str:'success'},outputs:{out:{images:[{filename:'result.png',subfolder:'studio',type:'output'}]}}}});
    return new Response(png);
  };
  const result=await generateComfy({...scene,provider:'comfyui',comfy,resolvedPrompt:'完整提示词'},[path],key,workflows,()=>{},{fetcher,pollMS:1,onRemote:async data=>remote=data});
  assert.deepEqual(result.bytes,png);assert.equal(remote.promptId,'remote-test');assert.equal(calls.filter(call=>call.url.endsWith('/prompt')).length,1);
  assert.match(calls.at(-1).url,/view\?filename=result.png/);
});

test('Comfy failures do not resubmit and cancellation never interrupts other agents',async()=>{
  const controller=new AbortController(),calls=[];
  const fetcher=async(url,options)=>{calls.push(String(url));if(String(url).endsWith('/prompt'))return Response.json({prompt_id:'own-job'});if(String(url).endsWith('/queue')){assert.deepEqual(JSON.parse(options.body),{delete:['own-job']});return Response.json({});}return Response.json({});};
  await assert.rejects(generateComfy({...scene,comfy,resolvedPrompt:'prompt'},[],key,workflows,()=>{},{fetcher,signal:controller.signal,onRemote:async()=>controller.abort(),pollMS:1}),/停止等待/);
  assert.equal(calls.some(url=>url.endsWith('/interrupt')),false);assert.equal(calls.filter(url=>url.endsWith('/prompt')).length,1);
  let submissions=0;
  await assert.rejects(generateComfy({...scene,comfy,resolvedPrompt:'prompt'},[],key,workflows,()=>{},{fetcher:async url=>{if(String(url).endsWith('/prompt')){submissions++;return Response.json({prompt_id:'failed'});}return Response.json({failed:{status:{status_str:'error'},outputs:{}}});},pollMS:1}),/执行失败/);assert.equal(submissions,1);
});

test('settings, queue, extraction and saved images share the Comfy pipeline without exposing credentials',async()=>{
  const original=globalThis.fetch;let submissions=0,uploads=0;const prompts=[];
  globalThis.fetch=async(url,options)=>{
    const target=String(url);
    if(!target.startsWith('https://comfy.example'))return original(url,options);
    assert.equal(options.headers.Authorization,`Bearer ${key}`);
    if(target.endsWith('/system_stats'))return Response.json({system:{},devices:[{name:'Mock GPU'}]});
    if(target.endsWith('/upload/image'))return Response.json({name:`input-${++uploads}.png`,type:'input'});
    if(target.endsWith('/prompt')){submissions++;prompts.push(JSON.parse(options.body));return Response.json({prompt_id:`job-${submissions}`});}
    if(target.includes('/history/')){const id=target.split('/').at(-1);return Response.json({[id]:{status:{completed:true},outputs:{out:{images:[{filename:'output.png',subfolder:'',type:'output'}]}}}});}
    return new Response(png);
  };
  let server=await createServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));let base=`http://127.0.0.1:${server.address().port}`,csrf=(await(await original(base+'/api/bootstrap')).json()).csrf;
  const post=(path,input,id=randomUUID())=>original(base+path,{method:'POST',headers:{'X-Studio-Token':csrf,'Content-Type':'application/json','Idempotency-Key':id},body:JSON.stringify(input)});
  const get=async path=>(await original(base+path)).json();
  const wait=async id=>{for(let i=0;i<100;i++){const job=await get(`/api/jobs/${id}`);if(!['queued','running'].includes(job.status))return job;await sleep(10);}throw new Error('timeout');};
  try{
    const config={provider:'comfyui',comfy:{baseURL:comfy.baseURL,authHeader:'bearer',apiKey:key,workflows}};
    const saved=await(await post('/api/settings',config)).json();assert.equal(saved.provider,'comfyui');assert.equal(saved.comfy.hasApiKey,true);
    assert.equal((await post('/api/comfy/check',{})).status,200);
    const id=randomUUID();const accepted=await post('/api/jobs',scene,id);assert.equal(accepted.status,202);const completed=await wait(id);assert.equal(completed.status,'completed',completed.message);assert.equal(completed.remoteJobs.image.promptId,'job-1');assert.equal(submissions,1);
    assert.match(prompts[0].prompt.generate.inputs.text,/水墨/);
    assert.equal((await post('/api/jobs',scene)).status,200);
    const response=await original(base+'/api/uploads/source',{method:'POST',headers:{'X-Studio-Token':csrf},body:png});const source=await response.json();
    const extraction=await(await post('/api/extractions',{sourceId:source.id,title:'头像',subjectType:'human',resourceKinds:['face'],subjects:[{gender:'reference',position:''}],prompt:'',inferHidden:true})).json();assert.equal((await wait(extraction.id)).status,'completed');assert.equal(uploads,1);
    const jobFile=await readFile(join(process.env.STUDIO_DATA_DIR,'jobs',id,'job.json'),'utf8');assert.equal(jobFile.includes(key),false);assert.equal(jobFile.includes('MockGeneration'),false);
    const changed=structuredClone(workflows);changed['0'].workflow.generate.inputs.extra='another workflow';await post('/api/settings',{...config,comfy:{...config.comfy,workflows:changed}});const next=await(await post('/api/jobs',scene)).json();assert.notEqual(next.id,id);assert.equal((await wait(next.id)).status,'completed');
    await post('/api/settings',{...config,comfy:{...config.comfy,workflows:{'0':graph()}}});const before=submissions;
    const missing=await post('/api/extractions',{sourceId:source.id,title:'缺工作流',subjectType:'human',resourceKinds:['pose'],subjects:[{gender:'reference',position:''}],prompt:'',inferHidden:true});assert.equal(missing.status,400);assert.match((await missing.json()).error,/2 张参考图/);assert.equal(submissions,before);
    await new Promise(resolve=>server.close(resolve));server=await createServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));base=`http://127.0.0.1:${server.address().port}`;csrf=(await get('/api/bootstrap')).csrf;
    const restored=await get('/api/settings');assert.equal(restored.comfy.hasApiKey,true);assert.equal((await get(`/api/jobs/${id}`)).status,'completed');
  }finally{globalThis.fetch=original;await new Promise(resolve=>server.close(resolve));}
});
