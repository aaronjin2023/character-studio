import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,writeFile,unlink} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';
import {settingsKey,referenceSlots,matchesHistory,outputLabel,CONVERSION_REVISION} from '../public/job-settings.js';
const {createServer}=await import('../server.mjs');
const {conversionSettings,conversionPrompt}=await import('../resource-conversion.mjs');
const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aQ1kAAAAASUVORK5CYII=','base64');
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));

test('resource conversion fixes a photographic target and keeps reference identity and cache boundaries',()=>{
  const source={id:'avatar',title:'游戏精灵',subjectType:'fantasy-humanoid',gender:'female',species:'精灵',anatomy:'人形，尖耳'},hash='a'.repeat(64);
  const face=conversionSettings({provider:'quota',sourceKind:'face',prompt:'保留红发',style:'anime'},{source,hash});
  assert.equal(face.style,'photo');assert.equal(face.size,'1024x1024');assert.equal(face.subjectType,source.subjectType);assert.equal(outputLabel(face),'资源写实化');
  assert.deepEqual(referenceSlots(face),[{kind:'face',id:'avatar'}]);
  const prompt=conversionPrompt({...face,references:[source]});for(const text of ['live-action casting','complete reinterpretation','apparent age','head orientation','尖耳','保留红发','preserve that person’s identity'])assert.ok(prompt.includes(text));
  assert.equal(face.conversionRevision,CONVERSION_REVISION);
  assert.match(conversionPrompt({...face,references:[source]}),/bareheaded portrait/);
  assert.doesNotMatch(conversionPrompt({...face,conversionRevision:5,references:[source]}),/bareheaded portrait/);
  const costume=conversionSettings({provider:'quota',sourceKind:'costume'},{source,hash});assert.equal(costume.conversionRevision,CONVERSION_REVISION);assert.equal(costume.size,'1024x1536');assert.equal(costume.personCount,0);assert.match(conversionPrompt({...costume,references:[source]}),/practical wardrobe product photograph/);
  for(const job of [face,costume]){
    const prompt=conversionPrompt({...job,references:[source]});
    assert.match(prompt,/hairpins, hair clips, hair bands/);
    assert.match(prompt,job.sourceKind==='face'?/Remove all detachable/:/Arrange each removable ornament separately/);
    assert.doesNotMatch(conversionPrompt({...job,conversionRevision:6,references:[source]}),/hairpins, hair clips, hair bands/);
  }
  assert.throws(()=>conversionSettings({provider:'quota',sourceKind:'face',prompt:7},{source,hash}),/补充要求/);
  for(const patch of [{sourceKind:'costume'},{sourceAssetId:'other'},{sourceHash:'b'.repeat(64)},{conversionRevision:CONVERSION_REVISION-1},{prompt:'换要求'},{provider:'api',model:'model',baseURL:'https://example.com'}])assert.notEqual(settingsKey(face),settingsKey({...face,...patch}));
  assert.ok(matchesHistory({...face,status:'completed',imageURL:'/image',createdAt:new Date().toISOString()},{outputType:'resource-conversion',style:'photo'}));
});

test('photographic conversion preserves subject type without copying the approved example character',()=>{
  for(const subjectType of ['human','fantasy-humanoid','animal','fantasy-beast']){
    const source={id:'source',title:'参考',subjectType,gender:'female',species:'测试物种',anatomy:'保留原有附肢'},hash='a'.repeat(64);
    const job=conversionSettings({provider:'quota',sourceKind:'face'},{source,hash}),prompt=conversionPrompt({...job,references:[source]});
    if(['human','fantasy-humanoid'].includes(subjectType)){assert.match(prompt,/human performer/);assert.match(prompt,/Allow a new natural brow/);assert.match(prompt,/Do not interpret painted shadows/);assert.match(prompt,/preserve the complexion defined by the reference or user, including gray-white undead pallor/);assert.match(prompt,/even if the resource is classified as human/);assert.match(prompt,/do not add rosy blood color/);assert.doesNotMatch(prompt,/Real healthy human skin|subtle living warmth at nose|neutral-to-warm white balance/);}
    else{assert.match(prompt,/same species/);assert.doesNotMatch(prompt,/human performer/);}
    assert.equal(prompt.includes('Preserve the fantasy species'),subjectType.startsWith('fantasy-'));
    assert.match(prompt,/female/);assert.match(prompt,/测试物种/);assert.match(prompt,/保留原有附肢/);
    assert.doesNotMatch(prompt,/Arthas|platinum-white|around 32|阿尔萨斯/);
  }
});

