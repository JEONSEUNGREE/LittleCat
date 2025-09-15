export interface Position {
  x: number;
  y: number;
}

export interface LightSource {
  id: string;
  position: Position;
  intensity: number;
  angle: number;
  color: string;
  isDraggable: boolean;
}

export interface ShadowObject {
  id: string;
  position: Position;
  width: number;
  height: number;
  rotation: number;
  shape: 'square' | 'circle' | 'triangle' | 'hexagon';
  isDraggable: boolean;
}

export interface Level {
  id: number;
  name: string;
  targetShape: string;
  lightSources: LightSource[];
  objects: ShadowObject[];
  hints: string[];
  maxMoves: number;
  stars: {
    one: number;
    two: number;
    three: number;
  };
}

export interface GameState {
  currentLevel: number;
  moves: number;
  isComplete: boolean;
  stars: number;
  hintsUsed: number;
  totalScore: number;
}