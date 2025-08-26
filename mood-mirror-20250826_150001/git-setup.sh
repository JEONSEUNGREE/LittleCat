#!/bin/bash

# Git setup script for Mood Mirror app

echo "Setting up Git repository..."
echo "============================="

# Initialize Git
git init

# Add all files
git add .

# Create initial commit
git commit -m "새로운 앱 생성: Mood Mirror (mood-mirror) - 20250826_150001

- 감정 공유 소셜 네트워크 앱
- 감정을 색상과 패턴으로 시각화
- 비슷한 감정 상태의 사용자와 자동 매칭
- 익명 감정 지원 메시지 기능
- React 18 + TypeScript + Tailwind CSS + Zustand"

# Try to push (will fail if remote not configured, but that's ok)
git push 2>/dev/null || echo "Remote repository not configured. Saved locally."

echo "============================="
echo "Git setup completed!"