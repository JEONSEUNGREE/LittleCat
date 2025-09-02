export interface Position {
  x: number;
  y: number;
}

export interface Player {
  position: Position;
  lightRadius: number;
}

export interface LightSource {
  id: string;
  position: Position;
  intensity: number;
  collected: boolean;
}

export interface Wall {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Level {
  id: number;
  name: string;
  gridSize: number;
  walls: Wall[];
  lightSources: LightSource[];
  exitPosition: Position;
  startPosition: Position;
}

export type GameState = 'menu' | 'playing' | 'paused' | 'won' | 'levelComplete';

export interface GameStore {
  gameState: GameState;
  currentLevel: number;
  player: Player;
  levels: Level[];
  score: number;
  timeElapsed: number;
  movePlayer: (direction: 'up' | 'down' | 'left' | 'right') => void;
  collectLight: (lightId: string) => void;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  nextLevel: () => void;
  resetGame: () => void;
}