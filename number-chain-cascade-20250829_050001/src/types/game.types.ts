export interface NumberBlock {
  id: string;
  value: number;
  x: number;
  y: number;
  isActive: boolean;
  isChaining: boolean;
  color: string;
}

export interface GameState {
  grid: (NumberBlock | null)[][];
  score: number;
  level: number;
  moves: number;
  chainMultiplier: number;
  gameOver: boolean;
  isPaused: boolean;
  selectedBlock: NumberBlock | null;
  chainedBlocks: Set<string>;
  highScore: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface ChainReaction {
  blocks: NumberBlock[];
  totalValue: number;
  multiplier: number;
}