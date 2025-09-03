import React, { useEffect } from 'react'
import { Play, Pause, Square, Brain, Coffee } from 'lucide-react'
import { useTimerStore } from '../store/useTimerStore'

export const Timer: React.FC = () => {
  const {
    isRunning,
    isPaused,
    currentTime,
    targetTime,
    sessionType,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    tick,
    calculateOptimalBreak,
  } = useTimerStore()

  useEffect(() => {
    if (isRunning && !isPaused) {
      const interval = setInterval(tick, 1000)
      return () => clearInterval(interval)
    }
  }, [isRunning, isPaused, tick])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = targetTime > 0 ? (currentTime / targetTime) * 100 : 0
  const circumference = 2 * Math.PI * 120

  const handleStart = (type: 'work' | 'break') => {
    const duration = type === 'work' ? 25 * 60 : calculateOptimalBreak()
    startTimer(duration, type)
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative w-72 h-72 md:w-80 md:h-80">
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx="50%"
            cy="50%"
            r="120"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50%"
            cy="50%"
            r="120"
            stroke={sessionType === 'work' ? '#60a5fa' : '#34d399'}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (progress / 100) * circumference}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-white text-6xl md:text-7xl font-bold mb-2">
            {formatTime(targetTime - currentTime)}
          </div>
          <div className="text-white/80 text-lg flex items-center gap-2">
            {sessionType === 'work' ? (
              <>
                <Brain className="w-5 h-5" />
                <span>Focus Time</span>
              </>
            ) : (
              <>
                <Coffee className="w-5 h-5" />
                <span>Break Time</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        {!isRunning ? (
          <>
            <button
              onClick={() => handleStart('work')}
              className="glass px-6 py-3 rounded-full text-white hover:bg-white/20 transition flex items-center gap-2"
            >
              <Brain className="w-5 h-5" />
              <span>Start Focus</span>
            </button>
            <button
              onClick={() => handleStart('break')}
              className="glass px-6 py-3 rounded-full text-white hover:bg-white/20 transition flex items-center gap-2"
            >
              <Coffee className="w-5 h-5" />
              <span>Take Break</span>
            </button>
          </>
        ) : (
          <>
            {isPaused ? (
              <button
                onClick={resumeTimer}
                className="glass px-6 py-3 rounded-full text-white hover:bg-white/20 transition flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                <span>Resume</span>
              </button>
            ) : (
              <button
                onClick={pauseTimer}
                className="glass px-6 py-3 rounded-full text-white hover:bg-white/20 transition flex items-center gap-2"
              >
                <Pause className="w-5 h-5" />
                <span>Pause</span>
              </button>
            )}
            <button
              onClick={stopTimer}
              className="glass px-6 py-3 rounded-full text-white hover:bg-white/20 transition flex items-center gap-2"
            >
              <Square className="w-5 h-5" />
              <span>Stop</span>
            </button>
          </>
        )}
      </div>
    </div>
  )
}