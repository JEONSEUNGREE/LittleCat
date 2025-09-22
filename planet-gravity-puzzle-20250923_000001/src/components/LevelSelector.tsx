
import { Star, Lock, ChevronRight } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { levels } from '../data/levels';

interface LevelSelectorProps {
  onClose: () => void;
}

export default function LevelSelector({ onClose }: LevelSelectorProps) {
  const { initLevel, completedLevels, stars } = useGameStore();

  const handleLevelSelect = (levelId: number) => {
    initLevel(levelId);
    onClose();
  };

  const isLevelUnlocked = (levelId: number) => {
    return levelId === 1 || completedLevels.includes(levelId - 1);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-space-dark to-gray-900 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">레벨 선택</h2>
        
        <div className="grid gap-4">
          {levels.map((level) => {
            const unlocked = isLevelUnlocked(level.id);
            const completed = completedLevels.includes(level.id);
            const earnedStars = stars[level.id] || 0;

            return (
              <button
                key={level.id}
                onClick={() => unlocked && handleLevelSelect(level.id)}
                disabled={!unlocked}
                className={`p-4 rounded-xl transition-all ${
                  unlocked
                    ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 cursor-pointer'
                    : 'bg-gray-800/50 cursor-not-allowed opacity-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${
                      completed ? 'bg-green-600' : unlocked ? 'bg-blue-600' : 'bg-gray-700'
                    }`}>
                      {unlocked ? level.id : <Lock className="w-6 h-6" />}
                    </div>
                    <div className="text-left">
                      <h3 className="text-white font-bold text-lg">{level.name}</h3>
                      <p className="text-gray-400 text-sm">{level.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {completed && (
                      <div className="flex gap-1">
                        {[1, 2, 3].map((star) => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${
                              star <= earnedStars
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                    {unlocked && <ChevronRight className="w-6 h-6 text-gray-400" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          닫기
        </button>
      </div>
    </div>
  );
}