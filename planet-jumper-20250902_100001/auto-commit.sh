#!/bin/bash

# Auto-commit script for Planet Jumper
echo "🚀 Initializing Git repository and committing Planet Jumper app..."

# Navigate to project directory
cd /home/tory/cronjob/frontApp/LittleCat/planet-jumper-20250902_100001

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    git init
    echo "✅ Git repository initialized"
fi

# Add all files
git add .
echo "✅ Files added to staging"

# Commit with descriptive message
git commit -m "새로운 앱 생성: 행성 점프 게임 (planet-jumper) - 20250902_100001

🎮 Planet Jumper - 중력 기반 물리 퍼즐 게임
- 각 행성마다 다른 중력을 이용한 점프 퍼즐
- 물리 엔진 기반 게임플레이
- 모바일 최적화 반응형 디자인
- React + TypeScript + Vite + Tailwind CSS
"

if [ $? -eq 0 ]; then
    echo "✅ Successfully committed!"
else
    echo "⚠️ Commit might have failed (possibly no changes to commit)"
fi

# Try to push (will fail if no remote is set, but that's okay)
git push origin main 2>/dev/null || echo "ℹ️ No remote repository configured (local commit only)"

echo ""
echo "=================================================="
echo "✅ Git operations completed"
echo "=================================================="