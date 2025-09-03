
import { useGameStore } from '../store/gameStore';
import { levels } from '../data/levels';
import { Star, ChevronLeft, ChevronRight, Trophy, Target } from 'lucide-react';

const LevelInfo: React.FC = () => {
  const { 
    currentLevel, 
    moves, 
    stars, 
    isWon,
    nextLevel,
    previousLevel,
    completedLevels
  } = useGameStore();

  const level = levels.find(l => l.id === currentLevel);
  const currentLevelIndex = levels.findIndex(l => l.id === currentLevel);
  const isFirstLevel = currentLevelIndex === 0;
  const isLastLevel = currentLevelIndex === levels.length - 1;

  if (!level) return null;

  const renderStars = () => {
    const earnedStars = isWon ? stars : 0;
    const maxStars = 3;
    
    return (
      <div className="flex gap-1">
        {Array.from({ length: maxStars }).map((_, index) => (
          <Star
            key={index}
            className={`w-5 h-5 transition-all duration-300 ${
              index < earnedStars
                ? 'text-yellow-400 fill-yellow-400 animate-pulse'
                : 'text-gray-500/50'
            }`}
          />
        ))}
      </div>
    );
  };

  const getMovesColor = () => {
    if (moves <= level.stars.three) return 'text-green-400';
    if (moves <= level.stars.two) return 'text-yellow-400';
    if (moves <= level.stars.one) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={previousLevel}
          disabled={isFirstLevel}
          className={`p-2 rounded-lg transition-all duration-200 ${
            isFirstLevel
              ? 'bg-gray-500/20 text-gray-500/50 cursor-not-allowed'
              : 'bg-white/20 hover:bg-white/30 text-white transform active:scale-95'
          }`}
          aria-label="Previous Level"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-1">
            Level {level.id}: {level.name}
          </h2>
          {renderStars()}
        </div>
        
        <button
          onClick={nextLevel}
          disabled={isLastLevel || (!isWon && !completedLevels.has(currentLevel))}
          className={`p-2 rounded-lg transition-all duration-200 ${
            isLastLevel || (!isWon && !completedLevels.has(currentLevel))
              ? 'bg-gray-500/20 text-gray-500/50 cursor-not-allowed'
              : 'bg-white/20 hover:bg-white/30 text-white transform active:scale-95'
          }`}
          aria-label="Next Level"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-white/10 rounded-lg p-2">
          <div className="flex items-center gap-1 text-white/70 mb-1">
            <Target className="w-4 h-4" />
            <span>Moves</span>
          </div>
          <div className={`text-lg font-bold ${getMovesColor()}`}>
            {moves} / {level.maxMoves}
          </div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-2">
          <div className="flex items-center gap-1 text-white/70 mb-1">
            <Trophy className="w-4 h-4" />
            <span>Progress</span>
          </div>
          <div className="text-lg font-bold text-white">
            {completedLevels.size} / {levels.length}
          </div>
        </div>
      </div>

      {isWon && (
        <div className="mt-3 p-3 bg-gradient-to-r from-green-500/30 to-green-600/30 rounded-lg animate-pulse">
          <div className="text-center text-white font-bold">
            Level Complete! 🎉
          </div>
          <div className="text-center text-white/80 text-sm mt-1">
            You earned {stars} star{stars !== 1 ? 's' : ''}!
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelInfo;