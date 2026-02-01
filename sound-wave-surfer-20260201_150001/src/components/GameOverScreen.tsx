import { Trophy, Flame, RotateCcw, Home } from 'lucide-react';
import { useGameStore } from '../stores/gameStore';

interface GameOverScreenProps {
  onRestart: () => void;
  onHome: () => void;
}

export const GameOverScreen = ({ onRestart, onHome }: GameOverScreenProps) => {
  const score = useGameStore((state) => state.score);
  const highScore = useGameStore((state) => state.highScore);
  const combo = useGameStore((state) => state.combo);
  const maxCombo = useGameStore((state) => state.maxCombo);

  const isNewHighScore = score >= highScore && score > 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-slate-900/50 to-dark-bg" />

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Game Over text */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-white">
          Game Over
        </h1>

        {isNewHighScore && (
          <div className="mb-6 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
            <span className="text-yellow-400 font-bold animate-pulse">
              New High Score!
            </span>
          </div>
        )}

        {/* Score display */}
        <div className="game-container p-6 mb-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-400 text-sm">Score</span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {score.toLocaleString()}
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Flame className="w-5 h-5 text-orange-400" />
                <span className="text-gray-400 text-sm">Max Combo</span>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {Math.max(combo, maxCombo)}x
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="text-gray-400 text-sm">Best Score</div>
            <div className="text-xl font-bold text-neon-blue">
              {highScore.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRestart}
            className="group relative px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl font-bold text-white transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
          <button
            onClick={onHome}
            className="px-6 py-3 bg-gray-800/60 backdrop-blur-sm rounded-xl font-bold text-white transition-all hover:bg-gray-700/60 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Home
          </button>
        </div>
      </div>
    </div>
  );
};
