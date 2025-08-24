import React from 'react'
import { Trophy, RefreshCw, Home } from 'lucide-react'

interface GameOverProps {
  score: number
  level: number
  isWin: boolean
  onRestart: () => void
}

const GameOver: React.FC<GameOverProps> = ({ score, level, isWin, onRestart }) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-lg text-center">
        <div className="mb-6">
          {isWin ? (
            <>
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-white mb-2">축하합니다!</h2>
              <p className="text-white/80">모든 레벨을 완료했습니다!</p>
            </>
          ) : (
            <>
              <div className="text-6xl mb-4">😢</div>
              <h2 className="text-3xl font-bold text-white mb-2">게임 오버</h2>
              <p className="text-white/80">다시 도전해보세요!</p>
            </>
          )}
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-white/70">최종 점수</span>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-300" />
                <span className="text-2xl font-bold text-white">{score}점</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-white/70">도달 레벨</span>
              <span className="text-2xl font-bold text-white">레벨 {level}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onRestart}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl transition-all transform hover:scale-105"
          >
            <RefreshCw className="w-5 h-5" />
            다시 시작
          </button>
          
          <button
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl transition-all"
          >
            <Home className="w-5 h-5" />
            메인으로
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameOver