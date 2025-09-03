import React from 'react'
import { Trophy, RotateCcw, Home, Award, Star } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

export const GameOver: React.FC = () => {
  const { score, highScore, level, startGame, resetGame } = useGameStore()
  
  const isNewHighScore = score === highScore && score > 0
  
  const getRank = () => {
    if (score >= 10000) return { rank: 'S', color: 'text-yellow-400', label: '전설' }
    if (score >= 7500) return { rank: 'A+', color: 'text-purple-400', label: '마스터' }
    if (score >= 5000) return { rank: 'A', color: 'text-blue-400', label: '전문가' }
    if (score >= 3000) return { rank: 'B', color: 'text-green-400', label: '숙련자' }
    if (score >= 1500) return { rank: 'C', color: 'text-gray-300', label: '도전자' }
    return { rank: 'D', color: 'text-gray-400', label: '입문자' }
  }
  
  const rankInfo = getRank()
  
  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-white">게임 종료!</h1>
        {isNewHighScore && (
          <div className="flex items-center justify-center gap-2 text-yellow-400 animate-bounce">
            <Star className="w-5 h-5" />
            <span className="font-bold">신기록 달성!</span>
            <Star className="w-5 h-5" />
          </div>
        )}
      </div>
      
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 space-y-4">
        <div className="text-center space-y-2">
          <div className={`text-6xl font-bold ${rankInfo.color}`}>
            {rankInfo.rank}
          </div>
          <div className="text-white/80">{rankInfo.label}</div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-white/80">최종 점수</span>
            </div>
            <span className="text-white font-bold text-xl">{score}</span>
          </div>
          
          <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              <span className="text-white/80">최고 점수</span>
            </div>
            <span className="text-white font-bold">{highScore}</span>
          </div>
          
          <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
            <span className="text-white/80">도달 레벨</span>
            <span className="text-white font-bold">레벨 {level}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <button
          onClick={startGame}
          className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 px-6 rounded-2xl hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg"
        >
          <RotateCcw className="w-5 h-5" />
          <span>다시 도전</span>
        </button>
        
        <button
          onClick={resetGame}
          className="w-full bg-white/20 text-white font-bold py-3 px-6 rounded-2xl hover:bg-white/30 transition-colors flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          <span>메인 메뉴</span>
        </button>
      </div>
    </div>
  )
}