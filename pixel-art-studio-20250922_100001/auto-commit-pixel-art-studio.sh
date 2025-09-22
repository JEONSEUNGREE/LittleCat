#!/bin/bash

# Pixel Art Studio Auto Commit Script
APP_NAME="픽셀 아트 스튜디오"
APP_NAME_EN="pixel-art-studio"
TIMESTAMP="20250922_100001"

echo "==================================="
echo "앱 생성 완료: $APP_NAME"
echo "영문명: $APP_NAME_EN"
echo "타임스탬프: $TIMESTAMP"
echo "==================================="

# Git 초기화 및 커밋 (에러 무시)
git init 2>/dev/null || true
git add . 2>/dev/null || true
git commit -m "새로운 앱 생성: $APP_NAME ($APP_NAME_EN) - $TIMESTAMP" 2>/dev/null || true

# 프로젝트 정보 출력
echo ""
echo "프로젝트 구조:"
echo "- Vite + React 18 + TypeScript"
echo "- Tailwind CSS + CSS Modules"
echo "- Zustand 상태 관리"
echo "- Lucide React 아이콘"
echo ""
echo "주요 기능:"
echo "- 픽셀 아트 그리기 (8x8 ~ 32x32 그리드)"
echo "- 펜, 지우개, 채우기, 스포이드 도구"
echo "- 실행 취소/다시 실행"
echo "- PNG 이미지로 내보내기"
echo "- 24가지 색상 팔레트 + 사용자 정의"
echo ""
echo "테스트 방법:"
echo "npm install && npm run dev"
echo ""
echo "생성 경로: $(pwd)"
echo "==================================="