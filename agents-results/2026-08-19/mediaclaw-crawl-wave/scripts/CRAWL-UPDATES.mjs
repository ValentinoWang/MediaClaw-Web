import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '/Users/vsiyo/Desktop/Opensource_Tool/npm-global/lib/node_modules/playwright/index.mjs';

const root = '/Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web';
const waveDir = path.join(root, 'agents-results/2026-08-19/mediaclaw-crawl-wave');
const artifactPath = path.join(waveDir, 'artifacts/CRAWL-UPDATES.json');
const logPath = path.join(waveDir, 'logs/CRAWL-UPDATES-live.log');
const protocolPath = path.join(waveDir, 'tasks/CRAWL-PROTOCOL.md');
const scriptPath = path.join(waveDir, 'scripts/CRAWL-UPDATES.mjs');
const baseUrl = 'https://mediaclaw.app/';
const baseOrigin = new URL(baseUrl).origin;
const versions = [
  'v0.0.6',
  'v0.0.7',
  'v0.0.9',
  'v0.1.0',
  'v0.1.1',
  'v0.1.2',
  'v0.1.3',
  'v0.1.5',
  'v0.1.7',
  'v0.1.8',
  'v0.1.9',
  'v0.2.0',
  'v0.2.1',
  'v0.2.2',
  'v0.2.3',
  'v0.3.0'
];
const paths = [
  '/updates',
  '/en/updates',
  ...versions.map((version) => `/updates/${version}`),
  ...versions.map((version) => `/en/updates/${version}`)
];
const urls = paths.map((routePath) => new URL(routePath, baseUrl).href);
const settleMs = 800;
const navigationTimeoutMs = 30000;

const normalize = (value) => String(value ?? '').replace(/\s+/g, ' ').trim();

function appendLog(line) {
  fs.appendFileSync(logPath, `${new Date().toISOString()} ${line}\n`);
}

function statusLabel(status) {
  if (status === 200) return 'ok';
  if (status === 404) return 'not-found';
  if (status == null) return 'navigation-error';
  return `http-${status}`;
}

async function extractPage(page) {
  return page.evaluate(({ origin }) => {
    const clean = (value) => String(value ?? '').replace(/\s+/g, ' ').trim();
    const textOf = (element) => clean(element?.textContent || '');
    const headingLevel = (element) => Number(element.tagName.slice(1));
    const contentRoot = document.querySelector('main') || document.body;
    const isVersionPage = /\/v\d+\.\d+\.\d+$/.test(location.pathname);
    const articleRoot = isVersionPage ? (document.querySelector('article') || contentRoot) : contentRoot;
    const allAnchors = [...document.querySelectorAll('a[href]')];
    const anchorData = allAnchors.map((anchor) => {
      try {
        const href = new URL(anchor.getAttribute('href'), location.href);
        return {
          text: textOf(anchor),
          href: href.href,
          path: href.origin === origin ? `${href.pathname}${href.search}${href.hash}` : null,
          sameOrigin: href.origin === origin
        };
      } catch {
        return null;
      }
    }).filter(Boolean);
    const uniqueByHref = (items) => [...new Map(items.map((item) => [item.href || item, item])).values()];
    const releaseSignal = /github\.com|release|changelog|download|releases|下载|发行|版本|更新日志|\/updates\/v/i;
    const contentAnchors = [...articleRoot.querySelectorAll('a[href]')].map((anchor) => {
      try {
        const href = new URL(anchor.getAttribute('href'), location.href);
        return { text: textOf(anchor), href: href.href };
      } catch {
        return null;
      }
    }).filter(Boolean);
    const articleHeadings = [...articleRoot.querySelectorAll('h1,h2,h3')]
      .map((element) => ({ level: headingLevel(element), text: textOf(element) }))
      .filter((item) => item.text);
    const pageHeadings = [...document.querySelectorAll('h1,h2,h3')]
      .map((element) => ({ level: headingLevel(element), text: textOf(element) }))
      .filter((item) => item.text);
    const sectionElements = [...contentRoot.querySelectorAll('section, article')];
    const sections = sectionElements.map((element) => {
      const heading = element.querySelector('h1,h2,h3');
      return {
        tag: element.tagName.toLowerCase(),
        heading: textOf(heading),
        id: element.id || null
      };
    }).filter((item) => item.heading || item.id);
    const landmarks = [...document.querySelectorAll('header,nav,main,footer,article,aside')].map((element) => ({
      tag: element.tagName.toLowerCase(),
      label: clean(element.getAttribute('aria-label') || ''),
      id: element.id || null
    }));
    const sameOriginLinks = uniqueByHref(anchorData.filter((item) => item.sameOrigin).map((item) => item.path));
    const releaseLinks = uniqueByHref(contentAnchors.filter((item) => releaseSignal.test(`${item.text} ${item.href}`)));
    const forms = [...document.querySelectorAll('form')].map((form) => ({
      method: clean(form.getAttribute('method') || 'get').toUpperCase(),
      action: form.getAttribute('action') || location.href
    }));
    const versionMatch = location.pathname.match(/(v\d+\.\d+\.\d+)$/);
    return {
      title: clean(document.title),
      lang: document.documentElement.getAttribute('lang') || null,
      headings: pageHeadings,
      articleOutline: articleHeadings,
      landmarks,
      sections,
      internalLinks: sameOriginLinks,
      releaseLinks,
      forms
    };
  }, { origin: baseOrigin });
}

