import { useRef, useEffect, useState } from 'react'
import { usePixelStore } from '../store/pixelStore'

export const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cellSize, setCellSize] = useState(20)
  const {
    gridSize,
    pixels,
    currentColor,
    isDrawing,
    setIsDrawing,
    setPixel,
    tool,
    fillArea,
    setCurrentColor,
    saveToHistory
  } = usePixelStore()

  useEffect(() => {
    const updateCellSize = () => {
      const minDimension = Math.min(window.innerWidth - 40, window.innerHeight - 200)
      setCellSize(Math.floor(minDimension / gridSize))
    }
    
    updateCellSize()
    window.addEventListener('resize', updateCellSize)
    return () => window.removeEventListener('resize', updateCellSize)
  }, [gridSize])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = '#475569'
    ctx.lineWidth = 0.5

    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath()
      ctx.moveTo(i * cellSize, 0)
      ctx.lineTo(i * cellSize, gridSize * cellSize)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, i * cellSize)
      ctx.lineTo(gridSize * cellSize, i * cellSize)
      ctx.stroke()
    }

    // Draw pixels
    pixels.forEach((row, y) => {
      row.forEach((color, x) => {
        if (color !== 'transparent') {
          ctx.fillStyle = color
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
        }
      })
    })
  }, [pixels, gridSize, cellSize])

  const getPixelCoords = (e: React.MouseEvent | React.TouchEvent): [number, number] | null => {
    const canvas = canvasRef.current
    if (!canvas) return null

    const rect = canvas.getBoundingClientRect()
    let clientX: number, clientY: number

    if ('touches' in e) {
      if (e.touches.length === 0) return null
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    const x = Math.floor((clientX - rect.left) / cellSize)
    const y = Math.floor((clientY - rect.top) / cellSize)

    if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
      return [x, y]
    }
    return null
  }

  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    const coords = getPixelCoords(e)
    if (!coords) return

    const [x, y] = coords

    switch (tool) {
      case 'pen':
        setPixel(x, y, currentColor)
        break
      case 'eraser':
        setPixel(x, y, 'transparent')
        break
      case 'fill':
        fillArea(x, y)
        saveToHistory()
        break
      case 'eyedropper':
        const pickedColor = pixels[y][x]
        if (pickedColor !== 'transparent') {
          setCurrentColor(pickedColor)
        }
        break
    }
  }

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    setIsDrawing(true)
    handleInteraction(e)
  }

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    if (!isDrawing) return
    if (tool === 'fill' || tool === 'eyedropper') return
    handleInteraction(e)
  }

  const handleEnd = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    if (isDrawing) {
      setIsDrawing(false)
      if (tool === 'pen' || tool === 'eraser') {
        saveToHistory()
      }
    }
  }

  return (
    <div className="relative bg-slate-800 p-4 rounded-lg shadow-2xl">
      <canvas
        ref={canvasRef}
        width={gridSize * cellSize}
        height={gridSize * cellSize}
        className="pixel-grid cursor-crosshair touch-none"
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      />
    </div>
  )
}