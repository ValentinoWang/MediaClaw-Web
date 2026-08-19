# MediaClaw 174 URL 复刻：共享壳层、路由收敛与验收车道设计

## 1. 任务边界与状态

- Task ID: SHELL-QA-LANE
- 设计对象: Foundation、共享 Header/Footer/locale 导航、路由收敛、174 URL 静态覆盖、SPA 未知 slug 防回退、Playwright 桌面/移动验收、构建与发布 smoke gate。
- 本 worker 的写入边界: 仅本文件与 orchestrator 要求的 structured return JSON。
- 禁止写入: src/main.jsx、任何 src/**、package 文件、dist、其他 worker artifact。
- 设计自检状态: VERIFIED。这表示本文件的输入引用、路由计数、验收矩阵和 ownership 边界自洽。
- 实现状态: NOT IMPLEMENTED。本车道没有修改源码、构建产物或部署。
- 运行时/发布状态: NOT VERIFIED。本车道没有启动本地服务、执行 Playwright、读取 production 或核对部署 hash。
- Contract status: DRAFT，需要 Foundation/产品验收 owner 审批后才能锁定实现契约。
- Test baseline: PLANNED，保护测试和脚本路径需由后续 QA lane 创建并 hash-lock。

设计自检通过不能替代实现、构建、本地浏览器、production 或 device 证据。

## 2. 冻结输入与基线事实

冻结输入为 2026-08-19 任务包指定的六个文件。审计报告的 generatedAt 为 2026-08-18T19:42:23.927Z，目标为 https://mediaclaw.app/。

### 2.1 审计事实

report.json 的 .pages 和 COVERAGE.md 共同给出 174 个已 rendered URL：

| 维度 | 基线 |
| --- | ---: |
| URLs discovered | 174 |
| Pages rendered/analyzed | 174 |
| HTTP 200 | 170 |
| HTTP 404 | 4 |
| lang=zh | 87，含 85 个 200、2 个 404 |
| lang=en | 87，含 85 个 200、2 个 404 |
| Render failures | 0 |
| Access-limited 401/403/429 | 0 |
| Bundle-only route strings | 80，不属于 174 个 public URL |

按 URL path 归属，174 个 URL 是：

| Route family | 总数 | 中文 | English |
| --- | ---: | ---: | ---: |
| home | 2 | 1 | 1 |
| xiaohongshu | 22 | 11 | 11 |
| douyin | 22 | 11 | 11 |
| blog，包括 category 与 article | 74 | 37 | 37 |
| updates，包括列表与版本页 | 34 | 17 | 17 |
| download | 2 | 1 | 1 |
| features/feishu-integration | 2 | 1 | 1 |
| pricing | 2 | 1 | 1 |
| privacy-policy | 2 | 1 | 1 |
| referral | 2 | 1 | 1 |
| settings/referral | 2 | 1 | 1 |
| terms-of-service | 2 | 1 | 1 |
| welfare | 2 | 1 | 1 |
| known missing posts | 4 | 2 | 2 |
| **合计** | **174** | **87** | **87** |

四个有意保留的 404 必须在 manifest 中显式登记，而不是被 catch-all 吞掉：

- /posts/xiaohongshu-comment-analysis
- /posts/xiaohongshu-comment-topic-mining
- /en/posts/xiaohongshu-comment-analysis
- /en/posts/xiaohongshu-comment-topic-mining

ROUTE_TREE.md 的 Bundle-only 区域列出 80 个仅从公开 bundle 推断的路径。它们是后续产品/认证范围的线索，不得被加入本次 174 URL 的 public coverage，也不得据此声称已验证 authenticated 或 server-internal 路由。COVERAGE.md 的限制段明确指出这是 anonymous public-surface coverage，bundle-only path 不是可达性证明。

### 2.2 当前实现风险

当前 src/main.jsx 在 App 中以字符串 if 链直接分发少量路径，最后的 return PlaceholderPage 覆盖所有未匹配路径（src/main.jsx:327-348）。这会造成：

- 审计中绝大多数 /en/**、/updates/**、法律/福利/设置路径没有独立 route identity。
- /blog/category/... 与 /blog/<slug> 只按前缀进入组件，未知 category 或 slug 也可能显示普通文章/占位内容。
- /xiaohongshu/<unknown>、/douyin/<unknown> 等路径可落到通用占位页。
- Header 的 locale 按钮直接导航到固定 /en，没有保留当前 route identity（src/main.jsx:155-180）。
- navigate 直接接受任意字符串并 pushState（src/main.jsx:141-145），导航目标未经过 manifest 校验。

当前 styles.css 已有共享 header、page shell、深浅主题和 720px/1000px responsive 分支（src/styles.css:1-18、src/styles.css:105-106）。这些是视觉/布局基线，不是路由或验收 authority；内部组件的 clipping 仍需在浏览器中逐组件检查。

## 3. Foundation 契约

### 3.1 目标目录

以下是目标结构，不是本车道对现有源码的改动清单。迁移期间现有 main.jsx 只由 serial integrator 负责收敛，不允许 page worker 继续扩展字符串分支。

    src/
      app/
        foundation/
          route-types.ts           # RouteId, RouteEntry, RouteRef, RouteStatus
          route-manifest.ts        # 机器 authority；由 fragments serial compile
          route-resolver.ts        # exact route -> page owner；fail closed
          locale-contract.ts       # locale 与 peer-route 关系
          navigation-contract.ts   # Header/Footer/Breadcrumb 消费的 typed model
        shell/
          AppShell.tsx
          SiteHeader.tsx
          SiteFooter.tsx
          LocaleSwitcher.tsx
          ThemeToggle.tsx
          MobileNavigation.tsx
        errors/
          NotFoundPage.tsx
          KnownMissingPage.tsx
      pages/
        zh/
          product/                # home, platform, feature, download, pricing
          blog/
          updates-legal/
        en/
          product/
          blog/
          updates-legal/
      content/
        zh/
        en/
      styles/
        foundation.css
        shell.css
        pages.css
    qa/
      route-coverage/
        audit-parity.mjs
        route-ownership.mjs
        unknown-slug.mjs
      playwright/
        route-smoke.spec.ts
        navigation.spec.ts
        responsive.spec.ts
        release.spec.ts
      evidence/
        .gitkeep

### 3.2 Machine authority: RouteEntry

route-manifest 是唯一的机器路由 authority；Markdown 审计和截图只是输入/证据。每一个 manifest entry 必须至少具有：

    type Locale = 'zh' | 'en'
    type ExpectedHttpStatus = 200 | 404
    type RouteStatus = 'public' | 'known-missing'

    type RouteEntry = {
      id: string                 // stable, locale-qualified, never derived from display text
      path: string               // exact observed URL pathname, percent encoding preserved
      locale: Locale
      family: 'home' | 'product' | 'blog' | 'updates' | 'legal' | 'commerce' | 'known-missing'
      pageKey: string            // render contract, not a free-form fallback
      expectedHttpStatus: ExpectedHttpStatus
      status: RouteStatus
      ownerLane: string
      localePeerId: string | null
      canonicalPath: string
      titleExpectation: string
      shell: 'global' | 'known-missing'
    }

Rules:

1. path is compared as the URL pathname after removing only https://mediaclaw.app. Percent-encoded Chinese category paths remain percent-encoded; do not decode, lowercase, or silently normalize trailing slashes.
2. The manifest must contain exactly 174 unique path values and exactly one entry per audit .pages[] item. Duplicate path, duplicate id, missing locale peer, missing owner, or status drift is a static failure.
3. expectedHttpStatus=404 is only allowed for the four explicitly listed known-missing posts. An unknown path is not a manifest entry and must be resolved to NotFoundPage with no page owner.
4. pageKey must resolve to a concrete page factory. A generic PlaceholderPage, home page, or generic content page cannot satisfy a 200 manifest entry.
5. The 80 bundle-only route strings remain in a separate unverifiedBundleRoutes report. They cannot enlarge the public manifest without a new authority decision and new audit evidence.
6. A generated human view may list the manifest, but generated view drift never changes the machine authority.

### 3.3 Locale contract

- URL locale prefixes are / for zh and /en for en; the root / is the Chinese home route, not an alias for an arbitrary language.
- Every public 200 route has one locale-qualified peer. Peer mapping uses localePeerId, never string prefix concatenation.
- LocaleSwitcher receives the current RouteId and calls resolvePeer(routeId, targetLocale). If a peer is absent, it renders a defined unavailable state or a reviewed fallback entry; it must never jump to /, /en, or another unrelated page silently.
- document.documentElement.lang must be zh or en according to the entry. Copy, title, aria labels, navigation labels, and hreflang use the same locale contract.
- Route path generation is centralized in toHref(RouteRef). Page components may request a RouteRef but may not construct locale-prefixed strings themselves.
- A locale switch preserves the page family, slug/category identity, query and hash where the peer contract permits them. It must reset scroll only after the new route resolves.

### 3.4 Resolver contract and no-fallback rule

Resolution order is fixed and fail-closed:

    exact observed path
      -> known 200 RouteEntry -> concrete page owner
      -> known 404 RouteEntry -> KnownMissingPage, status 404
      -> no entry -> NotFoundPage, status 404

There is no final else -> home or else -> PlaceholderPage. Parameterized route families may be used internally for lookup, but the 174 audited concrete paths must be allowlisted before rendering. The resolver returns a discriminated result such as {kind: 'page', entry} or {kind: 'not-found', path} so a page component cannot accidentally render a different route.

For an SPA server that rewrites deep links to index.html, the browser-side result must still expose data-route-status="404", a distinct not-found heading, and no content from the previous route. On a production platform capable of per-path static output, the edge HTTP status must also be 404 for the four known-missing and unknown probes. A local shell response of HTTP 200 is not evidence that the route is valid.

## 4. Shared navigation interface

All shell consumers use one typed model generated from the manifest. No Header/Footer component owns a hardcoded route string.

    type NavItem = {
      id: string
      labelKey: string
      target: RouteRef
      region: 'header' | 'footer' | 'main' | 'breadcrumb'
      external?: false
      activeWhen: (routeId: string) => boolean
    }

    type GlobalNavigation = {
      locale: Locale
      currentRouteId: string
      primary: readonly NavItem[]
      resources: readonly NavItem[]
      footerGroups: readonly { id: string; labelKey: string; items: readonly NavItem[] }[]
      localePeer: RouteRef | null
      navigate: (target: RouteRef) => void
    }

    function getGlobalNavigation(routeId: string, locale: Locale): GlobalNavigation

Required behavior:

- Header, footer, resource popover, breadcrumb, CTA links, and locale switcher all call getGlobalNavigation or a route-specific getRouteRef; they do not call pushState directly.
- navigate validates the RouteRef against the manifest, uses history.pushState only for an internal known route, dispatches one route-change event, and scrolls after render. External Chrome Web Store/Feishu links are explicit external items and are never included in internal parity checks.
- aria-current, active section, mobile menu state, focus restoration, and close-on-navigation are shell responsibilities. Page workers do not reimplement them.
- The global nav observed in NAVIGATION.md includes Chinese and English header/footer destinations and is observed on about 47% of rendered pages. The implementation must provide the same link graph for every route family that declares the global shell, while allowing page-specific main edges.
- Locale switch acceptance must be tested from a home page, a platform detail page, a blog category, a blog article, an update detail page, and a known-missing page. A switch must either resolve the peer or show the reviewed unavailable state.

## 5. Non-overlapping worker ownership

The serial integrator freezes the manifest schema, shared IDs, CSS token names, root composition point, and acceptance artifact locations before dispatch. Each worker receives the exact route subset and may write only its lane directories and isolated route fragment. No worker edits the compiled manifest, AppShell, package scripts, dist, or another lane's fragment.

| Lane | Exact owned route set / files | May not edit | Completion proof |
| --- | --- | --- | --- |
| FND-ROUTE | src/app/foundation/route/**, src/app/foundation/locale-contract.ts, its contract tests | page components, shell implementation, package/build files | manifest schema, resolver, locale peer mapping compile and unit tests |
| SHELL-NAV | src/app/shell/**, shell style fragment, navigation tests | route manifest, page content, locale dictionaries | typed nav graph, keyboard/mobile menu, locale switch and active state tests |
| PAGE-ZH-PRODUCT | zh home, xiaohongshu, douyin, download, features/feishu-integration, pricing page/content fragments | English pages, blog, updates/legal, shell | all 26 zh product routes resolve to concrete page keys |
| PAGE-EN-PRODUCT | English counterparts of the same six product families | Chinese pages, blog, updates/legal, shell | all 26 en product routes resolve and expose lang=en |
| PAGE-ZH-BLOG | 37 zh /blog, category, article entries and src/pages/zh/blog/** | English blog, route manifest, shell | 37 concrete blog entries, category/article negative probes |
| PAGE-EN-BLOG | 37 en /en/blog, category, article entries and src/pages/en/blog/** | Chinese blog, route manifest, shell | 37 concrete English entries and peer mapping |
| PAGE-ZH-UPDATES-LEGAL | 17 zh updates plus zh privacy/referral/settings/referral/terms/welfare | English content, blog, shell, auth/private bundle routes | 22 concrete entries and title/lang checks |
| PAGE-EN-UPDATES-LEGAL | 17 en updates plus en privacy/referral/settings/referral/terms/welfare | Chinese content, blog, shell, auth/private bundle routes | 22 concrete entries and title/lang checks |
| KNOWN-MISSING | four /posts/... known 404 entries and not-found state tests | 200 page entries, generic fallback, shell contract | exact 404 semantics and no content leakage |
| QA-ROUTE | qa/route-coverage/**, qa/playwright/**, evidence schema | app source, package lock, route fragments, dist | static parity, 174 route smoke, negative probes, responsive checks |

The counts in the table are route ownership counts, not additional URLs: 26 + 26 + 37 + 37 + 22 + 22 + 2 + 2 = 174. The final four entries are the two known-missing paths in each locale. To remove ambiguity during implementation, the serial integrator must generate a machine ownership report and assert that every manifest entry has exactly one lane.

Shared-resource conflict policy:

- route-manifest.ts, route-types.ts, route-resolver.ts, root AppShell composition, package scripts, server rewrite config, and generated indexes are serial-integrator resources.
- Page workers submit route-fragments/<lane>.json and page modules only. The integrator compiles fragments, resolves duplicate IDs, then runs QA.
- A page worker may consume a frozen manifest snapshot but may not add an unreviewed route or alter a peer mapping.
- QA can report failures and add isolated tests, but cannot weaken a protected test or alter the route expectation to match a broken implementation.
- The worker count and wave count are decided by the outer orchestrator. Capacity changes the wave count, not the logical lane inventory.

## 6. Static 174 URL coverage gate

### 6.1 Inputs and generated outputs

qa/route-coverage/audit-parity.mjs consumes the frozen audit report.json and the compiled route manifest. It extracts .pages[].url, strips only https://mediaclaw.app, and preserves the exact pathname. It writes a deterministic report containing source hash, manifest hash, counts, missing paths, extra paths, duplicate IDs, duplicate paths, status drift, locale drift, peer drift, owner drift, and unresolved page keys.

The check is a static check and does not claim browser reachability. It must fail when any of these are true:

1. audit path set and manifest path set are not equal;
2. count is not 174, or status distribution is not 170 x 200 plus 4 x 404;
3. locale distribution is not 87 zh plus 87 en;
4. any route lacks id, pageKey, ownerLane, localePeerId where required, expectedHttpStatus, or canonical path;
5. a 200 path points to a generic placeholder, a broad wildcard, or an unresolved component;
6. a route family has a target outside the manifest and is not explicitly external;
7. the route owner report has zero or multiple owners for one path;
8. the four known 404s are missing, accidentally marked 200, or rendered by a 200 page factory;
9. any route uses an unapproved bundle-only string as public coverage;
10. source/manifest/route-fragment hash recorded in the report does not match the files used by the run.

### 6.2 Navigation parity

The static navigation check parses the typed nav model and route references extracted from the observed NAVIGATION.md graph. It asserts:

- every internal Header/Footer/main destination resolves to a manifest route or to one of the four explicit known 404s;
- locale-specific destinations have the same route family and a valid peer ID;
- no href points at a parameter name such as /$slug, /$id, or an unapproved bundle-only route;
- each global nav item has stable id, localized label key, active predicate, and owner SHELL-NAV;
- generated links preserve percent encoding for Chinese categories.

### 6.3 Unknown slug anti-regression probes

These paths are never added to the 174 manifest and must be exercised on every route smoke run:

- /blog/__unknown__
- /blog/category/__unknown__
- /en/blog/__unknown__
- /en/blog/category/__unknown__
- /xiaohongshu/__unknown__
- /douyin/__unknown__
- /updates/__unknown__
- /en/updates/__unknown__
- /__unknown__
- /en/__unknown__

For every probe, a fresh browser context must observe: route status 404, not-found page key, no home/platform/blog article text, no redirect to / or /en, no previous route DOM retained, and no console/page error. A direct deep link and a client-side navigation to the same unknown path are both required. A server rewrite to the SPA shell is acceptable only when the client route result is still an explicit 404; it is not acceptable to treat the shell HTTP 200 as a valid page.

## 7. Local 127.0.0.1 Playwright acceptance

### 7.1 Service contract

The release candidate must be served on loopback, not on an unspecified host:

    http://127.0.0.1:4173

The preview server command is a project script contract to be wired by the implementation owner, for example:

    HOST=127.0.0.1 PORT=4173 npm run preview -- --host 127.0.0.1 --port 4173

The QA harness must fail if the origin is localhost, a LAN address, or a different port than the run metadata. If port 4173 is occupied, the orchestrator chooses a declared free loopback port and records it in the evidence; it must not silently reuse an unrelated process.

### 7.2 Route smoke matrix

For each of the 174 manifest entries, Playwright opens the full URL in a fresh context at both desktop and mobile projects. At minimum:

- desktop: 1440 x 900;
- mobile: 390 x 844 and 360 x 780;
- page.goto response status matches expectedHttpStatus where the server can provide per-path status;
- the browser origin is the declared 127.0.0.1 base URL;
- data-route-id, data-locale, and data-route-status match the manifest;
- 200 pages expose one visible main landmark and a non-empty route-specific H1/title;
- document.documentElement.lang matches locale;
- no uncaught console.error, pageerror, failed document request, or broken image/font resource;
- all internal anchors/buttons resolve through the typed navigation API;
- direct deep-link loading and one client-side transition produce the same route identity;
- screenshot and structured JSON evidence include path, viewport, route ID, response status, title, console state, and content hash.

Full screenshot capture is evidence, not the route authority. The authority remains the source manifest plus static parity output.

### 7.3 Shared shell and interaction checks

Run representative checks on at least home, product detail, blog category, blog article, update detail, legal, English, and known-missing routes:

- Header brand, primary nav, resource menu, theme toggle, locale switcher, sign-in/install CTA, and footer all stay inside the current route's shell contract.
- Mobile menu opens, traps/returns focus correctly, closes after navigation, and does not create horizontal overflow.
- Locale switch changes to the peer route, not a fixed home route.
- Active nav state corresponds to route family and does not mark unrelated routes.
- aria-current, button names, focus-visible outline, and keyboard activation remain present in both locales.
- FAQ/tab/docs controls change content without changing route identity unless the manifest declares a route transition.

### 7.4 Responsive geometry checks

The browser test must inspect component-local geometry, not only whole-page scrollWidth. For each viewport, collect visible elements under Header, main, footer, cards, tables, nav popovers, dialogs, images and buttons. Fail on:

- visible element right edge beyond viewport or left edge below zero, except explicitly declared full-bleed media;
- text or icon overlap with a sibling, clipped button label, inaccessible horizontal scroll, or fixed overlay covering main content;
- a component's scrollWidth > clientWidth without an explicit allowlist such as the documented data table wrapper or horizontal mobile docs nav;
- missing image dimensions causing layout shift or image natural width overflow;
- mobile text wrapping that changes button/card height in a way that moves or occludes a following control.

The existing CSS has explicit 720px/1000px branches and several intentional overflow wrappers. Each allowlist entry must be component-local and asserted by selector; a global overflow:hidden pass is not acceptance.

## 8. Build and release smoke gate

The following gates are sequential. A failed earlier gate blocks later evidence.

| Gate | Required assertion | Blocking failure |
| --- | --- | --- |
| G0-SOURCE | route manifest, locale contract, fragments, QA scripts and source hash are present and reviewable | missing authority, dirty generated file, or unknown owner |
| G1-STATIC | exact 174-path parity, 170/4 status split, 87/87 locale split, nav/ownership/no-fallback checks pass | any missing/extra/duplicate/status/peer/owner route |
| G2-BUILD | project dependency/type/lint checks applicable to the repository pass; production build completes; generated manifest is embedded or shipped | build error, unresolved page key, asset import error, or route manifest absent from artifact |
| G3-LOCAL | 127.0.0.1 preview responds; all 174 direct routes and unknown probes pass HTTP/app semantics | wrong origin, deep-link failure, console error, status drift, fallback, broken asset |
| G4-PLAYWRIGHT | desktop/mobile route, shell, interaction, geometry and accessibility smoke pass | any critical route, shell, mobile, focus, or component clipping failure |
| G5-ARTIFACT | dist inventory and deterministic artifact hash recorded; source manifest hash is bound to build metadata | missing artifact, hash mismatch, or untracked generated output |
| G6-PRODUCTION | active production domain readback matches candidate release and reruns status/DOM/shell smoke | local evidence substituted for production, deployment hash mismatch, or stale release |

The implementation repository may name equivalent commands, but the gate must expose stable script entry points with these semantics:

    npm run qa:routes:static
    npm run build
    npm run qa:routes:local -- --base-url http://127.0.0.1:4173
    npm run qa:playwright -- --project=desktop --project=mobile
    npm run qa:release-smoke -- --base-url http://127.0.0.1:4173

npm run build alone is never a 174-route proof. A successful local server is never a production deployment proof. A production page screenshot without served hash/readback is never a build identity proof.

## 9. Evidence layers and provenance

Every run records a JSON evidence envelope with runId, timestamp, source commit (when available), input hashes, manifest hash, build artifact hash, deployment hash, base URL, viewport matrix, route result counts, and failure class. The layers are intentionally separate:

| Layer | Example evidence | Proves | Does not prove |
| --- | --- | --- | --- |
| Source/contract | route manifest, locale contract, ownership report, report.json hash | intended route set and rule authority | runtime rendering or deployment |
| Static QA | parity/no-fallback/nav reports | manifest completeness and deterministic resolver properties | CSS layout, browser asset loading, production |
| Local runtime | http://127.0.0.1:4173, response logs, Playwright JSON/screenshots | this candidate build renders and behaves locally | public DNS/CDN/active release |
| Build artifact | dist inventory, source-to-artifact hash, build log | exact generated release input/output binding | that the artifact is deployed or served |
| Deployment readback | CI release/commit hash, deployed asset or HTML hash, active release metadata | production serving the intended candidate | product acceptance beyond checked routes |
| Production runtime | https://mediaclaw.app HTTP/DOM/console/screenshots | public anonymous surface at the observation time | authenticated/server-internal paths, future state |
| Device/human | named device/browser run and screenshots | touch, visual readability, and human acceptance questions | route manifest completeness or backend truth |

The current audit is production observation evidence only at its recorded timestamp. It is not current deployment proof for 2026-08-19 and does not cover authenticated/server-internal routes.

## 10. Acceptance traceability

| Requirement | Observable acceptance | Test/evidence target | Blocking |
| --- | --- | --- | --- |
| AC-FND-001 | manifest equals exactly 174 audited paths and status/locale counts | qa/route-coverage/audit-parity.mjs | yes |
| AC-FND-002 | every 200 route has concrete page key and valid locale peer | route ownership and resolver contract tests | yes |
| AC-ROUTE-003 | each valid route direct-loads and client-navigates to the same route ID | route-smoke.spec.ts | yes |
| AC-ROUTE-004 | known 404 and unknown slugs never render home/placeholder content | unknown-slug.mjs, Playwright negative probes | yes |
| AC-NAV-005 | Header/Footer/main links use typed nav model and locale-preserving peer mapping | navigation.spec.ts plus static link parity | yes |
| AC-UX-006 | desktop/mobile shell, controls, text and local geometry have no unapproved overlap/clipping | responsive.spec.ts, screenshots | yes |
| AC-REL-007 | build, local preview, artifact hash, deployed hash and production readback converge | G2-G6 evidence envelope | yes |
| H-SHELL-001 | product owner can switch locale, open mobile menu, use resource nav and return without losing route identity | human checklist for SHELL-NAV | approval required |
| H-ROUTES-002 | reviewer samples home/product/blog/update/legal/404 pages at desktop/mobile and confirms no content-family fallback | human checklist for SHELL-QA-LANE | approval required |

No protected test baseline exists yet in this read-only design lane. The QA integrator must create protected test files, record SHA-256, and mark Test baseline: LOCKED before claiming implementation complete.

## 11. Completion condition for the next implementation wave

This design lane is ready to hand off only when the serial integrator accepts the following bounded package:

1. Freeze the route manifest schema and import the exact 174 paths from the audit report.
2. Create one route fragment and one owner for each declared lane; compile only in the serial integration step.
3. Implement the typed resolver and navigation model with explicit 404 and unknown states.
4. Implement all route families in their ownership directories, including both locales and the four known 404s.
5. Lock the static parity and negative-route protected tests.
6. Run G0-G5 on http://127.0.0.1:<declared-port> and retain evidence; only then perform G6 production readback.
7. Report local, build, deployment, production and human/device states separately. A partial or blocked layer remains partial or blocked; it must not be promoted by adjacent evidence.

## 12. Input provenance

The following hashes were read during this design run and identify the frozen inputs:

    5226f545c3086074bf92ee6bb0380a1fce3112a54fb31e105f8b8d159a7d0366  site-audit-mediaclaw-full-2026-08-19/report.json
    61ebecd42543bc5cb3953e5d3d897ac6d33838fcdb5db7f0f5faa5f5daacad2f  site-audit-mediaclaw-full-2026-08-19/NAVIGATION.md
    31beb459c5dde8336160660d4a62591b54313934bebdc64b8da61a47d54e0bee  site-audit-mediaclaw-full-2026-08-19/ROUTE_TREE.md
    ecb9061df8b7d2ed46d847a699f2f83bc02a9eeefe41ef20989943d2c9a8b1a9  site-audit-mediaclaw-full-2026-08-19/COVERAGE.md
    0507575f17932f6656b14d5eb249e67a788df4feb3d1a9e674a3c80e139109c1  MediaClaw-Web/src/main.jsx
    aafbfd1bba201c7c0677a15b745f93083ddf2eb1c6a6b0fe93f95bbb8faf47  MediaClaw-Web/src/styles.css

The first report hash is the audit machine input. The route trees and coverage documents are derived views for navigation and limitations. The two source hashes establish the current single-file routing and CSS baseline used to identify the implementation risks above.

