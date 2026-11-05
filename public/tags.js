export function normalizeTags(values) {
  if(!Array.isArray(values)||values.length>20)throw new Error('每个资源最多 20 个标签。');
  const tags=values.map(value=>{
    if(typeof value!=='string'||/[\u0000-\u001f\u007f]/.test(value))throw new Error('标签必须是文本，不能包含控制字符。');
    const tag=value.normalize('NFKC').trim().replace(/\s+/g,' ');
    if(!tag||Array.from(tag).length>32||/[,，]/.test(tag))throw new Error('每个标签需为 1–32 字，不能包含逗号。');
    return tag;
  });
  return [...new Set(tags)];
}
export function matchesTag(item,filter) {
  return !filter || (filter==='untagged' ? !item.tags?.length : (item.tags||[]).includes(filter.slice(4)));
}
