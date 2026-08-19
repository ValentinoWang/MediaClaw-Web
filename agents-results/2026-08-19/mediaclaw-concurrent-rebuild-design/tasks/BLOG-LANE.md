# BLOG-LANE

你是 MediaClaw 174 页复刻的博客内容车道设计 worker。你必须只读分析以下输入：

- `/Users/vsiyo/Desktop/Opensource_Tool/site-audit-mediaclaw-full-2026-08-19/report.json`
- `/Users/vsiyo/Desktop/Opensource_Tool/site-audit-mediaclaw-full-2026-08-19/PAGE_CLASSIFICATION.md`
- `/Users/vsiyo/Desktop/Opensource_Tool/site-audit-mediaclaw-full-2026-08-19/PAGE_CATALOG.md`
- `/Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/src/main.jsx`

只允许写入：
`/Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/agents-results/2026-08-19/mediaclaw-concurrent-rebuild-design/artifacts/BLOG-LANE.md`

不要改 `src/main.jsx`、任何 `src/**`、package 文件、dist 或其他 worker 的 artifact。设计覆盖 2 个博客 index、24 个 category index、48 个 article detail 的数据驱动方案。必须列出审计中的 24 个 article slug、现有 8 条本地 blog record 的差距、中文/英文数据策略、category alias、aside/列表结构、未知 slug 404 策略、内容来源和版权边界、验收矩阵。完成后写 structured return JSON 到 `STRUCTURED_RETURN_PATH`，字段至少包含 proposed_state=VERIFIED、acceptance_self_check=pass、failure_class=none、failure_origin=none、changed_files、evidence_files、unverified_items。
