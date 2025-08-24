import { create } from 'zustand'

export type GameState = 'menu' | 'playing' | 'paused' | 'gameover'
export type Lane = 0 | 1 | 2

interface Obstacle {
  id: number
  lane: Lane
  position: number
  type: 'normal' | 'double' | 'bonus'
}

interface Beat {
  id: number
  time: number
  lane: Lane
  position: number
  hit: boolean
}

interface GameStore {
  // Game state
  gameState: GameState
  score: number
  highScore: number
  combo: number
  maxCombo: number
  speed: number
  distance: number
  
  // Player state
  playerLane: Lane
  isJumping: boolean
  
  // Game objects
  obstacles: Obstacle[]
  beats: Beat[]
  particles: Array<{ id: number; x: number; y: number; type: string }>
  
  // Actions
  startGame: () => void
  pauseGame: () => void
  resumeGame: () => void
  endGame: () => void
  
  // Player actions
  changeLane: (lane: Lane) => void
  jump: () => void
  
  // Game mechanics
  updateGame: (deltaTime: number) => void
  addObstacle: () => void
  addBeat: (lane: Lane) => void
  hitBeat: (beatId: number) => void
  checkCollision: () => void
  addParticle: (x: number, y: number, type: string) => void
  
  // Score management
  addScore: (points: number) => void
  increaseCombo: () => void
  resetCombo: () => void
  updateHighScore: () => void
}

const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  gameState: 'menu',
  score: 0,
  highScore: parseInt(localStorage.getItem('rhythmRunnerHighScore') || '0'),
  combo: 0,
  maxCombo: 0,
  speed: 5,
  distance: 0,
  
  playerLane: 1,
  isJumping: false,
  
  obstacles: [],
  beats: [],
  particles: [],
  
  // Game control actions
  startGame: () => {
    set({
      gameState: 'playing',
      score: 0,
      combo: 0,
      maxCombo: 0,
      speed: 5,
      distance: 0,
      playerLane: 1,
      isJumping: false,
      obstacles: [],
      beats: [],
      particles: []
    })
  },
  
  pauseGame: () => set({ gameState: 'paused' }),
  resumeGame: () => set({ gameState: 'playing' }),
  
  endGame: () => {
    const state = get()
    state.updateHighScore()
    set({ gameState: 'gameover' })
  },
  
  // Player control
  changeLane: (lane: Lane) => {
    const state = get()
    if (state.gameState === 'playing' && !state.isJumping) {
      set({ playerLane: lane })
      
      // Check if there's a beat to hit
      const beatsInLane = state.beats.filter(b => b.lane === lane && !b.hit && b.position > 70)
      if (beatsInLane.length > 0) {
        const nearestBeat = beatsInLane[0]
        if (nearestBeat.position > 70 && nearestBeat.position < 90) {
          state.hitBeat(nearestBeat.id)
        }
      }
    }
  },
  
  jump: () => {
    const state = get()
    if (state.gameState === 'playing' && !state.isJumping) {
      set({ isJumping: true })
      setTimeout(() => set({ isJumping: false }), 500)
    }
  },
  
  // Game update loop
  updateGame: (deltaTime: number) => {
    const state = get()
    if (state.gameState !== 'playing') return
    
    const newSpeed = Math.min(state.speed + deltaTime * 0.001, 15)
    const newDistance = state.distance + newSpeed * deltaTime * 0.1
    
    // Update obstacles
    const updatedObstacles = state.obstacles
      .map(obs => ({ ...obs, position: obs.position + newSpeed * deltaTime * 0.1 }))
      .filter(obs => obs.position < 110)
    
    // Update beats
    const updatedBeats = state.beats
      .map(beat => ({ ...beat, position: beat.position + newSpeed * deltaTime * 0.1 }))
      .filter(beat => beat.position < 110)
    
    // Update particles
    const updatedParticles = state.particles
      .map(p => ({ ...p, y: p.y - 2 }))
      .filter(p => p.y > -50)
    
    set({
      speed: newSpeed,
      distance: newDistance,
      obstacles: updatedObstacles,
      beats: updatedBeats,
      particles: updatedParticles
    })
    
    // Check collisions
    state.checkCollision()
    
    // Add new obstacles and beats periodically
    if (Math.random() < 0.02) {
      state.addObstacle()
    }
    if (Math.random() < 0.03) {
      state.addBeat(Math.floor(Math.random() * 3) as Lane)
    }
  },
  
  addObstacle: () => {
    const state = get()
    const newObstacle: Obstacle = {
      id: Date.now(),
      lane: Math.floor(Math.random() * 3) as Lane,
      position: -10,
      type: Math.random() < 0.1 ? 'bonus' : Math.random() < 0.3 ? 'double' : 'normal'
    }
    set({ obstacles: [...state.obstacles, newObstacle] })
  },
  
  addBeat: (lane: Lane) => {
    const state = get()
    const newBeat: Beat = {
      id: Date.now() + Math.random(),
      time: Date.now(),
      lane,
      position: -10,
      hit: false
    }
    set({ beats: [...state.beats, newBeat] })
  },
  
  hitBeat: (beatId: number) => {
    const state = get()
    const updatedBeats = state.beats.map(beat => 
      beat.id === beatId ? { ...beat, hit: true } : beat
    )
    set({ beats: updatedBeats })
    state.increaseCombo()
    state.addScore(100 * (1 + state.combo * 0.1))
    
    // Add particle effect
    const beat = state.beats.find(b => b.id === beatId)
    if (beat) {
      const laneX = [25, 50, 75][beat.lane]
      state.addParticle(laneX, 80, 'hit')
    }
  },
  
  checkCollision: () => {
    const state = get()
    const playerPosition = 80
    
    state.obstacles.forEach(obstacle => {
      if (obstacle.lane === state.playerLane && 
          obstacle.position > playerPosition - 5 && 
          obstacle.position < playerPosition + 5) {
        if (obstacle.type === 'bonus') {
          state.addScore(500)
          state.addParticle(50, 80, 'bonus')
          set({ obstacles: state.obstacles.filter(o => o.id !== obstacle.id) })
        } else if (!state.isJumping) {
          state.resetCombo()
          state.endGame()
        }
      }
    })
  },
  
  addParticle: (x: number, y: number, type: string) => {
    const state = get()
    const newParticle = {
      id: Date.now() + Math.random(),
      x,
      y,
      type
    }
    set({ particles: [...state.particles, newParticle] })
  },
  
  // Score management
  addScore: (points: number) => {
    set(state => ({ score: state.score + Math.floor(points) }))
  },
  
  increaseCombo: () => {
    set(state => {
      const newCombo = state.combo + 1
      return {
        combo: newCombo,
        maxCombo: Math.max(newCombo, state.maxCombo)
      }
    })
  },
  
  resetCombo: () => set({ combo: 0 }),
  
  updateHighScore: () => {
    const state = get()
    if (state.score > state.highScore) {
      localStorage.setItem('rhythmRunnerHighScore', state.score.toString())
      set({ highScore: state.score })
    }
  }
}))

export default useGameStore