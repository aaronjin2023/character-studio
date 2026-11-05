# 由贵香织里 · 本地研究卡快照

来源：human-distillation-lab 工作目录（不假定已提交）。
仅供查阅；出图采用项目内独立转写的线条和明暗方法。

## manga-authors/authors/yuki-kaori/SKILL.md

---
name: manga-yuki-kaori
description: "由贵香织里公开漫画／插画研究与原创绘图参谋；适用于长曲线服饰与冷暗环境、浅脸与红衣的视觉焦点；按具体视觉技法编写方案。"
---

# 由贵香织里（Kaori Yuki） · 漫画／插画创作研究卡

本轮重点为《落園の美女と野獣 第1卷》的公开封面／主视觉及对应书目；旧作品研究另留在 archive 初稿，不能把不同时期合成固定画风。下列绘画方案为本库原创转译，封面观察不证明连续内页的分镜规律。

选材类型：当代漫画家。本轮重点：落園の美女と野獣 第1卷；参考年份：2020。日文首卷2020年出版；出版社列原稿初出为2019年10—12月Palcy配信。〔RECENT1, RECENT2〕

方向：怪谈与悬疑。本卡研究公开作品与方法；绘图配方是本库原创转译，未训练模型、未做出图效果验证。

[100人目录](../../CATALOG.md) · [八维绘画方案](drawing.md) · [绘图提示词](prompts.md) · [结构化记录](manifest.json) · [完整创作流程](../../WORKFLOW.md)

## 适用任务

- 长曲线服饰与冷暗环境
- 浅脸与红衣的视觉焦点

先读取下列研究依据，再从drawing.md选2–3项具体技法，结合项目自己的角色和世界设定，编写原创画面方案。生成时采用prompts.md的通用技法表达，不直接用作者姓名作为画风口令，不假称本人绘制或背书。用户按作者选择风格时，明确作品阶段，把视觉目标拆成可操作的特征；保留项目已有角色设定，不承诺未经实际出图验证的复现精度。

## 本轮公开依据

- 日文首卷2020年出版；出版社列原稿初出为2019年10—12月Palcy配信；署名分工：漫画作者〔source_summary；RECENT1〕
- 红披风人物居前，后方高大黑色面具与金绿卷发围住她；浅色脸、绿眼和红布形成焦点，裙褶为密平行线，深青背景有垂直树形。〔visual_observation；RECENT2〕

绘画／叙事方法或限定画面观察的依据：RECENT2。下述原创配方不代表这些来源逐项规定了所有参数。

## 选材与分工

- 落園の美女と野獣 第1卷：漫画作者〔RECENT1, RECENT2〕

## 基本资料

出生年：未知／本轮未核定；逝世年：未知／本轮未核定。

活动／出版语境（非国籍）：VIZ Media的漫画出版或公开机构介绍语境；不推断民族。民族：未知，不根据姓名或出版地区推断。本轮不采集私人生活；未核生卒保持null。 〔S1〕

本次新增研究对象；未复制成其他专家分类条目。

## 缺口

- 本轮新阶段视觉观察限所列单图；未逐章核内页节奏、助手分工和长期画风变化。
- 原版出版或项目发布年份不等于每一笔原稿的绘制日期；具体日期边界见recent_focus。
- 本库8维方案、步骤和提示词属于原创转译，尚未用真实生成图验证一致性。

## 来源

