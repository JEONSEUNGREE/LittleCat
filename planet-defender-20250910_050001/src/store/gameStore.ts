import { create } from 'zustand';

export interface Enemy {
  id: string;
  x: number;
  y: number;
  health: number;
  maxHealth: number;
  speed: number;
  type: 'asteroid' | 'alien' | 'boss';
}

export interface Turret {
  id: string;
  x: number;
  y: number;
  level: number;
  damage: number;
  range: number;
  fireRate: number;
  lastFired: number;
}

interface GameState {
  score: number;
  credits: number;
  wave: number;
  health: number;
  maxHealth: number;
  gameStatus: 'menu' | 'playing' | 'paused' | 'gameOver';
  enemies: Enemy[];
  turrets: Turret[];
  selectedCell: { x: number; y: number } | null;
  
  // Actions
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  gameOver: () => void;
  
  // Enemy management
  spawnEnemy: (enemy: Enemy) => void;
  updateEnemy: (id: string, updates: Partial<Enemy>) => void;
  removeEnemy: (id: string) => void;
  
  // Turret management
  placeTurret: (x: number, y: number) => void;
  upgradeTurret: (id: string) => void;
  removeTurret: (id: string) => void;
  
  // Game mechanics
  takeDamage: (amount: number) => void;
  addCredits: (amount: number) => void;
  addScore: (points: number) => void;
  nextWave: () => void;
  selectCell: (x: number, y: number) => void;
  clearSelection: () => void;
}

const useGameStore = create<GameState>((set) => ({
  score: 0,
  credits: 100,
  wave: 1,
  health: 100,
  maxHealth: 100,
  gameStatus: 'menu',
  enemies: [],
  turrets: [],
  selectedCell: null,
  
  startGame: () => set({
    score: 0,
    credits: 100,
    wave: 1,
    health: 100,
    enemies: [],
    turrets: [],
    gameStatus: 'playing',
    selectedCell: null
  }),
  
  pauseGame: () => set({ gameStatus: 'paused' }),
  resumeGame: () => set({ gameStatus: 'playing' }),
  gameOver: () => set({ gameStatus: 'gameOver' }),
  
  spawnEnemy: (enemy) => set((state) => ({
    enemies: [...state.enemies, enemy]
  })),
  
  updateEnemy: (id, updates) => set((state) => ({
    enemies: state.enemies.map(e => 
      e.id === id ? { ...e, ...updates } : e
    )
  })),
  
  removeEnemy: (id) => set((state) => ({
    enemies: state.enemies.filter(e => e.id !== id)
  })),
  
  placeTurret: (x, y) => set((state) => {
    const cost = 50;
    if (state.credits < cost) return state;
    
    const newTurret: Turret = {
      id: `turret-${Date.now()}`,
      x,
      y,
      level: 1,
      damage: 10,
      range: 3,
      fireRate: 1000,
      lastFired: 0
    };
    
    return {
      turrets: [...state.turrets, newTurret],
      credits: state.credits - cost,
      selectedCell: null
    };
  }),
  
  upgradeTurret: (id) => set((state) => {
    const turret = state.turrets.find(t => t.id === id);
    if (!turret) return state;
    
    const cost = 30 * turret.level;
    if (state.credits < cost) return state;
    
    return {
      turrets: state.turrets.map(t => 
        t.id === id 
          ? { 
              ...t, 
              level: t.level + 1,
              damage: t.damage + 5,
              range: t.range + 0.5,
              fireRate: Math.max(t.fireRate - 100, 200)
            }
          : t
      ),
      credits: state.credits - cost
    };
  }),
  
  removeTurret: (id) => set((state) => ({
    turrets: state.turrets.filter(t => t.id !== id)
  })),
  
  takeDamage: (amount) => set((state) => {
    const newHealth = Math.max(0, state.health - amount);
    if (newHealth === 0) {
      return { health: 0, gameStatus: 'gameOver' };
    }
    return { health: newHealth };
  }),
  
  addCredits: (amount) => set((state) => ({
    credits: state.credits + amount
  })),
  
  addScore: (points) => set((state) => ({
    score: state.score + points
  })),
  
  nextWave: () => set((state) => ({
    wave: state.wave + 1,
    credits: state.credits + 50 + (state.wave * 10)
  })),
  
  selectCell: (x, y) => set({ selectedCell: { x, y } }),
  clearSelection: () => set({ selectedCell: null })
}));

export default useGameStore;