#!/bin/bash

echo "🚀 Auto-commit for Spending DNA Analyzer"
echo "========================================="

# Navigate to project directory
cd /home/tory/cronjob/frontApp/LittleCat/spending-dna-analyzer-20250929_150001

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
fi

# Add all files
echo "➕ Adding files to git..."
git add .

# Commit with descriptive message
echo "💾 Creating commit..."
git commit -m "새로운 앱 생성: 지출 습관 DNA 분석기 (spending-dna-analyzer) - 20250929_150001

✨ Features:
- AI 기반 지출 패턴 DNA 분석
- 개인 소비 성격 프로파일링
- 실시간 거래 추적 및 분석
- 재무 목표 설정 및 관리
- 반응형 모바일 최적화 디자인

🎯 Tech Stack:
- Vite + React 18 + TypeScript
- Tailwind CSS for styling
- Zustand for state management
- Lucide React for icons

📱 Fully responsive mobile-first design"

# Try to push (may fail if remote not set)
echo "📤 Attempting to push to remote..."
git push origin main 2>/dev/null || echo "ℹ️  Remote not configured, changes saved locally"

echo "========================================="
echo "✅ Auto-commit completed!"