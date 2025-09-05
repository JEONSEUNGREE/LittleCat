import { useEffect, useRef, useState } from 'react'
import { usePatternStore } from '../store/patternStore'
import { drawFibonacciSpiral, drawFractalTree, drawGoldenRatio, drawSpiral, drawMandelbrot } from '../utils/patternDrawers'
import { ZoomIn, ZoomOut, RotateCcw, Maximize2 } from 'lucide-react'

const PatternCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const [rotation, setRotation] = useState(0)
  const { 
    currentPattern, 
    animationSpeed, 
    complexity, 
    colorScheme, 
    isAnimating,
    zoom,
    setZoom
  } = usePatternStore()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = Math.min(container.clientHeight, 600)
      }
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let frameCount = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Apply transformations
      ctx.save()
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.scale(zoom, zoom)
      ctx.rotate((rotation * Math.PI) / 180)
      ctx.translate(-canvas.width / 2, -canvas.height / 2)

      // Draw pattern based on selection
      switch (currentPattern) {
        case 'fibonacci':
          drawFibonacciSpiral(ctx, canvas.width, canvas.height, frameCount, complexity, colorScheme)
          break
        case 'fractal':
          drawFractalTree(ctx, canvas.width, canvas.height, frameCount, complexity, colorScheme)
          break
        case 'golden-ratio':
          drawGoldenRatio(ctx, canvas.width, canvas.height, frameCount, complexity, colorScheme)
          break
        case 'spiral':
          drawSpiral(ctx, canvas.width, canvas.height, frameCount, complexity, colorScheme)
          break
        case 'mandelbrot':
          drawMandelbrot(ctx, canvas.width, canvas.height, frameCount, complexity, colorScheme)
          break
      }

      ctx.restore()

      if (isAnimating) {
        frameCount += animationSpeed / 50
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [currentPattern, animationSpeed, complexity, colorScheme, isAnimating, rotation, zoom])

  const handleZoomIn = () => setZoom(Math.min(zoom * 1.2, 5))
  const handleZoomOut = () => setZoom(Math.max(zoom / 1.2, 0.5))
  const handleReset = () => {
    setZoom(1)
    setRotation(0)
  }
  const handleRotate = () => setRotation((prev) => (prev + 45) % 360)

  return (
    <div className="relative h-full min-h-[400px] md:min-h-[600px]">
      <div className="pattern-canvas p-4 h-full">
        <canvas 
          ref={canvasRef}
          className="w-full h-full rounded-lg cursor-crosshair"
          onWheel={(e) => {
            e.preventDefault()
            if (e.deltaY < 0) handleZoomIn()
            else handleZoomOut()
          }}
        />
      </div>
      
      {/* Canvas Controls */}
      <div className="absolute top-6 right-6 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
          title="확대"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
          title="축소"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <button
          onClick={handleRotate}
          className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
          title="회전"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        <button
          onClick={handleReset}
          className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
          title="초기화"
        >
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>

      {/* Zoom Indicator */}
      <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
        <span className="text-xs text-gray-300">Zoom: {Math.round(zoom * 100)}%</span>
      </div>
    </div>
  )
}

export default PatternCanvas