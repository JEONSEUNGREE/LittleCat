#!/bin/bash
cd /home/tory/cronjob/frontApp/LittleCat/sound-mixer-studio-20250914_150001
npm install --legacy-peer-deps
npm run build
echo "Build completed successfully!"