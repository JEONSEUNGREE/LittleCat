#!/bin/bash

echo "📊 Math Formula Visualizer Setup"
echo "================================"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

# Test if build was successful
if [ -d "dist" ]; then
    echo "✅ Build successful!"
    echo "📁 Build output in: dist/"
else
    echo "❌ Build failed"
    exit 1
fi

echo ""
echo "🚀 To run the development server:"
echo "   npm run dev"
echo ""
echo "🌐 The app will be available at:"
echo "   http://localhost:5173"