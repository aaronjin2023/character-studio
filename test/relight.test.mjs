import test from 'node:test';
import assert from 'node:assert/strict';
import {transferLight} from '../relight.mjs';
import {buildPrompt,validateRequest,relightPrompt} from '../generation.mjs';
import {savedMatches,settingsKey} from '../public/job-settings.js';

test('only photographic people with a scene use the new lighting rule and bypass legacy cache',()=>{
  const input={provider:'quota',style:'photo',background:'studio',size:'1536x1024',quality:'medium',prompt:'',selections:{pose:'p',background:'bg'},characters:[{gender:'female',face:'f',costume:'c',position:'左前'},{gender:'male',face:'m',costume:'n',position:'右后'}]};
  const job=validateRequest(input);
  const {sceneLightRevision,...old}=job;
  assert.ok(sceneLightRevision);
  assert.equal(savedMatches([{...old,status:'completed'}],job).length,0);
  assert.equal(savedMatches([{...job,status:'completed'}],job).length,1);
  for(const light of ['left','diffuse','auto']){
    assert.match(buildPrompt({...job,sceneLight:light}),/同场用光/);
    assert.match(relightPrompt({...job,sceneLight:light}),/原像素位置/);
  }
  for(const patch of [{style:'anime'},{selections:{pose:'p'}}]){
    const other=validateRequest({...input,...patch});
    assert.equal(other.sceneLightRevision,undefined);assert.doesNotMatch(buildPrompt(other),/同场用光/);
  }
  const fix={...job,outputType:'scene-relight',sourceJobId:'a',sourceHash:'h'};
  assert.notEqual(settingsKey(job),settingsKey(fix));
  for(const p of [{sourceJobId:'b'},{sourceHash:'new'},{relightRevision:2}])assert.notEqual(settingsKey(fix),settingsKey({...fix,...p}));
});

test('lighting transfer preserves background and source texture, rejects displaced subjects',()=>{
  const w=32,h=24,base=Buffer.alloc(w*h*3,100),guide=Buffer.alloc(w*h*3,65),mask=Buffer.alloc(w*h);
  for(let y=4;y<20;y++)for(let x=8;x<24;x++)mask[y*w+x]=255;
  const spot=(12*w+16)*3;base[spot]=180;
  const out=transferLight(base,guide,mask,mask,w,h);
  assert.deepEqual(out.subarray(0,w*3),base.subarray(0,w*3));
  assert.ok(out[spot]<180 && out[spot]>out[spot+3]+35);
  assert.throws(()=>transferLight(base,guide,mask,Buffer.from(mask.map(v=>255-v)),w,h),/偏离/);
});
