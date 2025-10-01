#!/bin/bash

cd /home/tory/cronjob/frontApp/LittleCat/quantum-jump-runner-20251001_100001

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    git init
fi

# Add all files
git add .

# Create commit
git commit -m "새로운 앱 생성: 양자 점프 러너 (quantum-jump-runner) - 20251001_100001

양자 중첩 상태를 활용한 혁신적인 러닝 게임
- 양자 점프 메커니즘: 동시에 여러 위치에 확률적으로 존재
- 반응형 모바일 우선 디자인
- 터치 및 키보드 컨트롤 지원
- 점진적 난이도 증가 시스템"

# Try to push (will fail if no remote, but that's okay)
git push origin main 2>/dev/null || echo "로컬 저장소에 커밋 완료 (원격 저장소 설정 안 됨)"

echo "✅ Git 작업 완료!"