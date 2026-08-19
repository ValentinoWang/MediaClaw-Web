# C0 Crawl Protocol

All crawl workers must follow this protocol.

## Scope

- Target: `https://mediaclaw.app/` only.
- Access: anonymous same-origin GET/HEAD document requests only.
- Do not submit forms, log in, click purchase/referral/settings actions, solve CAPTCHA, reuse cookies, or call private APIs.
- Do not treat bundle-only route strings as public pages.
- Preserve the exact route and response status. A rendered 404 remains 404 evidence.

## Per-route record

Each route record must include:

```json
{
  "url": "https://mediaclaw.app/example",
  "path": "/example",
  "status": 200,
  "contentType": "text/html; charset=utf-8",
  "title": "...",
  "lang": "zh",
  "headings": [{"level":1,"text":"..."}],
  "landmarks": [{"tag":"header","label":""}],
  "sections": [{"tag":"section","heading":"..."}],
  "internalLinks": ["/pricing"],
  "forms": [],
  "durationMs": 123,
  "errors": []
}
```

Use Playwright or a standards-compliant GET client. If using Playwright, block browser requests whose method is not GET/HEAD and do not click controls. Wait for `domcontentloaded` plus a short bounded render settle; do not wait indefinitely for analytics or mutation requests.

Workers must perform the live crawl against `https://mediaclaw.app/` during this
attempt. Do not synthesize route records from the local rebuild, the prior audit,
bundle-only strings, or a guessed template. The assigned route list is frozen by
the task file; every route must be requested exactly once, including expected
anonymous 404s. A task-local script is encouraged when it makes the request and
DOM extraction reproducible.

## Artifact and return

Write only the task's assigned JSON artifact and optional task-local script/log. The artifact must include `taskId`, `target`, `generatedAt`, `routes`, `counts`, `observedLimitations`, and `sourceEvidence`. The structured return must include `proposed_state`, `acceptance_self_check`, `failure_class`, `failure_origin`, `changed_files`, `evidence_files`, and `unverified_items`.

## Validation

- Every assigned route appears exactly once.
- Status counts match the assignment (200/404 as expected).
- No assigned route is silently replaced by a bundle-only route.
- `errors` contains console or navigation errors, but does not turn a normal HTTP 404 into a worker failure.
- No source file under `MediaClaw-Web/src/**` is changed.
- The structured return must name the JSON artifact and validation log under the
  crawl-wave directory, and must report any live navigation, browser, or
  anti-bot limitation as `unverified_items` rather than silently filling data.
