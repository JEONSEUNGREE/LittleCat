#!/bin/bash

# Auto deployment script for Fortune Cookie Maker
APP_NAME="포춘 쿠키 메이커"
APP_NAME_EN="fortune-cookie-maker"
APP_DIR="/home/tory/cronjob/frontApp/LittleCat/fortune-cookie-maker-20250929_000001"

echo "🍪 Automated deployment for $APP_NAME ($APP_NAME_EN)"
echo "📍 Directory: $APP_DIR"

cd "$APP_DIR"

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    echo "📝 Initializing git repository..."
    git init
    git add .
    git commit -m "새로운 앱 생성: $APP_NAME ($APP_NAME_EN) - 20250929_000001"
    echo "✅ Git initialized and committed"
else
    echo "✅ Git already initialized"
fi

# Create package verification
echo "📦 Package.json verification:"
if [ -f "package.json" ]; then
    echo "✅ package.json exists"
else
    echo "❌ package.json missing"
fi

# Verify all critical files
echo "📂 File structure verification:"
[ -f "vite.config.ts" ] && echo "✅ vite.config.ts" || echo "❌ vite.config.ts"
[ -f "tsconfig.json" ] && echo "✅ tsconfig.json" || echo "❌ tsconfig.json"
[ -f "index.html" ] && echo "✅ index.html" || echo "❌ index.html"
[ -d "src" ] && echo "✅ src directory" || echo "❌ src directory"
[ -f "src/App.tsx" ] && echo "✅ src/App.tsx" || echo "❌ src/App.tsx"

echo "
🎉 Deployment complete!
📱 App: $APP_NAME
🔧 Tech Stack: Vite + React + TypeScript + Tailwind CSS
📍 Location: $APP_DIR
🚀 To run: cd $APP_DIR && npm install && npm run dev
"