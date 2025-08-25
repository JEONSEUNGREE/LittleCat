import { useRef, useEffect } from 'react'
import useStore from '../store/useStore'

const GraphCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { graphPoints, animating, parameters, selectedConcept } = useStore()
  const animationRef = useRef<number>()
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const updateCanvasSize = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      }
    }
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    const draw = () => {
      const width = canvas.width
      const height = canvas.height
      const centerX = width / 2
      const centerY = height / 2
      const scale = Math.min(width, height) / 25

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Draw grid
      ctx.strokeStyle = '#e5e7eb'
      ctx.lineWidth = 1
      ctx.beginPath()
      
      // Vertical lines
      for (let x = -10; x <= 10; x++) {
        const screenX = centerX + x * scale
        ctx.moveTo(screenX, 0)
        ctx.lineTo(screenX, height)
      }
      
      // Horizontal lines
      for (let y = -10; y <= 10; y++) {
        const screenY = centerY - y * scale
        ctx.moveTo(0, screenY)
        ctx.lineTo(width, screenY)
      }
      ctx.stroke()

      // Draw axes
      ctx.strokeStyle = '#6b7280'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(0, centerY)
      ctx.lineTo(width, centerY)
      ctx.moveTo(centerX, 0)
      ctx.lineTo(centerX, height)
      ctx.stroke()

      // Draw axis labels
      ctx.fillStyle = '#374151'
      ctx.font = '12px monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      
      for (let x = -10; x <= 10; x += 5) {
        if (x !== 0) {
          const screenX = centerX + x * scale
          ctx.fillText(x.toString(), screenX, centerY + 5)
        }
      }
      
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      for (let y = -10; y <= 10; y += 5) {
        if (y !== 0) {
          const screenY = centerY - y * scale
          ctx.fillText(y.toString(), centerX + 5, screenY)
        }
      }

      // Draw function
      if (graphPoints.length > 0) {
        let gradient: CanvasGradient
        
        switch (selectedConcept) {
          case 'linear':
            gradient = ctx.createLinearGradient(0, 0, width, height)
            gradient.addColorStop(0, '#3B82F6')
            gradient.addColorStop(1, '#60A5FA')
            break
          case 'quadratic':
            gradient = ctx.createLinearGradient(0, 0, width, height)
            gradient.addColorStop(0, '#10B981')
            gradient.addColorStop(1, '#34D399')
            break
          case 'trigonometric':
            gradient = ctx.createLinearGradient(0, 0, width, height)
            gradient.addColorStop(0, '#8B5CF6')
            gradient.addColorStop(1, '#A78BFA')
            break
          case 'exponential':
            gradient = ctx.createLinearGradient(0, 0, width, height)
            gradient.addColorStop(0, '#F97316')
            gradient.addColorStop(1, '#FB923C')
            break
          default:
            gradient = ctx.createLinearGradient(0, 0, width, height)
            gradient.addColorStop(0, '#3B82F6')
            gradient.addColorStop(1, '#60A5FA')
        }

        ctx.strokeStyle = gradient
        ctx.lineWidth = 3
        ctx.beginPath()
        
        let modifiedPoints = [...graphPoints]
        
        if (animating) {
          timeRef.current += 0.05
          modifiedPoints = graphPoints.map(point => ({
            x: point.x,
            y: point.y + Math.sin(timeRef.current + point.x * 0.5) * 0.3
          }))
        }
        
        modifiedPoints.forEach((point, index) => {
          const screenX = centerX + point.x * scale
          const screenY = centerY - point.y * scale
          
          if (screenY > -50 && screenY < height + 50) {
            if (index === 0) {
              ctx.moveTo(screenX, screenY)
            } else {
              ctx.lineTo(screenX, screenY)
            }
          }
        })
        
        ctx.stroke()

        // Draw dots on key points
        const keyPoints = modifiedPoints.filter((_, i) => i % 4 === 0)
        keyPoints.forEach(point => {
          const screenX = centerX + point.x * scale
          const screenY = centerY - point.y * scale
          
          if (screenY > 0 && screenY < height) {
            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.arc(screenX, screenY, 4, 0, 2 * Math.PI)
            ctx.fill()
          }
        })
      }

      if (animating) {
        animationRef.current = requestAnimationFrame(draw)
      }
    }

    draw()

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [graphPoints, animating, parameters, selectedConcept])

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-96 md:h-[500px]">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">그래프 시각화</h2>
      <div className="relative w-full h-[calc(100%-2rem)]">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ touchAction: 'none' }}
        />
      </div>
    </div>
  )
}

export default GraphCanvas