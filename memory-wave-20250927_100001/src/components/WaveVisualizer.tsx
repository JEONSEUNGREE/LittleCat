import { useEffect, useRef } from 'react'
import useGameStore from '../store/gameStore'

interface WaveVisualizerProps {
  isActive: boolean
  pattern?: Array<{ frequency: number; duration: number }>
}

const WaveVisualizer: React.FC<WaveVisualizerProps> = ({ isActive, pattern }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const { isShowingPattern } = useGameStore()
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    let time = 0
    const animate = () => {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight
      const centerY = height / 2
      
      ctx.strokeStyle = isShowingPattern ? '#fbbf24' : '#a78bfa'
      ctx.lineWidth = 3
      ctx.lineCap = 'round'
      ctx.shadowBlur = 10
      ctx.shadowColor = ctx.strokeStyle
      
      ctx.beginPath()
      
      for (let x = 0; x < width; x += 2) {
        const frequency = isActive ? 0.02 : 0.01
        const amplitude = isActive ? 40 : 20
        const speed = isActive ? 0.05 : 0.02
        
        const y = centerY + Math.sin(x * frequency + time * speed) * amplitude
        
        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      
      ctx.stroke()
      
      time++
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isActive, isShowingPattern])
  
  return (
    <div className="relative w-full h-32 sm:h-40 bg-black/20 rounded-2xl overflow-hidden backdrop-blur-sm">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
      {isShowingPattern && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white text-lg font-semibold animate-pulse">
            Listen Carefully...
          </p>
        </div>
      )}
    </div>
  )
}

export default WaveVisualizer