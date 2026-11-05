import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {normalizeTags,matchesTag} from '../public/tags.js';
const {createServer}=await import('../server.mjs');
const {saveResource}=await import('../catalog.mjs');
const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aQ1kAAAAASUVORK5CYII=','base64');

test('resource tags normalize text, reject oversized or ambiguous input, and match exact tags',()=>{
  assert.deepEqual(normalizeTags([' 武侠 ','武侠','ＡＢＣ']),['武侠','ABC']);
  for(const values of [[''],['a,b'],['a\nb'],['x'.repeat(33)],[false],Array(21).fill('tag')])assert.throws(()=>normalizeTags(values));
  assert.ok(matchesTag({tags:['白色','武侠']},'tag:武侠'));
  assert.equal(matchesTag({tags:['武侠风']},'tag:武侠'),false);
  assert.ok(matchesTag({},'untagged'));assert.equal(matchesTag({tags:['武侠']},'untagged'),false);
});

test('public, uploaded and generated resource tags update atomically, merge concurrent edits and survive restart',async()=>{
  let server=await createServer(),base,csrf;
  const start=async()=>{await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));base=`http://127.0.0.1:${server.address().port}`;csrf=(await(await fetch(base+'/api/bootstrap')).json()).csrf;};
  const post=input=>fetch(base+'/api/resource-tags',{method:'POST',headers:{'Content-Type':'application/json','X-Studio-Token':csrf},body:JSON.stringify(input)});
  const catalogs=async()=>(await(await fetch(base+'/api/bootstrap')).json()).catalogs;
  try{
    await start();const initial=await catalogs(),publicRef={kind:'costume',id:initial.costume.at(-1).id};
    const source=await(await fetch(base+'/api/uploads/costume',{method:'POST',headers:{'X-Studio-Token':csrf},body:png})).json();
    const resource=await saveResource({id:'22222222-2222-4222-8222-222222222222',subjectType:'human',createdAt:new Date().toISOString()},'face','测试头像',png);
    const refs=[publicRef,{kind:'costume',id:source.id},{kind:'face',id:resource.id}];
    assert.equal((await post({items:refs,add:['武侠',' 白色 ','武侠']})).status,200);
    let current=await catalogs();for(const ref of refs)assert.deepEqual(current[ref.kind].find(item=>item.id===ref.id).tags,['武侠','白色']);
    const before=await readFile(join(process.env.STUDIO_DATA_DIR,'resource-tags.json'),'utf8');
    assert.equal((await post({items:[publicRef,{kind:'costume',id:'missing'}],add:['不得部分保存']})).status,400);
    assert.equal(await readFile(join(process.env.STUDIO_DATA_DIR,'resource-tags.json'),'utf8'),before);
    assert.equal((await fetch(base+'/api/resource-tags',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:refs,add:['forbidden']})})).status,403);
    const concurrent=await Promise.all(['新品','展示'].map(tag=>post({items:[publicRef],add:[tag]})));assert.ok(concurrent.every(response=>response.ok));
    assert.equal((await post({items:refs,remove:['白色']})).status,200);
    current=await catalogs();assert.deepEqual(current.costume.find(item=>item.id===publicRef.id).tags,['武侠','新品','展示']);
    await saveResource({id:'22222222-2222-4222-8222-222222222222',subjectType:'human',createdAt:new Date().toISOString()},'face','再次审核',png);
    assert.deepEqual((await catalogs()).face.find(item=>item.id===resource.id).tags,['武侠']);
    await new Promise(resolve=>server.close(resolve));server=await createServer();await start();
    current=await catalogs();for(const ref of refs)assert.ok(current[ref.kind].find(item=>item.id===ref.id).tags.includes('武侠'));
    assert.equal((await(await fetch(base+'/api/jobs')).json()).length,0);
  }finally{await new Promise(resolve=>server.close(resolve));}
});
