const fs = require('fs');
const path = require('path');
const { chromium } = require('/Users/vsiyo/Desktop/Opensource_Tool/npm-global/lib/node_modules/playwright');

const TARGET = 'https://mediaclaw.app/';
const ARTIFACT = path.resolve(__dirname, '../artifacts/CRAWL-BLOG-INDEX.json');
const PROTOCOL = '/Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/agents-results/2026-08-19/mediaclaw-crawl-wave/tasks/CRAWL-PROTOCOL.md';
const PAGE_CLASSIFICATION = '/Users/vsiyo/Desktop/Opensource_Tool/site-audit-mediaclaw-full-2026-08-19/PAGE_CLASSIFICATION.md';

const chineseCategoryPaths = [
  '/blog/category/%E5%B0%8F%E7%BA%A2%E4%B9%A6',
  '/blog/category/%E5%86%85%E5%AE%B9%E8%BF%90%E8%90%A5',
  '/blog/category/%E8%AF%84%E8%AE%BA%E9%87%87%E9%9B%86',
  '/blog/category/%E5%85%B3%E9%94%AE%E8%AF%8D%E6%8C%96%E6%8E%98',
  '/blog/category/%E5%AE%A2%E8%B5%84%E7%AD%9B%E9%80%89',
  '/blog/category/%E5%B0%8F%E7%BA%A2%E4%B9%A6%E8%BF%90%E8%90%A5',
  '/blog/category/%E6%8A%96%E9%9F%B3',
  '/blog/category/%E6%90%9C%E7%B4%A2%E6%B5%81%E9%87%8F',
  '/blog/category/%E6%95%B0%E6%8D%AE%E9%87%87%E9%9B%86',
  '/blog/category/%E7%9F%AD%E8%A7%86%E9%A2%91%E8%BF%90%E8%90%A5',
  '/blog/category/ai%E5%88%86%E6%9E%90',
  '/blog/category/ai-%E9%80%89%E9%A2%98'
];

const englishCategoryPaths = [
  '/en/blog/category/content-ideas',
  '/en/blog/category/content-strategy',
  '/en/blog/category/download-without-watermark',
  '/en/blog/category/extract-video-transcript',
  '/en/blog/category/keyword-research',
  '/en/blog/category/lead-generation',
  '/en/blog/category/low-follower-high-engagement',
  '/en/blog/category/rednote',
  '/en/blog/category/rednote-operations',
  '/en/blog/category/rednote-seo',
  '/en/blog/category/xiaohongshu',
  '/en/blog/category/xiaohongshu-seo'
];

const routeSpecs = [
  { path: '/blog', routeKind: 'index', locale: 'zh' },
  { path: '/en/blog', routeKind: 'index', locale: 'en' },
  ...chineseCategoryPaths.map((routePath) => ({ path: routePath, routeKind: 'category', locale: 'zh' })),
  ...englishCategoryPaths.map((routePath) => ({ path: routePath, routeKind: 'category', locale: 'en' }))
];

if (routeSpecs.length !== 26) {
  throw new Error('Frozen blog index assignment must contain exactly 26 routes');
}

function unique(items) {
  return [...new Set(items)];
}

function categoryData(routePath, routeKind) {
  if (routeKind !== 'category') return null;
  const encodedSegment = routePath.slice(routePath.lastIndexOf('/') + 1);
  return {
    encodedSegment,
    decodedLabel: decodeURIComponent(encodedSegment)
  };
}

function increment(map, key) {
  map[key] = (map[key] || 0) + 1;
}

