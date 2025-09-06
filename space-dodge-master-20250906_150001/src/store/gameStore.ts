import { create } from 'zustand'

interface Asteroid {
  id: string
  x: number
  y: number
  size: number
  speed: number
}

interface GameState {
  isPlaying: boolean
  isGameOver: boolean
  score: number
  highScore: number
  spaceshipX: number
  spaceshipY: number
  asteroids: Asteroid[]
  difficulty: number
  
  startGame: () => void
  endGame: () => void
  updateSpaceship: (x: number, y: number) => void
  addAsteroid: (asteroid: Asteroid) => void
  removeAsteroid: (id: string) => void
  updateAsteroids: (asteroids: Asteroid[]) => void
  incrementScore: () => void
  increaseDifficulty: () => void
  resetGame: () => void
}

const useGameStore = create<GameState>((set, get) => ({
  isPlaying: false,
  isGameOver: false,
  score: 0,
  highScore: parseInt(localStorage.getItem('highScore') || '0'),
  spaceshipX: 50,
  spaceshipY: 50,
  asteroids: [],
  difficulty: 1,

  startGame: () => {
    set({
      isPlaying: true,
      isGameOver: false,
      score: 0,
      spaceshipX: 50,
      spaceshipY: 50,
      asteroids: [],
      difficulty: 1,
    })
  },

  endGame: () => {
    const { score, highScore } = get()
    const newHighScore = Math.max(score, highScore)
    localStorage.setItem('highScore', newHighScore.toString())
    set({
      isPlaying: false,
      isGameOver: true,
      highScore: newHighScore,
    })
  },

  updateSpaceship: (x, y) => set({ spaceshipX: x, spaceshipY: y }),

  addAsteroid: (asteroid) => 
    set((state) => ({ asteroids: [...state.asteroids, asteroid] })),

  removeAsteroid: (id) =>
    set((state) => ({ asteroids: state.asteroids.filter(a => a.id !== id) })),

  updateAsteroids: (asteroids) => set({ asteroids }),

  incrementScore: () => set((state) => ({ score: state.score + 1 })),

  increaseDifficulty: () => set((state) => ({ difficulty: state.difficulty + 0.1 })),

  resetGame: () => {
    set({
      isPlaying: false,
      isGameOver: false,
      score: 0,
      spaceshipX: 50,
      spaceshipY: 50,
      asteroids: [],
      difficulty: 1,
    })
  },
}))

export default useGameStore