#!/bin/bash

echo "Setting up Planet Defender project..."

# Install dependencies
echo "Installing dependencies..."
npm install --legacy-peer-deps

# Test build
echo "Testing build..."
npm run build

# Check if build succeeded
if [ $? -eq 0 ]; then
    echo "Build successful!"
else
    echo "Build failed, attempting to fix..."
    
    # Common fixes
    npm install --force
    npm run build
fi

echo "Setup complete!"