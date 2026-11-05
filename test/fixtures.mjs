// Synthetic test assets only; never read or overwrite the user's resource library.
import {mkdtemp,mkdir,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,dirname} from 'node:path';
import {execFileSync} from 'node:child_process';
const data=await mkdtemp(join(tmpdir(),'character-studio-test-'));
process.env.STUDIO_DATA_DIR=data;
const png=execFileSync('ffmpeg',['-loglevel','error','-f','lavfi','-i','color=c=gray:s=24x32','-frames:v','1','-f','image2pipe','-c:v','png','-']);
const catalog={pose:['full_single_P018_front','full_sexy_P001_high','pair60_P001_front','pair60_P008_front'],costume:['SPR-0161','SPR-0004','AUT-0054'],face:['f71f980dde3','f192f568573']};
const local={pose:['local-baiyi-01-pose','local-male-P018-front'],costume:['local-baiyi-01-costume','local-male-modern-costume','local-male-wuxia-costume'],face:['local-baiyi-01-face','local-male-modern-face','local-male-wuxia-face']};
for(const [entries,isLocal] of [[catalog,false],[local,true]]){
  for(const [kind,ids] of Object.entries(entries)){
    entries[kind]=ids.map(id=>({id,title:'合成测试 '+id,category:'合成测试',group:id.startsWith('pair')?'双人':'标准',gender:id.includes('-male-')?'male':'female',personCount:id.startsWith('pair')?2:1,thumb:`thumb/${id}.png`,full:`full/${id}.png`,source:'https://example.com'}));
    for(const item of entries[kind])for(const path of isLocal?[join(data,'local-assets',kind,item.id+'.png')]:[join(data,'library',kind,item.full),join(data,'library',kind,item.thumb)]){
      await mkdir(dirname(path),{recursive:true});await writeFile(path,png);
    }
  }
}
await writeFile(join(data,'catalogs.json'),JSON.stringify(catalog));
await writeFile(join(data,'local-catalogs.json'),JSON.stringify(local));
