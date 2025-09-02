import React, { useEffect, useState } from 'react';
import { Pause, Eye, Star, Clock } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const GameHUD: React.FC = () => {
  const { score, player, currentLevel, levels, pauseGame, gameState } = useGameStore();
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (gameState === 'playing') {
      const interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameState]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const level = levels[currentLevel];
  const collectedLights = level.lightSources.filter(l => l.collected).length;
  const totalLights = level.lightSources.length;

  return (
    <div className="absolute top-0 left-0 right-0 p-4 z-10">
      <div className="max-w-4xl mx-auto flex justify-between items-start">
        <div className="bg-gray-900 bg-opacity-90 rounded-lg p-3 space-y-2">
          <div className="flex items-center gap-2 text-yellow-400">
            <Star className="w-5 h-5" />
            <span className="font-semibold">{score}</span>
          </div>
          <div className="flex items-center gap-2 text-blue-400">
            <Clock className="w-5 h-5" />
            <span>{formatTime(time)}</span>
          </div>
        </div>

        <div className="bg-gray-900 bg-opacity-90 rounded-lg p-3 text-center">
          <h2 className="text-lg font-bold text-white mb-1">Level {currentLevel + 1}</h2>
          <p className="text-sm text-gray-400">{level.name}</p>
        </div>

        <div className="bg-gray-900 bg-opacity-90 rounded-lg p-3 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400">
            <Eye className="w-5 h-5" />
            <span>시야: {player.lightRadius}</span>
          </div>
          <div className="text-sm text-gray-400">
            빛: {collectedLights}/{totalLights}
          </div>
        </div>

        <button
          onClick={pauseGame}
          className="bg-gray-900 bg-opacity-90 rounded-lg p-3 hover:bg-opacity-100 transition-all"
        >
          <Pause className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};