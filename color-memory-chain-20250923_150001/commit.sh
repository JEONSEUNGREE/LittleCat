#!/bin/bash

# Auto-commit script for Color Memory Chain
cd /home/tory/cronjob/frontApp/LittleCat/

# Add the new app directory
git add color-memory-chain-20250923_150001/

# Create commit
git commit -m "새로운 앱 생성: 컬러 메모리 체인 (color-memory-chain) - 20250923_150001

🎮 Color Memory Chain - 색상 패턴 기억력 게임
- 점진적으로 복잡해지는 색상 체인을 기억하고 재현
- 콤보 시스템과 난이도 선택 기능
- Vite + React + TypeScript + Tailwind CSS + Zustand"

# Optional push (comment out if not needed)
# git push origin main

echo "✅ Commit completed for Color Memory Chain!"