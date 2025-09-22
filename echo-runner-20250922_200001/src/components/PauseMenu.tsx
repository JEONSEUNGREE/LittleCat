import React from 'react'
import { Play, Home, Volume2, VolumeX } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

export const PauseMenu: React.FC = () => {
  const { resumeGame, resetGame, isMuted, toggleMute, score, level } = useGameStore()
  
  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-echo-darker/90 rounded-2xl p-8 max-w-sm w-full mx-4">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-echo-blue to-echo-purple bg-clip-text text-transparent">
          일시 정지
        </h2>
        
        {/* Current Stats */}
        <div className="bg-black/30 rounded-lg p-4 mb-6 grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-gray-400 text-sm">현재 점수</div>
            <div className="text-2xl font-bold text-echo-blue">{score}</div>
          </div>
          <div className="text-center">
            <div className="text-gray-400 text-sm">레벨</div>
            <div className="text-2xl font-bold text-echo-purple">{level}</div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={resumeGame}
            className="w-full px-6 py-3 bg-gradient-to-r from-echo-blue to-echo-purple rounded-full text-white font-bold hover:scale-105 transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <Play size={20} fill="white" />
            계속하기
          </button>
          
          <button
            onClick={toggleMute}
            className="w-full px-6 py-3 bg-black/50 backdrop-blur-sm rounded-full text-white font-bold hover:bg-black/70 transition-colors flex items-center justify-center gap-2"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            {isMuted ? '소리 켜기' : '소리 끄기'}
          </button>
          
          <button
            onClick={resetGame}
            className="w-full px-6 py-3 bg-red-500/20 backdrop-blur-sm rounded-full text-red-400 font-bold hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2"
          >
            <Home size={20} />
            메인 메뉴로
          </button>
        </div>
        
        {/* Tips */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          💡 팁: 리듬에 맞춰 점프하면 더 높은 점수를 얻을 수 있어요!
        </div>
      </div>
    </div>
  )
}