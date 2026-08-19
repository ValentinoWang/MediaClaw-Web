import { chromium } from "/Users/vsiyo/Desktop/Opensource_Tool/npm-global/lib/node_modules/playwright/index.mjs";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const TARGET = "https://mediaclaw.app/";
const ROUTES = [
  "/settings/referral",
  "/en/settings/referral",
  "/posts/xiaohongshu-comment-analysis",
  "/posts/xiaohongshu-comment-topic-mining",
  "/en/posts/xiaohongshu-comment-analysis",
  "/en/posts/xiaohongshu-comment-topic-mining",
];
const TARGET_ORIGIN = new URL(TARGET).origin;
const ARTIFACT = resolve(
  "agents-results/2026-08-19/mediaclaw-crawl-wave/artifacts/CRAWL-BOUNDARIES.json",
);
const SETTLE_MS = 750;
const NAVIGATION_TIMEOUT_MS = 20_000;

function cleanText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function unique(values) {
  return [...new Set(values)];
}

async function extractDom(page) {
  return page.evaluate(() => {
    const text = (node) => (node?.textContent || "").replace(/\s+/g, " ").trim();
    const label = (node) =>
      (node?.getAttribute("aria-label") ||
        node?.getAttribute("aria-labelledby") ||
        "")
        .replace(/\s+/g, " ")
        .trim();
    const heading = (node) =>
      node?.querySelector("h1,h2,h3")?.textContent?.replace(/\s+/g, " ").trim() || "";
    const absoluteInternalPath = (href) => {
      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return null;
        return `${url.pathname}${url.search}${url.hash}`;
      } catch {
        return null;
      }
    };

    const headings = [...document.querySelectorAll("h1,h2,h3")].map((node) => ({
      level: Number(node.tagName.slice(1)),
      text: text(node),
    }));
    const landmarks = [
      ...document.querySelectorAll("header,nav,main,aside,footer,section,article,form"),
    ].map((node) => ({ tag: node.tagName.toLowerCase(), label: label(node) }));
    const sections = [...document.querySelectorAll("section")].map((node) => ({
      tag: "section",
      heading: heading(node),
    }));
    const internalLinks = [
      ...new Set(
        [...document.querySelectorAll("a[href]")]
          .map((node) => absoluteInternalPath(node.getAttribute("href")))
          .filter(Boolean),
      ),
    ];
    const forms = [...document.querySelectorAll("form")].map((node) => ({
      action: node.getAttribute("action") || "",
      method: (node.getAttribute("method") || "get").toLowerCase(),
    }));
    const bodyChildren = [...(document.body?.children || [])].map((node) => ({
      tag: node.tagName.toLowerCase(),
      id: node.id || "",
      className: typeof node.className === "string" ? node.className : "",
      text: text(node).slice(0, 500),
    }));

    return {
      title: document.title || "",
      lang: document.documentElement.getAttribute("lang") || "",
      headings,
      landmarks,
      sections,
      internalLinks,
      forms,
      bodyText: text(document.body).slice(0, 2000),
      bodyChildren,
    };
  });
}

