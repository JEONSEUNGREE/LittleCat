#!/bin/bash

echo "Installing dependencies..."
npm install --legacy-peer-deps

echo "Building the project..."
npm run build

echo "Installation and build complete!"