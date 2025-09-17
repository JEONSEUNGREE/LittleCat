export interface Position {
  x: number;
  y: number;
}

export interface LightSource extends Position {
  radius: number;
  intensity: number;
}

export interface Player extends Position {
  size: number;
  isDead: boolean;
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
  walls: Wall[];
  lights: LightSource[];
  start: Position;
  exit: Position;
  timeLimit?: number;
}

export interface GameState {
  currentLevel: number;
  isPlaying: boolean;
  isPaused: boolean;
  score: number;
  lives: number;
  timeRemaining?: number;
}