async function crawlRoute(page, routePath, index) {
  const url = new URL(routePath, baseUrl).href;
  const startedAt = Date.now();
  const errors = [];
  let response = null;
  let navigationError = null;
  let requestCount = 0;
  const onRequest = (request) => {
    if (request.resourceType() === 'document' && request.url() === url) requestCount += 1;
  };
  const onConsole = (message) => {
    if (message.type() === 'error') errors.push(`console:error: ${normalize(message.text())}`);
  };
  const onPageError = (error) => errors.push(`pageerror: ${normalize(error.message)}`);
  const onRequestFailed = (request) => {
    try {
      if (new URL(request.url()).origin === baseOrigin) {
        errors.push(`requestfailed:${request.method()} ${request.url()} ${normalize(request.failure()?.errorText || '')}`.trim());
      }
    } catch {
      errors.push(`requestfailed:${request.method()} ${request.url()}`);
    }
  };
  page.on('request', onRequest);
  page.on('console', onConsole);
  page.on('pageerror', onPageError);
  page.on('requestfailed', onRequestFailed);

  try {
    response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: navigationTimeoutMs });
    await page.waitForTimeout(settleMs);
  } catch (error) {
    navigationError = `${error.name || 'Error'}: ${normalize(error.message)}`;
    errors.push(`navigation: ${navigationError}`);
  }

  let extracted = {
    title: '',
    lang: null,
    headings: [],
    articleOutline: [],
    landmarks: [],
    sections: [],
    internalLinks: [],
    releaseLinks: [],
    forms: []
  };
  try {
    extracted = await extractPage(page);
  } catch (error) {
    errors.push(`extract: ${error.name || 'Error'}: ${normalize(error.message)}`);
  }

  page.off('request', onRequest);
  page.off('console', onConsole);
  page.off('pageerror', onPageError);
  page.off('requestfailed', onRequestFailed);
  const status = response ? response.status() : null;
  const contentType = response ? (response.headers()['content-type'] || null) : null;
  const versionMatch = routePath.match(/(v\d+\.\d+\.\d+)$/);
  const version = versionMatch ? versionMatch[1] : null;
  const record = {
    url,
    path: routePath,
    version,
    versionTitle: version ? (extracted.articleOutline.find((item) => item.level === 1)?.text || extracted.title || null) : null,
    status,
    statusLabel: statusLabel(status),
    contentType,
    title: extracted.title,
    lang: extracted.lang,
    language: extracted.lang,
    headings: extracted.headings,
    articleOutline: extracted.articleOutline,
    landmarks: extracted.landmarks,
    sections: extracted.sections,
    releaseLinks: extracted.releaseLinks,
    internalLinks: extracted.internalLinks,
    forms: extracted.forms,
    finalUrl: page.url(),
    documentRequestCount: requestCount,
    durationMs: Date.now() - startedAt,
    errors: [...new Set(errors.filter(Boolean))]
  };
  appendLog(`${String(index + 1).padStart(2, '0')}/34 ${routePath} status=${status ?? 'null'} lang=${extracted.lang || 'null'} requests=${requestCount} errors=${record.errors.length}`);
  return record;
}

async function main() {
  fs.writeFileSync(logPath, '');
  appendLog(`start target=${baseUrl} routes=${urls.length} settleMs=${settleMs}`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ ignoreHTTPSErrors: false });
  await context.route('**/*', async (route) => {
    const request = route.request();
    let sameOrigin = false;
    try {
      sameOrigin = new URL(request.url()).origin === baseOrigin;
    } catch {
      sameOrigin = false;
    }
    if (!['GET', 'HEAD'].includes(request.method()) || !sameOrigin) {
      await route.abort('blockedbyclient');
      return;
    }
    await route.continue();
  });
  const page = await context.newPage();
  const records = [];
  try {
    for (const [index, routePath] of paths.entries()) {
      records.push(await crawlRoute(page, routePath, index));
    }
  } finally {
    await context.close();
    await browser.close();
  }

  const statusCounts = {};
  const languageCounts = {};
  for (const record of records) {
    const statusKey = String(record.status);
    statusCounts[statusKey] = (statusCounts[statusKey] || 0) + 1;
    const languageKey = record.lang || 'unknown';
    languageCounts[languageKey] = (languageCounts[languageKey] || 0) + 1;
  }
  const generatedAt = new Date().toISOString();
  const artifact = {
    taskId: 'CRAWL-UPDATES',
    target: baseUrl,
    generatedAt,
    routes: records,
    counts: {
      assigned: paths.length,
      crawled: records.length,
      uniquePaths: new Set(records.map((record) => record.path)).size,
      status: statusCounts,
      language: languageCounts,
      routesWithErrors: records.filter((record) => record.errors.length > 0).length,
      routesWithReleaseLinks: records.filter((record) => record.releaseLinks.length > 0).length
    },
    observedLimitations: [
      'Live anonymous crawl only; no login, form submission, state-changing control, purchase, referral, or private API was used.',
      'Only same-origin GET/HEAD browser requests were allowed. Cross-origin resources were blocked and release links were recorded without following them.',
      'Each frozen route was navigated once with domcontentloaded followed by an 800 ms bounded render settle; analytics or later mutations were not awaited.'
    ],
    sourceEvidence: {
      crawl: 'live',
      browser: 'Playwright 1.62.1 Chromium headless',
      protocolPath,
      scriptPath,
      routePaths: paths,
      requestedRouteCount: paths.length,
      navigationPolicy: 'GET/HEAD, same-origin only',
      waitPolicy: { waitUntil: 'domcontentloaded', settleMs },
      routeRequestCounts: Object.fromEntries(records.map((record) => [record.path, record.documentRequestCount]))
    }
  };
  fs.writeFileSync(artifactPath, `${JSON.stringify(artifact, null, 2)}\n`);
  appendLog(`complete routes=${records.length} status=${JSON.stringify(statusCounts)} languages=${JSON.stringify(languageCounts)}`);
}

main().catch((error) => {
  appendLog(`fatal ${error.stack || error}`);
  process.exitCode = 1;
});
