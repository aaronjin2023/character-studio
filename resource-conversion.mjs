import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {findAsset,assetPath,imageType} from './catalog.mjs';
import {validateProvider} from './generation.mjs';
import {subjectTypeFor,subjectFor} from './public/subject-types.js';
import {STYLE_REVISIONS,CONVERSION_REVISION} from './public/job-settings.js';

export function headwearRule(kind) {
  const ornaments='hats, helmets, crowns, tiaras, hairpins, hair clips, hair bands, ribbons, decorative hair ties, veils, earrings and glasses';
  if(kind==='face')return `Create a reusable undecorated head portrait. Remove all detachable head and face ornaments, including ${ornaments}. Lower hoods off the head. Reconstruct only the obscured hair or scalp from the visible hairline, color and texture. Preserve the face, expression, visible hairstyle, inherent ear shape, natural horns, fur, feathers and skin markings. Keep all natural anatomy attached to the head. Do not display removed ornaments beside the portrait.`;
  if(kind==='costume')return `Include every visible detachable head and face ornament from the reference in the clothing set, including ${ornaments}. Arrange each removable ornament separately with clear space from the garments so it can be reused independently. Preserve its design, color and material. Keep attached garment components attached as in the reference, but do not turn a separate hat into a hood or merge hair ornaments into the clothing. Exclude hair, skin, natural ears, horns and feathers growing from the body. Include only ornaments actually visible in the source.`;
  return '';
}

