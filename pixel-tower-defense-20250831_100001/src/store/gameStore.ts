import { create } from 'zustand'

export interface Tower {
  id: string
  x: number
  y: number
  type: 'basic' | 'ice' | 'fire'
  level: number
  damage: number
  range: number
  fireRate: number
}

export interface Enemy {
  id: string
  x: number
  y: number
  hp: number
  maxHp: number
  speed: number
  value: number
  path: number[]
}

interface GameState {
  // Game Status
  isPlaying: boolean
  isPaused: boolean
  isGameOver: boolean
  
  // Resources
  gold: number
  lives: number
  score: number
  wave: number
  
  // Entities
  towers: Tower[]
  enemies: Enemy[]
  selectedTower: string | null
  
  // Actions
  startGame: () => void
  pauseGame: () => void
  togglePause: () => void
  resetGame: () => void
  gameOver: () => void
  
  // Tower Actions
  placeTower: (x: number, y: number, type: Tower['type']) => void
  upgradeTower: (id: string) => void
  selectTower: (type: string | null) => void
  
  // Enemy Actions
  spawnEnemy: () => void
  damageEnemy: (id: string, damage: number) => void
  removeEnemy: (id: string) => void
  
  // Resource Actions
  addGold: (amount: number) => void
  spendGold: (amount: number) => boolean
  loseLife: () => void
  addScore: (points: number) => void
  nextWave: () => void
}

const TOWER_COSTS = {
  basic: 50,
  ice: 75,
  fire: 100
}

const TOWER_STATS = {
  basic: { damage: 10, range: 2, fireRate: 1 },
  ice: { damage: 8, range: 2.5, fireRate: 0.8 },
  fire: { damage: 15, range: 1.5, fireRate: 1.2 }
}

export const useGameStore = create<GameState>((set, get) => ({
  // Initial State
  isPlaying: false,
  isPaused: false,
  isGameOver: false,
  gold: 200,
  lives: 20,
  score: 0,
  wave: 1,
  towers: [],
  enemies: [],
  selectedTower: null,
  
  // Game Control Actions
  startGame: () => set({ 
    isPlaying: true, 
    isPaused: false,
    isGameOver: false,
    gold: 200,
    lives: 20,
    score: 0,
    wave: 1,
    towers: [],
    enemies: []
  }),
  
  pauseGame: () => set({ isPaused: true }),
  
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
  
  resetGame: () => {
    set({ 
      isPlaying: false,
      isPaused: false,
      isGameOver: false,
      gold: 200,
      lives: 20,
      score: 0,
      wave: 1,
      towers: [],
      enemies: [],
      selectedTower: null
    })
  },
  
  gameOver: () => set({ isGameOver: true, isPaused: true }),
  
  // Tower Actions
  placeTower: (x, y, type) => {
    const state = get()
    const cost = TOWER_COSTS[type]
    
    if (state.gold >= cost) {
      const tower: Tower = {
        id: `tower-${Date.now()}`,
        x,
        y,
        type,
        level: 1,
        ...TOWER_STATS[type]
      }
      
      set((state) => ({
        towers: [...state.towers, tower],
        gold: state.gold - cost,
        selectedTower: null
      }))
    }
  },
  
  upgradeTower: (id) => {
    const state = get()
    const tower = state.towers.find(t => t.id === id)
    if (!tower) return
    
    const upgradeCost = tower.level * 50
    if (state.gold >= upgradeCost) {
      set((state) => ({
        towers: state.towers.map(t => 
          t.id === id 
            ? { ...t, level: t.level + 1, damage: t.damage * 1.5 }
            : t
        ),
        gold: state.gold - upgradeCost
      }))
    }
  },
  
  selectTower: (type) => set({ selectedTower: type }),
  
  // Enemy Actions
  spawnEnemy: () => {
    const enemy: Enemy = {
      id: `enemy-${Date.now()}`,
      x: 0,
      y: 4,
      hp: 50 + get().wave * 10,
      maxHp: 50 + get().wave * 10,
      speed: 1,
      value: 10 + get().wave * 2,
      path: []
    }
    
    set((state) => ({
      enemies: [...state.enemies, enemy]
    }))
  },
  
  damageEnemy: (id, damage) => {
    set((state) => ({
      enemies: state.enemies.map(e => 
        e.id === id 
          ? { ...e, hp: Math.max(0, e.hp - damage) }
          : e
      ).filter(e => e.hp > 0)
    }))
    
    const enemy = get().enemies.find(e => e.id === id)
    if (enemy && enemy.hp <= damage) {
      get().removeEnemy(id)
      get().addGold(enemy.value)
      get().addScore(enemy.value * 10)
    }
  },
  
  removeEnemy: (id) => {
    set((state) => ({
      enemies: state.enemies.filter(e => e.id !== id)
    }))
  },
  
  // Resource Actions
  addGold: (amount) => set((state) => ({ gold: state.gold + amount })),
  
  spendGold: (amount) => {
    const state = get()
    if (state.gold >= amount) {
      set({ gold: state.gold - amount })
      return true
    }
    return false
  },
  
  loseLife: () => {
    const newLives = get().lives - 1
    set({ lives: newLives })
    if (newLives <= 0) {
      get().gameOver()
    }
  },
  
  addScore: (points) => set((state) => ({ score: state.score + points })),
  
  nextWave: () => set((state) => ({ 
    wave: state.wave + 1,
    gold: state.gold + 50 + state.wave * 10
  }))
}))