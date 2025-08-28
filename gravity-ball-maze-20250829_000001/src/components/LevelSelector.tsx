import { Star, Lock, Play, X } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { levels } from '../data/levels';

const LevelSelector = () => {
  const { 
    setLevel, 
    bestTimes, 
    score,
    setShowLevelSelect 
  } = useGameStore();
  
  const unlockedLevels = Math.min(
    Math.max(
      1,
      ...Object.keys(bestTimes).map(Number),
      Object.keys(bestTimes).length + 1
    ),
    levels.length
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'from-green-500 to-emerald-600';
      case 'medium': return 'from-yellow-500 to-amber-600';
      case 'hard': return 'from-orange-500 to-red-600';
      case 'expert': return 'from-purple-500 to-pink-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStars = (levelId: number) => {
    const time = bestTimes[levelId];
    if (!time) return 0;
    if (time < 10) return 3;
    if (time < 20) return 2;
    return 1;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            Select Level
          </h1>
          <div className="flex items-center justify-center gap-4 text-slate-300">
            <span>Total Score: {score}</span>
            <span>•</span>
            <span>Levels Unlocked: {unlockedLevels}/{levels.length}</span>
          </div>
          <button
            onClick={() => setShowLevelSelect(false)}
            className="absolute top-4 right-4 p-2 hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Close level selector"
          >
            <X size={24} className="text-slate-400" />
          </button>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {levels.map((level) => {
            const isUnlocked = level.id <= unlockedLevels;
            const stars = getStars(level.id);
            const bestTime = bestTimes[level.id];

            return (
              <button
                key={level.id}
                onClick={() => isUnlocked && setLevel(level.id)}
                disabled={!isUnlocked}
                className={`
                  relative overflow-hidden rounded-xl p-6 text-left transition-all
                  ${isUnlocked 
                    ? 'bg-slate-800 hover:bg-slate-700 hover:scale-105 cursor-pointer shadow-lg' 
                    : 'bg-slate-900/50 cursor-not-allowed opacity-50'
                  }
                `}
              >
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${getDifficultyColor(level.difficulty)} opacity-20 rounded-bl-full`} />
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">
                        Level {level.id}
                      </h3>
                      <p className="text-sm text-slate-400">{level.name}</p>
                    </div>
                    
                    {isUnlocked ? (
                      <div className={`px-2 py-1 rounded-lg bg-gradient-to-r ${getDifficultyColor(level.difficulty)}`}>
                        <span className="text-xs font-semibold text-white">
                          {level.difficulty.toUpperCase()}
                        </span>
                      </div>
                    ) : (
                      <Lock size={24} className="text-slate-600" />
                    )}
                  </div>

                  {isUnlocked && (
                    <>
                      <div className="flex items-center gap-1 mb-2">
                        {[1, 2, 3].map((star) => (
                          <Star
                            key={star}
                            size={16}
                            className={star <= stars ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}
                          />
                        ))}
                      </div>

                      {bestTime && (
                        <p className="text-xs text-slate-400">
                          Best Time: {bestTime.toFixed(1)}s
                        </p>
                      )}

                      <div className="absolute bottom-2 right-2">
                        <div className="w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                          <Play size={16} className="text-white ml-0.5" />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LevelSelector;