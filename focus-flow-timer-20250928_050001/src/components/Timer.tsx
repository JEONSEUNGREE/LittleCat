import { useEffect, useCallback } from 'react'
import { Play, Pause, RotateCcw, Brain, Coffee, Target } from 'lucide-react'
import { useTimerStore } from '../store/timerStore'

export const Timer: React.FC = () => {
  const {
    mode,
    minutes,
    seconds,
    isRunning,
    flowState,
    flowIntensity,
    setTime,
    toggleTimer,
    resetTimer,
    incrementSession,
    updateFlowState
  } = useTimerStore()

  const tick = useCallback(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        incrementSession()
        toggleTimer()
        if (mode === 'focus') {
          updateFlowState('cooldown')
        }
        return
      }
      setTime(minutes - 1, 59)
    } else {
      setTime(minutes, seconds - 1)
    }
    
    const totalSeconds = minutes * 60 + seconds
    const totalDuration = mode === 'focus' ? 25 * 60 : 5 * 60
    const progress = (totalDuration - totalSeconds) / totalDuration
    
    if (mode === 'focus') {
      if (progress < 0.2) updateFlowState('warmup')
      else if (progress < 0.4) updateFlowState('flow')
      else if (progress < 0.8) updateFlowState('peak')
      else updateFlowState('cooldown')
    }
  }, [minutes, seconds, mode, setTime, incrementSession, toggleTimer, updateFlowState])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (isRunning) {
      interval = setInterval(tick, 1000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, tick])

  const formatTime = (m: number, s: number) => {
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const getFlowStateColor = () => {
    switch (flowState) {
      case 'warmup': return 'text-yellow-300'
      case 'flow': return 'text-blue-300'
      case 'peak': return 'text-green-300'
      case 'cooldown': return 'text-purple-300'
      default: return 'text-white'
    }
  }

  const getModeIcon = () => {
    switch (mode) {
      case 'focus': return <Brain className="w-8 h-8" />
      case 'shortBreak': return <Coffee className="w-8 h-8" />
      case 'longBreak': return <Target className="w-8 h-8" />
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl animate-fade-in">
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center space-x-3">
          {getModeIcon()}
          <h2 className="text-2xl font-bold capitalize">
            {mode === 'focus' ? 'Focus Time' : mode === 'shortBreak' ? 'Short Break' : 'Long Break'}
          </h2>
        </div>
        
        {mode === 'focus' && (
          <div className="flex flex-col items-center space-y-2">
            <div className={`text-sm font-medium ${getFlowStateColor()} transition-colors duration-500`}>
              Flow State: {flowState.toUpperCase()}
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-yellow-400 via-blue-400 to-green-400 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${flowIntensity * 100}%` }}
              />
            </div>
          </div>
        )}
        
        <div className={`text-7xl font-mono font-bold ${isRunning ? 'animate-pulse-slow' : ''}`}>
          {formatTime(minutes, seconds)}
        </div>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleTimer}
            className="bg-white/20 hover:bg-white/30 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center space-x-2"
          >
            {isRunning ? (
              <>
                <Pause className="w-6 h-6" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-6 h-6" />
                <span>Start</span>
              </>
            )}
          </button>
          
          <button
            onClick={resetTimer}
            className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center space-x-2"
          >
            <RotateCcw className="w-6 h-6" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  )
}