import { useEffect, useRef, useState } from 'react'
import { Kanji } from '../store/kanjiStore'

interface KanjiCanvasProps {
  kanji: Kanji | null
  isAnimating: boolean
  onAnimationComplete: () => void
}

const KanjiCanvas = ({ kanji, isAnimating, onAnimationComplete }: KanjiCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentStroke, setCurrentStroke] = useState(0)
  const [isDrawing, setIsDrawing] = useState(false)
  const [userPath, setUserPath] = useState<{ x: number; y: number }[]>([])
  
  useEffect(() => {
    if (isAnimating && kanji) {
      setCurrentStroke(0)
      const animateStrokes = () => {
        let strokeIndex = 0
        const interval = setInterval(() => {
          if (strokeIndex >= kanji.strokes.length) {
            clearInterval(interval)
            onAnimationComplete()
            return
          }
          setCurrentStroke(strokeIndex + 1)
          strokeIndex++
        }, 800)
        return interval
      }
      
      const intervalId = animateStrokes()
      return () => clearInterval(intervalId)
    }
  }, [isAnimating, kanji, onAnimationComplete])
  
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    const touch = e.touches[0]
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      setIsDrawing(true)
      setUserPath([{
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      }])
    }
  }
  
  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault()
    if (!isDrawing) return
    
    const touch = e.touches[0]
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      setUserPath(prev => [...prev, {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      }])
    }
  }
  
  const handleTouchEnd = () => {
    setIsDrawing(false)
  }
  
  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      setIsDrawing(true)
      setUserPath([{
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }])
    }
  }
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return
    
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      setUserPath(prev => [...prev, {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }])
    }
  }
  
  const handleMouseUp = () => {
    setIsDrawing(false)
  }
  
  const clearCanvas = () => {
    setUserPath([])
    setCurrentStroke(0)
  }
  
  if (!kanji) {
    return (
      <div className="kanji-canvas p-8 flex items-center justify-center">
        <p className="text-gray-400">한자를 선택해주세요</p>
      </div>
    )
  }
  
  return (
    <div className="relative">
      <div className="kanji-canvas p-4">
        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
          <svg
            width="400"
            height="400"
            viewBox="0 0 400 400"
            className="w-full h-full"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Grid lines */}
            <defs>
              <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Center lines */}
            <line x1="200" y1="0" x2="200" y2="400" stroke="#d1d5db" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="0" y1="200" x2="400" y2="200" stroke="#d1d5db" strokeWidth="2" strokeDasharray="5,5" />
            
            {/* Kanji strokes */}
            {kanji.strokes.map((stroke, index) => (
              <path
                key={index}
                d={stroke}
                className="stroke-line"
                stroke={index < currentStroke ? '#3b82f6' : '#e5e7eb'}
                strokeWidth="8"
                opacity={index < currentStroke ? 1 : 0.3}
                style={{
                  transition: 'all 0.5s ease-in-out',
                  strokeDasharray: isAnimating && index === currentStroke - 1 ? '1000' : '0',
                  strokeDashoffset: isAnimating && index === currentStroke - 1 ? '0' : '1000',
                  animation: isAnimating && index === currentStroke - 1 ? 'stroke 0.8s ease-in-out forwards' : 'none'
                }}
              />
            ))}
            
            {/* User drawing */}
            {userPath.length > 1 && (
              <path
                d={`M ${userPath[0].x} ${userPath[0].y} ${userPath.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')}`}
                className="stroke-line"
                stroke="#f59e0b"
                strokeWidth="6"
                opacity="0.8"
              />
            )}
          </svg>
          
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            width={400}
            height={400}
          />
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-800">{kanji.character}</p>
            <p className="text-sm text-gray-600 mt-1">{kanji.meaning}</p>
            <p className="text-xs text-gray-500">{kanji.reading}</p>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={clearCanvas}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              지우기
            </button>
            <div className="px-3 py-2 bg-primary-100 text-primary-700 rounded-lg">
              획수: {kanji.strokeCount}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KanjiCanvas