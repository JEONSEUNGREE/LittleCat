import { useEffect, useRef, useCallback } from 'react'
import { Rocket } from 'lucide-react'
import useGameStore from '../store/gameStore'

const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const lastAsteroidRef = useRef<number>(0)
  
  const {
    isPlaying,
    spaceshipX,
    spaceshipY,
    asteroids,
    updateSpaceship,
    addAsteroid,
    updateAsteroids,
    incrementScore,
    increaseDifficulty,
    endGame,
    difficulty,
    score,
  } = useGameStore()

  const generateAsteroid = useCallback(() => {
    const now = Date.now()
    const spawnDelay = Math.max(500, 2000 - difficulty * 100)
    
    if (now - lastAsteroidRef.current > spawnDelay) {
      const size = 20 + Math.random() * 40
      const asteroid = {
        id: `asteroid-${now}`,
        x: 100,
        y: Math.random() * 90,
        size,
        speed: 0.3 + Math.random() * 0.5 * difficulty,
      }
      addAsteroid(asteroid)
      lastAsteroidRef.current = now
    }
  }, [addAsteroid, difficulty])

  const checkCollision = useCallback(() => {
    const spaceshipSize = 30
    for (const asteroid of asteroids) {
      const dx = spaceshipX - asteroid.x
      const dy = spaceshipY - asteroid.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < (spaceshipSize + asteroid.size) / 2) {
        endGame()
        return true
      }
    }
    return false
  }, [spaceshipX, spaceshipY, asteroids, endGame])

  const gameLoop = useCallback(() => {
    if (!isPlaying) return

    // Update asteroids
    const updatedAsteroids = asteroids
      .map(asteroid => ({
        ...asteroid,
        x: asteroid.x - asteroid.speed,
      }))
      .filter(asteroid => asteroid.x > -10)

    updateAsteroids(updatedAsteroids)

    // Generate new asteroids
    generateAsteroid()

    // Check collisions
    if (checkCollision()) {
      return
    }

    // Update score and difficulty
    if (asteroids.length > 0 && asteroids.some(a => a.x < spaceshipX)) {
      incrementScore()
      if (score > 0 && score % 10 === 0) {
        increaseDifficulty()
      }
    }

    animationRef.current = requestAnimationFrame(gameLoop)
  }, [
    isPlaying,
    asteroids,
    spaceshipX,
    generateAsteroid,
    checkCollision,
    updateAsteroids,
    incrementScore,
    increaseDifficulty,
    score,
  ])

  useEffect(() => {
    if (isPlaying) {
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
  }, [isPlaying, gameLoop])

  const handleMove = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (!canvasRef.current || !isPlaying) return

    const rect = canvasRef.current.getBoundingClientRect()
    let x, y

    if ('touches' in e) {
      x = ((e.touches[0].clientX - rect.left) / rect.width) * 100
      y = ((e.touches[0].clientY - rect.top) / rect.height) * 100
    } else {
      x = ((e.clientX - rect.left) / rect.width) * 100
      y = ((e.clientY - rect.top) / rect.height) * 100
    }

    x = Math.max(5, Math.min(95, x))
    y = Math.max(5, Math.min(95, y))

    updateSpaceship(x, y)
  }, [isPlaying, updateSpaceship])

  return (
    <div
      ref={canvasRef}
      className="relative w-full h-full bg-gradient-to-b from-space-dark to-space-blue overflow-hidden"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onTouchStart={handleMove}
    >
      {/* Stars background */}
      {[...Array(50)].map((_, i) => (
        <div
          key={`star-${i}`}
          className="star"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}

      {/* Spaceship */}
      {isPlaying && (
        <div
          className="spaceship text-star-yellow"
          style={{
            left: `${spaceshipX}%`,
            top: `${spaceshipY}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Rocket size={30} className="rotate-90" />
        </div>
      )}

      {/* Asteroids */}
      {asteroids.map(asteroid => (
        <div
          key={asteroid.id}
          className="asteroid animate-spin-slow"
          style={{
            left: `${asteroid.x}%`,
            top: `${asteroid.y}%`,
            width: `${asteroid.size}px`,
            height: `${asteroid.size}px`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  )
}

export default GameCanvas