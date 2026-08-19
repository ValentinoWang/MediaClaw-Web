#!/usr/bin/env bash
set -euo pipefail
f="$PWD/agents-results/2026-08-19/mediaclaw-crawl-wave/artifacts/CRAWL-BLOG-ARTICLES-A.json"
test -s "$f"
node -e 'const x=require(process.argv[1]); if(x.routes.length!==24) process.exit(1)' "$f"
