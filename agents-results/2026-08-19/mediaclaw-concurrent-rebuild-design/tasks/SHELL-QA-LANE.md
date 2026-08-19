# SHELL-QA-LANE

你是 MediaClaw 174 页复刻的共享壳层、路由收敛和验收车道设计 worker。你必须只读分析以下输入：

- `/Users/vsiyo/Desktop/Opensource_Tool/site-audit-mediaclaw-full-2026-08-19/report.json`
- `/Users/vsiyo/Desktop/Opensource_Tool/site-audit-mediaclaw-full-2026-08-19/NAVIGATION.md`
- `/Users/vsiyo/Desktop/Opensource_Tool/site-audit-mediaclaw-full-2026-08-19/ROUTE_TREE.md`
- `/Users/vsiyo/Desktop/Opensource_Tool/site-audit-mediaclaw-full-2026-08-19/COVERAGE.md`
- `/Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/src/main.jsx`
- `/Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/src/styles.css`

只允许写入：
`/Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/agents-results/2026-08-19/mediaclaw-concurrent-rebuild-design/artifacts/SHELL-QA-LANE.md`

不要改 `src/main.jsx`、任何 `src/**`、package 文件、dist 或其他 worker 的 artifact。设计 Foundation 的目录/路由/locale 契约、全局导航接口和不重叠的 worker ownership；设计 174 URL 的静态覆盖检查、SPA unknown slug 防回退、Playwright 桌面/移动验收、构建与发布 smoke gate。明确本地 127.0.0.1 服务、生产域名、构建产物和部署 hash 的证据分层。完成后写 structured return JSON 到 `STRUCTURED_RETURN_PATH`，字段至少包含 proposed_state=VERIFIED、acceptance_self_check=pass、failure_class=none、failure_origin=none、changed_files、evidence_files、unverified_items。
