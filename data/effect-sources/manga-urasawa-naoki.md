# 浦泽直树 · 本地研究卡快照

来源：human-distillation-lab 工作目录（不假定已提交）。
仅供查阅；出图采用项目内独立转写的线条和明暗方法。

## manga-authors/authors/urasawa-naoki/SKILL.md

---
name: manga-urasawa-naoki
description: "浦泽直树公开漫画／插画研究与原创绘图参谋；适用于成年角色复杂表情、生活环境与人物同框；按具体视觉技法编写方案。"
---

# 浦泽直树（Naoki Urasawa） · 漫画／插画创作研究卡

本轮重点为《あさドラ！第1卷》的公开封面／主视觉及对应书目；旧作品研究另留在 archive 初稿，不能把不同时期合成固定画风。下列绘画方案为本库原创转译，封面观察不证明连续内页的分镜规律。

选材类型：当代漫画家。本轮重点：あさドラ！第1卷；参考年份：2019。所选日文原版卷首次出版年份；封面原稿具体作画日未核定。〔RECENT1, RECENT2〕

方向：情感与日常。本卡研究公开作品与方法；绘图配方是本库原创转译，未训练模型、未做出图效果验证。

[100人目录](../../CATALOG.md) · [八维绘画方案](drawing.md) · [绘图提示词](prompts.md) · [结构化记录](manifest.json) · [完整创作流程](../../WORKFLOW.md)

## 适用任务

- 成年角色复杂表情
- 生活环境与人物同框

先读取下列研究依据，再从drawing.md选2–3项具体技法，结合项目自己的角色和世界设定，编写原创画面方案。生成时采用prompts.md的通用技法表达，不直接用作者姓名作为画风口令，不假称本人绘制或背书。用户按作者选择风格时，明确作品阶段，把视觉目标拆成可操作的特征；保留项目已有角色设定，不承诺未经实际出图验证的复现精度。

## 本轮公开依据

- 所选日文原版卷首次出版年份；封面原稿具体作画日未核定；署名分工：漫画作者〔source_summary；RECENT1〕
- 封面将人物与木屋、车辆、站台等片段组织成照片式叠放；人物圆润面部与干净衣领，对照环境中细密木板和金属刻线。人物抬手至脸侧，眉眼和嘴角保持轻微不对称。〔visual_observation；RECENT2〕

绘画／叙事方法或限定画面观察的依据：RECENT2。下述原创配方不代表这些来源逐项规定了所有参数。

## 选材与分工

- あさドラ！第1卷：漫画作者〔RECENT1, RECENT2〕

## 基本资料

出生年：未知／本轮未核定；逝世年：未知／本轮未核定。

活动／出版语境（非国籍）：本轮核定为日本漫画出版或展览语境；不据此推定民族。民族：未知，不根据姓名或出版地区推断。生卒未逐人全面核查，保留null；公开署名为笔名时不当作法定姓名。 〔S1〕

- [原专业条目](../../../cartoonists/urasawa-naoki/SKILL.md) · [已有基本资料](../../../cartoonists/urasawa-naoki/biography.md)

## 缺口

- 本轮新阶段视觉观察限所列单图；未逐章核内页节奏、助手分工和长期画风变化。
- 原版出版或项目发布年份不等于每一笔原稿的绘制日期；具体日期边界见recent_focus。
- 本库8维方案、步骤和提示词属于原创转译，尚未用真实生成图验证一致性。

## 来源

