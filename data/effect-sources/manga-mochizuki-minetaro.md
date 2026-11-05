# 望月峰太郎 · 本地研究卡快照

来源：human-distillation-lab 工作目录（不假定已提交）。
仅供查阅；出图采用项目内独立转写的线条和明暗方法。

## manga-authors/authors/mochizuki-minetaro/SKILL.md

---
name: manga-mochizuki-minetaro
description: "望月峰太郎公开漫画／插画研究与原创绘图参谋；适用于平涂日常人物、连续轮廓与低密度风景；按具体视觉技法编写方案。"
---

# 望月峰太郎（Minetaro Mochizuki） · 漫画／插画创作研究卡

本轮重点为《ちいさこべえ 第3卷》的公开封面／主视觉及对应书目；旧作品研究另留在 archive 初稿，不能把不同时期合成固定画风。下列绘画方案为本库原创转译，封面观察不证明连续内页的分镜规律。

选材类型：当代漫画家。本轮重点：ちいさこべえ 第3卷；参考年份：2014。本次出版社页明确第3卷2014年电子出版，不能据此证明封面原稿绘制日；不是《Dragon Head》近期重版。〔RECENT1, RECENT2〕

方向：情感与日常。本卡研究公开作品与方法；绘图配方是本库原创转译，未训练模型、未做出图效果验证。

[100人目录](../../CATALOG.md) · [八维绘画方案](drawing.md) · [绘图提示词](prompts.md) · [结构化记录](manifest.json) · [完整创作流程](../../WORKFLOW.md)

## 适用任务

- 平涂日常人物
- 连续轮廓与低密度风景

先读取下列研究依据，再从drawing.md选2–3项具体技法，结合项目自己的角色和世界设定，编写原创画面方案。生成时采用prompts.md的通用技法表达，不直接用作者姓名作为画风口令，不假称本人绘制或背书。用户按作者选择风格时，明确作品阶段，把视觉目标拆成可操作的特征；保留项目已有角色设定，不承诺未经实际出图验证的复现精度。

## 本轮公开依据

- 本次出版社页明确第3卷2014年电子出版，不能据此证明封面原稿绘制日；不是《Dragon Head》近期重版；署名分工：漫画改编与绘画：望月ミネタロウ；原作：山本周五郎〔source_summary；RECENT1〕
- 封面长发胡须人物穿简单T恤并背紫色背包，轮廓连贯而内线少；墨镜、胡须和树林形成深块，灰绿衣面与浅蓝天大面积平涂，几乎无强烈渐变。〔visual_observation；RECENT2〕

绘画／叙事方法或限定画面观察的依据：RECENT2。下述原创配方不代表这些来源逐项规定了所有参数。

## 选材与分工

- ちいさこべえ 第3卷：漫画改编与绘画：望月ミネタロウ；原作：山本周五郎〔RECENT1, RECENT2〕

## 基本资料

出生年：未知／本轮未核定；逝世年：未知／本轮未核定。

活动／出版语境（非国籍）：Kodansha的漫画出版或公开机构介绍语境；不推断民族。民族：未知，不根据姓名或出版地区推断。本轮不采集私人生活；未核生卒保持null。 〔S1〕

本次新增研究对象；未复制成其他专家分类条目。

## 缺口

- 本轮新阶段视觉观察限所列单图；未逐章核内页节奏、助手分工和长期画风变化。
- 原版出版或项目发布年份不等于每一笔原稿的绘制日期；具体日期边界见recent_focus。
- 本库8维方案、步骤和提示词属于原创转译，尚未用真实生成图验证一致性。

## 来源

