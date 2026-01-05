#!/bin/bash
cd /home/tory/cronjob/frontApp/LittleCat/focus-zone-tracker-20260106_000001

echo "Installing dependencies..."
npm install

echo "Building project..."
npm run build

echo "Build complete!"
