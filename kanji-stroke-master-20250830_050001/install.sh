#!/bin/bash

echo "Setting up Kanji Stroke Master..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "Run 'npm run dev' to start the development server"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi