# Anmi · 本地研究卡快照

来源：human-distillation-lab 工作目录（不假定已提交）。
仅供查阅；出图采用项目内独立转写的线条和明暗方法。

## manga-authors/authors/anmi/SKILL.md

---
name: manga-anmi
description: "Anmi公开漫画／插画研究与原创绘图参谋；适用于成年原创角色造型与材质练习、同一角色三视图的线条和色块控制、既定故事的彩色插画／连续页转译；按具体视觉技法编写方案。"
---

# Anmi（Anmi） · 漫画／插画创作研究卡

本轮主要视觉研究限定于CRYSTAL CLEAR Anmi作品集（2020）封面；仅核公开封面／宣传图及明示样图。其余履历来源只证明职业与署名，不借动画成片代替个人画作。八维配方、步骤、评审与提示词均为本库原创技法转译，不是本人逐笔规则。

选材类型：日系插画／同人画师。本轮重点：CRYSTAL CLEAR Anmi作品集（2020）封面；参考年份：2020。对应出版社记录的书籍／宣传发布日期；不将作品集出版年当成全部收录画作的创作年，也不声称是2026最新画风。〔S1, S3〕

方向：亮肤与精细色彩边缘。本卡研究公开作品与方法；绘图配方是本库原创转译，未训练模型、未做出图效果验证。

[100人目录](../../CATALOG.md) · [八维绘画方案](drawing.md) · [绘图提示词](prompts.md) · [结构化记录](manifest.json) · [完整创作流程](../../WORKFLOW.md)

## 适用任务

- 成年原创角色造型与材质练习
- 同一角色三视图的线条和色块控制
- 既定故事的彩色插画／连续页转译

先读取下列研究依据，再从drawing.md选2–3项具体技法，结合项目自己的角色和世界设定，编写原创画面方案。生成时采用prompts.md的通用技法表达，不直接用作者姓名作为画风口令，不假称本人绘制或背书。用户按作者选择风格时，明确作品阶段，把视觉目标拆成可操作的特征；保留项目已有角色设定，不承诺未经实际出图验证的复现精度。

## 本轮公开依据

- 192页全彩首画集，2020年2月7日；收录原创和商业作品〔source_summary；S1〕
- 人物正面半身像位于画面偏右，白裙与浅底相近但蓝紫阴影区分褶皱；深棕发形外围清楚，紫色瞳孔、散布的小花和水滴样亮点形成细小高饱和焦点，脸部不被黑线包满。〔visual_observation；S3〕

绘画／叙事方法或限定画面观察的依据：S3。下述原创配方不代表这些来源逐项规定了所有参数。

## 选材与分工

- CRYSTAL CLEAR Anmi作品集（2020）封面：插画／角色视觉创作；书籍文字、编辑、装帧与动画协作另有署名，不并入个人作画〔S1, S3〕

## 基本资料

出生年：未知／本轮未核定；逝世年：未知／本轮未核定。

活动／出版语境（非国籍）：日本出版社画集、东京／台湾／韩国展览语境已核；出身地区尚未从本轮主来源核实，不据笔名推国籍或民族。民族：未知，不根据姓名或出版地区推断。仅记录公开创作者署名与已核出版／活动地区，未知生日和生卒为null；不据姓名、国籍推民族。 〔S2〕

本次新增研究对象；未复制成其他专家分类条目。

## 缺口

- 只核本条明示公开图像，没有通读完整画集或逐年比较全部时期；未承诺精确复刻。
- 作者原始上色与出版物装帧、文字、印刷呈色未逐项拆分，因此背景排版和标题字体不视为个人固定风格。
- 原创技法转译未通过真实生成样张验收；三视图只用sheet_traits_zh的静态特征，不能照搬封面透视。
- 近期视觉关注分别限于2020／2021出版样本；未核2024–2026的个人新绘阶段，不能把当前在售视为最新创作。

## 来源

