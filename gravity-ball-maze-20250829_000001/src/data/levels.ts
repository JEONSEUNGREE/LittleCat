export interface Wall {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Level {
  id: number;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  start: { x: number; y: number };
  goal: { x: number; y: number; radius: number };
  walls: Wall[];
  hazards?: Wall[];
  powerUps?: { x: number; y: number; type: 'speed' | 'slow' | 'jump' }[];
}

export const levels: Level[] = [
  {
    id: 1,
    name: 'First Steps',
    difficulty: 'easy',
    start: { x: 50, y: 100 },
    goal: { x: 350, y: 500, radius: 30 },
    walls: [
      { x: 0, y: 0, width: 400, height: 10 },
      { x: 0, y: 590, width: 400, height: 10 },
      { x: 0, y: 0, width: 10, height: 600 },
      { x: 390, y: 0, width: 10, height: 600 },
      { x: 100, y: 150, width: 200, height: 10 },
      { x: 50, y: 300, width: 150, height: 10 },
      { x: 250, y: 400, width: 100, height: 10 },
    ],
  },
  {
    id: 2,
    name: 'Zigzag Path',
    difficulty: 'easy',
    start: { x: 50, y: 50 },
    goal: { x: 350, y: 550, radius: 25 },
    walls: [
      { x: 0, y: 0, width: 400, height: 10 },
      { x: 0, y: 590, width: 400, height: 10 },
      { x: 0, y: 0, width: 10, height: 600 },
      { x: 390, y: 0, width: 10, height: 600 },
      { x: 80, y: 100, width: 250, height: 10 },
      { x: 80, y: 100, width: 10, height: 100 },
      { x: 80, y: 200, width: 250, height: 10 },
      { x: 320, y: 200, width: 10, height: 100 },
      { x: 80, y: 300, width: 250, height: 10 },
      { x: 80, y: 300, width: 10, height: 100 },
      { x: 80, y: 400, width: 250, height: 10 },
      { x: 320, y: 400, width: 10, height: 100 },
    ],
  },
  {
    id: 3,
    name: 'Narrow Corridors',
    difficulty: 'medium',
    start: { x: 30, y: 30 },
    goal: { x: 370, y: 570, radius: 20 },
    walls: [
      { x: 0, y: 0, width: 400, height: 10 },
      { x: 0, y: 590, width: 400, height: 10 },
      { x: 0, y: 0, width: 10, height: 600 },
      { x: 390, y: 0, width: 10, height: 600 },
      { x: 60, y: 10, width: 10, height: 150 },
      { x: 60, y: 150, width: 280, height: 10 },
      { x: 330, y: 160, width: 10, height: 150 },
      { x: 60, y: 310, width: 280, height: 10 },
      { x: 60, y: 320, width: 10, height: 150 },
      { x: 60, y: 470, width: 280, height: 10 },
    ],
    hazards: [
      { x: 150, y: 200, width: 100, height: 20 },
      { x: 150, y: 380, width: 100, height: 20 },
    ],
  },
  {
    id: 4,
    name: 'Spiral Maze',
    difficulty: 'medium',
    start: { x: 200, y: 300 },
    goal: { x: 200, y: 50, radius: 25 },
    walls: [
      { x: 0, y: 0, width: 400, height: 10 },
      { x: 0, y: 590, width: 400, height: 10 },
      { x: 0, y: 0, width: 10, height: 600 },
      { x: 390, y: 0, width: 10, height: 600 },
      // Spiral walls
      { x: 100, y: 100, width: 200, height: 10 },
      { x: 100, y: 100, width: 10, height: 400 },
      { x: 100, y: 490, width: 200, height: 10 },
      { x: 290, y: 200, width: 10, height: 300 },
      { x: 200, y: 200, width: 100, height: 10 },
      { x: 200, y: 200, width: 10, height: 200 },
      { x: 200, y: 390, width: 90, height: 10 },
    ],
  },
  {
    id: 5,
    name: 'Hazard Zone',
    difficulty: 'hard',
    start: { x: 50, y: 550 },
    goal: { x: 350, y: 50, radius: 25 },
    walls: [
      { x: 0, y: 0, width: 400, height: 10 },
      { x: 0, y: 590, width: 400, height: 10 },
      { x: 0, y: 0, width: 10, height: 600 },
      { x: 390, y: 0, width: 10, height: 600 },
      { x: 100, y: 500, width: 200, height: 10 },
      { x: 50, y: 400, width: 300, height: 10 },
      { x: 100, y: 300, width: 200, height: 10 },
      { x: 50, y: 200, width: 300, height: 10 },
      { x: 100, y: 100, width: 200, height: 10 },
    ],
    hazards: [
      { x: 120, y: 450, width: 60, height: 20 },
      { x: 220, y: 450, width: 60, height: 20 },
      { x: 170, y: 350, width: 60, height: 20 },
      { x: 120, y: 250, width: 60, height: 20 },
      { x: 220, y: 250, width: 60, height: 20 },
      { x: 170, y: 150, width: 60, height: 20 },
    ],
  },
  {
    id: 6,
    name: 'The Gauntlet',
    difficulty: 'expert',
    start: { x: 30, y: 300 },
    goal: { x: 370, y: 300, radius: 20 },
    walls: [
      { x: 0, y: 0, width: 400, height: 10 },
      { x: 0, y: 590, width: 400, height: 10 },
      { x: 0, y: 0, width: 10, height: 600 },
      { x: 390, y: 0, width: 10, height: 600 },
      // Top corridor
      { x: 10, y: 250, width: 380, height: 10 },
      { x: 10, y: 350, width: 380, height: 10 },
      // Obstacles
      { x: 80, y: 260, width: 10, height: 90 },
      { x: 160, y: 260, width: 10, height: 90 },
      { x: 240, y: 260, width: 10, height: 90 },
      { x: 320, y: 260, width: 10, height: 90 },
    ],
    hazards: [
      { x: 50, y: 280, width: 20, height: 40 },
      { x: 100, y: 280, width: 20, height: 40 },
      { x: 130, y: 280, width: 20, height: 40 },
      { x: 180, y: 280, width: 20, height: 40 },
      { x: 210, y: 280, width: 20, height: 40 },
      { x: 260, y: 280, width: 20, height: 40 },
      { x: 290, y: 280, width: 20, height: 40 },
      { x: 340, y: 280, width: 20, height: 40 },
    ],
  },
];