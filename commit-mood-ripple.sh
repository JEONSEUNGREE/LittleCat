#!/bin/bash

cd /home/tory/cronjob/frontApp/LittleCat

# Add and commit mood-ripple app
git add mood-ripple-20250909_200001/
git commit -m "새로운 앱 생성: 무드 리플 (mood-ripple) - 20250909_200001"

# Show status
git status

echo "Mood Ripple app committed successfully!"