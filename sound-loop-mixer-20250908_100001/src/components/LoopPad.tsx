import React from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { Loop } from '../store/useSoundStore'

interface LoopPadProps {
  loop: Loop
  onToggle: () => void
  onVolumeChange: (volume: number) => void
}

const LoopPad: React.FC<LoopPadProps> = ({ loop, onToggle, onVolumeChange }) => {
  const [showVolume, setShowVolume] = React.useState(false)

  return (
    <div className="relative group">
      <button
        onClick={onToggle}
        className={`
          no-select transition-smooth w-full aspect-square rounded-2xl
          ${loop.isActive ? loop.color : 'bg-gray-800'}
          ${loop.isActive ? 'shadow-lg shadow-current animate-beat' : ''}
          hover:scale-105 active:scale-95
          border-2 ${loop.isActive ? 'border-white/50' : 'border-gray-700'}
          flex flex-col items-center justify-center gap-2
          relative overflow-hidden
        `}
      >
        {loop.isActive && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        )}
        <span className="text-4xl z-10">{loop.icon}</span>
        <span className="text-xs font-semibold z-10 px-2">{loop.name}</span>
        
        {loop.isActive && (
          <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full animate-pulse" />
        )}
      </button>
      
      <button
        onClick={() => setShowVolume(!showVolume)}
        className="absolute -bottom-2 -right-2 bg-gray-900 rounded-full p-1.5 
                   opacity-0 group-hover:opacity-100 transition-opacity
                   hover:bg-gray-700 z-20"
      >
        {loop.volume > 0 ? (
          <Volume2 size={14} />
        ) : (
          <VolumeX size={14} />
        )}
      </button>
      
      {showVolume && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 
                        bg-gray-900 rounded-lg p-2 shadow-xl z-30">
          <input
            type="range"
            min="0"
            max="100"
            value={loop.volume * 100}
            onChange={(e) => onVolumeChange(Number(e.target.value) / 100)}
            className="w-24 accent-white"
          />
          <div className="text-xs text-center mt-1">{Math.round(loop.volume * 100)}%</div>
        </div>
      )}
    </div>
  )
}

export default LoopPad