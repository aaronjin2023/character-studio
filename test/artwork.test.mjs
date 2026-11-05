import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';
import {setTimeout as sleep} from 'node:timers/promises';

const {createServer}=await import('../server.mjs');
const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aQ1kAAAAASUVORK5CYII=','base64');

test('one original and zero written instructions produce two reviewable resources and resume only the missing output',async()=>{
  const server=await createServer();
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base='http://127.0.0.1:'+server.address().port;
  const original=globalThis.fetch,calls=[];
  const csrf=(await(await original(base+'/api/bootstrap')).json()).csrf;
  const post=(path,input,id=randomUUID())=>original(base+path,{method:'POST',headers:{'X-Studio-Token':csrf,'Content-Type':'application/json','Idempotency-Key':id},body:JSON.stringify(input)});
  const upload=async name=>(await(await original(base+'/api/uploads/source',{method:'POST',headers:{'X-Studio-Token':csrf,'X-File-Name':name},body:png})).json()).id;
  const wait=async id=>{
    for(let i=0;i<200;i++){
      const job=await(await original(base+'/api/jobs/'+id)).json();
      if(!['running','queued'].includes(job.status))return job;
      await sleep(10);
    }
    throw Error('test job did not finish');
  };
  globalThis.fetch=async(url,options)=>{
    if(!String(url).startsWith('https://artwork.example/'))return original(url,options);
    const form=options.body,refs=form.getAll('image[]');
    assert.equal(refs.length,1);
    calls.push({prompt:form.get('prompt'),size:form.get('size'),bytes:Buffer.from(await refs[0].arrayBuffer())});
    return calls.length===2?Response.json({error:{message:'test interruption'}},{status:400}):Response.json({data:[{b64_json:png.toString('base64')}]});
  };
  try{
    assert.equal((await post('/api/settings',{provider:'api',model:'mock',baseURL:'https://artwork.example/v1',apiKey:'test-only-artwork'})).status,200);
    const sourceId=await upload('anonymous.png'),payload={renderMode:'live-action',sourceId};
    for(const invalid of [{resourceKinds:['pose']},{resourceKinds:[]},{prompt:'handcrafted instructions'},{renderMode:'other'}])assert.equal((await post('/api/extractions',{...payload,...invalid})).status,400);
    const id=randomUUID();
    assert.equal((await post('/api/extractions',payload,id)).status,202);
    assert.equal((await post('/api/extractions',payload,id)).status,200);
    const failed=await wait(id);
    assert.equal(failed.status,'failed');assert.deepEqual(Object.keys(failed.outputs),['costume']);
    assert.equal(failed.prompt,'');assert.equal(calls.length,2);
    await writeFile(join(process.env.STUDIO_DATA_DIR,'uploads',sourceId+'.png'),Buffer.concat([png,Buffer.from('changed')]));
    assert.deepEqual(Buffer.from(await(await original(base+'/api/extractions/'+id+'/image/source')).arrayBuffer()),png);
    assert.equal((await post('/api/extractions/'+id+'/resume',{})).status,202);
    const job=await wait(id);assert.equal(job.status,'completed');assert.deepEqual(Object.keys(job.outputs),['costume','face']);
    assert.deepEqual(calls.map(call=>call.size),['1024x1536','1024x1024','1024x1024']);
    assert.match(calls[0].prompt,/practical wardrobe product photograph/);assert.match(calls[2].prompt,/live-action casting/);
    assert.match(calls[2].prompt,/bareheaded portrait/);assert.match(calls[2].prompt,/ear shape, horns/);
    assert.match(calls[2].prompt,/Remove all detachable head and face ornaments/);
    assert.match(calls[0].prompt,/Include every visible detachable head and face ornament/);
    assert.match(calls[0].prompt,/Arrange each removable ornament separately/);
    assert.doesNotMatch(calls[2].prompt,/hair, headwear|visible head accessories/);assert.doesNotMatch(calls[0].prompt,/bareheaded portrait/);
    for(const call of calls){assert.deepEqual(call.bytes,png);assert.doesNotMatch(call.prompt,/anonymous|Additional user requirements/);}
    const duplicate=await upload('renamed.png');
    assert.equal((await(await post('/api/extractions',{...payload,sourceId:duplicate})).json()).id,id);
    assert.equal(calls.length,3);
    const boot=await(await original(base+'/api/bootstrap')).json();assert.ok(!boot.catalogs.face.some(x=>x.sourceJobId===id));
    const [face]=await(await post('/api/extractions/'+id+'/import',{title:'测试角色',kinds:['face']})).json();
    assert.ok(face.tags.includes('写实化'));assert.equal(face.conversion.sourceAssetId,sourceId);
    const subset=await(await post('/api/extractions',{...payload,sourceId:duplicate,resourceKinds:['face']})).json();
    assert.notEqual(subset.id,id);assert.deepEqual(Object.keys((await wait(subset.id)).outputs),['face']);assert.equal(calls.length,4);
  }finally{globalThis.fetch=original;await new Promise(resolve=>server.close(resolve));}
});
