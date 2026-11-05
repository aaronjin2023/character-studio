import test from 'node:test';
import assert from 'node:assert/strict';
import {buildPrompt, validateRequest} from '../generation.mjs';
import {settingsKey,referenceSlots} from '../public/job-settings.js';
import {batchRequests} from '../public/batch.js';

const role={face:'face-a',costume:'coat',position:'左侧'};
const input={provider:'quota',style:'photo',selections:{pose:'pair'},characters:[role,{...role,face:'face-b',position:'右侧'}],prompt:'',size:'1536x1024',quality:'medium',background:'studio'};
test('physical instances and role assignments survive validation, prompting and duplicate matching',()=>{
  const first=validateRequest({...input,sceneProps:[{kind:'motorbike',roles:[1,2]}]});
  const swapped=validateRequest({...input,sceneProps:[{kind:'motorbike',roles:[2,1]}]});
  assert.notEqual(settingsKey(first),settingsKey(swapped));
  assert.match(buildPrompt(swapped),/驾驶位由角色2使用，后座由角色1使用/);
  const boards=validateRequest({...input,sceneProps:[{kind:'skateboard',roles:[1]},{kind:'skateboard',roles:[2]}]});
  assert.match(buildPrompt(boards),/第2件：一个滑板/);
  assert.equal(settingsKey(validateRequest(input)),settingsKey(validateRequest({...input,sceneProps:[]})));
  for(const props of [[{kind:'skateboard',roles:[1,2]}],[{kind:'sofa-2',roles:[1,1]}],[{kind:'motorbike',roles:[null,2]}],[{kind:'sofa-3',roles:[1,3,null]}],[{kind:'stool',roles:[null]}],[{kind:'stool',roles:[1]},{kind:'skateboard',roles:[1]}]]){
    assert.throws(()=>validateRequest({...input,sceneProps:props}));
  }
  assert.doesNotThrow(()=>validateRequest({...input,sceneProps:[{kind:'motorbike',roles:[1,null]}]}));
});
test('attachments follow their owner across requests and batches without changing legacy settings',()=>{
  const dressed={...role,attachments:{necklace:'一串珍珠',hair:'短卷发',leftHand:'一束花',headwear:'银发簪'},partImages:{headwear:'upload-11111111-1111-4111-8111-111111111111',hair:'upload-22222222-2222-4222-8222-222222222222'}};
  const scene={...input,characters:[dressed,input.characters[1]]},job=validateRequest(scene);
  assert.match(buildPrompt(job),/角色1的左手持物：一束花/);
  assert.notEqual(settingsKey(job),settingsKey(validateRequest(input)));
  assert.equal(settingsKey(job),settingsKey(validateRequest({...scene,characters:[{...dressed,attachments:{headwear:'银发簪',leftHand:'一束花',hair:'短卷发',necklace:'一串珍珠'}},input.characters[1]]})));
  assert.deepEqual(referenceSlots(job).find(slot=>slot.kind==='costume').extras.map(extra=>extra.key),['headwear']);
  assert.deepEqual(referenceSlots(job).find(slot=>slot.kind==='face').extras.map(extra=>extra.key),['hair']);
  assert.throws(()=>validateRequest({...scene,sceneProps:[{kind:'motorbike',roles:[1,2]}]}),/车把/);
  assert.throws(()=>validateRequest({...input,characters:[{...role,attachments:{unlisted:'text'}},input.characters[1]]}),/小件/);
  const rows=batchRequests({mode:'paired',poses:['p'],faces:['face-a','new-face'],costumes:['c'],settings:{...input,characters:[dressed]}});
  assert.equal(rows[0].characters[0].attachments.hair,'短卷发');assert.equal(rows[1].characters[0].attachments.hair,undefined);
  assert.equal(rows[1].characters[0].attachments.necklace,'一串珍珠');
  assert.equal(rows[1].characters[0].attachments.headwear,'银发簪');
  assert.deepEqual(rows[1].characters[0].partImages,{headwear:'upload-11111111-1111-4111-8111-111111111111'});
});
