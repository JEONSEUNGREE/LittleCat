
import { CheckCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const LevelComplete: React.FC = () => {
  const { score, currentLevel, levels, nextLevel, resetGame } = useGameStore();
  const level = levels[currentLevel];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-green-900 to-black p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <CheckCircle className="w-24 h-24 text-green-400 mx-auto mb-4 animate-pulse" />
          <h2 className="text-4xl font-bold text-white mb-2">레벨 완료!</h2>
          <p className="text-xl text-green-300">{level.name} 클리어</p>
        </div>

        <div className="bg-gray-800 bg-opacity-70 rounded-lg p-6 mb-6">
          <div className="space-y-3">
            <div className="flex justify-between text-gray-300">
              <span>현재 점수</span>
              <span className="font-bold text-yellow-400">{score}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>수집한 빛</span>
              <span className="font-bold text-cyan-400">
                {level.lightSources.filter(l => l.collected).length}/{level.lightSources.length}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={nextLevel}
            className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
          >
            <ArrowRight className="w-6 h-6" />
            다음 레벨
          </button>

          <button
            onClick={resetGame}
            className="w-full py-3 px-6 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-3"
          >
            <RotateCcw className="w-5 h-5" />
            메뉴로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};