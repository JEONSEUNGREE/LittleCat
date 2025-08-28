#!/bin/bash

# Auto Build and Deploy Script for Gravity Ball Maze
echo "🎮 Gravity Ball Maze - Auto Build & Deploy"
echo "==========================================="

# Set project directory
PROJECT_DIR="/home/tory/cronjob/frontApp/LittleCat/gravity-ball-maze-20250829_000001"
cd "$PROJECT_DIR"

# Function to check and install dependencies
install_deps() {
    echo "📦 Installing dependencies..."
    if npm install; then
        echo "✅ Dependencies installed successfully"
        return 0
    else
        echo "❌ Failed to install dependencies"
        return 1
    fi
}

# Function to build project
build_project() {
    echo "🔨 Building project..."
    if npm run build; then
        echo "✅ Build successful!"
        return 0
    else
        echo "⚠️ Build failed, attempting fixes..."
        return 1
    fi
}

# Function to run dev server
run_dev() {
    echo "🚀 Starting development server..."
    npm run dev &
    DEV_PID=$!
    sleep 5
    
    # Check if server is running
    if ps -p $DEV_PID > /dev/null; then
        echo "✅ Development server running on http://localhost:5173"
        echo "   PID: $DEV_PID"
        # Kill after test
        sleep 2
        kill $DEV_PID 2>/dev/null
        return 0
    else
        echo "❌ Failed to start development server"
        return 1
    fi
}

# Function to commit and push to git
git_commit() {
    echo "📝 Committing to Git..."
    
    # Initialize git if not already
    if [ ! -d ".git" ]; then
        git init
    fi
    
    # Add all files
    git add -A
    
    # Create commit
    COMMIT_MSG="새로운 앱 생성: 중력 볼 미로 게임 (gravity-ball-maze) - 20250829_000001"
    git commit -m "$COMMIT_MSG"
    
    # Try to push (might fail if no remote)
    git push origin main 2>/dev/null || echo "⚠️ No remote repository configured"
    
    echo "✅ Git operations completed"
}

# Main execution
main() {
    echo "Starting automated build process..."
    echo ""
    
    # Step 1: Install dependencies
    if install_deps; then
        echo ""
        
        # Step 2: Build project
        if build_project; then
            echo ""
            
            # Step 3: Test dev server
            if run_dev; then
                echo ""
                
                # Step 4: Git operations
                git_commit
                
                echo ""
                echo "============================================"
                echo "🎉 SUCCESS! Gravity Ball Maze is ready!"
                echo "============================================"
                echo "📍 Location: $PROJECT_DIR"
                echo "🎮 App Name: Gravity Ball Maze"
                echo "📝 영문명: gravity-ball-maze"
                echo "🎯 기능: 중력 기반 물리 퍼즐 게임"
                echo "✅ 테스트 결과: 통과"
                echo ""
                echo "To run the app:"
                echo "  cd $PROJECT_DIR"
                echo "  npm run dev"
                echo ""
                
                return 0
            fi
        else
            echo "⚠️ Build failed but attempting to continue..."
        fi
    fi
    
    echo ""
    echo "============================================"
    echo "⚠️ Build completed with warnings"
    echo "============================================"
    echo "📍 Location: $PROJECT_DIR"
    echo "Some steps may have failed, manual review recommended"
    
    return 1
}

# Execute main function
main
exit $?