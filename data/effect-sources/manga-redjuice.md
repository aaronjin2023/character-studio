# redjuice · 本地研究卡快照

来源：human-distillation-lab 工作目录（不假定已提交）。
仅供查阅；出图采用项目内独立转写的线条和明暗方法。

## manga-authors/authors/redjuice/SKILL.md

---
name: manga-redjuice
description: "redjuice公开漫画／插画研究与原创绘图参谋；适用于商业角色材质表现、银灰与半透明服装练习；按具体视觉技法编写方案。"
---

# redjuice（redjuice） · 漫画／插画创作研究卡

聚焦 2025 MI:IM 特设页 pic-01 主图及画集信息；旧商业项目不全部计为 2025 创作。

选材类型：日系插画／同人画师。本轮重点：MI:IM；参考年份：2025。官方特设记发行 2025-09-09；2025 为画集出版年，主图准确绘制日期未核。〔S1〕

方向：硬质反光与细密材质。本卡研究公开作品与方法；绘图配方是本库原创转译，未训练模型、未做出图效果验证。

[100人目录](../../CATALOG.md) · [八维绘画方案](drawing.md) · [绘图提示词](prompts.md) · [结构化记录](manifest.json) · [完整创作流程](../../WORKFLOW.md)

## 适用任务

- 商业角色材质表现
- 银灰与半透明服装练习

先读取下列研究依据，再从drawing.md选2–3项具体技法，结合项目自己的角色和世界设定，编写原创画面方案。生成时采用prompts.md的通用技法表达，不直接用作者姓名作为画风口令，不假称本人绘制或背书。用户按作者选择风格时，明确作品阶段，把视觉目标拆成可操作的特征；保留项目已有角色设定，不承诺未经实际出图验证的复现精度。

## 本轮公开依据

- 特设页核定玄光社 2025 年发行、208 页，收录商业插画、衣装设定与草图；作者声明提及跨媒介工作及技术探索。〔source_summary；S1〕
- pic-01 主图中亮银发与黑色高领形成强对照，冷紫半透明衣料有硬边白亮斑，织物、网纹与金属分别有不同纹理尺度，红线作为局部强调。只观察主图，不验证软件或材质算法。〔visual_observation；S2〕

绘画／叙事方法或限定画面观察的依据：S2。下述原创配方不代表这些来源逐项规定了所有参数。

## 选材与分工

- MI:IM：插画作者、角色设计；原项目另有团队〔S1, S2〕

## 基本资料

出生年：未知／本轮未核定；逝世年：未知／本轮未核定。

活动／出版语境（非国籍）：日本出版、展览或商业委托语境；本轮不据此推断国籍。民族：未知，不根据姓名或出版地区推断。仅使用公开署名；未核实生卒保持 null，民族未知。 〔S1〕

本次新增研究对象；未复制成其他专家分类条目。

## 缺口

- 实际只查看特设主图；未读完整画集，不能确定此图的 3D 辅助或绘制软件。
- 色彩、背景美术、印刷及原商业项目均可能涉及协作，未将全部成果归为单人。
- 八维配方、步骤、评审及提示词为本库一般视觉技法的原创转译，不是作者本人规则；未进行生成验收。

## 来源

