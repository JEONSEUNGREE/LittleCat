#!/bin/bash

# Deep Focus Timer - Auto Build & Test Script
# Generated on 20250903_150001

APP_DIR="/home/tory/cronjob/frontApp/LittleCat/deep-focus-timer-20250903_150001"
APP_NAME="Deep Focus Timer"
APP_NAME_EN="deep-focus-timer"

echo "================================"
echo "Building: $APP_NAME"
echo "Path: $APP_DIR"
echo "================================"

cd "$APP_DIR"

# Install dependencies
echo "Installing dependencies..."
npm install 2>&1 | tail -n 20

# Run build test
echo "Testing build..."
npm run build 2>&1 | tail -n 30

# Check if build succeeded
if [ -d "dist" ]; then
    echo "✅ Build successful!"
    echo "Files in dist:"
    ls -la dist/ 2>/dev/null | head -n 10
else
    echo "❌ Build failed - no dist directory found"
fi

# Initialize git repository
echo "Initializing Git repository..."
git init
git add .
git commit -m "새로운 앱 생성: $APP_NAME ($APP_NAME_EN) - 20250903_150001"

echo "================================"
echo "Results:"
echo "- App: $APP_NAME"
echo "- English: $APP_NAME_EN"
echo "- Feature: AI-powered focus time optimization"
echo "- Path: $APP_DIR"
echo "- Test: Completed"
echo "================================"