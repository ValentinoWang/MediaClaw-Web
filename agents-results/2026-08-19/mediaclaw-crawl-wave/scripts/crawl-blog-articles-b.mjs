import fs from 'node:fs/promises';
import { chromium } from '/Users/vsiyo/Desktop/Opensource_Tool/npm-global/lib/node_modules/playwright/index.mjs';

const target = 'https://mediaclaw.app/';
const artifactPath = new URL('../artifacts/CRAWL-BLOG-ARTICLES-B.json', import.meta.url);
const slugs = [
  'how-to-copy-viral-short-videos',
  'xiaohongshu-search-vs-recommendation-traffic',
  'xiaohongshu-keyword-placement',
  'xiaohongshu-topic-analysis',
  'short-video-transcript-extraction',
  'xiaohongshu-comment-topic-mining',
  'xiaohongshu-keyword-research',
  'xiaohongshu-competitor-monitoring',
  'xiaohongshu-comment-analysis',
  'xiaohongshu-topic-library-build',
  'xiaohongshu-download-own-posts',
  'xiaohongshu-download-remove-watermark',
];

const routes = slugs.flatMap((slug) => [
  { locale: 'zh', slug, path: `/blog/${slug}` },
  { locale: 'en', slug, path: `/en/blog/${slug}` },
]);

const sameOriginPath = (href, pageUrl) => {
  try {
    const url = new URL(href, pageUrl);
    if (url.origin !== new URL(target).origin) return null;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return null;
  }
};

