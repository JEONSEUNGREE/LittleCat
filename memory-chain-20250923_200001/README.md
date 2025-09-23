# Memory Chain - Pattern Memory Game

A challenging memory pattern game built with React, TypeScript, and Vite.

## Features

- 🧠 Progressive difficulty levels
- 💗 3 lives system
- 🏆 High score tracking
- 🎨 6 vibrant colors to memorize
- 📱 Mobile-first responsive design
- ⚡ Smooth animations and visual feedback

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Game Rules

1. Watch the pattern of colors that flash on screen
2. Repeat the pattern in the exact same order
3. Each level adds one more color to the pattern
4. You have 3 lives - lose one for each mistake
5. Try to achieve the highest score possible!

## Project Structure

```
memory-chain-20250923_200001/
├── src/
│   ├── components/
│   │   ├── GameBoard.tsx      # Main game board with color buttons
│   │   ├── ScoreBoard.tsx     # Score and lives display
│   │   └── GameControls.tsx   # Start/Reset game controls
│   ├── store/
│   │   └── gameStore.ts       # Zustand game state management
│   ├── App.tsx                # Main app component
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tailwind.config.js
```

## Created

- Date: 2025-09-23 20:00:01
- Category: Game
- Type: Memory/Puzzle