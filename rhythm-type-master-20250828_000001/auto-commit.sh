#!/bin/bash

cd "$(dirname "$0")"

echo "Initializing Git repository..."
git init

echo "Adding all files..."
git add .

echo "Creating commit..."
git commit -m "새로운 앱 생성: 리듬 타입 마스터 (rhythm-type-master) - 20250828_000001

- 리듬과 타이핑을 결합한 혁신적인 게임 앱
- 떨어지는 단어를 비트에 맞춰 타이핑
- 난이도별 4가지 모드 제공 (Easy, Medium, Hard, Extreme)
- 콤보 시스템과 점수 시스템
- 반응형 모바일 최적화 디자인
- Vite + React + TypeScript + Tailwind CSS"

echo "Attempting to push to remote..."
git push origin main 2>/dev/null || echo "Remote push skipped (no remote configured)"

echo "✅ Git operations completed!"