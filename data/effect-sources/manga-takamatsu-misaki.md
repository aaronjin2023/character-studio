# 高松美咲 · 本地研究卡快照

来源：human-distillation-lab 工作目录（不假定已提交）。
仅供查阅；出图采用项目内独立转写的线条和明暗方法。

## manga-authors/authors/takamatsu-misaki/SKILL.md

---
name: manga-takamatsu-misaki
description: "高松美咲公开漫画／插画研究与原创绘图参谋；适用于自然对话与细小情绪、低彩日常材料与空间练习；按具体视觉技法编写方案。"
---

# 高松美咲（Misaki Takamatsu） · 漫画／插画创作研究卡

本轮限定《スキップとローファー 第12卷发行纪念新绘卡》的公开书目与官方第12卷发行纪念宣传图 skiptoloafer_250801main.jpg，下方四张新绘卡（非封面、非连续漫画页）。其他时期未逐年比较；不将改编动画或影视团队成果归本人。八维配方为原创一般技法迁移，连续分镜建议不冒称封面可证。

选材类型：当代漫画家。本轮重点：スキップとローファー 第12卷发行纪念新绘卡；参考年份：2025。官方2025-08-01公告明确第12卷2025-08-22发行，并说明特典卡为高松美咲新绘；2025指该发行纪念项目发表年，单图落笔日未核。〔S1, S2〕

方向：自然表情与低彩生活结构。本卡研究公开作品与方法；绘图配方是本库原创转译，未训练模型、未做出图效果验证。

[100人目录](../../CATALOG.md) · [八维绘画方案](drawing.md) · [绘图提示词](prompts.md) · [结构化记录](manifest.json) · [完整创作流程](../../WORKFLOW.md)

## 适用任务

- 自然对话与细小情绪
- 低彩日常材料与空间练习

先读取下列研究依据，再从drawing.md选2–3项具体技法，结合项目自己的角色和世界设定，编写原创画面方案。生成时采用prompts.md的通用技法表达，不直接用作者姓名作为画风口令，不假称本人绘制或背书。用户按作者选择风格时，明确作品阶段，把视觉目标拆成可操作的特征；保留项目已有角色设定，不承诺未经实际出图验证的复现精度。

## 本轮公开依据

- Afternoon公告把四种特典明确称为高松美咲氏描き下ろしチェキ風カード，核定第12卷发行日期；本次图像依据是新绘宣传展示，不是动画画面或声称已看书内页。〔source_summary；S1〕
- 实际查看宣传图中四张新绘卡：人物五官简省，细线轮廓与自然手部并置；衣服低彩红、青、赭按大面分开，浅灰阴影轻，背景窗框、家具和植物的线条较细且不压住脸。四张卡中的原人数、动物和动作均不移入提示词。只支持这些静态展示图。〔visual_observation；S2〕

绘画／叙事方法或限定画面观察的依据：S2。下述原创配方不代表这些来源逐项规定了所有参数。

## 选材与分工

- スキップとローファー 第12卷发行纪念新绘卡：漫画作者；故事与绘画署名：高松美咲〔S1, S2〕

## 基本资料

出生年：未知／本轮未核定；逝世年：未知／本轮未核定。

活动／出版语境（非国籍）：日本出版社的漫画出版语境；不据此推断国籍或民族。民族：未知，不根据姓名或出版地区推断。使用公开署名；生卒未核保持 null，民族未知。 〔S1〕

本次新增研究对象；未复制成其他专家分类条目。

## 缺口

- 实际查看的是四张独立新绘卡的宣传展示，不是第12卷封面或内页。
- 未读连续内页与作者过程访谈，分镜仅为原创迁移；特典排版不自动归作者。
- 8维方案、4步骤、评审与提示词为本库原创转译，未实际生成或完成画面一致性验收。

## 来源

