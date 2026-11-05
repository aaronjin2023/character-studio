import {readFile,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {join} from 'node:path';
import {DATA,findAsset,assetPath,listResources,saveResource,imageType} from './catalog.mjs';
import {validateProvider} from './generation.mjs';
import {EXPRESSIONS,EXPRESSION_REVISION} from './public/expressions.js';
import {subjectTypeFor,subjectFor} from './public/subject-types.js';
import {settingsKey} from './public/job-settings.js';
import {normalizeTags} from './public/tags.js';
import {withTags} from './resource-tags.mjs';

export async function expressionSource(faceId, jobs=[]) {
  let source=await findAsset('face',faceId);
  if(source.expression){
    // Previously a derived face could itself have a set. Keep those recorded sets reachable.
    const owners=new Set([...jobs].filter(job=>job.outputType==='expression').map(job=>job.sourceFaceId)),seen=new Set();
    while(source.expression?.sourceFaceId && !owners.has(source.id)){
      if(seen.has(source.id))throw new Error('表情原头像关联存在循环。');
      seen.add(source.id);source=await findAsset('face',source.expression.sourceFaceId);
    }
  }
  const bytes=await readFile(await assetPath('face',source.id));imageType(bytes);
  const hash=createHash('sha256').update(bytes).update(JSON.stringify([subjectTypeFor(source),source.gender,source.species,source.anatomy])).digest('hex');
  return {source,bytes,hash};
}
export function expressionJobs(jobs, source, expressionId) {
  return [...jobs].filter(job=>job.outputType==='expression' && job.sourceFaceId===source.source.id && job.sourceHash===source.hash && job.expressionId===expressionId)
    .sort((a,b)=>b.createdAt.localeCompare(a.createdAt));
}
export function expressionSettings(input,source) {
  const expression=EXPRESSIONS.find(item=>item.id===input.expressionId);if(!expression)throw new Error('表情类型无效。');
  const provider=validateProvider(input),subjectType=subjectTypeFor(source.source);
  return {...provider,outputType:'expression',sourceFaceId:source.source.id,sourceHash:source.hash,expressionId:expression.id,expressionRevision:EXPRESSION_REVISION,subjectType,subjectRevision:subjectFor({subjectType}).revision,personCount:1,characters:[],selections:{},title:`${source.source.title.slice(0,55)} · ${expression.label}`,prompt:expression.prompt,style:'reference',styleRevision:1,effect:'none',effectRevision:0,background:'studio',size:'1024x1024',quality:'medium'};
}
export function expressionPrompt(job) {
  const source=job.references[0],config=subjectFor(job),expression=EXPRESSIONS.find(item=>item.id===job.expressionId);
  return `根据唯一参考图1，制作同一${config.label}的单张「${expression.label}」表情头像。${expression.prompt}\n${expression.strong?'采用高强度面部表演，缩略图中也能辨认目标情绪，不能弱化成轻微微笑或普通皱眉。允许眉眼开合、嘴部开合、肌肉褶皱和脸颊挤压随情绪充分变化，但固定的骨相、五官位置和身份特征不变。摄影头像使用可信的真人面部运动；漫画头像可按原画风夸张表演，但不增大眼球、拉长口鼻、改变颅骨或增加牙齿。动物或幻想种将动作转译为其实际头部结构能够实现的表演。\n':''}保持图1的身份、脸型、五官比例、年龄特征、肤色或头部花纹、发型、可见饰品、原有朝向与头部结构不变；保持原图绘制媒介、线条、光影和画风，不把漫画转成真人。只改变表情，不新增手势、道具或衣服。\n${config.hasGender?'保持眉眼嘴的自然结构和身份可辨识度。':'表情通过该物种实际拥有的眼部、口鼻或喙、耳部实现；不添加人类牙齿、嘴唇、眉毛或发型。'}${config.fantasy?'保留全部头部、角、耳、口鼻等非人结构和连接，不把幻想种改成人类。':''}${source.species?`物种／种族：${source.species}。`:''}${source.anatomy?`身体结构：${source.anatomy}。`:''}\n统一方形头肩构图，完整保留头顶和下巴、耳与角，头部在画面中的比例与图1接近。浅灰色干净背景，少量原衣领。只输出一张头像，不拼图，不添加文字、表情符号或水印。`;
}
export function expressionKey(job){return createHash('sha256').update(settingsKey(job)).digest('hex');}
export async function publishExpression(job,bytes) {
  const key=expressionKey(job),existing=(await listResources()).find(item=>item.expression?.sourceFaceId===job.sourceFaceId&&item.expression.id===job.expressionId&&!item.superseded);
  const output=bytes||await readFile(join(DATA,'jobs',job.id,job.output)).catch(()=>{throw new Error('已有表情结果文件缺失，请检查保存目录；未重新调用模型。');});imageType(output);
  if(existing?.sourceJobId===job.id&&await assetPath('face',existing.id).then(path=>stat(path)).then(info=>info.isFile()).catch(()=>false)){job.resourceId=existing.id;return existing;}
  const expression=EXPRESSIONS.find(item=>item.id===job.expressionId),source=job.references[0];
  const tags=normalizeTags([...new Set(['表情',expression.label,...(existing?withTags('face',existing).tags:[])])]);
  const resource=await saveResource(job,'face',job.title,output,{gender:source.gender||'unspecified',species:source.species,anatomy:source.anatomy,tags,expression:{key,id:expression.id,label:expression.label,sourceFaceId:job.sourceFaceId,revision:job.expressionRevision}});
  job.resourceId=resource.id;return resource;
}
