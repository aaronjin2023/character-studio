# Moebius / Jean Giraud — 漫画风格规格 style.md（给图像模型）

> 只描述画面，不描述人生。引用画面时只指认到具体作品与页/格，不整页复制。

## (1) 一句话风格（prompt-ready）

- EN: `In the style of Moebius, precise fine ink line, vast empty desert landscapes, elegant ligne claire, delicate hatching, luminous flat colour, dreamlike science-fiction comics page`
- ZH: 墨比斯风格，精细墨水线，辽阔空旷的沙漠，优雅清晰线，细腻排线，明亮平涂，梦幻科幻漫画页。

## (2) 线条、网点/色彩

- 线条：极细而精准的墨水线，轮廓干净，排线细密如蚀刻；线条不粗黑，靠密度造体积。`verbatim`
- 网点/色彩：彩色时平涂为主，明亮的沙漠黄、钴蓝、赭红；黑白《蓝莓》时期以细排线造明暗；色彩不写实，带迷幻感。
- 质感：针管笔细线 + 平涂水彩/数码平涂；纸面干净，无粗糙肌理。

## (3) 分镜

- 格数与格形：格数中等，横长格多，常有整页大格展现沙漠与天空；跨页少用，格间留白大。
- 节奏：节奏缓慢辽阔，大格与留白拉长时间；动作少，凝视多。
- 视线引导：法式阅读顺序左→右；视线沿地平线走，跨页视线跳接少。

## (4) 角色造型

- 造型：人物修长优雅，面部线条极简；阿尔扎克骑翼龙的剪影、蓝莓上尉的制服与帽子、约翰·迪福尔的颓唐中年相是标志造型。
- 角色类型：独行旅人、颓唐中年、异星生物、神庙祭司；主角常孤身一人，配角如幻影。
- 动作：动作少而慢，骑行、凝视、漂浮；动态靠构图不靠速度线。

## (5) 对话框与拟声词

- 对话框：对话框小而少，常用无字格与长景；《阿尔扎克》全无文字。
- 拟声词：拟声词罕见，静默本身就是语言；风声、脚步声多以留白代替。
- 文字量：每页文字密度低，旁白与对话都少；画面自己说话。

## (6) 该画什么 / 不该画什么

- 该画：沙漠与空旷地平线、独行旅人、翼龙阿尔扎克、印卡尔与约翰·迪福尔、超现实城市与神庙、变形的飞行器与异星生物、镜面与自我分身、时间与轮回。`verbatim`
- 不该画：不画粗黑卡通线、不画拥挤对话框、不画密集小格、不画写实阴影。
- Negative prompt: `No heavy black manga speed lines, no crowded dialogue balloons, no photorealistic rendering, no flat vector illustration, no dense small panels, no dark gloomy palette`

## (7) 测试提示词示例（现代题材：深夜便利店买关东煮的男人）

- Prompt: `In the style of Moebius, a man buying oden at a convenience store late at night, comics page, precise fine ink line, vast empty space, luminous flat colour, dreamlike silence, few words`
- 中文对照：墨比斯风格：一个男人在深夜便利店买关东煮，漫画页，精细墨水线，大量留白，明亮平涂，梦幻般的静默，话很少。
- Negative: `No heavy black speed lines, no crowded dialogue, no photorealistic detail`
- 检验点：沙漠式的空旷是否还在（便利店货架如地平线）；线是否细而准；是否留白多、话少。
