import { useEffect, useState } from 'react'
import { AlertCircle, Play } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

const WaveController = () => {
  const { wave, nextWave, isPaused, enemies } = useGameStore()
  const [waveTimer, setWaveTimer] = useState(30)
  const [isWaveActive, setIsWaveActive] = useState(false)
  
  useEffect(() => {
    if (isPaused || !isWaveActive) return
    
    const timer = setInterval(() => {
      setWaveTimer((prev) => {
        if (prev <= 1) {
          setIsWaveActive(false)
          nextWave()
          return 30
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [isPaused, isWaveActive, nextWave])
  
  useEffect(() => {
    // Check if all enemies are defeated
    if (isWaveActive && enemies.length === 0 && waveTimer < 28) {
      setIsWaveActive(false)
      setWaveTimer(30)
    }
  }, [enemies, isWaveActive, waveTimer])
  
  const startWave = () => {
    setIsWaveActive(true)
    setWaveTimer(30)
  }
  
  return (
    <div className="bg-gray-800 rounded-lg p-3 mb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
          <span className="text-white font-bold text-sm sm:text-base">
            웨이브 {wave}
          </span>
        </div>
        
        {isWaveActive ? (
          <div className="flex items-center gap-2">
            <div className="text-yellow-400 text-sm">
              남은 시간: {waveTimer}초
            </div>
            <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-yellow-500 transition-all duration-1000"
                style={{ width: `${(waveTimer / 30) * 100}%` }}
              />
            </div>
          </div>
        ) : (
          <button
            onClick={startWave}
            className="pixel-button bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-3 rounded flex items-center gap-1 text-xs sm:text-sm"
          >
            <Play className="w-3 h-3" />
            시작
          </button>
        )}
      </div>
      
      {isWaveActive && (
        <div className="mt-2 text-xs text-gray-400">
          적이 접근 중입니다! 방어 준비를 하세요.
        </div>
      )}
    </div>
  )
}

export default WaveController