export interface Vector2D {
  x: number;
  y: number;
}

export interface Planet {
  id: string;
  position: Vector2D;
  radius: number;
  gravityStrength: number;
  color: string;
  isActive: boolean;
}

export interface Spaceship {
  position: Vector2D;
  velocity: Vector2D;
  trail: Vector2D[];
  isLaunched: boolean;
}

export interface Target {
  position: Vector2D;
  radius: number;
}

export interface Level {
  id: number;
  name: string;
  planets: Planet[];
  shipStart: Vector2D;
  target: Target;
  maxGravityAdjustments: number;
  stars: number; 
  description: string;
}

export interface GameState {
  currentLevel: number;
  completedLevels: number[];
  stars: Record<number, number>;
  totalMoves: number;
  bestScores: Record<number, number>;
}