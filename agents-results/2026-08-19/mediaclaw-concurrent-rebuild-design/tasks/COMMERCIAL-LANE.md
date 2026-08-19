# COMMERCIAL-LANE

你是 MediaClaw 174 页复刻的更新、商业、法律车道设计 worker。你必须只读分析以下输入：

- `/Users/vsiyo/Desktop/Opensource_Tool/site-audit-mediaclaw-full-2026-08-19/report.json`
- `/Users/vsiyo/Desktop/Opensource_Tool/site-audit-mediaclaw-full-2026-08-19/PAGE_CLASSIFICATION.md`
- `/Users/vsiyo/Desktop/Opensource_Tool/site-audit-mediaclaw-full-2026-08-19/PAGE_CATALOG.md`
- `/Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/src/main.jsx`

只允许写入：
`/Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/agents-results/2026-08-19/mediaclaw-concurrent-rebuild-design/artifacts/COMMERCIAL-LANE.md`

不要改 `src/main.jsx`、任何 `src/**`、package 文件、dist 或其他 worker 的 artifact。设计覆盖 2 个 updates index、32 个 version entry、10 个 commercial/integration、4 个 legal、2 个 referral settings boundary 和 4 个显式 404 路由的实现边界。区分公开可见 200、匿名最小 boundary、404 证据和 bundle-only 私有 route；说明支付、登录、下载、飞书、福利、推荐等哪些只能做静态前端预览。输出目录、数据 schema、locale 策略、not-found 行为、验收命令和生产披露边界。完成后写 structured return JSON 到 `STRUCTURED_RETURN_PATH`，字段至少包含 proposed_state=VERIFIED、acceptance_self_check=pass、failure_class=none、failure_origin=none、changed_files、evidence_files、unverified_items。
