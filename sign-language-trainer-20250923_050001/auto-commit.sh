#!/bin/bash

# 디렉토리 이동
cd /home/tory/cronjob/frontApp/LittleCat/sign-language-trainer-20250923_050001

# Git 초기화 (이미 초기화되어 있으면 무시)
git init 2>/dev/null

# 모든 파일 추가
git add .

# 커밋 메시지 생성
COMMIT_MSG="새로운 앱 생성: 수화 언어 트레이너 (sign-language-trainer) - 20250923_050001"

# 커밋
git commit -m "$COMMIT_MSG" 2>/dev/null

# 원격 저장소 추가 (이미 있으면 무시)
git remote add origin https://github.com/username/sign-language-trainer.git 2>/dev/null

# 푸시 시도 (실패해도 무시)
git push origin main 2>/dev/null || git push origin master 2>/dev/null

echo "Git 작업 완료 (에러는 무시됨)"