- **S1** [Dragon Head – Kodansha – By Minetaro Mochizuki](https://kodansha.us/series/dragon-head/) — Kodansha；2026-11-01；`search_excerpt`。早期研究对照：实际web检索得到该URL与摘要/展开片段；未查看漫画内页、付费内容或色稿。可证明出版身份与简介，不能证明具体分镜和笔法。 支持：出版社列Minetaro Mochizuki为作者，简介以隧道脱轨与幸存者缺乏光和食物后的心理压力为核心。。
- **S2** [Dragon Head 1英译新版封面，ISBN 9781647294946：官方公开图像](https://images2.penguinrandomhouse.com/cover/9781647294946) — Penguin Random House／Kodansha发行记录；2026-11-01；`visual_preview`。早期研究对照：从公开页面 https://www.penguinrandomhouse.com/series/HDJ/dragon-head/ 的HTML明确提取图像URL，下载到自有/tmp后实际通过view_image查看。定位：Dragon Head 1英译新版封面，ISBN 9781647294946。仅查看这一封面/展示图，未阅读内页；未将HTML alt当作视觉证据。 支持：两名人物低身回望，夸张瞳孔与汗滴可读，前景手臂向下形成三角支撑；蓝色人物、橙色头发和灰白碎裂背景分层。这是新版封面配色，不能证实内页黑量比例。。
- **RECENT1** [ちいさこべえ 第3卷：官方书目／项目页](https://shogakukan-comic.jp/book?isbn=9784091861375) — 小学館；2026-11-01；`page_text`。本轮核对公开书目／项目文字；时间含义见date_basis，不表示通读作品。 支持：所选作品署名与版本范围；本次出版社页明确第3卷2014年电子出版，不能据此证明封面原稿绘制日；不是《Dragon Head》近期重版。
- **RECENT2** [ちいさこべえ 第3卷：已观察的公开图像](https://shogakukan-comic.jp/book-images/w400/digital/091861370000d0000000.jpg) — 小学館；2026-11-01；`visual_preview`。实际通过图像工具查看此公开封面／主视觉，未观察整卷内页；周围排版、字体与出版设计不自动归作者。 支持：限定单幅公开图像的形体、线条、色块与构图观察。


## manga-authors/authors/mochizuki-minetaro/drawing.md

# 望月峰太郎（Minetaro Mochizuki） · 八维绘画方案

以下全部是**本库原创创作转译**，不是作者原话或其全部作品的统一规则。对应公开事实与访问范围见[研究卡](SKILL.md)。先确定所选作品阶段，彩色建议不自动视为作者固定色板。

## 线条

外轮廓连续清楚，衣服内线少，发须主要按大块。

## 形体与人物

自然成年日常体型，肩颈和背带说明衣物重量。

## 构图

把安静人物置在有层次的普通风景前，手中物不能隐入大暗发块。

## 分镜节奏

原创分镜建议：先交代空间，再给道具与手部动作，接人物反应，最后显示动作结果；不是由单幅封面推得的作者分镜规律。

## 黑白与网点

既定发须、衣服和天空用不同明度组织，纹理密度服从空间层级。

## 环境

树群或建筑用较平整形状表达远近，场景不过度写实噪声。

## 表情动作

平静姿势和小角度转头传递关系，动作强度保持日常。

## 彩色方案

本库原创色彩转译：灰绿、紫灰与浅蓝平涂，减少剧烈光影。；只借所见单图的配色关系，不称固定作者色板。

## 落地步骤

1. 先以本项目故事画三张小构图，应用：把安静人物置在有层次的普通风景前，手中物不能隐入大暗发块。
2. 确认成年人物和原创衣物的结构：自然成年日常体型，肩颈和背带说明衣物重量。 再核对手与道具接触。
3. 按材质分层落线：外轮廓连续清楚，衣服内线少，发须主要按大块。 环境处理：树群或建筑用较平整形状表达远近，场景不过度写实噪声。
4. 最后以灰阶缩图核对：既定发须、衣服和天空用不同明度组织，纹理密度服从空间层级。 彩色版再应用：本库原创色彩转译：灰绿、紫灰与浅蓝平涂，减少剧烈光影。；只借所见单图的配色关系，不称固定作者色板。

## 图像检查

- 缩至缩略图时，主动作和手中物是否仍先于装饰可见？
- 人物结构与所选处理是否兼容：自然成年日常体型，肩颈和背带说明衣物重量。
- 灰阶检查能否区分脸、手、衣物与背景：既定发须、衣服和天空用不同明度组织，纹理密度服从空间层级。
- 用于连续页时，是否保持原故事人数、动作顺序、服装与道具方向？

## 容易失败的做法

- 把这张封面的观察当成整部作品、所有时期或全部分镜的定律。
- 把原封面人物、专属服饰、标志和签名带入原创角色；或把书封排版视为作者本人绘画。


## manga-authors/authors/mochizuki-minetaro/prompts.md

# 望月峰太郎（Minetaro Mochizuki） · 原创绘图提示词

这些是可编辑的起稿模板，未实际出图。比较时统一使用“雨后浮岛港口归还机械鸟”的原创题材。角色设定页只转用形体、线条和黑白处理，不沿用场景镜头；英文版的角色技法段保留中文规格以免未经审核的翻译改变约束。

不要将本页标题或作者姓名一并粘贴到图像生成提示词。需要其他题材时替换角色、场景、行动和情绪，保留所选择的通用技法；既定发色、发长、肤色、衣色与体型优先，冲突技法或色板必须删改；最后执行[连贯性与输出检查](../../WORKFLOW.md)。

## 单幅叙事插画

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 单幅叙事插画。用连贯外轮廓和少量内线处理成年人物，发须以大暗块为主；日常衣服与背带结构明确，灰绿、紫灰和浅蓝分成平面，环境线密度低，气氛来自姿态和间距。 不画原作品角色、标志或签名；文字如需出现，保留位置后期排版。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. One narrative illustration. Use continuous outer contours and sparse internal lines for adult figures, grouping hair into large dark shapes. Clarify everyday clothing and straps, divide gray-green, muted purple and pale blue into flat areas, and let posture and spacing carry mood. No existing franchise designs, logos or signatures. Reserve any text for later lettering.
```

## 角色三视图

### 中文

```text
角色设定页：同一名成年修理工的正面、右侧面、背面三个完整视图；短发、短外套、工具腰带、工作靴，三视图衣物结构及比例一致。中性站姿、平视、无透视夸张、纯净背景，三个完整身体不重叠。 以下技法服从上述成年角色、服装和站姿约束；只转用造型与画面处理，忽略示例动作和场景：成年头身与姿态自然，发须按大块组织，T恤和腰带衣缝少而清晰；色块平整，无夸张肌肉刻线。
```

### English / bilingual specification

```text
Character design sheet: front, right-side and rear full-body views of the same adult repair technician, with short hair, a short work jacket, tool belt and work boots. Keep anatomy, garment construction and proportions consistent. Use neutral standing poses, eye-level orthographic views, a plain background and no overlapping figures. Apply the following bilingual line, shape and tone specification subject to the adult character, clothing and neutral pose above; omit any example actions and scene directions: 成年头身与姿态自然，发须按大块组织，T恤和腰带衣缝少而清晰；色块平整，无夸张肌肉刻线。
```

## 六格漫画页

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 六格漫画页，按日式从右到左、从上到下阅读。格1港口建立空间；格2修理工发现机械鸟；格3检查鸟翅；格4旅人赶来；格5修理工交还鸟；格6鸟起飞，两人目送。每格明确一个动作，角色、工具及场景方向连续。预留空白对话框，文字后期排版；不要生成签名或水印。 将以下技法用于各格，不改变上述事件、格数或顺序：用连贯外轮廓和少量内线处理成年人物，发须以大暗块为主；日常衣服与背带结构明确，灰绿、紫灰和浅蓝分成平面，环境线密度低，气氛来自姿态和间距。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. A six-panel manga page, read from right to left and top to bottom. Panel 1 establishes the harbor; 2 the technician discovers the bird; 3 inspects its wing; 4 the traveler arrives; 5 the bird is returned; 6 it flies away as both adults watch. Show one clear action per panel; preserve character, prop and screen-direction continuity. Leave speech balloons empty for later lettering. No signatures or watermarks. Apply the following techniques within each panel without changing the events, panel count or sequence: Use continuous outer contours and sparse internal lines for adult figures, grouping hair into large dark shapes. Clarify everyday clothing and straps, divide gray-green, muted purple and pale blue into flat areas, and let posture and spacing carry mood.
```


## manga-authors/authors/mochizuki-minetaro/manifest.json

{
  "id": "mochizuki-minetaro",
  "name": "Minetaro Mochizuki",
  "name_zh": "望月峰太郎",
  "legacy_refs": [],
  "name_ja": "望月峯太郎",
  "family": "情感与日常",
  "scope": "本轮重点为《ちいさこべえ 第3卷》的公开封面／主视觉及对应书目；旧作品研究另留在 archive 初稿，不能把不同时期合成固定画风。下列绘画方案为本库原创转译，封面观察不证明连续内页的分镜规律。",
  "reference_works": [
    {
      "title": "ちいさこべえ 第3卷",
      "role": "漫画改编与绘画：望月ミネタロウ；原作：山本周五郎",
      "source_ids": [
        "RECENT1",
        "RECENT2"
      ]
    }
  ],
  "sources": [
    {
      "id": "S1",
      "title": "Dragon Head – Kodansha – By Minetaro Mochizuki",
      "url": "https://kodansha.us/series/dragon-head/",
      "publisher": "Kodansha",
      "accessed_at": "2026-11-01",
      "access_method": "search_excerpt",
      "supports": [
        "出版社列Minetaro Mochizuki为作者，简介以隧道脱轨与幸存者缺乏光和食物后的心理压力为核心。"
      ],
      "access_note": "早期研究对照：实际web检索得到该URL与摘要/展开片段；未查看漫画内页、付费内容或色稿。可证明出版身份与简介，不能证明具体分镜和笔法。",
      "context": "historical_reference"
    },
    {
      "id": "S2",
      "title": "Dragon Head 1英译新版封面，ISBN 9781647294946：官方公开图像",
      "url": "https://images2.penguinrandomhouse.com/cover/9781647294946",
      "publisher": "Penguin Random House／Kodansha发行记录",
      "accessed_at": "2026-11-01",
      "access_method": "visual_preview",
      "supports": [
        "两名人物低身回望，夸张瞳孔与汗滴可读，前景手臂向下形成三角支撑；蓝色人物、橙色头发和灰白碎裂背景分层。这是新版封面配色，不能证实内页黑量比例。"
      ],
      "access_note": "早期研究对照：从公开页面 https://www.penguinrandomhouse.com/series/HDJ/dragon-head/ 的HTML明确提取图像URL，下载到自有/tmp后实际通过view_image查看。定位：Dragon Head 1英译新版封面，ISBN 9781647294946。仅查看这一封面/展示图，未阅读内页；未将HTML alt当作视觉证据。",
      "origin_page_url": "https://www.penguinrandomhouse.com/series/HDJ/dragon-head/",
      "observed_asset_sha256": "69cd18499d69a55afdc768fc227c8bc72d390a472993435001a99bb82c99a76a",
      "context": "historical_reference"
    },
    {
      "id": "RECENT1",
      "title": "ちいさこべえ 第3卷：官方书目／项目页",
      "url": "https://shogakukan-comic.jp/book?isbn=9784091861375",
      "publisher": "小学館",
      "accessed_at": "2026-11-01",
      "access_method": "page_text",
      "supports": [
        "所选作品署名与版本范围",
        "本次出版社页明确第3卷2014年电子出版，不能据此证明封面原稿绘制日；不是《Dragon Head》近期重版"
      ],
      "access_note": "本轮核对公开书目／项目文字；时间含义见date_basis，不表示通读作品。"
    },
    {
      "id": "RECENT2",
      "title": "ちいさこべえ 第3卷：已观察的公开图像",
      "url": "https://shogakukan-comic.jp/book-images/w400/digital/091861370000d0000000.jpg",
      "publisher": "小学館",
      "accessed_at": "2026-11-01",
      "access_method": "visual_preview",
      "supports": [
        "限定单幅公开图像的形体、线条、色块与构图观察"
      ],
      "access_note": "实际通过图像工具查看此公开封面／主视觉，未观察整卷内页；周围排版、字体与出版设计不自动归作者。",
      "origin_page_url": "https://shogakukan-comic.jp/book?isbn=9784091861375",
      "observed_asset_sha256": "dee4c58590745722813307900fb6ba8ab51dd4818df071211180de7dcea204e5"
    }
  ],
  "findings": [
    {
      "text": "本次出版社页明确第3卷2014年电子出版，不能据此证明封面原稿绘制日；不是《Dragon Head》近期重版；署名分工：漫画改编与绘画：望月ミネタロウ；原作：山本周五郎",
      "basis": "source_summary",
      "source_ids": [
        "RECENT1"
      ]
    },
    {
      "text": "封面长发胡须人物穿简单T恤并背紫色背包，轮廓连贯而内线少；墨镜、胡须和树林形成深块，灰绿衣面与浅蓝天大面积平涂，几乎无强烈渐变。",
      "basis": "visual_observation",
      "source_ids": [
        "RECENT2"
      ]
    }
  ],
  "visual_recipe": {
    "line": "外轮廓连续清楚，衣服内线少，发须主要按大块。",
    "shapes": "自然成年日常体型，肩颈和背带说明衣物重量。",
    "composition": "把安静人物置在有层次的普通风景前，手中物不能隐入大暗发块。",
    "panel_rhythm": "原创分镜建议：先交代空间，再给道具与手部动作，接人物反应，最后显示动作结果；不是由单幅封面推得的作者分镜规律。",
    "tonal_design": "既定发须、衣服和天空用不同明度组织，纹理密度服从空间层级。",
    "environment": "树群或建筑用较平整形状表达远近，场景不过度写实噪声。",
    "acting": "平静姿势和小角度转头传递关系，动作强度保持日常。",
    "color": "本库原创色彩转译：灰绿、紫灰与浅蓝平涂，减少剧烈光影。；只借所见单图的配色关系，不称固定作者色板。"
  },
  "drawing_steps": [
    "先以本项目故事画三张小构图，应用：把安静人物置在有层次的普通风景前，手中物不能隐入大暗发块。",
    "确认成年人物和原创衣物的结构：自然成年日常体型，肩颈和背带说明衣物重量。 再核对手与道具接触。",
    "按材质分层落线：外轮廓连续清楚，衣服内线少，发须主要按大块。 环境处理：树群或建筑用较平整形状表达远近，场景不过度写实噪声。",
    "最后以灰阶缩图核对：既定发须、衣服和天空用不同明度组织，纹理密度服从空间层级。 彩色版再应用：本库原创色彩转译：灰绿、紫灰与浅蓝平涂，减少剧烈光影。；只借所见单图的配色关系，不称固定作者色板。"
  ],
  "review_checks": [
    "缩至缩略图时，主动作和手中物是否仍先于装饰可见？",
    "人物结构与所选处理是否兼容：自然成年日常体型，肩颈和背带说明衣物重量。",
    "灰阶检查能否区分脸、手、衣物与背景：既定发须、衣服和天空用不同明度组织，纹理密度服从空间层级。",
    "用于连续页时，是否保持原故事人数、动作顺序、服装与道具方向？"
  ],
  "avoid": [
    "把这张封面的观察当成整部作品、所有时期或全部分镜的定律。",
    "把原封面人物、专属服饰、标志和签名带入原创角色；或把书封排版视为作者本人绘画。"
  ],
  "best_for": [
    "平涂日常人物",
    "连续轮廓与低密度风景"
  ],
  "prompt_core_zh": "用连贯外轮廓和少量内线处理成年人物，发须以大暗块为主；日常衣服与背带结构明确，灰绿、紫灰和浅蓝分成平面，环境线密度低，气氛来自姿态和间距。",
  "prompt_core_en": "Use continuous outer contours and sparse internal lines for adult figures, grouping hair into large dark shapes. Clarify everyday clothing and straps, divide gray-green, muted purple and pale blue into flat areas, and let posture and spacing carry mood.",
  "biography": {
    "birth_year": null,
    "death_year": null,
    "region_context": "Kodansha的漫画出版或公开机构介绍语境；不推断民族。",
    "source_ids": [
      "S1"
    ],
    "note": "本轮不采集私人生活；未核生卒保持null。",
    "ethnicity": {
      "value": null,
      "status": "unknown"
    }
  },
  "known_gaps": [
    "本轮新阶段视觉观察限所列单图；未逐章核内页节奏、助手分工和长期画风变化。",
    "原版出版或项目发布年份不等于每一笔原稿的绘制日期；具体日期边界见recent_focus。",
    "本库8维方案、步骤和提示词属于原创转译，尚未用真实生成图验证一致性。"
  ],
  "method_evidence_source_ids": [
    "RECENT2"
  ],
  "schema_version": 1,
  "kind": "manga-author-study",
  "entity_kind": "person",
  "status": "source-grounded-draft",
  "research_date": "2026-11-01",
  "generation_mode": "original-general-techniques",
  "image_validation": "not-run",
  "recipe_basis": "original_synthesis",
  "sheet_traits_zh": "成年头身与姿态自然，发须按大块组织，T恤和腰带衣缝少而清晰；色块平整，无夸张肌肉刻线。",
  "focus": "怪谈与悬疑",
  "historical_scope": "末日（Dragon Head）第1卷数字漫画。仅限该漫画版本的署名与公开介绍；不外推全部生涯，不以动画或真人改编替代漫画观察。 补充有限视觉观察：Dragon Head 1英译新版封面，ISBN 9781647294946；具体图只支撑对应封面/展示图，不混同原版内页。",
  "recent_focus": {
    "work": "ちいさこべえ 第3卷",
    "year": 2014,
    "source_ids": [
      "RECENT1",
      "RECENT2"
    ],
    "date_basis": "本次出版社页明确第3卷2014年电子出版，不能据此证明封面原稿绘制日；不是《Dragon Head》近期重版"
  },
  "creator_type": "manga-artist"
}
