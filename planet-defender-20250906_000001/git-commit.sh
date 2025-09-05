#!/bin/bash

echo "=== Git Operations for Planet Defender ==="
echo ""

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    git init
    echo "Git repository initialized"
fi

# Add all files
git add .
echo "All files added to staging"

# Create commit
git commit -m "새로운 앱 생성: 행성 방어자 (planet-defender) - 20250906_000001" || true
echo "Commit created"

# Try to push (will fail if no remote is set, but that's okay)
git push 2>/dev/null || echo "Note: Remote not configured, changes saved locally"

echo ""
echo "=== Git operations complete ==="