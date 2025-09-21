#!/bin/bash

cd /home/tory/cronjob/frontApp/LittleCat

# Git operations
git add shadow-maze-runner-20250921_150001/
git commit -m "새로운 앱 생성: 그림자 미로 러너 (shadow-maze-runner) - 20250921_150001

- 빛과 그림자를 이용한 퍼즐 게임
- 그림자로 숨겨진 길을 찾아 미로 탈출
- 보너스 포인트를 위한 그림자 구슬 수집
- 레벨 시스템과 점수 추적 기능
- 모바일 우선 반응형 디자인"

# Push 시도 (실패해도 계속 진행)
git push origin main 2>/dev/null || echo "Git push skipped (no remote or auth issues)"

echo "Shadow Maze Runner app created and committed successfully!"