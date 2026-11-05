import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';
import {createServer} from '../server.mjs';
import {costumeSettings,costumePrompt,costumeBatch} from '../costume-series.mjs';
import {settingsKey,outputLabel} from '../public/job-settings.js';
import {validateRequest} from '../generation.mjs';
import {COSTUME_PIECES,COSTUME_DESIGNS,costumePiecesFor} from '../public/costume-series.js';
const {DATA}=await import('../catalog.mjs');
assert.equal(DATA,process.env.STUDIO_DATA_DIR,'Use the isolated fixture preload');
const png=await readFile(join(process.env.STUDIO_DATA_DIR,'local-assets/costume/local-male-modern-costume.png'));
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));

test('series fixes shared design rules while cache separates source, plan, category and provider',()=>{
  const source={source:{id:'coat',title:'原衣',subjectType:'human'},hash:'a'.repeat(64)};
  const plan=costumeSettings({provider:'quota',outputType:'costume-plan'},source);
  assert.match(costumePrompt(plan),/原衣依据.*延展建议/);assert.equal(outputLabel(plan),'服饰设计方案');
  assert.equal(plan.seriesRevision,2);assert.equal(costumePiecesFor(plan).length,6);assert.match(costumePrompt(plan),/同一类别可以出现多款/);assert.match(costumePrompt(plan),/两项有实质变化/);
  for(const spec of COSTUME_DESIGNS)assert.ok(costumePrompt(plan).includes(spec.label));
  const piece=costumeSettings({provider:'quota',outputType:'costume-piece',pieceId:'shoes'},{...source,plan:{...plan,seriesRevision:1,id:randomUUID()},planHash:'b'.repeat(64)});
  assert.match(costumePrompt(piece),/图 2.*已确认的设计方案板/);assert.match(costumePrompt(piece),/完整一双鞋/);
  for(const patch of [{sourceHash:'new'},{sourceAssetId:'other'},{planHash:'new'},{seriesId:'other'},{pieceId:'top'},{seriesRevision:2},{prompt:'冬季'},{provider:'api',model:'other',baseURL:'https://example.com/v1'}])assert.notEqual(settingsKey(piece),settingsKey({...piece,...patch}));
  assert.throws(()=>costumeBatch({seriesId:randomUUID(),pieceIds:['top','top']}));
  assert.throws(()=>costumeBatch({seriesId:randomUUID(),pieceIds:['top'],replacePieces:['bag']}));
  assert.throws(()=>costumeSettings({provider:'quota',outputType:'costume-piece',pieceId:'invalid'},source));
});

