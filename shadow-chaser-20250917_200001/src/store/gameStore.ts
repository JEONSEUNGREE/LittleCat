import { create } from 'zustand'

export interface Position {
  x: number
  y: number
}

export interface LightSource {
  id: string
  position: Position
  intensity: number
  color: string
}

export interface ShadowObject {
  id: string
  position: Position
  size: { width: number; height: number }
  rotation: number
}

interface GameState {
  level: number
  score: number
  isPlaying: boolean
  lightSources: LightSource[]
  shadowObjects: ShadowObject[]
  targetPosition: Position
  playerPosition: Position
  moves: number
  maxMoves: number
  
  // Actions
  startGame: () => void
  movePlayer: (direction: 'up' | 'down' | 'left' | 'right') => void
  rotateLight: (lightId: string, angle: number) => void
  moveShadow: (shadowId: string, position: Position) => void
  checkWinCondition: () => boolean
  nextLevel: () => void
  resetLevel: () => void
  updateScore: (points: number) => void
}

const initialLightSources: LightSource[] = [
  {
    id: 'light-1',
    position: { x: 100, y: 100 },
    intensity: 100,
    color: '#ffd700'
  }
]

const initialShadowObjects: ShadowObject[] = [
  {
    id: 'shadow-1',
    position: { x: 200, y: 200 },
    size: { width: 50, height: 80 },
    rotation: 0
  }
]

export const useGameStore = create<GameState>((set, get) => ({
  level: 1,
  score: 0,
  isPlaying: false,
  lightSources: initialLightSources,
  shadowObjects: initialShadowObjects,
  targetPosition: { x: 300, y: 300 },
  playerPosition: { x: 50, y: 50 },
  moves: 0,
  maxMoves: 20,

  startGame: () => {
    set({
      isPlaying: true,
      level: 1,
      score: 0,
      moves: 0,
      playerPosition: { x: 50, y: 50 },
      lightSources: initialLightSources,
      shadowObjects: initialShadowObjects
    })
  },

  movePlayer: (direction) => {
    const { playerPosition, moves, maxMoves, isPlaying } = get()
    if (!isPlaying || moves >= maxMoves) return

    const step = 50
    let newPosition = { ...playerPosition }

    switch (direction) {
      case 'up':
        newPosition.y = Math.max(0, playerPosition.y - step)
        break
      case 'down':
        newPosition.y = Math.min(450, playerPosition.y + step)
        break
      case 'left':
        newPosition.x = Math.max(0, playerPosition.x - step)
        break
      case 'right':
        newPosition.x = Math.min(350, playerPosition.x + step)
        break
    }

    set({
      playerPosition: newPosition,
      moves: moves + 1
    })

    // Check win condition after move
    get().checkWinCondition()
  },

  rotateLight: (lightId, angle) => {
    set(state => ({
      lightSources: state.lightSources.map(light =>
        light.id === lightId
          ? { ...light, rotation: angle }
          : light
      )
    }))
  },

  moveShadow: (shadowId, position) => {
    set(state => ({
      shadowObjects: state.shadowObjects.map(shadow =>
        shadow.id === shadowId
          ? { ...shadow, position }
          : shadow
      )
    }))
  },

  checkWinCondition: () => {
    const { playerPosition, targetPosition, level } = get()
    const distance = Math.sqrt(
      Math.pow(playerPosition.x - targetPosition.x, 2) +
      Math.pow(playerPosition.y - targetPosition.y, 2)
    )

    if (distance < 30) {
      get().updateScore(100 * level)
      get().nextLevel()
      return true
    }
    return false
  },

  nextLevel: () => {
    const { level } = get()
    const newLevel = level + 1
    
    // Generate new positions for next level
    const newLightSources: LightSource[] = [
      {
        id: `light-${newLevel}`,
        position: { 
          x: Math.random() * 300 + 50, 
          y: Math.random() * 300 + 50 
        },
        intensity: 100,
        color: '#ffd700'
      }
    ]

    const newShadowObjects: ShadowObject[] = [
      {
        id: `shadow-${newLevel}`,
        position: { 
          x: Math.random() * 250 + 50, 
          y: Math.random() * 250 + 50 
        },
        size: { 
          width: 50 + newLevel * 10, 
          height: 80 + newLevel * 5 
        },
        rotation: Math.random() * 360
      }
    ]

    set({
      level: newLevel,
      moves: 0,
      maxMoves: 20 + newLevel * 2,
      playerPosition: { x: 50, y: 50 },
      targetPosition: { 
        x: Math.random() * 300 + 50, 
        y: Math.random() * 400 + 50 
      },
      lightSources: newLightSources,
      shadowObjects: newShadowObjects
    })
  },

  resetLevel: () => {
    set({
      moves: 0,
      playerPosition: { x: 50, y: 50 },
      lightSources: initialLightSources,
      shadowObjects: initialShadowObjects
    })
  },

  updateScore: (points) => {
    set(state => ({
      score: state.score + points
    }))
  }
}))