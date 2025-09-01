import { Droplets, Settings } from 'lucide-react'
import { useState } from 'react'
import { useWaterStore } from '../store/waterStore'

export default function Header() {
  const [showSettings, setShowSettings] = useState(false)
  const { dailyGoal, setDailyGoal } = useWaterStore()
  const [tempGoal, setTempGoal] = useState(dailyGoal.toString())

  const handleSaveGoal = () => {
    const goal = parseInt(tempGoal)
    if (goal > 0 && goal <= 10000) {
      setDailyGoal(goal)
      setShowSettings(false)
    }
  }

  return (
    <>
      <header className="bg-white rounded-2xl shadow-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Droplets className="text-water-500 w-8 h-8" />
          <div>
            <h1 className="text-xl font-bold text-gray-800">Water Track Pro</h1>
            <p className="text-xs text-gray-500">오늘도 건강한 하루!</p>
          </div>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Settings className="w-6 h-6 text-gray-600" />
        </button>
      </header>

      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">설정</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                일일 목표 (ml)
              </label>
              <input
                type="number"
                value={tempGoal}
                onChange={(e) => setTempGoal(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-water-500"
                min="500"
                max="10000"
                step="100"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowSettings(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={handleSaveGoal}
                className="flex-1 px-4 py-2 bg-water-500 text-white rounded-lg hover:bg-water-600"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}