import React from 'react'
import { Play, Pause, Volume2, Music, Activity, Disc } from 'lucide-react'
import useMoodStore, { MusicGenre } from '../store/useMoodStore'

const genres: { value: MusicGenre; label: string }[] = [
  { value: 'electronic', label: 'Electronic' },
  { value: 'ambient', label: 'Ambient' },
  { value: 'jazz', label: 'Jazz' },
  { value: 'classical', label: 'Classical' },
  { value: 'pop', label: 'Pop' }
]

const DJControls: React.FC = () => {
  const {
    isPlaying,
    volume,
    intensity,
    tempo,
    genre,
    togglePlayPause,
    setVolume,
    setIntensity,
    setTempo,
    setGenre,
    updateWaveData
  } = useMoodStore()

  const handleSliderChange = (
    setter: (value: number) => void,
    value: number
  ) => {
    setter(value)
    updateWaveData()
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-gray-900 rounded-3xl p-6 shadow-2xl space-y-6">
        {/* Play/Pause Button */}
        <div className="flex justify-center">
          <button
            onClick={togglePlayPause}
            className="
              bg-gradient-to-r from-purple-500 to-indigo-600
              text-white rounded-full p-6
              transform transition-all duration-200
              hover:scale-110 active:scale-95
              shadow-xl hover:shadow-2xl
              animate-pulse-slow
            "
          >
            {isPlaying ? <Pause size={36} /> : <Play size={36} />}
          </button>
        </div>

        {/* Control Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Volume Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-gray-300">
              <div className="flex items-center space-x-2">
                <Volume2 size={20} />
                <span className="text-sm font-medium">Volume</span>
              </div>
              <span className="text-sm">{volume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Intensity Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-gray-300">
              <div className="flex items-center space-x-2">
                <Activity size={20} />
                <span className="text-sm font-medium">Intensity</span>
              </div>
              <span className="text-sm">{intensity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={intensity}
              onChange={(e) => handleSliderChange(setIntensity, Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Tempo Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-gray-300">
              <div className="flex items-center space-x-2">
                <Disc size={20} />
                <span className="text-sm font-medium">Tempo</span>
              </div>
              <span className="text-sm">{tempo} BPM</span>
            </div>
            <input
              type="range"
              min="60"
              max="180"
              value={tempo}
              onChange={(e) => handleSliderChange(setTempo, Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Genre Selector */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-gray-300">
              <Music size={20} />
              <span className="text-sm font-medium">Genre</span>
            </div>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value as MusicGenre)}
              className="w-full p-2 bg-gray-800 text-gray-300 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none"
            >
              {genres.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Display */}
        <div className="text-center space-y-2">
          <div className="text-gray-400 text-sm">
            Current Mix: <span className="text-purple-400 font-medium">
              {genre.charAt(0).toUpperCase() + genre.slice(1)} @ {tempo} BPM
            </span>
          </div>
          <div className="flex justify-center space-x-4 text-xs text-gray-500">
            <span>Intensity: {intensity}%</span>
            <span>•</span>
            <span>Volume: {volume}%</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  )
}

export default DJControls