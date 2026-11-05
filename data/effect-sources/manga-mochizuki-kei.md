# 望月けい · 本地研究卡快照

来源：human-distillation-lab 工作目录（不假定已提交）。
仅供查阅；出图采用项目内独立转写的线条和明暗方法。

## manga-authors/authors/mochizuki-kei/SKILL.md

---
name: manga-mochizuki-kei
description: "望月けい公开漫画／插画研究与原创绘图参谋；适用于限色角色海报、克制而尖锐的表情练习；按具体视觉技法编写方案。"
---

# 望月けい（Kei Mochizuki） · 漫画／插画创作研究卡

聚焦 2025 俗世展览官方主视觉，不复制原人物、手势或环绕物。

选材类型：日系插画／同人画师。本轮重点：俗世；参考年份：2025。官方展期 2025-11-21 至 12-15，称含为本展新绘数十幅；2025 为展览年，主视觉准确落笔日期未知。〔S1〕

方向：锐利线描与限色张力。本卡研究公开作品与方法；绘图配方是本库原创转译，未训练模型、未做出图效果验证。

[100人目录](../../CATALOG.md) · [八维绘画方案](drawing.md) · [绘图提示词](prompts.md) · [结构化记录](manifest.json) · [完整创作流程](../../WORKFLOW.md)

## 适用任务

- 限色角色海报
- 克制而尖锐的表情练习

先读取下列研究依据，再从drawing.md选2–3项具体技法，结合项目自己的角色和世界设定，编写原创画面方案。生成时采用prompts.md的通用技法表达，不直接用作者姓名作为画风口令，不假称本人绘制或背书。用户按作者选择风格时，明确作品阶段，把视觉目标拆成可操作的特征；保留项目已有角色设定，不承诺未经实际出图验证的复现精度。

## 本轮公开依据

- PARCO 核定 2025 第二次个展，约百件作品，含本展新绘作品及既有商业、个人作品。〔source_summary；S1〕
- 主视觉以灰色皮肤与黑发为主体，饱和红色环绕形与白色碎片形成强对比；眼睛直视，眼睑、下睫与脸部线条比鼻口更密。只支持此主视觉。〔visual_observation；S2〕

绘画／叙事方法或限定画面观察的依据：S2。下述原创配方不代表这些来源逐项规定了所有参数。

## 选材与分工

- 俗世：展览艺术家、插画与角色设计〔S1, S2〕

## 基本资料

出生年：未知／本轮未核定；逝世年：未知／本轮未核定。

活动／出版语境（非国籍）：日本出版、展览或商业委托语境；本轮不据此推断国籍。民族：未知，不根据姓名或出版地区推断。仅使用公开署名；未核实生卒保持 null，民族未知。 〔S1〕

本次新增研究对象；未复制成其他专家分类条目。

## 缺口

- 只看主视觉，未逐件观察展览百件作品；没有作者逐笔过程来源。
- 八维配方、步骤、评审及提示词为本库一般视觉技法的原创转译，不是作者本人规则；未进行生成验收。

## 来源

