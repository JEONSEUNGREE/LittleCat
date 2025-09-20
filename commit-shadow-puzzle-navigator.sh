#!/bin/bash

echo "Committing Shadow Puzzle Navigator..."

# Add the new app directory
git add shadow-puzzle-navigator-20250920_150001/

# Commit with descriptive message
git commit -m "새로운 앱 생성: 그림자 퍼즐 네비게이터 (shadow-puzzle-navigator) - 20250920_150001

- 빛과 그림자를 활용한 독창적 퍼즐 게임
- 빛의 각도와 위치를 조절하여 목표 그림자 모양 생성
- React + TypeScript + Tailwind CSS로 구현
- 모바일 우선 반응형 디자인 적용
- 3개 레벨과 점진적 난이도 구현"

# Push to remote
git push origin main

echo "Commit completed!"