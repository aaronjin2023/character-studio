import { readFile, writeFile, mkdir, rename } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { DATA } from './catalog.mjs';
import { validateProvider } from './generation.mjs';
import { serviceURL, validateWorkflows } from './comfy.mjs';

const file=join(DATA,'private','settings.json');
let store;
const defaultComfy={baseURL:'http://127.0.0.1:8188',authHeader:'bearer',workflowHash:''};
export async function loadSettings() {
  try{store=JSON.parse(await readFile(file,'utf8'));}
  catch(error){if(error.code!=='ENOENT')throw new Error('出图设置无法读取，请检查 data/private/settings.json。');store={provider:'quota',model:'gpt-image-2',baseURL:'https://api.openai.com/v1',credentials:{}};}
  store.comfy||={...defaultComfy};store.workflows||={};
}
export function publicSettings() {
  const {provider,model,baseURL,credentialId}=store;
  const {credentialId:comfyId,...comfy}=store.comfy;
  return {provider,model,baseURL,hasApiKey:!!store.credentials[credentialId],comfy:{...comfy,requiresToken:!!store.credentials[comfyId],hasApiKey:!!store.credentials[comfyId],referenceCounts:Object.keys(store.workflows[comfy.workflowHash]||{}).map(Number)}};
}
export function jobKey(job){return store.credentials[job?.credentialId]?.key;}
export function comfyToken(){return jobKey(store.comfy);}
export function comfyWorkflows(job={comfy:store.comfy}){return store.workflows[job.comfy?.workflowHash]||{};}
async function persist(next){await mkdir(join(DATA,'private'),{recursive:true,mode:0o700});await writeFile(`${file}.tmp`,JSON.stringify(next),{mode:0o600});await rename(`${file}.tmp`,file);store=next;}
function credential(old,input,baseURL,credentials) {
  const key=input.clearApiKey?'':input.apiKey?.trim()||(baseURL===old.baseURL?jobKey(old):'');
  if(!key)return undefined;
  if(typeof key!=='string'||key.length<10||key.length>4096||/\s/.test(key))throw new Error('请输入有效的 API Key 或鉴权 Token。');
  if(key===jobKey(old)&&baseURL===old.baseURL)return old.credentialId;
  const id=randomUUID();credentials[id]={key};return id;
}
export async function saveSettings(input) {
  if(!input||!['quota','api','comfyui'].includes(input.provider))throw new Error('请选择出图通道。');
  const credentials={...store.credentials},workflows={...store.workflows};
  const model=input.model?.trim()||store.model,baseURL=serviceURL(input.baseURL?.trim()||store.baseURL);
  const checked=validateProvider({provider:'api',model,baseURL,apiKey:'validation-placeholder'});
  const credentialId=credential(store,input,baseURL,credentials);
  if(input.provider==='api'&&!credentialId)throw new Error('请先保存图像 API Key；更换地址时需重新输入。');
  let comfy={...store.comfy};
  if(input.comfy){
    const address=serviceURL(input.comfy.baseURL||comfy.baseURL,true),authHeader=input.comfy.authHeader||comfy.authHeader;
    if(!['bearer','x-api-key'].includes(authHeader))throw new Error('ComfyUI 鉴权方式无效。');
    let workflowHash=comfy.workflowHash;
    if(input.comfy.workflows!==undefined){const validated=validateWorkflows(input.comfy.workflows);workflowHash=validated.hash;workflows[workflowHash]=validated.workflows;}
    comfy={baseURL:address,authHeader,workflowHash,credentialId:credential(comfy,input.comfy,address,credentials)};
  }
  await persist({provider:input.provider,model:checked.model,baseURL:checked.baseURL,credentialId,comfy,credentials,workflows});
  return publicSettings();
}
export function resolveProvider(input) {
  // Old clients can still supply a per-request image API key; it remains memory-only.
  if(input.apiKey&&input.provider!=='api')throw new Error('其他通道请使用已保存的设置。');
  if(input.apiKey)return {...validateProvider(input),apiKey:input.apiKey};
  const settings=publicSettings();
  const data=validateProvider({...settings,apiKey:jobKey(store)});
  return {...data,...(settings.provider==='api'?{apiKey:jobKey(store),credentialId:store.credentialId}:settings.provider==='comfyui'?{credentialId:store.comfy.credentialId}:{})};
}
export async function pruneCredentials(jobs) {
  const pending=jobs.filter(job=>['queued','running'].includes(job.status));
  const keep=new Set([store.credentialId,store.comfy.credentialId,...pending.map(job=>job.credentialId)]);
  const credentials=Object.fromEntries(Object.entries(store.credentials).filter(([id])=>keep.has(id)));
  const hashes=new Set([store.comfy.workflowHash,...pending.map(job=>job.comfy?.workflowHash)]);
  const workflows=Object.fromEntries(Object.entries(store.workflows).filter(([hash])=>hashes.has(hash)));
  if(Object.keys(credentials).length!==Object.keys(store.credentials).length||Object.keys(workflows).length!==Object.keys(store.workflows).length)await persist({...store,credentials,workflows});
}
