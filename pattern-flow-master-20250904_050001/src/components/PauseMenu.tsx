import React from 'react'
import { Play, RotateCcw, Home, Volume2, VolumeX } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

export const PauseMenu: React.FC = () => {
  const { resumeGame, startGame, resetGame } = useGameStore()
  const [soundEnabled, setSoundEnabled] = React.useState(true)
  
  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full max-w-sm mx-4 bg-gradient-to-br from-purple-900/90 to-indigo-900/90 rounded-2xl p-6 space-y-4">
        <h2 className="text-2xl font-bold text-white text-center">일시 정지</h2>
        
        <div className="space-y-3">
          <button
            onClick={resumeGame}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            <span>계속하기</span>
          </button>
          
          <button
            onClick={startGame}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>새 게임</span>
          </button>
          
          <button
            onClick={resetGame}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            <span>메인 메뉴</span>
          </button>
          
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            <span>{soundEnabled ? '소리 끄기' : '소리 켜기'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}