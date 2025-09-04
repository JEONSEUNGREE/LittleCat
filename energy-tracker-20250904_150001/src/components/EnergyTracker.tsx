import { useState } from 'react'
import { Plus, Zap, Brain, Heart, Coffee, Dumbbell, Book } from 'lucide-react'
import { useEnergyStore } from '../store/useEnergyStore'

const activities = [
  { icon: Coffee, label: 'Break', value: 'break' },
  { icon: Brain, label: 'Deep Work', value: 'deep-work' },
  { icon: Dumbbell, label: 'Exercise', value: 'exercise' },
  { icon: Book, label: 'Learning', value: 'learning' },
  { icon: Heart, label: 'Social', value: 'social' }
]

const moods = ['😊 Great', '🙂 Good', '😐 Neutral', '😔 Low', '😴 Tired']

export default function EnergyTracker() {
  const [energyLevel, setEnergyLevel] = useState(5)
  const [selectedActivity, setSelectedActivity] = useState('deep-work')
  const [selectedMood, setSelectedMood] = useState('😐 Neutral')
  const [notes, setNotes] = useState('')
  const { addEntry, updateCurrentEnergy } = useEnergyStore()

  const handleSubmit = () => {
    addEntry({
      timestamp: new Date(),
      energyLevel,
      activity: selectedActivity,
      mood: selectedMood,
      notes: notes.trim() || undefined
    })
    updateCurrentEnergy(energyLevel)
    
    // Reset form
    setNotes('')
    
    // Show success feedback
    const button = document.getElementById('submit-btn')
    if (button) {
      button.textContent = '✓ Recorded'
      button.classList.add('bg-green-600')
      setTimeout(() => {
        button.textContent = 'Record Energy'
        button.classList.remove('bg-green-600')
      }, 2000)
    }
  }

  const getEnergyColor = (level: number) => {
    if (level <= 3) return 'bg-energy-low'
    if (level <= 6) return 'bg-energy-medium'
    if (level <= 8) return 'bg-energy-high'
    return 'bg-energy-peak'
  }

  const getEnergyLabel = (level: number) => {
    if (level <= 2) return 'Very Low'
    if (level <= 4) return 'Low'
    if (level <= 6) return 'Medium'
    if (level <= 8) return 'High'
    return 'Peak'
  }

  return (
    <div className="space-y-6">
      {/* Energy Level Selector */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            How's your energy?
          </h2>
          <Zap className={`w-6 h-6 ${energyLevel > 5 ? 'text-energy-high' : 'text-slate-400'}`} />
        </div>

        <div className="space-y-4">
          {/* Energy Value Display */}
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getEnergyColor(energyLevel)} bg-opacity-20`}>
              <span className={`text-3xl font-bold ${getEnergyColor(energyLevel).replace('bg-', 'text-')}`}>
                {energyLevel}
              </span>
            </div>
            <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-400">
              {getEnergyLabel(energyLevel)}
            </p>
          </div>

          {/* Energy Slider */}
          <div className="relative">
            <input
              type="range"
              min="1"
              max="10"
              value={energyLevel}
              onChange={(e) => setEnergyLevel(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, ${
                  energyLevel <= 3 ? '#ef4444' :
                  energyLevel <= 6 ? '#f59e0b' :
                  energyLevel <= 8 ? '#10b981' : '#8b5cf6'
                } ${energyLevel * 10}%, #e2e8f0 ${energyLevel * 10}%)`
              }}
            />
            <div className="flex justify-between mt-2">
              <span className="text-xs text-slate-500">1</span>
              <span className="text-xs text-slate-500">5</span>
              <span className="text-xs text-slate-500">10</span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Selector */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          What are you doing?
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {activities.map(({ icon: Icon, label, value }) => (
            <button
              key={value}
              onClick={() => setSelectedActivity(value)}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                selectedActivity === value
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              <Icon className={`w-6 h-6 mb-1 ${
                selectedActivity === value ? 'text-primary-600' : 'text-slate-500'
              }`} />
              <span className={`text-xs ${
                selectedActivity === value ? 'text-primary-700 font-medium' : 'text-slate-600'
              }`}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Mood Selector */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          How are you feeling?
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {moods.map((mood) => (
            <button
              key={mood}
              onClick={() => setSelectedMood(mood)}
              className={`py-2 px-3 rounded-lg border transition-all ${
                selectedMood === mood
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              <span className="text-sm">{mood}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Additional Notes (Optional)
        </h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any factors affecting your energy? (e.g., sleep quality, meals, stress)"
          className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-900 dark:text-white"
          rows={3}
        />
      </div>

      {/* Submit Button */}
      <button
        id="submit-btn"
        onClick={handleSubmit}
        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
      >
        <Plus className="w-5 h-5" />
        <span>Record Energy</span>
      </button>
    </div>
  )
}