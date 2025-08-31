
import { Zap, TrendingUp, Trophy } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const GameHeader: React.FC = () => {
  const { isPlaying, score, stars, currentLevel, levels } = useGameStore();
  
  const progress = ((currentLevel + 1) / levels.length) * 100;

  return (
    <div className="w-full max-w-md bg-gradient-to-r from-game-primary to-game-secondary rounded-lg p-4 shadow-xl mb-4">
      <div className="flex items-center justify-between text-white mb-3">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Zap className="w-6 h-6" />
          Gravity Ball Bounce
        </h1>
        {isPlaying && (
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span>{score}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span>{stars}</span>
            </div>
          </div>
        )}
      </div>
      
      {isPlaying && (
        <div className="relative">
          <div className="bg-white bg-opacity-20 rounded-full h-2 overflow-hidden">
            <div
              className="bg-white h-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-white opacity-75">Progress</span>
            <span className="text-xs text-white opacity-75">
              Level {currentLevel + 1} of {levels.length}
            </span>
          </div>
        </div>
      )}
      
      {!isPlaying && (
        <div className="flex items-center gap-2 text-white opacity-90 text-sm">
          <TrendingUp className="w-4 h-4" />
          <span>Master gravity physics in {levels.length} challenging levels!</span>
        </div>
      )}
    </div>
  );
};