test('legacy category series survives reload, snapshots both references, deduplicates, rerolls one piece and publishes usable accessories',async()=>{
  const original=globalThis.fetch,requests=[];let hold=false,release,failTop=false;
  globalThis.fetch=async(url,options)=>{
    if(!String(url).startsWith('https://costume.example/'))return original(url,options);
    const prompt=options.body.get('prompt'),images=await Promise.all(options.body.getAll('image[]').map(async image=>Buffer.from(await image.arrayBuffer())));
    requests.push({prompt,images});
    if(hold){hold=false;await new Promise(resolve=>release=resolve);}
    if(failTop&&prompt.includes('本次只制作「上装」')){failTop=false;return Response.json({error:{message:'模拟单品失败'}},{status:400});}
    return Response.json({data:[{b64_json:Buffer.concat([png,Buffer.from(`result-${requests.length}`)]).toString('base64')}]});
  };
  let server=await createServer(),base,csrf;
  const start=async()=>{await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));base=`http://127.0.0.1:${server.address().port}`;csrf=(await(await original(base+'/api/bootstrap')).json()).csrf;};
  const get=async path=>(await original(base+path)).json();
  const post=(path,input,id=randomUUID())=>original(base+path,{method:'POST',headers:{'X-Studio-Token':csrf,'Content-Type':'application/json','Idempotency-Key':id},body:JSON.stringify(input)});
  const upload=async(kind)=>(await(await original(base+'/api/uploads/'+kind,{method:'POST',headers:{'X-Studio-Token':csrf},body:png})).json());
  const wait=async id=>{for(let i=0;i<500;i++){const job=await get(`/api/jobs/${id}`);if(!['running','queued'].includes(job.status))return job;await sleep(10);}throw new Error('series timed out');};
  try{
    await start();await post('/api/settings',{provider:'api',model:'test-image',baseURL:'https://costume.example/v1',apiKey:'fake-costume-key'});
    const source=await upload('costume'),payload={outputType:'costume-plan',sourceAssetId:source.id,title:'测试系列',prompt:'银色扣具'};
    hold=true;const planID=randomUUID(),plan=await(await post('/api/jobs',payload,planID)).json();assert.equal(plan.id,planID);
    for(let i=0;i<100&&!release;i++)await sleep(5);
    assert.equal((await post('/api/costume-series',{seriesId:plan.id,pieceIds:['top']})).status,400);
    release();assert.equal((await wait(plan.id)).status,'completed');assert.equal(requests.length,1);
    assert.equal((await(await post('/api/jobs',payload)).json()).id,plan.id);
    assert.equal((await post('/api/jobs',{...payload,prompt:'different'},planID)).status,409);
    const originalPlanBytes=await readFile(join(process.env.STUDIO_DATA_DIR,'jobs',plan.id,'result.png'));
    // Restore a revision-1 fixture to exercise existing category plans after the upgrade.
    const legacyPlan={...await get(`/api/jobs/${plan.id}`),seriesRevision:1};legacyPlan.resolvedPrompt=costumePrompt(legacyPlan);
    for(let i=0;i<100&&(await get('/api/queue')).running;i++)await sleep(5);
    await new Promise(resolve=>server.close(resolve));
    await writeFile(join(DATA,'jobs',plan.id,'job.json'),JSON.stringify(legacyPlan));
    server=await createServer();await start();
    // The source may change later; all members keep the original plan's source snapshot.
    await writeFile(join(process.env.STUDIO_DATA_DIR,'uploads',source.id+'.png'),Buffer.concat([png,Buffer.from('changed')]));
    hold=true;release=null;
    const input={seriesId:plan.id,pieceIds:['top','headwear','bag','shoes']},batchID=randomUUID();
    const batch=await(await post('/api/costume-series',input,batchID)).json();assert.equal(batch.count,4);
    for(let i=0;i<100&&!release;i++)await sleep(5);
    const repeated=await(await post('/api/costume-series',input)).json();assert.deepEqual(repeated.items.map(j=>j.id),batch.items.map(j=>j.id));
    assert.equal((await post('/api/costume-series',{...input,replacePieces:['top']})).status,409);
    const bag=batch.items.find(job=>job.pieceId==='bag');assert.equal((await post(`/api/jobs/${bag.id}/cancel`,{})).status,200);
    release();for(const job of batch.items)await wait(job.id);assert.equal(requests.length,4);
    for(const {images} of requests.slice(1)){assert.equal(images.length,2);assert.deepEqual(images[0],png);assert.deepEqual(images[1],originalPlanBytes);}
    let view=await get('/api/costume-series/'+plan.id);assert.equal(view.items.filter(item=>item.saved).length,3);assert.equal(view.items.find(i=>i.id==='bag').job.status,'cancelled');
    const fill=await(await post('/api/costume-series',input)).json();for(const job of fill.items)await wait(job.id);assert.equal(requests.length,5);
    const baseTop=(await get('/api/costume-series/'+plan.id)).items.find(i=>i.id==='top').saved;
    failTop=true;const reroll=await(await post('/api/costume-series',{...input,replacePieces:['top']})).json();for(const job of reroll.items)await wait(job.id);
    assert.equal(requests.length,6);view=await get('/api/costume-series/'+plan.id);assert.equal(view.items.find(i=>i.id==='top').saved.id,baseTop.id);assert.equal(view.items.find(i=>i.id==='top').job.status,'failed');
    for(const item of view.items.filter(item=>item.saved)){
      const res=await post(`/api/jobs/${item.saved.id}/import`,{title:item.saved.title});assert.equal(res.status,200);const asset=await res.json();
      assert.equal(asset.series.id,plan.id);assert.ok(asset.tags.includes('服饰系列'));assert.equal(asset.kind,item.partKind?'source':'costume');
      assert.equal((await original(base+`/assets/${asset.kind}/${asset.id}`)).status,200);
    }
    const boot=await get('/api/bootstrap');assert.equal(boot.partAssets.filter(item=>item.series?.id===plan.id).length,3);
    assert.equal(boot.catalogs.costume.filter(item=>item.series?.id===plan.id).length,1);
    const headwear=boot.partAssets.find(item=>item.series?.id===plan.id&&item.partKind==='headwear');
    const role={costume:'SPR-0004',face:'f71f980dde3',partImages:{headwear:headwear.id}};
    assert.doesNotThrow(()=>validateRequest({provider:'quota',outputType:'image',selections:{pose:'full_single_P018_front'},characters:[role],size:'1024x1536',quality:'medium',style:'photo',background:'white',prompt:''}));
    // The image route actually accepts the generated accessory, not just its ID format.
    const dressed=await(await post('/api/jobs',{outputType:'image',selections:{pose:'full_single_P018_front'},characters:[role],size:'1024x1536',quality:'medium',style:'photo',background:'white',prompt:''})).json();
    assert.equal((await wait(dressed.id)).status,'completed');
    const count=requests.length;
    await new Promise(resolve=>server.close(resolve));server=await createServer();await start();
    view=await get('/api/costume-series/'+plan.id);assert.ok(view.items.find(i=>i.id==='headwear').saved.resourceId);assert.equal((await get('/api/costume-series')).length,1);assert.equal(requests.length,count);
    const same=await(await post('/api/costume-series',input,batchID)).json();assert.deepEqual(same.items.map(j=>j.id),batch.items.map(j=>j.id));
    assert.equal((await post('/api/costume-series',{...input,pieceIds:['top']},batchID)).status,409);
    await post('/api/settings',{provider:'api',model:'different-image',baseURL:'https://costume.example/v1'});
    const changed=await(await post('/api/costume-series',{seriesId:plan.id,pieceIds:['top']})).json();assert.notEqual(changed.items[0].id,baseTop.id);await wait(changed.items[0].id);assert.equal(requests.length,count+1);
    assert.equal(COSTUME_PIECES.length,view.items.length);
    assert.equal(JSON.stringify(view).includes('fake-costume-key'),false);
  }finally{release?.();globalThis.fetch=original;if(server.listening)await new Promise(resolve=>server.close(resolve));}
});

