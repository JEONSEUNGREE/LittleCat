import React, { useState, useEffect, useCallback } from 'react'
import { useGameStore, TimeEvent } from '../store/gameStore'
import { 
  Rewind, 
  FastForward, 
  Play, 
  Pause,
  RotateCcw,
  Clock,
  Zap,
  Target
} from 'lucide-react'

const GameBoard: React.FC = () => {
  const { 
    currentLevel,
    isPlaying, 
    isPaused,
    isReversing,
    timelinePosition,
    timeline,
    moves,
    levels,
    pauseGame,
    resumeGame,
    reverseTime,
    forwardTime,
    addTimeEvent,
    resetLevel,
    completeLevel
  } = useGameStore()

  const [grid, setGrid] = useState<number[][]>(
    Array(8).fill(null).map(() => Array(8).fill(0))
  )
  const [selectedCell, setSelectedCell] = useState<{x: number, y: number} | null>(null)
  const [effects, setEffects] = useState<{x: number, y: number, type: string}[]>([])

  const level = levels.find(l => l.id === currentLevel)

  // Handle cell interaction
  const handleCellClick = useCallback((x: number, y: number) => {
    if (!isPlaying || isPaused) return

    // Add visual effect
    setEffects(prev => [...prev, { x, y, type: 'pulse' }])
    setTimeout(() => {
      setEffects(prev => prev.filter(e => !(e.x === x && e.y === y)))
    }, 500)

    // Update grid
    const newGrid = [...grid]
    newGrid[y][x] = (newGrid[y][x] + 1) % 4 // Cycle through states 0-3
    setGrid(newGrid)

    // Record time event
    addTimeEvent({
      type: 'interact',
      position: { x, y },
      data: { previousValue: grid[y][x], newValue: newGrid[y][x] }
    })

    setSelectedCell({ x, y })

    // Check for chain reactions
    checkChainReactions(x, y, newGrid[y][x])

    // Check win condition
    checkWinCondition(newGrid)
  }, [isPlaying, isPaused, grid, addTimeEvent])

  const checkChainReactions = (x: number, y: number, value: number) => {
    // Create chain reactions to adjacent cells if value is 3
    if (value === 3) {
      const adjacents = [
        { x: x - 1, y }, { x: x + 1, y },
        { x, y: y - 1 }, { x, y: y + 1 }
      ]
      
      adjacents.forEach(({ x: nx, y: ny }) => {
        if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
          setTimeout(() => {
            setEffects(prev => [...prev, { x: nx, y: ny, type: 'chain' }])
            const newGrid = [...grid]
            if (newGrid[ny][nx] < 3) {
              newGrid[ny][nx]++
              setGrid(newGrid)
              addTimeEvent({
                type: 'trigger',
                position: { x: nx, y: ny },
                data: { cause: 'chain', from: { x, y } }
              })
            }
          }, 200)
        }
      })
    }
  }

  const checkWinCondition = (currentGrid: number[][]) => {
    // Simple win condition: all cells should have value > 0
    const allActivated = currentGrid.every(row => 
      row.every(cell => cell > 0)
    )
    
    if (allActivated) {
      const stars = moves < 15 ? 3 : moves < 25 ? 2 : 1
      setTimeout(() => {
        completeLevel(stars)
      }, 500)
    }
  }

  // Apply timeline changes when reversing
  useEffect(() => {
    if (timeline.length > 0) {
      const eventsAtPosition = timeline.filter(e => e.timestamp <= timelinePosition && !e.reversed)
      
      // Reset grid and replay events up to current position
      const newGrid = Array(8).fill(null).map(() => Array(8).fill(0))
      
      eventsAtPosition.forEach(event => {
        if (event.type === 'interact' && event.position) {
          const { x, y } = event.position
          newGrid[y][x] = event.data?.newValue || 1
        }
      })
      
      setGrid(newGrid)
    }
  }, [timelinePosition, timeline])

  const getCellColor = (value: number) => {
    switch(value) {
      case 0: return 'bg-slate-700'
      case 1: return 'bg-blue-600'
      case 2: return 'bg-purple-600'
      case 3: return 'bg-pink-600'
      default: return 'bg-slate-700'
    }
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 text-white">
        <div className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-purple-400" />
          <span className="text-sm font-medium">레벨 {currentLevel}: {level?.name}</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-sm">{timelinePosition}/{timeline.length}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm">{moves}</span>
          </div>
        </div>
      </div>

      {/* Game Grid */}
      <div className="flex-1 flex items-center justify-center mb-4">
        <div className={`relative ${isReversing ? 'animate-reverse-pulse' : ''}`}>
          <div className="grid grid-cols-8 gap-1 p-2 bg-slate-800/50 rounded-lg backdrop-blur">
            {grid.map((row, y) => (
              row.map((cell, x) => {
                const hasEffect = effects.some(e => e.x === x && e.y === y)
                const isSelected = selectedCell?.x === x && selectedCell?.y === y
                
                return (
                  <button
                    key={`${x}-${y}`}
                    onClick={() => handleCellClick(x, y)}
                    disabled={!isPlaying || isPaused}
                    className={`
                      w-10 h-10 sm:w-12 sm:h-12 rounded-md transition-all duration-300
                      ${getCellColor(cell)}
                      ${hasEffect ? 'animate-pulse scale-110' : ''}
                      ${isSelected ? 'ring-2 ring-white' : ''}
                      ${isPlaying && !isPaused ? 'hover:scale-105 active:scale-95' : 'opacity-60'}
                      ${effects.some(e => e.x === x && e.y === y && e.type === 'chain') ? 'animate-glitch' : ''}
                    `}
                  >
                    {cell > 0 && (
                      <span className="text-white text-xs font-bold">
                        {cell}
                      </span>
                    )}
                  </button>
                )
              })
            ))}
          </div>
          
          {/* Time distortion effect overlay */}
          {isReversing && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-time-flow" />
            </div>
          )}
        </div>
      </div>

      {/* Timeline Slider */}
      <div className="mb-4 px-2">
        <div className="flex items-center space-x-2">
          <Rewind className="w-4 h-4 text-blue-400" />
          <input
            type="range"
            min="0"
            max={timeline.length}
            value={timelinePosition}
            onChange={(e) => {
              const position = parseInt(e.target.value)
              useGameStore.getState().setTimelinePosition(position)
            }}
            className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(timelinePosition / Math.max(timeline.length, 1)) * 100}%, #475569 ${(timelinePosition / Math.max(timeline.length, 1)) * 100}%, #475569 100%)`
            }}
          />
          <FastForward className="w-4 h-4 text-blue-400" />
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>과거</span>
          <span className="text-purple-400">시간선: {timelinePosition}</span>
          <span>현재</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-3">
        <button
          onClick={reverseTime}
          disabled={timelinePosition === 0}
          className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <Rewind className="w-5 h-5" />
        </button>
        
        <button
          onClick={isPaused ? resumeGame : pauseGame}
          className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 active:scale-95 transition-all"
        >
          {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
        </button>
        
        <button
          onClick={forwardTime}
          disabled={timelinePosition >= timeline.length}
          className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <FastForward className="w-5 h-5" />
        </button>
        
        <button
          onClick={resetLevel}
          className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 active:scale-95 transition-all"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default GameBoard