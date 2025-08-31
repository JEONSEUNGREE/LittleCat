#!/bin/bash

echo "Posture Guard 앱 설정 시작..."

# npm 설치
echo "의존성 설치 중..."
npm install

# 빌드 테스트
echo "빌드 테스트 실행 중..."
npm run build

echo "설정 완료!"