import { create } from 'zustand';
import { GameState, Enemy, Projectile, Tower } from '../types/game';

interface GameStore extends GameState {
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  gameOver: () => void;
  addEnemy: (enemy: Enemy) => void;
  removeEnemy: (id: string) => void;
  addProjectile: (projectile: Projectile) => void;
  removeProjectile: (id: string) => void;
  addTower: (tower: Tower) => void;
  updateScore: (points: number) => void;
  updateHealth: (damage: number) => void;
  updateMoney: (amount: number) => void;
  nextWave: () => void;
  selectTower: (towerId: string | null) => void;
  reset: () => void;
}

const initialState: GameState = {
  score: 0,
  health: 100,
  money: 500,
  wave: 1,
  enemies: [],
  projectiles: [],
  towers: [],
  gameStatus: 'menu',
  selectedTower: null,
};

export const useGameStore = create<GameStore>((set) => ({
  ...initialState,
  
  startGame: () => set({ gameStatus: 'playing', ...initialState, gameStatus: 'playing' }),
  pauseGame: () => set({ gameStatus: 'paused' }),
  resumeGame: () => set({ gameStatus: 'playing' }),
  gameOver: () => set({ gameStatus: 'gameOver' }),
  
  addEnemy: (enemy) => set((state) => ({ enemies: [...state.enemies, enemy] })),
  removeEnemy: (id) => set((state) => ({ 
    enemies: state.enemies.filter((e) => e.id !== id) 
  })),
  
  addProjectile: (projectile) => set((state) => ({ 
    projectiles: [...state.projectiles, projectile] 
  })),
  removeProjectile: (id) => set((state) => ({ 
    projectiles: state.projectiles.filter((p) => p.id !== id) 
  })),
  
  addTower: (tower) => set((state) => ({ 
    towers: [...state.towers, tower],
    money: state.money - 100
  })),
  
  updateScore: (points) => set((state) => ({ score: state.score + points })),
  updateHealth: (damage) => set((state) => {
    const newHealth = Math.max(0, state.health - damage);
    return { 
      health: newHealth,
      gameStatus: newHealth <= 0 ? 'gameOver' : state.gameStatus
    };
  }),
  updateMoney: (amount) => set((state) => ({ money: state.money + amount })),
  
  nextWave: () => set((state) => ({ 
    wave: state.wave + 1,
    money: state.money + 100
  })),
  
  selectTower: (towerId) => set({ selectedTower: towerId }),
  
  reset: () => set(initialState),
}));