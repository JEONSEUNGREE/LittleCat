#!/bin/bash

echo "Setting up Git repository for Unit Converter Pro"
echo "================================================"

cd /home/tory/cronjob/frontApp/LittleCat/unit-converter-pro-20250916_100001

# Initialize git repository
git init

# Add all files
git add .

# Create commit
git commit -m "새로운 앱 생성: 유닛 컨버터 프로 (unit-converter-pro) - 20250916_100001

- 8가지 단위 변환 카테고리 지원 (길이, 무게, 온도, 부피, 면적, 속도, 시간, 데이터)
- 실시간 단위 변환
- 변환 히스토리 추적
- 즐겨찾기 기능
- 반응형 모바일 우선 디자인
- 다크 모드 지원
- Vite + React 18 + TypeScript + Tailwind CSS"

# Try to push (will fail if no remote configured)
git push 2>/dev/null || echo "Note: Remote repository not configured. Commit saved locally."

echo ""
echo "✅ Git repository initialized and committed successfully!"
echo "   Repository: unit-converter-pro-20250916_100001"
echo "   Status: Local commit created"