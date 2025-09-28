import { create } from 'zustand'

export interface StorySegment {
  id: string
  emoji: string
  text: string
  author: string
  timestamp: number
}

interface GameState {
  currentStory: StorySegment[]
  selectedEmojis: string[]
  playerName: string
  score: number
  level: number
  gameMode: 'create' | 'challenge' | 'collaborative'
  challengePrompt: string
  timeRemaining: number
  isPlaying: boolean
  
  // Actions
  addSegment: (emoji: string, text: string) => void
  selectEmoji: (emoji: string) => void
  deselectEmoji: (emoji: string) => void
  clearSelectedEmojis: () => void
  setPlayerName: (name: string) => void
  setGameMode: (mode: 'create' | 'challenge' | 'collaborative') => void
  startGame: () => void
  endGame: () => void
  increaseScore: (points: number) => void
  nextLevel: () => void
  setTimeRemaining: (time: number) => void
  resetStory: () => void
}

const useGameStore = create<GameState>((set) => ({
  currentStory: [],
  selectedEmojis: [],
  playerName: 'Player',
  score: 0,
  level: 1,
  gameMode: 'create',
  challengePrompt: '',
  timeRemaining: 60,
  isPlaying: false,
  
  addSegment: (emoji, text) => set((state) => ({
    currentStory: [...state.currentStory, {
      id: Date.now().toString(),
      emoji,
      text,
      author: state.playerName,
      timestamp: Date.now()
    }],
    selectedEmojis: [],
    score: state.score + (text.length * 2)
  })),
  
  selectEmoji: (emoji) => set((state) => ({
    selectedEmojis: state.selectedEmojis.length < 5 
      ? [...state.selectedEmojis, emoji]
      : state.selectedEmojis
  })),
  
  deselectEmoji: (emoji) => set((state) => ({
    selectedEmojis: state.selectedEmojis.filter(e => e !== emoji)
  })),
  
  clearSelectedEmojis: () => set({ selectedEmojis: [] }),
  
  setPlayerName: (name) => set({ playerName: name }),
  
  setGameMode: (mode) => set({ gameMode: mode }),
  
  startGame: () => set({ isPlaying: true, score: 0, level: 1, currentStory: [] }),
  
  endGame: () => set({ isPlaying: false }),
  
  increaseScore: (points) => set((state) => ({ score: state.score + points })),
  
  nextLevel: () => set((state) => ({ level: state.level + 1 })),
  
  setTimeRemaining: (time) => set({ timeRemaining: time }),
  
  resetStory: () => set({ currentStory: [], selectedEmojis: [] })
}))

export default useGameStore