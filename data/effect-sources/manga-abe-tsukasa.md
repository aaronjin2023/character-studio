# アベツカサ · 本地研究卡快照

来源：human-distillation-lab 工作目录（不假定已提交）。
仅供查阅；出图采用项目内独立转写的线条和明暗方法。

## manga-authors/authors/abe-tsukasa/SKILL.md

---
name: manga-abe-tsukasa
description: "アベツカサ公开漫画／插画研究与原创绘图参谋；适用于安静幻想场景的空间组织、人物与建筑的明度分层；按具体视觉技法编写方案。"
---

# アベツカサ（Tsukasa Abe） · 漫画／插画创作研究卡

聚焦《葬送のフリーレン 14》日文原版官方封面与出版社书目。只看这一封面，不含连续内页；不使用动画改编图。叙事主题与脚本不能全归画者；原作分工另署山田鐘人，成年原创方案不复制封面角色或造型。

选材类型：当代漫画家。本轮重点：葬送のフリーレン 14；参考年份：2025。出版社所列日本原版发行日为2025-03-18；这是卷册出版年，不是每幅画或封面原稿实际绘制日。〔S1, S2〕

方向：幻想空间／安静人物与建筑层次。本卡研究公开作品与方法；绘图配方是本库原创转译，未训练模型、未做出图效果验证。

[100人目录](../../CATALOG.md) · [八维绘画方案](drawing.md) · [绘图提示词](prompts.md) · [结构化记录](manifest.json) · [完整创作流程](../../WORKFLOW.md)

## 适用任务

- 安静幻想场景的空间组织
- 人物与建筑的明度分层

先读取下列研究依据，再从drawing.md选2–3项具体技法，结合项目自己的角色和世界设定，编写原创画面方案。生成时采用prompts.md的通用技法表达，不直接用作者姓名作为画风口令，不假称本人绘制或背书。用户按作者选择风格时，明确作品阶段，把视觉目标拆成可操作的特征；保留项目已有角色设定，不承诺未经实际出图验证的复现精度。

## 本轮公开依据

- 漫画绘画：アベツカサ；原作：山田鐘人；出版社列日本原版2025-03-18发行。〔source_summary；S1〕
- 封面中央浅衣人物在台阶较低处，红衣人物在上方，左右深衣人物形成侧向框架；细直建筑线与拱形窗组织空间，头部和手部的轮廓较简，窗外蓝紫光与烟火状亮点提供背景层次。只支持这张封面的空间及明暗组织，不证明内页节奏。〔visual_observation；S2〕

绘画／叙事方法或限定画面观察的依据：S2。下述原创配方不代表这些来源逐项规定了所有参数。

## 选材与分工

- 葬送のフリーレン 14：漫画绘画：アベツカサ；原作：山田鐘人〔S1, S2〕

## 基本资料

出生年：未知／本轮未核定；逝世年：未知／本轮未核定。

活动／出版语境（非国籍）：以小学馆公开日文漫画出版署名为活动语境，不据此推定国籍或民族。民族：未知，不根据姓名或出版地区推断。只用公开署名，未核实生卒保持null，民族未知。 〔S1〕

本次新增研究对象；未复制成其他专家分类条目。

## 缺口

- 本轮只观察一张官方封面，未逐页研究内页、长期画风变化、助手分工或作者完整制作流程。
- 八维配方、步骤、检查与提示词均为一般视觉技法的原创组合，分镜建议不冒充作者本人规则。
- 未生成图片，不能据此声称人物一致性、三视图或六格节奏已实测。

## 来源

