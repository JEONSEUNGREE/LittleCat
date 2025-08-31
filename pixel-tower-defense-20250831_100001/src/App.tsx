import { useState, useEffect } from 'react'
import GameBoard from './components/GameBoard'
import TowerSelector from './components/TowerSelector'
import GameStats from './components/GameStats'
import WaveController from './components/WaveController'
import GameOverModal from './components/GameOverModal'
import { useGameStore } from './store/gameStore'
import { Shield } from 'lucide-react'

function App() {
  const { 
    isPlaying, 
    isPaused,
    isGameOver,
    startGame, 
    resetGame,
    togglePause 
  } = useGameStore()
  
  const [showInstructions, setShowInstructions] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center p-2 sm:p-4">
      {/* Title */}
      <div className="text-center mb-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-2 flex items-center justify-center gap-2">
          <Shield className="w-8 h-8 sm:w-10 sm:h-10" />
          <span className="font-pixel text-base sm:text-xl">Pixel Tower Defense</span>
        </h1>
        {showInstructions && (
          <p className="text-white text-xs sm:text-sm animate-pulse">
            타워를 배치하여 적을 막아내세요!
          </p>
        )}
      </div>

      {/* Main Game Container */}
      <div className="bg-gray-900 rounded-lg shadow-2xl p-3 sm:p-4 max-w-full w-full sm:max-w-4xl">
        {!isPlaying ? (
          // Start Screen
          <div className="text-center py-12 sm:py-20">
            <h2 className="text-xl sm:text-2xl text-white mb-6 font-pixel">
              게임을 시작하시겠습니까?
            </h2>
            <button
              onClick={startGame}
              className="pixel-button bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded text-sm sm:text-base"
            >
              게임 시작
            </button>
            <div className="mt-8 text-gray-400 text-xs sm:text-sm">
              <p>📱 모바일 최적화</p>
              <p>🎮 간단한 터치 조작</p>
              <p>🏆 최고 점수에 도전하세요!</p>
            </div>
          </div>
        ) : (
          <>
            {/* Game Stats */}
            <GameStats />
            
            {/* Wave Controller */}
            <WaveController />
            
            {/* Game Board */}
            <div className="my-4">
              <GameBoard />
            </div>
            
            {/* Tower Selector */}
            <TowerSelector />
            
            {/* Control Buttons */}
            <div className="flex justify-center gap-2 sm:gap-4 mt-4">
              <button
                onClick={togglePause}
                className="pixel-button bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-3 sm:py-2 sm:px-4 rounded text-xs sm:text-sm"
              >
                {isPaused ? '재개' : '일시정지'}
              </button>
              <button
                onClick={resetGame}
                className="pixel-button bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 sm:py-2 sm:px-4 rounded text-xs sm:text-sm"
              >
                다시 시작
              </button>
            </div>
          </>
        )}
      </div>

      {/* Game Over Modal */}
      {isGameOver && <GameOverModal />}
    </div>
  )
}

export default App