import {MAX_SEQUENCE_FRAMES} from './public/pose-sequences.js';
import {MAX_TWEEN_FRAMES} from './public/pose-tweens.js';
import {COSTUME_DESIGNS,COSTUME_PIECE_IDS} from './public/costume-series.js';
import { McpServer } from '@modelcontextprotocol/server';
import { serveStdio } from '@modelcontextprotocol/server/stdio';
import * as z from 'zod/v4';
import { readFile, stat } from 'node:fs/promises';
import { isAbsolute, basename } from 'node:path';
import { pathToFileURL } from 'node:url';
import { SUBJECT_TYPES } from './public/subject-types.js';
import { CAMERA_DIRECTIONS, CAMERA_PITCHES, SHOT_SIZES, SCENE_LIGHTS, SCENE_PROPS, ROLE_DETAILS } from './public/job-settings.js';
import { STYLE_OPTIONS, effectsFor } from './public/effects.js';
import { MAX_IMAGE_BYTES, imageType } from './catalog.mjs';
import {normalizeTags} from './public/tags.js';
import {EXPRESSIONS} from './public/expressions.js';

const endpoint = new URL(process.env.STUDIO_URL || 'http://127.0.0.1:3190');
if (endpoint.protocol !== 'http:' || !['localhost','127.0.0.1'].includes(endpoint.hostname) || endpoint.username || endpoint.password || endpoint.search || endpoint.hash || endpoint.pathname !== '/') throw new Error('STUDIO_URL 必须指向本机人物工坊。');
let csrf;
async function bootstrap() { const response=await fetch(new URL('/api/bootstrap',endpoint));if(!response.ok)throw new Error('人物工坊无法连接，请先 npm start。');const data=await response.json();csrf=data.csrf;return data; }
async function request(path, input, id, upload) {
  if (input !== undefined && !csrf) await bootstrap();
  const options = input === undefined ? {} : {method:'POST',headers:{'X-Studio-Token':csrf,...(id?{'Idempotency-Key':id}:{}),...(upload?upload:{'Content-Type':'application/json'})},body:upload?input:JSON.stringify(input)};
  let response=await fetch(new URL(path,endpoint),options);
  if (response.status===403 && input!==undefined) {await bootstrap();options.headers['X-Studio-Token']=csrf;response=await fetch(new URL(path,endpoint),options);}
  const data=await response.json();if(!response.ok)throw new Error(data.error||`请求失败 ${response.status}`);return data;
}
const id = z.string().uuid();
const assetId = z.string().regex(/^[\w-]+$/);
const kind = z.enum(['pose','costume','face','surface','background','foreground','source']);
const subjectType=z.enum(['human','animal','fantasy-humanoid','fantasy-beast']);
const role=z.object({face:assetId,hairFaceId:assetId.optional().describe('人物发型参考的第二张头像 ID，只移植发型与发色；face 保留主头像身份与表情，省略时沿用原发型。'),partImages:z.object(Object.fromEntries(Object.values(ROLE_DETAILS).flatMap(group=>Object.keys(group).map(key=>[key,assetId.optional()])))).strict().optional(),attachments:z.object(Object.fromEntries(Object.values(ROLE_DETAILS).flatMap(group=>Object.keys(group).map(key=>[key,z.string().max(100).optional()])))).strict().optional(),expressionAssetId:assetId.optional().describe('所选原头像的表情版本，取 get_expression_set 返回的 saved.resourceId；省略时沿用原表情。'),costume:assetId.optional(),surface:assetId.optional(),gender:z.enum(['reference','male','female']).default('reference'),position:z.string().max(120).default(''),species:z.string().max(80).optional(),anatomy:z.string().max(600).optional()});
const settings=z.object({
  subjectType:subjectType.default('human'),outputType:z.enum(['image','character-sheet','background','foreground']).default('image'),
  selections:z.object({pose:assetId.optional(),background:assetId.optional(),foreground:assetId.optional()}).default({}),characters:z.array(role).max(6).default([]),
  prompt:z.string().max(4000).default(''),style:z.string().default('photo'),effect:z.string().default('none'),background:z.enum(['studio','white','transparent','opaque']).default('studio'),
  size:z.enum(['1024x1536','1024x1024','1536x1024']).default('1024x1536'),quality:z.enum(['low','medium','high']).default('medium'),
  cameraDirection:z.enum(Object.keys(CAMERA_DIRECTIONS)).optional().describe('单张主体图片的相机方向。front / back 为正面 / 背面，方位以主体自身的左右为准；left / right 是相对原摄影者绕拍约 30°。'),
  cameraPitch:z.enum(Object.keys(CAMERA_PITCHES)).optional().describe('独立俯仰角度：reference 沿用、level 平视、high 俯拍、low 仰拍、overhead 垂直顶拍。'),
  shotSize:z.enum(Object.keys(SHOT_SIZES)).optional().describe('单张主体图片的景别。full 全身、medium 半身、close 头部特写、wide 环境远景。'),
  sceneLight:z.enum(Object.keys(SCENE_LIGHTS)).optional().describe('仅制作背景时可设。光源相对背景原图的方位，生成主体图片时自动沿用背景资源的主光。'),
  sceneProps:z.array(z.object({kind:z.enum(Object.keys(SCENE_PROPS)),assetId:assetId.optional(),roles:z.array(z.number().int().min(1).max(6).nullable()).max(3)})).max(6).optional().describe('画面中的共享道具实例。roles 按款式使用位排列，角色从 1 开始，空位用 null。'),
  title:z.string().max(80).optional(),sourceId:assetId.optional()
});
function output(value) { return {content:[{type:'text',text:JSON.stringify(value,null,2)}]}; }
export function createMcpServer() {
  const server=new McpServer({name:'character-studio',version:'1.0.0'});
  function tool(name,description,schema,handler,readOnly=false) {
    server.registerTool(name,{description,inputSchema:z.object(schema),annotations:{readOnlyHint:readOnly,destructiveHint:false,openWorldHint:!readOnly}},async args=>{
      try{return output(await handler(args));}catch(error){return {isError:true,content:[{type:'text',text:error.message}]};}
    });
  }
  tool('transfer_photo_style','将上传的完整照片转为指定视觉类型及下属风格方案。保留主体、动作和构图关系，无需拆解或填写提示词。先用 upload_reference 上传 kind=source，再传 sourceId；沿用设置中的通道、队列和精确复用规则。重试沿用原 requestId。',{requestId:id,sourceId:assetId,style:z.enum(STYLE_OPTIONS.map(item=>item.id)),effect:z.string().default('none'),size:z.enum(['1024x1536','1024x1024','1536x1024']).default('1024x1536'),quality:z.enum(['low','medium','high']).default('medium'),prompt:z.string().max(4000).default(''),regenerate:z.boolean().default(false)},({requestId,...input})=>request('/api/jobs',{...input,outputType:'style-transfer',background:'opaque'},requestId));
  tool('studio_info','查询可用主体类别、机位方向、景别、背景主光、画风、效果和已保存通道。API Key 不返回；所有制作沿用网页设置。',{},async()=>({url:endpoint.origin,settings:await request('/api/settings'),subjectTypes:SUBJECT_TYPES,cameraDirections:CAMERA_DIRECTIONS,cameraPitches:CAMERA_PITCHES,shotSizes:SHOT_SIZES,sceneLights:SCENE_LIGHTS,sceneProps:SCENE_PROPS,partKinds:ROLE_DETAILS,costumePieces:COSTUME_DESIGNS,poseTweenMaxFrames:MAX_TWEEN_FRAMES,poseSequenceMaxFrames:MAX_SEQUENCE_FRAMES,styles:STYLE_OPTIONS.map(({id,label})=>({id,label,effects:effectsFor(id).map(({id,label})=>({id,label}))}))}),true);
  tool('list_resources','按类别、标签和文字搜索资源。tags 同时匹配所有指定标签；返回可用于批量制作的资源 ID 与图片地址。', {kind,partKind:z.string().max(50).optional().describe("小件图片使用 kind=source 和所属 partKind"),subjectType:subjectType.optional(),tags:z.array(z.string().max(32)).max(20).default([]),query:z.string().max(200).default(''),offset:z.number().int().min(0).default(0),limit:z.number().int().min(1).max(100).default(30)},async args=>{
    const tags=normalizeTags(args.tags),data=await bootstrap(),items=(args.kind==="source"&&args.partKind?data.partAssets.filter(a=>a.partKind===args.partKind):data.catalogs[args.kind]||[]).filter(item=>!item.superseded&&!item.expression&&tags.every(tag=>item.tags?.includes(tag))&&(!args.subjectType||(item.subjectType||'human')===args.subjectType)&&JSON.stringify(item).toLowerCase().includes(args.query.toLowerCase()));
    return {total:items.length,items:items.slice(args.offset,args.offset+args.limit).map(item=>({...item,imageURL:new URL(`/assets/${args.kind}/${item.id}`,endpoint).href}))};
  },true);
  tool('tag_resources','为选中的资源批量添加或移除标签，不生成图片。每个资源最多 20 个标签；同一请求先全部校验再保存。',{items:z.array(z.object({kind:z.enum(['pose','costume','face','surface','background','foreground']),id:assetId})).min(1).max(5000),add:z.array(z.string().max(32)).max(20).default([]),remove:z.array(z.string().max(32)).max(20).default([])},args=>request('/api/resource-tags',args));
  tool('generate_expression_set',`按原头像补齐 ${EXPRESSIONS.length} 种表情，自动入库及打标签。先用 get_expression_set 加载已有结果；仅 replaceExpressions 中的表情重新出图，其余已有和等待任务复用。重抽成功替代对应版本，失败保留旧图。同一次提交重试须复用 requestId。replaceExisting 仅兼容旧调用。`,{requestId:id,faceId:assetId,replaceExpressions:z.array(z.enum(EXPRESSIONS.map(item=>item.id))).max(EXPRESSIONS.length).optional(),replaceExisting:z.boolean().optional()},({requestId,...input})=>request('/api/expression-sets',input,requestId));
  tool('get_expression_set','按原头像查询全套表情状态、各通道的已有结果和失败信息；传入已生成表情也可找回所属组，不生成图片。',{faceId:assetId},args=>request(`/api/expression-sets?faceId=${encodeURIComponent(args.faceId)}`),true);
  tool('create_pose_sequence','用动作描述规划完整骨架方案。首尾都可省略；stylePoseId 只约束画法，留空时沿用首尾或库内默认骨架。count 为整段总帧数，包含已提供首尾。先查看方案再调用 generate_pose_sequence_frames。相同配置复用；regenerate 制作新方案并保留旧序列。',{requestId:id,action:z.string().min(1).max(2000),count:z.number().int().min(2).max(MAX_SEQUENCE_FRAMES),stylePoseId:assetId.optional(),startPoseId:assetId.optional(),endPoseId:assetId.optional(),regenerate:z.boolean().default(false)},({requestId,...input})=>request('/api/jobs',{...input,outputType:'pose-plan'},requestId));
  tool('get_pose_sequence','省略 planId 列出动作方案历史；提供 planId 返回方案和完整顺序帧，含固定首尾、已有图、待生成或失败的帧。只查询，不生成。',{planId:id.optional()},args=>request(args.planId?`/api/pose-sequences/${args.planId}`:'/api/pose-sequences'),true);
  tool('generate_pose_sequence_frames','已查看动作方案后，按同一方案生成缺失的独立骨架帧。已提供的首尾原样计入总数；相同完整配置的成图复用，失败或取消的帧可补齐。任务进入全局队列，重试沿用原 requestId；返回 count 是生成任务数，totalCount 是包含首尾的总帧数。',{requestId:id,planId:id},({requestId,...input})=>request('/api/pose-sequences',input,requestId));
  tool('generate_pose_tweens','根据两张同类、同主体数量的骨架生成指定数量的补间帧，count 不含首尾。每帧都参考同一对首尾，使用已配置出图通道并进入队列；相同配置复用已有帧，失败或取消后重新提交只补齐缺帧。结果按顺序保存，需审核后入库。重试沿用原 requestId。',{requestId:id,startPoseId:assetId,endPoseId:assetId,count:z.number().int().min(1).max(MAX_TWEEN_FRAMES)},({requestId,...input})=>request('/api/pose-tweens',input,requestId));
  tool('get_pose_tweens','查询骨架补间批次，不生成图片；省略 id 列出历史，指定 id 返回按帧序排列的任务。',{id:id.optional()},args=>request(args.id?`/api/batches/${args.id}`:'/api/pose-tweens'),true);
  tool('create_costume_series','从一件衣物提炼主题与共同设计语言，在方案板规划六款同系列新衣，可以同品类也可以跨品类。完成后先查看，再用 generate_costume_pieces 按编号制作款式。会使用已配置的图像额度；无需手写提示词。',{requestId:id,sourceAssetId:assetId,title:z.string().min(1).max(80).optional(),prompt:z.string().max(4000).default(''),regenerate:z.boolean().default(false)},({requestId,...input})=>request('/api/jobs',{...input,outputType:'costume-plan'},requestId));
  tool('get_costume_series','省略 seriesId 时列出保存的服饰系列；提供编号则返回方案及每款设计的当前任务、已有图与入库关联，不生成图片。',{seriesId:id.optional()},args=>request(args.seriesId?`/api/costume-series/${args.seriesId}`:'/api/costume-series'),true);
  tool('generate_costume_pieces','按已查看的方案板制作指定款式，pieceIds 从 get_costume_series 的 items 取得。新版使用 design-1 至 design-6，可同类别生成不同设计；旧类别编号仅用于旧方案。每款同时参考原图与同一方案；完全相同配置复用已有图。replacePieces 仅重做指定款，旧图保留。结果先审核，再用 import_resources 入库。',{requestId:id,seriesId:id,pieceIds:z.array(z.enum(COSTUME_PIECE_IDS)).min(1).max(8),replacePieces:z.array(z.enum(COSTUME_PIECE_IDS)).max(8).default([])},({requestId,...input})=>request('/api/costume-series',input,requestId));
  tool('convert_resource','将已有头像或衣服转绘为写实资源，沿用已保存的出图通道并进入队列。原资源不变，相同原图内容和完整配置复用；完成后先审核，再用 import_resources 作为新资源入库。重试须使用原 requestId。',{requestId:id,sourceKind:z.enum(['face','costume']),sourceAssetId:assetId,prompt:z.string().max(4000).default(''),regenerate:z.boolean().default(false)},({requestId,...input})=>request('/api/jobs',{...input,outputType:'resource-conversion'},requestId));
  tool('upload_reference','上传本机图片到项目资源库。拆解源图使用 source；格式 PNG/JPEG/WebP，最大 20 MB。',{path:z.string(),kind,partKind:z.string().max(50).optional(),subjectType:subjectType.optional(),species:z.string().max(80).optional(),anatomy:z.string().max(600).optional()},async args=>{
    if(!isAbsolute(args.path))throw new Error('图片路径必须是绝对路径。');const info=await stat(args.path);if(!info.isFile()||info.size>MAX_IMAGE_BYTES)throw new Error('图片需为 20 MB 以内的文件。');
    const bytes=await readFile(args.path);return request(`/api/uploads/${args.kind}`,bytes,null,{'Content-Type':imageType(bytes),'X-File-Name':encodeURIComponent(basename(args.path)),...(args.partKind?{'X-Part-Kind':args.partKind}:{}),...(args.subjectType?{'X-Subject-Type':args.subjectType}:{}),'X-Species':encodeURIComponent(args.species||''),'X-Anatomy':encodeURIComponent(args.anatomy||'')});
  });
  tool('generate_image','提交图片、角色资料图、背景或前景到生产队列，会消耗设置中通道的额度。人物必须提供骨架和角色参考；场景提供 title 及 prompt/sourceId。同一次请求重试必须复用 requestId。',{requestId:id,settings,regenerate:z.boolean().default(false)},args=>request('/api/jobs',{...args.settings,regenerate:args.regenerate},args.requestId));
  tool('generate_batch','批量模特商品展示，最多 100 张。wardrobe 固定 1 骨架 1 头像逐件换衣；paired 按序配对，单项固定复用。所有行先校验再入队，使用全局通道。',{requestId:id,name:z.string().max(80).default('模特商品展示'),mode:z.enum(['wardrobe','paired']),poses:z.array(assetId).min(1).max(100),costumes:z.array(assetId).min(1).max(100),faces:z.array(assetId).min(1).max(100),settings},({requestId,...input})=>request('/api/batches',input,requestId));
  tool('extract_resources','把已上传的源图拆解成所选资源并入队，会按资源数量调用模型；每个主体必须有位置与相应种族、结构描述。',{requestId:id,sourceId:assetId,title:z.string().min(1).max(80),subjectType:subjectType.default('human'),subjects:z.array(z.object({gender:z.enum(['reference','male','female']).default('reference'),position:z.string().max(120).default(''),species:z.string().max(80).optional(),anatomy:z.string().max(600).optional()})).min(1).max(6),resourceKinds:z.array(z.enum(['pose','costume','face','surface'])).min(1).max(4),inferHidden:z.boolean().default(true),prompt:z.string().max(4000).default('')},({requestId,...input})=>request('/api/extractions',input,requestId));
  tool('realize_artwork','从一张已上传的单角色原画自动制作写实头像和衣服。只需 sourceId，无需角色名和提示词。可用 get_job 查询、resume_extraction 续作，审核后用 import_resources 入库。',{requestId:id,sourceId:assetId,resourceKinds:z.array(z.enum(['face','costume'])).min(1).max(2).optional()},({requestId,...input})=>request('/api/extractions',{...input,renderMode:'live-action'},requestId));
  tool('get_queue','查看正在制作、等待和最近完成的任务。',{},()=>request('/api/queue'),true);
  tool('get_job','查询任务进度、结果及图片地址。不会重新提交制作。',{id},args=>request(`/api/jobs/${args.id}`),true);
  tool('relight_image','锁定已完成人物图片的构图，按所选背景校正现场光。首次制作会调用一次已配置通道，完成后保留原图及独立校正版。',{requestId:id,sourceJobId:id},({requestId,sourceJobId})=>request('/api/jobs',{outputType:'scene-relight',sourceJobId},requestId));
  tool('get_batch','查询一批图片的所有任务及结果。',{id},args=>request(`/api/batches/${args.id}`),true);
  tool('cancel_waiting','取消尚未开始的任务。已开始制作时拒绝取消，不会重复提交。',{id},args=>request(`/api/jobs/${args.id}/cancel`,{}));
  tool('resume_extraction','继续失败或中断的拆解，仅制作尚未完成的资源。设置须匹配原任务通道、模型和地址。',{id},args=>request(`/api/extractions/${args.id}/resume`,{}));
  tool('import_resources','将用户已审核的拆解、场景、资源转绘、骨架补间、动作骨架帧或系列单品加入资料库；拆解填写 keys（pose、face、costume 或多人的 face-1 等），场景和转绘不用 keys。不调用模型。',{id,title:z.string().min(1).max(80),keys:z.array(z.string().max(30)).min(1).max(25).optional()},args=>request(args.keys?`/api/extractions/${args.id}/import`:`/api/jobs/${args.id}/import`,{title:args.title,kinds:args.keys}));
  return server;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href) serveStdio(createMcpServer);
