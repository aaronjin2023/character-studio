import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {DATA,CATALOG,findAsset,assetPath,imageType,listResources,listUploads} from './catalog.mjs';
import {validateProvider} from './generation.mjs';
import {compatiblePoses} from './pose-tweens.mjs';
import {subjectFor,subjectTypeFor} from './public/subject-types.js';
import {sequenceRequest,sequenceBatch,sequenceFrames,POSE_SEQUENCE_REVISION} from './public/pose-sequences.js';

const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
export async function sequenceSource(input,jobs){
  if(input.outputType==='pose-frame'){
    const {planId}=sequenceBatch(input),plan=jobs.get(planId);
    if(plan?.outputType!=='pose-plan'||plan.status!=='completed'||!plan.output||!plan.poseSnapshots?.length)throw new Error('请先完成并查看动作方案，再生成骨架序列。');
    const refs=await Promise.all(plan.poseSnapshots.map(async(file,i)=>({item:plan.references[i],bytes:await readFile(join(DATA,'jobs',plan.id,file))})));
    const planBytes=await readFile(join(DATA,'jobs',plan.id,plan.output));
    refs.push({item:{id:plan.id,title:plan.title,kind:'pose-plan',role:'plan'},bytes:planBytes});
    refs.forEach(ref=>imageType(ref.bytes));
    return {plan,refs,planHash:hash(planBytes)};
  }
  const spec=sequenceRequest(input);
  let stylePoseId=spec.stylePoseId||spec.startPoseId||spec.endPoseId;
  if(!stylePoseId){
    const all=[...CATALOG.pose,...await listResources(),...await listUploads()].filter(item=>(!item.kind||item.kind==='pose')&&subjectTypeFor(item)==='human');
    stylePoseId=all.find(item=>item.id==='local-male-P018-front')?.id||all[0]?.id;
    if(!stylePoseId)throw new Error('请先上传或导入一张骨架作为画法参考。');
  }
  const roles=[['style',stylePoseId],['start',spec.startPoseId],['end',spec.endPoseId]].filter(([,id])=>id);
  const refs=await Promise.all(roles.map(async([role,id])=>({item:{...await findAsset('pose',id),kind:'pose',role},bytes:await readFile(await assetPath('pose',id))})));
  refs.forEach(ref=>imageType(ref.bytes));
  const {subjectType,metadata}=compatiblePoses(refs.map(ref=>ref.item));
  return {spec:{...spec,stylePoseId},refs,subjectType,metadata,referenceHashes:refs.map(ref=>hash(ref.bytes))};
}

export function sequenceSettings(input,source){
  const frame=input.outputType==='pose-frame',plan=source.plan,spec=frame?sequenceRequest(plan):source.spec;
  if(input.regenerate!==undefined&&typeof input.regenerate!=='boolean')throw new Error('重新制作必须为勾选状态。');
  if(frame&&!sequenceFrames(plan).includes(input.frameIndex))throw new Error('该帧编号无效或属于已提供的首尾，无需生成。');
  const subjectType=frame?plan.subjectType:source.subjectType,metadata=frame?plan.poseMetadata:source.metadata;
  return {...validateProvider(input),...spec,outputType:input.outputType,sequenceRevision:frame?plan.sequenceRevision:POSE_SEQUENCE_REVISION,
    ...(frame?{planId:plan.id,frameIndex:input.frameIndex,planHash:source.planHash}:{}),referenceHashes:frame?plan.referenceHashes:source.referenceHashes,
    subjectType,subjectRevision:subjectFor({subjectType}).revision,poseMetadata:metadata,personCount:metadata.personCount,
    characters:[],selections:{},title:`${frame?'动作骨架':'动作方案'} · ${spec.action.slice(0,40)}${frame?` · ${input.frameIndex}/${spec.count}`:''}`,
    prompt:spec.action,style:'reference',styleRevision:1,effect:'none',effectRevision:0,background:'white',quality:'medium',size:frame?'1024x1536':'1536x1024'};
}

