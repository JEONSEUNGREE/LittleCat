import React from 'react'
import { Play, Pause, RotateCcw, Plus, Activity, Music } from 'lucide-react'

interface ControlPanelProps {
  isPlaying: boolean
  bpm: number
  masterVolume: number
  onTogglePlay: () => void
  onBpmChange: (bpm: number) => void
  onMasterVolumeChange: (volume: number) => void
  onClearAll: () => void
  onAddTrack: () => void
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  isPlaying,
  bpm,
  masterVolume,
  onTogglePlay,
  onBpmChange,
  onMasterVolumeChange,
  onClearAll,
  onAddTrack
}) => {
  return (
    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 
                    backdrop-blur-md rounded-2xl p-4 shadow-2xl
                    border border-white/10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={onTogglePlay}
          className={`
            flex items-center justify-center gap-2 py-3 px-4 rounded-xl
            font-semibold transition-all transform active:scale-95
            ${isPlaying 
              ? 'bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-pink-500/30' 
              : 'bg-gradient-to-r from-green-500 to-teal-500 shadow-lg shadow-green-500/30'
            }
          `}
        >
          {isPlaying ? (
            <>
              <Pause size={20} />
              <span className="hidden sm:inline">Pause</span>
            </>
          ) : (
            <>
              <Play size={20} />
              <span className="hidden sm:inline">Play</span>
            </>
          )}
        </button>
        
        {/* BPM Control */}
        <div className="bg-gray-900/50 rounded-xl p-3 flex flex-col">
          <div className="flex items-center gap-1 mb-1">
            <Activity size={14} className="text-purple-400" />
            <span className="text-xs font-medium">BPM</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onBpmChange(bpm - 5)}
              className="text-lg hover:text-purple-400 transition-colors"
            >
              -
            </button>
            <span className="font-bold text-lg w-12 text-center">{bpm}</span>
            <button
              onClick={() => onBpmChange(bpm + 5)}
              className="text-lg hover:text-purple-400 transition-colors"
            >
              +
            </button>
          </div>
        </div>
        
        {/* Master Volume */}
        <div className="bg-gray-900/50 rounded-xl p-3 flex flex-col">
          <div className="flex items-center gap-1 mb-1">
            <Music size={14} className="text-blue-400" />
            <span className="text-xs font-medium">Master</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={masterVolume * 100}
            onChange={(e) => onMasterVolumeChange(Number(e.target.value) / 100)}
            className="accent-blue-400"
          />
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onAddTrack}
            className="flex-1 bg-green-600 hover:bg-green-500 
                       rounded-xl p-3 transition-colors
                       flex items-center justify-center"
            title="Add Track"
          >
            <Plus size={20} />
          </button>
          <button
            onClick={onClearAll}
            className="flex-1 bg-gray-700 hover:bg-gray-600 
                       rounded-xl p-3 transition-colors
                       flex items-center justify-center"
            title="Clear All"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ControlPanel