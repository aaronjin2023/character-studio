# 蓝本松 · 本地研究卡快照

来源：human-distillation-lab 工作目录（不假定已提交）。
仅供查阅；出图采用项目内独立转写的线条和明暗方法。

## manga-authors/authors/aimoto-sho/SKILL.md

---
name: manga-aimoto-sho
description: "蓝本松公开漫画／插画研究与原创绘图参谋；适用于非人角色与衣装层级研究、侧脸及手势的情绪设计；按具体视觉技法编写方案。"
---

# 蓝本松（Sho Aimoto） · 漫画／插画创作研究卡

聚焦《怪物事変 24》原版公开封面及署名书目，研究漫画作者绘画；动画团队画面不纳入。以下方案为本库原创应用，连续叙事部分不是据封面证明的作者分镜法。

选材类型：当代漫画家。本轮重点：怪物事変 24；参考年份：2025。原版《怪物事変 24》书目发行日为2025-12-04；参考年份是这一卷的出版年，不是每幅原稿的绘制日期，也未声称它是当前最新卷。〔S1, S2〕

方向：怪谈与悬疑。本卡研究公开作品与方法；绘图配方是本库原创转译，未训练模型、未做出图效果验证。

[100人目录](../../CATALOG.md) · [八维绘画方案](drawing.md) · [绘图提示词](prompts.md) · [结构化记录](manifest.json) · [完整创作流程](../../WORKFLOW.md)

## 适用任务

- 非人角色与衣装层级研究
- 侧脸及手势的情绪设计

先读取下列研究依据，再从drawing.md选2–3项具体技法，结合项目自己的角色和世界设定，编写原创画面方案。生成时采用prompts.md的通用技法表达，不直接用作者姓名作为画风口令，不假称本人绘制或背书。用户按作者选择风格时，明确作品阶段，把视觉目标拆成可操作的特征；保留项目已有角色设定，不承诺未经实际出图验证的复现精度。

## 本轮公开依据

- 原版《怪物事変 24》书目发行日为2025-12-04；参考年份是这一卷的出版年，不是每幅原稿的绘制日期，也未声称它是当前最新卷。 作者署名为藍本松。〔source_summary；S1〕
- 低清封面中，红色侧脸与手从深灰高领衣装中显出，浅色毛发和袖口分出另一层，金属勋章为小面积暖亮点。只据152像素宽图观察侧面剪影及大明度关系，不推断细笔刷、毛发刻线或连续页表现。〔visual_observation；S2〕

绘画／叙事方法或限定画面观察的依据：S2。下述原创配方不代表这些来源逐项规定了所有参数。

## 选材与分工

- 怪物事変 24：漫画著者；本轮原版书目署名为藍本松，未另列原作与作画分工〔S1〕

## 基本资料

出生年：未知／本轮未核定；逝世年：未知／本轮未核定。

活动／出版语境（非国籍）：集英社的日本漫画出版语境；只记录作品活动，不推断国籍或居住地。民族：未知，不根据姓名或出版地区推断。本轮未核定生卒；不根据姓名或出版地区补造民族。 〔S1〕

本次新增研究对象；未复制成其他专家分类条目。

## 缺口

- 视觉观察限所列单封面；未通读章节、核对助手分工或追溯所有时期。
- 下列八维方案、步骤与提示词是原创转译，尚未实际生成图片验证。

## 来源

