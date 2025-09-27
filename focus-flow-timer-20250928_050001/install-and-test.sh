#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
npm install

# Check if install succeeded
if [ $? -ne 0 ]; then
    echo "NPM install failed, trying to fix..."
    rm -rf node_modules package-lock.json
    npm install
fi

# Run build test
echo "Testing build..."
npm run build

# Check build result
if [ $? -eq 0 ]; then
    echo "Build successful!"
    exit 0
else
    echo "Build failed, checking errors..."
    exit 1
fi