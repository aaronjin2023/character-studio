# 黒星紅白 · 本地研究卡快照

来源：human-distillation-lab 工作目录（不假定已提交）。
仅供查阅；出图采用项目内独立转写的线条和明暗方法。

## manga-authors/authors/kuroboshi-kohaku/SKILL.md

---
name: manga-kuroboshi-kohaku
description: "黒星紅白公开漫画／插画研究与原创绘图参谋；适用于成年原创角色造型与材质练习、同一角色三视图的线条和色块控制、既定故事的彩色插画／连续页转译；按具体视觉技法编写方案。"
---

# 黒星紅白（Kohaku Kuroboshi） · 漫画／插画创作研究卡

本轮主要视觉研究限定于キノの旅XXIV the Beautiful World（2025）封面；仅核公开封面／宣传图及明示样图。其余履历来源只证明职业与署名，不借动画成片代替个人画作。八维配方、步骤、评审与提示词均为本库原创技法转译，不是本人逐笔规则。

选材类型：日系插画／同人画师。本轮重点：キノの旅XXIV the Beautiful World（2025）封面；参考年份：2025。对应出版社记录的书籍／宣传发布日期；不将作品集出版年当成全部收录画作的创作年，也不声称是2026最新画风。〔S1, S3〕

方向：简洁角色与层叠材质。本卡研究公开作品与方法；绘图配方是本库原创转译，未训练模型、未做出图效果验证。

[100人目录](../../CATALOG.md) · [八维绘画方案](drawing.md) · [绘图提示词](prompts.md) · [结构化记录](manifest.json) · [完整创作流程](../../WORKFLOW.md)

## 适用任务

- 成年原创角色造型与材质练习
- 同一角色三视图的线条和色块控制
- 既定故事的彩色插画／连续页转译

先读取下列研究依据，再从drawing.md选2–3项具体技法，结合项目自己的角色和世界设定，编写原创画面方案。生成时采用prompts.md的通用技法表达，不直接用作者姓名作为画风口令，不假称本人绘制或背书。用户按作者选择风格时，明确作品阶段，把视觉目标拆成可操作的特征；保留项目已有角色设定，不承诺未经实际出图验证的复现精度。

## 本轮公开依据

- 2025小说插画明确署名；2021画集收录约五年半商稿〔source_summary；S1〕
- 封面人物侧身回头，短发深色成块，外套轮廓圆而简洁；许多灰白和深灰小型仙人掌形体沿身体堆叠，细窄橙色圆弧和右侧小太阳标记与大白底对照。仅此插画可证该设计组合。〔visual_observation；S3〕

绘画／叙事方法或限定画面观察的依据：S3。下述原创配方不代表这些来源逐项规定了所有参数。

## 选材与分工

- キノの旅XXIV the Beautiful World（2025）封面：插画／角色视觉创作；书籍文字、编辑、装帧与动画协作另有署名，不并入个人作画〔S1, S3〕

## 基本资料

出生年：未知／本轮未核定；逝世年：未知／本轮未核定。

活动／出版语境（非国籍）：已核日本商业出版／项目或展览语境；本轮未核国籍、民族或居住地，不据姓名推断。民族：未知，不根据姓名或出版地区推断。仅记录公开创作者署名与已核出版／活动地区，未知生日和生卒为null；不据姓名、国籍推民族。 〔S1〕

本次新增研究对象；未复制成其他专家分类条目。

## 缺口

- 只核本条明示公开图像，没有通读完整画集或逐年比较全部时期；未承诺精确复刻。
- 作者原始上色与出版物装帧、文字、印刷呈色未逐项拆分，因此背景排版和标题字体不视为个人固定风格。
- 原创技法转译未通过真实生成样张验收；三视图只用sheet_traits_zh的静态特征，不能照搬封面透视。

## 来源

