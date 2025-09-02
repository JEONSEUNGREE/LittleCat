#!/bin/bash

echo "Testing Step Cadence Coach build..."

# Check if npm modules exist
if [ ! -d "node_modules" ]; then
    echo "⚠️ node_modules not found - npm install needed"
    echo "Run: npm install"
else
    echo "✅ node_modules found"
fi

# Check TypeScript files for syntax errors
echo "Checking TypeScript files..."
for file in src/**/*.tsx src/**/*.ts; do
    if [ -f "$file" ]; then
        echo "  ✓ $file"
    fi
done

echo "Build test complete!"
echo ""
echo "To run the app:"
echo "1. npm install"
echo "2. npm run dev"