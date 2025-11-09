#!/bin/bash

PROJECT_DIR="/home/tory/cronjob/frontApp/LittleCat/focus-flow-timer-20251109_150001"
cd "$PROJECT_DIR"

echo "=== Installing dependencies ==="
npm install

if [ $? -ne 0 ]; then
    echo "❌ npm install failed"
    exit 1
fi

echo ""
echo "=== Running TypeScript check ==="
npx tsc --noEmit

if [ $? -ne 0 ]; then
    echo "⚠️  TypeScript errors found - attempting fixes..."
    # TypeScript errors will be fixed in the next step
fi

echo ""
echo "=== Building project ==="
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build successful!"
    exit 0
else
    echo ""
    echo "❌ Build failed - will attempt fixes"
    exit 1
fi
