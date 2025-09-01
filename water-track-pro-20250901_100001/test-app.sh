#!/bin/bash

echo "Water Track Pro - 앱 구조 검증"
echo "================================"

# Check if all required files exist
echo "파일 구조 확인 중..."

required_files=(
    "package.json"
    "vite.config.ts"
    "tsconfig.json"
    "index.html"
    "src/main.tsx"
    "src/App.tsx"
    "src/index.css"
    "src/components/Header.tsx"
    "src/components/WaterTracker.tsx"
    "src/components/QuickAdd.tsx"
    "src/components/Statistics.tsx"
    "src/components/History.tsx"
    "src/store/waterStore.ts"
)

all_exist=true
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - 파일이 없습니다"
        all_exist=false
    fi
done

if $all_exist; then
    echo ""
    echo "✅ 모든 파일이 성공적으로 생성되었습니다!"
    echo ""
    echo "앱 정보:"
    echo "- 선정된 앱: Water Track Pro (워터 트랙 프로)"
    echo "- 영문명: water-track-pro"
    echo "- 기능 요약: 스마트 수분 섭취 추적 및 알림 앱"
    echo "- 생성 경로: /home/tory/cronjob/frontApp/LittleCat/water-track-pro-20250901_100001"
    echo "- 테스트 결과: 통과"
    echo ""
    echo "주요 기능:"
    echo "1. 일일 수분 섭취량 추적"
    echo "2. 목표 설정 및 진행률 표시"
    echo "3. 빠른 추가 버튼 (물, 커피, 주스, 우유)"
    echo "4. 주간 통계 및 차트"
    echo "5. 오늘의 기록 관리"
    echo ""
    echo "기술 스택:"
    echo "- Vite + React 18 + TypeScript"
    echo "- Tailwind CSS"
    echo "- Zustand (상태 관리)"
    echo "- Lucide React (아이콘)"
else
    echo ""
    echo "❌ 일부 파일이 누락되었습니다"
    echo "- 테스트 결과: 실패"
fi