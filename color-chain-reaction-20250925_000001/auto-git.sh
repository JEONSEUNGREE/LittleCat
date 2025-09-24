#!/bin/bash

# Color Chain Reaction - Auto Git Script

cd /home/tory/cronjob/frontApp/LittleCat/color-chain-reaction-20250925_000001

# Initialize git if not already
if [ ! -d .git ]; then
    git init
fi

# Add all files
git add .

# Commit with message
git commit -m "새로운 앱 생성: 색상 연쇄 반응 게임 (color-chain-reaction) - 20250925_000001"

# Try to push (will fail if no remote, but that's ok)
git push 2>/dev/null || echo "Git push skipped (no remote configured)"

echo "Git operations completed!"