#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const TARGET = "https://mediaclaw.app/";
const TARGET_ORIGIN = new URL(TARGET).origin;
const ARTIFACT = path.resolve(
  "agents-results/2026-08-19/mediaclaw-crawl-wave/artifacts/CRAWL-COMMERCIAL-LEGAL.json",
);
const PROTOCOL = path.resolve(
  "agents-results/2026-08-19/mediaclaw-crawl-wave/tasks/CRAWL-PROTOCOL.md",
);
const TASK_FILE = path.resolve(
  "agents-results/2026-08-19/mediaclaw-crawl-wave/tasks/CRAWL-COMMERCIAL-LEGAL.md",
);
const SCRIPT = path.resolve(
  "agents-results/2026-08-19/mediaclaw-crawl-wave/scripts/CRAWL-COMMERCIAL-LEGAL.mjs",
);
const SETTLE_MS = 800;
const NAVIGATION_TIMEOUT_MS = 30_000;
const ROUTE_SLUGS = [
  "/download",
  "/pricing",
  "/features/feishu-integration",
  "/welfare",
  "/referral",
  "/privacy-policy",
  "/terms-of-service",
];
const ASSIGNED_PATHS = ROUTE_SLUGS.flatMap((slug) => [slug, `/en${slug}`]);

function globalPlaywright() {
  const npmRoot = execFileSync("npm", ["root", "-g"], { encoding: "utf8" }).trim();
  const requireGlobal = createRequire(path.join(npmRoot, "mediaclaw-crawl-resolver.cjs"));
  return requireGlobal("playwright");
}

