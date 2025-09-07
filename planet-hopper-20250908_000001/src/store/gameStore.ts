import { create } from 'zustand'

export interface Planet {
  id: string
  x: number
  y: number
  radius: number
  color: string
  gravityRadius: number
  isActive: boolean
}

export interface Player {
  x: number
  y: number
  vx: number
  vy: number
  angle: number
  isLaunched: boolean
  trail: { x: number; y: number }[]
}

interface GameState {
  player: Player
  planets: Planet[]
  score: number
  bestScore: number
  isPlaying: boolean
  isPaused: boolean
  level: number
  fuel: number
  maxFuel: number
  visitedPlanets: string[]
  
  startGame: () => void
  pauseGame: () => void
  resumeGame: () => void
  endGame: () => void
  updatePlayer: (player: Partial<Player>) => void
  launchPlayer: (angle: number, power: number) => void
  landOnPlanet: (planetId: string) => void
  generateLevel: () => void
  updatePlayerPosition: () => void
  useFuel: (amount: number) => void
  refillFuel: () => void
}

const generatePlanets = (level: number): Planet[] => {
  const planets: Planet[] = []
  const planetCount = Math.min(3 + Math.floor(level / 2), 8)
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2']
  
  for (let i = 0; i < planetCount; i++) {
    const angle = (Math.PI * 2 / planetCount) * i + (Math.random() - 0.5) * 0.5
    const distance = 150 + Math.random() * 100
    
    planets.push({
      id: `planet-${i}`,
      x: window.innerWidth / 2 + Math.cos(angle) * distance,
      y: window.innerHeight / 2 + Math.sin(angle) * distance,
      radius: 20 + Math.random() * 25,
      color: colors[i % colors.length],
      gravityRadius: 80 + Math.random() * 40,
      isActive: i === 0
    })
  }
  
  return planets
}

export const useGameStore = create<GameState>((set, get) => ({
  player: {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    angle: 0,
    isLaunched: false,
    trail: []
  },
  planets: [],
  score: 0,
  bestScore: parseInt(localStorage.getItem('planetHopperBestScore') || '0'),
  isPlaying: false,
  isPaused: false,
  level: 1,
  fuel: 100,
  maxFuel: 100,
  visitedPlanets: [],
  
  startGame: () => {
    const planets = generatePlanets(1)
    const startPlanet = planets[0]
    
    set({
      isPlaying: true,
      isPaused: false,
      score: 0,
      level: 1,
      fuel: 100,
      planets,
      visitedPlanets: [startPlanet.id],
      player: {
        x: startPlanet.x,
        y: startPlanet.y - startPlanet.radius - 15,
        vx: 0,
        vy: 0,
        angle: -Math.PI / 2,
        isLaunched: false,
        trail: []
      }
    })
  },
  
  pauseGame: () => set({ isPaused: true }),
  resumeGame: () => set({ isPaused: false }),
  
  endGame: () => {
    const { score, bestScore } = get()
    if (score > bestScore) {
      localStorage.setItem('planetHopperBestScore', score.toString())
      set({ bestScore: score })
    }
    set({ isPlaying: false, isPaused: false })
  },
  
  updatePlayer: (playerUpdate) => 
    set((state) => ({ 
      player: { ...state.player, ...playerUpdate } 
    })),
  
  launchPlayer: (angle, power) => {
    const { player, fuel } = get()
    if (fuel <= 0 || player.isLaunched) return
    
    const launchPower = power * 0.15
    set((state) => ({
      player: {
        ...state.player,
        vx: Math.cos(angle) * launchPower,
        vy: Math.sin(angle) * launchPower,
        isLaunched: true,
        trail: []
      },
      fuel: Math.max(0, fuel - 20)
    }))
  },
  
  landOnPlanet: (planetId) => {
    const { visitedPlanets, planets, level } = get()
    
    if (!visitedPlanets.includes(planetId)) {
      const planet = planets.find(p => p.id === planetId)
      if (!planet) return
      
      const newScore = get().score + Math.round(100 * (1 / planet.radius) * 10)
      const newVisited = [...visitedPlanets, planetId]
      
      // Check if all planets visited
      if (newVisited.length === planets.length) {
        // Next level
        const newLevel = level + 1
        const newPlanets = generatePlanets(newLevel)
        const startPlanet = newPlanets[0]
        
        set({
          level: newLevel,
          planets: newPlanets,
          visitedPlanets: [startPlanet.id],
          score: newScore + 500, // Level completion bonus
          fuel: 100,
          player: {
            x: startPlanet.x,
            y: startPlanet.y - startPlanet.radius - 15,
            vx: 0,
            vy: 0,
            angle: -Math.PI / 2,
            isLaunched: false,
            trail: []
          }
        })
      } else {
        // Update active planet
        const updatedPlanets = planets.map(p => ({
          ...p,
          isActive: p.id === planetId
        }))
        
        set({
          score: newScore,
          visitedPlanets: newVisited,
          planets: updatedPlanets,
          fuel: Math.min(100, get().fuel + 30) // Refuel on landing
        })
      }
    }
  },
  
  generateLevel: () => {
    const { level } = get()
    const planets = generatePlanets(level)
    set({ planets })
  },
  
  updatePlayerPosition: () => {
    const { player, planets, isPlaying, isPaused } = get()
    if (!isPlaying || isPaused || !player.isLaunched) return
    
    let { x, y, vx, vy, trail } = player
    
    // Apply gravity from planets
    planets.forEach(planet => {
      const dx = planet.x - x
      const dy = planet.y - y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < planet.gravityRadius) {
        const force = (planet.gravityRadius - distance) / planet.gravityRadius * 0.3
        vx += (dx / distance) * force
        vy += (dy / distance) * force
      }
      
      // Check collision
      if (distance < planet.radius + 10) {
        get().landOnPlanet(planet.id)
        set((state) => ({
          player: {
            ...state.player,
            x: planet.x,
            y: planet.y - planet.radius - 15,
            vx: 0,
            vy: 0,
            isLaunched: false,
            angle: Math.atan2(planet.y - y, planet.x - x) - Math.PI / 2
          }
        }))
        return
      }
    })
    
    // Update position
    x += vx
    y += vy
    
    // Add to trail
    trail = [...trail.slice(-20), { x, y }]
    
    // Check boundaries
    if (x < -100 || x > window.innerWidth + 100 || 
        y < -100 || y > window.innerHeight + 100) {
      get().endGame()
      return
    }
    
    set((state) => ({
      player: {
        ...state.player,
        x,
        y,
        vx,
        vy,
        trail
      }
    }))
  },
  
  useFuel: (amount) => 
    set((state) => ({ 
      fuel: Math.max(0, state.fuel - amount) 
    })),
  
  refillFuel: () => 
    set({ fuel: 100 })
}))