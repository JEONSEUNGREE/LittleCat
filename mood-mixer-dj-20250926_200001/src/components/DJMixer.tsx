import React from 'react'
import { useDJStore } from '../store/useDJStore'
import { 
  Play, 
  Pause, 
  SkipForward, 
  Volume2, 
  Disc, 
  Sliders,
  Zap,
  Wind,
  Filter
} from 'lucide-react'

export const DJMixer: React.FC = () => {
  const {
    isPlaying,
    setPlaying,
    crossfaderPosition,
    setCrossfaderPosition,
    bpm,
    setBpm,
    effects,
    toggleEffect,
    currentMood,
    leftDeck,
    rightDeck,
    setLeftDeck,
    setRightDeck
  } = useDJStore()

  const handleLoadToDeck = (deck: 'left' | 'right') => {
    if (currentMood) {
      if (deck === 'left') {
        setLeftDeck(currentMood)
      } else {
        setRightDeck(currentMood)
      }
    }
  }

  return (
    <div className="w-full bg-black/40 backdrop-blur-lg rounded-2xl p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
          <Disc className="w-6 h-6 animate-spin-slow" />
          DJ Mixer
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setPlaying(!isPlaying)}
            className="p-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white hover:scale-110 transition-transform"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button className="p-3 bg-white/20 rounded-full text-white hover:scale-110 transition-transform">
            <SkipForward size={24} />
          </button>
        </div>
      </div>

      {/* Decks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-semibold">Deck A</span>
            <button
              onClick={() => handleLoadToDeck('left')}
              className="px-3 py-1 bg-white/20 rounded-lg text-xs text-white hover:bg-white/30 transition"
            >
              Load
            </button>
          </div>
          {leftDeck && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{leftDeck.sound}</span>
                <span className="text-white">{leftDeck.name}</span>
              </div>
              <div className="text-sm text-white/70">{leftDeck.bpm} BPM</div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"
                  style={{ width: `${leftDeck.intensity}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-pink-500/30 to-orange-500/30 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-semibold">Deck B</span>
            <button
              onClick={() => handleLoadToDeck('right')}
              className="px-3 py-1 bg-white/20 rounded-lg text-xs text-white hover:bg-white/30 transition"
            >
              Load
            </button>
          </div>
          {rightDeck && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{rightDeck.sound}</span>
                <span className="text-white">{rightDeck.name}</span>
              </div>
              <div className="text-sm text-white/70">{rightDeck.bpm} BPM</div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-pink-400 to-orange-400 animate-pulse"
                  style={{ width: `${rightDeck.intensity}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Crossfader */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-white/70">A</span>
          <span className="text-white font-semibold">Crossfader</span>
          <span className="text-sm text-white/70">B</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={crossfaderPosition}
          onChange={(e) => setCrossfaderPosition(parseInt(e.target.value))}
          className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${crossfaderPosition}%, #EC4899 ${crossfaderPosition}%, #EC4899 100%)`
          }}
        />
      </div>

      {/* BPM Control */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-semibold flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            BPM
          </span>
          <span className="text-white text-lg font-bold">{bpm}</span>
        </div>
        <input
          type="range"
          min="60"
          max="180"
          value={bpm}
          onChange={(e) => setBpm(parseInt(e.target.value))}
          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Effects */}
      <div>
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Sliders className="w-4 h-4" />
          Effects
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => toggleEffect('reverb')}
            className={`p-3 rounded-lg transition-all ${
              effects.reverb 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white scale-105' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <Zap className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Reverb</span>
          </button>
          <button
            onClick={() => toggleEffect('echo')}
            className={`p-3 rounded-lg transition-all ${
              effects.echo 
                ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white scale-105' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <Wind className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Echo</span>
          </button>
          <button
            onClick={() => toggleEffect('filter')}
            className={`p-3 rounded-lg transition-all ${
              effects.filter 
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white scale-105' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <Filter className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Filter</span>
          </button>
        </div>
      </div>
    </div>
  )
}