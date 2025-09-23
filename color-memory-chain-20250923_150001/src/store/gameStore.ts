import { create } from 'zustand';

interface ColorNode {
  id: string;
  color: string;
  index: number;
}

interface GameState {
  level: number;
  score: number;
  highScore: number;
  isPlaying: boolean;
  isShowingSequence: boolean;
  gameStatus: 'idle' | 'showing' | 'playing' | 'success' | 'failed';
  sequence: ColorNode[];
  userSequence: ColorNode[];
  chainLength: number;
  lives: number;
  timeLeft: number;
  combo: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface GameActions {
  startGame: () => void;
  addToUserSequence: (node: ColorNode) => void;
  nextLevel: () => void;
  resetGame: () => void;
  setDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
  showSequence: () => void;
  checkSequence: () => boolean;
  loseLife: () => void;
  updateTimer: () => void;
  updateHighScore: () => void;
}

const COLORS = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  '#FED766', // Yellow
  '#95E77E', // Green
  '#DDA0FF', // Purple
  '#FFB6C1', // Pink
  '#FFA07A', // Orange
];

const getDifficultySettings = (difficulty: 'easy' | 'medium' | 'hard') => {
  switch (difficulty) {
    case 'easy':
      return { startLength: 3, showTime: 1500, playTime: 10, lives: 5 };
    case 'medium':
      return { startLength: 4, showTime: 1000, playTime: 8, lives: 3 };
    case 'hard':
      return { startLength: 5, showTime: 700, playTime: 6, lives: 2 };
    default:
      return { startLength: 3, showTime: 1500, playTime: 10, lives: 5 };
  }
};

export const useGameStore = create<GameState & GameActions>((set, get) => ({
  level: 1,
  score: 0,
  highScore: parseInt(localStorage.getItem('colorMemoryHighScore') || '0'),
  isPlaying: false,
  isShowingSequence: false,
  gameStatus: 'idle',
  sequence: [],
  userSequence: [],
  chainLength: 3,
  lives: 5,
  timeLeft: 10,
  combo: 0,
  difficulty: 'easy',

  startGame: () => {
    const { difficulty } = get();
    const settings = getDifficultySettings(difficulty);
    
    set({
      level: 1,
      score: 0,
      isPlaying: true,
      gameStatus: 'idle',
      sequence: [],
      userSequence: [],
      chainLength: settings.startLength,
      lives: settings.lives,
      timeLeft: settings.playTime,
      combo: 0,
    });

    setTimeout(() => {
      get().showSequence();
    }, 500);
  },

  showSequence: () => {
    const { chainLength, level } = get();
    const newSequence: ColorNode[] = [];
    
    for (let i = 0; i < chainLength; i++) {
      const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      newSequence.push({
        id: `${Date.now()}-${i}`,
        color: randomColor,
        index: i,
      });
    }

    set({
      sequence: newSequence,
      userSequence: [],
      isShowingSequence: true,
      gameStatus: 'showing',
    });

    const { difficulty } = get();
    const settings = getDifficultySettings(difficulty);

    setTimeout(() => {
      set({
        isShowingSequence: false,
        gameStatus: 'playing',
        timeLeft: settings.playTime,
      });
    }, settings.showTime * chainLength);
  },

  addToUserSequence: (node: ColorNode) => {
    const { userSequence, sequence, gameStatus } = get();
    
    if (gameStatus !== 'playing') return;

    const newUserSequence = [...userSequence, node];
    set({ userSequence: newUserSequence });

    if (newUserSequence.length === sequence.length) {
      const isCorrect = get().checkSequence();
      if (isCorrect) {
        set({ gameStatus: 'success', combo: get().combo + 1 });
        setTimeout(() => get().nextLevel(), 1000);
      } else {
        get().loseLife();
      }
    }
  },

  checkSequence: () => {
    const { userSequence, sequence } = get();
    
    for (let i = 0; i < userSequence.length; i++) {
      if (userSequence[i].color !== sequence[i].color) {
        return false;
      }
    }
    return true;
  },

  nextLevel: () => {
    const { level, score, combo, difficulty } = get();
    const settings = getDifficultySettings(difficulty);
    const bonusScore = (level * 100) + (combo * 50);
    
    set({
      level: level + 1,
      score: score + bonusScore,
      chainLength: Math.min(settings.startLength + Math.floor(level / 2), 10),
    });

    get().updateHighScore();
    setTimeout(() => get().showSequence(), 500);
  },

  loseLife: () => {
    const { lives, combo } = get();
    const newLives = lives - 1;
    
    set({
      lives: newLives,
      gameStatus: 'failed',
      combo: 0,
    });

    if (newLives <= 0) {
      get().updateHighScore();
      setTimeout(() => {
        set({ 
          isPlaying: false,
          gameStatus: 'idle',
        });
      }, 2000);
    } else {
      setTimeout(() => get().showSequence(), 1500);
    }
  },

  updateTimer: () => {
    const { timeLeft, gameStatus } = get();
    
    if (gameStatus === 'playing' && timeLeft > 0) {
      set({ timeLeft: timeLeft - 1 });
      
      if (timeLeft - 1 === 0) {
        get().loseLife();
      }
    }
  },

  updateHighScore: () => {
    const { score, highScore } = get();
    if (score > highScore) {
      set({ highScore: score });
      localStorage.setItem('colorMemoryHighScore', score.toString());
    }
  },

  resetGame: () => {
    set({
      level: 1,
      score: 0,
      isPlaying: false,
      isShowingSequence: false,
      gameStatus: 'idle',
      sequence: [],
      userSequence: [],
      chainLength: 3,
      lives: 5,
      timeLeft: 10,
      combo: 0,
    });
  },

  setDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => {
    set({ difficulty });
  },
}));