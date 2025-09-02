#!/bin/bash

echo "Testing Planet Jumper build process..."
echo "======================================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "⚠️  Warning: node_modules directory not found!"
    echo "   Dependencies need to be installed first."
    echo "   Run: npm install"
    echo ""
    exit 1
fi

echo "📦 Running build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build completed successfully!"
    echo ""
    echo "Build output should be in the 'dist' directory."
    ls -la dist/ 2>/dev/null || echo "Note: dist directory will be created after successful build"
else
    echo ""
    echo "❌ Build failed!"
    echo "Please check the error messages above."
    exit 1
fi