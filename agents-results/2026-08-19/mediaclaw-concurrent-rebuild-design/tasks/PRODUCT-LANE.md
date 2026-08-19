# PRODUCT-LANE

你是 MediaClaw 174 页复刻的产品功能车道设计 worker。你必须只读分析以下输入：

- `/Users/vsiyo/Desktop/Opensource_Tool/site-audit-mediaclaw-full-2026-08-19/report.json`
- `/Users/vsiyo/Desktop/Opensource_Tool/site-audit-mediaclaw-full-2026-08-19/PAGE_CLASSIFICATION.md`
- `/Users/vsiyo/Desktop/Opensource_Tool/site-audit-mediaclaw-full-2026-08-19/PAGE_CATALOG.md`
- `/Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/src/main.jsx`

只允许写入：
`/Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/agents-results/2026-08-19/mediaclaw-concurrent-rebuild-design/artifacts/PRODUCT-LANE.md`

不要改 `src/main.jsx`、任何 `src/**`、package 文件、dist 或其他 worker 的 artifact。设计一个可并发实现的产品车道，覆盖 4 个 hub 和 40 个 feature detail 路由。输出：页面族/route formula、数据 schema、组件目录、共享与局部样式边界、locale 策略、未知 slug 处理、验收命令、与 Foundation 的接口。明确哪些现有内容可复用、哪些不能算完整复刻。完成后写 structured return JSON 到 `STRUCTURED_RETURN_PATH`，字段至少包含 proposed_state=VERIFIED、acceptance_self_check=pass、failure_class=none、failure_origin=none、changed_files、evidence_files、unverified_items。
