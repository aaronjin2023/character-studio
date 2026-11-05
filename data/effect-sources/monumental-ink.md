# Fan Kuan — 图像风格规格 style.md（给图像模型）

> 只描述画面，不描述人生。色板只写颜料名，不编 HEX。

## (1) 一句话风格（prompt-ready）

- EN: `In the style of Fan Kuan, Northern Song monumental landscape, towering central peak, raindrop texture strokes, jagged outline, ink and slight colour on silk, tiny travellers beneath eternal mountains`
- ZH: 范宽风格，北宋全景山水，中央主峰高耸，雨点皴，轮廓方硬如铁，绢本水墨略施淡彩，山下行旅渺小，山永恒而人短暂。

## (2) 色板方向

- 主色（颜料名）：墨色、淡赭、花青、淡石绿、淡石青。`verbatim` / `artifact`
- 辅色：淡赭、淡花青，墨色为主、略施淡彩，雨点皴以墨为主。
- 禁色：青绿重彩；工笔细描；一角、半边留白构图。
- 冷暖：墨分浓淡为主，暖色只作点染；整体清、亮、透，不沉。
- 明暗 / 饱和：靠墨的浓淡干湿，不靠明暗渐变；饱和度克制，亮在留白。

## (3) 笔触与线条

- 笔触：雨点皴：短促密集的点状皴擦，如雨点密布山面，写北山石质的粗粝与厚重；轮廓以方硬折线勾山形，线如铁铸。`verbatim`（台北故宫说明）
- 线条：书法性线条，中锋为主；轮廓不封闭，靠笔意收住形。
- 质感：绢 / 纸上水墨晕染 + 枯笔飞白；无油彩堆积，无工笔细线。

## (4) 构图习惯

- 画幅：全景式中轴构图：主峰居中顶天立地，占幅大半；前景行旅、驮队极小，中景屋宇、飞瀑，远景淡峦；高、深、平三远并置于一幅。`verbatim`
- 视点：平视 / 轻微俯视；无焦点透视，散点 / 平面构成。
- 布局：题款、印章是构图的一部分，位置计入画面平衡。
- 裁切：主峰满幅是其本体——全景式中轴构图，主峰顶天立地占幅大半，前景行旅极小；画面满而不塞，满幅即其构图。

## (5) 光影与透视

- 光源：无固定光源；亮在云雾留白与瀑布，暗在雨点皴的密点；空间靠主峰高耸与人物渺小对比，不用焦点透视。`verbatim`
- 阴影：无写实阴影；墨的浓淡即体积，淡即远、浓即近。
- 透视：无焦点透视；空间靠留白 + 墨色浓淡推远近。

## (6) 该画什么 / 不该画什么

- 该画：高耸主峰、全景山水、雨点皴、行旅驮队、飞瀑、雪山寒林、渺小人物。`verbatim`
- 不该画：平远小景、疏淡留白大半、重彩青绿、焦点透视、工笔细节、松散构图。
- Negative prompt: `small level-distance vignette, mostly empty paper, heavy blue-green colour, linear perspective, meticulous gongbi detail, loose casual composition`

## (7) 测试提示词示例（现代题材：雨夜便利店门口）

- Prompt: `In the style of Fan Kuan, the entrance of a convenience store on a rainy night in a modern city, a towering central peak of buildings, raindrop texture strokes, jagged outlines, ink and slight colour, tiny travellers beneath eternal mountains`
- 中文对照：范宽风格，现代城市雨夜一家便利店门口，高楼如中央主峰高耸，雨点皴，轮廓方硬，绢本水墨略施淡彩，行人渺小如山下行旅。
- Negative: 见第 (6) 节。
- 检验点：雨点皴与中轴全景构图二者至少其一成立；主峰是否顶天立地、行旅是否渺小，而不是只换了题材。
