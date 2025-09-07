#!/bin/bash

echo "QR Note Hub 프로젝트 검증 스크립트"
echo "================================="
echo ""

# 색상 정의
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 필수 파일 체크
echo "📁 필수 파일 체크:"
required_files=(
  "package.json"
  "vite.config.ts"
  "tsconfig.json"
  "tsconfig.node.json"
  "tailwind.config.js"
  "postcss.config.js"
  "index.html"
  "src/main.tsx"
  "src/App.tsx"
  "src/index.css"
  "src/vite-env.d.ts"
  "src/store/qrStore.ts"
  "src/components/Header.tsx"
  "src/components/QRGenerator.tsx"
  "src/components/QRHistory.tsx"
)

all_files_exist=true
for file in "${required_files[@]}"; do
  if [ -f "$file" ]; then
    echo -e "  ${GREEN}✓${NC} $file"
  else
    echo -e "  ${RED}✗${NC} $file - 파일 없음"
    all_files_exist=false
  fi
done

echo ""
echo "📊 프로젝트 통계:"
echo "  - TypeScript 파일: $(find src -name "*.tsx" -o -name "*.ts" | wc -l)개"
echo "  - 컴포넌트: $(find src/components -name "*.tsx" | wc -l)개"
echo "  - 총 코드 라인: $(find src -name "*.tsx" -o -name "*.ts" | xargs wc -l | tail -1 | awk '{print $1}')줄"

echo ""
echo "🎨 기능 요약:"
echo "  - QR 코드 타입: 텍스트, URL, WiFi, 이메일, 전화"
echo "  - 히스토리 관리 (최대 50개 저장)"
echo "  - 색상 커스터마이징"
echo "  - 다운로드 및 복사 기능"
echo "  - 반응형 디자인 (모바일 우선)"

echo ""
if [ "$all_files_exist" = true ]; then
  echo -e "${GREEN}✅ 프로젝트 구조 검증 완료!${NC}"
  echo ""
  echo "다음 명령어로 실행할 수 있습니다:"
  echo "  npm install  # 의존성 설치"
  echo "  npm run dev  # 개발 서버 실행"
  echo "  npm run build  # 프로덕션 빌드"
else
  echo -e "${RED}❌ 일부 파일이 누락되었습니다!${NC}"
fi