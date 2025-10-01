import { useEffect, useRef } from 'react'
import { Zap } from 'lucide-react'
import useGameStore from '../store/gameStore'

const GameCanvas: React.FC = () => {
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)
  const obstacleTimerRef = useRef<number>(0)
  
  const {
    gameState,
    playerLane,
    quantumStates,
    isJumping,
    obstacles,
    updateGame,
    addObstacle,
    moveToLane,
    jump,
    activateQuantumJump
  } = useGameStore()
  
  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      return
    }
    
    const gameLoop = (timestamp: number) => {
      const deltaTime = (timestamp - lastTimeRef.current) / 1000
      lastTimeRef.current = timestamp
      
      // Update game state
      updateGame(deltaTime)
      
      // Add obstacles periodically
      obstacleTimerRef.current += deltaTime
      if (obstacleTimerRef.current > 2) {
        addObstacle()
        obstacleTimerRef.current = 0
      }
      
      animationFrameRef.current = requestAnimationFrame(gameLoop)
    }
    
    animationFrameRef.current = requestAnimationFrame(gameLoop)
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [gameState, updateGame, addObstacle])
  
  // Touch controls
  useEffect(() => {
    let touchStartX = 0
    let touchStartY = 0
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
    }
    
    const handleTouchEnd = (e: TouchEvent) => {
      if (gameState !== 'playing') return
      
      const touchEndX = e.changedTouches[0].clientX
      const touchEndY = e.changedTouches[0].clientY
      
      const diffX = touchEndX - touchStartX
      const diffY = touchStartY - touchEndY
      
      if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal swipe
        if (diffX > 50) {
          // Swipe right
          if (playerLane < 2) moveToLane((playerLane + 1) as 0 | 1 | 2)
        } else if (diffX < -50) {
          // Swipe left
          if (playerLane > 0) moveToLane((playerLane - 1) as 0 | 1 | 2)
        }
      } else {
        // Vertical swipe
        if (diffY > 50) {
          // Swipe up - Jump
          jump()
        } else if (diffY < -50) {
          // Swipe down - Quantum jump
          activateQuantumJump()
        }
      }
    }
    
    const element = gameAreaRef.current
    if (element) {
      element.addEventListener('touchstart', handleTouchStart)
      element.addEventListener('touchend', handleTouchEnd)
      
      return () => {
        element.removeEventListener('touchstart', handleTouchStart)
        element.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [gameState, playerLane, moveToLane, jump, activateQuantumJump])
  
  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return
      
      switch (e.key) {
        case 'ArrowLeft':
          if (playerLane > 0) moveToLane((playerLane - 1) as 0 | 1 | 2)
          break
        case 'ArrowRight':
          if (playerLane < 2) moveToLane((playerLane + 1) as 0 | 1 | 2)
          break
        case 'ArrowUp':
        case ' ':
          jump()
          break
        case 'ArrowDown':
        case 'q':
          activateQuantumJump()
          break
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameState, playerLane, moveToLane, jump, activateQuantumJump])
  
  const getLanePosition = (lane: number) => {
    const positions = ['left-[15%]', 'left-[42%]', 'left-[69%]']
    return positions[lane]
  }
  
  return (
    <div 
      ref={gameAreaRef}
      className="relative w-full h-full overflow-hidden bg-gradient-to-b from-purple-900/20 to-blue-900/20"
    >
      {/* Game lanes */}
      <div className="absolute inset-0">
        <div className="absolute left-[25%] top-0 bottom-0 w-[1px] bg-cyan-500/20"></div>
        <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-cyan-500/20"></div>
        <div className="absolute left-[75%] top-0 bottom-0 w-[1px] bg-cyan-500/20"></div>
      </div>
      
      {/* Player */}
      {quantumStates.length > 0 ? (
        // Show quantum superposition states
        quantumStates.map((qState, index) => (
          <div
            key={index}
            className={`absolute bottom-32 w-12 h-12 transition-all duration-300 ${getLanePosition(qState.lane)}`}
            style={{ opacity: qState.probability }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-quantum-purple via-quantum-blue to-quantum-cyan quantum-glow animate-quantum-pulse"></div>
          </div>
        ))
      ) : (
        // Normal player state
        <div
          className={`absolute bottom-32 w-12 h-12 transition-all duration-300 ${getLanePosition(playerLane)} ${
            isJumping ? '-translate-y-20' : ''
          }`}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-quantum-purple to-quantum-blue quantum-glow">
            <Zap className="w-6 h-6 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      )}
      
      {/* Obstacles */}
      {obstacles.map((obstacle) => (
        <div
          key={obstacle.id}
          className={`absolute w-12 h-12 ${getLanePosition(obstacle.lane)}`}
          style={{ bottom: `${obstacle.position}px` }}
        >
          {obstacle.type === 'block' && (
            <div className="w-full h-full bg-red-600 rounded quantum-border"></div>
          )}
          {obstacle.type === 'spike' && (
            <div className="w-0 h-0 border-l-[24px] border-l-transparent border-r-[24px] border-r-transparent border-b-[48px] border-b-orange-500"></div>
          )}
          {obstacle.type === 'portal' && (
            <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 animate-spin quantum-glow"></div>
          )}
        </div>
      ))}
      
      {/* Touch hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs text-center">
        <p>스와이프: ← → 이동 | ↑ 점프 | ↓ 양자점프</p>
      </div>
    </div>
  )
}

export default GameCanvas