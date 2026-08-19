# MediaClaw Commercial Lane: Updates, Commercial, Legal, and Route Boundaries

## 0. Contract and authority

This is an implementation-boundary design for the commercial lane of the 174-page
MediaClaw rebuild. It is not a source-code change and it does not establish a
deployed or production capability.

The only source inputs used are:

- `/Users/vsiyo/Desktop/Opensource_Tool/site-audit-mediaclaw-full-2026-08-19/report.json`
- `/Users/vsiyo/Desktop/Opensource_Tool/site-audit-mediaclaw-full-2026-08-19/PAGE_CLASSIFICATION.md`
- `/Users/vsiyo/Desktop/Opensource_Tool/site-audit-mediaclaw-full-2026-08-19/PAGE_CATALOG.md`
- `/Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/src/main.jsx`

The classification is an anonymous public-audit inventory, not proof that all
routes already exist in the local rebuild. Its lane facts are 54 route entries:
2 update indexes + 32 update entries + 10 visible commercial/integration pages +
4 legal pages + 2 anonymous referral-settings boundaries + 4 explicit 404s.
The full audit contains 174 rendered same-origin pages: 170 HTTP 200 and 4 HTTP
404. See `PAGE_CLASSIFICATION.md:5-21`.

The current local router uses `window.history.pushState`, a `popstate` listener,
and a chain of path checks in `App`; unmatched paths currently render
`PlaceholderPage` rather than a real not-found response (`src/main.jsx:327-348`).
This lane must therefore define route status independently from the existing
visual placeholder behavior.

## 1. Route inventory and status contract

### 1.1 Public visible HTTP 200: update log

Use one data-driven index and one data-driven entry template. The exact routes
are:

- Indexes: `/updates`, `/en/updates`.
- Version slugs, each emitted in both locale shells: `v0.0.6`, `v0.0.7`,
  `v0.0.9`, `v0.1.0`, `v0.1.1`, `v0.1.2`, `v0.1.3`, `v0.1.5`, `v0.1.7`,
  `v0.1.8`, `v0.1.9`, `v0.2.0`, `v0.2.1`, `v0.2.2`, `v0.2.3`, `v0.3.0`.
- Entry formula: `/updates/<version>` and `/en/updates/<version>`.

The index must expose exactly 16 cards for the observed version set, and every
card must link to the exact version route. An unknown version must not fall back
to the first entry. The entry template must preserve the observed route shape:
`main`/`header`/`nav`/`footer`, an H1, an update hero, and an article body. The
catalog confirms the index has 16 article items and the entry pages use a
three-section page/article structure; for example see `PAGE_CATALOG.md:89-131`
and `PAGE_CATALOG.md:869-875`.

The visible title and section headings are audit-observed copy. They can be
stored as source-observed content, but dates, release notes, metrics, product
availability, and links not present in the supplied inputs must remain absent or
explicitly marked `unverified`; do not invent them to fill the schema.

### 1.2 Public visible HTTP 200: commercial and integration pages

The requested ten pages are five route types in two locale shells:

| Type | Chinese | English | Public behavior |
| --- | --- | --- | --- |
| Download | `/download` | `/en/download` | Visible installation and setup preview |
| Pricing | `/pricing` | `/en/pricing` | Visible plan and feature comparison preview |
| Feishu/Lark integration | `/features/feishu-integration` | `/en/features/feishu-integration` | Visible integration narrative and FAQ preview |
| Welfare | `/welfare` | `/en/welfare` | Visible welfare/rewards presentation preview |
| Partner/referral | `/referral` | `/en/referral` | Visible referral-program presentation preview |

The audit catalog records visible 200 structures for all five families. It also
records the observed headings that the implementation should map into localized
content data:

- Download: installation, Chrome Web Store, Edge Add-ons, activation-code
  purchase, and setup tutorial (`PAGE_CATALOG.md:509-519`).
- Pricing: free/personal/team plans, feature comparison, FAQ, and the install
  CTA (`PAGE_CATALOG.md:521-531`). The current local preview has plan data and
  actions in `src/main.jsx:80-95`.
- Feishu/Lark: one-click sync, multi-table schema, monitoring reports, users,
  FAQ, and related tools (`PAGE_CATALOG.md:833-843`).
- Welfare: the observed `9 元全能卡` presentation, collection/download,
  analysis/creation, monitoring, survey, feedback, and referral sections
  (`PAGE_CATALOG.md:137-144` and `PAGE_CATALOG.md:185-192`).
- Referral: invitation link, social sharing, cash rewards, and the CTA
  (`PAGE_CATALOG.md:65-72` and `PAGE_CATALOG.md:497-507`).

These are public presentation routes, not proof that the offer or integration
works. Every external or account-affecting CTA must carry an explicit
`preview-only` action state until a separately authorized backend exists.

### 1.3 Public HTTP 200 with an anonymous minimum boundary

The two settings routes are deliberately separate from the ten visible
commercial pages:

- `/settings/referral`
- `/en/settings/referral`

The audit observed HTTP 200, title `MediaClaw`, no landmarks, no headings, no
sections, no forms, and no internal links (`PAGE_CATALOG.md:149-159` and
`PAGE_CATALOG.md:857-867`). Anonymous rendering must preserve that minimum
boundary: return a 200 document with no public referral settings content and do
not wrap it in the ordinary public header/footer if doing so would introduce
landmarks. An authenticated settings screen is future scope and must not be
implied by this route's anonymous 200.

### 1.4 Explicit rendered HTTP 404 evidence

These four exact paths must remain broken-link evidence and must not become blog
content pages:

- `/posts/xiaohongshu-comment-analysis`
- `/posts/xiaohongshu-comment-topic-mining`
- `/en/posts/xiaohongshu-comment-analysis`
- `/en/posts/xiaohongshu-comment-topic-mining`

The observed response is HTTP 404 with title `MediaClaw`, one H1 containing
`404`, no sections/forms/landmarks, and one internal link
(`PAGE_CATALOG.md:2045-2091`). The local route table must match these exact
paths before any generic fallback. Do not redirect them to `/blog`, resolve them
to similarly named articles, or let a broad `/blog/`/`/posts/` matcher turn them
into a 200.

The production server must send HTTP 404. A client-side SPA fallback that shows
a 404 H1 while the network response is 200 is only a visual fallback and does
not satisfy this contract. In a development server where every history route
returns `index.html`, report the distinction as `browser-rendered 404` versus
`HTTP status unverified`; production acceptance requires a server/readback check.

### 1.5 Bundle-only private route leads

The audit explicitly says that `/docs`, `/sign-in`, `/sign-up`, `/profile`,
`/billing`, `/admin`, and similar values appeared only as public-bundle route
strings and were not rendered pages in the 174-page inventory
(`PAGE_CLASSIFICATION.md:144-146`). They are not public 200 pages in this lane.

Relevant bundle-only route families include:

- Auth/account: `/sign-in`, `/sign-up`, `/forgot-password`,
  `/reset-password`, `/verify-email`, `/auth-callback`, `/profile`,
  `/account/credentials`, `/credentials`, `/no-permission`.
- Commerce/account state: `/billing`, `/checkout/zpay`, `/payments`,
  `/subscriptions`, `/invoices/retrieve`, `/credits`, `/redeem-invite`,
  `/invite-codes`, `/welfare/claim`, `/rewards/channel-survey`,
  `/rewards/experience-feedback`, `/rewards/ledger`, `/withdrawals`.
- Application/admin: `/docs`, `/chat`, `/chats`, `/generate`, `/ai-tasks`,
  `/history`, `/monitoring`, `/feedbacks`, `/tickets`, `/admin`, `/users`,
  `/roles`, `/permissions`, `/security`, `/risks`, `/settings`, `/activity`,
  `/analytics`, `/partner`, `/partners`.
- Dynamic bundle patterns such as `/$channelCode/buy`, `/$transactionNo`,
  `/$id`, `/$id/edit`, `/$id/recharge`, `/$id/grant-credits`, and
  `/$id/reset-password`.

