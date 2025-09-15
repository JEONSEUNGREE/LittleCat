import { Star, Lock, Play } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

interface LevelSelectorProps {
  onSelectLevel: (levelId: number) => void;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({ onSelectLevel }) => {
  const { levels, totalScore } = useGameStore();

  const isLevelUnlocked = (levelId: number) => {
    // First level is always unlocked
    if (levelId === 1) return true;
    // Other levels unlock based on score
    return totalScore >= (levelId - 1) * 100;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 text-light-warm animate-float">
          Shadow Puzzle
        </h1>
        <p className="text-light/70 text-center mb-8">그림자 퍼즐 탈출</p>
        
        <div className="bg-shadow-dark/50 backdrop-blur-sm rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-light">레벨 선택</h2>
            <div className="flex items-center gap-2">
              <Star className="text-yellow-400" size={20} />
              <span className="text-light font-medium">{totalScore}</span>
            </div>
          </div>

          <div className="grid gap-4">
            {levels.map((level) => {
              const unlocked = isLevelUnlocked(level.id);
              
              return (
                <button
                  key={level.id}
                  onClick={() => unlocked && onSelectLevel(level.id)}
                  disabled={!unlocked}
                  className={`relative p-4 rounded-xl transition-all duration-300 ${
                    unlocked
                      ? 'bg-gradient-to-r from-shadow to-shadow-light hover:from-shadow-light hover:to-shadow hover:scale-[1.02] cursor-pointer'
                      : 'bg-gray-800/50 cursor-not-allowed opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        unlocked ? 'bg-light-warm/20' : 'bg-gray-700/50'
                      }`}>
                        {unlocked ? (
                          <Play className="text-light-bright" size={20} />
                        ) : (
                          <Lock className="text-gray-500" size={20} />
                        )}
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-light">
                          레벨 {level.id}
                        </h3>
                        <p className="text-sm text-light/60">{level.name}</p>
                      </div>
                    </div>

                    <div className="flex gap-1">
                      {[1, 2, 3].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={`${
                            star <= 0 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-shadow/30 rounded-lg">
            <p className="text-sm text-light/70 text-center">
              빛과 그림자를 조작하여 목표 모양을 만드세요
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelSelector;