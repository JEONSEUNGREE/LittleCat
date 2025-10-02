#!/bin/bash

# Posture Mirror App Initialization Script
echo "🚀 Initializing Posture Mirror App..."

# Navigate to project directory
cd /home/tory/cronjob/frontApp/LittleCat/posture-mirror-20251002_200001

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build succeeded
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Initialize git repository
    echo "📝 Initializing git repository..."
    git init
    git add .
    git commit -m "새로운 앱 생성: 자세 거울 (posture-mirror) - 20251002_200001"
    
    echo "🎉 Posture Mirror app created successfully!"
    echo "📁 Location: /home/tory/cronjob/frontApp/LittleCat/posture-mirror-20251002_200001"
    echo "🚀 Run 'npm run dev' to start the development server"
else
    echo "❌ Build failed. Attempting fixes..."
    
    # Common fixes
    echo "🔧 Attempting automatic fixes..."
    
    # Try to fix common TypeScript errors
    npm run build 2>&1 | grep -E "error TS" | head -5
    
    echo "⚠️ Manual intervention may be required"
fi

echo "------------------------"
echo "앱 정보:"
echo "- 선정된 앱: 자세 거울"
echo "- 영문명: posture-mirror"
echo "- 기능 요약: 실시간 자세 분석 및 교정 가이드"
echo "- 생성 경로: /home/tory/cronjob/frontApp/LittleCat/posture-mirror-20251002_200001"
echo "------------------------"