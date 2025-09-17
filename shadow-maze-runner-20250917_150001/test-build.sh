#!/bin/bash

echo "🎮 Shadow Maze Runner - Build Test Script"
echo "========================================="

# Navigate to project directory
cd "$(dirname "$0")"

echo "📦 Installing dependencies..."
npm install --silent

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "🔨 Running build test..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "🎉 Shadow Maze Runner is ready to play!"
    exit 0
else
    echo "❌ Build failed. Attempting to fix common issues..."
    
    # Common fixes
    echo "🔧 Attempting auto-fix..."
    
    # Try to rebuild
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "✅ Build successful after fixes!"
        exit 0
    else
        echo "❌ Build still failing. Manual intervention may be required."
        exit 1
    fi
fi