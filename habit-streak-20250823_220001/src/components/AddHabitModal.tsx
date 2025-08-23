import { useState } from 'react'
import { X } from 'lucide-react'
import useHabitStore from '../store/habitStore'

interface AddHabitModalProps {
  isOpen: boolean
  onClose: () => void
}

const EMOJI_OPTIONS = ['💪', '📚', '💧', '🏃', '🧘', '🎯', '✍️', '🎨', '🌱', '🎵', '💻', '🍎']
const COLOR_OPTIONS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316']

const AddHabitModal = ({ isOpen, onClose }: AddHabitModalProps) => {
  const [name, setName] = useState('')
  const [selectedEmoji, setSelectedEmoji] = useState('💪')
  const [selectedColor, setSelectedColor] = useState('#6366f1')
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>('daily')
  const [targetCount, setTargetCount] = useState(1)
  
  const addHabit = useHabitStore((state) => state.addHabit)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    addHabit({
      name: name.trim(),
      icon: selectedEmoji,
      color: selectedColor,
      frequency,
      targetCount,
    })

    setName('')
    setSelectedEmoji('💪')
    setSelectedColor('#6366f1')
    setFrequency('daily')
    setTargetCount(1)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">새 습관 추가</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors tap-highlight-none"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              습관 이름
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="예: 운동하기, 책 읽기"
              autoFocus
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              아이콘 선택
            </label>
            <div className="grid grid-cols-6 gap-2">
              {EMOJI_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`p-3 text-2xl rounded-lg transition-all tap-highlight-none ${
                    selectedEmoji === emoji
                      ? 'bg-primary bg-opacity-20 ring-2 ring-primary'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              색상 선택
            </label>
            <div className="flex gap-2">
              {COLOR_OPTIONS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-lg transition-all tap-highlight-none ${
                    selectedColor === color ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              주기
            </label>
            <div className="flex gap-2">
              {(['daily', 'weekly', 'monthly'] as const).map((freq) => (
                <button
                  key={freq}
                  type="button"
                  onClick={() => setFrequency(freq)}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all tap-highlight-none ${
                    frequency === freq
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {freq === 'daily' ? '매일' : freq === 'weekly' ? '매주' : '매월'}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors tap-highlight-none"
          >
            습관 추가하기
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddHabitModal