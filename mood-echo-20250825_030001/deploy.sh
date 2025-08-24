#!/bin/bash

echo "Deploying Mood Echo App..."
echo "================================"

cd /home/tory/cronjob/frontApp/LittleCat/mood-echo-20250825_030001

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    git init
    echo "Git repository initialized"
fi

# Add all files
git add .
echo "Files added to git"

# Commit with timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
git commit -m "새로운 앱 생성: 무드 에코 (mood-echo) - ${TIMESTAMP}"
echo "Committed with message: 새로운 앱 생성: 무드 에코 (mood-echo) - ${TIMESTAMP}"

# Try to push (will fail if no remote configured, but that's okay)
git push origin main 2>/dev/null || echo "Note: No remote repository configured. Changes saved locally."

echo "================================"
echo "Deployment process completed!"