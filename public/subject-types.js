export const SUBJECT_TYPES = {
  human: { label: '人物', revision: 1, hasGender: true, kinds: ['pose', 'costume', 'face'], names: { pose: '骨架', costume: '衣服', face: '头像' }, image: '人物图片', sheet: '人设资料图' },
  animal: { label: '动物', revision: 1, hasSpecies: true, kinds: ['pose', 'surface', 'face'], names: { pose: '骨架', surface: '体表', face: '头部' }, image: '动物图片', sheet: '动物资料图', speciesExample: '例如：猫、狗、赤狐；同一物种用相同名称' },
  'fantasy-humanoid': { label: '人形幻想种', revision: 1, fantasy: true, hasGender: true, hasSpecies: true, kinds: ['pose', 'costume', 'face', 'surface'], names: { pose: '骨架', costume: '衣服', face: '头像', surface: '体表与附肢' }, image: '人形幻想种图片', sheet: '人形幻想种资料图', speciesExample: '例如：天使、娜迦；同一设定用相同名称', anatomyExample: '例如：人形上身、两臂，腰部连接一条蛇尾，无双腿；鳞片覆盖蛇尾。写明附肢数量、连接位置与覆盖部位。' },
  'fantasy-beast': { label: '兽形幻想种', revision: 1, fantasy: true, hasSpecies: true, kinds: ['pose', 'surface', 'face'], names: { pose: '骨架', surface: '体表与附肢', face: '头部' }, image: '兽形幻想种图片', sheet: '兽形幻想种资料图', speciesExample: '例如：狮鹫、奇美拉；同一设定用相同名称', anatomyExample: '例如：鹰头与前爪、狮子躯干与后腿，背部一对羽翼、一条狮尾；前半羽毛、后半兽毛。写明融合部位、数量和连接。' }
};
export const SCENE_KINDS = ['background', 'foreground'];
export const subjectTypeFor = item => SCENE_KINDS.includes(item?.outputType) || SCENE_KINDS.includes(item?.kind) ? 'scene' : item?.subjectType ?? 'human';
export const subjectFor = item => SUBJECT_TYPES[subjectTypeFor(item)];
export const resourceKindsFor = item => subjectFor(item)?.kinds || [];
export const resourceName = (kind, item) => subjectFor(item)?.names[kind] || ({ background: '背景', foreground: '前景' }[kind]) || kind;
export const subjectLabel = item => subjectFor(item)?.label || '场景';
export const isFantasy = item => !!subjectFor(item)?.fantasy;
export const resourceMatchesSubject = (kind, item, type) => SCENE_KINDS.includes(kind) || subjectTypeFor(item) === type || (kind === 'costume' && ['human', 'fantasy-humanoid'].includes(type) && ['human', 'fantasy-humanoid'].includes(subjectTypeFor(item)));
export function validateSubjectType(value = 'human') {
  if (typeof value !== 'string' || !Object.hasOwn(SUBJECT_TYPES, value)) throw new Error('主体类别无效，请选择人物、动物、人形幻想种或兽形幻想种。');
  return value;
}
export function validateSpecies(value, required = true) {
  if (typeof value !== 'string' || value.length > 80 || (required && !value.trim())) throw new Error('请填写 80 字以内的物种／种族；同一设定请使用相同名称。');
  return value.trim();
}
export function validateAnatomy(value, required = true) {
  if (typeof value !== 'string' || value.length > 600 || (required && !value.trim())) throw new Error('请填写 600 字以内的身体结构设定，明确肢体数量、连接位置及融合部位。');
  return value.trim();
}
