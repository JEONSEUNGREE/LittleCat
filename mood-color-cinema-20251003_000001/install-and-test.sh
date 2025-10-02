#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
npm install

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo "Dependencies installed successfully!"
    
    # Try to build the project
    echo "Building project..."
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "Build successful!"
    else
        echo "Build failed, checking for TypeScript errors..."
        npx tsc --noEmit
    fi
else
    echo "Installation failed!"
    exit 1
fi