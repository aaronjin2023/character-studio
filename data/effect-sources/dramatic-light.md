# Caravaggio (Michelangelo Merisi) — 图像风格规格 style.md（给图像模型）

> 只描述画面，不描述人生。色板只写颜料名，不编 HEX。

## (1) 一句话风格（prompt-ready）

- EN: `In the style of Caravaggio, Baroque oil painting, tenebrism, violent light against black void, naturalistic models from life, dramatic frozen moment, shallow space, oil on canvas`
- ZH: 卡拉瓦乔风格，巴洛克油画，明暗对照法，强光劈开黑暗，写实模特，戏剧性定格瞬间，浅空间，布面油画。

## (2) 色板方向

- 主色（7 色，颜料名）：暗褐、赭石、朱红、铅白、土黄、墨绿、群青。`verbatim`
- 辅色：金黄（烛光与衣袍）、灰黑（暗部）。
- 禁色：明朗的田园光线；优雅的理想人体；均匀的漫射光；装饰性金底。
- 冷暖：暗部冷黑、亮部暖黄，光是暖的、暗是冷的，冷暖对撞极烈。
- 明暗 / 饱和：极高对比，亮部极亮、暗部极暗，中间调极短；饱和度在亮部高、在暗部几近于无。

## (3) 笔触与线条

- 笔触：直接写生（alla prima），笔触肯定、厚重，少有反复修改；亮部厚涂、暗部薄涂。`artifact`
- 线条：无硬轮廓线——形体由光切出，亮与暗的交界即轮廓。`verbatim`
- 质感：布面油画，皮肤、织物、金属的质感在强光下极致真实，暗部则沉入黑洞。

## (4) 构图习惯

- 画幅：祭坛画与大幅叙事皆有；《圣马太蒙召》为横幅，人物横向排列。`verbatim`
- 视点：平视略仰；《圣马太蒙召》中基督与圣彼得在右、税吏群在左，光从右上方斜射。
- 布局：对角线光束构图——光从一侧劈入，照亮焦点、其余沉入黑暗；人物常被画框边缘截断，营造近景感。`verbatim`
- 裁切：人物常被裁切，画面如舞台剧的定格，观者如在现场。

## (5) 光影与透视

- 光源：单一、强烈的光源（常为画外右上方的光），光如刀劈开黑暗，是画面的主角。`verbatim`
- 阴影：暗部极暗、近乎纯黑，体积靠亮部的厚涂，不靠中间调。
- 透视：浅空间——人物贴近画面，背景沉入黑暗，空间压缩而非深远；透视克制，戏剧靠光影。`artifact`

## (6) 该画什么 / 不该画什么

- 该画：圣经叙事的决定性瞬间、斩首与殉道、税吏与赌徒、静物水果篮。
- 不该画：明朗的田园光线；优雅的理想人体；均匀漫射光；装饰性金底。
- Negative prompt: `bright even daylight, idealised graceful figures, uniform diffused light, gold leaf background, smooth academic blending, pastel palette`

## (7) 测试提示词示例（现代题材：深夜便利店收银台）

- Prompt: `In the style of Caravaggio, a convenience store checkout at night, Baroque oil painting, tenebrism, a single violent beam of light against black void, naturalistic cashier and customer frozen in a dramatic moment, shallow space, oil on canvas`
- 中文对照：卡拉瓦乔风格，深夜便利店收银台，巴洛克油画，明暗对照法，一束强光劈开黑暗，写实的收银员与顾客定格在戏剧性瞬间，浅空间，布面油画。
- Negative: 见第 (6) 节。
- 检验点：光是否如刀劈开黑暗；暗部是否沉入黑洞；人物是否定格在决定性瞬间。
