import { create } from 'zustand';
import { GameStore, Level, LightSource } from '../types/game';
import { levels } from '../data/levels';

const initialPlayer = {
  position: { x: 1, y: 1 },
  lightRadius: 3
};

export const useGameStore = create<GameStore>((set, get) => ({
  gameState: 'menu',
  currentLevel: 0,
  player: initialPlayer,
  levels: levels,
  score: 0,
  timeElapsed: 0,

  movePlayer: (direction) => {
    const { player, levels, currentLevel, gameState } = get();
    if (gameState !== 'playing') return;

    const level = levels[currentLevel];
    let newX = player.position.x;
    let newY = player.position.y;

    switch (direction) {
      case 'up':
        newY = Math.max(0, player.position.y - 1);
        break;
      case 'down':
        newY = Math.min(level.gridSize - 1, player.position.y + 1);
        break;
      case 'left':
        newX = Math.max(0, player.position.x - 1);
        break;
      case 'right':
        newX = Math.min(level.gridSize - 1, player.position.x + 1);
        break;
    }

    // Check wall collision
    const isWall = level.walls.some(wall => 
      newX >= wall.x && 
      newX < wall.x + wall.width && 
      newY >= wall.y && 
      newY < wall.y + wall.height
    );

    if (!isWall) {
      set((state) => ({
        player: {
          ...state.player,
          position: { x: newX, y: newY }
        }
      }));

      // Check if reached exit
      if (newX === level.exitPosition.x && newY === level.exitPosition.y) {
        if (currentLevel === levels.length - 1) {
          set({ gameState: 'won' });
        } else {
          set({ gameState: 'levelComplete' });
        }
      }

      // Check light collection
      const lightToCollect = level.lightSources.find(
        light => !light.collected && light.position.x === newX && light.position.y === newY
      );
      
      if (lightToCollect) {
        get().collectLight(lightToCollect.id);
      }
    }
  },

  collectLight: (lightId) => {
    set((state) => {
      const newLevels = [...state.levels];
      const level = newLevels[state.currentLevel];
      const light = level.lightSources.find(l => l.id === lightId);
      
      if (light) {
        light.collected = true;
        return {
          levels: newLevels,
          player: {
            ...state.player,
            lightRadius: state.player.lightRadius + 1
          },
          score: state.score + 100
        };
      }
      return state;
    });
  },

  startGame: () => {
    const startPos = levels[0].startPosition;
    set({ 
      gameState: 'playing',
      currentLevel: 0,
      player: {
        position: { ...startPos },
        lightRadius: 3
      },
      score: 0,
      timeElapsed: 0,
      levels: levels.map(level => ({
        ...level,
        lightSources: level.lightSources.map(light => ({
          ...light,
          collected: false
        }))
      }))
    });
  },

  pauseGame: () => {
    set({ gameState: 'paused' });
  },

  resumeGame: () => {
    set({ gameState: 'playing' });
  },

  nextLevel: () => {
    const { currentLevel, levels } = get();
    const nextLevelIndex = currentLevel + 1;
    
    if (nextLevelIndex < levels.length) {
      const startPos = levels[nextLevelIndex].startPosition;
      set({
        currentLevel: nextLevelIndex,
        gameState: 'playing',
        player: {
          position: { ...startPos },
          lightRadius: 3
        }
      });
    }
  },

  resetGame: () => {
    set({
      gameState: 'menu',
      currentLevel: 0,
      player: initialPlayer,
      score: 0,
      timeElapsed: 0,
      levels: levels.map(level => ({
        ...level,
        lightSources: level.lightSources.map(light => ({
          ...light,
          collected: false
        }))
      }))
    });
  }
}));