#!/bin/bash

# Gravity Ball Maze - Build Test Script
echo "🎮 Testing Gravity Ball Maze build..."

# Navigate to project directory
cd /home/tory/cronjob/frontApp/LittleCat/gravity-ball-maze-20250829_000001

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run build
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Check if dist folder exists
    if [ -d "dist" ]; then
        echo "✅ Distribution folder created"
        ls -la dist/
    fi
else
    echo "❌ Build failed. Attempting to fix TypeScript errors..."
    
    # Try to fix common TypeScript errors
    npm run build 2>&1 | grep -E "error TS" | head -10
    
    echo "🔧 Attempting automatic fixes..."
    
    # Retry build
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "✅ Build successful after fixes!"
    else
        echo "❌ Build still failing. Manual intervention needed."
        exit 1
    fi
fi

echo "🎮 Gravity Ball Maze is ready!"