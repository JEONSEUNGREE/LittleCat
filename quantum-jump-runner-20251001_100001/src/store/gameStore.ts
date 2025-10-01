import { create } from 'zustand'

export type GameState = 'menu' | 'playing' | 'paused' | 'gameover'
export type Lane = 0 | 1 | 2

interface Obstacle {
  id: string
  lane: Lane
  position: number
  type: 'block' | 'spike' | 'portal'
}

interface QuantumState {
  lane: Lane
  probability: number
}

interface GameStore {
  // Game State
  gameState: GameState
  score: number
  highScore: number
  distance: number
  speed: number
  
  // Player State
  playerLane: Lane
  quantumStates: QuantumState[]
  isJumping: boolean
  quantumEnergy: number
  
  // Game Objects
  obstacles: Obstacle[]
  
  // Actions
  startGame: () => void
  pauseGame: () => void
  resumeGame: () => void
  gameOver: () => void
  
  // Player Actions
  moveToLane: (lane: Lane) => void
  jump: () => void
  activateQuantumJump: () => void
  
  // Game Loop
  updateGame: (deltaTime: number) => void
  addObstacle: () => void
  removeObstacle: (id: string) => void
  checkCollision: () => void
  
  // Score
  increaseScore: (points: number) => void
  updateHighScore: () => void
}

const useGameStore = create<GameStore>((set, get) => ({
  // Initial State
  gameState: 'menu',
  score: 0,
  highScore: parseInt(localStorage.getItem('quantumHighScore') || '0'),
  distance: 0,
  speed: 5,
  
  playerLane: 1,
  quantumStates: [],
  isJumping: false,
  quantumEnergy: 100,
  
  obstacles: [],
  
  // Game Control Actions
  startGame: () => {
    set({
      gameState: 'playing',
      score: 0,
      distance: 0,
      speed: 5,
      playerLane: 1,
      quantumStates: [],
      isJumping: false,
      quantumEnergy: 100,
      obstacles: []
    })
  },
  
  pauseGame: () => set({ gameState: 'paused' }),
  resumeGame: () => set({ gameState: 'playing' }),
  
  gameOver: () => {
    const state = get()
    if (state.score > state.highScore) {
      localStorage.setItem('quantumHighScore', state.score.toString())
      set({ highScore: state.score })
    }
    set({ gameState: 'gameover' })
  },
  
  // Player Actions
  moveToLane: (lane: Lane) => {
    const state = get()
    if (state.gameState === 'playing' && !state.isJumping) {
      set({ playerLane: lane })
    }
  },
  
  jump: () => {
    const state = get()
    if (state.gameState === 'playing' && !state.isJumping) {
      set({ isJumping: true })
      setTimeout(() => set({ isJumping: false }), 600)
    }
  },
  
  activateQuantumJump: () => {
    const state = get()
    if (state.gameState === 'playing' && state.quantumEnergy >= 50) {
      // Create quantum superposition states
      const quantumStates: QuantumState[] = [
        { lane: 0, probability: 0.33 },
        { lane: 1, probability: 0.34 },
        { lane: 2, probability: 0.33 }
      ]
      
      set({
        quantumStates,
        quantumEnergy: state.quantumEnergy - 50,
        isJumping: true
      })
      
      // Collapse quantum state after 1 second
      setTimeout(() => {
        const random = Math.random()
        let selectedLane: Lane = 1
        let probabilitySum = 0
        
        for (const qState of quantumStates) {
          probabilitySum += qState.probability
          if (random <= probabilitySum) {
            selectedLane = qState.lane
            break
          }
        }
        
        set({
          playerLane: selectedLane,
          quantumStates: [],
          isJumping: false
        })
      }, 1000)
    }
  },
  
  // Game Loop
  updateGame: (deltaTime: number) => {
    const state = get()
    if (state.gameState !== 'playing') return
    
    // Update distance and speed
    const newDistance = state.distance + state.speed * deltaTime
    const newSpeed = Math.min(5 + newDistance / 1000, 15) // Max speed: 15
    
    // Update obstacles
    const updatedObstacles = state.obstacles.map(obs => ({
      ...obs,
      position: obs.position - state.speed * deltaTime * 50
    })).filter(obs => obs.position > -100)
    
    // Regenerate quantum energy
    const newQuantumEnergy = Math.min(state.quantumEnergy + deltaTime * 5, 100)
    
    set({
      distance: newDistance,
      speed: newSpeed,
      obstacles: updatedObstacles,
      quantumEnergy: newQuantumEnergy
    })
    
    // Check for collisions
    get().checkCollision()
    
    // Add score based on distance
    if (Math.floor(newDistance) % 10 === 0) {
      get().increaseScore(1)
    }
  },
  
  addObstacle: () => {
    const state = get()
    const lane = Math.floor(Math.random() * 3) as Lane
    const types: Array<'block' | 'spike' | 'portal'> = ['block', 'spike', 'portal']
    const type = types[Math.floor(Math.random() * types.length)]
    
    set({
      obstacles: [
        ...state.obstacles,
        {
          id: `obs-${Date.now()}`,
          lane,
          position: 800,
          type
        }
      ]
    })
  },
  
  removeObstacle: (id: string) => {
    set(state => ({
      obstacles: state.obstacles.filter(obs => obs.id !== id)
    }))
  },
  
  checkCollision: () => {
    const state = get()
    
    // If in quantum superposition, no collision
    if (state.quantumStates.length > 0) return
    
    // If jumping, no collision with ground obstacles
    if (state.isJumping) return
    
    const playerPosition = 100 // Fixed player position on screen
    const collisionThreshold = 30
    
    for (const obstacle of state.obstacles) {
      if (
        obstacle.lane === state.playerLane &&
        Math.abs(obstacle.position - playerPosition) < collisionThreshold
      ) {
        if (obstacle.type === 'portal') {
          // Portal gives bonus points and quantum energy
          get().increaseScore(50)
          set({ quantumEnergy: Math.min(state.quantumEnergy + 25, 100) })
          get().removeObstacle(obstacle.id)
        } else {
          // Collision with block or spike - game over
          get().gameOver()
        }
      }
    }
  },
  
  increaseScore: (points: number) => {
    set(state => ({ score: state.score + points }))
  },
  
  updateHighScore: () => {
    const state = get()
    if (state.score > state.highScore) {
      localStorage.setItem('quantumHighScore', state.score.toString())
      set({ highScore: state.score })
    }
  }
}))

export default useGameStore