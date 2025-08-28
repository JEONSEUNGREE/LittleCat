import React from 'react';
import { Trophy, Target, Zap, RotateCcw, Pause, Play } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const ScoreBoard: React.FC = () => {
  const { 
    score, 
    highScore, 
    level, 
    moves, 
    chainMultiplier,
    isPaused,
    pauseGame,
    resumeGame,
    resetGame
  } = useGameStore();

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-4 shadow-xl">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-3">
          <div className="flex items-center gap-2 text-white/80 text-sm mb-1">
            <Target className="w-4 h-4" />
            <span>점수</span>
          </div>
          <div className="text-white text-2xl font-bold">
            {score.toLocaleString()}
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-3">
          <div className="flex items-center gap-2 text-white/80 text-sm mb-1">
            <Trophy className="w-4 h-4" />
            <span>최고점수</span>
          </div>
          <div className="text-white text-2xl font-bold">
            {highScore.toLocaleString()}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-white/10 rounded-lg p-2 text-center">
          <div className="text-white/60 text-xs mb-1">레벨</div>
          <div className="text-white font-semibold">{level}</div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-2 text-center">
          <div className="text-white/60 text-xs mb-1">이동</div>
          <div className="text-white font-semibold">{moves}</div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-2 text-center">
          <div className="flex items-center justify-center gap-1 text-white/60 text-xs mb-1">
            <Zap className="w-3 h-3" />
            <span>연쇄</span>
          </div>
          <div className="text-white font-semibold">x{chainMultiplier.toFixed(1)}</div>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={isPaused ? resumeGame : pauseGame}
          className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-white rounded-lg py-2 px-4 
                     flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          <span>{isPaused ? '계속하기' : '일시정지'}</span>
        </button>
        
        <button
          onClick={resetGame}
          className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-white rounded-lg py-2 px-4 
                     flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          <span>다시시작</span>
        </button>
      </div>
    </div>
  );
};

export default ScoreBoard;