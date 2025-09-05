#!/bin/bash

# Navigate to project directory
cd /home/tory/cronjob/frontApp/LittleCat/joke-battle-arena-20250906_050001

# Install dependencies
echo "Installing dependencies..."
npm install

# Run build
echo "Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build successful!"
else
    echo "Build failed, attempting to fix errors..."
    # Try to fix common errors
    npm install --legacy-peer-deps
    npm run build
fi

echo "Setup complete!"