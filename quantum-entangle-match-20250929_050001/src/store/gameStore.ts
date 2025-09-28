import { create } from 'zustand'

export interface Particle {
  id: string
  x: number
  y: number
  color: string
  entangledWith: string | null
  state: 'normal' | 'selected' | 'matched'
  spin: 'up' | 'down'
}

interface GameState {
  particles: Particle[]
  score: number
  level: number
  moves: number
  selectedParticle: string | null
  gameStatus: 'playing' | 'won' | 'lost'
  targetEntanglements: number
  currentEntanglements: number
  
  initializeLevel: (level: number) => void
  selectParticle: (id: string) => void
  entangleParticles: (id1: string, id2: string) => void
  checkWinCondition: () => void
  resetGame: () => void
  nextLevel: () => void
}

const GRID_SIZE = 6
const COLORS = ['#8B5CF6', '#3B82F6', '#EC4899', '#06B6D4', '#6366F1', '#7C3AED']

export const useGameStore = create<GameState>((set, get) => ({
  particles: [],
  score: 0,
  level: 1,
  moves: 0,
  selectedParticle: null,
  gameStatus: 'playing',
  targetEntanglements: 3,
  currentEntanglements: 0,

  initializeLevel: (level) => {
    const numParticles = Math.min(12 + level * 2, 36)
    const particles: Particle[] = []
    
    // Generate particles in pairs for entanglement
    for (let i = 0; i < numParticles; i++) {
      const particle: Particle = {
        id: `p-${i}`,
        x: (i % GRID_SIZE) * 60 + 30,
        y: Math.floor(i / GRID_SIZE) * 60 + 30,
        color: COLORS[Math.floor(i / 2) % COLORS.length],
        entangledWith: null,
        state: 'normal',
        spin: i % 2 === 0 ? 'up' : 'down'
      }
      particles.push(particle)
    }
    
    // Shuffle particles positions
    for (let i = particles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const tempX = particles[i].x
      const tempY = particles[i].y
      particles[i].x = particles[j].x
      particles[i].y = particles[j].y
      particles[j].x = tempX
      particles[j].y = tempY
    }
    
    set({
      particles,
      level,
      moves: 0,
      selectedParticle: null,
      gameStatus: 'playing',
      targetEntanglements: Math.floor(numParticles / 2),
      currentEntanglements: 0
    })
  },

  selectParticle: (id) => {
    const { selectedParticle, particles, gameStatus } = get()
    
    if (gameStatus !== 'playing') return
    
    if (selectedParticle === id) {
      // Deselect
      set({ selectedParticle: null })
      return
    }
    
    if (!selectedParticle) {
      // Select first particle
      set({ selectedParticle: id })
    } else {
      // Try to entangle with second particle
      const particle1 = particles.find(p => p.id === selectedParticle)
      const particle2 = particles.find(p => p.id === id)
      
      if (particle1 && particle2 && 
          particle1.color === particle2.color && 
          particle1.spin !== particle2.spin &&
          !particle1.entangledWith && !particle2.entangledWith) {
        get().entangleParticles(selectedParticle, id)
      } else {
        // Invalid match, select new particle
        set({ selectedParticle: id })
      }
    }
  },

  entangleParticles: (id1, id2) => {
    const { particles, score, currentEntanglements, moves } = get()
    
    const updatedParticles = particles.map(p => {
      if (p.id === id1) {
        return { ...p, entangledWith: id2, state: 'matched' as const }
      }
      if (p.id === id2) {
        return { ...p, entangledWith: id1, state: 'matched' as const }
      }
      return p
    })
    
    set({
      particles: updatedParticles,
      score: score + 100,
      currentEntanglements: currentEntanglements + 1,
      moves: moves + 1,
      selectedParticle: null
    })
    
    // Check win condition after entanglement
    setTimeout(() => get().checkWinCondition(), 500)
  },

  checkWinCondition: () => {
    const { currentEntanglements, targetEntanglements } = get()
    
    if (currentEntanglements >= targetEntanglements) {
      set({ gameStatus: 'won' })
    }
  },

  resetGame: () => {
    get().initializeLevel(1)
    set({ score: 0 })
  },

  nextLevel: () => {
    const { level, score } = get()
    const newLevel = level + 1
    get().initializeLevel(newLevel)
    set({ score: score + 500 }) // Bonus for completing level
  }
}))