This list is route-lead evidence only. Do not add these paths to the public
manifest, count them as reproduced pages, or expose their data through static
HTML. If a future authenticated implementation handles one, its anonymous
response must be an explicit auth boundary (401/403 or a separately approved
sign-in flow), never a public placeholder 200. Payment, account, admin, reward
claim, ledger, withdrawal, and workspace behavior are outside this lane.

## 2. Proposed implementation directory

The following is the intended ownership boundary for a later implementation;
this worker does not create or modify these source files:

```text
src/
  commercial-lane/
    route-manifest.js       # exact public, boundary, 404, and private-lead classes
    locale.js               # zh/en normalization and route generation
    updates.data.js         # 16 version records, localized fields
    commercial.data.js      # download/pricing/feishu/welfare/referral records
    legal.data.js           # privacy/terms records with approval metadata
    route-status.js         # status and auth classification helpers
  pages/
    updates/UpdatesIndexPage.jsx
    updates/UpdateEntryPage.jsx
    commercial/CommercialPreviewPage.jsx
    legal/LegalPage.jsx
    referral/ReferralSettingsBoundary.jsx
    NotFoundPage.jsx
  app/
    route-renderer.js       # exact-match dispatch before generic fallback
```

`src/main.jsx` should eventually delegate exact route classification to this
boundary. Keep the existing platform/blog lanes owned by their respective
workers. Do not make this lane own a global router rewrite or unrelated CSS.

Recommended route resolution order:

1. Normalize pathname and locale without changing the visible canonical path.
2. Match the exact public manifest for updates, commercial, and legal routes.
3. Match the exact anonymous referral-settings boundary.
4. Match the exact four 404 evidence paths.
5. Match bundle-only private leads to an auth/private status, without public
   rendering.
6. Return the generic not-found behavior for every other unknown public path.

No wildcard update-entry route or `find(...) || firstRecord` fallback is allowed.

## 3. Data schema

The codebase is JavaScript/JSX, so the schema can be represented with JSDoc or
runtime validation. The following shape is the contract, not a requirement to
introduce a new dependency:

```js
/** @typedef {'zh'|'en'} Locale */
/** @typedef {'public-200'|'anonymous-minimum-200'|'explicit-404'|'bundle-only-private'} RouteClass */
/** @typedef {'preview-only'|'content'|'boundary'|'not-found'|'private-gate'} RenderMode */

/** @typedef {{ zh: string, en: string }} LocalizedText */
/** @typedef {{ zh: string[], en: string[] }} LocalizedTextList */

/**
 * @typedef RouteRecord
 * @property {string} id
 * @property {string} basePath
 * @property {Locale} locale
 * @property {string} path
 * @property {RouteClass} routeClass
 * @property {200|401|403|404} expectedHttpStatus
 * @property {RenderMode} renderMode
 * @property {'anonymous'|'authenticated'|'unknown'} auth
 * @property {'audit-observed'|'bundle-observed'|'implementation'} provenance
 */

/**
 * @typedef UpdateRecord
 * @property {string} id       // update-v0.0.6, etc.
 * @property {string} version  // exact v* slug
 * @property {LocalizedText} title
 * @property {LocalizedText} summary
 * @property {Array<{heading: LocalizedText, body: LocalizedText, bullets?: LocalizedTextList}>} sections
 * @property {string[]} relatedPaths
 * @property {'source-observed'|'unverified'} contentStatus
 */

/**
 * @typedef CommercialRecord
 * @property {'download'|'pricing'|'feishu-integration'|'welfare'|'referral'} id
 * @property {LocalizedText} title
 * @property {LocalizedText} summary
 * @property {Array<{heading: LocalizedText, body: LocalizedText}>} sections
 * @property {Array<{label: LocalizedText, action: 'internal-preview'|'external-preview'|'disabled', target?: string}>} ctas
 * @property {'preview-only'} implementationStatus
 * @property {string[]} unverifiedCapabilities
 */

/**
 * @typedef LegalRecord
 * @property {'privacy-policy'|'terms-of-service'} id
 * @property {LocalizedText} title
 * @property {Array<{heading: LocalizedText, body: LocalizedText}>} sections
 * @property {string|null} effectiveDate
 * @property {'audit-observed-structure'|'legal-approved-copy'} approvalStatus
 * @property {string|null} ownerApprovalRef
 */

/**
 * @typedef ReferralSettingsBoundary
 * @property {'referral-settings'} id
 * @property {string} path
 * @property {Locale} locale
 * @property {200} expectedHttpStatus
 * @property {'empty-anonymous-dom'} anonymousDom
 * @property {'authenticated-future-scope'} authenticatedBehavior
 */

/**
 * @typedef NotFoundEvidence
 * @property {string} path
 * @property {Locale} locale
 * @property {404} expectedHttpStatus
 * @property {'404'} h1
 * @property {'audit-observed'} provenance
 */
```

