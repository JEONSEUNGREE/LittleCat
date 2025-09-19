import { useEffect, useRef } from 'react'
import useHeartStore from '../store/useHeartStore'

const HeartVisualization: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const { currentBPM, isTracking, readings } = useHeartStore()
  
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
    
    let particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      life: number
      size: number
      hue: number
    }> = []
    
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      
      if (isTracking) {
        const centerX = canvas.offsetWidth / 2
        const centerY = canvas.offsetHeight / 2
        const radius = Math.min(centerX, centerY) * 0.3
        
        // Create heart-shaped particles
        const t = Date.now() * 0.001
        const scale = 1 + (currentBPM - 60) / 100
        
        for (let i = 0; i < 3; i++) {
          const angle = (t * (60 / currentBPM) + i * Math.PI * 2 / 3) % (Math.PI * 2)
          const x = centerX + Math.cos(angle) * radius * scale
          const y = centerY + Math.sin(angle * 2) * radius * scale * 0.8
          
          particles.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 2,
            vy: -Math.random() * 2,
            life: 1,
            size: Math.random() * 4 + 2,
            hue: 340 + Math.random() * 40
          })
        }
        
        // Draw heart pulse wave
        ctx.strokeStyle = `hsla(340, 70%, 50%, 0.3)`
        ctx.lineWidth = 2
        ctx.beginPath()
        
        readings.slice(-50).forEach((reading, index) => {
          const x = (index / 50) * canvas.offsetWidth
          const y = centerY + (reading.bpm - 70) * 2
          
          if (index === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        })
        
        ctx.stroke()
      }
      
      // Update and draw particles
      particles = particles.filter((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vy += 0.05
        particle.life -= 0.01
        
        if (particle.life <= 0) return false
        
        ctx.fillStyle = `hsla(${particle.hue}, 70%, 50%, ${particle.life})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2)
        ctx.fill()
        
        return true
      })
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [currentBPM, isTracking, readings])
  
  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full bg-black rounded-2xl"
      style={{ width: '100%', height: '100%' }}
    />
  )
}

export default HeartVisualization