import { create } from 'zustand';
import { GameState, Pattern, Note, UserProgress } from '../types';

interface RhythmStore extends GameState {
  userProgress: UserProgress;
  setCurrentPattern: (pattern: Pattern | null) => void;
  addUserInput: (note: Note) => void;
  clearUserInput: () => void;
  updateScore: (points: number) => void;
  updateStreak: (increment: boolean) => void;
  setPlaying: (playing: boolean) => void;
  setListening: (listening: boolean) => void;
  setFeedback: (feedback: string) => void;
  updateProgress: (patternId: string, accuracy: number) => void;
  resetGame: () => void;
}

export const useRhythmStore = create<RhythmStore>((set) => ({
  currentPattern: null,
  userInput: [],
  score: 0,
  streak: 0,
  isPlaying: false,
  isListening: false,
  feedback: '',
  userProgress: {
    completedPatterns: [],
    totalScore: 0,
    bestStreak: 0,
    accuracy: 0
  },

  setCurrentPattern: (pattern) => set({ currentPattern: pattern }),
  
  addUserInput: (note) => set((state) => ({
    userInput: [...state.userInput, note]
  })),
  
  clearUserInput: () => set({ userInput: [] }),
  
  updateScore: (points) => set((state) => ({
    score: state.score + points,
    userProgress: {
      ...state.userProgress,
      totalScore: state.userProgress.totalScore + points
    }
  })),
  
  updateStreak: (increment) => set((state) => {
    const newStreak = increment ? state.streak + 1 : 0;
    return {
      streak: newStreak,
      userProgress: {
        ...state.userProgress,
        bestStreak: Math.max(newStreak, state.userProgress.bestStreak)
      }
    };
  }),
  
  setPlaying: (playing) => set({ isPlaying: playing }),
  
  setListening: (listening) => set({ isListening: listening }),
  
  setFeedback: (feedback) => set({ feedback }),
  
  updateProgress: (patternId, accuracy) => set((state) => ({
    userProgress: {
      ...state.userProgress,
      completedPatterns: state.userProgress.completedPatterns.includes(patternId)
        ? state.userProgress.completedPatterns
        : [...state.userProgress.completedPatterns, patternId],
      accuracy: (state.userProgress.accuracy + accuracy) / 2
    }
  })),
  
  resetGame: () => set({
    currentPattern: null,
    userInput: [],
    score: 0,
    streak: 0,
    isPlaying: false,
    isListening: false,
    feedback: ''
  })
}));