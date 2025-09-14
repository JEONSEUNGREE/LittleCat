import { useSoundStore } from '../store/useSoundStore'
import { Play, Pause, Square, Circle, SkipBack, Repeat } from 'lucide-react'
import { useEffect } from 'react'

export function TransportControls() {
  const { isPlaying, isRecording, bpm, togglePlay, toggleRecord, setBpm } = useSoundStore()

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        useSoundStore.setState((state) => ({
          currentBeat: (state.currentBeat + 1) % 16
        }))
      }, (60 / bpm / 4) * 1000)

      return () => clearInterval(interval)
    } else {
      useSoundStore.setState({ currentBeat: 0 })
    }
  }, [isPlaying, bpm])

  return (
    <div className="glass-effect rounded-xl p-4 max-w-2xl mx-auto">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* Main Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => useSoundStore.setState({ currentBeat: 0 })}
            className="p-3 rounded-full bg-gray-700/50 hover:bg-gray-600/50 transition-all hover:scale-110"
          >
            <SkipBack size={20} />
          </button>

          <button
            onClick={togglePlay}
            className={`p-4 rounded-full transition-all hover:scale-110 ${
              isPlaying 
                ? 'bg-gradient-to-r from-neon-purple to-neon-pink shadow-lg' 
                : 'bg-gray-700/50 hover:bg-gray-600/50'
            }`}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>

          <button
            className="p-3 rounded-full bg-gray-700/50 hover:bg-gray-600/50 transition-all hover:scale-110"
          >
            <Square size={20} />
          </button>

          <button
            onClick={toggleRecord}
            className={`p-3 rounded-full transition-all hover:scale-110 ${
              isRecording 
                ? 'bg-red-500 animate-pulse shadow-lg' 
                : 'bg-gray-700/50 hover:bg-gray-600/50'
            }`}
          >
            <Circle size={20} />
          </button>

          <button
            className="p-3 rounded-full bg-gray-700/50 hover:bg-gray-600/50 transition-all hover:scale-110"
          >
            <Repeat size={20} />
          </button>
        </div>

        {/* BPM Control */}
        <div className="flex items-center gap-3 bg-gray-800/50 rounded-lg px-4 py-2">
          <label className="text-sm font-medium text-gray-400">BPM</label>
          <button
            onClick={() => setBpm(Math.max(60, bpm - 5))}
            className="w-8 h-8 rounded bg-gray-700/50 hover:bg-gray-600/50 transition-colors"
          >
            -
          </button>
          <input
            type="number"
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="w-16 text-center bg-transparent outline-none font-mono text-lg"
            min="60"
            max="200"
          />
          <button
            onClick={() => setBpm(Math.min(200, bpm + 5))}
            className="w-8 h-8 rounded bg-gray-700/50 hover:bg-gray-600/50 transition-colors"
          >
            +
          </button>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`} />
            <span className="text-xs text-gray-400">Playing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-600'}`} />
            <span className="text-xs text-gray-400">Recording</span>
          </div>
        </div>
      </div>
    </div>
  )
}