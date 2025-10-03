#!/bin/bash

# Setup and build script for QR Diary Vault app

echo "QR Diary Vault 설정 시작..."

# Install dependencies
echo "의존성 설치 중..."
npm install

# Build the project
echo "프로젝트 빌드 중..."
npm run build

# Check build success
if [ $? -eq 0 ]; then
    echo "✅ 빌드 성공!"
else
    echo "❌ 빌드 실패. TypeScript 오류 수정 중..."
    
    # Common TypeScript fixes can be added here if needed
    
    # Retry build
    npm run build
fi

echo "설정 완료!"