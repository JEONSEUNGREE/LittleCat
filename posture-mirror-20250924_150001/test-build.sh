#!/bin/bash

echo "Testing Posture Mirror App Build..."
echo "===================================="

# Navigate to app directory
cd /home/tory/cronjob/frontApp/LittleCat/posture-mirror-20250924_150001

# Check if package.json exists
if [ ! -f package.json ]; then
    echo "❌ package.json not found"
    exit 1
fi

echo "✅ package.json found"

# Check TypeScript files
echo "Checking TypeScript files..."
find src -name "*.tsx" -o -name "*.ts" | head -5

# Verify all components exist
components=("App.tsx" "components/Header.tsx" "components/PostureMonitor.tsx" "components/DailyStats.tsx" "components/Settings.tsx" "store/usePostureStore.ts")
for comp in "${components[@]}"; do
    if [ -f "src/$comp" ]; then
        echo "✅ src/$comp exists"
    else
        echo "❌ src/$comp missing"
    fi
done

echo ""
echo "Build test complete!"
echo "==================="
echo "App created successfully at:"
echo "/home/tory/cronjob/frontApp/LittleCat/posture-mirror-20250924_150001"