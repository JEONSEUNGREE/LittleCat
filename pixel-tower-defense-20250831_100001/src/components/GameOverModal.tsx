import { Trophy, RotateCcw, Home } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

const GameOverModal = () => {
  const { score, wave, resetGame, startGame } = useGameStore()
  
  const handleRestart = () => {
    resetGame()
    setTimeout(() => {
      startGame()
    }, 100)
  }
  
  const handleHome = () => {
    resetGame()
  }
  
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl">
        <div className="mb-4">
          <Trophy className="w-16 h-16 mx-auto text-yellow-400 mb-2" />
          <h2 className="text-2xl font-bold text-red-500 mb-2">게임 오버!</h2>
        </div>
        
        <div className="space-y-2 mb-6">
          <div className="bg-gray-800 rounded p-3">
            <p className="text-gray-400 text-sm">최종 점수</p>
            <p className="text-white text-2xl font-bold">{score.toLocaleString()}</p>
          </div>
          
          <div className="bg-gray-800 rounded p-3">
            <p className="text-gray-400 text-sm">도달한 웨이브</p>
            <p className="text-white text-2xl font-bold">{wave}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <button
            onClick={handleRestart}
            className="pixel-button w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            다시 시작
          </button>
          
          <button
            onClick={handleHome}
            className="pixel-button w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            메인 화면
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameOverModal