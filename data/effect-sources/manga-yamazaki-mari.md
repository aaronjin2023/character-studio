# 山崎麻里 · 本地研究卡快照

来源：human-distillation-lab 工作目录（不假定已提交）。
仅供查阅；出图采用项目内独立转写的线条和明暗方法。

## manga-authors/authors/yamazaki-mari/SKILL.md

---
name: manga-yamazaki-mari
description: "山崎麻里公开漫画／插画研究与原创绘图参谋；适用于新阶段角色造型与材质、人物与环境的关系研究；按具体视觉技法编写方案。"
---

# 山崎麻里（Mari Yamazaki） · 漫画／插画创作研究卡

本轮重点为《続テルマエ・ロマエ 第3卷》的公开封面／主视觉及对应书目；旧作品研究另留在 archive 初稿，不能把不同时期合成固定画风。下列绘画方案为本库原创转译，封面观察不证明连续内页的分镜规律。

选材类型：当代漫画家。本轮重点：続テルマエ・ロマエ 第3卷；参考年份：2026。集英社商品页正文明确纸本与数字版均 2026-10-02 首发；2026 为续作第3卷首次出版年，不混原《テルマエ・ロマエ》或译本年；封面原画日期未核。〔RECENT1, RECENT2〕

方向：历史与社会。本卡研究公开作品与方法；绘图配方是本库原创转译，未训练模型、未做出图效果验证。

[100人目录](../../CATALOG.md) · [八维绘画方案](drawing.md) · [绘图提示词](prompts.md) · [结构化记录](manifest.json) · [完整创作流程](../../WORKFLOW.md)

## 适用任务

- 新阶段角色造型与材质
- 人物与环境的关系研究

先读取下列研究依据，再从drawing.md选2–3项具体技法，结合项目自己的角色和世界设定，编写原创画面方案。生成时采用prompts.md的通用技法表达，不直接用作者姓名作为画风口令，不假称本人绘制或背书。用户按作者选择风格时，明确作品阶段，把视觉目标拆成可操作的特征；保留项目已有角色设定，不承诺未经实际出图验证的复现精度。

## 本轮公开依据

- 集英社商品页正文明确纸本与数字版均 2026-10-02 首发；2026 为续作第3卷首次出版年，不混原《テルマエ・ロマエ》或译本年；封面原画日期未核。；署名分工：漫画作者：ヤマザキマリ；本次为续作，不是原作新装版〔source_summary；RECENT1〕
- 实际查看第3卷官方封面缩略图：上下两个人物面部裁切构成叠层，厚重眉弓和鼻部阴影清楚，胡须、发丝与脸部排线密度不同；整体彩度极低，书名与侧边灰黑形成强版面。仅240像素书影，不能推定细排线工序或内页对话节奏。〔visual_observation；RECENT2〕

绘画／叙事方法或限定画面观察的依据：RECENT2。下述原创配方不代表这些来源逐项规定了所有参数。

## 选材与分工

- 続テルマエ・ロマエ 第3卷：漫画作者：ヤマザキマリ；本次为续作，不是原作新装版〔RECENT1, RECENT2〕

## 基本资料

出生年：未知／本轮未核定；逝世年：未知／本轮未核定。

活动／出版语境（非国籍）：Yen Press的漫画出版或公开机构介绍语境；不推断民族。民族：未知，不根据姓名或出版地区推断。本轮不采集私人生活；未核生卒保持null。 〔S1〕

本次新增研究对象；未复制成其他专家分类条目。

## 缺口

- 本轮新阶段视觉观察限所列单图；未逐章核内页节奏、助手分工和长期画风变化。
- 原版出版或项目发布年份不等于每一笔原稿的绘制日期；具体日期边界见recent_focus。
- 本库8维方案、步骤和提示词属于原创转译，尚未用真实生成图验证一致性。

## 来源

