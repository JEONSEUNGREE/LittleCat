
import { useGameStore } from '../store/gameStore';
import { Rocket, Target, RotateCcw, Play } from 'lucide-react';

export const HUD: React.FC = () => {
  const {
    level,
    score,
    jumps,
    maxJumps,
    isPlaying,
    isVictory,
    isGameOver,
    resetGame,
    nextLevel,
    setIsPlaying,
  } = useGameStore();
  
  return (
    <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10">
      {/* Left side - Level and Score */}
      <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 space-y-2">
        <div className="flex items-center gap-2 text-white">
          <Target className="w-4 h-4" />
          <span className="text-sm font-bold">Level {level}</span>
        </div>
        <div className="text-yellow-400 text-sm font-semibold">
          Score: {score}
        </div>
      </div>
      
      {/* Center - Game Status */}
      {!isPlaying && !isVictory && !isGameOver && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <button
            onClick={() => setIsPlaying(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg transition-all transform hover:scale-105 flex items-center gap-3"
          >
            <Play className="w-6 h-6" />
            Start Game
          </button>
        </div>
      )}
      
      {isVictory && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-4xl font-bold text-green-400 mb-4 animate-bounce">
            Victory! 🎉
          </h2>
          <p className="text-white mb-4">
            Completed in {jumps} jump{jumps !== 1 ? 's' : ''}
          </p>
          <button
            onClick={nextLevel}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all transform hover:scale-105"
          >
            Next Level →
          </button>
        </div>
      )}
      
      {isGameOver && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-4xl font-bold text-red-400 mb-4">
            Game Over
          </h2>
          <p className="text-white mb-4">
            {jumps >= maxJumps ? 'Out of jumps!' : 'Lost in space!'}
          </p>
          <button
            onClick={resetGame}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      )}
      
      {/* Right side - Jumps Counter */}
      <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
        <div className="flex items-center gap-2 text-white">
          <Rocket className="w-4 h-4" />
          <span className="text-sm font-bold">
            Jumps: {jumps}/{maxJumps}
          </span>
        </div>
        <div className="flex gap-1 mt-2">
          {Array.from({ length: maxJumps }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < jumps ? 'bg-red-500' : 'bg-green-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};