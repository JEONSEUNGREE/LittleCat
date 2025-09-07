import React, { useState, useEffect } from 'react'
import { Play, Pause, SkipForward, Volume2, Disc, Repeat, Sliders } from 'lucide-react'
import { usePetDJStore } from '../store/petStore'

const DJMixer: React.FC = () => {
  const {
    music,
    pet,
    setActiveTrack,
    setVolume,
    setCrossfader,
    toggleLoop,
    toggleEffect,
    startMixing,
    stopMixing,
    gainExperience,
    updatePetMood,
  } = usePetDJStore()

  const [trackProgress, setTrackProgress] = useState(0)
  const [selectedDeck, setSelectedDeck] = useState<'A' | 'B'>('A')

  useEffect(() => {
    if (pet.isPlaying && music.activeTrack) {
      const interval = setInterval(() => {
        setTrackProgress((prev) => {
          if (prev >= 100) {
            if (music.isLooping) {
              return 0
            }
            stopMixing()
            return 100
          }
          return prev + (100 / music.activeTrack!.duration)
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [pet.isPlaying, music.activeTrack, music.isLooping, stopMixing])

  const handlePlayPause = () => {
    if (pet.isPlaying) {
      stopMixing()
    } else if (music.activeTrack) {
      startMixing()
      gainExperience(2)
    }
  }

  const handleTrackSelect = (track: typeof music.tracks[0]) => {
    setActiveTrack(track)
    setTrackProgress(0)
    updatePetMood('excited')
    gainExperience(3)
  }

  const handleEffectToggle = (effect: string) => {
    toggleEffect(effect)
    gainExperience(1)
    if (music.activeEffects.length > 2) {
      updatePetMood('dancing')
    }
  }

  const handleCrossfaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setCrossfader(value)
    if (value < 20 || value > 80) {
      updatePetMood('excited')
    }
  }

  return (
    <div className="glass-effect rounded-2xl p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-center mb-4 text-neon-pink neon-text">
          DJ Mixer Station
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div
            className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
              selectedDeck === 'A'
                ? 'border-neon-blue bg-neon-blue/10'
                : 'border-gray-600 bg-gray-800/50'
            }`}
            onClick={() => setSelectedDeck('A')}
          >
            <div className="flex items-center justify-center mb-2">
              <Disc className={`w-16 h-16 ${selectedDeck === 'A' && pet.isPlaying ? 'animate-spin' : ''}`} />
            </div>
            <div className="text-center text-sm font-bold">DECK A</div>
          </div>

          <div
            className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
              selectedDeck === 'B'
                ? 'border-neon-pink bg-neon-pink/10'
                : 'border-gray-600 bg-gray-800/50'
            }`}
            onClick={() => setSelectedDeck('B')}
          >
            <div className="flex items-center justify-center mb-2">
              <Disc className={`w-16 h-16 ${selectedDeck === 'B' && pet.isPlaying ? 'animate-spin' : ''}`} />
            </div>
            <div className="text-center text-sm font-bold">DECK B</div>
          </div>
        </div>

        {music.activeTrack && (
          <div className="mb-4 p-3 bg-gray-800 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{music.activeTrack.name}</span>
              <span className="text-xs text-gray-400">
                {music.activeTrack.genre} • {music.activeTrack.bpm} BPM
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-neon-blue to-neon-pink transition-all duration-1000 beat-pulse"
                style={{ width: `${trackProgress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={handlePlayPause}
            className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full hover:opacity-90 transition-opacity"
          >
            {pet.isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>

          <button className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors">
            <SkipForward className="w-6 h-6" />
          </button>

          <button
            onClick={toggleLoop}
            className={`p-3 rounded-full transition-colors ${
              music.isLooping
                ? 'bg-neon-purple text-white'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <Repeat className="w-6 h-6" />
          </button>

          <div className="flex-1 flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-gray-400" />
            <input
              type="range"
              min="0"
              max="100"
              value={music.volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm text-gray-400 w-10">{music.volume}%</span>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Crossfader</span>
            <span className="text-xs text-gray-400">A ← → B</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={music.crossfaderPosition}
            onChange={handleCrossfaderChange}
            className="w-full h-3 bg-gradient-to-r from-neon-blue to-neon-pink rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Sliders className="w-5 h-5 text-neon-green" />
            <span className="text-sm font-medium">Effects</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {pet.effects.map((effect) => (
              <button
                key={effect}
                onClick={() => handleEffectToggle(effect)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  music.activeEffects.includes(effect)
                    ? 'bg-neon-green text-black'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {effect}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3 text-gray-400">Track Library</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {music.tracks.map((track) => (
              <button
                key={track.id}
                onClick={() => handleTrackSelect(track)}
                className={`w-full p-3 rounded-lg text-left transition-all hover:bg-gray-700/50 ${
                  music.activeTrack?.id === track.id
                    ? 'bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 border border-neon-purple'
                    : 'bg-gray-800/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: track.color }}
                    />
                    <span className="font-medium">{track.name}</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {track.bpm} BPM • {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DJMixer