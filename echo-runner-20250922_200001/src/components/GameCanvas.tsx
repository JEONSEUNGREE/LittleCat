import { useEffect, useRef } from 'react'
import { useGameStore } from '../store/gameStore'
import { Music, Music2 } from 'lucide-react'

export const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)
  const obstacleTimerRef = useRef<number>(0)
  
  const {
    gameState,
    playerY,
    obstacles,
    soundWaves,
    score,
    lives,
    level,
    updateGame,
    jump,
    increaseScore,
    addObstacle,
  } = useGameStore()
  
  // Handle jump input
  useEffect(() => {
    const handleInput = (e: KeyboardEvent | MouseEvent | TouchEvent) => {
      if (gameState !== 'playing') return
      
      if (
        e.type === 'keydown' && (e as KeyboardEvent).code === 'Space' ||
        e.type === 'mousedown' ||
        e.type === 'touchstart'
      ) {
        e.preventDefault()
        jump()
      }
    }
    
    window.addEventListener('keydown', handleInput)
    window.addEventListener('mousedown', handleInput)
    window.addEventListener('touchstart', handleInput, { passive: false })
    
    return () => {
      window.removeEventListener('keydown', handleInput)
      window.removeEventListener('mousedown', handleInput)
      window.removeEventListener('touchstart', handleInput)
    }
  }, [gameState, jump])
  
  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return
    
    const gameLoop = (timestamp: number) => {
      const deltaTime = timestamp - lastTimeRef.current
      lastTimeRef.current = timestamp
      
      // Update game state
      updateGame(deltaTime)
      
      // Generate obstacles
      obstacleTimerRef.current += deltaTime
      if (obstacleTimerRef.current > 2000 - (level * 100)) {
        obstacleTimerRef.current = 0
        const types = ['spike', 'wall', 'gap'] as const
        const type = types[Math.floor(Math.random() * types.length)]
        
        const obstacle = {
          id: `obs-${Date.now()}`,
          x: window.innerWidth,
          y: type === 'gap' ? 340 : 260,
          width: type === 'wall' ? 60 : 40,
          height: type === 'gap' ? 60 : 40,
          type,
        }
        
        addObstacle(obstacle)
      }
      
      // Increase score
      increaseScore(1)
      
      animationFrameRef.current = requestAnimationFrame(gameLoop)
    }
    
    animationFrameRef.current = requestAnimationFrame(gameLoop)
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [gameState, level, updateGame, addObstacle, increaseScore])
  
  return (
    <div ref={canvasRef} className="relative flex-1 overflow-hidden">
      {/* Background sound waves */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex gap-2 opacity-20">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="sound-wave w-3 h-32 bg-gradient-to-t from-echo-blue to-echo-purple rounded-full"
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Game HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
          <div className="text-sm text-gray-400">Score</div>
          <div className="text-2xl font-bold">{score}</div>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
            <div className="text-sm text-gray-400">Level</div>
            <div className="text-xl font-bold">{level}</div>
          </div>
          
          <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
            <div className="text-sm text-gray-400">Lives</div>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <Music
                  key={i}
                  size={20}
                  className={i < lives ? 'text-echo-pink' : 'text-gray-600'}
                  fill={i < lives ? 'currentColor' : 'none'}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Player */}
      <div
        className="absolute w-10 h-10 bg-gradient-to-br from-echo-blue to-echo-purple rounded-full glow transition-all duration-100"
        style={{
          left: '100px',
          top: `${playerY}px`,
          transform: 'translateX(-50%) translateY(-50%)',
        }}
      >
        <Music2 className="w-full h-full p-2" />
      </div>
      
      {/* Obstacles */}
      {obstacles.map(obstacle => (
        <div
          key={obstacle.id}
          className={`absolute ${
            obstacle.type === 'spike' ? 'bg-red-500' :
            obstacle.type === 'wall' ? 'bg-orange-500' :
            'bg-transparent border-4 border-yellow-500'
          } rounded`}
          style={{
            left: `${obstacle.x}px`,
            top: `${obstacle.y}px`,
            width: `${obstacle.width}px`,
            height: `${obstacle.height}px`,
          }}
        />
      ))}
      
      {/* Sound waves effects */}
      {soundWaves.map(wave => (
        <div
          key={wave.id}
          className="absolute border-2 border-echo-blue rounded-full pointer-events-none"
          style={{
            left: `${wave.x}px`,
            top: `${wave.y}px`,
            width: `${wave.radius * 2}px`,
            height: `${wave.radius * 2}px`,
            opacity: wave.opacity,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      
      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-echo-darker to-transparent">
        <div className="absolute top-0 left-0 right-0 h-2 bg-echo-blue/30" />
      </div>
      
      {/* Instructions */}
      {gameState === 'playing' && score < 50 && (
        <div className="absolute bottom-48 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
          <div className="text-sm text-gray-400">탭하여 점프!</div>
        </div>
      )}
    </div>
  )
}