import * as costumeSeries from '../public/costume-series.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import * as settings from '../public/job-settings.js';
import * as subjects from '../public/subject-types.js';
import * as providers from '../public/providers.js';
import * as tags from '../public/tags.js';
import * as expressions from '../public/expressions.js';
import * as effects from '../public/effects.js';
import * as extraction from '../public/extraction-settings.js';

test('hair picker selects another avatar without replacing the main face or its expression',async()=>{
  const nodes=new Map();
  const node=()=>({value:'',textContent:'',dataset:{},children:[],classList:{toggle(){}},append(...children){this.children.push(...children);},prepend(...children){this.children.unshift(...children);},replaceChildren(...children){this.children=children;},setAttribute(){},removeAttribute(){},close(){this.open=false;}});
  const $=selector=>{if(!nodes.has(selector))nodes.set(selector,node());return nodes.get(selector);};
  const context={...settings,...subjects,...effects,...extraction,...providers,...tags,...expressions,...costumeSeries,setupStyleTransfer:()=>({render(){},refresh(){}}),setupCostumeSeries:()=>({}),setupPoseTweens:()=>({}),setupPoseSequences:()=>({}),isPoseSequence:job=>['pose-plan','pose-frame'].includes(job?.outputType),document:{querySelector:$,querySelectorAll:()=>[],createElement:node},window:{addEventListener(){}},Option:class{constructor(text,value){this.textContent=text;this.value=value;}},localStorage:{getItem(){},setItem(){}}};
  const source=(await readFile(new URL('../public/app.js',import.meta.url),'utf8')).replace(/^import .*;\n/gm,'').split('initEffects();switchPage(')[0];
  runInNewContext(source+'\nrenderSelections=()=>{};renderTagFilter=()=>{};renderBulk=()=>{};globalThis.app={state,showPickerPart,applyHair,setSelected,pickerSelectedID,selectedID};',context);
  const {app}=context;
  app.state.assetKind='face';app.state.pickerTarget='role';app.state.pickerPart='base';
  app.state.characters=[{face:'main',expressionAssetId:'smile',gender:'female',attachments:{hair:'短发'}}];
  app.state.catalogs.face=[{id:'main',title:'主脸',gender:'female'},{id:'donor',title:'发型来源',gender:'male'}];
  $('#asset-gender').value='female';app.showPickerPart('hair');
  assert.equal($('#main-catalog').hidden,false);assert.equal($('#part-catalog').hidden,true);assert.equal($('#custom-part').hidden,true);assert.equal($('#hair-reference-help').hidden,false);assert.equal($('#asset-gender').value,'');
  assert.equal($('#gallery').children.length,2);$('#gallery').children[1].onclick();
  assert.equal(app.state.characters[0].face,'main');assert.equal(app.state.characters[0].expressionAssetId,'smile');assert.equal(app.state.characters[0].hairFaceId,'donor');assert.equal(app.state.characters[0].attachments.hair,undefined);
  assert.equal(app.selectedID('face'),'main');assert.equal(app.pickerSelectedID(),'donor');
  app.applyHair('');assert.equal(app.state.characters[0].hairFaceId,undefined);assert.equal(app.state.characters[0].expressionAssetId,'smile');
  app.applyHair('donor');app.showPickerPart('base');assert.equal($('#hair-reference-help').hidden,true);assert.equal(app.pickerSelectedID(),'main');
  app.setSelected('face','donor');assert.equal(app.state.characters[0].hairFaceId,undefined);assert.equal(app.state.characters[0].expressionAssetId,undefined);
});

