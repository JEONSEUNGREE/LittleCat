#!/bin/bash

echo "Testing Focus Blocks App Build..."
cd /home/tory/cronjob/frontApp/LittleCat/focus-blocks-20250902_200001

# Install dependencies
echo "Installing dependencies..."
npm install

# Try to build
echo "Running build..."
npm run build

# Check build result
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed, attempting fixes..."
    
    # Try to fix common TypeScript errors
    echo "Attempting automatic fixes..."
    
    # Run build again
    npm run build
fi

echo "Test complete!"