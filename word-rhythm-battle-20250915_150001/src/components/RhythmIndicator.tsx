import { useEffect, useState } from 'react'

interface RhythmIndicatorProps {
  bpm: number
  isPlaying: boolean
}

const RhythmIndicator: React.FC<RhythmIndicatorProps> = ({ bpm, isPlaying }) => {
  const [activeBeat, setActiveBeat] = useState(0)

  useEffect(() => {
    if (!isPlaying) {
      setActiveBeat(0)
      return
    }

    const beatInterval = 60000 / bpm // milliseconds per beat
    const interval = setInterval(() => {
      setActiveBeat(prev => (prev + 1) % 4)
    }, beatInterval)

    return () => clearInterval(interval)
  }, [bpm, isPlaying])

  return (
    <div className="flex justify-center items-center gap-4 py-4">
      {[0, 1, 2, 3].map((beat) => (
        <div
          key={beat}
          className={`
            w-4 h-4 rounded-full transition-all duration-100
            ${activeBeat === beat 
              ? 'bg-purple-400 scale-150 shadow-lg shadow-purple-400/50' 
              : 'bg-white/30 scale-100'
            }
          `}
        />
      ))}
    </div>
  )
}