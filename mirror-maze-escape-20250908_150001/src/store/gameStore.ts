import { create } from 'zustand'

export type CellType = 'empty' | 'wall' | 'mirror' | 'laser' | 'target' | 'beam'
export type Direction = 'up' | 'down' | 'left' | 'right'
export type MirrorType = '/' | '\\'

export interface Cell {
  type: CellType
  mirrorType?: MirrorType
  isBeamActive?: boolean
  beamDirection?: Direction[]
}

export interface Level {
  id: number
  name: string
  gridSize: number
  grid: Cell[][]
  laserPosition: { x: number; y: number }
  targetPosition: { x: number; y: number }
  initialMirrors: { x: number; y: number; type: MirrorType }[]
  walls: { x: number; y: number }[]
  maxMirrors: number
}

interface GameState {
  currentLevel: number
  levels: Level[]
  grid: Cell[][]
  placedMirrors: { x: number; y: number; type: MirrorType }[]
  isLevelComplete: boolean
  movesCount: number
  bestScores: Record<number, number>
  selectedMirrorType: MirrorType
  isBeamActive: boolean
  
  // Actions
  initLevel: (levelId: number) => void
  placeMirror: (x: number, y: number) => void
  removeMirror: (x: number, y: number) => void
  toggleMirrorType: () => void
  checkWinCondition: () => void
  nextLevel: () => void
  resetLevel: () => void
  calculateBeamPath: () => void
}

const createEmptyGrid = (size: number): Cell[][] => {
  return Array(size).fill(null).map(() => 
    Array(size).fill(null).map(() => ({ type: 'empty' as CellType }))
  )
}

const levels: Level[] = [
  {
    id: 1,
    name: "First Reflection",
    gridSize: 5,
    grid: createEmptyGrid(5),
    laserPosition: { x: 0, y: 2 },
    targetPosition: { x: 4, y: 2 },
    initialMirrors: [],
    walls: [
      { x: 2, y: 1 }, { x: 2, y: 3 }
    ],
    maxMirrors: 2
  },
  {
    id: 2,
    name: "Corner Challenge",
    gridSize: 6,
    grid: createEmptyGrid(6),
    laserPosition: { x: 0, y: 0 },
    targetPosition: { x: 5, y: 5 },
    initialMirrors: [{ x: 2, y: 2, type: '/' }],
    walls: [
      { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 4, y: 4 }
    ],
    maxMirrors: 3
  },
  {
    id: 3,
    name: "Maze Master",
    gridSize: 7,
    grid: createEmptyGrid(7),
    laserPosition: { x: 3, y: 0 },
    targetPosition: { x: 3, y: 6 },
    initialMirrors: [],
    walls: [
      { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 4, y: 2 }, { x: 5, y: 2 },
      { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4 },
      { x: 3, y: 3 }
    ],
    maxMirrors: 4
  }
]

