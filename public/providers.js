export function providerLabel(job) {
  const label={quota:'GPT 额度',api:'图像 API',comfyui:'外部 ComfyUI',imported:'已存样稿'}[job.provider]||'未记录通道';
  return label;
}
export function pipelineIdentity(job) {
  return job.provider==='comfyui'?[job.comfy?.baseURL,job.comfy?.workflowHash,job.comfy?.authHeader]:[];
}
