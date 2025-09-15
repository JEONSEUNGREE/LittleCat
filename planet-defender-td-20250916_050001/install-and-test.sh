#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
npm install --legacy-peer-deps

# Run build test
echo "Testing build..."
npm run build

# Check if build succeeded
if [ $? -eq 0 ]; then
    echo "Build successful!"
else
    echo "Build failed, attempting to fix..."
    # Auto-fix common issues would go here
fi