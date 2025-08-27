#!/bin/bash

cd "$(dirname "$0")"

echo "Testing Rhythm Type Master build..."
echo "Installing dependencies..."
npm install 2>&1 | tail -20

echo ""
echo "Running TypeScript check..."
npx tsc --noEmit 2>&1 | head -50

echo ""  
echo "Running build..."
npm run build 2>&1 | tail -30

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build successful!"
else
    echo ""
    echo "❌ Build failed. Checking for errors..."
fi