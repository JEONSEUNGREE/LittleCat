import { useEffect, useCallback } from 'react';
import { useGameStore } from '../store/gameStore';
import { Sparkles } from 'lucide-react';

export const GameBoard: React.FC = () => {
  const { player, levels, currentLevel, gameState, movePlayer } = useGameStore();
  const level = levels[currentLevel];

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (gameState !== 'playing') return;
    
    switch(e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        movePlayer('up');
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        movePlayer('down');
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        movePlayer('left');
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        movePlayer('right');
        break;
    }
  }, [gameState, movePlayer]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const isVisible = (x: number, y: number) => {
    const dx = Math.abs(x - player.position.x);
    const dy = Math.abs(y - player.position.y);
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= player.lightRadius;
  };

  const getCellOpacity = (x: number, y: number) => {
    const dx = Math.abs(x - player.position.x);
    const dy = Math.abs(y - player.position.y);
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance <= player.lightRadius) {
      return 1 - (distance / player.lightRadius) * 0.7;
    }
    return 0;
  };

  const isWall = (x: number, y: number) => {
    return level.walls.some(wall => 
      x >= wall.x && 
      x < wall.x + wall.width && 
      y >= wall.y && 
      y < wall.y + wall.height
    );
  };

  const getLight = (x: number, y: number) => {
    return level.lightSources.find(
      light => !light.collected && light.position.x === x && light.position.y === y
    );
  };

  const cellSize = `${100 / level.gridSize}%`;

  return (
    <div className="relative w-full h-full max-w-2xl max-h-screen mx-auto p-4">
      <div className="aspect-square w-full bg-black rounded-lg overflow-hidden shadow-2xl relative">
        {/* Grid */}
        <div 
          className="grid h-full w-full"
          style={{
            gridTemplateColumns: `repeat(${level.gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${level.gridSize}, 1fr)`
          }}
        >
          {Array.from({ length: level.gridSize * level.gridSize }).map((_, index) => {
            const x = index % level.gridSize;
            const y = Math.floor(index / level.gridSize);
            const visible = isVisible(x, y);
            const opacity = getCellOpacity(x, y);
            const wall = isWall(x, y);
            const light = getLight(x, y);
            const isPlayer = x === player.position.x && y === player.position.y;
            const isExit = x === level.exitPosition.x && y === level.exitPosition.y;

            return (
              <div
                key={index}
                className={`relative border border-gray-900 transition-all duration-300`}
                style={{
                  opacity: opacity,
                  backgroundColor: wall ? '#0f0f1e' : 'transparent',
                  boxShadow: wall && visible ? 'inset 0 0 10px rgba(0,0,0,0.8)' : 'none'
                }}
              >
                {isPlayer && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 bg-yellow-400 rounded-full animate-pulse-slow player-light" />
                  </div>
                )}
                
                {light && visible && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-1/2 h-1/2 text-cyan-400 animate-pulse" />
                  </div>
                )}
                
                {isExit && visible && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 bg-green-500 rounded animate-glow" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Light overlay for player */}
        <div 
          className="absolute pointer-events-none"
          style={{
            left: `${(player.position.x / level.gridSize) * 100}%`,
            top: `${(player.position.y / level.gridSize) * 100}%`,
            width: `${(player.lightRadius * 2 + 1) * (100 / level.gridSize)}%`,
            height: `${(player.lightRadius * 2 + 1) * (100 / level.gridSize)}%`,
            transform: 'translate(-50%, -50%)',
            marginLeft: `${50 / level.gridSize}%`,
            marginTop: `${50 / level.gridSize}%`,
          }}
        >
          <div className="w-full h-full rounded-full player-light opacity-30" />
        </div>
      </div>
    </div>
  );
};