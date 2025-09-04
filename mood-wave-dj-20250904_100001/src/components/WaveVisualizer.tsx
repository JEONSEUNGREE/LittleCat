import { useEffect, useRef } from 'react'
import useMoodStore from '../store/useMoodStore'

const WaveVisualizer: React.FC = () => {
  const { waveData, currentMood, isPlaying, updateWaveData } = useMoodStore()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        updateWaveData()
      }, 100)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, updateWaveData])

  const getMoodGradient = () => {
    switch (currentMood) {
      case 'happy': return 'from-pink-400 to-red-400'
      case 'calm': return 'from-blue-400 to-cyan-400'
      case 'energetic': return 'from-yellow-400 to-orange-400'
      case 'sad': return 'from-indigo-400 to-purple-600'
      default: return 'from-purple-400 to-indigo-500'
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-gray-900 rounded-3xl p-6 shadow-2xl">
        <div className="flex items-end justify-center space-x-1 h-48">
          {waveData.map((height, index) => (
            <div
              key={index}
              className={`
                w-3 sm:w-4 rounded-t-lg bg-gradient-to-t ${getMoodGradient()}
                transition-all duration-200 ease-out
                ${isPlaying ? 'animate-wave' : ''}
              `}
              style={{
                height: `${height}%`,
                animationDelay: `${index * 0.05}s`,
                opacity: isPlaying ? 1 : 0.7
              }}
            />
          ))}
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">
            {isPlaying ? 'Generating mood waves...' : 'Press play to start'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default WaveVisualizer