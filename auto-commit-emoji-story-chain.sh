#!/bin/bash

# Auto-commit script for emoji-story-chain app
cd /home/tory/cronjob/frontApp/LittleCat
git add emoji-story-chain-20250928_200001
git commit -m "새로운 앱 생성: 이모지 스토리 체인 (emoji-story-chain) - 20250928_200001"
git push origin main