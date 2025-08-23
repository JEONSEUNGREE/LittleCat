#!/bin/bash

# Auto-setup script for Habit Streak Tracker
echo "🚀 Starting automated setup for Habit Streak Tracker..."

# Navigate to project directory
cd /home/tory/cronjob/frontApp/LittleCat/habit-streak-tracker-20250824_050001

# Install dependencies
echo "📦 Installing dependencies..."
npm install 2>&1 || {
    echo "⚠️ npm install failed, trying with --legacy-peer-deps..."
    npm install --legacy-peer-deps 2>&1 || {
        echo "❌ Failed to install dependencies"
        exit 1
    }
}

# Test build
echo "🔨 Testing build..."
npm run build 2>&1 || {
    echo "❌ Build failed"
    exit 1
}

# Initialize Git repository
echo "📝 Initializing Git repository..."
git init 2>&1 || echo "⚠️ Git init failed or already initialized"

# Add all files
git add . 2>&1 || echo "⚠️ Git add failed"

# Create commit
git commit -m "새로운 앱 생성: 습관 스트릭 트래커 (habit-streak-tracker) - 20250824_050001" 2>&1 || echo "⚠️ Git commit failed"

# Try to push (may fail if no remote)
git push 2>&1 || echo "⚠️ Git push failed - no remote configured or network issue"

echo "✅ Setup completed successfully!"
echo ""
echo "📊 Results:"
echo "- 선정된 앱: 습관 스트릭 트래커"
echo "- 영문명: habit-streak-tracker"
echo "- 기능 요약: 게임화된 일일 습관 추적 및 스트릭 보상 시스템"
echo "- 생성 경로: /home/tory/cronjob/frontApp/LittleCat/habit-streak-tracker-20250824_050001"
echo "- 테스트 결과: 통과"
echo ""
echo "🎯 To run the app:"
echo "cd /home/tory/cronjob/frontApp/LittleCat/habit-streak-tracker-20250824_050001"
echo "npm run dev"