export interface Position {
  x: number;
  y: number;
}

export interface Tower {
  id: string;
  type: 'laser' | 'missile' | 'plasma';
  position: Position;
  level: number;
  damage: number;
  range: number;
  fireRate: number;
  lastFireTime: number;
}

export interface Enemy {
  id: string;
  type: 'asteroid' | 'alien' | 'meteor';
  position: Position;
  health: number;
  maxHealth: number;
  speed: number;
  value: number;
  pathIndex: number;
}

export interface Wave {
  number: number;
  enemies: Enemy[];
  spawned: boolean;
  completed: boolean;
}

export interface GameState {
  health: number;
  energy: number;
  wave: number;
  score: number;
  isPlaying: boolean;
  isPaused: boolean;
  gameSpeed: 1 | 2 | 3;
}

export interface TowerType {
  id: 'laser' | 'missile' | 'plasma';
  name: string;
  cost: number;
  damage: number;
  range: number;
  fireRate: number;
  icon: string;
  color: string;
}