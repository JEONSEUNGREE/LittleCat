#!/bin/bash

# Navigate to project directory
cd "$(dirname "$0")"

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    git init
fi

# Add all files
git add .

# Commit with message
git commit -m "새로운 앱 생성: 미팅 컴패니언 (meeting-companion) - 20250910_000001"

# Try to push (may fail if no remote)
git push origin main 2>/dev/null || echo "Note: Remote repository not configured, changes saved locally"

echo "Git operations completed!"