async function crawlRoute(browser, path) {
  const url = new URL(path, TARGET).href;
  const context = await browser.newContext({
    serviceWorkers: "block",
    javaScriptEnabled: true,
  });
  const page = await context.newPage();
  const errors = [];
  const blockedRequests = [];
  const navigationRequests = [];
  let response = null;
  const startedAt = Date.now();

  await context.route("**/*", async (route) => {
    const request = route.request();
    const requestUrl = request.url();
    const method = request.method().toUpperCase();
    const resourceType = request.resourceType();
    let sameOrigin = false;
    try {
      sameOrigin = new URL(requestUrl).origin === TARGET_ORIGIN;
    } catch {
      sameOrigin = false;
    }

    const blockedByPolicy =
      !["GET", "HEAD"].includes(method) ||
      !sameOrigin ||
      ["xhr", "fetch", "websocket", "eventsource"].includes(resourceType);
    if (blockedByPolicy) {
      if (blockedRequests.length < 50) {
        blockedRequests.push({ method, resourceType, url: requestUrl });
      }
      await route.abort("blockedbyclient");
      return;
    }
    await route.continue();
  });

  page.on("request", (request) => {
    if (request.isNavigationRequest() && request.frame() === page.mainFrame()) {
      navigationRequests.push({
        method: request.method(),
        resourceType: request.resourceType(),
        url: request.url(),
      });
    }
  });
  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(`console.error: ${cleanText(message.text())}`);
    }
  });
  page.on("pageerror", (error) => {
    errors.push(`pageerror: ${cleanText(error.message)}`);
  });
  page.on("requestfailed", (request) => {
    if (request.isNavigationRequest() && request.frame() === page.mainFrame()) {
      errors.push(
        `navigation request failed: ${request.method()} ${request.url()} (${cleanText(request.failure()?.errorText)})`,
      );
    }
  });

  try {
    response = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: NAVIGATION_TIMEOUT_MS,
    });
    await page.waitForTimeout(SETTLE_MS);
  } catch (error) {
    errors.push(`navigation: ${cleanText(error.message)}`);
  }

  let dom = {
    title: "",
    lang: "",
    headings: [],
    landmarks: [],
    sections: [],
    internalLinks: [],
    forms: [],
    bodyText: "",
    bodyChildren: [],
  };
  try {
    dom = await extractDom(page);
  } catch (error) {
    errors.push(`dom extraction: ${cleanText(error.message)}`);
  }

  const status = response?.status() ?? null;
  const contentType = response?.headers()["content-type"] ?? null;
  const finalUrl = page.url();
  await context.close();

  return {
    url,
    path,
    finalUrl,
    status,
    contentType,
    title: dom.title,
    lang: dom.lang,
    headings: dom.headings,
    h1: dom.headings.filter((heading) => heading.level === 1).map((heading) => heading.text),
    landmarks: dom.landmarks,
    sections: dom.sections,
    internalLinks: dom.internalLinks,
    forms: dom.forms,
    durationMs: Date.now() - startedAt,
    errors: unique(errors),
    dom: {
      bodyText: dom.bodyText,
      bodyChildren: dom.bodyChildren,
    },
    requestEvidence: {
      assignedNavigationRequests: navigationRequests.filter((request) => request.url === url),
      navigationRequests,
      blockedRequests,
    },
  };
}

const generatedAt = new Date().toISOString();
const browser = await chromium.launch({ headless: true });
const routes = [];
try {
  for (const path of ROUTES) {
    routes.push(await crawlRoute(browser, path));
  }
} finally {
  await browser.close();
}

const statusCounts = {};
for (const route of routes) {
  const key = String(route.status);
  statusCounts[key] = (statusCounts[key] || 0) + 1;
}

const artifact = {
  taskId: "CRAWL-BOUNDARIES",
  target: TARGET,
  generatedAt,
  routes,
  counts: {
    assigned: ROUTES.length,
    captured: routes.length,
    uniquePaths: new Set(routes.map((route) => route.path)).size,
    status: statusCounts,
  },
  observedLimitations: [
    "Anonymous browser context only; no cookies, login, form submission, or control activation.",
    "Only same-origin GET/HEAD resources were permitted; cross-origin resources and XHR/fetch/WebSocket/eventsource requests were blocked by the crawl policy.",
    "The route list is frozen to the six assigned paths; no discovery crawl was performed.",
  ],
  sourceEvidence: {
    liveRequest: true,
    target: TARGET,
    assignedPaths: ROUTES,
    requestMethod: "GET",
    browser: "Playwright Chromium",
    playwrightVersion: "1.62.1",
    waitStrategy: `domcontentloaded plus ${SETTLE_MS}ms bounded settle`,
    navigationTimeoutMs: NAVIGATION_TIMEOUT_MS,
    script: "agents-results/2026-08-19/mediaclaw-crawl-wave/scripts/crawl-boundaries.mjs",
    routeRequestCounts: routes.map((route) => ({
      path: route.path,
      assignedNavigationRequestCount: route.requestEvidence.assignedNavigationRequests.length,
      status: route.status,
    })),
  },
};

await mkdir(dirname(ARTIFACT), { recursive: true });
await writeFile(ARTIFACT, `${JSON.stringify(artifact, null, 2)}\n`, "utf8");
console.log(
  JSON.stringify({
    artifact: ARTIFACT,
    paths: routes.map((route) => ({ path: route.path, status: route.status, title: route.title })),
    counts: artifact.counts,
  }),
);
