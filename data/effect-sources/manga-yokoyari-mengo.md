# 横枪萌果 · 本地研究卡快照

来源：human-distillation-lab 工作目录（不假定已提交）。
仅供查阅；出图采用项目内独立转写的线条和明暗方法。

## manga-authors/authors/yokoyari-mengo/SKILL.md

---
name: manga-yokoyari-mengo
description: "横枪萌果公开漫画／插画研究与原创绘图参谋；适用于表现欲强的成年人物、情绪特写设计；按具体视觉技法编写方案。"
---

# 横枪萌果（Mengo Yokoyari） · 漫画／插画创作研究卡

【推しの子】第1卷：日文原版封面为实际视觉范围；漫画绘画；原作另署赤坂アカ。全部配方与步骤为本库原创转译，分镜建议不归为作者方法。

选材类型：当代漫画家。本轮重点：【推しの子】第1卷与2022年作画访谈；参考年份：2020。所观察日文第1卷原版发行日为2020年7月17日；参考年份按这张封面的出版卷确定，原始连载起点另见S1，不等同于封面绘制日期。 同时参考2022年访谈，访谈不把旧封面变成2022年新绘。〔S4, S2, S3〕

方向：情感与表演。本卡研究公开作品与方法；绘图配方是本库原创转译，未训练模型、未做出图效果验证。

[100人目录](../../CATALOG.md) · [八维绘画方案](drawing.md) · [绘图提示词](prompts.md) · [结构化记录](manifest.json) · [完整创作流程](../../WORKFLOW.md)

## 适用任务

- 表现欲强的成年人物
- 情绪特写设计

先读取下列研究依据，再从drawing.md选2–3项具体技法，结合项目自己的角色和世界设定，编写原创画面方案。生成时采用prompts.md的通用技法表达，不直接用作者姓名作为画风口令，不假称本人绘制或背书。用户按作者选择风格时，明确作品阶段，把视觉目标拆成可操作的特征；保留项目已有角色设定，不承诺未经实际出图验证的复现精度。

## 本轮公开依据

- 官方原作网站确认2020年4月合作连载，区分赤坂原作与横槍绘画；2022年作画对谈的具体内容另见S3。〔source_summary；S1, S3〕
- 日文第1卷封面：正面人物两只抬起的手臂从上方围住脸，指尖指向眼睛附近；紫色长发、亮粉手套、黄领口相邻，瞳孔高亮很密。只支持这张封面。〔visual_observation；S2〕
- 横槍在2022年对谈中说明，即使时间紧张也优先保证人物脸部的吸引力；谈舞台段落时强调尽量表现人物投入表演的热情。〔source_summary；S3〕
- 所观察日文第1卷原版发行日为2020年7月17日；参考年份按这张封面的出版卷确定，原始连载起点另见S1，不等同于封面绘制日期。〔source_summary；S4〕

绘画／叙事方法或限定画面观察的依据：S2, S3。下述原创配方不代表这些来源逐项规定了所有参数。

## 选材与分工

- 【推しの子】第1卷：漫画绘画；原作另署赤坂アカ〔S1, S2〕

## 基本资料

出生年：未知／本轮未核定；逝世年：未知／本轮未核定。

活动／出版语境（非国籍）：日本漫画出版语境：集英社正式出版作品。民族：未知，不根据姓名或出版地区推断。仅核公开署名与作品出版语境；未核生卒，不由姓名推断民族。 〔S1〕

本次新增研究对象；未复制成其他专家分类条目。

## 缺口

- 未读全卷内页；分镜、环境与角色设定三视图均为原创制作建议，非封面可直接证明的作者固定规律。
- 未核作者近期所有作品或完整制作流程；只代表这里列明的近年创作阶段与有限图像。

## 来源

