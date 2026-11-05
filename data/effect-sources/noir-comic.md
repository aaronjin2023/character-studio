# Frank Miller — 漫画风格规格 style.md（给图像模型）

> 只描述画面，不描述人生。引用画面时只指认到具体作品与页/格，不整页复制。

## (1) 一句话风格（prompt-ready）

- EN: `In the style of Frank Miller, heavy black ink, high-contrast noir, cinematic shadows, brutal action, graphic novel page`
- ZH: 米勒风格，粗重黑墨，高对比黑色，电影阴影，残酷动作，图像小说页。

## (2) 线条、网点/色彩

- 线条：粗重黑线，黑块巨大；线条如刀刻。`verbatim`
- 网点/色彩：黑白为主，间有一色（《罪恶之城》的红、黄）；色彩克制到极致。
- 质感：粗黑墨水 + 大面积黑块；纸面粗粝，阴影重。

## (3) 分镜

- 格数与格形：格数少，大格多；斜格与满页黑；节奏如重击。
- 节奏：节奏如重击，大格与斜格拉快时间；沉默即重击。
- 视线引导：美式阅读顺序左→右；视线被黑块与一色牵引。

## (4) 角色造型

- 造型：蝙蝠侠的老年身躯、马弗的伤疤、300 斯巴达的肌肉与披风；女性如蛇蝎。
- 角色类型：老年英雄、伤疤杀手、斯巴达战士、蛇蝎女性；主角残酷，配角更残酷。
- 动作：动作残酷，打斗、枪击、挥剑；速度线密。

## (5) 对话框与拟声词

- 对话框：对话框少，旁白硬汉独白。
- 拟声词：拟声词巨大；枪声与骨裂以画面代替。
- 文字量：每页文字密度低，旁白硬汉独白，对话精简。

## (6) 该画什么 / 不该画什么

- 该画：哥谭雨夜、老年蝙蝠侠、罪恶之城的妓女与杀手、300 斯巴达、忍者与武士（《浪人》）、夜魔侠的地狱厨房、雨与血。`verbatim`
- 不该画：不画明亮欢快色、不画干净细线、不画密集小格、不画温和幽默、不画写实柔和阴影。
- Negative prompt: `No bright cheerful colour, no clean thin line, no crowded small panels, no gentle humour, no realistic soft shading`

## (7) 测试提示词示例（现代题材：深夜拉面店里的独行食客）

- Prompt: `In the style of Frank Miller, a lone customer eating ramen at a late-night shop, heavy black ink, high-contrast noir, cinematic shadows`
- 中文对照：米勒风格：独行食客深夜在拉面店吃面，粗重黑墨，高对比黑色，电影阴影。
- Negative: `No bright cheerful colour, no clean thin line, no gentle humour`
- 检验点：黑块是否巨大；对比是否高；一色点缀是否克制；动作是否如重击。
