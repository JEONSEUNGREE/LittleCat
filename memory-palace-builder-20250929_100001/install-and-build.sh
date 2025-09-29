#!/bin/bash

echo "Installing dependencies..."
npm install --legacy-peer-deps

echo "Building project..."
npm run build

echo "Build completed!"