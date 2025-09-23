#!/bin/bash

echo "Testing Memory Chain App Build..."
echo "================================"

# Navigate to project directory
cd /home/tory/cronjob/frontApp/LittleCat/memory-chain-20250923_200001

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "Error: package.json not found"
    exit 1
fi

echo "✓ Project structure created"

# Check TypeScript files
if [ -f "src/App.tsx" ] && [ -f "src/main.tsx" ]; then
    echo "✓ TypeScript components created"
else
    echo "Error: Required TypeScript files missing"
    exit 1
fi

# Check component files
components=("GameBoard" "ScoreBoard" "GameControls")
for comp in "${components[@]}"; do
    if [ -f "src/components/${comp}.tsx" ]; then
        echo "✓ ${comp} component created"
    else
        echo "Error: ${comp} component missing"
        exit 1
    fi
done

# Check store
if [ -f "src/store/gameStore.ts" ]; then
    echo "✓ Game store created"
else
    echo "Error: Game store missing"
    exit 1
fi

# Check configuration files
configs=("vite.config.ts" "tsconfig.json" "tailwind.config.js" "postcss.config.js")
for config in "${configs[@]}"; do
    if [ -f "${config}" ]; then
        echo "✓ ${config} configured"
    else
        echo "Error: ${config} missing"
        exit 1
    fi
done

echo ""
echo "================================"
echo "All files created successfully!"
echo "Ready for npm install and build"
echo ""
echo "Project: Memory Chain"
echo "Location: /home/tory/cronjob/frontApp/LittleCat/memory-chain-20250923_200001"
echo "Features: Pattern memory game with levels and lives"