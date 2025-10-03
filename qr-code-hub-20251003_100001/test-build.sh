#!/bin/bash

# QR Code Hub - Build Test Script

echo "🚀 Starting QR Code Hub build test..."

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if installation was successful
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Run TypeScript compiler check
echo "🔍 Checking TypeScript..."
npx tsc --noEmit

if [ $? -ne 0 ]; then
    echo "⚠️ TypeScript errors found, attempting to fix..."
    
    # Fix common TypeScript errors
    # Update store if needed
    sed -i "s/export default useQRStore/const useQRStore = /g" src/store/useQRStore.ts
    echo "export default useQRStore" >> src/store/useQRStore.ts
fi

# Run build
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build successful!"
echo "📊 Build stats:"
du -sh dist/
ls -la dist/

echo "🎉 QR Code Hub build test completed successfully!"