import {tweenRequest,MAX_TWEEN_FRAMES} from './pose-tweens.js';

export function setupPoseTweens({state,request,element,assetURL,showImage,canGenerate,onResources,onJobs,openPage}){
  const $=id=>document.getElementById(`tween-${id}`),labels={queued:'排队中',running:'制作中',completed:'已完成',failed:'失败',interrupted:'已中断',cancelled:'已取消'};
  let startPoseId='',endPoseId='',count=5,current='',data=null,records=[],pending=null,busy=false,loading=false,version=0,signature='';
  try{const saved=JSON.parse(localStorage.getItem('character-studio-tweens')||'null');if(saved){({startPoseId='',endPoseId='',count=5,current='',pending=null}=saved);}}catch{}
  const remember=()=>{try{localStorage.setItem('character-studio-tweens',JSON.stringify({startPoseId,endPoseId,count,current,pending}));}catch{}};
  const post=(path,body,id)=>request(path,{method:'POST',headers:{'Content-Type':'application/json',...(id?{'Idempotency-Key':id}:{})},body:JSON.stringify(body)});
  const allSources=()=>[...new Map([...(state.catalogs.pose||[]),...state.uploads.filter(item=>item.kind==='pose')].map(item=>[item.id,item])).values()];
  function controls(){
    let issue='';try{tweenRequest({startPoseId,endPoseId,count});}catch(error){issue=error.message;}
    for(const id of ['start','end','search','count','upload-start','upload-end','saved'])$(id).disabled=busy||!!pending;
    $('submit').disabled=busy||!!pending||!!issue||!canGenerate();$('recover').hidden=!pending;$('recover').disabled=busy;
    $('submit').textContent=`生成 / 补齐 ${Number.isInteger(count)?count:'—'} 张补间`;
    $('count-help').textContent=issue||`${count} 张新骨架 + 2 张首尾 = ${count+2} 张顺序图。相同配置复用已有帧，失败或取消后可补齐。`;
  }
  function picker(){
    const query=$('search').value.trim().toLowerCase(),all=allSources();
    for(const [side,id] of [['start',startPoseId],['end',endPoseId]]){
      const items=all.filter(item=>item.id===id||[item.id,item.title,item.category,item.keywords,...(item.tags||[])].join(' ').toLowerCase().includes(query));
      $(side).replaceChildren(new Option(`请选择${side==='start'?'起始':'结束'}骨架`,''),...items.map(item=>new Option(item.title,item.id)));$(side).value=id;
      const img=$(`${side}-preview`);img.hidden=!id;if(id)img.src=assetURL('pose',id,false);else img.removeAttribute('src');
    }
    $('count').max=MAX_TWEEN_FRAMES;
    $('saved').replaceChildren(new Option('新建补间',''),...records.map(record=>new Option(`${record.name} · ${record.count} 张 · ${new Date(record.createdAt).toLocaleString('zh-CN')}`,record.id)));$('saved').value=current;
    controls();
  }
  const action=(label,fn,container)=>{const button=element('button','secondary',label);button.type='button';button.onclick=()=>void run(fn);container.append(button);return button;};
  function picture(url,label,container){const button=element('button','expression-image');button.type='button';button.setAttribute('aria-label',`查看${label}`);const image=element('img');image.src=url;image.alt=label;button.append(image);button.onclick=()=>showImage(url,label);container.append(button);}
  function render(){
    picker();const result=$('frames');result.replaceChildren();
    if(!data){$('summary').textContent='完成后按“起始 → 补间 → 结束”的顺序查看与入库。';return;}
    const items=data.items||[];
    $('summary').textContent=`已完成 ${items.filter(job=>job.status==='completed').length} / ${data.count} 张补间；首尾共 ${data.count+2} 张。`;
    const endpoint=(id,label)=>{const card=element('article','expression-card');card.append(element('strong','',label));picture(assetURL('pose',id,false),label,card);result.append(card);};
    endpoint(data.startPoseId,'起始 · 0%');
    for(const job of items){
      const card=element('article','expression-card'),label=`补间 ${job.frameIndex} / ${job.count} · ${(100*job.frameIndex/(job.count+1)).toFixed(1)}%`;
      card.append(element('strong','',label));
      if(job.imageURL){
        picture(job.imageURL,label,card);const download=element('a','text-button','下载');download.href=job.imageURL+'?download=1';download.download='';card.append(download);
        if(job.resourceId)card.append(element('p','muted','已入骨架库'));
        else action('审核通过，入库',async()=>{await onResources(await post(`/api/jobs/${job.id}/import`,{title:job.title}));await refresh(true);},card);
      }else card.append(element('div','expression-placeholder',labels[job.status]||'待制作'));
      card.append(element('p','muted',`${labels[job.status]||'未知状态'} · ${job.message||''}`));
      if(job.status==='queued')action('取消此帧排队',async()=>{await post(`/api/jobs/${job.id}/cancel`,{});await refresh(true);await onJobs();},card);
      result.append(card);
    }
    endpoint(data.endPoseId,'结束 · 100%');
  }
  async function refresh(force=false){
    if(loading)return;loading=true;const ticket=version;
    try{
      const next=await request('/api/pose-tweens');if(ticket!==version)return;
      if(current&&!next.some(record=>record.id===current)){current='';data=null;remember();}
      const detail=current?await request(`/api/batches/${current}`):null;if(ticket!==version)return;
      records=next;data=detail;
      const nextSignature=JSON.stringify({records,data,provider:state.settings});
      if(force||signature!==nextSignature){signature=nextSignature;render();}
    }catch(error){$('status').textContent=`读取补间失败：${error.message}。没有重新提交。`;}
    finally{loading=false;if(ticket!==version)void refresh(true);}
  }
  async function run(fn){if(busy)return;busy=true;$('status').textContent='';controls();try{await fn();}catch(error){$('status').textContent=error.message;}finally{busy=false;controls();}}
  async function submit(){
    pending||={id:crypto.randomUUID(),payload:tweenRequest({startPoseId,endPoseId,count})};remember();
    let result;
    try{result=await post('/api/pose-tweens',pending.payload,pending.id);}catch(error){if(error.status>=400&&error.status<500){pending=null;remember();}throw error;}
    pending=null;current=result.id;data=result;version++;remember();render();await refresh(true);await onJobs();
    $('status').textContent=`已保存 ${result.count} 帧的补间批次。可查看进度，或取消尚未开始的帧。`;
  }
  function edit(){current='';data=null;version++;remember();render();}
  $('form').onsubmit=event=>{event.preventDefault();void run(submit);};$('recover').onclick=()=>void run(submit);
  $('start').onchange=()=>{startPoseId=$('start').value;edit();};$('end').onchange=()=>{endPoseId=$('end').value;edit();};
  $('count').oninput=()=>{count=Number($('count').value);edit();};$('search').oninput=picker;
  $('saved').onchange=()=>{current=$('saved').value;data=null;version++;const record=records.find(item=>item.id===current);if(record)({startPoseId,endPoseId,count}=record);$('count').value=count;remember();render();void refresh(true);};
  for(const side of ['start','end'])$(`upload-${side}`).onchange=()=>void run(async()=>{
    const input=$(`upload-${side}`),file=input.files[0];if(!file)return;if(file.size>20*1024*1024)throw new Error('图片需小于 20 MB。');
    const item=await request('/api/uploads/pose',{method:'POST',headers:{'Content-Type':file.type,'X-File-Name':encodeURIComponent(file.name)},body:file});
    await onResources(item);if(side==='start')startPoseId=item.id;else endPoseId=item.id;input.value='';edit();
  });
  $('refresh').onclick=()=>void refresh(true);
  return {enter(){$('count').value=count;picker();void refresh(true);},refresh:()=>refresh(),open(job){({startPoseId,endPoseId,count}=job);$('count').value=count;current=job.batchId||'';data=null;version++;remember();openPage();render();void refresh(true);}};
}
