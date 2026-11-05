# 山本崇一朗 · 本地研究卡快照

来源：human-distillation-lab 工作目录（不假定已提交）。
仅供查阅；出图采用项目内独立转写的线条和明暗方法。

## manga-authors/authors/yamamoto-soichiro/SKILL.md

---
name: manga-yamamoto-soichiro
description: "山本崇一朗公开漫画／插画研究与原创绘图参谋；适用于轻快日常人物造型、简洁表情与物件关系；按具体视觉技法编写方案。"
---

# 山本崇一朗（Soichiro Yamamoto） · 漫画／插画创作研究卡

聚焦《マネマネにちにち 2》日文原版官方封面与出版社书目。只看这一封面，不含连续内页；不使用动画改编图。不采用由其他作者绘画的《からかい上手の（元）高木さん》衍生作封面，也不混用动画设定。

选材类型：当代漫画家。本轮重点：マネマネにちにち 2；参考年份：2025。出版社所列日本原版发行日为2025-09-11；这是卷册出版年，不是每幅画或封面原稿实际绘制日。〔S1, S2〕

方向：日常表情／轻轮廓与家具负形。本卡研究公开作品与方法；绘图配方是本库原创转译，未训练模型、未做出图效果验证。

[100人目录](../../CATALOG.md) · [八维绘画方案](drawing.md) · [绘图提示词](prompts.md) · [结构化记录](manifest.json) · [完整创作流程](../../WORKFLOW.md)

## 适用任务

- 轻快日常人物造型
- 简洁表情与物件关系

先读取下列研究依据，再从drawing.md选2–3项具体技法，结合项目自己的角色和世界设定，编写原创画面方案。生成时采用prompts.md的通用技法表达，不直接用作者姓名作为画风口令，不假称本人绘制或背书。用户按作者选择风格时，明确作品阶段，把视觉目标拆成可操作的特征；保留项目已有角色设定，不承诺未经实际出图验证的复现精度。

## 本轮公开依据

- 漫画作者：山本崇一朗（该卷未另列原作）；出版社列日本原版2025-09-11发行。〔source_summary；S1〕
- 封面三人围桌坐，人物脸部鼻口线很少、嘴型及闭眼弧线直接表达愉快；白上衣与红结、深裙分块，桌椅细直金属框在下半部形成清楚空隙，窗外浅蓝山与绿树对比弱于人物。观察仅此封面，不借学生人数或场景生成新方案。〔visual_observation；S2〕

绘画／叙事方法或限定画面观察的依据：S2。下述原创配方不代表这些来源逐项规定了所有参数。

## 选材与分工

- マネマネにちにち 2：漫画作者：山本崇一朗（该卷未另列原作）〔S1, S2〕

## 基本资料

出生年：未知／本轮未核定；逝世年：未知／本轮未核定。

活动／出版语境（非国籍）：以小学馆公开日文漫画出版署名为活动语境，不据此推定国籍或民族。民族：未知，不根据姓名或出版地区推断。只用公开署名，未核实生卒保持null，民族未知。 〔S1〕

本次新增研究对象；未复制成其他专家分类条目。

## 缺口

- 本轮只观察一张官方封面，未逐页研究内页、长期画风变化、助手分工或作者完整制作流程。
- 八维配方、步骤、检查与提示词均为一般视觉技法的原创组合，分镜建议不冒充作者本人规则。
- 未生成图片，不能据此声称人物一致性、三视图或六格节奏已实测。

## 来源

