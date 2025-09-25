#!/bin/bash

echo "Testing Emoji Story Maker app..."

# Check if all required files exist
echo "Checking file structure..."
required_files=(
    "package.json"
    "vite.config.ts"
    "tsconfig.json"
    "index.html"
    "src/main.tsx"
    "src/App.tsx"
    "src/index.css"
    "src/components/EmojiPicker.tsx"
    "src/components/StoryCanvas.tsx"
    "src/components/SavedStories.tsx"
    "src/store/useStoryStore.ts"
)

all_exist=true
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
        all_exist=false
    fi
done

if [ "$all_exist" = true ]; then
    echo "✅ All required files exist!"
    echo "Structure test: PASSED"
else
    echo "❌ Some files are missing!"
    echo "Structure test: FAILED"
fi

echo "App ready for npm install and npm run dev"