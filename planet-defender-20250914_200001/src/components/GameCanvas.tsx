import { useEffect, useRef, useCallback } from 'react'
import { useGameStore } from '../store/gameStore'
import { gameEngine } from '../utils/gameEngine'

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)
  
  const {
    gameState,
    enemies,
    projectiles,
    explosions,
    cannonAngle,
    setCannonAngle,
    addProjectile,
    updateEnemies,
    updateProjectiles,
    addEnemy,
    addExplosion,
    removeExplosion,
    updateScore,
    decreaseLives,
    nextWave,
    wave
  } = useGameStore()

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!canvasRef.current || gameState !== 'playing') return
    
    const rect = canvasRef.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const x = e.clientX - rect.left - centerX
    const y = e.clientY - rect.top - centerY
    
    const angle = Math.atan2(y, x)
    setCannonAngle(angle)
  }, [gameState, setCannonAngle])

  const handlePointerDown = useCallback((e: PointerEvent) => {
    e.preventDefault()
    if (gameState !== 'playing') return
    
    const projectile = gameEngine.createProjectile(cannonAngle)
    addProjectile(projectile)
  }, [gameState, cannonAngle, addProjectile])

  const gameLoop = useCallback((timestamp: number) => {
    if (!canvasRef.current) return
    
    const deltaTime = timestamp - lastTimeRef.current
    lastTimeRef.current = timestamp
    
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    const width = canvasRef.current.width
    const height = canvasRef.current.height
    
    // Clear canvas
    ctx.fillStyle = 'rgba(10, 14, 39, 0.2)'
    ctx.fillRect(0, 0, width, height)
    
    // Draw stars
    gameEngine.drawStars(ctx, width, height)
    
    // Draw planet
    gameEngine.drawPlanet(ctx, width / 2, height / 2)
    
    // Draw cannon
    gameEngine.drawCannon(ctx, width / 2, height / 2, cannonAngle)
    
    if (gameState === 'playing') {
      // Spawn enemies
      const shouldSpawn = gameEngine.shouldSpawnEnemy(timestamp, wave)
      if (shouldSpawn) {
        const enemy = gameEngine.createEnemy(wave, width, height)
        addEnemy(enemy)
      }
      
      // Update and draw enemies
      const updatedEnemies = gameEngine.updateEnemies(enemies, width / 2, height / 2, deltaTime)
      updateEnemies(updatedEnemies)
      updatedEnemies.forEach(enemy => {
        gameEngine.drawEnemy(ctx, enemy)
      })
      
      // Update and draw projectiles
      const updatedProjectiles = gameEngine.updateProjectiles(projectiles, deltaTime)
      updateProjectiles(updatedProjectiles)
      updatedProjectiles.forEach(projectile => {
        gameEngine.drawProjectile(ctx, projectile)
      })
      
      // Check collisions
      const collisions = gameEngine.checkCollisions(updatedProjectiles, updatedEnemies, width / 2, height / 2)
      
      collisions.destroyedEnemies.forEach(enemy => {
        updateScore(enemy.type === 'asteroid' ? 100 : enemy.type === 'ship' ? 200 : 300)
        addExplosion(gameEngine.createExplosion(enemy.x, enemy.y))
      })
      
      if (collisions.hitPlanet.length > 0) {
        decreaseLives()
        collisions.hitPlanet.forEach(enemy => {
          addExplosion(gameEngine.createExplosion(enemy.x, enemy.y))
        })
      }
      
      updateEnemies(collisions.remainingEnemies)
      updateProjectiles(collisions.remainingProjectiles)
      
      // Check wave completion
      if (updatedEnemies.length === 0 && timestamp - lastTimeRef.current > 3000) {
        nextWave()
      }
    }
    
    // Draw explosions
    explosions.forEach(explosion => {
      gameEngine.drawExplosion(ctx, explosion)
      if (explosion.duration <= 0) {
        removeExplosion(explosion.id)
      }
    })
    
    animationRef.current = requestAnimationFrame(gameLoop)
  }, [gameState, enemies, projectiles, explosions, cannonAngle, wave, addEnemy, updateEnemies, updateProjectiles, addProjectile, addExplosion, removeExplosion, updateScore, decreaseLives, nextWave])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (!container) return
      
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    canvas.addEventListener('pointermove', handlePointerMove)
    canvas.addEventListener('pointerdown', handlePointerDown)
    
    animationRef.current = requestAnimationFrame(gameLoop)
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('pointerdown', handlePointerDown)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [handlePointerMove, handlePointerDown, gameLoop])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full touch-none"
      style={{ touchAction: 'none' }}
    />
  )
}