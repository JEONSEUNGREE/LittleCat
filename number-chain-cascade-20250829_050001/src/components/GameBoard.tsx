import React from 'react';
import { useGameStore } from '../store/gameStore';
import NumberBlock from './NumberBlock';
import { Position } from '../types/game.types';

const GameBoard: React.FC = () => {
  const { grid, selectedBlock, makeMove, isPaused } = useGameStore();

  const handleCellClick = (x: number, y: number) => {
    if (isPaused) return;
    
    const block = grid[y][x];
    if (block && !selectedBlock) {
      useGameStore.getState().selectBlock(block);
    } else if (selectedBlock) {
      makeMove({ x, y } as Position);
    }
  };

  return (
    <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-2xl">
      <div className="grid grid-cols-8 gap-1 sm:gap-2">
        {grid.map((row, y) => (
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`
                aspect-square rounded-lg flex items-center justify-center
                transition-all duration-300 cursor-pointer
                ${cell ? 'bg-white/20' : 'bg-black/10'}
                ${selectedBlock?.id === cell?.id ? 'ring-4 ring-yellow-400 scale-110' : ''}
                hover:bg-white/30 active:scale-95
              `}
              onClick={() => handleCellClick(x, y)}
            >
              {cell && <NumberBlock block={cell} />}
            </div>
          ))
        ))}
      </div>
      
      {isPaused && (
        <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
          <div className="text-white text-2xl font-bold animate-pulse">
            게임 일시정지
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;