test('a theme plan offers six designs, supports same-category styles and isolates legacy results',async()=>{
  const original=globalThis.fetch,requests=[];
  globalThis.fetch=async(url,options)=>{
    if(!String(url).startsWith('https://design.example/'))return original(url,options);
    requests.push({prompt:options.body.get('prompt'),images:await Promise.all(options.body.getAll('image[]').map(async image=>Buffer.from(await image.arrayBuffer())))});
    return Response.json({data:[{b64_json:png.toString('base64')}]});
  };
  let server=await createServer();
  try{
    await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const base=`http://127.0.0.1:${server.address().port}`;
    const get=async path=>(await original(base+path)).json(),csrf=(await get('/api/bootstrap')).csrf;
    const post=(path,input,id=randomUUID())=>original(base+path,{method:'POST',headers:{'X-Studio-Token':csrf,'Content-Type':'application/json','Idempotency-Key':id},body:JSON.stringify(input)});
    const wait=async id=>{for(let i=0;i<500;i++){const job=await get(`/api/jobs/${id}`);if(!['queued','running'].includes(job.status))return job;await sleep(10);}throw new Error('design timeout');};
    await post('/api/settings',{provider:'api',model:'design-test',baseURL:'https://design.example/v1',apiKey:'fake-design-key'});
    const legacy=(await get('/api/costume-series')).find(plan=>plan.seriesRevision===1);assert.ok(legacy);
    const oldItems=await get('/api/costume-series/'+legacy.id);assert.equal(oldItems.items.length,8);
    assert.equal((await post('/api/costume-series',{seriesId:legacy.id,pieceIds:['design-1']})).status,400);
    const source=await(await original(base+'/api/uploads/costume',{method:'POST',headers:{'X-Studio-Token':csrf},body:png})).json();
    const payload={outputType:'costume-plan',sourceAssetId:source.id,title:'山水系列',prompt:'山水主题，六款都做上衣，延续墨色与留白'};
    const plan=await(await post('/api/jobs',payload)).json();assert.equal((await wait(plan.id)).status,'completed');assert.equal(plan.seriesRevision,2);
    const view=await get('/api/costume-series/'+plan.id);assert.deepEqual(view.items.map(item=>item.id),COSTUME_DESIGNS.map(item=>item.id));assert.ok(view.items.every(item=>!item.partKind));
    assert.match(requests[0].prompt,/六款都做上衣/);assert.match(requests[0].prompt,/同一类别可以出现多款/);
    const before=requests.length;
    assert.equal((await post('/api/costume-series',{seriesId:plan.id,pieceIds:['design-1','top']})).status,400);
    assert.equal((await post('/api/jobs',{outputType:'costume-piece',seriesId:plan.id,pieceId:'shoes'})).status,400);assert.equal(requests.length,before);
    const input={seriesId:plan.id,pieceIds:['design-1','design-2','design-3']};
    const batch=await(await post('/api/costume-series',input)).json();assert.equal(batch.count,3);
    for(const job of batch.items)assert.equal((await wait(job.id)).status,'completed');
    assert.equal(requests.length,4);
    for(const [index,request] of requests.slice(1).entries()){
      assert.ok(request.prompt.includes(`本次仅制作图 2 中标为「${COSTUME_DESIGNS[index].label}」`));
      assert.match(request.prompt,/六款都做上衣/);assert.equal(request.images.length,2);assert.deepEqual(request.images[0],png);assert.deepEqual(request.images[1],png);
    }
    const reused=await(await post('/api/costume-series',input)).json();assert.deepEqual(reused.items.map(job=>job.id),batch.items.map(job=>job.id));assert.equal(requests.length,4);
    for(const job of batch.items){
      const result=await post(`/api/jobs/${job.id}/import`,{title:job.title});assert.equal(result.status,200);const asset=await result.json();
      assert.equal(asset.kind,'costume');assert.equal(asset.series.id,plan.id);assert.equal(asset.series.pieceId,job.pieceId);assert.equal(asset.series.revision,2);
    }
    const reroll=await(await post('/api/costume-series',{...input,replacePieces:['design-2']})).json();
    for(const job of reroll.items)await wait(job.id);assert.equal(requests.length,5);
    assert.equal(reroll.items[0].id,batch.items[0].id);assert.notEqual(reroll.items[1].id,batch.items[1].id);assert.equal(reroll.items[2].id,batch.items[2].id);
    assert.equal((await get('/api/costume-series/'+legacy.id)).plan.seriesRevision,1);
    assert.notEqual(settingsKey(plan),settingsKey({...plan,seriesRevision:1}));
  }finally{globalThis.fetch=original;await new Promise(resolve=>server.close(resolve));}
});
