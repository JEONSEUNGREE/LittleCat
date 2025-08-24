import React from 'react'
import { Play, Pause, RotateCcw, Trophy, Zap, Music } from 'lucide-react'
import useGameStore from '../store/gameStore'

const GameUI: React.FC = () => {
  const {
    gameState,
    score,
    highScore,
    combo,
    maxCombo,
    speed,
    distance,
    startGame,
    pauseGame,
    resumeGame
  } = useGameStore()
  
  const formatDistance = (dist: number) => {
    return `${Math.floor(dist)}m`
  }
  
  const formatSpeed = (spd: number) => {
    return `${spd.toFixed(1)}x`
  }
  
  if (gameState === 'menu') {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 p-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-5xl sm:text-6xl font-bold text-white drop-shadow-lg animate-pulse-fast">
              Rhythm Tap Runner
            </h1>
            <p className="text-lg text-white/80">
              음악의 비트에 맞춰 달리고 점프하세요!
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between text-white">
              <span className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                최고 점수
              </span>
              <span className="text-2xl font-bold">{highScore}</span>
            </div>
            
            <div className="space-y-3 text-white/80 text-sm">
              <p className="flex items-center gap-2">
                <Music className="w-4 h-4" />
                레인을 탭하여 이동
              </p>
              <p className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                더블탭으로 점프
              </p>
              <p>키보드: 1,2,3 또는 ←→ 이동, 스페이스 점프</p>
            </div>
          </div>
          
          <button
            onClick={startGame}
            className="w-full py-4 bg-gradient-to-r from-game-primary to-game-secondary rounded-xl text-white text-xl font-bold shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-3"
          >
            <Play className="w-8 h-8" />
            게임 시작
          </button>
        </div>
      </div>
    )
  }
  
  if (gameState === 'gameover') {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 p-4">
        <div className="max-w-md w-full space-y-6 bg-black/50 backdrop-blur rounded-2xl p-8">
          <h2 className="text-4xl font-bold text-white text-center">Game Over!</h2>
          
          <div className="space-y-4 text-white">
            <div className="flex justify-between items-center text-lg">
              <span>점수</span>
              <span className="text-2xl font-bold">{score}</span>
            </div>
            
            <div className="flex justify-between items-center text-lg">
              <span>최고 점수</span>
              <span className="text-2xl font-bold text-yellow-400">
                {highScore}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span>최대 콤보</span>
              <span className="font-bold">{maxCombo}x</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span>거리</span>
              <span className="font-bold">{formatDistance(distance)}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={startGame}
              className="w-full py-3 bg-gradient-to-r from-game-primary to-game-secondary rounded-xl text-white font-bold shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              다시 시작
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-white/10 backdrop-blur rounded-xl text-white font-bold hover:bg-white/20 transition-colors"
            >
              메인 메뉴
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  if (gameState === 'paused') {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur">
        <div className="bg-white/10 backdrop-blur rounded-2xl p-8 space-y-6">
          <h2 className="text-3xl font-bold text-white text-center">일시 정지</h2>
          
          <button
            onClick={resumeGame}
            className="w-full py-3 bg-gradient-to-r from-game-primary to-game-secondary rounded-xl text-white font-bold shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            계속하기
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-white/10 backdrop-blur rounded-xl text-white font-bold hover:bg-white/20 transition-colors"
          >
            메인 메뉴
          </button>
        </div>
      </div>
    )
  }
  
  // Playing state - HUD
  return (
    <div className="absolute inset-x-0 top-0 p-4 pointer-events-none">
      <div className="flex justify-between items-start">
        <div className="bg-black/50 backdrop-blur rounded-lg px-4 py-2 space-y-1">
          <div className="text-white text-2xl font-bold">{score}</div>
          <div className="text-white/60 text-xs">점수</div>
        </div>
        
        <div className="flex flex-col items-center gap-2">
          {combo > 0 && (
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full px-4 py-1 animate-beat">
              <span className="text-white font-bold text-lg">{combo}x 콤보!</span>
            </div>
          )}
          
          <div className="bg-black/50 backdrop-blur rounded-lg px-4 py-2 flex items-center gap-3">
            <div className="text-center">
              <div className="text-white font-bold">{formatSpeed(speed)}</div>
              <div className="text-white/60 text-xs">속도</div>
            </div>
            
            <div className="w-px h-8 bg-white/20" />
            
            <div className="text-center">
              <div className="text-white font-bold">{formatDistance(distance)}</div>
              <div className="text-white/60 text-xs">거리</div>
            </div>
          </div>
        </div>
        
        <button
          onClick={pauseGame}
          className="bg-black/50 backdrop-blur rounded-lg p-3 hover:bg-black/70 transition-colors pointer-events-auto"
        >
          <Pause className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  )
}