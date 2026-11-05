# Bada Shanren — 图像风格规格 style.md（给图像模型）

> 只描述画面，不描述人生。色板只写颜料名，不编 HEX。

## (1) 一句话风格（prompt-ready）

- EN: `In the style of Bada Shanren, minimal freehand xieyi ink painting on paper, a few bold strokes, fish and birds with white upturned eyes, lotus in two strokes, vast empty space, cold and lonely, strange yet precise`
- ZH: 八大山人风格，纸上简笔写意水墨，几笔成形，鱼鸟白眼向天，荷花两笔，大量留白，冷峻孤绝，怪而不野。

## (2) 色板方向

- 主色（5 色，颜料名）：
- 墨色（浓—淡—干—湿分层）
- 淡赭石（极少）
- 淡花青（极少）
- 纸白（留白即水、即天）
- 淡石绿（极少，仅荷叶微染）
- 主色 / 辅色：主色是纯墨；辅色几乎不用，荷叶亦只淡墨晕染。`verbatim`
- 禁色：工笔细描；重彩大面积平涂；满幅构图；热闹群像。
- 冷暖：冷调为主，纯墨偏冷；整体清、冷、孤。
- 明暗 / 饱和：靠墨的浓淡干湿与留白的对比，不靠明暗渐变；饱和度极低，亮在留白处。

## (3) 笔触与线条

- 笔触：笔法简而精：中锋为主，大胆、凝练；荷花两笔成形，鱼鸟几笔成形。`verbatim` / `artifact`（Smarthistory：荷花两笔即成，体积与轻盈并存）
- 线条：线条简练有力，如书法中的大字；轮廓不封闭，靠笔意收住形；线条少而重。
- 质感：纸上水墨晕染 + 枯笔飞白；墨色浓淡干湿一次成形，无堆积。
- 关键技法：白眼——鱼鸟的眼珠翻上，只露眼白，是八大最具辨识度的画法；简笔——以最少的笔写最多的意，荷花两笔、鱼身几笔。`artifact`（Smarthistory；中国日报）

## (4) 构图习惯

- 画幅：竖幅大轴 / 册页皆有；《荷花水鸟图》为大轴，荷茎通贯全幅。
- 视点：平视 / 轻微俯视；无焦点透视，散点构成。
- 布局：孤物偏一角，余下大面积留白；荷茎通贯全幅，上下分段，视线随荷茎上下走。
- 裁切：主体不顶边；留白就是画面；不画满幅。

## (5) 光影与透视

- 光源：无固定光源；亮在留白处。
- 阴影：无写实阴影；墨的浓淡即体积，淡即远、浓即近。
- 透视：无焦点透视；空间靠留白 + 墨色浓淡推远近。

## (6) 该画什么 / 不该画什么

- 该画：鱼、鸟、荷花、石；孤物小品一路。`verbatim`
- 不该画：工笔细描；重彩满幅；热闹群像；满幅山水。
- Negative prompt: `meticulous gongbi fine lines, heavy colour filling the whole paper, crowded group scene, dense full composition, photorealistic detail, oil paint texture`

## (7) 测试提示词示例（现代题材：阳台上的仙人掌）

- Prompt: `In the style of Bada Shanren, a cactus on a balcony in a modern apartment, minimal freehand xieyi ink painting on paper, a few bold strokes, the cactus as a lonely fish with white upturned eyes, vast empty space, cold and lonely, strange yet precise`
- 中文对照：八大山人风格，现代公寓阳台上的一盆仙人掌，简笔写意水墨，几笔成形，仙人掌如白眼向天的孤鱼，大量留白，冷峻孤绝，怪而不野。
- Negative: 见第 (6) 节。
- 检验点：仙人掌是否几笔就立住而不是工笔描刺；白眼意味是否在；背景是否留白而不是画满阳台。
