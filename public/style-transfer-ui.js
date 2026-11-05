import {settingsKey,STYLE_REVISIONS,STYLE_TRANSFER_REVISION} from './job-settings.js';
import {effectFor} from './effects.js';
import {providerLabel} from './providers.js';

export function setupStyleTransfer({state,request,assetURL,showImage,canGenerate,connectionSettings,syncEffects,onJobs,openPage}){
  const $=id=>document.getElementById(`transfer-${id}`),fields=['style','effect','size','quality','prompt'];
  let sourceId='',job=null,pending=null,busy=false,loading=false,initialized=false;
  const input=()=>({outputType:'style-transfer',sourceId,...Object.fromEntries(fields.map(key=>[key,$(key).value])),background:'opaque'});
  const remember=()=>{try{localStorage.setItem('character-studio-transfer',JSON.stringify({...input(),jobId:job?.id,pending}));}catch{}};
  function matches(candidate,connection=true){
    if(candidate?.outputType!=='style-transfer')return false;
    return settingsKey(candidate)===settingsKey({...candidate,...input(),...(connection?{...connectionSettings(),transferRevision:STYLE_TRANSFER_REVISION,styleRevision:STYLE_REVISIONS[$('style').value],effectRevision:effectFor($('effect').value)?.revision||0}:{})});
  }
  function render(){
    if(!initialized)return;
    const candidates=[job,...state.jobs].filter(candidate=>matches(candidate));
    const waiting=candidates.find(item=>['queued','running'].includes(item.status));
    const saved=candidates.find(item=>item.status==='completed'&&item.imageURL);
    const current=matches(job,false)?job:null,shown=current?.status==='completed'?current:saved;
    const locked=busy||!!pending;
    for(const key of [...fields,'upload'])$(key).disabled=locked;
    $('start').disabled=locked||!sourceId||!!waiting||!canGenerate();
    $('start').textContent=busy?'正在处理…':waiting?'已在生产队列':saved?'查看已有成图':'生成风格图片';
    $('regenerate').hidden=!saved;$('regenerate').disabled=locked||!!waiting||!canGenerate();
    $('recover').hidden=!pending;$('recover').disabled=busy;
    $('cancel').hidden=waiting?.status!=='queued';$('cancel').disabled=busy;
    $('cancel').onclick=()=>void run(async()=>{job=await post(`/api/jobs/${waiting.id}/cancel`,{});await onJobs();});
    $('source').hidden=!sourceId;if(sourceId)$('source').src=assetURL('source',sourceId,false);else $('source').removeAttribute('src');
    $('source-empty').hidden=!!sourceId;
    $('result').hidden=!shown;$('empty').hidden=!!shown;$('actions').hidden=!shown;
    if(shown){$('result').src=shown.imageURL;$('download').href=shown.imageURL+'?download=1';$('zoom').onclick=()=>showImage(shown.imageURL,'照片转风格');}
    else{$('result').removeAttribute('src');$('download').removeAttribute('href');}
    $('progress').textContent=(waiting||current||saved)?.message||'上传一张照片，选择目标画风。相同照片与完整配置会复用已有成图。';
    $('channel').textContent=`出图通道：${providerLabel(state.settings)}。沿用设置页；每次新生成会消耗对应额度。`;
  }
  const post=(path,body,id)=>request(path,{method:'POST',headers:{'Content-Type':'application/json',...(id?{'Idempotency-Key':id}:{})},body:JSON.stringify(body)});
  async function run(fn){if(busy)return;busy=true;$('error').textContent='';render();try{await fn();}catch(error){$('error').textContent=error.message;}finally{busy=false;remember();render();}}
  async function submit(regenerate=false){
    // Keep the request identity across ambiguous network failures and page reloads.
    pending||={id:crypto.randomUUID(),payload:{...input(),regenerate}};remember();
    try{job=await post('/api/jobs',pending.payload,pending.id);}catch(error){if(error.status>=400&&error.status<500)pending=null;throw error;}
    pending=null;remember();await onJobs();
  }
  async function refresh(){
    if(!initialized||loading||busy)return;
    if(!job||!['queued','running'].includes(job.status)){render();return;}
    loading=true;const id=job.id;
    try{const latest=await request(`/api/jobs/${id}`);if(job?.id!==id)return;job=latest;render();if(!['queued','running'].includes(latest.status))await onJobs();}
    catch(error){$('error').textContent=`暂时无法读取进度：${error.message}。不会重新提交。`;}
    finally{loading=false;}
  }
  $('form').onsubmit=event=>{event.preventDefault();void run(()=>submit(event.submitter?.id==='transfer-regenerate'));};
  $('recover').onclick=()=>void run(()=>submit());
  $('upload').onchange=()=>void run(async()=>{
    const file=$('upload').files[0];if(!file)return;if(file.size>20*1024*1024)throw new Error('图片需小于 20 MB。');
    const source=await request('/api/uploads/source',{method:'POST',headers:{'Content-Type':file.type,'X-File-Name':encodeURIComponent(file.name)},body:file});
    sourceId=source.id;job=null;$('upload').value='';
  });
  for(const key of fields)$(key).addEventListener(key==='prompt'?'input':'change',()=>{
    if(key==='style')syncEffects();else if(key==='effect')syncEffects($('effect').value);
    job=null;$('error').textContent='';remember();render();
  });
  return {
    init(){
      initialized=true;
      $('style').value='watercolor';syncEffects('none');
      try{const saved=JSON.parse(localStorage.getItem('character-studio-transfer')||'null');if(saved){sourceId=typeof saved.sourceId==='string'?saved.sourceId:'';for(const key of fields)if(typeof saved[key]==='string')$(key).value=saved[key];syncEffects(saved.effect);pending=saved.pending||null;job=state.jobs.find(item=>item.id===saved.jobId)||null;}}catch{}
      render();
    },render,refresh,
    open(item){if(pending){openPage();$('error').textContent='请先恢复上次未确认的提交，再加载另一张图片。';return;}sourceId=item.sourceId;job=item;for(const key of fields)$(key).value=item[key]||'';syncEffects(item.effect);remember();openPage();render();}
  };
}
