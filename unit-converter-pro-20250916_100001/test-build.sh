#!/bin/bash

echo "Unit Converter Pro - Build Test Script"
echo "======================================="

# Navigate to project directory
cd /home/tory/cronjob/frontApp/LittleCat/unit-converter-pro-20250916_100001

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found"
    exit 1
fi

echo "✅ Project structure validated"

# Install dependencies (if not already installed)
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Error: Failed to install dependencies"
        exit 1
    fi
fi

echo "✅ Dependencies installed"

# Run TypeScript compilation check
echo "🔍 Checking TypeScript compilation..."
npx tsc --noEmit
if [ $? -ne 0 ]; then
    echo "⚠️ TypeScript errors detected (non-blocking)"
fi

# Run build
echo "🛠️ Building project..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Error: Build failed"
    exit 1
fi

echo "✅ Build successful!"
echo ""
echo "Project Summary:"
echo "- Name: Unit Converter Pro"
echo "- Directory: unit-converter-pro-20250916_100001"
echo "- Features: 8 unit categories, real-time conversion, history tracking"
echo "- Path: /home/tory/cronjob/frontApp/LittleCat/unit-converter-pro-20250916_100001"
echo ""
echo "To run the app: cd unit-converter-pro-20250916_100001 && npm run dev"