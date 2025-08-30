#!/bin/bash

# Git commit script for Sound Wave Visualizer
cd /home/tory/cronjob/frontApp/LittleCat/sound-wave-visualizer-20250831_050001

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    git init
fi

# Add all files
git add .

# Commit with message
git commit -m "새로운 앱 생성: 사운드 웨이브 비주얼라이저 (sound-wave-visualizer) - 20250831_050001"

# Try to push (will fail if no remote is set up, but that's okay)
git push origin main 2>/dev/null || echo "Note: No remote repository configured. Changes saved locally."

echo "Git operations completed!"