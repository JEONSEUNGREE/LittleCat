#!/bin/bash

# Subscription Sentinel Setup Script
echo "🛡️ Setting up Subscription Sentinel..."

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js and npm first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    
    # Start development server
    echo "🚀 Starting development server..."
    echo "📱 Open http://localhost:5173 in your browser"
    echo "🔄 The app will auto-reload when you make changes"
    echo ""
    echo "🛑 Press Ctrl+C to stop the server"
    echo ""
    
    npm run dev
else
    echo "❌ Failed to install dependencies"
    exit 1
fi