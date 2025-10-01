import React from 'react'
import { Play, Pause, RotateCcw, Zap, Trophy, Activity } from 'lucide-react'
import useGameStore from '../store/gameStore'

const GameUI: React.FC = () => {
  const {
    gameState,
    score,
    highScore,
    distance,
    speed,
    quantumEnergy,
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
  
  return (
    <>
      {/* Top HUD */}
      {gameState !== 'menu' && (
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10">
          {/* Score and stats */}
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 space-y-1">
            <div className="flex items-center gap-2 text-white">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="text-xl font-bold">{score}</span>
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Activity className="w-3 h-3" />
              <span>{formatDistance(distance)}</span>
              <span className="text-white/40">•</span>
              <span>{formatSpeed(speed)}</span>
            </div>
          </div>
          
          {/* Quantum Energy Bar */}
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-quantum-cyan" />
              <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-quantum-purple to-quantum-cyan transition-all duration-300"
                  style={{ width: `${quantumEnergy}%` }}
                ></div>
              </div>
              <span className="text-xs text-white/60">{Math.floor(quantumEnergy)}%</span>
            </div>
          </div>
          
          {/* Pause button */}
          {gameState === 'playing' && (
            <button
              onClick={pauseGame}
              className="bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white hover:bg-black/70 transition-colors"
            >
              <Pause className="w-5 h-5" />
            </button>
          )}
        </div>
      )}
      
      {/* Menu Screen */}
      {gameState === 'menu' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-black/60 backdrop-blur-md">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-quantum-purple via-quantum-blue to-quantum-cyan bg-clip-text text-transparent">
                Quantum Jump
              </h1>
              <h2 className="text-3xl font-bold text-white/80">Runner</h2>
              <p className="text-white/60 text-sm">양자 중첩 상태로 장애물을 피하세요!</p>
            </div>
            
            {highScore > 0 && (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-full">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-bold">최고 점수: {highScore}</span>
                </div>
              </div>
            )}
            
            <button
              onClick={startGame}
              className="w-full py-4 bg-gradient-to-r from-quantum-purple to-quantum-blue text-white font-bold rounded-xl hover:scale-105 transition-transform quantum-glow"
            >
              <Play className="inline-block w-6 h-6 mr-2" />
              게임 시작
            </button>
            
            <div className="text-white/40 text-xs space-y-2">
              <p className="font-bold">조작법:</p>
              <p>← → : 레인 이동</p>
              <p>↑ or 스페이스 : 점프</p>
              <p>↓ or Q : 양자 점프 (에너지 50 소모)</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Pause Screen */}
      {gameState === 'paused' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-black/60 backdrop-blur-md">
          <div className="max-w-md w-full space-y-6">
            <h2 className="text-3xl font-bold text-center text-white">일시 정지</h2>
            
            <div className="bg-white/10 rounded-lg p-4 space-y-2">
              <p className="text-white/80">현재 점수: <span className="font-bold text-quantum-cyan">{score}</span></p>
              <p className="text-white/80">거리: <span className="font-bold text-quantum-blue">{formatDistance(distance)}</span></p>
            </div>
            
            <button
              onClick={resumeGame}
              className="w-full py-4 bg-gradient-to-r from-quantum-purple to-quantum-blue text-white font-bold rounded-xl hover:scale-105 transition-transform"
            >
              <Play className="inline-block w-6 h-6 mr-2" />
              계속하기
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-gray-700 text-white font-bold rounded-xl hover:bg-gray-600 transition-colors"
            >
              메뉴로 돌아가기
            </button>
          </div>
        </div>
      )}
      
      {/* Game Over Screen */}
      {gameState === 'gameover' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-black/60 backdrop-blur-md">
          <div className="max-w-md w-full space-y-6">
            <h2 className="text-4xl font-bold text-center text-red-500">게임 오버</h2>
            
            <div className="bg-white/10 rounded-lg p-6 space-y-3">
              <div className="text-center space-y-2">
                <p className="text-white/60">최종 점수</p>
                <p className="text-5xl font-bold text-quantum-cyan">{score}</p>
              </div>
              
              {score > highScore && (
                <div className="text-center">
                  <span className="inline-block px-3 py-1 bg-yellow-500/30 text-yellow-400 rounded-full text-sm font-bold">
                    🎉 새로운 최고 기록!
                  </span>
                </div>
              )}
              
              <div className="flex justify-around pt-4 border-t border-white/20">
                <div className="text-center">
                  <p className="text-white/60 text-sm">거리</p>
                  <p className="text-xl font-bold text-white">{formatDistance(distance)}</p>
                </div>
                <div className="text-center">
                  <p className="text-white/60 text-sm">최고 기록</p>
                  <p className="text-xl font-bold text-yellow-400">{Math.max(score, highScore)}</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={startGame}
              className="w-full py-4 bg-gradient-to-r from-quantum-purple to-quantum-blue text-white font-bold rounded-xl hover:scale-105 transition-transform quantum-glow"
            >
              <RotateCcw className="inline-block w-6 h-6 mr-2" />
              다시 시작
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-gray-700 text-white font-bold rounded-xl hover:bg-gray-600 transition-colors"
            >
              메뉴로 돌아가기
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default GameUI