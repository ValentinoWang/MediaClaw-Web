#!/usr/bin/env bash
set -uo pipefail

project_root="/Users/vsiyo/Desktop/Opensource_Tool/MediaClaw-Web"
wave_root="$project_root/agents-results/2026-08-19/mediaclaw-implementation-wave"
supervisor="/Users/vsiyo/.codex/skills/codex-explicit-worker-orchestration/scripts/run_primary_with_l3_escalation.py"
primary_wrapper="/Users/vsiyo/.codex/workers/run-lw-luna.sh"
l3_wrapper="/Users/vsiyo/.codex/workers/run-l3.sh"

task_ids=(HOME-SHELL XHS DOUYIN BLOG-INDEX BLOG-A BLOG-B UPDATES COMMERCIAL-LEGAL BOUNDARIES)
pids=()

for task_id in "${task_ids[@]}"; do
  python3 "$supervisor" \
    --task-id "$task_id" \
    --task-file "$wave_root/tasks/$task_id.md" \
    --artifact-dir "$wave_root" \
    --project-root "$project_root" \
    --validation-command-file "$wave_root/validation/$task_id.sh" \
    --primary-executor lw-luna \
    --primary-wrapper "$primary_wrapper" \
    --l3-wrapper "$l3_wrapper" \
    > "$wave_root/logs/supervisor-$task_id.log" 2>&1 &
  pids+=("$!")
  printf '%s %s\n' "$task_id" "$!"
done

status=0
for index in "${!pids[@]}"; do
  if wait "${pids[$index]}"; then
    printf '%s complete\n' "${task_ids[$index]}"
  else
    exit_code=$?
    printf '%s failed exit=%s\n' "${task_ids[$index]}" "$exit_code"
    status=1
  fi
done

exit "$status"
