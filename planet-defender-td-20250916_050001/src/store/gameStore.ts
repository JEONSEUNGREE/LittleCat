import { create } from 'zustand';
import { Tower, Enemy, GameState, Position } from '../types/game';

interface GameStore extends GameState {
  towers: Tower[];
  enemies: Enemy[];
  selectedTowerType: 'laser' | 'missile' | 'plasma' | null;
  selectedTower: Tower | null;
  
  // Actions
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  setGameSpeed: (speed: 1 | 2 | 3) => void;
  
  // Tower actions
  selectTowerType: (type: 'laser' | 'missile' | 'plasma' | null) => void;
  placeTower: (position: Position) => void;
  selectTower: (tower: Tower | null) => void;
  upgradeTower: (towerId: string) => void;
  sellTower: (towerId: string) => void;
  
  // Enemy actions
  spawnEnemy: (enemy: Enemy) => void;
  damageEnemy: (enemyId: string, damage: number) => void;
  removeEnemy: (enemyId: string) => void;
  moveEnemies: () => void;
  
  // Game state actions
  addEnergy: (amount: number) => void;
  spendEnergy: (amount: number) => void;
  takeDamage: (damage: number) => void;
  addScore: (points: number) => void;
  nextWave: () => void;
  gameOver: () => void;
  resetGame: () => void;
}

const initialState: GameState = {
  health: 100,
  energy: 200,
  wave: 1,
  score: 0,
  isPlaying: false,
  isPaused: false,
  gameSpeed: 1,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,
  towers: [],
  enemies: [],
  selectedTowerType: null,
  selectedTower: null,
  
  startGame: () => set({ isPlaying: true, isPaused: false }),
  pauseGame: () => set({ isPaused: true }),
  resumeGame: () => set({ isPaused: false }),
  setGameSpeed: (speed) => set({ gameSpeed: speed }),
  
  selectTowerType: (type) => set({ selectedTowerType: type, selectedTower: null }),
  
  placeTower: (position) => {
    const { selectedTowerType, energy, towers } = get();
    if (!selectedTowerType) return;
    
    const towerCosts = { laser: 50, missile: 100, plasma: 150 };
    const cost = towerCosts[selectedTowerType];
    
    if (energy < cost) return;
    
    const newTower: Tower = {
      id: `tower-${Date.now()}`,
      type: selectedTowerType,
      position,
      level: 1,
      damage: selectedTowerType === 'laser' ? 10 : selectedTowerType === 'missile' ? 20 : 30,
      range: selectedTowerType === 'laser' ? 100 : selectedTowerType === 'missile' ? 150 : 120,
      fireRate: selectedTowerType === 'laser' ? 500 : selectedTowerType === 'missile' ? 1000 : 750,
      lastFireTime: 0,
    };
    
    set({
      towers: [...towers, newTower],
      energy: energy - cost,
      selectedTowerType: null,
    });
  },
  
  selectTower: (tower) => set({ selectedTower: tower, selectedTowerType: null }),
  
  upgradeTower: (towerId) => {
    const { towers, energy } = get();
    const tower = towers.find(t => t.id === towerId);
    if (!tower || tower.level >= 3) return;
    
    const upgradeCost = tower.level * 50;
    if (energy < upgradeCost) return;
    
    set({
      towers: towers.map(t => 
        t.id === towerId 
          ? { ...t, level: t.level + 1, damage: t.damage * 1.5, range: t.range * 1.2 }
          : t
      ),
      energy: energy - upgradeCost,
    });
  },
  
  sellTower: (towerId) => {
    const { towers, energy } = get();
    const tower = towers.find(t => t.id === towerId);
    if (!tower) return;
    
    const sellValue = tower.level * 30;
    set({
      towers: towers.filter(t => t.id !== towerId),
      energy: energy + sellValue,
      selectedTower: null,
    });
  },
  
  spawnEnemy: (enemy) => set(state => ({ enemies: [...state.enemies, enemy] })),
  
  damageEnemy: (enemyId, damage) => {
    const { enemies } = get();
    set({
      enemies: enemies.map(e => 
        e.id === enemyId 
          ? { ...e, health: Math.max(0, e.health - damage) }
          : e
      ),
    });
  },
  
  removeEnemy: (enemyId) => {
    const { enemies, energy, score } = get();
    const enemy = enemies.find(e => e.id === enemyId);
    if (!enemy) return;
    
    set({
      enemies: enemies.filter(e => e.id !== enemyId),
      energy: enemy.health <= 0 ? energy + enemy.value : energy,
      score: enemy.health <= 0 ? score + enemy.value : score,
    });
  },
  
  moveEnemies: () => {
    const { enemies, takeDamage } = get();
    const updatedEnemies: Enemy[] = [];
    
    enemies.forEach(enemy => {
      if (enemy.pathIndex >= 8) {
        takeDamage(10);
      } else {
        updatedEnemies.push({
          ...enemy,
          pathIndex: enemy.pathIndex + 0.01 * enemy.speed,
        });
      }
    });
    
    set({ enemies: updatedEnemies });
  },
  
  addEnergy: (amount) => set(state => ({ energy: state.energy + amount })),
  spendEnergy: (amount) => set(state => ({ energy: Math.max(0, state.energy - amount) })),
  takeDamage: (damage) => set(state => ({ health: Math.max(0, state.health - damage) })),
  addScore: (points) => set(state => ({ score: state.score + points })),
  
  nextWave: () => set(state => ({ wave: state.wave + 1 })),
  
  gameOver: () => set({ isPlaying: false, isPaused: false }),
  
  resetGame: () => set({
    ...initialState,
    towers: [],
    enemies: [],
    selectedTowerType: null,
    selectedTower: null,
  }),
}));