import { create } from 'zustand';
import { GameState, Planet, Player } from '../types/game';

interface GameStore extends GameState {
  planets: Planet[];
  player: Player;
  setPlanets: (planets: Planet[]) => void;
  setPlayer: (player: Player) => void;
  incrementJumps: () => void;
  setLevel: (level: number) => void;
  setScore: (score: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setIsVictory: (isVictory: boolean) => void;
  setIsGameOver: (isGameOver: boolean) => void;
  resetGame: () => void;
  nextLevel: () => void;
}

const initialPlayer: Player = {
  x: 100,
  y: 200,
  vx: 0,
  vy: 0,
  radius: 10,
  jumping: false,
  onPlanet: null,
};

const initialState: GameState = {
  level: 1,
  score: 0,
  jumps: 0,
  maxJumps: 5,
  isPlaying: false,
  isVictory: false,
  isGameOver: false,
};

export const useGameStore = create<GameStore>((set) => ({
  ...initialState,
  planets: [],
  player: initialPlayer,
  
  setPlanets: (planets) => set({ planets }),
  setPlayer: (player) => set({ player }),
  incrementJumps: () => set((state) => ({ jumps: state.jumps + 1 })),
  setLevel: (level) => set({ level }),
  setScore: (score) => set({ score }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setIsVictory: (isVictory) => set({ isVictory }),
  setIsGameOver: (isGameOver) => set({ isGameOver }),
  
  resetGame: () => set({
    ...initialState,
    player: initialPlayer,
  }),
  
  nextLevel: () => set((state) => ({
    level: state.level + 1,
    jumps: 0,
    maxJumps: Math.max(3, 6 - Math.floor(state.level / 3)),
    isVictory: false,
    isGameOver: false,
    isPlaying: true,
  })),
}));