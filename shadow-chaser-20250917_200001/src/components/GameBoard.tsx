import { useEffect, useRef } from 'react'
import { useGameStore } from '../store/gameStore'
import { Sun, Moon, Target, User } from 'lucide-react'

const GameBoard: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null)
  const {
    isPlaying,
    lightSources,
    shadowObjects,
    targetPosition,
    playerPosition,
    movePlayer
  } = useGameStore()

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying) return

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          movePlayer('up')
          break
        case 'ArrowDown':
        case 's':
        case 'S':
          movePlayer('down')
          break
        case 'ArrowLeft':
        case 'a':
        case 'A':
          movePlayer('left')
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          movePlayer('right')
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isPlaying, movePlayer])

  const handleTouchMove = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (isPlaying) {
      movePlayer(direction)
    }
  }

  const calculateShadow = (light: typeof lightSources[0], shadowObj: typeof shadowObjects[0]) => {
    const dx = shadowObj.position.x - light.position.x
    const dy = shadowObj.position.y - light.position.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const shadowLength = Math.max(100, 300 - distance)
    const shadowAngle = Math.atan2(dy, dx) * (180 / Math.PI)

    return {
      length: shadowLength,
      angle: shadowAngle,
      opacity: Math.max(0.3, 1 - distance / 500)
    }
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div
        ref={gameRef}
        className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-2xl overflow-hidden"
        style={{
          width: '100%',
          aspectRatio: '1',
          maxHeight: '500px'
        }}
      >
        {/* Light Sources */}
        {lightSources.map(light => (
          <div
            key={light.id}
            className="absolute animate-pulse-light"
            style={{
              left: `${(light.position.x / 400) * 100}%`,
              top: `${(light.position.y / 500) * 100}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <Sun className="text-yellow-400" size={32} />
            <div
              className="light-source"
              style={{
                width: `${light.intensity * 2}px`,
                height: `${light.intensity * 2}px`,
                transform: 'translate(-50%, -50%)',
                left: '50%',
                top: '50%'
              }}
            />
          </div>
        ))}

        {/* Shadow Objects */}
        {shadowObjects.map(shadowObj => {
          const shadowEffect = calculateShadow(lightSources[0], shadowObj)
          return (
            <div key={shadowObj.id}>
              {/* Object */}
              <div
                className="absolute bg-gray-700 rounded"
                style={{
                  left: `${(shadowObj.position.x / 400) * 100}%`,
                  top: `${(shadowObj.position.y / 500) * 100}%`,
                  width: `${shadowObj.size.width}px`,
                  height: `${shadowObj.size.height}px`,
                  transform: `translate(-50%, -50%) rotate(${shadowObj.rotation}deg)`
                }}
              />
              {/* Cast Shadow */}
              <div
                className="shadow-object"
                style={{
                  left: `${(shadowObj.position.x / 400) * 100}%`,
                  top: `${(shadowObj.position.y / 500) * 100}%`,
                  width: `${shadowObj.size.width}px`,
                  height: `${shadowEffect.length}px`,
                  transform: `translate(-50%, 0) rotate(${shadowEffect.angle + 90}deg)`,
                  opacity: shadowEffect.opacity,
                  transformOrigin: 'center top'
                }}
              />
            </div>
          )
        })}

        {/* Target Position */}
        <div
          className="absolute animate-pulse"
          style={{
            left: `${(targetPosition.x / 400) * 100}%`,
            top: `${(targetPosition.y / 500) * 100}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Target className="text-green-500" size={30} />
        </div>

        {/* Player */}
        <div
          className="absolute transition-all duration-300 ease-out"
          style={{
            left: `${(playerPosition.x / 400) * 100}%`,
            top: `${(playerPosition.y / 500) * 100}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="bg-blue-500 rounded-full p-2">
            <User className="text-white" size={20} />
          </div>
        </div>

        {/* Mobile Controls Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <button
            className="absolute top-4 left-1/2 transform -translate-x-1/2 pointer-events-auto"
            onClick={() => handleTouchMove('up')}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-3">
              <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-white" />
            </div>
          </button>
          <button
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-auto"
            onClick={() => handleTouchMove('down')}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-3">
              <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[15px] border-t-white" />
            </div>
          </button>
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-auto"
            onClick={() => handleTouchMove('left')}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-3">
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[15px] border-r-white" />
            </div>
          </button>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-auto"
            onClick={() => handleTouchMove('right')}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-3">
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[15px] border-l-white" />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameBoard