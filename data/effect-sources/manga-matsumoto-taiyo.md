# 松本大洋 · 本地研究卡快照

来源：human-distillation-lab 工作目录（不假定已提交）。
仅供查阅；出图采用项目内独立转写的线条和明暗方法。

## manga-authors/authors/matsumoto-taiyo/SKILL.md

---
name: manga-matsumoto-taiyo
description: "松本大洋公开漫画／插画研究与原创绘图参谋；适用于主物与城市的尺度反差、松动手绘线与柔色环境；按具体视觉技法编写方案。"
---

# 松本大洋（Taiyo Matsumoto） · 漫画／插画创作研究卡

本轮重点为《東京ヒゴロ 第1卷封面》的公开封面／主视觉及对应书目；旧作品研究另留在 archive 初稿，不能把不同时期合成固定画风。下列绘画方案为本库原创转译，封面观察不证明连续内页的分镜规律。

选材类型：当代漫画家。本轮重点：東京ヒゴロ 第1卷封面；参考年份：2021。所选日文原版卷首次出版年份；封面原稿具体作画日未核定。〔RECENT1, RECENT2〕

方向：情感与日常。本卡研究公开作品与方法；绘图配方是本库原创转译，未训练模型、未做出图效果验证。

[100人目录](../../CATALOG.md) · [八维绘画方案](drawing.md) · [绘图提示词](prompts.md) · [结构化记录](manifest.json) · [完整创作流程](../../WORKFLOW.md)

## 适用任务

- 主物与城市的尺度反差
- 松动手绘线与柔色环境

先读取下列研究依据，再从drawing.md选2–3项具体技法，结合项目自己的角色和世界设定，编写原创画面方案。生成时采用prompts.md的通用技法表达，不直接用作者姓名作为画风口令，不假称本人绘制或背书。用户按作者选择风格时，明确作品阶段，把视觉目标拆成可操作的特征；保留项目已有角色设定，不承诺未经实际出图验证的复现精度。

## 本轮公开依据

- 所选日文原版卷首次出版年份；封面原稿具体作画日未核定；署名分工：漫画作者〔source_summary；RECENT1〕
- 巨大白鸟的头部占画面右上，下方是小尺度城市屋顶；鸟身几乎留白，鸟喙呈浅粉薄色，城市细线松动、层层挤压，米色背景把反差收住。〔visual_observation；RECENT2〕

绘画／叙事方法或限定画面观察的依据：RECENT2。下述原创配方不代表这些来源逐项规定了所有参数。

## 选材与分工

- 東京ヒゴロ 第1卷封面：漫画作者〔RECENT1, RECENT2〕

## 基本资料

出生年：未知／本轮未核定；逝世年：未知／本轮未核定。

活动／出版语境（非国籍）：VIZ Media的漫画出版或公开机构介绍语境；不推断民族。民族：未知，不根据姓名或出版地区推断。本轮不采集私人生活；未核生卒保持null。 〔S1〕

本次新增研究对象；未复制成其他专家分类条目。

## 缺口

- 本轮新阶段视觉观察限所列单图；未逐章核内页节奏、助手分工和长期画风变化。
- 原版出版或项目发布年份不等于每一笔原稿的绘制日期；具体日期边界见recent_focus。
- 本库8维方案、步骤和提示词属于原创转译，尚未用真实生成图验证一致性。

## 来源

