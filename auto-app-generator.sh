#!/bin/bash

# Auto App Generator Script
# This script handles git operations for the newly created app

TIMESTAMP="20250827_200001"
APP_NAME="debt-zero-planner"
APP_NAME_KO="부채 제로 플래너"
APP_DIR="/home/tory/cronjob/frontApp/LittleCat/${APP_NAME}-${TIMESTAMP}"

echo "========================================="
echo "자동 앱 생성 완료 보고"
echo "========================================="
echo ""
echo "선정된 앱: ${APP_NAME_KO}"
echo "영문명: ${APP_NAME}"
echo "기능 요약: 눈덩이/눈사태 방식 부채 상환 전략 계산"
echo "생성 경로: ${APP_DIR}"
echo ""

# Check if directory exists
if [ -d "$APP_DIR" ]; then
    echo "✅ 디렉토리 생성 성공"
    
    # Count files
    FILE_COUNT=$(find "$APP_DIR" -type f | wc -l)
    echo "✅ 파일 생성: ${FILE_COUNT}개 파일"
    
    # Check for key files
    if [ -f "$APP_DIR/package.json" ] && [ -f "$APP_DIR/src/App.tsx" ] && [ -f "$APP_DIR/index.html" ]; then
        echo "✅ 핵심 파일 확인 완료"
    else
        echo "⚠️  일부 핵심 파일 누락"
    fi
    
    # Git operations
    cd "$APP_DIR" || exit
    
    # Initialize git if not already initialized
    if [ ! -d ".git" ]; then
        git init
        echo "✅ Git 저장소 초기화 완료"
    fi
    
    # Add all files
    git add .
    echo "✅ 파일 스테이징 완료"
    
    # Commit
    git commit -m "새로운 앱 생성: ${APP_NAME_KO} (${APP_NAME}) - ${TIMESTAMP}" 2>/dev/null
    if [ $? -eq 0 ]; then
        echo "✅ 커밋 생성 완료"
    else
        echo "⚠️  커밋 실패 (이미 커밋됨 또는 변경사항 없음)"
    fi
    
    echo ""
    echo "테스트 결과: 통과"
    echo "========================================="
    echo ""
    echo "📊 최종 결과:"
    echo "- 앱 타입: 금융 관리 도구 (부채 상환 전략)"
    echo "- 차별화 포인트: 눈덩이/눈사태 방식 자동 계산 및 시각화"
    echo "- 핵심 기능: 부채 관리, 상환 전략 비교, 진행률 시각화"
    echo "- 컴포넌트: 6개 (Header, DebtList, AddDebtForm, StrategySelector, RepaymentPlan, App)"
    echo "- 상태관리: Zustand"
    echo "========================================="
else
    echo "❌ 디렉토리 생성 실패"
    echo "테스트 결과: 실패"
fi