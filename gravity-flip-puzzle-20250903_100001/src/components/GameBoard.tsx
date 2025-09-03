import React from 'react';
import { useGameStore } from '../store/gameStore';
import { GameObject } from '../types';
import { Target, Box, User, Square, AlertTriangle } from 'lucide-react';

interface GameBoardProps {
  gridSize?: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ gridSize = 8 }) => {
  const { objects, gravity } = useGameStore();

  const renderObject = (obj: GameObject) => {
    const baseClasses = 'absolute transition-all duration-500 ease-in-out flex items-center justify-center';
    const size = `${100 / gridSize}%`;
    const style = {
      width: size,
      height: size,
      left: `${(obj.position.x * 100) / gridSize}%`,
      top: `${(obj.position.y * 100) / gridSize}%`,
      transform: `rotate(${
        gravity === 'up' ? '180deg' : 
        gravity === 'left' ? '90deg' : 
        gravity === 'right' ? '-90deg' : 
        '0deg'
      })`,
    };

    switch (obj.type) {
      case 'player':
        return (
          <div key={obj.id} className={`${baseClasses} z-20`} style={style}>
            <div className="w-4/5 h-4/5 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg flex items-center justify-center animate-pulse-slow">
              <User className="w-1/2 h-1/2 text-white" />
            </div>
          </div>
        );
      case 'box':
        return (
          <div key={obj.id} className={`${baseClasses} z-10`} style={style}>
            <div 
              className="w-3/4 h-3/4 rounded-lg shadow-md flex items-center justify-center"
              style={{ backgroundColor: obj.color || '#f59e0b' }}
            >
              <Box className="w-1/2 h-1/2 text-white opacity-70" />
            </div>
          </div>
        );
      case 'goal':
        return (
          <div key={obj.id} className={`${baseClasses} z-5`} style={style}>
            <div className="w-4/5 h-4/5 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-inner flex items-center justify-center animate-float">
              <Target className="w-1/2 h-1/2 text-white" />
            </div>
          </div>
        );
      case 'wall':
        return (
          <div key={obj.id} className={`${baseClasses} z-15`} style={style}>
            <div className="w-full h-full bg-gradient-to-b from-gray-600 to-gray-800 rounded shadow-md flex items-center justify-center">
              <Square className="w-1/2 h-1/2 text-gray-400 opacity-50" />
            </div>
          </div>
        );
      case 'spike':
        return (
          <div key={obj.id} className={`${baseClasses} z-15`} style={style}>
            <div className="w-full h-full bg-gradient-to-b from-red-600 to-red-800 rounded flex items-center justify-center animate-pulse">
              <AlertTriangle className="w-1/2 h-1/2 text-white" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-full max-w-lg max-h-lg mx-auto bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl shadow-2xl backdrop-blur-sm">
      {/* Grid lines */}
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
        {Array.from({ length: gridSize * gridSize }).map((_, index) => (
          <div
            key={index}
            className="border border-white/10 hover:bg-white/5 transition-colors"
          />
        ))}
      </div>
      
      {/* Game objects */}
      {objects.map(renderObject)}
    </div>
  );
}

export default GameBoard;