import {costumePiecesFor} from './costume-series.js';

export function setupCostumeSeries({state,request,element,assetURL,showImage,canGenerate,selectedID,onResources,onJobs,openPage}) {
  const $=id=>document.getElementById(`series-${id}`),busyJob=job=>['queued','running'].includes(job?.status);
  const labels={queued:'排队中',running:'制作中',completed:'已完成',failed:'失败',interrupted:'已中断',cancelled:'已取消'};
  let plans=[],current='',source='',data=null,busy=false,loading=false,version=0,selected=new Set(),replace=new Set(),signature='',applied='',pending=null;
  try{const draft=JSON.parse(localStorage.getItem('character-studio-series')||'null');if(draft){current=draft.current||'';source=draft.source||'';pending=draft.pending||null;}}catch{}
  const remember=()=>{try{localStorage.setItem('character-studio-series',JSON.stringify({current,source,pending}));}catch{}};
  const status=message=>{$('status').textContent=message;};
  const post=(path,input,id)=>request(path,{method:'POST',headers:{'Content-Type':'application/json',...(id?{'Idempotency-Key':id}:{})},body:JSON.stringify(input)});
  const allSources=()=>[...new Map([...(state.catalogs.costume||[]),...state.uploads.filter(item=>item.kind==='costume')].map(item=>[item.id,item])).values()];
  function picker(){
    const all=allSources(),query=$('search').value.trim().toLowerCase();
    if(!source)source=selectedID('costume')||all[0]?.id||'';
    const list=all.filter(item=>item.id===source||[item.title,item.id,...(item.tags||[])].join(' ').toLowerCase().includes(query));
    $('source').replaceChildren(new Option('请选择原衣物',''),...list.map(item=>new Option(item.title,item.id)));$('source').value=source;
    $('reference').hidden=!source;if(source)$('reference').src=assetURL('costume',source,false);
    $('saved').replaceChildren(new Option('新建系列',''),...plans.map(plan=>new Option(`${plan.title} · ${labels[plan.status]} · ${new Date(plan.createdAt).toLocaleString('zh-CN')}`,plan.id)));$('saved').value=current;
    controls();
  }
  function controls(){
    recover.hidden=!pending;
    for(const id of ['source','search','upload','title','prompt','current','saved'])$(id).disabled=busy;
    $('current').disabled=busy||!selectedID('costume');
    $('plan-start').disabled=busy||!source||!canGenerate();
    $('plan-start').textContent=busy?'正在提交…':'制作系列设计方案';
    const items=data?.items||[],selectedItems=items.filter(item=>selected.has(item.id));
    const fresh=selectedItems.filter(item=>!item.saved&&!busyJob(item.job)).length,redraw=selectedItems.filter(item=>replace.has(item.id)).length;
    $('pieces-start').disabled=busy||data?.plan?.status!=='completed'||!canGenerate()||(!fresh&&!redraw)||selectedItems.some(item=>replace.has(item.id)&&busyJob(item.job));
    $('pieces-start').textContent=redraw?`补齐 ${fresh} 款 + 重做 ${redraw} 款`:`确认方案，制作 ${fresh} 款新衣`;
    $('summary').textContent=`已有 ${items.filter(item=>item.saved).length} / ${costumePiecesFor(data?.plan).length} 款 · ${items.filter(item=>busyJob(item.job)).length} 款正在排队或制作。已有且未勾选重做的款不再提交。`;
    document.querySelectorAll('#series-pieces input').forEach(input=>input.disabled=busy||(input.dataset.replace&&busyJob(items.find(item=>item.id===input.dataset.replace)?.job)));
  }
  function action(text,fn,container,cls='secondary'){
    const button=element('button',cls,text);button.type='button';button.onclick=()=>void run(fn);container.append(button);return button;
  }
  async function run(fn){
    if(busy)return;busy=true;status('');controls();
    try{await fn();}catch(error){status(error.message);}finally{busy=false;controls();}
  }
  function image(job,label,container){
    const button=element('button','expression-image');button.type='button';button.setAttribute('aria-label',`查看${label}`);
    const img=element('img');img.src=job.imageURL;img.alt=label;button.append(img);button.onclick=()=>showImage(job.imageURL,label);container.append(button);
    const download=element('a','text-button','下载');download.href=job.imageURL+'?download=1';download.download='';container.append(download);
  }
  function render(){
    const plan=data?.plan;picker();$('plan-preview').replaceChildren();$('plan-actions').replaceChildren();$('pieces').replaceChildren();
    $('plan-status').textContent=plan?`${plan.title} · ${labels[plan.status]}：${plan.message}`:'选择原衣物，先制作系列设计方案。';
    $('plan-preview').hidden=!plan?.imageURL;if(plan?.imageURL)image(plan,'系列设计方案',$('plan-preview'));
    if(plan?.status==='queued')action('取消方案排队',async()=>{await post(`/api/jobs/${plan.id}/cancel`,{});await refresh(true);},$('plan-actions'));
    if(plan?.status==='completed')action('重新制作方案（新系列）',()=>submitPlan(true),$('plan-actions'));
    $('pieces-panel').hidden=plan?.status!=='completed';
    $('pieces-help').textContent=plan&&(plan.seriesRevision??1)<2?'这是按服饰类别制作的旧方案，已有结果继续保留。点击“重新制作方案”可从原衣物推导同主题的六款新设计。':'方案板已经规划六款同主题新衣，可以同类也可以跨类别。按编号勾选喜欢的款式；每款都会同时参考原衣物与这份方案。已有款仅在勾选“重做”时重新制作。';
    for(const spec of costumePiecesFor(plan)){
      const item=data?.items.find(item=>item.id===spec.id),job=item?.job,saved=item?.saved,card=element('article','expression-card');
      const label=element('label','check-label'),check=element('input');check.type='checkbox';check.checked=selected.has(spec.id);check.setAttribute('aria-label',`选择${spec.label}`);
      check.onchange=()=>{check.checked?selected.add(spec.id):selected.delete(spec.id);if(!check.checked){replace.delete(spec.id);const box=card.querySelector('[data-replace]');if(box)box.checked=false;}controls();};label.append(check,document.createTextNode(spec.label));card.append(label);
      if(saved){
        image(saved,spec.label,card);
        const rerollLabel=element('label','check-label'),reroll=element('input');reroll.type='checkbox';reroll.dataset.replace=spec.id;reroll.checked=replace.has(spec.id);reroll.setAttribute('aria-label',`重做${spec.label}`);
        reroll.onchange=()=>{if(reroll.checked){replace.add(spec.id);selected.add(spec.id);check.checked=true;}else replace.delete(spec.id);controls();};rerollLabel.append(reroll,document.createTextNode('重做（保留旧图）'));card.append(rerollLabel);
        if(saved.resourceId)card.append(element('p','muted','已入库 · '+(spec.partKind?'衣服下属小件':'衣服资源')));
        else action('审核通过，入库',async()=>{const resource=await post(`/api/jobs/${saved.id}/import`,{title:saved.title});await onResources(resource);await refresh(true);},card);
      }else card.append(element('div','expression-placeholder',job?labels[job.status]:'待制作'));
      if(job)card.append(element('p','muted',`${labels[job.status]} · ${job.message}`));
      if(job?.status==='queued')action('取消排队',async()=>{await post(`/api/jobs/${job.id}/cancel`,{});await refresh(true);},card);
      $('pieces').append(card);
    }
    controls();remember();
  }
  async function refresh(force=false){
    if(loading)return;loading=true;const ticket=version;
    try{
      const nextPlans=await request('/api/costume-series');
      if(ticket!==version)return;
      if(current&&!nextPlans.some(plan=>plan.id===current)){current='';selected.clear();replace.clear();applied='';remember();}
      const nextData=current?await request(`/api/costume-series/${current}`):null;
      if(ticket!==version)return;
      plans=nextPlans;data=nextData;
      if(data&&applied!==current){source=data.plan.sourceAssetId;$('title').value=data.plan.title;$('prompt').value=data.plan.prompt;applied=current;}
      const nextSignature=JSON.stringify({plans:plans.map(p=>[p.id,p.status,p.message]),data,settings:state.settings});
      if(force||signature!==nextSignature){signature=nextSignature;render();}
    }catch(error){status(`读取系列失败：${error.message}。未提交新任务。`);}finally{loading=false;if(ticket!==version)void refresh(true);}
  }
  function choose(id){
    current=id;data=null;version++;signature='';applied='';selected.clear();replace.clear();
    const plan=plans.find(plan=>plan.id===id);if(plan){source=plan.sourceAssetId;$('title').value=plan.title;$('prompt').value=plan.prompt;}
    remember();render();void refresh(true);
  }
  async function submit(path,payload){
    // Keep the request ID across a lost response or a page reload.
    if(pending&&(pending.path!==path||JSON.stringify(pending.payload)!==JSON.stringify(payload)))throw new Error('上次提交结果尚未确认，请先点击“核对上次提交”。');
    pending||={id:crypto.randomUUID(),path,payload};remember();
    try{const result=await post(path,payload,pending.id);pending=null;remember();return result;}catch(error){if(error.status>=400&&error.status<500){pending=null;remember();}throw error;}
  }
  async function submitPlan(regenerate=false){
    const payload={outputType:'costume-plan',sourceAssetId:source,prompt:$('prompt').value.trim(),...($('title').value.trim()?{title:$('title').value.trim()}:{}),regenerate};
    const plan=await submit('/api/jobs',payload);plans=[plan,...plans.filter(p=>p.id!==plan.id)];choose(plan.id);await onJobs();status('设计方案已保存到队列，完成后查看方案板并按编号选择款式。');
  }
  $('form').onsubmit=event=>{event.preventDefault();void run(()=>submitPlan());};
  $('pieces-start').onclick=()=>void run(async()=>{
    const pieceIds=data.items.filter(item=>selected.has(item.id)&&(!item.saved||replace.has(item.id))).map(item=>item.id);
    const result=await submit('/api/costume-series',{seriesId:current,pieceIds,replacePieces:[...replace].filter(id=>pieceIds.includes(id))});
    replace.clear();await refresh(true);await onJobs();status(`已提交 ${result.count} 款。可在这里或生产队列查看进度。`);
  });
  $('source').onchange=()=>{source=$('source').value;current='';version++;data=null;selected.clear();replace.clear();$('title').value='';$('prompt').value='';render();};
  $('search').oninput=picker;$('saved').onchange=()=>choose($('saved').value);
  $('current').onclick=()=>{source=selectedID('costume');const original=allSources().find(item=>item.id===source);if(original?.series?.id){choose(original.series.id);return;}current='';data=null;version++;selected.clear();replace.clear();$('title').value='';$('prompt').value='';render();};
  $('upload').onchange=()=>void run(async()=>{
    const file=$('upload').files[0];if(!file)return;
    const item=await request('/api/uploads/costume',{method:'POST',headers:{'X-File-Name':encodeURIComponent(file.name)},body:file});
    await onResources(item);source=item.id;current='';data=null;version++;selected.clear();replace.clear();$('title').value='';$('prompt').value='';$('upload').value='';render();
  });
  $('refresh').onclick=()=>void refresh(true);
  const recover=element('button','text-button','核对上次提交');recover.type='button';$('form').append(recover);
  recover.onclick=()=>void run(async()=>{
    if(!pending){status('没有待确认的提交。');return;}
    const {path,payload}=pending,result=await submit(path,payload);
    if(path==='/api/jobs'){plans=[result,...plans.filter(p=>p.id!==result.id)];choose(result.id);}else choose(result.seriesId);
    await onJobs();status('已核对上次提交，沿用原请求编号，没有重复提交。');
  });
  return {
    enter(){picker();void refresh(true);},
    refresh:()=>refresh(),
    open(job){const id=job.outputType==='costume-plan'?job.id:job.seriesId;openPage();choose(id);}
  };
}
