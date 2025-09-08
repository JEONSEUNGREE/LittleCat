import React from 'react'
import { Volume2, VolumeX, Trash2, Mic } from 'lucide-react'
import { Track } from '../store/useSoundStore'

interface TrackMixerProps {
  track: Track
  isRecording: boolean
  onMute: () => void
  onVolumeChange: (volume: number) => void
  onRemove: () => void
  onStartRecording: () => void
  onStopRecording: () => void
}

const TrackMixer: React.FC<TrackMixerProps> = ({
  track,
  isRecording,
  onMute,
  onVolumeChange,
  onRemove,
  onStartRecording,
  onStopRecording
}) => {
  return (
    <div className={`
      bg-gray-900/50 backdrop-blur-sm rounded-xl p-4
      border ${track.isMuted ? 'border-gray-700' : 'border-gray-600'}
      ${isRecording ? 'ring-2 ring-red-500 animate-pulse' : ''}
    `}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm">{track.name}</h3>
        <div className="flex gap-1">
          <button
            onClick={isRecording ? onStopRecording : onStartRecording}
            className={`p-1.5 rounded-lg transition-colors ${
              isRecording 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            <Mic size={14} />
          </button>
          <button
            onClick={onMute}
            className={`p-1.5 rounded-lg transition-colors ${
              track.isMuted 
                ? 'bg-orange-500 text-white' 
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            {track.isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
          <button
            onClick={onRemove}
            className="p-1.5 bg-gray-800 rounded-lg hover:bg-red-600 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="100"
            value={track.volume * 100}
            onChange={(e) => onVolumeChange(Number(e.target.value) / 100)}
            className="flex-1 accent-white h-1"
            disabled={track.isMuted}
          />
          <span className="text-xs w-10 text-right">
            {Math.round(track.volume * 100)}%
          </span>
        </div>
        
        {track.loops.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {track.loops.map((loopId, index) => (
              <div
                key={index}
                className="w-2 h-2 bg-white/50 rounded-full animate-pulse"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TrackMixer