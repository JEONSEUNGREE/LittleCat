#!/bin/bash

echo "🎯 Git 작업 시작..."
cd /home/tory/cronjob/frontApp/LittleCat/emoji-story-studio-20250924_200001

# Git 초기화
if [ ! -d ".git" ]; then
    git init
    echo "✅ Git 저장소 초기화 완료"
fi

# 모든 파일 추가
git add .
echo "✅ 파일 추가 완료"

# 커밋
git commit -m "새로운 앱 생성: 이모지 스토리 스튜디오 (emoji-story-studio) - 20250924_200001"
echo "✅ 커밋 완료"

# Push (실패 시에도 계속)
git push 2>/dev/null || echo "⚠️ Push 실패 - 로컬에만 저장됨"

echo "🎉 Git 작업 완료!"