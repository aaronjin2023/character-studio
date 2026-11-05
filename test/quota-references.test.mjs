import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, readFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {referenceSlots} from '../public/job-settings.js';
import {quotaReferences} from '../generation.mjs';
import {assetPath} from '../catalog.mjs';

test('quota preserves role ownership and separate scene references under the five-image limit', async () => {
  const role = {costume:'AUT-0054',face:'f192f568573'};
  const dir = await mkdtemp(join(tmpdir(),'studio-ref-cards-'));
  const paths = await Promise.all([assetPath('pose','pair60_P008_front'),assetPath('costume',role.costume),assetPath('face',role.face)]);
  const pair = {selections:{pose:'p',background:'b'},characters:[role,role]};
  const original = [paths[0],paths[1],paths[2],paths[1],paths[2],paths[0]];
  assert.deepEqual(await quotaReferences(pair,original.slice(0,5),dir),{paths:original.slice(0,5),legend:''});
  const packed = await quotaReferences(pair,original,dir);
  assert.deepEqual(packed.paths,[original[0],join(dir,'roles-1.png'),join(dir,'roles-2.png'),original[5]]);
  assert.match(packed.legend,/附件3：第1行角色2从左到右：图4.*图5/);
  assert.match(packed.legend,/附件4：图6（背景）/);
  const group = {subjectType:'fantasy-humanoid',selections:{pose:'p',background:'b',foreground:'f'},characters:Array(6).fill({...role,surface:'s'})};
  const slots = referenceSlots(group);
  const large = await quotaReferences(group,slots.map(s=>s.kind==='costume'?paths[1]:s.kind==='face'?paths[2]:paths[0]),dir);
  assert.equal(large.paths.length,5);
  assert.match(large.legend,/第3行角色6从左到右：图17.*图18.*图19/);
  assert.match(large.legend,/附件5：图21（前景）/);
  const card = await readFile(large.paths[2]);
  assert.deepEqual([card.readUInt32BE(16),card.readUInt32BE(20)],[2304,2304]);
});
