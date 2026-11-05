export const MAX_TWEEN_FRAMES=30;
export const POSE_TWEEN_REVISION=1;

export function tweenRequest(input){
  if(!input||!['startPoseId','endPoseId'].every(key=>typeof input[key]==='string'&&/^[\w-]{1,100}$/.test(input[key])))throw new Error('请选择起始与结束骨架。');
  if(input.startPoseId===input.endPoseId)throw new Error('请选择两张不同的首尾骨架。');
  if(!Number.isInteger(input.count)||input.count<1||input.count>MAX_TWEEN_FRAMES)throw new Error(`补间数量须为 1–${MAX_TWEEN_FRAMES} 的整数，不包含首尾。`);
  return {startPoseId:input.startPoseId,endPoseId:input.endPoseId,count:input.count};
}
