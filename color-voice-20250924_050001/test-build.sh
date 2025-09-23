#!/bin/bash

echo "Testing Color Voice App..."
echo "=========================="

# Check if package.json exists
if [ -f "package.json" ]; then
    echo "✅ package.json found"
else
    echo "❌ package.json not found"
    exit 1
fi

# Check if all required files exist
required_files=(
    "vite.config.ts"
    "tsconfig.json"
    "index.html"
    "src/main.tsx"
    "src/App.tsx"
    "src/index.css"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file found"
    else
        echo "❌ $file not found"
        exit 1
    fi
done

# Check component count
component_count=$(ls -1 src/components/*.tsx 2>/dev/null | wc -l)
if [ "$component_count" -ge 3 ]; then
    echo "✅ Found $component_count components (minimum 3 required)"
else
    echo "❌ Only $component_count components found (minimum 3 required)"
    exit 1
fi

echo "=========================="
echo "All structure checks passed!"
echo "To run the app:"
echo "1. npm install"
echo "2. npm run dev"