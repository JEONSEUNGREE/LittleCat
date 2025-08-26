import React, { useEffect, useState } from 'react'
import { Clock, X } from 'lucide-react'
import { useSoundStore } from '../store/soundStore'

const timerPresets = [15, 30, 45, 60, 90, 120]

export const SleepTimer: React.FC = () => {
  const { sleepTimer, setSleepTimer, isPlaying } = useSoundStore()
  const [remainingTime, setRemainingTime] = useState<number | null>(null)
  const [showTimerMenu, setShowTimerMenu] = useState(false)

  useEffect(() => {
    if (sleepTimer && isPlaying) {
      const timer = sleepTimer * 60 * 1000 // Convert to milliseconds
      const startTime = Date.now()
      setRemainingTime(timer)

      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime
        const remaining = Math.max(0, timer - elapsed)
        setRemainingTime(remaining)

        if (remaining === 0) {
          setSleepTimer(null)
          clearInterval(interval)
        }
      }, 1000)

      return () => clearInterval(interval)
    } else {
      setRemainingTime(null)
    }
  }, [sleepTimer, isPlaying, setSleepTimer])

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleSetTimer = (minutes: number) => {
    setSleepTimer(minutes)
    setShowTimerMenu(false)
  }

  return (
    <div className="bg-night-700/50 backdrop-blur-lg rounded-3xl p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-bold text-white">수면 타이머</h2>
        </div>
        {sleepTimer && (
          <button
            onClick={() => setSleepTimer(null)}
            className="p-1 text-night-400 hover:text-red-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {remainingTime !== null ? (
        <div className="text-center py-4">
          <div className="text-3xl font-bold text-purple-400 mb-2">
            {formatTime(remainingTime)}
          </div>
          <p className="text-sm text-night-300">남은 시간</p>
        </div>
      ) : (
        <>
          {!showTimerMenu ? (
            <button
              onClick={() => setShowTimerMenu(true)}
              className="w-full py-3 bg-purple-600/20 hover:bg-purple-600/30 rounded-xl text-purple-400 transition-colors"
            >
              타이머 설정
            </button>
          ) : (
            <div className="animate-fade-in">
              <p className="text-sm text-night-300 mb-3">타이머 시간 선택 (분)</p>
              <div className="grid grid-cols-3 gap-2">
                {timerPresets.map((minutes) => (
                  <button
                    key={minutes}
                    onClick={() => handleSetTimer(minutes)}
                    className="py-2 px-3 bg-night-600 hover:bg-night-500 rounded-lg text-white text-sm transition-colors"
                  >
                    {minutes}분
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowTimerMenu(false)}
                className="w-full mt-3 py-2 text-night-400 hover:text-night-300 text-sm transition-colors"
              >
                취소
              </button>
            </div>
          )}
        </>
      )}

      {sleepTimer && !isPlaying && (
        <p className="text-xs text-night-400 text-center mt-3">
          재생 시작 시 타이머가 활성화됩니다
        </p>
      )}
    </div>
  )
}