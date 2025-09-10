
import { Heart, Coins, Trophy, Shield, Pause, Play, RotateCcw } from 'lucide-react';
import useGameStore from '../store/gameStore';

const HUD: React.FC = () => {
  const {
    score,
    credits,
    wave,
    health,
    maxHealth,
    gameStatus,
    pauseGame,
    resumeGame,
    startGame
  } = useGameStore();

  const healthPercentage = (health / maxHealth) * 100;

  const handlePauseResume = () => {
    if (gameStatus === 'playing') {
      pauseGame();
    } else if (gameStatus === 'paused') {
      resumeGame();
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 p-4 z-10">
      <div className="max-w-[600px] mx-auto">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-neon-blue/30">
          <div className="flex items-center justify-between gap-2">
            {/* Health */}
            <div className="flex items-center gap-2 flex-1">
              <Heart className="w-5 h-5 text-red-500" />
              <div className="flex-1 bg-gray-800 rounded-full h-3 overflow-hidden max-w-[100px]">
                <div
                  className={`h-full transition-all duration-300 ${
                    healthPercentage > 50 ? 'bg-green-500' :
                    healthPercentage > 25 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${healthPercentage}%` }}
                />
              </div>
              <span className="text-xs text-white">{health}/{maxHealth}</span>
            </div>

            {/* Credits */}
            <div className="flex items-center gap-1">
              <Coins className="w-5 h-5 text-yellow-500" />
              <span className="text-white font-bold">${credits}</span>
            </div>

            {/* Score */}
            <div className="flex items-center gap-1">
              <Trophy className="w-5 h-5 text-purple-500" />
              <span className="text-white font-bold">{score}</span>
            </div>

            {/* Wave */}
            <div className="flex items-center gap-1">
              <Shield className="w-5 h-5 text-neon-blue" />
              <span className="text-white font-bold">Wave {wave}</span>
            </div>

            {/* Controls */}
            <div className="flex gap-2">
              {gameStatus === 'playing' || gameStatus === 'paused' ? (
                <button
                  onClick={handlePauseResume}
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  {gameStatus === 'playing' ? (
                    <Pause className="w-4 h-4 text-white" />
                  ) : (
                    <Play className="w-4 h-4 text-white" />
                  )}
                </button>
              ) : null}
              
              {gameStatus === 'gameOver' && (
                <button
                  onClick={startGame}
                  className="px-3 py-2 bg-neon-green text-black rounded-lg hover:bg-green-400 transition-colors flex items-center gap-2 font-bold"
                >
                  <RotateCcw className="w-4 h-4" />
                  Restart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HUD;