Required data invariants:

- `version` is the route key; it is never localized and is limited to the exact
  16 observed slugs.
- Every `UpdateRecord` has both `title.zh` and `title.en`, and every version
  produces exactly two routes.
- Every commercial and legal record has both locale copies. Missing locale data
  is a data error, not permission to render another language's copy.
- `expectedHttpStatus` and `routeClass` are machine-readable. A DOM screenshot
  cannot override an HTTP status mismatch.
- `contentStatus` and `approvalStatus` prevent source-observed copy from being
  presented as verified product/legal fact.
- `unverifiedCapabilities` is mandatory for all commercial records so the UI
  cannot silently imply a live integration.
- Legal records must not receive invented effective dates, legal entity names,
  contact details, retention periods, processors, or jurisdiction terms.

## 4. Locale and path strategy

Use the observed two-shell convention:

- Chinese: no locale prefix, for example `/updates` and
  `/features/feishu-integration`.
- English: `/en` prefix, for example `/en/updates` and
  `/en/features/feishu-integration`.
- Version slugs and the five commercial/legal path identifiers are identical in
  both shells. The locale changes copy and document language, not the stable ID.
- Normalize only a trailing slash according to the site's canonical policy;
  never decode a path into a different route key, and preserve percent-encoding
  where a future route contains encoded segments.
- Set `document.documentElement.lang` and the localized `document.title` on
  every direct load and client navigation. Do not silently redirect `/en/...`
  to Chinese or fall back to Chinese content when an English record is missing.
- Keep locale switching explicit and data-driven. For an update entry, switch
  between `/updates/v0.2.0` and `/en/updates/v0.2.0`; do not reconstruct a URL
  from a translated title.

## 5. Static preview boundaries by capability

The following boundary is mandatory for this lane:

| Capability | Allowed in this lane | Must not be claimed or implemented here |
| --- | --- | --- |
| Payment | Render observed plan names/prices, comparison, FAQ, and a clearly labeled preview CTA | Checkout, order creation, payment capture, renewal, invoices, receipts, subscription state, refunds, or real-card testing |
| Login/account | Link to an existing or future sign-in preview and state that account service is absent | Credential submission, password reset, OAuth, session issuance, entitlement reads, profile mutation, or account proof |
| Download | Render installation steps and outbound Chrome/Edge store affordances as static/external-preview links | Bundled extension delivery, signed artifact verification, download telemetry, license activation, or claim that installation succeeded |
| Feishu/Lark | Render the observed sync story, schema examples, FAQ, and a template/outbound preview link if approved | OAuth, webhook registration, token storage, table writes, monitoring jobs, sync readback, or proof of team collaboration |
| Welfare | Render the observed welfare/rewards presentation and explain that it is a preview | `/welfare/claim`, coupon/card issuance, redemption, inventory, entitlement, payment, or reward ledger mutation |
| Referral | Render the observed partner-program steps as source-observed presentation | Referral-link generation, attribution, commission calculation, cash payout, ledger, withdrawal, or referral-settings mutation |
| Legal | Render only approved or explicitly source-observed static text and headings | Legal advice, acceptance contract execution, consent recording, enforceability, or claim that the text is current legal authority |

UI actions should be modeled with `action: 'internal-preview'`,
`'external-preview'`, or `'disabled'`. There must be no fetch/XHR mutation,
credential field, payment form, OAuth callback, Feishu token, webhook secret,
reward claim, or referral ledger request in this lane. Existing source behavior
that opens an external store or Feishu template is an outbound navigation only;
it is not integration evidence.

