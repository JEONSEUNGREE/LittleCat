#!/bin/bash

echo "Installing dependencies..."
npm install

echo "Running build test..."
npm run build

echo "Installation and build complete!"