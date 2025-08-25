import React, { useEffect } from 'react'
import { Clock, Play, Pause, Square } from 'lucide-react'
import { useMeetingStore } from '../store'

const MeetingTimer: React.FC = () => {
  const {
    meetingTitle,
    totalMeetingTime,
    elapsedTime,
    isRunning,
    isPaused,
    startMeeting,
    pauseMeeting,
    stopMeeting,
    tick
  } = useMeetingStore()

  useEffect(() => {
    const interval = setInterval(() => {
      tick()
    }, 1000)
    
    return () => clearInterval(interval)
  }, [tick])

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const progress = (elapsedTime / totalMeetingTime) * 100
  const remainingTime = Math.max(0, totalMeetingTime - elapsedTime)
  
  const getProgressColor = () => {
    if (progress < 50) return 'bg-green-500'
    if (progress < 75) return 'bg-yellow-500'
    if (progress < 90) return 'bg-orange-500'
    return 'bg-red-500'
  }

  return (
    <div className="glass-effect rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Clock className="w-6 h-6" />
          {meetingTitle}
        </h2>
      </div>
      
      {/* Circular Progress */}
      <div className="relative w-48 h-48 mx-auto mb-6">
        <svg className="w-48 h-48 transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="url(#gradient)"
            strokeWidth="12"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 88}`}
            strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="gradient">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold text-white">
            {formatTime(elapsedTime)}
          </div>
          <div className="text-sm text-white/70">
            남은 시간: {formatTime(remainingTime)}
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div 
            className={`h-full ${getProgressColor()} transition-all duration-500`}
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-white/70">
          <span>0:00</span>
          <span>{formatTime(totalMeetingTime)}</span>
        </div>
      </div>
      
      {/* Control Buttons */}
      <div className="flex gap-3 justify-center">
        {!isRunning ? (
          <button
            onClick={startMeeting}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <Play className="w-5 h-5" />
            시작
          </button>
        ) : (
          <>
            <button
              onClick={pauseMeeting}
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
              {isPaused ? '재개' : '일시정지'}
            </button>
            <button
              onClick={stopMeeting}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <Square className="w-5 h-5" />
              종료
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default MeetingTimer