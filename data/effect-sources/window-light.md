# Johannes Vermeer — 图像风格规格 style.md（给图像模型）

> 只描述画面，不描述人生。色板只写颜料名，不编 HEX。

## (1) 一句话风格（prompt-ready）

- EN: `In the style of Johannes Vermeer, Dutch Golden Age oil painting, quiet window light, jewel-like colour, pointillé highlights, serene stillness, camera obscura precision, pearl and ultramarine, oil on canvas`
- ZH: 维梅尔风格，荷兰黄金时代油画，宁静的窗光，宝石般的色彩，点彩高光，静谧，暗箱般的精确，珍珠与群青，布面油画。

## (2) 色板方向

- 主色（7 色，颜料名）：群青、铅白、土黄、赭石、朱红、墨绿、暗褐。`verbatim`
- 辅色：珍珠灰（高光）、淡蓝（阴影）。
- 禁色：浓重阴影；高饱和装饰色；粗犷笔触；巴洛克式喧闹。
- 冷暖：冷暖均衡——群青与土黄并置，窗光冷而亮，室内暖而柔。
- 明暗 / 饱和：中低对比，明暗过渡柔和；饱和度在群青与土黄处高，整体克制而纯净。

## (3) 笔触与线条

- 笔触：细腻、平滑，层层罩染；高光用点彩（pointillé）——小圆点提亮，是维梅尔的签名式笔触。`artifact`
- 线条：轮廓线精细、清晰，边缘在光中融化，不硬。
- 质感：布面油画，珍珠、丝绸、金属的质感用点彩与罩染暗示；群青（天然青金石）是画面上最贵的颜色。`artifact`

## (4) 构图习惯

- 画幅：室内肖像与风景皆有；《戴珍珠耳环的少女》为半身肖像，人物居中、回首。`verbatim`
- 视点：平视；《代尔夫特风景》为低视点，城市横卧水面，天空占大幅。
- 布局：室内一角构图——窗在左、人物在右，光从左侧来；《代尔夫特风景》天空占三分之二，城市在下。`verbatim`
- 裁切：前景常有桌布、椅背遮挡，营造室内纵深；人物不顶边，画面安静完整。

## (5) 光影与透视

- 光源：左侧窗户的清澈日光，全幅一致；光是宁静的，不制造戏剧。`verbatim`
- 阴影：淡而柔的阴影，体积靠罩染的透明层次。
- 透视：室内透视——窗、墙、地面三面收向纵深；暗箱（camera obscura）般的精确是学界讨论的焦点，见 conflicts.md。

## (6) 该画什么 / 不该画什么

- 该画：室内女子、窗光静物、代尔夫特风景；珍珠与群青；点彩高光。
- 不该画：浓重阴影；高饱和装饰色；粗犷笔触；巴洛克式喧闹。
- Negative prompt: `heavy dark shadows, saturated decorative colours, rough visible brushstrokes, noisy Baroque spectacle, smooth academic blending, photorealistic camera blur`

## (7) 测试提示词示例（现代题材：窗边看手机的女子）

- Prompt: `In the style of Johannes Vermeer, a woman looking at her phone by the window, Dutch Golden Age oil painting, quiet window light, jewel-like colour, pointillé highlights, serene stillness, pearl and ultramarine, oil on canvas`
- 中文对照：维梅尔风格，窗边看手机的女子，荷兰黄金时代油画，宁静的窗光，宝石般的色彩，点彩高光，静谧，珍珠与群青，布面油画。
- Negative: 见第 (6) 节。
- 检验点：光是否宁静、从左侧来；色彩是否如宝石般纯净；时间是否静止而不是抓拍。
