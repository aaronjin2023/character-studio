# 深崎暮人 · 本地研究卡快照

来源：human-distillation-lab 工作目录（不假定已提交）。
仅供查阅；出图采用项目内独立转写的线条和明暗方法。

## manga-authors/authors/misaki-kurehito/SKILL.md

---
name: manga-misaki-kurehito
description: "深崎暮人公开漫画／插画研究与原创绘图参谋；适用于成年原创角色造型与材质练习、同一角色三视图的线条和色块控制、既定故事的彩色插画／连续页转译；按具体视觉技法编写方案。"
---

# 深崎暮人（Kurehito Misaki） · 漫画／插画创作研究卡

本轮主要视觉研究限定于冴えない彼女の育てかた 深崎暮人画集 下 Fine.（2022）封面；仅核公开封面／宣传图及明示样图。其余履历来源只证明职业与署名，不借动画成片代替个人画作。八维配方、步骤、评审与提示词均为本库原创技法转译，不是本人逐笔规则。

选材类型：日系插画／同人画师。本轮重点：冴えない彼女の育てかた 深崎暮人画集 下 Fine.（2022）封面；参考年份：2022。对应出版社记录的书籍／宣传发布日期；不将作品集出版年当成全部收录画作的创作年，也不声称是2026最新画风。〔S2, S3〕

方向：柔亮肖像与衣料。本卡研究公开作品与方法；绘图配方是本库原创转译，未训练模型、未做出图效果验证。

[100人目录](../../CATALOG.md) · [八维绘画方案](drawing.md) · [绘图提示词](prompts.md) · [结构化记录](manifest.json) · [完整创作流程](../../WORKFLOW.md)

## 适用任务

- 成年原创角色造型与材质练习
- 同一角色三视图的线条和色块控制
- 既定故事的彩色插画／连续页转译

先读取下列研究依据，再从drawing.md选2–3项具体技法，结合项目自己的角色和世界设定，编写原创画面方案。生成时采用prompts.md的通用技法表达，不直接用作者姓名作为画风口令，不假称本人绘制或背书。用户按作者选择风格时，明确作品阶段，把视觉目标拆成可操作的特征；保留项目已有角色设定，不承诺未经实际出图验证的复现精度。

## 本轮公开依据

- 2024启动IP角色考案、设计；2025年4月25日书籍化〔source_summary；S1〕
- 封面以居中的半身人物为主，紫灰发束、暖粉面颊和白色衬衣分层；领部灰紫薄布与散在前方的虚化白花共同包围脸，衣料阴影透亮，未见大块纯黑背景。〔visual_observation；S3〕

绘画／叙事方法或限定画面观察的依据：S3。下述原创配方不代表这些来源逐项规定了所有参数。

## 选材与分工

- 冴えない彼女の育てかた 深崎暮人画集 下 Fine.（2022）封面：插画／角色视觉创作；书籍文字、编辑、装帧与动画协作另有署名，不并入个人作画〔S2, S3〕

## 基本资料

出生年：未知／本轮未核定；逝世年：未知／本轮未核定。

活动／出版语境（非国籍）：已核日本商业出版／项目或展览语境；本轮未核国籍、民族或居住地，不据姓名推断。民族：未知，不根据姓名或出版地区推断。仅记录公开创作者署名与已核出版／活动地区，未知生日和生卒为null；不据姓名、国籍推民族。 〔S1〕

本次新增研究对象；未复制成其他专家分类条目。

## 缺口

- 只核本条明示公开图像，没有通读完整画集或逐年比较全部时期；未承诺精确复刻。
- 作者原始上色与出版物装帧、文字、印刷呈色未逐项拆分，因此背景排版和标题字体不视为个人固定风格。
- 原创技法转译未通过真实生成样张验收；三视图只用sheet_traits_zh的静态特征，不能照搬封面透视。

## 来源

