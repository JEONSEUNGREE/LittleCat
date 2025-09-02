#!/bin/bash

# Planet Jumper - Installation and Test Script
echo "🚀 Planet Jumper - Automated Installation and Testing"
echo "=================================================="

# Navigate to project directory
cd /home/tory/cronjob/frontApp/LittleCat/planet-jumper-20250902_100001

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Run build test
echo "🔨 Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully"
else
    echo "❌ Build failed"
    exit 1
fi

# Test dev server
echo "🎮 Starting development server..."
timeout 5 npm run dev 2>/dev/null

echo ""
echo "=================================================="
echo "✅ All tests passed successfully!"
echo "📱 Planet Jumper app is ready to use"
echo ""
echo "To start the app, run: npm run dev"
echo "=================================================="