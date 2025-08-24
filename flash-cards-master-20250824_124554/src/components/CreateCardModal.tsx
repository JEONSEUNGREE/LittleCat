import React, { useState } from 'react'
import { X, Save, Layers } from 'lucide-react'
import { useFlashCardStore } from '../store/flashCardStore'

interface CreateCardModalProps {
  isOpen: boolean
  onClose: () => void
  deckId?: string
}

export const CreateCardModal: React.FC<CreateCardModalProps> = ({ isOpen, onClose }) => {
  const [front, setFront] = useState('')
  const [back, setBack] = useState('')
  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium')
  
  const { addCard } = useFlashCardStore()

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!front.trim() || !back.trim()) {
      alert('앞면과 뒷면을 모두 입력해주세요.')
      return
    }

    addCard({
      front: front.trim(),
      back: back.trim(),
      category: category.trim() || '일반',
      difficulty
    })

    // Reset form
    setFront('')
    setBack('')
    setCategory('')
    setDifficulty('medium')
    
    onClose()
  }

  const handleCancel = () => {
    setFront('')
    setBack('')
    setCategory('')
    setDifficulty('medium')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">새 카드 만들기</h2>
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Front side */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              앞면 (질문)
            </label>
            <textarea
              value={front}
              onChange={(e) => setFront(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              rows={3}
              placeholder="예: What is React?"
              required
            />
          </div>

          {/* Back side */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              뒷면 (답변)
            </label>
            <textarea
              value={back}
              onChange={(e) => setBack(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              rows={3}
              placeholder="예: A JavaScript library for building user interfaces"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Layers className="w-4 h-4 inline mr-1" />
              카테고리
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="예: 프로그래밍, 영어, 역사"
            />
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              난이도
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setDifficulty('easy')}
                className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                  difficulty === 'easy'
                    ? 'bg-green-100 text-green-700 border-2 border-green-300'
                    : 'bg-gray-100 text-gray-600 border-2 border-transparent'
                }`}
              >
                쉬움
              </button>
              <button
                type="button"
                onClick={() => setDifficulty('medium')}
                className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                  difficulty === 'medium'
                    ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300'
                    : 'bg-gray-100 text-gray-600 border-2 border-transparent'
                }`}
              >
                보통
              </button>
              <button
                type="button"
                onClick={() => setDifficulty('hard')}
                className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                  difficulty === 'hard'
                    ? 'bg-red-100 text-red-700 border-2 border-red-300'
                    : 'bg-gray-100 text-gray-600 border-2 border-transparent'
                }`}
              >
                어려움
              </button>
            </div>
          </div>

          {/* Preview */}
          {(front || back) && (
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs font-medium text-gray-500 mb-2">미리보기</p>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">앞:</span> {front || '(비어있음)'}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">뒤:</span> {back || '(비어있음)'}
                </p>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}