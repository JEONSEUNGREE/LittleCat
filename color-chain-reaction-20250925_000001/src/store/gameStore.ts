import { create } from 'zustand'

export type ColorType = 'red' | 'blue' | 'yellow' | 'purple' | 'green' | 'orange'

export interface Cell {
  id: string
  color: ColorType | null
  dots: number
  maxDots: number
  isExploding: boolean
  row: number
  col: number
}

interface GameState {
  grid: Cell[][]
  gridSize: number
  currentColor: ColorType
  score: number
  moves: number
  chainCount: number
  gameStatus: 'playing' | 'won' | 'menu'
  level: number
  targetScore: number
  
  initGame: (size?: number) => void
  placeColor: (row: number, col: number) => void
  nextTurn: () => void
  resetGame: () => void
  setGameStatus: (status: 'playing' | 'won' | 'menu') => void
  checkWinCondition: () => void
}

const COLORS: ColorType[] = ['red', 'blue', 'yellow', 'purple', 'green', 'orange']

const getMaxDots = (row: number, col: number, size: number): number => {
  const isCorner = (row === 0 || row === size - 1) && (col === 0 || col === size - 1)
  const isEdge = (row === 0 || row === size - 1 || col === 0 || col === size - 1) && !isCorner
  
  if (isCorner) return 2
  if (isEdge) return 3
  return 4
}

export const useGameStore = create<GameState>((set, get) => ({
  grid: [],
  gridSize: 8,
  currentColor: 'red',
  score: 0,
  moves: 0,
  chainCount: 0,
  gameStatus: 'menu',
  level: 1,
  targetScore: 100,
  
  initGame: (size = 8) => {
    const newGrid: Cell[][] = []
    for (let i = 0; i < size; i++) {
      const row: Cell[] = []
      for (let j = 0; j < size; j++) {
        row.push({
          id: `${i}-${j}`,
          color: null,
          dots: 0,
          maxDots: getMaxDots(i, j, size),
          isExploding: false,
          row: i,
          col: j
        })
      }
      newGrid.push(row)
    }
    
    set({
      grid: newGrid,
      gridSize: size,
      currentColor: COLORS[0],
      score: 0,
      moves: 0,
      chainCount: 0,
      gameStatus: 'playing',
      targetScore: 100 * get().level
    })
  },
  
  placeColor: (row: number, col: number) => {
    const state = get()
    if (state.gameStatus !== 'playing') return
    
    const grid = [...state.grid]
    const cell = grid[row][col]
    
    if (cell.color && cell.color !== state.currentColor) return
    
    cell.color = state.currentColor
    cell.dots++
    
    const explosions: [number, number][] = []
    
    const checkExplosion = (r: number, c: number) => {
      const checkCell = grid[r][c]
      if (checkCell.dots > checkCell.maxDots) {
        checkCell.isExploding = true
        checkCell.dots = 0
        explosions.push([r, c])
        
        set(prev => ({ 
          score: prev.score + 10 * (prev.chainCount + 1),
          chainCount: prev.chainCount + 1
        }))
        
        setTimeout(() => {
          distributeToNeighbors(r, c, checkCell.color!)
        }, 300)
      }
    }
    
    const distributeToNeighbors = (r: number, c: number, color: ColorType) => {
      const neighbors = [
        [r - 1, c],
        [r + 1, c],
        [r, c - 1],
        [r, c + 1]
      ]
      
      neighbors.forEach(([nr, nc]) => {
        if (nr >= 0 && nr < state.gridSize && nc >= 0 && nc < state.gridSize) {
          const neighborCell = grid[nr][nc]
          neighborCell.color = color
          neighborCell.dots++
          
          setTimeout(() => {
            checkExplosion(nr, nc)
          }, 150)
        }
      })
      
      grid[r][c].isExploding = false
      set({ grid: [...grid] })
    }
    
    checkExplosion(row, col)
    
    set({ 
      grid: [...grid], 
      moves: state.moves + 1 
    })
    
    setTimeout(() => {
      get().nextTurn()
      get().checkWinCondition()
    }, 500)
  },
  
  nextTurn: () => {
    const state = get()
    const currentIndex = COLORS.indexOf(state.currentColor)
    const nextIndex = (currentIndex + 1) % COLORS.length
    
    set({ 
      currentColor: COLORS[nextIndex],
      chainCount: 0 
    })
  },
  
  checkWinCondition: () => {
    const state = get()
    
    if (state.score >= state.targetScore) {
      set({ 
        gameStatus: 'won',
        level: state.level + 1 
      })
    }
  },
  
  resetGame: () => {
    get().initGame(get().gridSize)
  },
  
  setGameStatus: (status) => {
    set({ gameStatus: status })
  }
}))