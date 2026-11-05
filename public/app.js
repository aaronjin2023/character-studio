import { providerLabel } from './providers.js';
import {normalizeTags,matchesTag} from './tags.js';
import {EXPRESSIONS} from './expressions.js';
import { batchRows } from './batch.js';
import { savedMatches, settingsKey, matchesHistory, charactersFor, faceRole, poseCount, defaultPosition, roleMismatch, MAX_CHARACTERS, STYLE_REVISIONS, CONVERSION_REVISION, OUTPUT_TYPES, outputTypeFor, isSceneJob, outputLabel, CAMERA_DIRECTIONS, CAMERA_PITCHES, SHOT_SIZES, cameraRevisionFor, SCENE_LIGHTS, projectedShadow, usesSceneLighting, SCENE_LIGHT_REVISION, SCENE_PROPS, scenePropIssue, ROLE_DETAILS, detailEntries } from './job-settings.js';
import { subjectsFor, extractionParts, extractionKinds } from './extraction-settings.js';
import { effectsFor, effectFor, effectLabel, STYLE_OPTIONS } from './effects.js';
import { SUBJECT_TYPES, subjectTypeFor, subjectFor, subjectLabel, resourceKindsFor, resourceName, resourceMatchesSubject, isFantasy } from './subject-types.js';

