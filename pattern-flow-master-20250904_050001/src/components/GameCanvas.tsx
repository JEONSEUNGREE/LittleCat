import { useRef, useEffect, useState } from 'react'
import { useGameStore } from '../store/gameStore'

export const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [showPattern, setShowPattern] = useState(true)
  
  const {
    currentPattern,
    userPath,
    isDrawing,
    startDrawing,
    addPoint,
    endDrawing,
    gameState
  } = useGameStore()
  
  useEffect(() => {
    if (currentPattern) {
      setShowPattern(true)
      const timer = setTimeout(() => {
        setShowPattern(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [currentPattern])
  
  const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (gameState !== 'playing' || showPattern) return
    
    e.preventDefault()
    startDrawing()
    
    const point = getPointFromEvent(e)
    if (point) addPoint(point)
  }
  
  const handleMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDrawing || gameState !== 'playing') return
    
    e.preventDefault()
    const point = getPointFromEvent(e)
    if (point) addPoint(point)
  }
  
  const handleEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDrawing || gameState !== 'playing') return
    
    e.preventDefault()
    endDrawing()
  }
  
  const getPointFromEvent = (e: React.TouchEvent | React.MouseEvent) => {
    if (!canvasRef.current) return null
    
    const rect = canvasRef.current.getBoundingClientRect()
    let clientX: number, clientY: number
    
    if ('touches' in e) {
      if (e.touches.length === 0) return null
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    }
  }
  
  const renderPath = (points: { x: number; y: number }[], color: string, opacity: number = 1) => {
    if (points.length < 2) return null
    
    const pathData = points.reduce((acc, point, index) => {
      if (index === 0) return `M ${point.x} ${point.y}`
      return `${acc} L ${point.x} ${point.y}`
    }, '')
    
    return (
      <path
        d={pathData}
        stroke={color}
        strokeWidth="4"
        opacity={opacity}
        className="pattern-path"
      />
    )
  }
  
  const renderDots = (points: { x: number; y: number }[], color: string, showNumbers: boolean = false) => {
    return points.map((point, index) => (
      <g key={`dot-${index}`}>
        <circle
          cx={point.x}
          cy={point.y}
          r="12"
          fill={color}
          className={showPattern ? 'animate-pulse' : ''}
        />
        {showNumbers && (
          <text
            x={point.x}
            y={point.y + 5}
            textAnchor="middle"
            fill="white"
            fontSize="14"
            fontWeight="bold"
          >
            {index + 1}
          </text>
        )}
      </g>
    ))
  }
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        ref={canvasRef}
        className="relative bg-white/10 backdrop-blur-md rounded-2xl pattern-canvas"
        style={{ width: '360px', height: '360px' }}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
      >
        <svg
          width="360"
          height="360"
          className="absolute inset-0 pointer-events-none"
        >
          {showPattern && currentPattern && (
            <>
              {renderPath(currentPattern.points, '#fbbf24', 0.8)}
              {renderDots(currentPattern.points, '#f59e0b', true)}
            </>
          )}
          
          {!showPattern && (
            <>
              {currentPattern && renderDots(currentPattern.points, '#6366f1', false)}
              {userPath.length > 0 && renderPath(userPath, '#10b981', 1)}
              {userPath.length > 0 && (
                <circle
                  cx={userPath[userPath.length - 1].x}
                  cy={userPath[userPath.length - 1].y}
                  r="8"
                  fill="#10b981"
                  className="glow-effect"
                />
              )}
            </>
          )}
        </svg>
        
        {showPattern && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/70 text-white px-6 py-3 rounded-lg animate-pulse">
              <p className="text-lg font-bold">패턴을 기억하세요!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}