#!/bin/bash

cd /home/tory/cronjob/frontApp/LittleCat

# Add the chemistry app
git add chemistry-molecule-builder-20250925_150001/

# Commit with message
git commit -m "새로운 앱 생성: 화학 분자 빌더 (chemistry-molecule-builder) - 20250925_150001"

# Push to remote
git push

echo "Git operations completed for chemistry-molecule-builder"