#!/bin/bash

# Auto commit for emoji-story-maker app
cd /home/tory/cronjob/frontApp/LittleCat/

# Add the new app directory
git add emoji-story-maker-20250926_000001/

# Commit with descriptive message
git commit -m "새로운 앱 생성: 이모지 스토리 메이커 (emoji-story-maker) - 20250926_000001

- 이모지만으로 창의적인 스토리 생성
- 시각적 스토리텔링 엔터테인먼트 앱
- Vite + React + TypeScript + Tailwind CSS"

# Push to remote
git push origin main

echo "✅ Commit and push completed for emoji-story-maker"