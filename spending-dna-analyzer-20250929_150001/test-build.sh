#!/bin/bash

echo "🚀 Starting build test for Spending DNA Analyzer..."
echo "================================================"

# Navigate to project directory
cd /home/tory/cronjob/frontApp/LittleCat/spending-dna-analyzer-20250929_150001

# Install dependencies
echo "📦 Installing dependencies..."
npm install --silent 2>&1

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Run build
echo "🔨 Building project..."
npm run build 2>&1

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build completed successfully"
echo "================================================"
echo "🎉 All tests passed!"