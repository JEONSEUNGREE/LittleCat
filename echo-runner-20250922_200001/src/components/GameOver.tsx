import React from 'react'
import { RotateCcw, Home, Trophy, TrendingUp } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

export const GameOver: React.FC = () => {
  const { score, highScore, level, startGame, resetGame } = useGameStore()
  const isNewHighScore = score === highScore && score > 0
  
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4">
      {/* Game Over Title */}
      <h1 className="text-4xl md:text-6xl font-bold mb-8 animate-pulse-fast">
        {isNewHighScore ? (
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            새로운 최고 기록!
          </span>
        ) : (
          <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            게임 오버
          </span>
        )}
      </h1>
      
      {/* Score Display */}
      <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 mb-8 min-w-[280px]">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-gray-400 text-sm mb-1">점수</div>
            <div className="text-3xl font-bold text-echo-blue">{score}</div>
          </div>
          <div className="text-center">
            <div className="text-gray-400 text-sm mb-1">레벨</div>
            <div className="text-3xl font-bold text-echo-purple">{level}</div>
          </div>
        </div>
        
        {highScore > 0 && (
          <div className="border-t border-gray-600 pt-4">
            <div className="flex items-center justify-center gap-2">
              <Trophy className={isNewHighScore ? 'text-yellow-500' : 'text-gray-400'} size={20} />
              <span className="text-gray-400">최고 기록:</span>
              <span className={`text-xl font-bold ${isNewHighScore ? 'text-yellow-500 animate-pulse' : 'text-white'}`}>
                {highScore}
              </span>
            </div>
          </div>
        )}
      </div>
      
      {/* Achievement Messages */}
      <div className="mb-8 text-center max-w-sm">
        {score < 100 && (
          <p className="text-gray-400">연습이 필요해요! 다시 도전해보세요.</p>
        )}
        {score >= 100 && score < 500 && (
          <p className="text-gray-400">좋은 시작이에요! 계속 연습하세요.</p>
        )}
        {score >= 500 && score < 1000 && (
          <p className="text-gray-400">잘하고 있어요! 실력이 늘고 있네요.</p>
        )}
        {score >= 1000 && score < 2000 && (
          <p className="text-gray-400">훌륭해요! 프로 실력이에요!</p>
        )}
        {score >= 2000 && (
          <p className="text-gray-400">놀라워요! 당신은 Echo Runner 마스터!</p>
        )}
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={startGame}
          className="px-6 py-3 bg-gradient-to-r from-echo-blue to-echo-purple rounded-full text-white font-bold hover:scale-105 transition-transform active:scale-95 flex items-center gap-2 glow"
        >
          <RotateCcw size={20} />
          다시 시작
        </button>
        
        <button
          onClick={resetGame}
          className="px-6 py-3 bg-black/50 backdrop-blur-sm rounded-full text-white font-bold hover:bg-black/70 transition-colors flex items-center gap-2"
        >
          <Home size={20} />
          메인 메뉴
        </button>
      </div>
      
      {/* Stats */}
      <div className="mt-12 flex gap-8 text-center">
        <div>
          <TrendingUp className="text-green-500 mx-auto mb-2" size={24} />
          <div className="text-gray-400 text-sm">달린 거리</div>
          <div className="text-xl font-bold">{Math.floor(score / 10)}m</div>
        </div>
        <div>
          <div className="text-3xl mb-2">⏱️</div>
          <div className="text-gray-400 text-sm">플레이 시간</div>
          <div className="text-xl font-bold">{Math.floor(score / 60)}초</div>
        </div>
        <div>
          <div className="text-3xl mb-2">🎯</div>
          <div className="text-gray-400 text-sm">도달 레벨</div>
          <div className="text-xl font-bold">Lv.{level}</div>
        </div>
      </div>
      
      {/* Animated Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <div className="relative w-96 h-96">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 border-4 border-echo-purple rounded-full animate-echo"
              style={{
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}