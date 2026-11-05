# 吉田秋生 · 本地研究卡快照

来源：human-distillation-lab 工作目录（不假定已提交）。
仅供查阅；出图采用项目内独立转写的线条和明暗方法。

## manga-authors/authors/yoshida-akimi/SKILL.md

---
name: manga-yoshida-akimi
description: "吉田秋生公开漫画／插画研究与原创绘图参谋；适用于清淡人物与繁密自然环境、日常站坐关系；按具体视觉技法编写方案。"
---

# 吉田秋生（Akimi Yoshida） · 漫画／插画创作研究卡

本轮重点为《詩歌川百景 第1卷》的公开封面／主视觉及对应书目；旧作品研究另留在 archive 初稿，不能把不同时期合成固定画风。下列绘画方案为本库原创转译，封面观察不证明连续内页的分镜规律。

选材类型：当代漫画家。本轮重点：詩歌川百景 第1卷；参考年份：2020。所选日文原版卷首次出版年份；封面原稿具体作画日未核定。〔RECENT1, RECENT2〕

方向：情感与日常。本卡研究公开作品与方法；绘图配方是本库原创转译，未训练模型、未做出图效果验证。

[100人目录](../../CATALOG.md) · [八维绘画方案](drawing.md) · [绘图提示词](prompts.md) · [结构化记录](manifest.json) · [完整创作流程](../../WORKFLOW.md)

## 适用任务

- 清淡人物与繁密自然环境
- 日常站坐关系

先读取下列研究依据，再从drawing.md选2–3项具体技法，结合项目自己的角色和世界设定，编写原创画面方案。生成时采用prompts.md的通用技法表达，不直接用作者姓名作为画风口令，不假称本人绘制或背书。用户按作者选择风格时，明确作品阶段，把视觉目标拆成可操作的特征；保留项目已有角色设定，不承诺未经实际出图验证的复现精度。

## 本轮公开依据

- 所选日文原版卷首次出版年份；封面原稿具体作画日未核定；署名分工：漫画作者〔source_summary；RECENT1〕
- 俯视的河边木道上，人物站坐错开，清淡人物线与繁密绿叶、水色及白花形成疏密差；木板斜线牵引视线，大片浅水色保留呼吸空间。〔visual_observation；RECENT2〕

绘画／叙事方法或限定画面观察的依据：RECENT2。下述原创配方不代表这些来源逐项规定了所有参数。

## 选材与分工

- 詩歌川百景 第1卷：漫画作者〔RECENT1, RECENT2〕

## 基本资料

出生年：未知／本轮未核定；逝世年：未知／本轮未核定。

活动／出版语境（非国籍）：VIZ Media的漫画出版或公开机构介绍语境；不推断民族。民族：未知，不根据姓名或出版地区推断。本轮不采集私人生活；未核生卒保持null。 〔S1〕

本次新增研究对象；未复制成其他专家分类条目。

## 缺口

- 本轮新阶段视觉观察限所列单图；未逐章核内页节奏、助手分工和长期画风变化。
- 原版出版或项目发布年份不等于每一笔原稿的绘制日期；具体日期边界见recent_focus。
- 本库8维方案、步骤和提示词属于原创转译，尚未用真实生成图验证一致性。

## 来源

