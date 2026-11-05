# Osamu Tezuka — 漫画风格规格 style.md（给图像模型）

> 只描述画面，不描述人生。引用画面时只指认到具体作品与页/格，不整页复制。

## (1) 一句话风格（prompt-ready）

- EN: `Osamu Tezuka manga style, cinematic panel layout, large expressive eyes, clean black ink line, screentone shading, dynamic action lines, black-and-white manga page`
- ZH: 手冢治虫风格，电影式分镜，大眼睛，干净黑色墨线，网点阴影，动态动作线，黑白漫画页

## (2) 线条、网点/色彩

- 线条：干净均匀的轮廓线，粗细变化小，线条流畅如动画原画。`verbatim`
- 网点/色彩：黑白为主，淡网点渐变阴影；彩色时主色鲜明平涂，辅色柔和。`verbatim`
- 质感：墨水线稿为主，网点与平涂并用；不编造实测 HEX 值。`artifact`

## (3) 分镜

- 每页多格，方格为主，斜格与跨页大格穿插，电影式推拉摇移，格间时间切分细碎。`verbatim`
- 节奏：切分格子、定视线与节奏（分镜稿（name）、格线、对话框位置）；分镜示例：切 5 格——全景、特写、侧脸、对视、留白格；对话框只留一句。`impression`
- 视线引导：日式右→左阅读，视线随动作线走。`impression`

## (4) 角色造型

- 大眼睛圆脸，角色造型圆润可爱，表情夸张，动作幅度大。`verbatim`
- 角色类型：阿童木式少年英雄与机器人、黑杰克式孤高医者与高额诊金、火之鸟式轮回与生命。`verbatim`
- 动作：动作线与动态姿势按该人作品惯例处理，表情与姿态先行，静止造型亦有张力。`impression`

## (5) 对话框与拟声词

- 圆对话框，尾巴清晰，字体工整；拟声词手写大字，常出格，与动作线融合。`verbatim`
- 文字量：每页文字密度按作品惯例，旁白与对话的分配见 language.md。`impression`

## (6) 该画什么 / 不该画什么

- 该画：阿童木式少年英雄与机器人、黑杰克式孤高医者与高额诊金、火之鸟式轮回与生命、星星标记式配角群像、未来城市与太空、战争与生命伦理。`verbatim`
- 不该画：No photorealistic rendering、no realistic adult gekiga line、no single-panel illustration without panels、no flat vector illustration。`impression`
- Negative prompt: `No photorealistic rendering, no realistic adult gekiga line, no single-panel illustration without panels, no flat vector illustration`

## (7) 测试提示词示例（现代题材：一只小约克夏犬坐在地铁座位上）

- Prompt: `In the style of Osamu Tezuka, a small Yorkshire terrier sitting on a subway seat, manga page`
- 中文对照：手冢治虫风格，一只小约克夏犬坐在地铁座位上，漫画页。
- Negative: `No photorealistic rendering, no crowded tiny panels, no flat vector illustration, no smooth academic blending`
- 检验点：风格是否迁移到现代题材而不丢分镜、线条与角色造型；背景是否按该人惯例处理；拟声词与对话框是否符合该人习惯。
