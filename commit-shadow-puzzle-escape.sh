#!/bin/bash

# Shadow Puzzle Escape 커밋 스크립트
cd /home/tory/cronjob/frontApp/LittleCat/shadow-puzzle-escape-20250916_000001

echo "Committing Shadow Puzzle Escape project..."

# Git 초기화 (이미 있으면 무시)
git init 2>/dev/null

# 모든 파일 추가
git add .

# 커밋
git commit -m "새로운 앱 생성: 그림자 퍼즐 탈출 (shadow-puzzle-escape) - 20250916_000001

- 빛과 그림자를 조작하는 혁신적인 물리 기반 퍼즐 게임
- 터치 기반 인터랙티브 게임플레이
- 3개의 레벨과 힌트 시스템
- React + TypeScript + Tailwind CSS
"

echo "Shadow Puzzle Escape committed successfully!"