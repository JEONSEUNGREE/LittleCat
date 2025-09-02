import React, { useEffect, useRef, useState } from 'react'
import { Activity, Pause, Play, Target } from 'lucide-react'
import useCadenceStore from '../store/useCadenceStore'

const CadenceTracker: React.FC = () => {
  const {
    targetCadence,
    currentCadence,
    isTracking,
    stepCount,
    sessionTime,
    setCurrentCadence,
    startTracking,
    stopTracking,
    incrementSteps,
    updateSessionTime,
    saveSession
  } = useCadenceStore()

  const [tapTimes, setTapTimes] = useState<number[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const sessionStartRef = useRef<number>(0)

  useEffect(() => {
    if (isTracking) {
      sessionStartRef.current = Date.now()
      intervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - sessionStartRef.current) / 1000)
        updateSessionTime(elapsed)
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isTracking, updateSessionTime])

  const handleTap = () => {
    if (!isTracking) return

    const now = Date.now()
    incrementSteps()
    
    setTapTimes(prev => {
      const newTaps = [...prev, now].filter(t => now - t < 10000)
      
      if (newTaps.length >= 2) {
        const intervals = []
        for (let i = 1; i < newTaps.length; i++) {
          intervals.push(newTaps[i] - newTaps[i - 1])
        }
        const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length
        const cadence = Math.round(60000 / avgInterval)
        setCurrentCadence(cadence)
      }
      
      return newTaps
    })
  }

  const handleStartStop = () => {
    if (isTracking) {
      const avgCadence = currentCadence || 0
      const quality = Math.max(0, Math.min(100, 100 - Math.abs(avgCadence - targetCadence)))
      
      if (stepCount > 0) {
        saveSession({
          id: Date.now().toString(),
          date: new Date(),
          averageCadence: avgCadence,
          duration: sessionTime,
          steps: stepCount,
          quality
        })
      }
      
      stopTracking()
      setTapTimes([])
      setCurrentCadence(0)
    } else {
      startTracking()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getCadenceColor = () => {
    const diff = Math.abs(currentCadence - targetCadence)
    if (diff <= 5) return 'text-green-500'
    if (diff <= 10) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Activity className="text-primary-500" size={24} />
          Cadence Tracker
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Target size={16} />
          Target: {targetCadence} SPM
        </div>
      </div>

      <div className="text-center mb-6">
        <div className={`text-6xl font-bold mb-2 transition-colors ${isTracking ? getCadenceColor() : 'text-gray-400'}`}>
          {currentCadence || '--'}
        </div>
        <div className="text-sm text-gray-500">Steps Per Minute</div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <div className="text-2xl font-semibold text-gray-800">{stepCount}</div>
          <div className="text-xs text-gray-500">Steps</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <div className="text-2xl font-semibold text-gray-800">{formatTime(sessionTime)}</div>
          <div className="text-xs text-gray-500">Duration</div>
        </div>
      </div>

      <button
        onClick={handleStartStop}
        className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all transform active:scale-95 ${
          isTracking ? 'bg-red-500 hover:bg-red-600' : 'bg-primary-500 hover:bg-primary-600'
        }`}
      >
        {isTracking ? (
          <span className="flex items-center justify-center gap-2">
            <Pause size={20} />
            Stop Session
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <Play size={20} />
            Start Session
          </span>
        )}
      </button>

      {isTracking && (
        <button
          onClick={handleTap}
          className="w-full mt-4 h-32 bg-primary-100 hover:bg-primary-200 rounded-xl font-semibold text-primary-700 transition-all transform active:scale-95 animate-pulse-slow"
        >
          Tap with Each Step
        </button>
      )}
    </div>
  )
}

export default CadenceTracker