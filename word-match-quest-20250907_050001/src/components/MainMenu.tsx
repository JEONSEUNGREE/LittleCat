
import { useGameStore } from '../store/gameStore';
import { Sword, Trophy, Info, Play } from 'lucide-react';

export const MainMenu: React.FC = () => {
  const { initGame, score } = useGameStore();
  const [showRules, setShowRules] = React.useState(false);

  const highScore = parseInt(localStorage.getItem('wordMatchQuestHighScore') || '0');

  const handleStartGame = () => {
    initGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full animate-fade-in">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">⚔️</div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Word Match Quest
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            단어를 만들어 몬스터를 물리치세요!
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleStartGame}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 px-6 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Play className="w-6 h-6" />
            <span>게임 시작</span>
          </button>

          <button
            onClick={() => setShowRules(!showRules)}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Info className="w-5 h-5" />
            <span>게임 방법</span>
          </button>

          {showRules && (
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-sm text-gray-700 dark:text-gray-300 animate-slide-up">
              <h3 className="font-bold mb-2">게임 방법:</h3>
              <ul className="space-y-1 list-disc list-inside">
                <li>글자를 선택해 3글자 이상의 영단어를 만드세요</li>
                <li>완성된 단어로 몬스터를 공격합니다</li>
                <li>긴 단어일수록 더 큰 데미지!</li>
                <li>연속 공격으로 콤보를 쌓으세요</li>
                <li>10 스테이지를 모두 클리어하면 승리!</li>
              </ul>
            </div>
          )}

          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Trophy className="w-6 h-6" />
                <span className="font-semibold">최고 점수</span>
              </div>
              <span className="text-2xl font-bold">{highScore}</span>
            </div>
            {score > 0 && score !== highScore && (
              <div className="mt-2 text-sm opacity-90">
                마지막 점수: {score}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
          <p>© 2025 Word Match Quest</p>
          <p>Created with React + TypeScript</p>
        </div>
      </div>
    </div>
  );
};