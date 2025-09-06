import React, { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { Trophy, RotateCcw, Home, Star } from 'lucide-react';

export const GameOver: React.FC = () => {
  const { score, stage, player, resetGame, initGame, gameStatus } = useGameStore();
  const isVictory = gameStatus === 'victory';

  useEffect(() => {
    const highScore = parseInt(localStorage.getItem('wordMatchQuestHighScore') || '0');
    if (score > highScore) {
      localStorage.setItem('wordMatchQuestHighScore', score.toString());
    }
  }, [score]);

  const highScore = parseInt(localStorage.getItem('wordMatchQuestHighScore') || '0');
  const isNewHighScore = score === highScore && score > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full animate-fade-in">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">
            {isVictory ? '🎉' : '💀'}
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            {isVictory ? '승리!' : '게임 오버'}
          </h1>
          {isVictory && (
            <p className="text-green-600 dark:text-green-400 font-semibold">
              모든 스테이지를 클리어했습니다!
            </p>
          )}
        </div>

        <div className="space-y-3 mb-6">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">최종 점수</span>
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {score}
              </span>
            </div>
            {isNewHighScore && (
              <div className="text-yellow-600 dark:text-yellow-400 text-sm mt-2 font-semibold animate-pulse">
                🎊 신기록 달성! 🎊
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Star className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">스테이지</span>
              </div>
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {stage}
              </span>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Trophy className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">레벨</span>
              </div>
              <span className="text-xl font-bold text-green-600 dark:text-green-400">
                {player.level}
              </span>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">최고 기록</span>
              <span className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                {highScore}
              </span>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">찾은 단어</span>
              <span className="font-bold text-gray-800 dark:text-gray-200">
                {player.wordsFound.length}개
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={initGame}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>다시 시작</span>
          </button>

          <button
            onClick={resetGame}
            className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>메인 메뉴</span>
          </button>
        </div>
      </div>
    </div>
  );
};