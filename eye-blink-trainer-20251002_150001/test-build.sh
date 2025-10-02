#!/bin/bash

# Test build script for Eye Blink Trainer app

echo "Testing Eye Blink Trainer build..."
cd /home/tory/cronjob/frontApp/LittleCat/eye-blink-trainer-20251002_150001

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed"
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install --silent

# Check TypeScript
echo "Checking TypeScript..."
npx tsc --noEmit

# Try to build
echo "Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed"
    exit 1
fi