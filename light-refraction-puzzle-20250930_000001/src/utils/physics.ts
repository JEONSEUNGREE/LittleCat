import { GridCell, LaserBeam, Position, Direction, LaserColor } from '../types';

interface PlacedTool {
  position: Position;
  type: 'mirror' | 'prism' | 'splitter';
  rotation: number;
}

export const calculateLaserPath = (
  grid: GridCell[][],
  placedTools: PlacedTool[]
): LaserBeam[] => {
  const beams: LaserBeam[] = [];
  const gridSize = grid.length;
  
  // 모든 레이저 소스 찾기
  const laserSources: Array<{ position: Position; color: LaserColor }> = [];
  
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (grid[y][x].type === 'laser' && grid[y][x].color) {
        laserSources.push({
          position: { x, y },
          color: grid[y][x].color!
        });
      }
    }
  }
  
  // 각 레이저에서 빔 계산
  laserSources.forEach((source, index) => {
    const beam = traceLaser(
      source.position,
      getInitialDirection(source.position, gridSize),
      source.color,
      grid,
      placedTools,
      `beam-${index}`
    );
    if (beam) {
      beams.push(beam);
    }
  });
  
  return beams;
};

const getInitialDirection = (position: Position, gridSize: number): Direction => {
  if (position.x === 0) return 'right';
  if (position.x === gridSize - 1) return 'left';
  if (position.y === 0) return 'down';
  if (position.y === gridSize - 1) return 'up';
  return 'right';
};

const traceLaser = (
  start: Position,
  direction: Direction,
  color: LaserColor,
  grid: GridCell[][],
  placedTools: PlacedTool[],
  beamId: string
): LaserBeam | null => {
  let current = { ...start };
  let currentDirection = direction;
  const gridSize = grid.length;
  const maxSteps = gridSize * gridSize;
  let steps = 0;
  
  // 다음 위치로 이동
  const nextPosition = getNextPosition(current, currentDirection);
  if (!isValidPosition(nextPosition, gridSize)) {
    return null;
  }
  current = nextPosition;
  
  while (steps < maxSteps) {
    // 현재 위치의 도구 확인
    const tool = placedTools.find(
      t => t.position.x === current.x && t.position.y === current.y
    );
    
    if (tool) {
      // 도구에 의한 방향 변경
      currentDirection = getReflectedDirection(currentDirection, tool);
    }
    
    // 현재 위치의 셀 확인
    const cell = grid[current.y][current.x];
    
    if (cell.type === 'obstacle') {
      // 장애물에 부딪힘
      return {
        id: beamId,
        start,
        end: getPreviousPosition(current, currentDirection),
        color,
        direction: currentDirection,
        intensity: 1
      };
    }
    
    if (cell.type === 'target' && cell.color === color) {
      // 목표 도달
      return {
        id: beamId,
        start,
        end: current,
        color,
        direction: currentDirection,
        intensity: 1
      };
    }
    
    // 다음 위치로 이동
    const next = getNextPosition(current, currentDirection);
    
    if (!isValidPosition(next, gridSize)) {
      // 경계를 벗어남
      return {
        id: beamId,
        start,
        end: current,
        color,
        direction: currentDirection,
        intensity: 1
      };
    }
    
    current = next;
    steps++;
  }
  
  return null;
};

const getNextPosition = (position: Position, direction: Direction): Position => {
  switch (direction) {
    case 'up':
      return { x: position.x, y: position.y - 1 };
    case 'down':
      return { x: position.x, y: position.y + 1 };
    case 'left':
      return { x: position.x - 1, y: position.y };
    case 'right':
      return { x: position.x + 1, y: position.y };
  }
};

const getPreviousPosition = (position: Position, direction: Direction): Position => {
  switch (direction) {
    case 'up':
      return { x: position.x, y: position.y + 1 };
    case 'down':
      return { x: position.x, y: position.y - 1 };
    case 'left':
      return { x: position.x + 1, y: position.y };
    case 'right':
      return { x: position.x - 1, y: position.y };
  }
};

const isValidPosition = (position: Position, gridSize: number): boolean => {
  return position.x >= 0 && position.x < gridSize &&
         position.y >= 0 && position.y < gridSize;
};

const getReflectedDirection = (
  incoming: Direction,
  tool: PlacedTool
): Direction => {
  if (tool.type === 'mirror') {
    // 거울 반사 로직 (45도 각도 기준)
    const angle = tool.rotation;
    if (angle === 0 || angle === 180) {
      // / 형태의 거울
      switch (incoming) {
        case 'up': return 'right';
        case 'right': return 'up';
        case 'down': return 'left';
        case 'left': return 'down';
      }
    } else if (angle === 90 || angle === 270) {
      // \ 형태의 거울
      switch (incoming) {
        case 'up': return 'left';
        case 'left': return 'up';
        case 'down': return 'right';
        case 'right': return 'down';
      }
    }
  }
  
  // 프리즘이나 분할기는 방향 유지 (간단한 구현)
  return incoming;
};

export const getBeamPath = (beam: LaserBeam, gridSize: number): Position[] => {
  const path: Position[] = [];
  let current = { ...beam.start };
  const end = { ...beam.end };
  
  while (current.x !== end.x || current.y !== end.y) {
    path.push({ ...current });
    
    if (current.x < end.x) current.x++;
    else if (current.x > end.x) current.x--;
    
    if (current.y < end.y) current.y++;
    else if (current.y > end.y) current.y--;
  }
  
  path.push(end);
  return path;
};