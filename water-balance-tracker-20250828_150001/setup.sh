#!/bin/bash

# Water Balance Tracker Setup Script

echo "🚀 Setting up Water Balance Tracker..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Test build
echo "🔨 Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Fixing issues..."
    # Auto-fix common issues
    npm install --force
    npm run build
fi

echo "🎉 Setup complete! Run 'npm run dev' to start the app."