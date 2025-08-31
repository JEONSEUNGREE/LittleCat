import { useEffect, useRef } from 'react'
import { useGameStore } from '../store/gameStore'
import { Target, Snowflake, Flame } from 'lucide-react'

const GameBoard = () => {
  const { 
    towers, 
    enemies, 
    selectedTower, 
    placeTower, 
    isPaused,
    spawnEnemy,
    damageEnemy,
    loseLife
  } = useGameStore()
  
  const boardRef = useRef<HTMLDivElement>(null)
  const GRID_SIZE = 10
  const GRID_HEIGHT = 8

  // Path for enemies
  const path = [
    { x: 0, y: 4 },
    { x: 3, y: 4 },
    { x: 3, y: 1 },
    { x: 6, y: 1 },
    { x: 6, y: 6 },
    { x: 9, y: 6 }
  ]

  useEffect(() => {
    if (isPaused) return

    // Enemy spawn interval
    const spawnInterval = setInterval(() => {
      if (Math.random() < 0.3) {
        spawnEnemy()
      }
    }, 2000)

    // Enemy movement
    const moveInterval = setInterval(() => {
      useGameStore.setState((state) => ({
        enemies: state.enemies.map(enemy => {
          // Simple movement along x-axis for demo
          const newX = enemy.x + 0.2
          
          // Remove enemy if it reaches the end
          if (newX >= 9) {
            loseLife()
            return null
          }
          
          return { ...enemy, x: newX }
        }).filter(Boolean) as typeof state.enemies
      }))
    }, 100)

    // Tower shooting
    const shootInterval = setInterval(() => {
      towers.forEach(tower => {
        enemies.forEach(enemy => {
          const distance = Math.sqrt(
            Math.pow(tower.x - enemy.x, 2) + Math.pow(tower.y - enemy.y, 2)
          )
          
          if (distance <= tower.range) {
            damageEnemy(enemy.id, tower.damage)
          }
        })
      })
    }, 1000)

    return () => {
      clearInterval(spawnInterval)
      clearInterval(moveInterval)
      clearInterval(shootInterval)
    }
  }, [isPaused, towers, enemies])

  const handleCellClick = (x: number, y: number) => {
    if (!selectedTower) return
    
    // Check if position is valid (not on path and not occupied)
    const isOnPath = path.some(p => Math.floor(p.x) === x && p.y === y)
    const isOccupied = towers.some(t => t.x === x && t.y === y)
    
    if (!isOnPath && !isOccupied) {
      placeTower(x, y, selectedTower as any)
    }
  }

  const getTowerIcon = (type: string) => {
    switch (type) {
      case 'basic':
        return <Target className="w-full h-full text-green-400" />
      case 'ice':
        return <Snowflake className="w-full h-full text-blue-400" />
      case 'fire':
        return <Flame className="w-full h-full text-red-400" />
      default:
        return null
    }
  }

  return (
    <div 
      ref={boardRef}
      className="relative bg-gradient-to-br from-green-800 to-green-900 rounded-lg p-2 aspect-[10/8]"
    >
      {/* Grid */}
      <div className="game-grid w-full h-full">
        {Array.from({ length: GRID_HEIGHT }).map((_, y) =>
          Array.from({ length: GRID_SIZE }).map((_, x) => {
            const isPath = path.some(p => Math.floor(p.x) === x && p.y === y)
            const tower = towers.find(t => t.x === x && t.y === y)
            
            return (
              <div
                key={`${x}-${y}`}
                className={`
                  relative cursor-pointer transition-all duration-200
                  ${isPath ? 'bg-yellow-700' : 'bg-green-600 hover:bg-green-500'}
                  ${tower ? 'cursor-not-allowed' : ''}
                  border border-black/20
                `}
                onClick={() => handleCellClick(x, y)}
              >
                {tower && (
                  <div className="absolute inset-0 flex items-center justify-center p-1">
                    {getTowerIcon(tower.type)}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Enemies */}
      {enemies.map(enemy => (
        <div
          key={enemy.id}
          className="absolute w-8 h-8 transition-all duration-100"
          style={{
            left: `${(enemy.x / GRID_SIZE) * 100}%`,
            top: `${(enemy.y / GRID_HEIGHT) * 100}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="w-full h-full bg-red-600 rounded-full border-2 border-black relative">
            {/* HP Bar */}
            <div className="absolute -top-2 left-0 right-0 h-1 bg-gray-800 rounded">
              <div 
                className="h-full bg-red-400 rounded transition-all"
                style={{ width: `${(enemy.hp / enemy.maxHp) * 100}%` }}
              />
            </div>
          </div>
        </div>
      ))}

      {/* Tower Range Indicators */}
      {towers.map(tower => (
        <div
          key={`range-${tower.id}`}
          className="absolute pointer-events-none opacity-20"
          style={{
            left: `${(tower.x / GRID_SIZE) * 100}%`,
            top: `${(tower.y / GRID_HEIGHT) * 100}%`,
            width: `${(tower.range * 2 / GRID_SIZE) * 100}%`,
            height: `${(tower.range * 2 / GRID_HEIGHT) * 100}%`,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            border: '2px dashed white'
          }}
        />
      ))}
    </div>
  )
}

export default GameBoard