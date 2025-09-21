import { useEffect } from 'react'
import { useGameStore, Position } from '../store/gameStore'
import { Sparkles, Flag, Lightbulb, User } from 'lucide-react'

const GameBoard = () => {
  const {
    playerPos,
    lightPos,
    exitPos,
    shadowOrbs,
    collectedOrbs,
    mazeWalls,
    movePlayer
  } = useGameStore()

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault()
          movePlayer('up')
          break
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault()
          movePlayer('down')
          break
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault()
          movePlayer('left')
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault()
          movePlayer('right')
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [movePlayer])

  const calculateShadow = (cellPos: Position): number => {
    const dx = cellPos.x - lightPos.x
    const dy = cellPos.y - lightPos.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    if (distance === 0) return 1
    if (distance <= 2) return 0.8
    if (distance <= 3) return 0.5
    if (distance <= 4) return 0.3
    return 0.1
  }

  const isPlayerAt = (x: number, y: number) => 
    playerPos.x === x && playerPos.y === y

  const isLightAt = (x: number, y: number) => 
    lightPos.x === x && lightPos.y === y

  const isExitAt = (x: number, y: number) => 
    exitPos.x === x && exitPos.y === y

  const getOrbAt = (x: number, y: number) => {
    return shadowOrbs.findIndex(orb => orb.x === x && orb.y === y)
  }

  return (
    <div className="relative p-4">
      <div className="grid grid-cols-10 gap-1 mx-auto" style={{ maxWidth: '500px' }}>
        {Array.from({ length: 10 }, (_, y) => 
          Array.from({ length: 10 }, (_, x) => {
            const shadowLevel = calculateShadow({ x, y })
            const isWall = mazeWalls[y][x]
            const orbIndex = getOrbAt(x, y)
            const isOrbCollected = orbIndex !== -1 && collectedOrbs.includes(orbIndex)
            
            return (
              <div
                key={`${x}-${y}`}
                className={`
                  aspect-square rounded-lg transition-all duration-300 
                  flex items-center justify-center relative overflow-hidden
                  ${isWall 
                    ? 'bg-gray-900 border border-gray-700' 
                    : 'border border-purple-900/30'
                  }
                `}
                style={{
                  backgroundColor: isWall 
                    ? undefined 
                    : `rgba(139, 92, 246, ${shadowLevel * 0.3})`,
                  boxShadow: isWall 
                    ? 'inset 0 0 10px rgba(0,0,0,0.8)' 
                    : `inset 0 0 ${20 * shadowLevel}px rgba(139, 92, 246, ${shadowLevel * 0.5})`
                }}
              >
                {isPlayerAt(x, y) && (
                  <User className="w-6 h-6 text-blue-400 animate-pulse absolute z-30" />
                )}
                
                {isLightAt(x, y) && (
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <Lightbulb className="w-6 h-6 text-yellow-400" />
                    <div className="absolute inset-0 bg-yellow-300 opacity-30 animate-pulse-slow"></div>
                  </div>
                )}
                
                {isExitAt(x, y) && (
                  <Flag className="w-6 h-6 text-green-400 animate-bounce absolute z-10" />
                )}
                
                {orbIndex !== -1 && !isOrbCollected && (
                  <Sparkles className="w-4 h-4 text-purple-300 animate-pulse absolute z-10" />
                )}
                
                {!isWall && (
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-transparent to-black"
                    style={{ opacity: 1 - shadowLevel }}
                  />
                )}
              </div>
            )
          })
        ).flat()}
      </div>
      
      <div className="mt-4 text-center text-xs text-gray-400">
        <p>Light reveals the path • Collect shadow orbs for bonus points</p>
      </div>
    </div>
  )
}

export default GameBoard