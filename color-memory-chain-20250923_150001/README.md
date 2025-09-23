# Color Memory Chain 🎨🔗

A brain-training memory game where players must remember and recreate increasingly complex color chains.

## Features

- **Progressive Difficulty**: Chains get longer as you advance through levels
- **3 Difficulty Modes**: Easy (3 colors, 5 lives), Medium (4 colors, 3 lives), Hard (5 colors, 2 lives)
- **Combo System**: Build streaks for bonus points
- **Lives System**: Make mistakes and keep playing
- **Timer Challenge**: Complete chains before time runs out
- **High Score Tracking**: Beat your personal best
- **Responsive Design**: Works perfectly on mobile and desktop

## How to Play

1. Watch the color chain as it appears
2. Remember the exact sequence
3. Click the colors in the same order
4. Complete chains without mistakes to build combos
5. Progress through levels as chains get longer

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **Animations**: Custom Tailwind animations

## Installation

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Game Mechanics

- **Chain Length**: Starts at 3-5 colors based on difficulty, increases with level
- **Time Limit**: 6-10 seconds per chain based on difficulty
- **Scoring**: Base points × level + combo bonus
- **Lives**: 2-5 lives based on difficulty setting

## Created

20250923_150001