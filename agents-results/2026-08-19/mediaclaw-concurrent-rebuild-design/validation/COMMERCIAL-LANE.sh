#!/usr/bin/env bash
set -euo pipefail
test -s /Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/agents-results/2026-08-19/mediaclaw-concurrent-rebuild-design/artifacts/COMMERCIAL-LANE.md
rg -q "32|404|legal|locale" /Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web/agents-results/2026-08-19/mediaclaw-concurrent-rebuild-design/artifacts/COMMERCIAL-LANE.md
