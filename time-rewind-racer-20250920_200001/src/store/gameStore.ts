import { create } from 'zustand'

export interface Position {
  x: number
  y: number
  timestamp: number
}

export interface Ghost {
  id: string
  path: Position[]
  color: string
  opacity: number
}

interface GameStore {
  gameState: 'idle' | 'playing' | 'paused' | 'gameover'
  score: number
  highScore: number
  level: number
  timeElapsed: number
  playerPosition: Position
  playerPath: Position[]
  ghosts: Ghost[]
  rewinds: number
  maxRewinds: number
  speed: number
  
  startGame: () => void
  pauseGame: () => void
  resumeGame: () => void
  endGame: () => void
  resetGame: () => void
  updatePlayerPosition: (x: number, y: number) => void
  rewindTime: () => void
  updateTimeElapsed: (time: number) => void
  addScore: (points: number) => void
  nextLevel: () => void
}

export const useGameStore = create<GameStore>((set, get) => ({
  gameState: 'idle',
  score: 0,
  highScore: parseInt(localStorage.getItem('timeRewindHighScore') || '0'),
  level: 1,
  timeElapsed: 0,
  playerPosition: { x: 50, y: 400, timestamp: 0 },
  playerPath: [],
  ghosts: [],
  rewinds: 3,
  maxRewinds: 3,
  speed: 2,

  startGame: () => {
    set({
      gameState: 'playing',
      score: 0,
      level: 1,
      timeElapsed: 0,
      playerPosition: { x: 50, y: 400, timestamp: 0 },
      playerPath: [],
      ghosts: [],
      rewinds: 3,
      speed: 2,
    })
  },

  pauseGame: () => set({ gameState: 'paused' }),
  resumeGame: () => set({ gameState: 'playing' }),
  
  endGame: () => {
    const { score, highScore } = get()
    const newHighScore = Math.max(score, highScore)
    localStorage.setItem('timeRewindHighScore', newHighScore.toString())
    set({ 
      gameState: 'gameover',
      highScore: newHighScore
    })
  },

  resetGame: () => {
    set({
      gameState: 'idle',
      score: 0,
      level: 1,
      timeElapsed: 0,
      playerPosition: { x: 50, y: 400, timestamp: 0 },
      playerPath: [],
      ghosts: [],
      rewinds: 3,
      speed: 2,
    })
  },

  updatePlayerPosition: (x: number, y: number) => {
    const { timeElapsed, playerPath } = get()
    const newPosition = { x, y, timestamp: timeElapsed }
    set({
      playerPosition: newPosition,
      playerPath: [...playerPath, newPosition]
    })
  },

  rewindTime: () => {
    const { rewinds, playerPath, ghosts, timeElapsed } = get()
    if (rewinds > 0 && playerPath.length > 10) {
      // Create ghost from current path
      const newGhost: Ghost = {
        id: `ghost-${Date.now()}`,
        path: [...playerPath],
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        opacity: 0.7
      }
      
      // Rewind to 3 seconds ago
      const rewindTo = Math.max(0, timeElapsed - 3000)
      const rewindIndex = playerPath.findIndex(p => p.timestamp >= rewindTo)
      const newPath = playerPath.slice(0, rewindIndex > 0 ? rewindIndex : 1)
      const newPosition = newPath[newPath.length - 1] || { x: 50, y: 400, timestamp: 0 }
      
      set({
        ghosts: [...ghosts, newGhost],
        rewinds: rewinds - 1,
        playerPath: newPath,
        playerPosition: newPosition,
        timeElapsed: rewindTo
      })
    }
  },

  updateTimeElapsed: (time: number) => set({ timeElapsed: time }),
  
  addScore: (points: number) => set(state => ({ score: state.score + points })),
  
  nextLevel: () => set(state => ({
    level: state.level + 1,
    speed: Math.min(state.speed + 0.5, 10),
    rewinds: state.maxRewinds,
    ghosts: [],
    playerPath: [],
    playerPosition: { x: 50, y: 400, timestamp: 0 }
  }))
}))