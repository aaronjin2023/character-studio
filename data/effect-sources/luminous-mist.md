# J. M. W. Turner — 图像风格规格 style.md（给图像模型）

> 只描述画面，不描述人生。色板只写颜料名，不编 HEX。

## (1) 一句话风格（prompt-ready）

- EN: `Romantic landscape, luminous atmospheric haze, dissolving forms, glowing sun and mist, thin glazes over white ground, warm gold against cool blue-grey, sublime and fleeting`
- ZH: 浪漫主义风景，发光的大气雾霭，形体溶化，灿烂阳光与雾气，白底薄涂罩染，暖金对撞冷蓝灰，崇高而短暂。

## (2) 色板方向

- 主色（7 色，颜料名）：暖金黄、铬黄、天青蓝、蓝灰、珍珠白、赭石、朱红。`verbatim`
- 主色是暖金 + 冷蓝灰的对撞，亮部是暖金光，暗部是冷蓝灰雾；红只给船旗与夕阳一小点。`verbatim`
- 辅色：淡紫、湖绿、暖灰。
- 禁色：硬轮廓；高饱和艳色铺满；平滑学院渐变；清晰写实细节。
- 冷暖：暖金光 vs 冷蓝灰雾是核心对撞；同一画面里金—蓝成对出现。
- 明暗 / 饱和：高明度、中高饱和、中对比；亮部直接用暖金薄涂，不经灰调过渡。

## (3) 笔触与线条

- 笔触：薄涂、罩染、刮擦并用；远景几乎溶化，近景用稍实的短笔点出船与人物。`verbatim`
- 线条：轮廓线几乎没有，形靠光雾的明暗收住；船桅与烟囱是少数硬线。
- 质感：薄涂透明 + 局部刮擦出白底；水面光泽靠留白与薄涂，不靠厚涂。

## (4) 构图习惯

- 画幅：横幅风景为主；《勇莽号战舰》1839 年展出，横幅海景；《雨、蒸汽和速度》1844 年，横幅铁路桥。
- 视点：平视略低，观者站在水边 / 桥边；视线被光源吸住，再望向雾中形体。
- 布局：光源偏一侧 + 雾中形体横排：太阳 / 夕阳在一侧，船 / 火车在雾中横过；地平线低，天空与水面占主导。
- 裁切：船与火车常顶边、裁边，雾把画边溶掉；不留安全边距。

## (5) 光影与透视

- 光源：太阳 / 夕阳是唯一光源，暖金光从雾中透出；亮在光源周围一圈，暗部是冷雾。
- 阴影：阴影是蓝灰、紫灰的薄涂，透亮不死黑；水面倒影是暖金碎笔。
- 透视：空气透视极端化：远景溶化在雾里，近景也只剩剪影；空间靠雾的浓淡推远近。

## (6) 该画什么 / 不该画什么

- 该画：夕阳海景、雾中船只、火车与雨、威尼斯水光、暴风雪。`verbatim`
- 不该画：硬轮廓；清晰写实细节；高饱和扁平色块；均匀明亮的插画感。
- Negative prompt: `hard black outlines, sharp photorealistic detail, flat vector illustration, evenly bright light, high-saturation flat colour, no atmosphere`

## (7) 测试提示词示例（现代题材：雨夜公交站）

- Prompt: `In the style of J. M. W. Turner, a rainy bus stop at night in a modern city, Romantic landscape, luminous atmospheric haze, dissolving forms, warm golden light against cool blue-grey mist, thin glazes, sublime and fleeting`
- 中文对照：特纳风格，现代城市里一个雨夜公交站，浪漫主义风景，发光的大气雾霭，形体溶化，暖金光对撞冷蓝灰雾，薄涂罩染，崇高而短暂。
- Negative: 见第 (6) 节。
- 检验点：公交站是否溶在雨雾里、光是否从雾中透出，而不是清晰的建筑插画；暖金与冷蓝灰是否对撞。
