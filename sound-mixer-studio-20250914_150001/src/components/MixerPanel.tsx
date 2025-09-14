import { useSoundStore } from '../store/useSoundStore'
import { Volume2, VolumeX, Trash2 } from 'lucide-react'

export function MixerPanel() {
  const { tracks, masterVolume, updateTrack, removeTrack, setMasterVolume, addTrack } = useSoundStore()

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold mb-2">Mixer</h2>
        <p className="text-gray-400 text-sm">Adjust volume and control your tracks</p>
      </div>

      {/* Master Volume */}
      <div className="mb-8 max-w-md mx-auto">
        <div className="glass-effect rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-neon-purple">Master Volume</h3>
            <span className="text-sm font-mono text-gray-400">{masterVolume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={masterVolume}
            onChange={(e) => setMasterVolume(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #9945FF 0%, #9945FF ${masterVolume}%, #374151 ${masterVolume}%, #374151 100%)`
            }}
          />
        </div>
      </div>

      {/* Track Channels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tracks.map((track) => (
          <div key={track.id} className="glass-effect rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <input
                type="text"
                value={track.name}
                onChange={(e) => updateTrack(track.id, { name: e.target.value })}
                className="bg-transparent text-white font-semibold outline-none border-b border-gray-600 focus:border-neon-pink"
              />
              <button
                onClick={() => removeTrack(track.id)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Volume Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Volume</span>
                  <span className="text-sm font-mono text-gray-400">{track.volume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={track.volume}
                  onChange={(e) => updateTrack(track.id, { volume: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #FF006E 0%, #FF006E ${track.volume}%, #374151 ${track.volume}%, #374151 100%)`
                  }}
                />
              </div>

              {/* Mute Button */}
              <button
                onClick={() => updateTrack(track.id, { isMuted: !track.isMuted })}
                className={`w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  track.isMuted 
                    ? 'bg-red-500/20 text-red-400' 
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                }`}
              >
                {track.isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                {track.isMuted ? 'Muted' : 'Active'}
              </button>

              {/* Sound Type */}
              <select
                value={track.sound}
                onChange={(e) => updateTrack(track.id, { sound: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700/50 text-white rounded-lg outline-none focus:ring-2 focus:ring-neon-purple"
              >
                <option value="kick">Kick</option>
                <option value="snare">Snare</option>
                <option value="hihat">Hi-Hat</option>
                <option value="clap">Clap</option>
                <option value="cymbal">Cymbal</option>
                <option value="tom">Tom</option>
                <option value="cowbell">Cowbell</option>
                <option value="shaker">Shaker</option>
              </select>
            </div>
          </div>
        ))}

        {/* Add Track Button */}
        <button
          onClick={addTrack}
          className="glass-effect rounded-xl p-4 min-h-[200px] flex items-center justify-center hover:bg-white/10 transition-all group"
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-3xl font-bold">+</span>
            </div>
            <p className="text-gray-400 group-hover:text-white transition-colors">Add Track</p>
          </div>
        </button>
      </div>
    </div>
  )
}