- **S1** [MONSTER 完全版 1｜小学館コミック](https://shogakukan-comic.jp/book?isbn=9784091817907) — 小学館；2026-11-01；`search_excerpt`。早期研究对照：实际检索获得出版社/机构摘要；未据摘要声称阅读漫画内页。 支持：出版社确认完全版第1卷以神经外科医师及连环事件构成悬疑，并列出具体收录章目。。
- **S2** [知覚の扉を開き微妙な感情までも紙の上に描きたい](https://president.jp/articles/-/34537) — PRESIDENT Online（ロート製薬提供访谈）；2026-11-01；`interview_text`。早期研究对照：实际web打开阅读L52—66；广告提供背景已标明，仅概括本人创作回答，不引用产品主张。 支持：浦泽在访谈中说明会观察演员面部各部分形状与位置，并从眉毛和眼睛开始判断角色是否演得成立，必要时反复修改眼睛；他希望画出简单喜怒哀乐之间的复杂表情。。
- **RECENT1** [あさドラ！第1卷：官方书目／项目页](https://shogakukan-comic.jp/book?isbn=9784098602780) — 小学館；2026-11-01；`page_text`。本轮核对公开书目／项目文字；时间含义见date_basis，不表示通读作品。 支持：所选作品署名与版本范围；所选日文原版卷首次出版年份；封面原稿具体作画日未核定。
- **RECENT2** [あさドラ！第1卷：已观察的公开图像](https://shogakukan-comic.jp/book-images/w400/books/9784098602780.jpg) — 小学館；2026-11-01；`visual_preview`。实际通过图像工具查看此公开封面／主视觉，未观察整卷内页；周围排版、字体与出版设计不自动归作者。 支持：限定单幅公开图像的形体、线条、色块与构图观察。


## manga-authors/authors/urasawa-naoki/drawing.md

# 浦泽直树（Naoki Urasawa） · 八维绘画方案

以下全部是**本库原创创作转译**，不是作者原话或其全部作品的统一规则。对应公开事实与访问范围见[研究卡](SKILL.md)。先确定所选作品阶段，彩色建议不自动视为作者固定色板。

## 线条

人物线简洁，木板金属等环境用更细刻线，眉眼比例需反复微调。

## 形体与人物

自然成年体型，用额头、鼻形、发量和肩宽区分既定角色。

## 构图

先建立带生活痕迹的港口，再使脸与手在环境中清楚露出。

## 分镜节奏

原创分镜建议：先交代空间，再给道具与手部动作，接人物反应，最后显示动作结果；不是由单幅封面推得的作者分镜规律。

## 黑白与网点

人物脸部保持白，衣领与眼瞳集中黑，环境以浅灰错层。

## 环境

木屋、旧车和栈道选两种作为时代线索，不机械拼贴原封面。

## 表情动作

略不对称的眉眼和嘴角表达复杂情绪，避免每张脸只剩喜怒符号。

## 彩色方案

本库原创色彩转译：低饱和暖灰统一人物与环境，小面积暖色提亮视线。；只借所见单图的配色关系，不称固定作者色板。

## 落地步骤

1. 先以本项目故事画三张小构图，应用：先建立带生活痕迹的港口，再使脸与手在环境中清楚露出。
2. 确认成年人物和原创衣物的结构：自然成年体型，用额头、鼻形、发量和肩宽区分既定角色。 再核对手与道具接触。
3. 按材质分层落线：人物线简洁，木板金属等环境用更细刻线，眉眼比例需反复微调。 环境处理：木屋、旧车和栈道选两种作为时代线索，不机械拼贴原封面。
4. 最后以灰阶缩图核对：人物脸部保持白，衣领与眼瞳集中黑，环境以浅灰错层。 彩色版再应用：本库原创色彩转译：低饱和暖灰统一人物与环境，小面积暖色提亮视线。；只借所见单图的配色关系，不称固定作者色板。

## 图像检查

- 缩至缩略图时，主动作和手中物是否仍先于装饰可见？
- 人物结构与所选处理是否兼容：自然成年体型，用额头、鼻形、发量和肩宽区分既定角色。
- 灰阶检查能否区分脸、手、衣物与背景：人物脸部保持白，衣领与眼瞳集中黑，环境以浅灰错层。
- 用于连续页时，是否保持原故事人数、动作顺序、服装与道具方向？

## 容易失败的做法

- 把这张封面的观察当成整部作品、所有时期或全部分镜的定律。
- 把原封面人物、专属服饰、标志和签名带入原创角色；或把书封排版视为作者本人绘画。


## manga-authors/authors/urasawa-naoki/prompts.md

# 浦泽直树（Naoki Urasawa） · 原创绘图提示词

这些是可编辑的起稿模板，未实际出图。比较时统一使用“雨后浮岛港口归还机械鸟”的原创题材。角色设定页只转用形体、线条和黑白处理，不沿用场景镜头；英文版的角色技法段保留中文规格以免未经审核的翻译改变约束。

不要将本页标题或作者姓名一并粘贴到图像生成提示词。需要其他题材时替换角色、场景、行动和情绪，保留所选择的通用技法；既定发色、发长、肤色、衣色与体型优先，冲突技法或色板必须删改；最后执行[连贯性与输出检查](../../WORKFLOW.md)。

## 单幅叙事插画

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 单幅叙事插画。用自然成年比例、微小眉眼差和不对称嘴角表现情绪；简洁人物轮廓与有年代感的细密器物纹理并置，以低饱和暖灰统一空间，关键手势保持可读。 不画原作品角色、标志或签名；文字如需出现，保留位置后期排版。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. One narrative illustration. Use natural adult proportions, small brow differences and asymmetric mouth corners. Contrast clean figure contours with finely observed worn objects; unify the scene in muted warm grays and keep the key hand gesture readable. No existing franchise designs, logos or signatures. Reserve any text for later lettering.
```

## 角色三视图

### 中文

```text
角色设定页：同一名成年修理工的正面、右侧面、背面三个完整视图；短发、短外套、工具腰带、工作靴，三视图衣物结构及比例一致。中性站姿、平视、无透视夸张、纯净背景，三个完整身体不重叠。 以下技法服从上述成年角色、服装和站姿约束；只转用造型与画面处理，忽略示例动作和场景：自然成年比例，简洁发束与圆转面部，眉眼可作细微差别；衣领和工具接口明确，阴影薄而不糊。
```

### English / bilingual specification

```text
Character design sheet: front, right-side and rear full-body views of the same adult repair technician, with short hair, a short work jacket, tool belt and work boots. Keep anatomy, garment construction and proportions consistent. Use neutral standing poses, eye-level orthographic views, a plain background and no overlapping figures. Apply the following bilingual line, shape and tone specification subject to the adult character, clothing and neutral pose above; omit any example actions and scene directions: 自然成年比例，简洁发束与圆转面部，眉眼可作细微差别；衣领和工具接口明确，阴影薄而不糊。
```

## 六格漫画页

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 六格漫画页，按日式从右到左、从上到下阅读。格1港口建立空间；格2修理工发现机械鸟；格3检查鸟翅；格4旅人赶来；格5修理工交还鸟；格6鸟起飞，两人目送。每格明确一个动作，角色、工具及场景方向连续。预留空白对话框，文字后期排版；不要生成签名或水印。 将以下技法用于各格，不改变上述事件、格数或顺序：用自然成年比例、微小眉眼差和不对称嘴角表现情绪；简洁人物轮廓与有年代感的细密器物纹理并置，以低饱和暖灰统一空间，关键手势保持可读。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. A six-panel manga page, read from right to left and top to bottom. Panel 1 establishes the harbor; 2 the technician discovers the bird; 3 inspects its wing; 4 the traveler arrives; 5 the bird is returned; 6 it flies away as both adults watch. Show one clear action per panel; preserve character, prop and screen-direction continuity. Leave speech balloons empty for later lettering. No signatures or watermarks. Apply the following techniques within each panel without changing the events, panel count or sequence: Use natural adult proportions, small brow differences and asymmetric mouth corners. Contrast clean figure contours with finely observed worn objects; unify the scene in muted warm grays and keep the key hand gesture readable.
```


## manga-authors/authors/urasawa-naoki/manifest.json

{
  "id": "urasawa-naoki",
  "name": "Naoki Urasawa",
  "name_zh": "浦泽直树",
  "legacy_refs": [
    "cartoonists/urasawa-naoki"
  ],
  "name_ja": "浦沢直樹",
  "family": "情感与日常",
  "scope": "本轮重点为《あさドラ！第1卷》的公开封面／主视觉及对应书目；旧作品研究另留在 archive 初稿，不能把不同时期合成固定画风。下列绘画方案为本库原创转译，封面观察不证明连续内页的分镜规律。",
  "reference_works": [
    {
      "title": "あさドラ！第1卷",
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
      "title": "MONSTER 完全版 1｜小学館コミック",
      "url": "https://shogakukan-comic.jp/book?isbn=9784091817907",
      "publisher": "小学館",
      "accessed_at": "2026-11-01",
      "access_method": "search_excerpt",
      "supports": [
        "出版社确认完全版第1卷以神经外科医师及连环事件构成悬疑，并列出具体收录章目。"
      ],
      "access_note": "早期研究对照：实际检索获得出版社/机构摘要；未据摘要声称阅读漫画内页。",
      "context": "historical_reference"
    },
    {
      "id": "S2",
      "title": "知覚の扉を開き微妙な感情までも紙の上に描きたい",
      "url": "https://president.jp/articles/-/34537",
      "publisher": "PRESIDENT Online（ロート製薬提供访谈）",
      "accessed_at": "2026-11-01",
      "access_method": "interview_text",
      "supports": [
        "浦泽在访谈中说明会观察演员面部各部分形状与位置，并从眉毛和眼睛开始判断角色是否演得成立，必要时反复修改眼睛；他希望画出简单喜怒哀乐之间的复杂表情。"
      ],
      "access_note": "早期研究对照：实际web打开阅读L52—66；广告提供背景已标明，仅概括本人创作回答，不引用产品主张。",
      "context": "historical_reference"
    },
    {
      "id": "RECENT1",
      "title": "あさドラ！第1卷：官方书目／项目页",
      "url": "https://shogakukan-comic.jp/book?isbn=9784098602780",
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
      "title": "あさドラ！第1卷：已观察的公开图像",
      "url": "https://shogakukan-comic.jp/book-images/w400/books/9784098602780.jpg",
      "publisher": "小学館",
      "accessed_at": "2026-11-01",
      "access_method": "visual_preview",
      "supports": [
        "限定单幅公开图像的形体、线条、色块与构图观察"
      ],
      "access_note": "实际通过图像工具查看此公开封面／主视觉，未观察整卷内页；周围排版、字体与出版设计不自动归作者。",
      "origin_page_url": "https://shogakukan-comic.jp/book?isbn=9784098602780",
      "observed_asset_sha256": "e061768ab9991e0f97c900ad9475a644c5be30a13c3272f8a6ec702fff962cc7"
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
      "text": "封面将人物与木屋、车辆、站台等片段组织成照片式叠放；人物圆润面部与干净衣领，对照环境中细密木板和金属刻线。人物抬手至脸侧，眉眼和嘴角保持轻微不对称。",
      "basis": "visual_observation",
      "source_ids": [
        "RECENT2"
      ]
    }
  ],
  "visual_recipe": {
    "line": "人物线简洁，木板金属等环境用更细刻线，眉眼比例需反复微调。",
    "shapes": "自然成年体型，用额头、鼻形、发量和肩宽区分既定角色。",
    "composition": "先建立带生活痕迹的港口，再使脸与手在环境中清楚露出。",
    "panel_rhythm": "原创分镜建议：先交代空间，再给道具与手部动作，接人物反应，最后显示动作结果；不是由单幅封面推得的作者分镜规律。",
    "tonal_design": "人物脸部保持白，衣领与眼瞳集中黑，环境以浅灰错层。",
    "environment": "木屋、旧车和栈道选两种作为时代线索，不机械拼贴原封面。",
    "acting": "略不对称的眉眼和嘴角表达复杂情绪，避免每张脸只剩喜怒符号。",
    "color": "本库原创色彩转译：低饱和暖灰统一人物与环境，小面积暖色提亮视线。；只借所见单图的配色关系，不称固定作者色板。"
  },
  "drawing_steps": [
    "先以本项目故事画三张小构图，应用：先建立带生活痕迹的港口，再使脸与手在环境中清楚露出。",
    "确认成年人物和原创衣物的结构：自然成年体型，用额头、鼻形、发量和肩宽区分既定角色。 再核对手与道具接触。",
    "按材质分层落线：人物线简洁，木板金属等环境用更细刻线，眉眼比例需反复微调。 环境处理：木屋、旧车和栈道选两种作为时代线索，不机械拼贴原封面。",
    "最后以灰阶缩图核对：人物脸部保持白，衣领与眼瞳集中黑，环境以浅灰错层。 彩色版再应用：本库原创色彩转译：低饱和暖灰统一人物与环境，小面积暖色提亮视线。；只借所见单图的配色关系，不称固定作者色板。"
  ],
  "review_checks": [
    "缩至缩略图时，主动作和手中物是否仍先于装饰可见？",
    "人物结构与所选处理是否兼容：自然成年体型，用额头、鼻形、发量和肩宽区分既定角色。",
    "灰阶检查能否区分脸、手、衣物与背景：人物脸部保持白，衣领与眼瞳集中黑，环境以浅灰错层。",
    "用于连续页时，是否保持原故事人数、动作顺序、服装与道具方向？"
  ],
  "avoid": [
    "把这张封面的观察当成整部作品、所有时期或全部分镜的定律。",
    "把原封面人物、专属服饰、标志和签名带入原创角色；或把书封排版视为作者本人绘画。"
  ],
  "best_for": [
    "成年角色复杂表情",
    "生活环境与人物同框"
  ],
  "prompt_core_zh": "用自然成年比例、微小眉眼差和不对称嘴角表现情绪；简洁人物轮廓与有年代感的细密器物纹理并置，以低饱和暖灰统一空间，关键手势保持可读。",
  "prompt_core_en": "Use natural adult proportions, small brow differences and asymmetric mouth corners. Contrast clean figure contours with finely observed worn objects; unify the scene in muted warm grays and keep the key hand gesture readable.",
  "biography": {
    "birth_year": null,
    "death_year": null,
    "region_context": "本轮核定为日本漫画出版或展览语境；不据此推定民族。",
    "source_ids": [
      "S1"
    ],
    "note": "生卒未逐人全面核查，保留null；公开署名为笔名时不当作法定姓名。",
    "ethnicity": {
      "value": null,
      "status": "unknown"
    }
  },
  "method_evidence_source_ids": [
    "RECENT2"
  ],
  "known_gaps": [
    "本轮新阶段视觉观察限所列单图；未逐章核内页节奏、助手分工和长期画风变化。",
    "原版出版或项目发布年份不等于每一笔原稿的绘制日期；具体日期边界见recent_focus。",
    "本库8维方案、步骤和提示词属于原创转译，尚未用真实生成图验证一致性。"
  ],
  "schema_version": 1,
  "kind": "manga-author-study",
  "entity_kind": "person",
  "status": "source-grounded-draft",
  "research_date": "2026-11-01",
  "generation_mode": "original-general-techniques",
  "image_validation": "not-run",
  "recipe_basis": "original_synthesis",
  "sheet_traits_zh": "自然成年比例，简洁发束与圆转面部，眉眼可作细微差别；衣领和工具接口明确，阴影薄而不糊。",
  "focus": "悬疑与社会/表演",
  "historical_scope": "《MONSTER》2008年完全版第1卷；与18卷数字重编版区分，补2020年本人表情访谈",
  "recent_focus": {
    "work": "あさドラ！第1卷",
    "year": 2019,
    "source_ids": [
      "RECENT1",
      "RECENT2"
    ],
    "date_basis": "所选日文原版卷首次出版年份；封面原稿具体作画日未核定"
  },
  "creator_type": "manga-artist"
}
