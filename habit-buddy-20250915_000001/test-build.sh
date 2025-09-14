#!/bin/bash

echo "Starting Habit Buddy build test..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Try to build
echo "Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    exit 0
else
    echo "❌ Build failed!"
    exit 1
fi