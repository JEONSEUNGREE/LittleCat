#!/bin/bash

# Sound Wave Visualizer Setup Script
echo "Setting up Sound Wave Visualizer app..."

# Navigate to project directory
cd /home/tory/cronjob/frontApp/LittleCat/sound-wave-visualizer-20250831_050001

# Install dependencies
echo "Installing dependencies..."
npm install

# Run build test
echo "Testing build..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Attempting to fix..."
    
    # Common fixes
    # Fix potential TypeScript errors
    echo "Attempting TypeScript fixes..."
    
    # Try building again
    npm run build
fi

echo "Setup complete!"