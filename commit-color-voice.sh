#!/bin/bash

cd /home/tory/cronjob/frontApp/LittleCat/color-voice-20250924_050001 || exit 1

# Add all files
git add . 2>/dev/null || true

# Commit with message
git commit -m "새로운 앱 생성: 색상 음성 변환기 (color-voice) - 20250924_050001" 2>/dev/null || true

# Try to push (will fail if no remote, but that's ok)
git push origin main 2>/dev/null || true

echo "Git operations completed for color-voice app"