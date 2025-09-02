import React, { useEffect, useRef } from 'react'
import { Play, Pause, SkipForward, Square } from 'lucide-react'
import useFocusStore from '../store/useFocusStore'

const Timer: React.FC = () => {
  const {
    currentSession,
    isRunning,
    currentBlockIndex,
    timeRemaining,
    pauseSession,
    resumeSession,
    nextBlock,
    endSession,
    updateTimeRemaining
  } = useFocusStore()

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        useFocusStore.getState().updateTimeRemaining(timeRemaining - 1)
      }, 1000)
    } else if (timeRemaining === 0 && currentSession) {
      nextBlock()
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeRemaining, currentSession, nextBlock, updateTimeRemaining])

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getProgressPercentage = (): number => {
    if (!currentSession || currentBlockIndex >= currentSession.blocks.length) return 0
    const currentBlock = currentSession.blocks[currentBlockIndex]
    return ((currentBlock.duration - timeRemaining) / currentBlock.duration) * 100
  }

  const currentBlock = currentSession?.blocks[currentBlockIndex]
  const isBreak = currentBlock?.type === 'break'

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          {currentBlock ? (isBreak ? 'Break Time' : 'Focus Time') : 'Ready to Focus'}
        </h2>
        {currentSession && (
          <p className="text-white/70 text-sm">
            Block {currentBlockIndex + 1} of {currentSession.blocks.length}
          </p>
        )}
      </div>

      <div className="relative mb-8">
        <svg className="w-64 h-64 mx-auto transform -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke={isBreak ? '#10b981' : '#3b82f6'}
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 120}`}
            strokeDashoffset={`${2 * Math.PI * 120 * (1 - getProgressPercentage() / 100)}`}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-bold text-white">
            {formatTime(timeRemaining)}
          </span>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        {!currentSession ? (
          <button
            onClick={() => {
              const blocks = useFocusStore.getState().generateSmartBlocks()
              useFocusStore.getState().startSession(blocks)
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 transition-colors"
          >
            <Play size={24} />
          </button>
        ) : (
          <>
            <button
              onClick={isRunning ? pauseSession : resumeSession}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 transition-colors"
            >
              {isRunning ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button
              onClick={nextBlock}
              className="bg-gray-500 hover:bg-gray-600 text-white rounded-full p-4 transition-colors"
            >
              <SkipForward size={24} />
            </button>
            <button
              onClick={endSession}
              className="bg-red-500 hover:bg-red-600 text-white rounded-full p-4 transition-colors"
            >
              <Square size={24} />
            </button>
          </>
        )}
      </div>

      {currentSession && (
        <div className="mt-6 flex justify-center gap-2">
          {currentSession.blocks.map((block, index) => (
            <div
              key={block.id}
              className={`w-3 h-3 rounded-full transition-colors ${
                block.completed
                  ? 'bg-green-400'
                  : index === currentBlockIndex
                  ? block.type === 'break' ? 'bg-green-500' : 'bg-blue-500'
                  : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Timer