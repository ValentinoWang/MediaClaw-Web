import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('/Users/vsiyo/Desktop/Opensource_Tool/npm-global/lib/node_modules/playwright');

const projectRoot = process.cwd();
const waveRoot = path.join(projectRoot, 'agents-results/2026-08-19/mediaclaw-crawl-wave');
const artifactPath = path.join(waveRoot, 'artifacts/CRAWL-DOUYIN.json');
const attemptLabel = process.env.CRAWL_ATTEMPT_LABEL || 'primary';
const returnPath = path.join(waveRoot, `returns/CRAWL-DOUYIN-${attemptLabel}.json`);
const crawlLogPath = path.join(waveRoot, `logs/CRAWL-DOUYIN-${attemptLabel}-live.log`);
const validationLogPath = path.join(waveRoot, `logs/CRAWL-DOUYIN-${attemptLabel}.validation.log`);
const targetOrigin = 'https://mediaclaw.app';
const target = `${targetOrigin}/`;
const suffixes = [
  'keywords',
  'viral-content-analysis',
  'account-analysis',
  'scraper',
  'comments',
  'downloader',
  'image-text',
  'transcript',
  'leads',
  'monitoring',
];
const assignedPaths = [
  '/douyin',
  ...suffixes.map((suffix) => `/douyin/${suffix}`),
  '/en/douyin',
  ...suffixes.map((suffix) => `/en/douyin/${suffix}`),
];

const clean = (value) => String(value ?? '').replace(/\s+/g, ' ').trim();
const truncate = (value, max = 240) => {
  const text = clean(value);
  return text.length > max ? `${text.slice(0, max - 1)}...` : text;
};

function serializeError(error) {
  return {
    name: error?.name || 'Error',
    message: truncate(error?.message || String(error)),
  };
}

