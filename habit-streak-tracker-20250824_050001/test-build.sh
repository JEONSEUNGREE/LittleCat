#!/bin/bash
cd /home/tory/cronjob/frontApp/LittleCat/habit-streak-tracker-20250824_050001
echo "Testing TypeScript compilation..."
npx tsc --noEmit 2>&1 | head -20