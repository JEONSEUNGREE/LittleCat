import { useState } from 'react'
import { User, Bell, Target, LogOut, Save } from 'lucide-react'
import { useWaterStore } from '../store/useWaterStore'

interface SettingsProps {
  onLogout: () => void
}

export const Settings: React.FC<SettingsProps> = ({ onLogout }) => {
  const { profile, setProfile, dailyGoal } = useWaterStore()
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState(profile?.name || '')
  const [weight, setWeight] = useState(profile?.weight.toString() || '')
  const [activityLevel, setActivityLevel] = useState(profile?.activityLevel || 'moderate')
  const [notifications, setNotifications] = useState(true)

  const handleSave = () => {
    if (profile && name && weight) {
      setProfile({
        ...profile,
        name,
        weight: Number(weight),
        activityLevel: activityLevel as 'low' | 'moderate' | 'high'
      })
      setEditMode(false)
    }
  }

  return (
    <div className="min-h-screen p-4 pb-20">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">설정</h2>
      
      <div className="max-w-md mx-auto space-y-4">
        {/* Profile Settings */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 animate-drop">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <User className="w-5 h-5 text-water-blue" />
              프로필 설정
            </h3>
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="text-water-blue font-medium text-sm hover:text-water-dark"
              >
                수정
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="text-green-600 font-medium text-sm hover:text-green-700 flex items-center gap-1"
              >
                <Save className="w-4 h-4" />
                저장
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">이름</label>
              {editMode ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-water-blue focus:border-transparent"
                />
              ) : (
                <div className="text-gray-800 font-medium">{profile?.name}</div>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1 block">체중 (kg)</label>
              {editMode ? (
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-water-blue focus:border-transparent"
                  min="30"
                  max="200"
                />
              ) : (
                <div className="text-gray-800 font-medium">{profile?.weight}kg</div>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1 block">활동량</label>
              {editMode ? (
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-water-blue focus:border-transparent"
                >
                  <option value="low">낮음</option>
                  <option value="moderate">보통</option>
                  <option value="high">높음</option>
                </select>
              ) : (
                <div className="text-gray-800 font-medium">
                  {profile?.activityLevel === 'low' ? '낮음' : 
                   profile?.activityLevel === 'moderate' ? '보통' : '높음'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Goal Settings */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 animate-drop">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Target className="w-5 h-5 text-water-blue" />
              일일 목표
            </h3>
          </div>
          <div className="text-3xl font-bold text-water-blue text-center">
            {dailyGoal}ml
          </div>
          <p className="text-sm text-gray-500 text-center mt-2">
            체중과 활동량을 기반으로 자동 계산됩니다
          </p>
        </div>

        {/* Notification Settings */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 animate-drop">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-water-blue" />
              <div>
                <h3 className="font-semibold text-gray-800">알림</h3>
                <p className="text-sm text-gray-500">수분 섭취 리마인더</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                notifications ? 'bg-water-blue' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                notifications ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full bg-red-500 text-white font-semibold py-4 rounded-2xl hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          로그아웃
        </button>

        {/* App Info */}
        <div className="text-center text-white/60 text-sm pt-4">
          <p>Water Balance Tracker v0.0.1</p>
          <p className="mt-1">© 2025 All rights reserved</p>
        </div>
      </div>
    </div>
  )
}