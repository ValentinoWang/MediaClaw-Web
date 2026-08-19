const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('/Users/vsiyo/Desktop/Opensource_Tool/npm-global/lib/node_modules/playwright');

const projectRoot = process.cwd();
const targetOrigin = 'https://mediaclaw.app';
const target = `${targetOrigin}/`;
const taskId = 'CRAWL-BLOG-ARTICLES-A';
const artifactPath = path.join(
  projectRoot,
  'agents-results/2026-08-19/mediaclaw-crawl-wave/artifacts/CRAWL-BLOG-ARTICLES-A.json',
);
const logPath = path.join(
  projectRoot,
  'agents-results/2026-08-19/mediaclaw-crawl-wave/logs/CRAWL-BLOG-ARTICLES-A-live-crawl.log',
);

const slugs = [
  'douyin-data-collection',
  'douyin-comment-export',
  'xiaohongshu-ai-benchmark-to-draft',
  'xiaohongshu-research-data-collection',
  'video-transcript-timestamps',
  'xiaohongshu-image-text-extraction',
  'xiaohongshu-brand-sentiment-monitoring',
  'xiaohongshu-professional-content-search-traffic',
  'xiaohongshu-find-benchmark-accounts',
  'xiaohongshu-comment-batch-export-campaign-review',
  'local-business-xiaohongshu-marketing',
  'low-follower-viral-content',
];

const assignedRoutes = slugs.flatMap((slug) => [
  { locale: 'zh', slug, path: `/blog/${slug}` },
  { locale: 'en', slug, path: `/en/blog/${slug}` },
]);

