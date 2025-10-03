#!/bin/bash

# Git initialization and commit script

cd /home/tory/cronjob/frontApp/LittleCat/qr-diary-vault-20251003_200001

echo "Git 초기화 중..."
git init

echo "파일 추가 중..."
git add .

echo "커밋 생성 중..."
git commit -m "새로운 앱 생성: QR 코드 일기장 (qr-diary-vault) - 20251003_200001"

echo "Git 작업 완료!"