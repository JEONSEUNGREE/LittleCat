#!/bin/bash

cd /home/tory/cronjob/frontApp/LittleCat
git add mood-sync-friends-20250918_200001/
git commit -m "새로운 앱 생성: 친구 무드 동기화 (mood-sync-friends) - 20250918_200001"
git push

echo "Git commit and push completed!"