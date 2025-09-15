import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Play, Pause, FastForward, RotateCcw } from 'lucide-react';

export const GameControls: React.FC = () => {
  const { 
    isPlaying, 
    isPaused, 
    gameSpeed,
    startGame,
    pauseGame,
    resumeGame,
    setGameSpeed,
    resetGame,
  } = useGameStore();
  
  const handleSpeedToggle = () => {
    const nextSpeed = gameSpeed === 1 ? 2 : gameSpeed === 2 ? 3 : 1;
    setGameSpeed(nextSpeed);
  };
  
  return (
    <div className="flex items-center gap-2 p-4 bg-space-dark bg-opacity-50 rounded-lg">
      {!isPlaying ? (
        <button
          onClick={startGame}
          className="flex items-center gap-2 px-4 py-2 bg-planet-green text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          <Play size={20} />
          <span className="hidden sm:inline">게임 시작</span>
        </button>
      ) : (
        <>
          <button
            onClick={isPaused ? resumeGame : pauseGame}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isPaused ? <Play size={20} /> : <Pause size={20} />}
            <span className="hidden sm:inline">{isPaused ? '재개' : '일시정지'}</span>
          </button>
          
          <button
            onClick={handleSpeedToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              gameSpeed === 1 ? 'bg-gray-600 hover:bg-gray-700' :
              gameSpeed === 2 ? 'bg-yellow-600 hover:bg-yellow-700' :
              'bg-red-600 hover:bg-red-700'
            } text-white`}
          >
            <FastForward size={20} />
            <span className="font-bold">{gameSpeed}x</span>
          </button>
        </>
      )}
      
      <button
        onClick={resetGame}
        className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors ml-auto"
      >
        <RotateCcw size={20} />
        <span className="hidden sm:inline">리셋</span>
      </button>
    </div>
  );
};