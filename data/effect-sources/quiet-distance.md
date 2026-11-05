# Caspar David Friedrich — 图像风格规格 style.md（给图像模型）

> 只描述画面，不描述人生。色板只写颜料名，不编 HEX。

## (1) 一句话风格（prompt-ready）

- EN: `German Romanticism, solitary Rückenfigur seen from behind, vast fog and sea, muted cool palette, precise thin glazes, stillness, sublime and contemplative`
- ZH: 德国浪漫主义，孤独的背影人物（Rückenfigur），无垠雾海，冷调克制色调，精细薄涂，寂静，崇高而沉思。

## (2) 色板方向

- 主色（7 色，颜料名）：雾白、蓝灰、淡青、赭石、墨绿、暖灰、淡金黄。`verbatim`
- 主色是冷调雾白 + 蓝灰，暖色只给夕阳与人物衣饰一小点；整体低饱和、高明度、极克制。`verbatim`
- 辅色：淡紫、湖绿、土黄。
- 禁色：高饱和艳色铺满；粗笔触；戏剧性斜构图；热闹人群。
- 冷暖：冷调为主，暖金夕阳作唯一暖点；冷暖对比弱，靠明度微差分层。
- 明暗 / 饱和：高明度、低饱和、低对比；亮在雾与天空，暗部是人物剪影与山崖。

## (3) 笔触与线条

- 笔触：精细、薄涂、几乎看不见笔触；多层透明罩染，追求雾的透明感。`verbatim`
- 线条：轮廓线精细、清晰，背影人物的剪影线是画面的唯一硬线；其余皆溶在雾里。
- 质感：光滑薄涂，无厚涂；雾的质感靠多层透明罩染，不靠笔触。

## (4) 构图习惯

- 画幅：横幅与竖幅并存；《雾海上的旅人》约 1818 年，竖幅，背影人物居中；《吕根岛的白垩岩》1818 年，横幅，三人俯瞰。
- 视点：与背影人物同高、同向：观者站在人物身后，一起望向雾海；无俯仰，视线被背影牵着望向远方。
- 布局：中心背影 + 无垠远景：人物在画面下中，雾海与天空占 2/3 以上；地平线高，雾占主导。
- 裁切：人物不裁边，完整剪影；雾把画边溶掉，不留安全边距。

## (5) 光影与透视

- 光源：散射的雾光，无固定光源；亮在雾与天空，人物是暗剪影。
- 阴影：阴影是蓝灰、墨绿的薄涂，透亮不死黑；人物剪影是全画最暗处。
- 透视：空气透视极端化：远景溶化在雾里，近景山崖也只剩剪影；空间靠雾的浓淡推远近。

## (6) 该画什么 / 不该画什么

- 该画：背影旅人、雾海、白垩岩、枯树与废墟、十字架与教堂、月夜海景。`verbatim`
- 不该画：热闹人群；高饱和艳色；粗笔触；戏剧性动势。
- Negative prompt: `crowded lively scene, high-saturation colour, visible rough brushstrokes, dramatic diagonal action, warm cheerful palette, photorealistic detail`

## (7) 测试提示词示例（现代题材：地铁里的约克夏犬（背影））

- Prompt: `In the style of Caspar David Friedrich, a small Yorkshire terrier seen from behind on a subway seat, looking out at the city through the window, German Romanticism, solitary Rückenfigur, vast fog, muted cool palette, precise thin glazes, stillness, sublime`
- 中文对照：弗里德里希风格，一只小约克夏犬背对观者坐在地铁座位上、望向窗外城市，德国浪漫主义，孤独背影，无垠雾气，冷调克制色调，精细薄涂，寂静崇高。
- Negative: 见第 (6) 节。
- 检验点：狗是否背对观者、是否只剩剪影、城市是否溶在雾里，而不是正面卖萌的宠物肖像。
