import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {findAsset,assetPath,imageType} from './catalog.mjs';
import {validateProvider} from './generation.mjs';
import {poseCount} from './public/job-settings.js';
import {subjectTypeFor,subjectFor} from './public/subject-types.js';
import {tweenRequest,POSE_TWEEN_REVISION} from './public/pose-tweens.js';

export function compatiblePoses(items){
  const subjectType=subjectTypeFor(items[0]);
  if(items.some(item=>subjectTypeFor(item)!==subjectType))throw new Error('骨架参考必须属于同一主体类别。');
  const counts=items.map(item=>poseCount(item)??1);
  if(new Set(counts).size>1)throw new Error('骨架参考的人数／主体数量不一致。');
  const personCount=counts[0],roleGenders=[],roleSpecies=[],roleAnatomies=[];
  for(let i=0;i<personCount;i++){
    for(const [key,plural,values] of [['gender','roleGenders',roleGenders],['species','roleSpecies',roleSpecies],['anatomy','roleAnatomies',roleAnatomies]]){
      const candidates=items.map(item=>item[plural]?.[i]||item[key]||'');
      const known=value=>key==='gender'?['male','female'].includes(value):!!value.trim();
      const specified=candidates.filter(known);
      if(new Set(specified.map(value=>value.trim().toLowerCase())).size>1)throw new Error(`骨架参考第 ${i+1} 个主体的${{gender:'类型',species:'物种／种族',anatomy:'身体结构'}[key]}不一致。`);
      values.push(specified[0]||(key==='gender'?'unspecified':''));
    }
  }
  const metadata={personCount,roleGenders,roleSpecies,roleAnatomies,gender:personCount===1?roleGenders[0]:'unisex',species:roleSpecies.every(x=>x===roleSpecies[0])?roleSpecies[0]:'',anatomy:roleAnatomies.every(x=>x===roleAnatomies[0])?roleAnatomies[0]:''};
  return {subjectType,metadata};
}

export async function tweenSource(input){
  const spec=tweenRequest(input);
  const [start,end]=await Promise.all([findAsset('pose',spec.startPoseId),findAsset('pose',spec.endPoseId)]);
  const {subjectType,metadata}=compatiblePoses([start,end]);
  const paths=await Promise.all([assetPath('pose',start.id),assetPath('pose',end.id)]),[bytes,endBytes]=await Promise.all(paths.map(path=>readFile(path)));
  imageType(bytes);imageType(endBytes);
  const {stdout}=await promisify(execFile)('ffprobe',['-v','error','-select_streams','v:0','-show_entries','stream=width,height','-of','json',paths[0]],{timeout:10000});
  const {width,height}=JSON.parse(stdout).streams[0];
  const size=width/height>1.2?'1536x1024':width/height<0.83?'1024x1536':'1024x1024';
  const hash=buffer=>createHash('sha256').update(buffer).update(JSON.stringify([subjectType,metadata])).digest('hex');
  return {source:start,end,bytes,endBytes,hash:hash(bytes),endHash:hash(endBytes),subjectType,metadata,size};
}

export function tweenSettings(input,source){
  const spec=tweenRequest(input),frameIndex=input.frameIndex;
  if(!Number.isInteger(frameIndex)||frameIndex<1||frameIndex>spec.count)throw new Error('补间帧编号超出范围。');
  if(input.regenerate!==undefined&&typeof input.regenerate!=='boolean')throw new Error('重新制作必须为勾选状态。');
  return {...validateProvider(input),...spec,frameIndex,outputType:'pose-tween',tweenRevision:POSE_TWEEN_REVISION,
    startHash:source.hash,endHash:source.endHash,subjectType:source.subjectType,subjectRevision:subjectFor(source.source).revision,
    poseMetadata:source.metadata,personCount:source.metadata.personCount,characters:[],selections:{},
    title:`骨架补间 · ${source.source.title.slice(0,22)} → ${source.end.title.slice(0,22)} · ${frameIndex}/${spec.count}`,
    prompt:'',style:'reference',styleRevision:1,effect:'none',effectRevision:0,background:'white',quality:'medium',size:source.size};
}

export function tweenPrompt(job){
  const fraction=`${job.frameIndex}/${job.count+1}`,progress=(100*job.frameIndex/(job.count+1)).toFixed(2);
  return `图1是起始骨架（时间 0），图2是结束骨架（时间 1）。二者定义同一组 ${job.personCount} 个主体的同一个连续动作，主体类别：${subjectFor(job).label}。
本次只画第 ${job.frameIndex} 张补间骨架，共 ${job.count} 张中间帧；准确目标时间 t=${fraction}，即动作从图1向图2完成 ${progress}%。首尾不属于补间帧，不输出原始首尾姿势，不一次输出多帧。
先对齐两图的根节点、头、肩、胯和各关节，逐一对应同一主体的同一肢体。严格沿用图1原有的骨架线条、体块与关节画法，不另造一套骨架风格。各帧采用图1的固定机位、投影和画面尺度，图2用于动作终点；不要把视角变化当作肢体变形。
按关节旋转和根节点位移推导此时间点的中间姿态，使用自然、最简的连续运动路径。保持同一骨长、头身比、关节连接和肢体数量；考虑旋转的合理弧线、透视缩短、重心与接地支撑。支撑足在落地阶段保持接地，手与脚沿合理弧线移动；两个端点未规定的动作不要额外绕圈、挥舞或增加中间事件。多人时从首帧位置识别每一个主体，保持身份对应与动作关系，不交换主体和左右肢体。
主体结构与对应资料：${JSON.stringify(job.poseMetadata)}。人物不增减手脚；动物与幻想种保留其实际头、尾、翅膀及所有附肢，不改成人体或普通四足。局部遮挡按同一结构合理补全。
输出单张清晰的二维骨架资源，纯白底，整组骨架完整入镜。只画目标时间的骨架，无人脸、头发、衣服、皮毛、环境、文字、编号、运动线或水印。不要透明叠加、淡入淡出、双曝光、复制首尾或绘制分镜拼图。`;
}
