#!/bin/bash
cd /home/tory/cronjob/frontApp/LittleCat/color-palette-extractor-20250926_100001
echo "Testing Color Palette Extractor build..."
npm install
npm run build
echo "Build test completed"