function cleanText(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function summarizeError(type, message, extra = {}) {
  return { type, message: cleanText(message), ...extra };
}

async function appendLog(line) {
  await fs.appendFile(logPath, `${line}\n`, 'utf8');
}

async function extractDom(page) {
  return page.evaluate((origin) => {
    const clean = (value) => String(value || '').replace(/\s+/g, ' ').trim();
    const visible = (element) => {
      if (!(element instanceof Element)) return false;
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== 'none'
        && style.visibility !== 'hidden'
        && Number(style.opacity || 1) > 0
        && rect.width > 0
        && rect.height > 0;
    };
    const textOf = (element, limit = 500) => clean(element?.innerText || element?.textContent || '').slice(0, limit);
    const absoluteUrl = (value) => {
      if (!value) return null;
      try {
        const url = new URL(value, window.location.href);
        if (!['http:', 'https:', 'data:', 'blob:'].includes(url.protocol)) return null;
        return url.toString();
      } catch {
        return null;
      }
    };
    const sameOriginPath = (value) => {
      try {
        const url = new URL(value, window.location.href);
        if (url.origin !== origin) return null;
        return `${url.pathname}${url.search}${url.hash}`;
      } catch {
        return null;
      }
    };
    const labelOf = (element) => clean(
      element.getAttribute('aria-label')
        || element.getAttribute('title')
        || element.getAttribute('role')
        || '',
    );
    const headingInside = (element) => clean(
      element.querySelector('h1,h2,h3,h4,h5,h6')?.innerText || '',
    );
    const visibleElements = (selector, root = document) => Array.from(root.querySelectorAll(selector))
      .filter(visible);
    const isInExcludedShell = (element) => Boolean(element.closest('aside,nav,header,footer'));

    const headings = visibleElements('h1,h2,h3').map((element) => ({
      level: Number(element.tagName.slice(1)),
      text: textOf(element),
    })).filter((heading) => heading.text);

    const landmarkElements = visibleElements('header,nav,main,aside,article,section,footer,[role]')
      .filter((element) => ['banner', 'navigation', 'main', 'complementary', 'contentinfo', 'region', 'article'].includes(
        element.getAttribute('role') || element.tagName.toLowerCase(),
      ));
    const landmarks = landmarkElements.map((element) => ({
      tag: element.tagName.toLowerCase(),
      label: labelOf(element),
    }));

    const sections = visibleElements('section').map((element) => ({
      tag: 'section',
      heading: headingInside(element),
      id: element.id || null,
    }));

    const articleRoot = document.querySelector('article') || document.querySelector('main') || document.body;
    const outline = visibleElements('h2,h3,h4', articleRoot)
      .filter((element) => !isInExcludedShell(element))
      .map((element) => ({
        level: Number(element.tagName.slice(1)),
        text: textOf(element),
        id: element.id || null,
      }))
      .filter((heading) => heading.text);

    const internalLinks = Array.from(document.querySelectorAll('a[href]'))
      .map((element) => sameOriginPath(element.href))
      .filter(Boolean)
      .filter((href, index, all) => all.indexOf(href) === index);

    const asideLinks = visibleElements('aside a[href]').map((element) => ({
      text: textOf(element, 300),
      href: absoluteUrl(element.href),
      path: sameOriginPath(element.href),
      rel: element.getAttribute('rel') || null,
    })).filter((link) => link.href);

    const forms = visibleElements('form').map((element) => ({
      action: absoluteUrl(element.getAttribute('action') || window.location.href),
      method: (element.getAttribute('method') || 'get').toLowerCase(),
      controls: Array.from(element.querySelectorAll('input,select,textarea,button')).map((control) => ({
        tag: control.tagName.toLowerCase(),
        type: control.getAttribute('type') || null,
        name: control.getAttribute('name') || null,
      })),
    }));

    const metaTags = Array.from(document.head.querySelectorAll('meta'))
      .map((element) => ({
        name: element.getAttribute('name'),
        property: element.getAttribute('property'),
        content: element.getAttribute('content'),
      }))
      .filter((meta) => meta.content);

    const metadataCandidates = visibleElements(
      'time,[class],[id],[data-testid],small,figcaption',
      articleRoot,
    );
    const visibleMetadata = [];
    const seenMetadata = new Set();
    for (const element of metadataCandidates) {
      const text = textOf(element, 500);
      const attributes = [
        element.className,
        element.id,
        element.getAttribute('data-testid'),
        element.getAttribute('aria-label'),
      ].map(clean).join(' ').toLowerCase();
      const isMetadataLike = element.tagName.toLowerCase() === 'time'
        || /meta|author|date|publish|update|category|tag|阅读|作者|发布|更新|分类|标签|分钟/.test(attributes);
      if (!isMetadataLike || !text) continue;
      const key = `${element.tagName}:${text}`;
      if (seenMetadata.has(key)) continue;
      seenMetadata.add(key);
      visibleMetadata.push({
        tag: element.tagName.toLowerCase(),
        text,
        datetime: element.getAttribute('datetime'),
        className: typeof element.className === 'string' ? element.className : null,
      });
    }

    const media = [];
    const mediaSeen = new Set();
    const addMedia = (value, kind, element, extra = {}) => {
      const url = absoluteUrl(value);
      if (!url || mediaSeen.has(`${kind}:${url}`)) return;
      mediaSeen.add(`${kind}:${url}`);
      media.push({
        url,
        kind,
        visible: visible(element),
        alt: element?.getAttribute('alt') || null,
        ...extra,
      });
    };
    const addSrcset = (value, kind, element) => {
      String(value || '').split(',').forEach((candidate) => {
        const url = candidate.trim().split(/\s+/)[0];
        if (url) addMedia(url, kind, element, { srcset: value });
      });
    };
    for (const element of visibleElements('img')) {
      addMedia(element.currentSrc || element.getAttribute('src'), 'img', element);
      addSrcset(element.getAttribute('srcset'), 'img-srcset', element);
    }
    for (const element of visibleElements('picture source,source')) {
      addMedia(element.getAttribute('src'), 'source', element, { type: element.getAttribute('type') || null });
      addSrcset(element.getAttribute('srcset'), 'source-srcset', element);
    }
    for (const element of visibleElements('video,audio,iframe,embed,object')) {
      addMedia(element.getAttribute('src'), element.tagName.toLowerCase(), element, {
        poster: element.getAttribute('poster') || null,
      });
      if (element.getAttribute('poster')) addMedia(element.getAttribute('poster'), 'poster', element);
    }
    for (const element of visibleElements('*')) {
      const background = window.getComputedStyle(element).backgroundImage || '';
      const matches = background.matchAll(/url\((['"]?)(.*?)\1\)/g);
      for (const match of matches) addMedia(match[2], 'background', element);
    }
    const mediaUrls = media.map((entry) => entry.url).filter((url, index, all) => all.indexOf(url) === index);
    const metadataMediaUrls = metaTags
      .filter((meta) => /og:image|twitter:image/i.test(`${meta.name || ''} ${meta.property || ''}`))
      .map((meta) => absoluteUrl(meta.content))
      .filter(Boolean);

    const cueTerms = [
      { term: '来源', pattern: /来源/ },
      { term: '版权', pattern: /版权/ },
      { term: '授权', pattern: /授权/ },
      { term: '许可', pattern: /许可/ },
      { term: '署名', pattern: /署名/ },
      { term: '素材', pattern: /素材/ },
      { term: 'source', pattern: /\bsource\b/i },
      { term: 'credit', pattern: /\bcredit\b/i },
      { term: 'rights', pattern: /\bright[s]?\b/i },
      { term: 'license', pattern: /\blicen[cs]e\b/i },
      { term: 'copyright', pattern: /\bcopyright\b/i },
      { term: 'via', pattern: /\bvia\b/i },
    ];
    const cueElements = visibleElements('body *');
    const visibleSourceRightsCues = [];
    const seenCues = new Set();
    for (const element of cueElements) {
      const text = textOf(element, 500);
      const attrs = [
        element.getAttribute('aria-label'),
        element.getAttribute('title'),
        element.className,
        element.id,
      ].map(clean).join(' ');
      const haystack = `${text} ${attrs}`;
      const matches = cueTerms.filter((cue) => cue.pattern.test(haystack)).map((cue) => cue.term);
      if (!matches.length || !text) continue;
      const key = `${matches.join(',')}:${text}`;
      if (seenCues.has(key)) continue;
      seenCues.add(key);
      visibleSourceRightsCues.push({
        tag: element.tagName.toLowerCase(),
        text,
        matches,
      });
      if (visibleSourceRightsCues.length >= 80) break;
    }

    const bodyText = clean(document.body?.innerText || '');
    const renderedNotFoundCue = /(^|\s)(404|not found|page not found|页面不存在|找不到页面|内容不存在)(\s|$)/i.test(bodyText);
    const h1 = headings.find((heading) => heading.level === 1)?.text || null;
    const canonical = document.querySelector('link[rel="canonical"]')?.href || null;

    return {
      title: clean(document.title),
      lang: document.documentElement.lang || null,
      headings,
      h1,
      articleH1: h1,
      landmarks,
      sections,
      sectionOutline: outline,
      internalLinks,
      asideLinks,
      forms,
      metadata: {
        metaTags,
        visible: visibleMetadata,
        canonical,
      },
      articleMetadata: {
        metaTags,
        visible: visibleMetadata,
        canonical,
      },
      media,
      mediaUrls,
      metadataMediaUrls,
      visibleSourceRightsCues,
      renderedNotFoundCue,
    };
  }, targetOrigin);
}

async function crawlRoute(browser, routeSpec, index) {
  const requestedUrl = `${targetOrigin}${routeSpec.path}`;
  const startedAt = Date.now();
  const errors = [];
  const blockedRequests = [];
  const navigationRequests = [];
  const navigationResponses = [];
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();

  await context.route('**/*', async (route) => {
    const request = route.request();
    const method = request.method().toUpperCase();
    const url = request.url();
    const resourceType = request.resourceType();
    let sameOrigin = false;
    try {
      sameOrigin = new URL(url).origin === targetOrigin;
    } catch {
      sameOrigin = false;
    }
    const blockedReason = !['GET', 'HEAD'].includes(method)
      ? 'non-get-head'
      : !sameOrigin
        ? 'cross-origin'
        : ['xhr', 'fetch', 'websocket', 'eventsource'].includes(resourceType)
          ? 'non-document-api-or-stream'
          : null;
    if (blockedReason) {
      blockedRequests.push({ url, method, resourceType, reason: blockedReason });
      await route.abort();
      return;
    }
    if (request.isNavigationRequest()) {
      navigationRequests.push({ url, method, resourceType });
    }
    await route.continue();
  });

  page.on('console', (message) => {
    if (['error', 'warning'].includes(message.type())) {
      errors.push(summarizeError(`console-${message.type()}`, message.text()));
    }
  });
  page.on('pageerror', (error) => {
    errors.push(summarizeError('pageerror', error.message || error));
  });
  page.on('requestfailed', (request) => {
    const failure = request.failure();
    errors.push(summarizeError('requestfailed', failure?.errorText || 'request failed', {
      url: request.url(),
      method: request.method(),
      resourceType: request.resourceType(),
    }));
  });
  page.on('response', async (response) => {
    const request = response.request();
    if (!request.isNavigationRequest()) return;
    const headers = response.headers();
    navigationResponses.push({
      url: response.url(),
      status: response.status(),
      contentType: headers['content-type'] || null,
    });
  });

  let response = null;
  let dom = {
    title: '',
    lang: null,
    headings: [],
    h1: null,
    articleH1: null,
    landmarks: [],
    sections: [],
    sectionOutline: [],
    internalLinks: [],
    asideLinks: [],
    forms: [],
    metadata: { metaTags: [], visible: [], canonical: null },
    articleMetadata: { metaTags: [], visible: [], canonical: null },
    media: [],
    mediaUrls: [],
    metadataMediaUrls: [],
    visibleSourceRightsCues: [],
    renderedNotFoundCue: false,
  };
  let navigationError = null;
  try {
    response = await page.goto(requestedUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });
    await page.waitForTimeout(750);
    if (page.url().startsWith(targetOrigin)) {
      dom = await extractDom(page);
    }
  } catch (error) {
    navigationError = summarizeError('navigation', error.message || error, { url: requestedUrl });
    errors.push(navigationError);
  }

  const responseHeaders = response ? response.headers() : {};
  const status = response ? response.status() : null;
  const record = {
    url: requestedUrl,
    requestedUrl,
    path: routeSpec.path,
    locale: routeSpec.locale,
    slug: routeSpec.slug,
    status,
    contentType: responseHeaders['content-type'] || null,
    title: dom.title,
    lang: dom.lang,
    headings: dom.headings,
    h1: dom.h1,
    articleH1: dom.articleH1,
    landmarks: dom.landmarks,
    sections: dom.sections,
    sectionOutline: dom.sectionOutline,
    internalLinks: dom.internalLinks,
    asideLinks: dom.asideLinks,
    forms: dom.forms,
    metadata: dom.metadata,
    articleMetadata: dom.articleMetadata,
    media: dom.media,
    mediaUrls: dom.mediaUrls,
    metadataMediaUrls: dom.metadataMediaUrls,
    visibleSourceRightsCues: dom.visibleSourceRightsCues,
    renderedNotFoundCue: dom.renderedNotFoundCue,
    finalUrl: page.url(),
    navigationRequests,
    navigationResponses,
    blockedRequests,
    durationMs: Date.now() - startedAt,
    errors,
  };

  await context.close();
  await appendLog(JSON.stringify({
    index,
    path: routeSpec.path,
    status,
    finalUrl: record.finalUrl,
    h1: record.articleH1,
    navigationRequests: navigationRequests.length,
    blockedRequests: blockedRequests.length,
    errors: errors.length,
    durationMs: record.durationMs,
  }));
  return record;
}

async function main() {
  await fs.mkdir(path.dirname(artifactPath), { recursive: true });
  await fs.mkdir(path.dirname(logPath), { recursive: true });
  await fs.writeFile(logPath, `${new Date().toISOString()} start ${taskId}\n`, 'utf8');
  const startedAt = new Date().toISOString();
  const browser = await chromium.launch({ headless: true });
  const routes = [];
  try {
    for (let index = 0; index < assignedRoutes.length; index += 1) {
      routes.push(await crawlRoute(browser, assignedRoutes[index], index + 1));
    }
  } finally {
    await browser.close();
  }

  const statusCounts = {};
  const localeCounts = {};
  const routeRequestCounts = {};
  const limitations = [
    'Anonymous live crawl only; no login, forms, state-changing controls, cookies, or private API calls were used.',
    'Cross-origin requests and same-origin XHR/fetch/WebSocket/EventSource requests were blocked by the crawl harness.',
    'The rendered DOM was sampled after domcontentloaded plus a bounded 750ms settle; analytics or later mutations are not covered.',
  ];
  for (const route of routes) {
    const key = String(route.status);
    statusCounts[key] = (statusCounts[key] || 0) + 1;
    localeCounts[route.locale] = (localeCounts[route.locale] || 0) + 1;
    routeRequestCounts[route.path] = route.navigationRequests.filter(
      (request) => request.url === route.requestedUrl && request.method === 'GET',
    ).length;
    if (route.blockedRequests.length) {
      limitations.push(`${route.path}: ${route.blockedRequests.length} browser request(s) were blocked by the same-origin/document-only harness.`);
    }
    if (route.status === null || route.errors.some((error) => error.type === 'navigation')) {
      limitations.push(`${route.path}: live navigation did not yield a complete DOM/status record.`);
    }
  }

  const artifact = {
    taskId,
    target,
    generatedAt: new Date().toISOString(),
    crawl: {
      startedAt,
      completedAt: new Date().toISOString(),
      mode: 'live-anonymous-same-origin-get-head-document-crawl',
      browser: 'Playwright Chromium headless',
      settleMs: 750,
      assignedRouteCount: assignedRoutes.length,
      requestedRouteCount: routes.length,
      requestedExactlyOnce: Object.values(routeRequestCounts).every((count) => count === 1),
    },
    routes,
    counts: {
      assigned: assignedRoutes.length,
      observed: routes.length,
      statuses: statusCounts,
      locales: localeCounts,
      routeRequestCounts,
      errors: routes.reduce((total, route) => total + route.errors.length, 0),
      blockedRequests: routes.reduce((total, route) => total + route.blockedRequests.length, 0),
    },
    observedLimitations: limitations,
    sourceEvidence: {
      protocol: 'agents-results/2026-08-19/mediaclaw-crawl-wave/tasks/CRAWL-PROTOCOL.md',
      task: 'agents-results/2026-08-19/mediaclaw-crawl-wave/tasks/CRAWL-BLOG-ARTICLES-A.md',
      liveTarget: target,
      requestedPaths: assignedRoutes.map((route) => route.path),
      extraction: [
        'HTTP response status and content-type from the live navigation response.',
        'Visible DOM title, language, headings, landmarks, sections, internal links, forms, article metadata, aside links, media URLs, and source/rights cue text.',
        'Navigation, console, page, and request-failure events observed during each bounded page session.',
      ],
      evidenceClass: 'observed-live-dom-and-response',
    },
  };
  await fs.writeFile(artifactPath, `${JSON.stringify(artifact, null, 2)}\n`, 'utf8');
  await appendLog(`${new Date().toISOString()} complete routes=${routes.length} statuses=${JSON.stringify(statusCounts)} requestedExactlyOnce=${artifact.crawl.requestedExactlyOnce}`);
}

main().catch(async (error) => {
  await appendLog(`${new Date().toISOString()} fatal ${error.stack || error.message || error}`);
  process.exitCode = 1;
});
