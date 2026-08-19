# BLOG-INDEX

TASK_ID: BLOG-INDEX

Project root: `/Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web`

Read only:
- `/Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/agents-results/2026-08-19/mediaclaw-crawl-wave/artifacts/CRAWL-BLOG-INDEX.json`
- `/Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/src/rebuild/contracts/routeSchema.js`

Write only: `/Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/src/rebuild/data/blogIndex.js` and `STRUCTURED_RETURN_PATH`.

Create a literal ES module with exactly 26 route records and default-export `validateRouteRecords(records, 26, 'BLOG-INDEX')`. Preserve exact paths including encoded category routes, statuses, locales, titles, H1, headings, category/list links, media, descriptions and source URLs. Required fields are the frozen route contract; family is `blog-index`. Sections use `{heading,copy}` and links `{label,href}`. English records require source-observed English or short English structural descriptions, never Chinese fallback. Do not edit any other file. Run the provided validation and return the required structured result.
