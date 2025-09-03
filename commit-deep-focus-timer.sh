#!/bin/bash

cd /home/tory/cronjob/frontApp/LittleCat/
git add deep-focus-timer-20250903_150001/
git commit -m "새로운 앱 생성: 딥 포커스 타이머 (deep-focus-timer) - 20250903_150001"
git push origin main 2>/dev/null || echo "Git push skipped (no remote configured)"