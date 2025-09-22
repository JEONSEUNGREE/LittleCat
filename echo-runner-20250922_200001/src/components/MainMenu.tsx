import React from 'react'
import { Play, Volume2, VolumeX, Trophy, Info } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

export const MainMenu: React.FC = () => {
  const { startGame, highScore, isMuted, toggleMute } = useGameStore()
  const [showInfo, setShowInfo] = React.useState(false)
  
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4">
      {/* Title with animated sound waves */}
      <div className="relative mb-8">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-echo-blue via-echo-purple to-echo-pink bg-clip-text text-transparent animate-pulse-fast">
          Echo Runner
        </h1>
        <div className="absolute -top-4 -right-4 flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-8 bg-gradient-to-t from-echo-blue to-echo-purple rounded-full sound-wave opacity-60"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
        <div className="absolute -bottom-4 -left-4 flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-8 bg-gradient-to-t from-echo-purple to-echo-pink rounded-full sound-wave opacity-60"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
      
      <p className="text-gray-400 mb-8 text-center">음파를 따라 달리고 점프하는 리듬 러닝 게임</p>
      
      {/* High Score */}
      {highScore > 0 && (
        <div className="mb-6 flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2">
          <Trophy className="text-yellow-500" size={20} />
          <span className="text-gray-400">최고 기록:</span>
          <span className="text-xl font-bold text-yellow-500">{highScore}</span>
        </div>
      )}
      
      {/* Play Button */}
      <button
        onClick={startGame}
        className="mb-4 px-8 py-4 bg-gradient-to-r from-echo-blue to-echo-purple rounded-full text-white font-bold text-lg hover:scale-105 transition-transform active:scale-95 glow flex items-center gap-3"
      >
        <Play size={24} fill="white" />
        게임 시작
      </button>
      
      {/* Control Buttons */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={toggleMute}
          className="p-3 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
        
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="p-3 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
        >
          <Info size={24} />
        </button>
      </div>
      
      {/* Info Panel */}
      {showInfo && (
        <div className="absolute inset-4 bg-black/90 backdrop-blur-md rounded-lg p-6 flex flex-col z-20">
          <button
            onClick={() => setShowInfo(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            ✕
          </button>
          
          <h2 className="text-2xl font-bold mb-4 text-echo-blue">게임 방법</h2>
          
          <div className="space-y-4 text-gray-300">
            <div>
              <h3 className="font-bold text-echo-purple mb-2">🎮 조작법</h3>
              <p>• 화면을 탭하거나 스페이스바를 눌러 점프</p>
              <p>• 음파가 퍼지며 장애물을 감지</p>
            </div>
            
            <div>
              <h3 className="font-bold text-echo-purple mb-2">🎯 목표</h3>
              <p>• 장애물을 피하며 최대한 멀리 달리기</p>
              <p>• 레벨이 올라갈수록 속도 증가</p>
              <p>• 생명력 3개를 모두 잃으면 게임 오버</p>
            </div>
            
            <div>
              <h3 className="font-bold text-echo-purple mb-2">🏆 점수</h3>
              <p>• 시간이 지날수록 점수 증가</p>
              <p>• 500점마다 레벨 업</p>
              <p>• 최고 기록에 도전하세요!</p>
            </div>
            
            <div>
              <h3 className="font-bold text-echo-purple mb-2">🔊 음향 효과</h3>
              <p>• 점프 시 음파 효과 발생</p>
              <p>• 리듬에 맞춰 플레이하면 보너스</p>
            </div>
          </div>
          
          <div className="mt-auto pt-4 text-center text-gray-500 text-sm">
            Echo Runner v0.0.1 | Made with React + TypeScript
          </div>
        </div>
      )}
      
      {/* Background Animation */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="w-4 bg-gradient-to-t from-echo-blue to-transparent rounded-full sound-wave"
            style={{
              height: `${Math.random() * 100 + 50}px`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${Math.random() * 1 + 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}