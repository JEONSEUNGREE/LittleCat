import { create } from 'zustand';
import { GameState, Player, Level } from '../types/game';
import { levels } from '../data/levels';

interface GameStore extends GameState {
  player: Player;
  currentLevelData: Level | null;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  movePlayer: (dx: number, dy: number) => void;
  checkCollision: () => boolean;
  checkLightCollision: () => boolean;
  nextLevel: () => void;
  loseLife: () => void;
  resetLevel: () => void;
  updateTime: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  currentLevel: 0,
  isPlaying: false,
  isPaused: false,
  score: 0,
  lives: 3,
  timeRemaining: undefined,
  player: {
    x: 50,
    y: 50,
    size: 20,
    isDead: false,
  },
  currentLevelData: null,

  startGame: () => {
    const level = levels[0];
    set({
      isPlaying: true,
      isPaused: false,
      currentLevel: 0,
      score: 0,
      lives: 3,
      currentLevelData: level,
      player: {
        x: level.start.x,
        y: level.start.y,
        size: 20,
        isDead: false,
      },
      timeRemaining: level.timeLimit,
    });
  },

  pauseGame: () => set({ isPaused: true }),
  resumeGame: () => set({ isPaused: false }),

  movePlayer: (dx: number, dy: number) => {
    const state = get();
    if (!state.isPlaying || state.isPaused || state.player.isDead) return;

    const newX = Math.max(10, Math.min(window.innerWidth - 10, state.player.x + dx));
    const newY = Math.max(10, Math.min(window.innerHeight - 10, state.player.y + dy));

    // Check wall collisions
    const level = state.currentLevelData;
    if (level) {
      const willCollide = level.walls.some(wall => {
        return newX + 10 > wall.x &&
               newX - 10 < wall.x + wall.width &&
               newY + 10 > wall.y &&
               newY - 10 < wall.y + wall.height;
      });

      if (!willCollide) {
        set({
          player: { ...state.player, x: newX, y: newY }
        });

        // Check if reached exit
        if (Math.abs(newX - level.exit.x) < 20 && Math.abs(newY - level.exit.y) < 20) {
          state.nextLevel();
        }
      }
    }
  },

  checkCollision: () => {
    const state = get();
    const level = state.currentLevelData;
    if (!level) return false;

    return level.walls.some(wall => {
      return state.player.x + 10 > wall.x &&
             state.player.x - 10 < wall.x + wall.width &&
             state.player.y + 10 > wall.y &&
             state.player.y - 10 < wall.y + wall.height;
    });
  },

  checkLightCollision: () => {
    const state = get();
    const level = state.currentLevelData;
    if (!level) return false;

    return level.lights.some(light => {
      const distance = Math.sqrt(
        Math.pow(state.player.x - light.x, 2) + 
        Math.pow(state.player.y - light.y, 2)
      );
      return distance < light.radius * light.intensity;
    });
  },

  nextLevel: () => {
    const state = get();
    const nextLevelIndex = state.currentLevel + 1;
    
    if (nextLevelIndex < levels.length) {
      const level = levels[nextLevelIndex];
      set({
        currentLevel: nextLevelIndex,
        score: state.score + 1000 + (state.timeRemaining || 0) * 10,
        currentLevelData: level,
        player: {
          ...state.player,
          x: level.start.x,
          y: level.start.y,
          isDead: false,
        },
        timeRemaining: level.timeLimit,
      });
    } else {
      // Game completed
      set({
        isPlaying: false,
        score: state.score + 5000,
      });
    }
  },

  loseLife: () => {
    const state = get();
    if (state.lives > 1) {
      set({
        lives: state.lives - 1,
        player: { ...state.player, isDead: true },
      });
      setTimeout(() => state.resetLevel(), 1000);
    } else {
      set({
        lives: 0,
        isPlaying: false,
      });
    }
  },

  resetLevel: () => {
    const state = get();
    const level = state.currentLevelData;
    if (level) {
      set({
        player: {
          ...state.player,
          x: level.start.x,
          y: level.start.y,
          isDead: false,
        },
        timeRemaining: level.timeLimit,
      });
    }
  },

  updateTime: () => {
    const state = get();
    if (state.timeRemaining !== undefined && state.timeRemaining > 0) {
      set({ timeRemaining: state.timeRemaining - 1 });
    } else if (state.timeRemaining === 0) {
      state.loseLife();
    }
  },
}));