#!/bin/bash

echo "Building Energy Optimizer App..."
echo "================================"

# Install dependencies
echo "Installing dependencies..."
npm install --legacy-peer-deps

# Run build
echo "Building the app..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Checking for TypeScript errors..."
    
    # Try to fix common issues
    echo "Attempting to fix common issues..."
    
    # Install missing types if needed
    npm install --save-dev @types/node --legacy-peer-deps
    
    # Retry build
    echo "Retrying build..."
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "✅ Build successful after fixes!"
    else
        echo "❌ Build still failing. Manual intervention needed."
        exit 1
    fi
fi

echo "================================"
echo "Build process complete!"