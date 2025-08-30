import { Heart, Pause, Play, RotateCcw, Trophy, Zap } from 'lucide-react'
import useGameStore from '../store/gameStore'

export default function GameUI() {
  const { 
    score, 
    highScore, 
    lives, 
    level,
    isPlaying, 
    isPaused,
    startGame,
    pauseGame,
    resumeGame,
    resetGame
  } = useGameStore()
  
  return (
    <>
      {/* HUD - Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Trophy className="text-yellow-400" size={20} />
            <span className="text-lg font-bold">{score}</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="text-purple-400" size={20} />
            <span className="text-lg font-bold">Lv.{level}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {[...Array(3)].map((_, i) => (
            <Heart
              key={i}
              size={24}
              className={i < lives ? 'text-red-500 fill-red-500' : 'text-gray-600'}
            />
          ))}
        </div>
      </div>
      
      {/* Game Controls */}
      {!isPlaying && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-20">
          <div className="text-center space-y-8 p-8 bg-space-blue/90 rounded-2xl border-2 border-neon-cyan">
            <h1 className="text-4xl md:text-6xl font-bold text-neon-cyan neon-glow">
              Space Dodge Rush
            </h1>
            
            <div className="space-y-2">
              <p className="text-xl">최고 점수: {highScore}</p>
              <p className="text-gray-300">우주선을 조작하여 장애물을 피하세요!</p>
              <p className="text-sm text-gray-400">터치/마우스/방향키로 조작</p>
            </div>
            
            <button
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-neon-cyan to-neon-pink rounded-lg text-xl font-bold hover:scale-105 transition-transform neon-glow"
            >
              게임 시작
            </button>
          </div>
        </div>
      )}
      
      {/* Pause Menu */}
      {isPlaying && isPaused && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-20">
          <div className="text-center space-y-6 p-8 bg-space-blue/90 rounded-2xl border-2 border-neon-cyan">
            <h2 className="text-3xl font-bold text-neon-cyan">일시 정지</h2>
            
            <div className="space-y-2">
              <p className="text-xl">현재 점수: {score}</p>
              <p className="text-lg">레벨: {level}</p>
            </div>
            
            <div className="flex gap-4 justify-center">
              <button
                onClick={resumeGame}
                className="px-6 py-3 bg-green-600 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
              >
                <Play size={20} />
                계속
              </button>
              <button
                onClick={resetGame}
                className="px-6 py-3 bg-red-600 rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors"
              >
                <RotateCcw size={20} />
                재시작
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Pause Button */}
      {isPlaying && !isPaused && (
        <button
          onClick={pauseGame}
          className="absolute top-4 right-4 p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors z-10"
        >
          <Pause size={24} />
        </button>
      )}
    </>
  )
}