const extractPage = async (page, route, response, startedAt, runtime) => {
  const data = await page.evaluate(({ requestedPath }) => {
    const isVisible = (element) => {
      if (!element) return false;
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0' && rect.width > 0 && rect.height > 0;
    };
    const clean = (value) => (value || '').replace(/\s+/g, ' ').trim();
    const unique = (items) => [...new Set(items.filter(Boolean))];
    const textOf = (element) => clean(element?.innerText || element?.textContent || '');
    const cuePattern = /(来源|出处|版权|权利|原作者|作者|公开|授权|平台规则|source|rights|copyright|author|public|permission|attribution)/i;
    const normalizeMedia = (value) => {
      try { return new URL(value, location.href).href; } catch { return null; }
    };
    const sameOriginPath = (value) => {
      try {
        const url = new URL(value, location.href);
        if (url.origin !== location.origin) return null;
        return `${url.pathname}${url.search}${url.hash}`;
      } catch {
        return null;
      }
    };

    const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')]
      .map((element) => ({ level: Number(element.tagName.slice(1)), text: textOf(element) }))
      .filter((item) => item.text);

    const landmarks = [...document.querySelectorAll('header,nav,main,aside,footer,form,[role]')]
      .filter(isVisible)
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        label: clean(element.getAttribute('aria-label') || element.getAttribute('aria-labelledby') || ''),
        role: clean(element.getAttribute('role') || ''),
      }));

    const sections = [...document.querySelectorAll('section,article')]
      .filter(isVisible)
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        heading: textOf(element.querySelector('h1,h2,h3,h4,h5,h6')),
      }))
      .filter((item) => item.heading || item.tag === 'article');

    const metaTags = [...document.querySelectorAll('meta[name],meta[property]')]
      .map((element) => ({
        key: element.getAttribute('name') || element.getAttribute('property'),
        content: clean(element.getAttribute('content') || ''),
      }))
      .filter((item) => item.key && item.content);
    const metaValue = (...keys) => {
      const found = metaTags.find((item) => keys.includes(item.key.toLowerCase()));
      return found?.content || null;
    };
    const visibleMetadata = unique([
      ...[...document.querySelectorAll('time,[class*="meta"],[class*="date"],[class*="author"],[class*="category"],[class*="tag"]')]
        .filter(isVisible)
        .map(textOf),
    ]).filter((text) => text.length > 0 && text.length <= 300).slice(0, 60);

    const asideLinks = [...document.querySelectorAll('aside a[href]')]
      .filter(isVisible)
      .map((element) => ({
        text: textOf(element),
        href: normalizeMedia(element.getAttribute('href')),
      }))
      .filter((item) => item.href);

    const internalLinks = [...document.querySelectorAll('a[href]')]
      .filter(isVisible)
      .map((element) => ({
        path: sameOriginPath(element.getAttribute('href')),
        text: textOf(element),
      }))
      .filter((item) => item.path);

    const media = [];
    const addMedia = (element, attr, kind) => {
      const raw = element.getAttribute(attr);
      const url = normalizeMedia(raw);
      if (url) media.push({ tag: element.tagName.toLowerCase(), kind, url, attr, alt: clean(element.getAttribute('alt') || ''), visible: isVisible(element) });
    };
    for (const element of document.querySelectorAll('img[src],video[src],audio[src],iframe[src],source[src]')) addMedia(element, 'src', element.tagName.toLowerCase());
    for (const element of document.querySelectorAll('img[srcset],source[srcset]')) {
      const values = (element.getAttribute('srcset') || '').split(',').map((value) => value.trim().split(/\s+/)[0]);
      for (const value of values) {
        const url = normalizeMedia(value);
        if (url) media.push({ tag: element.tagName.toLowerCase(), kind: 'srcset', url, attr: 'srcset', alt: clean(element.getAttribute('alt') || ''), visible: isVisible(element) });
      }
    }
    for (const element of document.querySelectorAll('video[poster]')) addMedia(element, 'poster', 'poster');

    const sourceRightsCues = [];
    const cueCandidates = [...document.querySelectorAll('p,li,figcaption,small,span,div,footer')]
      .filter(isVisible)
      .map((element) => ({ tag: element.tagName.toLowerCase(), text: textOf(element) }))
      .filter((item) => item.text && item.text.length <= 400 && cuePattern.test(item.text));
    for (const item of cueCandidates) {
      if (!sourceRightsCues.some((existing) => existing.text === item.text)) sourceRightsCues.push(item);
      if (sourceRightsCues.length >= 40) break;
    }

    return {
      requestedPath,
      finalUrl: location.href,
      title: clean(document.title),
      lang: document.documentElement.getAttribute('lang') || null,
      headings,
      articleH1: headings.find((item) => item.level === 1)?.text || null,
      landmarks,
      sections,
      sectionOutline: headings.filter((item) => item.level >= 2).map((item) => ({ level: item.level, text: item.text })),
      metadata: {
        description: metaValue('description'),
        author: metaValue('author', 'article:author'),
        published: metaValue('article:published_time', 'date'),
        modified: metaValue('article:modified_time'),
        keywords: metaValue('keywords'),
        ogTitle: metaValue('og:title'),
        ogDescription: metaValue('og:description'),
        ogImage: metaValue('og:image'),
        articleSection: metaValue('article:section'),
        visible: visibleMetadata,
        metaTags,
      },
      asideLinks,
      internalLinks: unique(internalLinks.map((item) => item.path)),
      asideLinkDetails: asideLinks,
      mediaUrls: [...new Set(media.map((item) => item.url))],
      media,
      sourceRightsCues,
    };
  }, { requestedPath: route.path });

  return {
    url: `${target.replace(/\/$/, '')}${route.path}`,
    path: route.path,
    locale: route.locale,
    slug: route.slug,
    status: response?.status() ?? null,
    contentType: response?.headers()['content-type'] || null,
    title: data.title,
    lang: data.lang,
    headings: data.headings,
    landmarks: data.landmarks,
    sections: data.sections,
    internalLinks: data.internalLinks,
    forms: await page.locator('form').count(),
    durationMs: Date.now() - startedAt,
    errors: runtime.errors,
    blockedRequests: runtime.blockedRequests,
    finalUrl: data.finalUrl,
    crawlStatus: response ? (response.status() >= 200 && response.status() < 400 ? 'rendered' : 'http-error') : 'navigation-error',
    article: {
      h1: data.articleH1,
      metadata: data.metadata,
      asideLinks: data.asideLinkDetails,
      sectionOutline: data.sectionOutline,
      mediaUrls: data.mediaUrls,
      media: data.media,
      sourceRightsCues: data.sourceRightsCues,
    },
  };
};