- **S1** [MI:IM 官方介绍](https://uncron.com/miim/) — redjuice 官方画集特设／玄光社；2026-11-01；`page_text`。实际读取正文。只按页面公开信息核对，不推定全部作品的创作日期。 支持：项目署名与年份；发行或展览范围。
- **S2** [MI:IM 官方公开图：画集特设主图 img/pic-01.webp](https://uncron.com/miim/img/pic-01.webp) — redjuice 官方画集特设／玄光社；2026-11-01；`visual_preview`。由官方页面提取图片链接，实际下载至临时目录并通过图像工具查看。定位：画集特设主图 img/pic-01.webp；不代表通读全册或检查原始图层。 支持：仅此公开图的线形、明暗、色彩与构图观察。


## manga-authors/authors/redjuice/drawing.md

# redjuice（redjuice） · 八维绘画方案

以下全部是**本库原创创作转译**，不是作者原话或其全部作品的统一规则。对应公开事实与访问范围见[研究卡](SKILL.md)。先确定所选作品阶段，彩色建议不自动视为作者固定色板。

## 线条

以干净中细轮廓建立材料边界，金属亮边细而硬，半透明材料的内缘用较弱线。

## 形体与人物

成年人物以清楚肩胸和四肢体块支撑层叠服装；硬部件形状服从关节，不能用纹理掩盖结构。

## 构图

主角亮面集中在头部与指定信息区，后方用简洁大块分离，材料细节按焦点分级。

## 分镜节奏

漫画转译建议：先交代整体体积，再展示关键接口或表情；同一材料的反光在连续镜头中保持光向一致。

## 黑白与网点

大黑块与小而硬的亮面分开，中灰承载半透明层；纹理放在所属明度群内，不平均提亮。

## 环境

背景使用用户要求的空间结构，图形化处理仅为减噪，不自动添加科幻标识或武器。

## 表情动作

表情微小变化须保持嘴角、下眼睑与瞳孔一致，面部亮斑不可遮掉表情信息。

## 彩色方案

由此主图转译为银灰、蓝紫和深黑，红色细线少量强调；不把高反光概括为全生涯固定方法。

## 落地步骤

1. 先以灰度固定成年结构、深色服装与脸部亮区。
2. 分别标出金属、织物和半透明材料的边缘规则。
3. 统一光向后画硬亮斑与中灰透叠，最后添加低对比纹理。
4. 缩小检查反光是否仍服务面部与既定焦点。

## 图像检查

- 至少三种材料是否能靠边缘和亮面区分？
- 所有反光是否服从同一主光？
- 去除纹理后人物体积是否仍完整？

## 容易失败的做法

- 在每个面都铺强反光造成塑料混质感。
- 照搬原图的配件、纹章、角色或武器。


## manga-authors/authors/redjuice/prompts.md

# redjuice（redjuice） · 原创绘图提示词

这些是可编辑的起稿模板，未实际出图。比较时统一使用“雨后浮岛港口归还机械鸟”的原创题材。角色设定页只转用形体、线条和黑白处理，不沿用场景镜头；英文版的角色技法段保留中文规格以免未经审核的翻译改变约束。

不要将本页标题或作者姓名一并粘贴到图像生成提示词。需要其他题材时替换角色、场景、行动和情绪，保留所选择的通用技法；既定发色、发长、肤色、衣色与体型优先，冲突技法或色板必须删改；最后执行[连贯性与输出检查](../../WORKFLOW.md)。

## 单幅叙事插画

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 单幅叙事插画。沿用既定成年角色与物件，以中细轮廓稳定体块，深色连成大黑区，银灰浅面集中在既定焦点。用硬窄亮边说明金属，以中灰透叠说明半透明衣料，织物纹理保持低对比；蓝紫冷调配少量红色细线，表情清楚，细节按主次递减。 不画原作品角色、标志或签名；文字如需出现，保留位置后期排版。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. One narrative illustration. Preserve the specified adult character and objects. Stabilize volumes with clean medium fine contours and connected dark masses, reserving silver gray light planes for the intended focus. Describe metal with hard narrow highlights, translucent fabric with layered middle values, and textiles with restrained surface contrast. Balance cool blue violet against sparse red line accents. Maintain one consistent light direction, keep facial information clear, and reduce material detail away from the focal hierarchy. No existing franchise designs, logos or signatures. Reserve any text for later lettering.
```

## 角色三视图

### 中文

```text
角色设定页：同一名成年修理工的正面、右侧面、背面三个完整视图；短发、短外套、工具腰带、工作靴，三视图衣物结构及比例一致。中性站姿、平视、无透视夸张、纯净背景，三个完整身体不重叠。 以下技法服从上述成年角色、服装和站姿约束；只转用造型与画面处理，忽略示例动作和场景：中细外线稳定成年体块，深衣形成连续黑区；皮肤浅灰、金属硬亮边、半透明衣料中灰透叠分别处理。
```

### English / bilingual specification

```text
Character design sheet: front, right-side and rear full-body views of the same adult repair technician, with short hair, a short work jacket, tool belt and work boots. Keep anatomy, garment construction and proportions consistent. Use neutral standing poses, eye-level orthographic views, a plain background and no overlapping figures. Apply the following bilingual line, shape and tone specification subject to the adult character, clothing and neutral pose above; omit any example actions and scene directions: 中细外线稳定成年体块，深衣形成连续黑区；皮肤浅灰、金属硬亮边、半透明衣料中灰透叠分别处理。
```

## 六格漫画页

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 六格漫画页，按日式从右到左、从上到下阅读。格1港口建立空间；格2修理工发现机械鸟；格3检查鸟翅；格4旅人赶来；格5修理工交还鸟；格6鸟起飞，两人目送。每格明确一个动作，角色、工具及场景方向连续。预留空白对话框，文字后期排版；不要生成签名或水印。 将以下技法用于各格，不改变上述事件、格数或顺序：沿用既定成年角色与物件，以中细轮廓稳定体块，深色连成大黑区，银灰浅面集中在既定焦点。用硬窄亮边说明金属，以中灰透叠说明半透明衣料，织物纹理保持低对比；蓝紫冷调配少量红色细线，表情清楚，细节按主次递减。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. A six-panel manga page, read from right to left and top to bottom. Panel 1 establishes the harbor; 2 the technician discovers the bird; 3 inspects its wing; 4 the traveler arrives; 5 the bird is returned; 6 it flies away as both adults watch. Show one clear action per panel; preserve character, prop and screen-direction continuity. Leave speech balloons empty for later lettering. No signatures or watermarks. Apply the following techniques within each panel without changing the events, panel count or sequence: Preserve the specified adult character and objects. Stabilize volumes with clean medium fine contours and connected dark masses, reserving silver gray light planes for the intended focus. Describe metal with hard narrow highlights, translucent fabric with layered middle values, and textiles with restrained surface contrast. Balance cool blue violet against sparse red line accents. Maintain one consistent light direction, keep facial information clear, and reduce material detail away from the focal hierarchy.
```


## manga-authors/authors/redjuice/manifest.json

{
  "id": "redjuice",
  "name": "redjuice",
  "name_zh": "redjuice",
  "name_ja": "redjuice",
  "legacy_refs": [],
  "creator_type": "illustrator",
  "family": "硬质反光与细密材质",
  "scope": "聚焦 2025 MI:IM 特设页 pic-01 主图及画集信息；旧商业项目不全部计为 2025 创作。",
  "reference_works": [
    {
      "title": "MI:IM",
      "role": "插画作者、角色设计；原项目另有团队",
      "source_ids": [
        "S1",
        "S2"
      ]
    }
  ],
  "sources": [
    {
      "id": "S1",
      "title": "MI:IM 官方介绍",
      "url": "https://uncron.com/miim/",
      "publisher": "redjuice 官方画集特设／玄光社",
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
      "title": "MI:IM 官方公开图：画集特设主图 img/pic-01.webp",
      "url": "https://uncron.com/miim/img/pic-01.webp",
      "publisher": "redjuice 官方画集特设／玄光社",
      "accessed_at": "2026-11-01",
      "access_method": "visual_preview",
      "supports": [
        "仅此公开图的线形、明暗、色彩与构图观察"
      ],
      "access_note": "由官方页面提取图片链接，实际下载至临时目录并通过图像工具查看。定位：画集特设主图 img/pic-01.webp；不代表通读全册或检查原始图层。"
    }
  ],
  "findings": [
    {
      "text": "特设页核定玄光社 2025 年发行、208 页，收录商业插画、衣装设定与草图；作者声明提及跨媒介工作及技术探索。",
      "basis": "source_summary",
      "source_ids": [
        "S1"
      ]
    },
    {
      "text": "pic-01 主图中亮银发与黑色高领形成强对照，冷紫半透明衣料有硬边白亮斑，织物、网纹与金属分别有不同纹理尺度，红线作为局部强调。只观察主图，不验证软件或材质算法。",
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
    "work": "MI:IM",
    "year": 2025,
    "source_ids": [
      "S1"
    ],
    "date_basis": "官方特设记发行 2025-09-09；2025 为画集出版年，主图准确绘制日期未核。"
  },
  "visual_recipe": {
    "line": "以干净中细轮廓建立材料边界，金属亮边细而硬，半透明材料的内缘用较弱线。",
    "shapes": "成年人物以清楚肩胸和四肢体块支撑层叠服装；硬部件形状服从关节，不能用纹理掩盖结构。",
    "composition": "主角亮面集中在头部与指定信息区，后方用简洁大块分离，材料细节按焦点分级。",
    "panel_rhythm": "漫画转译建议：先交代整体体积，再展示关键接口或表情；同一材料的反光在连续镜头中保持光向一致。",
    "tonal_design": "大黑块与小而硬的亮面分开，中灰承载半透明层；纹理放在所属明度群内，不平均提亮。",
    "environment": "背景使用用户要求的空间结构，图形化处理仅为减噪，不自动添加科幻标识或武器。",
    "acting": "表情微小变化须保持嘴角、下眼睑与瞳孔一致，面部亮斑不可遮掉表情信息。",
    "color": "由此主图转译为银灰、蓝紫和深黑，红色细线少量强调；不把高反光概括为全生涯固定方法。"
  },
  "sheet_traits_zh": "中细外线稳定成年体块，深衣形成连续黑区；皮肤浅灰、金属硬亮边、半透明衣料中灰透叠分别处理。",
  "drawing_steps": [
    "先以灰度固定成年结构、深色服装与脸部亮区。",
    "分别标出金属、织物和半透明材料的边缘规则。",
    "统一光向后画硬亮斑与中灰透叠，最后添加低对比纹理。",
    "缩小检查反光是否仍服务面部与既定焦点。"
  ],
  "review_checks": [
    "至少三种材料是否能靠边缘和亮面区分？",
    "所有反光是否服从同一主光？",
    "去除纹理后人物体积是否仍完整？"
  ],
  "avoid": [
    "在每个面都铺强反光造成塑料混质感。",
    "照搬原图的配件、纹章、角色或武器。"
  ],
  "best_for": [
    "商业角色材质表现",
    "银灰与半透明服装练习"
  ],
  "prompt_core_zh": "沿用既定成年角色与物件，以中细轮廓稳定体块，深色连成大黑区，银灰浅面集中在既定焦点。用硬窄亮边说明金属，以中灰透叠说明半透明衣料，织物纹理保持低对比；蓝紫冷调配少量红色细线，表情清楚，细节按主次递减。",
  "prompt_core_en": "Preserve the specified adult character and objects. Stabilize volumes with clean medium fine contours and connected dark masses, reserving silver gray light planes for the intended focus. Describe metal with hard narrow highlights, translucent fabric with layered middle values, and textiles with restrained surface contrast. Balance cool blue violet against sparse red line accents. Maintain one consistent light direction, keep facial information clear, and reduce material detail away from the focal hierarchy.",
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
    "实际只查看特设主图；未读完整画集，不能确定此图的 3D 辅助或绘制软件。",
    "色彩、背景美术、印刷及原商业项目均可能涉及协作，未将全部成果归为单人。",
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
