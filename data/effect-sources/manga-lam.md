# LAM · 本地研究卡快照

来源：human-distillation-lab 工作目录（不假定已提交）。
仅供查阅；出图采用项目内独立转写的线条和明暗方法。

## manga-authors/authors/lam/SKILL.md

---
name: manga-lam
description: "LAM公开漫画／插画研究与原创绘图参谋；适用于角色剪影设计、图形化服装与材质练习；按具体视觉技法编写方案。"
---

# LAM（LAM） · 漫画／插画创作研究卡

限 2024 画集官方 IN01 公开跨页；不扩展至动画作画或全书固定风格。

选材类型：日系插画／同人画师。本轮重点：LAM画集 いかづち；参考年份：2024。官方注明 2024-10-23 发行；2024 为出版年，跨页各作品创作年未逐件核。〔S1〕

方向：图形轮廓与装饰明暗。本卡研究公开作品与方法；绘图配方是本库原创转译，未训练模型、未做出图效果验证。

[100人目录](../../CATALOG.md) · [八维绘画方案](drawing.md) · [绘图提示词](prompts.md) · [结构化记录](manifest.json) · [完整创作流程](../../WORKFLOW.md)

## 适用任务

- 角色剪影设计
- 图形化服装与材质练习

先读取下列研究依据，再从drawing.md选2–3项具体技法，结合项目自己的角色和世界设定，编写原创画面方案。生成时采用prompts.md的通用技法表达，不直接用作者姓名作为画风口令，不假称本人绘制或背书。用户按作者选择风格时，明确作品阶段，把视觉目标拆成可操作的特征；保留项目已有角色设定，不承诺未经实际出图验证的复现精度。

## 本轮公开依据

- 出版社核定首部画集于 2024-10-23 发行，介绍其角色设计及商业主视觉工作。〔source_summary；S1〕
- IN01 跨页两幅造型以白底分离大轮廓，深绿黑色的大曲面衬托浅色肢体，红色与金色为局部强调；圆形单元和曲线构成醒目的外形。只观察此跨页。〔visual_observation；S2〕

绘画／叙事方法或限定画面观察的依据：S2。下述原创配方不代表这些来源逐项规定了所有参数。

## 选材与分工

- LAM画集 いかづち：画集作者、插画与角色设计〔S1, S2〕

## 基本资料

出生年：未知／本轮未核定；逝世年：未知／本轮未核定。

活动／出版语境（非国籍）：日本出版、展览或商业委托语境；本轮不据此推断国籍。民族：未知，不根据姓名或出版地区推断。仅使用公开署名；未核实生卒保持 null，民族未知。 〔S1〕

本次新增研究对象；未复制成其他专家分类条目。

## 缺口

- 只看官方 IN01 跨页，未看全书；不据此宣称所有作品使用同一色板。
- 八维配方、步骤、评审及提示词为本库一般视觉技法的原创转译，不是作者本人规则；未进行生成验收。

## 来源

