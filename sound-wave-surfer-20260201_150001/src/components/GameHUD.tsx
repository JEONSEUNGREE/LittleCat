import { Trophy, Flame, Pause, Play, RotateCcw } from 'lucide-react';
import { useGameStore } from '../stores/gameStore';

interface GameHUDProps {
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
}

export const GameHUD = ({ onPause, onResume, onReset }: GameHUDProps) => {
  const score = useGameStore((state) => state.score);
  const highScore = useGameStore((state) => state.highScore);
  const combo = useGameStore((state) => state.combo);
  const isPaused = useGameStore((state) => state.isPaused);
  const isPlaying = useGameStore((state) => state.isPlaying);

  const formatScore = (value: number): string => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toString();
  };

  return (
    <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10">
      {/* Score section */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <span className="text-lg sm:text-xl font-bold text-white">
            {formatScore(score)}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1.5 text-sm">
          <span className="text-gray-400">Best:</span>
          <span className="text-white">{formatScore(highScore)}</span>
        </div>
      </div>

      {/* Combo section */}
      <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2">
        <Flame
          className={`w-5 h-5 transition-colors ${
            combo > 10 ? 'text-orange-500' : combo > 5 ? 'text-yellow-500' : 'text-gray-400'
          }`}
        />
        <span
          className={`text-lg font-bold transition-colors ${
            combo > 10 ? 'text-orange-400' : combo > 5 ? 'text-yellow-400' : 'text-white'
          }`}
        >
          {combo}x
        </span>
      </div>

      {/* Control buttons */}
      <div className="flex gap-2">
        {isPlaying && (
          <button
            onClick={isPaused ? onResume : onPause}
            className="w-10 h-10 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-lg hover:bg-black/60 transition-colors"
          >
            {isPaused ? (
              <Play className="w-5 h-5 text-green-400" />
            ) : (
              <Pause className="w-5 h-5 text-yellow-400" />
            )}
          </button>
        )}
        <button
          onClick={onReset}
          className="w-10 h-10 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-lg hover:bg-black/60 transition-colors"
        >
          <RotateCcw className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};
