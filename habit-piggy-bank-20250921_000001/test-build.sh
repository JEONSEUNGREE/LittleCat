#!/bin/bash

echo "🚀 습관 저금통 앱 테스트 및 빌드 시작..."

# 디렉토리 이동
cd /home/tory/cronjob/frontApp/LittleCat/habit-piggy-bank-20250921_000001

# 의존성 설치
echo "📦 의존성 설치 중..."
npm install

# TypeScript 컴파일 테스트
echo "🔧 TypeScript 컴파일 테스트..."
npx tsc --noEmit

# 빌드 테스트
echo "🏗️ 프로덕션 빌드 테스트..."
npm run build

# 결과 확인
if [ $? -eq 0 ]; then
    echo "✅ 빌드 성공!"
    echo "📂 빌드 결과: ./dist"
    ls -la dist/
else
    echo "❌ 빌드 실패. 에러를 확인하세요."
    exit 1
fi

echo "🎉 모든 테스트 완료!"