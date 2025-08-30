import { create } from 'zustand'

export interface Obstacle {
  id: string
  x: number
  y: number
  width: number
  height: number
  speed: number
  type: 'asteroid' | 'comet' | 'debris'
}

interface GameState {
  isPlaying: boolean
  isPaused: boolean
  score: number
  highScore: number
  lives: number
  level: number
  shipPosition: { x: number; y: number }
  obstacles: Obstacle[]
  gameSpeed: number
  
  startGame: () => void
  endGame: () => void
  pauseGame: () => void
  resumeGame: () => void
  updateShipPosition: (x: number, y: number) => void
  addObstacle: (obstacle: Obstacle) => void
  removeObstacle: (id: string) => void
  updateObstacles: () => void
  incrementScore: (points: number) => void
  loseLife: () => void
  nextLevel: () => void
  resetGame: () => void
}

const useGameStore = create<GameState>((set, get) => ({
  isPlaying: false,
  isPaused: false,
  score: 0,
  highScore: parseInt(localStorage.getItem('spaceDodgeHighScore') || '0'),
  lives: 3,
  level: 1,
  shipPosition: { x: 50, y: 80 },
  obstacles: [],
  gameSpeed: 1,
  
  startGame: () => set({
    isPlaying: true,
    isPaused: false,
    score: 0,
    lives: 3,
    level: 1,
    obstacles: [],
    gameSpeed: 1,
    shipPosition: { x: 50, y: 80 }
  }),
  
  endGame: () => {
    const { score, highScore } = get()
    if (score > highScore) {
      localStorage.setItem('spaceDodgeHighScore', score.toString())
      set({ highScore: score })
    }
    set({ isPlaying: false, isPaused: false })
  },
  
  pauseGame: () => set({ isPaused: true }),
  resumeGame: () => set({ isPaused: false }),
  
  updateShipPosition: (x, y) => set({ shipPosition: { x, y } }),
  
  addObstacle: (obstacle) => set((state) => ({
    obstacles: [...state.obstacles, obstacle]
  })),
  
  removeObstacle: (id) => set((state) => ({
    obstacles: state.obstacles.filter(o => o.id !== id)
  })),
  
  updateObstacles: () => set((state) => ({
    obstacles: state.obstacles.map(o => ({
      ...o,
      y: o.y + o.speed * state.gameSpeed
    })).filter(o => o.y < 110)
  })),
  
  incrementScore: (points) => set((state) => ({
    score: state.score + points
  })),
  
  loseLife: () => set((state) => {
    const newLives = state.lives - 1
    if (newLives <= 0) {
      get().endGame()
    }
    return { lives: newLives }
  }),
  
  nextLevel: () => set((state) => ({
    level: state.level + 1,
    gameSpeed: Math.min(state.gameSpeed + 0.2, 3)
  })),
  
  resetGame: () => set({
    isPlaying: false,
    isPaused: false,
    score: 0,
    lives: 3,
    level: 1,
    obstacles: [],
    gameSpeed: 1,
    shipPosition: { x: 50, y: 80 }
  })
}))

export default useGameStore