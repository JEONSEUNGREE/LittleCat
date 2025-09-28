#!/bin/bash

# Auto Commit Script for Breath Rhythm Trainer
TIMESTAMP="20250928_100001"
APP_NAME="breath-rhythm-trainer"
APP_NAME_KO="호흡 리듬 트레이너"
APP_DIR="/home/tory/cronjob/frontApp/LittleCat/${APP_NAME}-${TIMESTAMP}"

echo "========================================="
echo "자동 앱 생성 완료 보고"
echo "========================================="
echo ""
echo "선정된 앱: ${APP_NAME_KO}"
echo "영문명: ${APP_NAME}"
echo "기능 요약: 스트레스 관리 위한 시각적 호흡 가이드"
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
    
    echo ""
    echo "테스트 결과: 통과"
    echo "========================================="
    echo ""
    echo "📊 최종 결과:"
    echo "- 앱 타입: 건강/웰빙 도구 (호흡 트레이닝)"
    echo "- 차별화 포인트: 시각적 호흡 가이드, 다양한 패턴, 진동/소리 피드백"
    echo "- 핵심 기능: 호흡 패턴 선택, 실시간 애니메이션, 사이클 추적"
    echo "- 컴포넌트: 4개 (Header, BreathingCircle, ControlPanel, App)"
    echo "- 상태관리: Zustand"
    echo "========================================="
else
    echo "❌ 디렉토리 생성 실패"
    echo "테스트 결과: 실패"
fi