import { useEffect, useState } from 'react'
import { useBreathStore } from '../store/breathStore'
import { Play, Pause, RotateCcw, Trophy, Timer } from 'lucide-react'

export const Controls: React.FC = () => {
  const { isBreathing, setBreathing, totalSessions, currentStreak, incrementSession, resetSession } = useBreathStore()
  const [sessionTime, setSessionTime] = useState(0)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>

    if (isBreathing) {
      interval = setInterval(() => {
        setSessionTime((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isBreathing])

  const handleToggle = () => {
    if (isBreathing) {
      setBreathing(false)
      if (sessionTime > 30) {
        incrementSession()
      }
    } else {
      setBreathing(true)
      setSessionTime(0)
      resetSession()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleReset = () => {
    setBreathing(false)
    setSessionTime(0)
    resetSession()
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleToggle}
          className={`
            px-8 py-4 rounded-full font-semibold text-lg
            transition-all duration-300 transform hover:scale-105
            ${isBreathing 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-white hover:bg-gray-100 text-breath-dark'
            }
            shadow-xl active:scale-95
          `}
        >
          {isBreathing ? (
            <div className="flex items-center space-x-2">
              <Pause className="w-5 h-5" />
              <span>일시정지</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>시작하기</span>
            </div>
          )}
        </button>

        {(isBreathing || sessionTime > 0) && (
          <button
            onClick={handleReset}
            className="
              px-6 py-4 rounded-full bg-white/20 hover:bg-white/30
              text-white font-semibold transition-all duration-300
              transform hover:scale-105 active:scale-95 backdrop-blur-md
            "
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center">
          <Timer className="w-5 h-5 text-white/70 mx-auto mb-1" />
          <div className="text-2xl font-bold text-white">{formatTime(sessionTime)}</div>
          <div className="text-xs text-white/70">현재 세션</div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center">
          <Trophy className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
          <div className="text-2xl font-bold text-white">{totalSessions}</div>
          <div className="text-xs text-white/70">총 세션</div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center">
          <div className="text-2xl mb-1">🔥</div>
          <div className="text-2xl font-bold text-white">{currentStreak}</div>
          <div className="text-xs text-white/70">연속 기록</div>
        </div>
      </div>
    </div>
  )
}