- **S1** [VIZ | The Official Website for Banana Fish](https://www.viz.com/banana-fish) — VIZ Media；2026-11-01；`search_excerpt`。早期研究对照：实际web检索得到该URL与摘要/展开片段；未查看漫画内页、付费内容或色稿。可证明出版身份与简介，不能证明具体分镜和笔法。 支持：出版社确认Akimi Yoshida署名，并以精简、连续推进的叙事描述本作；漫画的八十年代纽约背景与动画更新不同。。
- **S2** [Banana Fish Vol.1英译封面：官方公开图像](https://dw9to29mmj727.cloudfront.net/products/1569319723.jpg) — VIZ Media；2026-11-01；`visual_preview`。早期研究对照：从公开页面 https://www.viz.com/banana-fish 的HTML明确提取图像URL，下载到自有/tmp后实际通过view_image查看。定位：Banana Fish Vol.1英译封面。仅查看这一封面/展示图，未阅读内页；未将HTML alt当作视觉证据。 支持：封面用大幅平涂黄绿底和黑发块，身体只有利落轮廓与少量内线，长手臂和道具斜线伸向下部题名；无花饰背景。这具体支持本作封面精简轮廓与负空间的差异，不外推枪械描绘技巧。。
- **RECENT1** [詩歌川百景 第1卷：官方书目／项目页](https://shogakukan-comic.jp/book?isbn=9784091670946) — 小学館；2026-11-01；`page_text`。本轮核对公开书目／项目文字；时间含义见date_basis，不表示通读作品。 支持：所选作品署名与版本范围；所选日文原版卷首次出版年份；封面原稿具体作画日未核定。
- **RECENT2** [詩歌川百景 第1卷：已观察的公开图像](https://shogakukan-comic.jp/book-images/w400/books/9784091670946.jpg) — 小学館；2026-11-01；`visual_preview`。实际通过图像工具查看此公开封面／主视觉，未观察整卷内页；周围排版、字体与出版设计不自动归作者。 支持：限定单幅公开图像的形体、线条、色块与构图观察。


## manga-authors/authors/yoshida-akimi/drawing.md

# 吉田秋生（Akimi Yoshida） · 八维绘画方案

以下全部是**本库原创创作转译**，不是作者原话或其全部作品的统一规则。对应公开事实与访问范围见[研究卡](SKILL.md)。先确定所选作品阶段，彩色建议不自动视为作者固定色板。

## 线条

人物用干净短线，叶片和木板以轻细碎线表达。

## 形体与人物

成年普通比例，站坐姿势松弛，四肢不模式化拉长。

## 构图

稍俯视的平台与水边斜线引导至交接动作，人物不挤成一团。

## 分镜节奏

原创分镜建议：先交代空间，再给道具与手部动作，接人物反应，最后显示动作结果；不是由单幅封面推得的作者分镜规律。

## 黑白与网点

人脸和衣服浅，树丛中灰，枝叶暗点只集中画边。

## 环境

栈道、石岸与植物需有接触关系，水色不吞没平台边缘。

## 表情动作

朴素微笑与回望为主，手的递接关系清晰。

## 彩色方案

本库原创色彩转译：透明绿、淡青、暖肤和小面积鲜色衣物。；只借所见单图的配色关系，不称固定作者色板。

## 落地步骤

1. 先以本项目故事画三张小构图，应用：稍俯视的平台与水边斜线引导至交接动作，人物不挤成一团。
2. 确认成年人物和原创衣物的结构：成年普通比例，站坐姿势松弛，四肢不模式化拉长。 再核对手与道具接触。
3. 按材质分层落线：人物用干净短线，叶片和木板以轻细碎线表达。 环境处理：栈道、石岸与植物需有接触关系，水色不吞没平台边缘。
4. 最后以灰阶缩图核对：人脸和衣服浅，树丛中灰，枝叶暗点只集中画边。 彩色版再应用：本库原创色彩转译：透明绿、淡青、暖肤和小面积鲜色衣物。；只借所见单图的配色关系，不称固定作者色板。

## 图像检查

- 缩至缩略图时，主动作和手中物是否仍先于装饰可见？
- 人物结构与所选处理是否兼容：成年普通比例，站坐姿势松弛，四肢不模式化拉长。
- 灰阶检查能否区分脸、手、衣物与背景：人脸和衣服浅，树丛中灰，枝叶暗点只集中画边。
- 用于连续页时，是否保持原故事人数、动作顺序、服装与道具方向？

## 容易失败的做法

- 把这张封面的观察当成整部作品、所有时期或全部分镜的定律。
- 把原封面人物、专属服饰、标志和签名带入原创角色；或把书封排版视为作者本人绘画。


## manga-authors/authors/yoshida-akimi/prompts.md

# 吉田秋生（Akimi Yoshida） · 原创绘图提示词

这些是可编辑的起稿模板，未实际出图。比较时统一使用“雨后浮岛港口归还机械鸟”的原创题材。角色设定页只转用形体、线条和黑白处理，不沿用场景镜头；英文版的角色技法段保留中文规格以免未经审核的翻译改变约束。

不要将本页标题或作者姓名一并粘贴到图像生成提示词。需要其他题材时替换角色、场景、行动和情绪，保留所选择的通用技法；既定发色、发长、肤色、衣色与体型优先，冲突技法或色板必须删改；最后执行[连贯性与输出检查](../../WORKFLOW.md)。

## 单幅叙事插画

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 单幅叙事插画。用干净人物轮廓和朴素表情安排日常姿势；环境以透明绿与浅青色块表现水边光线，木板或石阶线条引导视线，细花叶集中边缘，脸与手保持低密度。 不画原作品角色、标志或签名；文字如需出现，保留位置后期排版。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. One narrative illustration. Use clean figure contours and modest expressions for everyday poses. Suggest riverside light with transparent greens and pale cyan, guide the eye through boards or steps, and cluster foliage detail at the edges while keeping faces and hands uncluttered. No existing franchise designs, logos or signatures. Reserve any text for later lettering.
```

## 角色三视图

### 中文

```text
角色设定页：同一名成年修理工的正面、右侧面、背面三个完整视图；短发、短外套、工具腰带、工作靴，三视图衣物结构及比例一致。中性站姿、平视、无透视夸张、纯净背景，三个完整身体不重叠。 以下技法服从上述成年角色、服装和站姿约束；只转用造型与画面处理，忽略示例动作和场景：自然成年身形，短而干净的面部线，衣服有清楚但少量褶皱；上色轻薄，皮肤和衣缘保持区分。
```

### English / bilingual specification

```text
Character design sheet: front, right-side and rear full-body views of the same adult repair technician, with short hair, a short work jacket, tool belt and work boots. Keep anatomy, garment construction and proportions consistent. Use neutral standing poses, eye-level orthographic views, a plain background and no overlapping figures. Apply the following bilingual line, shape and tone specification subject to the adult character, clothing and neutral pose above; omit any example actions and scene directions: 自然成年身形，短而干净的面部线，衣服有清楚但少量褶皱；上色轻薄，皮肤和衣缘保持区分。
```

## 六格漫画页

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 六格漫画页，按日式从右到左、从上到下阅读。格1港口建立空间；格2修理工发现机械鸟；格3检查鸟翅；格4旅人赶来；格5修理工交还鸟；格6鸟起飞，两人目送。每格明确一个动作，角色、工具及场景方向连续。预留空白对话框，文字后期排版；不要生成签名或水印。 将以下技法用于各格，不改变上述事件、格数或顺序：用干净人物轮廓和朴素表情安排日常姿势；环境以透明绿与浅青色块表现水边光线，木板或石阶线条引导视线，细花叶集中边缘，脸与手保持低密度。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. A six-panel manga page, read from right to left and top to bottom. Panel 1 establishes the harbor; 2 the technician discovers the bird; 3 inspects its wing; 4 the traveler arrives; 5 the bird is returned; 6 it flies away as both adults watch. Show one clear action per panel; preserve character, prop and screen-direction continuity. Leave speech balloons empty for later lettering. No signatures or watermarks. Apply the following techniques within each panel without changing the events, panel count or sequence: Use clean figure contours and modest expressions for everyday poses. Suggest riverside light with transparent greens and pale cyan, guide the eye through boards or steps, and cluster foliage detail at the edges while keeping faces and hands uncluttered.
```


## manga-authors/authors/yoshida-akimi/manifest.json

{
  "id": "yoshida-akimi",
  "name": "Akimi Yoshida",
  "name_zh": "吉田秋生",
  "legacy_refs": [],
  "name_ja": "吉田秋生",
  "family": "情感与日常",
  "scope": "本轮重点为《詩歌川百景 第1卷》的公开封面／主视觉及对应书目；旧作品研究另留在 archive 初稿，不能把不同时期合成固定画风。下列绘画方案为本库原创转译，封面观察不证明连续内页的分镜规律。",
  "reference_works": [
    {
      "title": "詩歌川百景 第1卷",
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
      "title": "VIZ | The Official Website for Banana Fish",
      "url": "https://www.viz.com/banana-fish",
      "publisher": "VIZ Media",
      "accessed_at": "2026-11-01",
      "access_method": "search_excerpt",
      "supports": [
        "出版社确认Akimi Yoshida署名，并以精简、连续推进的叙事描述本作；漫画的八十年代纽约背景与动画更新不同。"
      ],
      "access_note": "早期研究对照：实际web检索得到该URL与摘要/展开片段；未查看漫画内页、付费内容或色稿。可证明出版身份与简介，不能证明具体分镜和笔法。",
      "context": "historical_reference"
    },
    {
      "id": "S2",
      "title": "Banana Fish Vol.1英译封面：官方公开图像",
      "url": "https://dw9to29mmj727.cloudfront.net/products/1569319723.jpg",
      "publisher": "VIZ Media",
      "accessed_at": "2026-11-01",
      "access_method": "visual_preview",
      "supports": [
        "封面用大幅平涂黄绿底和黑发块，身体只有利落轮廓与少量内线，长手臂和道具斜线伸向下部题名；无花饰背景。这具体支持本作封面精简轮廓与负空间的差异，不外推枪械描绘技巧。"
      ],
      "access_note": "早期研究对照：从公开页面 https://www.viz.com/banana-fish 的HTML明确提取图像URL，下载到自有/tmp后实际通过view_image查看。定位：Banana Fish Vol.1英译封面。仅查看这一封面/展示图，未阅读内页；未将HTML alt当作视觉证据。",
      "origin_page_url": "https://www.viz.com/banana-fish",
      "observed_asset_sha256": "fac845f84ffe2270b1b706d841dabdfada4d4e5a6dfc03b42166cd56c79d27f0",
      "context": "historical_reference"
    },
    {
      "id": "RECENT1",
      "title": "詩歌川百景 第1卷：官方书目／项目页",
      "url": "https://shogakukan-comic.jp/book?isbn=9784091670946",
      "publisher": "小学館",
      "accessed_at": "2026-11-01",
      "access_method": "page_text",
      "supports": [
        "所选作品署名与版本范围",
        "所选日文原版卷首次出版年份；封面原稿具体作画日未核定"
      ],
      "access_note": "本轮核对公开书目／项目文字；时间含义见date_basis，不表示通读作品。"
    },
    {
      "id": "RECENT2",
      "title": "詩歌川百景 第1卷：已观察的公开图像",
      "url": "https://shogakukan-comic.jp/book-images/w400/books/9784091670946.jpg",
      "publisher": "小学館",
      "accessed_at": "2026-11-01",
      "access_method": "visual_preview",
      "supports": [
        "限定单幅公开图像的形体、线条、色块与构图观察"
      ],
      "access_note": "实际通过图像工具查看此公开封面／主视觉，未观察整卷内页；周围排版、字体与出版设计不自动归作者。",
      "origin_page_url": "https://shogakukan-comic.jp/book?isbn=9784091670946",
      "observed_asset_sha256": "aff73c675152f38f557854376b41ff7d5867e262a5cd3817bf6c25e6e158c0fc"
    }
  ],
  "findings": [
    {
      "text": "所选日文原版卷首次出版年份；封面原稿具体作画日未核定；署名分工：漫画作者",
      "basis": "source_summary",
      "source_ids": [
        "RECENT1"
      ]
    },
    {
      "text": "俯视的河边木道上，人物站坐错开，清淡人物线与繁密绿叶、水色及白花形成疏密差；木板斜线牵引视线，大片浅水色保留呼吸空间。",
      "basis": "visual_observation",
      "source_ids": [
        "RECENT2"
      ]
    }
  ],
  "visual_recipe": {
    "line": "人物用干净短线，叶片和木板以轻细碎线表达。",
    "shapes": "成年普通比例，站坐姿势松弛，四肢不模式化拉长。",
    "composition": "稍俯视的平台与水边斜线引导至交接动作，人物不挤成一团。",
    "panel_rhythm": "原创分镜建议：先交代空间，再给道具与手部动作，接人物反应，最后显示动作结果；不是由单幅封面推得的作者分镜规律。",
    "tonal_design": "人脸和衣服浅，树丛中灰，枝叶暗点只集中画边。",
    "environment": "栈道、石岸与植物需有接触关系，水色不吞没平台边缘。",
    "acting": "朴素微笑与回望为主，手的递接关系清晰。",
    "color": "本库原创色彩转译：透明绿、淡青、暖肤和小面积鲜色衣物。；只借所见单图的配色关系，不称固定作者色板。"
  },
  "drawing_steps": [
    "先以本项目故事画三张小构图，应用：稍俯视的平台与水边斜线引导至交接动作，人物不挤成一团。",
    "确认成年人物和原创衣物的结构：成年普通比例，站坐姿势松弛，四肢不模式化拉长。 再核对手与道具接触。",
    "按材质分层落线：人物用干净短线，叶片和木板以轻细碎线表达。 环境处理：栈道、石岸与植物需有接触关系，水色不吞没平台边缘。",
    "最后以灰阶缩图核对：人脸和衣服浅，树丛中灰，枝叶暗点只集中画边。 彩色版再应用：本库原创色彩转译：透明绿、淡青、暖肤和小面积鲜色衣物。；只借所见单图的配色关系，不称固定作者色板。"
  ],
  "review_checks": [
    "缩至缩略图时，主动作和手中物是否仍先于装饰可见？",
    "人物结构与所选处理是否兼容：成年普通比例，站坐姿势松弛，四肢不模式化拉长。",
    "灰阶检查能否区分脸、手、衣物与背景：人脸和衣服浅，树丛中灰，枝叶暗点只集中画边。",
    "用于连续页时，是否保持原故事人数、动作顺序、服装与道具方向？"
  ],
  "avoid": [
    "把这张封面的观察当成整部作品、所有时期或全部分镜的定律。",
    "把原封面人物、专属服饰、标志和签名带入原创角色；或把书封排版视为作者本人绘画。"
  ],
  "best_for": [
    "清淡人物与繁密自然环境",
    "日常站坐关系"
  ],
  "prompt_core_zh": "用干净人物轮廓和朴素表情安排日常姿势；环境以透明绿与浅青色块表现水边光线，木板或石阶线条引导视线，细花叶集中边缘，脸与手保持低密度。",
  "prompt_core_en": "Use clean figure contours and modest expressions for everyday poses. Suggest riverside light with transparent greens and pale cyan, guide the eye through boards or steps, and cluster foliage detail at the edges while keeping faces and hands uncluttered.",
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
  "sheet_traits_zh": "自然成年身形，短而干净的面部线，衣服有清楚但少量褶皱；上色轻薄，皮肤和衣缘保持区分。",
  "focus": "动作与冒险",
  "historical_scope": "BANANA FISH漫画第1卷英译版。仅限该漫画版本的署名与公开介绍；不外推全部生涯，不以动画或真人改编替代漫画观察。",
  "recent_focus": {
    "work": "詩歌川百景 第1卷",
    "year": 2020,
    "source_ids": [
      "RECENT1",
      "RECENT2"
    ],
    "date_basis": "所选日文原版卷首次出版年份；封面原稿具体作画日未核定"
  },
  "creator_type": "manga-artist"
}
