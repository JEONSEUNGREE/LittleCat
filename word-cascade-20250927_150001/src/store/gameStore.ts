import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { GameState, FallingWord } from '../types';

const WORD_POOL = [
  // Easy words (3-4 letters)
  'cat', 'dog', 'sun', 'moon', 'star', 'rain', 'wind', 'fire', 'ice', 'snow',
  'tree', 'leaf', 'bird', 'fish', 'bear', 'lion', 'wolf', 'deer', 'rose', 'lily',
  
  // Medium words (5-6 letters)
  'ocean', 'river', 'mount', 'cloud', 'storm', 'light', 'dream', 'music', 'dance', 'smile',
  'heart', 'peace', 'hope', 'faith', 'trust', 'brave', 'power', 'magic', 'fairy', 'angel',
  
  // Hard words (7+ letters)
  'rainbow', 'thunder', 'freedom', 'journey', 'courage', 'victory', 'believe', 'inspire',
  'amazing', 'perfect', 'awesome', 'crystal', 'diamond', 'emerald', 'phoenix', 'dragon'
];

const COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
  '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
  '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
  '#ec4899', '#f43f5e'
];

interface GameStore extends GameState {
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  endGame: () => void;
  updateTypedWord: (word: string) => void;
  checkWord: () => void;
  updateWords: (deltaTime: number) => void;
  spawnWord: () => void;
  removeWord: (id: string) => void;
  resetCombo: () => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      score: 0,
      lives: 5,
      level: 1,
      isPlaying: false,
      isPaused: false,
      highScore: 0,
      combo: 0,
      words: [],
      typedWord: '',
      completedWords: 0,
      gameSpeed: 1,

      startGame: () => {
        set({
          score: 0,
          lives: 5,
          level: 1,
          isPlaying: true,
          isPaused: false,
          combo: 0,
          words: [],
          typedWord: '',
          completedWords: 0,
          gameSpeed: 1,
        });
      },

      pauseGame: () => set({ isPaused: true }),
      resumeGame: () => set({ isPaused: false }),

      endGame: () => {
        const { score, highScore } = get();
        set({
          isPlaying: false,
          isPaused: false,
          highScore: Math.max(score, highScore),
          words: [],
          typedWord: ''
        });
      },

      updateTypedWord: (word: string) => set({ typedWord: word.toLowerCase() }),

      checkWord: () => {
        const { typedWord, words, score, combo, completedWords } = get();
        const matchedWord = words.find(w => w.word === typedWord);
        
        if (matchedWord) {
          const newCombo = combo + 1;
          const comboBonus = Math.floor(newCombo / 3) * 10;
          const newScore = score + matchedWord.points + comboBonus;
          const newCompletedWords = completedWords + 1;
          
          // Level up every 10 words
          const newLevel = Math.floor(newCompletedWords / 10) + 1;
          const newGameSpeed = 1 + (newLevel - 1) * 0.2;
          
          set({
            score: newScore,
            combo: newCombo,
            completedWords: newCompletedWords,
            level: newLevel,
            gameSpeed: newGameSpeed,
            typedWord: '',
            words: words.filter(w => w.id !== matchedWord.id)
          });
        }
      },

      updateWords: (deltaTime: number) => {
        const { words, lives, isPlaying, isPaused, gameSpeed } = get();
        if (!isPlaying || isPaused) return;
        
        const updatedWords = words.map(word => ({
          ...word,
          y: word.y + word.speed * deltaTime * gameSpeed
        }));
        
        // Check for words that reached the bottom
        const missedWords = updatedWords.filter(word => word.y > window.innerHeight - 100);
        const remainingWords = updatedWords.filter(word => word.y <= window.innerHeight - 100);
        
        if (missedWords.length > 0) {
          const newLives = lives - missedWords.length;
          if (newLives <= 0) {
            get().endGame();
          } else {
            set({ 
              lives: newLives,
              combo: 0,
              words: remainingWords
            });
          }
        } else {
          set({ words: updatedWords });
        }
      },

      spawnWord: () => {
        const { words, level } = get();
        if (words.length >= 8) return; // Max 8 words on screen
        
        // Select word based on level
        const maxWordLength = Math.min(4 + Math.floor(level / 2), 8);
        const availableWords = WORD_POOL.filter(w => w.length <= maxWordLength);
        const word = availableWords[Math.floor(Math.random() * availableWords.length)];
        
        const newWord: FallingWord = {
          id: Date.now().toString() + Math.random(),
          word: word,
          x: Math.random() * (window.innerWidth - 150) + 50,
          y: -50,
          speed: 30 + Math.random() * 20 + level * 5,
          points: word.length * 10,
          color: COLORS[Math.floor(Math.random() * COLORS.length)]
        };
        
        set({ words: [...words, newWord] });
      },

      removeWord: (id: string) => {
        set({ words: get().words.filter(w => w.id !== id) });
      },

      resetCombo: () => set({ combo: 0 }),
    }),
    {
      name: 'word-cascade-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ highScore: state.highScore })
    }
  )
);