- **S1** [スキップとローファー 第12卷发行纪念新绘卡：公开书目与署名](https://afternoon.kodansha.co.jp/news/5867.html) — 讲谈社／Afternoon；2026-11-01；`page_text`。实际读公开正文／出版社供稿书目；不表示通读整卷，不以动画或影视改编替代漫画证据。 支持：所选漫画的作者署名与版本范围；官方2025-08-01公告明确第12卷2025-08-22发行，并说明特典卡为高松美咲新绘；2025指该发行纪念项目发表年，单图落笔日未核。。
- **S2** [スキップとローファー 第12卷发行纪念新绘卡：实际观察的公开图](https://afternoon.kodansha.co.jp//c/skiptoloafer/kc12/skiptoloafer_250801main.jpg) — 讲谈社／Afternoon；2026-11-01；`visual_preview`。从上述公开页面明确提取图像链接，下载到临时文件后实际通过 view_image 查看。定位：官方第12卷发行纪念宣传图 skiptoloafer_250801main.jpg，下方四张新绘卡（非封面、非连续漫画页）；只支持该画面，未读内页；字体与书封装帧不自动视为作者绘画。 支持：仅该公开图可见的线形、体块、明暗、色彩及构图。


## manga-authors/authors/takamatsu-misaki/drawing.md

# 高松美咲（Misaki Takamatsu） · 八维绘画方案

以下全部是**本库原创创作转译**，不是作者原话或其全部作品的统一规则。对应公开事实与访问范围见[研究卡](SKILL.md)。先确定所选作品阶段，彩色建议不自动视为作者固定色板。

## 线条

简省五官配清楚中细外线，衣褶以少量长短线说明方向，背景结构线比人物关键线更细。

## 形体与人物

自然成年肩胸、头颈和手部连接为底层，表情可以概括但不继承样本高中生比例和制服。

## 构图

既定角色数量与行动不变，用脸旁干净浅区和明确手部关系组织主次，背景线只提供必要支撑。

## 分镜节奏

原创分镜迁移建议：既定动作后给细小反应，再回到关系镜头；四张独立特典卡不能证明实际内页排格或时长。

## 黑白与网点

浅皮肤、衣料中灰与少量发根深色分层，阴影面积小而清楚，不靠全图柔焦制造轻松感。

## 环境

保留项目已有地点，以较细结构线和低彩材料说明位置；不能自动加入猫狗、花盆或原图室内。

## 表情动作

眼眉位置与嘴角不同幅度区分态度，手指放松或用力服从既定动作，各人不套同一笑脸。

## 彩色方案

由宣传图转译为低彩赭红、青灰与奶白的有限关系；服装和发色已锁定时只借色温和明度。

## 落地步骤

1. 先锁定项目人数与成年外形，用浅区标出面部与关键手部。
2. 建立自然肩胸和手指结构，再用少量线简化五官。
3. 衣服分中灰大面，背景以更细线交代既定空间。
4. 检查每个既定表情的眼眉嘴角差异，减少抢焦点的纹样和环境对比。

## 图像检查

- 简省五官是否仍能区分不同情绪与人物？
- 手部是否有明确接触与成年比例？
- 背景是否细而可信，且没有偷换地点或加入动物道具？

## 容易失败的做法

- 把独立新绘卡排成已证实的原作连续分镜。
- 复制宣传卡中的制服、动物或固定人物组合。


## manga-authors/authors/takamatsu-misaki/prompts.md

# 高松美咲（Misaki Takamatsu） · 原创绘图提示词

这些是可编辑的起稿模板，未实际出图。比较时统一使用“雨后浮岛港口归还机械鸟”的原创题材。角色设定页只转用形体、线条和黑白处理，不沿用场景镜头；英文版的角色技法段保留中文规格以免未经审核的翻译改变约束。

不要将本页标题或作者姓名一并粘贴到图像生成提示词。需要其他题材时替换角色、场景、行动和情绪，保留所选择的通用技法；既定发色、发长、肤色、衣色与体型优先，冲突技法或色板必须删改；最后执行[连贯性与输出检查](../../WORKFLOW.md)。

## 单幅叙事插画

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 单幅叙事插画。保持项目已定成年人物、人数、发色发长和故事，以简省五官配清楚中细外线，肩胸手部结构自然。浅皮肤与衣料中灰分层，布褶疏朗，周围以更细结构线和低彩材料支撑；眼眉嘴角各有清楚变化，既定动作和接触关系可读。 不画原作品角色、标志或签名；文字如需出现，保留位置后期排版。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. One narrative illustration. Preserve the specified adult identities, cast size, hair colors and lengths, and story. Combine simplified facial features with clear medium fine contours and natural shoulder, chest, and hand structure. Separate light skin from middle value fabric using sparse folds. Support the subject with finer structural lines and subdued material colors in the existing setting. Differentiate emotions through readable brows, eyelids, and mouth corners while preserving requested actions and credible contact relationships. No existing franchise designs, logos or signatures. Reserve any text for later lettering.
```

## 角色三视图

### 中文

```text
角色设定页：同一名成年修理工的正面、右侧面、背面三个完整视图；短发、短外套、工具腰带、工作靴，三视图衣物结构及比例一致。中性站姿、平视、无透视夸张、纯净背景，三个完整身体不重叠。 以下技法服从上述成年角色、服装和站姿约束；只转用造型与画面处理，忽略示例动作和场景：简省五官配清楚中细线，静态成年肩胸手部自然；皮肤浅面、衣料中灰与局部深块分层，布褶疏朗。
```

### English / bilingual specification

```text
Character design sheet: front, right-side and rear full-body views of the same adult repair technician, with short hair, a short work jacket, tool belt and work boots. Keep anatomy, garment construction and proportions consistent. Use neutral standing poses, eye-level orthographic views, a plain background and no overlapping figures. Apply the following bilingual line, shape and tone specification subject to the adult character, clothing and neutral pose above; omit any example actions and scene directions: 简省五官配清楚中细线，静态成年肩胸手部自然；皮肤浅面、衣料中灰与局部深块分层，布褶疏朗。
```

## 六格漫画页

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 六格漫画页，按日式从右到左、从上到下阅读。格1港口建立空间；格2修理工发现机械鸟；格3检查鸟翅；格4旅人赶来；格5修理工交还鸟；格6鸟起飞，两人目送。每格明确一个动作，角色、工具及场景方向连续。预留空白对话框，文字后期排版；不要生成签名或水印。 将以下技法用于各格，不改变上述事件、格数或顺序：保持项目已定成年人物、人数、发色发长和故事，以简省五官配清楚中细外线，肩胸手部结构自然。浅皮肤与衣料中灰分层，布褶疏朗，周围以更细结构线和低彩材料支撑；眼眉嘴角各有清楚变化，既定动作和接触关系可读。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. A six-panel manga page, read from right to left and top to bottom. Panel 1 establishes the harbor; 2 the technician discovers the bird; 3 inspects its wing; 4 the traveler arrives; 5 the bird is returned; 6 it flies away as both adults watch. Show one clear action per panel; preserve character, prop and screen-direction continuity. Leave speech balloons empty for later lettering. No signatures or watermarks. Apply the following techniques within each panel without changing the events, panel count or sequence: Preserve the specified adult identities, cast size, hair colors and lengths, and story. Combine simplified facial features with clear medium fine contours and natural shoulder, chest, and hand structure. Separate light skin from middle value fabric using sparse folds. Support the subject with finer structural lines and subdued material colors in the existing setting. Differentiate emotions through readable brows, eyelids, and mouth corners while preserving requested actions and credible contact relationships.
```


## manga-authors/authors/takamatsu-misaki/manifest.json

{
  "id": "takamatsu-misaki",
  "name": "Misaki Takamatsu",
  "name_zh": "高松美咲",
  "name_ja": "高松美咲",
  "legacy_refs": [],
  "legacy_expert_refs": [],
  "creator_type": "manga-artist",
  "family": "自然表情与低彩生活结构",
  "scope": "本轮限定《スキップとローファー 第12卷发行纪念新绘卡》的公开书目与官方第12卷发行纪念宣传图 skiptoloafer_250801main.jpg，下方四张新绘卡（非封面、非连续漫画页）。其他时期未逐年比较；不将改编动画或影视团队成果归本人。八维配方为原创一般技法迁移，连续分镜建议不冒称封面可证。",
  "reference_works": [
    {
      "title": "スキップとローファー 第12卷发行纪念新绘卡",
      "role": "漫画作者；故事与绘画署名：高松美咲",
      "source_ids": [
        "S1",
        "S2"
      ]
    }
  ],
  "sources": [
    {
      "id": "S1",
      "title": "スキップとローファー 第12卷发行纪念新绘卡：公开书目与署名",
      "url": "https://afternoon.kodansha.co.jp/news/5867.html",
      "publisher": "讲谈社／Afternoon",
      "accessed_at": "2026-11-01",
      "access_method": "page_text",
      "supports": [
        "所选漫画的作者署名与版本范围",
        "官方2025-08-01公告明确第12卷2025-08-22发行，并说明特典卡为高松美咲新绘；2025指该发行纪念项目发表年，单图落笔日未核。"
      ],
      "access_note": "实际读公开正文／出版社供稿书目；不表示通读整卷，不以动画或影视改编替代漫画证据。"
    },
    {
      "id": "S2",
      "title": "スキップとローファー 第12卷发行纪念新绘卡：实际观察的公开图",
      "url": "https://afternoon.kodansha.co.jp//c/skiptoloafer/kc12/skiptoloafer_250801main.jpg",
      "publisher": "讲谈社／Afternoon",
      "accessed_at": "2026-11-01",
      "access_method": "visual_preview",
      "supports": [
        "仅该公开图可见的线形、体块、明暗、色彩及构图"
      ],
      "access_note": "从上述公开页面明确提取图像链接，下载到临时文件后实际通过 view_image 查看。定位：官方第12卷发行纪念宣传图 skiptoloafer_250801main.jpg，下方四张新绘卡（非封面、非连续漫画页）；只支持该画面，未读内页；字体与书封装帧不自动视为作者绘画。",
      "origin_page_url": "https://afternoon.kodansha.co.jp/news/5867.html",
      "observed_asset_sha256": "9a87a73dbad6f55dfcf4eaf68d9733f644dd31708d4e52204fc2065e5ce02771"
    }
  ],
  "findings": [
    {
      "text": "Afternoon公告把四种特典明确称为高松美咲氏描き下ろしチェキ風カード，核定第12卷发行日期；本次图像依据是新绘宣传展示，不是动画画面或声称已看书内页。",
      "basis": "source_summary",
      "source_ids": [
        "S1"
      ]
    },
    {
      "text": "实际查看宣传图中四张新绘卡：人物五官简省，细线轮廓与自然手部并置；衣服低彩红、青、赭按大面分开，浅灰阴影轻，背景窗框、家具和植物的线条较细且不压住脸。四张卡中的原人数、动物和动作均不移入提示词。只支持这些静态展示图。",
      "basis": "visual_observation",
      "source_ids": [
        "S2"
      ]
    }
  ],
  "method_evidence_source_ids": [
    "S2"
  ],
  "recent_focus": {
    "work": "スキップとローファー 第12卷发行纪念新绘卡",
    "year": 2025,
    "source_ids": [
      "S1",
      "S2"
    ],
    "date_basis": "官方2025-08-01公告明确第12卷2025-08-22发行，并说明特典卡为高松美咲新绘；2025指该发行纪念项目发表年，单图落笔日未核。"
  },
  "visual_recipe": {
    "line": "简省五官配清楚中细外线，衣褶以少量长短线说明方向，背景结构线比人物关键线更细。",
    "shapes": "自然成年肩胸、头颈和手部连接为底层，表情可以概括但不继承样本高中生比例和制服。",
    "composition": "既定角色数量与行动不变，用脸旁干净浅区和明确手部关系组织主次，背景线只提供必要支撑。",
    "panel_rhythm": "原创分镜迁移建议：既定动作后给细小反应，再回到关系镜头；四张独立特典卡不能证明实际内页排格或时长。",
    "tonal_design": "浅皮肤、衣料中灰与少量发根深色分层，阴影面积小而清楚，不靠全图柔焦制造轻松感。",
    "environment": "保留项目已有地点，以较细结构线和低彩材料说明位置；不能自动加入猫狗、花盆或原图室内。",
    "acting": "眼眉位置与嘴角不同幅度区分态度，手指放松或用力服从既定动作，各人不套同一笑脸。",
    "color": "由宣传图转译为低彩赭红、青灰与奶白的有限关系；服装和发色已锁定时只借色温和明度。"
  },
  "sheet_traits_zh": "简省五官配清楚中细线，静态成年肩胸手部自然；皮肤浅面、衣料中灰与局部深块分层，布褶疏朗。",
  "drawing_steps": [
    "先锁定项目人数与成年外形，用浅区标出面部与关键手部。",
    "建立自然肩胸和手指结构，再用少量线简化五官。",
    "衣服分中灰大面，背景以更细线交代既定空间。",
    "检查每个既定表情的眼眉嘴角差异，减少抢焦点的纹样和环境对比。"
  ],
  "review_checks": [
    "简省五官是否仍能区分不同情绪与人物？",
    "手部是否有明确接触与成年比例？",
    "背景是否细而可信，且没有偷换地点或加入动物道具？"
  ],
  "avoid": [
    "把独立新绘卡排成已证实的原作连续分镜。",
    "复制宣传卡中的制服、动物或固定人物组合。"
  ],
  "best_for": [
    "自然对话与细小情绪",
    "低彩日常材料与空间练习"
  ],
  "prompt_core_zh": "保持项目已定成年人物、人数、发色发长和故事，以简省五官配清楚中细外线，肩胸手部结构自然。浅皮肤与衣料中灰分层，布褶疏朗，周围以更细结构线和低彩材料支撑；眼眉嘴角各有清楚变化，既定动作和接触关系可读。",
  "prompt_core_en": "Preserve the specified adult identities, cast size, hair colors and lengths, and story. Combine simplified facial features with clear medium fine contours and natural shoulder, chest, and hand structure. Separate light skin from middle value fabric using sparse folds. Support the subject with finer structural lines and subdued material colors in the existing setting. Differentiate emotions through readable brows, eyelids, and mouth corners while preserving requested actions and credible contact relationships.",
  "biography": {
    "birth_year": null,
    "death_year": null,
    "region_context": "日本出版社的漫画出版语境；不据此推断国籍或民族。",
    "source_ids": [
      "S1"
    ],
    "ethnicity": {
      "value": null,
      "status": "unknown"
    },
    "note": "使用公开署名；生卒未核保持 null，民族未知。"
  },
  "known_gaps": [
    "实际查看的是四张独立新绘卡的宣传展示，不是第12卷封面或内页。",
    "未读连续内页与作者过程访谈，分镜仅为原创迁移；特典排版不自动归作者。",
    "8维方案、4步骤、评审与提示词为本库原创转译，未实际生成或完成画面一致性验收。"
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
