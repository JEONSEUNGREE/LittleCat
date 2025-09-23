import { create } from 'zustand';

export type PatternItem = {
  id: number;
  color: string;
};

interface GameState {
  level: number;
  score: number;
  highScore: number;
  pattern: PatternItem[];
  userPattern: PatternItem[];
  isPlaying: boolean;
  isShowingPattern: boolean;
  gameStatus: 'idle' | 'watching' | 'playing' | 'success' | 'failed';
  lives: number;
  maxLives: number;
  
  startGame: () => void;
  addToPattern: () => void;
  addUserInput: (item: PatternItem) => void;
  resetUserPattern: () => void;
  checkPattern: () => boolean;
  nextLevel: () => void;
  resetGame: () => void;
  setGameStatus: (status: 'idle' | 'watching' | 'playing' | 'success' | 'failed') => void;
  setIsShowingPattern: (showing: boolean) => void;
}

const COLORS = [
  '#ef4444', // red
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // yellow
  '#8b5cf6', // purple
  '#ec4899', // pink
];

const useGameStore = create<GameState>((set, get) => ({
  level: 1,
  score: 0,
  highScore: parseInt(localStorage.getItem('memoryChainHighScore') || '0'),
  pattern: [],
  userPattern: [],
  isPlaying: false,
  isShowingPattern: false,
  gameStatus: 'idle',
  lives: 3,
  maxLives: 3,
  
  startGame: () => {
    set({
      level: 1,
      score: 0,
      pattern: [],
      userPattern: [],
      isPlaying: true,
      gameStatus: 'watching',
      lives: 3,
    });
    setTimeout(() => get().addToPattern(), 500);
  },
  
  addToPattern: () => {
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    const newItem: PatternItem = {
      id: Date.now(),
      color: randomColor,
    };
    
    set(state => ({
      pattern: [...state.pattern, newItem],
      isShowingPattern: true,
    }));
  },
  
  addUserInput: (item: PatternItem) => {
    const { pattern, userPattern } = get();
    const newUserPattern = [...userPattern, item];
    
    set({ userPattern: newUserPattern });
    
    // Check if the input is correct so far
    const index = newUserPattern.length - 1;
    if (pattern[index]?.color !== item.color) {
      // Wrong input
      const { lives } = get();
      if (lives > 1) {
        set(state => ({
          lives: state.lives - 1,
          userPattern: [],
          gameStatus: 'watching',
          isShowingPattern: true,
        }));
      } else {
        set({ gameStatus: 'failed', isPlaying: false });
        
        // Update high score if necessary
        const { score, highScore } = get();
        if (score > highScore) {
          localStorage.setItem('memoryChainHighScore', score.toString());
          set({ highScore: score });
        }
      }
      return false;
    }
    
    // Check if pattern is complete
    if (newUserPattern.length === pattern.length) {
      set({ gameStatus: 'success' });
      setTimeout(() => get().nextLevel(), 1000);
      return true;
    }
    
    return true;
  },
  
  resetUserPattern: () => {
    set({ userPattern: [] });
  },
  
  checkPattern: () => {
    const { pattern, userPattern } = get();
    
    if (pattern.length !== userPattern.length) return false;
    
    return pattern.every((item, index) => 
      item.color === userPattern[index]?.color
    );
  },
  
  nextLevel: () => {
    const { level, pattern } = get();
    const newScore = level * 10 + pattern.length * 5;
    
    set(state => ({
      level: state.level + 1,
      score: state.score + newScore,
      userPattern: [],
      gameStatus: 'watching',
    }));
    
    setTimeout(() => get().addToPattern(), 1000);
  },
  
  resetGame: () => {
    const { score, highScore } = get();
    
    if (score > highScore) {
      localStorage.setItem('memoryChainHighScore', score.toString());
      set({ highScore: score });
    }
    
    set({
      level: 1,
      score: 0,
      pattern: [],
      userPattern: [],
      isPlaying: false,
      isShowingPattern: false,
      gameStatus: 'idle',
      lives: 3,
    });
  },
  
  setGameStatus: (status) => {
    set({ gameStatus: status });
  },
  
  setIsShowingPattern: (showing) => {
    set({ isShowingPattern: showing });
  },
}));

export default useGameStore;