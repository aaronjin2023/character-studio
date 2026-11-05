# Wong Kar-wai — 导演风格规格 style.md（给图像 / 视频模型）

> 只描述影片，不描述人生。引用影片时只指认到具体影片与场景，不逐帧复述剧情。

## (1) 一句话风格（prompt-ready）

- EN: `In the style of Wong Kar-wai: neon-soaked nights, step-printed slow motion, clocks and expiry dates, lovers who almost meet, voiceover memory, saturated melancholy`
- ZH: 王家卫风格：霓虹浸透的夜，抽帧慢动作，时钟与过期日期，擦肩而过的恋人，画外音记忆，高饱和的忧郁。

## (2) 镜头语言

- 景别：近景与特写为主，人物面部、钟表、食物的特写承载时间。`verbatim`
- 机位：手持与轨道并用，摄影机贴近人物，呼吸感强。`verbatim`
- 镜头：广角近拍造成人物与背景的拉扯感，抽帧（step-printing）制造拖影。`artifact`
- 运镜禁忌：几乎不用固定远景长镜头，摄影机总在动、在找。`impression`

## (3) 场面调度

- 人物走位：人物在走廊、楼梯、便利店之间擦肩而过，相遇即错过。`verbatim`
- 景深与层次：前景霓虹反光、中景人物、背景雨夜的三层结构是标志。`verbatim`
- 空间：重庆大厦、走廊、便利店、雨夜街道，空间逼仄而欲望拥挤。`impression`
- 演员表演风格：职业演员，即兴表演，情绪靠眼神与停顿而非台词。`artifact`

## (4) 剪辑节奏

- 剪辑速度：快慢交错，抽帧慢动作与快速跳切并存。`verbatim`
- 转场：跳切与叠化并用，时间在跳切里断裂又重组。`impression`
- 段落结构：以日期、时钟、过期日期作章节，段落之间靠记忆衔接。`impression`
- 声音剪辑：流行音乐与画外音主导，音乐即时间本身。`verbatim`

## (5) 色彩与光影

- 色彩：高饱和霓虹（红、绿、蓝）、暖黄灯光与雨夜冷调对撞。`verbatim`
- 光影：霓虹与 practical 光，人物半张脸常被霓虹染红或染绿。`verbatim`
- 胶片 / 画幅：彩色，颗粒感强，抽帧拖影是标志性质感。`artifact`

## (6) 叙事结构

- 结构：碎片与环形：多段爱情并置，时间线跳跃，结尾开放。`impression`
- 视点：第一人称画外音（记忆）与限知视角交替。`impression`
- 时间：时间被拉伸与压缩，时钟、过期日期、1960 年代是时间的刻度。`impression`
- 类型处理：以爱情片写都市孤独，类型成规被抽帧与即兴颠覆。`impression`

## (7) 该拍什么 / 不该拍什么

- 该拍：霓虹雨夜、抽帧慢动作、时钟与过期日期、擦肩而过的恋人、画外音记忆、高饱和忧郁
- 不该拍：固定长镜头、线性叙事、解释性对白、明亮扁平的布光、圆满收束
- Negative prompt: `No static long takes, no linear narrative, no explanatory dialogue, no bright flat lighting, no neat happy ending, no slow contemplative pacing`

## (8) 测试提示词示例（现代题材：一只坐在地铁里的约克夏犬）

- Prompt: `In the style of Wong Kar-wai, a small Yorkshire terrier sitting on a subway seat at night, neon light through the window, step-printed slow motion, a clock ticking, voiceover memory, saturated melancholy, lovers passing without meeting`
- 中文对照：王家卫风格：一只约克夏犬深夜坐在地铁座位上，霓虹透过车窗，抽帧慢动作，时钟滴答，画外音记忆，高饱和的忧郁，恋人擦肩而过。
- Negative: `No static long takes, no linear narrative, no flat lighting, no explanatory voiceover, no neat ending`
- 检验点：抽帧与霓虹是否成立；时间感是否来自时钟与音乐；擦肩而过是否在而非相遇。
