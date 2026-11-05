# Wes Anderson — 导演风格规格 style.md（给图像 / 视频模型）

> 只描述影片，不描述人生。引用影片时只指认到具体影片与场景，不逐帧复述剧情。

## (1) 一句话风格（prompt-ready）

- EN: `In the style of Wes Anderson: flat symmetrical frames, pastel dioramas, whip pans, melancholy whimsy, every object placed like a museum exhibit`
- ZH: 韦斯·安德森风格：扁平对称的画框，粉彩微缩景观，急摇镜头，忧郁的奇想，每件物件都像博物馆展品般摆放。

## (2) 镜头语言

- 景别：对称扁平构图为主，正面平视中景；特写给物件与面孔，景别精确如画框。`verbatim`
- 机位与运动：急摇镜头与缓慢横移：场景切换用快速摇镜，段落内用横移展开微缩景观；少用手持。`impression`
- 运镜禁忌：见第 (7) 节不该拍清单。

## (3) 场面调度

- 微缩景观式调度：人物在对称布景中左右移动，物件精确摆放；调度以横移与进出画框驱动。`impression`

## (4) 剪辑节奏

- 横移与急摇衔接场景，段落以章节标题与画外音分隔；节奏轻快而精确，音乐驱动切点。`impression`

## (5) 色彩与光影

- 色彩：粉彩主导：粉红、薄荷绿、奶油黄、淡蓝；高明度、低饱和，色彩即情感的色卡。`verbatim`
- 光影：以影片本身的光影为准——自然光为主、人工光只作补光；明暗对比随场景而定，阴影带色彩而不死黑，高光克制不溢出。`verbatim`

## (6) 叙事结构

- 结构：章节体童话结构：开头以画外音与微缩模型起笔，中间以家庭纠葛推进，结尾以和解或告别收束，忧郁而温柔。`impression`
- 该拍什么：
- 对称扁平的粉彩微缩景观
- 急摇镜头切换的场景
- 物件精确摆放的横移
- 章节标题与画外音的童话结构
- 不该拍什么：
- 手持晃动
- 写实粗粝的质感
- 冷峻疏离的旁观
- 杂乱无章的构图

## (7) 该拍什么 / 不该拍什么（Negative prompt）

- 该拍：- 对称扁平的粉彩微缩景观；- 急摇镜头切换的场景；- 物件精确摆放的横移；- 章节标题与画外音的童话结构
- 不该拍：- 手持晃动；- 写实粗粝的质感；- 冷峻疏离的旁观；- 杂乱无章的构图
- Negative prompt: `No handheld shaky cam, no gritty realism, no cold detached observation, no messy composition, no improvised looseness`

## (8) 测试提示词示例（现代题材：一只坐在地铁里的约克夏犬）

- Prompt: `In the style of Wes Anderson, a small Yorkshire terrier sitting on a subway seat, perfectly symmetrical pastel carriage, whip pan to the dog in the centre, every passenger placed like a museum exhibit, chapter title card, melancholy whimsy`
- 中文对照：韦斯·安德森风格：一只约克夏犬坐在地铁座位上，完美对称的粉彩车厢，急摇镜头切到中央的狗，每位乘客都像博物馆展品般摆放，章节标题卡，忧郁的奇想。
- Negative: `No handheld camera, no gritty realism, no messy composition`
- 检验点：镜头语言、场面调度、剪辑节奏、色彩光影、叙事结构是否都落在该导演的风格内；狗是否仍是画面主体。
