import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Trophy, Heart, Timer, Zap, Star, Target } from 'lucide-react';

const Header: React.FC = () => {
  const {
    level,
    score,
    highScore,
    lives,
    timeLeft,
    combo,
    isPlaying,
    gameStatus,
  } = useGameStore();

  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-2">
          <Zap className="text-yellow-400" size={32} />
          Color Memory Chain
          <Zap className="text-yellow-400" size={32} />
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Level */}
          <div className="bg-purple-500/20 rounded-lg p-3">
            <div className="flex items-center justify-center gap-2">
              <Target className="text-purple-400" size={20} />
              <div>
                <p className="text-xs text-purple-300">Level</p>
                <p className="text-xl font-bold text-white">{level}</p>
              </div>
            </div>
          </div>

          {/* Score */}
          <div className="bg-blue-500/20 rounded-lg p-3">
            <div className="flex items-center justify-center gap-2">
              <Star className="text-blue-400" size={20} />
              <div>
                <p className="text-xs text-blue-300">Score</p>
                <p className="text-xl font-bold text-white">{score}</p>
              </div>
            </div>
          </div>

          {/* High Score */}
          <div className="bg-yellow-500/20 rounded-lg p-3">
            <div className="flex items-center justify-center gap-2">
              <Trophy className="text-yellow-400" size={20} />
              <div>
                <p className="text-xs text-yellow-300">Best</p>
                <p className="text-xl font-bold text-white">{highScore}</p>
              </div>
            </div>
          </div>

          {/* Lives */}
          <div className="bg-red-500/20 rounded-lg p-3">
            <div className="flex items-center justify-center gap-2">
              <Heart className="text-red-400" size={20} />
              <div>
                <p className="text-xs text-red-300">Lives</p>
                <div className="flex gap-1 justify-center">
                  {Array(lives)
                    .fill(0)
                    .map((_, i) => (
                      <Heart
                        key={i}
                        className="text-red-400"
                        size={16}
                        fill="currentColor"
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Timer */}
          <div className="bg-green-500/20 rounded-lg p-3">
            <div className="flex items-center justify-center gap-2">
              <Timer className="text-green-400" size={20} />
              <div>
                <p className="text-xs text-green-300">Time</p>
                <p
                  className={`text-xl font-bold ${
                    timeLeft <= 3 && gameStatus === 'playing'
                      ? 'text-red-400 animate-pulse'
                      : 'text-white'
                  }`}
                >
                  {isPlaying ? timeLeft : '--'}s
                </p>
              </div>
            </div>
          </div>

          {/* Combo */}
          <div className="bg-orange-500/20 rounded-lg p-3">
            <div className="flex items-center justify-center gap-2">
              <Zap className="text-orange-400" size={20} />
              <div>
                <p className="text-xs text-orange-300">Combo</p>
                <p className="text-xl font-bold text-white">x{combo}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;