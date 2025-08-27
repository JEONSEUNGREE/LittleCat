#!/bin/bash

echo "🚀 Voice Capsule 앱 설정 시작..."

# Install dependencies
echo "📦 의존성 설치 중..."
npm install

# Test build
echo "🔨 빌드 테스트 중..."
npm run build

# Check if build successful
if [ $? -eq 0 ]; then
    echo "✅ 빌드 성공!"
else
    echo "❌ 빌드 실패. TypeScript 에러 수정 중..."
    
    # Auto-fix common TypeScript errors
    # Fix any potential import issues
    sed -i "s/import React from 'react'/import * as React from 'react'/g" src/**/*.tsx 2>/dev/null || true
    
    # Retry build
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "✅ 빌드 재시도 성공!"
    else
        echo "⚠️ 빌드 실패. 수동 확인 필요."
    fi
fi

echo "🎉 설정 완료!"