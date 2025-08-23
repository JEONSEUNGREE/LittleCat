import React, { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { useMoodStore } from '../store/useMoodStore'
import { MoodSelector } from './MoodSelector'

export const MoodEntry: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [note, setNote] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const { currentMood, currentEmoji, addEntry } = useMoodStore()

  const handleSubmit = () => {
    if (currentMood && currentEmoji) {
      addEntry({
        mood: currentMood,
        emoji: currentEmoji,
        note,
        tags,
      })
      setNote('')
      setTags([])
      setIsOpen(false)
    }
  }

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput])
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-primary-500 text-white rounded-full p-4 shadow-lg hover:bg-primary-600 active:scale-95 transition-all duration-200 z-50"
        aria-label="감정 기록하기"
      >
        <Plus size={28} />
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 animate-fade-in">
      <div className="bg-white w-full sm:w-96 sm:rounded-t-2xl sm:rounded-2xl p-6 max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">감정 기록하기</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="닫기"
          >
            <X size={24} />
          </button>
        </div>

        <MoodSelector />

        {currentMood && (
          <div className="mt-6 space-y-4 animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                무슨 일이 있었나요?
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="input-field resize-none h-24"
                placeholder="오늘의 기분에 대해 자유롭게 적어보세요..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                태그 추가
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  className="input-field flex-1"
                  placeholder="예: 운동, 친구, 날씨"
                />
                <button
                  onClick={handleAddTag}
                  className="btn-secondary px-4"
                  disabled={!tagInput}
                >
                  추가
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-secondary-900"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="btn-primary w-full"
            >
              기록 저장하기
            </button>
          </div>
        )}
      </div>
    </div>
  )
}