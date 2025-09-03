import { create } from 'zustand'

export type GameState = 'menu' | 'playing' | 'gameOver' | 'paused'
export type Difficulty = 'easy' | 'medium' | 'hard'

interface Point {
  x: number
  y: number
}

interface Pattern {
  id: string
  points: Point[]
  timeLimit: number
}

interface GameStore {
  gameState: GameState
  score: number
  highScore: number
  level: number
  lives: number
  difficulty: Difficulty
  currentPattern: Pattern | null
  userPath: Point[]
  isDrawing: boolean
  timeRemaining: number
  combo: number
  
  setGameState: (state: GameState) => void
  startGame: () => void
  endGame: () => void
  pauseGame: () => void
  resumeGame: () => void
  setDifficulty: (difficulty: Difficulty) => void
  generatePattern: () => void
  startDrawing: () => void
  addPoint: (point: Point) => void
  endDrawing: () => void
  checkPattern: () => boolean
  updateScore: (points: number) => void
  loseLife: () => void
  setTimeRemaining: (time: number) => void
  incrementCombo: () => void
  resetCombo: () => void
  nextLevel: () => void
  resetGame: () => void
}

const generateRandomPattern = (level: number, difficulty: Difficulty): Pattern => {
  const complexityMap = {
    easy: { minPoints: 3, maxPoints: 5, timeBase: 5000 },
    medium: { minPoints: 4, maxPoints: 7, timeBase: 4000 },
    hard: { minPoints: 5, maxPoints: 9, timeBase: 3000 }
  }
  
  const config = complexityMap[difficulty]
  const numPoints = Math.min(
    config.minPoints + Math.floor(level / 3),
    config.maxPoints
  )
  
  const points: Point[] = []
  const gridSize = 4
  const cellSize = 80
  const offset = 40
  
  const usedPositions = new Set<string>()
  
  while (points.length < numPoints) {
    const gridX = Math.floor(Math.random() * gridSize)
    const gridY = Math.floor(Math.random() * gridSize)
    const posKey = `${gridX},${gridY}`
    
    if (!usedPositions.has(posKey)) {
      usedPositions.add(posKey)
      points.push({
        x: gridX * cellSize + offset + Math.random() * 20 - 10,
        y: gridY * cellSize + offset + Math.random() * 20 - 10
      })
    }
  }
  
  return {
    id: `pattern-${Date.now()}`,
    points,
    timeLimit: config.timeBase - (level * 100)
  }
}

const calculateSimilarity = (pattern: Point[], userPath: Point[]): number => {
  if (userPath.length < 2) return 0
  
  const normalizePoints = (points: Point[]) => {
    const minX = Math.min(...points.map(p => p.x))
    const minY = Math.min(...points.map(p => p.y))
    const maxX = Math.max(...points.map(p => p.x))
    const maxY = Math.max(...points.map(p => p.y))
    const scaleX = maxX - minX || 1
    const scaleY = maxY - minY || 1
    
    return points.map(p => ({
      x: (p.x - minX) / scaleX,
      y: (p.y - minY) / scaleY
    }))
  }
  
  const simplifyPath = (points: Point[], targetLength: number) => {
    if (points.length <= targetLength) return points
    
    const simplified: Point[] = [points[0]]
    const step = (points.length - 1) / (targetLength - 1)
    
    for (let i = 1; i < targetLength - 1; i++) {
      const index = Math.round(i * step)
      simplified.push(points[index])
    }
    simplified.push(points[points.length - 1])
    
    return simplified
  }
  
  const normalizedPattern = normalizePoints(pattern)
  const normalizedUser = normalizePoints(simplifyPath(userPath, pattern.length))
  
  let totalDistance = 0
  for (let i = 0; i < normalizedPattern.length && i < normalizedUser.length; i++) {
    const dx = normalizedPattern[i].x - normalizedUser[i].x
    const dy = normalizedPattern[i].y - normalizedUser[i].y
    totalDistance += Math.sqrt(dx * dx + dy * dy)
  }
  
  const avgDistance = totalDistance / normalizedPattern.length
  const similarity = Math.max(0, 1 - avgDistance)
  
  return similarity
}

export const useGameStore = create<GameStore>((set, get) => ({
  gameState: 'menu',
  score: 0,
  highScore: parseInt(localStorage.getItem('patternFlowHighScore') || '0'),
  level: 1,
  lives: 3,
  difficulty: 'medium',
  currentPattern: null,
  userPath: [],
  isDrawing: false,
  timeRemaining: 0,
  combo: 0,
  
  setGameState: (state) => set({ gameState: state }),
  
  startGame: () => {
    set({
      gameState: 'playing',
      score: 0,
      level: 1,
      lives: 3,
      combo: 0,
      userPath: []
    })
    get().generatePattern()
  },
  
  endGame: () => {
    const { score, highScore } = get()
    if (score > highScore) {
      localStorage.setItem('patternFlowHighScore', score.toString())
      set({ highScore: score })
    }
    set({ gameState: 'gameOver' })
  },
  
  pauseGame: () => set({ gameState: 'paused' }),
  resumeGame: () => set({ gameState: 'playing' }),
  
  setDifficulty: (difficulty) => set({ difficulty }),
  
  generatePattern: () => {
    const { level, difficulty } = get()
    const pattern = generateRandomPattern(level, difficulty)
    set({
      currentPattern: pattern,
      timeRemaining: pattern.timeLimit,
      userPath: []
    })
  },
  
  startDrawing: () => set({ isDrawing: true, userPath: [] }),
  
  addPoint: (point) => {
    const { isDrawing, userPath } = get()
    if (isDrawing) {
      set({ userPath: [...userPath, point] })
    }
  },
  
  endDrawing: () => {
    set({ isDrawing: false })
    const success = get().checkPattern()
    
    if (success) {
      const { combo, level } = get()
      const basePoints = 100 * level
      const comboBonus = combo * 50
      get().updateScore(basePoints + comboBonus)
      get().incrementCombo()
      
      if (combo > 0 && combo % 5 === 0) {
        get().nextLevel()
      } else {
        get().generatePattern()
      }
    } else {
      get().resetCombo()
      get().loseLife()
    }
  },
  
  checkPattern: () => {
    const { currentPattern, userPath } = get()
    if (!currentPattern || userPath.length < 2) return false
    
    const similarity = calculateSimilarity(currentPattern.points, userPath)
    return similarity > 0.6 // 60% similarity threshold
  },
  
  updateScore: (points) => {
    set(state => ({ score: state.score + points }))
  },
  
  loseLife: () => {
    const { lives } = get()
    const newLives = lives - 1
    set({ lives: newLives })
    
    if (newLives <= 0) {
      get().endGame()
    } else {
      set({ userPath: [] })
    }
  },
  
  setTimeRemaining: (time) => set({ timeRemaining: time }),
  
  incrementCombo: () => {
    set(state => ({ combo: state.combo + 1 }))
  },
  
  resetCombo: () => set({ combo: 0 }),
  
  nextLevel: () => {
    set(state => ({ level: state.level + 1 }))
    get().generatePattern()
  },
  
  resetGame: () => {
    set({
      gameState: 'menu',
      score: 0,
      level: 1,
      lives: 3,
      combo: 0,
      currentPattern: null,
      userPath: [],
      isDrawing: false,
      timeRemaining: 0
    })
  }
}))