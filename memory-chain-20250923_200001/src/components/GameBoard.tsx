import { useEffect, useState } from 'react';
import useGameStore from '../store/gameStore';
import type { PatternItem } from '../store/gameStore';

const GameBoard = () => {
  const {
    pattern,
    userPattern,
    gameStatus,
    isShowingPattern,
    addUserInput,
    resetUserPattern,
    setGameStatus,
    setIsShowingPattern,
  } = useGameStore();
  
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [showingIndex, setShowingIndex] = useState(0);
  
  const COLORS = [
    { color: '#ef4444', name: 'red' },
    { color: '#3b82f6', name: 'blue' },
    { color: '#10b981', name: 'green' },
    { color: '#f59e0b', name: 'yellow' },
    { color: '#8b5cf6', name: 'purple' },
    { color: '#ec4899', name: 'pink' },
  ];
  
  // Show pattern to player
  useEffect(() => {
    if (isShowingPattern && pattern.length > 0) {
      setShowingIndex(0);
      resetUserPattern();
      
      const showPattern = async () => {
        for (let i = 0; i < pattern.length; i++) {
          setShowingIndex(i);
          setActiveColor(pattern[i].color);
          await new Promise(resolve => setTimeout(resolve, 600));
          setActiveColor(null);
          await new Promise(resolve => setTimeout(resolve, 300));
        }
        setIsShowingPattern(false);
        setGameStatus('playing');
      };
      
      showPattern();
    }
  }, [isShowingPattern, pattern, resetUserPattern, setGameStatus, setIsShowingPattern]);
  
  const handleColorClick = (color: string) => {
    if (gameStatus !== 'playing' || isShowingPattern) return;
    
    // Visual feedback
    setActiveColor(color);
    setTimeout(() => setActiveColor(null), 200);
    
    // Add to user pattern
    const item: PatternItem = {
      id: Date.now(),
      color,
    };
    
    addUserInput(item);
  };
  
  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
        {COLORS.map(({ color, name }) => (
          <button
            key={color}
            onClick={() => handleColorClick(color)}
            disabled={gameStatus !== 'playing' || isShowingPattern}
            className={`
              aspect-square rounded-2xl transition-all duration-200 transform
              ${activeColor === color ? 'scale-95 brightness-125 shadow-2xl' : 'scale-100'}
              ${gameStatus === 'playing' && !isShowingPattern ? 'cursor-pointer hover:scale-105 active:scale-95' : 'cursor-not-allowed'}
              ${gameStatus === 'success' && userPattern.some(p => p.color === color) ? 'animate-pulse' : ''}
              ${gameStatus === 'failed' && userPattern.some(p => p.color === color) ? 'animate-shake opacity-50' : ''}
              shadow-lg backdrop-blur-sm
            `}
            style={{
              backgroundColor: color,
              boxShadow: activeColor === color ? `0 0 40px ${color}` : `0 10px 25px ${color}40`,
            }}
            aria-label={`${name} color button`}
          >
            <span className="sr-only">{name}</span>
          </button>
        ))}
      </div>
      
      {isShowingPattern && (
        <div className="mt-8 text-center">
          <p className="text-white text-lg font-semibold animate-pulse">
            Watch the pattern... ({showingIndex + 1}/{pattern.length})
          </p>
        </div>
      )}
      
      {gameStatus === 'playing' && !isShowingPattern && (
        <div className="mt-8 text-center">
          <p className="text-white text-lg font-semibold">
            Your turn! ({userPattern.length}/{pattern.length})
          </p>
        </div>
      )}
      
      {gameStatus === 'success' && (
        <div className="mt-8 text-center">
          <p className="text-green-300 text-xl font-bold animate-bounce">
            Perfect! Get ready...
          </p>
        </div>
      )}
      
      {gameStatus === 'failed' && (
        <div className="mt-8 text-center">
          <p className="text-red-300 text-xl font-bold">
            Game Over!
          </p>
        </div>
      )}
    </div>
  );
};

export default GameBoard;