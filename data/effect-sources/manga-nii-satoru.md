# にいさとる · 本地研究卡快照

来源：human-distillation-lab 工作目录（不假定已提交）。
仅供查阅；出图采用项目内独立转写的线条和明暗方法。

## manga-authors/authors/nii-satoru/SKILL.md

---
name: manga-nii-satoru
description: "にいさとる公开漫画／插画研究与原创绘图参谋；适用于人物动作与服装结构、轻快群像与角色姿态对比；按具体视觉技法编写方案。"
---

# にいさとる（Satoru Nii） · 漫画／插画创作研究卡

聚焦《WIND BREAKER 23》原版公开封面及署名书目，研究漫画作者绘画；动画团队画面不纳入。以下方案为本库原创应用，连续叙事部分不是据封面证明的作者分镜法。

选材类型：当代漫画家。本轮重点：WIND BREAKER 23；参考年份：2025。原版《WIND BREAKER 23》书目发行日为2025-09-09；参考年份是这一卷的出版年，不是每幅原稿的绘制日期，也未声称它是当前最新卷。〔S1, S2〕

方向：动作与冒险。本卡研究公开作品与方法；绘图配方是本库原创转译，未训练模型、未做出图效果验证。

[100人目录](../../CATALOG.md) · [八维绘画方案](drawing.md) · [绘图提示词](prompts.md) · [结构化记录](manifest.json) · [完整创作流程](../../WORKFLOW.md)

## 适用任务

- 人物动作与服装结构
- 轻快群像与角色姿态对比

先读取下列研究依据，再从drawing.md选2–3项具体技法，结合项目自己的角色和世界设定，编写原创画面方案。生成时采用prompts.md的通用技法表达，不直接用作者姓名作为画风口令，不假称本人绘制或背书。用户按作者选择风格时，明确作品阶段，把视觉目标拆成可操作的特征；保留项目已有角色设定，不承诺未经实际出图验证的复现精度。

## 本轮公开依据

- 原版《WIND BREAKER 23》书目发行日为2025-09-09；参考年份是这一卷的出版年，不是每幅原稿的绘制日期，也未声称它是当前最新卷。 作者署名为にいさとる。〔source_summary；S1〕
- 封面一人向左前倾抬腿、另一人直立，形成前侧斜线与后方竖线的交错；白衫、灰蓝衣与深绿裤分出体块。肩肘与衣料连接清楚，背景大面积留白，暖橙小色块与冷色衣物对照。这里只研究封面人物，不把红色书名字体视为作者笔法。〔visual_observation；S2〕

绘画／叙事方法或限定画面观察的依据：S2。下述原创配方不代表这些来源逐项规定了所有参数。

## 选材与分工

- WIND BREAKER 23：漫画著者；本轮原版书目署名为にいさとる，未另列原作与作画分工〔S1〕

## 基本资料

出生年：未知／本轮未核定；逝世年：未知／本轮未核定。

活动／出版语境（非国籍）：講談社的日本漫画出版语境；只记录作品活动，不推断国籍或居住地。民族：未知，不根据姓名或出版地区推断。本轮未核定生卒；不根据姓名或出版地区补造民族。 〔S1〕

本次新增研究对象；未复制成其他专家分类条目。

## 缺口

- 视觉观察限所列单封面；未通读章节、核对助手分工或追溯所有时期。
- 下列八维方案、步骤与提示词是原创转译，尚未实际生成图片验证。

## 来源

