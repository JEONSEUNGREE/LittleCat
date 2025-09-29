
import { useGameStore } from '../store/gameStore';
import { levels } from '../data/levels';
import { Zap, Target, Square } from 'lucide-react';
import LaserBeamRenderer from './LaserBeamRenderer';

const GameGrid: React.FC = () => {
  const { 
    currentLevel, 
    placedTools, 
    selectedTool, 
    placeTool, 
    rotateTool,
    beams
  } = useGameStore();
  
  const level = levels.find(l => l.id === currentLevel);
  
  if (!level) return null;
  
  const handleCellClick = (x: number, y: number) => {
    const cell = level.grid[y][x];
    
    // 빈 셀에만 도구 배치 가능
    if (cell.type === 'empty') {
      // 이미 도구가 있으면 회전
      const existingTool = placedTools.find(
        t => t.position.x === x && t.position.y === y
      );
      
      if (existingTool) {
        rotateTool({ x, y });
      } else if (selectedTool) {
        placeTool({ x, y });
      }
    }
  };
  
  const getCellContent = (x: number, y: number) => {
    const cell = level.grid[y][x];
    const placedTool = placedTools.find(
      t => t.position.x === x && t.position.y === y
    );
    
    if (placedTool) {
      return (
        <div 
          className={`
            absolute inset-1 rounded
            ${placedTool.type === 'mirror' ? 'mirror-surface' : 'prism-glass'}
            cursor-pointer transition-transform hover:scale-110
          `}
          style={{ transform: `rotate(${placedTool.rotation}deg)` }}
        />
      );
    }
    
    switch (cell.type) {
      case 'laser':
        return (
          <Zap 
            className={`
              w-6 h-6 animate-pulse-slow
              ${cell.color === 'red' ? 'text-laser-red' : ''}
              ${cell.color === 'blue' ? 'text-laser-blue' : ''}
              ${cell.color === 'green' ? 'text-laser-green' : ''}
              ${cell.color === 'yellow' ? 'text-laser-yellow' : ''}
            `}
          />
        );
      case 'target':
        return (
          <Target 
            className={`
              w-6 h-6 target-glow
              ${cell.color === 'red' ? 'text-laser-red' : ''}
              ${cell.color === 'blue' ? 'text-laser-blue' : ''}
              ${cell.color === 'green' ? 'text-laser-green' : ''}
              ${cell.color === 'yellow' ? 'text-laser-yellow' : ''}
            `}
          />
        );
      case 'obstacle':
        return (
          <Square className="w-6 h-6 text-gray-600 fill-gray-800" />
        );
      default:
        return null;
    }
  };
  
  const gridSizeClass = level.gridSize <= 5 ? 'w-16 h-16' : 
                        level.gridSize <= 7 ? 'w-12 h-12 sm:w-14 sm:h-14' : 
                        'w-10 h-10 sm:w-12 sm:h-12';
  
  return (
    <div className="relative">
      {/* 레이저 빔 렌더링 */}
      <LaserBeamRenderer beams={beams} gridSize={level.gridSize} />
      
      {/* 게임 그리드 */}
      <div 
        className="relative grid gap-0.5 p-4 bg-black/30 rounded-lg backdrop-blur-sm"
        style={{
          gridTemplateColumns: `repeat(${level.gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${level.gridSize}, 1fr)`
        }}
      >
        {level.grid.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`
                ${gridSizeClass}
                grid-cell
                flex items-center justify-center
                cursor-pointer hover:bg-white/5
                transition-colors duration-200
              `}
              onClick={() => handleCellClick(x, y)}
            >
              {getCellContent(x, y)}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GameGrid;