import { useEffect } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { useTimerStore } from '../store/timerStore'

export const Timer = () => {
  const {
    mode,
    status,
    timeLeft,
    totalTime,
    setStatus,
    decrementTime,
    incrementSessions,
    setMode,
    reset
  } = useTimerStore()

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (status === 'running') {
      interval = setInterval(() => {
        decrementTime()
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [status, decrementTime])

  useEffect(() => {
    if (timeLeft === 0 && status === 'running') {
      setStatus('idle')
      if (mode === 'focus') {
        incrementSessions()
        setMode('shortBreak')
      } else {
        setMode('focus')
      }

      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Focus Flow Timer', {
          body: mode === 'focus' ? '집중 시간 완료! 휴식 시간입니다.' : '휴식 완료! 다시 집중하세요.',
          icon: '/vite.svg'
        })
      }
    }
  }, [timeLeft, status, mode, setStatus, incrementSessions, setMode])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handlePlayPause = () => {
    if (status === 'running') {
      setStatus('paused')
    } else {
      setStatus('running')

      if ('Notification' in window && Notification.permission !== 'granted') {
        Notification.requestPermission()
      }
    }
  }

  const progress = ((totalTime - timeLeft) / totalTime) * 100

  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4">
      <div className="relative w-80 h-80 md:w-96 md:h-96">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="2"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="url(#gradient)"
            strokeWidth="2"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-7xl md:text-8xl font-bold text-white tracking-tight">
            {formatTime(timeLeft)}
          </div>
          <div className="text-lg md:text-xl text-white/70 mt-2 capitalize">
            {mode === 'focus' ? '집중' : mode === 'shortBreak' ? '짧은 휴식' : '긴 휴식'}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handlePlayPause}
          className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-flow-400 to-flow-600 hover:from-flow-500 hover:to-flow-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl active:scale-95"
        >
          {status === 'running' ? (
            <Pause className="w-8 h-8 md:w-10 md:h-10 text-white" />
          ) : (
            <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" />
          )}
        </button>

        <button
          onClick={reset}
          className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center shadow-lg active:scale-95"
        >
          <RotateCcw className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </button>
      </div>
    </div>
  )
}