export async function conversionSource(kind,id) {
  if(!['face','costume'].includes(kind))throw new Error('资源转绘仅支持头像和衣服。');
  const source=await findAsset(kind,id),bytes=await readFile(await assetPath(kind,id));imageType(bytes);
  const hash=createHash('sha256').update(bytes).update(JSON.stringify([subjectTypeFor(source),source.gender,source.species,source.anatomy])).digest('hex');
  return {source,bytes,hash};
}
export async function artworkSettings(input) {
  if(typeof input.sourceId!=='string'||!/^upload-[0-9a-f-]{36}$/.test(input.sourceId))throw new Error('请上传一张单角色原画。');
  const kinds=input.resourceKinds ?? ['face','costume'];
  if(!Array.isArray(kinds)||!kinds.length||kinds.some(kind=>!['face','costume'].includes(kind))||new Set(kinds).size!==kinds.length)throw new Error('原画真人化支持头像和衣服。');
  if(input.prompt || input.subjects || (input.subjectType && input.subjectType!=='human'))throw new Error('原画真人化直接依据单角色原图制作，无需填写角色描述。');
  const asset=await findAsset('source',input.sourceId);
  if(asset.partKind)throw new Error('请上传整张角色原画。');
  const bytes=await readFile(await assetPath('source',input.sourceId));imageType(bytes);
  const data={...validateProvider(input),type:'extraction',renderMode:'live-action',conversionRevision:CONVERSION_REVISION,artworkRevision:1,sourceId:asset.id,sourceHash:createHash('sha256').update(bytes).digest('hex'),title:asset.title.replace(/\.[^.]+$/,'').trim()||'角色原画',subjectType:'human',subjectRevision:subjectFor({subjectType:'human'}).revision,subjects:[{position:'',gender:'reference'}],resourceKinds:kinds,prompt:'',inferHidden:false};
  return {data,bytes};
}
export function artworkTask(job,{key,kind}) {
  const face=kind==='face';
  const task={...job,id:`${job.id}-${key}`,sourceKind:kind,references:[{}],size:face?'1024x1024':'1024x1536',quality:'medium',background:face?'studio':'white'};
  const portraitFocus=job.conversionRevision>=6
    ? 'Isolate the uncovered head and a small amount of collar. Preserve distinctive facial proportions, inherent nonhuman features, intentional skin colors, and expression.'
    : 'Isolate only the head, hair, headwear, and a small amount of collar. Preserve distinctive facial proportions, nonhuman features, intentional skin colors, expression, and visible head accessories from the original.';
  const focus=face?portraitFocus:'Separate the worn garments, footwear and wearable accessories from the figure. Keep only items supported by visible evidence. Omit the body, scenery, handheld weapons and objects that are not worn. Never invent standard armor, boots or trousers for areas outside the frame.';
  task.resolvedPrompt=`The sole image is the full original artwork of one character. Identify its visible design directly from the pixels, without needing the character name. Preserve the specific edition of the design in this image. ${focus}\n${conversionPrompt(task)}`;
  return task;
}
export function conversionSettings(input,{source,hash}) {
  const prompt=input.prompt??'';
  if(typeof prompt!=='string'||prompt.length>4000)throw new Error('补充要求请控制在 4,000 字以内。');
  const subjectType=subjectTypeFor(source);
  return {...validateProvider(input),outputType:'resource-conversion',sourceKind:input.sourceKind,sourceAssetId:source.id,sourceHash:hash,conversionRevision:CONVERSION_REVISION,subjectType,subjectRevision:subjectFor(source).revision,characters:[],selections:{},personCount:input.sourceKind==='face'?1:0,title:`${source.title.slice(0,55)} · 写实`,prompt:prompt.trim(),style:'photo',styleRevision:STYLE_REVISIONS.photo,effect:'none',effectRevision:0,background:input.sourceKind==='face'?'studio':'white',size:input.sourceKind==='face'?'1024x1024':'1024x1536',quality:'medium'};
}
export function conversionPrompt(job) {
  const source=job.references[0],config=subjectFor(job),face=job.sourceKind==='face';
  const bareHead=face && job.conversionRevision>=6;
  const headwear=bareHead ? 'Create a bareheaded portrait. Remove removable hats, caps, helmets and crowns and lower any hood completely off the head. Keep the same face, ear shape, horns and other natural anatomy. Show the entire uncovered crown with a little space above it. Infer only the part formerly covered, following the visible hairline, hair color, parting and texture, or the visible scalp, fur or feathers as appropriate. Keep headwear out of the portrait.\n' : '';
  return `Create a real ${face?(config.hasGender?'live-action casting / costume test portrait':'animal portrait photograph'):'practical wardrobe product photograph'}, using reference image 1 ONLY as a character and costume design brief. For an illustration or game render, this is a complete reinterpretation as a physically present subject, not a refinement of the illustrated surface. Prioritize photographic plausibility over literal fidelity to the drawing.\n`+
    (job.conversionRevision>=7 ? headwearRule(job.sourceKind)+'\n' : '') + headwear + (face?`${config.hasGender?'Cast an original believable human performer with practical character makeup for the illustrated character. Keep the gender and apparent age group, hairstyle and hair color, eye color, '+(bareHead?'visible facial details':'accessories')+', expression and head orientation; use these design cues to make the character recognizable. Allow a new natural brow, cheeks and jaw instead of requiring the illustrated face geometry. Do not interpret painted shadows or etched lines as real skin anatomy or aging. Distinguish lighting color casts from intrinsic character colors: preserve the complexion defined by the reference or user, including gray-white undead pallor and other intentional character or species colors, even if the resource is classified as human. Realize those colors with physically plausible skin and practical makeup, small irregular pores and soft surface transitions; do not add rosy blood color, healthy living warmth or a normal human complexion to an undead character. Photographic realism changes material and lighting, not these character traits. Clear eyes have normal pupils, sclera and soft window reflections. Hair or a convincingly fitted professional film wig has naturally weighted strands. If the input is already a real person photograph, preserve that person’s identity rather than recasting them.':'Photograph the same species as a physically present animal. Preserve its muzzle or beak, eyes, fur or feathers and recognizable markings; keep its species-specific anatomy and do not replace it with a human face. Fur and feathers have naturally grouped strands, density and weight.'} A candid professional camera portrait, head and upper chest at the reference head orientation, full top of the head, chin, ears and any horns inside frame. The face is the subject; armor or clothing only occupies the lower edges. Photograph in soft daylight from a large side window, a simple cream-gray wall falling gently out of focus. Neutral white balance that faithfully records the intended complexion, gentle imperfect lighting, ordinary photographic dynamic range and moderate depth of field. The subject should look unmistakably like a physically present being who could walk into the room. Prioritize photographic plausibility over literal fidelity to the drawing.\n`:
      'Rebuild the reference wardrobe as actual wearable garments and practical film costume pieces. Preserve the existing silhouette, layers, cut, colors, ornament, fastenings, shoes and accessories; introduce only construction details needed to make them physically plausible. Cloth has weight and fibers, leather has soft folds, hard pieces have readable thickness and real joins. Metal has broad soft reflections and restrained wear, with quiet surfaces between decorative details. Photograph only the existing costume pieces laid naturally on a white seamless tabletop, with real contact shadows, consistent soft daylight, neutral white balance and ordinary photographic dynamic range. Keep every existing piece fully in frame. No wearer, face, body, hands, feet, floating worn pose or added equipment.\n')+
    (config.fantasy&&(face||!(job.conversionRevision>=7))?'Preserve the fantasy species, limb counts, horns, pointed ears, hybrid parts and other natural traits, including intentional species colors. Realize them as a physically plausible creature or practical special-effects makeup; do not add or remove parts or turn the species into an ordinary human.\n':'')+
    `${source.gender?`Reference gender: ${source.gender}. `:''}${source.species?`Species: ${source.species}. `:''}${source.anatomy?`Anatomy: ${source.anatomy}.`:''}\nComplete occluded details only as necessary and consistent with the design. One standalone resource photograph, without typography, collage, comparison panels or watermarks. Do not carry across painted lighting, polygonal facial planes, etched skin texture, uniformly sharp strands or surface scratches. No illustration, digital sculpture, videogame rendering, HDR sharpening or waxy skin.${job.prompt?`\nAdditional user requirements: ${job.prompt}`:''}`;
}
