#!/bin/bash

cd /home/tory/cronjob/frontApp/LittleCat

echo "=== Adding files to git ==="
git add focus-flow-timer-20251109_150001/

echo ""
echo "=== Creating commit ==="
git commit -m "$(cat <<'EOF'
새로운 앱 생성: 집중 흐름 타이머 (focus-flow-timer) - 20251109_150001

Brain wave rhythm-based focus timer for enhanced productivity

Features:
- 4 brain wave rhythm modes (Beta, Alpha, Theta, Gamma)
- Beautiful circular timer with gradient progress
- Real-time focus score tracking
- Session statistics and history
- Mobile-first responsive design

Tech Stack: Vite + React 18 + TypeScript + Tailwind CSS + Zustand

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Commit successful!"

    echo ""
    echo "=== Pushing to remote ==="
    git push

    if [ $? -eq 0 ]; then
        echo "✅ Push successful!"
    else
        echo "⚠️  Push failed but commit is saved locally"
    fi
else
    echo "❌ Commit failed"
    exit 1
fi
