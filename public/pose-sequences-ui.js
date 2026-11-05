import {sequenceRequest,MAX_SEQUENCE_FRAMES} from './pose-sequences.js';

export function setupPoseSequences({state,request,element,assetURL,showImage,canGenerate,onResources,onJobs,openPage}){
  const $=id=>document.getElementById(`motion-${id}`),labels={queued:'排队中',running:'制作中',completed:'已完成',failed:'失败',interrupted:'已中断',cancelled:'已取消'};
  let draft={stylePoseId:'',startPoseId:'',endPoseId:'',action:'',count:8},current='',plans=[],data=null,pending=null,busy=false,loading=false,version=0,signature='',timer=null,playIndex=0;
  try{const saved=JSON.parse(localStorage.getItem('character-studio-motion')||'null');if(saved){draft={...draft,...saved.draft};current=saved.current||'';pending=saved.pending||null;}}catch{}
  const remember=()=>{try{localStorage.setItem('character-studio-motion',JSON.stringify({draft,current,pending}));}catch{}};
  const post=(path,payload,id)=>request(path,{method:'POST',headers:{'Content-Type':'application/json',...(id?{'Idempotency-Key':id}:{})},body:JSON.stringify(payload)});
  const allSources=()=>[...new Map([...(state.catalogs.pose||[]),...state.uploads.filter(item=>item.kind==='pose')].map(item=>[item.id,item])).values()];
  function fill(){for(const id of ['action','count'])$(id).value=draft[id];}
  function controls(){
    let issue='';try{sequenceRequest(draft);}catch(error){issue=error.message;}
    const locked=busy||!!pending;
    for(const id of ['style','start','end','action','count','search','saved','upload-style','upload-start','upload-end'])$(id).disabled=locked;
    $('plan-start').disabled=locked||!!issue||!canGenerate();$('frames-start').disabled=locked||data?.plan?.status!=='completed'||!canGenerate();
    $('recover').hidden=!pending;$('recover').disabled=busy;
    $('help').textContent=issue||`整段 ${draft.count} 帧，包含 ${Number(!!draft.startPoseId)+Number(!!draft.endPoseId)} 张已提供的首尾。先制作 1 张动作方案，再制作缺失帧，均使用设置中的出图通道。`;
    $('frames-start').textContent=`确认方案，生成 / 补齐 ${data?.plan?.count||draft.count} 帧序列`;
  }
  function picker(){
    const query=$('search').value.trim().toLowerCase(),all=allSources();
    for(const [side,key] of [['style','stylePoseId'],['start','startPoseId'],['end','endPoseId']]){
      const id=draft[key],items=all.filter(item=>item.id===id||[item.title,item.id,item.category,...(item.tags||[])].join(' ').toLowerCase().includes(query));
      $(side).replaceChildren(new Option(side==='style'?'自动：沿用首尾或库内默认画法':'不提供，由动作方案决定',''),...items.map(item=>new Option(item.title,item.id)));$(side).value=id;
      $(`${side}-preview`).hidden=!id;if(id)$(`${side}-preview`).src=assetURL('pose',id,false);else $(`${side}-preview`).removeAttribute('src');
    }
    $('saved').replaceChildren(new Option('新建动作序列',''),...plans.map(plan=>new Option(`${plan.title} · ${plan.count} 帧 · ${labels[plan.status]} · ${new Date(plan.createdAt).toLocaleString('zh-CN')}`,plan.id)));$('saved').value=current;
    $('count').max=MAX_SEQUENCE_FRAMES;controls();
  }
  const action=(text,fn,parent)=>{const button=element('button','secondary',text);button.type='button';button.onclick=()=>void run(fn);parent.append(button);return button;};
  function picture(url,label,parent){const button=element('button','expression-image');button.type='button';button.setAttribute('aria-label',`查看${label}`);const img=element('img');img.src=url;img.alt=label;button.append(img);button.onclick=()=>showImage(url,label);parent.append(button);}
  const frameURL=item=>item.assetId?`/api/pose-sequences/${current}/${item.frameIndex===1?'start':'end'}`:item.saved?.imageURL;
  function stop(){clearInterval(timer);timer=null;$('play').textContent='逐格播放';$('play').setAttribute('aria-pressed','false');}
  function showFrame(index){const items=data?.items||[];playIndex=index;$('scrub').value=index;if(!items[index])return;$('play-image').src=frameURL(items[index]);$('play-label').textContent=`第 ${index+1} / ${items.length} 帧`;$('play-image').alt=$('play-label').textContent;}
  function render(){
    stop();picker();const plan=data?.plan;for(const id of ['plan-preview','plan-actions','frames'])$(id).replaceChildren();
    $('plan-status').textContent=plan?`${plan.title} · ${labels[plan.status]}：${plan.message}`:'填写动作，先查看整段动作方案。';
    $('plan-preview').hidden=!plan?.imageURL;if(plan?.imageURL)picture(plan.imageURL,'动作方案',$('plan-preview'));
    if(plan?.status==='queued')action('取消方案排队',async()=>{await post(`/api/jobs/${plan.id}/cancel`,{});await refresh(true);await onJobs();},$('plan-actions'));
    if(plan?.status==='completed')action('重新制作方案（保留旧序列）',()=>submitPlan(true),$('plan-actions'));
    $('results').hidden=!plan;$('frames-start').hidden=plan?.status!=='completed';
    const items=data?.items||[],ready=items.filter(item=>frameURL(item)).length;
    $('summary').textContent=plan?`${ready} / ${plan.count} 帧可查看（含已提供首尾）。相同配置复用已有帧，失败或取消后可补齐。`:'';
    $('playback').hidden=!items.length||ready!==items.length;$('scrub').max=Math.max(0,items.length-1);if(items.length&&ready===items.length)showFrame(Math.min(playIndex,items.length-1));
    for(const item of items){
      const card=element('article','expression-card'),job=item.job,saved=item.saved,label=`第 ${item.frameIndex} / ${plan.count} 帧 · ${((item.frameIndex-1)*100/(plan.count-1)).toFixed(1)}%`;
      card.append(element('strong','',label));const url=frameURL(item);
      if(url){picture(url,label,card);const link=element('a','text-button','下载');link.href=url+(item.assetId?'':'?download=1');link.download='';card.append(link);}
      else card.append(element('div','expression-placeholder',job?labels[job.status]:'待制作'));
      if(item.assetId)card.append(element('p','muted','已提供的首尾 · 沿用原图'));
      else if(saved){if(saved.resourceId)card.append(element('p','muted','已入骨架库'));else action('审核通过，入库',async()=>{await onResources(await post(`/api/jobs/${saved.id}/import`,{title:saved.title}));await refresh(true);},card);}
      if(job)card.append(element('p','muted',`${labels[job.status]} · ${job.message}`));
      if(job?.status==='queued')action('取消此帧排队',async()=>{await post(`/api/jobs/${job.id}/cancel`,{});await refresh(true);await onJobs();},card);
      $('frames').append(card);
    }
    controls();
  }
  async function refresh(force=false){
    if(loading)return;loading=true;const ticket=version;
    try{
      const nextPlans=await request('/api/pose-sequences');if(ticket!==version)return;
      if(current&&!nextPlans.some(plan=>plan.id===current)){current='';data=null;remember();}
      const nextData=current?await request(`/api/pose-sequences/${current}`):null;if(ticket!==version)return;
      plans=nextPlans;data=nextData;const next=JSON.stringify({plans,data,settings:state.settings});if(force||signature!==next){signature=next;render();}
    }catch(error){$('status').textContent=`读取动作序列失败：${error.message}。没有重新提交。`;}finally{loading=false;if(ticket!==version)void refresh(true);}
  }
  async function run(fn){if(busy)return;busy=true;$('status').textContent='';controls();try{await fn();}catch(error){$('status').textContent=error.message;}finally{busy=false;controls();}}
  function choose(plan){current=plan?.id||'';if(plan)draft=sequenceRequest(plan);data=null;version++;remember();fill();render();void refresh(true);}
  async function submit(path,payload){
    if(pending&&(pending.path!==path||JSON.stringify(pending.payload)!==JSON.stringify(payload)))throw new Error('请先核对上次提交，再开始新任务。');
    pending||={id:crypto.randomUUID(),path,payload};remember();
    try{const result=await post(path,payload,pending.id);pending=null;remember();return result;}catch(error){if(error.status>=400&&error.status<500){pending=null;remember();}throw error;}
  }
  async function finish(result,path){
    if(path==='/api/jobs'){plans=[result,...plans.filter(plan=>plan.id!==result.id)];choose(result);$('status').textContent='动作方案已进入队列。完成后请先检查动作顺序、首尾与支撑关系，再制作独立帧。';}
    else{current=result.planId;version++;remember();await refresh(true);$('status').textContent='独立帧已进入队列；已提供首尾与相同配置的成图会复用。';}
    await onJobs();
  }
  async function submitPlan(regenerate=false){const path='/api/jobs',result=await submit(path,{...sequenceRequest(draft),outputType:'pose-plan',regenerate});await finish(result,path);}
  function edit(){current='';data=null;version++;remember();render();}
  $('form').onsubmit=event=>{event.preventDefault();void run(()=>submitPlan());};
  $('frames-start').onclick=()=>void run(async()=>{if(!current)throw new Error('请先选择动作方案。');await finish(await submit('/api/pose-sequences',{planId:current}),'/api/pose-sequences');});
  $('recover').onclick=()=>void run(async()=>{if(pending){const {path,payload}=pending;await finish(await submit(path,payload),path);}});
  for(const [side,key] of [['style','stylePoseId'],['start','startPoseId'],['end','endPoseId']]){
    $(side).onchange=()=>{draft[key]=$(side).value;edit();};
    $(`upload-${side}`).onchange=()=>void run(async()=>{const input=$(`upload-${side}`),file=input.files[0];if(!file)return;if(file.size>20*1024*1024)throw new Error('图片需小于 20 MB。');const item=await request('/api/uploads/pose',{method:'POST',headers:{'Content-Type':file.type,'X-File-Name':encodeURIComponent(file.name)},body:file});await onResources(item);draft[key]=item.id;input.value='';edit();});
  }
  $('action').oninput=()=>{draft.action=$('action').value;edit();};$('count').oninput=()=>{draft.count=Number($('count').value);edit();};$('search').oninput=picker;
  $('saved').onchange=()=>choose(plans.find(plan=>plan.id===$('saved').value));$('refresh').onclick=()=>void refresh(true);
  $('play').onclick=()=>{if(timer){stop();return;}if(playIndex===data.items.length-1)showFrame(0);$('play').textContent='暂停';$('play').setAttribute('aria-pressed','true');timer=setInterval(()=>{if(state.resourceMode!=='pose-sequences'){stop();return;}showFrame(playIndex+1);if(playIndex===data.items.length-1)stop();},300);};
  $('scrub').oninput=()=>{stop();showFrame(Number($('scrub').value));};
  return {enter(){fill();picker();void refresh(true);},refresh:()=>refresh(),open(job){current=job.planId||job.id;draft=sequenceRequest(job);data=null;version++;remember();fill();openPage();render();void refresh(true);}};
}
