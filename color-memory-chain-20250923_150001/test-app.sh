#!/bin/bash

# Test script for Color Memory Chain app

echo "🎮 Testing Color Memory Chain App..."
echo "================================"

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found!"
    exit 1
fi
echo "✅ package.json exists"

# Check if main files exist
files=(
    "index.html"
    "vite.config.ts"
    "tailwind.config.js"
    "src/main.tsx"
    "src/App.tsx"
    "src/index.css"
    "src/store/gameStore.ts"
    "src/components/Header.tsx"
    "src/components/GameBoard.tsx"
    "src/components/Controls.tsx"
)

for file in "${files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ $file not found!"
        exit 1
    fi
    echo "✅ $file exists"
done

echo ""
echo "🎉 All files validated successfully!"
echo "================================"
echo "To run the app:"
echo "1. npm install"
echo "2. npm run dev"
echo ""
echo "App details:"
echo "- Name: Color Memory Chain"
echo "- Type: Memory pattern game"
echo "- Features: Progressive difficulty, combos, lives system"
echo "- Tech: Vite + React + TypeScript + Tailwind CSS + Zustand"