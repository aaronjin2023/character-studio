import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {ROOT, DATA, imageType} from './catalog.mjs';

const exec = promisify(execFile);
export const localRelight = process.platform === 'darwin';
const work = id => join(DATA, 'work', id, 'light');

async function pixels(path, width, height, format, signal) {
  const {stdout} = await exec('ffmpeg', ['-hide_banner','-loglevel','error','-nostdin','-i',path,'-vf',`scale=${width}:${height}`,'-frames:v','1','-pix_fmt',format,'-f','rawvideo','pipe:1'], {encoding:'buffer',maxBuffer:width*height*4+4096,timeout:30000,signal});
  if (stdout.length !== width*height*(format === 'gray' ? 1 : 3)) throw new Error('无法完整读取校光图片。');
  return stdout;
}

async function subjectMask(path, folder, name, signal) {
  const maskPath = join(folder, name + '-mask.png');
  try {
    const {stdout} = await exec('/usr/bin/swift', [join(ROOT,'scripts/person-mask.swift'),path,maskPath], {timeout:120000,signal});
    return {...JSON.parse(stdout), maskPath};
  } catch (error) {
    signal.throwIfAborted();
    throw new Error('本机人物识别失败，请检查 macOS Vision、Swift 和图片尺寸（最多 420 万像素）。');
  }
}

export async function prepareRelight(id, source, signal) {
  if (!localRelight) throw new Error('锁定底图的现场光校正需要 macOS Vision。');
  const folder = work(id);
  await mkdir(folder, {recursive:true});
  const base = await subjectMask(source, folder, 'source', signal);
  const mask = await pixels(base.maskPath,base.width,base.height,'gray',signal);
  if (!mask.some(v=>v>150)) throw new Error('原图中没有识别到人物，未提交用光参考制作。');
  return {...base,mask};
}

// Average the guide's lighting over nearby masked pixels. Only multiply source colours;
// no pixels, edges or coordinates from the guide are copied into the result.
export function transferLight(base, guide, mask, guideMask, w, h) {
  const cell = Math.max(4,Math.round(Math.min(w,h)/60)), cols=Math.ceil(w/cell), rows=Math.ceil(h/cell);
  const totals=new Float64Array(cols*rows*7), gains=new Float32Array(cols*rows*3);
  let overlap=0, union=0;
  for (let y=0;y<h;y++) for (let x=0;x<w;x++) {
    const p=y*w+x, weight=Math.min(mask[p],guideMask[p])/255;
    overlap+=weight; union+=Math.max(mask[p],guideMask[p])/255;
    if (!weight) continue;
    const t=(Math.floor(y/cell)*cols+Math.floor(x/cell))*7;
    totals[t]+=weight;
    for(let k=0;k<3;k++){totals[t+1+k]+=weight*base[p*3+k];totals[t+4+k]+=weight*guide[p*3+k];}
  }
  if (!union || overlap/union<0.8) throw new Error('用光参考的人物轮廓偏离原图，已保留原图。');
  for(let y=0;y<rows;y++) for(let x=0;x<cols;x++) {
    const sum=new Float64Array(7);
    for(let b=Math.max(0,y-1);b<=Math.min(rows-1,y+1);b++) for(let a=Math.max(0,x-1);a<=Math.min(cols-1,x+1);a++) {
      const weight=(a===x?2:1)*(b===y?2:1), t=(b*cols+a)*7;
      for(let k=0;k<7;k++)sum[k]+=weight*totals[t+k];
    }
    for(let k=0;k<3;k++) gains[(y*cols+x)*3+k]=Math.max(.42,Math.min(1.7,(sum[k+4]+10*sum[0]+1)/(sum[k+1]+10*sum[0]+1)));
  }
  const out=Buffer.from(base);
  for(let y=0;y<h;y++) for(let x=0;x<w;x++) {
    const p=y*w+x, alpha=mask[p]/255;
    if(!alpha)continue;
    const u=Math.max(0,Math.min(cols-1,(x+.5)/cell-.5)),v=Math.max(0,Math.min(rows-1,(y+.5)/cell-.5));
    const a=Math.floor(u),b=Math.floor(v),a1=Math.min(cols-1,a+1),b1=Math.min(rows-1,b+1),fx=u-a,fy=v-b;
    for(let k=0;k<3;k++){
      const g=(gains[(b*cols+a)*3+k]*(1-fx)+gains[(b*cols+a1)*3+k]*fx)*(1-fy)+(gains[(b1*cols+a)*3+k]*(1-fx)+gains[(b1*cols+a1)*3+k]*fx)*fy;
      out[p*3+k]=Math.min(255,Math.round(base[p*3+k]*(1+alpha*(g-1))));
    }
  }
  return out;
}

export async function finishRelight(id, source, guideBytes, base, signal) {
  imageType(guideBytes);
  const folder=work(id), guide=join(folder,'guide'), output=join(folder,'corrected.png');
  await writeFile(guide,guideBytes,{mode:0o600});
  const check=await subjectMask(guide,folder,'guide',signal), {width:w,height:h}=base;
  if(Math.abs((check.width/check.height)/(w/h)-1)>.015)throw new Error('用光参考改变了画幅，无法对齐原图。');
  if(base.faces.some(([x,y,width])=>!check.faces.some(([u,v])=>Math.hypot((u-x)*w,(v-y)*h)<Math.max(10,width*w*.3))))throw new Error('用光参考改变了人脸位置，已保留原图。');
  const [original,reference,guideMask]=await Promise.all([pixels(source,w,h,'rgb24',signal),pixels(guide,w,h,'rgb24',signal),pixels(check.maskPath,w,h,'gray',signal)]);
  const corrected=transferLight(original,reference,base.mask,guideMask,w,h);
  const raw=join(folder,'corrected.rgb');
  await writeFile(raw,corrected,{mode:0o600});
  await exec('ffmpeg',['-hide_banner','-loglevel','error','-nostdin','-y','-f','rawvideo','-s',`${w}x${h}`,'-pix_fmt','rgb24','-i',raw,'-frames:v','1',output],{timeout:30000,signal});
  return readFile(output);
}
