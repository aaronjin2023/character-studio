export const COSTUME_SERIES_REVISION = 2;
export const COSTUME_DESIGNS = Array.from({length:6},(_,index)=>({id:`design-${index+1}`,label:`款式 ${String(index+1).padStart(2,'0')}`}));
// Existing plans keep their category slots so saved images and queued work remain reachable.
export const COSTUME_PIECES = [
  {id:'top',label:'上装',brief:'设计一件上装，根据原设计选择合适的领型、袖型、门襟与装饰位置。'},
  {id:'bottom',label:'裤装',brief:'设计一条裤装，把原设计语言转译到裤型、腰头、口袋、侧缝与裤脚。'},
  {id:'skirt',label:'半裙',brief:'设计一件半裙，把原设计语言转译到裙型、腰线、褶量、分割线与裙摆。'},
  {id:'dress',label:'连衣裙',brief:'设计一件连衣裙，重新组织上身与裙摆比例，使整件设计有主次。'},
  {id:'outerwear',label:'外套',brief:'设计一件外套，延续系列轮廓、材质层次、扣具和结构线。'},
  {id:'shoes',label:'鞋履',partKind:'shoes',brief:'设计一双配套鞋履，把材质、形状与五金语言转译到鞋面、鞋底与闭合结构。'},
  {id:'headwear',label:'头饰',partKind:'headwear',brief:'设计一件可拆卸头饰或帽子，提炼主形状与局部装饰，避免把整件衣服缩小戴在头上。'},
  {id:'bag',label:'包袋',partKind:'backpack',brief:'设计一件配套包袋，将结构线、材质与闭合方式转译到包身、提手或背带。'}
];
export const costumePiecesFor = plan => plan && (plan.seriesRevision??1)<2 ? COSTUME_PIECES : COSTUME_DESIGNS;
export const COSTUME_PIECE_IDS = [...COSTUME_DESIGNS,...COSTUME_PIECES].map(item=>item.id);
export const isCostumeSeries = job => ['costume-plan','costume-piece'].includes(job?.outputType);
