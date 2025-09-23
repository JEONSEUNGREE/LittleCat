#!/bin/bash

# QR Secret Notes App Setup Script
# This script will install dependencies, build the project, and initialize git

echo "Setting up QR Secret Notes App..."
echo "================================"

# Change to project directory
cd /home/tory/cronjob/frontApp/LittleCat/qr-secret-notes-20250924_000001

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building the project..."
npm run build

# Initialize git repository
echo "Initializing git repository..."
git init

# Add all files to git
git add .

# Create initial commit
git commit -m "Initial commit - QR Secret Notes App

Features:
- Create and manage encrypted secret notes
- Generate QR codes for each note
- Scan QR codes to retrieve notes
- Lock/unlock notes for privacy
- Categories: personal, work, secret, temporary
- Temporary notes with expiration
- Search and filter functionality
- Modern dark UI with responsive design"

echo "================================"
echo "Setup complete!"
echo ""
echo "Build results:"
ls -la dist/ 2>/dev/null || echo "No dist folder found - build may have failed"
echo ""
echo "To run the development server, use: npm run dev"
echo "To build for production, use: npm run build"
echo "To preview the production build, use: npm run preview"