export interface GameState {
  isPlaying: boolean;
  isPaused: boolean;
  score: number;
  highScore: number;
  combo: number;
  maxCombo: number;
  surferPosition: number;
  audioData: number[];
  gameOver: boolean;
  level: number;
}

export interface Obstacle {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'spike' | 'gap' | 'barrier';
}

export interface Collectible {
  id: string;
  x: number;
  y: number;
  collected: boolean;
  points: number;
}

export type GameAction =
  | { type: 'START_GAME' }
  | { type: 'PAUSE_GAME' }
  | { type: 'RESUME_GAME' }
  | { type: 'GAME_OVER' }
  | { type: 'UPDATE_SCORE'; payload: number }
  | { type: 'UPDATE_POSITION'; payload: number }
  | { type: 'UPDATE_AUDIO'; payload: number[] }
  | { type: 'INCREMENT_COMBO' }
  | { type: 'RESET_COMBO' }
  | { type: 'RESET_GAME' };