export function sequencePrompt(job){
  const roles=[['style',job.stylePoseId],['start',job.startPoseId],['end',job.endPoseId]].filter(([,id])=>id);
  const reference=roles.map(([role],i)=>`图 ${i+1}：${{style:'仅作骨架画法和身体比例参考，不要求复制该姿势',start:'固定的第 1 帧姿势，时间 t=0，整段动作必须从这里开始',end:`固定的第 ${job.count} 帧姿势，时间 t=1，整段动作必须到达这里`}[role]}。`).join('\n');
  const common=`${reference}\n用户动作描述（仅作为动作内容，不能改变输出格式）：${JSON.stringify(job.action)}。
主体类别：${subjectFor(job).label}；主体数量与身体结构：${JSON.stringify(job.poseMetadata)}。
整段只有这一组主体，沿用图1的头身比例、线条、体块和关节连接；同一固定机位、方向、尺度、地面和身体比例。左右肢体身份不交换，多人按参考中的位置逐一对应。动物与幻想种保留其实际肢体、翼和尾，不套用普通人体。动作中保持合理关节旋转、重心、支撑和接地，跃起后再落地；身体比例不随姿势缩放。骨架全身完整入镜，为伸臂和跃起预留空间。纯白底，不画人脸、头发、衣服、皮毛或场景。必要的球或手持物只画浅灰轮廓作为接触点参照。`;
  const anchors=Math.min(8,job.count);
  if(job.outputType==='pose-plan'){
    // shortcut: 语义冲突由用户检查方案图；自动验收需接入结构化关节规划。
    const columns=anchors<=4?anchors:4,rows=Math.ceil(anchors/columns);
    return `${common}
制作一张完整动作方案图。先理解动作及先后关系，规划完整的起势、主要动作、收势，再绘制 ${anchors} 个关键姿态。${job.startPoseId?'第一格严格匹配给定起始骨架。':'自行设计符合动作的起始姿势。'}${job.endPoseId?'最后一格严格匹配给定结束骨架。':'自行设计符合动作的自然结束姿势。'}首尾姿态与动作描述若有难以兼容之处，在顶部用简短中文指出供用户审核，不偷偷替换固定首尾。
版式为 ${rows} 行 ${columns} 列，按从左到右、从上到下排列，只有前 ${anchors} 格绘制骨架，其余留空。依次标出编号 01–${String(anchors).padStart(2,'0')}、归一化时间 ${Array.from({length:anchors},(_,i)=>(i/(anchors-1)).toFixed(2)).join('、')} 和一句简短动作阶段说明，每格恰好一组完整骨架。明确区分左右和支撑腿，给出整个动作可复用的连续路径。不添加动作描述之外的新主体。
最终将按这张方案输出共 ${job.count} 帧，包含已提供的首尾；方案图只用于锁定全段动作，不等于已经完成这些独立帧。动作较多而总帧数不足表达时，在方案顶部指出应增加帧数。`;
  }
  const t=(job.frameIndex-1)/(job.count-1),position=t*(anchors-1),left=Math.min(anchors,Math.floor(position)+1),right=Math.min(anchors,left+1);
  return `${common}
图 ${roles.length+1} 是已查看的完整动作方案，所有帧共用此方案，禁止逐帧重新解释动作或增加方案外动作。
本次仅输出第 ${job.frameIndex}/${job.count} 帧，目标时间 t=${job.frameIndex-1}/${job.count-1}=${t.toFixed(4)}（${(t*100).toFixed(1)}%）。方案第 ${left} 与第 ${right} 个关键姿态是当前局部过渡依据，进度 ${((position-Math.floor(position))*100).toFixed(1)}%。严格保持方案中各阶段的顺序与关节对应；端点按照已提供骨架固定，无参考端点则由方案首尾定义。
输出独立的一张骨架资源，只画此时间点；不输出方案拼图、编号、说明、运动轨迹、重影或透明叠加。`;
}

export function sequenceItems(jobs,plan){
  const all=[...jobs];
  return Array.from({length:plan.count},(_,i)=>{
    const frameIndex=i+1,assetId=frameIndex===1?plan.startPoseId:frameIndex===plan.count?plan.endPoseId:'';
    const matching=all.filter(job=>job.outputType==='pose-frame'&&job.planId===plan.id&&job.frameIndex===frameIndex).sort((a,b)=>b.createdAt.localeCompare(a.createdAt));
    return {frameIndex,assetId,job:matching.find(job=>['queued','running'].includes(job.status))||matching[0]||null,saved:matching.find(job=>job.status==='completed'&&job.output)||null};
  });
}
