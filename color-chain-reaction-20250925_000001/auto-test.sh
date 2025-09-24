#!/bin/bash

# Color Chain Reaction - Auto Test Script

cd /home/tory/cronjob/frontApp/LittleCat/color-chain-reaction-20250925_000001

echo "Installing dependencies..."
npm install

echo "Running TypeScript check..."
npx tsc --noEmit

echo "Building project..."
npm run build

echo "Test completed!"