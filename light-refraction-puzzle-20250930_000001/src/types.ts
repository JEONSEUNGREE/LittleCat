export interface Position {
  x: number;
  y: number;
}

export type Direction = 'up' | 'down' | 'left' | 'right';
export type LaserColor = 'red' | 'blue' | 'green' | 'yellow';
export type ToolType = 'mirror' | 'prism' | 'splitter';

export interface GridCell {
  type: 'empty' | 'laser' | 'target' | 'obstacle' | 'tool';
  toolType?: ToolType;
  rotation?: number;
  color?: LaserColor;
  activated?: boolean;
}

export interface LaserBeam {
  id: string;
  start: Position;
  end: Position;
  color: LaserColor;
  direction: Direction;
  intensity: number;
}

export interface Level {
  id: number;
  name: string;
  gridSize: number;
  grid: GridCell[][];
  tools: { type: ToolType; count: number }[];
  minMoves?: number;
  stars: number;
}

export interface GameState {
  currentLevel: number;
  moves: number;
  score: number;
  levelComplete: boolean;
  selectedTool: ToolType | null;
  placedTools: { position: Position; type: ToolType; rotation: number }[];
  beams: LaserBeam[];
  completedLevels: Set<number>;
  hints: number;
}