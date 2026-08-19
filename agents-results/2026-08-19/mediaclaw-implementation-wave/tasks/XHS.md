# XHS

TASK_ID: XHS

Project root: `/Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web`

Read only:
- `/Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/agents-results/2026-08-19/mediaclaw-crawl-wave/artifacts/CRAWL-XHS.json`
- `/Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/src/rebuild/contracts/routeSchema.js`
- `/Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/CONCURRENT_WORKER_ASSIGNMENTS.md`

Write only: `/Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/src/rebuild/data/xiaohongshu.js` and `STRUCTURED_RETURN_PATH`.

Create a literal ES module with exactly 22 route records and default-export `validateRouteRecords(records, 22, 'XHS')`. Preserve exact source path, HTTP status, locale, title, first H1, heading order, internal links, media URLs and source URL. Each record must contain `path,status,locale,family,title,h1,summary,sections,links,media,source`; family is `product` and platform source metadata is `xiaohongshu`. A section is `{heading, copy}` and a link is `{label, href}`. Use source-observed copy and structural labels. If the crawl has a known extraction limitation, derive route-specific H1/summary from the route slug and title in the correct locale, without inventing unsupported claims. Do not reuse Chinese as English. Do not edit any other file. Run the provided validation. Return a complete structured return.
