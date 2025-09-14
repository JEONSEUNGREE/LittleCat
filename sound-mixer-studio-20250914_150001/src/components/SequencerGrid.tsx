import { useSoundStore } from '../store/useSoundStore'
import { Trash2, RotateCcw } from 'lucide-react'

export function SequencerGrid() {
  const { tracks, toggleTrackBeat, clearPattern, currentBeat, isPlaying } = useSoundStore()
  const beats = Array.from({ length: 16 }, (_, i) => i)

  return (
    <div className="w-full overflow-x-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold mb-2">Step Sequencer</h2>
        <p className="text-gray-400 text-sm">Create patterns by clicking on the grid</p>
      </div>

      <div className="min-w-[600px]">
        {/* Beat Numbers */}
        <div className="flex gap-1 mb-2 ml-24">
          {beats.map((beat) => (
            <div 
              key={beat} 
              className={`w-10 h-8 flex items-center justify-center text-xs font-mono ${
                beat % 4 === 0 ? 'text-neon-purple font-bold' : 'text-gray-500'
              } ${isPlaying && currentBeat === beat ? 'text-neon-pink scale-125' : ''}`}
            >
              {beat + 1}
            </div>
          ))}
        </div>

        {/* Track Rows */}
        {tracks.map((track) => (
          <div key={track.id} className="flex gap-1 mb-2 items-center">
            {/* Track Name */}
            <div className="w-24 pr-2 flex items-center justify-between">
              <span className="text-sm font-medium truncate">{track.name}</span>
              <button
                onClick={() => clearPattern(track.id)}
                className="text-gray-500 hover:text-red-400 transition-colors ml-2"
                title="Clear pattern"
              >
                <RotateCcw size={14} />
              </button>
            </div>

            {/* Beat Grid */}
            {beats.map((beat) => (
              <button
                key={beat}
                onClick={() => toggleTrackBeat(track.id, beat)}
                className={`
                  w-10 h-10 rounded transition-all
                  ${track.pattern[beat] 
                    ? 'bg-gradient-to-br from-neon-purple to-neon-pink shadow-lg scale-105' 
                    : 'bg-gray-700/50 hover:bg-gray-600/50'
                  }
                  ${beat % 4 === 0 ? 'border-l-2 border-gray-600' : ''}
                  ${isPlaying && currentBeat === beat ? 'ring-2 ring-neon-blue' : ''}
                `}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Pattern Presets */}
      <div className="mt-6 flex flex-wrap gap-2 justify-center">
        <button className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg text-sm transition-colors">
          Basic Beat
        </button>
        <button className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg text-sm transition-colors">
          Hip Hop
        </button>
        <button className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg text-sm transition-colors">
          House
        </button>
        <button className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg text-sm transition-colors">
          Techno
        </button>
        <button className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg text-sm transition-colors">
          Trap
        </button>
      </div>
    </div>
  )
}