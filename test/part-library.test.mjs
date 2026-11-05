import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';
import {execFileSync} from 'node:child_process';

const {createServer}=await import('../server.mjs');
test('uploaded small pieces persist in their own group, reach the model alongside the selected background and cannot cross groups',async()=>{
  const server=await createServer(),realFetch=globalThis.fetch,calls=[];
  await new Promise(ok=>server.listen(0,'127.0.0.1',ok));const base=`http://127.0.0.1:${server.address().port}`;
  const boot=async()=>(await realFetch(base+'/api/bootstrap')).json();
  const png=execFileSync('ffmpeg',['-loglevel','error','-f','lavfi','-i','color=c=red:s=24x32','-frames:v','1','-f','image2pipe','-c:v','png','-']);
  try{
    const {csrf}=await boot();const headers={'X-Studio-Token':csrf};
    const upload=async(kind,partKind)=>(await realFetch(base+'/api/uploads/'+kind,{method:'POST',headers:{...headers,...(partKind?{'X-Part-Kind':partKind}:{})},body:png})).json();
    const part=await upload('source','glasses'),bg=await upload('background');
    assert.ok((await boot()).partAssets.some(i=>i.id===part.id&&i.partKind==='glasses'));
    globalThis.fetch=async(url,options)=>{
      if(!String(url).startsWith('https://parts.example/'))return realFetch(url,options);
      calls.push(options.body);return Response.json({data:[{b64_json:png.toString('base64')}]});
    };
    const role={face:'f71f980dde3',costume:'SPR-0161',partImages:{glasses:part.id}};
    const input={provider:'api',apiKey:'only-for-test-secret',model:'test-image',baseURL:'https://parts.example/v1',selections:{pose:'full_single_P018_front',background:bg.id},characters:[role],style:'photo',background:'studio',prompt:'',size:'1024x1536',quality:'medium'};
    const submit=payload=>realFetch(base+'/api/jobs',{method:'POST',headers:{...headers,'Idempotency-Key':randomUUID(),'Content-Type':'application/json'},body:JSON.stringify(payload)});
    assert.equal((await submit({...input,characters:[{...role,partImages:{necklace:part.id}}]})).status,400);
    const submitted=await(await submit(input)).json();
    for(let i=0;i<200;i++){const job=await(await realFetch(base+'/api/jobs/'+submitted.id)).json();if(job.status==='completed')break;if(job.status==='failed')assert.fail(job.message);await new Promise(ok=>setTimeout(ok,30));}
    assert.equal(calls.length,1);
    const images=calls[0].getAll('image[]');assert.equal(images.length,4);
    const card=Buffer.from(await images[1].arrayBuffer());
    assert.equal(card.readUInt32BE(16),1248);
    assert.deepEqual(Buffer.from(await images[3].arrayBuffer()),png);
    assert.match(calls[0].get('prompt'),/图2左侧为原衣服.*眼镜/);
    assert.equal((await(await submit(input)).json()).id,submitted.id);
    assert.equal(calls.length,1);
    assert.ok((await readFile(join(process.env.STUDIO_DATA_DIR,'jobs',submitted.id,'job.json'),'utf8')).includes(part.id));
  }finally{globalThis.fetch=realFetch;await new Promise(ok=>server.close(ok));}
});
