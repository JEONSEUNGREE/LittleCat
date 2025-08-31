import { create } from 'zustand';

export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  vx: number;
  vy: number;
}

export interface Level {
  id: number;
  name: string;
  target: Position;
  obstacles: Position[];
  stars: Position[];
  gravityZones: GravityZone[];
}

export interface GravityZone {
  position: Position;
  strength: number;
  radius: number;
}

interface GameState {
  currentLevel: number;
  score: number;
  stars: number;
  isPlaying: boolean;
  ballPosition: Position;
  ballVelocity: Velocity;
  gravity: { x: number; y: number };
  levels: Level[];
  collectedStars: Set<string>;
  attempts: number;
  
  // Actions
  startGame: () => void;
  resetLevel: () => void;
  nextLevel: () => void;
  updateBallPosition: (position: Position) => void;
  updateBallVelocity: (velocity: Velocity) => void;
  setGravity: (gravity: { x: number; y: number }) => void;
  collectStar: (starId: string) => void;
  incrementAttempts: () => void;
  setPlaying: (playing: boolean) => void;
}

const initialLevels: Level[] = [
  {
    id: 1,
    name: "Tutorial",
    target: { x: 300, y: 100 },
    obstacles: [
      { x: 200, y: 250 },
      { x: 250, y: 200 },
    ],
    stars: [
      { x: 150, y: 200 },
      { x: 250, y: 150 },
      { x: 350, y: 200 },
    ],
    gravityZones: [],
  },
  {
    id: 2,
    name: "Gravity Well",
    target: { x: 350, y: 150 },
    obstacles: [
      { x: 200, y: 300 },
      { x: 300, y: 250 },
      { x: 250, y: 200 },
    ],
    stars: [
      { x: 100, y: 250 },
      { x: 200, y: 150 },
      { x: 300, y: 100 },
    ],
    gravityZones: [
      { position: { x: 250, y: 250 }, strength: 50, radius: 80 },
    ],
  },
  {
    id: 3,
    name: "Double Trouble",
    target: { x: 320, y: 100 },
    obstacles: [
      { x: 150, y: 200 },
      { x: 250, y: 300 },
      { x: 350, y: 250 },
      { x: 200, y: 150 },
    ],
    stars: [
      { x: 100, y: 150 },
      { x: 300, y: 200 },
      { x: 200, y: 350 },
    ],
    gravityZones: [
      { position: { x: 150, y: 250 }, strength: 40, radius: 60 },
      { position: { x: 350, y: 150 }, strength: -30, radius: 70 },
    ],
  },
];

export const useGameStore = create<GameState>((set) => ({
  currentLevel: 0,
  score: 0,
  stars: 0,
  isPlaying: false,
  ballPosition: { x: 50, y: 400 },
  ballVelocity: { vx: 0, vy: 0 },
  gravity: { x: 0, y: 0.5 },
  levels: initialLevels,
  collectedStars: new Set(),
  attempts: 0,

  startGame: () => set({ 
    currentLevel: 0, 
    score: 0, 
    stars: 0, 
    isPlaying: true,
    collectedStars: new Set(),
    attempts: 0,
    ballPosition: { x: 50, y: 400 },
    ballVelocity: { vx: 0, vy: 0 },
  }),

  resetLevel: () => set((state) => ({
    ballPosition: { x: 50, y: 400 },
    ballVelocity: { vx: 0, vy: 0 },
    gravity: { x: 0, y: 0.5 },
    collectedStars: new Set(),
    attempts: state.attempts + 1,
  })),

  nextLevel: () => set((state) => ({
    currentLevel: Math.min(state.currentLevel + 1, state.levels.length - 1),
    ballPosition: { x: 50, y: 400 },
    ballVelocity: { vx: 0, vy: 0 },
    gravity: { x: 0, y: 0.5 },
    collectedStars: new Set(),
    score: state.score + (100 + state.collectedStars.size * 50),
  })),

  updateBallPosition: (position) => set({ ballPosition: position }),
  
  updateBallVelocity: (velocity) => set({ ballVelocity: velocity }),
  
  setGravity: (gravity) => set({ gravity }),
  
  collectStar: (starId) => set((state) => ({
    collectedStars: new Set([...state.collectedStars, starId]),
    stars: state.stars + 1,
  })),

  incrementAttempts: () => set((state) => ({ attempts: state.attempts + 1 })),
  
  setPlaying: (playing) => set({ isPlaying: playing }),
}))