test('browsing scene references preserves character settings and displays terminal API errors without resubmitting', async () => {
  const nodes = new Map(), requests = [], timers = [];
  const node = () => ({ value:'', textContent:'', firstChild:{}, options:[], dataset:{}, classList:{toggle(){}},
    append(){}, replaceChildren(){}, setAttribute(){}, removeAttribute(){}, getAttribute(){return null;} });
  const $ = selector => { if (!nodes.has(selector)) nodes.set(selector,node()); return nodes.get(selector); };
  for (const [key,value] of Object.entries({style:'photo',background:'studio',size:'1024x1536',quality:'high',effect:'none','output-type':'image','api-model':'gpt-image-2','api-base':'https://image-provider.example/v1'})) $(`#${key}`).value=value;
  const storage = new Map(); let responseJob;
  const context = { ...settings,...subjects,...effects,...extraction,...providers,...tags,...expressions,...costumeSeries,setupStyleTransfer:()=>({render(){},refresh(){}}),setupCostumeSeries:()=>({}),setupPoseTweens:()=>({}),setupPoseSequences:()=>({}),isPoseSequence:job=>['pose-plan','pose-frame'].includes(job?.outputType),
    document:{querySelector:$,querySelectorAll:()=>[],createElement:node},window:{addEventListener(){}},
    Option:class {constructor(text,value){this.textContent=text;this.value=value;}},
    localStorage:{setItem:(k,v)=>storage.set(k,v),getItem:k=>storage.get(k),removeItem:k=>storage.delete(k)},
    fetch:async(url,options)=>{requests.push({url,method:options?.method||'GET'});return {ok:true,json:async()=>responseJob};},
    setTimeout:(fn,delay)=>{timers.push(delay);return timers.length;},clearTimeout(){}
  };
  const source = (await readFile(new URL('../public/app.js',import.meta.url),'utf8')).replace(/^import .*;\n/gm,'').split('initEffects();switchPage(')[0];
  runInNewContext(source + '\nupdateExtraction=()=>{};updateScene=()=>{};loadHistory=async()=>{};globalThis.app={state,switchKind,currentSettings,setSelected,renderJob,poll};',context);
  const {app}=context;
  app.state.csrf='test-session';app.state.quota={available:true};
  for (const provider of ['api','quota']) for (const subjectType of Object.keys(subjects.SUBJECT_TYPES)) {
    app.state.settings={provider,model:'gpt-image-2',baseURL:'https://image-provider.example/v1',hasApiKey:true};app.state.subjectType=subjectType;
    const before=settings.settingsKey(app.currentSettings());
    for (const kind of ['background','foreground','pose']) {
      app.switchKind(kind);
      assert.equal(settings.settingsKey(app.currentSettings()),before,`${subjectType}/${provider}/${kind}`);
      assert.equal(app.currentSettings().subjectRevision,subjects.SUBJECT_TYPES[subjectType].revision);
    }
    app.switchKind('background');app.setSelected('background','scene-ref');
    assert.equal(app.currentSettings().selections.background,'scene-ref');delete app.state.selections.background;
  }
  app.state.settings.provider='api';app.state.subjectType='human';app.switchKind('foreground');
  for (const status of ['running','completed','failed']) {
    const job={...app.currentSettings(),id:'existing-api-job',status,message:status==='failed'?'API 请求失败（400）：安全系统拒绝。':'任务状态'};
    app.renderJob(job);assert.equal(app.state.generationBusy,status==='running');
    responseJob=job;
  }
  storage.set('character-studio-pending','existing-api-job');
  await app.poll('existing-api-job');
  assert.equal($('#notice').textContent,responseJob.message);
  assert.equal(storage.has('character-studio-pending'),false);
  assert.deepEqual(requests,[{url:'/api/jobs/existing-api-job',method:'GET'}]);
  assert.deepEqual(timers,[]);
});

test('expression previews load before generation, survive avatar races, and keep per-card reroll choices',async()=>{
  const nodes=new Map(),created=[],pending=[],requests=[];
  const node=()=>{const item={value:'',textContent:'',dataset:{},children:[],classList:{toggle(){}},append(...children){this.children.push(...children);},replaceChildren(...children){this.children=children;},setAttribute(){},removeAttribute(){}};created.push(item);return item;};
  const $=selector=>{if(!nodes.has(selector))nodes.set(selector,node());return nodes.get(selector);};
  const context={...settings,...subjects,...effects,...extraction,...providers,...tags,...expressions,...costumeSeries,setupStyleTransfer:()=>({render(){},refresh(){}}),setupCostumeSeries:()=>({}),setupPoseTweens:()=>({}),setupPoseSequences:()=>({}),isPoseSequence:job=>['pose-plan','pose-frame'].includes(job?.outputType),
    document:{querySelector:$,querySelectorAll:selector=>selector==='[data-expression-replace]'?created.filter(item=>item.dataset.expressionReplace):[],createElement:node,createTextNode:text=>({textContent:text})},window:{addEventListener(){}},
    Option:class {constructor(text,value){this.textContent=text;this.value=value;}},localStorage:{getItem(){},setItem(){}},
    fetch:async(url,options)=>{requests.push({url,method:options?.method||'GET'});if(url==='/api/bootstrap')return {ok:true,json:async()=>({catalogs:{}})};return new Promise(resolve=>pending.push({url,resolve}));}
  };
  const source=(await readFile(new URL('../public/app.js',import.meta.url),'utf8')).replace(/^import .*;\n/gm,'').split('initEffects();switchPage(')[0];
  runInNewContext(source+'\nrefreshCategoryUI=()=>{};renderExpressionPicker=()=>{};renderGallery=()=>{};loadHistory=async()=>{};globalThis.app={state,loadExpressions,renderExpressions,updateExpressionControls};',context);
  const {app}=context;app.state.csrf='test';app.state.quota.available=true;
  const result=prefix=>({items:expressions.EXPRESSIONS.map(expression=>({id:expression.id,saved:{id:`${prefix}-${expression.id}`,imageURL:`/${prefix}/${expression.id}.png`},job:{id:`${prefix}-${expression.id}`,status:'completed'}}))});
  const respond=(index,data,ok=true)=>pending[index].resolve({ok,json:async()=>data});
  app.state.expressionFaceId='first';const first=app.loadExpressions();assert.equal($('#expression-start').disabled,true);
  app.state.expressionFaceId='second';const second=app.loadExpressions();assert.equal(pending.length,2);
  respond(1,result('second'));await second;respond(0,result('first'));await first;
  assert.ok(app.state.expressionItems.every(item=>item.saved.id.startsWith('second-')));assert.equal($('#expression-start').disabled,true);assert.match($('#expression-start').textContent,/已齐全/);
  assert.equal(created.filter(item=>item.src?.startsWith('/second/')).length,expressions.EXPRESSIONS.length);assert.match($('#expression-description').textContent,/全套 24 种表情（12 种基础 \+ 12 种强烈）/);assert.ok(requests.every(request=>request.method==='GET'));
  const smile=created.findLast(item=>item.dataset.expressionReplace==='smile');smile.checked=true;smile.onchange();assert.equal($('#expression-start').disabled,false);assert.equal($('#expression-start').textContent,'重抽 1 种表情');
  const refresh=app.loadExpressions();respond(2,result('second'));await refresh;assert.equal(smile.checked,true);assert.deepEqual(Array.from(app.state.expressionReplaceIds),['smile']);
  app.state.expressionFaceId='third';const failed=app.loadExpressions();assert.equal($('#expression-start').disabled,true);assert.equal(app.state.expressionReplaceIds.length,0);respond(3,{error:'模拟读取失败'},false);await assert.rejects(failed,/模拟读取失败/);assert.equal($('#expression-start').disabled,true);
  const retry=app.loadExpressions();const partial=result('third');partial.items[0].saved=null;respond(4,partial);await retry;assert.equal($('#expression-start').disabled,false);assert.equal($('#expression-start').textContent,'补齐 1 种表情');
  assert.ok(requests.every(request=>request.method==='GET'));
});

