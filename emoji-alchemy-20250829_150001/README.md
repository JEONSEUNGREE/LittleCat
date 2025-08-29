# Emoji Alchemy 🧪✨

A creative puzzle game where you combine emojis to discover new elements through magical combinations!

## Features

- 🎮 **Intuitive Gameplay**: Drag and combine emojis to create new discoveries
- 🔥💧🌍💨 **Four Base Elements**: Start with Fire, Water, Earth, and Air
- 🌟 **20+ Discoveries**: Unlock hidden combinations and build your collection
- 📱 **Mobile-First Design**: Optimized for touch devices with responsive layout
- 🎨 **Beautiful Animations**: Smooth transitions and engaging visual effects
- 💯 **Score System**: Track your progress and discoveries

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## How to Play

1. Select two elements from your collection
2. Click "Combine Elements" to try creating something new
3. Discover all 20 recipes to complete the game
4. Use hints if you get stuck
5. Reset anytime to start fresh

## Game Mechanics

- Combine basic elements to create complex ones
- Each successful combination adds to your score
- Discovered recipes are saved in your discovery list
- Some combinations create elements that can be combined further

## Project Structure

```
src/
├── components/     # React components
├── store/         # Zustand state management
├── types/         # TypeScript type definitions
└── App.tsx        # Main application component
```

## Development

The game uses a recipe-based system where combinations are predefined. To add new recipes:

1. Add new recipe to `src/store/gameStore.ts`
2. Define the emoji combination and result
3. Test the combination in-game

## License

MIT

---

Created with ❤️ using Claude Code