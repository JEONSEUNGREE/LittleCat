import { Level } from '../types/game';

export const levels: Level[] = [
  {
    id: 1,
    name: "Shadow's Beginning",
    walls: [
      { x: 0, y: 0, width: 400, height: 20 }, // top
      { x: 0, y: 580, width: 400, height: 20 }, // bottom
      { x: 0, y: 0, width: 20, height: 600 }, // left
      { x: 380, y: 0, width: 20, height: 600 }, // right
      { x: 100, y: 100, width: 200, height: 20 }, // obstacle 1
      { x: 100, y: 200, width: 20, height: 200 }, // obstacle 2
      { x: 250, y: 300, width: 130, height: 20 }, // obstacle 3
    ],
    lights: [
      { x: 200, y: 150, radius: 60, intensity: 1 },
      { x: 300, y: 400, radius: 50, intensity: 0.8 },
    ],
    start: { x: 50, y: 50 },
    exit: { x: 350, y: 550 },
    timeLimit: 60,
  },
  {
    id: 2,
    name: "Light's Pursuit",
    walls: [
      { x: 0, y: 0, width: 400, height: 20 },
      { x: 0, y: 580, width: 400, height: 20 },
      { x: 0, y: 0, width: 20, height: 600 },
      { x: 380, y: 0, width: 20, height: 600 },
      { x: 50, y: 150, width: 150, height: 20 },
      { x: 200, y: 100, width: 20, height: 150 },
      { x: 150, y: 350, width: 100, height: 20 },
      { x: 300, y: 200, width: 20, height: 200 },
    ],
    lights: [
      { x: 100, y: 100, radius: 70, intensity: 1.2 },
      { x: 250, y: 300, radius: 60, intensity: 1 },
      { x: 150, y: 500, radius: 50, intensity: 0.9 },
    ],
    start: { x: 50, y: 550 },
    exit: { x: 350, y: 50 },
    timeLimit: 50,
  },
  {
    id: 3,
    name: "Maze of Shadows",
    walls: [
      { x: 0, y: 0, width: 400, height: 20 },
      { x: 0, y: 580, width: 400, height: 20 },
      { x: 0, y: 0, width: 20, height: 600 },
      { x: 380, y: 0, width: 20, height: 600 },
      { x: 60, y: 60, width: 20, height: 200 },
      { x: 60, y: 60, width: 200, height: 20 },
      { x: 140, y: 140, width: 120, height: 20 },
      { x: 140, y: 140, width: 20, height: 120 },
      { x: 220, y: 220, width: 100, height: 20 },
      { x: 300, y: 100, width: 20, height: 300 },
      { x: 100, y: 400, width: 200, height: 20 },
    ],
    lights: [
      { x: 120, y: 120, radius: 40, intensity: 1 },
      { x: 280, y: 280, radius: 45, intensity: 1.1 },
      { x: 200, y: 450, radius: 55, intensity: 0.9 },
      { x: 340, y: 150, radius: 50, intensity: 1 },
    ],
    start: { x: 30, y: 30 },
    exit: { x: 350, y: 550 },
    timeLimit: 45,
  },
  {
    id: 4,
    name: "Dancing Lights",
    walls: [
      { x: 0, y: 0, width: 400, height: 20 },
      { x: 0, y: 580, width: 400, height: 20 },
      { x: 0, y: 0, width: 20, height: 600 },
      { x: 380, y: 0, width: 20, height: 600 },
      { x: 50, y: 100, width: 100, height: 20 },
      { x: 250, y: 100, width: 100, height: 20 },
      { x: 150, y: 200, width: 100, height: 20 },
      { x: 50, y: 300, width: 100, height: 20 },
      { x: 250, y: 300, width: 100, height: 20 },
      { x: 150, y: 400, width: 100, height: 20 },
      { x: 50, y: 500, width: 100, height: 20 },
      { x: 250, y: 500, width: 100, height: 20 },
    ],
    lights: [
      { x: 100, y: 150, radius: 35, intensity: 1.3 },
      { x: 300, y: 150, radius: 35, intensity: 1.3 },
      { x: 200, y: 250, radius: 40, intensity: 1.2 },
      { x: 100, y: 350, radius: 35, intensity: 1.3 },
      { x: 300, y: 350, radius: 35, intensity: 1.3 },
      { x: 200, y: 450, radius: 40, intensity: 1.2 },
    ],
    start: { x: 200, y: 50 },
    exit: { x: 200, y: 550 },
    timeLimit: 40,
  },
  {
    id: 5,
    name: "Final Eclipse",
    walls: [
      { x: 0, y: 0, width: 400, height: 20 },
      { x: 0, y: 580, width: 400, height: 20 },
      { x: 0, y: 0, width: 20, height: 600 },
      { x: 380, y: 0, width: 20, height: 600 },
      { x: 100, y: 50, width: 20, height: 100 },
      { x: 280, y: 50, width: 20, height: 100 },
      { x: 50, y: 200, width: 100, height: 20 },
      { x: 250, y: 200, width: 100, height: 20 },
      { x: 150, y: 150, width: 100, height: 20 },
      { x: 190, y: 250, width: 20, height: 100 },
      { x: 100, y: 350, width: 200, height: 20 },
      { x: 50, y: 450, width: 100, height: 20 },
      { x: 250, y: 450, width: 100, height: 20 },
    ],
    lights: [
      { x: 60, y: 100, radius: 30, intensity: 1.5 },
      { x: 340, y: 100, radius: 30, intensity: 1.5 },
      { x: 200, y: 200, radius: 45, intensity: 1.3 },
      { x: 100, y: 400, radius: 35, intensity: 1.4 },
      { x: 300, y: 400, radius: 35, intensity: 1.4 },
      { x: 200, y: 520, radius: 40, intensity: 1.2 },
    ],
    start: { x: 30, y: 30 },
    exit: { x: 370, y: 570 },
    timeLimit: 35,
  },
];