- **S1** [俗世 官方介绍](https://art.parco.jp/parcomuseum/detail/?id=1798) — PARCO ART；2026-11-01；`page_text`。实际读取正文。只按页面公开信息核对，不推定全部作品的创作日期。 支持：项目署名与年份；发行或展览范围。
- **S2** [俗世 官方公开图：页面主视觉 cname_20250916182347.jpg；含 ZOKUSE EXHIBITION 2025 字样](https://art.parco.jp/img/hq/store/storage/w750xh750/cname_20250916182347.jpg) — PARCO ART；2026-11-01；`visual_preview`。由官方页面提取图片链接，实际下载至临时目录并通过图像工具查看。定位：页面主视觉 cname_20250916182347.jpg；含 ZOKUSE EXHIBITION 2025 字样；不代表通读全册或检查原始图层。 支持：仅此公开图的线形、明暗、色彩与构图观察。


## manga-authors/authors/mochizuki-kei/drawing.md

# 望月けい（Kei Mochizuki） · 八维绘画方案

以下全部是**本库原创创作转译**，不是作者原话或其全部作品的统一规则。对应公开事实与访问范围见[研究卡](SKILL.md)。先确定所选作品阶段，彩色建议不自动视为作者固定色板。

## 线条

外线明确而少圆滑修饰，眼睑和发根适度加黑，皮肤内线减少到能说明骨面的数量。

## 形体与人物

成年人物用窄长脸、清楚颧面与节制的手部关节塑形，夸张只留在比例关系而非照搬造型。

## 构图

主角头部周围保留亮暗分离区，用斜向块面压近焦点，不借额外人物堆叠紧张感。

## 分镜节奏

漫画转译建议：建立视线后用局部静止反应停顿，重黑段落与留白段落交替；并非作者分镜证据。

## 黑白与网点

灰阶人体与纯黑、纯白构成基础，单一强调色只占有方向性的块面，阴影边缘保持清楚。

## 环境

既定背景压成黑白结构或低彩纹理，环境信息不能穿入眼睛和口鼻的识别区。

## 表情动作

眼睑下压、瞳孔位置、嘴部闭合度分别检查；情绪可冷静尖锐，不靠所有器官同时夸大。

## 彩色方案

由本次主视觉转译为灰黑白配一类饱和红，禁止将展览红色当作作者永久色板。

## 落地步骤

1. 在既定构图中先画头部周围的黑白负形。
2. 建立成年脸与手部骨面，再决定眼睑线重。
3. 灰阶完成后只分配一类强调色，不新增叙事物件。
4. 缩小检查视线与嘴型，清掉压住焦点的碎片。

## 图像检查

- 眼部的浓线是否未吞掉瞳孔？
- 强调色是否有主方向且没有均匀撒满？
- 去掉强调色后黑白关系是否仍成立？

## 容易失败的做法

- 复制主视觉的特殊环绕手势与原角色。
- 所有皮肤结构都用等粗黑线画满。


## manga-authors/authors/mochizuki-kei/prompts.md

# 望月けい（Kei Mochizuki） · 原创绘图提示词

这些是可编辑的起稿模板，未实际出图。比较时统一使用“雨后浮岛港口归还机械鸟”的原创题材。角色设定页只转用形体、线条和黑白处理，不沿用场景镜头；英文版的角色技法段保留中文规格以免未经审核的翻译改变约束。

不要将本页标题或作者姓名一并粘贴到图像生成提示词。需要其他题材时替换角色、场景、行动和情绪，保留所选择的通用技法；既定发色、发长、肤色、衣色与体型优先，冲突技法或色板必须删改；最后执行[连贯性与输出检查](../../WORKFLOW.md)。

## 单幅叙事插画

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 单幅叙事插画。保持既定成年人物、道具和情节，以利落外线、加重眼睑和简省皮肤内线建立造型。灰阶体块与纯黑白形成清楚分区，单一饱和红只承担局部强调。用负形和斜向块面把注意力集中到眼部，嘴型克制，情绪冷静而有张力。 不画原作品角色、标志或签名；文字如需出现，保留位置后期排版。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. One narrative illustration. Keep the specified adult character, objects, and narrative unchanged. Use decisive contours, heavier eyelids, and sparse skin interior lines to establish clear facial planes. Organize the image through gray volumes and strong black white separations, with one saturated red accent family. Let negative spaces and directional value shapes concentrate attention near the eyes. Keep the mouth restrained and the expression tense yet controlled, adapting framing to the requested format without importing additional imagery. No existing franchise designs, logos or signatures. Reserve any text for later lettering.
```

## 角色三视图

### 中文

```text
角色设定页：同一名成年修理工的正面、右侧面、背面三个完整视图；短发、短外套、工具腰带、工作靴，三视图衣物结构及比例一致。中性站姿、平视、无透视夸张、纯净背景，三个完整身体不重叠。 以下技法服从上述成年角色、服装和站姿约束；只转用造型与画面处理，忽略示例动作和场景：利落外线与加重眼睑区分层级，静态成年骨面清楚；皮肤灰面平整，深衣连成黑块，少量白边隔开材质。
```

### English / bilingual specification

```text
Character design sheet: front, right-side and rear full-body views of the same adult repair technician, with short hair, a short work jacket, tool belt and work boots. Keep anatomy, garment construction and proportions consistent. Use neutral standing poses, eye-level orthographic views, a plain background and no overlapping figures. Apply the following bilingual line, shape and tone specification subject to the adult character, clothing and neutral pose above; omit any example actions and scene directions: 利落外线与加重眼睑区分层级，静态成年骨面清楚；皮肤灰面平整，深衣连成黑块，少量白边隔开材质。
```

## 六格漫画页

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 六格漫画页，按日式从右到左、从上到下阅读。格1港口建立空间；格2修理工发现机械鸟；格3检查鸟翅；格4旅人赶来；格5修理工交还鸟；格6鸟起飞，两人目送。每格明确一个动作，角色、工具及场景方向连续。预留空白对话框，文字后期排版；不要生成签名或水印。 将以下技法用于各格，不改变上述事件、格数或顺序：保持既定成年人物、道具和情节，以利落外线、加重眼睑和简省皮肤内线建立造型。灰阶体块与纯黑白形成清楚分区，单一饱和红只承担局部强调。用负形和斜向块面把注意力集中到眼部，嘴型克制，情绪冷静而有张力。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. A six-panel manga page, read from right to left and top to bottom. Panel 1 establishes the harbor; 2 the technician discovers the bird; 3 inspects its wing; 4 the traveler arrives; 5 the bird is returned; 6 it flies away as both adults watch. Show one clear action per panel; preserve character, prop and screen-direction continuity. Leave speech balloons empty for later lettering. No signatures or watermarks. Apply the following techniques within each panel without changing the events, panel count or sequence: Keep the specified adult character, objects, and narrative unchanged. Use decisive contours, heavier eyelids, and sparse skin interior lines to establish clear facial planes. Organize the image through gray volumes and strong black white separations, with one saturated red accent family. Let negative spaces and directional value shapes concentrate attention near the eyes. Keep the mouth restrained and the expression tense yet controlled, adapting framing to the requested format without importing additional imagery.
```


## manga-authors/authors/mochizuki-kei/manifest.json

{
  "id": "mochizuki-kei",
  "name": "Kei Mochizuki",
  "name_zh": "望月けい",
  "name_ja": "望月けい",
  "legacy_refs": [],
  "creator_type": "illustrator",
  "family": "锐利线描与限色张力",
  "scope": "聚焦 2025 俗世展览官方主视觉，不复制原人物、手势或环绕物。",
  "reference_works": [
    {
      "title": "俗世",
      "role": "展览艺术家、插画与角色设计",
      "source_ids": [
        "S1",
        "S2"
      ]
    }
  ],
  "sources": [
    {
      "id": "S1",
      "title": "俗世 官方介绍",
      "url": "https://art.parco.jp/parcomuseum/detail/?id=1798",
      "publisher": "PARCO ART",
      "accessed_at": "2026-11-01",
      "access_method": "page_text",
      "supports": [
        "项目署名与年份",
        "发行或展览范围"
      ],
      "access_note": "实际读取正文。只按页面公开信息核对，不推定全部作品的创作日期。"
    },
    {
      "id": "S2",
      "title": "俗世 官方公开图：页面主视觉 cname_20250916182347.jpg；含 ZOKUSE EXHIBITION 2025 字样",
      "url": "https://art.parco.jp/img/hq/store/storage/w750xh750/cname_20250916182347.jpg",
      "publisher": "PARCO ART",
      "accessed_at": "2026-11-01",
      "access_method": "visual_preview",
      "supports": [
        "仅此公开图的线形、明暗、色彩与构图观察"
      ],
      "access_note": "由官方页面提取图片链接，实际下载至临时目录并通过图像工具查看。定位：页面主视觉 cname_20250916182347.jpg；含 ZOKUSE EXHIBITION 2025 字样；不代表通读全册或检查原始图层。"
    }
  ],
  "findings": [
    {
      "text": "PARCO 核定 2025 第二次个展，约百件作品，含本展新绘作品及既有商业、个人作品。",
      "basis": "source_summary",
      "source_ids": [
        "S1"
      ]
    },
    {
      "text": "主视觉以灰色皮肤与黑发为主体，饱和红色环绕形与白色碎片形成强对比；眼睛直视，眼睑、下睫与脸部线条比鼻口更密。只支持此主视觉。",
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
    "work": "俗世",
    "year": 2025,
    "source_ids": [
      "S1"
    ],
    "date_basis": "官方展期 2025-11-21 至 12-15，称含为本展新绘数十幅；2025 为展览年，主视觉准确落笔日期未知。"
  },
  "visual_recipe": {
    "line": "外线明确而少圆滑修饰，眼睑和发根适度加黑，皮肤内线减少到能说明骨面的数量。",
    "shapes": "成年人物用窄长脸、清楚颧面与节制的手部关节塑形，夸张只留在比例关系而非照搬造型。",
    "composition": "主角头部周围保留亮暗分离区，用斜向块面压近焦点，不借额外人物堆叠紧张感。",
    "panel_rhythm": "漫画转译建议：建立视线后用局部静止反应停顿，重黑段落与留白段落交替；并非作者分镜证据。",
    "tonal_design": "灰阶人体与纯黑、纯白构成基础，单一强调色只占有方向性的块面，阴影边缘保持清楚。",
    "environment": "既定背景压成黑白结构或低彩纹理，环境信息不能穿入眼睛和口鼻的识别区。",
    "acting": "眼睑下压、瞳孔位置、嘴部闭合度分别检查；情绪可冷静尖锐，不靠所有器官同时夸大。",
    "color": "由本次主视觉转译为灰黑白配一类饱和红，禁止将展览红色当作作者永久色板。"
  },
  "sheet_traits_zh": "利落外线与加重眼睑区分层级，静态成年骨面清楚；皮肤灰面平整，深衣连成黑块，少量白边隔开材质。",
  "drawing_steps": [
    "在既定构图中先画头部周围的黑白负形。",
    "建立成年脸与手部骨面，再决定眼睑线重。",
    "灰阶完成后只分配一类强调色，不新增叙事物件。",
    "缩小检查视线与嘴型，清掉压住焦点的碎片。"
  ],
  "review_checks": [
    "眼部的浓线是否未吞掉瞳孔？",
    "强调色是否有主方向且没有均匀撒满？",
    "去掉强调色后黑白关系是否仍成立？"
  ],
  "avoid": [
    "复制主视觉的特殊环绕手势与原角色。",
    "所有皮肤结构都用等粗黑线画满。"
  ],
  "best_for": [
    "限色角色海报",
    "克制而尖锐的表情练习"
  ],
  "prompt_core_zh": "保持既定成年人物、道具和情节，以利落外线、加重眼睑和简省皮肤内线建立造型。灰阶体块与纯黑白形成清楚分区，单一饱和红只承担局部强调。用负形和斜向块面把注意力集中到眼部，嘴型克制，情绪冷静而有张力。",
  "prompt_core_en": "Keep the specified adult character, objects, and narrative unchanged. Use decisive contours, heavier eyelids, and sparse skin interior lines to establish clear facial planes. Organize the image through gray volumes and strong black white separations, with one saturated red accent family. Let negative spaces and directional value shapes concentrate attention near the eyes. Keep the mouth restrained and the expression tense yet controlled, adapting framing to the requested format without importing additional imagery.",
  "biography": {
    "birth_year": null,
    "death_year": null,
    "region_context": "日本出版、展览或商业委托语境；本轮不据此推断国籍。",
    "source_ids": [
      "S1"
    ],
    "ethnicity": {
      "value": null,
      "status": "unknown"
    },
    "note": "仅使用公开署名；未核实生卒保持 null，民族未知。"
  },
  "known_gaps": [
    "只看主视觉，未逐件观察展览百件作品；没有作者逐笔过程来源。",
    "八维配方、步骤、评审及提示词为本库一般视觉技法的原创转译，不是作者本人规则；未进行生成验收。"
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
