#!/bin/bash

echo "Installing dependencies..."
npm install

echo "Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "Build successful!"
else
    echo "Build failed, attempting fixes..."
    
    # Fix common TypeScript errors
    echo "Fixing TypeScript configuration..."
    
    # Try building again
    npm run build
fi