
import { useGameStore } from '../store/gameStore';
import { Play, RefreshCw, Home, Award } from 'lucide-react';

export const GameControls: React.FC = () => {
  const {
    isPlaying,
    currentLevel,
    score,
    stars,
    attempts,
    levels,
    startGame,
    resetLevel,
    setPlaying,
  } = useGameStore();

  const level = levels[currentLevel];

  return (
    <div className="w-full max-w-md bg-slate-800 rounded-lg p-4 shadow-xl">
      {/* Level Info */}
      <div className="mb-4 text-white">
        <h2 className="text-xl font-bold mb-2">
          Level {currentLevel + 1}: {level?.name || 'Tutorial'}
        </h2>
        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-yellow-400" />
            <span>Score: {score}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">★</span>
            <span>Stars: {stars}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Attempts: {attempts}</span>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-2">
        {!isPlaying ? (
          <button
            onClick={startGame}
            className="flex-1 bg-game-primary hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Play className="w-5 h-5" />
            Start Game
          </button>
        ) : (
          <>
            <button
              onClick={resetLevel}
              className="flex-1 bg-game-accent hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Reset Level
            </button>
            <button
              onClick={() => setPlaying(false)}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Home className="w-5 h-5" />
              Main Menu
            </button>
          </>
        )}
      </div>

      {/* Instructions */}
      {!isPlaying && (
        <div className="mt-4 text-gray-300 text-sm">
          <h3 className="font-semibold mb-2">How to Play:</h3>
          <ul className="space-y-1">
            <li>• Drag on the screen to control gravity</li>
            <li>• Guide the blue ball to the green target</li>
            <li>• Avoid red obstacles</li>
            <li>• Collect yellow stars for bonus points</li>
            <li>• Purple zones pull, orange zones push</li>
          </ul>
        </div>
      )}
    </div>
  );
};