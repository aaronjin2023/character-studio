import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {DATA,imageType} from './catalog.mjs';
import {conversionSource} from './resource-conversion.mjs';
import {validateProvider} from './generation.mjs';
import {subjectTypeFor,subjectFor} from './public/subject-types.js';
import {COSTUME_PIECES,COSTUME_DESIGNS,COSTUME_PIECE_IDS,COSTUME_SERIES_REVISION,costumePiecesFor} from './public/costume-series.js';

export async function costumeSource(input,jobs) {
  if(input.outputType==='costume-plan')return conversionSource('costume',input.sourceAssetId);
  const plan=jobs.get(input.seriesId);
  if(!plan || plan.outputType!=='costume-plan' || plan.status!=='completed' || !plan.output || !plan.sourceSnapshot)throw new Error('请先完成并查看系列设计方案，再制作单品。');
  const bytes=await readFile(join(DATA,'jobs',plan.id,plan.sourceSnapshot));
  const planBytes=await readFile(join(DATA,'jobs',plan.id,plan.output));
  imageType(bytes);imageType(planBytes);
  return {source:plan.references[0],bytes,hash:plan.sourceHash,plan,planBytes,planHash:createHash('sha256').update(planBytes).digest('hex')};
}
export function costumeSettings(input,source) {
  const piece=input.outputType==='costume-piece',spec=costumePiecesFor(source.plan).find(item=>item.id===input.pieceId);
  if(piece&&!spec)throw new Error('请选择该系列方案中的有效款式编号。');
  if(input.regenerate!==undefined&&typeof input.regenerate!=='boolean')throw new Error('重新制作必须为勾选状态。');
  const prompt=piece?source.plan.prompt:input.prompt??'';
  if(typeof prompt!=='string'||prompt.length>4000)throw new Error('系列要求请控制在 4,000 字以内。');
  const title=piece?`${source.plan.title.slice(0,60)} · ${spec.label}`:input.title??`${source.source.title.slice(0,55)} · 服饰系列`;
  if(typeof title!=='string'||!title.trim()||title.length>80)throw new Error('请输入 80 字以内的系列名称。');
  return {...validateProvider(input),outputType:input.outputType,sourceAssetId:source.source.id,sourceHash:source.hash,
    seriesRevision:piece?source.plan.seriesRevision:COSTUME_SERIES_REVISION,
    ...(piece?{seriesId:source.plan.id,pieceId:spec.id,planHash:source.planHash}:{}),
    title:title.trim(),prompt:prompt.trim(),subjectType:subjectTypeFor(source.source),subjectRevision:subjectFor(source.source).revision,
    characters:[],selections:{},personCount:0,style:'reference',styleRevision:1,effect:'none',effectRevision:0,
    background:'white',size:piece?'1024x1536':'1536x1024',quality:'medium'};
}
export function costumePrompt(job) {
  const reference='图 1 是本系列唯一的原始衣物设计来源。忽略人物身份、姿态和场景，只提取衣物的设计。保留原图的绘制媒介与视觉类型；摄影资源保持真实面料、缝线、厚度、重力与接缝，插画资源保持对应画风。';
  if(job.seriesRevision>=2){
    const labels=COSTUME_DESIGNS.map(item=>item.label).join('、');
    const language='从原衣物提炼系列主题，以及主题如何通过色彩关系、材质肌理、轮廓、结构线、图案布局、留白和细部工艺表达。分清主题、设计语言和衣服类别：主题与设计语言贯穿系列，衣服类别可以相同，也可以不同，不要求凑齐类别。不要把抽象主题只理解为同一张印花的重复粘贴。';
    if(job.outputType==='costume-plan')return `${reference}
制作一张同主题服饰系列设计方案板。${language} 原图可见事实标为“原衣依据”，推导出来的主题和新设计标为“延展建议”。用户指定主题时，以其主题为方向，用原衣的可见设计支撑，不把猜测写成事实。
先在顶部用简短中文说明系列主题，展示共同的配色、材质关系、核心形态或纹样逻辑，并区分必须保持和可以变化的部分。再以清晰的 2 行 3 列展示六款新衣服的设计草案，依次明确标为「${labels}」，每格只有一款，编号不可重复或遗漏。
六款是同一设计师、同一系列的不同款式。先整体规划六款再绘制，使它们彼此有明确区别，同时服从共同设计语言；同一类别可以出现多款。每款至少在廓形、裁片分割、领袖结构、层叠方式、材质组合、纹样构图或留白比例中的两项有实质变化，不能只换颜色或调整衣长。每格加一个简短款名和设计要点，说明“如何延续主题”与“本款的独特变化”。品类由款式设计自然决定，不预先分配上衣、裤子、裙子、鞋帽等名额，也不以补全穿搭为目标。
把主题的视觉联想转译为不同的形态、结构、材质与纹样组织，不限于装饰图案。保留原系列的审美气质和配色关系，让款式有强弱节奏和独立可穿性。
白底，正面服装平面设计或静物草图，无人物与模特，无营销文案。每款衣服完整可辨，细节足够用于下一步独立制作。
${job.prompt?`用户的系列主题与方向：${job.prompt}`:'直接从原衣物推导主题与系列，无需用户补写提示词。'}`;
    const spec=costumePiecesFor(job).find(item=>item.id===job.pieceId);
    return `${reference}
图 2 是同主题系列的设计方案板，包含编号清晰的六款设计。${language}
本次仅制作图 2 中标为「${spec.label}」的那一款：准确沿用该格的衣物类别、廓形、裁片、领袖、层叠、材质组合、纹样位置和留白比例；以图 1 补足共同材质和工艺细节。必须体现这款相对原衣和其他款式的独特设计，不得选错编号、把多个格子的设计混为一件，或回退为原衣的简单换色。保持整套共同的主题、配色与设计语言。不要参考另一件已生成单品，以免累积偏差。
制作独立可复用的单款衣服资源，正面或轻微斜角静物陈列，完整入镜，纯白底，柔和一致的光照。无穿戴者、人体模特、其他款式、文字、色卡或拼图。保留可信的面料、结构和功能性，遮挡细节只按该款方案合理补全。
${job.prompt?`全系列共同方向：${job.prompt}`:''}`;
  }
  if(job.outputType==='costume-plan')return `${reference}
制作一张清晰的服饰系列设计方案板。先从图 1 归纳设计语言：主辅色及占比、面料与质感、轮廓比例、结构线、纹样、闭合方式、五金、装饰位置、时代气质与使用场景。把可见事实与合理补充分别标为“原衣依据”和“延展建议”，不要声称推断是原图已有设计。
用大色块、材质近景、轮廓线稿、局部结构图和简短中文标签，记录该系列必须保持的核心特征，以及可以变化的部分。再展示如何把这些规则转译到上装、裤装、半裙、连衣裙、外套、鞋履、头饰和包袋。标出主次与留白：关键纹样、五金或滚边应按单品功能改变尺度和位置，避免每件都堆叠全部元素。保持配套感，允许有安静的基础款。白底，排版疏朗，无人物和模特，无营销文案。
${job.prompt?`本系列补充方向：${job.prompt}`:'优先从原衣物本身提炼，无需额外角色名或风格词。'}`;
  const spec=COSTUME_PIECES.find(item=>item.id===job.pieceId);
  return `${reference}
图 2 是本系列已确认的设计方案板，只作为设计规则参考，不作为成品排版。严格使用同一份方案的主辅色、材质关系、轮廓语言与装饰主次；图 1 负责原始设计细节。不要参考或延续另一件生成单品的误差。
本次只制作「${spec.label}」：${spec.brief} 按单品用途重新设计，做到像同一设计师同一系列的完整新款，不是原衣服的换色、拉长或缩短。装饰适度，保留功能结构和留白。未知背面可按同一结构逻辑合理补全。
输出独立可复用的服饰资源：${spec.id==='shoes'?'完整一双鞋，左右配对':'仅一件目标单品'}，正面或轻微斜角静物陈列，完整入镜，纯白底，柔和一致的光照。无穿戴者、皮肤、头发、人体、人体模特、其他搭配单品、文字、水印、色卡或分镜拼图。不要照搬方案板的多个图块。
${job.prompt?`全系列共同方向：${job.prompt}`:''}`;
}
export function costumeItems(jobs,plan) {
  const all=[...jobs];
  return costumePiecesFor(plan).map(spec=>{
    const matching=all.filter(job=>job.outputType==='costume-piece'&&job.seriesId===plan.id&&job.pieceId===spec.id).sort((a,b)=>b.createdAt.localeCompare(a.createdAt));
    return {...spec,job:matching.find(job=>['queued','running'].includes(job.status))||matching[0]||null,saved:matching.find(job=>job.status==='completed'&&job.output)||null};
  });
}
export function costumeBatch(input) {
  if(typeof input.seriesId!=='string'||!/^[0-9a-f-]{36}$/.test(input.seriesId))throw new Error('系列编号无效。');
  const pieces=input.pieceIds,replace=input.replacePieces??[];
  if(!Array.isArray(pieces)||!pieces.length||pieces.length>8||new Set(pieces).size!==pieces.length||pieces.some(id=>!COSTUME_PIECE_IDS.includes(id)))throw new Error('请选择方案板中的款式编号。');
  if(!Array.isArray(replace)||new Set(replace).size!==replace.length||replace.some(id=>!pieces.includes(id)))throw new Error('重做款式必须在本次选择的款式中。');
  return {seriesId:input.seriesId,pieceIds:COSTUME_PIECE_IDS.filter(id=>pieces.includes(id)),replacePieces:COSTUME_PIECE_IDS.filter(id=>replace.includes(id))};
}
