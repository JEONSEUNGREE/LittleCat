import React, { useEffect } from 'react'
import { Heart, Play, Pause, RefreshCw, TrendingUp, Activity } from 'lucide-react'
import useHeartStore from '../store/useHeartStore'

const ControlPanel: React.FC = () => {
  const {
    currentBPM,
    targetBPM,
    isTracking,
    coherenceScore,
    sessionDuration,
    startTracking,
    stopTracking,
    updateBPM,
    addReading,
    clearReadings,
    updateCoherence
  } = useHeartStore()
  
  useEffect(() => {
    if (!isTracking) return
    
    const interval = setInterval(() => {
      // Simulate heart rate with realistic variability
      const variation = Math.sin(Date.now() * 0.001) * 5 + Math.random() * 3 - 1.5
      const newBPM = Math.round(65 + variation)
      const variability = Math.abs(newBPM - currentBPM)
      
      updateBPM(newBPM)
      addReading(newBPM, variability)
      
      // Calculate coherence score based on heart rate variability
      const coherence = Math.max(0, Math.min(100, 100 - variability * 10))
      updateCoherence(coherence)
    }, 1000)
    
    return () => clearInterval(interval)
  }, [isTracking, currentBPM, updateBPM, addReading, updateCoherence])
  
  useEffect(() => {
    if (!isTracking) return
    
    const timer = setInterval(() => {
      useHeartStore.setState((state) => ({
        sessionDuration: state.sessionDuration + 1
      }))
    }, 1000)
    
    return () => clearInterval(timer)
  }, [isTracking])
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  return (
    <div className="bg-gray-900 rounded-2xl p-6 space-y-6">
      {/* Current Heart Rate Display */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Heart className="w-6 h-6 text-red-500 animate-pulse" />
          <span className="text-gray-400 text-sm uppercase tracking-wider">Current BPM</span>
        </div>
        <div className="text-5xl font-bold text-white tabular-nums">
          {currentBPM}
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-purple-500" />
            <span className="text-xs text-gray-400">Coherence</span>
          </div>
          <div className="text-2xl font-semibold text-white">
            {coherenceScore}%
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-4 h-4 text-blue-500" />
            <span className="text-xs text-gray-400">Target</span>
          </div>
          <div className="text-2xl font-semibold text-white">
            {targetBPM}
          </div>
        </div>
      </div>
      
      {/* Session Duration */}
      {isTracking && (
        <div className="bg-gray-800 rounded-lg p-3 text-center">
          <span className="text-xs text-gray-400 block mb-1">Session Duration</span>
          <span className="text-xl font-mono text-white">{formatTime(sessionDuration)}</span>
        </div>
      )}
      
      {/* Control Buttons */}
      <div className="space-y-3">
        <button
          onClick={isTracking ? stopTracking : startTracking}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            isTracking
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isTracking ? (
            <>
              <Pause className="w-5 h-5" />
              Stop Tracking
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              Start Tracking
            </>
          )}
        </button>
        
        <button
          onClick={clearReadings}
          className="w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Reset Session
        </button>
      </div>
      
      {/* Instructions */}
      <div className="text-xs text-gray-400 space-y-1">
        <p>• Place your finger on camera for real tracking</p>
        <p>• Currently showing simulated data</p>
        <p>• Watch the patterns sync with your rhythm</p>
      </div>
    </div>
  )
}

export default ControlPanel