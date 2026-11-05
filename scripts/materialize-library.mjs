// Offline validation of optional local catalog indexes. Never downloads images.
import {readFile} from 'node:fs/promises';
import {CATALOG,KINDS,assetPath,imageType} from '../catalog.mjs';
let checked=0,failed=0;
for(const kind of KINDS)for(const item of CATALOG[kind])for(const thumb of item.local?[false]:[false,true]){
  try{imageType(await readFile(await assetPath(kind,item.id,thumb)));checked++;}
  catch(error){failed++;console.error(`${kind}/${item.id}: ${error.message}`);}
}
console.log(JSON.stringify({checked,failed}));
if(failed)process.exitCode=1;
