import { create } from 'zustand';
import { levels, Level } from '../data/levels';

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface GameState {
  currentLevel: number;
  isPlaying: boolean;
  ball: Ball;
  levelData: Level | null;
  score: number;
  timeElapsed: number;
  bestTimes: Record<number, number>;
  hasWon: boolean;
  showLevelSelect: boolean;
  gravity: { x: number; y: number };
  hasOrientation: boolean;
  
  // Actions
  startGame: () => void;
  resetLevel: () => void;
  updateBall: (updates: Partial<Ball>) => void;
  setBallPosition: (x: number, y: number) => void;
  setBallVelocity: (vx: number, vy: number) => void;
  setLevel: (level: number) => void;
  completeLevel: () => void;
  updateTime: () => void;
  setGravity: (x: number, y: number) => void;
  setShowLevelSelect: (show: boolean) => void;
  setHasOrientation: (has: boolean) => void;
}

const initialBall: Ball = {
  x: 50,
  y: 50,
  vx: 0,
  vy: 0,
  radius: 8,
};

export const useGameStore = create<GameState>((set, get) => ({
  currentLevel: 1,
  isPlaying: false,
  ball: { ...initialBall },
  levelData: levels[0],
  score: 0,
  timeElapsed: 0,
  bestTimes: {},
  hasWon: false,
  showLevelSelect: false,
  gravity: { x: 0, y: 0.3 },
  hasOrientation: false,

  startGame: () => {
    const { currentLevel } = get();
    const level = levels[currentLevel - 1];
    if (!level) return;
    
    set({
      isPlaying: true,
      ball: {
        ...initialBall,
        x: level.start.x,
        y: level.start.y,
      },
      levelData: level,
      timeElapsed: 0,
      hasWon: false,
    });
  },

  resetLevel: () => {
    const { currentLevel } = get();
    const level = levels[currentLevel - 1];
    if (!level) return;
    
    set({
      isPlaying: true,
      ball: {
        ...initialBall,
        x: level.start.x,
        y: level.start.y,
      },
      timeElapsed: 0,
      hasWon: false,
    });
  },

  updateBall: (updates) => {
    set((state) => ({
      ball: { ...state.ball, ...updates },
    }));
  },

  setBallPosition: (x, y) => {
    set((state) => ({
      ball: { ...state.ball, x, y },
    }));
  },

  setBallVelocity: (vx, vy) => {
    set((state) => ({
      ball: { ...state.ball, vx, vy },
    }));
  },

  setLevel: (level) => {
    const levelData = levels[level - 1];
    if (!levelData) return;
    
    set({
      currentLevel: level,
      levelData,
      ball: {
        ...initialBall,
        x: levelData.start.x,
        y: levelData.start.y,
      },
      isPlaying: false,
      hasWon: false,
      timeElapsed: 0,
      showLevelSelect: false,
    });
  },

  completeLevel: () => {
    const { currentLevel, timeElapsed, bestTimes } = get();
    const newBestTimes = { ...bestTimes };
    
    if (!newBestTimes[currentLevel] || timeElapsed < newBestTimes[currentLevel]) {
      newBestTimes[currentLevel] = timeElapsed;
    }
    
    set({
      hasWon: true,
      isPlaying: false,
      bestTimes: newBestTimes,
      score: get().score + Math.max(1000 - timeElapsed * 10, 100),
    });
  },

  updateTime: () => {
    set((state) => ({
      timeElapsed: state.timeElapsed + 0.1,
    }));
  },

  setGravity: (x, y) => {
    set({ gravity: { x, y } });
  },

  setShowLevelSelect: (show) => {
    set({ showLevelSelect: show });
  },

  setHasOrientation: (has) => {
    set({ hasOrientation: has });
  },
}));