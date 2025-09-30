import { useState } from 'react'
import { Clock, Zap, Coffee, Mountain } from 'lucide-react'
import { useFocusStore } from '../store/useFocusStore'

const presetSessions = [
  { name: '포모도로', duration: 25, icon: Zap, color: 'from-orange-400 to-red-500' },
  { name: '짧은 집중', duration: 15, icon: Coffee, color: 'from-green-400 to-teal-500' },
  { name: '딥 워크', duration: 45, icon: Mountain, color: 'from-purple-400 to-pink-500' },
  { name: '장기 집중', duration: 60, icon: Clock, color: 'from-blue-400 to-indigo-500' }
]

export const SessionInput: React.FC = () => {
  const [taskName, setTaskName] = useState('')
  const [selectedDuration, setSelectedDuration] = useState(25)
  const [customDuration, setCustomDuration] = useState(false)
  const startSession = useFocusStore(state => state.startSession)

  const handleStart = () => {
    if (!taskName.trim()) {
      setTaskName('집중 세션')
    }
    startSession(taskName || '집중 세션', selectedDuration)
  }

  return (
    <div className="glass-effect rounded-3xl p-6 sm:p-8 space-y-6">
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        새로운 포커스 세션 시작
      </h2>

      {/* Task Name Input */}
      <div>
        <label className="block text-white/80 text-sm mb-2">작업 이름</label>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="예: 프로젝트 기획서 작성"
          className="w-full px-4 py-3 rounded-xl glass-effect text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
        />
      </div>

      {/* Preset Duration Selection */}
      <div>
        <label className="block text-white/80 text-sm mb-3">집중 시간 선택</label>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {presetSessions.map((preset) => {
            const Icon = preset.icon
            return (
              <button
                key={preset.name}
                onClick={() => {
                  setSelectedDuration(preset.duration)
                  setCustomDuration(false)
                }}
                className={`glass-effect p-4 rounded-xl transition-all hover:scale-105 ${
                  selectedDuration === preset.duration && !customDuration
                    ? 'ring-2 ring-white/50 bg-white/20'
                    : ''
                }`}
              >
                <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br ${preset.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-white font-semibold">{preset.name}</div>
                <div className="text-white/60 text-sm">{preset.duration}분</div>
              </button>
            )
          })}
        </div>

        {/* Custom Duration */}
        <div className="glass-effect rounded-xl p-4">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-white/80">사용자 설정</span>
            <input
              type="checkbox"
              checked={customDuration}
              onChange={(e) => setCustomDuration(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-12 h-6 rounded-full transition-colors ${
              customDuration ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'bg-white/20'
            }`}>
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                customDuration ? 'translate-x-6' : 'translate-x-0.5'
              } mt-0.5`} />
            </div>
          </label>
          
          {customDuration && (
            <div className="mt-3 flex items-center gap-3">
              <input
                type="range"
                min="5"
                max="120"
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(Number(e.target.value))}
                className="flex-1 accent-purple-500"
              />
              <span className="text-white font-semibold w-16 text-right">
                {selectedDuration}분
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={handleStart}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-xl"
      >
        포커스 세션 시작
      </button>
    </div>
  )
}