- **S1** [Thermae Romae, Vol. 1 | Manga | Yen Press](https://yenpress.com/titles/9780316229197-thermae-romae-vol-1) — Yen Press；2026-11-01；`search_excerpt`。早期研究对照：实际web检索得到该URL与摘要/展开片段；未查看漫画内页、付费内容或色稿。可证明出版身份与简介，不能证明具体分镜和笔法。 支持：出版社列Mari Yamazaki为作者，故事为罗马建筑师在古代浴场与现代日本之间的文化误读。。
- **S2** [Thermae Romae Vol.I英译封面：官方公开图像](https://yenpress.com/uploads/preview/9780316232227/single/001.jpg) — Yen Press；2026-11-01；`visual_preview`。早期研究对照：从公开页面 https://yenpress.com/titles/9780316229197-thermae-romae-vol-1 的HTML明确提取图像URL，下载到自有/tmp后实际通过view_image查看。定位：Thermae Romae Vol.I英译封面。仅查看这一封面/展示图，未阅读内页；未将HTML alt当作视觉证据。 支持：封面近正面的雕塑式人体用密集细线塑造肌肉体面，石牌横遮中段，红布是几乎唯一强彩色；大片白底使写实明暗与幽默器物并置。只观察封面，不推断内页都使用该密度。。
- **RECENT1** [続テルマエ・ロマエ 第3卷：官方书目／项目页](https://www.shueisha.co.jp/books/items/contents.html?isbn=978-4-08-792625-5) — 集英社；2026-11-01；`search_excerpt`。本轮核对公开书目／项目文字；时间含义见date_basis，不表示通读作品。 支持：所选作品署名与版本范围；集英社商品页正文明确纸本与数字版均 2026-10-02 首发；2026 为续作第3卷首次出版年，不混原《テルマエ・ロマエ》或译本年；封面原画日期未核。。
- **RECENT2** [続テルマエ・ロマエ 第3卷：已观察的公开图像](https://dosbg3xlm0x1t.cloudfront.net/images/items/9784087926255/240/9784087926255.jpg) — 集英社；2026-11-01；`visual_preview`。实际通过图像工具查看此公开封面／主视觉，未观察整卷内页；周围排版、字体与出版设计不自动归作者。 支持：限定单幅公开图像的形体、线条、色块与构图观察。


## manga-authors/authors/yamazaki-mari/drawing.md

# 山崎麻里（Mari Yamazaki） · 八维绘画方案

以下全部是**本库原创创作转译**，不是作者原话或其全部作品的统一规则。对应公开事实与访问范围见[研究卡](SKILL.md)。先确定所选作品阶段，彩色建议不自动视为作者固定色板。

## 线条

成年骨面用明确线与短排线组织，发须较密、额面较疏；低分辨封面不足推断精确笔刷。

## 形体与人物

眉弓、鼻梁、下颌与颈部有自然厚度，体块不能被大量皱纹取代。

## 构图

灰白大面与小深块形成阅读秩序，裁切叠层服从用户版式，不自动增加第二人物。

## 分镜节奏

原创迁移建议：对话信息与细小表情反应交替，关键说明留清晰视线；未把封面当内页节奏证据。

## 黑白与网点

额面留亮、骨面中灰、毛发和深衣合黑，排线疏密随面变化而非均匀铺灰。

## 环境

保持既定场景，以较少结构线交代空间，不自动添加古代建筑、浴场或历史身份。

## 表情动作

眼睑、眉弓与嘴型差异表达态度，成年骨面稳定后再夸张局部反应。

## 彩色方案

本次封面以极低彩灰白为主；彩色转译建议采用低彩暖灰与极少赭色，非原作固定色板。

## 落地步骤

1. 先以本项目故事画三张小构图，应用：灰白大面与小深块形成阅读秩序，裁切叠层服从用户版式，不自动增加第二人物。
2. 确认成年人物和原创衣物的结构：眉弓、鼻梁、下颌与颈部有自然厚度，体块不能被大量皱纹取代。 再核对手与道具接触。
3. 按材质分层落线：成年骨面用明确线与短排线组织，发须较密、额面较疏；低分辨封面不足推断精确笔刷。 环境处理：保持既定场景，以较少结构线交代空间，不自动添加古代建筑、浴场或历史身份。
4. 最后以灰阶缩图核对：额面留亮、骨面中灰、毛发和深衣合黑，排线疏密随面变化而非均匀铺灰。 彩色版再应用：本次封面以极低彩灰白为主；彩色转译建议采用低彩暖灰与极少赭色，非原作固定色板。

## 图像检查

- 缩至缩略图时，主动作和手中物是否仍先于装饰可见？
- 人物结构与所选处理是否兼容：眉弓、鼻梁、下颌与颈部有自然厚度，体块不能被大量皱纹取代。
- 灰阶检查能否区分脸、手、衣物与背景：额面留亮、骨面中灰、毛发和深衣合黑，排线疏密随面变化而非均匀铺灰。
- 用于连续页时，是否保持原故事人数、动作顺序、服装与道具方向？

## 容易失败的做法

- 把这张封面的观察当成整部作品、所有时期或全部分镜的定律。
- 把原封面人物、专属服饰、标志和签名带入原创角色；或把书封排版视为作者本人绘画。


## manga-authors/authors/yamazaki-mari/prompts.md

# 山崎麻里（Mari Yamazaki） · 原创绘图提示词

这些是可编辑的起稿模板，未实际出图。比较时统一使用“雨后浮岛港口归还机械鸟”的原创题材。角色设定页只转用形体、线条和黑白处理，不沿用场景镜头；英文版的角色技法段保留中文规格以免未经审核的翻译改变约束。

不要将本页标题或作者姓名一并粘贴到图像生成提示词。需要其他题材时替换角色、场景、行动和情绪，保留所选择的通用技法；既定发色、发长、肤色、衣色与体型优先，冲突技法或色板必须删改；最后执行[连贯性与输出检查](../../WORKFLOW.md)。

## 单幅叙事插画

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 单幅叙事插画。以明确眉弓、鼻梁和下颌建立成年骨面，排线集中于转折与毛发，亮额面保持干净。大面积灰白配少量深黑，人物表情以眼睑和嘴部差异呈现，裁切与叠层服从既定版式，不增加人物。 不画原作品角色、标志或签名；文字如需出现，保留位置后期排版。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. One narrative illustration. Construct adult facial planes through clear brow ridges, nose bridges, and jaws, concentrating hatching in plane changes and hair while preserving clean light forehead areas. Balance broad gray white fields against restrained deep black. Differentiate expressions through eyelids and mouth shapes. Let cropping and overlap follow the requested layout without adding people, historical identities, architecture, or events from the reference. No existing franchise designs, logos or signatures. Reserve any text for later lettering.
```

## 角色三视图

### 中文

```text
角色设定页：同一名成年修理工的正面、右侧面、背面三个完整视图；短发、短外套、工具腰带、工作靴，三视图衣物结构及比例一致。中性站姿、平视、无透视夸张、纯净背景，三个完整身体不重叠。 以下技法服从上述成年角色、服装和站姿约束；只转用造型与画面处理，忽略示例动作和场景：成年眉弓鼻梁下颌分面明确，静态头颈有厚度；短排线集中转折和毛发，额面留白，深衣黑块完整。
```

### English / bilingual specification

```text
Character design sheet: front, right-side and rear full-body views of the same adult repair technician, with short hair, a short work jacket, tool belt and work boots. Keep anatomy, garment construction and proportions consistent. Use neutral standing poses, eye-level orthographic views, a plain background and no overlapping figures. Apply the following bilingual line, shape and tone specification subject to the adult character, clothing and neutral pose above; omit any example actions and scene directions: 成年眉弓鼻梁下颌分面明确，静态头颈有厚度；短排线集中转折和毛发，额面留白，深衣黑块完整。
```

## 六格漫画页

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 六格漫画页，按日式从右到左、从上到下阅读。格1港口建立空间；格2修理工发现机械鸟；格3检查鸟翅；格4旅人赶来；格5修理工交还鸟；格6鸟起飞，两人目送。每格明确一个动作，角色、工具及场景方向连续。预留空白对话框，文字后期排版；不要生成签名或水印。 将以下技法用于各格，不改变上述事件、格数或顺序：以明确眉弓、鼻梁和下颌建立成年骨面，排线集中于转折与毛发，亮额面保持干净。大面积灰白配少量深黑，人物表情以眼睑和嘴部差异呈现，裁切与叠层服从既定版式，不增加人物。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. A six-panel manga page, read from right to left and top to bottom. Panel 1 establishes the harbor; 2 the technician discovers the bird; 3 inspects its wing; 4 the traveler arrives; 5 the bird is returned; 6 it flies away as both adults watch. Show one clear action per panel; preserve character, prop and screen-direction continuity. Leave speech balloons empty for later lettering. No signatures or watermarks. Apply the following techniques within each panel without changing the events, panel count or sequence: Construct adult facial planes through clear brow ridges, nose bridges, and jaws, concentrating hatching in plane changes and hair while preserving clean light forehead areas. Balance broad gray white fields against restrained deep black. Differentiate expressions through eyelids and mouth shapes. Let cropping and overlap follow the requested layout without adding people, historical identities, architecture, or events from the reference.
```


## manga-authors/authors/yamazaki-mari/manifest.json

{
  "id": "yamazaki-mari",
  "name": "Mari Yamazaki",
  "name_zh": "山崎麻里",
  "legacy_refs": [],
  "name_ja": "ヤマザキマリ",
  "family": "历史与社会",
  "scope": "本轮重点为《続テルマエ・ロマエ 第3卷》的公开封面／主视觉及对应书目；旧作品研究另留在 archive 初稿，不能把不同时期合成固定画风。下列绘画方案为本库原创转译，封面观察不证明连续内页的分镜规律。",
  "reference_works": [
    {
      "title": "続テルマエ・ロマエ 第3卷",
      "role": "漫画作者：ヤマザキマリ；本次为续作，不是原作新装版",
      "source_ids": [
        "RECENT1",
        "RECENT2"
      ]
    }
  ],
  "sources": [
    {
      "id": "S1",
      "title": "Thermae Romae, Vol. 1 | Manga | Yen Press",
      "url": "https://yenpress.com/titles/9780316229197-thermae-romae-vol-1",
      "publisher": "Yen Press",
      "accessed_at": "2026-11-01",
      "access_method": "search_excerpt",
      "supports": [
        "出版社列Mari Yamazaki为作者，故事为罗马建筑师在古代浴场与现代日本之间的文化误读。"
      ],
      "access_note": "早期研究对照：实际web检索得到该URL与摘要/展开片段；未查看漫画内页、付费内容或色稿。可证明出版身份与简介，不能证明具体分镜和笔法。",
      "context": "historical_reference"
    },
    {
      "id": "S2",
      "title": "Thermae Romae Vol.I英译封面：官方公开图像",
      "url": "https://yenpress.com/uploads/preview/9780316232227/single/001.jpg",
      "publisher": "Yen Press",
      "accessed_at": "2026-11-01",
      "access_method": "visual_preview",
      "supports": [
        "封面近正面的雕塑式人体用密集细线塑造肌肉体面，石牌横遮中段，红布是几乎唯一强彩色；大片白底使写实明暗与幽默器物并置。只观察封面，不推断内页都使用该密度。"
      ],
      "access_note": "早期研究对照：从公开页面 https://yenpress.com/titles/9780316229197-thermae-romae-vol-1 的HTML明确提取图像URL，下载到自有/tmp后实际通过view_image查看。定位：Thermae Romae Vol.I英译封面。仅查看这一封面/展示图，未阅读内页；未将HTML alt当作视觉证据。",
      "origin_page_url": "https://yenpress.com/titles/9780316229197-thermae-romae-vol-1",
      "observed_asset_sha256": "0bf4b8ff89904a75990f8b31d9a12230a809c380df6c6a5b8b3b0e1d59e52683",
      "context": "historical_reference"
    },
    {
      "id": "RECENT1",
      "title": "続テルマエ・ロマエ 第3卷：官方书目／项目页",
      "url": "https://www.shueisha.co.jp/books/items/contents.html?isbn=978-4-08-792625-5",
      "publisher": "集英社",
      "accessed_at": "2026-11-01",
      "access_method": "search_excerpt",
      "supports": [
        "所选作品署名与版本范围",
        "集英社商品页正文明确纸本与数字版均 2026-10-02 首发；2026 为续作第3卷首次出版年，不混原《テルマエ・ロマエ》或译本年；封面原画日期未核。"
      ],
      "access_note": "本轮核对公开书目／项目文字；时间含义见date_basis，不表示通读作品。"
    },
    {
      "id": "RECENT2",
      "title": "続テルマエ・ロマエ 第3卷：已观察的公开图像",
      "url": "https://dosbg3xlm0x1t.cloudfront.net/images/items/9784087926255/240/9784087926255.jpg",
      "publisher": "集英社",
      "accessed_at": "2026-11-01",
      "access_method": "visual_preview",
      "supports": [
        "限定单幅公开图像的形体、线条、色块与构图观察"
      ],
      "access_note": "实际通过图像工具查看此公开封面／主视觉，未观察整卷内页；周围排版、字体与出版设计不自动归作者。",
      "origin_page_url": "https://www.shueisha.co.jp/books/items/contents.html?isbn=978-4-08-792625-5"
    }
  ],
  "findings": [
    {
      "text": "集英社商品页正文明确纸本与数字版均 2026-10-02 首发；2026 为续作第3卷首次出版年，不混原《テルマエ・ロマエ》或译本年；封面原画日期未核。；署名分工：漫画作者：ヤマザキマリ；本次为续作，不是原作新装版",
      "basis": "source_summary",
      "source_ids": [
        "RECENT1"
      ]
    },
    {
      "text": "实际查看第3卷官方封面缩略图：上下两个人物面部裁切构成叠层，厚重眉弓和鼻部阴影清楚，胡须、发丝与脸部排线密度不同；整体彩度极低，书名与侧边灰黑形成强版面。仅240像素书影，不能推定细排线工序或内页对话节奏。",
      "basis": "visual_observation",
      "source_ids": [
        "RECENT2"
      ]
    }
  ],
  "visual_recipe": {
    "line": "成年骨面用明确线与短排线组织，发须较密、额面较疏；低分辨封面不足推断精确笔刷。",
    "shapes": "眉弓、鼻梁、下颌与颈部有自然厚度，体块不能被大量皱纹取代。",
    "composition": "灰白大面与小深块形成阅读秩序，裁切叠层服从用户版式，不自动增加第二人物。",
    "panel_rhythm": "原创迁移建议：对话信息与细小表情反应交替，关键说明留清晰视线；未把封面当内页节奏证据。",
    "tonal_design": "额面留亮、骨面中灰、毛发和深衣合黑，排线疏密随面变化而非均匀铺灰。",
    "environment": "保持既定场景，以较少结构线交代空间，不自动添加古代建筑、浴场或历史身份。",
    "acting": "眼睑、眉弓与嘴型差异表达态度，成年骨面稳定后再夸张局部反应。",
    "color": "本次封面以极低彩灰白为主；彩色转译建议采用低彩暖灰与极少赭色，非原作固定色板。"
  },
  "drawing_steps": [
    "先以本项目故事画三张小构图，应用：灰白大面与小深块形成阅读秩序，裁切叠层服从用户版式，不自动增加第二人物。",
    "确认成年人物和原创衣物的结构：眉弓、鼻梁、下颌与颈部有自然厚度，体块不能被大量皱纹取代。 再核对手与道具接触。",
    "按材质分层落线：成年骨面用明确线与短排线组织，发须较密、额面较疏；低分辨封面不足推断精确笔刷。 环境处理：保持既定场景，以较少结构线交代空间，不自动添加古代建筑、浴场或历史身份。",
    "最后以灰阶缩图核对：额面留亮、骨面中灰、毛发和深衣合黑，排线疏密随面变化而非均匀铺灰。 彩色版再应用：本次封面以极低彩灰白为主；彩色转译建议采用低彩暖灰与极少赭色，非原作固定色板。"
  ],
  "review_checks": [
    "缩至缩略图时，主动作和手中物是否仍先于装饰可见？",
    "人物结构与所选处理是否兼容：眉弓、鼻梁、下颌与颈部有自然厚度，体块不能被大量皱纹取代。",
    "灰阶检查能否区分脸、手、衣物与背景：额面留亮、骨面中灰、毛发和深衣合黑，排线疏密随面变化而非均匀铺灰。",
    "用于连续页时，是否保持原故事人数、动作顺序、服装与道具方向？"
  ],
  "avoid": [
    "把这张封面的观察当成整部作品、所有时期或全部分镜的定律。",
    "把原封面人物、专属服饰、标志和签名带入原创角色；或把书封排版视为作者本人绘画。"
  ],
  "best_for": [
    "新阶段角色造型与材质",
    "人物与环境的关系研究"
  ],
  "prompt_core_zh": "以明确眉弓、鼻梁和下颌建立成年骨面，排线集中于转折与毛发，亮额面保持干净。大面积灰白配少量深黑，人物表情以眼睑和嘴部差异呈现，裁切与叠层服从既定版式，不增加人物。",
  "prompt_core_en": "Construct adult facial planes through clear brow ridges, nose bridges, and jaws, concentrating hatching in plane changes and hair while preserving clean light forehead areas. Balance broad gray white fields against restrained deep black. Differentiate expressions through eyelids and mouth shapes. Let cropping and overlap follow the requested layout without adding people, historical identities, architecture, or events from the reference.",
  "biography": {
    "birth_year": null,
    "death_year": null,
    "region_context": "Yen Press的漫画出版或公开机构介绍语境；不推断民族。",
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
  "sheet_traits_zh": "成年眉弓鼻梁下颌分面明确，静态头颈有厚度；短排线集中转折和毛发，额面留白，深衣黑块完整。",
  "focus": "历史与社会",
  "historical_scope": "罗马浴场（Thermae Romae）第1卷漫画。仅限该漫画版本的署名与公开介绍；不外推全部生涯，不以动画或真人改编替代漫画观察。",
  "recent_focus": {
    "work": "続テルマエ・ロマエ 第3卷",
    "year": 2026,
    "source_ids": [
      "RECENT1",
      "RECENT2"
    ],
    "date_basis": "集英社商品页正文明确纸本与数字版均 2026-10-02 首发；2026 为续作第3卷首次出版年，不混原《テルマエ・ロマエ》或译本年；封面原画日期未核。"
  },
  "creator_type": "manga-artist"
}
