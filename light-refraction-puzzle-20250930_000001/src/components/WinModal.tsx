import React from 'react';
import { useGameStore } from '../store/gameStore';
import { levels } from '../data/levels';
import { Star, Trophy, ChevronRight, RotateCcw } from 'lucide-react';

const WinModal: React.FC = () => {
  const { currentLevel, moves, resetLevel, nextLevel } = useGameStore();
  const level = levels.find(l => l.id === currentLevel);
  
  if (!level) return null;
  
  const stars = moves <= level.minMoves! ? 3 : 
                moves <= level.minMoves! + 2 ? 2 : 1;
  const score = 100 * stars;
  const isLastLevel = currentLevel === levels.length;
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-700 rounded-xl p-6 max-w-md w-full animate-in zoom-in-95 duration-300">
        {/* 트로피 아이콘 */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Trophy className="w-20 h-20 text-yellow-400 animate-pulse-slow" />
            <div className="absolute inset-0 blur-xl bg-yellow-400/30" />
          </div>
        </div>
        
        {/* 완료 메시지 */}
        <h2 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-laser-blue via-laser-green to-laser-yellow bg-clip-text text-transparent">
          레벨 완료!
        </h2>
        <p className="text-center text-gray-300 mb-6">
          {level.name}을(를) {moves}수로 클리어했습니다!
        </p>
        
        {/* 별 평가 */}
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3].map((i) => (
            <Star
              key={i}
              className={`w-10 h-10 transition-all duration-500 ${
                i <= stars 
                  ? 'text-yellow-400 fill-yellow-400 animate-in zoom-in-50' 
                  : 'text-gray-600'
              }`}
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
        
        {/* 점수 표시 */}
        <div className="bg-black/50 rounded-lg p-3 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">획득 점수</span>
            <span className="text-xl font-bold text-yellow-400">+{score}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-400">최적 수</span>
            <span className="text-gray-300">{level.minMoves}수</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-400">사용 수</span>
            <span className={moves <= level.minMoves! ? 'text-green-400' : 'text-gray-300'}>
              {moves}수
            </span>
          </div>
        </div>
        
        {/* 액션 버튼 */}
        <div className="flex gap-2">
          <button
            onClick={resetLevel}
            className="flex-1 tool-button px-4 py-3 rounded-lg border border-gray-600 hover:border-gray-400 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>다시하기</span>
          </button>
          
          {!isLastLevel ? (
            <button
              onClick={nextLevel}
              className="flex-1 tool-button px-4 py-3 rounded-lg bg-gradient-to-r from-laser-blue to-laser-green hover:opacity-90 flex items-center justify-center gap-2"
            >
              <span>다음 레벨</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-yellow-600 to-yellow-400 hover:opacity-90 flex items-center justify-center gap-2"
            >
              <Trophy className="w-5 h-5" />
              <span>모든 레벨 완료!</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WinModal;