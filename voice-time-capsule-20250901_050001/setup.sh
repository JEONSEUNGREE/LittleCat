#!/bin/bash

# Install dependencies
npm install

# Build the project to test for errors
npm run build

# If build succeeds, run dev server briefly to test
if [ $? -eq 0 ]; then
    echo "Build successful!"
    # Start dev server in background
    npm run dev &
    DEV_PID=$!
    
    # Wait 5 seconds for server to start
    sleep 5
    
    # Kill the dev server
    kill $DEV_PID 2>/dev/null
    
    echo "Development server test complete"
else
    echo "Build failed, fixing errors..."
    # Auto-fix common issues
    npm install --save-dev @types/node
    npm run build
fi

echo "Setup complete!"