import { create } from 'zustand'

export interface Bubble {
  id: string
  x: number
  y: number
  color: string
  size: number
  velocityX: number
  velocityY: number
  isPopping: boolean
}

interface GameState {
  bubbles: Bubble[]
  score: number
  level: number
  lives: number
  isPlaying: boolean
  isPaused: boolean
  highScore: number
  combo: number
  targetColor: string

  addBubble: (bubble: Bubble) => void
  popBubble: (id: string) => void
  updateBubblePosition: (id: string, x: number, y: number) => void
  updateBubbleVelocity: (id: string, vx: number, vy: number) => void
  incrementScore: (points: number) => void
  incrementCombo: () => void
  resetCombo: () => void
  decrementLives: () => void
  startGame: () => void
  pauseGame: () => void
  resumeGame: () => void
  endGame: () => void
  nextLevel: () => void
  setTargetColor: (color: string) => void
  clearBubbles: () => void
}

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96E6A1', '#DDA0DD', '#FFD93D']

export const useGameStore = create<GameState>((set, get) => ({
  bubbles: [],
  score: 0,
  level: 1,
  lives: 3,
  isPlaying: false,
  isPaused: false,
  highScore: parseInt(localStorage.getItem('bubblePopHighScore') || '0'),
  combo: 0,
  targetColor: COLORS[0],

  addBubble: (bubble) => set((state) => ({
    bubbles: [...state.bubbles, bubble]
  })),

  popBubble: (id) => set((state) => ({
    bubbles: state.bubbles.map(b =>
      b.id === id ? { ...b, isPopping: true } : b
    )
  })),

  updateBubblePosition: (id, x, y) => set((state) => ({
    bubbles: state.bubbles.map(b =>
      b.id === id ? { ...b, x, y } : b
    )
  })),

  updateBubbleVelocity: (id, vx, vy) => set((state) => ({
    bubbles: state.bubbles.map(b =>
      b.id === id ? { ...b, velocityX: vx, velocityY: vy } : b
    )
  })),

  incrementScore: (points) => set((state) => {
    const newScore = state.score + points
    if (newScore > state.highScore) {
      localStorage.setItem('bubblePopHighScore', newScore.toString())
      return { score: newScore, highScore: newScore }
    }
    return { score: newScore }
  }),

  incrementCombo: () => set((state) => ({
    combo: state.combo + 1
  })),

  resetCombo: () => set({ combo: 0 }),

  decrementLives: () => set((state) => {
    const newLives = state.lives - 1
    if (newLives <= 0) {
      get().endGame()
    }
    return { lives: newLives }
  }),

  startGame: () => set({
    isPlaying: true,
    isPaused: false,
    score: 0,
    level: 1,
    lives: 3,
    combo: 0,
    bubbles: [],
    targetColor: COLORS[Math.floor(Math.random() * COLORS.length)]
  }),

  pauseGame: () => set({ isPaused: true }),

  resumeGame: () => set({ isPaused: false }),

  endGame: () => set({ isPlaying: false, isPaused: false }),

  nextLevel: () => set((state) => ({
    level: state.level + 1,
    lives: Math.min(state.lives + 1, 5),
    targetColor: COLORS[Math.floor(Math.random() * COLORS.length)],
    bubbles: []
  })),

  setTargetColor: (color) => set({ targetColor: color }),

  clearBubbles: () => set({ bubbles: [] })
}))