function uniqueBy(items, key) {
  const seen = new Set();
  return items.filter((item) => {
    const value = key(item);
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

function extractDom() {
  const compact = (value, max = 240) => {
    const text = String(value ?? '').replace(/\s+/g, ' ').trim();
    return text.length > max ? `${text.slice(0, max - 1)}...` : text;
  };
  const dedupe = (items, key) => {
    const seen = new Set();
    return items.filter((item) => {
      const value = key(item);
      if (seen.has(value)) return false;
      seen.add(value);
      return true;
    });
  };

  const sameOriginPath = (href) => {
    try {
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return null;
      if (!['http:', 'https:'].includes(url.protocol)) return null;
      return `${url.pathname}${url.search}${url.hash}` || '/';
    } catch {
      return null;
    }
  };

  const nodeLabel = (element) => {
    const ariaLabel = element.getAttribute('aria-label');
    if (ariaLabel) return compact(ariaLabel, 160);
    const labelledBy = element.getAttribute('aria-labelledby');
    if (labelledBy) {
      const label = labelledBy
        .split(/\s+/)
        .map((id) => document.getElementById(id)?.innerText || '')
        .join(' ');
      if (label) return compact(label, 160);
    }
    const heading = element.querySelector('h1,h2,h3,h4,h5,h6');
    return compact(heading?.innerText || '', 160);
  };

  const linkDetails = (root) =>
    Array.from(root.querySelectorAll('a[href]'))
      .map((anchor) => {
        const href = sameOriginPath(anchor.getAttribute('href'));
        if (!href) return null;
        return {
          href,
          text: compact(anchor.innerText || anchor.textContent || '', 160),
        };
      })
      .filter(Boolean);

  const allLinks = linkDetails(document);
  const headings = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map((heading) => ({
    level: Number(heading.tagName.slice(1)),
    text: compact(heading.innerText || heading.textContent || '', 300),
    id: heading.id || '',
  }));

  const landmarkSelector =
    'header,nav,main,aside,footer,[role="banner"],[role="navigation"],[role="main"],[role="complementary"],[role="contentinfo"],[role="region"]';
  const landmarkNodes = Array.from(document.querySelectorAll(landmarkSelector));
  const landmarks = dedupe(
    landmarkNodes.map((element) => ({
      tag: element.tagName.toLowerCase(),
      role: element.getAttribute('role') || '',
      label: nodeLabel(element),
      id: element.id || '',
    })),
    (item) => `${item.tag}|${item.role}|${item.id}|${item.label}`,
  );

  const sectionNodes = Array.from(document.querySelectorAll('section,article,[role="region"]'));
  const sections = sectionNodes.map((element, index) => ({
    order: index + 1,
    tag: element.tagName.toLowerCase(),
    heading: compact(element.querySelector('h1,h2,h3,h4,h5,h6')?.innerText || '', 240),
    label: nodeLabel(element),
    id: element.id || '',
    linkCount: element.querySelectorAll('a[href]').length,
  }));

  const formRecords = Array.from(document.querySelectorAll('form')).map((form) => ({
    method: (form.getAttribute('method') || 'get').toLowerCase(),
    action: sameOriginPath(form.getAttribute('action') || window.location.href) || form.getAttribute('action') || '',
    controls: Array.from(form.querySelectorAll('input,select,textarea,button')).map((control) => ({
      tag: control.tagName.toLowerCase(),
      type: control.getAttribute('type') || '',
      name: control.getAttribute('name') || '',
      label: compact(control.getAttribute('aria-label') || control.getAttribute('placeholder') || control.innerText || '', 120),
    })),
  }));

  const faqRootPattern = /faq|frequently[- ]asked|questions|\u5e38\u89c1\u95ee\u9898|\u5e38\u89c1\u95ee\u7b54|\u95ee\u9898\u89e3\u7b54/i;
  const faqRoots = Array.from(
    document.querySelectorAll('details,[class*="faq" i],[id*="faq" i],[data-testid*="faq" i],[aria-label*="faq" i]'),
  ).filter((element) => faqRootPattern.test(`${element.id} ${element.className} ${element.getAttribute('aria-label') || ''}`));
  const faqItems = [];
  for (const root of faqRoots) {
    const rootHeading = compact(root.querySelector('h1,h2,h3,h4,h5,h6')?.innerText || nodeLabel(root), 180);
    const details = root.matches('details') ? [root] : Array.from(root.querySelectorAll('details'));
    if (details.length) {
      for (const detail of details) {
        const question = compact(detail.querySelector('summary')?.innerText || '', 260);
        const answerNode = detail.cloneNode(true);
        answerNode.querySelector('summary')?.remove();
        const answer = compact(answerNode.innerText || answerNode.textContent || '', 600);
        if (question || answer) faqItems.push({ section: rootHeading, question, answer });
      }
      continue;
    }
    const questionNodes = Array.from(root.querySelectorAll('h3,h4,h5,button,dt,[data-faq-question]'));
    for (const questionNode of questionNodes) {
      const question = compact(questionNode.innerText || questionNode.textContent || '', 260);
      const itemRoot = questionNode.closest('li,article,[class*="item" i],div') || root;
      const answer = compact(itemRoot.innerText || itemRoot.textContent || '', 600).replace(question, '').trim();
      if (question) faqItems.push({ section: rootHeading, question, answer });
    }
  }

  const relatedPattern = /related|recommend|recommended|explore|resources|learn[- ]more|\u76f8\u5173|\u63a8\u8350|\u66f4\u591a|\u4e86\u89e3\u66f4\u591a/i;
  const relatedRoots = Array.from(document.querySelectorAll('section,article,aside,nav,div')).filter((element) => {
    const marker = `${element.id} ${element.className} ${element.getAttribute('aria-label') || ''}`;
    const heading = element.querySelector('h1,h2,h3,h4,h5,h6');
    return relatedPattern.test(marker) || relatedPattern.test(heading?.innerText || '');
  });
  const relatedLinks = dedupe(
    relatedRoots.flatMap((root) => {
      const section = compact(root.querySelector('h1,h2,h3,h4,h5,h6')?.innerText || nodeLabel(root), 180);
      return linkDetails(root).map((link) => ({ ...link, section }));
    }),
    (item) => `${item.href}|${item.text}|${item.section}`,
  );

  const navigationLinks = (selector) => dedupe(linkDetails(document.querySelector(selector) || document.createElement('div')), (item) => `${item.href}|${item.text}`);
  const sharedNavigation = {
    header: navigationLinks('header'),
    nav: navigationLinks('nav'),
    footer: navigationLinks('footer'),
  };

  return {
    title: document.title || '',
    lang: document.documentElement.getAttribute('lang') || null,
    headings,
    landmarks,
    sections,
    faqs: dedupe(faqItems, (item) => `${item.section}|${item.question}|${item.answer}`),
    relatedLinks,
    sharedNavigation,
    internalLinks: dedupe(allLinks.map((link) => link.href), (href) => href),
    internalLinkDetails: dedupe(allLinks, (link) => `${link.href}|${link.text}`),
    forms: formRecords,
    domStructure: {
      rootTag: document.documentElement.tagName.toLowerCase(),
      bodyChildren: Array.from(document.body?.children || []).map((element) => ({
        tag: element.tagName.toLowerCase(),
        id: element.id || '',
        role: element.getAttribute('role') || '',
        className: compact(typeof element.className === 'string' ? element.className : '', 180),
      })),
      totalElements: document.querySelectorAll('*').length,
      textLength: (document.body?.innerText || '').length,
    },
  };
}

function baseReturn(overrides = {}) {
  return {
    taskId: 'CRAWL-DOUYIN',
    proposed_state: 'FAILED',
    acceptance_self_check: 'fail',
    failure_class: 'runtime',
    failure_origin: 'unknown-origin',
    changed_files: [
      'agents-results/2026-08-19/mediaclaw-crawl-wave/scripts/CRAWL-DOUYIN.mjs',
      `agents-results/2026-08-19/mediaclaw-crawl-wave/logs/CRAWL-DOUYIN-${attemptLabel}-live.log`,
      `agents-results/2026-08-19/mediaclaw-crawl-wave/logs/CRAWL-DOUYIN-${attemptLabel}.validation.log`,
      'agents-results/2026-08-19/mediaclaw-crawl-wave/artifacts/CRAWL-DOUYIN.json',
      `agents-results/2026-08-19/mediaclaw-crawl-wave/returns/CRAWL-DOUYIN-${attemptLabel}.json`,
    ],
    evidence_files: [
      'agents-results/2026-08-19/mediaclaw-crawl-wave/artifacts/CRAWL-DOUYIN.json',
      `agents-results/2026-08-19/mediaclaw-crawl-wave/logs/CRAWL-DOUYIN-${attemptLabel}-live.log`,
      `agents-results/2026-08-19/mediaclaw-crawl-wave/logs/CRAWL-DOUYIN-${attemptLabel}.validation.log`,
      'agents-results/2026-08-19/mediaclaw-crawl-wave/validation/CRAWL-DOUYIN.sh',
    ],
    unverified_items: [],
    ...overrides,
  };
}

const startedAt = new Date().toISOString();
let resultArtifact = null;
let finalReturn = baseReturn();
let browser;
let context;
let page;

try {
  browser = await chromium.launch({ headless: true });
  context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    serviceWorkers: 'block',
  });
  let active = null;
  await context.route('**/*', async (route) => {
    const request = route.request();
    const method = request.method();
    if (!['GET', 'HEAD'].includes(method)) {
      active?.blockedRequests.push({ method, url: request.url(), resourceType: request.resourceType() });
      await route.abort('blockedbyclient');
      return;
    }
    await route.continue();
  });

  page = await context.newPage();
  page.on('console', (message) => {
    if (message.type() === 'error') {
      active?.errors.push({ type: 'console', text: truncate(message.text()) });
    }
  });
  page.on('pageerror', (error) => {
    active?.errors.push({ type: 'pageerror', ...serializeError(error) });
  });
  page.on('requestfailed', (request) => {
    active?.requestFailures.push({
      method: request.method(),
      url: request.url(),
      resourceType: request.resourceType(),
      error: request.failure()?.errorText || 'request failed',
    });
  });
  page.on('response', (response) => {
    if (active && response.request().isNavigationRequest() && response.frame() === page.mainFrame()) {
      active.documentResponses.push({
        url: response.url(),
        status: response.status(),
        contentType: response.headers()['content-type'] || null,
      });
    }
  });

  const routes = [];
  for (const routePath of assignedPaths) {
    const url = `${targetOrigin}${routePath}`;
    const started = Date.now();
    active = { errors: [], blockedRequests: [], requestFailures: [], documentResponses: [] };

    let response = null;
    let navigationError = null;
    try {
      response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(700);
    } catch (error) {
      navigationError = serializeError(error);
      active.errors.push({ type: 'navigation', ...navigationError });
    }

    let dom = null;
    try {
      dom = await page.evaluate(extractDom);
    } catch (error) {
      active.errors.push({ type: 'dom-extraction', ...serializeError(error) });
    }

    const headers = response ? response.headers() : {};
    const observedDocumentResponse = active.documentResponses.at(-1);
    const record = {
      url,
      path: routePath,
      finalUrl: page.url(),
      status: response?.status() ?? observedDocumentResponse?.status ?? null,
      contentType: headers['content-type'] || observedDocumentResponse?.contentType || null,
      title: dom?.title || '',
      lang: dom?.lang || null,
      headings: dom?.headings || [],
      landmarks: dom?.landmarks || [],
      sections: dom?.sections || [],
      faqs: dom?.faqs || [],
      relatedLinks: dom?.relatedLinks || [],
      sharedNavigation: dom?.sharedNavigation || { header: [], nav: [], footer: [] },
      internalLinks: dom?.internalLinks || [],
      internalLinkDetails: dom?.internalLinkDetails || [],
      forms: dom?.forms || [],
      domStructure: dom?.domStructure || null,
      durationMs: Date.now() - started,
      errors: active.errors,
      blockedRequests: active.blockedRequests,
      requestFailures: active.requestFailures,
      documentResponses: active.documentResponses,
    };
    if (navigationError && record.errors.length === 0) record.errors.push({ type: 'navigation', ...navigationError });
    routes.push(record);
    console.log(`${routePath}\t${record.status ?? 'NO_RESPONSE'}\t${record.title || '(no title)'}`);
    active = null;
  }

  const statusCounts = routes.reduce((counts, route) => {
    const key = String(route.status ?? 'no-response');
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
  const languageCounts = routes.reduce((counts, route) => {
    const key = route.lang || 'unknown';
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
  const blockedNonGetCount = routes.reduce((sum, route) => sum + route.blockedRequests.length, 0);
  const requestFailureCount = routes.reduce((sum, route) => sum + route.requestFailures.length, 0);
  const routePaths = routes.map((route) => route.path);
  const duplicatePaths = routePaths.filter((routePath, index) => routePaths.indexOf(routePath) !== index);
  const missingPaths = assignedPaths.filter((routePath) => !routePaths.includes(routePath));
  const routeErrors = routes.filter((route) => route.errors.length > 0).map((route) => ({ path: route.path, errors: route.errors }));
  const observedLimitations = [
    'Anonymous same-origin document crawl only; no cookies, authentication, form submission, or state-changing controls were used.',
    'Browser requests with methods other than GET or HEAD were blocked and recorded separately from navigation errors.',
  ];
  if (blockedNonGetCount) observedLimitations.push(`Blocked ${blockedNonGetCount} non-GET/HEAD browser request(s) during rendering.`);
  if (requestFailureCount) observedLimitations.push(`Observed ${requestFailureCount} failed browser resource request(s); see route requestFailures.`);
  if (routeErrors.length) observedLimitations.push('One or more routes emitted console, page, navigation, or extraction errors; see route errors.');

  resultArtifact = {
    taskId: 'CRAWL-DOUYIN',
    target,
    generatedAt: new Date().toISOString(),
    routes,
    counts: {
      assigned: assignedPaths.length,
      captured: routes.length,
      uniqueCaptured: new Set(routePaths).size,
      status: statusCounts,
      language: languageCounts,
      blockedNonGetRequests: blockedNonGetCount,
      requestFailures: requestFailureCount,
      routeErrors: routeErrors.length,
    },
    observedLimitations,
    sourceEvidence: {
      protocol: 'agents-results/2026-08-19/mediaclaw-crawl-wave/tasks/CRAWL-PROTOCOL.md',
      liveTarget: target,
      requestedPaths: assignedPaths,
      captureMethod: 'Playwright Chromium page.goto with domcontentloaded plus 700ms bounded settle per route.',
      requestPolicy: 'GET and HEAD only; non-GET/HEAD browser requests aborted.',
      browserVersion: browser.version(),
      startedAt,
      completedAt: new Date().toISOString(),
    },
  };
  fs.writeFileSync(artifactPath, `${JSON.stringify(resultArtifact, null, 2)}\n`, 'utf8');

  const selfCheckPassed =
    routes.length === assignedPaths.length &&
    new Set(routePaths).size === assignedPaths.length &&
    missingPaths.length === 0 &&
    duplicatePaths.length === 0 &&
    JSON.stringify(routePaths) === JSON.stringify(assignedPaths);
  finalReturn = baseReturn({
    proposed_state: selfCheckPassed ? 'VERIFIED' : 'IMPLEMENTED',
    acceptance_self_check: selfCheckPassed ? 'pass' : 'partial',
    failure_class: selfCheckPassed ? 'none' : 'verification',
    failure_origin: selfCheckPassed ? 'none' : 'test-oracle',
    unverified_items: [
      ...observedLimitations,
      ...(missingPaths.length ? [`Missing assigned paths: ${missingPaths.join(', ')}`] : []),
      ...(duplicatePaths.length ? [`Duplicate captured paths: ${duplicatePaths.join(', ')}`] : []),
    ],
  });
} catch (error) {
  finalReturn = baseReturn({
    proposed_state: 'FAILED',
    acceptance_self_check: 'fail',
    failure_class: error?.name === 'Error' && /playwright|browser|chromium/i.test(error?.message || '') ? 'runtime' : 'implementation',
    failure_origin: /browser|chromium|executable|launch/i.test(error?.message || '') ? 'browser' : 'implementation',
    unverified_items: [serializeError(error)],
  });
  console.error(JSON.stringify(serializeError(error)));
} finally {
  try {
    await page?.close();
    await context?.close();
    await browser?.close();
  } catch (error) {
    finalReturn = baseReturn({
      proposed_state: 'FAILED',
      acceptance_self_check: 'partial',
      failure_class: 'runtime',
      failure_origin: 'browser',
      unverified_items: [...(finalReturn.unverified_items || []), serializeError(error)],
    });
  }
  if (!resultArtifact && !fs.existsSync(artifactPath)) {
    finalReturn = baseReturn({
      ...finalReturn,
      unverified_items: [...(finalReturn.unverified_items || []), 'The route artifact was not written.'],
    });
  }
  fs.writeFileSync(returnPath, `${JSON.stringify(finalReturn, null, 2)}\n`, 'utf8');
}
