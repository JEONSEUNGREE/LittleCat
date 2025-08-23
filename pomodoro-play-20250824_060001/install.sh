#!/bin/bash

# Auto installation script for Pomodoro Play
echo "🎵 Pomodoro Play - 자동 설치 시작..."

# Install dependencies
echo "📦 패키지 설치 중..."
npm install --silent

# Build the project
echo "🔨 프로젝트 빌드 중..."
npm run build --silent

echo "✅ 설치 완료!"
echo "🚀 npm run dev 명령으로 앱을 실행하세요"