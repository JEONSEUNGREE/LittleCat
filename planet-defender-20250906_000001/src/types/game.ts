export interface Position {
  x: number;
  y: number;
}

export interface Enemy {
  id: string;
  position: Position;
  health: number;
  maxHealth: number;
  speed: number;
  angle: number;
  type: 'small' | 'medium' | 'large';
}

export interface Projectile {
  id: string;
  position: Position;
  target: Position;
  speed: number;
  damage: number;
}

export interface Tower {
  id: string;
  position: Position;
  type: 'laser' | 'missile' | 'plasma';
  level: number;
  range: number;
  damage: number;
  fireRate: number;
  lastFired: number;
}

export interface GameState {
  score: number;
  health: number;
  money: number;
  wave: number;
  enemies: Enemy[];
  projectiles: Projectile[];
  towers: Tower[];
  gameStatus: 'menu' | 'playing' | 'paused' | 'gameOver';
  selectedTower: string | null;
}