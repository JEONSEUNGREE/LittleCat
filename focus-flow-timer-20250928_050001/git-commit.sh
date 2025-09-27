#!/bin/bash

cd /home/tory/cronjob/frontApp/LittleCat/focus-flow-timer-20250928_050001

# Initialize git if not already initialized
if [ ! -d .git ]; then
    git init
fi

# Add all files
git add .

# Commit with message
git commit -m "새로운 앱 생성: 포커스 플로우 타이머 (focus-flow-timer) - 20250928_050001"

# Try to push (may fail if no remote is set, but that's ok)
git push 2>/dev/null || echo "Push skipped (no remote configured)"

echo "Git operations completed"