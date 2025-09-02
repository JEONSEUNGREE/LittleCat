import React from 'react';
import { Play, Info, Trophy } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const GameMenu: React.FC = () => {
  const { startGame } = useGameStore();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-pulse-slow">
            Shadow Maze
          </h1>
          <p className="text-xl text-purple-300 mb-2">빛과 그림자의 미로</p>
          <p className="text-gray-400">어둠을 밝히고 출구를 찾으세요</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={startGame}
            className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
          >
            <Play className="w-6 h-6" />
            게임 시작
          </button>

          <button
            className="w-full py-4 px-6 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Trophy className="w-6 h-6" />
            최고 점수
          </button>

          <button
            className="w-full py-4 px-6 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Info className="w-6 h-6" />
            게임 방법
          </button>
        </div>

        <div className="mt-12 p-6 bg-gray-800 bg-opacity-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-purple-300">조작법</h3>
          <div className="space-y-2 text-gray-300">
            <p>• 방향키 또는 WASD로 이동</p>
            <p>• 빛을 모아 시야를 넓히세요</p>
            <p>• 초록색 출구에 도달하면 클리어</p>
          </div>
        </div>
      </div>
    </div>
  );
};