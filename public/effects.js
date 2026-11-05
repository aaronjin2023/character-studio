import { MANGA_EFFECTS } from './manga-effects.js';

export const STYLE_OPTIONS = [
  {
    "id": "photo",
    "label": "真实摄影",
    "group": "真实",
    "revision": 1,
    "prompt": "真实棚拍摄影，真实皮肤和衣料质感"
  },
  {
    "id": "manga",
    "label": "黑白漫画",
    "group": "漫画与动画",
    "revision": 1,
    "prompt": "黑白漫画原稿：黑色墨线、网点阴影、纸白高光、清楚的线条粗细与漫画化五官；以线与黑白灰重绘全部人物和环境，保留人物身份、衣装结构和骨架比例。照片仅作造型参考，最终画面具有明确手绘漫画质感"
  },
  {
    "id": "comic",
    "label": "彩色漫画",
    "group": "漫画与动画",
    "revision": 1,
    "prompt": "彩色漫画：以墨线、图形化色块与分层阴影重新绘制人物和环境，具体线条粗细及上色方法遵循所选风格方案；保留可辨识的漫画五官、服装设计和骨架规定的正常比例"
  },
  {
    "id": "anime",
    "label": "二维动画",
    "group": "漫画与动画",
    "revision": 2,
    "prompt": "日式二维手绘赛璐璐动画（2D anime cel animation）：清晰墨线轮廓、简化而可辨识的动漫五官、成束头发、平涂色块、分层硬边阴影。皮肤、服装和背景全部重新绘制为同一二维动漫画风。参考照片只提供脸型、发型、服装款式和配色；将身份特征转译为动漫角色，不采用真人摄影、照片滤镜、皮肤毛孔或三维写实渲染"
  },
  {
    "id": "illustration",
    "label": "手绘插画",
    "group": "绘画",
    "revision": 2,
    "prompt": "二维手绘插画：清晰的绘制轮廓、可见笔触、概括的色块与绘画光影；人物、衣服和背景统一画成插画。照片仅提供人物和服装设计参考，保留五官关系和服装结构，用绘画语言重新表现材质，不沿用照片纹理或摄影渲染"
  },
  {
    "id": "oil",
    "label": "油画",
    "group": "绘画",
    "revision": 1,
    "prompt": "布面油画：可见颜料堆叠、油彩厚薄变化、画布纹理与罩染层次；人物五官、皮肤、衣料和环境都用笔触与色块塑造，照片仅供身份和结构参考，最终是完整绘制的油画"
  },
  {
    "id": "ink",
    "label": "中国水墨",
    "group": "绘画",
    "revision": 1,
    "prompt": "宣纸水墨画：毛笔中锋侧锋、浓淡干湿墨色、飞白与留白，适量淡彩；人物面部、衣装与环境全部以笔墨重新表现，保留参考身份、服装结构与姿势"
  },
  {
    "id": "watercolor",
    "label": "水彩",
    "group": "绘画",
    "revision": 1,
    "prompt": "纸本透明水彩画：水色渗化、湿画法晕染、干笔边缘、透叠色层、留纸白高光和可见纸纹；人物、衣装、环境整体以水彩重新绘制，保留五官关系和造型"
  },
  {
    "id": "woodblock",
    "label": "木刻版画",
    "group": "绘画",
    "revision": 1,
    "prompt": "纸本套色木刻版画：刀刻轮廓、平面套色色块、纸面印痕和少量套印错位；人物、衣服、环境统一为手工版画语言，造型清楚，保留所选身份与姿势"
  },
  {
    "id": "editorial",
    "label": "杂志大片",
    "group": "杂志／电影／摄影",
    "revision": 1,
    "prompt": "时尚杂志编辑大片：经过设计的布景、明确的主辅光、克制的编辑级调色、精细的服装材质与留白，构图具有杂志内页的视觉秩序；保留指定人物、服装、姿势和完整画幅，以单张大片呈现"
  },
  {
    "id": "cinematic",
    "label": "电影画面",
    "group": "杂志／电影／摄影",
    "revision": 1,
    "prompt": "电影剧照：经过设计的场景光、分层的空间深度、统一的电影色彩关系、克制的颗粒与镜头光晕；人物与环境具有叙事氛围，保持原定姿势和服装，按所选画幅构图"
  },
  {
    "id": "film",
    "label": "复古胶片",
    "group": "杂志／电影／摄影",
    "revision": 1,
    "prompt": "复古胶片摄影：可辨识的银盐颗粒、柔和高光滚降、细微光晕、偏暖肤色与克制的综合色偏；服装和面部轮廓清楚，模拟真实底片成像层次而非画笔纹理"
  }
];

