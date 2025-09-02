export interface Planet {
  id: number;
  x: number;
  y: number;
  radius: number;
  gravity: number;
  color: string;
  name: string;
  isGoal?: boolean;
}

export interface Player {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  jumping: boolean;
  onPlanet: number | null;
}

export interface GameState {
  level: number;
  score: number;
  jumps: number;
  maxJumps: number;
  isPlaying: boolean;
  isVictory: boolean;
  isGameOver: boolean;
}