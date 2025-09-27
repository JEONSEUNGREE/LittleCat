#!/bin/bash

# Git automation for Memory Wave app

cd /home/tory/cronjob/frontApp/LittleCat/memory-wave-20250927_100001

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    git init
fi

# Add all files
git add .

# Commit with message
git commit -m "새로운 앱 생성: 메모리 웨이브 (memory-wave) - 20250927_100001"

# Try to push (will fail if no remote configured, but that's ok)
git push 2>/dev/null || echo "Git push skipped (no remote configured)"

echo "Git operations complete!"