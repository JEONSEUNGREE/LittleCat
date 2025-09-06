#!/bin/bash

echo "Testing Password Vault Build..."

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed"
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install --silent

# Run TypeScript check
echo "Checking TypeScript..."
npx tsc --noEmit

# Run build
echo "Building project..."
npm run build

echo "Build test completed!"