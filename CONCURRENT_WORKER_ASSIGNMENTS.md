# MediaClaw 并发复刻任务分工

这份文件是实际派工表。它把 174 条审计路由拆成可独立交付的 lw-luna 任务；每个任务有单一写入边界、单一验收入口和明确依赖。页面数量是路由覆盖数量，不代表任务完成后已经部署到生产。

## 1. 总体规则

- 页面基线：`site-audit-mediaclaw-full-2026-08-19/report.json`。
- 路由总量：174；其中 170 个 HTTP 200，4 个 HTTP 404。
- 真正实现前必须完成一次 `BOOTSTRAP`：只创建冻结契约和空目录，不把共享 `src/main.jsx` 分给任何 worker。
- 页面 worker 只写 `src/rebuild/<lane>/**` 和自己的局部样式；禁止写 `src/main.jsx`、`src/styles.css`、`package.json`、`package-lock.json`、`dist/**` 和其他 worker 目录。
- `INTEGRATOR` 是唯一可以改 `src/main.jsx`、共享 CSS、package 或路由注册的角色；它必须等所有页面 worker 的 structured return 和 scope audit 通过后再执行。
- QA worker 只写 `qa/**` 或独立 evidence 目录，不改页面源代码。
- 所有 route data 必须同时有 `zh` 和 `en`；缺失英文不能静默复用中文。
- 所有未知 slug 必须进入显式 not-found；禁止 `find(...) || firstRecord`、默认第一篇博客、默认第一版更新日志。

## 2. 页面覆盖拆分

| 任务 ID | 负责页面 | 数量 | 允许写入 | 依赖 | 完成条件 |
| --- | --- | ---: | --- | --- | --- |
| `HOME-ZH` | `/` | 1 | `src/rebuild/home/zh/**` | `BOOTSTRAP` | 中文首页数据、模板适配、H1/CTA/导航测试通过 |
| `HOME-EN` | `/en` | 1 | `src/rebuild/home/en/**` | `BOOTSTRAP` | 英文首页独立文案、locale 链接和 H1 测试通过 |
| `PRODUCT-HUB-ZH` | `/xiaohongshu`, `/douyin` | 2 | `src/rebuild/products/hubs/zh/**` | `BOOTSTRAP` | 两个平台中文 hub 完整 feature 链接、CTA 和 H1 |
| `PRODUCT-HUB-EN` | `/en/xiaohongshu`, `/en/douyin` | 2 | `src/rebuild/products/hubs/en/**` | `BOOTSTRAP` | 两个平台英文 hub 独立文案、locale 链接和 H1 |
| `XHS-FEATURE-DATA` | `/xiaohongshu/<10 suffixes>` 及 `/en/xiaohongshu/<10 suffixes>` | 20 | `src/rebuild/products/xiaohongshu/**` | `BOOTSTRAP` | 10 个 suffix 的中英文 catalog、recipe、FAQ、related href 完整 |
| `DOUYIN-FEATURE-DATA` | `/douyin/<10 suffixes>` 及 `/en/douyin/<10 suffixes>` | 20 | `src/rebuild/products/douyin/**` | `BOOTSTRAP` | 10 个 suffix 的中英文 catalog、recipe、FAQ、related href 完整 |
| `PRODUCT-TEMPLATE` | 产品 hub/detail 渲染模板 | 0（共享模板） | `src/rebuild/products/components/**` | `BOOTSTRAP` | 不读 `window.location`，只消费 route/data props，未知 suffix 不回退 |
| `BLOG-INDEX-CATEGORY` | `/blog`, `/en/blog` + 24 category routes | 26 | `src/rebuild/blog/index/**` | `BOOTSTRAP` | index/category 计数、中文 URL 编码、英文 alias 和列表链接通过 |
| `BLOG-ARTICLE-ZH` | 24 个 `/blog/<slug>` | 24 | `src/rebuild/blog/articles/zh/**` | `BOOTSTRAP` | 24 个 slug 全部有中文正文 blocks、meta、related 和来源状态 |
| `BLOG-ARTICLE-EN` | 24 个 `/en/blog/<slug>` | 24 | `src/rebuild/blog/articles/en/**` | `BOOTSTRAP` | 24 个 slug 全部有英文正文 blocks；未翻译项显式标记 |
| `BLOG-ARTICLE-TEMPLATE` | 中英文 article detail 模板 | 0（共享模板） | `src/rebuild/blog/components/**` | `BOOTSTRAP` | aside、article outline、related、unknown slug 404 通过 |
| `UPDATES-CATALOG` | `/updates`, `/en/updates` + 32 version routes | 34 | `src/rebuild/updates/**` | `BOOTSTRAP` | 16 个版本双语数据、index 16 卡片、unknown version 404 |
| `COMMERCIAL-PAGES` | download/pricing/feishu/welfare/referral 中英路由 | 10 | `src/rebuild/commercial/**` | `BOOTSTRAP` | 10 个页面独立 locale、preview-only CTA、未接后端不冒充可用 |
| `LEGAL-PAGES` | privacy/terms 中英路由 | 4 | `src/rebuild/legal/**` | `BOOTSTRAP` | 4 个页面结构完整，法律事实和生效日期不凭空补齐 |
| `BOUNDARY-404` | 2 referral settings + 4 `/posts/...` 404 | 6 | `src/rebuild/boundaries/**` | `BOOTSTRAP` | settings 保持匿名最小 DOM；4 条 broken route 显式 not-found |

