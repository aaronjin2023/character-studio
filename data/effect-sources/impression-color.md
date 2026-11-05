# Claude Monet — 图像风格规格 style.md（给图像模型）

> 只描述画面，不描述人生。色板只写颜料名，不编 HEX。

## (1) 一句话风格（prompt-ready）

- EN: `Impressionism, broken dabs of unmixed colour, complementary juxtaposition, shimmering light on water, no black, no outlines, fleeting moment, plein air`
- ZH: 印象派，未调和的碎色并置，补色并置，水面闪烁的光，不用黑、不用轮廓线，瞬间印象，户外写生。

## (2) 色板方向

- 主色（7 色，颜料名）：钴蓝、群青、铬黄、朱红、翠绿、紫罗兰、铅白。`verbatim`
- 主色是高饱和补色并置：蓝 vs 橙、红 vs 绿；整体明亮、闪烁，阴影用彩色不用黑。`verbatim`
- 辅色：粉红、淡紫、湖绿。
- 禁色：纯黑；黑色轮廓线；平滑学院渐变；摆拍历史画。
- 冷暖：冷暖并置：同一水面里蓝与橙、绿与红并置，冷暖对比是光的来源。
- 明暗 / 饱和：高明度、高饱和、中对比；亮部直接用管装纯色碎笔，不经灰调过渡。

## (3) 笔触与线条

- 笔触：破碎小笔触，并置补色；笔触方向跟随光与水波，不跟随形体。`verbatim`
- 线条：无轮廓线，形靠色块并置收住；不是线描，是“色块围合”。
- 质感：薄涂 + 局部稍厚；表面有碎笔的起伏，无厚涂堆积。

## (4) 构图习惯

- 画幅：横幅为主；《日出·印象》1872 年，横幅海港日出；睡莲系列是组画，多幅横幅水面。
- 视点：平视略低，观者站在水边；视线被光斑吸住，再望向水面。
- 布局：水面占 2/3 以上 + 天空一带：睡莲水面满幅，无地平线；日出海港地平线低，天空与水面各半。
- 裁切：睡莲常裁掉画边，水面绵延出画边；不留安全边距。

## (5) 光影与透视

- 光源：太阳 / 天光是唯一光源，暖金光从水面透出；亮在光斑与睡莲花。
- 阴影：阴影是彩色的（蓝紫、墨绿），不用纯黑；明暗靠补色并置不靠灰阶。
- 透视：无焦点透视，空间靠色块疏密与冷暖推远近；睡莲系列几乎无透视，是平面色块。

## (6) 该画什么 / 不该画什么

- 该画：睡莲、水面、干草堆、鲁昂大教堂、国会大厦、日出海港。`verbatim`
- 不该画：黑色轮廓线；摆拍历史画；平滑渐变；灰调写实。
- Negative prompt: `black outlines, smooth academic blending, staged history painting, grey muted palette, photorealistic detail, flat vector illustration`

## (7) 测试提示词示例（现代题材：窗台上的咖啡）

- Prompt: `In the style of Claude Monet, a cup of coffee on a windowsill in the morning, Impressionism, broken dabs of unmixed colour, complementary juxtaposition, shimmering morning light, no black, no outlines, fleeting moment`
- 中文对照：莫奈风格，清晨窗台上的一杯咖啡，印象派，未调和的碎色并置，补色并置，闪烁的晨光，不用黑、不用轮廓线，瞬间印象。
- Negative: 见第 (6) 节。
- 检验点：咖啡与窗台是否画成碎色并置、光是否闪烁，而不是清晰的写实静物；是否不用黑轮廓。
