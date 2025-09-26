import React from 'react'
import { MOODS } from '../data/moods'
import { useDJStore, Mood } from '../store/useDJStore'
import { Music } from 'lucide-react'

export const MoodSelector: React.FC = () => {
  const { setCurrentMood, addToHistory, setPlaying, currentMood } = useDJStore()

  const handleMoodSelect = (mood: Mood) => {
    setCurrentMood(mood)
    addToHistory(mood)
    setPlaying(true)
  }

  return (
    <div className="w-full bg-black/30 backdrop-blur-md rounded-2xl p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <Music className="w-6 h-6" />
        Mood Selection
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
        {MOODS.map((mood) => (
          <button
            key={mood.name}
            onClick={() => handleMoodSelect(mood)}
            className={`relative p-3 md:p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
              currentMood?.name === mood.name
                ? 'ring-4 ring-white scale-105'
                : ''
            }`}
            style={{
              background: `linear-gradient(135deg, ${mood.color}88, ${mood.color}DD)`,
            }}
          >
            <div className="text-2xl md:text-3xl mb-1">{mood.sound}</div>
            <div className="text-xs md:text-sm font-semibold text-white">
              {mood.name}
            </div>
            <div className="text-xs text-white/80 mt-1">
              {mood.bpm} BPM
            </div>
            {currentMood?.name === mood.name && (
              <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full animate-pulse" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}