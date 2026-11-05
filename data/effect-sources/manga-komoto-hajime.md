# 甲本一 · 本地研究卡快照

来源：human-distillation-lab 工作目录（不假定已提交）。
仅供查阅；出图采用项目内独立转写的线条和明暗方法。

## manga-authors/authors/komoto-hajime/SKILL.md

---
name: manga-komoto-hajime
description: "甲本一公开漫画／插画研究与原创绘图参谋；适用于大黑块动作插画、克制表情与明确动作的对比；按具体视觉技法编写方案。"
---

# 甲本一（Hajime Komoto） · 漫画／插画创作研究卡

聚焦《マッシュル―MASHLE― 18》原版公开封面及署名书目，研究漫画作者绘画；动画团队画面不纳入。以下方案为本库原创应用，连续叙事部分不是据封面证明的作者分镜法。

选材类型：当代漫画家。本轮重点：マッシュル―MASHLE― 18；参考年份：2023。原版《マッシュル―MASHLE― 18》书目发行日为2023-10-04；参考年份是这一卷的出版年，不是每幅原稿的绘制日期，也未声称它是当前最新卷。〔S1, S2〕

方向：动作与冒险。本卡研究公开作品与方法；绘图配方是本库原创转译，未训练模型、未做出图效果验证。

[100人目录](../../CATALOG.md) · [八维绘画方案](drawing.md) · [绘图提示词](prompts.md) · [结构化记录](manifest.json) · [完整创作流程](../../WORKFLOW.md)

## 适用任务

- 大黑块动作插画
- 克制表情与明确动作的对比

先读取下列研究依据，再从drawing.md选2–3项具体技法，结合项目自己的角色和世界设定，编写原创画面方案。生成时采用prompts.md的通用技法表达，不直接用作者姓名作为画风口令，不假称本人绘制或背书。用户按作者选择风格时，明确作品阶段，把视觉目标拆成可操作的特征；保留项目已有角色设定，不承诺未经实际出图验证的复现精度。

## 本轮公开依据

- 原版《マッシュル―MASHLE― 18》书目发行日为2023-10-04；参考年份是这一卷的出版年，不是每幅原稿的绘制日期，也未声称它是当前最新卷。 作者署名为甲本一。〔source_summary；S1〕
- 封面中央拳头向前伸出，面部位于其上，深色衣料形成连片大形，旁侧人物较小；少量冷亮边分开深衣重叠。蓝色建筑与白云位于背景。外圈金色边框和书名字体属于出版封面构成，不能自动归为作者绘画习惯。〔visual_observation；S2〕

绘画／叙事方法或限定画面观察的依据：S2。下述原创配方不代表这些来源逐项规定了所有参数。

## 选材与分工

- マッシュル―MASHLE― 18：漫画著者；本轮原版书目署名为甲本一，未另列原作与作画分工〔S1〕

## 基本资料

出生年：未知／本轮未核定；逝世年：未知／本轮未核定。

活动／出版语境（非国籍）：集英社的日本漫画出版语境；只记录作品活动，不推断国籍或居住地。民族：未知，不根据姓名或出版地区推断。本轮未核定生卒；不根据姓名或出版地区补造民族。 〔S1〕

本次新增研究对象；未复制成其他专家分类条目。

## 缺口

- 视觉观察限所列单封面；未通读章节、核对助手分工或追溯所有时期。
- 下列八维方案、步骤与提示词是原创转译，尚未实际生成图片验证。

## 来源

