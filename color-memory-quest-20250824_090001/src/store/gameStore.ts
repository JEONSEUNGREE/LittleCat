import { create } from 'zustand'

export interface GameState {
  level: number
  score: number
  highScore: number
  lives: number
  sequence: string[]
  userSequence: string[]
  isPlaying: boolean
  isShowingSequence: boolean
  currentColorIndex: number
  gameStatus: 'idle' | 'showing' | 'waiting' | 'success' | 'failed' | 'gameover'
  
  // Actions
  startGame: () => void
  resetGame: () => void
  showSequence: () => void
  addUserInput: (color: string) => void
  nextLevel: () => void
  loseLife: () => void
}

const COLORS = ['red', 'blue', 'green', 'yellow', 'purple', 'orange']

const generateSequence = (length: number): string[] => {
  const sequence: string[] = []
  for (let i = 0; i < length; i++) {
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)]
    sequence.push(randomColor)
  }
  return sequence
}

export const useGameStore = create<GameState>((set, get) => ({
  level: 1,
  score: 0,
  highScore: parseInt(localStorage.getItem('colorMemoryHighScore') || '0'),
  lives: 3,
  sequence: [],
  userSequence: [],
  isPlaying: false,
  isShowingSequence: false,
  currentColorIndex: -1,
  gameStatus: 'idle',

  startGame: () => {
    const initialSequence = generateSequence(3)
    set({
      level: 1,
      score: 0,
      lives: 3,
      sequence: initialSequence,
      userSequence: [],
      isPlaying: true,
      gameStatus: 'showing',
    })
    setTimeout(() => get().showSequence(), 500)
  },

  resetGame: () => {
    set({
      level: 1,
      score: 0,
      lives: 3,
      sequence: [],
      userSequence: [],
      isPlaying: false,
      isShowingSequence: false,
      currentColorIndex: -1,
      gameStatus: 'idle',
    })
  },

  showSequence: () => {
    set({ isShowingSequence: true, gameStatus: 'showing', userSequence: [] })
    const { sequence } = get()
    let index = 0
    
    const showNext = () => {
      if (index < sequence.length) {
        set({ currentColorIndex: COLORS.indexOf(sequence[index]) })
        setTimeout(() => {
          set({ currentColorIndex: -1 })
          index++
          setTimeout(showNext, 300)
        }, 600)
      } else {
        set({ isShowingSequence: false, gameStatus: 'waiting' })
      }
    }
    
    showNext()
  },

  addUserInput: (color: string) => {
    const { userSequence, sequence, isShowingSequence, gameStatus } = get()
    
    if (isShowingSequence || gameStatus !== 'waiting') return
    
    const newUserSequence = [...userSequence, color]
    set({ userSequence: newUserSequence })
    
    const currentIndex = newUserSequence.length - 1
    
    if (sequence[currentIndex] !== color) {
      get().loseLife()
      return
    }
    
    if (newUserSequence.length === sequence.length) {
      set({ gameStatus: 'success' })
      setTimeout(() => get().nextLevel(), 1000)
    }
  },

  nextLevel: () => {
    const { level, score } = get()
    const newLevel = level + 1
    const newScore = score + level * 100
    const sequenceLength = Math.min(3 + Math.floor(newLevel / 2), 10)
    const newSequence = generateSequence(sequenceLength)
    
    set({
      level: newLevel,
      score: newScore,
      sequence: newSequence,
      userSequence: [],
      gameStatus: 'showing',
    })
    
    if (newScore > get().highScore) {
      set({ highScore: newScore })
      localStorage.setItem('colorMemoryHighScore', newScore.toString())
    }
    
    setTimeout(() => get().showSequence(), 1000)
  },

  loseLife: () => {
    const { lives } = get()
    const newLives = lives - 1
    
    if (newLives <= 0) {
      set({ lives: 0, gameStatus: 'gameover', isPlaying: false })
    } else {
      set({ lives: newLives, gameStatus: 'failed', userSequence: [] })
      setTimeout(() => {
        set({ gameStatus: 'showing' })
        get().showSequence()
      }, 1500)
    }
  },
}))