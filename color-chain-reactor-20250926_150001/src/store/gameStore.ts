import { create } from 'zustand'

export type CellColor = 'red' | 'blue' | 'yellow' | 'green' | 'purple' | 'orange' | null

export interface Cell {
  id: string
  color: CellColor
  isActive: boolean
  chainLevel: number
}

export interface GameState {
  grid: Cell[][]
  score: number
  moves: number
  level: number
  selectedColor: CellColor
  isGameActive: boolean
  chainMultiplier: number
  targetScore: number
}

interface GameStore extends GameState {
  initializeGrid: () => void
  selectCell: (row: number, col: number) => void
  setSelectedColor: (color: CellColor) => void
  resetGame: () => void
  checkWinCondition: () => boolean
}

const GRID_SIZE = 8
const COLORS: CellColor[] = ['red', 'blue', 'yellow', 'green', 'purple', 'orange']

const createEmptyGrid = (): Cell[][] => {
  const grid: Cell[][] = []
  for (let i = 0; i < GRID_SIZE; i++) {
    const row: Cell[] = []
    for (let j = 0; j < GRID_SIZE; j++) {
      row.push({
        id: `${i}-${j}`,
        color: null,
        isActive: false,
        chainLevel: 0
      })
    }
    grid.push(row)
  }
  return grid
}

const fillRandomColors = (grid: Cell[][]): void => {
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (Math.random() > 0.3) {
        grid[i][j].color = COLORS[Math.floor(Math.random() * COLORS.length)]
      }
    }
  }
}

export const useGameStore = create<GameStore>((set, get) => ({
  grid: createEmptyGrid(),
  score: 0,
  moves: 0,
  level: 1,
  selectedColor: 'red',
  isGameActive: true,
  chainMultiplier: 1,
  targetScore: 1000,

  initializeGrid: () => {
    const newGrid = createEmptyGrid()
    fillRandomColors(newGrid)
    set({ grid: newGrid, isGameActive: true })
  },

  selectCell: (row: number, col: number) => {
    const state = get()
    if (!state.isGameActive) return
    
    const grid = [...state.grid]
    const cell = grid[row][col]
    
    if (cell.color !== null) return
    
    cell.color = state.selectedColor
    cell.isActive = true
    
    // Trigger chain reaction
    const visitedCells = new Set<string>()
    let chainCount = 0
    
    const checkAdjacentCells = (r: number, c: number, color: CellColor) => {
      if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) return
      
      const cellKey = `${r}-${c}`
      if (visitedCells.has(cellKey)) return
      
      const currentCell = grid[r][c]
      if (currentCell.color !== color) return
      
      visitedCells.add(cellKey)
      currentCell.isActive = true
      currentCell.chainLevel = chainCount
      chainCount++
      
      // Check all 4 directions
      checkAdjacentCells(r - 1, c, color)
      checkAdjacentCells(r + 1, c, color)
      checkAdjacentCells(r, c - 1, color)
      checkAdjacentCells(r, c + 1, color)
    }
    
    checkAdjacentCells(row, col, state.selectedColor!)
    
    // Calculate score based on chain reaction
    const scoreIncrease = chainCount * 10 * state.chainMultiplier
    const newScore = state.score + scoreIncrease
    const newMoves = state.moves + 1
    
    // Check for chain combos
    const newMultiplier = chainCount > 3 ? Math.min(chainCount, 5) : 1
    
    set({
      grid,
      score: newScore,
      moves: newMoves,
      chainMultiplier: newMultiplier
    })
    
    // Deactivate cells after animation
    setTimeout(() => {
      const updatedGrid = get().grid.map(row =>
        row.map(cell => ({ ...cell, isActive: false, chainLevel: 0 }))
      )
      set({ grid: updatedGrid })
    }, 500)
    
    // Check win condition
    if (get().checkWinCondition()) {
      set({ isGameActive: false })
    }
  },

  setSelectedColor: (color: CellColor) => {
    set({ selectedColor: color })
  },

  resetGame: () => {
    const newGrid = createEmptyGrid()
    fillRandomColors(newGrid)
    set({
      grid: newGrid,
      score: 0,
      moves: 0,
      level: 1,
      selectedColor: 'red',
      isGameActive: true,
      chainMultiplier: 1
    })
  },

  checkWinCondition: () => {
    const state = get()
    return state.score >= state.targetScore
  }
}))