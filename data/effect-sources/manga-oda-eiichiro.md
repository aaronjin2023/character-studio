# 尾田荣一郎 · 本地研究卡快照

来源：human-distillation-lab 工作目录（不假定已提交）。
仅供查阅；出图采用项目内独立转写的线条和明暗方法。

## manga-authors/authors/oda-eiichiro/SKILL.md

---
name: manga-oda-eiichiro
description: "尾田荣一郎公开漫画／插画研究与原创绘图参谋；适用于夸张表情与错层重心、暖色冒险插画；按具体视觉技法编写方案。"
---

# 尾田荣一郎（Eiichiro Oda） · 漫画／插画创作研究卡

本轮重点为《ONE PIECE 第105卷》的公开封面／主视觉及对应书目；旧作品研究另留在 archive 初稿，不能把不同时期合成固定画风。下列绘画方案为本库原创转译，封面观察不证明连续内页的分镜规律。

选材类型：当代漫画家。本轮重点：ONE PIECE 第105卷；参考年份：2023。所选日文原版卷首次出版年份；封面原稿具体作画日未核定。〔RECENT1, RECENT2〕

方向：动作与冒险。本卡研究公开作品与方法；绘图配方是本库原创转译，未训练模型、未做出图效果验证。

[100人目录](../../CATALOG.md) · [八维绘画方案](drawing.md) · [绘图提示词](prompts.md) · [结构化记录](manifest.json) · [完整创作流程](../../WORKFLOW.md)

## 适用任务

- 夸张表情与错层重心
- 暖色冒险插画

先读取下列研究依据，再从drawing.md选2–3项具体技法，结合项目自己的角色和世界设定，编写原创画面方案。生成时采用prompts.md的通用技法表达，不直接用作者姓名作为画风口令，不假称本人绘制或背书。用户按作者选择风格时，明确作品阶段，把视觉目标拆成可操作的特征；保留项目已有角色设定，不承诺未经实际出图验证的复现精度。

## 本轮公开依据

- 所选日文原版卷首次出版年份；封面原稿具体作画日未核定；署名分工：漫画作者〔source_summary；RECENT1〕
- 多个人物的大小头像上下错层，张口、露齿、抬手使轮廓明显；上方较沉静的半身与下方夸张动态相对，暖橙底、蓝色局部和高亮白发分离。观察为240px封面，不判断小格节奏。〔visual_observation；RECENT2〕

绘画／叙事方法或限定画面观察的依据：RECENT2。下述原创配方不代表这些来源逐项规定了所有参数。

## 选材与分工

- ONE PIECE 第105卷：漫画作者〔RECENT1, RECENT2〕

## 基本资料

出生年：未知／本轮未核定；逝世年：未知／本轮未核定。

活动／出版语境（非国籍）：本轮核定为日本漫画出版或展览语境；不据此推定民族。民族：未知，不根据姓名或出版地区推断。生卒未逐人全面核查，保留null；公开署名为笔名时不当作法定姓名。 〔S1〕

- [原专业条目](../../../cartoonists/oda-eiichiro/SKILL.md) · [已有基本资料](../../../cartoonists/oda-eiichiro/biography.md)

## 缺口

- 本轮新阶段视觉观察限所列单图；未逐章核内页节奏、助手分工和长期画风变化。
- 原版出版或项目发布年份不等于每一笔原稿的绘制日期；具体日期边界见recent_focus。
- 本库8维方案、步骤和提示词属于原创转译，尚未用真实生成图验证一致性。

## 来源

