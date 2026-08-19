import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { writeFile } from "node:fs/promises";

const npmRoot = execFileSync("npm", ["root", "-g"], { encoding: "utf8" }).trim();
const requireGlobal = createRequire(path.join(npmRoot, "codex-global-resolver.cjs"));
const { chromium } = requireGlobal("playwright");

const taskRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const artifactPath = path.join(taskRoot, "artifacts", "CRAWL-HOME-SHELL.json");
const targetOrigin = "https://mediaclaw.app";
const assignedRoutes = [
  { path: "/", url: `${targetOrigin}/` },
  { path: "/en", url: `${targetOrigin}/en` },
];

function cleanText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function uniqueByHref(links) {
  const seen = new Set();
  return links.filter((link) => {
    const key = `${link.href}|${link.text}|${link.path ?? ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function dedupeErrors(errors) {
  const seen = new Set();
  return errors.filter((error) => {
    const key = JSON.stringify(error);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function commonLinks(routeRecords, key) {
  if (routeRecords.length === 0) return [];
  const sets = routeRecords.map((route) => new Set(route[key].map((link) => JSON.stringify(link))));
  return routeRecords[0][key].filter((link) => sets.every((set) => set.has(JSON.stringify(link))));
}

async function extractDom(page) {
  return page.evaluate(({ origin }) => {
    const normalizeText = (value) => String(value ?? "").replace(/\s+/g, " ").trim();
    const resolve = (raw) => {
      try {
        const url = new URL(raw, document.baseURI);
        url.hash = "";
        return url;
      } catch {
        return null;
      }
    };
    const linkRecord = (anchor) => {
      const raw = anchor.getAttribute("href");
      if (!raw || /^javascript:/i.test(raw)) return null;
      const url = resolve(raw);
      if (!url) return null;
      const internal = url.origin === origin;
      return {
        href: url.href,
        path: internal ? `${url.pathname}${url.search}` : null,
        text: normalizeText(anchor.textContent),
        internal,
      };
    };
    const linksIn = (selector) => Array.from(document.querySelectorAll(`${selector} a[href]`))
      .map(linkRecord)
      .filter(Boolean);
    const accessibleLabel = (element) => {
      const direct = element.getAttribute("aria-label");
      if (direct) return normalizeText(direct);
      const labelledBy = element.getAttribute("aria-labelledby");
      if (labelledBy) {
        return normalizeText(labelledBy.split(/\s+/).map((id) => document.getElementById(id)?.textContent ?? "").join(" "));
      }
      return "";
    };
    const roleFor = (element) => {
      const explicitRole = element.getAttribute("role");
      if (explicitRole) return explicitRole;
      const tag = element.tagName.toLowerCase();
      return {
        header: "banner",
        nav: "navigation",
        main: "main",
        aside: "complementary",
        footer: "contentinfo",
      }[tag] ?? null;
    };
    const landmarks = Array.from(document.querySelectorAll("header, nav, main, aside, footer, [role]"))
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        role: roleFor(element),
        label: accessibleLabel(element),
      }))
      .filter((landmark) => landmark.role);
    const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"))
      .map((element) => ({
        level: Number(element.tagName.slice(1)),
        text: normalizeText(element.textContent),
      }));
    const sections = Array.from(document.querySelectorAll("section"))
      .map((element) => {
        const heading = element.querySelector("h1, h2, h3, h4, h5, h6");
        return {
          tag: "section",
          heading: heading ? normalizeText(heading.textContent) : null,
          id: element.id || null,
        };
      });
    const forms = Array.from(document.forms).map((form) => {
      const formAction = resolve(form.getAttribute("action") || location.href);
      return {
        action: formAction?.href ?? null,
        method: (form.getAttribute("method") || "get").toLowerCase(),
        name: form.getAttribute("name") || null,
        label: accessibleLabel(form),
        fields: Array.from(form.elements).map((field) => ({
          tag: field.tagName.toLowerCase(),
          type: field.getAttribute("type") || null,
          name: field.getAttribute("name") || null,
          id: field.id || null,
        })),
      };
    });
    const internalLinks = Array.from(document.querySelectorAll("a[href]"))
      .map(linkRecord)
      .filter((link) => link?.internal)
      .map((link) => link.path);
    return {
      title: document.title,
      lang: document.documentElement.getAttribute("lang") || null,
      headings,
      landmarks,
      sections,
      forms,
      internalLinks: [...new Set(internalLinks)].sort(),
      headerLinks: linksIn("header"),
      footerLinks: linksIn("footer"),
    };
  }, { origin: targetOrigin });
}

async function crawlRoute(browser, assignment) {
  const startedAt = Date.now();
  const errors = [];
  const documentRequests = [];
  const navigationResponses = [];
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.route("**/*", async (route) => {
    const request = route.request();
    const requestUrl = new URL(request.url());
    const method = request.method();
    const isMainDocument = request.isNavigationRequest() && request.frame() === page.mainFrame();
    if (isMainDocument) documentRequests.push({ url: request.url(), method });
    if (!["GET", "HEAD"].includes(method)) {
      errors.push({ type: "blocked-request", method, url: request.url(), resourceType: request.resourceType() });
      await route.abort("blockedbyclient");
      return;
    }
    if (requestUrl.origin !== targetOrigin) {
      errors.push({ type: "blocked-cross-origin-request", method, url: request.url(), resourceType: request.resourceType() });
      await route.abort("blockedbyclient");
      return;
    }
    await route.continue();
  });
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      errors.push({ type: "console", level: message.type(), text: message.text() });
    }
  });
  page.on("pageerror", (error) => {
    errors.push({ type: "pageerror", message: error.message });
  });
  page.on("requestfailed", (request) => {
    errors.push({
      type: "requestfailed",
      method: request.method(),
      url: request.url(),
      resourceType: request.resourceType(),
      failure: request.failure()?.errorText ?? "unknown",
    });
  });
  page.on("response", (response) => {
    const request = response.request();
    if (request.isNavigationRequest() && request.frame() === page.mainFrame()) {
      navigationResponses.push({
        url: response.url(),
        status: response.status(),
        statusText: response.statusText(),
      });
    }
  });

  let response = null;
  try {
    response = await page.goto(assignment.url, { waitUntil: "domcontentloaded", timeout: 30_000 });
  } catch (error) {
    errors.push({ type: "navigation", message: error.message });
  }
  await page.waitForTimeout(800);

  let dom = {
    title: "",
    lang: null,
    headings: [],
    landmarks: [],
    sections: [],
    forms: [],
    internalLinks: [],
    headerLinks: [],
    footerLinks: [],
  };
  try {
    dom = await extractDom(page);
  } catch (error) {
    errors.push({ type: "dom-extraction", message: error.message });
  }

  const status = response?.status() ?? null;
  const contentType = response?.headers()["content-type"] ?? null;
  const finalUrl = page.url();
  await context.close();
  return {
    url: assignment.url,
    path: assignment.path,
    status,
    contentType,
    finalUrl,
    title: dom.title,
    lang: dom.lang,
    headings: dom.headings,
    landmarks: dom.landmarks,
    sections: dom.sections,
    forms: dom.forms,
    internalLinks: dom.internalLinks,
    headerLinks: uniqueByHref(dom.headerLinks),
    footerLinks: uniqueByHref(dom.footerLinks),
    durationMs: Date.now() - startedAt,
    errors: dedupeErrors(errors),
    evidence: {
      documentRequests,
      navigationResponses,
      requestedExactlyOnce: documentRequests.filter((request) => request.url === assignment.url && request.method === "GET").length === 1,
    },
  };
}

const crawlStartedAt = new Date().toISOString();
const browser = await chromium.launch({ headless: true });
const routeRecords = [];
try {
  for (const assignment of assignedRoutes) {
    routeRecords.push(await crawlRoute(browser, assignment));
  }
} finally {
  await browser.close();
}

const statusCounts = {};
for (const route of routeRecords) {
  const key = String(route.status ?? "unknown");
  statusCounts[key] = (statusCounts[key] ?? 0) + 1;
}
const headerDestinations = uniqueByHref(routeRecords.flatMap((route) => route.headerLinks));
const footerDestinations = uniqueByHref(routeRecords.flatMap((route) => route.footerLinks));
const limitations = [];
for (const route of routeRecords) {
  if (route.errors.some((error) => error.type === "blocked-cross-origin-request")) {
    limitations.push(`${route.path}: cross-origin browser requests were blocked by the crawl protocol`);
  }
  if (route.status === null) limitations.push(`${route.path}: navigation did not yield an HTTP response`);
  if (route.status !== 200 && route.status !== 404) limitations.push(`${route.path}: observed HTTP status ${route.status}`);
}

const artifact = {
  taskId: "CRAWL-HOME-SHELL",
  target: targetOrigin,
  generatedAt: crawlStartedAt,
  routes: routeRecords,
  sharedShell: {
    headerDestinations,
    footerDestinations,
    commonHeaderDestinations: commonLinks(routeRecords, "headerLinks"),
    commonFooterDestinations: commonLinks(routeRecords, "footerLinks"),
  },
  counts: {
    assignedRoutes: assignedRoutes.length,
    crawledRoutes: routeRecords.length,
    status: statusCounts,
    documentRequests: routeRecords.reduce((sum, route) => sum + route.evidence.documentRequests.length, 0),
    routesRequestedExactlyOnce: routeRecords.filter((route) => route.evidence.requestedExactlyOnce).length,
    errors: routeRecords.reduce((sum, route) => sum + route.errors.length, 0),
  },
  observedLimitations: [...new Set(limitations)],
  sourceEvidence: {
    mode: "live anonymous Playwright crawl",
    requestPolicy: "same-origin GET/HEAD only; no clicks, form submissions, cookies, login, or private APIs",
    renderWait: "domcontentloaded plus 800ms bounded settle",
    assignedUrls: assignedRoutes.map((route) => route.url),
    playwrightVersion: "1.62.1",
    browser: "Chromium headless",
  },
};

await writeFile(artifactPath, `${JSON.stringify(artifact, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ artifactPath, counts: artifact.counts, observedLimitations: artifact.observedLimitations }, null, 2));
