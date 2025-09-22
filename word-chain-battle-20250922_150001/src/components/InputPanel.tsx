import { useEffect, useRef } from 'react'
import { Send, Play, RotateCcw, Clock } from 'lucide-react'
import useGameStore from '../store/gameStore'

const InputPanel: React.FC = () => {
  const {
    inputValue,
    setInputValue,
    submitWord,
    startGame,
    resetGame,
    gameStatus,
    isPlayerTurn,
    timer,
    currentWord,
    updateTimer
  } = useGameStore()
  
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (gameStatus === 'playing' && isPlayerTurn) {
      const interval = setInterval(updateTimer, 1000)
      return () => clearInterval(interval)
    }
  }, [gameStatus, isPlayerTurn, updateTimer])

  useEffect(() => {
    if (isPlayerTurn && gameStatus === 'playing' && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isPlayerTurn, gameStatus])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      submitWord(inputValue.trim())
    }
  }

  const getTimerColor = () => {
    if (timer > 20) return 'text-green-500'
    if (timer > 10) return 'text-yellow-500'
    return 'text-red-500 animate-pulse'
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4">
      {gameStatus === 'waiting' ? (
        <div className="space-y-3">
          <button
            onClick={startGame}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            게임 시작
          </button>
        </div>
      ) : gameStatus === 'playing' ? (
        <div className="space-y-3">
          {isPlayerTurn && currentWord && (
            <div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
              <div className="text-sm text-gray-600">
                <span className="font-bold text-2xl text-blue-500">
                  {currentWord[currentWord.length - 1]}
                </span>
                <span className="ml-1">로 시작하는 단어</span>
              </div>
              <div className={`flex items-center gap-1 font-bold ${getTimerColor()}`}>
                <Clock className="w-4 h-4" />
                {timer}초
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={!isPlayerTurn}
              placeholder={isPlayerTurn ? "단어를 입력하세요..." : "AI가 생각중..."}
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed text-lg"
            />
            <button
              type="submit"
              disabled={!isPlayerTurn || !inputValue.trim()}
              className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 transform active:scale-95"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          
          <button
            onClick={resetGame}
            className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            다시 시작
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="text-center py-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">게임 종료!</h3>
            <p className="text-gray-600">
              {useGameStore.getState().score.player > useGameStore.getState().score.ai 
                ? '🎉 승리했습니다!' 
                : '😢 패배했습니다'}
            </p>
          </div>
          <button
            onClick={resetGame}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-xl font-bold hover:from-green-600 hover:to-blue-600 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            새 게임
          </button>
        </div>
      )}
    </div>
  )
}

export default InputPanel