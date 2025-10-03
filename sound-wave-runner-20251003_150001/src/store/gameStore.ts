import { create } from 'zustand'

type GameState = 'menu' | 'playing' | 'paused' | 'gameOver'

interface GameStore {
  gameState: GameState
  score: number
  highScore: number
  level: number
  lives: number
  soundIntensity: number
  rhythm: number
  isJumping: boolean
  obstacles: Obstacle[]
  wavePoints: number[]
  
  setGameState: (state: GameState) => void
  increaseScore: (points: number) => void
  decreaseLife: () => void
  setSoundIntensity: (intensity: number) => void
  setRhythm: (rhythm: number) => void
  setJumping: (jumping: boolean) => void
  addObstacle: (obstacle: Obstacle) => void
  removeObstacle: (id: string) => void
  updateWavePoints: (points: number[]) => void
  resetGame: () => void
  nextLevel: () => void
}

export interface Obstacle {
  id: string
  position: number
  height: number
  type: 'spike' | 'gap' | 'wave'
  speed: number
}

const useGameStore = create<GameStore>((set) => ({
  gameState: 'menu',
  score: 0,
  highScore: parseInt(localStorage.getItem('highScore') || '0'),
  level: 1,
  lives: 3,
  soundIntensity: 0,
  rhythm: 0,
  isJumping: false,
  obstacles: [],
  wavePoints: Array(50).fill(0),
  
  setGameState: (state) => set({ gameState: state }),
  
  increaseScore: (points) => set((state) => {
    const newScore = state.score + points
    const newHighScore = Math.max(newScore, state.highScore)
    localStorage.setItem('highScore', newHighScore.toString())
    return { score: newScore, highScore: newHighScore }
  }),
  
  decreaseLife: () => set((state) => {
    const newLives = state.lives - 1
    if (newLives <= 0) {
      return { lives: 0, gameState: 'gameOver' }
    }
    return { lives: newLives }
  }),
  
  setSoundIntensity: (intensity) => set({ soundIntensity: intensity }),
  
  setRhythm: (rhythm) => set({ rhythm }),
  
  setJumping: (jumping) => set({ isJumping: jumping }),
  
  addObstacle: (obstacle) => set((state) => ({
    obstacles: [...state.obstacles, obstacle]
  })),
  
  removeObstacle: (id) => set((state) => ({
    obstacles: state.obstacles.filter((o) => o.id !== id)
  })),
  
  updateWavePoints: (points) => set({ wavePoints: points }),
  
  resetGame: () => set({
    gameState: 'playing',
    score: 0,
    level: 1,
    lives: 3,
    soundIntensity: 0,
    rhythm: 0,
    isJumping: false,
    obstacles: [],
    wavePoints: Array(50).fill(0)
  }),
  
  nextLevel: () => set((state) => ({
    level: state.level + 1,
    lives: Math.min(state.lives + 1, 5)
  }))
}))

export default useGameStore