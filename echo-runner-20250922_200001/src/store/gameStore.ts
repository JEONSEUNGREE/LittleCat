import { create } from 'zustand'

export type GameState = 'menu' | 'playing' | 'paused' | 'gameover'

interface Obstacle {
  id: string
  x: number
  y: number
  width: number
  height: number
  type: 'spike' | 'wall' | 'gap'
}

interface SoundWave {
  id: string
  x: number
  y: number
  radius: number
  opacity: number
}

interface GameStore {
  // Game state
  gameState: GameState
  score: number
  highScore: number
  lives: number
  level: number
  
  // Player state
  playerY: number
  playerVelocity: number
  isJumping: boolean
  
  // Game entities
  obstacles: Obstacle[]
  soundWaves: SoundWave[]
  
  // Sound and rhythm
  beatInterval: number
  isMuted: boolean
  soundIntensity: number
  
  // Game actions
  startGame: () => void
  pauseGame: () => void
  resumeGame: () => void
  gameOver: () => void
  resetGame: () => void
  
  // Player actions
  jump: () => void
  updatePlayerPosition: (deltaTime: number) => void
  
  // Game updates
  updateGame: (deltaTime: number) => void
  addObstacle: (obstacle: Obstacle) => void
  removeObstacle: (id: string) => void
  addSoundWave: (wave: SoundWave) => void
  updateSoundWaves: (deltaTime: number) => void
  
  // Score and level
  increaseScore: (points: number) => void
  nextLevel: () => void
  
  // Sound controls
  toggleMute: () => void
  updateSoundIntensity: (intensity: number) => void
}

const GRAVITY = 0.8
const JUMP_FORCE = -15
const GROUND_LEVEL = 300

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  gameState: 'menu',
  score: 0,
  highScore: parseInt(localStorage.getItem('echo-runner-highscore') || '0'),
  lives: 3,
  level: 1,
  
  playerY: GROUND_LEVEL,
  playerVelocity: 0,
  isJumping: false,
  
  obstacles: [],
  soundWaves: [],
  
  beatInterval: 1000,
  isMuted: false,
  soundIntensity: 0.5,
  
  // Game control actions
  startGame: () => {
    set({
      gameState: 'playing',
      score: 0,
      lives: 3,
      level: 1,
      playerY: GROUND_LEVEL,
      playerVelocity: 0,
      isJumping: false,
      obstacles: [],
      soundWaves: [],
      beatInterval: 1000,
    })
  },
  
  pauseGame: () => set({ gameState: 'paused' }),
  resumeGame: () => set({ gameState: 'playing' }),
  
  gameOver: () => {
    const { score, highScore } = get()
    if (score > highScore) {
      localStorage.setItem('echo-runner-highscore', score.toString())
      set({ highScore: score })
    }
    set({ gameState: 'gameover' })
  },
  
  resetGame: () => {
    set({
      gameState: 'menu',
      score: 0,
      lives: 3,
      level: 1,
      playerY: GROUND_LEVEL,
      playerVelocity: 0,
      isJumping: false,
      obstacles: [],
      soundWaves: [],
    })
  },
  
  // Player actions
  jump: () => {
    const { isJumping, playerY } = get()
    if (!isJumping || playerY === GROUND_LEVEL) {
      set({
        playerVelocity: JUMP_FORCE,
        isJumping: true,
      })
      
      // Create sound wave effect
      const wave: SoundWave = {
        id: `wave-${Date.now()}`,
        x: 100,
        y: playerY,
        radius: 20,
        opacity: 1,
      }
      get().addSoundWave(wave)
    }
  },
  
  updatePlayerPosition: (deltaTime: number) => {
    const { playerY, playerVelocity, isJumping } = get()
    
    if (isJumping) {
      const newVelocity = playerVelocity + GRAVITY
      let newY = playerY + newVelocity
      
      if (newY >= GROUND_LEVEL) {
        newY = GROUND_LEVEL
        set({
          playerY: newY,
          playerVelocity: 0,
          isJumping: false,
        })
      } else {
        set({
          playerY: newY,
          playerVelocity: newVelocity,
        })
      }
    }
  },
  
  // Game updates
  updateGame: (deltaTime: number) => {
    const { gameState, obstacles, playerY } = get()
    
    if (gameState !== 'playing') return
    
    // Update player position
    get().updatePlayerPosition(deltaTime)
    
    // Update obstacles position
    const updatedObstacles = obstacles.map(obs => ({
      ...obs,
      x: obs.x - 5 // Move obstacles to the left
    }))
    
    // Remove off-screen obstacles
    const filteredObstacles = updatedObstacles.filter(obs => obs.x > -100)
    
    // Check collisions
    const playerX = 100
    const playerWidth = 40
    const playerHeight = 40
    
    for (const obstacle of filteredObstacles) {
      if (
        playerX < obstacle.x + obstacle.width &&
        playerX + playerWidth > obstacle.x &&
        playerY < obstacle.y + obstacle.height &&
        playerY + playerHeight > obstacle.y
      ) {
        const newLives = get().lives - 1
        if (newLives <= 0) {
          get().gameOver()
        } else {
          set({ lives: newLives })
          // Remove the collided obstacle
          const remainingObstacles = filteredObstacles.filter(o => o.id !== obstacle.id)
          set({ obstacles: remainingObstacles })
        }
        break
      }
    }
    
    set({ obstacles: filteredObstacles })
    
    // Update sound waves
    get().updateSoundWaves(deltaTime)
  },
  
  addObstacle: (obstacle: Obstacle) => {
    set(state => ({
      obstacles: [...state.obstacles, obstacle]
    }))
  },
  
  removeObstacle: (id: string) => {
    set(state => ({
      obstacles: state.obstacles.filter(obs => obs.id !== id)
    }))
  },
  
  addSoundWave: (wave: SoundWave) => {
    set(state => ({
      soundWaves: [...state.soundWaves, wave]
    }))
  },
  
  updateSoundWaves: (deltaTime: number) => {
    const waves = get().soundWaves.map(wave => ({
      ...wave,
      radius: wave.radius + 2,
      opacity: wave.opacity - 0.02,
    }))
    
    // Remove faded waves
    const activeWaves = waves.filter(wave => wave.opacity > 0)
    set({ soundWaves: activeWaves })
  },
  
  // Score and level
  increaseScore: (points: number) => {
    const newScore = get().score + points
    set({ score: newScore })
    
    // Check for level up
    if (newScore > 0 && newScore % 500 === 0) {
      get().nextLevel()
    }
  },
  
  nextLevel: () => {
    const newLevel = get().level + 1
    set({
      level: newLevel,
      beatInterval: Math.max(500, 1000 - (newLevel * 50))
    })
  },
  
  // Sound controls
  toggleMute: () => {
    set(state => ({ isMuted: !state.isMuted }))
  },
  
  updateSoundIntensity: (intensity: number) => {
    set({ soundIntensity: Math.max(0, Math.min(1, intensity)) })
  },
}))