const $ = selector => document.querySelector(selector);
for (const id of ['subject-type', 'extract-subject-type', 'history-subject']) {
  const select = $(`#${id}`);
  select.replaceChildren(...(id === 'history-subject' ? [new Option('全部类别', '')] : []), ...Object.entries(SUBJECT_TYPES).map(([id, config]) => new Option(config.label, id)), ...(id === 'history-subject' ? [new Option('场景', 'scene')] : []));
}
const names = { pose: '骨架姿势', costume: '衣服搭配', face: '头像发型', surface:'体表外观', background:'背景场景', foreground:'前景元素' };
const shortNames = { pose: '骨架', costume: '衣服', face: '头像', surface:'体表', background:'背景', foreground:'前景' };
const sceneKinds = ['background','foreground'];
const state = { settings:{provider:'quota',model:'gpt-image-2',baseURL:'https://api.openai.com/v1',hasApiKey:false}, submitting:false, conversionSourceId:'', conversionJob:null, conversionSubmitting:false, conversionImporting:false, conversionError:'', expressionItems:[], expressionFaceId:'', expressionSubmitting:false, expressionLoading:false, expressionLoadedKey:'', expressionReplaceIds:[], bulkMode:false, bulkIds:[], tagging:false, business:'generate', draftsReady:false, production:'single', batch:{poses:[],costumes:[],faces:[]}, queue:null, subjectType:'human', catalogs: {}, selections: {}, characters: [], activeCharacter: 0, sceneProps: [], partAssets: [], subjects: [{position:'',gender:'reference'}], assetKind: 'pose', page: 0, pageSize: 12, jobs: [], csrf: '', quota: {}, busy: false, generationBusy: false, extractionBusy: false, sceneBusy:false, sceneKind:'background', sceneSourceId:'', sceneJob:null, scenePreview:null, sourceId: null, extractions: [], extraction: null, currentJob: null, previewJob: null, defaults: {}, uploads: [] };
let extractionTimer;
const extractionViews={};
let extractView='extraction',artSource='',artUploading=false;
const viewForExtraction=job=>job?.renderMode==='live-action'?'artwork':'extraction';
const artworkKinds=()=>[...document.querySelectorAll('input[name="artwork-kind"]:checked')].map(input=>input.value);
const pollTimers=new Map();
const assetURL = (kind, id, thumb = true) => `/assets/${kind}/${encodeURIComponent(id)}${thumb ? '?thumb=1' : ''}`;
const itemFor = (kind, id) => state.catalogs[kind]?.find(x => x.id === id) || state.uploads.find(x => x.kind === kind && x.id === id);
function element(tag, className, text) { const el = document.createElement(tag); if (className) el.className = className; if (text != null) el.textContent = text; return el; }
function notice(message = '') { $('#notice').textContent = message; $('#notice').hidden = !message; }
const businessPages=['generate','batch','sheets'];
const draftKey=page=>page==='generate'?'character-studio-v1':`character-studio-${page}-v1`;
function switchPage(page) {
  page = [...businessPages,'resources','history','queue','settings'].includes(page) ? page : 'generate';
  closePicker();
  if(businessPages.includes(page)){
    if(page!==state.business){
      remember();state.business=page;
      if(state.draftsReady)restoreBusiness();
    }
    $(`#page-${page}`).append($('#studio-workspace'));
    $('#studio-workspace').dataset.business=page;
  }
  document.querySelectorAll('[data-page]').forEach(button => { const selected = button.dataset.page === page; button.setAttribute('aria-selected', selected); button.tabIndex = selected ? 0 : -1; $(`#page-${button.dataset.page}`).hidden = !selected; });
  if (location.hash !== `#${page}`) history.replaceState(null, '', `#${page}`);
  if (page === 'queue' && state.csrf) void loadQueue().catch(error=>notice(error.message));
  if (page === 'settings' && state.csrf) void loadSettingsUI().catch(error=>notice(error.message));
  if (page === 'history' && state.csrf) void loadHistory().catch(error => notice(error.message));
}
function setBusy(kind, busy) { state[`${kind}Busy`] = busy; state.busy = state.generationBusy || state.extractionBusy || state.sceneBusy; updateGenerate(); updateExtraction(); updateScene(); }
async function request(url, options = {}) {
  const response = await fetch(url, { ...options, headers: { 'X-Studio-Token': state.csrf, ...options.headers } });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || `请求失败（${response.status}）`);
  return data;
}
function provider() { return state.settings.provider; }
function connectionSettings() { const {provider,model,baseURL,comfy}=state.settings;return {provider,model,baseURL,...(provider==='comfyui'?{comfy}:{})}; }
function canGenerate() { const settings=state.settings;return !!state.csrf&&(provider()==='api'?settings.hasApiKey:provider()==='comfyui'?!!settings.comfy?.workflowHash:state.quota.available); }
function options() { return { ...Object.fromEntries(['prompt','style','background','size','quality','effect'].map(key => [key, $(`#${key}`).value])), outputType: $('#output-type').value, subjectType:state.subjectType, ...($('#output-type').value === 'image' ? {cameraDirection:$('#cameraDirection').value, cameraPitch:$('#cameraPitch').value, shotSize:$('#shotSize').value} : {}) }; }
function currentSettings() {
  const settings = { ...options(), cameraRevision:cameraRevisionFor($('#cameraDirection').value, $('#cameraPitch').value), subjectRevision:subjectFor(state).revision, effectRevision:effectFor($('#effect').value)?.revision || 0, styleRevision: STYLE_REVISIONS[$('#style').value], provider: provider(), selections: Object.fromEntries(['pose',...sceneKinds].filter(kind=>state.selections[kind]).map(kind=>[kind,state.selections[kind]])), characters: state.characters.map(character => ({...character})), ...connectionSettings() };
  if (settings.outputType==='image' && state.subjectType==='human' && state.sceneProps.length) settings.sceneProps=state.sceneProps;
  if (usesSceneLighting(settings)) settings.sceneLightRevision=SCENE_LIGHT_REVISION;
  return settings;
}
function savedMatch() {
  const settings = currentSettings();
  if (settings.outputType === 'image' && settings.selections.background) settings.sceneLight = itemFor('background', settings.selections.background)?.sceneLight ?? 'auto';
  return savedMatches(state.currentJob && !state.jobs.some(job=>job.id===state.currentJob.id) ? [...state.jobs, state.currentJob] : state.jobs, settings).find(job => job.imageURL);
}
function settingsSummary(job) {
  const camera = outputTypeFor(job) === 'image' ? [CAMERA_DIRECTIONS[job.cameraDirection ?? 'reference'], CAMERA_PITCHES[job.cameraPitch ?? 'reference'], SHOT_SIZES[job.shotSize ?? 'full']] : [];
  const attachments=charactersFor(job).flatMap((role,i)=>detailEntries(role).map(([key,label])=>`角色 ${i+1} · ${label}：${role.attachments[key]}`));
  const props=(job.sceneProps||[]).map(({kind,roles})=>SCENE_PROPS[kind].label+'（'+roles.map((role,i)=>SCENE_PROPS[kind].slots[i]+(role?' · 角色 '+role:' · 空位')).join('、')+'）');
  const options = ['style','background','size','quality'].filter(key => job[key]).map(key => {
    if (key === 'background' && job.selections?.background) {
      const scene = job.references?.find(ref => ref.kind === 'background' && ref.id === job.selections.background);
      return `背景：${scene?.title || job.selections.background}`;
    }
    return [...$(key==='background'?'#scene-background-mode':`#${key}`).options].find(option => option.value === job[key])?.textContent || ({reference:job.outputType === 'expression' ? '沿用头像画风' : '参考版式', opaque:'完整场景'}[job[key]] || job[key]);
  });
  return [outputLabel(job), ...camera, ...options, ...attachments, ...props, SCENE_LIGHTS[job.sceneLight], effectLabel(effectFor(job.effect))].filter(Boolean).join(' · ');
}
function remember() {
  if(!state.draftsReady||!state.csrf)return;
  const draft={selections:state.selections,characters:state.characters,sceneProps:state.sceneProps,subjectType:state.subjectType,activeCharacter:state.activeCharacter,uploads:state.uploads,options:options()};
  if(state.business==='batch')Object.assign(draft,{batch:state.batch,batchName:$('#batch-name').value,batchMode:$('#batch-mode').value});
  try{localStorage.setItem(draftKey(state.business),JSON.stringify(draft));}catch{}
}
function restoreBusiness(){
  let saved;try{saved=JSON.parse(localStorage.getItem(draftKey(state.business))||'null');}catch{}
  state.draftsReady=false;
  const batch=state.business==='batch', sheet=state.business==='sheets';
  const type=!batch&&saved?.subjectType&&Object.hasOwn(SUBJECT_TYPES,saved.subjectType)?saved.subjectType:'human';
  state.bulkMode=false;state.bulkIds=[];state.pickerTarget='role';state.production=batch?'batch':'single';
  state.selections={};changeSubjectType(type);
  if(saved){
    state.uploads=Array.isArray(saved.uploads)?saved.uploads:state.uploads;
    for(const kind of Object.keys(names))if(itemFor(kind,saved.selections?.[kind]))state.selections[kind]=saved.selections[kind];
    const roles=charactersFor(saved);
    if(roles.length && roles.length<=MAX_CHARACTERS && roles.every(role=>role && resourceKindsFor(state).filter(k=>k!=='pose').every(k=>!role[k]||itemFor(k,role[k]))))
      state.characters=(batch||sheet?roles.slice(0,1):roles).map(role=>({...faceRole(role,itemFor('face',role.face)),gender:role.gender||'reference',position:role.position||''}));
    if(!sheet&&!batch&&Array.isArray(saved.sceneProps))state.sceneProps=saved.sceneProps.filter(p=>p&&Object.hasOwn(SCENE_PROPS,p.kind)&&Array.isArray(p.roles)&&p.roles.length===SCENE_PROPS[p.kind].slots.length).slice(0,MAX_CHARACTERS);
  }
  state.activeCharacter=Number.isInteger(saved?.activeCharacter)&&saved.activeCharacter>=0&&saved.activeCharacter<state.characters.length?saved.activeCharacter:0;
  const values={prompt:'',style:'photo',background:'studio',size:sheet?'1024x1024':'1024x1536',quality:'medium',...saved?.options};
  for(const k of ['prompt','style','background','size','quality'])$(`#${k}`).value=values[k];
  $('#output-type').value=sheet?'character-sheet':'image';restoreCamera(values);syncEffectOptions('',values.effect||'none');
  state.batch={poses:[state.selections.pose].filter(Boolean),costumes:[],faces:[state.characters[0]?.face].filter(Boolean)};
  if(batch && saved?.batch)for(const k of ['poses','costumes','faces'])if(Array.isArray(saved.batch[k]))state.batch[k]=saved.batch[k].slice(0,100);
  $('#batch-name').value=saved?.batchName||'';$('#batch-mode').value=saved?.batchMode==='paired'?'paired':'wardrobe';
  $('#batch-panel').hidden=!batch;$('#output-type-help').hidden=true;
  $('.jump-output').textContent=batch?'出图设置 ↓':'看预览 ↓';$('#subject-type').closest('label').hidden=batch;$('#role-details').open=type!=='human';
  state.currentJob=null;state.generationBusy=false;$('#working').hidden=true;
  refreshCategoryUI();switchKind('pose');renderSelections();
  state.draftsReady=true;
  const running=state.jobs.find(job=>outputTypeFor(job)===(sheet?'character-sheet':'image')&&!job.batchId&&['running','queued'].includes(job.status));
  if(!batch&&running)renderJob(running);
}
function selectedID(kind) { return kind === 'pose' || sceneKinds.includes(kind) ? state.selections[kind] : state.characters[state.activeCharacter]?.[kind]; }
function categoryItems(kind) { return [...new Map([...state.uploads.filter(item=>item.kind===kind), ...(state.catalogs[kind] || [])].map(item=>[item.id,item])).values()].filter(item=>!item.superseded&&!item.expression&&resourceMatchesSubject(kind,item,state.subjectType)); }
function refreshCategoryUI() {
  const animal=state.subjectType==='animal', config=subjectFor(state);
  $('#subject-type').value=state.subjectType;
  names.face=config.hasGender?'头像发型':`${config.label}头部`;names.surface=config.fantasy?'体表与附肢':'体表外观';Object.assign(shortNames,config.names);
  document.querySelectorAll('[data-kind].nav-button').forEach(button=>{button.hidden=!['background','foreground',...config.kinds].includes(button.dataset.kind);button.firstElementChild.textContent=names[button.dataset.kind];});
  document.querySelectorAll('[data-count]').forEach(el=>el.textContent=categoryItems(el.dataset.count).length.toLocaleString());
  const batch=state.business==='batch', sheet=state.business==='sheets';
  $('#generate-title').textContent=batch?'批量生产':sheet?config.sheet:'单张出图';
  $('#generate-description').textContent=batch?'为模特商品展示组合骨架、衣服和头像，预览每行后整批加入队列。':sheet?'选择单个角色的资料，制作全身视图、表情和服装细节。':'选全画面共用的骨架，再为每个角色搭配衣服、头像和小件。';
  $('#character-position').placeholder=animal?'例如：左侧趴着的猫、右侧树枝上的鸟':'例如：左侧站立的人物、被抱起的人物';
  $('#result-image').alt=`生成的${config.label}图片`;
  $('#character-gender').closest('label').hidden=!config.hasGender;$('#character-species-field').hidden=!config.hasSpecies;
  $('#character-species-label').textContent=config.fantasy?'种族／物种':'动物物种';$('#character-species').placeholder=config.speciesExample || '';
  $('#character-anatomy-field').hidden=!config.fantasy;$('#character-anatomy').placeholder=config.anatomyExample || '';
  $('#preview-note').textContent=config.fantasy?'保持设定的肢体数量、连接和融合边界。生成结果需逐张审核。':animal?'保持物种结构和自然比例。体表、头部与姿势的一致性需逐张检查。':'人物比例和服装细节可在成图中核对。';

}
function changeSubjectType(type) {
  state.bulkIds=[];
  state.subjectType=type;state.activeCharacter=0;state.sceneProps=[];
  state.selections=Object.fromEntries(['background','foreground'].filter(kind=>state.selections[kind]).map(kind=>[kind,state.selections[kind]]));
  if(type==='human') {Object.assign(state.selections,state.defaults);state.characters=charactersFor({selections:state.defaults});}
  else state.characters=[{species:'',anatomy:'',gender:'reference',position:'',...Object.fromEntries(resourceKindsFor(state).filter(kind=>kind!=='pose').map(kind=>[kind,'']))}];
  refreshCategoryUI();
}
function generationMismatch() {
  if(!itemFor('pose',state.selections.pose) || state.characters.some(role=>resourceKindsFor(state).filter(kind=>kind!=='pose').some(kind=>!itemFor(kind,role[kind]))))return '请先选齐当前类别的骨架和每个角色的参考图。';
  if(subjectFor(state).hasSpecies && state.characters.some(role=>!role.species?.trim()))return '请填写每个角色的物种／种族；同一设定请使用相同名称。';
  if(isFantasy(state) && state.characters.some(role=>!role.anatomy?.trim()))return '请填写身体结构设定，明确肢体数量、连接位置及融合部位。';
  if(state.characters.length>1&&state.characters.some(role=>!role.position?.trim()))return '请填写每个角色在骨架中的位置。';
  return roleMismatch(state.characters,itemFor('pose',state.selections.pose),state.characters.map(role=>itemFor('face',role.face)),state.subjectType,state.characters.map(role=>itemFor('surface',role.surface)));
}
function activeGender() {
  if(!subjectFor(state).hasGender)return '';
  const pose = itemFor('pose', state.selections.pose), character = state.characters[state.activeCharacter];
  const gender = pose?.roleGenders?.[state.activeCharacter] || (poseCount(pose) === 1 ? pose.gender : character?.gender);
  return ['male','female'].includes(gender) ? gender : ['male','female'].includes(character?.gender) ? character.gender : '';
}
function setSelected(kind, id) {
  if (kind === 'pose') {
    if(state.selections.pose!==id){state.sceneProps=[];for(const role of state.characters)for(const key of Object.keys(ROLE_DETAILS.pose)){if(role.attachments)delete role.attachments[key];if(role.partImages)delete role.partImages[key];}}
    state.selections.pose = id;
    const count = poseCount(itemFor(kind, id));
    if (count && count !== state.characters.length) resizeCharacters(count);
  } else if (sceneKinds.includes(kind)) {
    state.selections[kind] = id;
    if (kind === 'background') $('#background').value = 'studio';
  } else {
    const role=state.characters[state.activeCharacter];
    if(kind==='face' && role.face!==id){delete role.expressionAssetId;for(const key of Object.keys(ROLE_DETAILS.face)){if(role.attachments)delete role.attachments[key];if(role.partImages)delete role.partImages[key];}}
    role[kind]=id;
  }
  if(subjectFor(state).hasSpecies && kind!=='costume' && !sceneKinds.includes(kind)){const item=itemFor(kind,id);state.characters.forEach((role,index)=>{for(const [field,plural] of [['species','roleSpecies'],['anatomy','roleAnatomies']]){const value=kind==='pose'?item?.[plural]?.[index] || (poseCount(item)===1?item[field]:''):index===state.activeCharacter?item?.[field]:'';if(value&&!role[field])role[field]=value;}});}
}
function resizeCharacters(count) {
  const oldCount = state.characters.length;
  state.characters = Array.from({length:count}, (_, index) => {
    const oldIndex = count === 1 ? state.activeCharacter : index, old = state.characters[oldIndex];
    return { ...(state.subjectType!=='human'?{...Object.fromEntries(resourceKindsFor(state).filter(kind=>kind!=='pose').map(kind=>[kind,''])),species:'',anatomy:'',gender:'reference'}:{costume:'',face:'',gender:'reference'}),...old,position:old && old.position !== defaultPosition(oldIndex,oldCount,state.subjectType) ? old.position : defaultPosition(index,count,state.subjectType) };
  });
  state.activeCharacter = Math.min(state.activeCharacter, count - 1);
}
function renderCharacterExpression() {
  const role=state.characters[state.activeCharacter],select=$('#character-expression');
  const variants=(state.catalogs.face||[]).filter(item=>item.expression && item.expression.sourceFaceId===role?.face && (!item.superseded||item.id===role?.expressionAssetId));
  const order=EXPRESSIONS.map(item=>item.id);
  variants.sort((a,b)=>order.indexOf(a.expression.id)-order.indexOf(b.expression.id));
  select.replaceChildren(new Option('沿用原头像表情',''),...variants.map(item=>new Option(item.expression.label+(item.superseded?'（旧版本）':''),item.id)));
  select.value=role?.expressionAssetId||'';select.disabled=!variants.length;
}
function renderCharacters() {
  const tabs = $('#character-tabs'); tabs.replaceChildren();
  state.characters.forEach((character, index) => {
    const button = element('button', '', `角色 ${index + 1}`); button.type = 'button'; button.setAttribute('aria-pressed', index === state.activeCharacter);
    const portrait=itemFor('face',character.expressionAssetId||character.face);
    if(portrait){const thumb=element('img');thumb.src=assetURL('face',portrait.id);thumb.alt='';button.prepend(thumb);}
    button.onclick = () => { state.activeCharacter = index; if (state.assetKind === 'face') $('#asset-gender').value = state.production==='batch'?'':activeGender(); renderSelections(); renderGallery(); }; tabs.append(button);
  });
  const character = state.characters[state.activeCharacter];
  renderCharacterExpression();
  if (!character) return;
  $('#character-species').value=character.species || '';
  $('#character-anatomy').value=character.anatomy || '';
  $('#character-gender').value = character.gender || 'reference'; $('#character-position').value = character.position || '';
  $('#add-character').disabled = state.characters.length >= MAX_CHARACTERS; $('#remove-character').hidden = state.characters.length <= 1;
  const count = poseCount(itemFor('pose', state.selections.pose));
  $('.character-buttons').hidden=state.business!=='generate'||(!!count && count===state.characters.length);
  const mismatch = generationMismatch();
  if(mismatch && state.subjectType!=='human')$('#role-details').open=true;
  $('#character-help').textContent = mismatch || (count && count !== state.characters.length ? `当前骨架为 ${count} 个主体，请调整角色数量或更换骨架。` : `${state.characters.length} 个角色 · ${1 + state.characters.length * (resourceKindsFor(state).length-1) + sceneKinds.filter(kind=>state.selections[kind]).length} 张参考图。${isFantasy(state)?'骨架、头部与体表须为同一种族及结构版本。':state.subjectType==='animal'?'骨架、头部与体表须为同一物种。':'骨架与头像匹配，衣服允许反串。'}`);
  $('#character-context').textContent = sceneKinds.includes(state.assetKind) ? `${shortNames[state.assetKind]}用于整体画面，可随时移除或更换。` : state.assetKind === 'pose' ? '角色数量随骨架同步。换回单主体时保留当前角色的参考和结构设定。' : `正在为角色 ${state.activeCharacter + 1} 选择${shortNames[state.assetKind]}。`;
}
const partPresets={
  hair:['低马尾','齐耳短发','自然卷发','盘发'],headwear:['素色发带','银色发簪','宽檐帽'],faceTattoo:['太阳穴细线纹身','眼角星形纹身'],
  necklace:['细银链','珍珠项链','皮绳吊坠'],earrings:['珍珠耳钉','小银耳环','长坠耳饰'],glasses:['黑色方框眼镜','金属圆框眼镜','深色太阳镜'],backpack:['帆布双肩包','皮质单肩包','户外背包'],
  leftHand:['一束鲜花','雨伞','手提包','咖啡杯'],rightHand:['一束鲜花','雨伞','手提包','咖啡杯']
};
let pickerOpener;
function openPicker(kind,target='role',part='base'){
  pickerOpener=document.activeElement;state.pickerTarget=target;state.bulkMode=false;state.bulkIds=[];
  switchKind(kind);showPickerPart(part);
  const dialog=$('#asset-picker');if(!dialog.open)dialog.showModal();
  if(part==='base')$('#search').focus();else $('#part-catalog-title').focus();
}
function closePicker(){const dialog=$('#asset-picker');if(dialog.open)dialog.close();}
function pickerKinds(){return [...resourceKindsFor(state),...sceneKinds];}
function pickerParts(kind){
  const parts=[['base',kind==='pose'?'骨架图库':kind==='face'?'原头像图库':kind==='costume'?'衣服图库':names[kind]]];
  if(state.pickerTarget?.startsWith('batch'))return parts;
  if(kind==='face')parts.push(['expression','表情']);
  if(state.subjectType==='human')parts.push(...Object.entries(ROLE_DETAILS[kind]||{}));
  if(kind==='pose'&&state.business==='generate'&&state.subjectType==='human')parts.push(['props','共享道具']);
  return parts;
}
function showPickerPart(part='base'){
  const kind=state.assetKind,parts=pickerParts(kind);if(!parts.some(([key])=>key===part))part='base';
  state.pickerPart=part;
  const nav=$('#library-tabs');nav.replaceChildren();
  $('#picker-root-field').hidden=!['library','batch-library'].includes(state.pickerTarget);
  const root=$('#picker-root');root.replaceChildren(...(state.pickerTarget==='batch-library'?['pose','costume','face']:pickerKinds()).map(k=>new Option(names[k],k)));root.value=kind;
  $('#picker-title').textContent=`${names[kind]}资源`;
  $('#picker-context').textContent=state.pickerTarget?.startsWith('batch')?'批量清单 · 可多选':sceneKinds.includes(kind)||kind==='pose'&&['base','props'].includes(part)?'整张画面共用':`角色 ${state.activeCharacter+1} · ${shortNames[kind]}`;
  for(const [key,label] of parts){
    const bt=element('button','nav-button',label);bt.type='button';bt.dataset.part=key;bt.setAttribute('aria-pressed',String(key===part));nav.append(bt);
  }
  $('#main-catalog').hidden=part!=='base';$('#part-catalog').hidden=part==='base';if(part==='base')return;
  const role=state.characters[state.activeCharacter],choices=$('#part-choices');choices.replaceChildren();
  const title=parts.find(([key])=>key===part)[1];$('#part-catalog-title').textContent=title;
  $('#custom-part').hidden=['expression','props'].includes(part);
  $('#part-upload-tools').hidden=part==='expression';$('#prop-upload-field').hidden=part!=='props';$('#part-upload-status').textContent='';
  function choice(label,selected,apply,image){
    const bt=element('button','part-choice');bt.type='button';bt.setAttribute('aria-pressed',String(selected));
    if(image){const img=element('img');img.alt='';img.src=image;bt.append(img);}
    bt.append(element('span','',label));bt.onclick=apply;choices.append(bt);
  }
  if(part==='expression'){
    const variants=(state.catalogs.face||[]).filter(item=>item.expression?.sourceFaceId===role.face&&(!item.superseded||item.id===role.expressionAssetId));
    $('#part-catalog-help').textContent=role.face?(variants.length?'只显示所选原头像的已制作表情。':'这张头像还没有制作表情。'):'先选择原头像。';
    if(role.face){
      choice('沿用原表情',!role.expressionAssetId,()=>{delete role.expressionAssetId;renderSelections();closePicker();},assetURL('face',role.face));
      for(const expr of EXPRESSIONS){const v=variants.find(item=>item.expression.id===expr.id);if(v)choice(v.expression.label,role.expressionAssetId===v.id,()=>{role.expressionAssetId=v.id;renderSelections();closePicker();},assetURL('face',v.id));}
      const manage=element('button','text-button',variants.length?'管理整套表情':'制作整套表情');manage.type='button';manage.onclick=()=>openExpressionGroup(role.face);choices.append(manage);
    }
  }else if(part==='props'){
    $('#part-catalog-help').textContent='选择一件道具，再在骨架下分配使用位。';
    for(const [key,spec] of Object.entries(SCENE_PROPS))choice(spec.label+' · '+spec.slots.join(' / '),false,()=>{if(addProp(key))closePicker();});
  }else{
    $('#part-catalog-help').textContent=`给角色 ${state.activeCharacter+1} 选择款式，也可以填写自己的描述。`;
    const chosen=role.attachments?.[part]||'';$('#part-description').value=chosen;
    choice('不添加',!chosen&&!role.partImages?.[part],()=>applyPart(''));
    for(const val of [...new Set([...(partPresets[part]||[]),...(chosen?[chosen]:[])])])choice(val,chosen===val,()=>applyPart(val));
  }
  if(part!=='expression')for(const asset of state.partAssets.filter(a=>part==='props'?Object.hasOwn(SCENE_PROPS,a.partKind):a.partKind===part)){
    choice(asset.title,role.partImages?.[part]===asset.id,()=>{
      if(part==='props'){if(addProp(asset.partKind,asset.id))closePicker();}
      else applyPart('',asset.id);
    },assetURL('source',asset.id,false));
  }
}
function applyPart(value,imageId){
  const role=state.characters[state.activeCharacter];role.attachments||={};
  if(imageId){role.partImages||={};role.partImages[state.pickerPart]=imageId;}else if(role.partImages)delete role.partImages[state.pickerPart];
  if(value.trim())role.attachments[state.pickerPart]=value.trim();else delete role.attachments[state.pickerPart];
  renderSelections();closePicker();
}
function addProp(kind,assetId){
  if(state.sceneProps.length>=MAX_CHARACTERS){notice('一张画面最多配置六件共享道具。');return false;}
  if(!Object.hasOwn(SCENE_PROPS,kind))return false;
  state.sceneProps.push({kind,roles:SCENE_PROPS[kind].slots.map(()=>null),...(assetId?{assetId}:{})});renderSelections();return true;
}
function renderDetailFields(kind,role){
  const row=element('div','owned-parts');
  for(const [part,label] of Object.entries(ROLE_DETAILS[kind])){
    const v=role.attachments?.[part]||state.partAssets.find(a=>a.id===role.partImages?.[part])?.title,bt=element('button',v?'owned-choice picked':'owned-choice',v?`${label} · ${v}`:label+' ＋');
    bt.type='button';bt.dataset.pick=kind;bt.onclick=()=>openPicker(kind,'role',part);row.append(bt);
  }
  return row;
}
function renderSelections() {
  renderCharacters();
  const container=$('#selections'),faceOptions=$('#face-options');
  container.replaceChildren();$('#pose-selection').replaceChildren();
  $('#assembly-count').textContent=`${state.characters.length} 个角色共用`;
  for(const kind of resourceKindsFor(state)){
    const item=itemFor(kind,selectedID(kind));
    const picture=kind==='face' ? itemFor(kind,state.characters[state.activeCharacter]?.expressionAssetId)||item : item;
    const part=element('div','part-card'),pick=element('button','part-pick');part.dataset.kind=kind;
    pick.type='button';pick.dataset.pick=kind;pick.onclick=()=>openPicker(kind);
    pick.setAttribute('aria-label',`${item?'更换':'选择'}${shortNames[kind]}`);
    const thumb=element('span','part-thumb');
    if(picture){const img=element('img');img.src=assetURL(kind,picture.id);img.alt='';thumb.append(img);}
    else thumb.textContent='＋';
    const info=element('span','part-info');
    info.append(element('span','part-label',kind==='pose'?'骨架参考':shortNames[kind]),element('strong','',item?.title||`选择${shortNames[kind]}`));
    if(kind==='pose'&&item)info.append(element('small','muted',[item.category,item.angle].filter(Boolean).join(' · ')));
    const action=element('span','part-action',item?'更换':'选择');
    if(kind==='pose')pick.append(thumb,info,action);else{info.append(action);pick.append(thumb,info);}part.append(pick);
    if(picture){const zoom=element('button','part-zoom','查看大图');zoom.type='button';zoom.onclick=()=>showImage(assetURL(kind,picture.id,false),picture.title);part.append(zoom);}
    (kind==='pose'?$('#pose-selection'):container).append(part);
    if(kind==='face'){
      part.append(faceOptions);
      const hasSet=state.catalogs.face?.some(face=>face.expression?.sourceFaceId===item?.id);
      $('#face-suite').textContent=hasSet?'查看整套表情':'制作表情';$('#face-suite').disabled=!item;
    }
    if(state.subjectType==='human' && ROLE_DETAILS[kind])part.append(renderDetailFields(kind,state.characters[state.activeCharacter]));

  }
  const scenes=$('#scene-selections');scenes.replaceChildren();
  for(const kind of sceneKinds){
    if(kind==='background'&&!state.selections.background)continue;
    const item=itemFor(kind,selectedID(kind)),block=element('div','scene-part'),pick=element('button','scene-pick');
    pick.type='button';pick.onclick=()=>openPicker(kind);pick.dataset.pick=kind;pick.setAttribute('aria-label',`选择${shortNames[kind]}资源`);
    if(item){const img=element('img');img.src=assetURL(kind,item.id);img.alt='';pick.append(img);}
    const text=element('span');text.append(element('strong','',shortNames[kind]),element('small','muted',item?.title||'选择资源 ＋'));pick.append(text);block.append(pick);
    if(item){const clear=element('button','text-button','移除');clear.type='button';clear.setAttribute('aria-label',`移除${shortNames[kind]}资源`);clear.onclick=()=>{delete state.selections[kind];renderSelections();renderGallery();};block.append(clear);}
    if(item&&kind==='background')block.append(element('small','muted',`主光 · ${SCENE_LIGHTS[item.sceneLight??'auto']}`));
    scenes.append(block);
  }
  $('#scene-background-mode').value=state.selections.background?'image':$('#background').value;
  renderReferenceBoard();renderProps();updateGenerate();remember();
}
function renderReferenceBoard(){
  const board=$('#reference-board');board.replaceChildren();
  function tile(title,refs){
    const figure=element('figure'),images=element('div','board-thumbs');
    for(const [kind,id] of refs){if(!id)continue;const img=element('img');img.src=assetURL(kind,id);img.alt='';images.append(img);}
    figure.append(images,element('figcaption','',title));board.append(figure);
  }
  tile('整体骨架',[['pose',state.selections.pose]]);
  state.characters.forEach((role,i)=>tile(`角色 ${i+1}`,resourceKindsFor(state).filter(kind=>kind!=='pose').map(kind=>[kind,kind==='face'?role.expressionAssetId||role.face:role[kind]])));
}
function renderProps() {
  const list=$('#prop-list');list.replaceChildren();
  for(const [i,prop] of state.sceneProps.entries()){
    const spec=SCENE_PROPS[prop.kind],row=element('div','prop-instance'),head=element('div','prop-instance-head');
    const remove=element('button','text-button','移除');remove.type='button';remove.setAttribute('aria-label',`移除第${i+1}件道具 ${spec.label}`);
    remove.onclick=()=>{state.sceneProps.splice(i,1);renderSelections();$('#prop-add').focus();};head.append(element('strong','',`${i+1}. ${spec.label}`),remove);row.append(head);
    const slots=element('div','prop-slots');
    spec.slots.forEach((slot,j)=>{
      const field=element('label','field',slot),select=element('select');select.setAttribute('aria-label',`第${i+1}件${spec.label} · ${slot}`);
      select.append(new Option('空位',''),...state.characters.map((role,k)=>new Option(`角色 ${k+1}${role.position?' · '+role.position:''}`,String(k+1))));
      select.value=prop.roles[j]===null?'':String(prop.roles[j]);
      select.onchange=()=>{prop.roles[j]=select.value?Number(select.value):null;updatePropHelp();updateGenerate();remember();};field.append(select);slots.append(field);
    });
    row.append(slots);list.append(row);
  }
  $('#prop-add').disabled=state.sceneProps.length>=MAX_CHARACTERS;updatePropHelp();
}
function updatePropHelp(){
  const issue=scenePropIssue(state.sceneProps,state.characters);
  $('#prop-help').textContent=issue || (state.sceneProps.length?'道具随骨架安排，请核对角色的坐姿、支撑点和握持位置。':'可选。添加一件，再把它的使用位分给对应角色。');
  $('#prop-help').classList.toggle('prop-error',!!issue);
}
function showImage(url, title) { $('#large-image').src = url; $('#large-image').alt = title; $('#image-title').textContent = title; $('#image-dialog').showModal(); }
function updateSelect(id, values, label) {
  const select = $(id); select.replaceChildren(new Option(label, ''));
  [...new Set(values)].filter(Boolean).forEach(value => select.append(new Option(value, value)));
}
function switchKind(kind) {
  const previous = state.assetKind;
  if(previous!==kind)state.bulkIds=[];
  $('#tag-filter').value='';$('#tags-status').textContent='';$('#tag-input').value='';
  state.assetKind = kind; state.page = 0;
  $('#library-title').textContent = names[kind]; $('#search').value = '';
  $('#search').placeholder = sceneKinds.includes(kind) ? `搜索${shortNames[kind]}名称或编号` : kind === 'pose' ? '搜索姿势名称或编号' : kind === 'costume' ? '搜索编号、颜色或服饰关键词' : '搜索头像编号或发型';
  $('#pose-filters').hidden = kind !== 'pose';
  if (kind === 'face') $('#asset-gender').value = activeGender();
  else if (previous !== kind) $('#asset-gender').value = '';
  $('#gender-filter').hidden = sceneKinds.includes(kind) || !subjectFor(state).hasGender;
  document.querySelectorAll('[data-kind].nav-button').forEach(button => { const selected = button.dataset.kind === kind; button.classList.toggle('active', selected); button.setAttribute('aria-pressed', selected); });
  updateSelect('#category', ['我的上传', ...categoryItems(kind).map(x => x.category)], '全部分类');
  if (kind === 'pose') { updateSelect('#group', categoryItems('pose').map(x => x.group), '全部体系'); updateSelect('#angle', categoryItems('pose').map(x => x.angle), '全部视角'); }
  renderCharacters(); renderGallery();
}
const translations = { '蓝': 'blue', '黑': 'black', '白': 'white', '裙': 'skirt dress', '牛仔': 'denim jeans', '开衫': 'cardigan', '运动鞋': 'sneakers', '红': 'red', '粉': 'pink', '绿': 'green', '外套': 'coat jacket' };
function filtered() {
  const search = $('#search').value.trim().toLowerCase();
  const words = (translations[search] || search).split(/\s+/).filter(Boolean);
  const category = $('#category').value, group = $('#group').value, angle = $('#angle').value;
  const items = categoryItems(state.assetKind);
  return items.filter(item => {
    if((state.business==='sheets'||state.business==='batch')&&state.assetKind==='pose'&&poseCount(item)>1)return false;
    if(!matchesTag(item,$('#tag-filter').value))return false;
    if (subjectFor(state).hasGender && $('#asset-gender').value && (item.gender || 'unspecified') !== $('#asset-gender').value) return false;
    if (category && item.category !== category) return false;
    if (state.assetKind === 'pose' && ((group && item.group !== group) || (angle && item.angle !== angle))) return false;
    const text = [item.id,item.title,item.category,item.keywords,item.group,item.angle,item.species,item.anatomy,...(item.tags||[]),...(item.roleSpecies || []),...(item.roleAnatomies || [])].filter(Boolean).join(' ').toLowerCase();
    return !search || text.includes(search) || words.some(word => text.includes(word));
  }).sort((a,b) => Number(b.id === selectedID(state.assetKind)) - Number(a.id === selectedID(state.assetKind)));
}
function renderGallery() {
  renderTagFilter();
  const items = filtered(), pages = Math.max(1, Math.ceil(items.length / state.pageSize));
  state.page = Math.min(state.page, pages - 1);
  const start = state.page * state.pageSize, visible = items.slice(start, start + state.pageSize);
  renderBulk(items,visible);
  $('#result-count').textContent = `${items.length.toLocaleString()} 张参考图`;
  $('#page-label').textContent = `${state.page + 1} / ${pages}`;
  $('#previous').disabled = state.page === 0; $('#next').disabled = state.page >= pages - 1;
  const gallery = $('#gallery'); gallery.replaceChildren(); gallery.setAttribute('aria-busy', 'false');
  if (!visible.length) {
    const empty=element('div','empty-library',sceneKinds.includes(state.assetKind) ? `没有匹配的${shortNames[state.assetKind]}。可上传图片，或先制作并审核入库。` : '没有找到匹配的参考图。换个关键词，或上传自己的图片。');
    if(state.subjectType!=='human'&&!sceneKinds.includes(state.assetKind)){const create=element('button','secondary',`制作${subjectFor(state).label}资源`);create.type='button';create.onclick=()=>{$('#extract-subject-type').value=state.subjectType;changeExtractionType();setResourceMode('extraction');switchPage('resources');};empty.append(create);}
    if(sceneKinds.includes(state.assetKind)){const create=element('button','secondary',`制作${shortNames[state.assetKind]}`);create.type='button';create.onclick=()=>{setResourceMode(state.assetKind);switchPage('resources');};empty.append(create);}
    gallery.append(empty);
  }
  visible.forEach(item => {
    const kind = state.assetKind, selected = librarySelecting() ? librarySelection().includes(item.id) : item.id === selectedID(kind);
    const button = element('button', 'asset'); button.type = 'button'; button.dataset.kind = kind; button.setAttribute('aria-pressed', selected); button.setAttribute('aria-label', `选择${shortNames[kind]}：${item.title} ${item.id}`);
    const frame = element('span', 'asset-image');
    const img = element('img'); img.src = assetURL(kind, item.id); img.alt = item.title; img.loading = 'lazy';
    img.onerror = () => { img.hidden = true; frame.append(element('span', 'asset-copy', '图片暂不可用')); };
    frame.append(img); if (selected) frame.append(element('span', 'selected-check', '已选'));
    const copy = element('span', 'asset-copy'); copy.append(element('span', 'asset-name', item.title), element('span', 'asset-meta', [item.category, item.angle].filter(Boolean).join(' · ')));
    if(item.tags?.length){const tags=element('span','asset-tags');for(const tag of item.tags)tags.append(element('span','asset-tag',tag));copy.append(tags);}
    button.append(frame, copy); button.onclick = () => { if(librarySelecting()){const ids=librarySelection();setLibrarySelection(ids.includes(item.id)?ids.filter(id=>id!==item.id):[...ids,item.id]);return;}setSelected(kind, item.id); renderSelections(); renderGallery(); notice(); closePicker(); };
    gallery.append(button);
  });
}
function updateProvider() {
  document.querySelectorAll('[data-channel-summary]').forEach(el=>el.textContent=providerLabel(state.settings));
  $('#connection').textContent=`${providerLabel(state.settings)} · ${canGenerate()?'已配置':'请检查设置'}`;$('#connection').classList.toggle('ready',canGenerate());
  updateGenerate(); updateScene(); updateExtraction(); updateExpressionControls(); updateConversion(); remember();
}
function updateGenerate() {
  const api = provider() === 'api', ready = canGenerate();
  const saved = savedMatch();
  const animal=state.subjectType==='animal', config=subjectFor(state), sheetName=config.sheet;
  const sheet = $('#output-type').value === 'character-sheet', sheetMismatch = sheet && state.characters.length !== 1;
  $('#camera-settings').hidden = sheet;$('#prop-editor').hidden = sheet||state.subjectType!=='human';
  const shadow = projectedShadow(itemFor('background', state.selections.background)?.sceneLight, $('#cameraDirection').value, $('#cameraPitch').value, itemFor('pose', state.selections.pose)?.angle);
  $('#shadow-preview').hidden = sheet || !shadow || state.production === 'batch';
  $('#shadow-preview').textContent = shadow ? `当前机位的预计地面投影方向：${shadow}` : '';
  $('#shared-light-note').hidden = !usesSceneLighting(currentSettings());
  $('#output-type-help').textContent = sheetMismatch ? `${sheetName}每次制作 1 个角色，请选择单主体骨架。` : config.fantasy ? sheet?'同一角色的四视图、头部、体表与附肢细节、骨架姿态；各视图保持同一结构。建议方图。':'按每个角色的种族、固定结构和参考生成；不把非人肢体补成普通人体。' : animal ? sheet?'同一动物的四视图、头部、自然表情、体表花纹与姿势参考，合为一张资料图。建议方图。':'根据骨架、体表和头部生成单张动物画面，支持多只动物。' : sheet ? '四视图、头像表情、服装拆解、材质和骨架姿势参考，合为一张资料图。建议使用方图。' : '根据骨架、衣服和头像生成单张人物画面，支持多个角色。';
  const count = poseCount(itemFor('pose', state.selections.pose)), mismatch = sheetMismatch ? `${sheetName}每次制作 1 个角色，请选择单主体骨架。` : count && count !== state.characters.length ? `当前骨架为 ${count} 个主体，已配置 ${state.characters.length} 个角色，请重新选择骨架以同步人数。` : generationMismatch() || (!sheet && state.subjectType==='human'?scenePropIssue(state.sceneProps,state.characters):'');
  $('#generate-action').disabled = state.submitting || mismatch || (!saved && !ready);
  $('#generate-action').firstChild.textContent = state.submitting ? '正在加入队列 ' : saved ? '查看已有成图 ' : sheet ? `生成${sheetName} ` : `生成${config.image} `;
  $('#regenerate').hidden = !saved; $('#regenerate').disabled = state.submitting || mismatch || !ready;
  $('#generation-help').textContent = state.submitting ? '正在提交任务…' : mismatch || (saved ? '全部参考和出图参数完全相同，已有成图。查看不消耗额度；重新生成会再次调用模型。' : '当前配置没有已有成图。提交后进入队列，使用已保存的通道；尺寸与画质以实际结果为准。');
  $('#generate-action').hidden=state.production==='batch';$('#regenerate').hidden=state.production==='batch'||!saved;
  updateBatch();
  if(!ready&&!saved&&!mismatch)$('#generation-help').textContent='所选通道尚未就绪，请到设置检查出图连接。';
  state.previewJob = saved || null;
  $('#relight-result').hidden = !state.localRelight || !saved || !usesSceneLighting(saved);
  $('#relight-result').disabled = !ready;
  $('#empty-preview').hidden = !!saved; $('#result-image').hidden = !saved;
  const bg=state.selections.background,plate=$('#stage-backdrop'),stage=$('#preview-stage');
  const mode=bg?'image':$('#background').value;stage.dataset.background=mode;
  plate.hidden=!!saved||!bg;
  if(bg){const url=assetURL('background',bg,false);if(plate.getAttribute('src')!==url)plate.src=url;}else plate.removeAttribute('src');
  $('#result-actions').hidden = !saved || state.generationBusy; $('#zoom-result').disabled = !saved || state.generationBusy;
  if (saved) {
    if ($('#result-image').getAttribute('src') !== saved.imageURL) $('#result-image').src = saved.imageURL;
    $('#download').href = `${saved.imageURL}?download=1`;
    $('#result-caption').textContent = `${settingsSummary(saved)} · ${new Date(saved.createdAt).toLocaleString('zh-CN', { hour12:false })}`;
  } else {
    $('#result-image').removeAttribute('src'); $('#download').removeAttribute('href'); $('#result-caption').textContent = '';
    $('#empty-preview h3').textContent = bg?'图片背景预览':'当前画面的参考';
    $('#empty-preview p').textContent = bg?'人物会在生成时融入所选背景。':'生成后可在这里查看成图。';
  }
}
function renderJob(job) {
  if(job.outputType==='resource-conversion'){state.conversionJob=job;updateConversion();rememberConversion();return;}
  if (isSceneJob(job)) { state.sceneJob=job; setBusy('scene',['queued','running'].includes(job.status)); if(['failed','interrupted','cancelled'].includes(job.status))notice(job.message); return; }
  if(job.batchId || !['image','character-sheet'].includes(outputTypeFor(job)))return;
  const index=state.jobs.findIndex(item=>item.id===job.id);if(index<0)state.jobs.unshift(job);else state.jobs[index]=job;
  if(state.business==='batch'||(outputTypeFor(job)==='character-sheet')!==(state.business==='sheets'))return;
  state.currentJob = job;
  const running = ['queued','running'].includes(job.status);
  setBusy('generation', running); $('#working').hidden = !running; $('#working-text').textContent = job.message;$('#cancel').textContent=job.status==='queued'?'取消排队':'停止等待';
  if (running) { $('#result-actions').hidden = true; $('#zoom-result').disabled = true; notice(); }
  if (['failed','interrupted','cancelled'].includes(job.status)) notice(job.message);
  updateGenerate();
}
async function poll(id) {
  clearTimeout(pollTimers.get(id));pollTimers.delete(id);
  try {
    const job = await request(`/api/jobs/${id}`); renderJob(job);
    if (['queued','running'].includes(job.status)) pollTimers.set(id,setTimeout(() => poll(id), 2000));
    else { if(localStorage.getItem('character-studio-pending')===id)localStorage.removeItem('character-studio-pending'); await loadHistory(); }
  } catch (error) { notice(`暂时无法读取任务进度：${error.message}。正在重连，不会重新提交生成。`); pollTimers.set(id,setTimeout(() => poll(id), 5000)); }
}
async function loadHistory() {
  state.jobs = await request('/api/jobs');
  $('#history-count').textContent = state.jobs.filter(job => job.status === 'completed' && job.imageURL).length;
  renderHistory(); updateGenerate(); updateScene(); updateConversion();
}
function renderHistory() {
  const list = $('#history-list'); list.replaceChildren();
  const jobs = state.jobs.filter(job => matchesHistory(job, { subjectType:$('#history-subject').value, query: $('#history-search').value, from: $('#history-from').value, to: $('#history-to').value, provider: $('#history-provider').value, status: $('#history-filter').value, outputType: $('#history-type').value, style: $('#history-style').value, effect:$('#history-effect').value, people: $('#history-people').value, size: $('#history-size').value, cameraDirection:$('#history-cameraDirection').value, cameraPitch:$('#history-cameraPitch').value, shotSize:$('#history-shotSize').value }));
  $('#history-matches').textContent = `找到 ${jobs.length} 条记录`;
  if (!jobs.length) list.append(element('p', 'empty-library', '没有匹配的记录。可以清除查询，或切换到全部任务查看生成状态。'));
  const labels = { completed:'已完成', failed:'生成失败', interrupted:'已中断', cancelled:'已停止', queued:'准备中', running:'生成中' };
  jobs.forEach(job => {
    const row = element('div', 'history-row');
    const completed = job.status === 'completed' && job.imageURL;
    const date = new Date(job.createdAt).toLocaleString('zh-CN', { hour12:false });
    const imageURL=job.imageURL || (job.selections?.pose ? assetURL('pose',job.selections.pose) : job.sourceId ? assetURL('source',job.sourceId) : '');
    const img = imageURL ? element('img') : element('div','history-placeholder',outputLabel(job));
    if(imageURL){img.src=imageURL;img.alt=completed?'已保存成图':'任务参考';img.loading='lazy';}
    const actions = element('div', 'history-actions');
    if (completed) {
      const view = () => showImage(job.imageURL, `已保存成图 · ${date}`);
      const thumbnail = element('button', 'history-thumbnail'); thumbnail.type = 'button'; thumbnail.setAttribute('aria-label', `查看成图 ${date}`); thumbnail.append(img); thumbnail.onclick = view; row.append(thumbnail);
      const viewButton = element('button', 'secondary', '查看成图'); viewButton.type = 'button'; viewButton.onclick = view;
      const download = element('a', 'secondary', '下载图片'); download.href = `${job.imageURL}?download=1`; download.download = '';
      actions.append(viewButton,download);
      if(job.outputType==='scene-relight'){
        const original=element('button','secondary','对照原图');original.type='button';original.onclick=()=>showImage(`/api/jobs/${job.sourceJobId}/image`,'校正前的原图');actions.append(original);
      }else if(state.localRelight && usesSceneLighting(job)){
        const fix=element('button','secondary','校正现场光');fix.type='button';fix.title='锁定原图；首次校正会调用一次已设置的出图通道';fix.disabled=!canGenerate();fix.onclick=()=>submitRelight(job,fix);actions.append(fix);
      }
    } else row.append(img);
    const copy = element('div'); copy.append(element('p', 'history-title', `${job.title || outputLabel(job)} · ${labels[job.status]} · ${providerLabel(job)}`), element('p', '', date), element('p', ['failed','interrupted'].includes(job.status) ? 'history-error' : '', job.message));
    copy.append(element('p', 'muted', settingsSummary(job)));
    if (job.prompt) copy.append(element('p', 'history-prompt', job.prompt));
    if (completed) copy.append(element('p', 'history-path', `data/jobs/${job.id}/${job.output}`));
    row.append(copy);
    const action = element('button', 'secondary', job.outputType==='expression'?'查看整套表情':'复用设置'); action.type = 'button';
    action.onclick = () => {
      if(job.outputType==='resource-conversion'){openConversionJob(job);switchPage('resources');return;}
      if(job.outputType==='expression'){openExpressionGroup(job.sourceFaceId);return;}
      if(isSceneJob(job)){openSceneJob(job);switchPage('resources');return;}
      switchPage(outputTypeFor(job)==='character-sheet'?'sheets':'generate');
      for (const ref of job.references || []) if (ref.id.startsWith('upload-') && !state.uploads.some(x => x.id === ref.id)) state.uploads.push(ref);
      state.subjectType=subjectTypeFor(job);refreshCategoryUI();
      state.selections = { ...job.selections };state.sceneProps=structuredClone(job.sceneProps||[]);
      state.characters = charactersFor(job).map(character => ({...faceRole(character,itemFor('face',character.face))})); state.activeCharacter = 0;
      ['prompt','style','background','size','quality'].forEach(key => $(`#${key}`).value = job[key]);
      syncEffectOptions('', job.effect || 'none');
      $('#output-type').value = outputTypeFor(job);
      restoreCamera(job);
      updateProvider();
      renderSelections(); switchKind('pose');
      $('.recipe').scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    if (job.outputType!=='scene-relight' && ['quota','api','comfyui'].includes(job.provider)) actions.append(action);
    if((isSceneJob(job)||job.outputType==='resource-conversion')&&completed){const review=element('button','secondary','审核入库');review.type='button';review.onclick=()=>{if(job.outputType==='resource-conversion')openConversionJob(job);else openSceneJob(job);switchPage('resources');};actions.append(review);}
    row.append(actions); list.append(row);
  });
}

async function submitRelight(job,button) {
  button.disabled=true;
  try {
    const result=await request('/api/jobs',{method:'POST',headers:{'Content-Type':'application/json','Idempotency-Key':crypto.randomUUID()},body:JSON.stringify({outputType:'scene-relight',sourceJobId:job.id})});
    if(result.status==='completed'){showImage(result.imageURL,'现场光校正');return;}
    switchPage('queue');
  }catch(error){notice(error.message);}finally{button.disabled=false;}
}

function restoreCamera(options = {}) {
  $('#cameraDirection').value = Object.hasOwn(CAMERA_DIRECTIONS, options.cameraDirection) ? options.cameraDirection : 'reference';
  $('#cameraPitch').value = Object.hasOwn(CAMERA_PITCHES, options.cameraPitch) ? options.cameraPitch : 'reference';
  $('#shotSize').value = Object.hasOwn(SHOT_SIZES, options.shotSize) ? options.shotSize : 'full';
}

function initEffects() {
  for(const id of ['style','scene-style','history-style']) {
    const select=$(`#${id}`);select.replaceChildren();
    if(id==='history-style')select.append(new Option('全部画风',''),new Option('沿用参考画风','reference'));
    for(const group of [...new Set(STYLE_OPTIONS.map(style=>style.group))]) {
      const options=element('optgroup');options.label=group;
      for(const style of STYLE_OPTIONS.filter(style=>style.group===group))options.append(new Option(style.label,style.id));
      select.append(options);
    }
  }
  for(const prefix of ['','scene-','history-'])syncEffectOptions(prefix);
  for (const [value, label] of Object.entries(SCENE_LIGHTS)) $('#scene-light').append(new Option(label, value));
  for (const [field, choices] of [['cameraDirection', CAMERA_DIRECTIONS], ['cameraPitch', CAMERA_PITCHES], ['shotSize', SHOT_SIZES]]) {
    for (const prefix of ['', 'history-']) for (const [value, label] of Object.entries(choices)) {
      $(`#${prefix}${field}`).append(new Option(label, value));
    }
  }
}
function syncEffectOptions(prefix, selected = $(`#${prefix}effect`).value) {
  const select=$(`#${prefix}effect`), style=$(`#${prefix}style`).value, history=prefix==='history-';
  select.replaceChildren();
  if(history)select.append(new Option('全部方案',''));
  select.append(new Option('通用方案（使用所选画风）','none'));
  const seen=new Set();
  for(const parent of STYLE_OPTIONS) {
    if(parent.id!==style && !(history && !style))continue;
    const effects=effectsFor(parent.id).filter(effect=>!seen.has(effect.id));if(!effects.length)continue;
    const groups=new Map();
    for(const effect of effects){
      const label=history && !style ? parent.label : effect.creatorType==='manga-artist' ? '漫画家研究方案 · 80 位' : effect.creatorType==='illustrator' ? '日系插画师研究方案 · 20 位' : '已有蒸馏方案';
      if(!groups.has(label)){const group=element('optgroup');group.label=label;select.append(group);groups.set(label,group);}
      groups.get(label).append(new Option(effectLabel(effect),effect.id));
      seen.add(effect.id);
    }
  }
  select.value=[...select.options].some(option=>option.value===selected) ? selected : history ? '' : 'none';
  if(!history)renderEffectDetail(prefix);
}
function renderEffectDetail(prefix) {
  const effect=effectFor($(`#${prefix}effect`).value), detail=$(`#${prefix}effect-detail`);detail.replaceChildren();
  if(!effect){detail.textContent=`使用「${STYLE_OPTIONS.find(style=>style.id===$(`#${prefix}style`).value)?.label}」的通用方案，也可选择此类型下的具体风格。`;return;}
  if(effect.display)detail.append(document.createTextNode(`代表作${effect.creatorType==='illustrator'?'／项目':''}：《${effect.display.work}》${effect.display.credit ? `（${effect.display.credit}）` : ''} · 类型：${effect.display.genre}`),element('br'));
  detail.append(document.createTextNode(`${effect.focus ? `参考阶段：《${effect.focus.work}》（${effect.focus.year ? `${effect.focus.year}，出版／发布年` : '年份未核定'}）。` : ''}${effect.description} 来源：`));
  const link=element('a','',effect.source.name);link.href=effect.source.url;link.target='_blank';link.rel='noreferrer';detail.append(link);
}
function sceneSettings() {
  return {...Object.fromEntries(['title','prompt','style','effect','size','quality'].map(key=>[key,$(`#scene-${key}`).value])),title:$('#scene-title').value.trim(),outputType:state.sceneKind,sourceId:state.sceneSourceId,background:state.sceneKind==='foreground'?'transparent':'opaque',...(state.sceneKind==='background'?{sceneLight:$('#scene-light').value}:{}),styleRevision:STYLE_REVISIONS[$('#scene-style').value],effectRevision:effectFor($('#scene-effect').value)?.revision || 0,...connectionSettings(),selections:{},characters:[]};
}
function rememberScene() {try{localStorage.setItem('character-studio-scene-v1',JSON.stringify(sceneSettings()));}catch{/* Draft storage is optional. */}}
function conversionInput() {return {outputType:'resource-conversion',sourceKind:$('#conversion-kind').value,sourceAssetId:state.conversionSourceId,prompt:$('#conversion-prompt').value.trim()};}
function rememberConversion() {try{localStorage.setItem('character-studio-conversion-v1',JSON.stringify({...conversionInput(),jobId:state.conversionJob?.id}));}catch{}}
function renderConversionPicker() {
  state.conversionError='';
  const kind=$('#conversion-kind').value,query=$('#conversion-search').value.trim().toLowerCase();
  const all=[...new Map([...(state.catalogs[kind]||[]),...state.uploads.filter(item=>item.kind===kind)].map(item=>[item.id,item])).values()].filter(item=>!item.expression || item.id===state.conversionSourceId);
  if(!all.some(item=>item.id===state.conversionSourceId))state.conversionSourceId=all.some(item=>item.id===selectedID(kind))?selectedID(kind):all.find(item=>!item.superseded)?.id||'';
  const items=all.filter(item=>item.id===state.conversionSourceId||(!item.superseded&&[item.title,item.id,item.species,...(item.tags||[])].join(' ').toLowerCase().includes(query)));
  $('#conversion-source').replaceChildren(new Option('请选择原资源',''),...items.map(item=>new Option(`${item.title} · ${item.id}`,item.id)));$('#conversion-source').value=state.conversionSourceId;
  $('#conversion-reference').hidden=!state.conversionSourceId;if(state.conversionSourceId)$('#conversion-reference').src=assetURL(kind,state.conversionSourceId,false);
  updateConversion();
}
function conversionMatches(job,connection=true) {return job?.outputType==='resource-conversion'&&settingsKey(job)===settingsKey({...job,...conversionInput(),...(connection?{...connectionSettings(),conversionRevision:CONVERSION_REVISION}:{})});}
function updateConversion() {
  const current=conversionMatches(state.conversionJob,false)?state.conversionJob:null;
  const candidates=[current,...state.jobs.filter(job=>conversionMatches(job))].filter(Boolean);
  const saved=candidates.find(job=>job.status==='completed'&&job.imageURL),waiting=candidates.find(job=>['queued','running'].includes(job.status));
  state.conversionPreview=saved||null;state.conversionWaiting=waiting||null;
  const busy=state.conversionSubmitting||state.conversionImporting,valid=!!state.conversionSourceId;
  for(const id of ['kind','source','search','prompt'])$(`#conversion-${id}`).disabled=busy;
  $('#conversion-current').disabled=busy||!selectedID($('#conversion-kind').value);
  $('#conversion-start').disabled=busy||!valid||!!waiting||!canGenerate();$('#conversion-start').textContent=state.conversionSubmitting?'正在加入队列…':waiting?'资源正在制作…':saved&&conversionMatches(saved)?'复用已有写实资源':'制作写实资源';
  $('#conversion-regenerate').hidden=!saved||!conversionMatches(saved);$('#conversion-regenerate').disabled=busy||!!waiting||!canGenerate();
  $('#conversion-format').textContent=$('#conversion-kind').value==='face'?'头像使用浅灰底方图。移除帽子、发饰等可拆卸装饰，补全遮挡处，保留原有表情、发型、耳形与天然的角。':'衣服使用竖图、纯白背景、标准画质；制作衣装与头饰静物，头饰单独摆放，保留款式、配色和纹样。';
  $('#conversion-status').textContent=state.conversionError||current?.message||waiting?.message||(saved?'已加载上次转绘结果。提交时会核对原图内容，只有配置完全相同才复用。':'选择原资源，制作写实版本。');
  $('#conversion-cancel').hidden=waiting?.status!=='queued';$('#conversion-cancel').disabled=busy;
  $('#conversion-result').hidden=!saved;$('#conversion-empty').hidden=!!saved;$('#conversion-actions').hidden=!saved;
  const imported=saved&&state.catalogs[saved.sourceKind]?.find(item=>item.sourceJobId===saved.id);
  $('#conversion-import').disabled=busy||!saved||!!imported;$('#conversion-use').hidden=!imported;
  $('#conversion-import-status').textContent=imported?'已作为新资源入库，带有“写实化”标签。原资源已保留。':'';
  if(saved){$('#conversion-result').src=saved.imageURL;$('#conversion-download').href=`${saved.imageURL}?download=1`;if($('#conversion-title').dataset.jobId!==saved.id){$('#conversion-title').dataset.jobId=saved.id;$('#conversion-title').value=saved.title;}}
  else{$('#conversion-result').removeAttribute('src');$('#conversion-download').removeAttribute('href');}
}
function openConversionJob(job) {
  state.conversionJob=job;state.conversionSourceId=job.sourceAssetId;$('#conversion-kind').value=job.sourceKind;$('#conversion-search').value='';$('#conversion-prompt').value=job.prompt;
  setResourceMode('conversion');rememberConversion();
}
async function submitConversion(event) {
  event.preventDefault();if(state.conversionSubmitting||state.conversionImporting||state.conversionWaiting||!state.conversionSourceId||!canGenerate())return;
  const id=crypto.randomUUID(),payload={...conversionInput(),regenerate:event.submitter?.id==='conversion-regenerate'};
  state.conversionError='';state.conversionSubmitting=true;updateConversion();
  try{
    const job=await request('/api/jobs',{method:'POST',headers:{'Content-Type':'application/json','Idempotency-Key':id},body:JSON.stringify(payload)});
    state.conversionJob=job;rememberConversion();await loadHistory();await loadQueue();
  }catch(error){
    try{const job=await request(`/api/jobs/${id}`);state.conversionJob=job;rememberConversion();await loadQueue();}catch{}
    state.conversionError=error.message;
  }finally{state.conversionSubmitting=false;updateConversion();}
}
function openExpressionGroup(faceId) {
  state.expressionFaceId=faceId;$('#expression-search').value='';setResourceMode('expressions');switchPage('resources');
}
function renderExpressionPicker() {
  const query=$('#expression-search').value.trim().toLowerCase();
  const all=[...new Map([...state.uploads.filter(item=>item.kind==='face'),...(state.catalogs.face||[])].map(item=>[item.id,item])).values()];
  const counts=new Map(),owners=new Set(state.jobs.filter(job=>job.outputType==='expression').map(job=>job.sourceFaceId));
  for(const item of all)if(item.expression&&!item.superseded){
    const id=item.expression.sourceFaceId;owners.add(id);counts.set(id,(counts.get(id)||0)+1);
  }
  const sources=all.filter(item=>!item.expression || owners.has(item.id)).sort((a,b)=>(counts.get(b.id)||0)-(counts.get(a.id)||0));
  const original=id=>{const face=all.find(item=>item.id===id);return face && (owners.has(id)?id:face.expression?.sourceFaceId||id);};
  const selected=original(selectedID('face'));
  state.expressionFaceId=original(state.expressionFaceId)||(counts.has(selected)?selected:sources.find(item=>counts.has(item.id))?.id)||selected||sources[0]?.id||'';
  const items=sources.filter(item=>item.id===state.expressionFaceId||[item.title,item.id,item.species,...(item.tags||[])].join(' ').toLowerCase().includes(query));
  $('#expression-face').replaceChildren(new Option('请选择头像',''),...items.map(item=>new Option(`${item.title} · ${item.id}${counts.has(item.id)?' · 已有 '+counts.get(item.id)+' 种表情':''}`,item.id)));$('#expression-face').value=state.expressionFaceId;
  $('#expression-source').hidden=!state.expressionFaceId;if(state.expressionFaceId)$('#expression-source').src=assetURL('face',state.expressionFaceId,false);
  if(state.expressionFaceId&&state.csrf)try{localStorage.setItem('character-studio-expression-face',state.expressionFaceId);}catch{}
  updateExpressionControls();
}
function expressionViewKey() {return state.expressionFaceId;}
function updateExpressionControls() {
  const ready=state.expressionLoadedKey===expressionViewKey(),items=state.expressionItems||[];
  const running=items.some(item=>['queued','running'].includes(item.job?.status));
  const missing=EXPRESSIONS.length-items.filter(item=>item.saved).length,replacing=state.expressionReplaceIds.length;
  $('#expression-start').disabled=!state.expressionFaceId||!ready||state.expressionSubmitting||!!state.expressionLoading||running||!canGenerate()||(!missing&&!replacing);
  $('#expression-face').disabled=state.expressionSubmitting;$('#expression-current').disabled=state.expressionSubmitting||!selectedID('face');
  document.querySelectorAll('[data-expression-replace]').forEach(input=>{const item=items.find(item=>item.id===input.dataset.expressionReplace);input.disabled=!ready||state.expressionSubmitting||!!state.expressionLoading||!item?.saved||['queued','running'].includes(item.job?.status);input.checked=state.expressionReplaceIds.includes(input.dataset.expressionReplace);});
  $('#expression-start').textContent=state.expressionSubmitting?'正在加入队列…':!ready?'正在加载已有表情…':running?'表情正在制作…':replacing?(missing?`补齐 ${missing} 种 + 重抽 ${replacing} 种表情`:`重抽 ${replacing} 种表情`):missing?(missing===EXPRESSIONS.length?'制作全套 12 种表情':`补齐 ${missing} 种表情`):'表情已齐全，请勾选重抽';
}
function renderExpressions() {
  const items=state.expressionItems||[],list=$('#expression-results');list.replaceChildren();
  const labels={queued:'等待中',running:'制作中',completed:'已保存',failed:'失败',cancelled:'已取消',interrupted:'已中断'};
  for(const expression of EXPRESSIONS){
    const item=items.find(item=>item.id===expression.id),job=item?.job,saved=item?.saved;
    const card=element('article','expression-card');card.append(element('h3','',expression.label));
    if(saved?.imageURL){const button=element('button','expression-image');button.type='button';button.setAttribute('aria-label',`查看${expression.label}头像`);const img=element('img');img.src=saved.imageURL;img.alt=expression.label;button.append(img);button.onclick=()=>showImage(saved.imageURL,expression.label);card.append(button);const download=element('a','text-button','下载');download.href=`${saved.imageURL}?download=1`;download.download='';card.append(download);}
    else card.append(element('div','expression-placeholder',state.expressionLoadedKey!==expressionViewKey()?'等待加载':job?labels[job.status]:'待制作'));
    card.append(element('p','muted',job?`${labels[job.status]}${saved&&saved.id!==job.id?' · 旧版本保留':''}`:'待制作'));
    if(job&&['failed','interrupted','cancelled'].includes(job.status))card.append(element('p','history-error',job.message));
    const label=element('label','check-label expression-reroll'),checkbox=element('input');checkbox.type='checkbox';checkbox.dataset.expressionReplace=expression.id;checkbox.setAttribute('aria-label',`重抽${expression.label}`);
    checkbox.onchange=()=>{state.expressionReplaceIds=state.expressionReplaceIds.filter(id=>id!==expression.id);if(checkbox.checked)state.expressionReplaceIds.push(expression.id);updateExpressionControls();};
    label.append(checkbox,document.createTextNode('重抽此表情'));card.append(label);
    list.append(card);
  }
  const completed=items.filter(item=>item.saved).length,running=items.filter(item=>['queued','running'].includes(item.job?.status)).length;
  $('#expression-summary').textContent=state.expressionLoadedKey!==expressionViewKey()?'正在加载已有表情，完成后可制作或勾选重抽。':`已有 ${completed} / ${EXPRESSIONS.length} 种表情${running?` · ${running} 项正在排队或制作`:''} · 自动标签：表情 + 对应表情名称`;
  updateExpressionControls();
}
async function loadExpressions() {
  if(!state.csrf||!state.expressionFaceId)return;
  const key=expressionViewKey();if(state.expressionLoading?.key===key)return;
  const loading={key},faceId=state.expressionFaceId;state.expressionLoading=loading;
  if(state.expressionLoadedKey!==key){state.expressionItems=[];state.expressionReplaceIds=[];renderExpressions();}
  updateExpressionControls();
  try{
    const data=await request(`/api/expression-sets?faceId=${encodeURIComponent(faceId)}`);if(state.expressionLoading!==loading||key!==expressionViewKey())return;
    const changed=state.expressionLoadedKey!==key||JSON.stringify(data.items.map(item=>[item.job?.id,item.job?.status,item.saved?.resourceId]))!==JSON.stringify((state.expressionItems||[]).map(item=>[item.job?.id,item.job?.status,item.saved?.resourceId]));
    state.expressionItems=data.items;state.expressionLoadedKey=key;
    if(changed){renderExpressions();const boot=await request('/api/bootstrap');if(state.expressionLoading!==loading||key!==expressionViewKey())return;state.catalogs=boot.catalogs;refreshCategoryUI();renderExpressionPicker();renderCharacterExpression();renderGallery();await loadHistory();}
  }catch(error){
    if(state.expressionLoading!==loading||key!==expressionViewKey())return;
    state.expressionLoadedKey='';$('#expression-summary').textContent='已有表情加载失败，请刷新状态后再制作。';throw error;
  }finally{if(state.expressionLoading===loading){state.expressionLoading=false;updateExpressionControls();}}
}
function setResourceMode(mode) {
  state.resourceMode=mode;
  if(state.csrf)try{localStorage.setItem('character-studio-resource-mode',mode);}catch{}
  const scene=sceneKinds.includes(mode);
  if(scene)state.sceneKind=mode;
  document.querySelectorAll('[data-resource-mode]').forEach(button=>button.setAttribute('aria-pressed',button.dataset.resourceMode===mode));
  const extraction=mode==='extraction'||mode==='artwork';
  $('#extraction-panel').hidden=!extraction;$('#scene-panel').hidden=!scene;$('#conversion-panel').hidden=mode!=='conversion';$('#expression-panel').hidden=mode!=='expressions';$('#resource-mode-label').textContent=scene?OUTPUT_TYPES[mode]:mode==='expressions'?'表情头像组':mode==='conversion'?'单件资源转绘':mode==='artwork'?'原画真人化':'照片拆解';
  if(extraction){
    $('#artwork-form').hidden=mode!=='artwork';$('#extract-form').hidden=mode==='artwork';
    $('#extract-records-heading').textContent=mode==='artwork'?'原画真人化记录':'拆解记录';
    if(extractView!==mode){
      extractionViews[extractView]=state.extraction;clearTimeout(extractionTimer);extractView=mode;
      const selected=Object.hasOwn(extractionViews,mode)?extractionViews[mode]:state.extractions.find(job=>viewForExtraction(job)===mode);
      if(selected){openExtraction(selected);if(['queued','running'].includes(selected.status))void pollExtraction(selected.id);}
      else renderExtraction(null);
    }
    renderExtractionHistory();
  }
  if(mode==='conversion'){renderConversionPicker();updateConversion();}
  if(mode==='expressions'){renderExpressionPicker();renderExpressions();void loadExpressions().catch(error=>$('#expression-status').textContent=error.message);}
  updateScene();
}
function updateScene() {
  $('#scene-light-field').hidden = state.sceneKind !== 'background';
  const settings=sceneSettings(), api=settings.provider==='api', saved=savedMatches(state.sceneJob?[...state.jobs,state.sceneJob]:state.jobs,settings).find(job=>job.imageURL);
  const current=state.sceneJob&&settingsKey(state.sceneJob)===settingsKey(settings)?state.sceneJob:null;
  const valid=!!settings.title&&(!!settings.prompt.trim()||!!settings.sourceId),ready=canGenerate();
  state.scenePreview=saved || null;
  $('#scene-form').querySelectorAll('input,textarea,select').forEach(input=>input.disabled=state.submitting);
  $('#scene-source').disabled=state.submitting||state.sceneUploading;
  $('#scene-source-clear').disabled=state.submitting||state.sceneUploading;
  document.querySelectorAll('[data-resource-mode]').forEach(button=>button.disabled=state.submitting);
  $('#scene-source-wrap').hidden=!state.sceneSourceId;
  if(state.sceneSourceId)$('#scene-source-preview').src=assetURL('source',state.sceneSourceId,false);
  $('#scene-start').disabled=state.submitting||state.sceneUploading||!valid||(!saved&&!ready);
  $('#scene-start').textContent=state.submitting?'正在加入队列':saved?'查看已有资源':`生成${shortNames[state.sceneKind]}资源`;
  $('#scene-regenerate').hidden=!saved;$('#scene-regenerate').disabled=state.submitting||!ready;
  $('#scene-format').textContent=state.sceneKind==='foreground'?'前景默认请求透明底 PNG，作为人物前方的近景元素。透明效果需预览确认。':'背景生成为完整的不透明场景，放在人物后方。';
  $('#scene-help').textContent=state.submitting?'正在提交…':!valid?'填写资源名称，并提供文字描述或参考图片。':saved?'相同参数已有资源。查看与入库不消耗额度；重新制作会再次调用模型。':!ready?'请到设置检查出图通道。':'每次制作一张图片，使用已保存的通道。完成后先审核，再加入资料库。';
  $('#scene-status').textContent=current?.message || (saved?'已找到相同参数的已保存资源。':'填写描述或上传参考图片，开始制作。');
  $('#scene-cancel').hidden=!state.sceneBusy;$('#scene-cancel').textContent=state.sceneJob?.status==='queued'?'取消排队':'停止等待';
  $('#scene-result').hidden=!saved;$('#scene-empty').hidden=!!saved;$('#scene-actions').hidden=!saved;
  $('#scene-import').disabled=state.sceneBusy;
  if(saved){$('#scene-result').src=saved.imageURL;$('#scene-download').href=`${saved.imageURL}?download=1`;$('#scene-caption').textContent=settingsSummary(saved);}
  else{$('#scene-result').removeAttribute('src');$('#scene-download').removeAttribute('href');$('#scene-caption').textContent='';}
  if(!ready&&!saved)$('#scene-help').textContent='请到设置检查出图通道。';
  const imported=saved&&state.catalogs[state.sceneKind]?.find(item=>item.sourceJobId===saved.id);
  $('#scene-use').hidden=!imported;
  $('#scene-import-status').textContent=imported?'已加入资料库，可用于生成图片。':'';
}
function openSceneJob(job) {
  state.sceneSourceId=job.sourceId||'';state.sceneKind=job.outputType;state.sceneJob=job;
  if (job.outputType === 'background') $('#scene-light').value = job.sceneLight ?? 'auto';
  for(const key of ['title','prompt','style','size','quality'])$(`#scene-${key}`).value=job[key] ?? '';
  syncEffectOptions('scene-', job.effect || 'none');
$('#scene-source').value='';setResourceMode(job.outputType);rememberScene();
}
async function submitScene(event) {
  event.preventDefault();if(state.submitting||state.sceneUploading)return;
  const payload={...sceneSettings(),regenerate:event.submitter?.id==='scene-regenerate'};
  const saved=savedMatches(state.jobs,payload).find(job=>job.imageURL);
  if(saved&&!payload.regenerate){openSceneJob(saved);return;}
  const id=crypto.randomUUID();state.submitting=true;setBusy('scene',true);notice();
  try{
    localStorage.setItem('character-studio-pending',id);
    const job=await request('/api/jobs',{method:'POST',headers:{'Content-Type':'application/json','Idempotency-Key':id},body:JSON.stringify(payload)});
    openSceneJob(job);renderJob(job);await loadHistory();
    if(['queued','running'].includes(job.status))poll(job.id);else localStorage.removeItem('character-studio-pending');
  }catch(error){
    setBusy('scene',false);notice(error.message);$('#scene-status').textContent=error.message;
    try{const job=await request(`/api/jobs/${id}`);openSceneJob(job);renderJob(job);if(['queued','running'].includes(job.status))poll(id);}catch{localStorage.removeItem('character-studio-pending');}
  }finally{state.submitting=false;updateProvider();void loadQueue().catch(error=>notice(error.message));}
}

function renderExtractionType() {
  const job={subjectType:$('#extract-subject-type').value}, animal=job.subjectType==='animal', config=subjectFor(job);
  document.querySelectorAll('input[name="extract-kind"]').forEach(input=>{input.closest('label').hidden=!resourceKindsFor(job).includes(input.value);if(input.closest('label').hidden)input.checked=false;});
  $('#extract-pose-help').textContent=config.fantasy?'依据图片与身体结构设定制作骨架，遮挡补全只能在既定结构内进行。需审核附肢数量、连接及融合边界。':animal?'动物骨架按物种的实际身体结构绘制。遮挡补全需要人工审核，不强套人体或四足模板。':'骨架沿用现有图库的画法。遮挡部位只能根据照片推测，结果需要你审核。';
  $('#extract-face-label').textContent=config.names.face;$('#extract-surface-label').textContent=config.fantasy?'体表与附肢':'体表（皮毛／羽毛／鳞片）';
  $('#extract-subject-help').textContent=config.fantasy?`制作${config.label}资源。填写种族与固定身体结构，保留天然附肢和融合部位。无固定结构的外神暂不纳入。`:animal?'按物种制作姿态骨架、头部与活体体表参考。体表包含皮毛、羽毛、鳞片等外观，不是服装。':'人物资源分为骨架、衣服、头像，衣服允许反串。';
  $('#extract-kinds-help').textContent=`只制作勾选项。多个角色共用一张整体骨架，每个角色分别制作${config.kinds.filter(kind=>kind!=='pose').map(kind=>config.names[kind]).join('、')}。`;
  [...$('#extract-person-count').options].forEach(option=>option.textContent=`${option.value} ${config.fantasy?'个':animal?'只':'人'}`);
  $('#extract-prompt').placeholder=config.fantasy?'例如：保留羽翼的金色末端和尾部花纹；结构数量与连接填写在身体结构设定中':animal?'例如：保留尾部斑纹和耳尖毛色，物种可填猫，品种细节写在这里':'例如：保留衣装刺绣和头饰的花纹细节';
  $('#import-gender').closest('label').hidden=!config.hasGender;$('#import-costume-gender').closest('label').hidden=!config.kinds.includes('costume');
}
function changeExtractionType() {
  const appearance=[...document.querySelectorAll('input[name="extract-kind"]:checked')].some(input=>['costume','surface'].includes(input.value));
  document.querySelectorAll('input[name="extract-kind"]').forEach(input=>{if(['costume','surface'].includes(input.value))input.checked=appearance;});
  state.subjects=[{gender:'reference',species:'',anatomy:'',position:''}];renderExtractionType();renderSubjects();renderExtraction(null);
}
function renderSubjects() {
  $('#extract-person-count').value = state.subjects.length;
  const container = $('#extract-subjects'); container.replaceChildren();
  state.subjects.forEach((subject, index) => {
    const row = element('div', 'subject-row'); row.append(element('h3', '', `角色 ${index + 1}`));
    const genderLabel = element('label', 'field', '骨架与头像类型'), gender = element('select');
    [['reference','依照原图'],['male','男性'],['female','女性']].forEach(([value,text]) => gender.append(new Option(text,value))); gender.value = subject.gender;
    gender.setAttribute('aria-label', `拆解角色 ${index + 1} 类型`); gender.onchange = () => { subject.gender = gender.value; };
    const positionLabel = element('label', 'field', '照片中的位置'), position = element('input'); position.value = subject.position; position.maxLength = 120; position.placeholder = state.subjects.length > 1 ? '例如：右侧戴帽子的人物' : '单人可留空'; position.required = state.subjects.length > 1; position.setAttribute('aria-label', `拆解角色 ${index + 1} 位置`); position.oninput = () => { subject.position = position.value; updateExtraction(); };
    const config=SUBJECT_TYPES[$('#extract-subject-type').value];
    if(config.hasSpecies){const label=element('label','field',config.fantasy?'种族／物种':'动物物种'),input=element('input');input.value=subject.species || '';input.required=true;input.maxLength=80;input.placeholder=config.speciesExample;input.setAttribute('aria-label',`拆解角色 ${index+1} 物种`);input.oninput=()=>{subject.species=input.value;updateExtraction();};label.append(input);row.append(label);position.placeholder=state.subjects.length>1?'例如：画面左侧的角色':'单个角色可留空';}
    if(config.hasGender){genderLabel.append(gender);row.append(genderLabel);}
    if(config.fantasy){const label=element('label','field','身体结构设定'),input=element('textarea');input.value=subject.anatomy || '';input.required=true;input.maxLength=600;input.rows=3;input.placeholder=config.anatomyExample;input.setAttribute('aria-label',`拆解角色 ${index+1} 身体结构设定`);input.oninput=()=>{subject.anatomy=input.value;updateExtraction();};label.append(input);row.append(label);}
    positionLabel.append(position);row.append(positionLabel);container.append(row);
  });
}
function extractionSelection() { return {subjectType:$('#extract-subject-type').value,subjects:state.subjects,resourceKinds:[...document.querySelectorAll('input[name="extract-kind"]:checked')].map(input=>input.value)}; }
function updateExtraction() {
  const api = provider() === 'api';
  const selection = extractionSelection(), count = extractionParts(selection).length;
  const config=subjectFor(selection), missing=state.subjects.some(role=>(config.hasSpecies&&!role.species?.trim())||(config.fantasy&&!role.anatomy?.trim())||(state.subjects.length>1&&!role.position?.trim()));
  $('#extract-start').disabled = !count || missing || !state.csrf || !state.sourceId || state.submitting || state.sourceUploading || !canGenerate();
  $('#extract-start').firstChild.textContent = state.submitting ? '正在加入队列 ' : count ? `拆解为 ${count} 项资源 ` : '请选择制作项目 ';
  $('#extract-form').querySelectorAll('input, textarea, select').forEach(input => input.disabled = state.submitting);
  $('#infer-hidden').disabled = state.submitting || !selection.resourceKinds.includes('pose');
  const summary = selection.resourceKinds.map(kind => `${kind === 'pose' ? 1 : state.subjects.length} 张${resourceName(kind, selection)}`).join(' + ');
  $('#extract-help').textContent = !count ? '请至少勾选一种要制作的资源。' : missing ? '请补齐每个角色的物种／种族、身体结构及多人位置等必填信息。' : !canGenerate() ? '请到设置检查出图通道。' : `${summary}，共出图 ${count} 次。未勾选的项目不会制作。`;
  $('#extract-resume').disabled = state.submitting;
  document.querySelectorAll('.extraction-history-open').forEach(button => button.disabled = state.submitting);
  const kinds=artworkKinds();
  $('#artwork-start').disabled=!artSource||!kinds.length||artUploading||state.submitting||!canGenerate();
  $('#artwork-file').disabled=artUploading||state.submitting;
  $('#artwork-help').textContent=!kinds.length?'请至少选择一项。':!canGenerate()?'请到设置检查出图通道。':`本次制作 ${kinds.length} 张，逐张保存。相同原画和制作配置可复用已有任务。`;
}

function renderExtraction(job) {
  const changed = state.extraction?.id !== job?.id;
  state.extraction = job;
  const artwork=extractView==='artwork';
  const parts = extractionParts(job || (artwork?{resourceKinds:artworkKinds()}:extractionSelection()));
  const outputs = job?.outputs || {}, running = ['queued', 'running'].includes(job?.status);
  const checked = Object.fromEntries([...document.querySelectorAll('[data-import-kind]')].map(input => [input.dataset.importKind, input.checked]));
  const cards = $('#extraction-results'); cards.replaceChildren();
  $('#extract-status').textContent = job?.message || (artwork?'选一张角色原画，点击「制作写实资源」。':'上传一张照片，开始制造你的第一组资源。');
  $('#extract-resume').textContent=artwork?'继续制作缺少的资源':'继续拆解未完成资源';
  $('#extraction-count').textContent = `${Object.keys(outputs).length} / ${parts.length} 已完成`;
  $('#extract-cancel').hidden = !running;$('#extract-cancel').textContent=job?.status==='queued'?'取消排队':'停止等待';
  $('#extract-resume').hidden = !job || running || job.status === 'completed';
  $('#import-controls').hidden = !Object.keys(outputs).length;
  $('#import-resources').disabled = running;
  if (changed || !job) { $('#import-title').value = job?.title || ''; $('#import-status').textContent = '勾选认可的资源后入库，不会再次出图。'; $('#use-resources').hidden = true; }
  for (const {key, title} of parts) {
    const card = element('article', 'extraction-card'), output = outputs[key];
    card.append(element('h3', '', artwork?'写实'+title:title));
    if (output) {
      const view = element('button', 'extraction-image'); view.type = 'button'; view.setAttribute('aria-label', `查看拆解${title}大图`);
      const img = element('img'); img.src = output.imageURL; img.alt = `${job.title} · ${title}`; view.append(img); view.onclick = () => showImage(output.imageURL, img.alt); card.append(view);
      const label = element('label', 'check-label'), checkbox = element('input'); checkbox.type = 'checkbox'; checkbox.dataset.importKind = key; checkbox.checked = changed ? true : checked[key] ?? true; checkbox.disabled = running;
      label.append(checkbox, document.createTextNode(`审核通过 · ${title}`));
      const download = element('a', 'secondary', '下载资源'); download.href = `${output.imageURL}?download=1`; download.download = '';
      card.append(label, download);
    } else card.append(element('div', 'extraction-placeholder', running && job.currentKind === key ? '正在制作…' : '等待制作'));
    cards.append(card);
  }
  setBusy('extraction', running);
}

function openExtraction(job) {
  const mode=viewForExtraction(job);
  extractionViews[mode]=job;
  if(mode!==extractView)return;
  if(mode==='artwork'){
    artSource=job.sourceId;$('#artwork-file').value='';$('#artwork-preview').src=`/api/extractions/${job.id}/image/source`;$('#artwork-preview').hidden=false;
    document.querySelectorAll('input[name="artwork-kind"]').forEach(input=>input.checked=job.resourceKinds.includes(input.value));
    renderExtraction(job);return;
  }
  state.sourceId = job.sourceId;
  $('#extract-subject-type').value=subjectTypeFor(job);renderExtractionType();
  state.subjects = subjectsFor(job).map(subject => ({...subject})); renderSubjects();
  document.querySelectorAll('input[name="extract-kind"]').forEach(input => input.checked = extractionKinds(job).includes(input.value));
  $('#source-preview').src = `/api/extractions/${job.id}/image/source`; $('#source-preview').hidden = false;
  $('#source-input').value = ''; $('#extract-title').value = job.title; $('#extract-prompt').value = job.prompt; $('#infer-hidden').checked = job.inferHidden;
  renderExtraction(job);
}

async function loadExtractions() {
  state.extractions = await request('/api/extractions');
  renderExtractionHistory();
}
function renderExtractionHistory() {
  const list = $('#extraction-history-list'); list.replaceChildren();
  const records=state.extractions.filter(job=>viewForExtraction(job)===extractView);
  if (!records.length) list.append(element('p', 'empty-library', extractView==='artwork'?'还没有原画真人化记录。':'还没有拆解记录。'));
  const labels = { completed:'已完成', failed:'未完成', interrupted:'已中断', cancelled:'已停止', queued:'准备中', running:'拆解中' };
  for (const job of records) {
    const row = element('div', 'extraction-history-row'), image = element('img'); image.src = `/api/extractions/${job.id}/image/source`; image.alt = `${job.title}源照片`; image.loading = 'lazy';
    const copy = element('div'); copy.append(element('h3', '', job.title), element('p', 'muted', `${new Date(job.createdAt).toLocaleString('zh-CN', { hour12: false })} · ${labels[job.status]} · ${[subjectLabel(job),...subjectsFor(job).map(subject=>subject.species).filter(Boolean),...extractionKinds(job).map(kind=>resourceName(kind,job))].join('、')} · ${Object.keys(job.outputs).length}/${extractionParts(job).length}`));
    const open = element('button', 'secondary extraction-history-open', '查看资源'); open.type = 'button'; open.disabled = state.extractionBusy;
    open.onclick = () => { openExtraction(job); if (['queued', 'running'].includes(job.status)) pollExtraction(job.id); $('.extraction-review').scrollIntoView({ behavior: 'smooth' }); };
    row.append(image, copy, open); list.append(row);
  }
}

async function pollExtraction(id) {
  clearTimeout(extractionTimer);
  try {
    const job = await request(`/api/jobs/${id}`);
    if(state.extraction?.id!==id)return;
    renderExtraction(job);
    if (['queued', 'running'].includes(job.status)) extractionTimer = setTimeout(() => pollExtraction(id), 2000);
    else await loadExtractions();
  } catch (error) { if(state.extraction?.id!==id)return;$('#extract-status').textContent = `暂时无法读取进度：${error.message}。正在重连，不会重新提交。`; extractionTimer = setTimeout(() => pollExtraction(id), 5000); }
}

async function submitExtraction(resume = false) {
  const artwork=extractView==='artwork';
  if (state.submitting || !(artwork?artSource:state.sourceId)) return;
  if (!(artwork?artworkKinds():extractionSelection().resourceKinds).length) return notice('请至少勾选一种要制作的资源。');
  const id = resume ? state.extraction.id : crypto.randomUUID();
  const payload = artwork ? {renderMode:'live-action',sourceId:artSource,resourceKinds:artworkKinds()} : { ...connectionSettings(), sourceId: state.sourceId, title: $('#extract-title').value.trim(), ...extractionSelection(), prompt: $('#extract-prompt').value, inferHidden: $('#infer-hidden').checked };
  state.submitting=true;setBusy('extraction', true); notice(); $('#extract-status').textContent = '正在提交拆解任务…';
  try {
    const job = await request(resume ? `/api/extractions/${id}/resume` : '/api/extractions', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': id }, body: JSON.stringify(payload) });
    openExtraction(job); await loadExtractions();
    if (state.extraction?.id===job.id&&['queued', 'running'].includes(job.status)) pollExtraction(job.id);
    else if (job.reused) notice('已打开已有制作记录。');
  } catch (error) {
    setBusy('extraction', false); notice(error.message); $('#extract-status').textContent = error.message;
    try { const job = await request(`/api/jobs/${id}`); openExtraction(job); if (['queued', 'running'].includes(job.status)) pollExtraction(id); } catch { /* No accepted task to resume. */ }
  } finally { state.submitting=false;updateProvider();void loadQueue().catch(error=>notice(error.message)); }
}

const pageTabs=Array.from(document.querySelectorAll('[data-page]'));
pageTabs.forEach((button,index) => {
  button.onclick = () => switchPage(button.dataset.page);
  button.onkeydown = event => {
    const count=pageTabs.length;
    const next={Home:0,End:count-1,ArrowRight:(index+1)%count,ArrowLeft:(index+count-1)%count}[event.key];
    if(next===undefined)return;
    event.preventDefault();switchPage(pageTabs[next].dataset.page);pageTabs[next].focus();
  };
});
window.addEventListener('hashchange', () => switchPage(location.hash.slice(1)));
function renderTagFilter() {
  const select=$('#tag-filter'),selected=select.value,counts=new Map();
  for(const item of categoryItems(state.assetKind))for(const tag of item.tags||[])counts.set(tag,(counts.get(tag)||0)+1);
  const tags=[...counts.keys()].sort((a,b)=>a.localeCompare(b,'zh-CN'));
  select.replaceChildren(new Option('全部标签',''),new Option('未添加标签','untagged'),...tags.map(tag=>new Option(`${tag} · ${counts.get(tag)}`,`tag:${tag}`)));
  if(selected.startsWith('tag:')&&!counts.has(selected.slice(4)))select.append(new Option(`${selected.slice(4)} · 0`,selected));
  select.value=selected;$('#tag-suggestions').replaceChildren(...tags.map(tag=>new Option(tag,tag)));
}
function librarySelecting(){return state.bulkMode||batchSelecting(state.assetKind);}
function librarySelection(){return batchSelecting(state.assetKind)?state.batch[`${state.assetKind}s`]:state.bulkIds;}
function setLibrarySelection(ids) {
  const unique=[...new Set(ids)],limit=batchSelecting(state.assetKind)?100:5000;
  if(unique.length>limit)return notice(`当前最多选择 ${limit} 项，请缩小筛选范围；本次没有改变选择。`);
  if(batchSelecting(state.assetKind)){state.batch[`${state.assetKind}s`]=unique;updateBatch();}else state.bulkIds=unique;
  $('#tags-status').textContent='';renderGallery();
}
function renderBulk(items,visible) {
  const selecting=librarySelecting(),ids=librarySelection(),visibleIds=new Set(items.map(item=>item.id)),hidden=ids.filter(id=>!visibleIds.has(id)).length;
  $('#bulk-toggle').hidden=batchSelecting(state.assetKind);$('#bulk-toggle').textContent=state.bulkMode?'结束选择':'批量选择';$('#bulk-toggle').setAttribute('aria-pressed',state.bulkMode);
  $('#library-bulk').hidden=!selecting;$('#bulk-count').textContent=`已选 ${ids.length} 项${hidden?`（${hidden} 项不在当前筛选内）`:''}`;
  $('#bulk-page').disabled=!visible.length;$('#bulk-all').disabled=!items.length;$('#bulk-clear').disabled=!ids.length;
  for(const id of ['tags-add','tags-remove'])$(`#${id}`).disabled=!ids.length||state.tagging;
  $('#bulk-to-batch').hidden=state.production==='batch'||state.subjectType!=='human'||!['pose','costume','face'].includes(state.assetKind);$('#bulk-to-batch').disabled=!ids.length;
}
async function editTags(action) {
  if(state.tagging)return;
  const kind=state.assetKind,ids=[...librarySelection()];
  try{
    const tags=normalizeTags($('#tag-input').value.split(/[,，\n]/).map(tag=>tag.trim()).filter(Boolean));
    if(!tags.length||!ids.length)throw new Error('请先选择资源并填写标签。');
    state.tagging=true;renderGallery();
    const updated=await request('/api/resource-tags',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:ids.map(id=>({kind,id})),[action]:tags})});
    for(const item of updated)for(const catalog of [state.catalogs[kind]||[],state.uploads]){const stored=catalog.find(ref=>ref.id===item.id);if(stored)stored.tags=item.tags;}
    remember();$('#tags-status').textContent=`已为 ${updated.length} 项资源${action==='add'?'添加':'移除'}标签。`;
  }catch(error){$('#tags-status').textContent=error.message;}
  finally{state.tagging=false;renderGallery();}
}
function batchSelecting(kind) { return state.pickerTarget?.startsWith('batch') && state.production==='batch' && ['pose','costume','face'].includes(kind); }
function toggleBatch(kind,id) {
  const list=state.batch[`${kind}s`], index=list.indexOf(id);
  if(index>=0)list.splice(index,1);else if(list.length<100)list.push(id);else return notice('每类最多选择 100 项。');
  updateBatch();
}
function batchPayload() { return {name:$('#batch-name').value.trim(), mode:$('#batch-mode').value, ...state.batch, settings:currentSettings()}; }
function updateBatch() {
  if(state.production!=='batch')return;
  remember();
  const container=$('#batch-lists');container.replaceChildren();
  for(const kind of ['pose','costume','face']) {
    const group=element('div','batch-list'), title=element('strong','',`${shortNames[kind]} · ${state.batch[`${kind}s`].length}`);
    const choose=element('button','text-button',`选择${shortNames[kind]}`);choose.type='button';choose.onclick=()=>openPicker(kind,'batch');group.append(title,choose);
    state.batch[`${kind}s`].forEach((id,index)=>{const button=element('button','batch-chip',`${index+1}. ${itemFor(kind,id)?.title||id} ×`);button.type='button';button.onclick=()=>{toggleBatch(kind,id);renderGallery();};group.append(button);});
    container.append(group);
  }
  const preview=$('#batch-preview');preview.replaceChildren();let rows=[];
  try {
    if(state.subjectType!=='human'||state.characters.length!==1||$('#output-type').value!=='image')throw new Error('批量商品展示使用单人人物图片，请选择人物类别并配置一个角色。');
    const propIssue=scenePropIssue(state.sceneProps,state.characters);if(propIssue)throw new Error(propIssue);
    rows=batchRows(batchPayload());
    for(const row of rows) {
      const pose=itemFor('pose',row.pose),face=itemFor('face',row.face);
      if(!pose||!face||!itemFor('costume',row.costume))throw new Error('部分资源不存在，请重新选择。');
      if(poseCount(pose)&&poseCount(pose)!==1)throw new Error(`「${pose.title}」是多人骨架，请选单人骨架。`);
      const mismatch=roleMismatch([{gender:'reference'}],pose,[face],'human');if(mismatch)throw new Error(mismatch);
    }
    rows.forEach((row,index)=>{
      const line=element('div','batch-preview-row');line.append(element('span','',String(index+1)));
      for(const kind of ['pose','costume','face']){const img=element('img');img.src=assetURL(kind,row[kind]);img.alt=`${shortNames[kind]}：${itemFor(kind,row[kind])?.title}`;img.title=img.alt;line.append(img);}preview.append(line);
    });
    $('#batch-summary').textContent=`共 ${rows.length} 张 · 相同配置已有成图或正在排队时会复用。`;
    $('#batch-submit').disabled=state.submitting||!canGenerate();$('#batch-submit').textContent=`将 ${rows.length} 张加入生产队列`;
  }catch(error){$('#batch-summary').textContent=error.message;$('#batch-submit').disabled=true;}
}
async function loadSettingsUI() {const [settings,workflows]=await Promise.all([request('/api/settings'),request('/api/comfy/workflows')]);state.settings=settings;state.workflows=workflows;renderSettings();updateProvider();}
function updateSettingsFields() {
  $('#settings-image-api').hidden=$('#settings-provider').value!=='api';$('#settings-comfy').hidden=$('#settings-provider').value!=='comfyui';
}
function renderSettings() {
  $('#settings-provider').value=state.settings.provider;$('#settings-model').value=state.settings.model;$('#settings-base').value=state.settings.baseURL;
  $('#settings-key').value='';$('#settings-clear-key').checked=false;
  const comfy=state.settings.comfy||{};
  $('#comfy-url').value=comfy.baseURL||'http://127.0.0.1:8188';$('#comfy-auth').value=comfy.authHeader||'bearer';$('#comfy-token').value='';$('#comfy-clear-token').checked=false;
  $('#comfy-token-status').textContent=comfy.hasApiKey?'已保存 ComfyUI Token。':'未配置鉴权 Token。';
  $('#comfy-workflows').value=state.workflows&&Object.keys(state.workflows).length?JSON.stringify(state.workflows,null,2):'';
  updateSettingsFields();$('#settings-key-status').textContent=state.settings.hasApiKey?'已保存 API Key。留空不修改。':'尚未保存 API Key。';
  $('#mcp-config').textContent=JSON.stringify({mcpServers:{'character-studio':{command:'node',args:[state.mcpPath||'/absolute/path/to/character-studio/mcp.mjs'],env:{STUDIO_URL:location.origin}}}},null,2);
}
async function loadQueue() {
  const queue=await request('/api/queue');state.queue=queue;
  if(queue.settings && JSON.stringify(queue.settings)!==JSON.stringify(state.settings)){state.settings=queue.settings;updateProvider();}
  $('#queue-count').textContent=queue.waiting.length+(queue.running?1:0);renderQueue();
  if(state.resourceMode==='expressions')void loadExpressions().catch(error=>$('#expression-status').textContent=error.message);
  const all=[queue.running,...queue.waiting,...queue.recent].filter(Boolean);
  for(const current of [state.currentJob,state.sceneJob,state.extraction,state.conversionJob]) {
    const latest=current&&all.find(job=>job.id===current.id);
    if(latest && latest.status!==current.status){if(latest.type==='extraction'){renderExtraction(latest);void loadExtractions();}else{renderJob(latest);void loadHistory();}}
  }
}
function renderQueue() {
  if(!state.queue)return;
  const query=$('#queue-search').value.trim().toLowerCase();
  const labels={running:'制作中',queued:'等待中',completed:'已完成',failed:'失败',interrupted:'已中断',cancelled:'已取消'};
  $('#queue-waiting-count').textContent=state.queue.waiting.length;
  for(const [id,items] of [['running',state.queue.running?[state.queue.running]:[]],['waiting',state.queue.waiting],['recent',state.queue.recent]]) {
    const list=$(`#queue-${id}`);list.replaceChildren();
    for(const job of items.filter(job=>!query||[job.id,job.batchId,job.batchName,job.title].filter(Boolean).join(' ').toLowerCase().includes(query))) {
      const row=element('article','queue-row'),copy=element('div');
      copy.append(element('h3','',`${job.position?`${job.position}. `:''}${job.batchName?`${job.batchName} · 第 ${job.batchIndex} 张`:job.title|| (job.type==='extraction'?'照片拆解':outputLabel(job))}`),element('p','muted',`${labels[job.status]} · ${providerLabel(job)} · ${new Date(job.createdAt).toLocaleString('zh-CN',{hour12:false})}`),element('p','',job.message),element('small','muted',job.id));row.append(copy);
      if(job.status==='queued') {
        const cancel=element('button','secondary','取消等待');cancel.type='button';cancel.onclick=async()=>{cancel.disabled=true;try{await request(`/api/jobs/${job.id}/cancel`,{method:'POST'});await loadQueue();notice('已取消等待任务，未调用模型。');}catch(error){notice(error.message);cancel.disabled=false;}};row.append(cancel);
      }
      if(job.status==='completed'&&job.imageURL){const view=element('button','secondary','查看图片');view.onclick=()=>showImage(job.imageURL,job.title||outputLabel(job));const download=element('a','secondary','下载');download.href=`${job.imageURL}?download=1`;row.append(view,download);}
      if(job.type==='extraction'){const view=element('button','secondary','查看资源');view.onclick=()=>{setResourceMode(viewForExtraction(job));openExtraction(job);switchPage('resources');if(['running','queued'].includes(job.status))pollExtraction(job.id);};row.append(view);}
      list.append(row);
    }
    if(!list.children.length)list.append(element('p','empty-library',id==='running'?'暂无正在制作的任务。':id==='waiting'?'没有等待中的任务。':'暂无匹配记录。'));
  }
}

