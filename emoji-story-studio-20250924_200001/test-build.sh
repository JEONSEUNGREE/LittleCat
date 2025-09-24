#!/bin/bash

echo "🚀 Testing Emoji Story Studio build..."
cd /home/tory/cronjob/frontApp/LittleCat/emoji-story-studio-20250924_200001

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Test build
echo "🔨 Building project..."
npm run build

# Check if build successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    exit 0
else
    echo "❌ Build failed, attempting to fix..."
    exit 1
fi