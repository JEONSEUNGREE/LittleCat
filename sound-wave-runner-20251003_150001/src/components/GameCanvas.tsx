import { useEffect, useRef, useState } from 'react'
import { Music, Volume2, Zap } from 'lucide-react'
import useGameStore from '../store/gameStore'

const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const playerPosRef = useRef({ x: 100, y: 200 })
  const [beatPulse, setBeatPulse] = useState(false)
  
  const {
    gameState,
    score,
    lives,
    level,
    soundIntensity,
    rhythm,
    isJumping,
    obstacles,
    wavePoints,
    increaseScore,
    decreaseLife,
    setJumping,
    removeObstacle,
    updateWavePoints,
    setSoundIntensity,
    setRhythm
  } = useGameStore()
  
  useEffect(() => {
    if (gameState !== 'playing') return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    
    let waveOffset = 0
    let jumpVelocity = 0
    const gravity = 0.8
    const jumpPower = -15
    
    const gameLoop = () => {
      ctx.fillStyle = '#0f0e17'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Draw sound waves
      const newWavePoints = []
      ctx.strokeStyle = `rgba(255, 137, 6, ${0.3 + soundIntensity * 0.7})`
      ctx.lineWidth = 3
      ctx.beginPath()
      
      for (let i = 0; i < 50; i++) {
        const x = (canvas.width / 50) * i
        const baseY = canvas.height * 0.6
        const amplitude = 50 + soundIntensity * 100
        const frequency = 0.05 + rhythm * 0.02
        const y = baseY + Math.sin((i + waveOffset) * frequency) * amplitude
        
        newWavePoints.push(y)
        
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      
      ctx.stroke()
      updateWavePoints(newWavePoints)
      
      // Update player physics
      if (isJumping && jumpVelocity === 0) {
        jumpVelocity = jumpPower
      }
      
      jumpVelocity += gravity
      playerPosRef.current.y += jumpVelocity
      
      // Ground collision
      const playerGroundIndex = Math.floor((playerPosRef.current.x / canvas.width) * 50)
      const groundLevel = newWavePoints[Math.min(playerGroundIndex, newWavePoints.length - 1)] || canvas.height * 0.6
      
      if (playerPosRef.current.y > groundLevel - 30) {
        playerPosRef.current.y = groundLevel - 30
        jumpVelocity = 0
        setJumping(false)
      }
      
      // Draw player
      ctx.fillStyle = '#ff8906'
      ctx.shadowBlur = 20
      ctx.shadowColor = '#ff8906'
      ctx.fillRect(playerPosRef.current.x - 15, playerPosRef.current.y - 15, 30, 30)
      ctx.shadowBlur = 0
      
      // Draw obstacles
      obstacles.forEach((obstacle) => {
        const obstacleX = canvas.width - obstacle.position
        
        if (obstacle.type === 'spike') {
          ctx.fillStyle = '#e53170'
          ctx.beginPath()
          ctx.moveTo(obstacleX, groundLevel)
          ctx.lineTo(obstacleX - 15, groundLevel - obstacle.height)
          ctx.lineTo(obstacleX + 15, groundLevel - obstacle.height)
          ctx.closePath()
          ctx.fill()
        } else if (obstacle.type === 'wave') {
          ctx.strokeStyle = '#f25f4c'
          ctx.lineWidth = 5
          ctx.beginPath()
          ctx.arc(obstacleX, groundLevel - obstacle.height, 20, 0, Math.PI * 2)
          ctx.stroke()
        }
        
        // Collision detection
        if (
          Math.abs(playerPosRef.current.x - obstacleX) < 30 &&
          Math.abs(playerPosRef.current.y - (groundLevel - obstacle.height)) < 30
        ) {
          decreaseLife()
          removeObstacle(obstacle.id)
        }
        
        // Remove off-screen obstacles
        if (obstacleX < -50) {
          removeObstacle(obstacle.id)
          increaseScore(10)
        }
      })
      
      waveOffset += 0.5 + rhythm * 2
      
      // Simulate rhythm changes
      const rhythmVariation = Math.sin(Date.now() * 0.001) * 0.5 + 0.5
      setSoundIntensity(rhythmVariation)
      setRhythm(rhythmVariation)
      
      // Beat pulse effect
      if (rhythmVariation > 0.8) {
        setBeatPulse(true)
        setTimeout(() => setBeatPulse(false), 100)
      }
      
      animationRef.current = requestAnimationFrame(gameLoop)
    }
    
    gameLoop()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [gameState, isJumping, obstacles, decreaseLife, increaseScore, removeObstacle, 
      setJumping, setSoundIntensity, setRhythm, updateWavePoints, soundIntensity, rhythm])
  
  return (
    <div className="relative w-full h-full bg-game-dark rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ imageRendering: 'crisp-edges' }}
      />
      
      <div className="absolute top-4 left-4 flex items-center gap-4">
        <div className="flex items-center gap-2 bg-black/50 px-3 py-1 rounded-lg">
          <Zap className="w-4 h-4 text-game-primary" />
          <span className="font-bold">{score}</span>
        </div>
        
        <div className="flex items-center gap-2 bg-black/50 px-3 py-1 rounded-lg">
          <span className="text-red-500">❤️</span>
          <span className="font-bold">{lives}</span>
        </div>
        
        <div className="flex items-center gap-2 bg-black/50 px-3 py-1 rounded-lg">
          <span className="text-game-accent">Lv</span>
          <span className="font-bold">{level}</span>
        </div>
      </div>
      
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <Volume2 className={`w-6 h-6 ${beatPulse ? 'text-game-primary animate-pulse-beat' : 'text-gray-500'}`} />
        <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-game-primary to-game-accent transition-all duration-100"
            style={{ width: `${soundIntensity * 100}%` }}
          />
        </div>
      </div>
      
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <Music className="w-5 h-5 text-game-secondary" />
        <span className="text-sm font-medium">리듬: {(rhythm * 100).toFixed(0)}%</span>
      </div>
    </div>
  )
}

export default GameCanvas