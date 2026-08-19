#!/usr/bin/env bash
set -euo pipefail
test -s /Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/agents-results/2026-08-19/mediaclaw-concurrent-rebuild-design/artifacts/PRODUCT-LANE.md
rg -q "40|product|locale|slug" /Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/agents-results/2026-08-19/mediaclaw-concurrent-rebuild-design/artifacts/PRODUCT-LANE.md
