export interface Letter {
  id: string;
  letter: string;
  isSelected: boolean;
  position: { x: number; y: number };
}

export interface Monster {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  wordLength: number;
  reward: number;
  emoji: string;
}

export interface Player {
  level: number;
  exp: number;
  maxExp: number;
  hp: number;
  maxHp: number;
  attack: number;
  coins: number;
  wordsFound: string[];
}

export interface GameState {
  player: Player;
  currentMonster: Monster | null;
  letters: Letter[];
  selectedLetters: Letter[];
  currentWord: string;
  score: number;
  combo: number;
  stage: number;
  gameStatus: 'menu' | 'playing' | 'paused' | 'gameOver' | 'victory';
  message: string;
  validWords: Set<string>;
}