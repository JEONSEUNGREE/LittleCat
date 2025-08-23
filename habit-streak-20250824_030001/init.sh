#!/bin/bash

# Auto App Generator - Initialization Script
echo "🚀 Initializing Habit Streak Tracker..."

# Navigate to project directory
cd /home/tory/cronjob/frontApp/LittleCat/habit-streak-20250824_030001

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    git init
    echo "✅ Git initialized"
fi

# Add all files
git add .
echo "✅ Files staged"

# Create commit
git commit -m "새로운 앱 생성: 습관 스트릭 트래커 (habit-streak) - 20250824_030001" 2>/dev/null || echo "⚠️ Commit skipped (no changes or already committed)"

# Try to push (will fail if no remote)
git push 2>/dev/null || echo "ℹ️ Push skipped (no remote configured)"

echo "✨ Project initialization complete!"
echo ""
echo "📱 App Details:"
echo "- Name: Habit Streak Tracker"
echo "- Directory: habit-streak-20250824_030001"
echo "- Features: Gamified habit tracking with streaks"
echo "- Path: /home/tory/cronjob/frontApp/LittleCat/habit-streak-20250824_030001"
echo ""
echo "To run the app:"
echo "1. cd /home/tory/cronjob/frontApp/LittleCat/habit-streak-20250824_030001"
echo "2. npm install"
echo "3. npm run dev"