页面数量核算：`2 HOME + 44 PRODUCT + 74 BLOG + 34 UPDATES + 10 COMMERCIAL + 4 LEGAL + 6 BOUNDARY/404 = 174`。

## 3. Foundation 与集成任务

这些任务不重复占用页面 ownership，但决定 worker 能否并发。

| 任务 ID | 类型 | 允许写入 | 依赖 | 交付 |
| --- | --- | --- | --- | --- |
| `BOOTSTRAP` | 主线程串行 | `src/rebuild/contracts/**`, 空目录、任务 manifest | 无 | 冻结 `Locale`、`RouteRecord`、`PageFamily`、`PageData`、`NotFound`、`SourceRecord` schema；生成唯一 route owner 表 |
| `SHELL-COMPONENTS` | lw-luna | `src/rebuild/shell/components/**` | `BOOTSTRAP` | Header/Footer/Brand/LocaleSwitch/CTA props 接口和语义 landmark 契约 |
| `SHELL-STYLES` | lw-luna | `src/rebuild/shell/shell.css` | `BOOTSTRAP` | 共享 token、容器、响应式断点；只引用合同 token，不改现有 `styles.css` |
| `ROUTE-ADAPTER` | 主线程串行 | `src/main.jsx`、共享 router adapter | 所有页面 worker | 将各 lane module 接到唯一 App；精确匹配、canonical path、document title、404 status metadata |
| `INTEGRATOR` | 主线程串行 | `src/main.jsx`, `src/styles.css`, `package*.json`, `dist/**` | 所有页面 worker + scope audit | 合并模块、解决命名冲突、唯一运行 build；不重写 worker 的局部实现 |

`SHELL-COMPONENTS` 和 `SHELL-STYLES` 可以在 `BOOTSTRAP` 完成后并行；`ROUTE-ADAPTER`/`INTEGRATOR` 不得并行。

## 4. QA 与发布任务

| 任务 ID | 目标 | 允许写入 | 依赖 | 验收 |
| --- | --- | --- | --- | --- |
| `QA-MANIFEST` | 174 URL 与 owner/dataKey 一一对应 | `qa/manifest/**`, evidence | `BOOTSTRAP` | 数量、集合、重复 owner、bundle-only 排除、404 集合断言 |
| `QA-ROUTE-SMOKE` | 所有 route 的 DOM/status smoke | `qa/route-smoke/**`, evidence | `INTEGRATOR` | 200 页面 H1/family、4 个 404、未知 slug 负例、没有第一条数据 fallback |
| `QA-VISUAL-DESKTOP` | 1440x900 + long screenshot | `qa/visual/desktop/**` | `INTEGRATOR` | 首屏、导航、内部页面、无水平溢出、console 无 error |
| `QA-VISUAL-MOBILE` | 390x844 + long screenshot | `qa/visual/mobile/**` | `INTEGRATOR` | 移动导航、文章/更新详情、无横向滚动、文本不重叠 |
| `QA-BUILD` | 构建与静态产物 | `qa/build/**` | `INTEGRATOR` | `npm run build`、产物 hash、dist 路由 fallback 约束 |
| `QA-PUBLISH-SMOKE` | 部署候选/生产 readback | `qa/publish/**` | `QA-BUILD` + 明确部署 URL | HTTP status、DOM title/H1、console、截图、发布 hash；没有部署 URL 时保持 `candidate` |

## 5. 并发波次

### Wave C0：公开只读爬取

在实现 Wave 1 之前，可以先启动以下独立爬取任务。它们只访问 `https://mediaclaw.app/` 的匿名、同源 GET/HEAD 页面，输出 DOM 摘要、状态、标题、H1/H2/H3、landmarks、内部链接、响应时间和错误；不提交表单、不登录、不点击会改变状态的控件、不读取私有 API。每个任务写入 `agents-results/2026-08-19/mediaclaw-crawl-wave/` 下自己的 artifact、log、return 和 ledger。