- **S1** [VIZ | The Official Website for Ping Pong](https://www.viz.com/ping-pong) — VIZ Media；2026-11-01；`search_excerpt`。早期研究对照：实际web检索得到该URL与摘要/展开片段；未查看漫画内页、付费内容或色稿。可证明出版身份与简介，不能证明具体分镜和笔法。 支持：出版社确认漫画作者及两卷英译版范围，主题为竞技、友谊和自我认识；动画不在研究范围。。
- **S2** [Ping Pong 英译Vol. One封面，ISBN 197471165X：官方公开图像](https://dw9to29mmj727.cloudfront.net/products/197471165X.jpg) — VIZ Media；2026-11-01；`visual_preview`。早期研究对照：从公开页面 https://www.viz.com/ping-pong 的HTML明确提取图像URL，下载到自有/tmp后实际通过view_image查看。定位：Ping Pong 英译Vol. One封面，ISBN 197471165X。仅查看这一封面/展示图，未阅读内页；未将HTML alt当作视觉证据。 支持：封面以许多黑白漫画格的拼贴围绕蓝绿色题名块；局部可见不规则人物轮廓、强透视球台与动作姿态。因是封面重新拼贴，不能据其排列推断原版连续阅读节奏。。
- **RECENT1** [東京ヒゴロ 第1卷封面：官方书目／项目页](https://shogakukan-comic.jp/book?isbn=9784098611171) — 小学館；2026-11-01；`page_text`。本轮核对公开书目／项目文字；时间含义见date_basis，不表示通读作品。 支持：所选作品署名与版本范围；所选日文原版卷首次出版年份；封面原稿具体作画日未核定。
- **RECENT2** [東京ヒゴロ 第1卷封面：已观察的公开图像](https://shogakukan-comic.jp/book-images/ogp/books/9784098611171.jpg) — 小学館；2026-11-01；`visual_preview`。实际通过图像工具查看此公开封面／主视觉，未观察整卷内页；周围排版、字体与出版设计不自动归作者。 支持：限定单幅公开图像的形体、线条、色块与构图观察。


## manga-authors/authors/matsumoto-taiyo/drawing.md

# 松本大洋（Taiyo Matsumoto） · 八维绘画方案

以下全部是**本库原创创作转译**，不是作者原话或其全部作品的统一规则。对应公开事实与访问范围见[研究卡](SKILL.md)。先确定所选作品阶段，彩色建议不自动视为作者固定色板。

## 线条

细而略不齐的环境线与柔和大轮廓形成密度反差。

## 形体与人物

主物先概括大形；成年人物的自然不对称方案为本库补充，非鸟封面直接证明。

## 构图

利用机械鸟与港口景物的大小对照，留一片大浅色面。

## 分镜节奏

原创分镜建议：先交代空间，再给道具与手部动作，接人物反应，最后显示动作结果；不是由单幅封面推得的作者分镜规律。

## 黑白与网点

主体浅、大环境细灰，少量深点控制目光落点。

## 环境

屋顶、门窗、烟囱以松动手绘线层叠，尺度关系仍一致。

## 表情动作

少量动作与停顿让观察占主导，姿态不沿旧乒乓挥拍。

## 彩色方案

本库原创色彩转译：米白、灰褐、柔粉小块，保持纸面质感。；只借所见单图的配色关系，不称固定作者色板。

## 落地步骤

1. 先以本项目故事画三张小构图，应用：利用机械鸟与港口景物的大小对照，留一片大浅色面。
2. 确认成年人物和原创衣物的结构：主物先概括大形；成年人物的自然不对称方案为本库补充，非鸟封面直接证明。 再核对手与道具接触。
3. 按材质分层落线：细而略不齐的环境线与柔和大轮廓形成密度反差。 环境处理：屋顶、门窗、烟囱以松动手绘线层叠，尺度关系仍一致。
4. 最后以灰阶缩图核对：主体浅、大环境细灰，少量深点控制目光落点。 彩色版再应用：本库原创色彩转译：米白、灰褐、柔粉小块，保持纸面质感。；只借所见单图的配色关系，不称固定作者色板。

## 图像检查

- 缩至缩略图时，主动作和手中物是否仍先于装饰可见？
- 人物结构与所选处理是否兼容：主物先概括大形；成年人物的自然不对称方案为本库补充，非鸟封面直接证明。
- 灰阶检查能否区分脸、手、衣物与背景：主体浅、大环境细灰，少量深点控制目光落点。
- 用于连续页时，是否保持原故事人数、动作顺序、服装与道具方向？

## 容易失败的做法

- 把这张封面的观察当成整部作品、所有时期或全部分镜的定律。
- 把原封面人物、专属服饰、标志和签名带入原创角色；或把书封排版视为作者本人绘画。


## manga-authors/authors/matsumoto-taiyo/prompts.md

# 松本大洋（Taiyo Matsumoto） · 原创绘图提示词

这些是可编辑的起稿模板，未实际出图。比较时统一使用“雨后浮岛港口归还机械鸟”的原创题材。角色设定页只转用形体、线条和黑白处理，不沿用场景镜头；英文版的角色技法段保留中文规格以免未经审核的翻译改变约束。

不要将本页标题或作者姓名一并粘贴到图像生成提示词。需要其他题材时替换角色、场景、行动和情绪，保留所选择的通用技法；既定发色、发长、肤色、衣色与体型优先，冲突技法或色板必须删改；最后执行[连贯性与输出检查](../../WORKFLOW.md)。

## 单幅叙事插画

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 单幅叙事插画。用大小尺度反差组织主物与生活环境，近景轮廓柔和简练，远景房屋以细而略不齐的线层叠；米白与淡灰褐为主，仅在焦点加柔粉，保留手绘的不均匀但空间关系清楚。 不画原作品角色、标志或签名；文字如需出现，保留位置后期排版。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. One narrative illustration. Organize a strong scale contrast between the main subject and everyday surroundings. Use soft economical foreground contours and layered slightly uneven building lines, with cream and gray-brown tones and a small soft-pink focus. No existing franchise designs, logos or signatures. Reserve any text for later lettering.
```

## 角色三视图

### 中文

```text
角色设定页：同一名成年修理工的正面、右侧面、背面三个完整视图；短发、短外套、工具腰带、工作靴，三视图衣物结构及比例一致。中性站姿、平视、无透视夸张、纯净背景，三个完整身体不重叠。 以下技法服从上述成年角色、服装和站姿约束；只转用造型与画面处理，忽略示例动作和场景：成年人体采用自然略不对称轮廓，面部简洁，线条保留手绘松动；此人体方案为原创转译，所见新封面仅有鸟与城市，不能当成年人体直接证据。
```

### English / bilingual specification

```text
Character design sheet: front, right-side and rear full-body views of the same adult repair technician, with short hair, a short work jacket, tool belt and work boots. Keep anatomy, garment construction and proportions consistent. Use neutral standing poses, eye-level orthographic views, a plain background and no overlapping figures. Apply the following bilingual line, shape and tone specification subject to the adult character, clothing and neutral pose above; omit any example actions and scene directions: 成年人体采用自然略不对称轮廓，面部简洁，线条保留手绘松动；此人体方案为原创转译，所见新封面仅有鸟与城市，不能当成年人体直接证据。
```

## 六格漫画页

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 六格漫画页，按日式从右到左、从上到下阅读。格1港口建立空间；格2修理工发现机械鸟；格3检查鸟翅；格4旅人赶来；格5修理工交还鸟；格6鸟起飞，两人目送。每格明确一个动作，角色、工具及场景方向连续。预留空白对话框，文字后期排版；不要生成签名或水印。 将以下技法用于各格，不改变上述事件、格数或顺序：用大小尺度反差组织主物与生活环境，近景轮廓柔和简练，远景房屋以细而略不齐的线层叠；米白与淡灰褐为主，仅在焦点加柔粉，保留手绘的不均匀但空间关系清楚。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. A six-panel manga page, read from right to left and top to bottom. Panel 1 establishes the harbor; 2 the technician discovers the bird; 3 inspects its wing; 4 the traveler arrives; 5 the bird is returned; 6 it flies away as both adults watch. Show one clear action per panel; preserve character, prop and screen-direction continuity. Leave speech balloons empty for later lettering. No signatures or watermarks. Apply the following techniques within each panel without changing the events, panel count or sequence: Organize a strong scale contrast between the main subject and everyday surroundings. Use soft economical foreground contours and layered slightly uneven building lines, with cream and gray-brown tones and a small soft-pink focus.
```


## manga-authors/authors/matsumoto-taiyo/manifest.json

{
  "id": "matsumoto-taiyo",
  "name": "Taiyo Matsumoto",
  "name_zh": "松本大洋",
  "legacy_refs": [],
  "name_ja": "松本大洋",
  "family": "情感与日常",
  "scope": "本轮重点为《東京ヒゴロ 第1卷封面》的公开封面／主视觉及对应书目；旧作品研究另留在 archive 初稿，不能把不同时期合成固定画风。下列绘画方案为本库原创转译，封面观察不证明连续内页的分镜规律。",
  "reference_works": [
    {
      "title": "東京ヒゴロ 第1卷封面",
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
      "title": "VIZ | The Official Website for Ping Pong",
      "url": "https://www.viz.com/ping-pong",
      "publisher": "VIZ Media",
      "accessed_at": "2026-11-01",
      "access_method": "search_excerpt",
      "supports": [
        "出版社确认漫画作者及两卷英译版范围，主题为竞技、友谊和自我认识；动画不在研究范围。"
      ],
      "access_note": "早期研究对照：实际web检索得到该URL与摘要/展开片段；未查看漫画内页、付费内容或色稿。可证明出版身份与简介，不能证明具体分镜和笔法。",
      "context": "historical_reference"
    },
    {
      "id": "S2",
      "title": "Ping Pong 英译Vol. One封面，ISBN 197471165X：官方公开图像",
      "url": "https://dw9to29mmj727.cloudfront.net/products/197471165X.jpg",
      "publisher": "VIZ Media",
      "accessed_at": "2026-11-01",
      "access_method": "visual_preview",
      "supports": [
        "封面以许多黑白漫画格的拼贴围绕蓝绿色题名块；局部可见不规则人物轮廓、强透视球台与动作姿态。因是封面重新拼贴，不能据其排列推断原版连续阅读节奏。"
      ],
      "access_note": "早期研究对照：从公开页面 https://www.viz.com/ping-pong 的HTML明确提取图像URL，下载到自有/tmp后实际通过view_image查看。定位：Ping Pong 英译Vol. One封面，ISBN 197471165X。仅查看这一封面/展示图，未阅读内页；未将HTML alt当作视觉证据。",
      "origin_page_url": "https://www.viz.com/ping-pong",
      "observed_asset_sha256": "868681ab8ad9703954183f04547ae53b36c801a30ea4e70905bfb756f0626675",
      "context": "historical_reference"
    },
    {
      "id": "RECENT1",
      "title": "東京ヒゴロ 第1卷封面：官方书目／项目页",
      "url": "https://shogakukan-comic.jp/book?isbn=9784098611171",
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
      "title": "東京ヒゴロ 第1卷封面：已观察的公开图像",
      "url": "https://shogakukan-comic.jp/book-images/ogp/books/9784098611171.jpg",
      "publisher": "小学館",
      "accessed_at": "2026-11-01",
      "access_method": "visual_preview",
      "supports": [
        "限定单幅公开图像的形体、线条、色块与构图观察"
      ],
      "access_note": "实际通过图像工具查看此公开封面／主视觉，未观察整卷内页；周围排版、字体与出版设计不自动归作者。",
      "origin_page_url": "https://shogakukan-comic.jp/book?isbn=9784098611171",
      "observed_asset_sha256": "f503961051e3330b2720159460c3b101eba1814381e8095f84022479897167ee"
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
      "text": "巨大白鸟的头部占画面右上，下方是小尺度城市屋顶；鸟身几乎留白，鸟喙呈浅粉薄色，城市细线松动、层层挤压，米色背景把反差收住。",
      "basis": "visual_observation",
      "source_ids": [
        "RECENT2"
      ]
    }
  ],
  "visual_recipe": {
    "line": "细而略不齐的环境线与柔和大轮廓形成密度反差。",
    "shapes": "主物先概括大形；成年人物的自然不对称方案为本库补充，非鸟封面直接证明。",
    "composition": "利用机械鸟与港口景物的大小对照，留一片大浅色面。",
    "panel_rhythm": "原创分镜建议：先交代空间，再给道具与手部动作，接人物反应，最后显示动作结果；不是由单幅封面推得的作者分镜规律。",
    "tonal_design": "主体浅、大环境细灰，少量深点控制目光落点。",
    "environment": "屋顶、门窗、烟囱以松动手绘线层叠，尺度关系仍一致。",
    "acting": "少量动作与停顿让观察占主导，姿态不沿旧乒乓挥拍。",
    "color": "本库原创色彩转译：米白、灰褐、柔粉小块，保持纸面质感。；只借所见单图的配色关系，不称固定作者色板。"
  },
  "drawing_steps": [
    "先以本项目故事画三张小构图，应用：利用机械鸟与港口景物的大小对照，留一片大浅色面。",
    "确认成年人物和原创衣物的结构：主物先概括大形；成年人物的自然不对称方案为本库补充，非鸟封面直接证明。 再核对手与道具接触。",
    "按材质分层落线：细而略不齐的环境线与柔和大轮廓形成密度反差。 环境处理：屋顶、门窗、烟囱以松动手绘线层叠，尺度关系仍一致。",
    "最后以灰阶缩图核对：主体浅、大环境细灰，少量深点控制目光落点。 彩色版再应用：本库原创色彩转译：米白、灰褐、柔粉小块，保持纸面质感。；只借所见单图的配色关系，不称固定作者色板。"
  ],
  "review_checks": [
    "缩至缩略图时，主动作和手中物是否仍先于装饰可见？",
    "人物结构与所选处理是否兼容：主物先概括大形；成年人物的自然不对称方案为本库补充，非鸟封面直接证明。",
    "灰阶检查能否区分脸、手、衣物与背景：主体浅、大环境细灰，少量深点控制目光落点。",
    "用于连续页时，是否保持原故事人数、动作顺序、服装与道具方向？"
  ],
  "avoid": [
    "把这张封面的观察当成整部作品、所有时期或全部分镜的定律。",
    "把原封面人物、专属服饰、标志和签名带入原创角色；或把书封排版视为作者本人绘画。"
  ],
  "best_for": [
    "主物与城市的尺度反差",
    "松动手绘线与柔色环境"
  ],
  "prompt_core_zh": "用大小尺度反差组织主物与生活环境，近景轮廓柔和简练，远景房屋以细而略不齐的线层叠；米白与淡灰褐为主，仅在焦点加柔粉，保留手绘的不均匀但空间关系清楚。",
  "prompt_core_en": "Organize a strong scale contrast between the main subject and everyday surroundings. Use soft economical foreground contours and layered slightly uneven building lines, with cream and gray-brown tones and a small soft-pink focus.",
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
  "sheet_traits_zh": "成年人体采用自然略不对称轮廓，面部简洁，线条保留手绘松动；此人体方案为原创转译，所见新封面仅有鸟与城市，不能当成年人体直接证据。",
  "focus": "动作与冒险",
  "historical_scope": "乒乓（Ping Pong）。仅限该漫画版本的署名与公开介绍；不外推全部生涯，不以动画或真人改编替代漫画观察。",
  "recent_focus": {
    "work": "東京ヒゴロ 第1卷封面",
    "year": 2021,
    "source_ids": [
      "RECENT1",
      "RECENT2"
    ],
    "date_basis": "所选日文原版卷首次出版年份；封面原稿具体作画日未核定"
  },
  "creator_type": "manga-artist"
}
