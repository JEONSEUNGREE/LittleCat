#!/bin/bash

echo "Testing Mood Echo App Build..."
echo "================================"

cd /home/tory/cronjob/frontApp/LittleCat/mood-echo-20250825_030001

# Install dependencies
echo "Installing dependencies..."
npm install

# Test TypeScript compilation
echo "Testing TypeScript compilation..."
npx tsc --noEmit

# Run build
echo "Running production build..."
npm run build

# Check if build was successful
if [ -d "dist" ]; then
    echo "✅ Build successful! Distribution folder created."
    ls -la dist/
else
    echo "❌ Build failed! No distribution folder found."
    exit 1
fi

echo "================================"
echo "Build test completed successfully!"