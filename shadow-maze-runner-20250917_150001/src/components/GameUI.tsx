import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Heart, Clock, Trophy, Pause, Play } from 'lucide-react';

export const GameUI: React.FC = () => {
  const { 
    score, 
    lives, 
    currentLevel, 
    timeRemaining, 
    isPaused,
    pauseGame,
    resumeGame,
    currentLevelData
  } = useGameStore();

  return (
    <div className="absolute top-0 left-0 w-full p-4 flex flex-col gap-2">
      {/* Top bar */}
      <div className="flex justify-between items-center bg-black bg-opacity-50 rounded-lg p-2 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          {/* Lives */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart
                key={i}
                size={20}
                className={i < lives ? 'text-red-500 fill-red-500' : 'text-gray-600'}
              />
            ))}
          </div>

          {/* Score */}
          <div className="flex items-center gap-2 text-white">
            <Trophy size={20} className="text-yellow-400" />
            <span className="font-bold">{score}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Timer */}
          {timeRemaining !== undefined && (
            <div className="flex items-center gap-2 text-white">
              <Clock size={20} className="text-blue-400" />
              <span className="font-bold">{timeRemaining}s</span>
            </div>
          )}

          {/* Pause button */}
          <button
            onClick={isPaused ? resumeGame : pauseGame}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            {isPaused ? (
              <Play size={20} className="text-white" />
            ) : (
              <Pause size={20} className="text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Level info */}
      <div className="flex justify-center">
        <div className="bg-black bg-opacity-50 rounded-lg px-4 py-1 backdrop-blur-sm">
          <span className="text-white text-sm font-medium">
            Level {currentLevel + 1}: {currentLevelData?.name || 'Loading...'}
          </span>
        </div>
      </div>
    </div>
  );
};