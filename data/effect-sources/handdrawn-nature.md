# Hayao Miyazaki — 导演风格规格 style.md（给图像 / 视频模型）

> 只描述影片，不描述人生。引用影片时只指认到具体影片与场景，不逐帧复述剧情。

## (1) 一句话风格（prompt-ready）

- EN: `In the style of Hayao Miyazaki: hand-drawn wonder, wind and clouds in motion, a brave girl in a strange world, nature as a living spirit, flight as freedom`
- ZH: 宫崎骏风格：手绘的奇想，风与云在动，勇敢的女孩走进陌生的世界，自然是有生命的神灵，飞行即自由。

## (2) 镜头语言

- 景别：全景与大远景为主，风景（云、海、森林）即主角。`verbatim`
- 机位：动画“镜头”讲究风景的仪式感，推近缓慢而庄重。`impression`
- 镜头：广角拍风景，特写拍女孩的面部与手部动作。`impression`
- 运镜禁忌：几乎不用快速剪辑与碎切，运镜服务于手绘的呼吸感。`impression`

## (3) 场面调度

- 人物走位：女孩在森林、油屋、风之谷之间奔跑、飞行，走位即成长。`verbatim`
- 景深与层次：前景草叶、中景人物、背景云海的三层结构是标志。`verbatim`
- 空间：森林、油屋、风之谷，空间越奇幻，规则越真实。`impression`
- 演员表演风格：配音演员表演自然，情绪靠画面与音乐外化。`impression`

## (4) 剪辑节奏

- 剪辑速度：中慢速，长镜头保留手绘风景的完整时间。`impression`
- 转场：叠化与淡入淡出为主，梦境在叠化里过去。`impression`
- 段落结构：以冒险章节推进，女孩在每个世界里学会一件事。`impression`
- 声音剪辑：久石让的音乐与环境音（风声、水声）构成声景，音乐即情感。`artifact`

## (5) 色彩与光影

- 色彩：高饱和蓝天、绿草、云白，色彩明亮而温暖。`verbatim`
- 光影：手绘光影，阳光透过云层，阴影是森林的形状。`impression`
- 画幅：彩色手绘，颗粒感来自赛璐珞与水彩背景。`artifact`

## (6) 叙事结构

- 结构：线性冒险，女孩进入异世界、学会规则、归来。`impression`
- 视点：全知而悲悯，镜头站在女孩一边。`impression`
- 时间：顺时，时间在飞行与季节里流逝。`impression`
- 类型处理：以动画写成长与环保，类型成规被手绘的奇想颠覆。`impression`

## (7) 该拍什么 / 不该拍什么

- 该拍：手绘风景、飞行、勇敢的女孩、自然神灵、风与云、油屋与森林、久石让的音乐
- 不该拍：三维塑料感、快速剪辑、解释性对白、黑暗压抑、直白的说教
- Negative prompt: `No 3D plastic look, no fast cutting, no explanatory dialogue, no dark grim tone, no direct preaching, no photorealistic rendering`

## (8) 测试提示词示例（现代题材：一只坐在地铁里的约克夏犬）

- Prompt: `In the style of Hayao Miyazaki, a small Yorkshire terrier sitting on a subway seat, hand-drawn wonder, wind and clouds outside the window, the dog brave in a strange world, warm sunlight, gentle music, flight as freedom`
- 中文对照：宫崎骏风格：一只约克夏犬坐在地铁座位上，手绘的奇想，窗外风与云在动，犬勇敢地走进陌生的世界，温暖阳光，轻柔音乐，飞行即自由。
- Negative: `No 3D plastic look, no fast cutting, no explanatory voiceover, no dark grim tone, no direct preaching`
- 检验点：手绘风景感是否成立；飞行与风是否在；女孩式勇敢是否在犬身上而不煽情。