- **S1** [LAM画集 いかづち 官方介绍](https://pie.co.jp/book/i/5926/) — PIE International；2026-11-01；`page_text`。实际读取正文。只按页面公开信息核对，不推定全部作品的创作日期。 支持：项目署名与年份；发行或展览范围。
- **S2** [LAM画集 いかづち 官方公开图：官方合法预览 IN01（9784756259264.IN01-1-1000x742.jpg）](https://pie.co.jp/wp/wp-content/uploads/2024/09/9784756259264.IN01-1-1000x742.jpg) — PIE International；2026-11-01；`visual_preview`。由官方页面提取图片链接，实际下载至临时目录并通过图像工具查看。定位：官方合法预览 IN01（9784756259264.IN01-1-1000x742.jpg）；不代表通读全册或检查原始图层。 支持：仅此公开图的线形、明暗、色彩与构图观察。


## manga-authors/authors/lam/drawing.md

# LAM（LAM） · 八维绘画方案

以下全部是**本库原创创作转译**，不是作者原话或其全部作品的统一规则。对应公开事实与访问范围见[研究卡](SKILL.md)。先确定所选作品阶段，彩色建议不自动视为作者固定色板。

## 线条

用硬边封闭轮廓统一角色与附属形体，细线只处理接缝和五官，外缘黑度高于内线。

## 形体与人物

成年人体型以长肢与明确关节组织，服装先概括为尖角、圆弧与宽窄对比，不复制样本道具。

## 构图

优先读成一个有空隙的剪影，再用圆弧或重复形组织既定对象，保留充分空白。

## 分镜节奏

漫画转译建议：说明信息时给轮廓完整的镜头，强调段落用少量高反差特写；不是作者惯用分镜的证明。

## 黑白与网点

暗面合并为大面积深色，浅肢体和白空间清楚分开；金属纹样只在局部提亮。

## 环境

背景只保留用户要求的结构线，降低细节密度，让装饰单元与角色不相互吞没。

## 表情动作

以明确眼线和较克制的嘴型维持可读性，关节方向在复杂服饰下仍可辨认。

## 彩色方案

由此跨页转译为深绿黑与白的大色比，红和暗金少量点缀；不是对全书色板的归纳。

## 落地步骤

1. 先画纯黑剪影，给肢体与衣服间保留空隙。
2. 以圆弧和尖角分配宽窄，固定成年人体关节。
3. 压成深、浅两大明度群，再加入少量中灰转折。
4. 最后补小面积红金强调与接缝，检查外形是否仍先于纹样被看见。

## 图像检查

- 远看是否仍能读出完整角色轮廓？
- 重复形是否有大小疏密而非平均铺满？
- 强调色面积是否明显小于主色面积？

## 容易失败的做法

- 把复杂装饰当作唯一特征，忽略剪影。
- 把尖角与圆形均匀堆在全身。


## manga-authors/authors/lam/prompts.md

# LAM（LAM） · 原创绘图提示词

这些是可编辑的起稿模板，未实际出图。比较时统一使用“雨后浮岛港口归还机械鸟”的原创题材。角色设定页只转用形体、线条和黑白处理，不沿用场景镜头；英文版的角色技法段保留中文规格以免未经审核的翻译改变约束。

不要将本页标题或作者姓名一并粘贴到图像生成提示词。需要其他题材时替换角色、场景、行动和情绪，保留所选择的通用技法；既定发色、发长、肤色、衣色与体型优先，冲突技法或色板必须删改；最后执行[连贯性与输出检查](../../WORKFLOW.md)。

## 单幅叙事插画

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 单幅叙事插画。保持既定成年角色与情节，用硬边外轮廓配简省内线，以圆弧和尖角安排宽窄变化。先读清完整剪影，再划分深绿黑与白的大色块，局部红金强调服从眼部焦点。明暗干净、表情明确，周围细节减密并保留呼吸空隙。 不画原作品角色、标志或签名；文字如需出现，保留位置后期排版。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. One narrative illustration. Keep the specified adult character and narrative intact. Combine firm outer contours with economical interior lines, arranging broad curves against restrained angular breaks. Establish a readable silhouette before adding surface detail. Separate deep green black masses from pale areas, then introduce small red and muted gold accents. Keep the eyes readable, preserve open gaps between overlapping forms, and reduce surrounding detail so that decoration supports the focal hierarchy across the requested format. No existing franchise designs, logos or signatures. Reserve any text for later lettering.
```

## 角色三视图

### 中文

```text
角色设定页：同一名成年修理工的正面、右侧面、背面三个完整视图；短发、短外套、工具腰带、工作靴，三视图衣物结构及比例一致。中性站姿、平视、无透视夸张、纯净背景，三个完整身体不重叠。 以下技法服从上述成年角色、服装和站姿约束；只转用造型与画面处理，忽略示例动作和场景：硬边轮廓强于内线，静态成年长肢体块清楚；浅皮肤配深衣黑块，金属窄高光与布面暗部区分。
```

### English / bilingual specification

```text
Character design sheet: front, right-side and rear full-body views of the same adult repair technician, with short hair, a short work jacket, tool belt and work boots. Keep anatomy, garment construction and proportions consistent. Use neutral standing poses, eye-level orthographic views, a plain background and no overlapping figures. Apply the following bilingual line, shape and tone specification subject to the adult character, clothing and neutral pose above; omit any example actions and scene directions: 硬边轮廓强于内线，静态成年长肢体块清楚；浅皮肤配深衣黑块，金属窄高光与布面暗部区分。
```

## 六格漫画页

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 六格漫画页，按日式从右到左、从上到下阅读。格1港口建立空间；格2修理工发现机械鸟；格3检查鸟翅；格4旅人赶来；格5修理工交还鸟；格6鸟起飞，两人目送。每格明确一个动作，角色、工具及场景方向连续。预留空白对话框，文字后期排版；不要生成签名或水印。 将以下技法用于各格，不改变上述事件、格数或顺序：保持既定成年角色与情节，用硬边外轮廓配简省内线，以圆弧和尖角安排宽窄变化。先读清完整剪影，再划分深绿黑与白的大色块，局部红金强调服从眼部焦点。明暗干净、表情明确，周围细节减密并保留呼吸空隙。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. A six-panel manga page, read from right to left and top to bottom. Panel 1 establishes the harbor; 2 the technician discovers the bird; 3 inspects its wing; 4 the traveler arrives; 5 the bird is returned; 6 it flies away as both adults watch. Show one clear action per panel; preserve character, prop and screen-direction continuity. Leave speech balloons empty for later lettering. No signatures or watermarks. Apply the following techniques within each panel without changing the events, panel count or sequence: Keep the specified adult character and narrative intact. Combine firm outer contours with economical interior lines, arranging broad curves against restrained angular breaks. Establish a readable silhouette before adding surface detail. Separate deep green black masses from pale areas, then introduce small red and muted gold accents. Keep the eyes readable, preserve open gaps between overlapping forms, and reduce surrounding detail so that decoration supports the focal hierarchy across the requested format.
```


## manga-authors/authors/lam/manifest.json

{
  "id": "lam",
  "name": "LAM",
  "name_zh": "LAM",
  "name_ja": "LAM",
  "legacy_refs": [],
  "creator_type": "illustrator",
  "family": "图形轮廓与装饰明暗",
  "scope": "限 2024 画集官方 IN01 公开跨页；不扩展至动画作画或全书固定风格。",
  "reference_works": [
    {
      "title": "LAM画集 いかづち",
      "role": "画集作者、插画与角色设计",
      "source_ids": [
        "S1",
        "S2"
      ]
    }
  ],
  "sources": [
    {
      "id": "S1",
      "title": "LAM画集 いかづち 官方介绍",
      "url": "https://pie.co.jp/book/i/5926/",
      "publisher": "PIE International",
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
      "title": "LAM画集 いかづち 官方公开图：官方合法预览 IN01（9784756259264.IN01-1-1000x742.jpg）",
      "url": "https://pie.co.jp/wp/wp-content/uploads/2024/09/9784756259264.IN01-1-1000x742.jpg",
      "publisher": "PIE International",
      "accessed_at": "2026-11-01",
      "access_method": "visual_preview",
      "supports": [
        "仅此公开图的线形、明暗、色彩与构图观察"
      ],
      "access_note": "由官方页面提取图片链接，实际下载至临时目录并通过图像工具查看。定位：官方合法预览 IN01（9784756259264.IN01-1-1000x742.jpg）；不代表通读全册或检查原始图层。"
    }
  ],
  "findings": [
    {
      "text": "出版社核定首部画集于 2024-10-23 发行，介绍其角色设计及商业主视觉工作。",
      "basis": "source_summary",
      "source_ids": [
        "S1"
      ]
    },
    {
      "text": "IN01 跨页两幅造型以白底分离大轮廓，深绿黑色的大曲面衬托浅色肢体，红色与金色为局部强调；圆形单元和曲线构成醒目的外形。只观察此跨页。",
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
    "work": "LAM画集 いかづち",
    "year": 2024,
    "source_ids": [
      "S1"
    ],
    "date_basis": "官方注明 2024-10-23 发行；2024 为出版年，跨页各作品创作年未逐件核。"
  },
  "visual_recipe": {
    "line": "用硬边封闭轮廓统一角色与附属形体，细线只处理接缝和五官，外缘黑度高于内线。",
    "shapes": "成年人体型以长肢与明确关节组织，服装先概括为尖角、圆弧与宽窄对比，不复制样本道具。",
    "composition": "优先读成一个有空隙的剪影，再用圆弧或重复形组织既定对象，保留充分空白。",
    "panel_rhythm": "漫画转译建议：说明信息时给轮廓完整的镜头，强调段落用少量高反差特写；不是作者惯用分镜的证明。",
    "tonal_design": "暗面合并为大面积深色，浅肢体和白空间清楚分开；金属纹样只在局部提亮。",
    "environment": "背景只保留用户要求的结构线，降低细节密度，让装饰单元与角色不相互吞没。",
    "acting": "以明确眼线和较克制的嘴型维持可读性，关节方向在复杂服饰下仍可辨认。",
    "color": "由此跨页转译为深绿黑与白的大色比，红和暗金少量点缀；不是对全书色板的归纳。"
  },
  "sheet_traits_zh": "硬边轮廓强于内线，静态成年长肢体块清楚；浅皮肤配深衣黑块，金属窄高光与布面暗部区分。",
  "drawing_steps": [
    "先画纯黑剪影，给肢体与衣服间保留空隙。",
    "以圆弧和尖角分配宽窄，固定成年人体关节。",
    "压成深、浅两大明度群，再加入少量中灰转折。",
    "最后补小面积红金强调与接缝，检查外形是否仍先于纹样被看见。"
  ],
  "review_checks": [
    "远看是否仍能读出完整角色轮廓？",
    "重复形是否有大小疏密而非平均铺满？",
    "强调色面积是否明显小于主色面积？"
  ],
  "avoid": [
    "把复杂装饰当作唯一特征，忽略剪影。",
    "把尖角与圆形均匀堆在全身。"
  ],
  "best_for": [
    "角色剪影设计",
    "图形化服装与材质练习"
  ],
  "prompt_core_zh": "保持既定成年角色与情节，用硬边外轮廓配简省内线，以圆弧和尖角安排宽窄变化。先读清完整剪影，再划分深绿黑与白的大色块，局部红金强调服从眼部焦点。明暗干净、表情明确，周围细节减密并保留呼吸空隙。",
  "prompt_core_en": "Keep the specified adult character and narrative intact. Combine firm outer contours with economical interior lines, arranging broad curves against restrained angular breaks. Establish a readable silhouette before adding surface detail. Separate deep green black masses from pale areas, then introduce small red and muted gold accents. Keep the eyes readable, preserve open gaps between overlapping forms, and reduce surrounding detail so that decoration supports the focal hierarchy across the requested format.",
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
    "只看官方 IN01 跨页，未看全书；不据此宣称所有作品使用同一色板。",
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
