import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {validateRequest,validateRoles,buildPrompt} from '../generation.mjs';
import {referenceSlots,settingsKey} from '../public/job-settings.js';
import {batchRequests} from '../public/batch.js';
import {DATA,saveUpload,assetPath} from '../catalog.mjs';
import {createServer} from '../server.mjs';

assert.equal(DATA,process.env.STUDIO_DATA_DIR,'Use the isolated fixture preload');
const role={face:'local-baiyi-01-face',costume:'local-baiyi-01-costume',gender:'female',position:''};
const input={provider:'quota',style:'photo',selections:{pose:'local-baiyi-01-pose'},characters:[role],prompt:'',size:'1024x1536',quality:'medium',background:'studio'};

test('hair donor is a face-only child reference with independent identity, expression, cache and batch ownership',()=>{
  const dressed={...role,hairFaceId:'local-male-modern-face',expressionAssetId:'resource-smile',attachments:{hair:'旧文字发型',necklace:'项链'},partImages:{hair:'upload-11111111-1111-4111-8111-111111111111'}};
  const job=validateRequest({...input,characters:[dressed]});
  assert.equal(job.characters[0].face,role.face);assert.equal(job.characters[0].expressionAssetId,'resource-smile');
  assert.deepEqual(job.characters[0].attachments,{necklace:'项链'});assert.equal(job.characters[0].partImages,undefined);
  assert.equal(dressed.attachments.hair,'旧文字发型');
  const face=referenceSlots(job)[2];assert.equal(face.id,'resource-smile');assert.deepEqual(face.extras,[{key:'hair',kind:'face',label:'发型参考头像',id:dressed.hairFaceId}]);
  const prompt=buildPrompt(job);assert.match(prompt,/图3左侧主头像/);assert.match(prompt,/右侧第一张头像仅提供发型/);assert.match(prompt,/不要复制或混合第二头像的脸/);assert.doesNotMatch(prompt,/旧文字发型/);
  assert.notEqual(settingsKey(job),settingsKey(validateRequest(input)));
  assert.notEqual(settingsKey(job),settingsKey({...job,characters:[{...job.characters[0],hairFaceId:'f192f568573'}]}));
  assert.equal(settingsKey(job),settingsKey({...job,characters:[dressed]}));
  const pair=validateRequest({...input,selections:{pose:'pair60_P001_front'},characters:[{...dressed,position:'左侧'},{...role,position:'右侧',hairFaceId:'f192f568573'}]});
  assert.match(buildPrompt(pair),/角色 2 的发型移植：图5左侧主头像/);
  assert.equal(referenceSlots(pair).length,5);
  const rows=batchRequests({mode:'paired',poses:[input.selections.pose],costumes:[role.costume],faces:[role.face,'f192f568573'],settings:job});
  assert.equal(rows[0].characters[0].hairFaceId,dressed.hairFaceId);assert.equal(rows[1].characters[0].hairFaceId,undefined);
  for(const hairFaceId of ['../outside',123,null])assert.throws(()=>validateRequest({...input,characters:[{...role,hairFaceId}]}),/发型参考/);
  assert.throws(()=>validateRoles([{...role,hairFaceId:'face',species:'猫',surface:'coat'}],true,'animal'),/发型参考/);
});

test('queued jobs deliver the donor image, reject wrong resources, and preserve exact reuse and history',async()=>{
  const png=await readFile(await assetPath('face',role.face));
  const donorPNG=execFileSync('ffmpeg',['-loglevel','error','-f','lavfi','-i','color=c=red:s=24x32','-frames:v','1','-f','image2pipe','-c:v','png','-']);
  const donor=await saveUpload('face',donorPNG,'红色发型参考');
  const wrong=await saveUpload('costume',png,'错误类型'),animal=await saveUpload('face',png,'猫头',{subjectType:'animal',species:'猫'});
  const original=globalThis.fetch,calls=[];
  globalThis.fetch=async(url,options)=>{
    if(!String(url).startsWith('https://hair-test.example/'))return original(url,options);
    calls.push({prompt:options.body.get('prompt'),images:await Promise.all(options.body.getAll('image[]').map(async file=>Buffer.from(await file.arrayBuffer())))});
    return Response.json({data:[{b64_json:png.toString('base64')}]});
  };
  const server=await createServer();
  try{
    await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const base=`http://127.0.0.1:${server.address().port}`;
    const get=async path=>(await original(base+path)).json(),csrf=(await get('/api/bootstrap')).csrf;
    const post=async(path,body)=>(await original(base+path,{method:'POST',headers:{'X-Studio-Token':csrf,'Content-Type':'application/json','Idempotency-Key':randomUUID()},body:JSON.stringify(body)})).json();
    await post('/api/settings',{provider:'api',model:'hair-test',baseURL:'https://hair-test.example/v1',apiKey:'fake-hair-test-key'});
    for(const hairFaceId of [wrong.id,animal.id,'missing-face'])assert.ok((await post('/api/jobs',{...input,characters:[{...role,hairFaceId}]})).error);
    assert.equal(calls.length,0);
    const body={...input,characters:[{...role,hairFaceId:donor.id}]};const first=await post('/api/jobs',body);assert.ok(first.id,JSON.stringify(first));
    let saved;for(let i=0;i<200;i++){saved=await get(`/api/jobs/${first.id}`);if(!['queued','running'].includes(saved.status))break;await new Promise(resolve=>setTimeout(resolve,50));}
    assert.equal(saved.status,'completed',saved.message);assert.equal(calls.length,1);
    assert.equal(saved.characters[0].face,role.face);assert.equal(saved.characters[0].hairFaceId,donor.id);assert.equal(saved.hairReferences[0].title,donor.title);
    assert.equal(calls[0].images.length,3);assert.match(calls[0].prompt,/图3左侧主头像/);
    // The right-hand donor must be present in the image actually sent to the provider.
    const card=calls[0].images[2],rgb=execFileSync('ffmpeg',['-loglevel','error','-i','pipe:0','-vf','crop=1:1:1000:240,format=rgb24','-frames:v','1','-f','rawvideo','pipe:1'],{input:card});
    assert.ok(rgb[0]>200&&rgb[1]<30&&rgb[2]<30);
    assert.equal((await post('/api/jobs',body)).id,first.id);assert.equal(calls.length,1);
    const disk=JSON.parse(await readFile(join(DATA,'jobs',first.id,'job.json'),'utf8'));assert.equal(settingsKey(disk),settingsKey(saved));assert.equal(disk.characters[0].hairFaceId,donor.id);
  }finally{await new Promise(resolve=>server.close(resolve));globalThis.fetch=original;}
});
