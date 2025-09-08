import { useEffect, useRef } from 'react'

interface VisualizerProps {
  isPlaying: boolean
  activeLoops: string[]
}

const Visualizer: React.FC<VisualizerProps> = ({ isPlaying, activeLoops }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    if (!canvasRef.current) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let time = 0
    const bars = 32
    const barWidth = canvas.offsetWidth / bars

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.2)'
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      if (isPlaying && activeLoops.length > 0) {
        const gradient = ctx.createLinearGradient(0, 0, canvas.offsetWidth, 0)
        gradient.addColorStop(0, '#FF10F0')
        gradient.addColorStop(0.5, '#00FFF0')
        gradient.addColorStop(1, '#39FF14')
        
        ctx.fillStyle = gradient

        for (let i = 0; i < bars; i++) {
          const height = Math.sin(time * 0.01 + i * 0.5) * 30 + 
                         Math.random() * 20 + 
                         (activeLoops.length * 10)
          
          const x = i * barWidth + barWidth * 0.1
          const y = canvas.offsetHeight / 2 - height / 2
          const width = barWidth * 0.8
          
          ctx.fillRect(x, y, width, Math.abs(height))
          ctx.fillRect(x, canvas.offsetHeight / 2, width, Math.abs(height))
        }
      } else {
        // Static visualization when not playing
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0, canvas.offsetHeight / 2)
        
        for (let i = 0; i < canvas.offsetWidth; i++) {
          const y = canvas.offsetHeight / 2 + Math.sin(i * 0.02 + time * 0.01) * 20
          ctx.lineTo(i, y)
        }
        
        ctx.stroke()
      }

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
  }, [isPlaying, activeLoops])

  return (
    <div className="relative w-full h-32 bg-black/30 rounded-xl overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
      {isPlaying && activeLoops.length > 0 && (
        <div className="absolute top-2 right-2 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-green-500 font-medium">LIVE</span>
        </div>
      )}
    </div>
  )
}

export default Visualizer