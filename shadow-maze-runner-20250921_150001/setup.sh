#!/bin/bash

echo "Setting up Shadow Maze Runner..."
npm install --silent

echo "Running build test..."
npm run build

if [ $? -eq 0 ]; then
  echo "Build successful!"
else
  echo "Build failed, attempting fixes..."
  # Common fixes for TypeScript errors
  npm install --save-dev @types/node --silent
  npm run build
fi

echo "Setup complete!"