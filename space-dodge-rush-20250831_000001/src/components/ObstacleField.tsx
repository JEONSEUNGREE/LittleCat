import { useEffect, useRef } from 'react'
import { Circle, Triangle, Square } from 'lucide-react'
import useGameStore from '../store/gameStore'

export default function ObstacleField() {
  const { 
    obstacles, 
    addObstacle, 
    updateObstacles, 
    shipPosition,
    loseLife,
    incrementScore,
    isPlaying,
    isPaused,
    level,
    gameSpeed
  } = useGameStore()
  
  const animationRef = useRef<number>()
  const lastObstacleTime = useRef<number>(0)
  
  const checkCollision = () => {
    obstacles.forEach(obstacle => {
      const shipX = shipPosition.x
      const shipY = shipPosition.y
      const shipSize = 3 // Ship size in percentage
      
      const obstacleLeft = obstacle.x - obstacle.width / 2
      const obstacleRight = obstacle.x + obstacle.width / 2
      const obstacleTop = obstacle.y - obstacle.height / 2
      const obstacleBottom = obstacle.y + obstacle.height / 2
      
      const shipLeft = shipX - shipSize
      const shipRight = shipX + shipSize
      const shipTop = shipY - shipSize
      const shipBottom = shipY + shipSize
      
      if (
        shipLeft < obstacleRight &&
        shipRight > obstacleLeft &&
        shipTop < obstacleBottom &&
        shipBottom > obstacleTop
      ) {
        loseLife()
        // Remove collided obstacle
        useGameStore.getState().removeObstacle(obstacle.id)
      }
    })
  }
  
  const generateObstacle = () => {
    const types: ('asteroid' | 'comet' | 'debris')[] = ['asteroid', 'comet', 'debris']
    const type = types[Math.floor(Math.random() * types.length)]
    
    const obstacle = {
      id: `${Date.now()}_${Math.random()}`,
      x: Math.random() * 90 + 5,
      y: -5,
      width: type === 'asteroid' ? 8 : type === 'comet' ? 6 : 4,
      height: type === 'asteroid' ? 8 : type === 'comet' ? 6 : 4,
      speed: type === 'comet' ? 1.5 : type === 'debris' ? 2 : 1,
      type
    }
    
    addObstacle(obstacle)
  }
  
  const gameLoop = (timestamp: number) => {
    if (!isPlaying || isPaused) return
    
    // Generate obstacles
    const obstacleInterval = Math.max(500, 2000 - level * 200)
    if (timestamp - lastObstacleTime.current > obstacleInterval) {
      generateObstacle()
      lastObstacleTime.current = timestamp
    }
    
    // Update positions
    updateObstacles()
    
    // Check collisions
    checkCollision()
    
    // Score points for dodging
    obstacles.forEach(obstacle => {
      if (obstacle.y > 95) {
        incrementScore(10 * level)
        useGameStore.getState().removeObstacle(obstacle.id)
      }
    })
    
    animationRef.current = requestAnimationFrame(gameLoop)
  }
  
  useEffect(() => {
    if (isPlaying && !isPaused) {
      animationRef.current = requestAnimationFrame(gameLoop)
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, isPaused, level, gameSpeed])
  
  const renderObstacle = (obstacle: typeof obstacles[0]) => {
    const animationDuration = 5 / (obstacle.speed * gameSpeed)
    
    switch(obstacle.type) {
      case 'asteroid':
        return (
          <Circle 
            className="text-gray-400 fill-gray-600 neon-glow animate-spin-slow"
            size={40}
          />
        )
      case 'comet':
        return (
          <Triangle 
            className="text-neon-pink fill-pink-600 neon-glow"
            size={32}
          />
        )
      case 'debris':
        return (
          <Square 
            className="text-neon-yellow fill-yellow-600 neon-glow"
            size={24}
          />
        )
    }
  }
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      {obstacles.map(obstacle => (
        <div
          key={obstacle.id}
          className="obstacle"
          style={{
            left: `${obstacle.x}%`,
            top: `${obstacle.y}%`,
            transform: 'translate(-50%, -50%)',
            animationDuration: `${5 / (obstacle.speed * gameSpeed)}s`
          }}
        >
          {renderObstacle(obstacle)}
        </div>
      ))}
    </div>
  )
}