- **S1** [マネマネにちにち 2：出版社书目](https://shogakukan-comic.jp/book?isbn=9784098542567) — 小学馆；2026-11-01；`page_text`。本轮实际web打开并读取出版社公开书目信息；另获取页面HTML核定主封面地址。未进入账号、付费章节或阅读完整内页。 支持：漫画作者：山本崇一朗（该卷未另列原作）；2025-09-11日本原版出版及卷号。
- **S2** [マネマネにちにち 2：日文原版官方封面](https://shogakukan-comic.jp/book-images/w400/books/9784098542567.jpg) — 小学馆；2026-11-01；`visual_preview`。从上述官方书目提取主封面链接，下载临时缩略图并实际通过view_image查看；未将alt文字当观察。只支持封面可见大关系，文字排版与装帧不自动归漫画作者。 支持：限定这张封面的轮廓、体块、色光与构图观察。


## manga-authors/authors/yamamoto-soichiro/drawing.md

# 山本崇一朗（Soichiro Yamamoto） · 八维绘画方案

以下全部是**本库原创创作转译**，不是作者原话或其全部作品的统一规则。对应公开事实与访问范围见[研究卡](SKILL.md)。先确定所选作品阶段，彩色建议不自动视为作者固定色板。

## 线条

圆转细线维持面部与手的可读性，鼻梁尽量少线，桌边或硬质接口用直线作轻微对照。

## 形体与人物

成年自然比例以圆简胸廓、完整手掌和清楚膝肘搭建，衣料不过度刻肌肉，不沿样本年龄比例。

## 构图

在既定物件之间保留可辨负形，横竖结构围住焦点，避免道具遮住表情与操作接触。

## 分镜节奏

原创迁移建议：先让既定动作读清，再用眉眼和嘴角的小变化形成停顿；不添加新人物或校园事件。

## 黑白与网点

皮肤与浅衣大面积留白，深色块集中在已有衣物局部，投影薄而有方向。

## 环境

用少量硬边说明既定物件，远处形状平整且低彩，不自动加入教室、桌椅或山景。

## 表情动作

眼睛闭合时仍须用眉角和嘴型区别情绪；手掌朝向与所接物体准确吻合。

## 彩色方案

本库建议浅暖肤色与低彩环境配小面积红色强调；取自所见单幅色比，不改变用户既定发色服色。

## 落地步骤

1. 先画既定角色与物件的简洁轮廓，留出手臂间的负形。
2. 用成年关节和手掌校正动作，表情仅保留必要眉眼嘴线。
3. 将浅面连起来，再用少量深块和薄投影分离材料。
4. 降低背景色度，缩图核对目光、嘴型和接触点。

## 图像检查

- 少量面部线是否仍表达了既定情绪？
- 物件之间的空隙是否清楚而非粘成一团？
- 薄阴影是否既能说明体积又未压脏浅面？

## 容易失败的做法

- 以巨大幼态头部代替自然成年结构。
- 把封面桌边多人日常直接移入既定剧情。


## manga-authors/authors/yamamoto-soichiro/prompts.md

# 山本崇一朗（Soichiro Yamamoto） · 原创绘图提示词

这些是可编辑的起稿模板，未实际出图。比较时统一使用“雨后浮岛港口归还机械鸟”的原创题材。角色设定页只转用形体、线条和黑白处理，不沿用场景镜头；英文版的角色技法段保留中文规格以免未经审核的翻译改变约束。

不要将本页标题或作者姓名一并粘贴到图像生成提示词。需要其他题材时替换角色、场景、行动和情绪，保留所选择的通用技法；既定发色、发长、肤色、衣色与体型优先，冲突技法或色板必须删改；最后执行[连贯性与输出检查](../../WORKFLOW.md)。

## 单幅叙事插画

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 单幅叙事插画。保留既定成年角色、发型颜色和人数，用圆转细线、简省鼻口与完整手掌组织自然体块。浅面连续，深色集中在已有衣物，薄投影说明体积；物件间留清楚负形，背景低彩减密，以眉角、嘴型和准确接触关系表现轻快但可读的情绪。 不画原作品角色、标志或签名；文字如需出现，保留位置后期排版。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. One narrative illustration. Keep the specified adult character, hair, cast, and narrative. Combine rounded fine contours, economical facial marks, and complete hand structures with natural proportions. Connect broad pale areas and concentrate dark values within existing clothing. Use thin directional shadows to describe volume, leaving clear negative spaces between forms. Reduce background saturation and detail. Let small changes in brows and mouth shapes express a readable light mood while keeping all intended object contacts physically coherent. No existing franchise designs, logos or signatures. Reserve any text for later lettering.
```

## 角色三视图

### 中文

```text
角色设定页：同一名成年修理工的正面、右侧面、背面三个完整视图；短发、短外套、工具腰带、工作靴，三视图衣物结构及比例一致。中性站姿、平视、无透视夸张、纯净背景，三个完整身体不重叠。 以下技法服从上述成年角色、服装和站姿约束；只转用造型与画面处理，忽略示例动作和场景：圆转细轮廓配少量眉眼鼻口，静态成年体块自然，手掌完整；浅衣留白配薄灰折面，深布黑块局部集中。
```

### English / bilingual specification

```text
Character design sheet: front, right-side and rear full-body views of the same adult repair technician, with short hair, a short work jacket, tool belt and work boots. Keep anatomy, garment construction and proportions consistent. Use neutral standing poses, eye-level orthographic views, a plain background and no overlapping figures. Apply the following bilingual line, shape and tone specification subject to the adult character, clothing and neutral pose above; omit any example actions and scene directions: 圆转细轮廓配少量眉眼鼻口，静态成年体块自然，手掌完整；浅衣留白配薄灰折面，深布黑块局部集中。
```

## 六格漫画页

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 六格漫画页，按日式从右到左、从上到下阅读。格1港口建立空间；格2修理工发现机械鸟；格3检查鸟翅；格4旅人赶来；格5修理工交还鸟；格6鸟起飞，两人目送。每格明确一个动作，角色、工具及场景方向连续。预留空白对话框，文字后期排版；不要生成签名或水印。 将以下技法用于各格，不改变上述事件、格数或顺序：保留既定成年角色、发型颜色和人数，用圆转细线、简省鼻口与完整手掌组织自然体块。浅面连续，深色集中在已有衣物，薄投影说明体积；物件间留清楚负形，背景低彩减密，以眉角、嘴型和准确接触关系表现轻快但可读的情绪。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. A six-panel manga page, read from right to left and top to bottom. Panel 1 establishes the harbor; 2 the technician discovers the bird; 3 inspects its wing; 4 the traveler arrives; 5 the bird is returned; 6 it flies away as both adults watch. Show one clear action per panel; preserve character, prop and screen-direction continuity. Leave speech balloons empty for later lettering. No signatures or watermarks. Apply the following techniques within each panel without changing the events, panel count or sequence: Keep the specified adult character, hair, cast, and narrative. Combine rounded fine contours, economical facial marks, and complete hand structures with natural proportions. Connect broad pale areas and concentrate dark values within existing clothing. Use thin directional shadows to describe volume, leaving clear negative spaces between forms. Reduce background saturation and detail. Let small changes in brows and mouth shapes express a readable light mood while keeping all intended object contacts physically coherent.
```


## manga-authors/authors/yamamoto-soichiro/manifest.json

{
  "id": "yamamoto-soichiro",
  "name": "Soichiro Yamamoto",
  "name_zh": "山本崇一朗",
  "name_ja": "山本崇一朗",
  "legacy_refs": [],
  "legacy_expert_refs": [],
  "creator_type": "manga-artist",
  "family": "日常表情／轻轮廓与家具负形",
  "scope": "聚焦《マネマネにちにち 2》日文原版官方封面与出版社书目。只看这一封面，不含连续内页；不使用动画改编图。不采用由其他作者绘画的《からかい上手の（元）高木さん》衍生作封面，也不混用动画设定。",
  "reference_works": [
    {
      "title": "マネマネにちにち 2",
      "role": "漫画作者：山本崇一朗（该卷未另列原作）",
      "source_ids": [
        "S1",
        "S2"
      ]
    }
  ],
  "sources": [
    {
      "id": "S1",
      "title": "マネマネにちにち 2：出版社书目",
      "url": "https://shogakukan-comic.jp/book?isbn=9784098542567",
      "publisher": "小学馆",
      "accessed_at": "2026-11-01",
      "access_method": "page_text",
      "supports": [
        "漫画作者：山本崇一朗（该卷未另列原作）",
        "2025-09-11日本原版出版及卷号"
      ],
      "access_note": "本轮实际web打开并读取出版社公开书目信息；另获取页面HTML核定主封面地址。未进入账号、付费章节或阅读完整内页。"
    },
    {
      "id": "S2",
      "title": "マネマネにちにち 2：日文原版官方封面",
      "url": "https://shogakukan-comic.jp/book-images/w400/books/9784098542567.jpg",
      "publisher": "小学馆",
      "accessed_at": "2026-11-01",
      "access_method": "visual_preview",
      "supports": [
        "限定这张封面的轮廓、体块、色光与构图观察"
      ],
      "access_note": "从上述官方书目提取主封面链接，下载临时缩略图并实际通过view_image查看；未将alt文字当观察。只支持封面可见大关系，文字排版与装帧不自动归漫画作者。",
      "origin_page_url": "https://shogakukan-comic.jp/book?isbn=9784098542567",
      "observed_asset_sha256": "904af27e668048f46a01dc04f7bfc2c52c42998e76516ab4697bfa17eee5fa39"
    }
  ],
  "findings": [
    {
      "text": "漫画作者：山本崇一朗（该卷未另列原作）；出版社列日本原版2025-09-11发行。",
      "basis": "source_summary",
      "source_ids": [
        "S1"
      ]
    },
    {
      "text": "封面三人围桌坐，人物脸部鼻口线很少、嘴型及闭眼弧线直接表达愉快；白上衣与红结、深裙分块，桌椅细直金属框在下半部形成清楚空隙，窗外浅蓝山与绿树对比弱于人物。观察仅此封面，不借学生人数或场景生成新方案。",
      "basis": "visual_observation",
      "source_ids": [
        "S2"
      ]
    }
  ],
  "visual_recipe": {
    "line": "圆转细线维持面部与手的可读性，鼻梁尽量少线，桌边或硬质接口用直线作轻微对照。",
    "shapes": "成年自然比例以圆简胸廓、完整手掌和清楚膝肘搭建，衣料不过度刻肌肉，不沿样本年龄比例。",
    "composition": "在既定物件之间保留可辨负形，横竖结构围住焦点，避免道具遮住表情与操作接触。",
    "panel_rhythm": "原创迁移建议：先让既定动作读清，再用眉眼和嘴角的小变化形成停顿；不添加新人物或校园事件。",
    "tonal_design": "皮肤与浅衣大面积留白，深色块集中在已有衣物局部，投影薄而有方向。",
    "environment": "用少量硬边说明既定物件，远处形状平整且低彩，不自动加入教室、桌椅或山景。",
    "acting": "眼睛闭合时仍须用眉角和嘴型区别情绪；手掌朝向与所接物体准确吻合。",
    "color": "本库建议浅暖肤色与低彩环境配小面积红色强调；取自所见单幅色比，不改变用户既定发色服色。"
  },
  "drawing_steps": [
    "先画既定角色与物件的简洁轮廓，留出手臂间的负形。",
    "用成年关节和手掌校正动作，表情仅保留必要眉眼嘴线。",
    "将浅面连起来，再用少量深块和薄投影分离材料。",
    "降低背景色度，缩图核对目光、嘴型和接触点。"
  ],
  "review_checks": [
    "少量面部线是否仍表达了既定情绪？",
    "物件之间的空隙是否清楚而非粘成一团？",
    "薄阴影是否既能说明体积又未压脏浅面？"
  ],
  "avoid": [
    "以巨大幼态头部代替自然成年结构。",
    "把封面桌边多人日常直接移入既定剧情。"
  ],
  "best_for": [
    "轻快日常人物造型",
    "简洁表情与物件关系"
  ],
  "prompt_core_zh": "保留既定成年角色、发型颜色和人数，用圆转细线、简省鼻口与完整手掌组织自然体块。浅面连续，深色集中在已有衣物，薄投影说明体积；物件间留清楚负形，背景低彩减密，以眉角、嘴型和准确接触关系表现轻快但可读的情绪。",
  "prompt_core_en": "Keep the specified adult character, hair, cast, and narrative. Combine rounded fine contours, economical facial marks, and complete hand structures with natural proportions. Connect broad pale areas and concentrate dark values within existing clothing. Use thin directional shadows to describe volume, leaving clear negative spaces between forms. Reduce background saturation and detail. Let small changes in brows and mouth shapes express a readable light mood while keeping all intended object contacts physically coherent.",
  "sheet_traits_zh": "圆转细轮廓配少量眉眼鼻口，静态成年体块自然，手掌完整；浅衣留白配薄灰折面，深布黑块局部集中。",
  "method_evidence_source_ids": [
    "S2"
  ],
  "recent_focus": {
    "work": "マネマネにちにち 2",
    "year": 2025,
    "source_ids": [
      "S1",
      "S2"
    ],
    "date_basis": "出版社所列日本原版发行日为2025-09-11；这是卷册出版年，不是每幅画或封面原稿实际绘制日。"
  },
  "biography": {
    "birth_year": null,
    "death_year": null,
    "region_context": "以小学馆公开日文漫画出版署名为活动语境，不据此推定国籍或民族。",
    "source_ids": [
      "S1"
    ],
    "ethnicity": {
      "value": null,
      "status": "unknown"
    },
    "note": "只用公开署名，未核实生卒保持null，民族未知。"
  },
  "known_gaps": [
    "本轮只观察一张官方封面，未逐页研究内页、长期画风变化、助手分工或作者完整制作流程。",
    "八维配方、步骤、检查与提示词均为一般视觉技法的原创组合，分镜建议不冒充作者本人规则。",
    "未生成图片，不能据此声称人物一致性、三视图或六格节奏已实测。"
  ],
  "recipe_basis": "original_synthesis",
  "image_validation": "not-run",
  "schema_version": 1,
  "kind": "manga-author-study",
  "entity_kind": "person",
  "status": "source-grounded-draft",
  "research_date": "2026-11-01",
  "generation_mode": "original-general-techniques"
}
