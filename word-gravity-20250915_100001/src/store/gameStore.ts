import { create } from 'zustand'

export interface Letter {
  id: string
  char: string
  x: number
  y: number
  velocityY: number
  velocityX: number
  isCollected: boolean
  isFalling: boolean
}

interface GameState {
  score: number
  level: number
  targetWord: string
  collectedLetters: string[]
  fallingLetters: Letter[]
  gameStatus: 'playing' | 'paused' | 'won' | 'lost'
  gravity: number
  timeLeft: number
  
  // Actions
  addLetter: (letter: Letter) => void
  collectLetter: (id: string) => void
  updateLetterPosition: (id: string, x: number, y: number) => void
  updatePhysics: () => void
  startNewLevel: () => void
  setGameStatus: (status: 'playing' | 'paused' | 'won' | 'lost') => void
  updateTimeLeft: (time: number) => void
  resetGame: () => void
}

const WORDS_POOL = [
  'GRAVITY', 'PHYSICS', 'PUZZLE', 'MOBILE', 'ENERGY',
  'PLANET', 'SPACE', 'COSMIC', 'ORBIT', 'FORCE',
  'MOTION', 'SPEED', 'POWER', 'LIGHT', 'WAVE'
]

const getRandomWord = () => {
  return WORDS_POOL[Math.floor(Math.random() * WORDS_POOL.length)]
}

export const useGameStore = create<GameState>((set, get) => ({
  score: 0,
  level: 1,
  targetWord: getRandomWord(),
  collectedLetters: [],
  fallingLetters: [],
  gameStatus: 'playing',
  gravity: 0.3,
  timeLeft: 60,

  addLetter: (letter) => set((state) => ({
    fallingLetters: [...state.fallingLetters, letter]
  })),

  collectLetter: (id) => set((state) => {
    const letter = state.fallingLetters.find(l => l.id === id)
    if (!letter || letter.isCollected) return state

    const newCollectedLetters = [...state.collectedLetters, letter.char]
    const newFallingLetters = state.fallingLetters.map(l =>
      l.id === id ? { ...l, isCollected: true } : l
    )

    // Check if word is complete
    const targetLetters = state.targetWord.split('')
    const isComplete = targetLetters.every(char =>
      newCollectedLetters.includes(char)
    )

    return {
      fallingLetters: newFallingLetters,
      collectedLetters: newCollectedLetters,
      score: state.score + 10,
      gameStatus: isComplete ? 'won' : state.gameStatus
    }
  }),

  updateLetterPosition: (id, x, y) => set((state) => ({
    fallingLetters: state.fallingLetters.map(letter =>
      letter.id === id ? { ...letter, x, y } : letter
    )
  })),

  updatePhysics: () => set((state) => ({
    fallingLetters: state.fallingLetters.map(letter => {
      if (letter.isCollected || !letter.isFalling) return letter

      const newVelocityY = letter.velocityY + state.gravity
      const newY = letter.y + newVelocityY
      const newX = letter.x + letter.velocityX

      // Bounce off walls
      let newVelocityX = letter.velocityX
      if (newX <= 0 || newX >= window.innerWidth - 40) {
        newVelocityX = -letter.velocityX * 0.8
      }

      return {
        ...letter,
        y: newY,
        x: Math.max(0, Math.min(window.innerWidth - 40, newX)),
        velocityY: newVelocityY,
        velocityX: newVelocityX
      }
    })
  })),

  startNewLevel: () => set((state) => ({
    level: state.level + 1,
    targetWord: getRandomWord(),
    collectedLetters: [],
    fallingLetters: [],
    gravity: Math.min(0.8, state.gravity + 0.05),
    timeLeft: 60,
    gameStatus: 'playing'
  })),

  setGameStatus: (status) => set({ gameStatus: status }),

  updateTimeLeft: (time) => set({ timeLeft: time }),

  resetGame: () => set({
    score: 0,
    level: 1,
    targetWord: getRandomWord(),
    collectedLetters: [],
    fallingLetters: [],
    gameStatus: 'playing',
    gravity: 0.3,
    timeLeft: 60
  })
}))