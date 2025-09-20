import { useState } from 'react'
import { X, Coffee, Cigarette, ShoppingBag, Gamepad2, Pizza, Beer, Car, Tv } from 'lucide-react'

interface AddHabitModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (habit: { name: string; icon: string; dailySaving: number; color: string }) => void
}

const presetHabits = [
  { name: '커피', icon: '☕', color: 'bg-amber-500', defaultSaving: 5000 },
  { name: '담배', icon: '🚬', color: 'bg-gray-600', defaultSaving: 4500 },
  { name: '쇼핑', icon: '🛍️', color: 'bg-pink-500', defaultSaving: 10000 },
  { name: '게임', icon: '🎮', color: 'bg-purple-600', defaultSaving: 3000 },
  { name: '배달음식', icon: '🍕', color: 'bg-red-500', defaultSaving: 15000 },
  { name: '술', icon: '🍺', color: 'bg-yellow-600', defaultSaving: 20000 },
  { name: '택시', icon: '🚖', color: 'bg-blue-500', defaultSaving: 8000 },
  { name: '넷플릭스', icon: '📺', color: 'bg-red-600', defaultSaving: 2000 },
]

const AddHabitModal: React.FC<AddHabitModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null)
  const [customName, setCustomName] = useState('')
  const [customSaving, setCustomSaving] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedPreset !== null) {
      const preset = presetHabits[selectedPreset]
      const saving = customSaving ? parseInt(customSaving) : preset.defaultSaving
      onAdd({
        name: customName || preset.name,
        icon: preset.icon,
        dailySaving: saving,
        color: preset.color
      })
    } else if (customName && customSaving) {
      onAdd({
        name: customName,
        icon: '💡',
        dailySaving: parseInt(customSaving),
        color: 'bg-indigo-500'
      })
    }

    setSelectedPreset(null)
    setCustomName('')
    setCustomSaving('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="glass-card w-full max-w-md p-6 animate-bounce-slow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">새 습관 추가</h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-white/80 text-sm font-medium mb-3">
              습관 선택
            </label>
            <div className="grid grid-cols-4 gap-3">
              {presetHabits.map((habit, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setSelectedPreset(index)
                    setCustomName(habit.name)
                    setCustomSaving(habit.defaultSaving.toString())
                  }}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedPreset === index 
                      ? 'border-accent bg-white/20' 
                      : 'border-white/20 bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <div className="text-2xl mb-1">{habit.icon}</div>
                  <div className="text-xs text-white">{habit.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-white/80 text-sm font-medium mb-2">
              습관 이름
            </label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="예: 야식"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-accent"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-white/80 text-sm font-medium mb-2">
              매번 저축할 금액
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70">
                ₩
              </span>
              <input
                type="number"
                value={customSaving}
                onChange={(e) => setCustomSaving(e.target.value)}
                placeholder="5000"
                className="w-full pl-8 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-accent"
                required
                min="100"
                step="100"
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all"
            >
              추가하기
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddHabitModal