export interface FallingWord {
  id: string;
  word: string;
  x: number;
  y: number;
  speed: number;
  points: number;
  color: string;
}

export interface GameState {
  score: number;
  lives: number;
  level: number;
  isPlaying: boolean;
  isPaused: boolean;
  highScore: number;
  combo: number;
  words: FallingWord[];
  typedWord: string;
  completedWords: number;
  gameSpeed: number;
}