#!/bin/bash
echo "Testing Compliment Chain App Build..."
cd /home/tory/cronjob/frontApp/LittleCat/compliment-chain-20250831_200001

echo "Checking TypeScript syntax..."
npx tsc --noEmit --skipLibCheck 2>&1 | head -20

echo "Build test completed."