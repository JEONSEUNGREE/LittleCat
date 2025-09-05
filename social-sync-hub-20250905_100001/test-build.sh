#!/bin/bash
echo "Testing Social Sync Hub build..."
cd /home/tory/cronjob/frontApp/LittleCat/social-sync-hub-20250905_100001
npm install --silent
npm run build
echo "Build test completed!"