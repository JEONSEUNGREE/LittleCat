import React, { useEffect, useState } from 'react'
import { Play, Pause, RotateCcw, Activity, AlertCircle } from 'lucide-react'
import useBlinkStore from '../store/useBlinkStore'

const BlinkTracker: React.FC = () => {
  const { 
    isTracking, 
    isPaused,
    stats,
    startTracking, 
    stopTracking, 
    togglePause,
    recordBlink,
    updateHealthScore,
    addAlert,
    resetStats
  } = useBlinkStore()
  
  const [sessionDuration, setSessionDuration] = useState(0)
  const [showReminder, setShowReminder] = useState(false)
  
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isTracking && !isPaused) {
      interval = setInterval(() => {
        setSessionDuration(prev => prev + 1)
        
        // Check blink rate every 20 seconds
        if (sessionDuration > 0 && sessionDuration % 20 === 0) {
          updateHealthScore()
          
          if (stats.averageRate < 10) {
            addAlert('Your blink rate is too low! Remember to blink more often.')
            setShowReminder(true)
            setTimeout(() => setShowReminder(false), 5000)
          }
        }
      }, 1000)
    }
    
    return () => clearInterval(interval)
  }, [isTracking, isPaused, sessionDuration, stats.averageRate, updateHealthScore, addAlert])
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  const handleStart = () => {
    startTracking()
    setSessionDuration(0)
  }
  
  const handleStop = () => {
    stopTracking()
    setSessionDuration(0)
  }
  
  const handleReset = () => {
    resetStats()
    setSessionDuration(0)
  }
  
  const simulateBlink = () => {
    recordBlink()
  }
  
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Blink Tracker</h2>
        <Activity className="w-5 h-5 text-blue-500" />
      </div>
      
      {showReminder && (
        <div className="mb-4 p-3 bg-orange-100 border border-orange-300 rounded-lg flex items-center gap-2 animate-fade-in">
          <AlertCircle className="w-5 h-5 text-orange-600" />
          <span className="text-sm text-orange-800">Remember to blink! Look away from the screen for 20 seconds.</span>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Session Time</p>
          <p className="text-2xl font-bold text-gray-800">{formatTime(sessionDuration)}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Total Blinks</p>
          <p className="text-2xl font-bold text-blue-600">{stats.totalBlinks}</p>
        </div>
      </div>
      
      <div className="flex gap-3 mb-4">
        {!isTracking ? (
          <button
            onClick={handleStart}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Play className="w-5 h-5" />
            <span className="font-medium">Start</span>
          </button>
        ) : (
          <>
            <button
              onClick={togglePause}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
              <span className="font-medium">{isPaused ? 'Resume' : 'Pause'}</span>
            </button>
            <button
              onClick={handleStop}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <span className="font-medium">Stop</span>
            </button>
          </>
        )}
        
        <button
          onClick={handleReset}
          className="px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
      
      {isTracking && (
        <button
          onClick={simulateBlink}
          className="w-full py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-lg"
        >
          Record Blink (Tap when you blink)
        </button>
      )}
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-800">
          <strong>Tip:</strong> Healthy blink rate is 15-20 times per minute. Follow the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds.
        </p>
      </div>
    </div>
  )
}

export default BlinkTracker