import { create } from 'zustand'

export interface Pattern {
  id: number
  frequency: number
  duration: number
  delay: number
}

interface GameState {
  score: number
  level: number
  lives: number
  isPlaying: boolean
  isShowingPattern: boolean
  currentPattern: Pattern[]
  userPattern: Pattern[]
  highScore: number
  combo: number
  
  // Actions
  startGame: () => void
  endGame: () => void
  generatePattern: () => void
  addUserInput: (pattern: Pattern) => void
  checkPattern: () => boolean
  nextLevel: () => void
  loseLife: () => void
  updateScore: (points: number) => void
  resetUserPattern: () => void
}

const generateRandomPattern = (length: number): Pattern[] => {
  const frequencies = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25] // C4 to C5
  const patterns: Pattern[] = []
  
  for (let i = 0; i < length; i++) {
    patterns.push({
      id: i,
      frequency: frequencies[Math.floor(Math.random() * frequencies.length)],
      duration: 300 + Math.random() * 200, // 300-500ms
      delay: i * 600 // 600ms between each sound
    })
  }
  
  return patterns
}

const useGameStore = create<GameState>((set, get) => ({
  score: 0,
  level: 1,
  lives: 3,
  isPlaying: false,
  isShowingPattern: false,
  currentPattern: [],
  userPattern: [],
  highScore: parseInt(localStorage.getItem('memoryWaveHighScore') || '0'),
  combo: 0,
  
  startGame: () => {
    set({
      score: 0,
      level: 1,
      lives: 3,
      isPlaying: true,
      combo: 0,
      currentPattern: generateRandomPattern(3),
      userPattern: []
    })
  },
  
  endGame: () => {
    const { score, highScore } = get()
    if (score > highScore) {
      localStorage.setItem('memoryWaveHighScore', score.toString())
      set({ highScore: score })
    }
    set({
      isPlaying: false,
      currentPattern: [],
      userPattern: []
    })
  },
  
  generatePattern: () => {
    const { level } = get()
    const patternLength = Math.min(3 + Math.floor(level / 2), 10) // Max 10 patterns
    set({
      currentPattern: generateRandomPattern(patternLength),
      userPattern: [],
      isShowingPattern: true
    })
    
    // Auto hide pattern after showing
    setTimeout(() => {
      set({ isShowingPattern: false })
    }, patternLength * 600 + 500)
  },
  
  addUserInput: (pattern: Pattern) => {
    const { userPattern } = get()
    set({ userPattern: [...userPattern, pattern] })
  },
  
  checkPattern: () => {
    const { currentPattern, userPattern } = get()
    
    if (userPattern.length !== currentPattern.length) return false
    
    // Check if frequencies match (with some tolerance)
    for (let i = 0; i < currentPattern.length; i++) {
      const tolerance = 20 // Hz tolerance
      const diff = Math.abs(currentPattern[i].frequency - userPattern[i].frequency)
      if (diff > tolerance) return false
    }
    
    return true
  },
  
  nextLevel: () => {
    const { level, combo } = get()
    const bonusPoints = 100 * level + combo * 10
    set((state) => ({
      level: state.level + 1,
      combo: state.combo + 1,
      score: state.score + bonusPoints
    }))
    
    // Generate new pattern for next level
    setTimeout(() => {
      get().generatePattern()
    }, 1000)
  },
  
  loseLife: () => {
    set((state) => ({
      lives: state.lives - 1,
      combo: 0
    }))
    
    const { lives } = get()
    if (lives <= 0) {
      get().endGame()
    }
  },
  
  updateScore: (points: number) => {
    set((state) => ({ score: state.score + points }))
  },
  
  resetUserPattern: () => {
    set({ userPattern: [] })
  }
}))

export default useGameStore