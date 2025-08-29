export interface Recipe {
  id: string;
  emoji1: string;
  emoji2: string;
  result: string;
  name: string;
  discovered: boolean;
}

export interface GameElement {
  emoji: string;
  name: string;
  id: string;
  isBase: boolean;
}