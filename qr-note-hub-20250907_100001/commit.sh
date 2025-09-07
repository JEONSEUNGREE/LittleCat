#!/bin/bash

echo "QR Note Hub Git 커밋 스크립트"
echo "============================"

# Git 작업 수행
cd /home/tory/cronjob/frontApp/LittleCat

# 현재 디렉토리를 git에 추가
git add qr-note-hub-20250907_100001/

# 커밋 메시지 작성
COMMIT_MSG="새로운 앱 생성: QR 노트 허브 (qr-note-hub) - 20250907_100001

기능:
- 5가지 QR 코드 타입 지원 (텍스트, URL, WiFi, 이메일, 전화)
- 히스토리 관리 (최대 50개 저장, 로컬 스토리지)
- QR 코드 색상 커스터마이징
- 다운로드, 복사, 검색 기능
- 반응형 모바일 우선 디자인

기술 스택:
- Vite + React 18 + TypeScript
- Tailwind CSS + CSS Modules
- Zustand (상태 관리)
- Lucide React (아이콘)
- qrcode 라이브러리"

# 커밋 실행
git commit -m "$COMMIT_MSG"

# 푸시 시도
git push origin main 2>&1

echo ""
echo "✅ Git 작업 완료!"