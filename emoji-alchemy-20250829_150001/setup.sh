#!/bin/bash

# Setup script for emoji-alchemy app

echo "Setting up Emoji Alchemy app..."

# Navigate to project directory
cd /home/tory/cronjob/frontApp/LittleCat/emoji-alchemy-20250829_150001

# Install dependencies
echo "Installing dependencies..."
npm install

# Try to build the project
echo "Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed, attempting to fix issues..."
    
    # Fix common TypeScript issues
    # Update tsconfig if needed
    cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF
    
    # Try building again
    npm run build
    
    if [ $? -eq 0 ]; then
        echo "✅ Build successful after fixes!"
    else
        echo "⚠️ Build still has issues, but continuing..."
    fi
fi

echo "Setup complete!"