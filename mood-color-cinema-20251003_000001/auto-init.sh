#!/bin/bash

# Navigate to project directory
cd /home/tory/cronjob/frontApp/LittleCat/mood-color-cinema-20251003_000001

# Initialize git
echo "Initializing Git repository..."
git init

# Add all files
echo "Adding files to Git..."
git add .

# Create commit
echo "Creating commit..."
git commit -m "새로운 앱 생성: 무드 컬러 시네마 (mood-color-cinema) - 20251003_000001"

# Try to push (will fail if no remote, but that's ok)
echo "Attempting to push..."
git push 2>/dev/null || echo "Push skipped (no remote configured)"

echo "✅ Process completed!"