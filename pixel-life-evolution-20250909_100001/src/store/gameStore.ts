import { create } from 'zustand'

export interface Creature {
  id: string
  name: string
  level: number
  evolution: number
  experience: number
  dna: number
  color: string
  size: number
  speed: number
  intelligence: number
  strength: number
  pixels: string[][]
}

interface GameState {
  creatures: Creature[]
  selectedCreature: Creature | null
  resources: {
    dna: number
    food: number
    energy: number
  }
  stats: {
    totalClicks: number
    totalEvolutions: number
    maxLevel: number
    playTime: number
  }
  gameSpeed: number
  autoEvolve: boolean
  selectCreature: (creature: Creature) => void
  evolveCreature: (id: string) => void
  feedCreature: (id: string) => void
  collectDNA: () => void
  buyCreature: () => void
  updateResources: (resources: Partial<GameState['resources']>) => void
  updateStats: (stats: Partial<GameState['stats']>) => void
  toggleAutoEvolve: () => void
  tick: () => void
}

const generatePixelCreature = (level: number): string[][] => {
  const size = Math.min(8 + level * 2, 16)
  const pixels: string[][] = []
  const colors = ['#4ade80', '#60a5fa', '#c084fc', '#fbbf24', '#f87171']
  const mainColor = colors[level % colors.length]
  
  for (let i = 0; i < size; i++) {
    pixels[i] = []
    for (let j = 0; j < size; j++) {
      if (Math.random() > 0.3) {
        pixels[i][j] = mainColor
      } else {
        pixels[i][j] = 'transparent'
      }
    }
  }
  return pixels
}

const createNewCreature = (id: number, level: number = 1): Creature => ({
  id: `creature-${id}`,
  name: `Pixel ${id}`,
  level,
  evolution: 0,
  experience: 0,
  dna: 0,
  color: ['green', 'blue', 'purple', 'yellow', 'red'][level % 5],
  size: 10 + level * 2,
  speed: Math.random() * 5 + level,
  intelligence: Math.random() * 5 + level,
  strength: Math.random() * 5 + level,
  pixels: generatePixelCreature(level)
})

export const useGameStore = create<GameState>((set, get) => ({
  creatures: [createNewCreature(1)],
  selectedCreature: null,
  resources: {
    dna: 10,
    food: 100,
    energy: 50
  },
  stats: {
    totalClicks: 0,
    totalEvolutions: 0,
    maxLevel: 1,
    playTime: 0
  },
  gameSpeed: 1,
  autoEvolve: false,

  selectCreature: (creature) => set({ selectedCreature: creature }),

  evolveCreature: (id) => set((state) => {
    const creatureIndex = state.creatures.findIndex(c => c.id === id)
    if (creatureIndex === -1) return state

    const creature = state.creatures[creatureIndex]
    const cost = creature.level * 10

    if (state.resources.dna < cost) return state

    const evolvedCreature = {
      ...creature,
      level: creature.level + 1,
      evolution: creature.evolution + 1,
      size: creature.size + 2,
      speed: creature.speed + 1,
      intelligence: creature.intelligence + 1,
      strength: creature.strength + 1,
      pixels: generatePixelCreature(creature.level + 1)
    }

    const newCreatures = [...state.creatures]
    newCreatures[creatureIndex] = evolvedCreature

    return {
      creatures: newCreatures,
      resources: {
        ...state.resources,
        dna: state.resources.dna - cost
      },
      stats: {
        ...state.stats,
        totalEvolutions: state.stats.totalEvolutions + 1,
        maxLevel: Math.max(state.stats.maxLevel, evolvedCreature.level)
      }
    }
  }),

  feedCreature: (id) => set((state) => {
    const creatureIndex = state.creatures.findIndex(c => c.id === id)
    if (creatureIndex === -1 || state.resources.food < 10) return state

    const creature = state.creatures[creatureIndex]
    const updatedCreature = {
      ...creature,
      experience: creature.experience + 10,
      dna: creature.dna + 1
    }

    const newCreatures = [...state.creatures]
    newCreatures[creatureIndex] = updatedCreature

    return {
      creatures: newCreatures,
      resources: {
        ...state.resources,
        food: state.resources.food - 10,
        dna: state.resources.dna + 1
      }
    }
  }),

  collectDNA: () => set((state) => ({
    resources: {
      ...state.resources,
      dna: state.resources.dna + 1
    },
    stats: {
      ...state.stats,
      totalClicks: state.stats.totalClicks + 1
    }
  })),

  buyCreature: () => set((state) => {
    const cost = state.creatures.length * 50
    if (state.resources.dna < cost) return state

    const newCreature = createNewCreature(state.creatures.length + 1)
    
    return {
      creatures: [...state.creatures, newCreature],
      resources: {
        ...state.resources,
        dna: state.resources.dna - cost
      }
    }
  }),

  updateResources: (resources) => set((state) => ({
    resources: { ...state.resources, ...resources }
  })),

  updateStats: (stats) => set((state) => ({
    stats: { ...state.stats, ...stats }
  })),

  toggleAutoEvolve: () => set((state) => ({
    autoEvolve: !state.autoEvolve
  })),

  tick: () => set((state) => {
    const newResources = {
      ...state.resources,
      food: Math.min(state.resources.food + 1, 1000),
      energy: Math.min(state.resources.energy + 0.5, 500)
    }

    let dnaGeneration = 0
    state.creatures.forEach(creature => {
      dnaGeneration += creature.level * 0.1
    })

    newResources.dna = Math.min(state.resources.dna + dnaGeneration, 9999)

    if (state.autoEvolve) {
      const evolveableCreatures = state.creatures.filter(
        c => state.resources.dna >= c.level * 10
      )
      if (evolveableCreatures.length > 0) {
        const creature = evolveableCreatures[0]
        get().evolveCreature(creature.id)
      }
    }

    return {
      resources: newResources,
      stats: {
        ...state.stats,
        playTime: state.stats.playTime + 1
      }
    }
  })
}))