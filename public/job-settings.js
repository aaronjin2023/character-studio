import { pipelineIdentity } from './providers.js';
import { STYLE_OPTIONS } from './effects.js';
import { SUBJECT_TYPES, subjectTypeFor, subjectFor, resourceKindsFor, subjectLabel, isFantasy } from './subject-types.js';
export const MAX_CHARACTERS = 6;
export const ROLE_DETAILS = {
  pose:{leftHand:'左手持物',rightHand:'右手持物'},
  costume:{necklace:'项链',earrings:'耳环',glasses:'眼镜',backpack:'背包',headwear:'头饰',shoes:'鞋履'},
  face:{hair:'发型',faceTattoo:'面部纹身'}
};
export const PART_LABELS=Object.assign({},...Object.values(ROLE_DETAILS));
export function detailEntries(role) {
  return Object.entries(PART_LABELS).filter(([key])=>!(key==='hair'&&role.hairFaceId)&&role.attachments?.[key]?.trim());
}
export const SCENE_PROPS = {
  'sofa-2': {label:'双人沙发', slots:['左座','右座']},
  'sofa-3': {label:'三人沙发', slots:['左座','中座','右座']},
  stool: {label:'单人板凳', slots:['座位']},
  skateboard: {label:'滑板', slots:['滑手位']},
  motorbike: {label:'双座机车', slots:['驾驶位','后座']},
  'motorbike-1': {label:'单座机车', slots:['驾驶位']}
};
export function scenePropIssue(props, characters) {
  if(!Array.isArray(props)||props.length>MAX_CHARACTERS)return '一张画面最多配置六件共享道具。';
  const occupied=new Set();
  for(const prop of props){
    if(!prop || typeof prop.kind!=='string' || !Object.hasOwn(SCENE_PROPS,prop.kind))return '请选择有效的道具款式。';
    const spec=SCENE_PROPS[prop.kind];
    if(prop.assetId!==undefined && (typeof prop.assetId!=='string'||!/^upload-[\w-]{36}$/.test(prop.assetId)))return '道具参考图编号无效。';
    if(!Array.isArray(prop.roles)||prop.roles.length!==spec.slots.length)return `${spec.label}的使用位数量不匹配。`;
    if(prop.roles.every(role=>role===null))return `请为${spec.label}选择使用角色。`;
    for(const role of prop.roles){
      if(role===null)continue;
      if(!Number.isInteger(role)||role<1||role>characters.length)return `${spec.label}需要选择画面中的角色。`;
      if(occupied.has(role))return `角色 ${role} 不能同时占用两个使用位。`;
      occupied.add(role);
    }
    if(prop.kind==='motorbike' && !prop.roles[0])return '请先为双座机车指定驾驶者。';
    if(prop.kind.startsWith('motorbike')){
      const driver=characters[prop.roles[0]-1];
      if(driver?.attachments?.leftHand?.trim()||driver?.attachments?.rightHand?.trim()||driver?.partImages?.leftHand||driver?.partImages?.rightHand)return `角色 ${prop.roles[0]} 是驾驶者，双手须留给车把，请移除其手持物。`;
    }
  }
  return '';
}
export const CONVERSION_REVISION = 7;
export const STYLE_TRANSFER_REVISION = 1;
export const STYLE_REVISIONS = Object.fromEntries(STYLE_OPTIONS.map(style => [style.id, style.revision]));
export const OUTPUT_TYPES = { 'style-transfer':'照片转风格', 'pose-tween':'骨架补间','pose-plan':'动作骨架方案','pose-frame':'动作骨架帧', image: '人物图片', 'character-sheet': '人设资料图', background: '背景资源', foreground: '前景资源', expression:'表情头像', 'resource-conversion':'资源写实化', 'costume-plan':'服饰设计方案', 'costume-piece':'系列服饰', 'scene-relight':'现场光校正' };
export const SCENE_LIGHT_REVISION = 2;
export const usesSceneLighting = job => outputTypeFor(job) === 'image' && subjectTypeFor(job) === 'human' && !!job.selections?.background && ['photo','cinematic','editorial','film'].includes(job.style);
export const CAMERA_DIRECTIONS = { reference:'沿用骨架机位', front:'正面', 'front-left':'左斜前', 'front-right':'右斜前', 'side-left':'左正侧', 'side-right':'右正侧', 'rear-left':'左斜后', 'rear-right':'右斜后', back:'正背面', left:'从原机位向左绕拍约 30°', right:'从原机位向右绕拍约 30°' };
export const CAMERA_PITCHES = { reference:'沿用骨架俯仰', level:'平视', high:'俯拍', low:'仰拍', overhead:'垂直顶拍' };
export const needsNewProjection = (direction, pitch) => pitch === 'overhead' || ['side-left','side-right','rear-left','rear-right','back'].includes(direction);
export const cameraRevisionFor = (direction, pitch) => needsNewProjection(direction, pitch) ? 2 : 1;
export const SHOT_SIZES = { full:'全身', medium:'半身', close:'头部特写', wide:'环境远景' };
export const SCENE_LIGHTS = {auto:'按背景判断',left:'光从画面左侧来',right:'光从画面右侧来',front:'光从相机一侧来',back:'光从场景深处来',diffuse:'漫射光'};
export function projectedShadow(light, direction = 'reference', pitch = 'reference', originalAngle) {
  const shadowAngle = {left:0,front:90,right:180,back:270}[light];
  const azimuth = {front:0,'front-left':45,'side-left':90,'rear-left':135,back:180,'rear-right':-135,'side-right':-90,'front-right':-45};
  const original = {'正面':0,'背面':180}[originalAngle];
  const delta = {reference:0,left:-30,right:30}[direction] ?? (azimuth[direction] - original);
  if (!Number.isFinite(shadowAngle) || !Number.isFinite(delta)) return '';
  // Ground-plane directions start at screen right and increase toward the far side.
  const sector = ((Math.round((shadowAngle - delta) / 45) % 8) + 8) % 8;
  const directions = pitch === 'overhead'
    ? ['画面右方','画面右上方','画面上方','画面左上方','画面左方','画面左下方','画面下方','画面右下方']
    : ['画面右侧','右侧远处','远离镜头','左侧远处','画面左侧','左侧近处','靠近镜头','右侧近处'];
  return directions[sector];
}
export const outputTypeFor = job => job.outputType ?? 'image';
export const isSceneJob = job => ['background', 'foreground'].includes(outputTypeFor(job));
export const outputLabel = job => isSceneJob(job)||['style-transfer','expression','resource-conversion','scene-relight','costume-plan','costume-piece','pose-tween','pose-plan','pose-frame'].includes(outputTypeFor(job)) ? OUTPUT_TYPES[outputTypeFor(job)] : subjectFor(job)?.[outputTypeFor(job) === 'character-sheet' ? 'sheet' : 'image'] || OUTPUT_TYPES[outputTypeFor(job)];
export function charactersFor(job) {
  if (isSceneJob(job)) return [];
  return job.characters || [{ costume: job.selections?.costume, face: job.selections?.face, gender: 'reference', position: '' }];
}
export function faceRole(role, ref) {
  return !role.expressionAssetId && ref?.id===role.face && ref.expression?.sourceFaceId
    ? {...role,face:ref.expression.sourceFaceId,expressionAssetId:ref.id} : role;
}
export function referenceSlots(job) {
  if(job.outputType==='style-transfer')return [{kind:'source',id:job.sourceId}];
  if(['pose-plan','pose-frame'].includes(job.outputType))return [job.stylePoseId,job.startPoseId,job.endPoseId].filter(Boolean).map(id=>({kind:'pose',id}));
  if(outputTypeFor(job)==='pose-tween')return [{kind:'pose',id:job.startPoseId},{kind:'pose',id:job.endPoseId}];
  if(['costume-plan','costume-piece'].includes(outputTypeFor(job)))return [{kind:'costume',id:job.sourceAssetId}];
  if(outputTypeFor(job)==='scene-relight')return [{kind:'source',id:job.sourceJobId}];
  if(outputTypeFor(job)==='resource-conversion')return [{kind:job.sourceKind,id:job.sourceAssetId}];
  if(outputTypeFor(job)==='expression')return [{kind:'face',id:job.sourceFaceId}];
  if (isSceneJob(job)) return job.sourceId ? [{ kind: 'source', id: job.sourceId }] : [];
  const slots=[{ kind: 'pose', id: job.selections?.pose }, ...charactersFor(job).flatMap((character, index) => resourceKindsFor(job).filter(kind => kind !== 'pose').map(kind => ({ kind, id: kind==='face' ? character.expressionAssetId || character.face : character[kind], characterIndex: index }))), ...['background','foreground'].filter(kind => job.selections?.[kind]).map(kind => ({kind, id:job.selections[kind]}))];
  for(const slot of slots){
    const images=charactersFor(job)[slot.characterIndex]?.partImages;
    const extras=slot.kind==='pose'?(job.sceneProps||[]).flatMap((p,i)=>p.assetId?[{key:p.kind,id:p.assetId,label:`第${i+1}件${SCENE_PROPS[p.kind].label}`}]:[])
      :images?Object.entries(PART_LABELS).filter(([key])=>images[key]&&!(key==='hair'&&charactersFor(job)[slot.characterIndex]?.hairFaceId)&&(slot.kind==='face'?Object.hasOwn(ROLE_DETAILS.face,key):slot.kind==='costume'&&!Object.hasOwn(ROLE_DETAILS.face,key))).map(([key,label])=>({key,label,id:images[key]})):[];
    const hairFaceId=charactersFor(job)[slot.characterIndex]?.hairFaceId;
    if(slot.kind==='face'&&hairFaceId)extras.unshift({key:'hair',kind:'face',label:'发型参考头像',id:hairFaceId});
    if(extras.length)slot.extras=extras;
  }
  return slots;
}
export function poseCount(item) {
  if (Number.isInteger(item?.personCount)) return item.personCount;
  if (/双人/.test(item?.group || '') || /^pair/.test(item?.id || '')) return 2;
  if (/单人/.test(item?.group || '')) return 1;
  return null;
}
export function defaultPosition(index, count, subjectType = 'human') {
  const label = SUBJECT_TYPES[subjectType]?.fantasy ? '角色' : subjectType === 'animal' ? '动物' : '人物';
  return count === 1 ? '' : count === 2 ? [`画面左侧的${label}`, `画面右侧的${label}`][index] : `从画面左到右第 ${index + 1} 个${label}`;
}
export function roleMismatch(characters, pose, faces, subjectType = 'human', surfaces = []) {
  for (const [index, character] of characters.entries()) {
    const resources = [pose, faces[index], surfaces[index]].filter(Boolean);
    if (resources.some(item => subjectTypeFor(item) !== subjectType)) return `角色 ${index + 1} 的资源主体类别不匹配，请使用同一类别的骨架与参考。`;
    if (SUBJECT_TYPES[subjectType]?.hasSpecies) {
      const species = [character.species, pose?.roleSpecies?.[index] || (poseCount(pose) === 1 ? pose.species : ''), faces[index]?.species, surfaces[index]?.species].filter(Boolean).map(value => value.trim().toLowerCase());
      if (new Set(species).size > 1) return `角色 ${index + 1} 的物种不匹配，请使用同一物种／种族的骨架、头部和体表。`;
      if (SUBJECT_TYPES[subjectType].fantasy) {
        const anatomy = [character.anatomy, pose?.roleAnatomies?.[index] || (poseCount(pose) === 1 ? pose.anatomy : ''), faces[index]?.anatomy, surfaces[index]?.anatomy].filter(Boolean).map(value => value.trim());
        if (new Set(anatomy).size > 1) return `角色 ${index + 1} 的身体结构设定不匹配，请使用同一结构版本的骨架、头部和体表与附肢；衣服可自由搭配。`;
      }
      if (!SUBJECT_TYPES[subjectType].hasGender) continue;
    }
    const bone = pose?.roleGenders?.[index] || (poseCount(pose) === 1 ? pose.gender : null);
    const values = [bone, character.gender, faces[index]?.gender].filter(gender => ['male', 'female'].includes(gender));
    if (new Set(values).size > 1) return `角色 ${index + 1} 的骨架、角色类型和头像不匹配，请选择相同类型；衣服可以自由搭配。`;
  }
  return '';
}

