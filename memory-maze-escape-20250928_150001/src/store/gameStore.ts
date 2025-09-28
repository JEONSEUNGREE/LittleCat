import { create } from 'zustand'

export type Cell = {
  x: number
  y: number
  walls: {
    top: boolean
    right: boolean
    bottom: boolean
    left: boolean
  }
  isPath: boolean
  isStart: boolean
  isEnd: boolean
}

export type GameState = 'menu' | 'memorizing' | 'playing' | 'won' | 'lost'

interface GameStore {
  level: number
  score: number
  lives: number
  timeLeft: number
  memoryTime: number
  gameState: GameState
  maze: Cell[][]
  playerPosition: { x: number; y: number }
  mazeSize: number
  isVisible: boolean
  moveHistory: { x: number; y: number }[]
  
  startGame: () => void
  resetGame: () => void
  movePlayer: (direction: 'up' | 'down' | 'left' | 'right') => void
  setGameState: (state: GameState) => void
  generateMaze: (size: number) => void
  nextLevel: () => void
  decrementTime: () => void
  toggleVisibility: () => void
}

const generateMazeGrid = (size: number): Cell[][] => {
  const maze: Cell[][] = []
  
  for (let y = 0; y < size; y++) {
    maze[y] = []
    for (let x = 0; x < size; x++) {
      maze[y][x] = {
        x,
        y,
        walls: { top: true, right: true, bottom: true, left: true },
        isPath: false,
        isStart: x === 0 && y === 0,
        isEnd: x === size - 1 && y === size - 1
      }
    }
  }
  
  const stack: Cell[] = []
  let current = maze[0][0]
  current.isPath = true
  
  const getUnvisitedNeighbors = (cell: Cell) => {
    const neighbors: Cell[] = []
    const { x, y } = cell
    
    if (y > 0 && !maze[y - 1][x].isPath) neighbors.push(maze[y - 1][x])
    if (x < size - 1 && !maze[y][x + 1].isPath) neighbors.push(maze[y][x + 1])
    if (y < size - 1 && !maze[y + 1][x].isPath) neighbors.push(maze[y + 1][x])
    if (x > 0 && !maze[y][x - 1].isPath) neighbors.push(maze[y][x - 1])
    
    return neighbors
  }
  
  const removeWalls = (a: Cell, b: Cell) => {
    const dx = a.x - b.x
    const dy = a.y - b.y
    
    if (dx === 1) {
      a.walls.left = false
      b.walls.right = false
    } else if (dx === -1) {
      a.walls.right = false
      b.walls.left = false
    }
    
    if (dy === 1) {
      a.walls.top = false
      b.walls.bottom = false
    } else if (dy === -1) {
      a.walls.bottom = false
      b.walls.top = false
    }
  }
  
  while (true) {
    const neighbors = getUnvisitedNeighbors(current)
    
    if (neighbors.length > 0) {
      const next = neighbors[Math.floor(Math.random() * neighbors.length)]
      stack.push(current)
      removeWalls(current, next)
      current = next
      current.isPath = true
    } else if (stack.length > 0) {
      current = stack.pop()!
    } else {
      break
    }
  }
  
  return maze
}

export const useGameStore = create<GameStore>((set, get) => ({
  level: 1,
  score: 0,
  lives: 3,
  timeLeft: 60,
  memoryTime: 5,
  gameState: 'menu',
  maze: [],
  playerPosition: { x: 0, y: 0 },
  mazeSize: 5,
  isVisible: true,
  moveHistory: [],
  
  startGame: () => {
    const { level } = get()
    const size = Math.min(5 + Math.floor(level / 2), 10)
    const memoryTime = Math.max(5 - Math.floor(level / 3), 2)
    
    set({
      gameState: 'memorizing',
      mazeSize: size,
      memoryTime,
      playerPosition: { x: 0, y: 0 },
      moveHistory: [],
      isVisible: true,
      timeLeft: 60 + (level * 5)
    })
    
    get().generateMaze(size)
    
    setTimeout(() => {
      set({ isVisible: false, gameState: 'playing' })
    }, memoryTime * 1000)
  },
  
  resetGame: () => {
    set({
      level: 1,
      score: 0,
      lives: 3,
      gameState: 'menu',
      maze: [],
      playerPosition: { x: 0, y: 0 },
      mazeSize: 5,
      isVisible: true,
      moveHistory: []
    })
  },
  
  movePlayer: (direction) => {
    const { playerPosition, maze, gameState, mazeSize } = get()
    if (gameState !== 'playing') return
    
    const { x, y } = playerPosition
    let newX = x
    let newY = y
    
    const currentCell = maze[y][x]
    
    switch (direction) {
      case 'up':
        if (y > 0 && !currentCell.walls.top) newY = y - 1
        break
      case 'down':
        if (y < mazeSize - 1 && !currentCell.walls.bottom) newY = y + 1
        break
      case 'left':
        if (x > 0 && !currentCell.walls.left) newX = x - 1
        break
      case 'right':
        if (x < mazeSize - 1 && !currentCell.walls.right) newX = x + 1
        break
    }
    
    if (newX !== x || newY !== y) {
      const newPosition = { x: newX, y: newY }
      const { moveHistory } = get()
      
      set({
        playerPosition: newPosition,
        moveHistory: [...moveHistory, newPosition]
      })
      
      if (newX === mazeSize - 1 && newY === mazeSize - 1) {
        const { level, score } = get()
        set({
          gameState: 'won',
          score: score + (level * 100),
          isVisible: true
        })
      }
    }
  },
  
  setGameState: (state) => set({ gameState: state }),
  
  generateMaze: (size) => {
    const maze = generateMazeGrid(size)
    set({ maze, mazeSize: size })
  },
  
  nextLevel: () => {
    const { level } = get()
    set({
      level: level + 1,
      lives: 3
    })
    get().startGame()
  },
  
  decrementTime: () => {
    const { timeLeft, gameState, lives } = get()
    if (gameState !== 'playing') return
    
    if (timeLeft > 0) {
      set({ timeLeft: timeLeft - 1 })
    } else {
      set({
        gameState: 'lost',
        lives: Math.max(0, lives - 1),
        isVisible: true
      })
    }
  },
  
  toggleVisibility: () => {
    set({ isVisible: !get().isVisible })
  }
}))