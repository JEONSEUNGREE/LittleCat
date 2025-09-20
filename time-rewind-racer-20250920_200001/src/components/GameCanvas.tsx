import { useEffect, useRef, useCallback } from 'react'
import { useGameStore } from '../store/gameStore'
import { Car, Flag, Clock } from 'lucide-react'

const GameCanvas = () => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)
  
  const {
    gameState,
    playerPosition,
    ghosts,
    timeElapsed,
    speed,
    updatePlayerPosition,
    updateTimeElapsed,
    addScore,
    nextLevel,
    endGame
  } = useGameStore()

  const handleMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (gameState !== 'playing') return
    
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    
    const x = clientX - rect.left
    const y = clientY - rect.top
    
    updatePlayerPosition(x, y)
  }, [gameState, updatePlayerPosition])

  const gameLoop = useCallback((timestamp: number) => {
    if (gameState !== 'playing') return
    
    const deltaTime = timestamp - lastTimeRef.current
    lastTimeRef.current = timestamp
    
    // Update time
    updateTimeElapsed(timeElapsed + deltaTime)
    
    // Check if reached finish line
    if (playerPosition.x > window.innerWidth - 100) {
      addScore(1000 + Math.floor((10000 - timeElapsed) / 10))
      nextLevel()
    }
    
    // Check collision with ghosts
    ghosts.forEach(ghost => {
      const currentGhostPos = ghost.path.find(p => 
        Math.abs(p.timestamp - timeElapsed) < 100
      )
      if (currentGhostPos) {
        const distance = Math.sqrt(
          Math.pow(playerPosition.x - currentGhostPos.x, 2) +
          Math.pow(playerPosition.y - currentGhostPos.y, 2)
        )
        if (distance < 30) {
          endGame()
        }
      }
    })
    
    animationRef.current = requestAnimationFrame(gameLoop)
  }, [gameState, timeElapsed, playerPosition, ghosts, updateTimeElapsed, addScore, nextLevel, endGame])

  useEffect(() => {
    if (gameState === 'playing') {
      lastTimeRef.current = performance.now()
      animationRef.current = requestAnimationFrame(gameLoop)
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [gameState, gameLoop])

  return (
    <div
      ref={canvasRef}
      className="absolute inset-0 cursor-pointer"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onMouseDown={handleMove}
      onTouchStart={handleMove}
    >
      {/* Track */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-32 bg-gradient-to-r from-gray-800/30 via-gray-700/30 to-gray-800/30 border-t-2 border-b-2 border-gray-600/50">
        <div className="h-full flex items-center">
          <div className="w-full h-1 bg-white/10 relative">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute top-0 h-full w-16 border-r-2 border-white/20"
                style={{ left: `${i * 10}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Finish Line */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-2">
        <Flag className="w-8 h-8 text-green-400 animate-pulse" />
        <div className="w-2 h-64 bg-gradient-to-b from-green-400 to-transparent opacity-50" />
      </div>

      {/* Ghosts */}
      {ghosts.map(ghost => {
        const currentPos = ghost.path.find(p => 
          Math.abs(p.timestamp - timeElapsed) < 100
        )
        if (!currentPos) return null
        
        return (
          <div
            key={ghost.id}
            className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100"
            style={{
              left: currentPos.x,
              top: currentPos.y,
              opacity: ghost.opacity
            }}
          >
            <div
              className="w-full h-full rounded-full animate-pulse"
              style={{ backgroundColor: ghost.color }}
            >
              <Clock className="w-full h-full p-1 text-white/80" />
            </div>
          </div>
        )
      })}

      {/* Player */}
      <div
        className="absolute w-10 h-10 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100"
        style={{
          left: playerPosition.x,
          top: playerPosition.y,
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-lg shadow-cyan-400/50 animate-pulse-slow">
          <Car className="w-full h-full p-2 text-white" />
        </div>
        {/* Trail effect */}
        <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-30" />
      </div>

      {/* Speed Lines */}
      {gameState === 'playing' && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-0.5 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-pulse"
              style={{
                top: `${20 + i * 15}%`,
                width: `${50 + Math.random() * 30}%`,
                left: `${Math.random() * 20}%`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default GameCanvas