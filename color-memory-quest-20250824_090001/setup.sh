#!/bin/bash

echo "Setting up Color Memory Quest..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Run build to test
echo "Testing build..."
npm run build

echo "Setup complete!"