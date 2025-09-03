import { useState } from 'react'
import { Settings as SettingsIcon, X, Target, Clock, Volume2, Bell } from 'lucide-react'
import { useTimerStore } from '../store/useTimerStore'

export const Settings: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { dailyGoal, setDailyGoal } = useTimerStore()
  const [focusDuration, setFocusDuration] = useState(25)
  const [breakDuration, setBreakDuration] = useState(5)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  const handleSave = () => {
    // Save settings to localStorage
    localStorage.setItem('focusDuration', focusDuration.toString())
    localStorage.setItem('breakDuration', breakDuration.toString())
    localStorage.setItem('soundEnabled', soundEnabled.toString())
    localStorage.setItem('notificationsEnabled', notificationsEnabled.toString())
    setIsOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 glass p-3 rounded-full text-white hover:bg-white/20 transition"
      >
        <SettingsIcon className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-dark rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-xl font-bold">Settings</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-white mb-2">
                  <Target className="w-5 h-5" />
                  Daily Goal
                </label>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={dailyGoal}
                  onChange={(e) => setDailyGoal(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-white/70 text-sm mt-1 text-center">
                  {dailyGoal} sessions per day
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-white mb-2">
                  <Clock className="w-5 h-5" />
                  Focus Duration
                </label>
                <input
                  type="range"
                  min="15"
                  max="60"
                  step="5"
                  value={focusDuration}
                  onChange={(e) => setFocusDuration(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-white/70 text-sm mt-1 text-center">
                  {focusDuration} minutes
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-white mb-2">
                  <Coffee className="w-5 h-5" />
                  Break Duration
                </label>
                <input
                  type="range"
                  min="3"
                  max="15"
                  value={breakDuration}
                  onChange={(e) => setBreakDuration(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-white/70 text-sm mt-1 text-center">
                  {breakDuration} minutes
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={soundEnabled}
                    onChange={(e) => setSoundEnabled(e.target.checked)}
                    className="w-5 h-5 rounded"
                  />
                  <div className="flex items-center gap-2 text-white">
                    <Volume2 className="w-5 h-5" />
                    <span>Sound Effects</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationsEnabled}
                    onChange={(e) => setNotificationsEnabled(e.target.checked)}
                    className="w-5 h-5 rounded"
                  />
                  <div className="flex items-center gap-2 text-white">
                    <Bell className="w-5 h-5" />
                    <span>Notifications</span>
                  </div>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Fix the missing import
import { Coffee } from 'lucide-react'