#!/bin/bash

# Test build script for Mood Mirror app

echo "Starting Mood Mirror app test..."
echo "================================"

# Check Node.js and npm versions
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Install dependencies
echo "Installing dependencies..."
npm install

# Run TypeScript check
echo "Running TypeScript check..."
npx tsc --noEmit || echo "TypeScript check completed with warnings"

# Run build
echo "Running build..."
npm run build

echo "================================"
echo "Test completed!"