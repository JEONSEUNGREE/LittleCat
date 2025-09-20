export interface Player {
  position: number;
  isFlipped: boolean;
  isJumping: boolean;
  velocity: number;
}

export interface Obstacle {
  id: string;
  position: number;
  type: 'spike' | 'block' | 'coin';
  isTop: boolean;
  height: number;
  width: number;
}

export interface GameState {
  score: number;
  coins: number;
  distance: number;
  speed: number;
  isRunning: boolean;
  isGameOver: boolean;
  highScore: number;
}

export type GameAction = 'jump' | 'flip' | 'start' | 'reset';