- **S1** [【推しの子】第1卷 官方作品与出版资料](https://youngjump.jp/oshinoko/) — 集英社；2026-11-01；`page_text`。已读取公开网页正文；无账号访问。未读全卷。 支持：作者与作品署名；原始连载或日文原版日期。
- **S2** [【推しの子】第1卷 日文第1卷官方封面图](https://dosbg3xlm0x1t.cloudfront.net/images/items/9784088916507/240/9784088916507.jpg) — 集英社；2026-11-01；`visual_preview`。下载到临时预览后经图像工具实际查看；仅封面，不等于样章、分镜或全作风格。SHA256 38d0b15eb4f57bd7fa8c9b7217f56c57225aaa1dfaaf6655706a6ec53c51bcd8 支持：仅该封面的构图、线条、色块与姿态。
- **S3** [赤坂アカ×横槍メンゴ对谈（后篇）第2页，2022-06-10](https://shueisha.online/articles/-/21959?disp=paging&page=2) — 集英社オンライン；2026-11-01；`interview_text`。已读第2页正文；未将文中插图alt当视觉观察。 支持：作者直接谈绘画取舍；各自发言不混同。
- **S4** [【推しの子】第1卷：原版发行日期补核](https://www.shueisha.co.jp/books/items/contents.html?isbn=978-4-08-891650-7) — 集英社；2026-11-01；`search_excerpt`。实际检索到出版社书目片段，含原版发行日与署名；未据此称已读全卷。 支持：所观察第1卷的原版发行日期与署名。


## manga-authors/authors/yokoyari-mengo/drawing.md

# 横枪萌果（Mengo Yokoyari） · 八维绘画方案

以下全部是**本库原创创作转译**，不是作者原话或其全部作品的统一规则。对应公开事实与访问范围见[研究卡](SKILL.md)。先确定所选作品阶段，彩色建议不自动视为作者固定色板。

## 线条

面部用细而干净的弧线，睫毛与上眼线加粗，发丝按成束走势分组。

## 形体与人物

成年颊颌体块自然，按指定年龄和头身保留成熟结构，发束与已有手臂均服从既定姿态。

## 构图

用画面既有轮廓和负形包围主要表情信息，不额外抬臂或添加手指框。

## 分镜节奏

原创分镜建议：普通表情先建立基准，情绪高点扩大脸部面积，随后用较空的反应画面降速。

## 黑白与网点

眼周关键线对比清楚，脸部留可读浅面；既定发色以分束明度保持体积。

## 环境

背景只留低细节色域与软形，人物轮廓附近避免同明度碎纹。

## 表情动作

保证表情首先可读，再加装饰；眼眉开合和嘴形共同决定情绪，手势服务于脸。

## 彩色方案

本库建议：紫与洋红作主色、少量明黄作连接点，参考该封面而非固定作者色板。；仅用于项目未锁定的色域，保留既定发色、肤色、衣色。

## 落地步骤

1. 先以项目故事和固定机位排三张缩略稿，选择：用画面既有轮廓和负形包围主要表情信息，不额外抬臂或添加手指框。
2. 在既定角色和服装上建立体块：成年颊颌体块自然，按指定年龄和头身保留成熟结构，发束与已有手臂均服从既定姿态。
3. 分层落线并检查明度：面部用细而干净的弧线，睫毛与上眼线加粗，发丝按成束走势分组。 眼周关键线对比清楚，脸部留可读浅面；既定发色以分束明度保持体积。
4. 最后核对表演与背景：保证表情首先可读，再加装饰；眼眉开合和嘴形共同决定情绪，手势服务于脸。 背景只留低细节色域与软形，人物轮廓附近避免同明度碎纹。 配色仅用于尚未锁定的色域。

## 图像检查

- 缩小后主要表情和既定动作是否仍先于装饰可读？
- 人物数量、发色发长、衣装和动作是否与项目原设定完全一致？
- 纹理、衣缘和背景能否按主次分层，是否发生不必要的轮廓切线？

## 容易失败的做法

- 用独有瞳孔符号或原角色配饰代替通用表情设计。
- 所有发丝同粗同亮，造成杂乱光泽。


## manga-authors/authors/yokoyari-mengo/prompts.md

# 横枪萌果（Mengo Yokoyari） · 原创绘图提示词

这些是可编辑的起稿模板，未实际出图。比较时统一使用“雨后浮岛港口归还机械鸟”的原创题材。角色设定页只转用形体、线条和黑白处理，不沿用场景镜头；英文版的角色技法段保留中文规格以免未经审核的翻译改变约束。

不要将本页标题或作者姓名一并粘贴到图像生成提示词。需要其他题材时替换角色、场景、行动和情绪，保留所选择的通用技法；既定发色、发长、肤色、衣色与体型优先，冲突技法或色板必须删改；最后执行[连贯性与输出检查](../../WORKFLOW.md)。

## 单幅叙事插画

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 单幅叙事插画。沿用既定成年人物、人数、发色发长与动作，以轻细面部弧线对照稍重上眼睑，发束分组而不逐丝铺满。脸颊保留清楚浅面，眼眉嘴的对比高于次要衣纹；背景降细节，少量冷暖强调服从既定色彩，用准确表情结构表达项目要求的情绪。 不画原作品角色、标志或签名；文字如需出现，保留位置后期排版。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. One narrative illustration. Preserve the specified adult identities, cast size, hair colors and lengths, and actions. Contrast delicate facial curves with slightly stronger upper eyelids, grouping existing hair without multiplying strands or changing its length. Keep cheeks clearly modeled and prioritize eyes, brows, and mouth over secondary fabric details. Reduce background density and apply restrained warm cool accents within the established colors. Communicate the requested emotion through accurate facial structure without imposing raised arms, gestures, or additional events. No existing franchise designs, logos or signatures. Reserve any text for later lettering.
```

## 角色三视图

### 中文

```text
角色设定页：同一名成年修理工的正面、右侧面、背面三个完整视图；短发、短外套、工具腰带、工作靴，三视图衣物结构及比例一致。中性站姿、平视、无透视夸张、纯净背景，三个完整身体不重叠。 以下技法服从上述成年角色、服装和站姿约束；只转用造型与画面处理，忽略示例动作和场景：轻细面部弧线配稍重眼睑，静态成年颊颌体块自然；发束按既定长度分组，皮肤浅灰与衣料暗面分区。
```

### English / bilingual specification

```text
Character design sheet: front, right-side and rear full-body views of the same adult repair technician, with short hair, a short work jacket, tool belt and work boots. Keep anatomy, garment construction and proportions consistent. Use neutral standing poses, eye-level orthographic views, a plain background and no overlapping figures. Apply the following bilingual line, shape and tone specification subject to the adult character, clothing and neutral pose above; omit any example actions and scene directions: 轻细面部弧线配稍重眼睑，静态成年颊颌体块自然；发束按既定长度分组，皮肤浅灰与衣料暗面分区。
```

## 六格漫画页

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 六格漫画页，按日式从右到左、从上到下阅读。格1港口建立空间；格2修理工发现机械鸟；格3检查鸟翅；格4旅人赶来；格5修理工交还鸟；格6鸟起飞，两人目送。每格明确一个动作，角色、工具及场景方向连续。预留空白对话框，文字后期排版；不要生成签名或水印。 将以下技法用于各格，不改变上述事件、格数或顺序：沿用既定成年人物、人数、发色发长与动作，以轻细面部弧线对照稍重上眼睑，发束分组而不逐丝铺满。脸颊保留清楚浅面，眼眉嘴的对比高于次要衣纹；背景降细节，少量冷暖强调服从既定色彩，用准确表情结构表达项目要求的情绪。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. A six-panel manga page, read from right to left and top to bottom. Panel 1 establishes the harbor; 2 the technician discovers the bird; 3 inspects its wing; 4 the traveler arrives; 5 the bird is returned; 6 it flies away as both adults watch. Show one clear action per panel; preserve character, prop and screen-direction continuity. Leave speech balloons empty for later lettering. No signatures or watermarks. Apply the following techniques within each panel without changing the events, panel count or sequence: Preserve the specified adult identities, cast size, hair colors and lengths, and actions. Contrast delicate facial curves with slightly stronger upper eyelids, grouping existing hair without multiplying strands or changing its length. Keep cheeks clearly modeled and prioritize eyes, brows, and mouth over secondary fabric details. Reduce background density and apply restrained warm cool accents within the established colors. Communicate the requested emotion through accurate facial structure without imposing raised arms, gestures, or additional events.
```


## manga-authors/authors/yokoyari-mengo/manifest.json

{
  "id": "yokoyari-mengo",
  "name": "Mengo Yokoyari",
  "name_zh": "横枪萌果",
  "name_ja": "横槍メンゴ",
  "legacy_refs": [],
  "creator_type": "manga-artist",
  "family": "情感与表演",
  "scope": "【推しの子】第1卷：日文原版封面为实际视觉范围；漫画绘画；原作另署赤坂アカ。全部配方与步骤为本库原创转译，分镜建议不归为作者方法。",
  "recent_focus": {
    "work": "【推しの子】第1卷与2022年作画访谈",
    "year": 2020,
    "source_ids": [
      "S4",
      "S2",
      "S3"
    ],
    "date_basis": "所观察日文第1卷原版发行日为2020年7月17日；参考年份按这张封面的出版卷确定，原始连载起点另见S1，不等同于封面绘制日期。 同时参考2022年访谈，访谈不把旧封面变成2022年新绘。"
  },
  "reference_works": [
    {
      "title": "【推しの子】第1卷",
      "role": "漫画绘画；原作另署赤坂アカ",
      "source_ids": [
        "S1",
        "S2"
      ]
    }
  ],
  "sources": [
    {
      "id": "S1",
      "title": "【推しの子】第1卷 官方作品与出版资料",
      "url": "https://youngjump.jp/oshinoko/",
      "publisher": "集英社",
      "accessed_at": "2026-11-01",
      "access_method": "page_text",
      "supports": [
        "作者与作品署名",
        "原始连载或日文原版日期"
      ],
      "access_note": "已读取公开网页正文；无账号访问。未读全卷。"
    },
    {
      "id": "S2",
      "title": "【推しの子】第1卷 日文第1卷官方封面图",
      "url": "https://dosbg3xlm0x1t.cloudfront.net/images/items/9784088916507/240/9784088916507.jpg",
      "publisher": "集英社",
      "accessed_at": "2026-11-01",
      "access_method": "visual_preview",
      "supports": [
        "仅该封面的构图、线条、色块与姿态"
      ],
      "access_note": "下载到临时预览后经图像工具实际查看；仅封面，不等于样章、分镜或全作风格。SHA256 38d0b15eb4f57bd7fa8c9b7217f56c57225aaa1dfaaf6655706a6ec53c51bcd8"
    },
    {
      "id": "S3",
      "title": "赤坂アカ×横槍メンゴ对谈（后篇）第2页，2022-06-10",
      "url": "https://shueisha.online/articles/-/21959?disp=paging&page=2",
      "publisher": "集英社オンライン",
      "accessed_at": "2026-11-01",
      "access_method": "interview_text",
      "supports": [
        "作者直接谈绘画取舍；各自发言不混同"
      ],
      "access_note": "已读第2页正文；未将文中插图alt当视觉观察。"
    },
    {
      "id": "S4",
      "title": "【推しの子】第1卷：原版发行日期补核",
      "url": "https://www.shueisha.co.jp/books/items/contents.html?isbn=978-4-08-891650-7",
      "publisher": "集英社",
      "accessed_at": "2026-11-01",
      "access_method": "search_excerpt",
      "supports": [
        "所观察第1卷的原版发行日期与署名"
      ],
      "access_note": "实际检索到出版社书目片段，含原版发行日与署名；未据此称已读全卷。"
    }
  ],
  "findings": [
    {
      "text": "官方原作网站确认2020年4月合作连载，区分赤坂原作与横槍绘画；2022年作画对谈的具体内容另见S3。",
      "basis": "source_summary",
      "source_ids": [
        "S1",
        "S3"
      ]
    },
    {
      "text": "日文第1卷封面：正面人物两只抬起的手臂从上方围住脸，指尖指向眼睛附近；紫色长发、亮粉手套、黄领口相邻，瞳孔高亮很密。只支持这张封面。",
      "basis": "visual_observation",
      "source_ids": [
        "S2"
      ]
    },
    {
      "text": "横槍在2022年对谈中说明，即使时间紧张也优先保证人物脸部的吸引力；谈舞台段落时强调尽量表现人物投入表演的热情。",
      "basis": "source_summary",
      "source_ids": [
        "S3"
      ]
    },
    {
      "text": "所观察日文第1卷原版发行日为2020年7月17日；参考年份按这张封面的出版卷确定，原始连载起点另见S1，不等同于封面绘制日期。",
      "basis": "source_summary",
      "source_ids": [
        "S4"
      ]
    }
  ],
  "method_evidence_source_ids": [
    "S2",
    "S3"
  ],
  "visual_recipe": {
    "line": "面部用细而干净的弧线，睫毛与上眼线加粗，发丝按成束走势分组。",
    "shapes": "成年颊颌体块自然，按指定年龄和头身保留成熟结构，发束与已有手臂均服从既定姿态。",
    "composition": "用画面既有轮廓和负形包围主要表情信息，不额外抬臂或添加手指框。",
    "panel_rhythm": "原创分镜建议：普通表情先建立基准，情绪高点扩大脸部面积，随后用较空的反应画面降速。",
    "tonal_design": "眼周关键线对比清楚，脸部留可读浅面；既定发色以分束明度保持体积。",
    "environment": "背景只留低细节色域与软形，人物轮廓附近避免同明度碎纹。",
    "acting": "保证表情首先可读，再加装饰；眼眉开合和嘴形共同决定情绪，手势服务于脸。",
    "color": "本库建议：紫与洋红作主色、少量明黄作连接点，参考该封面而非固定作者色板。；仅用于项目未锁定的色域，保留既定发色、肤色、衣色。"
  },
  "drawing_steps": [
    "先以项目故事和固定机位排三张缩略稿，选择：用画面既有轮廓和负形包围主要表情信息，不额外抬臂或添加手指框。",
    "在既定角色和服装上建立体块：成年颊颌体块自然，按指定年龄和头身保留成熟结构，发束与已有手臂均服从既定姿态。",
    "分层落线并检查明度：面部用细而干净的弧线，睫毛与上眼线加粗，发丝按成束走势分组。 眼周关键线对比清楚，脸部留可读浅面；既定发色以分束明度保持体积。",
    "最后核对表演与背景：保证表情首先可读，再加装饰；眼眉开合和嘴形共同决定情绪，手势服务于脸。 背景只留低细节色域与软形，人物轮廓附近避免同明度碎纹。 配色仅用于尚未锁定的色域。"
  ],
  "review_checks": [
    "缩小后主要表情和既定动作是否仍先于装饰可读？",
    "人物数量、发色发长、衣装和动作是否与项目原设定完全一致？",
    "纹理、衣缘和背景能否按主次分层，是否发生不必要的轮廓切线？"
  ],
  "avoid": [
    "用独有瞳孔符号或原角色配饰代替通用表情设计。",
    "所有发丝同粗同亮，造成杂乱光泽。"
  ],
  "best_for": [
    "表现欲强的成年人物",
    "情绪特写设计"
  ],
  "sheet_traits_zh": "轻细面部弧线配稍重眼睑，静态成年颊颌体块自然；发束按既定长度分组，皮肤浅灰与衣料暗面分区。",
  "prompt_core_zh": "沿用既定成年人物、人数、发色发长与动作，以轻细面部弧线对照稍重上眼睑，发束分组而不逐丝铺满。脸颊保留清楚浅面，眼眉嘴的对比高于次要衣纹；背景降细节，少量冷暖强调服从既定色彩，用准确表情结构表达项目要求的情绪。",
  "prompt_core_en": "Preserve the specified adult identities, cast size, hair colors and lengths, and actions. Contrast delicate facial curves with slightly stronger upper eyelids, grouping existing hair without multiplying strands or changing its length. Keep cheeks clearly modeled and prioritize eyes, brows, and mouth over secondary fabric details. Reduce background density and apply restrained warm cool accents within the established colors. Communicate the requested emotion through accurate facial structure without imposing raised arms, gestures, or additional events.",
  "biography": {
    "birth_year": null,
    "death_year": null,
    "region_context": "日本漫画出版语境：集英社正式出版作品。",
    "source_ids": [
      "S1"
    ],
    "note": "仅核公开署名与作品出版语境；未核生卒，不由姓名推断民族。",
    "ethnicity": {
      "value": null,
      "status": "unknown"
    }
  },
  "known_gaps": [
    "未读全卷内页；分镜、环境与角色设定三视图均为原创制作建议，非封面可直接证明的作者固定规律。",
    "未核作者近期所有作品或完整制作流程；只代表这里列明的近年创作阶段与有限图像。"
  ],
  "schema_version": 1,
  "kind": "manga-author-study",
  "entity_kind": "person",
  "status": "source-grounded-draft",
  "research_date": "2026-11-01",
  "generation_mode": "original-general-techniques",
  "image_validation": "not-run",
  "recipe_basis": "original_synthesis"
}
