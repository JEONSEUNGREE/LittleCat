#!/bin/bash

echo "Installing dependencies..."
npm install

echo "Running TypeScript check..."
npx tsc --noEmit

echo "Building the project..."
npm run build

echo "Build completed successfully!"