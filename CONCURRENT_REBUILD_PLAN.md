# MediaClaw 174 页并发复刻线路

## 目标与证据边界

- 基线：`site-audit-mediaclaw-full-2026-08-19/report.json`，174 条同源匿名渲染路由，170 个 HTTP 200、4 个 HTTP 404。
- 目标：把页面从“路由能回退到 SPA”提升为“每个正常页面都有对应模板和数据”，并保持中英文路由、可见导航和 404 行为可验证。
- 不复制：静态 bundle 中仅出现、但没有被匿名 GET/HEAD 成功渲染的账户、计费、管理和私有 API 路由。
- 不宣称：本地构建或 worker `VERIFIED` 不等于生产部署；生产状态必须有部署地址、发布 hash、HTTP/DOM/截图证据。

## 当前基线

当前 `MediaClaw-Web` 的专用页面组件覆盖 45 条审计路由，129 条路由进入通用占位页。当前源码将路由、数据和组件集中在 `src/main.jsx`，因此真正的并发写码前必须先完成共享契约和目录拆分。

## 车道与所有权

### Foundation：主线程串行冻结（不占 worker）

所有权：`src/main.jsx` 的路由入口、`src/app/**`、`src/components/site-shell/**`、`src/data/route-manifest.js`、共享 CSS token。

交付：

- 将 `App`、导航、页脚、locale 解析和 not-found 行为抽成共享模块。
- 建立唯一页面 manifest：`route`, `locale`, `family`, `status`, `owner`, `dataKey`。
- 禁止 worker 直接编辑 `src/main.jsx`、共享路由 manifest、共享 CSS token、`package.json` 和 lockfile。

### Wave 1A：产品功能

所有权：`src/pages/products/**`、`src/data/products/**`、产品局部样式。

范围：4 个产品 workflow hub + 40 个平台功能详情页。使用平台 x capability x locale 的数据驱动模板，避免 40 份复制 JSX。

### Wave 1B：博客内容

所有权：`src/pages/blog/**`、`src/data/blog/**`、博客局部样式。

范围：2 个博客 index + 24 个分类页 + 48 篇文章页。中英文 route 可以共用结构，但必须有独立 locale 文案数据；不能用第一篇文章作为未知 slug 的 fallback。

### Wave 1C：更新、商业与法律

所有权：`src/pages/updates/**`、`src/pages/commercial/**`、`src/pages/legal/**`、`src/data/updates/**`、`src/data/commercial/**`。

范围：2 个更新 index + 32 个版本页 + 10 个商业/集成页 + 4 个法律页 + 2 个 referral settings boundary + 4 个显式 404 行为。

### Wave 1D：验收与发布准备

所有权：`qa/**`、`scripts/**`、`deployment/**`、验收 manifest 和证据目录；不改页面组件。

范围：路由覆盖、未知 slug、桌面/移动 Playwright、构建、静态发布 smoke check、生产发布前门禁。

## 依赖和波次

```text
审计基线 -> Foundation 冻结
                 |
        +--------+---------+---------+
        |                  |         |
     产品 1A            博客 1B   更新/商业 1C
        |                  |         |
        +--------+---------+---------+
                 |
          主线程路由收敛
                 |
          验收 1D / 发布门禁
```

Foundation 完成之前不得并行写共享路由。Wave 1A/1B/1C 可以同时运行，因为它们只写各自目录；1D 的完整验收必须等路由收敛后开始。worker 数量受实际 lw-luna slot 限制，容量不足时只增加 wave 数，不合并所有权。

## lw-luna 执行合同

- primary executor 固定为 `lw-luna`，wrapper 固定为 `/Users/vsiyo/.codex/workers/run-lw-luna.sh`。
- 每个 worker 是一个独立 OS 进程；外层 supervisor 记录 PID、prompt hash、日志、structured return、退出码和实际改动路径。
- 环境/传输失败：同一 Luna wrapper 仅重试一次；实现/产品行为失败：最多升级当前 `run-l3.sh` 一次；禁止自动切换到 Terra、L4 或 `spawn_agent`。
- 并行实现 worker 必须有不重叠的源码、数据、样式、生成物、端口和证据目录。
- worker 只能提出 `IMPLEMENTED`/`VERIFIED`，不能自行认定 `ACCEPTED`。

## 每条车道的完成条件

1. 不再出现未知 slug 回退到其他内容。
2. manifest 中每条目标 URL 恰好对应一个 owner、family 和 dataKey。
3. `npm run build` 通过。
4. 路由覆盖脚本对 174 条基线 URL 给出：200 页面有正确 H1/family，4 条 404 保持 not-found；不把 bundle-only route 计入覆盖。
5. Playwright 至少验证桌面 1440x900 和移动 390x844 的首屏、导航、无水平溢出、错误路由和中英文切换。
6. 生产发布前必须另行取得部署 URL、发布 hash、HTTP 状态、DOM 标题/H1、控制台状态和截图证据。

## 推荐执行顺序

1. 主线程完成 Foundation，冻结 manifest 和目录契约。
2. 同一 launch wave 并发启动 1A、1B、1C、1D 的“契约/验收准备”任务；真正页面写码从下一波开始，避免 1D 在未收敛路由上误报。
3. 主线程合并三条页面实现，唯一负责 `src/main.jsx` 或路由注册收敛。
4. 启动 1D 的实现验收波：构建、路由覆盖、Playwright、发布预览。
5. 只有本地验收通过后，才创建部署候选；生产未部署前状态保持 `candidate`。

## 当前设计波输出

设计波的四个 worker 只写本目录下的 lane 设计稿和结构化返回，不修改应用源码。它们的结果用于下一步 Foundation 任务的输入，不构成页面已复刻或已生产部署的证据。

详细的可派工任务矩阵见 [CONCURRENT_WORKER_ASSIGNMENTS.md](./CONCURRENT_WORKER_ASSIGNMENTS.md)。该文件按页面数量、文件所有权、依赖、波次、验证命令和 lw-luna 返回合同拆分任务，是后续实际 dispatch 的准入清单。
