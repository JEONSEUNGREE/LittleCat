export interface Particle {
  id: string;
  x: number;
  y: number;
  state: 'up' | 'down' | 'superposition';
  entangledWith?: string;
  color: string;
  isSelected: boolean;
}

export interface GameState {
  particles: Particle[];
  score: number;
  level: number;
  moves: number;
  maxMoves: number;
  gameStatus: 'playing' | 'won' | 'lost' | 'menu';
}