#!/usr/bin/env bash
set -euo pipefail
test -s /Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/agents-results/2026-08-19/mediaclaw-concurrent-rebuild-design/artifacts/BLOG-LANE.md
rg -q "24|48|slug|locale" /Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/agents-results/2026-08-19/mediaclaw-concurrent-rebuild-design/artifacts/BLOG-LANE.md
