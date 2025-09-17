import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Trophy, RotateCcw, Home } from 'lucide-react';

interface GameOverProps {
  onMainMenu: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ onMainMenu }) => {
  const { score, currentLevel, startGame } = useGameStore();
  const [highScore, setHighScore] = React.useState(() => {
    const saved = localStorage.getItem('shadowMazeHighScore');
    return saved ? parseInt(saved, 10) : 0;
  });

  React.useEffect(() => {
    if (score > highScore) {
      localStorage.setItem('shadowMazeHighScore', score.toString());
      setHighScore(score);
    }
  }, [score, highScore]);

  const isNewHighScore = score >= highScore && score > 0;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-900 to-black">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
        {currentLevel >= 5 ? 'Victory!' : 'Game Over'}
      </h1>

      {/* Score display */}
      <div className="flex flex-col items-center mb-8 space-y-4">
        <div className="flex items-center gap-3 bg-black bg-opacity-50 px-6 py-3 rounded-lg">
          <Trophy className="text-yellow-400" size={32} />
          <div className="flex flex-col">
            <span className="text-gray-400 text-sm">Final Score</span>
            <span className="text-white text-2xl font-bold">{score}</span>
          </div>
        </div>

        {isNewHighScore && (
          <div className="bg-yellow-500 bg-opacity-20 px-4 py-2 rounded-lg animate-pulse">
            <span className="text-yellow-400 font-bold">New High Score!</span>
          </div>
        )}

        <div className="text-gray-400">
          Level Reached: {currentLevel + 1}/5
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={startGame}
          className="flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg"
        >
          <RotateCcw size={24} />
          <span>Try Again</span>
        </button>

        <button
          onClick={onMainMenu}
          className="flex items-center justify-center gap-3 bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg"
        >
          <Home size={24} />
          <span>Main Menu</span>
        </button>
      </div>

      {/* Stats */}
      <div className="mt-8 text-gray-500 text-sm text-center">
        {currentLevel >= 5 ? (
          <p>Congratulations! You've mastered the shadows!</p>
        ) : (
          <p>Keep practicing to escape the maze of light!</p>
        )}
      </div>
    </div>
  );
};