initEffects();switchPage(location.hash.slice(1)); renderExtractionType();renderSubjects(); renderExtraction(null);setResourceMode('extraction');
document.querySelectorAll('[data-resource-mode]').forEach(button=>button.onclick=()=>{setResourceMode(button.dataset.resourceMode);rememberScene();});
$('#scene-form').onsubmit=submitScene;
for(const key of ['title','prompt','style','effect','size','quality','light']){
  const input=$(`#scene-${key}`);input.addEventListener(input.tagName==='SELECT'?'change':'input',()=>{
    if(key==='effect')renderEffectDetail('scene-');if(key==='style')syncEffectOptions('scene-');rememberScene();updateScene();
  });
}
$('#scene-source').onchange=async()=>{
  const file=$('#scene-source').files[0];if(!file)return;
  state.sceneUploading=true;updateScene();
  try{
    if(file.size>20*1024*1024)throw new Error('图片需小于 20 MB。');
    const source=await request('/api/uploads/source',{method:'POST',headers:{'Content-Type':file.type,'X-File-Name':encodeURIComponent(file.name)},body:file});
    state.sceneSourceId=source.id;notice();rememberScene();
  }catch(error){notice(error.message);}finally{state.sceneUploading=false;$('#scene-source').value='';updateScene();}
};
$('#scene-source-clear').onclick=()=>{state.sceneSourceId='';$('#scene-source').value='';rememberScene();updateScene();};
$('#scene-view').onclick=()=>{if(state.scenePreview)showImage(state.scenePreview.imageURL,state.scenePreview.title);};
$('#scene-cancel').onclick=async()=>{if(state.sceneJob)try{await request(`/api/jobs/${state.sceneJob.id}/cancel`,{method:'POST',headers:{'X-Stop-Running':'true'}});}catch(error){notice(error.message);}};
$('#scene-history').onclick=()=>{$('#history-clear').click();$('#history-type').value=state.sceneKind;renderHistory();switchPage('history');};
$('#scene-import').onclick=async()=>{
  const job=state.scenePreview;if(!job)return;$('#scene-import').disabled=true;
  try{
    const resource=await request(`/api/jobs/${job.id}/import`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title:job.title})});
    state.catalogs[resource.kind]=[resource,...state.catalogs[resource.kind].filter(item=>item.id!==resource.id)];
    refreshCategoryUI();
    renderGallery();updateScene();notice();
  }catch(error){notice(error.message);}finally{$('#scene-import').disabled=false;}
};
$('#scene-use').onclick=()=>{
  const job=state.scenePreview,resource=job&&state.catalogs[job.outputType]?.find(item=>item.sourceJobId===job.id);if(!resource)return;
  switchPage('generate');setSelected(resource.kind,resource.id);renderSelections();switchKind(resource.kind);
};
$('#extract-subject-type').onchange=changeExtractionType;
$('#extract-person-count').onchange = () => {
  const oldCount = state.subjects.length, count = Number($('#extract-person-count').value);
  state.subjects = Array.from({length:count}, (_, index) => { const old = state.subjects[index]; return {gender:'reference',...old,position:old && old.position !== defaultPosition(index,oldCount,$('#extract-subject-type').value) ? old.position : defaultPosition(index,count,$('#extract-subject-type').value)}; });
  renderSubjects(); renderExtraction(null);
};
document.querySelectorAll('input[name="extract-kind"]').forEach(input => input.onchange = () => { notice(); renderExtraction(null); });
$('#source-input').onchange = async () => {
  const file = $('#source-input').files[0]; if (!file) return;
  state.sourceId = null; state.sourceUploading = true; renderExtraction(null); $('#source-preview').hidden = true; updateExtraction();
  try {
    if (file.size > 20 * 1024 * 1024) throw new Error('图片需小于 20 MB。');
    const source = await request('/api/uploads/source', { method:'POST', headers: { 'Content-Type': file.type, 'X-File-Name': encodeURIComponent(file.name) }, body: file });
    state.sourceId = source.id; $('#source-preview').src = assetURL('source', source.id, false); $('#source-preview').hidden = false;
    $('#extract-title').value = file.name.replace(/\.[^.]+$/, '').slice(0, 80); notice();
  } catch (error) { notice(error.message); }
  finally { state.sourceUploading = false; updateExtraction(); }
};
$('#extract-form').onsubmit = event => { event.preventDefault(); void submitExtraction(); };
$('#artwork-form').onsubmit = event => {event.preventDefault();if(!$('#artwork-start').disabled)void submitExtraction();};
document.querySelectorAll('input[name="artwork-kind"]').forEach(input=>input.onchange=()=>renderExtraction(null));
$('#artwork-file').onchange=async()=>{
  const file=$('#artwork-file').files[0];if(!file)return;
  artSource='';artUploading=true;$('#artwork-preview').hidden=true;renderExtraction(null);
  try{
    if(file.size>20*1024*1024)throw new Error('图片需小于 20 MB。');
    const item=await request('/api/uploads/source',{method:'POST',headers:{'Content-Type':file.type,'X-File-Name':encodeURIComponent(file.name)},body:file});
    artSource=item.id;$('#artwork-preview').src=assetURL('source',item.id,false);$('#artwork-preview').hidden=false;notice();
  }catch(error){notice(error.message);}finally{artUploading=false;updateExtraction();}
};
$('#extract-resume').onclick = () => void submitExtraction(true);
$('#extract-cancel').onclick = async () => { try { await request(`/api/jobs/${state.extraction.id}/cancel`, { method:'POST', headers:{'X-Stop-Running':'true'} }); $('#extract-status').textContent = '正在停止等待，已完成资源会保留…'; } catch (error) { notice(error.message); } };
$('#extract-refresh').onclick = () => loadExtractions().catch(error => notice(error.message));
$('#import-resources').onclick = async () => {
  const kinds = [...document.querySelectorAll('[data-import-kind]:checked')].map(input => input.dataset.importKind);
  if (!kinds.length) return notice('请勾选审核通过的资源。');
  $('#import-resources').disabled = true;
  try {
    const job = state.extraction;
    const resources = await request(`/api/extractions/${job.id}/import`, { method:'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kinds, title: $('#import-title').value.trim(), gender: $('#import-gender').value, costumeGender: $('#import-costume-gender').value }) });
    for (const resource of resources) state.catalogs[resource.kind] = [resource, ...state.catalogs[resource.kind].filter(item => item.id !== resource.id)];
    refreshCategoryUI();
    switchKind(state.assetKind); renderSelections();
    $('#import-status').textContent = `已加入资料库：${resources.map(item => resourceName(item.kind,job)).join('、')}。可以在生成图片页搜索入库名称。`;
    $('#use-resources').hidden = false; $('#use-resources').onclick = () => {
      switchPage('generate');if(state.subjectType!==subjectTypeFor(job))changeSubjectType(subjectTypeFor(job));
      const subjects = subjectsFor(job), hasPose = resources.some(resource => resource.kind === 'pose');
      if (hasPose || subjects.length > 1) {
        state.characters = subjects.map((subject,index) => ({ ...(state.subjectType==='human'?{costume:state.defaults.costume,face:state.defaults.face}:{surface:'',face:''}), ...subject, ...state.characters[subjects.length === 1 ? state.activeCharacter : index], ...(hasPose ? subject : {}) })); state.activeCharacter = 0;
      }
      for (const resource of resources) {
        if (resource.kind === 'pose') state.selections.pose = resource.id;
        else {
          const index = subjects.length === 1 ? state.activeCharacter : resource.characterIndex ?? 0;
          state.characters[index][resource.kind] = resource.id;
          if(resource.kind!=='costume'){if(resource.species)state.characters[index].species=resource.species;if(resource.anatomy)state.characters[index].anatomy=resource.anatomy;}
          if (resource.kind === 'face' && ['male','female'].includes(resource.gender)) state.characters[index].gender = resource.gender;
        }
      }
      renderSelections(); switchKind(resources[0].kind); switchPage('generate'); window.scrollTo({ top:0, behavior:'smooth' });
    };
    notice();
  } catch (error) { notice(error.message); }
  finally { $('#import-resources').disabled = false; }
};

$('.jump-output').onclick=()=>$('.assembly-output').scrollIntoView({block:'start'});
$('.jump-editor').onclick=()=>$('.assembly-editor').scrollIntoView({block:'start'});
$('#open-library').onclick=()=>openPicker(state.production==='batch'&&!['pose','costume','face'].includes(state.assetKind)?'pose':state.assetKind,state.production==='batch'?'batch-library':'library');
$('#picker-close').onclick=closePicker;
$('#asset-picker').addEventListener('close',()=>{
  if(!businessPages.includes(location.hash.slice(1)))return;
  const target=pickerOpener?.isConnected?pickerOpener:(document.querySelector(`[data-pick="${state.assetKind}"]`) || $('#open-library'));
  target.focus({preventScroll:true});
});
$('#scene-background-mode').onchange=()=>{
  const choice=$('#scene-background-mode').value;
  if(choice==='image'){$('#scene-background-mode').value=state.selections.background?'image':$('#background').value;openPicker('background');return;}
  delete state.selections.background;$('#background').value=choice;renderSelections();renderGallery();
};
$('#expression-choose').onclick=()=>openPicker('face','role','expression');
$('#face-suite').onclick=()=>openExpressionGroup(selectedID('face'));

$('#prop-add').onclick=()=>openPicker('pose','role','props');
$('#library-tabs').onclick=event=>{const button=event.target.closest('[data-part]');if(button)showPickerPart(button.dataset.part);};
$('#picker-root').onchange=()=>{switchKind($('#picker-root').value);showPickerPart();};
for(const [key,spec] of Object.entries(SCENE_PROPS))$('#prop-upload-kind').append(new Option(spec.label,key));
$('#part-upload').onclick=()=>$('#part-file').click();
$('#part-file').onchange=async event=>{
  const file=event.target.files[0];if(!file)return;
  const view=state.pickerPart,key=view==='props'?$('#prop-upload-kind').value:view;
  event.target.value='';
  try{
    if(file.size>20*1024*1024)throw new Error('图片需小于 20 MB。');
    $('#part-upload').disabled=true;
    const item=await request('/api/uploads/source',{method:'POST',headers:{'Content-Type':file.type,'X-File-Name':encodeURIComponent(file.name),'X-Part-Kind':key},body:file});
    state.partAssets.unshift(item);
    if($('#asset-picker').open&&state.pickerPart===view){showPickerPart(view);$('#part-upload-status').textContent='图片已入库，点击缩略图即可选用。';}
  }catch(error){$('#part-upload-status').textContent=error.message;}finally{$('#part-upload').disabled=false;}
};
$('#part-apply').onclick=()=>applyPart($('#part-description').value);
['search','category','group','angle','asset-gender','tag-filter'].forEach(id => $(`#${id}`).addEventListener(id === 'search' ? 'input' : 'change', () => { if (state.csrf) { state.page = 0; renderGallery(); } }));
$('#clear-filters').onclick = () => { switchKind(state.assetKind); $('#asset-gender').value = ''; renderGallery(); };
$('#previous').onclick = () => { state.page--; renderGallery(); };
$('#next').onclick = () => { state.page++; renderGallery(); };
$('#subject-type').onchange=()=>{changeSubjectType($('#subject-type').value);renderSelections();switchKind('pose');};
$('#reset').onclick = () => { state.selections={};changeSubjectType(state.subjectType);$('#prompt').value='';renderSelections();switchKind('pose'); };
$('#add-character').onclick = () => { if (state.characters.length < MAX_CHARACTERS) { resizeCharacters(state.characters.length + 1); state.activeCharacter = state.characters.length - 1; renderSelections(); switchKind('face'); } };
$('#remove-character').onclick = () => { if (state.characters.length > 1) { const removed=state.activeCharacter+1;state.characters.splice(state.activeCharacter, 1);
    for(const prop of state.sceneProps)prop.roles=prop.roles.map(role=>role===removed?null:role>removed?role-1:role); state.activeCharacter = Math.min(state.activeCharacter, state.characters.length - 1); renderSelections(); renderGallery(); } };
$('#character-species').oninput=()=>{state.characters[state.activeCharacter].species=$('#character-species').value;renderCharacters();updateGenerate();remember();};
$('#character-anatomy').oninput=()=>{state.characters[state.activeCharacter].anatomy=$('#character-anatomy').value;renderCharacters();updateGenerate();remember();};
$('#character-gender').onchange = () => { state.characters[state.activeCharacter].gender = $('#character-gender').value; renderSelections(); if (state.assetKind === 'face') switchKind('face'); };
$('#character-position').oninput = () => { state.characters[state.activeCharacter].position = $('#character-position').value; updateGenerate(); remember(); };
$('#character-expression').onchange = () => {
  const role=state.characters[state.activeCharacter],id=$('#character-expression').value;
  if(id)role.expressionAssetId=id;else delete role.expressionAssetId;
  renderSelections();
};
['prompt','style','background','size','quality','effect','cameraDirection','cameraPitch','shotSize'].forEach(id => { const input = $(`#${id}`); input.addEventListener(input.tagName === 'SELECT' ? 'change' : 'input', () => { notice(); if(id==='effect')renderEffectDetail('');if(id==='style')syncEffectOptions('');remember(); updateGenerate(); }); });
$('#upload-button').onclick = () => $('#upload-input').click();
$('#upload-input').onchange = async () => {
  const file = $('#upload-input').files[0]; if (!file) return;
  const kind = state.assetKind, subjectType=state.subjectType;
  try {
    if (file.size > 20 * 1024 * 1024) throw new Error('图片需小于 20 MB。');
    $('#upload-button').disabled = true; $('#upload-button').textContent = '正在上传…';
    const role=state.characters[state.activeCharacter], config=subjectFor(state);
    const item = await request(`/api/uploads/${kind}`, { method:'POST', headers:{ 'Content-Type': file.type, 'X-File-Name':encodeURIComponent(file.name), 'X-Subject-Type':subjectType, 'X-Species':encodeURIComponent(config.hasSpecies&&!sceneKinds.includes(kind)?role?.species?.trim() || '':''), 'X-Anatomy':encodeURIComponent(config.fantasy&&!sceneKinds.includes(kind)?role?.anatomy?.trim() || '':'') }, body:file });
    state.uploads.push(item);if(state.subjectType!==subjectType){refreshCategoryUI();remember();return;}setSelected(kind, item.id); switchKind(kind); $('#asset-gender').value = ''; $('#category').value = '我的上传'; renderSelections(); renderGallery(); notice();if(!librarySelecting())closePicker();
  } catch (error) { notice(error.message); }
  finally { $('#upload-button').disabled = false; $('#upload-button').textContent = '上传图片 ＋'; $('#upload-input').value = ''; }
};
$('#generate-form').onsubmit = async event => {
  event.preventDefault(); if (state.submitting) return;
  const regenerate = event.submitter?.id === 'regenerate', saved = savedMatch();
  if (saved && !regenerate) { renderJob(saved); notice('已打开保存的成图，没有重新生成。'); return; }
  const requestID = crypto.randomUUID();
  const payload = { ...currentSettings(), regenerate };
  state.submitting=true;
  setBusy('generation', true); notice();
  try {
    localStorage.setItem('character-studio-pending', requestID);
    const job = await request('/api/jobs', { method:'POST', headers:{ 'Content-Type':'application/json', 'Idempotency-Key':requestID }, body:JSON.stringify(payload) });
    renderJob(job); await loadHistory();
    if (['queued','running'].includes(job.status)) poll(job.id);
    else { localStorage.removeItem('character-studio-pending'); if (job.reused) notice('已打开保存的成图，没有重新生成。'); }
  } catch (error) {
    setBusy('generation', false); notice(error.message);
    // Recover an accepted request after a lost response without charging a second time.
    try { const job = await request(`/api/jobs/${requestID}`); renderJob(job); poll(job.id); } catch { localStorage.removeItem('character-studio-pending'); }
  } finally { state.submitting=false;updateProvider();void loadQueue().catch(error=>notice(error.message)); }
};
$('#cancel').onclick = async () => { if (state.currentJob) { try { await request(`/api/jobs/${state.currentJob.id}/cancel`, { method:'POST', headers:{'X-Stop-Running':'true'} }); $('#working-text').textContent = '正在停止等待…'; } catch (error) { notice(error.message); } } };
$('#zoom-result').onclick = () => { if (state.previewJob?.imageURL) showImage(state.previewJob.imageURL, '已保存的人物图片'); };
$('#relight-result').onclick = () => { if(state.previewJob)void submitRelight(state.previewJob,$('#relight-result')); };
$('#result-image').onerror = () => notice('已保存成图暂时无法读取。请检查成片库中的保存路径；不会自动重新生成。');
$('#image-close').onclick = () => $('#image-dialog').close();
const historyFilters = ['history-search', 'history-from', 'history-to', 'history-provider', 'history-type', 'history-subject', 'history-style', 'history-effect', 'history-people', 'history-size', 'history-cameraDirection', 'history-cameraPitch', 'history-shotSize'];
[...historyFilters, 'history-filter'].forEach(id => { const input = $(`#${id}`); input.addEventListener(input.tagName === 'SELECT' ? 'change' : 'input', () => { if(id==='history-style')syncEffectOptions('history-');renderHistory(); }); });
$('#history-clear').onclick = () => { historyFilters.forEach(id => $(`#${id}`).value = ''); syncEffectOptions('history-');$('#history-filter').value = 'completed'; renderHistory(); };
$('#history-refresh').onclick = () => loadHistory().catch(error => notice(error.message));

try {
  const data = await request('/api/bootstrap'); Object.assign(state, data); for(const kind of Object.keys(names))state.catalogs[kind] ||= []; state.selections = { ...data.defaults };
  state.characters = charactersFor({selections:data.defaults});
  try {
    state.expressionFaceId=localStorage.getItem('character-studio-expression-face')||'';
  }catch{}
  restoreBusiness();
  try {
    const draft=JSON.parse(localStorage.getItem('character-studio-scene-v1')||'null');
    if(draft&&sceneKinds.includes(draft.outputType)){
      state.sceneKind=draft.outputType;state.sceneSourceId=typeof draft.sourceId==='string'?draft.sourceId:'';
      if (Object.hasOwn(SCENE_LIGHTS,draft.sceneLight)) $('#scene-light').value=draft.sceneLight;
      for(const key of ['title','prompt','style','size','quality'])if(typeof draft[key]==='string')$(`#scene-${key}`).value=draft[key];
      syncEffectOptions('scene-', draft.effect || 'none');
    }
  }catch{/* Ignore stale scene drafts. */}
  updateProvider();renderSettings();if(location.hash==='#settings')await loadSettingsUI();await loadQueue();setInterval(()=>void loadQueue().catch(()=>{}),3000);
  refreshCategoryUI();
  switchKind('pose'); renderSelections(); updateProvider(); await loadHistory();
  try{
    const draft=JSON.parse(localStorage.getItem('character-studio-conversion-v1')||'null');
    if(draft&&['face','costume'].includes(draft.sourceKind)){$('#conversion-kind').value=draft.sourceKind;state.conversionSourceId=draft.sourceAssetId||'';$('#conversion-prompt').value=draft.prompt||'';state.conversionJob=state.jobs.find(job=>job.id===draft.jobId&&job.outputType==='resource-conversion')||null;}
  }catch{/* Ignore stale conversion drafts. */}
  renderConversionPicker();updateConversion();
  try{const mode=localStorage.getItem('character-studio-resource-mode');if(['expressions','artwork'].includes(mode))setResourceMode(mode);}catch{/* Draft storage is optional. */}
  const tracked=new Set();
  for(const running of state.jobs.filter(job=>!job.batchId&&['image','character-sheet','background','foreground'].includes(outputTypeFor(job))&&['queued','running'].includes(job.status))){
    const key=isSceneJob(running)?'scene':outputTypeFor(running);if(tracked.has(key))continue;tracked.add(key);
    if(isSceneJob(running))openSceneJob(running);renderJob(running);poll(running.id);
  }
  await loadExtractions();
  const records=state.extractions.filter(job=>viewForExtraction(job)===extractView);
  const extracting = records.find(job => ['queued', 'running'].includes(job.status));
  if (extracting) { openExtraction(extracting); pollExtraction(extracting.id); }
  else if (records.length&&!state.sourceUploading&&!artUploading&&!(extractView==='artwork'?artSource:state.sourceId)) openExtraction(records[0]);
  updateExtraction();
} catch (error) { notice(`工作台载入失败：${error.message}。请确认本地服务已启动，再刷新页面。`); $('#connection').textContent = '连接失败'; }

$('#settings-form').onsubmit=async event=>{
  event.preventDefault();const button=event.submitter;button.disabled=true;
  try{
    const raw=$('#comfy-workflows').value.trim(),workflows=raw?JSON.parse(raw):undefined;
    state.settings=await request('/api/settings',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({provider:$('#settings-provider').value,model:$('#settings-model').value,baseURL:$('#settings-base').value,apiKey:$('#settings-key').value,clearApiKey:$('#settings-clear-key').checked,comfy:{baseURL:$('#comfy-url').value,authHeader:$('#comfy-auth').value,apiKey:$('#comfy-token').value,clearApiKey:$('#comfy-clear-token').checked,...(workflows?{workflows}:{})}})});
    if(workflows)state.workflows=workflows;renderSettings();updateProvider();$('#settings-status').textContent='设置已保存，新任务会使用此通道。';notice();
  }catch(error){$('#settings-status').textContent=error.message;}finally{$('#settings-key').value='';$('#comfy-token').value='';button.disabled=false;}
};
$('#queue-refresh').onclick=()=>loadQueue().catch(error=>notice(error.message));$('#queue-search').oninput=renderQueue;
$('#batch-name').oninput=remember;
$('#batch-mode').onchange=()=>{updateBatch();remember();};$('#batch-clear').onclick=()=>{state.batch={poses:[],costumes:[],faces:[]};updateBatch();renderGallery();};
$('#batch-submit').onclick=async()=>{
  if(state.submitting)return;const id=crypto.randomUUID(),payload=batchPayload();state.submitting=true;updateBatch();
  try{
    const batch=await request('/api/batches',{method:'POST',headers:{'Content-Type':'application/json','Idempotency-Key':id},body:JSON.stringify(payload)});
    await loadQueue();switchPage('queue');notice(`批次已提交，共 ${batch.count} 张；${batch.queued} 张等待制作。已有任务和成图会复用。`);
  }catch(error){notice(error.message);try{const batch=await request(`/api/batches/${id}`);await loadQueue();switchPage('queue');notice(`已找回批次 ${batch.id}，没有重复提交。`);}catch{/* No accepted batch. */}}
  finally{state.submitting=false;updateProvider();}
};

$('#settings-provider').onchange=updateSettingsFields;
$('#comfy-check').onclick=async()=>{const button=$('#comfy-check');button.disabled=true;try{const result=await request('/api/comfy/check',{method:'POST'});$('#comfy-check-status').textContent=`连接成功${result.devices.length?' · '+result.devices.join('、'):''}`;}catch(error){$('#comfy-check-status').textContent=error.message;}finally{button.disabled=false;}};
$('#comfy-file').onchange=async()=>{const file=$('#comfy-file').files[0];if(!file)return;try{if(file.size>500000)throw new Error('工作流配置需小于 500 KB。');const text=await file.text();JSON.parse(text);$('#comfy-workflows').value=text;$('#settings-status').textContent='已载入配置，请保存设置。';}catch(error){$('#settings-status').textContent=error.message;}finally{$('#comfy-file').value='';}};

$('#bulk-toggle').onclick=()=>{state.bulkMode=!state.bulkMode;state.bulkIds=[];$('#tags-status').textContent='';renderGallery();};
$('#bulk-page').onclick=()=>setLibrarySelection([...librarySelection(),...filtered().slice(state.page*state.pageSize,(state.page+1)*state.pageSize).map(item=>item.id)]);
$('#bulk-all').onclick=()=>setLibrarySelection([...librarySelection(),...filtered().map(item=>item.id)]);
$('#bulk-clear').onclick=()=>setLibrarySelection([]);
$('#tags-add').onclick=()=>editTags('add');$('#tags-remove').onclick=()=>editTags('remove');
$('#bulk-to-batch').onclick=()=>{const kind=state.assetKind,selected=[...state.bulkIds];switchPage('batch');const ids=[...new Set([...state.batch[`${kind}s`],...selected])];if(ids.length>100)return notice('每类批量生产最多 100 项。');state.batch[`${kind}s`]=ids;updateBatch();remember();};

$('#conversion-form').onsubmit=submitConversion;
$('#conversion-kind').onchange=()=>{state.conversionSourceId='';$('#conversion-search').value='';renderConversionPicker();rememberConversion();};
$('#conversion-source').onchange=()=>{state.conversionSourceId=$('#conversion-source').value;renderConversionPicker();rememberConversion();};
$('#conversion-search').oninput=renderConversionPicker;
$('#conversion-current').onclick=()=>{state.conversionSourceId=selectedID($('#conversion-kind').value);$('#conversion-search').value='';renderConversionPicker();rememberConversion();};
$('#conversion-prompt').oninput=()=>{state.conversionError='';updateConversion();rememberConversion();};
$('#conversion-history').onclick=()=>{switchPage('history');$('#history-type').value='resource-conversion';renderHistory();};
$('#conversion-view').onclick=()=>{if(state.conversionPreview)showImage(state.conversionPreview.imageURL,'写实资源');};
$('#conversion-cancel').onclick=async()=>{const job=state.conversionWaiting;if(!job)return;try{await request(`/api/jobs/${job.id}/cancel`,{method:'POST'});await loadQueue();await loadHistory();}catch(error){state.conversionError=error.message;updateConversion();}};
$('#conversion-import').onclick=async()=>{
  const job=state.conversionPreview;if(!job||state.conversionImporting)return;state.conversionError='';state.conversionImporting=true;updateConversion();
  try{const resource=await request(`/api/jobs/${job.id}/import`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title:$('#conversion-title').value.trim()})});state.catalogs[resource.kind]=[resource,...state.catalogs[resource.kind].filter(item=>item.id!==resource.id)];refreshCategoryUI();renderGallery();}
  catch(error){state.conversionError=error.message;updateConversion();}
  finally{state.conversionImporting=false;updateConversion();}
};
$('#conversion-use').onclick=()=>{const job=state.conversionPreview,resource=job&&state.catalogs[job.sourceKind]?.find(item=>item.sourceJobId===job.id);if(!resource)return;switchPage('generate');if(!resourceMatchesSubject(resource.kind,resource,state.subjectType))changeSubjectType(subjectTypeFor(resource));setSelected(resource.kind,resource.id);switchKind(resource.kind);renderSelections();switchPage('generate');remember();};
$('#expression-search').oninput=renderExpressionPicker;
$('#expression-face').onchange=()=>{state.expressionFaceId=$('#expression-face').value;state.expressionItems=[];state.expressionReplaceIds=[];$('#expression-status').textContent='';renderExpressionPicker();renderExpressions();void loadExpressions().catch(error=>$('#expression-status').textContent=error.message);};
$('#expression-current').onclick=()=>{state.expressionFaceId=selectedID('face');state.expressionItems=[];$('#expression-search').value='';state.expressionReplaceIds=[];renderExpressionPicker();renderExpressions();void loadExpressions().catch(error=>$('#expression-status').textContent=error.message);};
$('#expression-refresh').onclick=()=>loadExpressions().catch(error=>$('#expression-status').textContent=error.message);
$('#expression-form').onsubmit=async event=>{
  event.preventDefault();if($('#expression-start').disabled)return;const id=crypto.randomUUID(),faceId=state.expressionFaceId,replaceExpressions=[...state.expressionReplaceIds];
  state.expressionSubmitting=true;updateExpressionControls();
  try{
    const batch=await request('/api/expression-sets',{method:'POST',headers:{'Content-Type':'application/json','Idempotency-Key':id},body:JSON.stringify({faceId,replaceExpressions})});
    state.expressionReplaceIds=[];$('#expression-status').textContent=`已处理全套 ${batch.count} 种表情，${batch.queued} 项等待制作；${replaceExpressions.length?`已勾选 ${replaceExpressions.length} 种重抽，成功后替代对应旧版本。`:'已有成图直接复用。'}`;await loadExpressions();await loadQueue();
  }catch(error){
    $('#expression-status').textContent=error.message;
    try{const batch=await request(`/api/batches/${id}`);if(batch.type==='expression-set'){state.expressionReplaceIds=[];$('#expression-status').textContent='已找回这次提交，继续查询进度，没有重复生成。';await loadExpressions();}}catch{/* Do not resubmit after uncertain delivery. */}
  }finally{state.expressionSubmitting=false;updateExpressionControls();}
};
