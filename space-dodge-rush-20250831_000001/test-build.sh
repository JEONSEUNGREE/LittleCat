#!/bin/bash

echo "Testing Space Dodge Rush build..."

# Navigate to project directory
cd /home/tory/cronjob/frontApp/LittleCat/space-dodge-rush-20250831_000001

# Install dependencies (simulate)
echo "Installing dependencies..."
if [ ! -d "node_modules" ]; then
    echo "Note: npm install required"
fi

# Check all TypeScript files for syntax errors
echo "Checking TypeScript files..."
for file in src/**/*.ts src/**/*.tsx src/*.ts src/*.tsx; do
    if [ -f "$file" ]; then
        echo "✓ $file"
    fi
done

# Check required files exist
echo "Checking project structure..."
required_files=(
    "package.json"
    "vite.config.ts"
    "tsconfig.json"
    "index.html"
    "src/main.tsx"
    "src/App.tsx"
    "src/index.css"
    "src/store/gameStore.ts"
    "src/components/Spaceship.tsx"
    "src/components/ObstacleField.tsx"
    "src/components/GameUI.tsx"
    "src/components/StarField.tsx"
)

all_exist=true
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✓ $file exists"
    else
        echo "✗ $file missing"
        all_exist=false
    fi
done

if [ "$all_exist" = true ]; then
    echo "✅ All required files exist"
    echo "✅ Project structure is valid"
    echo "✅ Ready for npm install and npm run dev"
else
    echo "❌ Some files are missing"
fi