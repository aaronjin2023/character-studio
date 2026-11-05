import {ROLE_DETAILS} from './job-settings.js';
export const MAX_BATCH = 100;
export function batchRows({mode, poses, costumes, faces}) {
  const lists = [poses, costumes, faces];
  if (!lists.every(list => Array.isArray(list) && list.length && list.length <= MAX_BATCH && list.every(id => typeof id === 'string' && /^[\w-]+$/.test(id)))) throw new Error('请为骨架、衣服和头像各选择至少一项资源。');
  if (mode === 'wardrobe') {
    if (poses.length !== 1 || faces.length !== 1) throw new Error('固定模特换衣需要 1 张骨架和 1 张头像。');
    return costumes.map(costume => ({pose:poses[0], costume, face:faces[0]}));
  }
  if (mode !== 'paired') throw new Error('批量组合方式无效。');
  const count = Math.max(...lists.map(list => list.length));
  if (lists.some(list => list.length !== 1 && list.length !== count)) throw new Error('按顺序配对时，各组数量须相同；只有一项的资源会固定复用。');
  return Array.from({length:count}, (_, i) => ({pose:poses[i % poses.length], costume:costumes[i % costumes.length], face:faces[i % faces.length]}));
}
export function batchRequests(input) {
  const rows = batchRows(input), base = input.settings;
  if (!base || (base.subjectType || 'human') !== 'human' || base.characters?.length !== 1 || (base.outputType || 'image') !== 'image') throw new Error('模特批量展示目前使用单人人物图片。请先配置一个人物角色。');
  return rows.map(row => {
    const role={...base.characters[0],costume:row.costume,face:row.face,gender:'reference',position:''};
    if(row.face!==base.characters[0].face){
      delete role.expressionAssetId;
      delete role.hairFaceId;
      if(role.attachments){role.attachments={...role.attachments};for(const key of Object.keys(ROLE_DETAILS.face))delete role.attachments[key];}
      if(role.partImages){role.partImages={...role.partImages};for(const key of Object.keys(ROLE_DETAILS.face))delete role.partImages[key];}
    }
    return {...base,regenerate:false,selections:{...base.selections,pose:row.pose},characters:[role]};
  });
}
