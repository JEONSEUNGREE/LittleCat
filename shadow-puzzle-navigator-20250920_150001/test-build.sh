#!/bin/bash

echo "Testing Shadow Puzzle Navigator build..."

# Navigate to project directory
cd /home/tory/cronjob/frontApp/LittleCat/shadow-puzzle-navigator-20250920_150001

# Install dependencies
echo "Installing dependencies..."
npm install

# Test TypeScript compilation
echo "Running TypeScript check..."
npx tsc --noEmit

# Run build
echo "Running build..."
npm run build

# Check if build succeeded
if [ $? -eq 0 ]; then
    echo "Build successful!"
    exit 0
else
    echo "Build failed!"
    exit 1
fi