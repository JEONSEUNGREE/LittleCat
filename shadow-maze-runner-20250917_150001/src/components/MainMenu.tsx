import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Moon, Play, Info, Trophy } from 'lucide-react';

export const MainMenu: React.FC = () => {
  const { startGame, score } = useGameStore();
  const [showInstructions, setShowInstructions] = React.useState(false);
  const [highScore] = React.useState(() => {
    const saved = localStorage.getItem('shadowMazeHighScore');
    return saved ? parseInt(saved, 10) : 0;
  });

  React.useEffect(() => {
    if (score > highScore) {
      localStorage.setItem('shadowMazeHighScore', score.toString());
    }
  }, [score, highScore]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-900 via-gray-900 to-black">
      {/* Title */}
      <div className="flex flex-col items-center mb-8 animate-float">
        <Moon size={64} className="text-purple-400 mb-4 shadow-effect" />
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 text-center">
          Shadow Maze
        </h1>
        <h2 className="text-xl md:text-2xl text-purple-300 text-center">
          Runner
        </h2>
      </div>

      {/* High Score */}
      <div className="flex items-center gap-2 mb-8 bg-black bg-opacity-30 px-4 py-2 rounded-lg">
        <Trophy className="text-yellow-400" size={24} />
        <span className="text-white font-medium">High Score: {Math.max(score, highScore)}</span>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={startGame}
          className="flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg"
        >
          <Play size={24} />
          <span>Start Game</span>
        </button>

        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="flex items-center justify-center gap-3 bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg"
        >
          <Info size={24} />
          <span>How to Play</span>
        </button>
      </div>

      {/* Instructions */}
      {showInstructions && (
        <div className="mt-6 p-4 bg-black bg-opacity-50 rounded-lg max-w-md text-white">
          <h3 className="text-lg font-bold mb-3 text-purple-300">How to Play:</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-purple-400">•</span>
              <span>You are a shadow trying to escape the maze</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">•</span>
              <span>Avoid the light sources - they will hurt you!</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">•</span>
              <span>Reach the green exit to complete each level</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">•</span>
              <span>Controls: Tilt device, touch screen, or use arrow keys</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">•</span>
              <span>Complete levels quickly for bonus points!</span>
            </li>
          </ul>
        </div>
      )}

      {/* Footer */}
      <div className="absolute bottom-4 text-gray-500 text-xs">
        Shadow Maze Runner v1.0
      </div>
    </div>
  );
};