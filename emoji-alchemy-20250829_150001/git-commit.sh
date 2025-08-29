#!/bin/bash

# Git initialization and commit script for Emoji Alchemy

cd /home/tory/cronjob/frontApp/LittleCat/emoji-alchemy-20250829_150001

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    git init
    echo "Git repository initialized"
fi

# Add all files
git add .

# Create commit
git commit -m "새로운 앱 생성: 이모지 연금술 (emoji-alchemy) - 20250829_150001

- 이모지를 조합하여 새로운 원소를 발견하는 창의적 퍼즐 게임
- React 18 + TypeScript + Vite + Tailwind CSS
- 20개 이상의 조합 레시피와 점수 시스템
- 모바일 최적화 반응형 디자인
- 애니메이션과 그라디언트 효과 적용"

# Attempt to push (will fail if no remote is set, but that's okay)
git push origin main 2>/dev/null || echo "Note: No remote repository configured. Changes saved locally."

echo "✅ Git operations completed!"