
import { Play, Home, RotateCcw } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const PauseMenu: React.FC = () => {
  const { resumeGame, resetGame, startGame } = useGameStore();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="max-w-sm w-full bg-gray-900 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-8">일시정지</h2>

        <div className="space-y-4">
          <button
            onClick={resumeGame}
            className="w-full py-3 px-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Play className="w-5 h-5" />
            계속하기
          </button>

          <button
            onClick={() => {
              resetGame();
              startGame();
            }}
            className="w-full py-3 px-6 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-3"
          >
            <RotateCcw className="w-5 h-5" />
            다시 시작
          </button>

          <button
            onClick={resetGame}
            className="w-full py-3 px-6 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Home className="w-5 h-5" />
            메인 메뉴
          </button>
        </div>
      </div>
    </div>
  );
};