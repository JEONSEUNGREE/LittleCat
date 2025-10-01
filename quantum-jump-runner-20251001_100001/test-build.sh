#!/bin/bash

cd /home/tory/cronjob/frontApp/LittleCat/quantum-jump-runner-20251001_100001

echo "🚀 Testing Quantum Jump Runner Build..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install --silent 2>&1

# Run TypeScript check
echo "🔍 Checking TypeScript..."
npx tsc --noEmit 2>&1 || true

# Try to build
echo "🏗️ Building project..."
npm run build 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    exit 0
else
    echo "❌ Build failed!"
    exit 1
fi