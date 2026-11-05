import {readFile,writeFile,mkdir,rename} from 'node:fs/promises';
import {join} from 'node:path';
import {DATA,KINDS,findAsset} from './catalog.mjs';
import {normalizeTags} from './public/tags.js';

let tags={};
const file=join(DATA,'resource-tags.json');
export async function loadTags() {
  try{tags=JSON.parse(await readFile(file,'utf8'));}
  catch(error){if(error.code!=='ENOENT')throw new Error('资源标签文件无法读取，请检查 data/resource-tags.json。');tags={};}
  if(!tags||Array.isArray(tags)||typeof tags!=='object')throw new Error('资源标签文件格式无效。');
  for(const value of Object.values(tags))normalizeTags(value);
}
export function withTags(kind,item){return {...item,tags:tags[`${kind}:${item.id}`]??item.tags??[]};}
export async function updateTags(input) {
  if(!Array.isArray(input?.items)||!input.items.length||input.items.length>5000)throw new Error('请选择 1–5,000 个资源。');
  const add=normalizeTags(input.add??[]),remove=normalizeTags(input.remove??[]);
  if(!add.length&&!remove.length)throw new Error('请填写要添加或移除的标签。');
  if(add.some(tag=>remove.includes(tag)))throw new Error('同一标签不能同时添加和移除。');
  const next={...tags},result=[],seen=new Set();
  for(const ref of input.items){
    if(!ref||!KINDS.includes(ref.kind))throw new Error('资源类型无效。');
    const key=`${ref.kind}:${ref.id}`;if(seen.has(key))continue;seen.add(key);
    const item=withTags(ref.kind,await findAsset(ref.kind,ref.id));
    next[key]=normalizeTags([...new Set([...item.tags.filter(tag=>!remove.includes(tag)),...add])]);
    result.push({kind:ref.kind,id:ref.id,tags:next[key]});
  }
  await mkdir(DATA,{recursive:true});await writeFile(`${file}.tmp`,JSON.stringify(next,null,2),{mode:0o600});await rename(`${file}.tmp`,file);tags=next;
  return result;
}
