import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const waveDir = path.join(
  root,
  "agents-results/2026-08-19/mediaclaw-crawl-wave",
);
const artifactPath = path.join(waveDir, "artifacts/CRAWL-XHS.json");
const target = "https://mediaclaw.app/";
const suffixes = [
  "keywords",
  "viral-content-analysis",
  "account-analysis",
  "scraper",
  "comments",
  "downloader",
  "image-text",
  "transcript",
  "leads",
  "monitoring",
];
const assignedPaths = [
  "/xiaohongshu",
  ...suffixes.map((suffix) => `/xiaohongshu/${suffix}`),
  "/en/xiaohongshu",
  ...suffixes.map((suffix) => `/en/xiaohongshu/${suffix}`),
];

function resolveGlobalPlaywright() {
  const npmRoot = execFileSync("npm", ["root", "-g"], {
    encoding: "utf8",
  }).trim();
  const requireGlobal = createRequire(
    path.join(npmRoot, "codex-global-resolver.cjs"),
  );
  return requireGlobal("playwright");
}

function compact(value, limit = 500) {
  const text = String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > limit ? `${text.slice(0, limit - 1)}...` : text;
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

function routePath(rawUrl) {
  const url = new URL(rawUrl);
  return `${url.pathname}${url.search}`;
}

async function main() {
  const { chromium } = resolveGlobalPlaywright();
  const blockedRequests = [];
  const routes = [];
  const startTime = new Date().toISOString();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ serviceWorkers: "block" });
  await context.route("**/*", async (route) => {
    const request = route.request();
    const method = request.method().toUpperCase();
    if (method === "GET" || method === "HEAD") {
      await route.continue();
      return;
    }
    blockedRequests.push({
      method,
      url: request.url(),
      resourceType: request.resourceType(),
    });
    await route.abort("blockedbyclient");
  });

  try {
    for (const assignedPath of assignedPaths) {
      const url = new URL(assignedPath, target).href;
      const startedAt = Date.now();
      const page = await context.newPage();
      page.setDefaultNavigationTimeout(30_000);
      const consoleMessages = [];
      const pageErrors = [];
      const failedRequests = [];
      const navigationErrors = [];
      const navigationRequests = [];
      page.on("console", (message) => {
        consoleMessages.push({
          type: message.type(),
          text: compact(message.text()),
          location: message.location(),
        });
      });
      page.on("pageerror", (error) =>
        pageErrors.push({ type: "pageerror", text: compact(error.message) }),
      );
      page.on("requestfailed", (request) => {
        failedRequests.push({
          method: request.method(),
          url: request.url(),
          failure: request.failure()?.errorText || "unknown",
        });
      });
      page.on("request", (request) => {
        if (
          request.isNavigationRequest() &&
          request.frame() === page.mainFrame()
        ) {
          navigationRequests.push({
            method: request.method(),
            url: request.url(),
          });
        }
      });

      let mainResponse = null;
      let snapshot = null;
      let finalUrl = url;
      try {
        mainResponse = await page.goto(url, {
          waitUntil: "domcontentloaded",
          timeout: 30_000,
        });
        await page.waitForTimeout(750);
        finalUrl = page.url();
        snapshot = await page.evaluate(() => {
          const compactText = (value, limit = 500) => {
            const text = String(value ?? "")
              .replace(/\s+/g, " ")
              .trim();
            return text.length > limit
              ? `${text.slice(0, limit - 1)}...`
              : text;
          };
          const pathFor = (raw) => {
            try {
              const value = new URL(raw, document.baseURI);
              if (value.origin !== location.origin) return null;
              return `${value.pathname}${value.search}`;
            } catch {
              return null;
            }
          };
          const linkDetail = (anchor) => {
            const path = pathFor(anchor.href);
            if (!path) return null;
            const navigation = anchor.closest("nav,[role='navigation']");
            const region = anchor.closest("header")
              ? "header"
              : anchor.closest("footer")
                ? "footer"
                : anchor.closest("aside")
                  ? "aside"
                  : navigation
                    ? "navigation"
                    : anchor.closest("main")
                      ? "main"
                      : "other";
            return {
              path,
              href: anchor.href,
              text: compactText(anchor.innerText),
              ariaLabel: compactText(anchor.getAttribute("aria-label")),
              region,
              navigationLabel: compactText(
                navigation?.getAttribute("aria-label"),
              ),
            };
          };
          const headings = [...document.querySelectorAll("h1,h2,h3,h4")]
            .map((element) => ({
              level: Number(element.tagName.slice(1)),
              text: compactText(element.innerText),
              id: element.id || "",
            }))
            .filter((heading) => heading.text);
          const landmarks = [
            ...document.querySelectorAll("header,nav,main,aside,footer"),
          ].map((element) => ({
            tag: element.tagName.toLowerCase(),
            id: element.id || "",
            role: element.getAttribute("role") || "",
            label: compactText(element.getAttribute("aria-label")),
          }));
          const main = document.querySelector("main");
          const sectionCandidates = [
            ...document.querySelectorAll(
              "main section, main article, main [role='region']",
            ),
          ];
          const sections = (
            sectionCandidates.length ? sectionCandidates : main ? [main] : []
          ).map((element, index) => {
            const heading = element.querySelector("h1,h2,h3,h4");
            const headingText = compactText(heading?.innerText);
            const sectionLinks = [...element.querySelectorAll("a[href]")]
              .map(linkDetail)
              .filter(Boolean);
            return {
              order: index + 1,
              tag: element.tagName.toLowerCase(),
              id: element.id || "",
              className:
                typeof element.className === "string"
                  ? compactText(element.className, 300)
                  : "",
              role: element.getAttribute("role") || "",
              label: compactText(element.getAttribute("aria-label")),
              heading: headingText,
              headingLevel: heading ? Number(heading.tagName.slice(1)) : null,
              links: uniqueBy(
                sectionLinks,
                (link) => `${link.path}|${link.text}`,
              ),
            };
          });
          const faqPattern =
            /faq|frequently\s+asked|questions|\u5e38\u89c1\u95ee\u9898|\u5e38\u89c1\u95ee\u7b54/i;
          const relatedPattern =
            /related|recommended|next\s+step|\u731c\u4f60\u611f\u5174\u8da3|\u76f8\u5173|\u4e0b\u4e00\u6b65/i;
          const faqSections = sections.filter((section) =>
            faqPattern.test(section.heading),
          );
          const faq = faqSections.map((section) => {
            const element = sectionCandidates.find(
              (candidate) =>
                (candidate.id || "") === section.id &&
                candidate.tagName.toLowerCase() === section.tag,
            );
            const root = element || main;
            const items = root
              ? [...root.querySelectorAll("details summary, h3, h4, button")]
                  .map((item) => compactText(item.innerText))
                  .filter((text) => text && text !== section.heading)
              : [];
            return {
              sectionOrder: section.order,
              heading: section.heading,
              items: [...new Set(items)],
            };
          });
          const relatedCandidates = sectionCandidates.filter((element) => {
            const heading = compactText(
              element.querySelector("h1,h2,h3,h4")?.innerText,
            );
            const className =
              typeof element.className === "string" ? element.className : "";
            return (
              relatedPattern.test(heading) ||
              /related|recommend/i.test(className)
            );
          });
          const relatedLinks = relatedCandidates.map((element) => ({
            heading: compactText(
              element.querySelector("h1,h2,h3,h4")?.innerText,
            ),
            links: uniqueBy(
              [...element.querySelectorAll("a[href]")]
                .map(linkDetail)
                .filter(Boolean),
              (link) => `${link.path}|${link.text}`,
            ),
          }));
          const allLinks = [...document.querySelectorAll("a[href]")]
            .map(linkDetail)
            .filter(Boolean);
          const sharedNavigation = {};
          for (const region of ["header", "nav", "footer"]) {
            const links = [
              ...document.querySelectorAll(
                region === "nav" ? "nav a[href]" : `${region} a[href]`,
              ),
            ]
              .map(linkDetail)
              .filter(Boolean);
            sharedNavigation[region] = uniqueBy(
              links,
              (link) => `${link.path}|${link.text}|${link.ariaLabel}`,
            );
          }
          const forms = [...document.forms].map((form) => ({
            action: form.action,
            method: (form.method || "get").toUpperCase(),
            fields: [...form.elements].map((element) => ({
              tag: element.tagName.toLowerCase(),
              type: element.type || "",
              name: element.name || "",
              placeholder: element.placeholder || "",
            })),
          }));
          const bodyChildren = [...document.body.children].map((element) => ({
            tag: element.tagName.toLowerCase(),
            id: element.id || "",
            className:
              typeof element.className === "string"
                ? compactText(element.className, 300)
                : "",
          }));
          return {
            title: document.title,
            lang: document.documentElement.lang || "",
            headings,
            landmarks,
            sections,
            faq,
            relatedLinks,
            internalLinks: [
              ...new Set(allLinks.map((link) => link.path)),
            ].sort(),
            internalLinkDetails: uniqueBy(
              allLinks,
              (link) => `${link.path}|${link.text}|${link.region}`,
            ),
            sharedNavigation,
            forms,
            domStructure: {
              bodyChildren,
              sectionOrder: sections.map(
                (section) =>
                  `${section.order}:${section.tag}:${section.heading}`,
              ),
              signature: {
                landmarks: landmarks.map((landmark) => landmark.tag).join(","),
                headings: headings.map((heading) => heading.level).join(">"),
                sections: sections.map((section) => section.tag).join(","),
                forms: forms.length ? "present" : "none",
              },
            },
          };
        });
      } catch (error) {
        navigationErrors.push({
          type: "navigation",
          text: compact(error.message),
        });
        try {
          finalUrl = page.url();
          snapshot = await page.evaluate(() => ({
            title: document.title,
            lang: document.documentElement.lang || "",
            headings: [],
            landmarks: [],
            sections: [],
            faq: [],
            relatedLinks: [],
            internalLinks: [],
            internalLinkDetails: [],
            sharedNavigation: { header: [], nav: [], footer: [] },
            forms: [],
            domStructure: {
              bodyChildren: [],
              sectionOrder: [],
              signature: {
                landmarks: "",
                headings: "",
                sections: "",
                forms: "none",
              },
            },
          }));
        } catch {
          snapshot = null;
        }
      }

      const headers = mainResponse ? await mainResponse.allHeaders() : {};
      const status = mainResponse?.status() ?? null;
      const responseContentType = headers["content-type"] || "";
      const errors = [
        ...navigationErrors,
        ...pageErrors,
        ...consoleMessages
          .filter((message) => message.type === "error")
          .map((message) => ({ type: "console", ...message })),
        ...failedRequests.map((request) => ({
          type: "requestfailed",
          ...request,
        })),
      ];
      routes.push({
        url,
        path: assignedPath,
        requestedPath: assignedPath,
        finalUrl,
        status,
        contentType: responseContentType,
        title: snapshot?.title || "",
        lang: snapshot?.lang || "",
        headings: snapshot?.headings || [],
        landmarks: snapshot?.landmarks || [],
        sections: snapshot?.sections || [],
        faq: snapshot?.faq || [],
        relatedLinks: snapshot?.relatedLinks || [],
        internalLinks: snapshot?.internalLinks || [],
        internalLinkDetails: snapshot?.internalLinkDetails || [],
        sharedNavigation: snapshot?.sharedNavigation || {
          header: [],
          nav: [],
          footer: [],
        },
        forms: snapshot?.forms || [],
        domStructure: snapshot?.domStructure || null,
        navigationRequests,
        consoleMessages,
        errors,
        durationMs: Date.now() - startedAt,
      });
      await page.close();
    }
  } finally {
    await context.close();
    await browser.close();
  }

  const statuses = {};
  const languages = {};
  for (const route of routes) {
    const statusKey = String(route.status ?? "navigation-error");
    statuses[statusKey] = (statuses[statusKey] || 0) + 1;
    const languageKey = route.lang || "unknown";
    languages[languageKey] = (languages[languageKey] || 0) + 1;
  }
  const regionCoverage = {};
  for (const region of ["header", "nav", "footer"]) {
    const perRoute = routes.map(
      (route) => route.sharedNavigation?.[region] || [],
    );
    const common = perRoute.length
      ? perRoute.reduce(
          (accumulator, links) =>
            accumulator.filter((link) =>
              links.some(
                (candidate) =>
                  candidate.path === link.path && candidate.text === link.text,
              ),
            ),
          perRoute[0],
        )
      : [];
    regionCoverage[region] = {
      routesWithRegionLinks: perRoute.filter((links) => links.length > 0)
        .length,
      commonLinks: uniqueBy(common, (link) => `${link.path}|${link.text}`),
    };
  }
  const artifact = {
    taskId: "CRAWL-XHS",
    target,
    generatedAt: new Date().toISOString(),
    assignedPaths,
    routes,
    counts: {
      assigned: assignedPaths.length,
      captured: routes.length,
      uniquePaths: new Set(routes.map((route) => route.path)).size,
      status: statuses,
      languages,
      routesWithFaq: routes.filter((route) => route.faq.length > 0).length,
      routesWithRelatedLinks: routes.filter((route) =>
        route.relatedLinks.some((group) => group.links.length > 0),
      ).length,
      routesWithNavigationErrors: routes.filter((route) =>
        route.errors.some((error) => error.type === "navigation"),
      ).length,
      blockedNonGetRequests: blockedRequests.length,
    },
    sharedNavigation: regionCoverage,
    observedLimitations: [
      "Anonymous public-surface crawl only; authenticated, private, and server-internal routes were not examined.",
      "Each assigned document route was navigated once with Playwright after domcontentloaded and a 750ms bounded settle.",
      "Browser-initiated methods other than GET and HEAD were blocked; no controls were clicked and no forms were submitted.",
      ...(blockedRequests.length
        ? [
            `${blockedRequests.length} non-GET browser requests were blocked by the crawl safety boundary.`,
          ]
        : []),
      ...(routes.some((route) => route.errors.length)
        ? [
            "Route-level console, browser, request-failure, or navigation errors are retained on the affected route records.",
          ]
        : []),
    ],
    sourceEvidence: {
      liveTarget: target,
      protocol:
        "agents-results/2026-08-19/mediaclaw-crawl-wave/tasks/CRAWL-PROTOCOL.md",
      task: "agents-results/2026-08-19/mediaclaw-crawl-wave/tasks/CRAWL-XHS.md",
      crawlMode:
        "Playwright headless, anonymous, same-origin document navigation",
      browserRequestPolicy:
        "GET/HEAD allowed; all other browser request methods aborted",
      tools: { node: process.version, playwright: "1.62.1" },
      startedAt: startTime,
      assignedRouteOccurrences: Object.fromEntries(
        assignedPaths.map((assignedPath) => [
          assignedPath,
          routes.filter((route) => route.path === assignedPath).length,
        ]),
      ),
      blockedRequests,
    },
  };
  await mkdir(path.dirname(artifactPath), { recursive: true });
  await writeFile(
    artifactPath,
    `${JSON.stringify(artifact, null, 2)}\n`,
    "utf8",
  );
  console.log(
    JSON.stringify({
      artifactPath,
      routeCount: routes.length,
      statuses,
      blockedRequests: blockedRequests.length,
    }),
  );
}

main().catch((error) => {
  console.error(error.stack || error.message || String(error));
  process.exitCode = 1;
});
