import React, { useState } from 'react'
import { Battery, Plus, TrendingUp, AlertCircle } from 'lucide-react'
import { useEnergyStore } from '../store/useEnergyStore'

const EnergyTracker: React.FC = () => {
  const { currentEnergy, addEnergyEntry, energyEntries } = useEnergyStore()
  const [showInput, setShowInput] = useState(false)
  const [selectedEnergy, setSelectedEnergy] = useState(3)
  const [note, setNote] = useState('')

  const energyColors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-lime-500',
    'bg-green-500',
  ]

  const energyLabels = [
    'Very Low',
    'Low',
    'Medium',
    'High',
    'Peak',
  ]

  const handleSaveEnergy = () => {
    addEnergyEntry(selectedEnergy, note.trim() || undefined)
    setShowInput(false)
    setNote('')
    setSelectedEnergy(3)
  }

  const getLastUpdate = () => {
    if (energyEntries.length === 0) return 'No data yet'
    const lastEntry = energyEntries[energyEntries.length - 1]
    const date = new Date(lastEntry.timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    
    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60))
      return `${minutes} min ago`
    } else if (hours < 24) {
      return `${hours}h ago`
    } else {
      const days = Math.floor(hours / 24)
      return `${days}d ago`
    }
  }

  return (
    <div className="glass rounded-2xl p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Battery className="w-6 h-6 text-green-400" />
          <h2 className="text-xl font-semibold text-white">Energy Level</h2>
        </div>
        <button
          onClick={() => setShowInput(!showInput)}
          className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Current Energy Display */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400 text-sm">Current Level</span>
          <span className="text-gray-400 text-sm">{getLastUpdate()}</span>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`h-10 flex-1 rounded-lg transition-all ${
                level <= currentEnergy
                  ? energyColors[currentEnergy - 1]
                  : 'bg-gray-700'
              } ${level <= currentEnergy ? 'energy-glow-' + (currentEnergy >= 4 ? 'high' : currentEnergy >= 2 ? 'mid' : 'low') : ''}`}
            />
          ))}
        </div>
        <div className="mt-2 text-center">
          <span className="text-lg font-medium text-white">
            {energyLabels[currentEnergy - 1]}
          </span>
        </div>
      </div>

      {/* Energy Input Modal */}
      {showInput && (
        <div className="bg-dark-card rounded-xl p-4 mb-4 animate-slide-up">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              How's your energy right now?
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedEnergy(level)}
                  className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                    level === selectedEnergy
                      ? `${energyColors[level - 1]} text-white`
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Note (optional)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g., After coffee, post-workout..."
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleSaveEnergy}
              className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Save
            </button>
            <button
              onClick={() => {
                setShowInput(false)
                setNote('')
              }}
              className="flex-1 py-2 px-4 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Energy Tips */}
      <div className="bg-dark-card rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-300 mb-1">Energy Tip</p>
            <p className="text-xs text-gray-400">
              {currentEnergy >= 4
                ? 'Perfect time for complex problem-solving and creative work!'
                : currentEnergy >= 2
                ? 'Good for regular tasks and meetings. Stay hydrated!'
                : 'Focus on simple tasks. Consider a break or light exercise.'}
            </p>
          </div>
        </div>
      </div>

      {/* Trend Indicator */}
      {energyEntries.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <span className="text-sm text-gray-400">
            Track patterns to optimize your schedule
          </span>
        </div>
      )}
    </div>
  )
}