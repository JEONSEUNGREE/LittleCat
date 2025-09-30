import { useEffect, useCallback } from 'react'
import { Play, Pause, Square, Brain, Target } from 'lucide-react'
import { useFocusStore } from '../store/useFocusStore'

export const Timer: React.FC = () => {
  const {
    currentSession,
    isRunning,
    timeLeft,
    updateTimeLeft,
    pauseSession,
    resumeSession,
    endSession
  } = useFocusStore()

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }, [])

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return

    const interval = setInterval(() => {
      const newTime = timeLeft - 1
      updateTimeLeft(newTime)
      
      if (newTime === 0) {
        // Auto end session
        const productivity = Math.floor(Math.random() * 30) + 70 // Simulated AI analysis
        endSession(productivity)
        
        // Show notification (mobile vibration simulation)
        if ('vibrate' in navigator) {
          navigator.vibrate([200, 100, 200])
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, timeLeft, updateTimeLeft, endSession])

  const handleEndSession = () => {
    const productivity = Math.floor(Math.random() * 30) + 70 // Simulated AI analysis
    endSession(productivity)
  }

  const progressPercentage = currentSession
    ? ((currentSession.duration * 60 - timeLeft) / (currentSession.duration * 60)) * 100
    : 0

  const circumference = 2 * Math.PI * 120
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference

  if (!currentSession) {
    return (
      <div className="glass-effect rounded-3xl p-8 text-center text-white">
        <Brain className="w-16 h-16 mx-auto mb-4 text-white/80" />
        <h2 className="text-2xl font-bold mb-2">준비 완료</h2>
        <p className="text-white/70">새로운 포커스 세션을 시작하세요</p>
      </div>
    )
  }

  return (
    <div className="glass-effect rounded-3xl p-6 sm:p-8">
      <div className="flex flex-col items-center">
        {/* Task Name */}
        <div className="flex items-center gap-2 mb-6">
          <Target className="w-5 h-5 text-white/80" />
          <h3 className="text-lg sm:text-xl font-semibold text-white">
            {currentSession.taskName}
          </h3>
        </div>

        {/* Circular Timer */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 mb-8">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="50%"
              cy="50%"
              r="120"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="50%"
              cy="50%"
              r="120"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-linear"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Timer Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-5xl sm:text-6xl font-bold text-white mb-2">
              {formatTime(timeLeft)}
            </div>
            <div className="text-white/60 text-sm">
              {Math.round(progressPercentage)}% 완료
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-4">
          {isRunning ? (
            <button
              onClick={pauseSession}
              className="glass-effect px-6 py-3 rounded-full flex items-center gap-2 text-white hover:bg-white/20 transition-all"
            >
              <Pause className="w-5 h-5" />
              <span>일시정지</span>
            </button>
          ) : (
            <button
              onClick={resumeSession}
              className="glass-effect px-6 py-3 rounded-full flex items-center gap-2 text-white hover:bg-white/20 transition-all"
            >
              <Play className="w-5 h-5" />
              <span>계속하기</span>
            </button>
          )}
          
          <button
            onClick={handleEndSession}
            className="glass-effect px-6 py-3 rounded-full flex items-center gap-2 text-white hover:bg-white/20 transition-all"
          >
            <Square className="w-5 h-5" />
            <span>종료</span>
          </button>
        </div>
      </div>
    </div>
  )
}