export const EFFECTS = [
  {
    "id": "dramatic-light",
    "label": "暗调古典油画",
    "group": "油画",
    "revision": 2,
    "description": "单侧强光、深暗部、暖亮冷暗，突出主体体积。",
    "prompt": "使用单侧斜射的强主光与深色暗部，暖色亮部对照冷色暗部；保留必要暗部细节，突出主体体积。",
    "source": {
      "name": "卡拉瓦乔",
      "path": "painters/caravaggio/style.md",
      "revision": "07d79bebdfbea3c380e6e796a5d184ca37cd8626",
      "url": "https://github.com/aaronjin2023/human-distillation-lab/blob/07d79bebdfbea3c380e6e796a5d184ca37cd8626/painters/caravaggio/style.md"
    },
    "medium": "oil"
  },
  {
    "id": "window-light",
    "label": "柔和窗光摄影",
    "group": "真实摄影",
    "revision": 2,
    "description": "柔和侧窗光、克制色彩、安静的室内层次。",
    "prompt": "采用柔和侧窗日光、连续细腻的明暗过渡与克制的蓝黄冷暖关系，让环境与材质具有安静、通透的层次。",
    "source": {
      "name": "维梅尔",
      "path": "painters/vermeer/style.md",
      "revision": "07d79bebdfbea3c380e6e796a5d184ca37cd8626",
      "url": "https://github.com/aaronjin2023/human-distillation-lab/blob/07d79bebdfbea3c380e6e796a5d184ca37cd8626/painters/vermeer/style.md"
    },
    "medium": "photo"
  },
  {
    "id": "luminous-mist",
    "label": "光雾水彩",
    "group": "水彩",
    "revision": 2,
    "description": "暖金光穿过蓝灰薄雾，远近层次逐渐柔化。",
    "prompt": "用透明水色薄层叠染、湿画法和纸白表现暖金光与冷蓝灰雾，远景柔化、近景以干笔收形；人物五官和服装关键结构可辨识。",
    "source": {
      "name": "特纳",
      "path": "painters/turner/style.md",
      "revision": "07d79bebdfbea3c380e6e796a5d184ca37cd8626",
      "url": "https://github.com/aaronjin2023/human-distillation-lab/blob/07d79bebdfbea3c380e6e796a5d184ca37cd8626/painters/turner/style.md"
    },
    "medium": "watercolor"
  },
  {
    "id": "quiet-distance",
    "label": "浪漫主义油画",
    "group": "油画",
    "revision": 2,
    "description": "雾白蓝灰、低饱和、安静辽阔的空间。",
    "prompt": "以雾白、蓝灰和克制的暖色点缀建立低饱和空间，用空气透视区分前中后景，营造安静辽阔感；沿用已选人物方向和骨架姿势。",
    "source": {
      "name": "弗里德里希",
      "path": "painters/caspar-david-friedrich/style.md",
      "revision": "07d79bebdfbea3c380e6e796a5d184ca37cd8626",
      "url": "https://github.com/aaronjin2023/human-distillation-lab/blob/07d79bebdfbea3c380e6e796a5d184ca37cd8626/painters/caspar-david-friedrich/style.md"
    },
    "medium": "oil"
  },
  {
    "id": "pastel-symmetry",
    "label": "粉彩对称电影",
    "group": "电影画面",
    "revision": 2,
    "description": "粉彩配色、秩序感、左右均衡的布景。",
    "prompt": "采用粉红、薄荷绿、奶油黄、淡蓝的粉彩关系，环境左右均衡、道具排列有秩序；保持既定骨架动作与镜头角度。",
    "source": {
      "name": "韦斯·安德森",
      "path": "directors/wes-anderson/style.md",
      "revision": "07d79bebdfbea3c380e6e796a5d184ca37cd8626",
      "url": "https://github.com/aaronjin2023/human-distillation-lab/blob/07d79bebdfbea3c380e6e796a5d184ca37cd8626/directors/wes-anderson/style.md"
    },
    "medium": "cinematic"
  },
  {
    "id": "neon-night",
    "label": "霓虹夜景电影",
    "group": "电影画面",
    "revision": 2,
    "description": "冷暖霓虹、湿润反光、前中后三层空间。",
    "prompt": "采用暖黄灯与红绿蓝霓虹的冷暖对照，在前景安排少量反光、主体处保持清楚、远景带夜色层次；细微颗粒和光晕保持克制。",
    "source": {
      "name": "王家卫",
      "path": "directors/wong-kar-wai/style.md",
      "revision": "07d79bebdfbea3c380e6e796a5d184ca37cd8626",
      "url": "https://github.com/aaronjin2023/human-distillation-lab/blob/07d79bebdfbea3c380e6e796a5d184ca37cd8626/directors/wong-kar-wai/style.md"
    },
    "medium": "cinematic"
  },
  {
    "id": "impression-color",
    "label": "印象派油画",
    "group": "油画",
    "revision": 2,
    "description": "碎笔色块、补色并置、水光与户外空气感。",
    "prompt": "以可见的短碎笔触和补色并置描绘光，阴影使用蓝紫与绿色，整体明亮轻盈；保留人物脸型、服装款式与骨架结构。",
    "source": {
      "name": "莫奈",
      "path": "painters/monet/style.md",
      "revision": "07d79bebdfbea3c380e6e796a5d184ca37cd8626",
      "url": "https://github.com/aaronjin2023/human-distillation-lab/blob/07d79bebdfbea3c380e6e796a5d184ca37cd8626/painters/monet/style.md"
    },
    "medium": "oil"
  },
  {
    "id": "monumental-ink",
    "label": "全景山水水墨",
    "group": "中国水墨",
    "revision": 2,
    "description": "浓淡墨层、雨点皴、近中远景的空间层次。",
    "prompt": "采用水墨略施淡彩、短点状皴擦与有力轮廓，浓墨近景、淡墨远景和云雾留白建立空间；人物按选定骨架与正常比例呈现。",
    "source": {
      "name": "范宽",
      "path": "painters/fan-kuan/style.md",
      "revision": "07d79bebdfbea3c380e6e796a5d184ca37cd8626",
      "url": "https://github.com/aaronjin2023/human-distillation-lab/blob/07d79bebdfbea3c380e6e796a5d184ca37cd8626/painters/fan-kuan/style.md"
    },
    "medium": "ink"
  },
  {
    "id": "minimal-ink",
    "label": "写意留白水墨",
    "group": "中国水墨",
    "revision": 2,
    "description": "凝练笔触、少量淡彩、大面积留白。",
    "prompt": "采用凝练而有力的写意墨线、浓淡干湿变化与大面积留白，局部轻施淡赭或花青；用必要线条保留选定主体特征。",
    "source": {
      "name": "八大山人",
      "path": "painters/bada-shanren/style.md",
      "revision": "07d79bebdfbea3c380e6e796a5d184ca37cd8626",
      "url": "https://github.com/aaronjin2023/human-distillation-lab/blob/07d79bebdfbea3c380e6e796a5d184ca37cd8626/painters/bada-shanren/style.md"
    },
    "medium": "ink"
  },
  {
    "id": "woodblock",
    "label": "浮世绘木刻",
    "group": "木刻版画",
    "revision": 2,
    "description": "主版轮廓、蓝色平涂、木刻与摺印层次。",
    "prompt": "采用清晰有力的木刻轮廓、普鲁士蓝与淡黄朱红的色块关系、细微纸面摺印质感，以近大远小和曲线建立动势；保留参考造型。",
    "source": {
      "name": "葛饰北斋",
      "path": "painters/hokusai/style.md",
      "revision": "07d79bebdfbea3c380e6e796a5d184ca37cd8626",
      "url": "https://github.com/aaronjin2023/human-distillation-lab/blob/07d79bebdfbea3c380e6e796a5d184ca37cd8626/painters/hokusai/style.md"
    },
    "medium": "woodblock"
  },
  {
    "id": "clear-line",
    "label": "欧式清线漫画",
    "group": "彩色漫画",
    "revision": 3,
    "description": "精细墨线、细密排线、明亮平涂与开阔空间。",
    "promptLabel": "墨比斯《阿扎克》",
    "display": { "work": "阿扎克", "genre": "科幻／奇幻" },
    "prompt": "明确采用墨比斯（Moebius）《阿扎克》（Arzach）的漫画画风：精细而清楚的连续墨线，细密排线集中于结构转折，以明亮平涂、疏密对比与广阔留白建立空间。主体和环境都完整重新绘制，不保留照片渲染。骨架姿态、主体身份及衣装或体表设计由参考确定，用目标画风概括五官和形体；沿用用户场景，不带入原作角色、道具或签名，资料图分区要求优先。",
    "source": {
      "name": "墨比斯",
      "path": "cartoonists/moebius/style.md",
      "revision": "07d79bebdfbea3c380e6e796a5d184ca37cd8626",
      "url": "https://github.com/aaronjin2023/human-distillation-lab/blob/07d79bebdfbea3c380e6e796a5d184ca37cd8626/cartoonists/moebius/style.md"
    },
    "medium": "comic"
  },
  {
    "id": "handdrawn-nature",
    "label": "手绘自然动画",
    "group": "二维动画",
    "revision": 2,
    "description": "手绘云天、柔和草木、水彩背景与温暖阳光。",
    "prompt": "采用二维手绘角色与水彩质感环境，蓝天、云白、草绿和温暖日光，前景草叶、中景主体、远景云天清楚分层；自然细节轻盈有生命感。",
    "source": {
      "name": "宫崎骏",
      "path": "directors/hayao-miyazaki/style.md",
      "revision": "07d79bebdfbea3c380e6e796a5d184ca37cd8626",
      "url": "https://github.com/aaronjin2023/human-distillation-lab/blob/07d79bebdfbea3c380e6e796a5d184ca37cd8626/directors/hayao-miyazaki/style.md"
    },
    "medium": "anime"
  },
  {
    "id": "classic-manga",
    "label": "经典黑白漫画",
    "group": "黑白漫画",
    "revision": 2,
    "description": "流畅墨线、网点明暗、富有表现力的漫画五官。",
    "promptLabel": "手冢治虫《铁臂阿童木》",
    "display": { "work": "铁臂阿童木", "genre": "科幻／冒险" },
    "prompt": "明确采用手冢治虫（Osamu Tezuka）《铁臂阿童木》（Astro Boy）原作漫画的绘画风格：流畅弹性的圆润轮廓、简练清楚的五官、富有表演感的眉眼和嘴形，以实黑、疏密网点与纸白建立干净层次。主体和环境都完整重新绘制，不保留照片渲染。骨架姿态、主体身份、年龄感及衣装或体表设计由参考确定，用目标画风概括形体；沿用用户场景，不把角色变成阿童木，不带入原作服装或签名，资料图分区要求优先。",
    "medium": "manga",
    "source": {
      "name": "手冢治虫",
      "path": "cartoonists/tezuka-osamu/style.md",
      "revision": "07d79bebdfbea3c380e6e796a5d184ca37cd8626",
      "url": "https://github.com/aaronjin2023/human-distillation-lab/blob/07d79bebdfbea3c380e6e796a5d184ca37cd8626/cartoonists/tezuka-osamu/style.md"
    }
  },
  {
    "id": "bold-comic",
    "label": "原色美式彩漫",
    "group": "彩色漫画",
    "revision": 2,
    "description": "粗黑墨线、鲜艳原色、醒目的印刷明暗。",
    "promptLabel": "杰克·科比《神奇四侠》（作画／共同创作）",
    "display": { "work": "神奇四侠", "genre": "超级英雄／科幻", "credit": "作画／共同创作" },
    "prompt": "明确采用杰克·科比（Jack Kirby）在《神奇四侠》（Fantastic Four）原作漫画中的绘画风格：有力的粗黑轮廓、棱面化体块、宽阔而简洁的黑影、强烈的图形节奏和印刷色块；保留参考主色，将明暗转换为清晰的漫画色阶。主体和环境都完整重新绘制，不保留照片渲染。沿用骨架姿态、主体身份及衣装或体表设计，用目标画风概括形体；不带入原作角色、制服、徽章或签名，资料图分区要求优先。",
    "medium": "comic",
    "source": {
      "name": "杰克·科比",
      "path": "cartoonists/jack-kirby/style.md",
      "revision": "07d79bebdfbea3c380e6e796a5d184ca37cd8626",
      "url": "https://github.com/aaronjin2023/human-distillation-lab/blob/07d79bebdfbea3c380e6e796a5d184ca37cd8626/cartoonists/jack-kirby/style.md"
    }
  },
  {
    "id": "noir-comic",
    "label": "黑色电影漫画",
    "group": "黑白漫画",
    "revision": 2,
    "description": "大面积黑白对照、刀刻般线条、硬边阴影。",
    "promptLabel": "弗兰克·米勒《罪恶之城》",
    "display": { "work": "罪恶之城", "genre": "犯罪／黑色电影" },
    "prompt": "明确采用弗兰克·米勒（Frank Miller）《罪恶之城》（Sin City）的漫画画风：大块实黑与纸白构成尖锐对照、刀刻般轮廓、硬边剪影，用留白切出光与形体，减少连续灰阶而保留关键特征。主体和环境都完整重新绘制，不保留照片渲染。骨架姿态、主体身份及衣装或体表设计由参考确定，用目标画风概括五官和形体；沿用用户场景，不带入原作角色、情节或签名，资料图分区要求优先。",
    "medium": "manga",
    "source": {
      "name": "弗兰克·米勒",
      "path": "cartoonists/frank-miller/style.md",
      "revision": "07d79bebdfbea3c380e6e796a5d184ca37cd8626",
      "url": "https://github.com/aaronjin2023/human-distillation-lab/blob/07d79bebdfbea3c380e6e796a5d184ca37cd8626/cartoonists/frank-miller/style.md"
    }
  },
  {
    "id": "monochrome-editorial",
    "label": "黑白时尚杂志",
    "group": "杂志大片",
    "revision": 1,
    "description": "借鉴黑白色彩秩序与利落结构，转写为杂志大片。",
    "prompt": "借鉴库内黑白对比与利落结构的方法，转写为杂志编辑摄影：环境采用黑白与少量米色，灯光强调服装轮廓与材质，留白克制；选定衣装保留自身款式和原有颜色。",
    "medium": "editorial",
    "source": {
      "name": "卡尔·拉格斐",
      "path": "fashion-designers/karl-lagerfeld/style.md",
      "revision": "07d79bebdfbea3c380e6e796a5d184ca37cd8626",
      "url": "https://github.com/aaronjin2023/human-distillation-lab/blob/07d79bebdfbea3c380e6e796a5d184ca37cd8626/fashion-designers/karl-lagerfeld/style.md"
    }
  },
  {
    "id": "warm-film",
    "label": "暖调夜色胶片",
    "group": "复古胶片",
    "revision": 1,
    "description": "暖灯冷影、细颗粒、柔和光晕与夜色层次。",
    "prompt": "以暖黄灯与冷色阴影构成胶片色彩关系，细颗粒与柔和光晕营造复古影像质感；主体五官清晰，背景层次自然。",
    "medium": "film",
    "source": {
      "name": "王家卫",
      "path": "directors/wong-kar-wai/style.md",
      "revision": "07d79bebdfbea3c380e6e796a5d184ca37cd8626",
      "url": "https://github.com/aaronjin2023/human-distillation-lab/blob/07d79bebdfbea3c380e6e796a5d184ca37cd8626/directors/wong-kar-wai/style.md"
    }
  },
  ...MANGA_EFFECTS
];
export const effectFor = id => EFFECTS.find(effect => effect.id === id);
export const effectsFor = style => EFFECTS.filter(effect => (effect.mediums || [effect.medium]).includes(style));
export function effectLabel(effect) {
  if (!effect) return '';
  const name = effect.creatorType ? effect.label : `${effect.label} · ${effect.source.name}`;
  return effect.display ? `${name} ·《${effect.display.work}》${effect.display.credit ? `（${effect.display.credit}）` : ''} · ${effect.display.genre}` : effect.creatorType ? `${name} · ${effect.group}` : name;
}
