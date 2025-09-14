import { create } from 'zustand'

export type GameState = 'menu' | 'playing' | 'paused' | 'gameOver'

export interface Enemy {
  id: string
  x: number
  y: number
  angle: number
  speed: number
  health: number
  type: 'asteroid' | 'ship' | 'bomber'
  size: number
}

export interface Projectile {
  id: string
  x: number
  y: number
  angle: number
  speed: number
  damage: number
  type: 'laser' | 'missile'
}

export interface Explosion {
  id: string
  x: number
  y: number
  size: number
  duration: number
}

interface GameStore {
  gameState: GameState
  score: number
  lives: number
  wave: number
  enemies: Enemy[]
  projectiles: Projectile[]
  explosions: Explosion[]
  cannonAngle: number
  
  setGameState: (state: GameState) => void
  setCannonAngle: (angle: number) => void
  addEnemy: (enemy: Enemy) => void
  removeEnemy: (id: string) => void
  addProjectile: (projectile: Projectile) => void
  removeProjectile: (id: string) => void
  addExplosion: (explosion: Explosion) => void
  removeExplosion: (id: string) => void
  updateScore: (points: number) => void
  decreaseLives: () => void
  nextWave: () => void
  resetGame: () => void
  updateEnemies: (enemies: Enemy[]) => void
  updateProjectiles: (projectiles: Projectile[]) => void
}

export const useGameStore = create<GameStore>((set) => ({
  gameState: 'menu',
  score: 0,
  lives: 3,
  wave: 1,
  enemies: [],
  projectiles: [],
  explosions: [],
  cannonAngle: 0,
  
  setGameState: (state) => set({ gameState: state }),
  setCannonAngle: (angle) => set({ cannonAngle: angle }),
  
  addEnemy: (enemy) => set((state) => ({ 
    enemies: [...state.enemies, enemy] 
  })),
  
  removeEnemy: (id) => set((state) => ({ 
    enemies: state.enemies.filter(e => e.id !== id) 
  })),
  
  addProjectile: (projectile) => set((state) => ({ 
    projectiles: [...state.projectiles, projectile] 
  })),
  
  removeProjectile: (id) => set((state) => ({ 
    projectiles: state.projectiles.filter(p => p.id !== id) 
  })),
  
  addExplosion: (explosion) => set((state) => ({ 
    explosions: [...state.explosions, explosion] 
  })),
  
  removeExplosion: (id) => set((state) => ({ 
    explosions: state.explosions.filter(e => e.id !== id) 
  })),
  
  updateScore: (points) => set((state) => ({ 
    score: state.score + points 
  })),
  
  decreaseLives: () => set((state) => {
    const newLives = state.lives - 1
    if (newLives <= 0) {
      return { lives: 0, gameState: 'gameOver' }
    }
    return { lives: newLives }
  }),
  
  nextWave: () => set((state) => ({ 
    wave: state.wave + 1,
    enemies: []
  })),
  
  resetGame: () => set({
    gameState: 'playing',
    score: 0,
    lives: 3,
    wave: 1,
    enemies: [],
    projectiles: [],
    explosions: [],
    cannonAngle: 0
  }),
  
  updateEnemies: (enemies) => set({ enemies }),
  updateProjectiles: (projectiles) => set({ projectiles })
}))