test('conversion history remains reviewable after changing provider and never appears under another source',async()=>{
  const nodes=new Map(),node=()=>({value:'',textContent:'',dataset:{},classList:{toggle(){}},append(){},replaceChildren(){},setAttribute(){},removeAttribute(){}});
  const $=selector=>{if(!nodes.has(selector))nodes.set(selector,node());return nodes.get(selector);};
  const context={...settings,...subjects,...effects,...extraction,...providers,...tags,...expressions,...costumeSeries,setupStyleTransfer:()=>({render(){},refresh(){}}),setupCostumeSeries:()=>({}),setupPoseTweens:()=>({}),setupPoseSequences:()=>({}),isPoseSequence:job=>['pose-plan','pose-frame'].includes(job?.outputType),document:{querySelector:$,querySelectorAll:()=>[],createElement:node},window:{addEventListener(){}},Option:class {constructor(text,value){this.textContent=text;this.value=value;}},localStorage:{getItem(){},setItem(){}}};
  const source=(await readFile(new URL('../public/app.js',import.meta.url),'utf8')).replace(/^import .*;\n/gm,'').split('initEffects();switchPage(')[0];
  runInNewContext(source+'\nglobalThis.app={state,updateConversion};',context);
  const {app}=context;app.state.csrf='test';app.state.quota.available=true;app.state.conversionSourceId='original';$('#conversion-kind').value='face';$('#conversion-prompt').value='';
  const job={id:'saved',outputType:'resource-conversion',sourceKind:'face',sourceAssetId:'original',sourceHash:'hash',conversionRevision:1,provider:'api',model:'old-model',baseURL:'https://old.example',status:'completed',imageURL:'/saved.png',title:'写实头像',prompt:'',style:'photo',selections:{},characters:[]};
  app.state.conversionJob=job;app.updateConversion();assert.equal($('#conversion-result').hidden,false);assert.equal($('#conversion-import').disabled,false);assert.equal($('#conversion-start').textContent,'制作写实资源');assert.equal($('#conversion-regenerate').hidden,true);
  app.state.settings={provider:'api',model:job.model,baseURL:job.baseURL,hasApiKey:true};app.updateConversion();assert.equal($('#conversion-start').textContent,'制作写实资源');assert.equal($('#conversion-result').hidden,false);assert.equal($('#conversion-import').disabled,false);
  job.conversionRevision=settings.CONVERSION_REVISION-1;app.updateConversion();assert.equal($('#conversion-start').textContent,'制作写实资源');assert.equal($('#conversion-result').hidden,false);
  job.conversionRevision=settings.CONVERSION_REVISION;app.updateConversion();assert.equal($('#conversion-start').textContent,'复用已有写实资源');
  $('#conversion-kind').value='costume';app.updateConversion();assert.equal($('#conversion-result').hidden,true);assert.equal($('#conversion-actions').hidden,true);
  $('#conversion-kind').value='face';$('#conversion-prompt').value='另一个要求';app.updateConversion();assert.equal($('#conversion-result').hidden,true);
});
