import React, { useState, useRef, useEffect } from 'react'
import { Music, Volume2, VolumeX, Radio, Headphones } from 'lucide-react'
import { usePomodoroStore } from '../store/usePomodoroStore'

const PRESET_MUSIC = [
  { id: 'lofi', name: 'Lo-Fi 힙합', icon: Headphones, url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk' },
  { id: 'nature', name: '자연의 소리', icon: Radio, url: 'https://www.youtube.com/watch?v=mIYzp5rcTvU' },
  { id: 'classical', name: '클래식', icon: Music, url: 'https://www.youtube.com/watch?v=mIYzp5rcTvU' },
]

export const MusicPlayer: React.FC = () => {
  const { isRunning, soundEnabled, updateSettings, musicUrl, setMusicUrl } = usePomodoroStore()
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null)
  const [volume, setVolume] = useState(50)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100
    }
  }, [volume, isMuted])

  useEffect(() => {
    if (isRunning && musicUrl && audioRef.current) {
      audioRef.current.play().catch(() => {})
    } else if (!isRunning && audioRef.current) {
      audioRef.current.pause()
    }
  }, [isRunning, musicUrl])

  const handlePresetSelect = (preset: typeof PRESET_MUSIC[0]) => {
    setSelectedPreset(preset.id)
    setMusicUrl(preset.url)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <div className="px-6 py-4 bg-white dark:bg-gray-800 rounded-xl mx-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
          <Music className="w-4 h-4 mr-2" />
          배경 음악
        </h3>
        <button
          onClick={toggleMute}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-gray-500" />
          ) : (
            <Volume2 className="w-4 h-4 text-gray-500" />
          )}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {PRESET_MUSIC.map((preset) => {
          const Icon = preset.icon
          return (
            <button
              key={preset.id}
              onClick={() => handlePresetSelect(preset)}
              className={`p-3 rounded-lg text-xs font-medium transition-all ${
                selectedPreset === preset.id
                  ? 'bg-gradient-to-r from-red-400 to-red-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Icon className="w-4 h-4 mx-auto mb-1" />
              <div className="truncate">{preset.name}</div>
            </button>
          )
        })}
      </div>

      <div className="flex items-center gap-3">
        <VolumeX className="w-4 h-4 text-gray-400" />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
        />
        <Volume2 className="w-4 h-4 text-gray-400" />
      </div>

      {musicUrl && (
        <audio
          ref={audioRef}
          src={musicUrl}
          loop
          className="hidden"
        />
      )}
    </div>
  )
}