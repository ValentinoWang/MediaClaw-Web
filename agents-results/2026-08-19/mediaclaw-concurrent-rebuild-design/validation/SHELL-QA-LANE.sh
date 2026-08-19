#!/usr/bin/env bash
set -euo pipefail
test -s /Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/agents-results/2026-08-19/mediaclaw-concurrent-rebuild-design/artifacts/SHELL-QA-LANE.md
rg -q "174|Playwright|production|route" /Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/agents-results/2026-08-19/mediaclaw-concurrent-rebuild-design/artifacts/SHELL-QA-LANE.md