- **S1** [WIND BREAKER 23：出版社书目](https://www.kodansha.co.jp/book/products/0000417945) — 講談社；2026-11-01；`page_text`。已读取出版社书目正文的署名与发行日期；未通读内页。 支持：作品作者署名、所选原版卷和发行日。
- **S2** [WIND BREAKER 23：公开封面观察](https://dvs-cover.kodansha.co.jp/0000417945/2PBm360STTRGa80bDQftsayUu39y4E04YMxS5M1j.jpg) — 講談社；2026-11-01；`visual_preview`。已通过view_image实际看此出版社公开封面；仅据可见图面概括，低清处不判断笔刷细节。书名、字体、边框和出版版式不自动归给漫画作者；未观察连续内页。 支持：所示单张封面的构图、轮廓和大色面。


## manga-authors/authors/nii-satoru/drawing.md

# にいさとる（Satoru Nii） · 八维绘画方案

以下全部是**本库原创创作转译**，不是作者原话或其全部作品的统一规则。对应公开事实与访问范围见[研究卡](SKILL.md)。先确定所选作品阶段，彩色建议不自动视为作者固定色板。

## 线条

中细线保持外轮廓连续，衣缝与翻领明确，发束在方向转折处分组。

## 形体与人物

成年肩胸与肘腕连接扎实，衣料拉伸追随关节；既定体型不因动势被拉长。

## 构图

在既定人物数量内让主要运动斜线与稳定竖向参照形成对比，避免所有肢体同方向堆叠。

## 分镜节奏

本库原创迁移：动作前交代重心，动作格让肢体轮廓清楚，反应格降低身体动幅；不据封面推断打斗分镜。

## 黑白与网点

服装按大灰面分层，接触处细暗线说明前后，脸部保持清楚的中亮面。

## 环境

白底练习用少量地面或结构方向定位；实际场景保留入口和承重关系，不添花枝装饰。

## 表情动作

重心、眉眼与嘴角共同传达自信或迟疑，肩肘动作服从当前情节。

## 彩色方案

本库建议灰蓝与深绿为大面，暖橙作小面积反差；指定服色已锁定时只借冷暖关系。

## 落地步骤

1. 先画三种项目构图，选择能清楚承载既定动作的一种：在既定人物数量内让主要运动斜线与稳定竖向参照形成对比，避免所有肢体同方向堆叠。
2. 在既定成年角色与服装下搭体块：成年肩胸与肘腕连接扎实，衣料拉伸追随关节；既定体型不因动势被拉长。 再落实：中细线保持外轮廓连续，衣缝与翻领明确，发束在方向转折处分组。
3. 以缩略灰阶校对材料：服装按大灰面分层，接触处细暗线说明前后，脸部保持清楚的中亮面。 环境处理：白底练习用少量地面或结构方向定位；实际场景保留入口和承重关系，不添花枝装饰。
4. 最后核对表演：重心、眉眼与嘴角共同传达自信或迟疑，肩肘动作服从当前情节。 颜色仅在项目未锁定处尝试：本库建议灰蓝与深绿为大面，暖橙作小面积反差；指定服色已锁定时只借冷暖关系。

## 图像检查

- 关节动作是否带动对应衣褶？
- 主运动线是否有稳定参照而不显失重？
- 各既定人物的脸与手是否能和服装分开？

## 容易失败的做法

- 从封面抄入人物数量、花纹或两段发色。
- 靠极端拉长手脚代替重心和关节设计。


## manga-authors/authors/nii-satoru/prompts.md

# にいさとる（Satoru Nii） · 原创绘图提示词

这些是可编辑的起稿模板，未实际出图。比较时统一使用“雨后浮岛港口归还机械鸟”的原创题材。角色设定页只转用形体、线条和黑白处理，不沿用场景镜头；英文版的角色技法段保留中文规格以免未经审核的翻译改变约束。

不要将本页标题或作者姓名一并粘贴到图像生成提示词。需要其他题材时替换角色、场景、行动和情绪，保留所选择的通用技法；既定发色、发长、肤色、衣色与体型优先，冲突技法或色板必须删改；最后执行[连贯性与输出检查](../../WORKFLOW.md)。

## 单幅叙事插画

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 单幅叙事插画。保持既定成年角色、衣色和剧情，以连续中细线明确肩胸肘腕及衣料连接，翻领接缝清楚。服装分成整洁大灰面，接触暗线说明前后；既定动作的运动方向与稳定参照形成对照。表情通过眉眼嘴角微变，背景低密度，冷暖反差只用于未锁定颜色。 不画原作品角色、标志或签名；文字如需出现，保留位置后期排版。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. One narrative illustration. Keep the specified adult cast, clothing colors, and story. Use continuous medium fine contours to connect shoulders, torso, elbows, and wrists, with clear collars and seams. Organize garments into broad value regions and use narrow contact shadows to explain overlap. Contrast the movement already required by the story with a stable directional reference. Let brows, eyes, and mouth corners carry the emotional change. Keep setting detail restrained and preserve the established body proportions. No existing franchise designs, logos or signatures. Reserve any text for later lettering.
```

## 角色三视图

### 中文

```text
角色设定页：同一名成年修理工的正面、右侧面、背面三个完整视图；短发、短外套、工具腰带、工作靴，三视图衣物结构及比例一致。中性站姿、平视、无透视夸张、纯净背景，三个完整身体不重叠。 以下技法服从上述成年角色、服装和站姿约束；只转用造型与画面处理，忽略示例动作和场景：成年肩胸肘腕连接清楚，翻领衣缝采用连续中细线；服装按既定明度分大面，接触处细暗线分层，发束顺原发长归组。
```

### English / bilingual specification

```text
Character design sheet: front, right-side and rear full-body views of the same adult repair technician, with short hair, a short work jacket, tool belt and work boots. Keep anatomy, garment construction and proportions consistent. Use neutral standing poses, eye-level orthographic views, a plain background and no overlapping figures. Apply the following bilingual line, shape and tone specification subject to the adult character, clothing and neutral pose above; omit any example actions and scene directions: 成年肩胸肘腕连接清楚，翻领衣缝采用连续中细线；服装按既定明度分大面，接触处细暗线分层，发束顺原发长归组。
```

## 六格漫画页

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 六格漫画页，按日式从右到左、从上到下阅读。格1港口建立空间；格2修理工发现机械鸟；格3检查鸟翅；格4旅人赶来；格5修理工交还鸟；格6鸟起飞，两人目送。每格明确一个动作，角色、工具及场景方向连续。预留空白对话框，文字后期排版；不要生成签名或水印。 将以下技法用于各格，不改变上述事件、格数或顺序：保持既定成年角色、衣色和剧情，以连续中细线明确肩胸肘腕及衣料连接，翻领接缝清楚。服装分成整洁大灰面，接触暗线说明前后；既定动作的运动方向与稳定参照形成对照。表情通过眉眼嘴角微变，背景低密度，冷暖反差只用于未锁定颜色。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. A six-panel manga page, read from right to left and top to bottom. Panel 1 establishes the harbor; 2 the technician discovers the bird; 3 inspects its wing; 4 the traveler arrives; 5 the bird is returned; 6 it flies away as both adults watch. Show one clear action per panel; preserve character, prop and screen-direction continuity. Leave speech balloons empty for later lettering. No signatures or watermarks. Apply the following techniques within each panel without changing the events, panel count or sequence: Keep the specified adult cast, clothing colors, and story. Use continuous medium fine contours to connect shoulders, torso, elbows, and wrists, with clear collars and seams. Organize garments into broad value regions and use narrow contact shadows to explain overlap. Contrast the movement already required by the story with a stable directional reference. Let brows, eyes, and mouth corners carry the emotional change. Keep setting detail restrained and preserve the established body proportions.
```


## manga-authors/authors/nii-satoru/manifest.json

{
  "id": "nii-satoru",
  "name": "Satoru Nii",
  "name_zh": "にいさとる",
  "name_ja": "にいさとる",
  "creator_type": "manga-artist",
  "legacy_refs": [],
  "family": "动作与冒险",
  "scope": "聚焦《WIND BREAKER 23》原版公开封面及署名书目，研究漫画作者绘画；动画团队画面不纳入。以下方案为本库原创应用，连续叙事部分不是据封面证明的作者分镜法。",
  "recent_focus": {
    "work": "WIND BREAKER 23",
    "year": 2025,
    "source_ids": [
      "S1",
      "S2"
    ],
    "date_basis": "原版《WIND BREAKER 23》书目发行日为2025-09-09；参考年份是这一卷的出版年，不是每幅原稿的绘制日期，也未声称它是当前最新卷。"
  },
  "reference_works": [
    {
      "title": "WIND BREAKER 23",
      "role": "漫画著者；本轮原版书目署名为にいさとる，未另列原作与作画分工",
      "source_ids": [
        "S1"
      ]
    }
  ],
  "sources": [
    {
      "id": "S1",
      "title": "WIND BREAKER 23：出版社书目",
      "url": "https://www.kodansha.co.jp/book/products/0000417945",
      "publisher": "講談社",
      "accessed_at": "2026-11-01",
      "access_method": "page_text",
      "supports": [
        "作品作者署名、所选原版卷和发行日"
      ],
      "access_note": "已读取出版社书目正文的署名与发行日期；未通读内页。"
    },
    {
      "id": "S2",
      "title": "WIND BREAKER 23：公开封面观察",
      "url": "https://dvs-cover.kodansha.co.jp/0000417945/2PBm360STTRGa80bDQftsayUu39y4E04YMxS5M1j.jpg",
      "publisher": "講談社",
      "accessed_at": "2026-11-01",
      "access_method": "visual_preview",
      "supports": [
        "所示单张封面的构图、轮廓和大色面"
      ],
      "access_note": "已通过view_image实际看此出版社公开封面；仅据可见图面概括，低清处不判断笔刷细节。书名、字体、边框和出版版式不自动归给漫画作者；未观察连续内页。",
      "origin_page_url": "https://www.kodansha.co.jp/book/products/0000417945",
      "observed_asset_sha256": "e1b6466ab6356f59598df5c167bddae65440f290510b0d49a6316a31b1f95832"
    }
  ],
  "findings": [
    {
      "text": "原版《WIND BREAKER 23》书目发行日为2025-09-09；参考年份是这一卷的出版年，不是每幅原稿的绘制日期，也未声称它是当前最新卷。 作者署名为にいさとる。",
      "basis": "source_summary",
      "source_ids": [
        "S1"
      ]
    },
    {
      "text": "封面一人向左前倾抬腿、另一人直立，形成前侧斜线与后方竖线的交错；白衫、灰蓝衣与深绿裤分出体块。肩肘与衣料连接清楚，背景大面积留白，暖橙小色块与冷色衣物对照。这里只研究封面人物，不把红色书名字体视为作者笔法。",
      "basis": "visual_observation",
      "source_ids": [
        "S2"
      ]
    }
  ],
  "method_evidence_source_ids": [
    "S2"
  ],
  "visual_recipe": {
    "line": "中细线保持外轮廓连续，衣缝与翻领明确，发束在方向转折处分组。",
    "shapes": "成年肩胸与肘腕连接扎实，衣料拉伸追随关节；既定体型不因动势被拉长。",
    "composition": "在既定人物数量内让主要运动斜线与稳定竖向参照形成对比，避免所有肢体同方向堆叠。",
    "panel_rhythm": "本库原创迁移：动作前交代重心，动作格让肢体轮廓清楚，反应格降低身体动幅；不据封面推断打斗分镜。",
    "tonal_design": "服装按大灰面分层，接触处细暗线说明前后，脸部保持清楚的中亮面。",
    "environment": "白底练习用少量地面或结构方向定位；实际场景保留入口和承重关系，不添花枝装饰。",
    "acting": "重心、眉眼与嘴角共同传达自信或迟疑，肩肘动作服从当前情节。",
    "color": "本库建议灰蓝与深绿为大面，暖橙作小面积反差；指定服色已锁定时只借冷暖关系。"
  },
  "sheet_traits_zh": "成年肩胸肘腕连接清楚，翻领衣缝采用连续中细线；服装按既定明度分大面，接触处细暗线分层，发束顺原发长归组。",
  "prompt_core_zh": "保持既定成年角色、衣色和剧情，以连续中细线明确肩胸肘腕及衣料连接，翻领接缝清楚。服装分成整洁大灰面，接触暗线说明前后；既定动作的运动方向与稳定参照形成对照。表情通过眉眼嘴角微变，背景低密度，冷暖反差只用于未锁定颜色。",
  "prompt_core_en": "Keep the specified adult cast, clothing colors, and story. Use continuous medium fine contours to connect shoulders, torso, elbows, and wrists, with clear collars and seams. Organize garments into broad value regions and use narrow contact shadows to explain overlap. Contrast the movement already required by the story with a stable directional reference. Let brows, eyes, and mouth corners carry the emotional change. Keep setting detail restrained and preserve the established body proportions.",
  "best_for": [
    "人物动作与服装结构",
    "轻快群像与角色姿态对比"
  ],
  "review_checks": [
    "关节动作是否带动对应衣褶？",
    "主运动线是否有稳定参照而不显失重？",
    "各既定人物的脸与手是否能和服装分开？"
  ],
  "avoid": [
    "从封面抄入人物数量、花纹或两段发色。",
    "靠极端拉长手脚代替重心和关节设计。"
  ],
  "biography": {
    "birth_year": null,
    "death_year": null,
    "region_context": "講談社的日本漫画出版语境；只记录作品活动，不推断国籍或居住地",
    "source_ids": [
      "S1"
    ],
    "note": "本轮未核定生卒；不根据姓名或出版地区补造民族。",
    "ethnicity": {
      "value": null,
      "status": "unknown"
    }
  },
  "known_gaps": [
    "视觉观察限所列单封面；未通读章节、核对助手分工或追溯所有时期。",
    "下列八维方案、步骤与提示词是原创转译，尚未实际生成图片验证。"
  ],
  "drawing_steps": [
    "先画三种项目构图，选择能清楚承载既定动作的一种：在既定人物数量内让主要运动斜线与稳定竖向参照形成对比，避免所有肢体同方向堆叠。",
    "在既定成年角色与服装下搭体块：成年肩胸与肘腕连接扎实，衣料拉伸追随关节；既定体型不因动势被拉长。 再落实：中细线保持外轮廓连续，衣缝与翻领明确，发束在方向转折处分组。",
    "以缩略灰阶校对材料：服装按大灰面分层，接触处细暗线说明前后，脸部保持清楚的中亮面。 环境处理：白底练习用少量地面或结构方向定位；实际场景保留入口和承重关系，不添花枝装饰。",
    "最后核对表演：重心、眉眼与嘴角共同传达自信或迟疑，肩肘动作服从当前情节。 颜色仅在项目未锁定处尝试：本库建议灰蓝与深绿为大面，暖橙作小面积反差；指定服色已锁定时只借冷暖关系。"
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
