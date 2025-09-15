#!/bin/bash

# Shadow Puzzle Escape Setup Script
echo "Setting up Shadow Puzzle Escape..."

# Install dependencies
echo "Installing dependencies..."
npm install --legacy-peer-deps

# Test build
echo "Testing build..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build successful!"
    exit 0
else
    echo "Build failed, attempting to fix..."
    
    # Common fixes
    echo "Attempting common fixes..."
    
    # Fix TypeScript errors if any
    npm install --save-dev @types/node
    
    # Retry build
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "Build successful after fixes!"
        exit 0
    else
        echo "Build still failing. Manual intervention may be required."
        exit 1
    fi
fi