| Crawl task | 目标 | 数量 | 独立输出 |
| --- | --- | ---: | --- |
| `CRAWL-HOME-SHELL` | `/`, `/en` 与全局 header/footer 导航摘要 | 2 | `artifacts/CRAWL-HOME-SHELL.json` |
| `CRAWL-XHS` | 小红书 hub + 10 suffix 的中英文页面 | 22 | `artifacts/CRAWL-XHS.json` |
| `CRAWL-DOUYIN` | 抖音 hub + 10 suffix 的中英文页面 | 22 | `artifacts/CRAWL-DOUYIN.json` |
| `CRAWL-BLOG-INDEX` | 博客 index + 24 category routes | 26 | `artifacts/CRAWL-BLOG-INDEX.json` |
| `CRAWL-BLOG-ARTICLES-A` | 前 12 个 article slug 的中英文页面 | 24 | `artifacts/CRAWL-BLOG-ARTICLES-A.json` |
| `CRAWL-BLOG-ARTICLES-B` | 后 12 个 article slug 的中英文页面 | 24 | `artifacts/CRAWL-BLOG-ARTICLES-B.json` |
| `CRAWL-UPDATES` | updates index + 16 version 的中英文页面 | 34 | `artifacts/CRAWL-UPDATES.json` |
| `CRAWL-COMMERCIAL-LEGAL` | download/pricing/feishu/welfare/referral/privacy/terms | 14 | `artifacts/CRAWL-COMMERCIAL-LEGAL.json` |
| `CRAWL-BOUNDARIES` | referral settings + 4 个已知 404 | 6 | `artifacts/CRAWL-BOUNDARIES.json` |

这些 C0 任务的 route 数合计为 174，但它们不代表实现已经完成；它们是后续页面 worker 的公开内容和结构输入。爬取任务不得把 bundle-only route（如 `/sign-in`、`/billing`、`/admin`）加入 public manifest。

### Wave 0：冻结合同

执行 `BOOTSTRAP`。只做目录、类型、route owner manifest 和 worker task manifest。该阶段完成前不启动页面写码 worker。

### Wave 1：高并发页面模块

可以同时启动：

`HOME-ZH`, `HOME-EN`, `PRODUCT-HUB-ZH`, `PRODUCT-HUB-EN`, `XHS-FEATURE-DATA`, `DOUYIN-FEATURE-DATA`, `PRODUCT-TEMPLATE`, `BLOG-INDEX-CATEGORY`, `BLOG-ARTICLE-ZH`, `BLOG-ARTICLE-EN`, `BLOG-ARTICLE-TEMPLATE`, `UPDATES-CATALOG`, `COMMERCIAL-PAGES`, `LEGAL-PAGES`, `BOUNDARY-404`, `SHELL-COMPONENTS`, `SHELL-STYLES`, `QA-MANIFEST`。

这些任务没有共享写入文件；实际并发数为：

```text
actual_concurrency = min(ready_tasks, available_lw_luna_slots)
wave_count = ceil(ready_tasks / actual_concurrency)
```

例如可用 8 个 slot 时，Wave 1 分 3 波，每波 8/8/2 个 worker；不要因为 slot 不足而把两个任务合成一个大 prompt。

### Wave 2：唯一收敛

主线程运行 `ROUTE-ADAPTER` 和 `INTEGRATOR`。只有这两个任务允许修改共享入口和构建产物。

### Wave 3：并发验收

同时启动 `QA-ROUTE-SMOKE`, `QA-VISUAL-DESKTOP`, `QA-VISUAL-MOBILE`, `QA-BUILD`；`QA-PUBLISH-SMOKE` 等待 `QA-BUILD` 和真实部署 URL。

## 6. 每个 lw-luna task packet 必须包含

每个任务用一个绝对路径 task file 启动，并传给 `/Users/vsiyo/.codex/workers/run-lw-luna.sh`：

- `TASK_ID`、项目根、任务源 hash、明确 read scope/write scope/forbidden scope。
- 目标 route 列表和页面数量；单一完成条件；禁止修改的文件列表。
- 独立 validation command file；不得依赖兄弟 worker 的未冻结文件。
- 独立 artifact、log、return、ledger 目录。
- structured return：`proposed_state`, `acceptance_self_check`, `failure_class`, `failure_origin`, `changed_files`, `evidence_files`, `unverified_items`。

外层 supervisor 必须记录 PID、开始/结束时间、wrapper、prompt hash、退出码、validation exit、实际改动路径。环境/传输失败只重试同一 lw-luna 一次；实现失败最多升级 L3 一次；不切 Terra、不用 `spawn_agent`、不自动 L4。

## 7. 页面 worker 的统一验收

每个页面 worker 的本地验收只验证自己的模块：

1. route/data catalog 数量和 slug 集合；
2. `zh`/`en` 字段完整；
3. unknown slug 不回退；
4. 所有 internal href 属于冻结 manifest 或显式 external；
5. 局部 CSS 不污染共享 selector；
6. `changed_files` 只落在自己的 ownership；
7. `proposed_state` 不得是 `ACCEPTED`。

页面 worker 通过不等于整体复刻完成；整体完成要看 `INTEGRATOR`、`QA-ROUTE-SMOKE`、桌面/移动视觉证据和生产 readback。

## 8. 当前设计波状态

已启动过 4 个设计 worker：

- `PRODUCT-LANE`：`VERIFIED`，validation 通过。
- `BLOG-LANE`：`VERIFIED`，validation 通过。
- `COMMERCIAL-LANE`：`VERIFIED`，validation 通过。
- `SHELL-QA-LANE`：primary 超时后已按用户重新聚焦设计而停止；其 primary artifact 和 validation 已生成，但 supervisor 最终不计为完成。

这些 artifact 是下一次 `BOOTSTRAP` 和 Wave 1 task packet 的输入，不是源代码复刻完成证据，也不是生产部署证据。