test('conversion queue snapshots originals, reuses exact outputs, imports only after approval and survives restart',async()=>{
  const original=globalThis.fetch,forms=[];let release;
  globalThis.fetch=async(url,options)=>{
    if(!String(url).startsWith('https://conversion.example/'))return original(url,options);
    const bytes=Buffer.from(await options.body.get('image[]').arrayBuffer());forms.push({prompt:options.body.get('prompt'),bytes});
    if(forms.length===1)await new Promise(resolve=>release=resolve);
    if(options.body.get('prompt').includes('模拟失败'))return Response.json({error:{message:'模拟失败'}},{status:400});
    return Response.json({data:[{b64_json:png.toString('base64')}]});
  };
  let server=await createServer(),base,csrf;
  const start=async()=>{await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));base=`http://127.0.0.1:${server.address().port}`;csrf=(await(await original(base+'/api/bootstrap')).json()).csrf;};
  const get=async path=>(await original(base+path)).json();
  const post=(path,input,id=randomUUID())=>original(base+path,{method:'POST',headers:{'X-Studio-Token':csrf,'Content-Type':'application/json','Idempotency-Key':id},body:JSON.stringify(input)});
  const wait=async id=>{for(let i=0;i<200;i++){const job=await get(`/api/jobs/${id}`);if(!['queued','running'].includes(job.status))return job;await sleep(10);}throw Error('conversion timed out');};
  try{
    await start();await post('/api/settings',{provider:'api',model:'test-image',baseURL:'https://conversion.example/v1',apiKey:'fake-conversion-key'});
    const upload=async kind=>(await original(base+`/api/uploads/${kind}`,{method:'POST',headers:{'X-Studio-Token':csrf},body:png})).json();
    const face=await upload('face'),costume=await upload('costume');
    const faceFile=join(process.env.STUDIO_DATA_DIR,'uploads',`${face.id}.json`);await writeFile(faceFile,JSON.stringify({...face,gender:'male',subjectType:'fantasy-humanoid',species:'精灵',anatomy:'人形，尖耳'}));
    const input={outputType:'resource-conversion',sourceKind:'face',sourceAssetId:face.id,prompt:'保留发色'};
    const id=randomUUID(),first=await(await post('/api/jobs',input,id)).json();assert.equal(first.status,'queued');
    for(let i=0;i<100&&!release;i++)await sleep(5);
    assert.equal((await(await post('/api/jobs',input)).json()).id,id);assert.equal(forms.length,1);
    const costumeInput={...input,sourceKind:'costume',sourceAssetId:costume.id};
    const queued=await(await post('/api/jobs',costumeInput)).json();assert.equal((await post(`/api/jobs/${queued.id}/import`,{title:'过早导入'})).status,400);
    await post(`/api/jobs/${queued.id}/cancel`,{});assert.equal(forms.length,1);
    const sourcePath=join(process.env.STUDIO_DATA_DIR,'uploads',`${face.id}.png`);await writeFile(sourcePath,Buffer.concat([png,Buffer.from('changed')]));
    assert.ok((await readFile(join(process.env.STUDIO_DATA_DIR,'jobs',id,first.sourceSnapshot))).equals(png));
    release();const completed=await wait(id);assert.equal(completed.status,'completed');assert.equal(completed.conversionRevision,CONVERSION_REVISION);assert.match(forms[0].prompt,/live-action casting/);assert.ok(forms[0].bytes.equals(png));
    assert.equal((await get('/api/bootstrap')).catalogs.face.filter(item=>item.conversion).length,0);
    await writeFile(sourcePath,png);assert.equal((await(await post('/api/jobs',input)).json()).id,id);assert.equal(forms.length,1);
    const imported=await(await post(`/api/jobs/${id}/import`,{title:'精灵写实头像'})).json();assert.notEqual(imported.id,face.id);assert.equal(imported.kind,'face');assert.equal(imported.gender,'male');assert.equal(imported.species,'精灵');assert.equal(imported.anatomy,'人形，尖耳');assert.ok(imported.tags.includes('写实化'));assert.equal(imported.conversion.sourceAssetId,face.id);
    assert.ok((await readFile(sourcePath)).equals(png));assert.equal((await(await post(`/api/jobs/${id}/import`,{title:'精灵写实头像'})).json()).id,imported.id);assert.equal(forms.length,1);
    const cloth=await(await post('/api/jobs',costumeInput)).json();await wait(cloth.id);assert.equal(forms.length,2);assert.match(forms[1].prompt,/practical wardrobe/);
    const clothResource=await(await post(`/api/jobs/${cloth.id}/import`,{title:'写实衣服'})).json();assert.equal(clothResource.kind,'costume');assert.notEqual(clothResource.id,costume.id);
    const failed=await(await post('/api/jobs',{...input,prompt:'模拟失败'})).json();assert.equal((await wait(failed.id)).status,'failed');assert.equal((await post(`/api/jobs/${failed.id}/import`,{title:'失败入库'})).status,400);
    for(const change of [{sourceKind:'pose'},{sourceAssetId:'../../private'},{sourceKind:'costume',sourceAssetId:face.id},{prompt:42}])assert.equal((await post('/api/jobs',{...input,...change})).status,400);
    assert.equal(forms.length,3);
    // Source bytes are part of identity; a changed original cannot reuse an older conversion.
    await writeFile(sourcePath,Buffer.concat([png,Buffer.from('changed')]));const changed=await(await post('/api/jobs',input)).json();assert.notEqual(changed.id,id);await wait(changed.id);assert.equal(forms.length,4);await writeFile(sourcePath,png);
    const regenerated=await(await post('/api/jobs',{...input,regenerate:true})).json();assert.notEqual(regenerated.id,id);await wait(regenerated.id);assert.equal(forms.length,5);
    for(let i=0;i<100&&(await get('/api/queue')).running;i++)await sleep(5);
    await new Promise(resolve=>server.close(resolve));server=await createServer();await start();assert.equal((await(await post('/api/jobs',input)).json()).id,regenerated.id);assert.equal(forms.length,5);
    assert.equal((await original(base+`/assets/face/${imported.id}`)).status,200);assert.equal((await original(base+`/assets/face/${face.id}`)).status,200);
    const json=await readFile(join(process.env.STUDIO_DATA_DIR,'jobs',id,'job.json'),'utf8');assert.ok(!json.includes('fake-conversion-key'));
    await unlink(join(process.env.STUDIO_DATA_DIR,'jobs',regenerated.id,'result.png'));await unlink(join(process.env.STUDIO_DATA_DIR,'jobs',id,'result.png'));
    assert.equal((await post('/api/jobs',input)).status,400);assert.equal(forms.length,5);
    await new Promise(resolve=>server.close(resolve));
    for(const oldId of [id,regenerated.id]){
      const path=join(process.env.STUDIO_DATA_DIR,'jobs',oldId,'job.json'),old=JSON.parse(await readFile(path,'utf8'));
      await writeFile(path,JSON.stringify({...old,conversionRevision:CONVERSION_REVISION-1}));await writeFile(join(process.env.STUDIO_DATA_DIR,'jobs',oldId,'result.png'),png);
    }
    server=await createServer();await start();const upgraded=await(await post('/api/jobs',input)).json();assert.notEqual(upgraded.id,id);assert.notEqual(upgraded.id,regenerated.id);await wait(upgraded.id);assert.equal(forms.length,6);
    assert.equal((await original(base+`/api/jobs/${id}/image`)).status,200);assert.equal((await(await post('/api/jobs',input)).json()).id,upgraded.id);assert.equal(forms.length,6);
  }finally{release?.();globalThis.fetch=original;await new Promise(resolve=>server.close(resolve));}
});
