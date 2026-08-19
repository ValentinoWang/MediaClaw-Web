# BOUNDARIES

TASK_ID: BOUNDARIES

Project root: `/Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web`

Read only:
- `/Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/agents-results/2026-08-19/mediaclaw-crawl-wave/artifacts/CRAWL-BOUNDARIES.json`
- `/Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/src/rebuild/contracts/routeSchema.js`

Write only: `/Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/src/rebuild/data/boundaries.js` and `STRUCTURED_RETURN_PATH`.

Create a literal ES module with exactly 6 route records and default-export `validateRouteRecords(records, 6, 'BOUNDARIES')`. Preserve exact paths, the two observed 200 boundary routes and four observed 404 routes, locales, titles, H1, structural cues, internal links, media and source URLs. Required fields are the frozen contract; family is `boundary` for 200 and `not-found` for 404. A 404 must remain an explicit not-found record. Do not infer private/authenticated content. Do not edit any other file. Run validation and return the required structured result.
