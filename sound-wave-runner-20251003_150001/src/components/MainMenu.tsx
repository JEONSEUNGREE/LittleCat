import React from 'react'
import { Play, Trophy, Settings, Info, Music2, Waves } from 'lucide-react'
import useGameStore from '../store/gameStore'

const MainMenu: React.FC = () => {
  const { highScore, resetGame } = useGameStore()
  
  const handleStartGame = () => {
    resetGame()
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-game-dark via-gray-900 to-game-dark">
      <div className="max-w-md w-full space-y-8 animate-slide-up">
        {/* Title with wave animation */}
        <div className="text-center space-y-2">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Waves className="w-10 h-10 text-game-primary animate-wave-flow" />
            <Music2 className="w-8 h-8 text-game-secondary animate-pulse" />
          </div>
          <h1 className="text-5xl font-bold wave-gradient bg-clip-text text-transparent">
            Sound Wave
          </h1>
          <h2 className="text-3xl font-bold text-game-accent">
            Runner
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            음파의 리듬을 타고 달려라!
          </p>
        </div>
        
        {/* High Score Display */}
        {highScore > 0 && (
          <div className="flex items-center justify-center gap-2 bg-game-dark/50 backdrop-blur-sm p-3 rounded-lg border border-game-primary/30">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-sm">최고 점수:</span>
            <span className="font-bold text-game-primary">{highScore}</span>
          </div>
        )}
        
        {/* Menu Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleStartGame}
            className="w-full game-button flex items-center justify-center gap-2 text-lg animate-glow"
          >
            <Play className="w-5 h-5" />
            게임 시작
          </button>
          
          <button
            className="w-full px-6 py-3 rounded-lg font-bold transition-all duration-200 
                     bg-game-dark border-2 border-game-secondary text-game-secondary
                     hover:bg-game-secondary hover:text-game-dark active:scale-95"
          >
            <div className="flex items-center justify-center gap-2">
              <Settings className="w-5 h-5" />
              설정
            </div>
          </button>
          
          <button
            className="w-full px-6 py-3 rounded-lg font-bold transition-all duration-200
                     bg-transparent border-2 border-gray-600 text-gray-400
                     hover:border-gray-400 hover:text-white active:scale-95"
          >
            <div className="flex items-center justify-center gap-2">
              <Info className="w-5 h-5" />
              게임 방법
            </div>
          </button>
        </div>
        
        {/* Instructions */}
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 space-y-2 text-sm text-gray-400">
          <h3 className="font-bold text-game-light mb-2">조작법</h3>
          <div className="space-y-1">
            <p>🎵 음파의 리듬에 맞춰 점프하세요</p>
            <p>👆 화면을 터치하여 점프</p>
            <p>🌊 음파가 높을수록 더 높이 점프</p>
            <p>⚡ 장애물을 피하고 점수를 획득하세요</p>
          </div>
        </div>
        
        {/* Wave visualization at bottom */}
        <div className="flex justify-center gap-1">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-game-primary/50 rounded-full animate-wave-flow"
              style={{
                height: `${20 + Math.sin(i * 0.5) * 15}px`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MainMenu