import { create } from 'zustand';
import { GameState, Player, Obstacle } from '../types/game';

interface GameStore extends GameState {
  player: Player;
  obstacles: Obstacle[];
  updateGame: () => void;
  startGame: () => void;
  endGame: () => void;
  jump: () => void;
  flipGravity: () => void;
  addObstacle: (obstacle: Obstacle) => void;
  removeObstacle: (id: string) => void;
  collectCoin: () => void;
  incrementScore: () => void;
  resetGame: () => void;
}

const initialPlayer: Player = {
  position: 80,
  isFlipped: false,
  isJumping: false,
  velocity: 0,
};

const initialState: GameState = {
  score: 0,
  coins: 0,
  distance: 0,
  speed: 5,
  isRunning: false,
  isGameOver: false,
  highScore: parseInt(localStorage.getItem('highScore') || '0'),
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,
  player: initialPlayer,
  obstacles: [],

  updateGame: () => {
    const state = get();
    if (!state.isRunning || state.isGameOver) return;

    set((state) => ({
      distance: state.distance + state.speed,
      speed: Math.min(state.speed + 0.001, 15),
    }));
  },

  startGame: () => {
    set({
      isRunning: true,
      isGameOver: false,
      score: 0,
      coins: 0,
      distance: 0,
      speed: 5,
      player: initialPlayer,
      obstacles: [],
    });
  },

  endGame: () => {
    const { score, highScore } = get();
    const newHighScore = Math.max(score, highScore);
    localStorage.setItem('highScore', newHighScore.toString());
    
    set({
      isRunning: false,
      isGameOver: true,
      highScore: newHighScore,
    });
  },

  jump: () => {
    const { player, isRunning } = get();
    if (!isRunning || player.isJumping) return;

    set((state) => ({
      player: {
        ...state.player,
        isJumping: true,
        velocity: state.player.isFlipped ? 12 : -12,
      },
    }));

    setTimeout(() => {
      set((state) => ({
        player: {
          ...state.player,
          isJumping: false,
          velocity: 0,
        },
      }));
    }, 600);
  },

  flipGravity: () => {
    const { isRunning } = get();
    if (!isRunning) return;

    set((state) => ({
      player: {
        ...state.player,
        isFlipped: !state.player.isFlipped,
      },
    }));
  },

  addObstacle: (obstacle) => {
    set((state) => ({
      obstacles: [...state.obstacles, obstacle],
    }));
  },

  removeObstacle: (id) => {
    set((state) => ({
      obstacles: state.obstacles.filter((obs) => obs.id !== id),
    }));
  },

  collectCoin: () => {
    set((state) => ({
      coins: state.coins + 1,
      score: state.score + 10,
    }));
  },

  incrementScore: () => {
    set((state) => ({
      score: state.score + 1,
    }));
  },

  resetGame: () => {
    set({
      ...initialState,
      player: initialPlayer,
      obstacles: [],
    });
  },
}))