export function settingsKey(job) {
  let endpoint = job.baseURL?.trim() || '';
  try { endpoint = new URL(endpoint).href.replace(/\/+$/, ''); } catch { /* Invalid input is rejected before generation. */ }
  return JSON.stringify([
    subjectTypeFor(job), job.subjectRevision ?? 1, outputTypeFor(job), job.provider, job.selections?.pose, charactersFor(job).map((role,index) => {
      const character=faceRole(role,job.references?.find(ref=>ref.kind==='face'&&ref.characterIndex===index));
      const details=detailEntries(character).map(([key])=>[key,character.attachments[key].trim()]);
      const images=Object.keys(PART_LABELS).filter(k=>character.partImages?.[k]&&!(k==='hair'&&character.hairFaceId)).map(k=>[k,character.partImages[k]]);
      return [character.costume, character.surface, character.face, character.gender || 'reference', character.species?.trim() || '', character.position ?? '', ...(isFantasy(job) ? [character.anatomy?.trim() || ''] : []), ...(character.expressionAssetId?[character.expressionAssetId]:[]), ...(details.length?[details]:[]), ...(images.length?[['images',images]]:[]), ...(character.hairFaceId?[['hairFace',character.hairFaceId]]:[])];
    }),
    job.prompt ?? '', job.style, job.styleRevision ?? 1, job.background, job.size, job.quality,
    job.effect ?? 'none', job.effectRevision ?? 0, job.selections?.background || '', job.selections?.foreground || '',
    ...(outputTypeFor(job) === 'image' ? [job.cameraDirection ?? 'reference', job.shotSize ?? 'full', job.cameraPitch ?? 'reference', job.cameraRevision ?? 1] : []),
    ...(isSceneJob(job) ? [job.title, job.sourceId || ''] : []),
    ...(outputTypeFor(job) === 'background' || (outputTypeFor(job) === 'image' && job.selections?.background) ? [job.sceneLight ?? 'auto'] : []),
    ...(job.sceneLightRevision ? [job.sceneLightRevision] : []),
    ...(job.sceneProps?.length ? [job.sceneProps.map(prop=>[prop.kind,...prop.roles,...(prop.assetId?[prop.assetId]:[])])] : []),
    ...(outputTypeFor(job)==='scene-relight'?[job.sourceJobId,job.sourceHash,job.sceneLight,job.relightRevision??1]:[]),
    ...(outputTypeFor(job)==='expression'?[job.sourceFaceId,job.sourceHash,job.expressionId,job.expressionRevision]:[]),
    ...(['pose-plan','pose-frame'].includes(outputTypeFor(job))?[job.action,job.stylePoseId,job.startPoseId,job.endPoseId,job.count,job.referenceHashes,job.poseMetadata,job.planId,job.planHash,job.frameIndex,job.sequenceRevision]:[]),
    ...(outputTypeFor(job)==='pose-tween'?[job.startPoseId,job.endPoseId,job.startHash,job.endHash,job.count,job.frameIndex,job.tweenRevision]:[]),
    ...(['costume-plan','costume-piece'].includes(outputTypeFor(job))?[job.title,job.sourceAssetId,job.sourceHash,job.seriesRevision,job.seriesId,job.pieceId,job.planHash]:[]),
    ...(outputTypeFor(job)==='resource-conversion'?[job.sourceKind,job.sourceAssetId,job.sourceHash,job.conversionRevision]:[]),
    ...(outputTypeFor(job)==='style-transfer'?[job.sourceId,job.sourceHash,job.transferRevision]:[]),
    ...(job.provider === 'api' ? [job.model?.trim(), endpoint] : []),...pipelineIdentity(job)
  ]);
}

