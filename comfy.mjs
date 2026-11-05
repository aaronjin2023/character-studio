import { readFile } from 'node:fs/promises';
import { randomUUID, randomInt, createHash } from 'node:crypto';
import { setTimeout as delay } from 'node:timers/promises';
import { boundedBytes, imageType } from './catalog.mjs';

export function serviceURL(value, allowHTTP=false) {
  let url;try{url=new URL(value);}catch{throw new Error('服务地址无效。');}
  if(!(allowHTTP?['http:','https:']:['https:']).includes(url.protocol)||url.username||url.password||url.search||url.hash)throw new Error('服务地址不能包含账号、查询参数或片段；云端 API 必须使用 HTTPS。');
  return url.href.replace(/\/+$/,'');
}
export function validateComfyConnection(value) {
  if(!value||!['bearer','x-api-key'].includes(value.authHeader)||typeof value.workflowHash!=='string'||!/^[a-f0-9]{64}$/.test(value.workflowHash))throw new Error('请先在设置中配置 ComfyUI 工作流。');
  return {baseURL:serviceURL(value.baseURL,true),authHeader:value.authHeader,workflowHash:value.workflowHash,requiresToken:value.requiresToken===true};
}
export function validateWorkflows(value) {
  if(!value||Array.isArray(value)||typeof value!=='object'||!Object.keys(value).length||JSON.stringify(value).length>500000)throw new Error('请提供 500 KB 以内的工作流配置。');
  for(const [count,entry] of Object.entries(value)) {
    if(!/^(?:[0-9]|[12][0-9])$/.test(count)||!entry?.workflow||Array.isArray(entry.workflow)||typeof entry.outputNode!=='string'||!Object.hasOwn(entry.workflow,entry.outputNode))throw new Error('工作流按参考图数量编号（0–29），每项需包含 workflow 和 outputNode。');
    for(const node of Object.values(entry.workflow))if(!node||typeof node.class_type!=='string'||!node.inputs||typeof node.inputs!=='object'||Array.isArray(node.inputs))throw new Error('需要 ComfyUI 导出的 API 格式工作流，不是画布格式 JSON。');
    const tokens=new Set();
    function inspect(v,key='',collect=true) {
      if(/(?:api[_-]?key|password|authorization|access[_-]?token|auth[_-]?token)/i.test(key)&&v)throw new Error('工作流不能包含密钥，请使用单独的 ComfyUI 鉴权输入框。');
      if(typeof v==='string')for(const match of v.matchAll(/\{\{([^{}]+)\}\}/g)){if(!/^(prompt|width|height|seed|background|quality|image[1-9][0-9]?)$/.test(match[1]))throw new Error(`工作流占位符无效：${match[1]}`);if(match[1].startsWith('image')&&Number(match[1].slice(5))>Number(count))throw new Error(`工作流 ${count} 引用了多余的参考图。`);if(collect)tokens.add(match[1]);}
      else if(v&&typeof v==='object')for(const [k,child] of Object.entries(v))inspect(child,k,collect);
    }
    for(const node of Object.values(entry.workflow))inspect(node.inputs,'',false);
    const visited=new Set();
    function dependencies(value) {
      if(Array.isArray(value)&&value.length===2&&typeof value[0]==='string'&&Number.isInteger(value[1])&&Object.hasOwn(entry.workflow,value[0]))visit(value[0]);
      else if(value&&typeof value==='object')for(const child of Object.values(value))dependencies(child);
    }
    function visit(id){if(visited.has(id))return;visited.add(id);const inputs=entry.workflow[id].inputs;inspect(inputs);dependencies(inputs);}
    visit(entry.outputNode);
    if(!tokens.has('prompt'))throw new Error(`工作流 ${count} 缺少 {{prompt}}。`);
    for(let i=1;i<=Number(count);i++)if(!tokens.has(`image${i}`))throw new Error(`工作流 ${count} 缺少 {{image${i}}}，不能忽略选中的参考图。`);
  }
  return {workflows:value,hash:createHash('sha256').update(JSON.stringify(value)).digest('hex')};
}
export function workflowFor(workflows,count) {
  const entry=workflows?.[String(count)];if(!entry)throw new Error(`ComfyUI 尚未配置 ${count} 张参考图的工作流，请在设置中添加。`);return entry;
}
export function fillWorkflow(entry,values) {
  function fill(v) {
    if(typeof v==='string') {
      const whole=v.match(/^\{\{([^{}]+)\}\}$/);if(whole)return values[whole[1]];
      return v.replace(/\{\{([^{}]+)\}\}/g,(_,key)=>String(values[key]));
    }
    if(Array.isArray(v))return v.map(fill);
    if(v&&typeof v==='object')return Object.fromEntries(Object.entries(v).map(([key,value])=>[key,fill(value)]));
    return v;
  }
  return Object.fromEntries(Object.entries(entry.workflow).map(([id,node])=>[id,{...node,inputs:fill(node.inputs)}]));
}
function auth(config,token) {return token?(config.authHeader==='x-api-key'?{'X-API-Key':token}:{Authorization:`Bearer ${token}`}):{};}
function safeError(text,token){return String(text).split(token||'\0').join('[密钥已隐藏]').slice(0,500);}
async function jsonRequest(config,token,path,{fetcher=fetch,signal,method='GET',body}={}) {
  const response=await fetcher(config.baseURL+path,{method,headers:{...auth(config,token),...(body&&!(body instanceof FormData)?{'Content-Type':'application/json'}:{})},body:body instanceof FormData?body:body?JSON.stringify(body):undefined,signal:signal?AbortSignal.any([signal,AbortSignal.timeout(30000)]):AbortSignal.timeout(30000),redirect:'error'});
  let result;try{result=JSON.parse((await boundedBytes(response,2*1024*1024)).toString());}catch{throw new Error(`ComfyUI 返回无效 JSON（${response.status}）。`);}
  if(!response.ok)throw new Error(`ComfyUI 请求失败（${response.status}）：${safeError(result.error?.message||result.error||'请检查地址、鉴权和工作流。',token)}`);
  return result;
}
export async function checkComfy(config,token,options={}) {
  const data=await jsonRequest(config,token,'/system_stats',options);
  if(!data.system&&!Array.isArray(data.devices))throw new Error('此地址未返回 ComfyUI 系统信息。');
  return {connected:true,devices:(data.devices||[]).map(device=>device.name).filter(Boolean)};
}
export async function generateComfy(job,paths,token,workflows,onStatus,{fetcher=fetch,signal,onRemote=async()=>{},pollMS=1500}={}) {
  const config=validateComfyConnection(job.comfy),entry=workflowFor(workflows,paths.length);
  if(config.requiresToken&&!token)throw new Error('ComfyUI 鉴权凭据缺失，请重新保存设置。');
  const timeout=AbortSignal.timeout(30*60*1000),combined=signal?AbortSignal.any([signal,timeout]):timeout;
  const request=(path,options={})=>jsonRequest(config,token,path,{fetcher,signal:combined,...options});
  const values={prompt:job.resolvedPrompt,width:Number(job.size.split('x')[0]),height:Number(job.size.split('x')[1]),seed:randomInt(0,2**48-1),background:job.background,quality:job.quality};
  for(const [index,path] of paths.entries()) {
    onStatus(`ComfyUI：上传参考图 ${index+1}/${paths.length}…`);
    const bytes=await readFile(path),mime=imageType(bytes),ext={'image/png':'png','image/jpeg':'jpg','image/webp':'webp'}[mime],form=new FormData();
    form.append('image',new Blob([bytes],{type:mime}),`studio-${randomUUID()}.${ext}`);form.append('type','input');
    const upload=await request('/upload/image',{method:'POST',body:form});
    if(typeof upload.name!=='string'||!upload.name||/[\\/]/.test(upload.name)||upload.name==='..'||(upload.type&&upload.type!=='input')||typeof(upload.subfolder||'')!=='string'||/(^|[\\/])\.\.([\\/]|$)/.test(upload.subfolder||''))throw new Error('ComfyUI 返回无效上传路径。');
    values[`image${index+1}`]=[upload.subfolder,upload.name].filter(Boolean).join('/');
  }
  const workflow=fillWorkflow(entry,values);
  onStatus('ComfyUI：提交工作流…');
  const submitted=await request('/prompt',{method:'POST',body:{prompt:workflow,client_id:randomUUID()}});
  if(typeof submitted.prompt_id!=='string'||!submitted.prompt_id||submitted.error||Object.keys(submitted.node_errors||{}).length)throw new Error('ComfyUI 未接受工作流，请检查节点、模型和参考图配置。');
  const remoteId=submitted.prompt_id;await onRemote({promptId:remoteId,baseURL:config.baseURL,outputNode:entry.outputNode});
  try {
    for(;;) {
      combined.throwIfAborted();
      const history=await request(`/history/${encodeURIComponent(remoteId)}`),record=history[remoteId];
      if(record?.status?.status_str==='error'||record?.status?.messages?.some(message=>['execution_error','execution_interrupted'].includes(message[0])))throw new Error('ComfyUI 工作流执行失败；请在远端查看对应任务，未自动重试。');
      const images=record?.outputs?.[entry.outputNode]?.images;
      if(record&&(record.status?.completed||images)) {
        if(!Array.isArray(images)||images.length!==1)throw new Error('指定输出节点必须返回一张图片；请将工作流 batch_size 设为 1。');
        const file=images[0];if(typeof file.filename!=='string'||!file.filename||typeof(file.subfolder||'')!=='string'||!['output','temp'].includes(file.type))throw new Error('ComfyUI 未返回有效的输出图片。');
        const query=new URLSearchParams({filename:file.filename,subfolder:file.subfolder||'',type:file.type});
        const response=await fetcher(`${config.baseURL}/view?${query}`,{headers:auth(config,token),signal:combined,redirect:'error'});
        if(!response.ok)throw new Error(`ComfyUI 图片下载失败（${response.status}），可用远端任务编号找回。`);
        const bytes=await boundedBytes(response);imageType(bytes);return {bytes,model:'ComfyUI',usage:null};
      }
      onStatus(`ComfyUI：远端排队或执行中 · ${remoteId}`);await delay(pollMS,undefined,{signal:combined});
    }
  }catch(error){
    if(combined.aborted) {
      // Never call the shared /interrupt endpoint: another agent may own the running workflow.
      await jsonRequest(config,token,'/queue',{fetcher,method:'POST',body:{delete:[remoteId]}}).catch(()=>{});
      throw new Error('已停止等待 ComfyUI；已运行的远端工作流可能继续，可按任务编号找回。');
    }
    throw error;
  }
}
