# 人物工坊 · Character Studio

本地运行的参考图创作工具：选择骨架、衣服、头像，搭配表情、发型、头饰、配件及场景，生成单张图片、模特商品展示批次或人设资料图。支持人物、动物及具有明确身体结构的幻想种。

**仓库只提供程序、测试和文字风格方案，不附带外部图库、上传照片、个人生成图片、历史任务或密钥。** 首次启动是空图库，可导入自行下载或制作的资源。工作台在本机运行；GPT 额度或图像 API 的图像推理仍在对应云端完成。

## 安装依赖与启动

需要：

| 依赖 | 用途 |
| --- | --- |
| Node.js 22 或更高版本、npm | 运行 HTTP 服务与 MCP 服务 |
| FFmpeg（命令为 `ffmpeg`，须在 PATH 中） | 小件参考拼合、多角色参考卡、现场光校正及测试 |
| 已登录的 Codex CLI（可选） | 使用 GPT 额度通道；API Key 通道不需要 |
| macOS、Swift / Xcode Command Line Tools（可选） | 使用 Vision 做现场光校正；普通生图不要求 macOS |

macOS 可通过 Homebrew 安装：

```sh
brew install node@22 ffmpeg
export PATH="$(brew --prefix node@22)/bin:$PATH"
```

其他系统请从 [Node.js 官网](https://nodejs.org/en/download) 安装 Node.js 22+，并用系统包管理器安装 FFmpeg，例如 Debian / Ubuntu 的 `sudo apt install ffmpeg`。

```sh
git clone https://github.com/aaronjin2023/character-studio.git
cd character-studio
npm ci
node --version
ffmpeg -version
npm start
```

浏览器打开 <http://127.0.0.1:3190>。没有构建步骤，不需要 Python。macOS 也可双击 `启动人物工坊.command`，前提是 Node.js 已在该启动环境的 PATH 中。

端口被占用时可执行 `PORT=3191 npm start`，不会自动停止其他服务。默认只监听 `127.0.0.1`，这是单用户本地应用，不是可直接暴露到公网的多用户服务。

## 骨架、衣服、头像：自行下载和导入

以下是项目最初使用的三个**来源图库地址**，图片不包含在本仓库中：

| 资源 | 来源 |
| --- | --- |
| 骨架 / 姿势 | [AI Pose Gallery](https://ai-pose-gallery.pages.dev/) |
| 衣服 / 衣装 | [AI Costume Gallery](https://ai-costume-gallery.pages.dev/) |
| 头像 / 脸型 | [AI Portrait Gallery](https://ai-portrait-gallery.pages.dev/) |

下载步骤：

1. 打开相应原站，查看当时的使用条款，选择需要的图片并使用原站的原尺寸下载按钮保存。
2. 启动工坊，在“单张出图”中点击骨架、衣服或头像，打开对应资源库。
3. 点击“上传图片”，导入下载的 PNG、JPEG 或 WebP（每张不超过 20 MB）。资源会保存在本机，后续无需依赖原站图片链接。
4. 为当前主体选择相匹配的骨架和头像；衣服允许自由搭配。需要时添加标签，按标签查找或批量选择。

骨架、衣装原站目前明确限制批量自动下载及图片再分发。因此这里提供逐张下载、导入的使用路径，不提供一键抓取整站的命令。头像原站标注 CC0，并请求不要再分发原始图片。请以各站最新规则为准；项目代码、第三方原图与使用者生成结果是不同的内容。

也可以上传自己制作或已获授权的资源。**制作人物骨架前，先导入至少一张人物骨架作为画法参考**：已有本地索引时优先使用原 P018 参考；空库安装使用已导入的人物骨架。选中的画法参考编号随拆解任务保存，姿势本身来自待拆解的照片。没有参考时会在提交前提示，也可先只制作头像和衣服。

## 选择出图通道

在顶部“设置”保存默认通道，使用时无需反复选择。

### GPT 额度

需要已安装、使用 ChatGPT 登录且具备图像生成能力的官方 [Codex CLI](https://github.com/openai/codex)。本机可用 `codex login` 登录，用 `codex login status` 检查状态。

工坊通过本机 `codex exec` 调用图像生成，实际额度和能力由账号及 CLI 决定；安装本工具不会自动获得出图额度。图像推理在云端。可用 `STUDIO_CODEX_BIN` 指定 CLI 可执行文件。

### 图像 API Key

在设置中填写兼容图像接口的服务地址、模型名和 API Key。服务需支持 `/images/generations`、`/images/edits` 及所用模型的参考图参数；不同供应商的兼容性需自行验证。

Key 保存在 `data/private/settings.json`，目录权限为 0700、文件权限为 0600，不写入浏览器 localStorage 或任务记录。文件是本机权限保护的明文配置，并非加密保险库；此目录被 Git 排除。生成消费由对应服务计费。

### 外部 ComfyUI

提供外部 ComfyUI 地址、鉴权和工作流配置入口。需要自行部署 ComfyUI、安装模型并适配工作流；本项目不安装或附带模型。工作流格式示例见 [comfy-workflows.example.json](public/comfy-workflows.example.json)，参考图数量不同可能需要不同工作流。

已具备接口及模拟测试，不代表任意外部工作流已实际出图验证。

## 工作页面

- **制造资源**：从照片拆出骨架、衣服、头像；动物拆为骨架、头部、体表；幻想种按声明的附肢与结构拆解。只制作勾选的项目。另有原画真人化、单件资源写实化、整套表情、背景及前景制作。
- **单张出图**：共用整体骨架，每个角色分别选衣服、头像与下属小件；背景默认浅灰，可选纯白、透明或图片背景。支持 1–6 个同类别主体。
- **批量生产**：固定骨架和头像更换衣服，或三组资源按顺序配对，适用于模特展示商品。
- **人设资料图**：单角色多视角、头像表情、衣装与材质细节资料板，独立于单张出图。
- **已生成图库**：按类型、主体、画风、方案、画幅、通道、日期等筛选；查看、下载及复用参数。
- **生产队列**：查看等待及运行状态；尚未开始的任务可取消。
- **设置**：保存通道、密钥、模型和外部 ComfyUI 配置。

资源审核入库后可反复使用。骨架与头像需要匹配，衣服可以反串。表情和发型属于头像；帽子、发带、发簪、皇冠等可拆卸头饰属于衣物，天然耳、角仍保留在头部。坐具、车辆与手持物按使用位关联角色。详细规则见 [分类与提示词约定](docs/classification.md)。

相同完整配置会复用已有成图；生成类型、资源及角色顺序、画风与方案版本、场景、机位、尺寸、画质、文字和通道配置等不同会区分结果。“重新生成”会创建新版本并消耗通道额度。刷新页面只查询已有任务；失败后不会自动切换通道或反复提交。

拆解、真人化等结果先保存供预览和审核。全套表情会关联原头像，已有表情不重复生成，可对不满意的单项勾选替换。图像结构、相似度、透明背景与风格效果仍需看图确认。

## 画风与文字方案

“画风／视觉类型”为父类，“蒸馏风格方案”为其下属方案。包括真实摄影、黑白漫画、彩色漫画、二维动画、插画、油画、水墨、水彩、木刻、杂志、电影和胶片效果。

程序包含 17 个通用研究方案和 100 个作者研究方案（80 位漫画家、20 位插画师）。作者选项显示代表作和类型；对应文字研究卡位于 `data/effect-sources/`，来源为 [human-distillation-lab](https://github.com/aaronjin2023/human-distillation-lab)，具体来源与内容校验值见该目录的 `manifest.json`。这些是文字参考，不是人物素材或生成图片，也不代表所有方案已经通过实际出图验收。

如需维护作者方案，可在自己的研究资料副本上运行：

```sh
node scripts/sync-manga-effects.mjs /absolute/path/to/manga-authors
```

普通安装不需要该资料库；运行使用已包含的方案文件。

## 数据保存与迁移

默认运行数据在项目的 `data/` 中；可使用 `STUDIO_DATA_DIR=/absolute/path/to/data npm start` 指定独立位置。

| 路径 | 内容 | 是否进入 Git |
| --- | --- | --- |
| `public/`、根目录 `.mjs`、`scripts/`、`test/`、`docs/` | 程序、测试、说明 | 是 |
| `data/effect-sources/` | 文字风格研究卡与索引 | 是，仅文字文件 |
| `data/uploads/` | 上传图片及元数据 | 否 |
| `data/resources/` | 审核入库的资源与表情 | 否 |
| `data/jobs/` | 生成结果、参考快照与任务配置 | 否 |
| `data/private/` | API Key、外部服务鉴权和设置 | 否 |
| `data/library/`、`data/local-assets/`、`data/catalogs.json`、`data/local-catalogs.json` | 可选本地图库与旧版索引 | 否 |
| 其他 `data/` 内容、`review/`、`.serena/`、`.taste-skill/` | 缓存、队列、标签、实验、检查记录与本机工具状态 | 否 |

不要求创建 `catalogs.json` 或下载完整图库即可启动。旧版索引若存在则继续读取；读取错误或损坏的 JSON 会报错，不会静默清空。运行时不会自动从外部图库补取缺失图片。

迁移个人环境需自行备份整个运行数据目录，包括图片、任务、`queue.json`、`resource-tags.json` 和私有设置；不要通过公有仓库迁移。文字风格方案仍从程序目录读取。不应有两个服务同时写同一数据目录。

如使用旧版完整图库索引，可运行 `npm run assets:check` 离线检查对应文件；它不下载图片，空图库会报告检查 0 张。

## MCP：供其他 Agent 调用

先运行 HTTP 服务，然后将 MCP stdio 服务注册到客户端：

```json
{
  "mcpServers": {
    "character-studio": {
      "command": "node",
      "args": ["/absolute/path/to/character-studio/mcp.mjs"],
      "env": {"STUDIO_URL": "http://127.0.0.1:3190"}
    }
  }
}
```

也可以在项目目录使用：

```sh
codex mcp add character-studio --env STUDIO_URL=http://127.0.0.1:3190 -- node "$PWD/mcp.mjs"
```

能力包括查看资源、上传参考、标签、图片/批量/人设生成、原画真人化、拆解、表情、现场光校正、任务与队列查询、取消等待任务和审核入库。接口发现以 `studio_info` 和客户端工具列表为准。

提交时提供 UUID `requestId`，同次请求重试使用原编号；拿到任务编号后查询进度，不重复提交。MCP 复用网页保存的通道设置，不提供读取密钥工具。本机文件上传需要明确的绝对路径。

## 开发验证

```sh
npm ci
npm test
```

测试使用独立临时目录与程序生成的色块图片，不读取个人图库，不需要下载外部素材，也不调用真实收费图像 API。需安装 FFmpeg，并允许测试监听临时 localhost 端口。真实出图质量与外部 ComfyUI 实例需另外验证。

字体使用 IBM Plex，保留 [SIL Open Font License](public/FONT-LICENSE.txt)。三个原站的图片许可由各站独立说明，本仓库不重新授权这些图片。
