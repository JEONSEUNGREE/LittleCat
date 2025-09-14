import { useEffect, useState } from 'react'
import { useSoundStore } from '../store/useSoundStore'

export function Visualizer() {
  const { isPlaying, masterVolume } = useSoundStore()
  const [bars, setBars] = useState(Array(32).fill(0))

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setBars(bars.map(() => Math.random() * (masterVolume / 100)))
      }, 100)
      return () => clearInterval(interval)
    } else {
      setBars(Array(32).fill(0))
    }
  }, [isPlaying, masterVolume])

  return (
    <div className="glass-effect rounded-xl p-4 overflow-hidden">
      <div className="flex items-end justify-center gap-1 h-24">
        {bars.map((height, index) => (
          <div
            key={index}
            className="w-2 bg-gradient-to-t from-neon-purple via-neon-pink to-neon-blue rounded-t transition-all duration-100"
            style={{
              height: `${Math.max(10, height * 100)}%`,
              opacity: 0.8 + height * 0.2,
              filter: `brightness(${1 + height * 0.5})`
            }}
          />
        ))}
      </div>
    </div>
  )
}