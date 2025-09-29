import { create } from 'zustand';
import { GameState, Position, ToolType, LaserBeam, GridCell } from '../types';
import { levels } from '../data/levels';
import { calculateLaserPath } from '../utils/physics';

interface GameStore extends GameState {
  initLevel: (levelId: number) => void;
  selectTool: (tool: ToolType | null) => void;
  placeTool: (position: Position) => void;
  rotateTool: (position: Position) => void;
  removeTool: (position: Position) => void;
  checkWinCondition: () => void;
  nextLevel: () => void;
  resetLevel: () => void;
  useHint: () => void;
  updateBeams: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  currentLevel: 1,
  moves: 0,
  score: 0,
  levelComplete: false,
  selectedTool: null,
  placedTools: [],
  beams: [],
  completedLevels: new Set(),
  hints: 3,

  initLevel: (levelId) => {
    const level = levels.find(l => l.id === levelId);
    if (!level) return;
    
    set({
      currentLevel: levelId,
      moves: 0,
      levelComplete: false,
      selectedTool: null,
      placedTools: [],
      beams: []
    });
    
    get().updateBeams();
  },

  selectTool: (tool) => {
    set({ selectedTool: tool });
  },

  placeTool: (position) => {
    const { selectedTool, placedTools } = get();
    if (!selectedTool) return;
    
    const existingToolIndex = placedTools.findIndex(
      t => t.position.x === position.x && t.position.y === position.y
    );
    
    if (existingToolIndex >= 0) {
      const newTools = [...placedTools];
      newTools[existingToolIndex] = {
        position,
        type: selectedTool,
        rotation: 0
      };
      set({ placedTools: newTools, moves: get().moves + 1 });
    } else {
      set({
        placedTools: [
          ...placedTools,
          { position, type: selectedTool, rotation: 0 }
        ],
        moves: get().moves + 1
      });
    }
    
    get().updateBeams();
    get().checkWinCondition();
  },

  rotateTool: (position) => {
    const { placedTools } = get();
    const toolIndex = placedTools.findIndex(
      t => t.position.x === position.x && t.position.y === position.y
    );
    
    if (toolIndex >= 0) {
      const newTools = [...placedTools];
      newTools[toolIndex].rotation = (newTools[toolIndex].rotation + 45) % 360;
      set({ placedTools: newTools, moves: get().moves + 1 });
      get().updateBeams();
      get().checkWinCondition();
    }
  },

  removeTool: (position) => {
    const { placedTools } = get();
    set({
      placedTools: placedTools.filter(
        t => !(t.position.x === position.x && t.position.y === position.y)
      )
    });
    get().updateBeams();
    get().checkWinCondition();
  },

  updateBeams: () => {
    const { currentLevel, placedTools } = get();
    const level = levels.find(l => l.id === currentLevel);
    if (!level) return;
    
    const beams = calculateLaserPath(level.grid, placedTools);
    set({ beams });
  },

  checkWinCondition: () => {
    const { currentLevel, beams } = get();
    const level = levels.find(l => l.id === currentLevel);
    if (!level) return;
    
    let allTargetsActivated = true;
    
    for (let y = 0; y < level.gridSize; y++) {
      for (let x = 0; x < level.gridSize; x++) {
        const cell = level.grid[y][x];
        if (cell.type === 'target') {
          const isActivated = beams.some(
            beam => beam.end.x === x && beam.end.y === y && beam.color === cell.color
          );
          if (!isActivated) {
            allTargetsActivated = false;
            break;
          }
        }
      }
    }
    
    if (allTargetsActivated) {
      const { completedLevels, moves } = get();
      const newCompletedLevels = new Set(completedLevels);
      newCompletedLevels.add(currentLevel);
      
      const stars = moves <= (level.minMoves || 10) ? 3 : 
                   moves <= (level.minMoves || 10) + 2 ? 2 : 1;
      
      set({
        levelComplete: true,
        completedLevels: newCompletedLevels,
        score: get().score + (100 * stars)
      });
    }
  },

  nextLevel: () => {
    const { currentLevel } = get();
    const nextLevelId = currentLevel + 1;
    if (nextLevelId <= levels.length) {
      get().initLevel(nextLevelId);
    }
  },

  resetLevel: () => {
    const { currentLevel } = get();
    get().initLevel(currentLevel);
  },

  useHint: () => {
    const { hints } = get();
    if (hints > 0) {
      set({ hints: hints - 1 });
    }
  }
}));