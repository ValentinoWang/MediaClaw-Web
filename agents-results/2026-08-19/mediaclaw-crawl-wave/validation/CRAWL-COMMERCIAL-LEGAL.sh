#!/usr/bin/env bash
set -euo pipefail
f="$PWD/agents-results/2026-08-19/mediaclaw-crawl-wave/artifacts/CRAWL-COMMERCIAL-LEGAL.json"
test -s "$f"
node -e 'const x=require(process.argv[1]); if(x.routes.length!==14) process.exit(1)' "$f"
