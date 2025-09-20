import { useState, useEffect } from 'react'
import GameCanvas from './components/GameCanvas'
import ControlPanel from './components/ControlPanel'
import ScoreBoard from './components/ScoreBoard'
import { useGameStore } from './store/gameStore'
import { Clock, Zap, Trophy } from 'lucide-react'

function App() {
  const { gameState, startGame, resetGame } = useGameStore()
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    if (gameState === 'playing') {
      setShowIntro(false)
    }
  }, [gameState])

  const handleStart = () => {
    setShowIntro(false)
    startGame()
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-500 rounded-full blur-2xl animate-bounce-slow" />
      </div>

      {/* Main Game Container */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 text-white">
          <div className="flex items-center space-x-2">
            <Clock className="w-6 h-6 text-cyan-400" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
              Time Rewind Racer
            </h1>
          </div>
          <ScoreBoard />
        </div>

        {/* Game Area */}
        <div className="flex-1 relative">
          {showIntro ? (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="bg-black/50 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full text-white space-y-6">
                <div className="text-center">
                  <div className="inline-flex p-3 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full mb-4">
                    <Zap className="w-12 h-12" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">시간을 되돌려라!</h2>
                  <p className="text-gray-300">
                    과거의 자신과 경주하는 타임 리와인드 레이서
                  </p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-cyan-400">1</span>
                    </div>
                    <p className="text-gray-300">화면을 터치하여 레이서를 조종하세요</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-400">2</span>
                    </div>
                    <p className="text-gray-300">시간을 되돌리면 과거의 자신이 나타납니다</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-pink-400">3</span>
                    </div>
                    <p className="text-gray-300">과거의 자신보다 빠르게 결승선에 도달하세요</p>
                  </div>
                </div>

                <button
                  onClick={handleStart}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Trophy className="w-5 h-5" />
                  <span>게임 시작</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <GameCanvas />
              <ControlPanel />
            </>
          )}
        </div>

        {/* Game Over Modal */}
        {gameState === 'gameover' && (
          <div className="absolute inset-0 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm z-50">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-sm w-full text-white text-center space-y-4">
              <Trophy className="w-16 h-16 mx-auto text-yellow-400" />
              <h2 className="text-2xl font-bold">게임 종료!</h2>
              <p className="text-gray-300">다시 도전하시겠습니까?</p>
              <button
                onClick={resetGame}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                다시 시작
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App