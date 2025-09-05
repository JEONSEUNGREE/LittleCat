import { useState } from 'react'
import { X, Plus, Trash2, Clock } from 'lucide-react'
import { useSyncStore } from '../store/useSyncStore'

interface CreateDecisionProps {
  onClose: () => void
}

const CreateDecision: React.FC<CreateDecisionProps> = ({ onClose }) => {
  const { currentUser, addDecision } = useSyncStore()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [options, setOptions] = useState<{ text: string; color: string }[]>([
    { text: '', color: '#FF6F61' },
    { text: '', color: '#88D8B0' }
  ])
  const [duration, setDuration] = useState(24) // hours

  const colors = ['#FF6F61', '#88D8B0', '#6B5B95', '#FFD662', '#6BA292', '#FF8A65']

  const handleAddOption = () => {
    if (options.length < 6) {
      setOptions([...options, { text: '', color: colors[options.length % colors.length] }])
    }
  }

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index))
    }
  }

  const handleOptionChange = (index: number, text: string) => {
    const newOptions = [...options]
    newOptions[index].text = text
    setOptions(newOptions)
  }

  const handleSubmit = () => {
    if (!currentUser || !title || options.some(opt => !opt.text)) return

    const newDecision = {
      id: Date.now().toString(),
      title,
      description,
      options: options.map((opt, index) => ({
        id: `opt-${index}`,
        text: opt.text,
        votes: 0,
        voters: [],
        color: opt.color
      })),
      createdBy: currentUser.id,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + duration * 60 * 60 * 1000),
      participants: [currentUser],
      status: 'active' as const
    }

    addDecision(newDecision)
    onClose()
  }

  const isValid = title && options.every(opt => opt.text)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-sync-dark">새 결정 만들기</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                제목
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="무엇을 결정하시나요?"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sync-primary focus:border-transparent"
                maxLength={50}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                설명 (선택)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="자세한 설명을 추가해주세요"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sync-primary focus:border-transparent resize-none"
                rows={3}
                maxLength={200}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                선택지 (최소 2개, 최대 6개)
              </label>
              <div className="space-y-2">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full shrink-0"
                      style={{ backgroundColor: option.color }}
                    />
                    <input
                      type="text"
                      value={option.text}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`선택지 ${index + 1}`}
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sync-primary focus:border-transparent"
                      maxLength={30}
                    />
                    {options.length > 2 && (
                      <button
                        onClick={() => handleRemoveOption(index)}
                        className="p-2 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {options.length < 6 && (
                <button
                  onClick={handleAddOption}
                  className="mt-2 flex items-center gap-2 text-sync-primary hover:text-sync-secondary transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">선택지 추가</span>
                </button>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                마감 시간
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sync-primary focus:border-transparent"
              >
                <option value={1}>1시간</option>
                <option value={3}>3시간</option>
                <option value={6}>6시간</option>
                <option value={12}>12시간</option>
                <option value={24}>24시간</option>
                <option value={48}>48시간</option>
                <option value={72}>72시간</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isValid}
              className={`
                flex-1 py-3 px-4 rounded-lg font-medium transition-colors
                ${isValid 
                  ? 'bg-sync-primary text-white hover:bg-sync-secondary' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              만들기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateDecision