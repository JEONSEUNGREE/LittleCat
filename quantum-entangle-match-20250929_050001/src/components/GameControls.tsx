import React from 'react'
import { RefreshCw, ChevronRight, Info } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

const GameControls: React.FC = () => {
  const { score, level, moves, currentEntanglements, targetEntanglements, gameStatus, resetGame, nextLevel } = useGameStore()

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Score and stats */}
      <div className="flex justify-between items-center p-4 bg-slate-800/50 rounded-lg backdrop-blur-sm">
        <div className="text-center">
          <p className="text-sm text-slate-400">점수</p>
          <p className="score-display">{score}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-slate-400">레벨</p>
          <p className="score-display">{level}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-slate-400">이동</p>
          <p className="score-display">{moves}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="p-4 bg-slate-800/50 rounded-lg backdrop-blur-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-400">얽힘 진행도</span>
          <span className="text-sm font-bold">{currentEntanglements} / {targetEntanglements}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-quantum-purple to-quantum-pink h-3 rounded-full transition-all duration-500"
            style={{ width: `${(currentEntanglements / targetEntanglements) * 100}%` }}
          />
        </div>
      </div>

      {/* Control buttons */}
      <div className="flex gap-2">
        <button
          onClick={resetGame}
          className="quantum-button flex-1 flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          <span className="hidden sm:inline">재시작</span>
        </button>
        
        {gameStatus === 'won' && (
          <button
            onClick={nextLevel}
            className="quantum-button flex-1 flex items-center justify-center gap-2 animate-pulse"
          >
            <span className="hidden sm:inline">다음 레벨</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Instructions */}
      <div className="p-4 bg-slate-800/50 rounded-lg backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-quantum-cyan" />
          <h3 className="font-bold text-sm">게임 방법</h3>
        </div>
        <ul className="text-xs text-slate-300 space-y-1">
          <li>• 같은 색상의 입자를 선택하세요</li>
          <li>• 반대 스핀(↑↓)을 가진 입자끼리 얽힘이 가능합니다</li>
          <li>• 모든 목표 얽힘을 완성하면 승리!</li>
        </ul>
      </div>
    </div>
  )
}

export default GameControls