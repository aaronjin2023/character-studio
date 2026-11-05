# カントク · 本地研究卡快照

来源：human-distillation-lab 工作目录（不假定已提交）。
仅供查阅；出图采用项目内独立转写的线条和明暗方法。

## manga-authors/authors/kantoku/SKILL.md

---
name: manga-kantoku
description: "カントク公开漫画／插画研究与原创绘图参谋；适用于成年原创角色造型与材质练习、同一角色三视图的线条和色块控制、既定故事的彩色插画／连续页转译；按具体视觉技法编写方案。"
---

# カントク（Kantoku） · 漫画／插画创作研究卡

本轮主要视觉研究限定于光の通り路（2025）出版社横幅宣传图；仅核公开封面／宣传图及明示样图。其余履历来源只证明职业与署名，不借动画成片代替个人画作。八维配方、步骤、评审与提示词均为本库原创技法转译，不是本人逐笔规则。

选材类型：日系插画／同人画师。本轮重点：光の通り路（2025）出版社横幅宣传图；参考年份：2025。对应出版社记录的书籍／宣传发布日期；不将作品集出版年当成全部收录画作的创作年，也不声称是2026最新画风。〔S1, S2〕

方向：光色与日常角色。本卡研究公开作品与方法；绘图配方是本库原创转译，未训练模型、未做出图效果验证。

[100人目录](../../CATALOG.md) · [八维绘画方案](drawing.md) · [绘图提示词](prompts.md) · [结构化记录](manifest.json) · [完整创作流程](../../WORKFLOW.md)

## 适用任务

- 成年原创角色造型与材质练习
- 同一角色三视图的线条和色块控制
- 既定故事的彩色插画／连续页转译

先读取下列研究依据，再从drawing.md选2–3项具体技法，结合项目自己的角色和世界设定，编写原创画面方案。生成时采用prompts.md的通用技法表达，不直接用作者姓名作为画风口令，不假称本人绘制或背书。用户按作者选择风格时，明确作品阶段，把视觉目标拆成可操作的特征；保留项目已有角色设定，不承诺未经实际出图验证的复现精度。

## 本轮公开依据

- 2025年6月3日发布，官方介绍以摄影集式印刷和光影场面为核心，含作者拍摄的资料照片。〔source_summary；S1〕
- 人物坐于木桥左侧，桥面斜向右下延伸，绿色树荫与水面反光围出暖色人物；背景刻画明显多于面部，阴影下脸部仍保持可辨。只观察这张宣传图，未读画集。〔visual_observation；S2〕

绘画／叙事方法或限定画面观察的依据：S2。下述原创配方不代表这些来源逐项规定了所有参数。

## 选材与分工

- 光の通り路（2025）出版社横幅宣传图：插画／角色视觉创作；书籍文字、编辑、装帧与动画协作另有署名，不并入个人作画〔S1, S2〕

## 基本资料

出生年：未知／本轮未核定；逝世年：未知／本轮未核定。

活动／出版语境（非国籍）：已核日本商业出版／项目或展览语境；本轮未核国籍、民族或居住地，不据姓名推断。民族：未知，不根据姓名或出版地区推断。仅记录公开创作者署名与已核出版／活动地区，未知生日和生卒为null；不据姓名、国籍推民族。 〔S1〕

本次新增研究对象；未复制成其他专家分类条目。

## 缺口

- 只核本条明示公开图像，没有通读完整画集或逐年比较全部时期；未承诺精确复刻。
- 作者原始上色与出版物装帧、文字、印刷呈色未逐项拆分，因此背景排版和标题字体不视为个人固定风格。
- 原创技法转译未通过真实生成样张验收；三视图只用sheet_traits_zh的静态特征，不能照搬封面透视。

## 来源

