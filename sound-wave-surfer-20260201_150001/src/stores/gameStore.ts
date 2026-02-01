import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameStore {
  // Game state
  isPlaying: boolean;
  isPaused: boolean;
  score: number;
  highScore: number;
  combo: number;
  maxCombo: number;
  surferPosition: number;
  audioData: number[];
  gameOver: boolean;
  level: number;

  // Audio state
  isListening: boolean;
  hasAudioPermission: boolean;

  // Actions
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  endGame: () => void;
  updateScore: (points: number) => void;
  updatePosition: (position: number) => void;
  updateAudioData: (data: number[]) => void;
  incrementCombo: () => void;
  resetCombo: () => void;
  resetGame: () => void;
  setListening: (listening: boolean) => void;
  setAudioPermission: (hasPermission: boolean) => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      // Initial state
      isPlaying: false,
      isPaused: false,
      score: 0,
      highScore: 0,
      combo: 0,
      maxCombo: 0,
      surferPosition: 50,
      audioData: Array(32).fill(0),
      gameOver: false,
      level: 1,
      isListening: false,
      hasAudioPermission: false,

      // Actions
      startGame: () => set({
        isPlaying: true,
        isPaused: false,
        score: 0,
        combo: 0,
        gameOver: false,
        surferPosition: 50,
        level: 1,
      }),

      pauseGame: () => set({ isPaused: true }),

      resumeGame: () => set({ isPaused: false }),

      endGame: () => {
        const { score, highScore, combo, maxCombo } = get();
        set({
          isPlaying: false,
          gameOver: true,
          highScore: Math.max(score, highScore),
          maxCombo: Math.max(combo, maxCombo),
        });
      },

      updateScore: (points: number) => {
        const { combo } = get();
        const multiplier = 1 + Math.floor(combo / 10) * 0.5;
        set((state) => ({
          score: state.score + Math.floor(points * multiplier),
        }));
      },

      updatePosition: (position: number) => set({
        surferPosition: Math.max(0, Math.min(100, position)),
      }),

      updateAudioData: (data: number[]) => set({ audioData: data }),

      incrementCombo: () => set((state) => ({
        combo: state.combo + 1,
        maxCombo: Math.max(state.combo + 1, state.maxCombo),
      })),

      resetCombo: () => set({ combo: 0 }),

      resetGame: () => set({
        isPlaying: false,
        isPaused: false,
        score: 0,
        combo: 0,
        surferPosition: 50,
        audioData: Array(32).fill(0),
        gameOver: false,
        level: 1,
      }),

      setListening: (listening: boolean) => set({ isListening: listening }),

      setAudioPermission: (hasPermission: boolean) => set({ hasAudioPermission: hasPermission }),
    }),
    {
      name: 'sound-wave-surfer-storage',
      partialize: (state) => ({
        highScore: state.highScore,
        maxCombo: state.maxCombo,
      }),
    }
  )
);
