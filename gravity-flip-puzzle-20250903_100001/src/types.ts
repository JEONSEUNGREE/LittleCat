export type GravityDirection = 'up' | 'down' | 'left' | 'right';

export interface Position {
  x: number;
  y: number;
}

export interface GameObject {
  id: string;
  type: 'player' | 'box' | 'goal' | 'wall' | 'spike';
  position: Position;
  color?: string;
  isMovable?: boolean;
}

export interface Level {
  id: number;
  name: string;
  gridSize: number;
  objects: GameObject[];
  goalPosition: Position;
  maxMoves: number;
  stars: {
    three: number;
    two: number;
    one: number;
  };
}

export interface GameState {
  currentLevel: number;
  moves: number;
  gravity: GravityDirection;
  isWon: boolean;
  isPaused: boolean;
  stars: number;
  completedLevels: Set<number>;
}