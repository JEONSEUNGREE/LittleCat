import { create } from 'zustand'

export interface LightSource {
  id: string
  x: number
  y: number
  angle: number
  intensity: number
  active: boolean
}

export interface GameObject {
  id: string
  x: number
  y: number
  width: number
  height: number
  shape: 'rectangle' | 'circle' | 'triangle'
  rotation: number
}

export interface Shadow {
  id: string
  sourceId: string
  objectId: string
  points: { x: number; y: number }[]
}

export interface PuzzleGoal {
  targetShape: string
  completed: boolean
}

interface GameState {
  level: number
  score: number
  moves: number
  lightSources: LightSource[]
  gameObjects: GameObject[]
  shadows: Shadow[]
  goal: PuzzleGoal | null
  isPlaying: boolean
  isPaused: boolean
  
  // Actions
  startGame: () => void
  pauseGame: () => void
  resumeGame: () => void
  resetLevel: () => void
  nextLevel: () => void
  updateLightAngle: (id: string, angle: number) => void
  updateLightPosition: (id: string, x: number, y: number) => void
  toggleLight: (id: string) => void
  checkWinCondition: () => boolean
  incrementMoves: () => void
}

const initialLevels = [
  {
    lightSources: [
      { id: 'light1', x: 50, y: 20, angle: 45, intensity: 100, active: true }
    ],
    gameObjects: [
      { id: 'obj1', x: 50, y: 50, width: 15, height: 15, shape: 'rectangle' as const, rotation: 0 }
    ],
    goal: { targetShape: 'square', completed: false }
  },
  {
    lightSources: [
      { id: 'light1', x: 30, y: 20, angle: 60, intensity: 100, active: true },
      { id: 'light2', x: 70, y: 20, angle: 120, intensity: 100, active: false }
    ],
    gameObjects: [
      { id: 'obj1', x: 40, y: 50, width: 10, height: 20, shape: 'rectangle' as const, rotation: 0 },
      { id: 'obj2', x: 60, y: 50, width: 10, height: 20, shape: 'rectangle' as const, rotation: 0 }
    ],
    goal: { targetShape: 'bridge', completed: false }
  },
  {
    lightSources: [
      { id: 'light1', x: 50, y: 10, angle: 90, intensity: 100, active: true },
      { id: 'light2', x: 20, y: 30, angle: 45, intensity: 80, active: true },
      { id: 'light3', x: 80, y: 30, angle: 135, intensity: 80, active: true }
    ],
    gameObjects: [
      { id: 'obj1', x: 50, y: 40, width: 20, height: 20, shape: 'triangle' as const, rotation: 0 }
    ],
    goal: { targetShape: 'star', completed: false }
  }
]

export const useGameStore = create<GameState>((set, get) => ({
  level: 0,
  score: 0,
  moves: 0,
  lightSources: [],
  gameObjects: [],
  shadows: [],
  goal: null,
  isPlaying: false,
  isPaused: false,
  
  startGame: () => {
    const levelData = initialLevels[0]
    set({
      level: 1,
      score: 0,
      moves: 0,
      lightSources: [...levelData.lightSources],
      gameObjects: [...levelData.gameObjects],
      goal: { ...levelData.goal },
      isPlaying: true,
      isPaused: false
    })
  },
  
  pauseGame: () => set({ isPaused: true }),
  
  resumeGame: () => set({ isPaused: false }),
  
  resetLevel: () => {
    const { level } = get()
    const levelData = initialLevels[level - 1]
    if (levelData) {
      set({
        moves: 0,
        lightSources: [...levelData.lightSources],
        gameObjects: [...levelData.gameObjects],
        goal: { ...levelData.goal },
        isPaused: false
      })
    }
  },
  
  nextLevel: () => {
    const { level, score, moves } = get()
    const bonus = Math.max(100 - moves * 2, 10)
    const nextLevelIndex = level
    
    if (nextLevelIndex < initialLevels.length) {
      const levelData = initialLevels[nextLevelIndex]
      set({
        level: level + 1,
        score: score + bonus,
        moves: 0,
        lightSources: [...levelData.lightSources],
        gameObjects: [...levelData.gameObjects],
        goal: { ...levelData.goal },
        isPaused: false
      })
    } else {
      set({
        isPlaying: false,
        isPaused: false
      })
    }
  },
  
  updateLightAngle: (id: string, angle: number) => {
    set((state) => ({
      lightSources: state.lightSources.map(light =>
        light.id === id ? { ...light, angle } : light
      )
    }))
    get().incrementMoves()
  },
  
  updateLightPosition: (id: string, x: number, y: number) => {
    set((state) => ({
      lightSources: state.lightSources.map(light =>
        light.id === id ? { ...light, x, y } : light
      )
    }))
    get().incrementMoves()
  },
  
  toggleLight: (id: string) => {
    set((state) => ({
      lightSources: state.lightSources.map(light =>
        light.id === id ? { ...light, active: !light.active } : light
      )
    }))
    get().incrementMoves()
  },
  
  checkWinCondition: () => {
    // Simplified win condition - can be enhanced with actual shadow shape detection
    const { lightSources, moves } = get()
    const allLightsActive = lightSources.filter(l => l.active).length >= 1
    const minMoves = moves >= 3
    
    if (allLightsActive && minMoves) {
      set((state) => ({
        goal: state.goal ? { ...state.goal, completed: true } : null
      }))
      return true
    }
    return false
  },
  
  incrementMoves: () => {
    set((state) => ({ moves: state.moves + 1 }))
  }
}))