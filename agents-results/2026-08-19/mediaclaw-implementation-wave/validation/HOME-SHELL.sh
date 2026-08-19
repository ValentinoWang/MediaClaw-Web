#!/usr/bin/env bash
set -euo pipefail
node agents-results/2026-08-19/mediaclaw-implementation-wave/validation/validate-route-module.mjs "$PWD/src/rebuild/data/homeShell.js" 2 HOME-SHELL
