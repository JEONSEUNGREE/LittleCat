#!/bin/bash

echo "=== Planet Defender Verification ==="
echo ""

# Check if all required files exist
echo "Checking project structure..."

required_files=(
    "package.json"
    "vite.config.ts"
    "tsconfig.json"
    "index.html"
    "src/main.tsx"
    "src/App.tsx"
    "src/index.css"
    "src/components/GameCanvas.tsx"
    "src/components/HUD.tsx"
    "src/components/MainMenu.tsx"
    "src/components/GameOver.tsx"
    "src/store/gameStore.ts"
    "src/types/game.ts"
)

all_files_exist=true
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✓ $file"
    else
        echo "✗ Missing: $file"
        all_files_exist=false
    fi
done

echo ""
if [ "$all_files_exist" = true ]; then
    echo "✓ All required files exist!"
else
    echo "✗ Some files are missing!"
fi

echo ""
echo "=== Project Summary ==="
echo "App Name: Planet Defender"
echo "Directory: planet-defender-20250906_000001"
echo "Tech Stack: Vite + React + TypeScript + Tailwind CSS + Zustand"
echo "Components: 4 (GameCanvas, HUD, MainMenu, GameOver)"
echo "Features: Tower defense game with wave system, enemy spawning, tower placement"
echo ""
echo "=== To run the project ==="
echo "1. cd /home/tory/cronjob/frontApp/LittleCat/planet-defender-20250906_000001"
echo "2. npm install"
echo "3. npm run dev"
echo ""