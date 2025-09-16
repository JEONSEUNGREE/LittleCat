import { useRef, useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Position } from '../types/game';
import { Zap, Rocket, CircleDot } from 'lucide-react';

export const GameBoard: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [gridSize] = useState({ width: 10, height: 8 });
  const [cellSize, setCellSize] = useState(40);
  
  const { 
    towers, 
    enemies, 
    selectedTowerType, 
    placeTower,
    selectTower,
    selectedTower,
    isPlaying,
    isPaused,
  } = useGameStore();
  
  useEffect(() => {
    const updateCellSize = () => {
      if (canvasRef.current) {
        const width = canvasRef.current.clientWidth;
        const newCellSize = Math.floor(width / gridSize.width);
        setCellSize(newCellSize);
      }
    };
    
    updateCellSize();
    window.addEventListener('resize', updateCellSize);
    return () => window.removeEventListener('resize', updateCellSize);
  }, [gridSize.width]);
  
  const handleCellClick = (x: number, y: number) => {
    if (!isPlaying || isPaused) return;
    
    const position: Position = { x: x * cellSize + cellSize / 2, y: y * cellSize + cellSize / 2 };
    
    // Check if there's already a tower at this position
    const existingTower = towers.find(t => 
      Math.abs(t.position.x - position.x) < cellSize / 2 &&
      Math.abs(t.position.y - position.y) < cellSize / 2
    );
    
    if (existingTower) {
      selectTower(existingTower);
    } else if (selectedTowerType) {
      placeTower(position);
    }
  };
  
  const getTowerIcon = (type: string) => {
    switch (type) {
      case 'laser': return <Zap className="w-6 h-6" />;
      case 'missile': return <Rocket className="w-6 h-6" />;
      case 'plasma': return <CircleDot className="w-6 h-6" />;
      default: return null;
    }
  };
  
  const getEnemyColor = (type: string) => {
    switch (type) {
      case 'asteroid': return 'bg-gray-500';
      case 'alien': return 'bg-green-500';
      case 'meteor': return 'bg-orange-500';
      default: return 'bg-red-500';
    }
  };
  
  // Generate path points
  const pathPoints = [
    { x: 0, y: 4 },
    { x: 2, y: 4 },
    { x: 2, y: 2 },
    { x: 5, y: 2 },
    { x: 5, y: 6 },
    { x: 8, y: 6 },
    { x: 8, y: 4 },
    { x: 10, y: 4 },
  ];
  
  return (
    <div className="relative w-full h-full bg-space-dark rounded-lg overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse-slow"
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
            }}
          />
        ))}
      </div>
      
      {/* Game grid */}
      <div 
        ref={canvasRef}
        className="relative w-full h-full grid grid-cols-10 gap-0"
        style={{
          gridTemplateColumns: `repeat(${gridSize.width}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${gridSize.height}, ${cellSize}px)`,
        }}
      >
        {/* Path visualization */}
        <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
          <path
            d={`M ${pathPoints.map(p => `${p.x * cellSize},${p.y * cellSize}`).join(' L ')}`}
            stroke="rgba(59, 130, 246, 0.3)"
            strokeWidth="40"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        
        {/* Grid cells */}
        {[...Array(gridSize.height)].map((_, y) => 
          [...Array(gridSize.width)].map((_, x) => (
            <div
              key={`${x}-${y}`}
              className="border border-gray-800 border-opacity-20 hover:bg-white hover:bg-opacity-10 cursor-pointer transition-colors"
              style={{ width: cellSize, height: cellSize }}
              onClick={() => handleCellClick(x, y)}
            />
          ))
        )}
        
        {/* Towers */}
        {towers.map(tower => (
          <div
            key={tower.id}
            className={`absolute flex items-center justify-center transition-all ${
              selectedTower?.id === tower.id ? 'ring-2 ring-energy-yellow' : ''
            } ${
              tower.type === 'laser' ? 'text-laser-red' :
              tower.type === 'missile' ? 'text-blue-400' :
              'text-purple-400'
            }`}
            style={{
              left: tower.position.x - cellSize / 2,
              top: tower.position.y - cellSize / 2,
              width: cellSize,
              height: cellSize,
            }}
            onClick={() => selectTower(tower)}
          >
            <div className="relative">
              {getTowerIcon(tower.type)}
              {/* Level indicator */}
              <div className="absolute -top-1 -right-1 bg-energy-yellow text-space-dark text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {tower.level}
              </div>
            </div>
            
            {/* Range indicator when selected */}
            {selectedTower?.id === tower.id && (
              <div
                className="absolute border-2 border-energy-yellow border-opacity-30 rounded-full pointer-events-none"
                style={{
                  width: tower.range * 2,
                  height: tower.range * 2,
                  left: -(tower.range - cellSize / 2),
                  top: -(tower.range - cellSize / 2),
                }}
              />
            )}
          </div>
        ))}
        
        {/* Enemies */}
        {enemies.map(enemy => {
          const pathIndex = Math.min(Math.floor(enemy.pathIndex), pathPoints.length - 2);
          const nextIndex = Math.min(pathIndex + 1, pathPoints.length - 1);
          const t = enemy.pathIndex - pathIndex;
          
          const currentPoint = pathPoints[pathIndex];
          const nextPoint = pathPoints[nextIndex];
          
          const x = currentPoint.x + (nextPoint.x - currentPoint.x) * t;
          const y = currentPoint.y + (nextPoint.y - currentPoint.y) * t;
          
          return (
            <div
              key={enemy.id}
              className={`absolute rounded-full ${getEnemyColor(enemy.type)} transition-all`}
              style={{
                left: x * cellSize - 10,
                top: y * cellSize - 10,
                width: 20,
                height: 20,
              }}
            >
              {/* Health bar */}
              <div className="absolute -top-2 left-0 w-full h-1 bg-gray-700 rounded-full">
                <div 
                  className="h-full bg-green-500 rounded-full transition-all"
                  style={{ width: `${(enemy.health / enemy.maxHealth) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};