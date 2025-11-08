import React from 'react';

import { useGameStore } from '../store/gameStore';
import { Play, RotateCcw, Settings } from 'lucide-react';

const Controls: React.FC = () => {
  const {
    isPlaying,
    startGame,
    resetGame,
    difficulty,
    setDifficulty,
    gameStatus,
  } = useGameStore();

  const handleDifficultyChange = (newDifficulty: 'easy' | 'medium' | 'hard') => {
    if (!isPlaying) {
      setDifficulty(newDifficulty);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      {/* Difficulty Selection */}
      {!isPlaying && (
        <div className="mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Settings className="text-white" size={20} />
            <span className="text-white font-semibold">Difficulty</span>
          </div>
          <div className="flex gap-2 justify-center">
            {(['easy', 'medium', 'hard'] as const).map((level) => (
              <button
                key={level}
                onClick={() => handleDifficultyChange(level)}
                className={`px-4 py-2 rounded-lg font-semibold capitalize transition-all ${
                  difficulty === level
                    ? 'bg-white text-purple-600 scale-105'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <div className="mt-3 text-center text-white/70 text-sm">
            {difficulty === 'easy' && '3 colors • 5 lives • 10s time'}
            {difficulty === 'medium' && '4 colors • 3 lives • 8s time'}
            {difficulty === 'hard' && '5 colors • 2 lives • 6s time'}
          </div>
        </div>
      )}

      {/* Game Controls */}
      <div className="flex gap-4 justify-center">
        {!isPlaying ? (
          <button
            onClick={startGame}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-lg hover:shadow-xl"
          >
            <Play size={24} />
            Start Game
          </button>
        ) : (
          <button
            onClick={resetGame}
            disabled={gameStatus === 'showing'}
            className={`flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${
              gameStatus === 'showing'
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:scale-105 hover:shadow-xl'
            }`}
          >
            <RotateCcw size={24} />
            Reset
          </button>
        )}
      </div>

      {/* Instructions */}
      {!isPlaying && (
        <div className="mt-8 bg-white/10 backdrop-blur-md rounded-xl p-4">
          <h3 className="text-white font-bold text-lg mb-3 text-center">
            How to Play
          </h3>
          <ul className="text-white/80 space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-0.5">▸</span>
              <span>Watch the color chain carefully as it appears</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-0.5">▸</span>
              <span>Repeat the exact same sequence by clicking colors</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-0.5">▸</span>
              <span>Build combos by completing chains without mistakes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-0.5">▸</span>
              <span>Chain length increases as you progress!</span>
            </li>
          </ul>
        </div>
      )}

      {/* Game Tips */}
      {isPlaying && gameStatus === 'idle' && (
        <div className="mt-6 text-center">
          <p className="text-white/90 animate-pulse">
            Get ready for the next chain...
          </p>
        </div>
      )}
    </div>
  );
};

export default Controls;