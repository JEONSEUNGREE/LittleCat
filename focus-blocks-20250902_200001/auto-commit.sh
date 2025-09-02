#!/bin/bash

cd /home/tory/cronjob/frontApp/LittleCat/focus-blocks-20250902_200001

# Initialize git if not already
if [ ! -d ".git" ]; then
    git init
fi

# Add all files
git add .

# Commit with message
git commit -m "새로운 앱 생성: 포커스 블록 (focus-blocks) - 20250902_200001"

# Try to push (may fail if no remote)
git push 2>/dev/null || echo "Remote push skipped (no remote configured)"

echo "Git operations completed!"