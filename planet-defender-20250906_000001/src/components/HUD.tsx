
import { useGameStore } from '../store/gameStore';
import { Heart, Coins, Trophy, Shield, Pause, Play, RotateCcw } from 'lucide-react';

export const HUD: React.FC = () => {
  const { 
    score, 
    health, 
    money, 
    wave, 
    gameStatus,
    pauseGame,
    resumeGame,
    reset,
    startGame
  } = useGameStore();

  const handlePauseResume = () => {
    if (gameStatus === 'playing') {
      pauseGame();
    } else if (gameStatus === 'paused') {
      resumeGame();
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 p-4 z-10">
      <div className="flex justify-between items-start">
        {/* Left side - Stats */}
        <div className="bg-black/50 backdrop-blur rounded-lg p-3 space-y-2">
          <div className="flex items-center gap-2 text-white">
            <Heart className="w-5 h-5 text-red-500" />
            <span className="font-bold">{health}</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <Coins className="w-5 h-5 text-yellow-500" />
            <span className="font-bold">{money}</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <Trophy className="w-5 h-5 text-purple-500" />
            <span className="font-bold">{score}</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <Shield className="w-5 h-5 text-cyan-500" />
            <span className="font-bold">Wave {wave}</span>
          </div>
        </div>

        {/* Right side - Controls */}
        <div className="flex gap-2">
          {gameStatus === 'playing' || gameStatus === 'paused' ? (
            <>
              <button
                onClick={handlePauseResume}
                className="bg-black/50 backdrop-blur rounded-lg p-3 text-white hover:bg-black/70 transition-colors"
              >
                {gameStatus === 'playing' ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>
              <button
                onClick={reset}
                className="bg-black/50 backdrop-blur rounded-lg p-3 text-white hover:bg-black/70 transition-colors"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            </>
          ) : null}
        </div>
      </div>

      {/* Tower placement hint */}
      {gameStatus === 'playing' && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur rounded-lg px-4 py-2">
          <p className="text-white text-sm">
            Tap around the planet to place towers (Cost: 100 coins)
          </p>
        </div>
      )}
    </div>
  );
};