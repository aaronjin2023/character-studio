import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';
import {setTimeout as sleep} from 'node:timers/promises';
process.env.STUDIO_DATA_DIR=await mkdtemp(join(tmpdir(),'studio-empty-'));
process.env.STUDIO_CODEX_BIN='missing-studio-test-codex';
const {createServer}=await import('../server.mjs');
const {extractionKey}=await import('../extraction.mjs');
const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aQ1kAAAAASUVORK5CYII=','base64');

test('fresh installation starts empty and uses an uploaded skeleton as the extraction style reference',async()=>{
  const server=await createServer(),original=globalThis.fetch,calls=[];
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base=`http://127.0.0.1:${server.address().port}`;
  const boot=await(await original(base+'/api/bootstrap')).json();
  const headers={'X-Studio-Token':boot.csrf};
  const post=(path,input)=>original(base+path,{method:'POST',headers:{...headers,'Content-Type':'application/json','Idempotency-Key':randomUUID()},body:JSON.stringify(input)});
  const upload=async kind=>(await(await original(base+'/api/uploads/'+kind,{method:'POST',headers,body:png})).json()).id;
  globalThis.fetch=async(url,options)=>{
    if(!String(url).startsWith('https://empty.example/'))return original(url,options);
    calls.push(options.body);return Response.json({data:[{b64_json:png.toString('base64')}]});
  };
  try{
    assert.ok(Object.values(boot.catalogs).every(items=>items.length===0));
    assert.deepEqual(boot.defaults,{pose:'',costume:'',face:''});
    await post('/api/settings',{provider:'api',model:'test',baseURL:'https://empty.example/v1',apiKey:'test-only-empty-key'});
    const sourceId=await upload('source');
    const input={sourceId,title:'测试拆解',prompt:'',inferHidden:false,resourceKinds:['pose']};
    const blocked=await post('/api/extractions',input);assert.equal(blocked.status,400);assert.match((await blocked.json()).error,/上传一张人物骨架/);assert.equal(calls.length,0);
    const pose=await upload('pose'),queued=await(await post('/api/extractions',input)).json();
    assert.equal(queued.poseStyleId,pose);
    assert.notEqual(extractionKey(queued),extractionKey({...queued,poseStyleId:'other-pose'}));
    let job;
    for(let i=0;i<150;i++){job=await(await original(base+'/api/jobs/'+queued.id)).json();if(!['queued','running'].includes(job.status))break;await sleep(10);}
    assert.equal(job.status,'completed',job.message);assert.equal(calls.length,1);
    assert.equal(calls[0].getAll('image[]').length,2);
    assert.equal((await(await post('/api/extractions',input)).json()).id,queued.id);
    assert.equal(calls.length,1);
    await writeFile(join(process.env.STUDIO_DATA_DIR,'catalogs.json'),'{broken');
    await assert.rejects(import('../catalog.mjs?malformed'),SyntaxError);
  }finally{globalThis.fetch=original;await new Promise(resolve=>server.close(resolve));}
});
