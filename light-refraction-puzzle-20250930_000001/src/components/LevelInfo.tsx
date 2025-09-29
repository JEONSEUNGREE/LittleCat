import React from 'react';
import { useGameStore } from '../store/gameStore';
import { levels } from '../data/levels';
import { Star, Target, Zap } from 'lucide-react';

const LevelInfo: React.FC = () => {
  const { currentLevel, moves, score, completedLevels } = useGameStore();
  const level = levels.find(l => l.id === currentLevel);
  
  if (!level) return null;
  
  const isCompleted = completedLevels.has(currentLevel);
  const stars = isCompleted ? 
    (moves <= level.minMoves! ? 3 : moves <= level.minMoves! + 2 ? 2 : 1) : 0;
  
  return (
    <div className="w-full max-w-2xl bg-black/30 backdrop-blur-sm rounded-lg p-4 mb-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* 레벨 정보 */}
        <div>
          <h2 className="text-xl font-bold mb-1">
            레벨 {level.id}: {level.name}
          </h2>
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-1">
              <Target className="w-4 h-4" />
              목표: {level.minMoves}수
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4" />
              현재: {moves}수
            </span>
          </div>
        </div>
        
        {/* 스코어 및 별 */}
        <div className="flex flex-col items-end gap-2">
          <div className="text-lg font-semibold">
            점수: {score}
          </div>
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <Star
                key={i}
                className={`w-5 h-5 transition-all duration-300 ${
                  i <= stars 
                    ? 'text-yellow-400 fill-yellow-400 scale-110' 
                    : 'text-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* 진행 상태 바 */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>진행률</span>
          <span>{completedLevels.size} / {levels.length} 레벨 완료</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-laser-blue to-laser-green transition-all duration-500"
            style={{ width: `${(completedLevels.size / levels.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default LevelInfo;