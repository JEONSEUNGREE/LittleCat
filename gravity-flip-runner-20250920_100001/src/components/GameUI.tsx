
import { Play, RotateCcw, Zap, Coins, Trophy, TrendingUp } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const GameUI: React.FC = () => {
  const {
    score,
    coins,
    distance,
    speed,
    isRunning,
    isGameOver,
    highScore,
    startGame,
    resetGame,
  } = useGameStore();

  return (
    <>
      <div className="absolute top-14 left-4 right-4 flex justify-between items-center text-white z-10">
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-lg backdrop-blur-sm">
            <TrendingUp size={20} />
            <span className="font-bold">{Math.floor(score)}</span>
          </div>
          <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-lg backdrop-blur-sm">
            <Coins size={20} className="text-yellow-400" />
            <span className="font-bold">{coins}</span>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-lg backdrop-blur-sm">
            <Zap size={20} className="text-cyan-400" />
            <span className="font-bold">{speed.toFixed(1)}x</span>
          </div>
          <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-lg backdrop-blur-sm">
            <Trophy size={20} className="text-amber-400" />
            <span className="font-bold">{highScore}</span>
          </div>
        </div>
      </div>

      {!isRunning && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="bg-black/80 backdrop-blur-md rounded-2xl p-8 text-white text-center max-w-sm mx-4">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Gravity Flip Runner
            </h1>
            
            {isGameOver && (
              <div className="mb-4">
                <p className="text-2xl font-bold mb-1">Game Over!</p>
                <p className="text-lg">Score: {Math.floor(score)}</p>
                <p className="text-sm text-gray-400">Distance: {Math.floor(distance)}m</p>
              </div>
            )}

            {!isGameOver && (
              <div className="mb-6 text-sm text-gray-300">
                <p className="mb-2">Tap to jump, Hold to flip gravity!</p>
                <p>Avoid obstacles and collect coins</p>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <button
                onClick={startGame}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-bold hover:scale-105 transition-transform active:scale-95"
              >
                <Play size={20} />
                {isGameOver ? 'Play Again' : 'Start Game'}
              </button>
              
              {isGameOver && (
                <button
                  onClick={resetGame}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-700 rounded-lg font-bold hover:scale-105 transition-transform active:scale-95"
                >
                  <RotateCcw size={20} />
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameUI;