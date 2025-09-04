import React from 'react'
import { Heart, Cloud, Zap, CloudRain, Circle } from 'lucide-react'
import useMoodStore, { Mood } from '../store/useMoodStore'

const moods: { mood: Mood; icon: React.ReactNode; color: string; label: string }[] = [
  { mood: 'happy', icon: <Heart />, color: 'gradient-happy', label: 'Happy' },
  { mood: 'calm', icon: <Cloud />, color: 'gradient-calm', label: 'Calm' },
  { mood: 'energetic', icon: <Zap />, color: 'gradient-energetic', label: 'Energetic' },
  { mood: 'sad', icon: <CloudRain />, color: 'gradient-sad', label: 'Sad' },
  { mood: 'neutral', icon: <Circle />, color: 'gradient-mood', label: 'Neutral' }
]

const MoodSelector: React.FC = () => {
  const { currentMood, setMood, updateWaveData } = useMoodStore()

  const handleMoodSelect = (mood: Mood) => {
    setMood(mood)
    updateWaveData()
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold text-white mb-6 text-center">Select Your Mood</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {moods.map(({ mood, icon, color, label }) => (
          <button
            key={mood}
            onClick={() => handleMoodSelect(mood)}
            className={`
              relative flex flex-col items-center justify-center
              w-24 h-24 sm:w-28 sm:h-28 rounded-2xl
              transition-all duration-300 transform
              ${currentMood === mood ? 'scale-110 shadow-2xl' : 'scale-100 hover:scale-105'}
              ${currentMood === mood ? color : 'bg-gray-800'}
              ${currentMood === mood ? 'animate-glow' : ''}
            `}
          >
            <div className={`text-white ${currentMood === mood ? 'animate-float' : ''}`}>
              {React.cloneElement(icon as React.ReactElement, { size: 32 })}
            </div>
            <span className="text-white text-sm mt-2 font-medium">{label}</span>
            {currentMood === mood && (
              <div className="absolute inset-0 rounded-2xl bg-white opacity-20 animate-pulse-slow" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default MoodSelector