## 6. Rendering and not-found behavior

### Public content pages

Use the shared public shell for the two update indexes, 32 entries, ten
commercial pages, and four legal pages. Each page needs one stable H1, localized
title/copy, keyboard-accessible links, and no account-affecting form. The update
index and commercial pages may use interactive accordions or tabs only as local
presentation state.

### Anonymous referral settings

Bypass the public shell for `/settings/referral` and `/en/settings/referral` if
the shell would add visible landmarks. Return the minimum 200 boundary observed
by the audit. Do not display a login form, referral code, commission balance, or
settings controls anonymously.

### Exact 404 evidence

Render a dedicated `NotFoundPage` for the four listed `/posts/...` paths and all
other unknown public paths. The exact evidence routes need one H1 `404`, no
article body, no related-post fallback, and a single safe navigation link. The
server adapter must set HTTP 404 for a direct request. Client navigation must
also update the document title and avoid leaving stale page data in the DOM.

### Private bundle leads

Do not include bundle-only routes in public navigation, sitemap, or page counts.
If the app later adds them, require an explicit auth/private route adapter and
separate acceptance. This lane must not convert a bundle string into a public
page merely because the current client-side fallback can render any pathname.

## 7. Acceptance commands and evidence

The worker acceptance command is the frozen command supplied for this lane:

```sh
bash /Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/agents-results/2026-08-19/mediaclaw-concurrent-rebuild-design/validation/COMMERCIAL-LANE.sh
```

The command file SHA-256 is
`de12c5713aa8b9e960f83e1337a1614f7781b168346942e25a9dc2e33698097e`; do not
replace it or weaken its scope.

After implementation, the following evidence gates are required in addition to
the frozen lane command:

1. Manifest/data gate: assert 2 update index records, 16 version records, 32
   localized update routes, 5 commercial records/10 routes, 2 legal records/4
   routes, 2 referral-settings boundaries, 4 exact 404 records, and zero
   accidental public records for bundle-only paths.
2. Direct HTTP gate: use `curl -sS -o /dev/null -w '%{http_code}'` against
   every route in a production-like preview. Expect 200 for public content and
   the anonymous boundary, 404 for the four evidence paths, and an explicit
   auth/private status for any future private route. Record the server mode
   because a Vite history fallback can mask status failures.
3. Browser DOM gate: for both locales, verify one H1 and the expected page
   family; verify `settings/referral` has no anonymous landmarks/headings; verify
   each 404 has H1 `404`; verify unknown update versions do not render a first
   entry; verify no stale locale text remains after switching.
4. Static-action gate: inspect browser requests and click every commercial CTA.
   There must be no payment, login, OAuth, Feishu write, reward claim, referral
   ledger, or account mutation request. External navigation must be labeled as
   preview/external and must not be counted as local capability evidence.
5. Production disclosure gate: record the built artifact/release identity and
   deployed HTTP readback separately. A passing local build or screenshot is not
   production acceptance.

The design-only worker cannot run the post-implementation route/browser gates
because it is forbidden to modify `src/**`, package files, or deployment state.

## 8. Production and legal disclosure boundary

The following statements are safe for this design artifact:

- The routes and headings are reproduced from the supplied anonymous audit as a
  front-end rebuild target.
- Commercial, payment, account, download, Feishu, welfare, and referral flows
  are static previews until separately authorized backend and external-service
  evidence exists.
- `settings/referral` is an anonymous 200 minimum boundary, not proof of an
  authenticated referral-settings product.
- The four `/posts/...` routes are preserved as HTTP 404 evidence, not content.
- Bundle-only strings are leads for future private/authenticated work and are not
  part of the 174 public-page completion claim.

Do not publish this artifact as evidence of payment processing, extension
installation, login/OAuth, Feishu synchronization, reward redemption, referral
commission/payout, legal approval, data-protection compliance, customer usage,
or production deployment. Those claims require independent authority, active
release/readback, authenticated tests where applicable, and owner approval.

## 9. Worker write boundary

This worker is allowed to create only this artifact and the required structured
return JSON. No `src/main.jsx`, `src/**`, package file, `dist`, or other worker
artifact is part of the change set.
