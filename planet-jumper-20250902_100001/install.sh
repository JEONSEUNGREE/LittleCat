#!/bin/bash

echo "Installing dependencies for Planet Jumper..."
npm install

if [ $? -eq 0 ]; then
    echo "Dependencies installed successfully!"
else
    echo "Failed to install dependencies"
    exit 1
fi