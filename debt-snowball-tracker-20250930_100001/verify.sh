#!/bin/bash

echo "=== Debt Snowball Tracker 프로젝트 검증 ==="
echo ""

# 필수 파일 체크
echo "📁 필수 파일 체크:"
files=(
  "package.json"
  "vite.config.ts"
  "tsconfig.json"
  "index.html"
  "src/main.tsx"
  "src/App.tsx"
  "src/store/useDebtStore.ts"
  "src/components/DebtCard.tsx"
  "src/components/StatsCard.tsx"
  "src/components/AddDebtModal.tsx"
  "src/components/PaymentModal.tsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ $file (누락)"
  fi
done

echo ""
echo "📊 프로젝트 통계:"
echo "  - TypeScript 파일: $(find src -name "*.tsx" -o -name "*.ts" | wc -l)개"
echo "  - 컴포넌트: $(find src/components -name "*.tsx" | wc -l)개"
echo "  - 총 코드 라인: $(find src -name "*.tsx" -o -name "*.ts" | xargs wc -l | tail -1 | awk '{print $1}')줄"

echo ""
echo "✨ 프로젝트 구조 검증 완료!"