import React, { useEffect, useState } from 'react'
import { useDJStore } from '../store/useDJStore'
import { Activity, Radio, Waves } from 'lucide-react'

export const Visualizer: React.FC = () => {
  const { isPlaying, currentMood, bpm, effects, crossfaderPosition } = useDJStore()
  const [bars, setBars] = useState<number[]>([])

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        const newBars = Array.from({ length: 20 }, () => 
          Math.random() * (currentMood?.intensity || 50) + 20
        )
        setBars(newBars)
      }, 60000 / bpm / 4) // Update based on BPM

      return () => clearInterval(interval)
    } else {
      setBars(Array(20).fill(10))
    }
  }, [isPlaying, bpm, currentMood])

  return (
    <div className="w-full bg-black/30 backdrop-blur-md rounded-2xl p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
          <Waves className="w-6 h-6" />
          Visualizer
        </h2>
        <div className="flex items-center gap-3">
          {isPlaying && (
            <>
              <Activity className="w-5 h-5 text-green-400 animate-pulse" />
              <span className="text-green-400 text-sm font-semibold">LIVE</span>
            </>
          )}
        </div>
      </div>

      {/* Current Mood Display */}
      {currentMood && (
        <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-white/10 to-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: currentMood.color }}
              >
                {currentMood.sound}
              </div>
              <div>
                <div className="text-white font-bold">{currentMood.name}</div>
                <div className="text-white/70 text-sm">{currentMood.bpm} BPM</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white/70 text-xs">Intensity</div>
              <div className="text-white font-bold">{currentMood.intensity}%</div>
            </div>
          </div>
        </div>
      )}

      {/* Frequency Bars */}
      <div className="h-32 md:h-40 flex items-end gap-1 mb-4">
        {bars.map((height, index) => (
          <div
            key={index}
            className="flex-1 transition-all duration-150 rounded-t"
            style={{
              height: `${height}%`,
              background: currentMood 
                ? `linear-gradient(to top, ${currentMood.color}88, ${currentMood.color}FF)`
                : 'linear-gradient(to top, #ffffff44, #ffffffaa)',
              opacity: isPlaying ? 1 : 0.3,
              transform: effects.reverb ? 'scaleY(1.1)' : 'scaleY(1)',
              animation: effects.echo ? 'wave 1s ease-in-out infinite' : 'none',
              filter: effects.filter ? 'hue-rotate(45deg)' : 'none'
            }}
          />
        ))}
      </div>

      {/* Waveform */}
      <div className="h-16 relative overflow-hidden rounded-lg bg-white/5">
        <svg className="w-full h-full" viewBox="0 0 400 100">
          <path
            d={`M 0 50 ${bars.map((h, i) => 
              `L ${(i / bars.length) * 400} ${50 - (h / 2)} L ${((i + 0.5) / bars.length) * 400} ${50 + (h / 2)}`
            ).join(' ')}`}
            fill="none"
            stroke={currentMood?.color || '#ffffff'}
            strokeWidth="2"
            strokeOpacity={isPlaying ? 0.8 : 0.3}
            className="transition-all duration-300"
          />
        </svg>
        {isPlaying && (
          <div 
            className="absolute top-0 h-full w-1 bg-white"
            style={{
              left: `${(Date.now() % 3000) / 30}%`,
              animation: 'slide 3s linear infinite'
            }}
          />
        )}
      </div>

      {/* Effects Indicators */}
      {(effects.reverb || effects.echo || effects.filter) && (
        <div className="mt-3 flex gap-2 flex-wrap">
          {effects.reverb && (
            <span className="px-2 py-1 bg-blue-500/30 text-blue-300 text-xs rounded-full">
              Reverb Active
            </span>
          )}
          {effects.echo && (
            <span className="px-2 py-1 bg-green-500/30 text-green-300 text-xs rounded-full">
              Echo Active
            </span>
          )}
          {effects.filter && (
            <span className="px-2 py-1 bg-orange-500/30 text-orange-300 text-xs rounded-full">
              Filter Active
            </span>
          )}
        </div>
      )}

      {/* Crossfader Position Indicator */}
      <div className="mt-4 flex items-center justify-between text-xs text-white/50">
        <span>Deck A: {100 - crossfaderPosition}%</span>
        <Radio className="w-4 h-4" />
        <span>Deck B: {crossfaderPosition}%</span>
      </div>
    </div>
  )
}