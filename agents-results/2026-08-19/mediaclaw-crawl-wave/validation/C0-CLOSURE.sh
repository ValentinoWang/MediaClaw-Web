#!/usr/bin/env bash
set -euo pipefail

ROOT="$PWD"
WAVE="$ROOT/agents-results/2026-08-19/mediaclaw-crawl-wave"

/bin/bash "$WAVE/validation/C0-AGGREGATE.sh" >/dev/null
for id in CRAWL-XHS CRAWL-BLOG-INDEX CRAWL-BLOG-ARTICLES-B CRAWL-COMMERCIAL-LEGAL; do
  test -s "$WAVE/returns/$id-recovery.json"
done

if ps -axo command= | rg -q 'run_lw_luna_with_l3|codex exec.*CRAWL-|CRAWL-XHS-live|crawl-blog-articles-b'; then
  echo "crawl worker process still running" >&2
  exit 1
fi

node - <<'NODE' "$WAVE/logs/src-hashes-before.sha256"
const fs = require("fs");
const { execFileSync } = require("child_process");
const lines = fs.readFileSync(process.argv[2], "utf8").trim().split("\n").filter(Boolean);
for (const line of lines) {
  const [expected, file] = line.split(/\s+/);
  const actual = execFileSync("shasum", ["-a", "256", file], { encoding: "utf8" }).split(/\s+/)[0];
  if (expected !== actual) throw new Error(`source hash changed: ${file}`);
}
NODE

echo "C0 closure validation passed"
