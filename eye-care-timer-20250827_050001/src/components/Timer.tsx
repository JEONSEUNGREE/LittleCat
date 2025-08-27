import { useEffect, useCallback } from 'react'
import { Play, Pause, RotateCcw, Eye, EyeOff } from 'lucide-react'
import { useEyeCareStore } from '../store/useEyeCareStore'

export const Timer: React.FC = () => {
  const {
    isRunning,
    timeRemaining,
    breakTimeRemaining,
    isOnBreak,
    setIsRunning,
    setTimeRemaining,
    setBreakTimeRemaining,
    setIsOnBreak,
    incrementSessions,
    reset,
    workDuration,
    breakDuration
  } = useEyeCareStore()

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const showNotification = useCallback((title: string, body: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/vite.svg',
        tag: 'eye-care-timer'
      })
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined

    if (isRunning) {
      interval = setInterval(() => {
        if (isOnBreak) {
          setBreakTimeRemaining(Math.max(0, breakTimeRemaining - 1))
          if (breakTimeRemaining <= 1) {
            setIsOnBreak(false)
            setTimeRemaining(workDuration)
            setBreakTimeRemaining(breakDuration)
            showNotification('휴식 종료', '다시 작업을 시작하세요!')
          }
        } else {
          setTimeRemaining(Math.max(0, timeRemaining - 1))
          if (timeRemaining <= 1) {
            setIsOnBreak(true)
            incrementSessions()
            showNotification('휴식 시간!', '20초 동안 20피트(6미터) 거리의 물체를 바라보세요.')
          }
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeRemaining, breakTimeRemaining, isOnBreak, workDuration, breakDuration, 
      setTimeRemaining, setBreakTimeRemaining, setIsOnBreak, incrementSessions, showNotification])

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    reset()
  }

  const progress = isOnBreak 
    ? ((breakDuration - breakTimeRemaining) / breakDuration) * 100
    : ((workDuration - timeRemaining) / workDuration) * 100

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="relative">
        {/* 원형 프로그레스 바 */}
        <div className="relative w-64 h-64 mx-auto">
          <svg className="transform -rotate-90 w-64 h-64">
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-200"
            />
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={754}
              strokeDashoffset={754 - (754 * progress) / 100}
              className={`transition-all duration-1000 ease-linear ${
                isOnBreak ? 'text-green-500' : 'text-blue-500'
              }`}
            />
          </svg>
          
          {/* 타이머 디스플레이 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-6xl font-bold ${isOnBreak ? 'text-green-600' : 'text-blue-600'}`}>
              {formatTime(isOnBreak ? breakTimeRemaining : timeRemaining)}
            </div>
            <div className="mt-2 flex items-center gap-2">
              {isOnBreak ? (
                <>
                  <EyeOff className="w-5 h-5 text-green-600" />
                  <span className="text-green-600 font-medium">휴식 시간</span>
                </>
              ) : (
                <>
                  <Eye className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-600 font-medium">작업 시간</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 컨트롤 버튼 */}
      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={toggleTimer}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium transition-all transform active:scale-95 ${
            isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-5 h-5" />
              일시정지
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              시작
            </>
          )}
        </button>
        
        <button
          onClick={resetTimer}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-500 hover:bg-gray-600 text-white font-medium transition-all transform active:scale-95"
        >
          <RotateCcw className="w-5 h-5" />
          리셋
        </button>
      </div>
    </div>
  )
}