export function savedMatches(jobs, settings) {
  const key = settingsKey(settings);
  return jobs.filter(job => job.type !== 'extraction' && job.status === 'completed' && settingsKey(job) === key).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function matchesHistory(job, { query = '', from = '', to = '', provider = '', status = 'completed', outputType = '', subjectType = '', style = '', effect = '', people = '', size = '', cameraDirection = '', cameraPitch = '', shotSize = '' } = {}) {
  if (job.type === 'extraction' || (status === 'completed' && (job.status !== 'completed' || !job.imageURL))) return false;
  if (status !== 'all' && job.status !== status) return false;
  if (provider && job.provider !== provider) return false;
  if (outputType && outputTypeFor(job) !== outputType) return false;
  if (subjectType && subjectTypeFor(job) !== subjectType) return false;
  if (style && job.style !== style) return false;
  if (effect && (job.effect || 'none') !== effect) return false;
  if ((cameraDirection || cameraPitch || shotSize) && outputTypeFor(job) !== 'image') return false;
  if (cameraDirection && cameraDirection !== (job.cameraDirection ?? 'reference')) return false;
  if (cameraPitch && cameraPitch !== (job.cameraPitch ?? 'reference')) return false;
  if (shotSize && shotSize !== (job.shotSize ?? 'full')) return false;
  const [width, height] = String(job.size || '').split('x').map(Number);
  const format = width > 0 && height > 0 ? width === height ? 'square' : width < height ? 'portrait' : 'landscape' : 'unknown';
  if (size && format !== size) return false;
  if(people && outputTypeFor(job)==='style-transfer')return false;
  const count = job.personCount ?? charactersFor(job).length;
  if (people && (people === 'multi' ? count < 3 : count !== Number(people))) return false;
  const date = new Date(job.createdAt);
  const day = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  if ((from && day < from) || (to && day > to)) return false;
  const text = [job.id, job.sourceJobId, job.title, job.prompt, outputLabel(job), subjectLabel(job), ...Object.values(job.selections || {}), ...charactersFor(job).flatMap(character => [character.costume, character.surface, character.face, character.position, character.species, character.anatomy]), ...(job.references || []).flatMap(ref => [ref.id, ref.title, ref.category, ref.species, ref.anatomy])].join(' ').toLowerCase();
  return query.trim().toLowerCase().split(/\s+/).every(word => text.includes(word));
}
