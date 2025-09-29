import { Level, GridCell } from '../types';

const createEmptyGrid = (size: number): GridCell[][] => {
  return Array(size).fill(null).map(() =>
    Array(size).fill(null).map(() => ({ type: 'empty' as const }))
  );
};

export const levels: Level[] = [
  {
    id: 1,
    name: '첫 번째 빛',
    gridSize: 5,
    grid: (() => {
      const grid = createEmptyGrid(5);
      grid[1][0] = { type: 'laser', color: 'red' };
      grid[1][4] = { type: 'target', color: 'red' };
      return grid;
    })(),
    tools: [{ type: 'mirror', count: 1 }],
    minMoves: 1,
    stars: 3
  },
  {
    id: 2,
    name: '색상 매칭',
    gridSize: 6,
    grid: (() => {
      const grid = createEmptyGrid(6);
      grid[1][0] = { type: 'laser', color: 'blue' };
      grid[4][0] = { type: 'laser', color: 'green' };
      grid[1][5] = { type: 'target', color: 'blue' };
      grid[4][5] = { type: 'target', color: 'green' };
      grid[2][3] = { type: 'obstacle' };
      return grid;
    })(),
    tools: [
      { type: 'mirror', count: 2 },
      { type: 'prism', count: 1 }
    ],
    minMoves: 4,
    stars: 3
  },
  {
    id: 3,
    name: '프리즘의 힘',
    gridSize: 7,
    grid: (() => {
      const grid = createEmptyGrid(7);
      grid[3][0] = { type: 'laser', color: 'yellow' };
      grid[1][6] = { type: 'target', color: 'yellow' };
      grid[5][6] = { type: 'target', color: 'yellow' };
      grid[3][3] = { type: 'obstacle' };
      grid[2][4] = { type: 'obstacle' };
      grid[4][4] = { type: 'obstacle' };
      return grid;
    })(),
    tools: [
      { type: 'mirror', count: 2 },
      { type: 'prism', count: 1 },
      { type: 'splitter', count: 1 }
    ],
    minMoves: 5,
    stars: 3
  },
  {
    id: 4,
    name: '복잡한 경로',
    gridSize: 8,
    grid: (() => {
      const grid = createEmptyGrid(8);
      grid[0][0] = { type: 'laser', color: 'red' };
      grid[7][0] = { type: 'laser', color: 'blue' };
      grid[0][7] = { type: 'target', color: 'blue' };
      grid[7][7] = { type: 'target', color: 'red' };
      // 장애물 추가
      for (let i = 2; i < 6; i++) {
        grid[3][i] = { type: 'obstacle' };
        grid[4][i] = { type: 'obstacle' };
      }
      return grid;
    })(),
    tools: [
      { type: 'mirror', count: 4 },
      { type: 'prism', count: 2 }
    ],
    minMoves: 6,
    stars: 3
  },
  {
    id: 5,
    name: '마스터 챌린지',
    gridSize: 9,
    grid: (() => {
      const grid = createEmptyGrid(9);
      grid[4][0] = { type: 'laser', color: 'green' };
      grid[0][4] = { type: 'laser', color: 'red' };
      grid[8][4] = { type: 'laser', color: 'blue' };
      grid[4][8] = { type: 'target', color: 'green' };
      grid[2][2] = { type: 'target', color: 'red' };
      grid[6][2] = { type: 'target', color: 'blue' };
      grid[2][6] = { type: 'target', color: 'red' };
      grid[6][6] = { type: 'target', color: 'blue' };
      // 중앙 장애물 패턴
      grid[4][4] = { type: 'obstacle' };
      grid[3][4] = { type: 'obstacle' };
      grid[5][4] = { type: 'obstacle' };
      grid[4][3] = { type: 'obstacle' };
      grid[4][5] = { type: 'obstacle' };
      return grid;
    })(),
    tools: [
      { type: 'mirror', count: 4 },
      { type: 'prism', count: 2 },
      { type: 'splitter', count: 2 }
    ],
    minMoves: 8,
    stars: 3
  }
];