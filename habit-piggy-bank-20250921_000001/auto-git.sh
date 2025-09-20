#!/bin/bash

echo "🔧 Git 작업 시작..."

# 디렉토리 이동
cd /home/tory/cronjob/frontApp/LittleCat/habit-piggy-bank-20250921_000001

# Git 초기화
if [ ! -d ".git" ]; then
    git init
    echo "✅ Git 저장소 초기화 완료"
fi

# 모든 파일 추가
git add .
echo "✅ 파일 추가 완료"

# 커밋
git commit -m "새로운 앱 생성: 습관 저금통 (habit-piggy-bank) - 20250921_000001

- 행동 경제학 기반 혁신적 저축 앱
- 나쁜 습관을 참으면서 돈을 모으는 독특한 컨셉
- React 18 + TypeScript + Tailwind CSS
- 모바일 우선 반응형 디자인"

echo "✅ 커밋 완료"

# Push 시도 (실패해도 계속 진행)
git push origin main 2>/dev/null || echo "ℹ️ Push 생략 (로컬에만 저장됨)"

echo "✨ Git 작업 완료!"