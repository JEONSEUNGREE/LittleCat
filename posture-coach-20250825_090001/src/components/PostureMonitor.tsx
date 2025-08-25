import React, { useEffect, useState } from 'react'
import { Activity, AlertCircle, CheckCircle, XCircle, TrendingUp } from 'lucide-react'
import { usePostureStore } from '../store'

const PostureMonitor: React.FC = () => {
  const {
    isMonitoring,
    postureStatus,
    currentSession,
    startMonitoring,
    stopMonitoring,
    updatePostureStatus,
    addAlert,
    soundEnabled,
    vibrationEnabled,
    alertInterval,
  } = usePostureStore()
  
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [lastAlertTime, setLastAlertTime] = useState(Date.now())
  
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isMonitoring) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1)
        
        // Simulate posture detection (in real app, this would use device sensors)
        const randomPosture = Math.random()
        if (randomPosture < 0.6) {
          updatePostureStatus('good')
        } else if (randomPosture < 0.85) {
          updatePostureStatus('neutral')
        } else {
          updatePostureStatus('bad')
          
          // Check if alert should be triggered
          const now = Date.now()
          if (now - lastAlertTime > alertInterval * 60 * 1000) {
            triggerAlert()
            setLastAlertTime(now)
          }
        }
      }, 1000)
    } else {
      setTimeElapsed(0)
    }
    
    return () => clearInterval(interval)
  }, [isMonitoring, updatePostureStatus, alertInterval, lastAlertTime])
  
  const triggerAlert = () => {
    addAlert()
    
    if (soundEnabled) {
      // Play alert sound (simplified for demo)
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGHzvPTgjMGHm7A7+OZURE')
      audio.play().catch(() => {})
    }
    
    if (vibrationEnabled && 'vibrate' in navigator) {
      navigator.vibrate([200, 100, 200])
    }
  }
  
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }
  
  const getPostureIcon = () => {
    switch (postureStatus) {
      case 'good':
        return <CheckCircle className="w-24 h-24 text-green-400" />
      case 'bad':
        return <XCircle className="w-24 h-24 text-red-400" />
      default:
        return <AlertCircle className="w-24 h-24 text-yellow-400" />
    }
  }
  
  const getPostureMessage = () => {
    switch (postureStatus) {
      case 'good':
        return '자세가 좋아요! 👍'
      case 'bad':
        return '자세를 바르게 해주세요! ⚠️'
      default:
        return '자세를 확인중...'
    }
  }
  
  const getPostureColor = () => {
    switch (postureStatus) {
      case 'good':
        return 'from-green-400 to-green-600'
      case 'bad':
        return 'from-red-400 to-red-600'
      default:
        return 'from-yellow-400 to-yellow-600'
    }
  }
  
  const goodPercentage = currentSession
    ? (currentSession.goodPostureTime / (currentSession.goodPostureTime + currentSession.badPostureTime)) * 100 || 0
    : 0
  
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Activity className="w-8 h-8" />
          자세 모니터링
        </h2>
        {isMonitoring && (
          <div className="text-white font-mono text-lg">
            {formatTime(timeElapsed)}
          </div>
        )}
      </div>
      
      <div className={`relative rounded-2xl p-8 bg-gradient-to-br ${getPostureColor()} transition-all duration-500`}>
        <div className="flex flex-col items-center justify-center">
          <div className="mb-4 animate-pulse-slow">
            {getPostureIcon()}
          </div>
          
          <p className="text-white text-xl font-semibold mb-2">
            {getPostureMessage()}
          </p>
          
          {isMonitoring && currentSession && (
            <div className="mt-4 w-full">
              <div className="flex justify-between text-white/80 text-sm mb-2">
                <span>좋은 자세</span>
                <span>{goodPercentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-white h-full rounded-full transition-all duration-500"
                  style={{ width: `${goodPercentage}%` }}
                />
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4 text-white/90">
                <div className="text-center">
                  <TrendingUp className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-sm">좋은 자세</span>
                  <p className="font-bold">{formatTime(currentSession.goodPostureTime)}</p>
                </div>
                <div className="text-center">
                  <AlertCircle className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-sm">알림</span>
                  <p className="font-bold">{currentSession.alerts}회</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <button
        onClick={isMonitoring ? stopMonitoring : startMonitoring}
        className={`w-full mt-6 py-4 rounded-2xl font-semibold text-lg transition-all transform hover:scale-105 active:scale-95 ${
          isMonitoring
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white'
        }`}
      >
        {isMonitoring ? '모니터링 중지' : '모니터링 시작'}
      </button>
    </div>
  )
}