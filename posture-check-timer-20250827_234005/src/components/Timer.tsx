import { useEffect } from 'react'
import { Play, Pause, RotateCcw, Bell, Volume2 } from 'lucide-react'
import { usePostureStore } from '../store'

export function Timer() {
  const {
    timeRemaining,
    isActive,
    interval,
    notificationsEnabled,
    soundEnabled,
    startTimer,
    pauseTimer,
    resetTimer,
    toggleNotifications,
    toggleSound,
    recordCheck,
    tick
  } = usePostureStore()

  useEffect(() => {
    let intervalId: number | null = null
    
    if (isActive && timeRemaining > 0) {
      intervalId = setInterval(() => {
        tick()
      }, 1000)
    } else if (timeRemaining === 0 && isActive) {
      recordCheck()
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [isActive, timeRemaining, tick, recordCheck])

  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60
  const progress = ((interval * 60 - timeRemaining) / (interval * 60)) * 100

  return (
    <div className="glass rounded-3xl p-8 shadow-2xl">
      <div className="flex flex-col items-center">
        <div className="relative w-64 h-64 mb-8">
          <svg className="transform -rotate-90 w-64 h-64">
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="16"
              fill="none"
            />
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="white"
              strokeWidth="16"
              fill="none"
              strokeDasharray={754}
              strokeDashoffset={754 - (754 * progress) / 100}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-6xl font-bold text-white tabular-nums">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <div className="text-white/80 mt-2">
              {isActive ? '자세 체크까지' : '타이머 정지'}
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={isActive ? pauseTimer : startTimer}
            className="bg-white/20 hover:bg-white/30 text-white p-4 rounded-full transition-all transform hover:scale-110"
          >
            {isActive ? <Pause size={28} /> : <Play size={28} />}
          </button>
          
          <button
            onClick={resetTimer}
            className="bg-white/20 hover:bg-white/30 text-white p-4 rounded-full transition-all transform hover:scale-110"
          >
            <RotateCcw size={28} />
          </button>
        </div>

        <div className="flex gap-4">
          <button
            onClick={toggleNotifications}
            className={`p-3 rounded-xl transition-all ${
              notificationsEnabled 
                ? 'bg-white/30 text-white' 
                : 'bg-white/10 text-white/50'
            }`}
          >
            <Bell size={20} />
          </button>
          
          <button
            onClick={toggleSound}
            className={`p-3 rounded-xl transition-all ${
              soundEnabled 
                ? 'bg-white/30 text-white' 
                : 'bg-white/10 text-white/50'
            }`}
          >
            <Volume2 size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}