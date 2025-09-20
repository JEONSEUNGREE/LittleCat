import { useEffect, useRef, useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { Lightbulb, RotateCw, Move } from 'lucide-react'

const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [selectedLight, setSelectedLight] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  
  const {
    lightSources,
    gameObjects,
    goal,
    updateLightAngle,
    updateLightPosition,
    toggleLight,
    checkWinCondition
  } = useGameStore()
  
  useEffect(() => {
    if (goal?.completed) {
      setTimeout(() => {
        if (checkWinCondition()) {
          // Victory animation or notification
        }
      }, 100)
    }
  }, [goal, checkWinCondition])
  
  const handleLightClick = (lightId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedLight === lightId) {
      setSelectedLight(null)
    } else {
      setSelectedLight(lightId)
    }
  }
  
  const handleLightToggle = (lightId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    toggleLight(lightId)
  }
  
  const handleAngleChange = (lightId: string, delta: number) => {
    const light = lightSources.find(l => l.id === lightId)
    if (light) {
      const newAngle = (light.angle + delta + 360) % 360
      updateLightAngle(lightId, newAngle)
    }
  }
  
  const handleCanvasClick = () => {
    setSelectedLight(null)
  }
  
  const handleTouchStart = (lightId: string) => (e: React.TouchEvent) => {
    e.preventDefault()
    setSelectedLight(lightId)
    setIsDragging(true)
  }
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !selectedLight || !canvasRef.current) return
    
    const rect = canvasRef.current.getBoundingClientRect()
    const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100
    const y = ((e.touches[0].clientY - rect.top) / rect.height) * 100
    
    updateLightPosition(selectedLight, 
      Math.max(10, Math.min(90, x)), 
      Math.max(10, Math.min(40, y))
    )
  }
  
  const handleTouchEnd = () => {
    setIsDragging(false)
  }
  
  const renderShadow = (light: typeof lightSources[0], obj: typeof gameObjects[0]) => {
    if (!light.active) return null
    
    const dx = obj.x - light.x
    const dy = obj.y - light.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const shadowLength = Math.min(distance * 2, 100)
    const shadowAngle = Math.atan2(dy, dx) * (180 / Math.PI)
    
    return (
      <div
        key={`shadow-${light.id}-${obj.id}`}
        className="absolute bg-black opacity-60 transition-all duration-300"
        style={{
          left: `${obj.x}%`,
          top: `${obj.y}%`,
          width: `${obj.width * 1.5}%`,
          height: `${shadowLength}%`,
          transform: `translate(-50%, 0) rotate(${shadowAngle + 90}deg)`,
          transformOrigin: 'center top',
          filter: `blur(${distance / 10}px)`,
        }}
      />
    )
  }
  
  return (
    <div 
      ref={canvasRef}
      className="relative w-full h-full bg-gradient-to-b from-shadow-dark to-shadow-gray overflow-hidden"
      onClick={handleCanvasClick}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Shadows Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {lightSources.map(light => 
          gameObjects.map(obj => renderShadow(light, obj))
        )}
      </div>
      
      {/* Light Sources */}
      {lightSources.map(light => (
        <div
          key={light.id}
          className={`absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
            selectedLight === light.id ? 'z-20' : 'z-10'
          }`}
          style={{
            left: `${light.x}%`,
            top: `${light.y}%`,
          }}
        >
          {/* Light beam visualization */}
          {light.active && (
            <div
              className="absolute w-2 h-32 bg-gradient-to-b from-light-beam to-transparent opacity-30"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, 0) rotate(${light.angle}deg)`,
                transformOrigin: 'center top',
              }}
            />
          )}
          
          {/* Light source button */}
          <button
            className={`relative w-full h-full rounded-full flex items-center justify-center transition-all ${
              light.active 
                ? 'bg-light-beam glow-effect' 
                : 'bg-shadow-light border-2 border-gray-600'
            } ${selectedLight === light.id ? 'ring-4 ring-light-glow' : ''}`}
            onClick={(e) => handleLightClick(light.id, e)}
            onTouchStart={handleTouchStart(light.id)}
          >
            <Lightbulb 
              className={`w-6 h-6 ${light.active ? 'text-shadow-dark' : 'text-gray-500'}`}
            />
          </button>
          
          {/* Control panel for selected light */}
          {selectedLight === light.id && (
            <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-shadow-light rounded-lg p-2 flex gap-2 shadow-xl">
              <button
                className="p-2 bg-shadow-gray rounded hover:bg-shadow-dark transition-colors"
                onClick={() => handleAngleChange(light.id, -15)}
              >
                <RotateCw className="w-4 h-4 text-light-beam transform -scale-x-100" />
              </button>
              <button
                className="p-2 bg-shadow-gray rounded hover:bg-shadow-dark transition-colors"
                onClick={(e) => handleLightToggle(light.id, e)}
              >
                <Lightbulb className="w-4 h-4 text-light-beam" />
              </button>
              <button
                className="p-2 bg-shadow-gray rounded hover:bg-shadow-dark transition-colors"
                onClick={() => handleAngleChange(light.id, 15)}
              >
                <RotateCw className="w-4 h-4 text-light-beam" />
              </button>
            </div>
          )}
        </div>
      ))}
      
      {/* Game Objects */}
      {gameObjects.map(obj => (
        <div
          key={obj.id}
          className="absolute shadow-effect transition-all duration-300"
          style={{
            left: `${obj.x}%`,
            top: `${obj.y}%`,
            width: `${obj.width}%`,
            height: `${obj.height}%`,
            transform: `translate(-50%, -50%) rotate(${obj.rotation}deg)`,
          }}
        >
          {obj.shape === 'rectangle' && (
            <div className="w-full h-full bg-gray-700 rounded" />
          )}
          {obj.shape === 'circle' && (
            <div className="w-full h-full bg-gray-700 rounded-full" />
          )}
          {obj.shape === 'triangle' && (
            <div 
              className="w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[50px] border-b-gray-700"
              style={{
                borderLeftWidth: `${obj.width * 2}px`,
                borderRightWidth: `${obj.width * 2}px`,
                borderBottomWidth: `${obj.height * 3}px`,
              }}
            />
          )}
        </div>
      ))}
      
      {/* Target shape indicator */}
      {goal && (
        <div className="absolute bottom-4 right-4 bg-shadow-light/80 rounded-lg p-3">
          <p className="text-light-beam text-sm mb-1">Target:</p>
          <p className="text-white font-bold capitalize">{goal.targetShape}</p>
          {goal.completed && (
            <div className="absolute inset-0 bg-green-500/20 rounded-lg animate-pulse" />
          )}
        </div>
      )}
    </div>
  )
}

export default GameCanvas