- **S1** [怪物事変 24：出版社书目](https://books.shueisha.co.jp/items/contents.html?isbn=978-4-08-884705-4) — 集英社；2026-11-01；`page_text`。已读取出版社书目正文的署名与发行日期；未通读内页。 支持：作品作者署名、所选原版卷和发行日。
- **S2** [怪物事変 24：公开封面观察](https://dosbg3xlm0x1t.cloudfront.net/images/items/9784088847054/240/9784088847054.jpg) — 集英社；2026-11-01；`visual_preview`。已通过view_image实际看此出版社公开封面；仅据可见图面概括，低清处不判断笔刷细节。书名、字体、边框和出版版式不自动归给漫画作者；未观察连续内页。 支持：所示单张封面的构图、轮廓和大色面。


## manga-authors/authors/aimoto-sho/drawing.md

# 蓝本松（Sho Aimoto） · 八维绘画方案

以下全部是**本库原创创作转译**，不是作者原话或其全部作品的统一规则。对应公开事实与访问范围见[研究卡](SKILL.md)。先确定所选作品阶段，彩色建议不自动视为作者固定色板。

## 线条

主轮廓保持清楚，衣领转折略硬，面部和手的内部线减少以免暗面碎裂。

## 形体与人物

成年头颈与手掌按既定物种结构建立，厚领围绕颈肩体积，不套用样本异形五官。

## 构图

以侧向头部和既定手势建立连贯视觉方向，装饰只在项目已有部位形成小焦点。

## 分镜节奏

本库原创迁移：全貌交代角色状态，转向表情和手的具体反应，再回到关系空间；不据封面概括怪谈分镜。

## 黑白与网点

大暗衣块包住中亮脸手，浅材质仅作窄层分隔，小配件亮点控制数量。

## 环境

背景保持低密度，必要结构沿人物外缘退让；不额外增加恐怖符号或敌人。

## 表情动作

侧脸下颌角度和手指收放共同表达防备或从容，按项目情绪决定，不固定狞笑。

## 彩色方案

本库建议将暖红焦点放在项目允许的材料区，与冷灰暗部对照；不强制改变肤色或物种。

## 落地步骤

1. 先画三种项目构图，选择能清楚承载既定动作的一种：以侧向头部和既定手势建立连贯视觉方向，装饰只在项目已有部位形成小焦点。
2. 在既定成年角色与服装下搭体块：成年头颈与手掌按既定物种结构建立，厚领围绕颈肩体积，不套用样本异形五官。 再落实：主轮廓保持清楚，衣领转折略硬，面部和手的内部线减少以免暗面碎裂。
3. 以缩略灰阶校对材料：大暗衣块包住中亮脸手，浅材质仅作窄层分隔，小配件亮点控制数量。 环境处理：背景保持低密度，必要结构沿人物外缘退让；不额外增加恐怖符号或敌人。
4. 最后核对表演：侧脸下颌角度和手指收放共同表达防备或从容，按项目情绪决定，不固定狞笑。 颜色仅在项目未锁定处尝试：本库建议将暖红焦点放在项目允许的材料区，与冷灰暗部对照；不强制改变肤色或物种。

## 图像检查

- 高领衣物是否围绕真实颈肩体积？
- 小金属亮点是否服务结构而非盖过表情？
- 处理后是否保留既定物种和肤色？

## 容易失败的做法

- 用样本红肤、异形耳鼻或勋章替换项目角色。
- 把低清图看不清的笔刷纹理补写成作者定律。


## manga-authors/authors/aimoto-sho/prompts.md

# 蓝本松（Sho Aimoto） · 原创绘图提示词

这些是可编辑的起稿模板，未实际出图。比较时统一使用“雨后浮岛港口归还机械鸟”的原创题材。角色设定页只转用形体、线条和黑白处理，不沿用场景镜头；英文版的角色技法段保留中文规格以免未经审核的翻译改变约束。

不要将本页标题或作者姓名一并粘贴到图像生成提示词。需要其他题材时替换角色、场景、行动和情绪，保留所选择的通用技法；既定发色、发长、肤色、衣色与体型优先，冲突技法或色板必须删改；最后执行[连贯性与输出检查](../../WORKFLOW.md)。

## 单幅叙事插画

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 单幅叙事插画。保持既定成年角色的物种、肤色与服装，用清楚外轮廓和略硬衣领转折塑造颈肩。大暗面围住可读的脸手，中亮材料与少量配件亮点分层；既定脸部朝向和手指收放表达当前情绪。背景低密度，暖冷对照仅用于允许调整的材料，不添加符号、装饰或人物。 不画原作品角色、标志或签名；文字如需出现，保留位置后期排版。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. One narrative illustration. Preserve the specified adult character, species, skin color, and costume. Use clear outer contours and firmer collar turns to describe neck and shoulder volume. Frame readable face and hand planes with large dark masses, separating lighter materials and a few existing accessory highlights. Coordinate the specified face direction with finger tension to express the current emotion. Keep background density low. Apply warm and cool contrast only to materials the project permits changing; add no symbols or characters. No existing franchise designs, logos or signatures. Reserve any text for later lettering.
```

## 角色三视图

### 中文

```text
角色设定页：同一名成年修理工的正面、右侧面、背面三个完整视图；短发、短外套、工具腰带、工作靴，三视图衣物结构及比例一致。中性站姿、平视、无透视夸张、纯净背景，三个完整身体不重叠。 以下技法服从上述成年角色、服装和站姿约束；只转用造型与画面处理，忽略示例动作和场景：主轮廓清楚，成年颈肩和手掌符合既定物种，厚衣领随体积转折；暗衣与中亮面分层，浅材质窄边及少量金属亮点区分结构。
```

### English / bilingual specification

```text
Character design sheet: front, right-side and rear full-body views of the same adult repair technician, with short hair, a short work jacket, tool belt and work boots. Keep anatomy, garment construction and proportions consistent. Use neutral standing poses, eye-level orthographic views, a plain background and no overlapping figures. Apply the following bilingual line, shape and tone specification subject to the adult character, clothing and neutral pose above; omit any example actions and scene directions: 主轮廓清楚，成年颈肩和手掌符合既定物种，厚衣领随体积转折；暗衣与中亮面分层，浅材质窄边及少量金属亮点区分结构。
```

## 六格漫画页

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 六格漫画页，按日式从右到左、从上到下阅读。格1港口建立空间；格2修理工发现机械鸟；格3检查鸟翅；格4旅人赶来；格5修理工交还鸟；格6鸟起飞，两人目送。每格明确一个动作，角色、工具及场景方向连续。预留空白对话框，文字后期排版；不要生成签名或水印。 将以下技法用于各格，不改变上述事件、格数或顺序：保持既定成年角色的物种、肤色与服装，用清楚外轮廓和略硬衣领转折塑造颈肩。大暗面围住可读的脸手，中亮材料与少量配件亮点分层；既定脸部朝向和手指收放表达当前情绪。背景低密度，暖冷对照仅用于允许调整的材料，不添加符号、装饰或人物。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. A six-panel manga page, read from right to left and top to bottom. Panel 1 establishes the harbor; 2 the technician discovers the bird; 3 inspects its wing; 4 the traveler arrives; 5 the bird is returned; 6 it flies away as both adults watch. Show one clear action per panel; preserve character, prop and screen-direction continuity. Leave speech balloons empty for later lettering. No signatures or watermarks. Apply the following techniques within each panel without changing the events, panel count or sequence: Preserve the specified adult character, species, skin color, and costume. Use clear outer contours and firmer collar turns to describe neck and shoulder volume. Frame readable face and hand planes with large dark masses, separating lighter materials and a few existing accessory highlights. Coordinate the specified face direction with finger tension to express the current emotion. Keep background density low. Apply warm and cool contrast only to materials the project permits changing; add no symbols or characters.
```


## manga-authors/authors/aimoto-sho/manifest.json

{
  "id": "aimoto-sho",
  "name": "Sho Aimoto",
  "name_zh": "蓝本松",
  "name_ja": "藍本松",
  "creator_type": "manga-artist",
  "legacy_refs": [],
  "family": "怪谈与悬疑",
  "scope": "聚焦《怪物事変 24》原版公开封面及署名书目，研究漫画作者绘画；动画团队画面不纳入。以下方案为本库原创应用，连续叙事部分不是据封面证明的作者分镜法。",
  "recent_focus": {
    "work": "怪物事変 24",
    "year": 2025,
    "source_ids": [
      "S1",
      "S2"
    ],
    "date_basis": "原版《怪物事変 24》书目发行日为2025-12-04；参考年份是这一卷的出版年，不是每幅原稿的绘制日期，也未声称它是当前最新卷。"
  },
  "reference_works": [
    {
      "title": "怪物事変 24",
      "role": "漫画著者；本轮原版书目署名为藍本松，未另列原作与作画分工",
      "source_ids": [
        "S1"
      ]
    }
  ],
  "sources": [
    {
      "id": "S1",
      "title": "怪物事変 24：出版社书目",
      "url": "https://books.shueisha.co.jp/items/contents.html?isbn=978-4-08-884705-4",
      "publisher": "集英社",
      "accessed_at": "2026-11-01",
      "access_method": "page_text",
      "supports": [
        "作品作者署名、所选原版卷和发行日"
      ],
      "access_note": "已读取出版社书目正文的署名与发行日期；未通读内页。"
    },
    {
      "id": "S2",
      "title": "怪物事変 24：公开封面观察",
      "url": "https://dosbg3xlm0x1t.cloudfront.net/images/items/9784088847054/240/9784088847054.jpg",
      "publisher": "集英社",
      "accessed_at": "2026-11-01",
      "access_method": "visual_preview",
      "supports": [
        "所示单张封面的构图、轮廓和大色面"
      ],
      "access_note": "已通过view_image实际看此出版社公开封面；仅据可见图面概括，低清处不判断笔刷细节。书名、字体、边框和出版版式不自动归给漫画作者；未观察连续内页。",
      "origin_page_url": "https://books.shueisha.co.jp/items/contents.html?isbn=978-4-08-884705-4",
      "observed_asset_sha256": "4813bf3c9c67256fc751f059d6425d9fa2febd304a39028f506015e8cb5a307a"
    }
  ],
  "findings": [
    {
      "text": "原版《怪物事変 24》书目发行日为2025-12-04；参考年份是这一卷的出版年，不是每幅原稿的绘制日期，也未声称它是当前最新卷。 作者署名为藍本松。",
      "basis": "source_summary",
      "source_ids": [
        "S1"
      ]
    },
    {
      "text": "低清封面中，红色侧脸与手从深灰高领衣装中显出，浅色毛发和袖口分出另一层，金属勋章为小面积暖亮点。只据152像素宽图观察侧面剪影及大明度关系，不推断细笔刷、毛发刻线或连续页表现。",
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
    "line": "主轮廓保持清楚，衣领转折略硬，面部和手的内部线减少以免暗面碎裂。",
    "shapes": "成年头颈与手掌按既定物种结构建立，厚领围绕颈肩体积，不套用样本异形五官。",
    "composition": "以侧向头部和既定手势建立连贯视觉方向，装饰只在项目已有部位形成小焦点。",
    "panel_rhythm": "本库原创迁移：全貌交代角色状态，转向表情和手的具体反应，再回到关系空间；不据封面概括怪谈分镜。",
    "tonal_design": "大暗衣块包住中亮脸手，浅材质仅作窄层分隔，小配件亮点控制数量。",
    "environment": "背景保持低密度，必要结构沿人物外缘退让；不额外增加恐怖符号或敌人。",
    "acting": "侧脸下颌角度和手指收放共同表达防备或从容，按项目情绪决定，不固定狞笑。",
    "color": "本库建议将暖红焦点放在项目允许的材料区，与冷灰暗部对照；不强制改变肤色或物种。"
  },
  "sheet_traits_zh": "主轮廓清楚，成年颈肩和手掌符合既定物种，厚衣领随体积转折；暗衣与中亮面分层，浅材质窄边及少量金属亮点区分结构。",
  "prompt_core_zh": "保持既定成年角色的物种、肤色与服装，用清楚外轮廓和略硬衣领转折塑造颈肩。大暗面围住可读的脸手，中亮材料与少量配件亮点分层；既定脸部朝向和手指收放表达当前情绪。背景低密度，暖冷对照仅用于允许调整的材料，不添加符号、装饰或人物。",
  "prompt_core_en": "Preserve the specified adult character, species, skin color, and costume. Use clear outer contours and firmer collar turns to describe neck and shoulder volume. Frame readable face and hand planes with large dark masses, separating lighter materials and a few existing accessory highlights. Coordinate the specified face direction with finger tension to express the current emotion. Keep background density low. Apply warm and cool contrast only to materials the project permits changing; add no symbols or characters.",
  "best_for": [
    "非人角色与衣装层级研究",
    "侧脸及手势的情绪设计"
  ],
  "review_checks": [
    "高领衣物是否围绕真实颈肩体积？",
    "小金属亮点是否服务结构而非盖过表情？",
    "处理后是否保留既定物种和肤色？"
  ],
  "avoid": [
    "用样本红肤、异形耳鼻或勋章替换项目角色。",
    "把低清图看不清的笔刷纹理补写成作者定律。"
  ],
  "biography": {
    "birth_year": null,
    "death_year": null,
    "region_context": "集英社的日本漫画出版语境；只记录作品活动，不推断国籍或居住地",
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
    "先画三种项目构图，选择能清楚承载既定动作的一种：以侧向头部和既定手势建立连贯视觉方向，装饰只在项目已有部位形成小焦点。",
    "在既定成年角色与服装下搭体块：成年头颈与手掌按既定物种结构建立，厚领围绕颈肩体积，不套用样本异形五官。 再落实：主轮廓保持清楚，衣领转折略硬，面部和手的内部线减少以免暗面碎裂。",
    "以缩略灰阶校对材料：大暗衣块包住中亮脸手，浅材质仅作窄层分隔，小配件亮点控制数量。 环境处理：背景保持低密度，必要结构沿人物外缘退让；不额外增加恐怖符号或敌人。",
    "最后核对表演：侧脸下颌角度和手指收放共同表达防备或从容，按项目情绪决定，不固定狞笑。 颜色仅在项目未锁定处尝试：本库建议将暖红焦点放在项目允许的材料区，与冷灰暗部对照；不强制改变肤色或物种。"
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