- **S1** [作品概要｜ONE PIECE.com](https://one-piece.com/about/) — ONE PIECE 官方网站；2026-11-01；`search_excerpt`。早期研究对照：实际检索获得出版社/机构摘要；未据摘要声称阅读漫画内页。 支持：官网作品信息确认尾田栄一郎为漫画作者，说明1997年《周刊少年Jump》连载与漫画、动画及真人版的不同形态。。
- **SP1** [VIZ One Piece, Vol. 1 官方商品页与封面](https://www.viz.com/manga-books/manga/one-piece-volume-1-0/product/139) — VIZ Media；2026-11-01；`visual_preview`。早期研究对照：核读商品页并在浏览器实际查看300×450封面 https://dw9to29mmj727.cloudfront.net/products/1569319014.jpg 。观察限定此英文版封面；未观察内页或动画。 支持：第1卷Story and Art署名、封面群像与空间层次。
- **RECENT1** [ONE PIECE 第105卷：官方书目／项目页](https://one-piece.com/comics/62160/index.html) — 集英社／ONE PIECE.com；2026-11-01；`page_text`。本轮核对公开书目／项目文字；时间含义见date_basis，不表示通读作品。 支持：所选作品署名与版本范围；所选日文原版卷首次出版年份；封面原稿具体作画日未核定。
- **RECENT2** [ONE PIECE 第105卷：已观察的公开图像](https://dosbg3xlm0x1t.cloudfront.net/images/items/9784088834368/240/9784088834368.jpg) — 集英社／ONE PIECE.com；2026-11-01；`visual_preview`。实际通过图像工具查看此公开封面／主视觉，未观察整卷内页；周围排版、字体与出版设计不自动归作者。 支持：限定单幅公开图像的形体、线条、色块与构图观察。


## manga-authors/authors/oda-eiichiro/drawing.md

# 尾田荣一郎（Eiichiro Oda） · 八维绘画方案

以下全部是**本库原创创作转译**，不是作者原话或其全部作品的统一规则。对应公开事实与访问范围见[研究卡](SKILL.md)。先确定所选作品阶段，彩色建议不自动视为作者固定色板。

## 线条

明确外轮廓与夸张表情线优先，细碎装备线集中局部。

## 形体与人物

成年人物体型可差异大，手掌与脸部夸张但结构自洽。

## 构图

上下错层的重心与大小变化安排两人和机械鸟，避免平均并排。

## 分镜节奏

原创分镜建议：先交代空间，再给道具与手部动作，接人物反应，最后显示动作结果；不是由单幅封面推得的作者分镜规律。

## 黑白与网点

发块与衣块拉开暗面，动作焦点留亮，背景不满版等密。

## 环境

原创港口物件给出人物尺度，装饰环绕而不遮主动作。

## 表情动作

张口、露齿或抬手可用一项，眼睛仍指向交接行为。

## 彩色方案

本库原创色彩转译：暖橙底与少量蓝白亮块，明确区分相邻角色。；只借所见单图的配色关系，不称固定作者色板。

## 落地步骤

1. 先以本项目故事画三张小构图，应用：上下错层的重心与大小变化安排两人和机械鸟，避免平均并排。
2. 确认成年人物和原创衣物的结构：成年人物体型可差异大，手掌与脸部夸张但结构自洽。 再核对手与道具接触。
3. 按材质分层落线：明确外轮廓与夸张表情线优先，细碎装备线集中局部。 环境处理：原创港口物件给出人物尺度，装饰环绕而不遮主动作。
4. 最后以灰阶缩图核对：发块与衣块拉开暗面，动作焦点留亮，背景不满版等密。 彩色版再应用：本库原创色彩转译：暖橙底与少量蓝白亮块，明确区分相邻角色。；只借所见单图的配色关系，不称固定作者色板。

## 图像检查

- 缩至缩略图时，主动作和手中物是否仍先于装饰可见？
- 人物结构与所选处理是否兼容：成年人物体型可差异大，手掌与脸部夸张但结构自洽。
- 灰阶检查能否区分脸、手、衣物与背景：发块与衣块拉开暗面，动作焦点留亮，背景不满版等密。
- 用于连续页时，是否保持原故事人数、动作顺序、服装与道具方向？

## 容易失败的做法

- 把这张封面的观察当成整部作品、所有时期或全部分镜的定律。
- 把原封面人物、专属服饰、标志和签名带入原创角色；或把书封排版视为作者本人绘画。


## manga-authors/authors/oda-eiichiro/prompts.md

# 尾田荣一郎（Eiichiro Oda） · 原创绘图提示词

这些是可编辑的起稿模板，未实际出图。比较时统一使用“雨后浮岛港口归还机械鸟”的原创题材。角色设定页只转用形体、线条和黑白处理，不沿用场景镜头；英文版的角色技法段保留中文规格以免未经审核的翻译改变约束。

不要将本页标题或作者姓名一并粘贴到图像生成提示词。需要其他题材时替换角色、场景、行动和情绪，保留所选择的通用技法；既定发色、发长、肤色、衣色与体型优先，冲突技法或色板必须删改；最后执行[连贯性与输出检查](../../WORKFLOW.md)。

## 单幅叙事插画

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 单幅叙事插画。将表情和姿势概括为大而清楚的轮廓，脸部与手势分区；用上下错层而非整齐并排表现关系，暖橙背景上保留少量蓝与白的高亮，繁密细节围绕主动作。 不画原作品角色、标志或签名；文字如需出现，保留位置后期排版。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. One narrative illustration. Simplify expressions and poses into large readable shapes. Separate faces from hand gestures, stagger visual weight vertically, and reserve small blue and white highlights against warm orange while keeping detail subordinate to the main action. No existing franchise designs, logos or signatures. Reserve any text for later lettering.
```

## 角色三视图

### 中文

```text
角色设定页：同一名成年修理工的正面、右侧面、背面三个完整视图；短发、短外套、工具腰带、工作靴，三视图衣物结构及比例一致。中性站姿、平视、无透视夸张、纯净背景，三个完整身体不重叠。 以下技法服从上述成年角色、服装和站姿约束；只转用造型与画面处理，忽略示例动作和场景：成年身体可适当夸张胸肩与手掌，但关节结构一致；表情轮廓明确，衣褶用少数大弧线，颜色分区清楚。
```

### English / bilingual specification

```text
Character design sheet: front, right-side and rear full-body views of the same adult repair technician, with short hair, a short work jacket, tool belt and work boots. Keep anatomy, garment construction and proportions consistent. Use neutral standing poses, eye-level orthographic views, a plain background and no overlapping figures. Apply the following bilingual line, shape and tone specification subject to the adult character, clothing and neutral pose above; omit any example actions and scene directions: 成年身体可适当夸张胸肩与手掌，但关节结构一致；表情轮廓明确，衣褶用少数大弧线，颜色分区清楚。
```

## 六格漫画页

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 六格漫画页，按日式从右到左、从上到下阅读。格1港口建立空间；格2修理工发现机械鸟；格3检查鸟翅；格4旅人赶来；格5修理工交还鸟；格6鸟起飞，两人目送。每格明确一个动作，角色、工具及场景方向连续。预留空白对话框，文字后期排版；不要生成签名或水印。 将以下技法用于各格，不改变上述事件、格数或顺序：将表情和姿势概括为大而清楚的轮廓，脸部与手势分区；用上下错层而非整齐并排表现关系，暖橙背景上保留少量蓝与白的高亮，繁密细节围绕主动作。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. A six-panel manga page, read from right to left and top to bottom. Panel 1 establishes the harbor; 2 the technician discovers the bird; 3 inspects its wing; 4 the traveler arrives; 5 the bird is returned; 6 it flies away as both adults watch. Show one clear action per panel; preserve character, prop and screen-direction continuity. Leave speech balloons empty for later lettering. No signatures or watermarks. Apply the following techniques within each panel without changing the events, panel count or sequence: Simplify expressions and poses into large readable shapes. Separate faces from hand gestures, stagger visual weight vertically, and reserve small blue and white highlights against warm orange while keeping detail subordinate to the main action.
```


## manga-authors/authors/oda-eiichiro/manifest.json

{
  "id": "oda-eiichiro",
  "name": "Eiichiro Oda",
  "name_zh": "尾田荣一郎",
  "legacy_refs": [
    "cartoonists/oda-eiichiro"
  ],
  "name_ja": "尾田栄一郎",
  "family": "动作与冒险",
  "scope": "本轮重点为《ONE PIECE 第105卷》的公开封面／主视觉及对应书目；旧作品研究另留在 archive 初稿，不能把不同时期合成固定画风。下列绘画方案为本库原创转译，封面观察不证明连续内页的分镜规律。",
  "reference_works": [
    {
      "title": "ONE PIECE 第105卷",
      "role": "漫画作者",
      "source_ids": [
        "RECENT1",
        "RECENT2"
      ]
    }
  ],
  "sources": [
    {
      "id": "S1",
      "title": "作品概要｜ONE PIECE.com",
      "url": "https://one-piece.com/about/",
      "publisher": "ONE PIECE 官方网站",
      "accessed_at": "2026-11-01",
      "access_method": "search_excerpt",
      "supports": [
        "官网作品信息确认尾田栄一郎为漫画作者，说明1997年《周刊少年Jump》连载与漫画、动画及真人版的不同形态。"
      ],
      "access_note": "早期研究对照：实际检索获得出版社/机构摘要；未据摘要声称阅读漫画内页。",
      "context": "historical_reference"
    },
    {
      "id": "SP1",
      "title": "VIZ One Piece, Vol. 1 官方商品页与封面",
      "url": "https://www.viz.com/manga-books/manga/one-piece-volume-1-0/product/139",
      "publisher": "VIZ Media",
      "accessed_at": "2026-11-01",
      "access_method": "visual_preview",
      "supports": [
        "第1卷Story and Art署名、封面群像与空间层次"
      ],
      "access_note": "早期研究对照：核读商品页并在浏览器实际查看300×450封面 https://dw9to29mmj727.cloudfront.net/products/1569319014.jpg 。观察限定此英文版封面；未观察内页或动画。",
      "context": "historical_reference"
    },
    {
      "id": "RECENT1",
      "title": "ONE PIECE 第105卷：官方书目／项目页",
      "url": "https://one-piece.com/comics/62160/index.html",
      "publisher": "集英社／ONE PIECE.com",
      "accessed_at": "2026-11-01",
      "access_method": "page_text",
      "supports": [
        "所选作品署名与版本范围",
        "所选日文原版卷首次出版年份；封面原稿具体作画日未核定"
      ],
      "access_note": "本轮核对公开书目／项目文字；时间含义见date_basis，不表示通读作品。"
    },
    {
      "id": "RECENT2",
      "title": "ONE PIECE 第105卷：已观察的公开图像",
      "url": "https://dosbg3xlm0x1t.cloudfront.net/images/items/9784088834368/240/9784088834368.jpg",
      "publisher": "集英社／ONE PIECE.com",
      "accessed_at": "2026-11-01",
      "access_method": "visual_preview",
      "supports": [
        "限定单幅公开图像的形体、线条、色块与构图观察"
      ],
      "access_note": "实际通过图像工具查看此公开封面／主视觉，未观察整卷内页；周围排版、字体与出版设计不自动归作者。",
      "origin_page_url": "https://one-piece.com/comics/62160/index.html",
      "observed_asset_sha256": "e3ed5520fd282ddf9c36a9a9340df8b51906c6466f5ad8f9a393f7df99e2fef0"
    }
  ],
  "findings": [
    {
      "text": "所选日文原版卷首次出版年份；封面原稿具体作画日未核定；署名分工：漫画作者",
      "basis": "source_summary",
      "source_ids": [
        "RECENT1"
      ]
    },
    {
      "text": "多个人物的大小头像上下错层，张口、露齿、抬手使轮廓明显；上方较沉静的半身与下方夸张动态相对，暖橙底、蓝色局部和高亮白发分离。观察为240px封面，不判断小格节奏。",
      "basis": "visual_observation",
      "source_ids": [
        "RECENT2"
      ]
    }
  ],
  "visual_recipe": {
    "line": "明确外轮廓与夸张表情线优先，细碎装备线集中局部。",
    "shapes": "成年人物体型可差异大，手掌与脸部夸张但结构自洽。",
    "composition": "上下错层的重心与大小变化安排两人和机械鸟，避免平均并排。",
    "panel_rhythm": "原创分镜建议：先交代空间，再给道具与手部动作，接人物反应，最后显示动作结果；不是由单幅封面推得的作者分镜规律。",
    "tonal_design": "发块与衣块拉开暗面，动作焦点留亮，背景不满版等密。",
    "environment": "原创港口物件给出人物尺度，装饰环绕而不遮主动作。",
    "acting": "张口、露齿或抬手可用一项，眼睛仍指向交接行为。",
    "color": "本库原创色彩转译：暖橙底与少量蓝白亮块，明确区分相邻角色。；只借所见单图的配色关系，不称固定作者色板。"
  },
  "drawing_steps": [
    "先以本项目故事画三张小构图，应用：上下错层的重心与大小变化安排两人和机械鸟，避免平均并排。",
    "确认成年人物和原创衣物的结构：成年人物体型可差异大，手掌与脸部夸张但结构自洽。 再核对手与道具接触。",
    "按材质分层落线：明确外轮廓与夸张表情线优先，细碎装备线集中局部。 环境处理：原创港口物件给出人物尺度，装饰环绕而不遮主动作。",
    "最后以灰阶缩图核对：发块与衣块拉开暗面，动作焦点留亮，背景不满版等密。 彩色版再应用：本库原创色彩转译：暖橙底与少量蓝白亮块，明确区分相邻角色。；只借所见单图的配色关系，不称固定作者色板。"
  ],
  "review_checks": [
    "缩至缩略图时，主动作和手中物是否仍先于装饰可见？",
    "人物结构与所选处理是否兼容：成年人物体型可差异大，手掌与脸部夸张但结构自洽。",
    "灰阶检查能否区分脸、手、衣物与背景：发块与衣块拉开暗面，动作焦点留亮，背景不满版等密。",
    "用于连续页时，是否保持原故事人数、动作顺序、服装与道具方向？"
  ],
  "avoid": [
    "把这张封面的观察当成整部作品、所有时期或全部分镜的定律。",
    "把原封面人物、专属服饰、标志和签名带入原创角色；或把书封排版视为作者本人绘画。"
  ],
  "best_for": [
    "夸张表情与错层重心",
    "暖色冒险插画"
  ],
  "prompt_core_zh": "将表情和姿势概括为大而清楚的轮廓，脸部与手势分区；用上下错层而非整齐并排表现关系，暖橙背景上保留少量蓝与白的高亮，繁密细节围绕主动作。",
  "prompt_core_en": "Simplify expressions and poses into large readable shapes. Separate faces from hand gestures, stagger visual weight vertically, and reserve small blue and white highlights against warm orange while keeping detail subordinate to the main action.",
  "biography": {
    "birth_year": null,
    "death_year": null,
    "region_context": "本轮核定为日本漫画出版或展览语境；不据此推定民族。",
    "source_ids": [
      "S1"
    ],
    "note": "生卒未逐人全面核查，保留null；公开署名为笔名时不当作法定姓名。",
    "ethnicity": {
      "value": null,
      "status": "unknown"
    }
  },
  "method_evidence_source_ids": [
    "RECENT2"
  ],
  "known_gaps": [
    "本轮新阶段视觉观察限所列单图；未逐章核内页节奏、助手分工和长期画风变化。",
    "原版出版或项目发布年份不等于每一笔原稿的绘制日期；具体日期边界见recent_focus。",
    "本库8维方案、步骤和提示词属于原创转译，尚未用真实生成图验证一致性。"
  ],
  "schema_version": 1,
  "kind": "manga-author-study",
  "entity_kind": "person",
  "status": "source-grounded-draft",
  "research_date": "2026-11-01",
  "generation_mode": "original-general-techniques",
  "image_validation": "not-run",
  "recipe_basis": "original_synthesis",
  "sheet_traits_zh": "成年身体可适当夸张胸肩与手掌，但关节结构一致；表情轮廓明确，衣褶用少数大弧线，颜色分区清楚。",
  "focus": "动作与冒险/群像",
  "historical_scope": "《ONE PIECE》原作漫画第1卷及官网漫画作品概要；排除动画、真人剧和衍生作者作画 补充核读范围：航海王（One Piece）VIZ英文第1卷封面，ISBN 9781569319017。",
  "recent_focus": {
    "work": "ONE PIECE 第105卷",
    "year": 2023,
    "source_ids": [
      "RECENT1",
      "RECENT2"
    ],
    "date_basis": "所选日文原版卷首次出版年份；封面原稿具体作画日未核定"
  },
  "creator_type": "manga-artist"
}
