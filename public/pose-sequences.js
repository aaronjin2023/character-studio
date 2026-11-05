export const MAX_SEQUENCE_FRAMES=30;
export const POSE_SEQUENCE_REVISION=1;
export const isPoseSequence=job=>['pose-plan','pose-frame'].includes(job?.outputType);

export function sequenceRequest(input){
  if(!input||typeof input.action!=='string'||!input.action.trim()||input.action.length>2000)throw new Error('请填写 2,000 字以内的动作描述。');
  const refs={};
  for(const key of ['stylePoseId','startPoseId','endPoseId']){
    const id=input[key]??'';
    if(typeof id!=='string'||(id&&!/^[\w-]{1,100}$/.test(id)))throw new Error('骨架参考编号无效。');
    refs[key]=id;
  }
  const supplied=Number(!!refs.startPoseId)+Number(!!refs.endPoseId);
  if(!Number.isInteger(input.count)||input.count<Math.max(2,supplied+1)||input.count>MAX_SEQUENCE_FRAMES)throw new Error(`总帧数须为 ${Math.max(2,supplied+1)}–${MAX_SEQUENCE_FRAMES} 的整数，包含已提供的首尾，且至少新增一帧。`);
  return {...refs,action:input.action.trim(),count:input.count};
}

export function sequenceFrames(plan){
  return Array.from({length:plan.count},(_,i)=>i+1).filter(i=>!(i===1&&plan.startPoseId)&&!(i===plan.count&&plan.endPoseId));
}

export function sequenceBatch(input){
  if(!input||typeof input.planId!=='string'||!/^[0-9a-f-]{36}$/.test(input.planId))throw new Error('请选择已完成的动作方案。');
  return {planId:input.planId};
}
