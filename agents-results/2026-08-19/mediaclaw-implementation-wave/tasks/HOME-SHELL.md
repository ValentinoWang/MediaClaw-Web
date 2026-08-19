# HOME-SHELL

TASK_ID: HOME-SHELL

Project root: `/Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web`

Read only:
- `/Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/agents-results/2026-08-19/mediaclaw-crawl-wave/artifacts/CRAWL-HOME-SHELL.json`
- `/Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/src/rebuild/contracts/routeSchema.js`
- `/Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/CONCURRENT_WORKER_ASSIGNMENTS.md`

Write only: `/Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/src/rebuild/data/homeShell.js` and `STRUCTURED_RETURN_PATH`.

Create a literal ES module with exactly 2 route records and default-export `validateRouteRecords(records, 2, 'HOME-SHELL')`. Preserve exact source path, HTTP status, locale, title, first H1, heading order, internal links, media URLs and source URL. Each record must contain `path,status,locale,family,title,h1,summary,sections,links,media,source`; family is `home`. A section is `{heading, copy}` and a link is `{label, href}`. Use only source-observed copy; where the crawl lacks prose, add one short locale-correct structural description without inventing capabilities. Do not reuse Chinese as English. Do not edit any other source, package, CSS, dist, task, validation, artifact or sibling data file. Run the provided validation file. Return `proposed_state=VERIFIED`, `acceptance_self_check=pass`, closed failure enums, changed files, evidence files and unverified items.
