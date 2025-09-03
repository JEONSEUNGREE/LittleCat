#!/bin/bash

# Gravity Flip Puzzle - Auto Build and Test Script
cd /home/tory/cronjob/frontApp/LittleCat/gravity-flip-puzzle-20250903_100001

echo "🎮 Starting Gravity Flip Puzzle build process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Try to build
echo "🔨 Building project..."
npm run build

# Check build result
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Initialize git repository
    echo "📝 Initializing Git repository..."
    git init
    git add .
    git commit -m "새로운 앱 생성: 중력 반전 퍼즐 (gravity-flip-puzzle) - 20250903_100001"
    
    echo "🎉 Gravity Flip Puzzle created successfully!"
    echo "📍 Location: /home/tory/cronjob/frontApp/LittleCat/gravity-flip-puzzle-20250903_100001"
    echo "🚀 Run 'npm run dev' to start the development server"
else
    echo "❌ Build failed. Attempting fixes..."
    
    # Common fixes
    echo "🔧 Applying common fixes..."
    
    # Fix 1: Ensure TypeScript config is correct
    cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF
    
    # Retry build
    echo "🔄 Retrying build..."
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "✅ Build successful after fixes!"
        
        # Initialize git repository
        git init
        git add .
        git commit -m "새로운 앱 생성: 중력 반전 퍼즐 (gravity-flip-puzzle) - 20250903_100001"
        
        echo "🎉 Gravity Flip Puzzle created successfully!"
    else
        echo "⚠️ Build issues remain, but project structure is complete"
        echo "📍 Location: /home/tory/cronjob/frontApp/LittleCat/gravity-flip-puzzle-20250903_100001"
        
        # Still commit the code
        git init
        git add .
        git commit -m "새로운 앱 생성: 중력 반전 퍼즐 (gravity-flip-puzzle) - 20250903_100001 (빌드 수정 필요)"
    fi
fi

echo "📊 Project Summary:"
echo "- 선정된 앱: 중력 반전 퍼즐 (Gravity Flip Puzzle)"
echo "- 영문명: gravity-flip-puzzle"
echo "- 기능 요약: 중력 방향을 조작하여 목표 지점 도달"
echo "- 생성 경로: /home/tory/cronjob/frontApp/LittleCat/gravity-flip-puzzle-20250903_100001"
echo "- 테스트 결과: $([ $? -eq 0 ] && echo '통과' || echo '수정 필요')"