async function readRenderedDom(page) {
  return page.evaluate(() => {
    const clean = (value) => (value || '').replace(/\s+/g, ' ').trim();
    const uniqueValues = (items) => [...new Set(items)];
    const labelFor = (element) => {
      const ariaLabel = element.getAttribute('aria-label');
      if (ariaLabel) return clean(ariaLabel);
      const labelledBy = element.getAttribute('aria-labelledby');
      if (labelledBy) {
        return clean(labelledBy.split(/\s+/).map((id) => {
          const labelledElement = document.getElementById(id);
          return labelledElement ? labelledElement.textContent : '';
        }).join(' '));
      }
      return '';
    };
    const internalPath = (rawHref) => {
      if (!rawHref) return null;
      try {
        const parsed = new URL(rawHref, window.location.href);
        if (parsed.origin !== window.location.origin) return null;
        return parsed.pathname + parsed.search + parsed.hash;
      } catch {
        return null;
      }
    };
    const linkRecord = (anchor) => ({
      text: clean(anchor.textContent),
      href: internalPath(anchor.getAttribute('href'))
    });
    const navRecord = (nav) => {
      const links = Array.from(nav.querySelectorAll('a[href]'))
        .map(linkRecord)
        .filter((link) => link.href);
      const buttons = Array.from(nav.querySelectorAll('button'))
        .map((button) => clean(button.textContent))
        .filter(Boolean);
      const navText = clean(nav.textContent);
      const isCategoryNavigation = links.some((link) => link.href.includes('/blog/category/'))
        || /blog|博客|category|分类/i.test((labelFor(nav) + ' ' + navText));
      return {
        label: labelFor(nav),
        text: navText,
        links,
        buttons,
        isCategoryNavigation
      };
    };
    const headings = Array.from(document.querySelectorAll('h1, h2, h3')).map((heading) => ({
      level: Number(heading.tagName.slice(1)),
      text: clean(heading.textContent)
    }));
    const landmarks = Array.from(document.querySelectorAll('header, nav, main, footer, aside')).map((element) => ({
      tag: element.tagName.toLowerCase(),
      label: labelFor(element)
    }));
    const sections = Array.from(document.querySelectorAll('section, article')).map((element) => {
      const heading = element.querySelector('h1, h2, h3, h4, h5, h6');
      return {
        tag: element.tagName.toLowerCase(),
        id: element.id || '',
        label: labelFor(element),
        heading: heading ? clean(heading.textContent) : ''
      };
    });
    const internalLinks = uniqueValues(Array.from(document.querySelectorAll('a[href]'))
      .map((anchor) => internalPath(anchor.getAttribute('href')))
      .filter(Boolean));
    const isArticlePath = (href) => {
      if (!href) return false;
      const pathname = href.split(/[?#]/, 1)[0];
      return /^\/(?:en\/)?blog\/(?!category(?:\/|$))[^/]+$/.test(pathname);
    };
    const articleElements = Array.from(document.querySelectorAll('article'));
    const articleHrefs = uniqueValues(internalLinks.filter(isArticlePath));
    const navs = Array.from(document.querySelectorAll('nav')).map(navRecord);
    const categoryNavs = navs.filter((nav) => nav.isCategoryNavigation);
    const forms = Array.from(document.querySelectorAll('form')).map((form) => ({
      method: (form.getAttribute('method') || 'get').toUpperCase(),
      action: internalPath(form.getAttribute('action') || window.location.href) || form.getAttribute('action') || window.location.href
    }));
    return {
      lang: document.documentElement.getAttribute('lang') || null,
      title: document.title || '',
      headings,
      landmarks,
      sections,
      internalLinks,
      forms,
      asidePresent: Boolean(document.querySelector('aside')),
      articleHrefs,
      categoryNavigation: {
        navCount: navs.length,
        categoryNavCount: categoryNavs.length,
        navs,
        categoryNavs
      },
      listCounts: {
        articleElements: articleElements.length,
        articleHrefs: articleHrefs.length,
        unorderedLists: document.querySelectorAll('ul').length,
        orderedLists: document.querySelectorAll('ol').length,
        listItems: document.querySelectorAll('li').length
      }
    };
  });
}

async function crawlRoute(browser, spec) {
  const url = new URL(spec.path.slice(1), TARGET).toString();
  const startedAt = Date.now();
  const errors = [];
  const documentRequests = [];
  const blockedRequests = [];
  const context = await browser.newContext();
  const page = await context.newPage();
  page.on('console', (message) => {
    if (message.type() === 'error' || message.type() === 'warning') {
      errors.push('console.' + message.type() + ': ' + message.text());
    }
  });
  page.on('pageerror', (error) => {
    errors.push('pageerror: ' + error.message);
  });
  await page.route('**/*', async (route) => {
    const request = route.request();
    const method = request.method().toUpperCase();
    if (method !== 'GET' && method !== 'HEAD') {
      blockedRequests.push({ method, url: request.url() });
      await route.abort('blockedbyclient');
      return;
    }
    await route.continue();
  });
  page.on('request', (request) => {
    const method = request.method().toUpperCase();
    if (request.isNavigationRequest() && request.frame() === page.mainFrame() && request.resourceType() === 'document') {
      documentRequests.push({ method, url: request.url() });
    }
  });
  page.on('response', (candidate) => {
    const request = candidate.request();
    if (request.isNavigationRequest() && request.frame() === page.mainFrame() && request.resourceType() === 'document' && !documentResponse) {
      documentResponse = candidate;
    }
  });
  page.on('requestfailed', (request) => {
    const failure = request.failure();
    if (failure && !failure.errorText.includes('blockedbyclient')) {
      errors.push('requestfailed: ' + request.method() + ' ' + request.url() + ' (' + failure.errorText + ')');
    }
  });

  let response = null;
  let documentResponse = null;
  let dom = {
    lang: null,
    title: '',
    headings: [],
    landmarks: [],
    sections: [],
    internalLinks: [],
    forms: [],
    asidePresent: false,
    articleHrefs: [],
    categoryNavigation: { navCount: 0, categoryNavCount: 0, navs: [], categoryNavs: [] },
    listCounts: { articleElements: 0, articleHrefs: 0, unorderedLists: 0, orderedLists: 0, listItems: 0 }
  };
  let finalUrl = url;
  try {
    response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(700);
    finalUrl = page.url();
    dom = await readRenderedDom(page);
  } catch (error) {
    errors.push('navigation: ' + error.message);
    finalUrl = page.url();
  }
  response = response || documentResponse;

  const documentRequestPaths = documentRequests.map((request) => {
    try {
      return new URL(request.url).pathname;
    } catch {
      return null;
    }
  }).filter(Boolean);
  const assignedDocumentRequests = documentRequestPaths.filter((requestPath) => requestPath === spec.path).length;
  const record = {
    url,
    path: spec.path,
    routeKind: spec.routeKind,
    locale: spec.locale,
    category: categoryData(spec.path, spec.routeKind),
    status: response ? response.status() : null,
    contentType: response ? (response.headers()['content-type'] || null) : null,
    finalUrl,
    title: dom.title,
    lang: dom.lang,
    headings: dom.headings,
    landmarks: dom.landmarks,
    sections: dom.sections,
    internalLinks: dom.internalLinks,
    forms: dom.forms,
    durationMs: Date.now() - startedAt,
    errors: unique(errors),
    asidePresent: dom.asidePresent,
    listCount: dom.listCounts.articleElements,
    listCounts: dom.listCounts,
    articleHrefs: dom.articleHrefs,
    categoryNavigation: dom.categoryNavigation,
    documentRequests,
    documentRequestCount: documentRequests.length,
    assignedDocumentRequestCount: assignedDocumentRequests,
    blockedRequests
  };
  await context.close();
  return record;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const routes = [];
  try {
    for (const spec of routeSpecs) {
      process.stderr.write('Crawling ' + spec.path + '\n');
      routes.push(await crawlRoute(browser, spec));
    }
  } finally {
    await browser.close();
  }

  const statusCounts = {};
  const localeCounts = {};
  const routeKindCounts = {};
  const categoryNavigationCounts = {};
  let articleElementsTotal = 0;
  let articleHrefTotal = 0;
  let routesWithAside = 0;
  for (const route of routes) {
    increment(statusCounts, String(route.status));
    increment(localeCounts, route.locale);
    increment(routeKindCounts, route.routeKind);
    increment(categoryNavigationCounts, route.categoryNavigation.categoryNavCount);
    articleElementsTotal += route.listCounts.articleElements;
    articleHrefTotal += route.articleHrefs.length;
    if (route.asidePresent) routesWithAside += 1;
  }
  const observedLimitations = [
    'Anonymous live GET/HEAD document crawl only; no controls were clicked and no forms were submitted.',
    'The assigned route list was frozen from PAGE_CLASSIFICATION.md; bundle-only routes were not added.',
    'Chinese category paths retain their literal percent-encoded path in each route record; decodedLabel is stored separately.'
  ];
  for (const route of routes) {
    if (route.status !== 200) observedLimitations.push(route.path + ' returned status ' + route.status + '.');
    if (route.assignedDocumentRequestCount !== 1) {
      observedLimitations.push(route.path + ' observed ' + route.assignedDocumentRequestCount + ' assigned document requests.');
    }
    if (route.blockedRequests.length) {
      observedLimitations.push(route.path + ' attempted ' + route.blockedRequests.length + ' non-GET/HEAD request(s), which were blocked.');
    }
    if (route.errors.length) {
      observedLimitations.push(route.path + ' emitted ' + route.errors.length + ' browser/navigation error(s).');
    }
  }
  const artifact = {
    taskId: 'CRAWL-BLOG-INDEX',
    target: TARGET,
    generatedAt: new Date().toISOString(),
    routes,
    counts: {
      assigned: routeSpecs.length,
      crawled: routes.length,
      uniquePaths: new Set(routes.map((route) => route.path)).size,
      status: statusCounts,
      locales: localeCounts,
      routeKinds: routeKindCounts,
      routesWithAside,
      articleElementsTotal,
      articleHrefTotal,
      categoryNavigationCounts,
      oneAssignedDocumentRequestPerRoute: routes.every((route) => route.assignedDocumentRequestCount === 1)
    },
    observedLimitations: unique(observedLimitations),
    sourceEvidence: {
      protocol: PROTOCOL,
      pageClassification: PAGE_CLASSIFICATION,
      assignedRoutes: routeSpecs.map((spec) => ({
        path: spec.path,
        routeKind: spec.routeKind,
        locale: spec.locale,
        category: categoryData(spec.path, spec.routeKind)
      })),
      requestPolicy: 'GET/HEAD only',
      browser: 'Playwright Chromium',
      authentication: 'anonymous fresh browser context per route'
    }
  };
  fs.writeFileSync(ARTIFACT, JSON.stringify(artifact, null, 2) + '\n', 'utf8');
  process.stdout.write(JSON.stringify({
    artifact: ARTIFACT,
    assigned: routeSpecs.length,
    crawled: routes.length,
    status: statusCounts,
    routesWithErrors: routes.filter((route) => route.errors.length).length
  }) + '\n');
}

main().catch((error) => {
  process.stderr.write(error.stack + '\n');
  process.exitCode = 1;
});