- **S1** [カントク 少女風景画集 光の通り路](https://artjeuness.jp/contents/819/) — E☆2／アールジュネス；2026-11-01；`page_text`。已实际获取官方公开HTML并核读书籍与创作选材介绍；不声称阅读完整内页。 支持：2025年6月3日发布，官方介绍以摄影集式印刷和光影场面为核心，含作者拍摄的资料照片。。
- **S2** [光の通り路（2025）出版社横幅宣传图：官方封面／宣传图](https://artjeuness.jp/assets/article_contents/819/xl/1_819_682c19ec3b74b.jpg) — E☆2／アールジュネス；2026-11-01；`visual_preview`。从已核定官方页面 https://artjeuness.jp/contents/819/ 的HTML提取实际图像URL，临时保存至/tmp并通过view_image查看。只核这张图；没有下载图片入库，没有将页面alt当视觉观察。 支持：人物坐于木桥左侧，桥面斜向右下延伸，绿色树荫与水面反光围出暖色人物；背景刻画明显多于面部，阴影下脸部仍保持可辨。只观察这张宣传图，未读画集。。


## manga-authors/authors/kantoku/drawing.md

# カントク（Kantoku） · 八维绘画方案

以下全部是**本库原创创作转译**，不是作者原话或其全部作品的统一规则。对应公开事实与访问范围见[研究卡](SKILL.md)。先确定所选作品阶段，彩色建议不自动视为作者固定色板。

## 线条

柔细人物外线与略硬的服装边线分工，发束内线减少

## 形体与人物

各既定成年人物自然头身，胸腰由柔和体面而非浓黑排线建立

## 构图

用一个倾斜结构与成片柔影引导已有主体，焦点脸部保持浅值

## 分镜节奏

本库原创建议：先说明亮暗关系，再给表情和材质细节，最后恢复完整空间

## 黑白与网点

深色集中衣物折口，皮肤浅白，软灰阴影分出衣料厚度

## 环境

环境纹理在主体周围降低密度，反射光明确但不吞轮廓

## 表情动作

表情微变由眼睑和嘴角控制，肩颈保持放松

## 彩色方案

本库建议暖肤、青绿环境光与少量暖赭；借取一般色温关系，不宣称固定色板

## 落地步骤

1. 先按既定人物与道具搭静态体块：各既定成年人物自然头身，胸腰由柔和体面而非浓黑排线建立；检查同一人物辨识点。
2. 用三阶缩略图确定主次：用一个倾斜结构与成片柔影引导已有主体，焦点脸部保持浅值，再落实深色集中衣物折口，皮肤浅白，软灰阴影分出衣料厚度。
3. 按材质分层描线：柔细人物外线与略硬的服装边线分工，发束内线减少；检查环境纹理在主体周围降低密度，反射光明确但不吞轮廓。
4. 最后校对表演与色域：表情微变由眼睑和嘴角控制，肩颈保持放松；按“本库建议暖肤、青绿环境光与少量暖赭；借取一般色温关系，不宣称固定色板”做原创小色稿，连续页采用独立节奏建议。

## 图像检查

- 缩小后人物的脸是否比周边绿灰色块更清楚？
- 柔阴影内能否区分皮肤、布料和硬边，而不是全部融成灰？
- 转为三视图后同一人物肩胸体量是否一致，且没有沿用宣传图的空间斜线？

## 容易失败的做法

- 环境青绿反射铺满肤色，人物脸部失去焦点。
- 把柔和阴影全部擦掉，衣料厚度与接触关系消失。


## manga-authors/authors/kantoku/prompts.md

# カントク（Kantoku） · 原创绘图提示词

这些是可编辑的起稿模板，未实际出图。比较时统一使用“雨后浮岛港口归还机械鸟”的原创题材。角色设定页只转用形体、线条和黑白处理，不沿用场景镜头；英文版的角色技法段保留中文规格以免未经审核的翻译改变约束。

不要将本页标题或作者姓名一并粘贴到图像生成提示词。需要其他题材时替换角色、场景、行动和情绪，保留所选择的通用技法；既定发色、发长、肤色、衣色与体型优先，冲突技法或色板必须删改；最后执行[连贯性与输出检查](../../WORKFLOW.md)。

## 单幅叙事插画

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 单幅叙事插画。原创视觉技法：柔细人物外线与略硬的服装边线分工，发束内线减少；各既定成年人物自然头身，胸腰由柔和体面而非浓黑排线建立；深色集中衣物折口，皮肤浅白，软灰阴影分出衣料厚度。保留既定人物、场景和剧情，只迁移技法。 不画原作品角色、标志或签名；文字如需出现，保留位置后期排版。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. One narrative illustration. Use delicate figure contours and slightly firmer clothing edges, with grouped hair and natural adult proportions. Organize the existing subject through broad soft shadow shapes and one directional structural line. Keep the face lighter than nearby forms. Contrast warm skin with cooler reflected light, preserving fabric thickness without dense hatching. Maintain the supplied narrative, props, identity, and actions; invent no additional characters or setting. No existing franchise designs, logos or signatures. Reserve any text for later lettering.
```

## 角色三视图

### 中文

```text
角色设定页：同一名成年修理工的正面、右侧面、背面三个完整视图；短发、短外套、工具腰带、工作靴，三视图衣物结构及比例一致。中性站姿、平视、无透视夸张、纯净背景，三个完整身体不重叠。 以下技法服从上述成年角色、服装和站姿约束；只转用造型与画面处理，忽略示例动作和场景：柔细外线配简洁发束，成人体块自然；服装边缘略硬，折口局部深黑，皮肤浅白，柔灰区分布料厚度。
```

### English / bilingual specification

```text
Character design sheet: front, right-side and rear full-body views of the same adult repair technician, with short hair, a short work jacket, tool belt and work boots. Keep anatomy, garment construction and proportions consistent. Use neutral standing poses, eye-level orthographic views, a plain background and no overlapping figures. Apply the following bilingual line, shape and tone specification subject to the adult character, clothing and neutral pose above; omit any example actions and scene directions: 柔细外线配简洁发束，成人体块自然；服装边缘略硬，折口局部深黑，皮肤浅白，柔灰区分布料厚度。
```

## 六格漫画页

### 中文

```text
雨后的浮岛港口，一名成年修理工把迷路的机械鸟归还给一位成年旅人。人物与服饰均为本项目原创。 六格漫画页，按日式从右到左、从上到下阅读。格1港口建立空间；格2修理工发现机械鸟；格3检查鸟翅；格4旅人赶来；格5修理工交还鸟；格6鸟起飞，两人目送。每格明确一个动作，角色、工具及场景方向连续。预留空白对话框，文字后期排版；不要生成签名或水印。 将以下技法用于各格，不改变上述事件、格数或顺序：原创视觉技法：柔细人物外线与略硬的服装边线分工，发束内线减少；各既定成年人物自然头身，胸腰由柔和体面而非浓黑排线建立；深色集中衣物折口，皮肤浅白，软灰阴影分出衣料厚度。保留既定人物、场景和剧情，只迁移技法。
```

### English / bilingual specification

```text
At a floating-island harbor after rain, an adult repair technician returns a lost mechanical bird to an adult traveler. Use original characters and clothing designed for this project. A six-panel manga page, read from right to left and top to bottom. Panel 1 establishes the harbor; 2 the technician discovers the bird; 3 inspects its wing; 4 the traveler arrives; 5 the bird is returned; 6 it flies away as both adults watch. Show one clear action per panel; preserve character, prop and screen-direction continuity. Leave speech balloons empty for later lettering. No signatures or watermarks. Apply the following techniques within each panel without changing the events, panel count or sequence: Use delicate figure contours and slightly firmer clothing edges, with grouped hair and natural adult proportions. Organize the existing subject through broad soft shadow shapes and one directional structural line. Keep the face lighter than nearby forms. Contrast warm skin with cooler reflected light, preserving fabric thickness without dense hatching. Maintain the supplied narrative, props, identity, and actions; invent no additional characters or setting.
```


## manga-authors/authors/kantoku/manifest.json

{
  "id": "kantoku",
  "name": "Kantoku",
  "name_zh": "カントク",
  "name_ja": "カントク",
  "legacy_refs": [],
  "creator_type": "illustrator",
  "family": "光色与日常角色",
  "scope": "本轮主要视觉研究限定于光の通り路（2025）出版社横幅宣传图；仅核公开封面／宣传图及明示样图。其余履历来源只证明职业与署名，不借动画成片代替个人画作。八维配方、步骤、评审与提示词均为本库原创技法转译，不是本人逐笔规则。",
  "reference_works": [
    {
      "title": "光の通り路（2025）出版社横幅宣传图",
      "role": "插画／角色视觉创作；书籍文字、编辑、装帧与动画协作另有署名，不并入个人作画",
      "source_ids": [
        "S1",
        "S2"
      ]
    }
  ],
  "sources": [
    {
      "id": "S1",
      "title": "カントク 少女風景画集 光の通り路",
      "url": "https://artjeuness.jp/contents/819/",
      "publisher": "E☆2／アールジュネス",
      "accessed_at": "2026-11-01",
      "access_method": "page_text",
      "supports": [
        "2025年6月3日发布，官方介绍以摄影集式印刷和光影场面为核心，含作者拍摄的资料照片。"
      ],
      "access_note": "已实际获取官方公开HTML并核读书籍与创作选材介绍；不声称阅读完整内页。"
    },
    {
      "id": "S2",
      "title": "光の通り路（2025）出版社横幅宣传图：官方封面／宣传图",
      "url": "https://artjeuness.jp/assets/article_contents/819/xl/1_819_682c19ec3b74b.jpg",
      "publisher": "E☆2／アールジュネス",
      "accessed_at": "2026-11-01",
      "access_method": "visual_preview",
      "supports": [
        "人物坐于木桥左侧，桥面斜向右下延伸，绿色树荫与水面反光围出暖色人物；背景刻画明显多于面部，阴影下脸部仍保持可辨。只观察这张宣传图，未读画集。"
      ],
      "access_note": "从已核定官方页面 https://artjeuness.jp/contents/819/ 的HTML提取实际图像URL，临时保存至/tmp并通过view_image查看。只核这张图；没有下载图片入库，没有将页面alt当视觉观察。",
      "origin_page_url": "https://artjeuness.jp/contents/819/",
      "observed_asset_sha256": "b0a4c57203eb59cc64545347c24e9fced54cc17a3a3cb0e2eb50e5dd21d68ee4"
    }
  ],
  "findings": [
    {
      "text": "2025年6月3日发布，官方介绍以摄影集式印刷和光影场面为核心，含作者拍摄的资料照片。",
      "basis": "source_summary",
      "source_ids": [
        "S1"
      ]
    },
    {
      "text": "人物坐于木桥左侧，桥面斜向右下延伸，绿色树荫与水面反光围出暖色人物；背景刻画明显多于面部，阴影下脸部仍保持可辨。只观察这张宣传图，未读画集。",
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
    "work": "光の通り路（2025）出版社横幅宣传图",
    "year": 2025,
    "source_ids": [
      "S1",
      "S2"
    ],
    "date_basis": "对应出版社记录的书籍／宣传发布日期；不将作品集出版年当成全部收录画作的创作年，也不声称是2026最新画风。"
  },
  "visual_recipe": {
    "line": "柔细人物外线与略硬的服装边线分工，发束内线减少",
    "shapes": "各既定成年人物自然头身，胸腰由柔和体面而非浓黑排线建立",
    "composition": "用一个倾斜结构与成片柔影引导已有主体，焦点脸部保持浅值",
    "panel_rhythm": "本库原创建议：先说明亮暗关系，再给表情和材质细节，最后恢复完整空间",
    "tonal_design": "深色集中衣物折口，皮肤浅白，软灰阴影分出衣料厚度",
    "environment": "环境纹理在主体周围降低密度，反射光明确但不吞轮廓",
    "acting": "表情微变由眼睑和嘴角控制，肩颈保持放松",
    "color": "本库建议暖肤、青绿环境光与少量暖赭；借取一般色温关系，不宣称固定色板"
  },
  "sheet_traits_zh": "柔细外线配简洁发束，成人体块自然；服装边缘略硬，折口局部深黑，皮肤浅白，柔灰区分布料厚度。",
  "drawing_steps": [
    "先按既定人物与道具搭静态体块：各既定成年人物自然头身，胸腰由柔和体面而非浓黑排线建立；检查同一人物辨识点。",
    "用三阶缩略图确定主次：用一个倾斜结构与成片柔影引导已有主体，焦点脸部保持浅值，再落实深色集中衣物折口，皮肤浅白，软灰阴影分出衣料厚度。",
    "按材质分层描线：柔细人物外线与略硬的服装边线分工，发束内线减少；检查环境纹理在主体周围降低密度，反射光明确但不吞轮廓。",
    "最后校对表演与色域：表情微变由眼睑和嘴角控制，肩颈保持放松；按“本库建议暖肤、青绿环境光与少量暖赭；借取一般色温关系，不宣称固定色板”做原创小色稿，连续页采用独立节奏建议。"
  ],
  "review_checks": [
    "缩小后人物的脸是否比周边绿灰色块更清楚？",
    "柔阴影内能否区分皮肤、布料和硬边，而不是全部融成灰？",
    "转为三视图后同一人物肩胸体量是否一致，且没有沿用宣传图的空间斜线？"
  ],
  "avoid": [
    "环境青绿反射铺满肤色，人物脸部失去焦点。",
    "把柔和阴影全部擦掉，衣料厚度与接触关系消失。"
  ],
  "best_for": [
    "成年原创角色造型与材质练习",
    "同一角色三视图的线条和色块控制",
    "既定故事的彩色插画／连续页转译"
  ],
  "prompt_core_zh": "原创视觉技法：柔细人物外线与略硬的服装边线分工，发束内线减少；各既定成年人物自然头身，胸腰由柔和体面而非浓黑排线建立；深色集中衣物折口，皮肤浅白，软灰阴影分出衣料厚度。保留既定人物、场景和剧情，只迁移技法。",
  "prompt_core_en": "Use delicate figure contours and slightly firmer clothing edges, with grouped hair and natural adult proportions. Organize the existing subject through broad soft shadow shapes and one directional structural line. Keep the face lighter than nearby forms. Contrast warm skin with cooler reflected light, preserving fabric thickness without dense hatching. Maintain the supplied narrative, props, identity, and actions; invent no additional characters or setting.",
  "biography": {
    "birth_year": null,
    "death_year": null,
    "ethnicity": {
      "value": null,
      "status": "unknown"
    },
    "region_context": "已核日本商业出版／项目或展览语境；本轮未核国籍、民族或居住地，不据姓名推断。",
    "source_ids": [
      "S1"
    ],
    "note": "仅记录公开创作者署名与已核出版／活动地区，未知生日和生卒为null；不据姓名、国籍推民族。"
  },
  "known_gaps": [
    "只核本条明示公开图像，没有通读完整画集或逐年比较全部时期；未承诺精确复刻。",
    "作者原始上色与出版物装帧、文字、印刷呈色未逐项拆分，因此背景排版和标题字体不视为个人固定风格。",
    "原创技法转译未通过真实生成样张验收；三视图只用sheet_traits_zh的静态特征，不能照搬封面透视。"
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
