import { create } from 'zustand'

interface Ball {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  trail: { x: number; y: number }[]
}

interface Obstacle {
  x: number
  y: number
  width: number
  height: number
  type: 'wall' | 'bouncer' | 'goal'
}

interface GameState {
  level: number
  score: number
  isPlaying: boolean
  gravity: number
  elasticity: number
  friction: number
  ball: Ball | null
  obstacles: Obstacle[]
  targetX: number
  targetY: number
  isWin: boolean
  launches: number
  maxLaunches: number
  
  // Actions
  setGravity: (gravity: number) => void
  setElasticity: (elasticity: number) => void
  setFriction: (friction: number) => void
  launchBall: (angle: number, power: number) => void
  updateBall: () => void
  resetLevel: () => void
  nextLevel: () => void
  startGame: () => void
  stopGame: () => void
}

const LEVELS = [
  {
    obstacles: [
      { x: 200, y: 300, width: 150, height: 20, type: 'wall' as const },
    ],
    targetX: 300,
    targetY: 400,
    maxLaunches: 3,
  },
  {
    obstacles: [
      { x: 150, y: 250, width: 100, height: 20, type: 'wall' as const },
      { x: 250, y: 350, width: 100, height: 20, type: 'bouncer' as const },
    ],
    targetX: 320,
    targetY: 420,
    maxLaunches: 4,
  },
  {
    obstacles: [
      { x: 100, y: 200, width: 80, height: 20, type: 'wall' as const },
      { x: 220, y: 280, width: 80, height: 20, type: 'bouncer' as const },
      { x: 180, y: 360, width: 120, height: 20, type: 'wall' as const },
    ],
    targetX: 350,
    targetY: 450,
    maxLaunches: 5,
  },
]

export const useGameStore = create<GameState>((set, get) => ({
  level: 1,
  score: 0,
  isPlaying: false,
  gravity: 0.3,
  elasticity: 0.8,
  friction: 0.98,
  ball: null,
  obstacles: LEVELS[0].obstacles,
  targetX: LEVELS[0].targetX,
  targetY: LEVELS[0].targetY,
  isWin: false,
  launches: 0,
  maxLaunches: LEVELS[0].maxLaunches,

  setGravity: (gravity) => set({ gravity }),
  setElasticity: (elasticity) => set({ elasticity }),
  setFriction: (friction) => set({ friction }),

  launchBall: (angle, power) => {
    const { launches, maxLaunches } = get()
    if (launches >= maxLaunches) return
    
    const radians = (angle * Math.PI) / 180
    const vx = Math.cos(radians) * power * 0.5
    const vy = Math.sin(radians) * power * 0.5
    
    set({
      ball: {
        x: 50,
        y: 200,
        vx,
        vy,
        radius: 10,
        trail: [],
      },
      isPlaying: true,
      launches: launches + 1,
    })
  },

  updateBall: () => {
    const { ball, gravity, friction, elasticity, obstacles, targetX, targetY } = get()
    if (!ball || !get().isPlaying) return

    let newVx = ball.vx * friction
    let newVy = ball.vy + gravity
    let newX = ball.x + newVx
    let newY = ball.y + newVy

    // Boundary collisions
    if (newX - ball.radius <= 0 || newX + ball.radius >= window.innerWidth) {
      newVx = -newVx * elasticity
      newX = newX - ball.radius <= 0 ? ball.radius : window.innerWidth - ball.radius
    }
    
    if (newY - ball.radius <= 0 || newY + ball.radius >= window.innerHeight - 100) {
      newVy = -newVy * elasticity
      newY = newY - ball.radius <= 0 ? ball.radius : window.innerHeight - 100 - ball.radius
      
      // Stop if ball is on ground with minimal velocity
      if (Math.abs(newVy) < 0.5 && newY + ball.radius >= window.innerHeight - 100) {
        set({ isPlaying: false })
        return
      }
    }

    // Obstacle collisions
    obstacles.forEach((obstacle) => {
      const ballLeft = newX - ball.radius
      const ballRight = newX + ball.radius
      const ballTop = newY - ball.radius
      const ballBottom = newY + ball.radius

      const obsLeft = obstacle.x
      const obsRight = obstacle.x + obstacle.width
      const obsTop = obstacle.y
      const obsBottom = obstacle.y + obstacle.height

      if (
        ballRight > obsLeft &&
        ballLeft < obsRight &&
        ballBottom > obsTop &&
        ballTop < obsBottom
      ) {
        // Collision detected
        const overlapX = Math.min(ballRight - obsLeft, obsRight - ballLeft)
        const overlapY = Math.min(ballBottom - obsTop, obsBottom - ballTop)

        if (overlapX < overlapY) {
          // Horizontal collision
          newVx = -newVx * (obstacle.type === 'bouncer' ? 1.5 : elasticity)
          newX = ball.x < obstacle.x + obstacle.width / 2 
            ? obstacle.x - ball.radius 
            : obstacle.x + obstacle.width + ball.radius
        } else {
          // Vertical collision
          newVy = -newVy * (obstacle.type === 'bouncer' ? 1.5 : elasticity)
          newY = ball.y < obstacle.y + obstacle.height / 2
            ? obstacle.y - ball.radius
            : obstacle.y + obstacle.height + ball.radius
        }
      }
    })

    // Check if ball reached target
    const distance = Math.sqrt(
      Math.pow(newX - targetX, 2) + Math.pow(newY - targetY, 2)
    )
    
    if (distance < 30) {
      set((state) => ({
        isWin: true,
        isPlaying: false,
        score: state.score + 100 * (state.maxLaunches - state.launches + 1),
      }))
      return
    }

    // Update trail
    const newTrail = [...ball.trail, { x: ball.x, y: ball.y }].slice(-30)

    set({
      ball: {
        ...ball,
        x: newX,
        y: newY,
        vx: newVx,
        vy: newVy,
        trail: newTrail,
      },
    })
  },

  resetLevel: () => {
    const { level } = get()
    const currentLevel = LEVELS[Math.min(level - 1, LEVELS.length - 1)]
    
    set({
      ball: null,
      isPlaying: false,
      isWin: false,
      launches: 0,
      obstacles: currentLevel.obstacles,
      targetX: currentLevel.targetX,
      targetY: currentLevel.targetY,
      maxLaunches: currentLevel.maxLaunches,
    })
  },

  nextLevel: () => {
    const { level } = get()
    const nextLevelIndex = Math.min(level, LEVELS.length - 1)
    const nextLevel = LEVELS[nextLevelIndex]
    
    set({
      level: level + 1,
      ball: null,
      isPlaying: false,
      isWin: false,
      launches: 0,
      obstacles: nextLevel.obstacles,
      targetX: nextLevel.targetX,
      targetY: nextLevel.targetY,
      maxLaunches: nextLevel.maxLaunches,
    })
  },

  startGame: () => set({ isPlaying: true }),
  stopGame: () => set({ isPlaying: false }),
}))