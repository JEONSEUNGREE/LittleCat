import { useState } from 'react'
import { Settings as SettingsIcon, Target, TrendingUp, Info } from 'lucide-react'
import useCadenceStore from '../store/useCadenceStore'

const Settings: React.FC = () => {
  const { targetCadence, weeklyGoal, setTargetCadence, setWeeklyGoal } = useCadenceStore()
  const [localTarget, setLocalTarget] = useState(targetCadence.toString())
  const [localGoal, setLocalGoal] = useState(weeklyGoal.toString())
  const [showInfo, setShowInfo] = useState(false)

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocalTarget(value)
    const num = parseInt(value)
    if (!isNaN(num) && num > 0 && num <= 220) {
      setTargetCadence(num)
    }
  }

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocalGoal(value)
    const num = parseInt(value)
    if (!isNaN(num) && num > 0) {
      setWeeklyGoal(num)
    }
  }

  const presetCadences = [
    { label: 'Walking', value: 110, description: 'Casual pace' },
    { label: 'Brisk Walk', value: 130, description: 'Power walking' },
    { label: 'Slow Jog', value: 160, description: 'Easy running' },
    { label: 'Running', value: 170, description: 'Optimal cadence' },
    { label: 'Fast Run', value: 180, description: 'Performance pace' },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <SettingsIcon className="text-primary-500" size={24} />
          Settings
        </h2>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Info size={20} className="text-gray-500" />
        </button>
      </div>

      {showInfo && (
        <div className="mb-4 p-4 bg-blue-50 rounded-xl text-sm text-blue-700">
          <p className="mb-2">
            <strong>Optimal Cadence:</strong> Most runners perform best at 170-180 steps per minute.
          </p>
          <p>
            Higher cadence reduces impact forces and improves running efficiency. Start with small increases to avoid injury.
          </p>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
            <Target size={16} />
            Target Cadence (SPM)
          </label>
          <input
            type="number"
            value={localTarget}
            onChange={handleTargetChange}
            min="60"
            max="220"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          
          <div className="mt-3 flex flex-wrap gap-2">
            {presetCadences.map((preset) => (
              <button
                key={preset.value}
                onClick={() => {
                  setLocalTarget(preset.value.toString())
                  setTargetCadence(preset.value)
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  targetCadence === preset.value
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div>{preset.label}</div>
                <div className="text-xs opacity-75">{preset.value} SPM</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
            <TrendingUp size={16} />
            Weekly Step Goal
          </label>
          <input
            type="number"
            value={localGoal}
            onChange={handleGoalChange}
            min="1000"
            step="1000"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          
          <div className="mt-3 flex flex-wrap gap-2">
            {[10000, 25000, 50000, 75000, 100000].map((goal) => (
              <button
                key={goal}
                onClick={() => {
                  setLocalGoal(goal.toString())
                  setWeeklyGoal(goal)
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  weeklyGoal === goal
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {(goal / 1000).toFixed(0)}K
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Tips for Better Cadence</h3>
          <ul className="space-y-1 text-xs text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-0.5">•</span>
              <span>Land with your foot under your center of gravity</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-0.5">•</span>
              <span>Keep your strides short and quick</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-0.5">•</span>
              <span>Focus on lifting your feet rather than pushing off</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500 mt-0.5">•</span>
              <span>Use a metronome or music with your target BPM</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Settings