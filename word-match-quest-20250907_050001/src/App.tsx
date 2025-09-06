import React from 'react';
import { useGameStore } from './store/gameStore';
import { MainMenu } from './components/MainMenu';
import { BattleScreen } from './components/BattleScreen';
import { GameBoard } from './components/GameBoard';
import { GameOver } from './components/GameOver';
import { Pause, Play, RotateCcw } from 'lucide-react';

function App() {
  const { gameStatus, pauseGame, resumeGame, resetGame } = useGameStore();

  if (gameStatus === 'menu') {
    return <MainMenu />;
  }

  if (gameStatus === 'gameOver' || gameStatus === 'victory') {
    return <GameOver />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="safe-top safe-bottom">
        <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Word Match Quest
          </h1>
          <div className="flex space-x-2">
            {gameStatus === 'playing' ? (
              <button
                onClick={pauseGame}
                className="p-2 bg-yellow-500 text-white rounded-lg shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
              >
                <Pause className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={resumeGame}
                className="p-2 bg-green-500 text-white rounded-lg shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
              >
                <Play className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={resetGame}
              className="p-2 bg-red-500 text-white rounded-lg shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {gameStatus === 'paused' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center animate-slide-up">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                일시 정지
              </h2>
              <button
                onClick={resumeGame}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                계속하기
              </button>
            </div>
          </div>
        )}

        <div className="container mx-auto max-w-4xl">
          <BattleScreen />
          <GameBoard />
        </div>
      </div>
    </div>
  );
}

export default App;