- **S1** [VIZ | Read a Free Preview of Godchild, Vol. 1](https://www.viz.com/manga-books/manga/godchild-volume-1/product/390/paperback) — VIZ Media；2026-11-01；`search_excerpt`。早期研究对照：实际web检索得到该URL与摘要/展开片段；未查看漫画内页、付费内容或色稿。可证明出版身份与简介，不能证明具体分镜和笔法。 支持：出版社商品记录标注Story and Art by Kaori Yuki，本轮不把商品预览入口当内页观察。。
- **S2** [Godchild Vol.1英译封面，ISBN 142150233X：官方公开图像](https://dw9to29mmj727.cloudfront.net/products/142150233X.jpg) — VIZ Media；2026-11-01；`visual_preview`。早期研究对照：从公开页面 https://www.viz.com/manga-books/manga/godchild-volume-1/product/390/paperback 的HTML明确提取图像URL，下载到自有/tmp后实际通过view_image查看。定位：Godchild Vol.1英译封面，ISBN 142150233X。仅查看这一封面/展示图，未阅读内页；未将HTML alt当作视觉证据。 支持：黑衣人物的抬膝和伸手形成斜线，白领脸部与黑长外套相分；窗格、烛台、花瓣和棺形边框密集，却由脸与手保持焦点。观察仅限封面，不能归纳所有悬疑分镜。。
- **RECENT1** [落園の美女と野獣 第1卷：官方书目／项目页](https://www.kodansha.co.jp/comic/products/0000328057) — 講談社；2026-11-01；`page_text`。本轮核对公开书目／项目文字；时间含义见date_basis，不表示通读作品。 支持：所选作品署名与版本范围；日文首卷2020年出版；出版社列原稿初出为2019年10—12月Palcy配信。
- **RECENT2** [落園の美女と野獣 第1卷：已观察的公开图像](https://dvs-cover.kodansha.co.jp/0000328057/9vJGyAjgnwlzhJwFS5xdgBHHLDVrhrdMAHdoJ1ig.jpg) — 講談社；2026-11-01；`visual_preview`。实际通过图像工具查看此公开封面／主视觉，未观察整卷内页；周围排版、字体与出版设计不自动归作者。 支持：限定单幅公开图像的形体、线条、色块与构图观察。


## manga-authors/authors/yuki-kaori/drawing.md

# 由贵香织里（Kaori Yuki） · 八维绘画方案

以下全部是**本库原创创作转译**，不是作者原话或其全部作品的统一规则。对应公开事实与访问范围见[研究卡](SKILL.md)。先确定所选作品阶段，彩色建议不自动视为作者固定色板。

## 线条

卷发和布褶用长曲线，五官与手指用较清楚短线。

## 形体与人物

成年瘦长人物与厚布料分层，装饰不改关节位置。

## 构图

前景亮脸与后方暗体量形成纵向层次，关键交接物留在可见区域。

## 分镜节奏

原创分镜建议：先交代空间，再给道具与手部动作，接人物反应，最后显示动作结果；不是由单幅封面推得的作者分镜规律。

## 黑白与网点

冷暗背景托浅脸和红衣，密条纹不进入面部。

## 环境

树形、栏杆与室内装饰只选一种空间系统，避免无功能华饰堆叠。

## 表情动作

细微眼神与手的后撤或前送提供暧昧张力，不额外增加原作角色。

## 彩色方案

本库原创色彩转译：深青黑与红色布料相对，金绿只点在发束与配件。；只借所见单图的配色关系，不称固定作者色板。

## 落地步骤

1. 先以本项目故事画三张小构图，应用：前景亮脸与后方暗体量形成纵向层次，关键交接物留在可见区域。
2. 确认成年人物和原创衣物的结构：成年瘦长人物与厚布料分层，装饰不改关节位置。 再核对手与道具接触。
3. 按材质分层落线：卷发和布褶用长曲线，五官与手指用较清楚短线。 环境处理：树形、栏杆与室内装饰只选一种空间系统，避免无功能华饰堆叠。
4. 最后以灰阶缩图核对：冷暗背景托浅脸和红衣，密条纹不进入面部。 彩色版再应用：本库原创色彩转译：深青黑与红色布料相对，金绿只点在发束与配件。；只借所见单图的配色关系，不称固定作者色板。

## 图像检查

- 缩至缩略图时，主动作和手中物是否仍先于装饰可见？
- 人物结构与所选处理是否兼容：成年瘦长人物与厚布料分层，装饰不改关节位置。
- 灰阶检查能否区分脸、手、衣物与背景：冷暗背景托浅脸和红衣，密条纹不进入面部。
- 用于连续页时，是否保持原故事人数、动作顺序、服装与道具方向？

## 容易失败的做法

- 把这张封面的观察当成整部作品、所有时期或全部分镜的定律。
- 把原封面人物、专属服饰、标志和签名带入原创角色；或把书封排版视为作者本人绘画。


## manga-authors/authors/yuki-kaori/prompts.md

# 由贵香织里（Kaori Yuki） · 原创绘图提示词

这些是可编辑的起稿模板，未实际出图。比较时统一使用“雨后浮岛港口归还机械鸟”的原创题材。角色设定页只转用形体、线条和黑白处理，不沿用场景镜头；英文版的角色技法段保留中文规格以免未经审核的翻译改变约束。

不要将本页标题或作者姓名一并粘贴到图像生成提示词。需要其他题材时替换角色、场景、行动和情绪，保留所选择的通用技法；既定发色、发长、肤色、衣色与体型优先，冲突技法或色板必须删改；最后执行[连贯性与输出检查](../../WORKFLOW.md)。

## 单幅叙事插画

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 单幅叙事插画。以弯曲长线组织发束和布褶，浅脸在深青黑环境中成为焦点；红色外衣与冷绿暗部相对，装饰集中边缘，脸与手的结构优先于繁密条纹，轮廓前后层次明确。 不画原作品角色、标志或签名；文字如需出现，保留位置后期排版。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. One narrative illustration. Organize hair and fabric with long curved lines, placing a pale face against deep blue-green and black. Contrast a red outer garment with cool green shadows, confine ornament to edges, and preserve the structure of faces and hands. No existing franchise designs, logos or signatures. Reserve any text for later lettering.
```

## 角色三视图

### 中文

```text
角色设定页：同一名成年修理工的正面、右侧面、背面三个完整视图；短发、短外套、工具腰带、工作靴，三视图衣物结构及比例一致。中性站姿、平视、无透视夸张、纯净背景，三个完整身体不重叠。 以下技法服从上述成年角色、服装和站姿约束；只转用造型与画面处理，忽略示例动作和场景：成年面部与清楚眼形，长线分组头发，衣褶按结构顺向；装饰局部化，三视图服装轮廓不被背景掩盖。
```

### English / bilingual specification

```text
Character design sheet: front, right-side and rear full-body views of the same adult repair technician, with short hair, a short work jacket, tool belt and work boots. Keep anatomy, garment construction and proportions consistent. Use neutral standing poses, eye-level orthographic views, a plain background and no overlapping figures. Apply the following bilingual line, shape and tone specification subject to the adult character, clothing and neutral pose above; omit any example actions and scene directions: 成年面部与清楚眼形，长线分组头发，衣褶按结构顺向；装饰局部化，三视图服装轮廓不被背景掩盖。
```

## 六格漫画页

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 六格漫画页，按日式从右到左、从上到下阅读。格1港口建立空间；格2修理工发现机械鸟；格3检查鸟翅；格4旅人赶来；格5修理工交还鸟；格6鸟起飞，两人目送。每格明确一个动作，角色、工具及场景方向连续。预留空白对话框，文字后期排版；不要生成签名或水印。 将以下技法用于各格，不改变上述事件、格数或顺序：以弯曲长线组织发束和布褶，浅脸在深青黑环境中成为焦点；红色外衣与冷绿暗部相对，装饰集中边缘，脸与手的结构优先于繁密条纹，轮廓前后层次明确。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. A six-panel manga page, read from right to left and top to bottom. Panel 1 establishes the harbor; 2 the technician discovers the bird; 3 inspects its wing; 4 the traveler arrives; 5 the bird is returned; 6 it flies away as both adults watch. Show one clear action per panel; preserve character, prop and screen-direction continuity. Leave speech balloons empty for later lettering. No signatures or watermarks. Apply the following techniques within each panel without changing the events, panel count or sequence: Organize hair and fabric with long curved lines, placing a pale face against deep blue-green and black. Contrast a red outer garment with cool green shadows, confine ornament to edges, and preserve the structure of faces and hands.
```


## manga-authors/authors/yuki-kaori/manifest.json

{
  "id": "yuki-kaori",
  "name": "Kaori Yuki",
  "name_zh": "由贵香织里",
  "legacy_refs": [],
  "name_ja": "由貴香織里",
  "family": "怪谈与悬疑",
  "scope": "本轮重点为《落園の美女と野獣 第1卷》的公开封面／主视觉及对应书目；旧作品研究另留在 archive 初稿，不能把不同时期合成固定画风。下列绘画方案为本库原创转译，封面观察不证明连续内页的分镜规律。",
  "reference_works": [
    {
      "title": "落園の美女と野獣 第1卷",
      "role": "漫画作者",
      "source_ids": [
        "RECENT1",
        "RECENT2"
      ]
    }
  ],
  "sources": [
    {
      "id": "S1",
      "title": "VIZ | Read a Free Preview of Godchild, Vol. 1",
      "url": "https://www.viz.com/manga-books/manga/godchild-volume-1/product/390/paperback",
      "publisher": "VIZ Media",
      "accessed_at": "2026-11-01",
      "access_method": "search_excerpt",
      "supports": [
        "出版社商品记录标注Story and Art by Kaori Yuki，本轮不把商品预览入口当内页观察。"
      ],
      "access_note": "早期研究对照：实际web检索得到该URL与摘要/展开片段；未查看漫画内页、付费内容或色稿。可证明出版身份与简介，不能证明具体分镜和笔法。",
      "context": "historical_reference"
    },
    {
      "id": "S2",
      "title": "Godchild Vol.1英译封面，ISBN 142150233X：官方公开图像",
      "url": "https://dw9to29mmj727.cloudfront.net/products/142150233X.jpg",
      "publisher": "VIZ Media",
      "accessed_at": "2026-11-01",
      "access_method": "visual_preview",
      "supports": [
        "黑衣人物的抬膝和伸手形成斜线，白领脸部与黑长外套相分；窗格、烛台、花瓣和棺形边框密集，却由脸与手保持焦点。观察仅限封面，不能归纳所有悬疑分镜。"
      ],
      "access_note": "早期研究对照：从公开页面 https://www.viz.com/manga-books/manga/godchild-volume-1/product/390/paperback 的HTML明确提取图像URL，下载到自有/tmp后实际通过view_image查看。定位：Godchild Vol.1英译封面，ISBN 142150233X。仅查看这一封面/展示图，未阅读内页；未将HTML alt当作视觉证据。",
      "origin_page_url": "https://www.viz.com/manga-books/manga/godchild-volume-1/product/390/paperback",
      "observed_asset_sha256": "6e927319032997e07da52de7617eca5519625bcb3d60ddb48937e2acc301182c",
      "context": "historical_reference"
    },
    {
      "id": "RECENT1",
      "title": "落園の美女と野獣 第1卷：官方书目／项目页",
      "url": "https://www.kodansha.co.jp/comic/products/0000328057",
      "publisher": "講談社",
      "accessed_at": "2026-11-01",
      "access_method": "page_text",
      "supports": [
        "所选作品署名与版本范围",
        "日文首卷2020年出版；出版社列原稿初出为2019年10—12月Palcy配信"
      ],
      "access_note": "本轮核对公开书目／项目文字；时间含义见date_basis，不表示通读作品。"
    },
    {
      "id": "RECENT2",
      "title": "落園の美女と野獣 第1卷：已观察的公开图像",
      "url": "https://dvs-cover.kodansha.co.jp/0000328057/9vJGyAjgnwlzhJwFS5xdgBHHLDVrhrdMAHdoJ1ig.jpg",
      "publisher": "講談社",
      "accessed_at": "2026-11-01",
      "access_method": "visual_preview",
      "supports": [
        "限定单幅公开图像的形体、线条、色块与构图观察"
      ],
      "access_note": "实际通过图像工具查看此公开封面／主视觉，未观察整卷内页；周围排版、字体与出版设计不自动归作者。",
      "origin_page_url": "https://www.kodansha.co.jp/comic/products/0000328057",
      "observed_asset_sha256": "c1ec2632438197186cc4c2b7083e672f4e3ef81d05008f3755f2429cc07ceecf"
    }
  ],
  "findings": [
    {
      "text": "日文首卷2020年出版；出版社列原稿初出为2019年10—12月Palcy配信；署名分工：漫画作者",
      "basis": "source_summary",
      "source_ids": [
        "RECENT1"
      ]
    },
    {
      "text": "红披风人物居前，后方高大黑色面具与金绿卷发围住她；浅色脸、绿眼和红布形成焦点，裙褶为密平行线，深青背景有垂直树形。",
      "basis": "visual_observation",
      "source_ids": [
        "RECENT2"
      ]
    }
  ],
  "visual_recipe": {
    "line": "卷发和布褶用长曲线，五官与手指用较清楚短线。",
    "shapes": "成年瘦长人物与厚布料分层，装饰不改关节位置。",
    "composition": "前景亮脸与后方暗体量形成纵向层次，关键交接物留在可见区域。",
    "panel_rhythm": "原创分镜建议：先交代空间，再给道具与手部动作，接人物反应，最后显示动作结果；不是由单幅封面推得的作者分镜规律。",
    "tonal_design": "冷暗背景托浅脸和红衣，密条纹不进入面部。",
    "environment": "树形、栏杆与室内装饰只选一种空间系统，避免无功能华饰堆叠。",
    "acting": "细微眼神与手的后撤或前送提供暧昧张力，不额外增加原作角色。",
    "color": "本库原创色彩转译：深青黑与红色布料相对，金绿只点在发束与配件。；只借所见单图的配色关系，不称固定作者色板。"
  },
  "drawing_steps": [
    "先以本项目故事画三张小构图，应用：前景亮脸与后方暗体量形成纵向层次，关键交接物留在可见区域。",
    "确认成年人物和原创衣物的结构：成年瘦长人物与厚布料分层，装饰不改关节位置。 再核对手与道具接触。",
    "按材质分层落线：卷发和布褶用长曲线，五官与手指用较清楚短线。 环境处理：树形、栏杆与室内装饰只选一种空间系统，避免无功能华饰堆叠。",
    "最后以灰阶缩图核对：冷暗背景托浅脸和红衣，密条纹不进入面部。 彩色版再应用：本库原创色彩转译：深青黑与红色布料相对，金绿只点在发束与配件。；只借所见单图的配色关系，不称固定作者色板。"
  ],
  "review_checks": [
    "缩至缩略图时，主动作和手中物是否仍先于装饰可见？",
    "人物结构与所选处理是否兼容：成年瘦长人物与厚布料分层，装饰不改关节位置。",
    "灰阶检查能否区分脸、手、衣物与背景：冷暗背景托浅脸和红衣，密条纹不进入面部。",
    "用于连续页时，是否保持原故事人数、动作顺序、服装与道具方向？"
  ],
  "avoid": [
    "把这张封面的观察当成整部作品、所有时期或全部分镜的定律。",
    "把原封面人物、专属服饰、标志和签名带入原创角色；或把书封排版视为作者本人绘画。"
  ],
  "best_for": [
    "长曲线服饰与冷暗环境",
    "浅脸与红衣的视觉焦点"
  ],
  "prompt_core_zh": "以弯曲长线组织发束和布褶，浅脸在深青黑环境中成为焦点；红色外衣与冷绿暗部相对，装饰集中边缘，脸与手的结构优先于繁密条纹，轮廓前后层次明确。",
  "prompt_core_en": "Organize hair and fabric with long curved lines, placing a pale face against deep blue-green and black. Contrast a red outer garment with cool green shadows, confine ornament to edges, and preserve the structure of faces and hands.",
  "biography": {
    "birth_year": null,
    "death_year": null,
    "region_context": "VIZ Media的漫画出版或公开机构介绍语境；不推断民族。",
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
  "sheet_traits_zh": "成年面部与清楚眼形，长线分组头发，衣褶按结构顺向；装饰局部化，三视图服装轮廓不被背景掩盖。",
  "focus": "怪谈与悬疑",
  "historical_scope": "Godchild第1卷漫画。仅限该漫画版本的署名与公开介绍；不外推全部生涯，不以动画或真人改编替代漫画观察。",
  "recent_focus": {
    "work": "落園の美女と野獣 第1卷",
    "year": 2020,
    "source_ids": [
      "RECENT1",
      "RECENT2"
    ],
    "date_basis": "日文首卷2020年出版；出版社列原稿初出为2019年10—12月Palcy配信"
  },
  "creator_type": "manga-artist"
}
