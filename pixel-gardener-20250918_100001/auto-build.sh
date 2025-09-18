#!/bin/bash

echo "Starting Pixel Gardener build process..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building project..."
npm run build

echo "Build complete!"