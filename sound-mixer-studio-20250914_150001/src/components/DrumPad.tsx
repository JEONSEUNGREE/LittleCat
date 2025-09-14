import { useState } from 'react'
import { Volume2 } from 'lucide-react'

const drumSounds = [
  { id: 'kick', label: 'Kick', color: 'from-purple-500 to-purple-700', key: 'Q' },
  { id: 'snare', label: 'Snare', color: 'from-pink-500 to-pink-700', key: 'W' },
  { id: 'hihat', label: 'Hi-Hat', color: 'from-blue-500 to-blue-700', key: 'E' },
  { id: 'openhat', label: 'Open Hat', color: 'from-cyan-500 to-cyan-700', key: 'R' },
  { id: 'clap', label: 'Clap', color: 'from-green-500 to-green-700', key: 'A' },
  { id: 'rim', label: 'Rim', color: 'from-yellow-500 to-yellow-700', key: 'S' },
  { id: 'tom1', label: 'Tom 1', color: 'from-orange-500 to-orange-700', key: 'D' },
  { id: 'tom2', label: 'Tom 2', color: 'from-red-500 to-red-700', key: 'F' },
  { id: 'crash', label: 'Crash', color: 'from-indigo-500 to-indigo-700', key: 'Z' },
  { id: 'ride', label: 'Ride', color: 'from-purple-600 to-pink-600', key: 'X' },
  { id: 'cowbell', label: 'Cowbell', color: 'from-teal-500 to-teal-700', key: 'C' },
  { id: 'shaker', label: 'Shaker', color: 'from-lime-500 to-lime-700', key: 'V' }
]

export function DrumPad() {
  const [activePads, setActivePads] = useState<Set<string>>(new Set())

  const handlePadPress = (soundId: string) => {
    setActivePads(new Set([soundId]))
    
    // Visual feedback
    setTimeout(() => {
      setActivePads(new Set())
    }, 150)

    // Play sound simulation
    console.log(`Playing sound: ${soundId}`)
  }

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold mb-2">Drum Pad</h2>
        <p className="text-gray-400 text-sm">Tap the pads or use keyboard keys to play sounds</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
        {drumSounds.map((sound) => (
          <button
            key={sound.id}
            onMouseDown={() => handlePadPress(sound.id)}
            onTouchStart={() => handlePadPress(sound.id)}
            className={`
              relative aspect-square rounded-xl bg-gradient-to-br ${sound.color}
              transform transition-all duration-100 hover:scale-105 active:scale-95
              ${activePads.has(sound.id) ? 'scale-95 brightness-125 box-neon-glow' : ''}
              shadow-lg hover:shadow-xl cursor-pointer
              flex flex-col items-center justify-center
              min-h-[80px] sm:min-h-[100px]
            `}
          >
            <Volume2 className="w-6 h-6 sm:w-8 sm:h-8 mb-1 text-white/80" />
            <span className="text-white font-semibold text-sm sm:text-base">{sound.label}</span>
            <span className="absolute top-2 right-2 text-white/60 text-xs sm:text-sm font-mono">
              {sound.key}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-500 text-xs">
          Pro tip: Use keyboard keys Q, W, E, R, A, S, D, F, Z, X, C, V for quick access
        </p>
      </div>
    </div>
  )
}