- **S1** [葬送のフリーレン 14：出版社书目](https://shogakukan-comic.jp/book?jdcn=098540170000d0000000) — 小学馆；2026-11-01；`page_text`。本轮实际web打开并读取出版社公开书目信息；另获取页面HTML核定主封面地址。未进入账号、付费章节或阅读完整内页。 支持：漫画绘画：アベツカサ；原作：山田鐘人；2025-03-18日本原版出版及卷号。
- **S2** [葬送のフリーレン 14：日文原版官方封面](https://shogakukan-comic.jp/book-images/w400/books/9784098540174.jpg) — 小学馆；2026-11-01；`visual_preview`。从上述官方书目提取主封面链接，下载临时缩略图并实际通过view_image查看；未将alt文字当观察。只支持封面可见大关系，文字排版与装帧不自动归漫画作者。 支持：限定这张封面的轮廓、体块、色光与构图观察。


## manga-authors/authors/abe-tsukasa/drawing.md

# アベツカサ（Tsukasa Abe） · 八维绘画方案

以下全部是**本库原创创作转译**，不是作者原话或其全部作品的统一规则。对应公开事实与访问范围见[研究卡](SKILL.md)。先确定所选作品阶段，彩色建议不自动视为作者固定色板。

## 线条

人物用连续中细外线，鼻口内线少；建筑细直线比脸部更轻，衣领接缝局部加重。

## 形体与人物

使用既定成年比例，胸廓与骨盆厚度先于披覆衣物；以长短不同的衣料大面组织轮廓，不复制样本服装。

## 构图

用既定主体与物件的前后错层建立深度，脸和手放在不会被建筑线切断的清楚区域。

## 分镜节奏

原创迁移建议：空间信息与细小表情交替，关键变化前保留可读的静止状态；单幅封面不能证明作者分镜规则。

## 黑白与网点

浅人体、衣物中灰与深背景三层；近处衣褶多于远处，黑块之间保留窄亮缝。

## 环境

把用户环境概括成直线结构与少量弧形开口，远处降低对比，不擅自加台阶、拱窗或烟火。

## 表情动作

眼睑、下颌和手指的轻微变化承担情绪，身体重心与脚下接触必须成立。

## 彩色方案

本库从这张封面转译为冷蓝紫空间配少量暖色焦点；不是作者固定色板，人物发色衣色仍服从项目。

## 落地步骤

1. 先标既定主体、物件与背景的前后层，避免结构线穿脸。
2. 搭成年胸廓骨盆，再铺衣料大面，检查承重与接触。
3. 按浅、中、深三群落色，远景线和纹理同时减轻。
4. 只在既定焦点加少量暖色或亮边，缩图检查安静表情是否清楚。

## 图像检查

- 人物脸手是否未被背景细线割碎？
- 衣料之下的成年体块及承重是否成立？
- 转成灰度后前后层是否仍能区分？

## 容易失败的做法

- 用密集建筑线填满所有留白，吞掉人物。
- 复制耳形、帽服或烟火布景来代替通用空间技法。


## manga-authors/authors/abe-tsukasa/prompts.md

# アベツカサ（Tsukasa Abe） · 原创绘图提示词

这些是可编辑的起稿模板，未实际出图。比较时统一使用“雨后浮岛港口归还机械鸟”的原创题材。角色设定页只转用形体、线条和黑白处理，不沿用场景镜头；英文版的角色技法段保留中文规格以免未经审核的翻译改变约束。

不要将本页标题或作者姓名一并粘贴到图像生成提示词。需要其他题材时替换角色、场景、行动和情绪，保留所选择的通用技法；既定发色、发长、肤色、衣色与体型优先，冲突技法或色板必须删改；最后执行[连贯性与输出检查](../../WORKFLOW.md)。

## 单幅叙事插画

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 单幅叙事插画。保持既定成年角色、发色发长和人数，以连续中细轮廓与简省鼻口线建立清楚体块。浅、中、深三群组织前后层，衣褶比远景细线更明确，建筑边缘避开脸手；冷调空间配少量暖色焦点，以克制眼神和稳定承重传达情绪。 不画原作品角色、标志或签名；文字如需出现，保留位置后期排版。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. One narrative illustration. Preserve the specified adult character, hair, cast, and content. Use continuous medium fine contours with economical facial marks over coherent volumes. Organize depth into light, middle, and dark groups, keeping clothing folds clearer than distant structural lines. Prevent background edges from cutting through faces or hands. Balance a cool setting with restrained warm accents near the intended focus. Communicate emotion through readable eyelids, a stable center of gravity, and carefully controlled detail density. No existing franchise designs, logos or signatures. Reserve any text for later lettering.
```

## 角色三视图

### 中文

```text
角色设定页：同一名成年修理工的正面、右侧面、背面三个完整视图；短发、短外套、工具腰带、工作靴，三视图衣物结构及比例一致。中性站姿、平视、无透视夸张、纯净背景，三个完整身体不重叠。 以下技法服从上述成年角色、服装和站姿约束；只转用造型与画面处理，忽略示例动作和场景：连续中细外线配简省鼻口，静态成年胸廓骨盆明确；布料大面分浅中灰，深色连接处成块，材质以接缝区分。
```

### English / bilingual specification

```text
Character design sheet: front, right-side and rear full-body views of the same adult repair technician, with short hair, a short work jacket, tool belt and work boots. Keep anatomy, garment construction and proportions consistent. Use neutral standing poses, eye-level orthographic views, a plain background and no overlapping figures. Apply the following bilingual line, shape and tone specification subject to the adult character, clothing and neutral pose above; omit any example actions and scene directions: 连续中细外线配简省鼻口，静态成年胸廓骨盆明确；布料大面分浅中灰，深色连接处成块，材质以接缝区分。
```

## 六格漫画页

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 六格漫画页，按日式从右到左、从上到下阅读。格1港口建立空间；格2修理工发现机械鸟；格3检查鸟翅；格4旅人赶来；格5修理工交还鸟；格6鸟起飞，两人目送。每格明确一个动作，角色、工具及场景方向连续。预留空白对话框，文字后期排版；不要生成签名或水印。 将以下技法用于各格，不改变上述事件、格数或顺序：保持既定成年角色、发色发长和人数，以连续中细轮廓与简省鼻口线建立清楚体块。浅、中、深三群组织前后层，衣褶比远景细线更明确，建筑边缘避开脸手；冷调空间配少量暖色焦点，以克制眼神和稳定承重传达情绪。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. A six-panel manga page, read from right to left and top to bottom. Panel 1 establishes the harbor; 2 the technician discovers the bird; 3 inspects its wing; 4 the traveler arrives; 5 the bird is returned; 6 it flies away as both adults watch. Show one clear action per panel; preserve character, prop and screen-direction continuity. Leave speech balloons empty for later lettering. No signatures or watermarks. Apply the following techniques within each panel without changing the events, panel count or sequence: Preserve the specified adult character, hair, cast, and content. Use continuous medium fine contours with economical facial marks over coherent volumes. Organize depth into light, middle, and dark groups, keeping clothing folds clearer than distant structural lines. Prevent background edges from cutting through faces or hands. Balance a cool setting with restrained warm accents near the intended focus. Communicate emotion through readable eyelids, a stable center of gravity, and carefully controlled detail density.
```


## manga-authors/authors/abe-tsukasa/manifest.json

{
  "id": "abe-tsukasa",
  "name": "Tsukasa Abe",
  "name_zh": "アベツカサ",
  "name_ja": "アベツカサ",
  "legacy_refs": [],
  "legacy_expert_refs": [],
  "creator_type": "manga-artist",
  "family": "幻想空间／安静人物与建筑层次",
  "scope": "聚焦《葬送のフリーレン 14》日文原版官方封面与出版社书目。只看这一封面，不含连续内页；不使用动画改编图。叙事主题与脚本不能全归画者；原作分工另署山田鐘人，成年原创方案不复制封面角色或造型。",
  "reference_works": [
    {
      "title": "葬送のフリーレン 14",
      "role": "漫画绘画：アベツカサ；原作：山田鐘人",
      "source_ids": [
        "S1",
        "S2"
      ]
    }
  ],
  "sources": [
    {
      "id": "S1",
      "title": "葬送のフリーレン 14：出版社书目",
      "url": "https://shogakukan-comic.jp/book?jdcn=098540170000d0000000",
      "publisher": "小学馆",
      "accessed_at": "2026-11-01",
      "access_method": "page_text",
      "supports": [
        "漫画绘画：アベツカサ；原作：山田鐘人",
        "2025-03-18日本原版出版及卷号"
      ],
      "access_note": "本轮实际web打开并读取出版社公开书目信息；另获取页面HTML核定主封面地址。未进入账号、付费章节或阅读完整内页。"
    },
    {
      "id": "S2",
      "title": "葬送のフリーレン 14：日文原版官方封面",
      "url": "https://shogakukan-comic.jp/book-images/w400/books/9784098540174.jpg",
      "publisher": "小学馆",
      "accessed_at": "2026-11-01",
      "access_method": "visual_preview",
      "supports": [
        "限定这张封面的轮廓、体块、色光与构图观察"
      ],
      "access_note": "从上述官方书目提取主封面链接，下载临时缩略图并实际通过view_image查看；未将alt文字当观察。只支持封面可见大关系，文字排版与装帧不自动归漫画作者。",
      "origin_page_url": "https://shogakukan-comic.jp/book?jdcn=098540170000d0000000",
      "observed_asset_sha256": "a3f39c553ff4d43586259812acbc4444838586aba2b2c55718c1f1d598252229"
    }
  ],
  "findings": [
    {
      "text": "漫画绘画：アベツカサ；原作：山田鐘人；出版社列日本原版2025-03-18发行。",
      "basis": "source_summary",
      "source_ids": [
        "S1"
      ]
    },
    {
      "text": "封面中央浅衣人物在台阶较低处，红衣人物在上方，左右深衣人物形成侧向框架；细直建筑线与拱形窗组织空间，头部和手部的轮廓较简，窗外蓝紫光与烟火状亮点提供背景层次。只支持这张封面的空间及明暗组织，不证明内页节奏。",
      "basis": "visual_observation",
      "source_ids": [
        "S2"
      ]
    }
  ],
  "visual_recipe": {
    "line": "人物用连续中细外线，鼻口内线少；建筑细直线比脸部更轻，衣领接缝局部加重。",
    "shapes": "使用既定成年比例，胸廓与骨盆厚度先于披覆衣物；以长短不同的衣料大面组织轮廓，不复制样本服装。",
    "composition": "用既定主体与物件的前后错层建立深度，脸和手放在不会被建筑线切断的清楚区域。",
    "panel_rhythm": "原创迁移建议：空间信息与细小表情交替，关键变化前保留可读的静止状态；单幅封面不能证明作者分镜规则。",
    "tonal_design": "浅人体、衣物中灰与深背景三层；近处衣褶多于远处，黑块之间保留窄亮缝。",
    "environment": "把用户环境概括成直线结构与少量弧形开口，远处降低对比，不擅自加台阶、拱窗或烟火。",
    "acting": "眼睑、下颌和手指的轻微变化承担情绪，身体重心与脚下接触必须成立。",
    "color": "本库从这张封面转译为冷蓝紫空间配少量暖色焦点；不是作者固定色板，人物发色衣色仍服从项目。"
  },
  "drawing_steps": [
    "先标既定主体、物件与背景的前后层，避免结构线穿脸。",
    "搭成年胸廓骨盆，再铺衣料大面，检查承重与接触。",
    "按浅、中、深三群落色，远景线和纹理同时减轻。",
    "只在既定焦点加少量暖色或亮边，缩图检查安静表情是否清楚。"
  ],
  "review_checks": [
    "人物脸手是否未被背景细线割碎？",
    "衣料之下的成年体块及承重是否成立？",
    "转成灰度后前后层是否仍能区分？"
  ],
  "avoid": [
    "用密集建筑线填满所有留白，吞掉人物。",
    "复制耳形、帽服或烟火布景来代替通用空间技法。"
  ],
  "best_for": [
    "安静幻想场景的空间组织",
    "人物与建筑的明度分层"
  ],
  "prompt_core_zh": "保持既定成年角色、发色发长和人数，以连续中细轮廓与简省鼻口线建立清楚体块。浅、中、深三群组织前后层，衣褶比远景细线更明确，建筑边缘避开脸手；冷调空间配少量暖色焦点，以克制眼神和稳定承重传达情绪。",
  "prompt_core_en": "Preserve the specified adult character, hair, cast, and content. Use continuous medium fine contours with economical facial marks over coherent volumes. Organize depth into light, middle, and dark groups, keeping clothing folds clearer than distant structural lines. Prevent background edges from cutting through faces or hands. Balance a cool setting with restrained warm accents near the intended focus. Communicate emotion through readable eyelids, a stable center of gravity, and carefully controlled detail density.",
  "sheet_traits_zh": "连续中细外线配简省鼻口，静态成年胸廓骨盆明确；布料大面分浅中灰，深色连接处成块，材质以接缝区分。",
  "method_evidence_source_ids": [
    "S2"
  ],
  "recent_focus": {
    "work": "葬送のフリーレン 14",
    "year": 2025,
    "source_ids": [
      "S1",
      "S2"
    ],
    "date_basis": "出版社所列日本原版发行日为2025-03-18；这是卷册出版年，不是每幅画或封面原稿实际绘制日。"
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
