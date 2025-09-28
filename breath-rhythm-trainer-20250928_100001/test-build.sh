#!/bin/bash

echo "Testing Breath Rhythm Trainer Build..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Run TypeScript check
echo "Checking TypeScript..."
npx tsc --noEmit

# Run build
echo "Running build..."
npm run build

# Check if build was successful
if [ -d "dist" ]; then
    echo "✅ Build successful!"
    ls -la dist/
else
    echo "❌ Build failed!"
    exit 1
fi