#!/bin/bash

# Auto-commit script for Color Chain Reactor
cd /home/tory/cronjob/frontApp/LittleCat/color-chain-reactor-20250926_150001

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    git init
fi

# Add all files
git add .

# Create commit
git commit -m "새로운 앱 생성: 색상 연쇄 반응 (color-chain-reactor) - 20250926_150001"

# Try to push (will fail if no remote, but that's okay)
git push 2>/dev/null || echo "Local commit created successfully"

echo "✅ Color Chain Reactor app created and committed!"
echo "📁 Path: /home/tory/cronjob/frontApp/LittleCat/color-chain-reactor-20250926_150001"
echo "🎮 Type: Strategic color puzzle game"
echo "🚀 To run: cd to directory, npm install --legacy-peer-deps, npm run dev"