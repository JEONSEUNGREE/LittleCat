#!/bin/bash

# Crypto Pulse Setup Script
echo "Setting up Crypto Pulse app..."

# Install dependencies
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install --legacy-peer-deps
else
    echo "Dependencies already installed"
fi

# Run development server
echo "Starting development server..."
npm run dev