export const useGameStore = create<GameState>((set, get) => ({
  currentLevel: 1,
  levels,
  grid: createEmptyGrid(5),
  placedMirrors: [],
  isLevelComplete: false,
  movesCount: 0,
  bestScores: {},
  selectedMirrorType: '/',
  isBeamActive: false,

  initLevel: (levelId) => {
    const level = levels.find(l => l.id === levelId)
    if (!level) return

    const newGrid = createEmptyGrid(level.gridSize)
    
    // Place laser
    newGrid[level.laserPosition.y][level.laserPosition.x] = { type: 'laser' }
    
    // Place target
    newGrid[level.targetPosition.y][level.targetPosition.x] = { type: 'target' }
    
    // Place walls
    level.walls.forEach(wall => {
      newGrid[wall.y][wall.x] = { type: 'wall' }
    })
    
    // Place initial mirrors
    level.initialMirrors.forEach(mirror => {
      newGrid[mirror.y][mirror.x] = { 
        type: 'mirror',
        mirrorType: mirror.type
      }
    })

    set({
      currentLevel: levelId,
      grid: newGrid,
      placedMirrors: [],
      isLevelComplete: false,
      movesCount: 0,
      isBeamActive: false
    })
    
    get().calculateBeamPath()
  },

  placeMirror: (x, y) => {
    const { grid, placedMirrors, selectedMirrorType, currentLevel } = get()
    const level = levels.find(l => l.id === currentLevel)
    if (!level) return

    if (grid[y][x].type !== 'empty') return
    if (placedMirrors.length >= level.maxMirrors) return

    const newGrid = [...grid]
    newGrid[y][x] = { 
      type: 'mirror',
      mirrorType: selectedMirrorType
    }

    const newPlacedMirrors = [...placedMirrors, { x, y, type: selectedMirrorType }]
    
    set({
      grid: newGrid,
      placedMirrors: newPlacedMirrors,
      movesCount: get().movesCount + 1
    })
    
    get().calculateBeamPath()
    get().checkWinCondition()
  },

  removeMirror: (x, y) => {
    const { grid, placedMirrors, currentLevel } = get()
    const level = levels.find(l => l.id === currentLevel)
    if (!level) return

    // Check if this is a placed mirror (not initial)
    const isInitialMirror = level.initialMirrors.some(m => m.x === x && m.y === y)
    if (isInitialMirror) return

    if (grid[y][x].type !== 'mirror') return

    const newGrid = [...grid]
    newGrid[y][x] = { type: 'empty' }

    const newPlacedMirrors = placedMirrors.filter(m => !(m.x === x && m.y === y))
    
    set({
      grid: newGrid,
      placedMirrors: newPlacedMirrors,
      movesCount: get().movesCount + 1
    })
    
    get().calculateBeamPath()
    get().checkWinCondition()
  },

  toggleMirrorType: () => {
    set(state => ({
      selectedMirrorType: state.selectedMirrorType === '/' ? '\\' : '/'
    }))
  },

  calculateBeamPath: () => {
    const { grid, currentLevel } = get()
    const level = levels.find(l => l.id === currentLevel)
    if (!level) return

    // Clear previous beam path
    const newGrid = grid.map(row => 
      row.map(cell => ({
        ...cell,
        isBeamActive: false,
        beamDirection: undefined
      }))
    )

    let x = level.laserPosition.x
    let y = level.laserPosition.y
    let direction: Direction = x === 0 ? 'right' : y === 0 ? 'down' : 'right'
    
    const visited = new Set<string>()
    let reachedTarget = false

    while (true) {
      // Move to next position based on direction
      let nextX = x
      let nextY = y
      
      if (direction === 'up') nextY--
      else if (direction === 'down') nextY++
      else if (direction === 'left') nextX--
      else if (direction === 'right') nextX++

      // Check bounds
      if (nextX < 0 || nextX >= level.gridSize || nextY < 0 || nextY >= level.gridSize) break

      x = nextX
      y = nextY

      const key = `${x},${y},${direction}`
      if (visited.has(key)) break // Loop detection
      visited.add(key)

      const cell = newGrid[y][x]

      // Check if hit wall
      if (cell.type === 'wall') break

      // Check if reached target
      if (cell.type === 'target') {
        reachedTarget = true
        cell.isBeamActive = true
        break
      }

      // Mark beam path
      if (cell.type === 'empty' || cell.type === 'mirror') {
        cell.isBeamActive = true
        if (!cell.beamDirection) cell.beamDirection = []
        cell.beamDirection.push(direction)
      }

      // Handle mirror reflection
      if (cell.type === 'mirror') {
        const mirrorType = cell.mirrorType
        if (mirrorType === '/') {
          if (direction === 'up') direction = 'right'
          else if (direction === 'down') direction = 'left'
          else if (direction === 'left') direction = 'down'
          else if (direction === 'right') direction = 'up'
        } else if (mirrorType === '\\') {
          if (direction === 'up') direction = 'left'
          else if (direction === 'down') direction = 'right'
          else if (direction === 'left') direction = 'up'
          else if (direction === 'right') direction = 'down'
        }
      }
    }

    set({ 
      grid: newGrid,
      isBeamActive: reachedTarget
    })
  },

  checkWinCondition: () => {
    const { isBeamActive, currentLevel, movesCount, bestScores } = get()
    
    if (isBeamActive) {
      const newBestScores = { ...bestScores }
      if (!newBestScores[currentLevel] || movesCount < newBestScores[currentLevel]) {
        newBestScores[currentLevel] = movesCount
      }
      
      set({ 
        isLevelComplete: true,
        bestScores: newBestScores
      })
    }
  },

  nextLevel: () => {
    const { currentLevel } = get()
    const nextLevelId = currentLevel + 1
    
    if (nextLevelId <= levels.length) {
      get().initLevel(nextLevelId)
    }
  },

  resetLevel: () => {
    const { currentLevel } = get()
    get().initLevel(currentLevel)
  }
}))