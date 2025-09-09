#!/bin/bash

# Navigate to project directory
cd "$(dirname "$0")"

# Install dependencies
echo "Installing dependencies..."
npm install --loglevel error

# Run build test
echo "Testing build..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build successful!"
    exit 0
else
    echo "Build failed, attempting to fix..."
    exit 1
fi