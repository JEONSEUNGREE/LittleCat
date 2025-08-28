import { create } from 'zustand';
import { GameState, NumberBlock, Position } from '../types/game.types';

const GRID_SIZE = 8;
const INITIAL_BLOCKS = 30;

interface GameStore extends GameState {
  initGame: () => void;
  selectBlock: (block: NumberBlock) => void;
  makeMove: (targetPos: Position) => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;
  checkChainReaction: (block: NumberBlock) => void;
}

const generateRandomBlock = (x: number, y: number): NumberBlock => {
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
    '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE'
  ];
  const value = values[Math.floor(Math.random() * values.length)];
  
  return {
    id: `${x}-${y}-${Date.now()}`,
    value,
    x,
    y,
    isActive: true,
    isChaining: false,
    color: colors[value - 1]
  };
};

const initializeGrid = (): (NumberBlock | null)[][] => {
  const grid: (NumberBlock | null)[][] = Array(GRID_SIZE).fill(null)
    .map(() => Array(GRID_SIZE).fill(null));
  
  let blocksPlaced = 0;
  while (blocksPlaced < INITIAL_BLOCKS) {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    
    if (!grid[y][x]) {
      grid[y][x] = generateRandomBlock(x, y);
      blocksPlaced++;
    }
  }
  
  return grid;
};

export const useGameStore = create<GameStore>((set, get) => ({
  grid: initializeGrid(),
  score: 0,
  level: 1,
  moves: 0,
  chainMultiplier: 1,
  gameOver: false,
  isPaused: false,
  selectedBlock: null,
  chainedBlocks: new Set(),
  highScore: parseInt(localStorage.getItem('highScore') || '0'),

  initGame: () => {
    set({
      grid: initializeGrid(),
      score: 0,
      level: 1,
      moves: 0,
      chainMultiplier: 1,
      gameOver: false,
      isPaused: false,
      selectedBlock: null,
      chainedBlocks: new Set()
    });
  },

  selectBlock: (block: NumberBlock) => {
    const { selectedBlock } = get();
    
    if (selectedBlock && selectedBlock.id === block.id) {
      set({ selectedBlock: null });
    } else {
      set({ selectedBlock: block });
    }
  },

  makeMove: (targetPos: Position) => {
    const { selectedBlock, grid, moves } = get();
    
    if (!selectedBlock) return;
    
    const newGrid = [...grid.map(row => [...row])];
    const targetBlock = newGrid[targetPos.y][targetPos.x];
    
    if (targetBlock && Math.abs(targetBlock.value - selectedBlock.value) === 1) {
      // Chain reaction!
      const chainValue = targetBlock.value + selectedBlock.value;
      const newBlock: NumberBlock = {
        ...targetBlock,
        value: chainValue > 9 ? 9 : chainValue,
        isChaining: true
      };
      
      newGrid[targetPos.y][targetPos.x] = newBlock;
      newGrid[selectedBlock.y][selectedBlock.x] = null;
      
      set(state => ({
        grid: newGrid,
        score: state.score + chainValue * state.chainMultiplier,
        moves: moves + 1,
        chainMultiplier: Math.min(state.chainMultiplier + 0.5, 5),
        selectedBlock: null
      }));
      
      setTimeout(() => {
        get().checkChainReaction(newBlock);
      }, 300);
    } else if (!targetBlock) {
      // Move to empty space
      newGrid[targetPos.y][targetPos.x] = { ...selectedBlock, x: targetPos.x, y: targetPos.y };
      newGrid[selectedBlock.y][selectedBlock.x] = null;
      
      set({
        grid: newGrid,
        moves: moves + 1,
        selectedBlock: null,
        chainMultiplier: 1
      });
    }
  },

  checkChainReaction: (block: NumberBlock) => {
    const { grid } = get();
    const adjacentPositions = [
      { x: block.x - 1, y: block.y },
      { x: block.x + 1, y: block.y },
      { x: block.x, y: block.y - 1 },
      { x: block.x, y: block.y + 1 }
    ];
    
    const newGrid = [...grid.map(row => [...row])];
    let chainCount = 0;
    
    adjacentPositions.forEach(pos => {
      if (pos.x >= 0 && pos.x < GRID_SIZE && pos.y >= 0 && pos.y < GRID_SIZE) {
        const adjacentBlock = newGrid[pos.y][pos.x];
        if (adjacentBlock && Math.abs(adjacentBlock.value - block.value) === 1) {
          const chainValue = adjacentBlock.value + block.value;
          newGrid[pos.y][pos.x] = {
            ...adjacentBlock,
            value: chainValue > 9 ? 9 : chainValue,
            isChaining: true
          };
          chainCount++;
        }
      }
    });
    
    if (chainCount > 0) {
      set(state => ({
        grid: newGrid,
        score: state.score + (chainCount * 10 * state.chainMultiplier),
        chainMultiplier: Math.min(state.chainMultiplier + chainCount * 0.25, 5)
      }));
    }
    
    // Reset chaining animation
    setTimeout(() => {
      const resetGrid = [...get().grid.map(row => [...row])];
      resetGrid.forEach(row => {
        row.forEach(cell => {
          if (cell) cell.isChaining = false;
        });
      });
      set({ grid: resetGrid });
    }, 500);
  },

  pauseGame: () => set({ isPaused: true }),
  
  resumeGame: () => set({ isPaused: false }),
  
  resetGame: () => {
    const { score, highScore } = get();
    if (score > highScore) {
      localStorage.setItem('highScore', score.toString());
      set({ highScore: score });
    }
    get().initGame();
  }
}));