function trimText(value, max = 240) {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max - 1)}...` : text;
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function classifyCue(text) {
  const rules = [
    {
      category: "preview",
      pattern: /preview|demo|trial|\u9884\u89c8|\u6f14\u793a|\u8bd5\u7528|\u4ec5\u9650/i,
    },
    {
      category: "account",
      pattern: /log\s*in|login|sign\s*in|sign\s*up|register|account|\u767b\u5f55|\u6ce8\u518c|\u8d26\u53f7|\u8d26\u6237|\u8bf7\s*\u5148\s*\u767b\u5f55/i,
    },
    {
      category: "commerce",
      pattern: /subscription|subscribe|pricing|price|payment|plan|credits?|\u8ba2\u9605|\u4ed8\u8d39|\u4ef7\u683c|\u5957\u9910|\u652f\u4ed8|\u8d2d\u4e70/i,
    },
    {
      category: "availability",
      pattern: /coming\s*soon|not\s*available|unavailable|\u656c\u8bf7\u671f\u5f85|\u6682\u65e0|\u4e0d\u53ef\u7528|\u9700\u8981/i,
    },
  ];
  return rules.find((rule) => rule.pattern.test(text))?.category ?? null;
}

async function extractDom(page) {
  return page.evaluate(({ targetOrigin }) => {
    const clean = (value) => String(value ?? "").replace(/\s+/g, " ").trim();
    const clip = (value, max = 240) => {
      const text = clean(value);
      return text.length > max ? `${text.slice(0, max - 1)}...` : text;
    };
    const uniqueValues = (values) => [...new Set(values.filter(Boolean))];
    const visible = (element) => {
      if (!(element instanceof Element)) return false;
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        Number(style.opacity) !== 0 &&
        rect.width > 0 &&
        rect.height > 0
      );
    };
    const headingText = (element) => {
      const heading = element.querySelector("h1,h2,h3,h4,h5,h6");
      return clip(heading?.innerText || heading?.textContent || "", 180);
    };
    const labelText = (element) =>
      clip(
        element.getAttribute("aria-label") ||
          element.getAttribute("title") ||
          headingText(element) ||
          element.innerText ||
          element.textContent ||
          "",
        180,
      );
    const sameOriginPath = (href) => {
      try {
        const parsed = new URL(href, window.location.href);
        if (parsed.origin !== targetOrigin || !/^https?:$/.test(parsed.protocol)) return null;
        return `${parsed.pathname || "/"}${parsed.search || ""}`;
      } catch {
        return null;
      }
    };
    const ctaPattern =
      /cta|button|btn|download|pricing|subscribe|buy|purchase|start|try|demo|contact|consult|referral|invite|login|sign|register|\u4e0b\u8f7d|\u5b9a\u4ef7|\u8d2d\u4e70|\u5f00\u59cb|\u8bd5\u7528|\u6ce8\u518c|\u767b\u5f55|\u63a8\u8350|\u9080\u8bf7|\u8054\u7cfb/i;

    const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")]
      .filter(visible)
      .map((element) => ({
        level: Number(element.tagName.slice(1)),
        text: clip(element.innerText || element.textContent || "", 300),
        id: element.id || null,
      }))
      .filter((heading) => heading.text);

    const landmarks = [...document.querySelectorAll(
      "header,nav,main,footer,aside,[role='banner'],[role='navigation'],[role='main'],[role='contentinfo'],[role='complementary'],[role='region']",
    )]
      .filter(visible)
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        role: element.getAttribute("role") || null,
        label: labelText(element),
        id: element.id || null,
      }));

    const sections = [...document.querySelectorAll("section,article,[role='region']")]
      .filter(visible)
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        heading: headingText(element) || null,
        id: element.id || null,
        ariaLabel: element.getAttribute("aria-label") || null,
      }));

    const links = [...document.querySelectorAll("a")]
      .filter(visible)
      .map((element) => {
        const rawHref = element.getAttribute("href") || "";
        const href = element.href || rawHref;
        const text = clip(element.innerText || element.getAttribute("aria-label") || "", 220);
        const className = typeof element.className === "string" ? element.className : "";
        const label = `${text} ${rawHref} ${className}`;
        return {
          text,
          href,
          rawHref,
          internalPath: sameOriginPath(href),
          isCta: ctaPattern.test(label),
        };
      })
      .filter((link) => link.href || link.text);

    const buttons = [...document.querySelectorAll("button,[role='button']")]
      .filter(visible)
      .map((element) => ({
        text: clip(element.innerText || element.getAttribute("aria-label") || "", 220),
        type: element.getAttribute("type") || null,
        disabled: Boolean(element.disabled || element.getAttribute("aria-disabled") === "true"),
        isCta: ctaPattern.test(
          `${element.innerText || ""} ${element.getAttribute("aria-label") || ""} ${element.className || ""}`,
        ),
      }));

    const forms = [...document.querySelectorAll("form")].map((form) => ({
      visible: visible(form),
      action: form.action || form.getAttribute("action") || null,
      method: (form.getAttribute("method") || "get").toUpperCase(),
      ariaLabel: form.getAttribute("aria-label") || null,
      controls: [...form.querySelectorAll("input,textarea,select,button")]
        .filter(visible)
        .map((control) => ({
          tag: control.tagName.toLowerCase(),
          type: control.getAttribute("type") || null,
          name: control.getAttribute("name") || null,
          required: Boolean(control.required || control.getAttribute("aria-required") === "true"),
          placeholder: control.getAttribute("placeholder") || null,
          text: clip(control.innerText || control.getAttribute("aria-label") || "", 120),
        })),
    }));

    const bodyLines = clean(document.body?.innerText || "")
      .split(/\n+/)
      .map((line) => clean(line))
      .filter(Boolean);
    const cueLines = uniqueValues(
      [...bodyLines, ...buttons.map((button) => button.text), ...links.map((link) => link.text)].filter(
        Boolean,
      ),
    );

    const internalLinks = uniqueValues(links.map((link) => link.internalPath));
    const ctaLinks = links
      .filter((link) => link.isCta)
      .map((link) => ({ text: link.text, href: link.href, rawHref: link.rawHref, internalPath: link.internalPath }));
    const ctaHrefs = uniqueValues(ctaLinks.map((link) => link.href));
    const boundaryCues = cueLines
      .map((text) => ({ text: clip(text), category: null }))
      .slice(0, 80);

    return {
      title: document.title || "",
      lang: document.documentElement.getAttribute("lang") || null,
      headings,
      landmarks,
      sections,
      internalLinks,
      externalLinks: uniqueValues(links.filter((link) => !link.internalPath).map((link) => link.href)),
      links,
      ctaLinks,
      ctaHrefs,
      buttons,
      forms,
      boundaryTextCandidates: boundaryCues,
      textLength: clean(document.body?.innerText || "").length,
    };
  }, { targetOrigin: TARGET_ORIGIN });
}

async function crawlRoute(browser, routePath, index) {
  const url = new URL(routePath, TARGET).href;
  const page = await browser.newPage();
  const errors = [];
  const blockedRequests = [];
  const navigationRequests = [];
  let initialNavigationSeen = false;
  const startedAt = Date.now();

  const addError = (error) => {
    if (!error || !error.text) return;
    errors.push(error);
  };

  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      addError({ kind: "console", type: message.type(), text: message.text() });
    }
  });
  page.on("pageerror", (error) => {
    addError({ kind: "pageerror", type: error.name || "Error", text: error.message });
  });
  page.on("request", (request) => {
    if (request.isNavigationRequest() && request.frame() === page.mainFrame()) {
      navigationRequests.push({
        url: request.url(),
        method: request.method(),
        redirectedFrom: request.redirectedFrom()?.url() || null,
      });
    }
  });
  page.on("requestfailed", (request) => {
    let requestUrl;
    try {
      requestUrl = new URL(request.url());
    } catch {
      requestUrl = null;
    }
    if (request.isNavigationRequest() || requestUrl?.origin === TARGET_ORIGIN) {
      addError({
        kind: "requestfailed",
        method: request.method(),
        url: request.url(),
        text: request.failure()?.errorText || "request failed",
      });
    }
  });

  await page.route("**/*", async (route) => {
    const request = route.request();
    const method = request.method().toUpperCase();
    let requestUrl;
    try {
      requestUrl = new URL(request.url());
    } catch {
      blockedRequests.push({ url: request.url(), method, reason: "invalid-url" });
      await route.abort("blockedbyclient");
      return;
    }
    const externalOrigin = requestUrl.origin !== TARGET_ORIGIN && requestUrl.protocol !== "data:";
    const initialNavigation =
      request.isNavigationRequest() &&
      request.frame() === page.mainFrame() &&
      !request.redirectedFrom() &&
      request.url() === url &&
      !initialNavigationSeen;
    const followupNavigation =
      request.isNavigationRequest() &&
      request.frame() === page.mainFrame() &&
      !request.redirectedFrom() &&
      initialNavigationSeen &&
      !initialNavigation;
    if (!["GET", "HEAD"].includes(method)) {
      blockedRequests.push({ url: request.url(), method, reason: "protocol-allows-get-head-only" });
      await route.abort("blockedbyclient");
      return;
    }
    if (externalOrigin) {
      blockedRequests.push({ url: request.url(), method, reason: "external-origin" });
      await route.abort("blockedbyclient");
      return;
    }
    if (followupNavigation) {
      blockedRequests.push({ url: request.url(), method, reason: "followup-navigation-not-assigned" });
      await route.abort("blockedbyclient");
      return;
    }
    if (initialNavigation) initialNavigationSeen = true;
    await route.continue();
  });

  let response = null;
  let navigationError = null;
  try {
    response = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: NAVIGATION_TIMEOUT_MS,
    });
    await page.waitForTimeout(SETTLE_MS);
  } catch (error) {
    navigationError = { name: error.name || "Error", message: error.message };
    addError({ kind: "navigation", type: navigationError.name, text: navigationError.message });
  }

  let dom;
  try {
    dom = await extractDom(page);
  } catch (error) {
    dom = {
      title: "",
      lang: null,
      headings: [],
      landmarks: [],
      sections: [],
      internalLinks: [],
      externalLinks: [],
      links: [],
      ctaLinks: [],
      ctaHrefs: [],
      buttons: [],
      forms: [],
      boundaryTextCandidates: [],
      textLength: 0,
    };
    addError({ kind: "dom-extraction", type: error.name || "Error", text: error.message });
  }

  const cueCandidates = dom.boundaryTextCandidates
    .map((candidate) => ({ ...candidate, category: classifyCue(candidate.text) }))
    .filter((candidate) => candidate.category);
  const cueSet = new Set();
  const boundaryCues = cueCandidates.filter((candidate) => {
    const key = `${candidate.category}:${candidate.text}`;
    if (cueSet.has(key)) return false;
    cueSet.add(key);
    return true;
  });
  const headers = response?.headers() || {};
  const finalUrl = page.url();
  const status = response?.status() ?? null;
  const requestedRouteCount = navigationRequests.filter((request) => request.url === url).length;
  const durationMs = Date.now() - startedAt;

  await page.close();
  console.log(
    JSON.stringify({ index, path: routePath, status, finalUrl, requestedRouteCount, durationMs }),
  );

  return {
    url,
    path: routePath,
    status,
    contentType: headers["content-type"] || null,
    title: dom.title,
    lang: dom.lang,
    headings: dom.headings,
    landmarks: dom.landmarks,
    sections: dom.sections,
    internalLinks: dom.internalLinks,
    forms: dom.forms,
    durationMs,
    errors,
    ctaHrefs: dom.ctaHrefs,
    ctaLinks: dom.ctaLinks,
    visibleButtons: dom.buttons,
    externalLinks: dom.externalLinks,
    visiblePreviewOrAccountBoundaryCues: boundaryCues,
    boundarySummary: {
      previewCueObserved: boundaryCues.some((cue) => cue.category === "preview"),
      accountCueObserved: boundaryCues.some((cue) => cue.category === "account"),
      commerceCueObserved: boundaryCues.some((cue) => cue.category === "commerce"),
      availabilityCueObserved: boundaryCues.some((cue) => cue.category === "availability"),
    },
    navigation: {
      finalUrl,
      requestedRouteCount,
      navigationRequests,
      navigationError,
    },
    blockedRequests,
    observedDom: {
      textLength: dom.textLength,
      linkCount: dom.links.length,
      buttonCount: dom.buttons.length,
      formCount: dom.forms.length,
    },
  };
}

async function main() {
  const { chromium } = globalPlaywright();
  await mkdir(path.dirname(ARTIFACT), { recursive: true });
  const generatedAt = new Date().toISOString();
  const browser = await chromium.launch({ headless: true });
  const browserVersion = browser.version();
  const routes = [];
  try {
    console.log(
      JSON.stringify({
        event: "crawl-start",
        taskId: "CRAWL-COMMERCIAL-LEGAL",
        target: TARGET,
        routeCount: ASSIGNED_PATHS.length,
        generatedAt,
      }),
    );
    for (const [index, routePath] of ASSIGNED_PATHS.entries()) {
      routes.push(await crawlRoute(browser, routePath, index + 1));
    }
  } finally {
    await browser.close();
  }

  const statusCounts = {};
  for (const route of routes) {
    const key = route.status === null ? "transport-error" : String(route.status);
    statusCounts[key] = (statusCounts[key] || 0) + 1;
  }
  const allBlockedRequests = routes.flatMap((route) => route.blockedRequests);
  const allErrors = routes.flatMap((route) => route.errors);
  const output = {
    taskId: "CRAWL-COMMERCIAL-LEGAL",
    target: TARGET,
    generatedAt,
    routes,
    counts: {
      assigned: ASSIGNED_PATHS.length,
      captured: routes.length,
      uniquePaths: new Set(routes.map((route) => route.path)).size,
      status: statusCounts,
      routesWithErrors: routes.filter((route) => route.errors.length > 0).length,
      totalErrors: allErrors.length,
      blockedRequests: allBlockedRequests.length,
      routeRequestCountMismatches: routes.filter((route) => route.navigation.requestedRouteCount !== 1).length,
    },
    observedLimitations: [
      "Anonymous browser context only; no cookies, credentials, form submission, CTA clicks, or private API calls were used.",
      "Only the 14 frozen task routes were requested; no route discovery or bundle-only route inference was performed.",
      "Browser requests were restricted to GET/HEAD and same-origin; external-origin resources and follow-up navigations were blocked by the crawl protocol.",
      ...new Set(
        routes
          .filter((route) => route.navigation.navigationError)
          .map((route) => `${route.path}: live navigation error was recorded in the route errors.`),
      ),
    ],
    sourceEvidence: {
      evidenceType: "observed",
      crawlMethod: "Playwright page.goto with domcontentloaded and bounded 800ms render settle",
      browserVersion,
      targetOrigin: TARGET_ORIGIN,
      assignedPaths: ASSIGNED_PATHS,
      protocolPath: PROTOCOL,
      taskFile: TASK_FILE,
      crawlScript: SCRIPT,
      artifactPath: ARTIFACT,
      requestPolicy: {
        allowedMethods: ["GET", "HEAD"],
        sameOriginOnly: true,
        clickControls: false,
        submitForms: false,
        followExternalDomains: false,
        routeRequestExpectation: "one initial request per assigned path; HTTP redirects remain part of that navigation",
      },
    },
  };
  await writeFile(ARTIFACT, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(JSON.stringify({ event: "crawl-complete", artifact: ARTIFACT, counts: output.counts }));
}

main().catch((error) => {
  console.error(error?.stack || error);
  process.exitCode = 1;
});
