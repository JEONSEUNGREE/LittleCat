import React from 'react'
import { RotateCcw, Home, Share2, Award } from 'lucide-react'
import useGameStore from '../store/gameStore'

const GameOver: React.FC = () => {
  const { score, highScore, level, resetGame, setGameState } = useGameStore()
  const isNewHighScore = score === highScore && score > 0
  
  const handleRetry = () => {
    resetGame()
  }
  
  const handleMainMenu = () => {
    setGameState('menu')
  }
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Sound Wave Runner',
        text: `🎮 Sound Wave Runner에서 ${score}점을 획득했습니다! 레벨 ${level}까지 도달했어요!`,
      }).catch(() => {})
    }
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-game-dark via-gray-900 to-game-dark">
      <div className="max-w-md w-full space-y-6 animate-slide-up">
        {/* Game Over Title */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold text-game-accent">
            Game Over
          </h1>
          {isNewHighScore && (
            <div className="flex items-center justify-center gap-2 text-yellow-500 animate-pulse">
              <Award className="w-6 h-6" />
              <span className="text-xl font-bold">신기록!</span>
            </div>
          )}
        </div>
        
        {/* Score Display */}
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 space-y-4">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-1">최종 점수</p>
            <p className="text-5xl font-bold wave-gradient bg-clip-text text-transparent">
              {score}
            </p>
          </div>
          
          <div className="flex justify-around pt-4 border-t border-gray-700">
            <div className="text-center">
              <p className="text-gray-400 text-xs">최고 점수</p>
              <p className="text-xl font-bold text-game-primary">{highScore}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-xs">도달 레벨</p>
              <p className="text-xl font-bold text-game-secondary">{level}</p>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleRetry}
            className="w-full game-button flex items-center justify-center gap-2 text-lg"
          >
            <RotateCcw className="w-5 h-5" />
            다시 시도
          </button>
          
          <button
            onClick={handleMainMenu}
            className="w-full px-6 py-3 rounded-lg font-bold transition-all duration-200 
                     bg-game-dark border-2 border-game-secondary text-game-secondary
                     hover:bg-game-secondary hover:text-game-dark active:scale-95"
          >
            <div className="flex items-center justify-center gap-2">
              <Home className="w-5 h-5" />
              메인 메뉴
            </div>
          </button>
          
          {navigator.share && (
            <button
              onClick={handleShare}
              className="w-full px-6 py-3 rounded-lg font-bold transition-all duration-200
                       bg-transparent border-2 border-gray-600 text-gray-400
                       hover:border-gray-400 hover:text-white active:scale-95"
            >
              <div className="flex items-center justify-center gap-2">
                <Share2 className="w-5 h-5" />
                점수 공유
              </div>
            </button>
          )}
        </div>
        
        {/* Performance Summary */}
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 space-y-2 text-sm">
          <h3 className="font-bold text-game-light mb-2">게임 요약</h3>
          <div className="space-y-1 text-gray-400">
            <p>🎯 획득 점수: {score}점</p>
            <p>📊 도달 레벨: {level} 레벨</p>
            <p>⏱️ 플레이 시간: {Math.floor(score / 10)}초</p>
            <p>🏆 최고 기록: {highScore}점</p>
          </div>
        </div>
        
        {/* Wave visualization at bottom */}
        <div className="flex justify-center gap-1 opacity-50">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-game-accent/50 rounded-full"
              style={{
                height: `${10 + Math.sin(i * 0.5) * 8}px`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default GameOver