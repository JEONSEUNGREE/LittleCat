#!/bin/bash

cd /home/tory/cronjob/frontApp/LittleCat/money-habit-tracker-20250916_200001

# Initialize git if needed
if [ ! -d ".git" ]; then
    git init
fi

# Add all files
git add .

# Commit with message
git commit -m "새로운 앱 생성: 돈 습관 추적기 (money-habit-tracker) - 20250916_200001

- 지출 패턴 시각화를 위한 히트맵
- 일일 절약 목표 설정 및 추적
- 카테고리별 지출 분석
- 충동구매 추적 기능
- 주간 습관 통계 대시보드"

# Try to push if remote exists
if git remote | grep -q 'origin'; then
    git push origin main 2>/dev/null || echo "Push failed or no remote configured"
else
    echo "No remote repository configured"
fi

echo "Git operations completed"