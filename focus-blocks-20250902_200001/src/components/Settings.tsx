import React, { useState } from 'react'
import { Settings as SettingsIcon, X, Save } from 'lucide-react'
import useFocusStore from '../store/useFocusStore'

interface SettingsProps {
  isOpen: boolean
  onClose: () => void
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const { focusPatterns } = useFocusStore()
  const [customPattern, setCustomPattern] = useState<number[]>(focusPatterns)
  const [notifications, setNotifications] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [theme, setTheme] = useState('gradient')

  const handleSave = () => {
    // Save settings to store (would need to extend the store)
    console.log('Settings saved:', { customPattern, notifications, soundEnabled, theme })
    onClose()
  }

  const presetPatterns = [
    { name: 'Classic Pomodoro', pattern: [25, 5, 25, 5, 25, 5, 25, 15] },
    { name: 'Deep Work', pattern: [45, 10, 45, 10, 45, 20] },
    { name: 'Quick Sprint', pattern: [15, 3, 15, 3, 15, 10] },
    { name: 'Ultra Focus', pattern: [60, 15, 60, 15, 60, 30] }
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <SettingsIcon size={24} />
            Settings
          </h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Preset Patterns */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Focus Patterns</h3>
            <div className="space-y-2">
              {presetPatterns.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => setCustomPattern(preset.pattern)}
                  className="w-full bg-white/10 hover:bg-white/20 rounded-xl p-3 text-left transition-colors"
                >
                  <p className="text-white font-medium">{preset.name}</p>
                  <p className="text-white/60 text-sm">
                    {preset.pattern.filter((_, i) => i % 2 === 0).join('-')} minutes
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Pattern */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Custom Pattern</h3>
            <div className="grid grid-cols-4 gap-2">
              {customPattern.slice(0, 8).map((value, index) => (
                <div key={index} className="text-center">
                  <label className="text-white/60 text-xs">
                    {index % 2 === 0 ? 'Focus' : 'Break'}
                  </label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => {
                      const newPattern = [...customPattern]
                      newPattern[index] = parseInt(e.target.value) || 0
                      setCustomPattern(newPattern)
                    }}
                    className="w-full bg-white/10 text-white rounded-lg p-2 text-center"
                    min="1"
                    max="120"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Notifications</h3>
            <label className="flex items-center justify-between bg-white/10 rounded-xl p-3">
              <span className="text-white">Enable notifications</span>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="w-5 h-5 rounded"
              />
            </label>
          </div>

          {/* Sound */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Sound</h3>
            <label className="flex items-center justify-between bg-white/10 rounded-xl p-3">
              <span className="text-white">Enable sound alerts</span>
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
                className="w-5 h-5 rounded"
              />
            </label>
          </div>

          {/* Theme */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Theme</h3>
            <div className="grid grid-cols-3 gap-2">
              {['gradient', 'dark', 'light'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`capitalize bg-white/10 rounded-xl p-3 transition-colors ${
                    theme === t ? 'bg-white/30 ring-2 ring-white' : 'hover:bg-white/20'
                  }`}
                >
                  <span className="text-white">{t}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white rounded-xl p-3 font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <Save size={20} />
          Save Settings
        </button>
      </div>
    </div>
  )
}

export default Settings