- **S1** [キノの旅XXIV the Beautiful World](https://www.kadokawa.co.jp/product/322504000327/) — KADOKAWA；2026-11-01；`search_excerpt`。实际web检索或打开所列官方／出版社供稿页面；本轮候选阶段不声称已看作品图像或读画集内页。 支持：2025小说插画明确署名；2021画集收录约五年半商稿；2025年9月10日新卷明确“著者：时雨泽惠一／イラスト：黒星紅白”，可证明近期插画持续发表。。
- **S2** [黒星紅白画集 blanc](https://dengekibunko.jp/product/kino/322004000080.html) — 电击文库／KADOKAWA；2026-11-01；`search_excerpt`。实际检索或打开的补充公开页面；未观察作品图像。 支持：2021年1月9日画集收录五年半期间轻小说、FGO、动画商业图与作者解说。。
- **S3** [キノの旅XXIV the Beautiful World（2025）封面：官方封面／宣传图](https://cdn.kdkw.jp/cover_1000/322504/322504000327.webp) — KADOKAWA；2026-11-01；`visual_preview`。从已核定官方页面 https://www.kadokawa.co.jp/product/322504000327/ 的HTML提取实际图像URL，临时保存至/tmp并通过view_image查看。只核这张图；没有下载图片入库，没有将页面alt当视觉观察。 支持：封面人物侧身回头，短发深色成块，外套轮廓圆而简洁；许多灰白和深灰小型仙人掌形体沿身体堆叠，细窄橙色圆弧和右侧小太阳标记与大白底对照。仅此插画可证该设计组合。。


## manga-authors/authors/kuroboshi-kohaku/drawing.md

# 黒星紅白（Kohaku Kuroboshi） · 八维绘画方案

以下全部是**本库原创创作转译**，不是作者原话或其全部作品的统一规则。对应公开事实与访问范围见[研究卡](SKILL.md)。先确定所选作品阶段，彩色建议不自动视为作者固定色板。

## 线条

人物外线简洁偏圆，服装接缝少，附属形体用细边线分组

## 形体与人物

成人比例略紧凑但肩胸成熟，服装体量与身体分开

## 构图

既有主体以清晰大轮廓为主，小型细节沿一条带状区域组织

## 分镜节奏

本库原创建议：清楚剪影、局部材质、表情停顿、回到全貌

## 黑白与网点

头发深黑、衣物灰阶、皮肤白，附属细节只用两档值

## 环境

背景留白充分，空间说明仅需少量边界而非满铺细节

## 表情动作

眼睛细小偏稳，轻微头部角度表达关注而非夸张口型

## 彩色方案

本库建议青灰与米白为主体，极少量橙色线作节奏，不归为固定色板

## 落地步骤

1. 先按既定人物与道具搭静态体块：成人比例略紧凑但肩胸成熟，服装体量与身体分开；检查同一人物辨识点。
2. 用三阶缩略图确定主次：既有主体以清晰大轮廓为主，小型细节沿一条带状区域组织，再落实头发深黑、衣物灰阶、皮肤白，附属细节只用两档值。
3. 按材质分层描线：人物外线简洁偏圆，服装接缝少，附属形体用细边线分组；检查背景留白充分，空间说明仅需少量边界而非满铺细节。
4. 最后校对表演与色域：眼睛细小偏稳，轻微头部角度表达关注而非夸张口型；按“本库建议青灰与米白为主体，极少量橙色线作节奏，不归为固定色板”做原创小色稿，连续页采用独立节奏建议。

## 图像检查

- 紧凑成人体型是否仍有成熟肩胸，未幼态化？
- 附属细节是否归入成组灰阶，没有打碎大轮廓？
- 去掉细小橙色点缀后主体是否仍可辨？

## 容易失败的做法

- 紧凑头身变成儿童身体，与成年人要求冲突。
- 附属小形体逐个强化对比，破坏整体服装剪影。


## manga-authors/authors/kuroboshi-kohaku/prompts.md

# 黒星紅白（Kohaku Kuroboshi） · 原创绘图提示词

这些是可编辑的起稿模板，未实际出图。比较时统一使用“雨后浮岛港口归还机械鸟”的原创题材。角色设定页只转用形体、线条和黑白处理，不沿用场景镜头；英文版的角色技法段保留中文规格以免未经审核的翻译改变约束。

不要将本页标题或作者姓名一并粘贴到图像生成提示词。需要其他题材时替换角色、场景、行动和情绪，保留所选择的通用技法；既定发色、发长、肤色、衣色与体型优先，冲突技法或色板必须删改；最后执行[连贯性与输出检查](../../WORKFLOW.md)。

## 单幅叙事插画

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 单幅叙事插画。原创视觉技法：人物外线简洁偏圆，服装接缝少，附属形体用细边线分组；成人比例略紧凑但肩胸成熟，服装体量与身体分开；头发深黑、衣物灰阶、皮肤白，附属细节只用两档值。保留既定人物、场景和剧情，只迁移技法。 不画原作品角色、标志或签名；文字如需出现，保留位置后期排版。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. One narrative illustration. Build a clear rounded silhouette with compact but mature adult anatomy. Simplify clothing seams and group small accessory shapes into a narrow organized band. Separate dark hair, middle value fabric, and pale skin. Leave generous negative space around the supplied subject. Limit accent color to a few fine warm marks against cooler neutrals. Keep expression restrained and preserve the existing character count, identity, setting, and action sequence. No existing franchise designs, logos or signatures. Reserve any text for later lettering.
```

## 角色三视图

### 中文

```text
角色设定页：同一名成年修理工的正面、右侧面、背面三个完整视图；短发、短外套、工具腰带、工作靴，三视图衣物结构及比例一致。中性站姿、平视、无透视夸张、纯净背景，三个完整身体不重叠。 以下技法服从上述成年角色、服装和站姿约束；只转用造型与画面处理，忽略示例动作和场景：简洁偏圆外线塑造紧凑成人体块，肩胸成熟；衣物接缝减量，发块按既定明度归并，布面与皮肤以不同灰阶区分，附属细节分组。
```

### English / bilingual specification

```text
Character design sheet: front, right-side and rear full-body views of the same adult repair technician, with short hair, a short work jacket, tool belt and work boots. Keep anatomy, garment construction and proportions consistent. Use neutral standing poses, eye-level orthographic views, a plain background and no overlapping figures. Apply the following bilingual line, shape and tone specification subject to the adult character, clothing and neutral pose above; omit any example actions and scene directions: 简洁偏圆外线塑造紧凑成人体块，肩胸成熟；衣物接缝减量，发块按既定明度归并，布面与皮肤以不同灰阶区分，附属细节分组。
```

## 六格漫画页

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 六格漫画页，按日式从右到左、从上到下阅读。格1港口建立空间；格2修理工发现机械鸟；格3检查鸟翅；格4旅人赶来；格5修理工交还鸟；格6鸟起飞，两人目送。每格明确一个动作，角色、工具及场景方向连续。预留空白对话框，文字后期排版；不要生成签名或水印。 将以下技法用于各格，不改变上述事件、格数或顺序：原创视觉技法：人物外线简洁偏圆，服装接缝少，附属形体用细边线分组；成人比例略紧凑但肩胸成熟，服装体量与身体分开；头发深黑、衣物灰阶、皮肤白，附属细节只用两档值。保留既定人物、场景和剧情，只迁移技法。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. A six-panel manga page, read from right to left and top to bottom. Panel 1 establishes the harbor; 2 the technician discovers the bird; 3 inspects its wing; 4 the traveler arrives; 5 the bird is returned; 6 it flies away as both adults watch. Show one clear action per panel; preserve character, prop and screen-direction continuity. Leave speech balloons empty for later lettering. No signatures or watermarks. Apply the following techniques within each panel without changing the events, panel count or sequence: Build a clear rounded silhouette with compact but mature adult anatomy. Simplify clothing seams and group small accessory shapes into a narrow organized band. Separate dark hair, middle value fabric, and pale skin. Leave generous negative space around the supplied subject. Limit accent color to a few fine warm marks against cooler neutrals. Keep expression restrained and preserve the existing character count, identity, setting, and action sequence.
```


## manga-authors/authors/kuroboshi-kohaku/manifest.json

{
  "id": "kuroboshi-kohaku",
  "name": "Kohaku Kuroboshi",
  "name_zh": "黒星紅白",
  "name_ja": "黒星紅白",
  "legacy_refs": [],
  "creator_type": "illustrator",
  "family": "简洁角色与层叠材质",
  "scope": "本轮主要视觉研究限定于キノの旅XXIV the Beautiful World（2025）封面；仅核公开封面／宣传图及明示样图。其余履历来源只证明职业与署名，不借动画成片代替个人画作。八维配方、步骤、评审与提示词均为本库原创技法转译，不是本人逐笔规则。",
  "reference_works": [
    {
      "title": "キノの旅XXIV the Beautiful World（2025）封面",
      "role": "插画／角色视觉创作；书籍文字、编辑、装帧与动画协作另有署名，不并入个人作画",
      "source_ids": [
        "S1",
        "S3"
      ]
    }
  ],
  "sources": [
    {
      "id": "S1",
      "title": "キノの旅XXIV the Beautiful World",
      "url": "https://www.kadokawa.co.jp/product/322504000327/",
      "publisher": "KADOKAWA",
      "accessed_at": "2026-11-01",
      "access_method": "search_excerpt",
      "supports": [
        "2025小说插画明确署名；2021画集收录约五年半商稿",
        "2025年9月10日新卷明确“著者：时雨泽惠一／イラスト：黒星紅白”，可证明近期插画持续发表。"
      ],
      "access_note": "实际web检索或打开所列官方／出版社供稿页面；本轮候选阶段不声称已看作品图像或读画集内页。"
    },
    {
      "id": "S2",
      "title": "黒星紅白画集 blanc",
      "url": "https://dengekibunko.jp/product/kino/322004000080.html",
      "publisher": "电击文库／KADOKAWA",
      "accessed_at": "2026-11-01",
      "access_method": "search_excerpt",
      "supports": [
        "2021年1月9日画集收录五年半期间轻小说、FGO、动画商业图与作者解说。"
      ],
      "access_note": "实际检索或打开的补充公开页面；未观察作品图像。"
    },
    {
      "id": "S3",
      "title": "キノの旅XXIV the Beautiful World（2025）封面：官方封面／宣传图",
      "url": "https://cdn.kdkw.jp/cover_1000/322504/322504000327.webp",
      "publisher": "KADOKAWA",
      "accessed_at": "2026-11-01",
      "access_method": "visual_preview",
      "supports": [
        "封面人物侧身回头，短发深色成块，外套轮廓圆而简洁；许多灰白和深灰小型仙人掌形体沿身体堆叠，细窄橙色圆弧和右侧小太阳标记与大白底对照。仅此插画可证该设计组合。"
      ],
      "access_note": "从已核定官方页面 https://www.kadokawa.co.jp/product/322504000327/ 的HTML提取实际图像URL，临时保存至/tmp并通过view_image查看。只核这张图；没有下载图片入库，没有将页面alt当视觉观察。",
      "origin_page_url": "https://www.kadokawa.co.jp/product/322504000327/",
      "observed_asset_sha256": "a7571cf11c08082945a2c14d631e16991d7631769c9a6a23fc2988f07431f01d"
    }
  ],
  "findings": [
    {
      "text": "2025小说插画明确署名；2021画集收录约五年半商稿",
      "basis": "source_summary",
      "source_ids": [
        "S1"
      ]
    },
    {
      "text": "封面人物侧身回头，短发深色成块，外套轮廓圆而简洁；许多灰白和深灰小型仙人掌形体沿身体堆叠，细窄橙色圆弧和右侧小太阳标记与大白底对照。仅此插画可证该设计组合。",
      "basis": "visual_observation",
      "source_ids": [
        "S3"
      ]
    }
  ],
  "method_evidence_source_ids": [
    "S3"
  ],
  "recent_focus": {
    "work": "キノの旅XXIV the Beautiful World（2025）封面",
    "year": 2025,
    "source_ids": [
      "S1",
      "S3"
    ],
    "date_basis": "对应出版社记录的书籍／宣传发布日期；不将作品集出版年当成全部收录画作的创作年，也不声称是2026最新画风。"
  },
  "visual_recipe": {
    "line": "人物外线简洁偏圆，服装接缝少，附属形体用细边线分组",
    "shapes": "成人比例略紧凑但肩胸成熟，服装体量与身体分开",
    "composition": "既有主体以清晰大轮廓为主，小型细节沿一条带状区域组织",
    "panel_rhythm": "本库原创建议：清楚剪影、局部材质、表情停顿、回到全貌",
    "tonal_design": "头发深黑、衣物灰阶、皮肤白，附属细节只用两档值",
    "environment": "背景留白充分，空间说明仅需少量边界而非满铺细节",
    "acting": "眼睛细小偏稳，轻微头部角度表达关注而非夸张口型",
    "color": "本库建议青灰与米白为主体，极少量橙色线作节奏，不归为固定色板"
  },
  "sheet_traits_zh": "简洁偏圆外线塑造紧凑成人体块，肩胸成熟；衣物接缝减量，发块按既定明度归并，布面与皮肤以不同灰阶区分，附属细节分组。",
  "drawing_steps": [
    "先按既定人物与道具搭静态体块：成人比例略紧凑但肩胸成熟，服装体量与身体分开；检查同一人物辨识点。",
    "用三阶缩略图确定主次：既有主体以清晰大轮廓为主，小型细节沿一条带状区域组织，再落实头发深黑、衣物灰阶、皮肤白，附属细节只用两档值。",
    "按材质分层描线：人物外线简洁偏圆，服装接缝少，附属形体用细边线分组；检查背景留白充分，空间说明仅需少量边界而非满铺细节。",
    "最后校对表演与色域：眼睛细小偏稳，轻微头部角度表达关注而非夸张口型；按“本库建议青灰与米白为主体，极少量橙色线作节奏，不归为固定色板”做原创小色稿，连续页采用独立节奏建议。"
  ],
  "review_checks": [
    "紧凑成人体型是否仍有成熟肩胸，未幼态化？",
    "附属细节是否归入成组灰阶，没有打碎大轮廓？",
    "去掉细小橙色点缀后主体是否仍可辨？"
  ],
  "avoid": [
    "紧凑头身变成儿童身体，与成年人要求冲突。",
    "附属小形体逐个强化对比，破坏整体服装剪影。"
  ],
  "best_for": [
    "成年原创角色造型与材质练习",
    "同一角色三视图的线条和色块控制",
    "既定故事的彩色插画／连续页转译"
  ],
  "prompt_core_zh": "原创视觉技法：人物外线简洁偏圆，服装接缝少，附属形体用细边线分组；成人比例略紧凑但肩胸成熟，服装体量与身体分开；头发深黑、衣物灰阶、皮肤白，附属细节只用两档值。保留既定人物、场景和剧情，只迁移技法。",
  "prompt_core_en": "Build a clear rounded silhouette with compact but mature adult anatomy. Simplify clothing seams and group small accessory shapes into a narrow organized band. Separate dark hair, middle value fabric, and pale skin. Leave generous negative space around the supplied subject. Limit accent color to a few fine warm marks against cooler neutrals. Keep expression restrained and preserve the existing character count, identity, setting, and action sequence.",
  "biography": {
    "birth_year": null,
    "death_year": null,
    "ethnicity": {
      "value": null,
      "status": "unknown"
    },
    "region_context": "已核日本商业出版／项目或展览语境；本轮未核国籍、民族或居住地，不据姓名推断。",
    "source_ids": [
      "S1"
    ],
    "note": "仅记录公开创作者署名与已核出版／活动地区，未知生日和生卒为null；不据姓名、国籍推民族。"
  },
  "known_gaps": [
    "只核本条明示公开图像，没有通读完整画集或逐年比较全部时期；未承诺精确复刻。",
    "作者原始上色与出版物装帧、文字、印刷呈色未逐项拆分，因此背景排版和标题字体不视为个人固定风格。",
    "原创技法转译未通过真实生成样张验收；三视图只用sheet_traits_zh的静态特征，不能照搬封面透视。"
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
