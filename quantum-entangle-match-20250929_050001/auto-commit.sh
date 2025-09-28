#!/bin/bash

# Auto commit script for Quantum Entangle Match
cd /home/tory/cronjob/frontApp/LittleCat/quantum-entangle-match-20250929_050001

# Initialize git if not already
if [ ! -d ".git" ]; then
    git init
fi

# Add all files
git add .

# Commit with message
git commit -m "새로운 앱 생성: 양자 얽힘 매칭 (quantum-entangle-match) - 20250929_050001"

echo "Git commit complete!"