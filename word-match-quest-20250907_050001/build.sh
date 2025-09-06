#!/bin/bash

echo "Installing dependencies..."
npm install --silent

echo "Building project..."
npm run build

echo "Build completed!"