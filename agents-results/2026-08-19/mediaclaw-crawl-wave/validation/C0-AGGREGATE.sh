#!/usr/bin/env bash
set -euo pipefail

ROOT="$PWD"
WAVE="$ROOT/agents-results/2026-08-19/mediaclaw-crawl-wave"
REPORT="/Users/vsiyo/Desktop/Opensource_Tool/site-audit-mediaclaw-full-2026-08-19/report.json"

node - "$WAVE" "$REPORT" <<'NODE'
const fs = require("fs");
const path = require("path");

const wave = process.argv[2];
const reportPath = process.argv[3];
const expected = {
  "CRAWL-HOME-SHELL.json": 2,
  "CRAWL-XHS.json": 22,
  "CRAWL-DOUYIN.json": 22,
  "CRAWL-BLOG-INDEX.json": 26,
  "CRAWL-BLOG-ARTICLES-A.json": 24,
  "CRAWL-BLOG-ARTICLES-B.json": 24,
  "CRAWL-UPDATES.json": 34,
  "CRAWL-COMMERCIAL-LEGAL.json": 14,
  "CRAWL-BOUNDARIES.json": 6,
};
const required = [
  "url", "path", "status", "contentType", "title", "lang", "headings",
  "landmarks", "sections", "internalLinks", "forms", "durationMs", "errors",
];
const normalize = (value) => {
  const url = new URL(value, "https://mediaclaw.app");
  return `${url.pathname}${url.search}`;
};
const files = Object.keys(expected).sort();
const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
const records = [];
const perFile = {};
for (const file of files) {
  const artifact = JSON.parse(fs.readFileSync(path.join(wave, "artifacts", file), "utf8"));
  perFile[file] = artifact.routes.length;
  if (artifact.routes.length !== expected[file]) throw new Error(`${file}: route count mismatch`);
  for (const route of artifact.routes) {
    for (const field of required) if (!(field in route)) throw new Error(`${file}:${route.path}: missing ${field}`);
    records.push({ file, ...route });
  }
}
const actual = records.map((route) => normalize(route.path));
const expectedPaths = report.pages.map((page) => normalize(page.url));
const actualSet = new Set(actual);
const expectedSet = new Set(expectedPaths);
const missing = expectedPaths.filter((route) => !actualSet.has(route));
const extra = actual.filter((route) => !expectedSet.has(route));
const duplicates = [...new Set(actual.filter((route, index) => actual.indexOf(route) !== index))];
const statuses = {};
for (const route of records) statuses[String(route.status)] = (statuses[String(route.status)] || 0) + 1;
const reportStatuses = {};
for (const page of report.pages) reportStatuses[String(page.status)] = (reportStatuses[String(page.status)] || 0) + 1;
if (records.length !== 174 || missing.length || extra.length || duplicates.length) throw new Error("route set mismatch");
if (JSON.stringify(statuses) !== JSON.stringify(reportStatuses)) throw new Error("status split mismatch");
console.log(JSON.stringify({
  taskId: "C0-AGGREGATE",
  artifactFiles: files,
  perFile,
  totalRoutes: records.length,
  uniquePaths: actualSet.size,
  expectedReportPages: report.pages.length,
  statuses,
  reportStatuses,
  missing,
  extra,
  duplicates,
  requiredFields: required,
  pathSetMatches: true,
  statusSplitMatches: true,
}, null, 2));
NODE
