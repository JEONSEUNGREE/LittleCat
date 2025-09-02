import { Level } from '../types/game';

export const levels: Level[] = [
  {
    id: 1,
    name: '어둠의 시작',
    gridSize: 10,
    startPosition: { x: 1, y: 1 },
    exitPosition: { x: 8, y: 8 },
    walls: [
      { x: 0, y: 0, width: 10, height: 1 }, // top wall
      { x: 0, y: 9, width: 10, height: 1 }, // bottom wall
      { x: 0, y: 0, width: 1, height: 10 }, // left wall
      { x: 9, y: 0, width: 1, height: 10 }, // right wall
      { x: 3, y: 1, width: 1, height: 5 },  // obstacle 1
      { x: 5, y: 4, width: 3, height: 1 },  // obstacle 2
      { x: 1, y: 7, width: 5, height: 1 },  // obstacle 3
    ],
    lightSources: [
      { id: 'l1-1', position: { x: 5, y: 2 }, intensity: 2, collected: false },
      { id: 'l1-2', position: { x: 7, y: 6 }, intensity: 2, collected: false },
      { id: 'l1-3', position: { x: 2, y: 5 }, intensity: 2, collected: false },
    ]
  },
  {
    id: 2,
    name: '그림자의 미로',
    gridSize: 12,
    startPosition: { x: 1, y: 1 },
    exitPosition: { x: 10, y: 10 },
    walls: [
      { x: 0, y: 0, width: 12, height: 1 },
      { x: 0, y: 11, width: 12, height: 1 },
      { x: 0, y: 0, width: 1, height: 12 },
      { x: 11, y: 0, width: 1, height: 12 },
      { x: 2, y: 2, width: 3, height: 1 },
      { x: 6, y: 1, width: 1, height: 4 },
      { x: 4, y: 5, width: 4, height: 1 },
      { x: 8, y: 3, width: 2, height: 1 },
      { x: 1, y: 7, width: 1, height: 3 },
      { x: 3, y: 8, width: 5, height: 1 },
      { x: 9, y: 6, width: 1, height: 3 },
    ],
    lightSources: [
      { id: 'l2-1', position: { x: 3, y: 3 }, intensity: 2, collected: false },
      { id: 'l2-2', position: { x: 8, y: 2 }, intensity: 2, collected: false },
      { id: 'l2-3', position: { x: 5, y: 7 }, intensity: 2, collected: false },
      { id: 'l2-4', position: { x: 9, y: 9 }, intensity: 3, collected: false },
    ]
  },
  {
    id: 3,
    name: '빛의 탈출',
    gridSize: 14,
    startPosition: { x: 1, y: 1 },
    exitPosition: { x: 12, y: 12 },
    walls: [
      { x: 0, y: 0, width: 14, height: 1 },
      { x: 0, y: 13, width: 14, height: 1 },
      { x: 0, y: 0, width: 1, height: 14 },
      { x: 13, y: 0, width: 1, height: 14 },
      { x: 2, y: 2, width: 4, height: 1 },
      { x: 5, y: 2, width: 1, height: 3 },
      { x: 7, y: 1, width: 1, height: 5 },
      { x: 9, y: 3, width: 3, height: 1 },
      { x: 3, y: 5, width: 1, height: 4 },
      { x: 5, y: 7, width: 4, height: 1 },
      { x: 8, y: 6, width: 1, height: 3 },
      { x: 10, y: 5, width: 1, height: 5 },
      { x: 1, y: 10, width: 6, height: 1 },
      { x: 7, y: 9, width: 1, height: 3 },
      { x: 9, y: 11, width: 3, height: 1 },
    ],
    lightSources: [
      { id: 'l3-1', position: { x: 3, y: 3 }, intensity: 2, collected: false },
      { id: 'l3-2', position: { x: 9, y: 2 }, intensity: 2, collected: false },
      { id: 'l3-3', position: { x: 6, y: 6 }, intensity: 3, collected: false },
      { id: 'l3-4', position: { x: 2, y: 9 }, intensity: 2, collected: false },
      { id: 'l3-5', position: { x: 11, y: 10 }, intensity: 3, collected: false },
    ]
  }
];