- **S1** [CRYSTAL CLEAR Anmi作品集](https://data.ichijinsha.co.jp/detail/75801661) — 一迅社；2026-11-01；`page_text`。实际web检索或打开所列官方／出版社供稿页面；本轮候选阶段不声称已看作品图像或读画集内页。 支持：192页全彩首画集，2020年2月7日；收录原创和商业作品；2020作品集明确含《少女前线》《放学后的昴星团》；当前官方合作画廊目录另列FGO、明日方舟、原神及多地个展，但未核这些项目日期。。
- **S2** [Anmi | アールジュネス・軸中心派・E☆2](https://artjeuness.jp/contents/36/) — アールジュネス；2026-11-01；`page_text`。实际检索或打开的补充公开页面；未观察作品图像。 支持：官方合作画廊列FGO、少女前线、明日方舟、原神和东京、台湾、韩国展览；各项目日期未列。。
- **S3** [CRYSTAL CLEAR Anmi作品集（2020）封面：官方封面／宣传图](https://data.ichijinsha.co.jp/img/75801661) — 一迅社；2026-11-01；`visual_preview`。从已核定官方页面 https://data.ichijinsha.co.jp/detail/75801661 的HTML提取实际图像URL，临时保存至/tmp并通过view_image查看。只核这张图；没有下载图片入库，没有将页面alt当视觉观察。 支持：人物正面半身像位于画面偏右，白裙与浅底相近但蓝紫阴影区分褶皱；深棕发形外围清楚，紫色瞳孔、散布的小花和水滴样亮点形成细小高饱和焦点，脸部不被黑线包满。。


## manga-authors/authors/anmi/drawing.md

# Anmi（Anmi） · 八维绘画方案

以下全部是**本库原创创作转译**，不是作者原话或其全部作品的统一规则。对应公开事实与访问范围见[研究卡](SKILL.md)。先确定所选作品阶段，彩色建议不自动视为作者固定色板。

## 线条

人物轮廓细而清，头发外缘分束，五官线保持轻量

## 形体与人物

成人骨架和胸廓明确，大眼不改变成年下颌与肩宽

## 构图

已有主体用清楚面部和周围稀疏小色点建立焦点，不新增花朵道具

## 分镜节奏

本库原创建议：先展示整体值域，再查看材质边缘与眼部，末段回到整体

## 黑白与网点

皮肤和浅衣占高明度，发根局部深色，细节不把面部涂黑

## 环境

背景以低反差层衬主体，必要硬边只留接触和遮挡处

## 表情动作

眼睑与嘴角小幅变化，手指结构完整且不靠大表情代替情绪

## 彩色方案

本库建议奶白、蓝紫阴影和少量高饱和细节色；不复制封面花饰

## 落地步骤

1. 先按既定人物与道具搭静态体块：成人骨架和胸廓明确，大眼不改变成年下颌与肩宽；检查同一人物辨识点。
2. 用三阶缩略图确定主次：已有主体用清楚面部和周围稀疏小色点建立焦点，不新增花朵道具，再落实皮肤和浅衣占高明度，发根局部深色，细节不把面部涂黑。
3. 按材质分层描线：人物轮廓细而清，头发外缘分束，五官线保持轻量；检查背景以低反差层衬主体，必要硬边只留接触和遮挡处。
4. 最后校对表演与色域：眼睑与嘴角小幅变化，手指结构完整且不靠大表情代替情绪；按“本库建议奶白、蓝紫阴影和少量高饱和细节色；不复制封面花饰”做原创小色稿，连续页采用独立节奏建议。

## 图像检查

- 浅衣与浅肤是否靠蓝紫灰而非黑描线相互分开？
- 小高饱和细节是否集中在既定焦点，而非满图闪点？
- 大眼是否仍配成年下颌、肩宽与胸廓？

## 容易失败的做法

- 高光与花样点色布满皮肤，成人结构变得不可读。
- 浅衣与浅肤全部靠粗黑线分开，破坏明亮色域的细腻层次。


## manga-authors/authors/anmi/prompts.md

# Anmi（Anmi） · 原创绘图提示词

这些是可编辑的起稿模板，未实际出图。比较时统一使用“雨后浮岛港口归还机械鸟”的原创题材。角色设定页只转用形体、线条和黑白处理，不沿用场景镜头；英文版的角色技法段保留中文规格以免未经审核的翻译改变约束。

不要将本页标题或作者姓名一并粘贴到图像生成提示词。需要其他题材时替换角色、场景、行动和情绪，保留所选择的通用技法；既定发色、发长、肤色、衣色与体型优先，冲突技法或色板必须删改；最后执行[连贯性与输出检查](../../WORKFLOW.md)。

## 单幅叙事插画

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 单幅叙事插画。原创视觉技法：人物轮廓细而清，头发外缘分束，五官线保持轻量；成人骨架和胸廓明确，大眼不改变成年下颌与肩宽；皮肤和浅衣占高明度，发根局部深色，细节不把面部涂黑。保留既定人物、场景和剧情，只迁移技法。 不画原作品角色、标志或签名；文字如需出现，保留位置后期排版。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. One narrative illustration. Keep outlines fine and clear, grouping the outer hair edge while leaving facial lines light. Use unmistakably adult bone structure and a mature jaw beneath expressive eyes. Preserve a high value range for skin and pale fabric, separating folds with cool violet gray. Concentrate dark accents near roots and tiny saturated details near the existing focus. Retain all supplied narrative elements without adding floral decorations, characters, or actions. No existing franchise designs, logos or signatures. Reserve any text for later lettering.
```

## 角色三视图

### 中文

```text
角色设定页：同一名成年修理工的正面、右侧面、背面三个完整视图；短发、短外套、工具腰带、工作靴，三视图衣物结构及比例一致。中性站姿、平视、无透视夸张、纯净背景，三个完整身体不重叠。 以下技法服从上述成年角色、服装和站姿约束；只转用造型与画面处理，忽略示例动作和场景：轻细轮廓包住明确成年骨架，发束外缘清楚；皮肤与浅衣高明度，蓝紫灰分褶，发根深色，细节点色少而集中。
```

### English / bilingual specification

```text
Character design sheet: front, right-side and rear full-body views of the same adult repair technician, with short hair, a short work jacket, tool belt and work boots. Keep anatomy, garment construction and proportions consistent. Use neutral standing poses, eye-level orthographic views, a plain background and no overlapping figures. Apply the following bilingual line, shape and tone specification subject to the adult character, clothing and neutral pose above; omit any example actions and scene directions: 轻细轮廓包住明确成年骨架，发束外缘清楚；皮肤与浅衣高明度，蓝紫灰分褶，发根深色，细节点色少而集中。
```

## 六格漫画页

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 六格漫画页，按日式从右到左、从上到下阅读。格1港口建立空间；格2修理工发现机械鸟；格3检查鸟翅；格4旅人赶来；格5修理工交还鸟；格6鸟起飞，两人目送。每格明确一个动作，角色、工具及场景方向连续。预留空白对话框，文字后期排版；不要生成签名或水印。 将以下技法用于各格，不改变上述事件、格数或顺序：原创视觉技法：人物轮廓细而清，头发外缘分束，五官线保持轻量；成人骨架和胸廓明确，大眼不改变成年下颌与肩宽；皮肤和浅衣占高明度，发根局部深色，细节不把面部涂黑。保留既定人物、场景和剧情，只迁移技法。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. A six-panel manga page, read from right to left and top to bottom. Panel 1 establishes the harbor; 2 the technician discovers the bird; 3 inspects its wing; 4 the traveler arrives; 5 the bird is returned; 6 it flies away as both adults watch. Show one clear action per panel; preserve character, prop and screen-direction continuity. Leave speech balloons empty for later lettering. No signatures or watermarks. Apply the following techniques within each panel without changing the events, panel count or sequence: Keep outlines fine and clear, grouping the outer hair edge while leaving facial lines light. Use unmistakably adult bone structure and a mature jaw beneath expressive eyes. Preserve a high value range for skin and pale fabric, separating folds with cool violet gray. Concentrate dark accents near roots and tiny saturated details near the existing focus. Retain all supplied narrative elements without adding floral decorations, characters, or actions.
```


## manga-authors/authors/anmi/manifest.json

{
  "id": "anmi",
  "name": "Anmi",
  "name_zh": "Anmi",
  "name_ja": "Anmi",
  "legacy_refs": [],
  "creator_type": "illustrator",
  "family": "亮肤与精细色彩边缘",
  "scope": "本轮主要视觉研究限定于CRYSTAL CLEAR Anmi作品集（2020）封面；仅核公开封面／宣传图及明示样图。其余履历来源只证明职业与署名，不借动画成片代替个人画作。八维配方、步骤、评审与提示词均为本库原创技法转译，不是本人逐笔规则。",
  "reference_works": [
    {
      "title": "CRYSTAL CLEAR Anmi作品集（2020）封面",
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
      "title": "CRYSTAL CLEAR Anmi作品集",
      "url": "https://data.ichijinsha.co.jp/detail/75801661",
      "publisher": "一迅社",
      "accessed_at": "2026-11-01",
      "access_method": "page_text",
      "supports": [
        "192页全彩首画集，2020年2月7日；收录原创和商业作品",
        "2020作品集明确含《少女前线》《放学后的昴星团》；当前官方合作画廊目录另列FGO、明日方舟、原神及多地个展，但未核这些项目日期。"
      ],
      "access_note": "实际web检索或打开所列官方／出版社供稿页面；本轮候选阶段不声称已看作品图像或读画集内页。"
    },
    {
      "id": "S2",
      "title": "Anmi | アールジュネス・軸中心派・E☆2",
      "url": "https://artjeuness.jp/contents/36/",
      "publisher": "アールジュネス",
      "accessed_at": "2026-11-01",
      "access_method": "page_text",
      "supports": [
        "官方合作画廊列FGO、少女前线、明日方舟、原神和东京、台湾、韩国展览；各项目日期未列。"
      ],
      "access_note": "实际检索或打开的补充公开页面；未观察作品图像。"
    },
    {
      "id": "S3",
      "title": "CRYSTAL CLEAR Anmi作品集（2020）封面：官方封面／宣传图",
      "url": "https://data.ichijinsha.co.jp/img/75801661",
      "publisher": "一迅社",
      "accessed_at": "2026-11-01",
      "access_method": "visual_preview",
      "supports": [
        "人物正面半身像位于画面偏右，白裙与浅底相近但蓝紫阴影区分褶皱；深棕发形外围清楚，紫色瞳孔、散布的小花和水滴样亮点形成细小高饱和焦点，脸部不被黑线包满。"
      ],
      "access_note": "从已核定官方页面 https://data.ichijinsha.co.jp/detail/75801661 的HTML提取实际图像URL，临时保存至/tmp并通过view_image查看。只核这张图；没有下载图片入库，没有将页面alt当视觉观察。",
      "origin_page_url": "https://data.ichijinsha.co.jp/detail/75801661",
      "observed_asset_sha256": "b751b63ba7983a68b316689a0d6e933ca3a2c87f406a8c464a6c6d3c960cb4ed"
    }
  ],
  "findings": [
    {
      "text": "192页全彩首画集，2020年2月7日；收录原创和商业作品",
      "basis": "source_summary",
      "source_ids": [
        "S1"
      ]
    },
    {
      "text": "人物正面半身像位于画面偏右，白裙与浅底相近但蓝紫阴影区分褶皱；深棕发形外围清楚，紫色瞳孔、散布的小花和水滴样亮点形成细小高饱和焦点，脸部不被黑线包满。",
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
    "work": "CRYSTAL CLEAR Anmi作品集（2020）封面",
    "year": 2020,
    "source_ids": [
      "S1",
      "S3"
    ],
    "date_basis": "对应出版社记录的书籍／宣传发布日期；不将作品集出版年当成全部收录画作的创作年，也不声称是2026最新画风。"
  },
  "visual_recipe": {
    "line": "人物轮廓细而清，头发外缘分束，五官线保持轻量",
    "shapes": "成人骨架和胸廓明确，大眼不改变成年下颌与肩宽",
    "composition": "已有主体用清楚面部和周围稀疏小色点建立焦点，不新增花朵道具",
    "panel_rhythm": "本库原创建议：先展示整体值域，再查看材质边缘与眼部，末段回到整体",
    "tonal_design": "皮肤和浅衣占高明度，发根局部深色，细节不把面部涂黑",
    "environment": "背景以低反差层衬主体，必要硬边只留接触和遮挡处",
    "acting": "眼睑与嘴角小幅变化，手指结构完整且不靠大表情代替情绪",
    "color": "本库建议奶白、蓝紫阴影和少量高饱和细节色；不复制封面花饰"
  },
  "sheet_traits_zh": "轻细轮廓包住明确成年骨架，发束外缘清楚；皮肤与浅衣高明度，蓝紫灰分褶，发根深色，细节点色少而集中。",
  "drawing_steps": [
    "先按既定人物与道具搭静态体块：成人骨架和胸廓明确，大眼不改变成年下颌与肩宽；检查同一人物辨识点。",
    "用三阶缩略图确定主次：已有主体用清楚面部和周围稀疏小色点建立焦点，不新增花朵道具，再落实皮肤和浅衣占高明度，发根局部深色，细节不把面部涂黑。",
    "按材质分层描线：人物轮廓细而清，头发外缘分束，五官线保持轻量；检查背景以低反差层衬主体，必要硬边只留接触和遮挡处。",
    "最后校对表演与色域：眼睑与嘴角小幅变化，手指结构完整且不靠大表情代替情绪；按“本库建议奶白、蓝紫阴影和少量高饱和细节色；不复制封面花饰”做原创小色稿，连续页采用独立节奏建议。"
  ],
  "review_checks": [
    "浅衣与浅肤是否靠蓝紫灰而非黑描线相互分开？",
    "小高饱和细节是否集中在既定焦点，而非满图闪点？",
    "大眼是否仍配成年下颌、肩宽与胸廓？"
  ],
  "avoid": [
    "高光与花样点色布满皮肤，成人结构变得不可读。",
    "浅衣与浅肤全部靠粗黑线分开，破坏明亮色域的细腻层次。"
  ],
  "best_for": [
    "成年原创角色造型与材质练习",
    "同一角色三视图的线条和色块控制",
    "既定故事的彩色插画／连续页转译"
  ],
  "prompt_core_zh": "原创视觉技法：人物轮廓细而清，头发外缘分束，五官线保持轻量；成人骨架和胸廓明确，大眼不改变成年下颌与肩宽；皮肤和浅衣占高明度，发根局部深色，细节不把面部涂黑。保留既定人物、场景和剧情，只迁移技法。",
  "prompt_core_en": "Keep outlines fine and clear, grouping the outer hair edge while leaving facial lines light. Use unmistakably adult bone structure and a mature jaw beneath expressive eyes. Preserve a high value range for skin and pale fabric, separating folds with cool violet gray. Concentrate dark accents near roots and tiny saturated details near the existing focus. Retain all supplied narrative elements without adding floral decorations, characters, or actions.",
  "biography": {
    "birth_year": null,
    "death_year": null,
    "ethnicity": {
      "value": null,
      "status": "unknown"
    },
    "region_context": "日本出版社画集、东京／台湾／韩国展览语境已核；出身地区尚未从本轮主来源核实，不据笔名推国籍或民族。",
    "source_ids": [
      "S2"
    ],
    "note": "仅记录公开创作者署名与已核出版／活动地区，未知生日和生卒为null；不据姓名、国籍推民族。"
  },
  "known_gaps": [
    "只核本条明示公开图像，没有通读完整画集或逐年比较全部时期；未承诺精确复刻。",
    "作者原始上色与出版物装帧、文字、印刷呈色未逐项拆分，因此背景排版和标题字体不视为个人固定风格。",
    "原创技法转译未通过真实生成样张验收；三视图只用sheet_traits_zh的静态特征，不能照搬封面透视。",
    "近期视觉关注分别限于2020／2021出版样本；未核2024–2026的个人新绘阶段，不能把当前在售视为最新创作。"
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
