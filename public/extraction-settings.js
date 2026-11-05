import { pipelineIdentity } from './providers.js';
import { subjectTypeFor, resourceKindsFor, resourceName, isFantasy } from './subject-types.js';
export const RESOURCE_NAMES = { pose: '骨架', costume: '衣服', face: '头像', surface: '体表' };
export function subjectsFor(job) { return job.subjects || [{ position: '', gender: 'reference' }]; }
export function extractionKinds(job) { return resourceKindsFor(job).filter(kind => job.resourceKinds === undefined || job.resourceKinds.includes(kind)); }
export function extractionParts(job) {
  const subjects = subjectsFor(job), kinds = extractionKinds(job);
  return [{ key: 'pose', kind: 'pose', title: subjects.length > 1 ? '整体骨架' : '骨架' }, ...subjects.flatMap((subject, index) => resourceKindsFor(job).filter(kind => kind !== 'pose').map(kind => ({ key: subjects.length === 1 ? kind : `${kind}-${index + 1}`, kind, characterIndex: index, title: subjects.length === 1 ? resourceName(kind, job) : `角色 ${index + 1} · ${resourceName(kind, job)}` })))].filter(part => kinds.includes(part.kind));
}
export function extractionKey(job) {
  if(job.renderMode==='live-action')return JSON.stringify([job.renderMode,job.artworkRevision,job.conversionRevision,job.sourceHash,extractionKinds(job),job.provider,...(job.provider==='api'?[job.model,job.baseURL]:[]),...pipelineIdentity(job)]);
  return JSON.stringify([subjectTypeFor(job), job.subjectRevision ?? 1, job.sourceId, job.prompt, job.inferHidden, subjectsFor(job).map(subject => [subject.position || '', subject.gender || 'reference', subject.species || '', ...(isFantasy(job) ? [subject.anatomy?.trim() || ''] : [])]), extractionKinds(job), job.provider, ...(job.provider === 'api' ? [job.model, job.baseURL] : []),...pipelineIdentity(job),...(job.headwearRevision?[{headwearRevision:job.headwearRevision}]:[]),...(job.poseStyleId?[{poseStyleId:job.poseStyleId}]:[])]);
}