- **S1** [マッシュル―MASHLE― 18：出版社书目](https://books.shueisha.co.jp/items/contents.html?isbn=978-4-08-883668-3&mode=1) — 集英社；2026-11-01；`page_text`。已读取出版社书目正文的署名与发行日期；未通读内页。 支持：作品作者署名、所选原版卷和发行日。
- **S2** [マッシュル―MASHLE― 18：公开封面观察](https://www.shonenjump.com/j/comics/_comicimage/mashle018.jpg) — 集英社；2026-11-01；`visual_preview`。已通过view_image实际看此出版社公开封面；仅据可见图面概括，低清处不判断笔刷细节。书名、字体、边框和出版版式不自动归给漫画作者；未观察连续内页。 支持：所示单张封面的构图、轮廓和大色面。


## manga-authors/authors/komoto-hajime/drawing.md

# 甲本一（Hajime Komoto） · 八维绘画方案

以下全部是**本库原创创作转译**，不是作者原话或其全部作品的统一规则。对应公开事实与访问范围见[研究卡](SKILL.md)。先确定所选作品阶段，彩色建议不自动视为作者固定色板。

## 线条

中重外线明确衣物大轮廓，五官内线简省，拳指用少数折线说明体积。

## 形体与人物

成年躯干保持完整胸廓，手掌可在故事需要时近距放大，但指节和腕部体积连续。

## 构图

主动作以一个清楚前景形建立焦点，其余既定人物或物件按距离减小；没有配角的任务不增人。

## 分镜节奏

本库原创迁移：先用平稳中景建立动作预期，再以一格明确动作改变，后接克制反应；封面不证明作者喜剧节奏。

## 黑白与网点

深衣归并大块，用少量亮边区分重叠，脸手留中亮面，背景深度不靠满铺黑线。

## 环境

背景以大块建筑与天光建立尺度，细节避开主动作轮廓，不复制特定魔法学校。

## 表情动作

简省五官可维持平稳表情，主要情绪转折通过肩线与手部力度表现，服从既定人物态度。

## 彩色方案

本库建议深蓝黑衣面与冷亮边对照，暖色作小焦点；色板按项目已有衣色调整。

## 落地步骤

1. 先画三种项目构图，选择能清楚承载既定动作的一种：主动作以一个清楚前景形建立焦点，其余既定人物或物件按距离减小；没有配角的任务不增人。
2. 在既定成年角色与服装下搭体块：成年躯干保持完整胸廓，手掌可在故事需要时近距放大，但指节和腕部体积连续。 再落实：中重外线明确衣物大轮廓，五官内线简省，拳指用少数折线说明体积。
3. 以缩略灰阶校对材料：深衣归并大块，用少量亮边区分重叠，脸手留中亮面，背景深度不靠满铺黑线。 环境处理：背景以大块建筑与天光建立尺度，细节避开主动作轮廓，不复制特定魔法学校。
4. 最后核对表演：简省五官可维持平稳表情，主要情绪转折通过肩线与手部力度表现，服从既定人物态度。 颜色仅在项目未锁定处尝试：本库建议深蓝黑衣面与冷亮边对照，暖色作小焦点；色板按项目已有衣色调整。

## 图像检查

- 深衣块是否仍能区分手臂与胸廓？
- 前伸手掌的关节与腕部是否连续？
- 简省表情是否仍符合既定情绪？

## 容易失败的做法

- 把大黑衣画成没有人体结构的平面袋子。
- 固定复制拳头朝镜头动作，改变用户原故事。


## manga-authors/authors/komoto-hajime/prompts.md

# 甲本一（Hajime Komoto） · 原创绘图提示词

这些是可编辑的起稿模板，未实际出图。比较时统一使用“雨后浮岛港口归还机械鸟”的原创题材。角色设定页只转用形体、线条和黑白处理，不沿用场景镜头；英文版的角色技法段保留中文规格以免未经审核的翻译改变约束。

不要将本页标题或作者姓名一并粘贴到图像生成提示词。需要其他题材时替换角色、场景、行动和情绪，保留所选择的通用技法；既定发色、发长、肤色、衣色与体型优先，冲突技法或色板必须删改；最后执行[连贯性与输出检查](../../WORKFLOW.md)。

## 单幅叙事插画

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 单幅叙事插画。以中重外线和简省五官塑造既定成年角色，胸廓腕指连接完整。把服装暗部归并为大形，仅以少量窄亮边分开重叠，脸手保持可读；既定动作是唯一焦点，既定环境结构降低细节。用克制表情与清楚手势形成张力，不增加人物、武器或事件。 不画原作品角色、标志或签名；文字如需出现，保留位置后期排版。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. One narrative illustration. Build the specified adult characters with firm outer contours and economical facial lines, preserving complete torso, wrist, and finger structure. Merge garment shadows into large shapes and separate overlaps with a few narrow highlights. Keep faces and hands readable. Make the action already required by the story the single focal event, with detail in the established environment subdued behind it. Use restrained expressions and clear gestures for tension. Add no characters, weapons, or narrative events. No existing franchise designs, logos or signatures. Reserve any text for later lettering.
```

## 角色三视图

### 中文

```text
角色设定页：同一名成年修理工的正面、右侧面、背面三个完整视图；短发、短外套、工具腰带、工作靴，三视图衣物结构及比例一致。中性站姿、平视、无透视夸张、纯净背景，三个完整身体不重叠。 以下技法服从上述成年角色、服装和站姿约束；只转用造型与画面处理，忽略示例动作和场景：成年胸廓与腕指完整，中重外线组织服装大形，简省面部内线；既定深色区连成块，窄亮边分重叠，中性站姿不放大拳头。
```

### English / bilingual specification

```text
Character design sheet: front, right-side and rear full-body views of the same adult repair technician, with short hair, a short work jacket, tool belt and work boots. Keep anatomy, garment construction and proportions consistent. Use neutral standing poses, eye-level orthographic views, a plain background and no overlapping figures. Apply the following bilingual line, shape and tone specification subject to the adult character, clothing and neutral pose above; omit any example actions and scene directions: 成年胸廓与腕指完整，中重外线组织服装大形，简省面部内线；既定深色区连成块，窄亮边分重叠，中性站姿不放大拳头。
```

## 六格漫画页

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 六格漫画页，按日式从右到左、从上到下阅读。格1港口建立空间；格2修理工发现机械鸟；格3检查鸟翅；格4旅人赶来；格5修理工交还鸟；格6鸟起飞，两人目送。每格明确一个动作，角色、工具及场景方向连续。预留空白对话框，文字后期排版；不要生成签名或水印。 将以下技法用于各格，不改变上述事件、格数或顺序：以中重外线和简省五官塑造既定成年角色，胸廓腕指连接完整。把服装暗部归并为大形，仅以少量窄亮边分开重叠，脸手保持可读；既定动作是唯一焦点，既定环境结构降低细节。用克制表情与清楚手势形成张力，不增加人物、武器或事件。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. A six-panel manga page, read from right to left and top to bottom. Panel 1 establishes the harbor; 2 the technician discovers the bird; 3 inspects its wing; 4 the traveler arrives; 5 the bird is returned; 6 it flies away as both adults watch. Show one clear action per panel; preserve character, prop and screen-direction continuity. Leave speech balloons empty for later lettering. No signatures or watermarks. Apply the following techniques within each panel without changing the events, panel count or sequence: Build the specified adult characters with firm outer contours and economical facial lines, preserving complete torso, wrist, and finger structure. Merge garment shadows into large shapes and separate overlaps with a few narrow highlights. Keep faces and hands readable. Make the action already required by the story the single focal event, with detail in the established environment subdued behind it. Use restrained expressions and clear gestures for tension. Add no characters, weapons, or narrative events.
```


## manga-authors/authors/komoto-hajime/manifest.json

{
  "id": "komoto-hajime",
  "name": "Hajime Komoto",
  "name_zh": "甲本一",
  "name_ja": "甲本一",
  "creator_type": "manga-artist",
  "legacy_refs": [],
  "family": "动作与冒险",
  "scope": "聚焦《マッシュル―MASHLE― 18》原版公开封面及署名书目，研究漫画作者绘画；动画团队画面不纳入。以下方案为本库原创应用，连续叙事部分不是据封面证明的作者分镜法。",
  "recent_focus": {
    "work": "マッシュル―MASHLE― 18",
    "year": 2023,
    "source_ids": [
      "S1",
      "S2"
    ],
    "date_basis": "原版《マッシュル―MASHLE― 18》书目发行日为2023-10-04；参考年份是这一卷的出版年，不是每幅原稿的绘制日期，也未声称它是当前最新卷。"
  },
  "reference_works": [
    {
      "title": "マッシュル―MASHLE― 18",
      "role": "漫画著者；本轮原版书目署名为甲本一，未另列原作与作画分工",
      "source_ids": [
        "S1"
      ]
    }
  ],
  "sources": [
    {
      "id": "S1",
      "title": "マッシュル―MASHLE― 18：出版社书目",
      "url": "https://books.shueisha.co.jp/items/contents.html?isbn=978-4-08-883668-3&mode=1",
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
      "title": "マッシュル―MASHLE― 18：公开封面观察",
      "url": "https://www.shonenjump.com/j/comics/_comicimage/mashle018.jpg",
      "publisher": "集英社",
      "accessed_at": "2026-11-01",
      "access_method": "visual_preview",
      "supports": [
        "所示单张封面的构图、轮廓和大色面"
      ],
      "access_note": "已通过view_image实际看此出版社公开封面；仅据可见图面概括，低清处不判断笔刷细节。书名、字体、边框和出版版式不自动归给漫画作者；未观察连续内页。",
      "origin_page_url": "https://books.shueisha.co.jp/items/contents.html?isbn=978-4-08-883668-3&mode=1",
      "observed_asset_sha256": "f850bbe99ad41c2d0575f42302660f72bb4185dec88db5c8cc366382f82efd74"
    }
  ],
  "findings": [
    {
      "text": "原版《マッシュル―MASHLE― 18》书目发行日为2023-10-04；参考年份是这一卷的出版年，不是每幅原稿的绘制日期，也未声称它是当前最新卷。 作者署名为甲本一。",
      "basis": "source_summary",
      "source_ids": [
        "S1"
      ]
    },
    {
      "text": "封面中央拳头向前伸出，面部位于其上，深色衣料形成连片大形，旁侧人物较小；少量冷亮边分开深衣重叠。蓝色建筑与白云位于背景。外圈金色边框和书名字体属于出版封面构成，不能自动归为作者绘画习惯。",
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
    "line": "中重外线明确衣物大轮廓，五官内线简省，拳指用少数折线说明体积。",
    "shapes": "成年躯干保持完整胸廓，手掌可在故事需要时近距放大，但指节和腕部体积连续。",
    "composition": "主动作以一个清楚前景形建立焦点，其余既定人物或物件按距离减小；没有配角的任务不增人。",
    "panel_rhythm": "本库原创迁移：先用平稳中景建立动作预期，再以一格明确动作改变，后接克制反应；封面不证明作者喜剧节奏。",
    "tonal_design": "深衣归并大块，用少量亮边区分重叠，脸手留中亮面，背景深度不靠满铺黑线。",
    "environment": "背景以大块建筑与天光建立尺度，细节避开主动作轮廓，不复制特定魔法学校。",
    "acting": "简省五官可维持平稳表情，主要情绪转折通过肩线与手部力度表现，服从既定人物态度。",
    "color": "本库建议深蓝黑衣面与冷亮边对照，暖色作小焦点；色板按项目已有衣色调整。"
  },
  "sheet_traits_zh": "成年胸廓与腕指完整，中重外线组织服装大形，简省面部内线；既定深色区连成块，窄亮边分重叠，中性站姿不放大拳头。",
  "prompt_core_zh": "以中重外线和简省五官塑造既定成年角色，胸廓腕指连接完整。把服装暗部归并为大形，仅以少量窄亮边分开重叠，脸手保持可读；既定动作是唯一焦点，既定环境结构降低细节。用克制表情与清楚手势形成张力，不增加人物、武器或事件。",
  "prompt_core_en": "Build the specified adult characters with firm outer contours and economical facial lines, preserving complete torso, wrist, and finger structure. Merge garment shadows into large shapes and separate overlaps with a few narrow highlights. Keep faces and hands readable. Make the action already required by the story the single focal event, with detail in the established environment subdued behind it. Use restrained expressions and clear gestures for tension. Add no characters, weapons, or narrative events.",
  "best_for": [
    "大黑块动作插画",
    "克制表情与明确动作的对比"
  ],
  "review_checks": [
    "深衣块是否仍能区分手臂与胸廓？",
    "前伸手掌的关节与腕部是否连续？",
    "简省表情是否仍符合既定情绪？"
  ],
  "avoid": [
    "把大黑衣画成没有人体结构的平面袋子。",
    "固定复制拳头朝镜头动作，改变用户原故事。"
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
    "先画三种项目构图，选择能清楚承载既定动作的一种：主动作以一个清楚前景形建立焦点，其余既定人物或物件按距离减小；没有配角的任务不增人。",
    "在既定成年角色与服装下搭体块：成年躯干保持完整胸廓，手掌可在故事需要时近距放大，但指节和腕部体积连续。 再落实：中重外线明确衣物大轮廓，五官内线简省，拳指用少数折线说明体积。",
    "以缩略灰阶校对材料：深衣归并大块，用少量亮边区分重叠，脸手留中亮面，背景深度不靠满铺黑线。 环境处理：背景以大块建筑与天光建立尺度，细节避开主动作轮廓，不复制特定魔法学校。",
    "最后核对表演：简省五官可维持平稳表情，主要情绪转折通过肩线与手部力度表现，服从既定人物态度。 颜色仅在项目未锁定处尝试：本库建议深蓝黑衣面与冷亮边对照，暖色作小焦点；色板按项目已有衣色调整。"
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