const main = async () => {
  const generatedAt = new Date().toISOString();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ serviceWorkers: 'block' });
  await context.route('**/*', async (route) => {
    const request = route.request();
    if (!['GET', 'HEAD'].includes(request.method())) return route.abort('blockedbyclient');
    return route.continue();
  });
  const page = await context.newPage();
  const records = [];

  for (const route of routes) {
    const runtime = { errors: [], blockedRequests: [] };
    const onConsole = (message) => {
      if (message.type() === 'error') runtime.errors.push({ type: 'console', text: message.text(), url: page.url() });
    };
    const onPageError = (error) => runtime.errors.push({ type: 'pageerror', text: String(error), url: page.url() });
    const onRequestFailed = (request) => {
      const failure = request.failure()?.errorText || 'request failed';
      if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method())) {
        runtime.blockedRequests.push({ method: request.method(), url: request.url(), reason: failure });
      } else {
        runtime.errors.push({ type: 'requestfailed', method: request.method(), url: request.url(), text: failure });
      }
    };
    page.on('console', onConsole);
    page.on('pageerror', onPageError);
    page.on('requestfailed', onRequestFailed);
    const startedAt = Date.now();
    let response = null;
    let navigationError = null;
    try {
      response = await page.goto(`${target.replace(/\/$/, '')}${route.path}`, { waitUntil: 'commit', timeout: 30000 });
      try {
        await page.waitForLoadState('domcontentloaded', { timeout: 15000 });
      } catch (error) {
        runtime.errors.push({ type: 'domcontentloaded-timeout', text: String(error), url: page.url() });
      }
      await page.waitForTimeout(800);
    } catch (error) {
      navigationError = String(error);
      runtime.errors.push({ type: 'navigation', text: navigationError, url: page.url() });
    }
    if (navigationError && !response) {
      records.push({
        url: `${target.replace(/\/$/, '')}${route.path}`,
        path: route.path,
        locale: route.locale,
        slug: route.slug,
        status: null,
        contentType: null,
        title: null,
        lang: null,
        headings: [],
        landmarks: [],
        sections: [],
        internalLinks: [],
        forms: 0,
        durationMs: Date.now() - startedAt,
        errors: runtime.errors,
        blockedRequests: runtime.blockedRequests,
        finalUrl: page.url(),
        crawlStatus: 'navigation-error',
        article: { h1: null, metadata: {}, asideLinks: [], sectionOutline: [], mediaUrls: [], media: [], sourceRightsCues: [] },
      });
    } else {
      records.push(await extractPage(page, route, response, startedAt, runtime));
    }
    page.removeListener('console', onConsole);
    page.removeListener('pageerror', onPageError);
    page.removeListener('requestfailed', onRequestFailed);
  }

  await browser.close();
  const statusCounts = {};
  for (const record of records) statusCounts[String(record.status)] = (statusCounts[String(record.status)] || 0) + 1;
  const artifact = {
    taskId: 'CRAWL-BLOG-ARTICLES-B',
    target,
    generatedAt,
    crawl: {
      method: 'Playwright',
      access: 'anonymous same-origin document GET/HEAD only',
      requestedRouteCount: routes.length,
      routePattern: ['/blog/:slug', '/en/blog/:slug'],
      settleMs: 800,
      cookies: 'fresh context without persisted storage',
    },
    routes: records,
    counts: {
      assigned: routes.length,
      captured: records.length,
      uniquePaths: new Set(records.map((record) => record.path)).size,
      status: statusCounts,
      crawlStatus: records.reduce((counts, record) => {
        counts[record.crawlStatus] = (counts[record.crawlStatus] || 0) + 1;
        return counts;
      }, {}),
      withH1: records.filter((record) => record.article.h1).length,
      withSourceRightsCues: records.filter((record) => record.article.sourceRightsCues.length > 0).length,
    },
    observedLimitations: [
      'Only the 24 frozen article document routes were requested; no index discovery or bundle-only route was used.',
      'Console errors and failed GET/HEAD asset requests are recorded per route; intentionally blocked non-GET requests are recorded as blockedRequests.',
      'The artifact records anonymous live state at generatedAt and does not establish authenticated, backend, or production-data behavior beyond the public response.',
    ],
    sourceEvidence: {
      live: true,
      documentResponses: records.map((record) => ({ path: record.path, status: record.status, finalUrl: record.finalUrl })),
      protocol: 'agents-results/2026-08-19/mediaclaw-crawl-wave/tasks/CRAWL-PROTOCOL.md',
      routeAssignment: 'agents-results/2026-08-19/mediaclaw-crawl-wave/tasks/CRAWL-BLOG-ARTICLES-B.md',
    },
  };
  await fs.writeFile(artifactPath, `${JSON.stringify(artifact, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify({ generatedAt, routes: records.length, statusCounts, artifact: artifactPath.pathname }, null, 2));
};

main().catch((error) => {
  console.error(error?.stack || String(error));
  process.exitCode = 1;
});
