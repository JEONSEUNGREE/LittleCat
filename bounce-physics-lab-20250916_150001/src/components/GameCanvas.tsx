import { useEffect, useRef } from 'react'
import { useGameStore } from '../store/gameStore'
import { Target } from 'lucide-react'

const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  
  const {
    ball,
    obstacles,
    targetX,
    targetY,
    isPlaying,
    updateBall,
  } = useGameStore()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw obstacles
      obstacles.forEach((obstacle) => {
        if (obstacle.type === 'wall') {
          ctx.fillStyle = '#6b7280'
        } else if (obstacle.type === 'bouncer') {
          ctx.fillStyle = '#7c3aed'
        } else {
          ctx.fillStyle = '#16a34a'
        }
        
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
        
        // Add pattern for bouncers
        if (obstacle.type === 'bouncer') {
          ctx.strokeStyle = '#a78bfa'
          ctx.lineWidth = 2
          ctx.strokeRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
        }
      })

      // Draw target area
      ctx.beginPath()
      ctx.arc(targetX, targetY, 25, 0, Math.PI * 2)
      ctx.strokeStyle = '#16a34a'
      ctx.lineWidth = 3
      ctx.stroke()
      ctx.fillStyle = 'rgba(22, 163, 74, 0.2)'
      ctx.fill()

      // Draw ball and trail
      if (ball) {
        // Draw trail
        if (ball.trail.length > 1) {
          ctx.beginPath()
          ctx.moveTo(ball.trail[0].x, ball.trail[0].y)
          ball.trail.forEach((point, index) => {
            ctx.lineTo(point.x, point.y)
            ctx.strokeStyle = `rgba(30, 64, 175, ${0.3 * (index / ball.trail.length)})`
            ctx.lineWidth = 1
          })
          ctx.stroke()
        }

        // Draw ball
        ctx.beginPath()
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
        ctx.fillStyle = '#1e40af'
        ctx.fill()
        ctx.strokeStyle = '#1e3a8a'
        ctx.lineWidth = 2
        ctx.stroke()
      }

      // Update physics
      if (isPlaying) {
        updateBall()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight - 100 // Leave space for controls
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [ball, obstacles, targetX, targetY, isPlaying, updateBall])

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 bg-gradient-to-br from-blue-50 to-purple-50"
      />
      <div 
        className="absolute flex items-center justify-center text-green-600"
        style={{ 
          left: targetX - 25, 
          top: targetY - 25,
          width: 50,
          height: 50,
          pointerEvents: 'none'
        }}
      >
        <Target size={24} />
      </div>
    </div>
  )
}

export default GameCanvas