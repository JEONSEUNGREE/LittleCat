#!/bin/bash

cd /home/tory/cronjob/frontApp/LittleCat/crypto-fear-index-20250925_100001

# Initialize git if not already
if [ ! -d ".git" ]; then
    git init
fi

# Add all files
git add .

# Commit with message
git commit -m "새로운 앱 생성: 암호화폐 공포탐욕 지수 트래커 (crypto-fear-index) - 20250925_100001"

# Try to push (may fail if no remote is set)
git push 2>/dev/null || echo "Git push skipped (no remote configured)"

echo "Git operations completed!"