- **S1** [「深崎暮人×TSUTAYA IP書店プロジェクト Produced by TO BOOKS」特設サイト](https://www.tobooks.jp/misakikurehito/) — TO Books；2026-11-01；`page_text`。实际web检索或打开所列官方／出版社供稿页面；本轮候选阶段不声称已看作品图像或读画集内页。 支持：2024启动IP角色考案、设计；2025年4月25日书籍化；官方项目明确角色考案、角色设计与2025书籍化；文字另署铃木大辅，不把插画者当小说作者。。
- **S2** [冴えない彼女の育てかた 深崎暮人画集 下 Fine.](https://www.kadokawa.co.jp/product/321912000717/) — KADOKAWA；2026-11-01；`page_text`。实际读取官方页面公开文字／HTML；未阅读全书。 支持：2022年5月2日发布；深崎暮人画集，丸户史明为小说原作者。。
- **S3** [冴えない彼女の育てかた 深崎暮人画集 下 Fine.（2022）封面：官方封面／宣传图](https://cdn.kdkw.jp/cover_1000/321912/321912000717.webp) — TO Books；2026-11-01；`visual_preview`。从已核定官方页面 https://www.kadokawa.co.jp/product/321912000717/ 的HTML提取实际图像URL，临时保存至/tmp并通过view_image查看。只核这张图；没有下载图片入库，没有将页面alt当视觉观察。 支持：封面以居中的半身人物为主，紫灰发束、暖粉面颊和白色衬衣分层；领部灰紫薄布与散在前方的虚化白花共同包围脸，衣料阴影透亮，未见大块纯黑背景。。


## manga-authors/authors/misaki-kurehito/drawing.md

# 深崎暮人（Kurehito Misaki） · 八维绘画方案

以下全部是**本库原创创作转译**，不是作者原话或其全部作品的统一规则。对应公开事实与访问范围见[研究卡](SKILL.md)。先确定所选作品阶段，彩色建议不自动视为作者固定色板。

## 线条

面部线轻，发束边缘清楚，薄布褶使用低反差细线

## 形体与人物

成人头颈与胸廓比例自然，衣领和薄布不掩盖肩部位置

## 构图

让清楚面部与外围柔化形状相对，既有动作留在明亮区域

## 分镜节奏

本库原创建议：整体关系、领口和手部细节、目光停顿、整体余韵

## 黑白与网点

大白面维持明度，深值仅留发根与服装交叠，避免满面灰

## 环境

外围可用低对比色块制造空气感，主体边界仍完整

## 表情动作

嘴角小幅张合、面颊轻暖，眼神先保持稳定再改变

## 彩色方案

本库建议灰紫阴影、暖粉肤色与象牙白衣料；仅受该封面启发

## 落地步骤

1. 先按既定人物与道具搭静态体块：成人头颈与胸廓比例自然，衣领和薄布不掩盖肩部位置；检查同一人物辨识点。
2. 用三阶缩略图确定主次：让清楚面部与外围柔化形状相对，既有动作留在明亮区域，再落实大白面维持明度，深值仅留发根与服装交叠，避免满面灰。
3. 按材质分层描线：面部线轻，发束边缘清楚，薄布褶使用低反差细线；检查外围可用低对比色块制造空气感，主体边界仍完整。
4. 最后校对表演与色域：嘴角小幅张合、面颊轻暖，眼神先保持稳定再改变；按“本库建议灰紫阴影、暖粉肤色与象牙白衣料；仅受该封面启发”做原创小色稿，连续页采用独立节奏建议。

## 图像检查

- 浅衣与浅底是否靠低反差阴影仍能分开？
- 外围柔化之后，眼睛、嘴角和领部接触边是否仍有清楚焦点？
- 灰紫暗面是否保留透亮感，而非给整张脸覆盖粉灰滤镜？

## 容易失败的做法

- 模糊滤镜同时覆盖五官和领口，导致焦点不清。
- 浅色薄布用浓黑褶线描满，失去透明轻量的材质层级。


## manga-authors/authors/misaki-kurehito/prompts.md

# 深崎暮人（Kurehito Misaki） · 原创绘图提示词

这些是可编辑的起稿模板，未实际出图。比较时统一使用“雨后浮岛港口归还机械鸟”的原创题材。角色设定页只转用形体、线条和黑白处理，不沿用场景镜头；英文版的角色技法段保留中文规格以免未经审核的翻译改变约束。

不要将本页标题或作者姓名一并粘贴到图像生成提示词。需要其他题材时替换角色、场景、行动和情绪，保留所选择的通用技法；既定发色、发长、肤色、衣色与体型优先，冲突技法或色板必须删改；最后执行[连贯性与输出检查](../../WORKFLOW.md)。

## 单幅叙事插画

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 单幅叙事插画。原创视觉技法：面部线轻，发束边缘清楚，薄布褶使用低反差细线；成人头颈与胸廓比例自然，衣领和薄布不掩盖肩部位置；大白面维持明度，深值仅留发根与服装交叠，避免满面灰。保留既定人物、场景和剧情，只迁移技法。 不画原作品角色、标志或签名；文字如需出现，保留位置后期排版。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. One narrative illustration. Keep facial lines light and hair groups clearly separated. Use natural adult neck and shoulder structure beneath softly folded fabric. Preserve broad pale clothing areas, concentrating deeper values at roots and overlaps. Surround the existing focal face with quieter softened shapes while retaining crisp essential edges. Combine muted violet shadows with restrained warm skin. Preserve all supplied identities, props, and actions without adding another narrative. No existing franchise designs, logos or signatures. Reserve any text for later lettering.
```

## 角色三视图

### 中文

```text
角色设定页：同一名成年修理工的正面、右侧面、背面三个完整视图；短发、短外套、工具腰带、工作靴，三视图衣物结构及比例一致。中性站姿、平视、无透视夸张、纯净背景，三个完整身体不重叠。 以下技法服从上述成年角色、服装和站姿约束；只转用造型与画面处理，忽略示例动作和场景：轻面线配清楚发束，成人肩颈胸廓自然；薄布用低反差褶线，白衣大面透亮，发根与交叠处少量深灰。
```

### English / bilingual specification

```text
Character design sheet: front, right-side and rear full-body views of the same adult repair technician, with short hair, a short work jacket, tool belt and work boots. Keep anatomy, garment construction and proportions consistent. Use neutral standing poses, eye-level orthographic views, a plain background and no overlapping figures. Apply the following bilingual line, shape and tone specification subject to the adult character, clothing and neutral pose above; omit any example actions and scene directions: 轻面线配清楚发束，成人肩颈胸廓自然；薄布用低反差褶线，白衣大面透亮，发根与交叠处少量深灰。
```

## 六格漫画页

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 六格漫画页，按日式从右到左、从上到下阅读。格1港口建立空间；格2修理工发现机械鸟；格3检查鸟翅；格4旅人赶来；格5修理工交还鸟；格6鸟起飞，两人目送。每格明确一个动作，角色、工具及场景方向连续。预留空白对话框，文字后期排版；不要生成签名或水印。 将以下技法用于各格，不改变上述事件、格数或顺序：原创视觉技法：面部线轻，发束边缘清楚，薄布褶使用低反差细线；成人头颈与胸廓比例自然，衣领和薄布不掩盖肩部位置；大白面维持明度，深值仅留发根与服装交叠，避免满面灰。保留既定人物、场景和剧情，只迁移技法。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. A six-panel manga page, read from right to left and top to bottom. Panel 1 establishes the harbor; 2 the technician discovers the bird; 3 inspects its wing; 4 the traveler arrives; 5 the bird is returned; 6 it flies away as both adults watch. Show one clear action per panel; preserve character, prop and screen-direction continuity. Leave speech balloons empty for later lettering. No signatures or watermarks. Apply the following techniques within each panel without changing the events, panel count or sequence: Keep facial lines light and hair groups clearly separated. Use natural adult neck and shoulder structure beneath softly folded fabric. Preserve broad pale clothing areas, concentrating deeper values at roots and overlaps. Surround the existing focal face with quieter softened shapes while retaining crisp essential edges. Combine muted violet shadows with restrained warm skin. Preserve all supplied identities, props, and actions without adding another narrative.
```


## manga-authors/authors/misaki-kurehito/manifest.json

{
  "id": "misaki-kurehito",
  "name": "Kurehito Misaki",
  "name_zh": "深崎暮人",
  "name_ja": "深崎暮人",
  "legacy_refs": [],
  "creator_type": "illustrator",
  "family": "柔亮肖像与衣料",
  "scope": "本轮主要视觉研究限定于冴えない彼女の育てかた 深崎暮人画集 下 Fine.（2022）封面；仅核公开封面／宣传图及明示样图。其余履历来源只证明职业与署名，不借动画成片代替个人画作。八维配方、步骤、评审与提示词均为本库原创技法转译，不是本人逐笔规则。",
  "reference_works": [
    {
      "title": "冴えない彼女の育てかた 深崎暮人画集 下 Fine.（2022）封面",
      "role": "插画／角色视觉创作；书籍文字、编辑、装帧与动画协作另有署名，不并入个人作画",
      "source_ids": [
        "S2",
        "S3"
      ]
    }
  ],
  "sources": [
    {
      "id": "S1",
      "title": "「深崎暮人×TSUTAYA IP書店プロジェクト Produced by TO BOOKS」特設サイト",
      "url": "https://www.tobooks.jp/misakikurehito/",
      "publisher": "TO Books",
      "accessed_at": "2026-11-01",
      "access_method": "page_text",
      "supports": [
        "2024启动IP角色考案、设计；2025年4月25日书籍化",
        "官方项目明确角色考案、角色设计与2025书籍化；文字另署铃木大辅，不把插画者当小说作者。"
      ],
      "access_note": "实际web检索或打开所列官方／出版社供稿页面；本轮候选阶段不声称已看作品图像或读画集内页。"
    },
    {
      "id": "S2",
      "title": "冴えない彼女の育てかた 深崎暮人画集 下 Fine.",
      "url": "https://www.kadokawa.co.jp/product/321912000717/",
      "publisher": "KADOKAWA",
      "accessed_at": "2026-11-01",
      "access_method": "page_text",
      "supports": [
        "2022年5月2日发布；深崎暮人画集，丸户史明为小说原作者。"
      ],
      "access_note": "实际读取官方页面公开文字／HTML；未阅读全书。"
    },
    {
      "id": "S3",
      "title": "冴えない彼女の育てかた 深崎暮人画集 下 Fine.（2022）封面：官方封面／宣传图",
      "url": "https://cdn.kdkw.jp/cover_1000/321912/321912000717.webp",
      "publisher": "TO Books",
      "accessed_at": "2026-11-01",
      "access_method": "visual_preview",
      "supports": [
        "封面以居中的半身人物为主，紫灰发束、暖粉面颊和白色衬衣分层；领部灰紫薄布与散在前方的虚化白花共同包围脸，衣料阴影透亮，未见大块纯黑背景。"
      ],
      "access_note": "从已核定官方页面 https://www.kadokawa.co.jp/product/321912000717/ 的HTML提取实际图像URL，临时保存至/tmp并通过view_image查看。只核这张图；没有下载图片入库，没有将页面alt当视觉观察。",
      "origin_page_url": "https://www.kadokawa.co.jp/product/321912000717/",
      "observed_asset_sha256": "e4241cfa4cc6d5d958f1dce1a5c71a2f1a24ded635ba3127147f47ba9eb2dd98"
    }
  ],
  "findings": [
    {
      "text": "2024启动IP角色考案、设计；2025年4月25日书籍化",
      "basis": "source_summary",
      "source_ids": [
        "S1"
      ]
    },
    {
      "text": "封面以居中的半身人物为主，紫灰发束、暖粉面颊和白色衬衣分层；领部灰紫薄布与散在前方的虚化白花共同包围脸，衣料阴影透亮，未见大块纯黑背景。",
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
    "work": "冴えない彼女の育てかた 深崎暮人画集 下 Fine.（2022）封面",
    "year": 2022,
    "source_ids": [
      "S2",
      "S3"
    ],
    "date_basis": "对应出版社记录的书籍／宣传发布日期；不将作品集出版年当成全部收录画作的创作年，也不声称是2026最新画风。"
  },
  "visual_recipe": {
    "line": "面部线轻，发束边缘清楚，薄布褶使用低反差细线",
    "shapes": "成人头颈与胸廓比例自然，衣领和薄布不掩盖肩部位置",
    "composition": "让清楚面部与外围柔化形状相对，既有动作留在明亮区域",
    "panel_rhythm": "本库原创建议：整体关系、领口和手部细节、目光停顿、整体余韵",
    "tonal_design": "大白面维持明度，深值仅留发根与服装交叠，避免满面灰",
    "environment": "外围可用低对比色块制造空气感，主体边界仍完整",
    "acting": "嘴角小幅张合、面颊轻暖，眼神先保持稳定再改变",
    "color": "本库建议灰紫阴影、暖粉肤色与象牙白衣料；仅受该封面启发"
  },
  "sheet_traits_zh": "轻面线配清楚发束，成人肩颈胸廓自然；薄布用低反差褶线，白衣大面透亮，发根与交叠处少量深灰。",
  "drawing_steps": [
    "先按既定人物与道具搭静态体块：成人头颈与胸廓比例自然，衣领和薄布不掩盖肩部位置；检查同一人物辨识点。",
    "用三阶缩略图确定主次：让清楚面部与外围柔化形状相对，既有动作留在明亮区域，再落实大白面维持明度，深值仅留发根与服装交叠，避免满面灰。",
    "按材质分层描线：面部线轻，发束边缘清楚，薄布褶使用低反差细线；检查外围可用低对比色块制造空气感，主体边界仍完整。",
    "最后校对表演与色域：嘴角小幅张合、面颊轻暖，眼神先保持稳定再改变；按“本库建议灰紫阴影、暖粉肤色与象牙白衣料；仅受该封面启发”做原创小色稿，连续页采用独立节奏建议。"
  ],
  "review_checks": [
    "浅衣与浅底是否靠低反差阴影仍能分开？",
    "外围柔化之后，眼睛、嘴角和领部接触边是否仍有清楚焦点？",
    "灰紫暗面是否保留透亮感，而非给整张脸覆盖粉灰滤镜？"
  ],
  "avoid": [
    "模糊滤镜同时覆盖五官和领口，导致焦点不清。",
    "浅色薄布用浓黑褶线描满，失去透明轻量的材质层级。"
  ],
  "best_for": [
    "成年原创角色造型与材质练习",
    "同一角色三视图的线条和色块控制",
    "既定故事的彩色插画／连续页转译"
  ],
  "prompt_core_zh": "原创视觉技法：面部线轻，发束边缘清楚，薄布褶使用低反差细线；成人头颈与胸廓比例自然，衣领和薄布不掩盖肩部位置；大白面维持明度，深值仅留发根与服装交叠，避免满面灰。保留既定人物、场景和剧情，只迁移技法。",
  "prompt_core_en": "Keep facial lines light and hair groups clearly separated. Use natural adult neck and shoulder structure beneath softly folded fabric. Preserve broad pale clothing areas, concentrating deeper values at roots and overlaps. Surround the existing focal face with quieter softened shapes while retaining crisp essential edges. Combine muted violet shadows with restrained warm skin. Preserve all supplied identities, props, and actions without adding another narrative.",
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
