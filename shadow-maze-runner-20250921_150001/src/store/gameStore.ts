import { create } from 'zustand'

export interface Position {
  x: number
  y: number
}

interface GameState {
  playerPos: Position
  lightPos: Position
  exitPos: Position
  shadowOrbs: Position[]
  collectedOrbs: number[]
  level: number
  score: number
  moves: number
  isGameWon: boolean
  mazeWalls: boolean[][]
  movePlayer: (direction: 'up' | 'down' | 'left' | 'right') => void
  moveLight: (direction: 'up' | 'down' | 'left' | 'right') => void
  collectOrb: (index: number) => void
  checkWinCondition: () => void
  resetGame: () => void
  nextLevel: () => void
}

const MAZE_SIZE = 10

const generateMaze = (level: number): boolean[][] => {
  const maze = Array(MAZE_SIZE).fill(null).map(() => 
    Array(MAZE_SIZE).fill(false)
  )
  
  // Generate random walls based on level difficulty
  const wallDensity = Math.min(0.2 + (level * 0.02), 0.35)
  
  for (let y = 0; y < MAZE_SIZE; y++) {
    for (let x = 0; x < MAZE_SIZE; x++) {
      if (Math.random() < wallDensity && 
          !(x === 0 && y === 0) && 
          !(x === MAZE_SIZE - 1 && y === MAZE_SIZE - 1)) {
        maze[y][x] = true
      }
    }
  }
  
  return maze
}

const generateShadowOrbs = (level: number): Position[] => {
  const orbCount = Math.min(3 + Math.floor(level / 2), 8)
  const orbs: Position[] = []
  
  for (let i = 0; i < orbCount; i++) {
    orbs.push({
      x: Math.floor(Math.random() * MAZE_SIZE),
      y: Math.floor(Math.random() * MAZE_SIZE)
    })
  }
  
  return orbs
}

export const useGameStore = create<GameState>((set, get) => ({
  playerPos: { x: 0, y: 0 },
  lightPos: { x: 1, y: 1 },
  exitPos: { x: MAZE_SIZE - 1, y: MAZE_SIZE - 1 },
  shadowOrbs: generateShadowOrbs(1),
  collectedOrbs: [],
  level: 1,
  score: 0,
  moves: 0,
  isGameWon: false,
  mazeWalls: generateMaze(1),

  movePlayer: (direction) => {
    const { playerPos, mazeWalls, moves } = get()
    const newPos = { ...playerPos }

    switch (direction) {
      case 'up':
        if (newPos.y > 0) newPos.y--
        break
      case 'down':
        if (newPos.y < MAZE_SIZE - 1) newPos.y++
        break
      case 'left':
        if (newPos.x > 0) newPos.x--
        break
      case 'right':
        if (newPos.x < MAZE_SIZE - 1) newPos.x++
        break
    }

    // Check for wall collision
    if (!mazeWalls[newPos.y][newPos.x]) {
      set({ playerPos: newPos, moves: moves + 1 })
      get().checkWinCondition()
      
      // Check for orb collection
      const { shadowOrbs, collectedOrbs } = get()
      shadowOrbs.forEach((orb, index) => {
        if (orb.x === newPos.x && orb.y === newPos.y && 
            !collectedOrbs.includes(index)) {
          get().collectOrb(index)
        }
      })
    }
  },

  moveLight: (direction) => {
    const { lightPos } = get()
    const newPos = { ...lightPos }

    switch (direction) {
      case 'up':
        if (newPos.y > 0) newPos.y--
        break
      case 'down':
        if (newPos.y < MAZE_SIZE - 1) newPos.y++
        break
      case 'left':
        if (newPos.x > 0) newPos.x--
        break
      case 'right':
        if (newPos.x < MAZE_SIZE - 1) newPos.x++
        break
    }

    set({ lightPos: newPos })
  },

  collectOrb: (index) => {
    const { collectedOrbs, score } = get()
    set({
      collectedOrbs: [...collectedOrbs, index],
      score: score + 50
    })
  },

  checkWinCondition: () => {
    const { playerPos, exitPos, score, moves, level } = get()
    if (playerPos.x === exitPos.x && playerPos.y === exitPos.y) {
      const levelBonus = level * 100
      const moveBonus = Math.max(0, 100 - moves)
      set({
        isGameWon: true,
        score: score + levelBonus + moveBonus
      })
    }
  },

  resetGame: () => {
    const currentLevel = get().level
    const nextLevel = get().isGameWon ? currentLevel + 1 : 1
    
    set({
      playerPos: { x: 0, y: 0 },
      lightPos: { x: 1, y: 1 },
      exitPos: { x: MAZE_SIZE - 1, y: MAZE_SIZE - 1 },
      shadowOrbs: generateShadowOrbs(nextLevel),
      collectedOrbs: [],
      level: get().isGameWon ? nextLevel : 1,
      score: get().isGameWon ? get().score : 0,
      moves: 0,
      isGameWon: false,
      mazeWalls: generateMaze(nextLevel)
    })
  },

  nextLevel: () => {
    const { level } = get()
    const nextLevel = level + 1
    
    set({
      playerPos: { x: 0, y: 0 },
      lightPos: { x: 1, y: 1 },
      exitPos: { x: MAZE_SIZE - 1, y: MAZE_SIZE - 1 },
      shadowOrbs: generateShadowOrbs(nextLevel),
      collectedOrbs: [],
      level: nextLevel,
      moves: 0,
      isGameWon: false,
      mazeWalls: generateMaze(nextLevel)
    })
  }
}))