#!/bin/bash

cd /home/tory/cronjob/frontApp/LittleCat/deep-focus-timer-20250903_150001

echo "Installing dependencies..."
npm install

echo "Running build..."
npm run build

echo "Build completed!"