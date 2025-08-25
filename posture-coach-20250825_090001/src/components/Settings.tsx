import React from 'react'
import { Settings as SettingsIcon, Bell, Volume2, Vibrate, Target, Clock, Info } from 'lucide-react'
import { usePostureStore } from '../store'

const Settings: React.FC = () => {
  const {
    dailyGoal,
    alertInterval,
    soundEnabled,
    vibrationEnabled,
    setDailyGoal,
    setAlertInterval,
    toggleSound,
    toggleVibration,
  } = usePostureStore()
  
  const handleDailyGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value) && value > 0 && value <= 480) {
      setDailyGoal(value)
    }
  }
  
  const handleAlertIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value) && value > 0 && value <= 120) {
      setAlertInterval(value)
    }
  }
  
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <SettingsIcon className="w-7 h-7 text-white" />
        <h2 className="text-2xl font-bold text-white">설정</h2>
      </div>
      
      <div className="space-y-6">
        {/* Daily Goal Setting */}
        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <Target className="w-5 h-5 text-primary-400" />
            <label className="text-white font-semibold">일일 목표</label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="15"
              max="480"
              step="15"
              value={dailyGoal}
              onChange={handleDailyGoalChange}
              className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${
                  (dailyGoal / 480) * 100
                }%, rgba(255,255,255,0.2) ${(dailyGoal / 480) * 100}%, rgba(255,255,255,0.2) 100%)`,
              }}
            />
            <div className="text-white font-mono w-20 text-right">
              {dailyGoal}분
            </div>
          </div>
          <p className="text-white/60 text-sm mt-2">
            매일 {dailyGoal}분 동안 좋은 자세를 유지하세요
          </p>
        </div>
        
        {/* Alert Interval Setting */}
        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-5 h-5 text-primary-400" />
            <label className="text-white font-semibold">알림 간격</label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="5"
              max="120"
              step="5"
              value={alertInterval}
              onChange={handleAlertIntervalChange}
              className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${
                  (alertInterval / 120) * 100
                }%, rgba(255,255,255,0.2) ${(alertInterval / 120) * 100}%, rgba(255,255,255,0.2) 100%)`,
              }}
            />
            <div className="text-white font-mono w-20 text-right">
              {alertInterval}분
            </div>
          </div>
          <p className="text-white/60 text-sm mt-2">
            자세가 나쁠 때 {alertInterval}분마다 알림을 받습니다
          </p>
        </div>
        
        {/* Notification Settings */}
        <div className="space-y-3">
          <button
            onClick={toggleSound}
            className={`w-full bg-white/5 hover:bg-white/10 rounded-xl p-4 flex items-center justify-between transition-all ${
              soundEnabled ? 'ring-2 ring-primary-500' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-primary-400" />
              <div className="text-left">
                <p className="text-white font-semibold">소리 알림</p>
                <p className="text-white/60 text-sm">알림음 재생</p>
              </div>
            </div>
            <div
              className={`w-12 h-6 rounded-full transition-all ${
                soundEnabled ? 'bg-primary-500' : 'bg-white/20'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-all transform ${
                  soundEnabled ? 'translate-x-6' : 'translate-x-0.5'
                } mt-0.5`}
              />
            </div>
          </button>
          
          <button
            onClick={toggleVibration}
            className={`w-full bg-white/5 hover:bg-white/10 rounded-xl p-4 flex items-center justify-between transition-all ${
              vibrationEnabled ? 'ring-2 ring-primary-500' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <Vibrate className="w-5 h-5 text-primary-400" />
              <div className="text-left">
                <p className="text-white font-semibold">진동 알림</p>
                <p className="text-white/60 text-sm">기기 진동</p>
              </div>
            </div>
            <div
              className={`w-12 h-6 rounded-full transition-all ${
                vibrationEnabled ? 'bg-primary-500' : 'bg-white/20'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-all transform ${
                  vibrationEnabled ? 'translate-x-6' : 'translate-x-0.5'
                } mt-0.5`}
              />
            </div>
          </button>
        </div>
        
        {/* Info Section */}
        <div className="bg-primary-500/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary-400 mt-0.5" />
            <div>
              <p className="text-white/90 text-sm">
                <strong>사용 팁:</strong> 정기적인 스트레칭과 함께 사용하면 더욱 효과적입니다.
                30분마다 한 번씩 일어나서 몸을 움직여주세요!
              </p>
            </div>
          </div>
        </div>
        
        {/* App Version */}
        <div className="text-center pt-4 border-t border-white/10">
          <p className="text-white/40 text-sm">
            Posture Coach v1.0.0
            <br />
            <span className="text-xs">자세 교정 트레이너</span>
          </p>
        </div>
      </div>
    </div>
  )
}