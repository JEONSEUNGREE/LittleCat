#!/bin/bash

echo "Testing Memory Color Puzzle Build..."

# Navigate to project directory
cd /home/tory/cronjob/frontApp/LittleCat/memory-color-puzzle-20250925_200001

# Install dependencies
echo "Installing dependencies..."
npm install

# Test TypeScript compilation
echo "Testing TypeScript compilation..."
npx tsc --noEmit

# Build the project
echo "Building the project..."
npm run build

echo "Build test complete!"