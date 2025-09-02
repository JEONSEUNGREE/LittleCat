import React from 'react';
import { Trophy, Home, RefreshCw } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const GameWon: React.FC = () => {
  const { score, resetGame, startGame } = useGameStore();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-900 via-orange-900 to-red-900 p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Trophy className="w-32 h-32 text-yellow-400 mx-auto mb-4 animate-bounce" />
          <h1 className="text-5xl font-bold text-white mb-2">축하합니다!</h1>
          <p className="text-2xl text-yellow-300">모든 레벨을 클리어했습니다!</p>
        </div>

        <div className="bg-gray-900 bg-opacity-70 rounded-lg p-8 mb-8">
          <div className="text-center">
            <p className="text-gray-400 mb-2">최종 점수</p>
            <p className="text-5xl font-bold text-yellow-400">{score}</p>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => {
              resetGame();
              startGame();
            }}
            className="w-full py-4 px-6 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
          >
            <RefreshCw className="w-6 h-6" />
            다시 플레이
          </button>

          <button
            onClick={resetGame}
            className="w-full py-4 px-6 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Home className="w-6 h-6" />
            메인 메뉴
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Shadow Maze Runner를 플레이해 주셔서 감사합니다!
          </p>
        </div>
      </div>
    </div>
  );
};