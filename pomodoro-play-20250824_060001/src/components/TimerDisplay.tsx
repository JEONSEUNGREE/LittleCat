import React from 'react'
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react'
import { usePomodoroStore } from '../store/usePomodoroStore'

export const TimerDisplay: React.FC = () => {
  const {
    timeLeft,
    isRunning,
    isPaused,
    currentSession,
    sessionCount,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    skipSession
  } = usePomodoroStore()

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const sessionColors = {
    work: 'from-red-400 to-red-600',
    shortBreak: 'from-green-400 to-green-600',
    longBreak: 'from-blue-400 to-blue-600'
  }

  const sessionLabels = {
    work: '집중 시간',
    shortBreak: '짧은 휴식',
    longBreak: '긴 휴식'
  }

  const progressPercentage = (() => {
    const store = usePomodoroStore.getState()
    let totalTime = store.workDuration
    
    if (currentSession === 'shortBreak') {
      totalTime = store.shortBreakDuration
    } else if (currentSession === 'longBreak') {
      totalTime = store.longBreakDuration
    }
    
    return ((totalTime - timeLeft) / totalTime) * 100
  })()

  const handlePlayPause = () => {
    if (!isRunning && !isPaused) {
      startTimer()
    } else if (isRunning) {
      pauseTimer()
    } else if (isPaused) {
      resumeTimer()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8">
      <div className="mb-4">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          세션 #{sessionCount + 1}
        </span>
      </div>
      
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 mb-8">
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-200 dark:text-gray-700"
          />
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progressPercentage / 100)}`}
            className={`text-gradient transition-all duration-1000 ${
              currentSession === 'work' ? 'text-red-500' : 
              currentSession === 'shortBreak' ? 'text-green-500' : 'text-blue-500'
            }`}
            strokeLinecap="round"
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`text-lg font-medium mb-2 bg-gradient-to-r ${sessionColors[currentSession]} bg-clip-text text-transparent`}>
            {sessionLabels[currentSession]}
          </div>
          <div className="text-6xl sm:text-7xl font-bold text-gray-800 dark:text-white tabular-nums">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={resetTimer}
          className="p-4 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Reset timer"
        >
          <RotateCcw className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </button>
        
        <button
          onClick={handlePlayPause}
          className={`p-5 rounded-full bg-gradient-to-r ${sessionColors[currentSession]} text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all`}
          aria-label={isRunning ? 'Pause timer' : 'Start timer'}
        >
          {isRunning ? (
            <Pause className="w-8 h-8" />
          ) : (
            <Play className="w-8 h-8 ml-1" />
          )}
        </button>
        
        <button
          onClick={skipSession}
          className="p-4 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Skip session"
        >
          <SkipForward className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </div>
  )
}