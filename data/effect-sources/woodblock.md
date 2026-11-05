# Katsushika Hokusai — 图像风格规格 style.md（给图像模型）

> 只描述画面，不描述人生。色板只写颜料名，不编 HEX。

## (1) 一句话风格（prompt-ready）

- EN: `Ukiyo-e colour woodblock print (nishiki-e), bold black key-block outlines, flat Prussian blue, dynamic claw-like wave curves, Mount Fuji as a small constant in a changing world`
- ZH: 浮世绘多色木刻版画（锦绘），粗黑主版轮廓线，平涂普鲁士蓝，爪形巨浪曲线，富士山作为变化世界中的不变参照。

## (2) 色板方向

- 主色（7 色，颜料名）：普鲁士蓝、靛蓝、墨色、灰色、淡黄、朱红（胭脂红）、淡绿。`verbatim` / `artifact`
- 普鲁士蓝是关键：欧洲进口的新颜料，色浓而耐久，北斋用它画海与天，是浮世绘由传统植物色转向化学颜料的标志。`artifact`
- 辅色：灰色画浪沫与远山、淡黄画船与富士山麓。
- 禁色：油画式渐变与明暗；灰暗土色大面积平涂；无轮廓线的晕染。
- 冷暖：整体偏冷，普鲁士蓝定冷调，淡黄与朱红作暖色点缀。
- 明暗 / 饱和：无写实明暗；体积靠色块并置与轮廓线，不靠渐变；但有用摺印渐变（bokashi）染天色。

## (3) 笔触与线条

- 笔触：不是笔触，是刀味——轮廓线均匀有力，如木刻刀刻出，浪的爪形曲线一气呵成。`verbatim`
- 线条：粗黑主版线（key-block）定全幅，线粗细变化极小，靠线的走向表现动势；浪尖的爪形是北斋的签名式线条。`verbatim`
- 质感：木刻版画的平滑纸面 + 颜料平涂 + 局部摺印渐变；无油彩堆积，无水墨晕染。

## (4) 构图习惯

- 画幅：横幅大判（ōban）为主，系列成组（三十六景原定 36 图，后扩至 46 图）。`artifact`
- 视点：高视点俯瞰 + 近大远小；巨浪在前、富士在后，大小对比即是构图。`verbatim`
- 布局：对角线构图，巨浪自左下卷向右上，富士山小而稳地压在右下；前景、中景、远景三层叠压。
- 裁切：浪与船常被裁掉边缘，画面之外仍有世界；富士山从不被裁。`verbatim`

## (5) 光影与透视

- 光源：无固定光源；亮在浪沫的白与富士的淡色处。
- 阴影：无写实阴影；浪的体积靠蓝与白的色块对照。
- 透视：借鉴西洋的焦点透视但加以改造——近大远小是有的，消失点却不固定，是“浮世绘式透视”。`artifact`

## (6) 该画什么 / 不该画什么

- 该画：富士山各角度、巨浪、旅人、职人、江户风俗、名所风景。`verbatim`
- 不该画：无轮廓线的晕染；油画式明暗；灰调写实；富士山缺席的纯写实风景（三十六景一路富士必须在场）。
- Negative prompt: `oil-painting shading, photorealistic perspective, grey muted palette, flat vector illustration without woodblock texture`

## (7) 测试提示词示例（现代题材：便利店夜景）

- Prompt: `In the style of Katsushika Hokusai, a small convenience store at night in a modern city, ukiyo-e colour woodblock print, bold black key-block outlines, flat Prussian blue night, a great claw-like wave curve of clouds above the shop, Mount Fuji small and steady in the distance`
- 中文对照：北斋风格，现代城市街角的便利店夜景，浮世绘多色木刻版画，粗黑主版轮廓线，平涂普鲁士蓝夜色，店上方的云如爪形巨浪卷起，远处富士山小而稳。
- Negative: 见第 (6) 节。
- 检验点：轮廓线是否粗黑均匀、有刀味；普鲁士蓝是否主调；云或浪是否有爪形曲线；富士山是否小而在场。
