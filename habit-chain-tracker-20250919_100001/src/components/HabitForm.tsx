import React, { useState } from 'react'
import { Plus, X } from 'lucide-react'
import useHabitStore from '../store/habitStore'

interface HabitFormProps {
  onClose: () => void
}

const PRESET_COLORS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#ef4444',
  '#f59e0b', '#10b981', '#14b8a6', '#3b82f6'
]

const HabitForm: React.FC<HabitFormProps> = ({ onClose }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [targetDays, setTargetDays] = useState(30)
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0])
  
  const addHabit = useHabitStore((state) => state.addHabit)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (name.trim()) {
      addHabit({
        name: name.trim(),
        description: description.trim(),
        color: selectedColor,
        targetDays
      })
      onClose()
    }
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">새 습관 추가</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              습관 이름
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="예: 매일 운동하기"
              autoFocus
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              설명 (선택사항)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder="습관에 대한 간단한 설명"
              rows={2}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              목표 기간 (일)
            </label>
            <input
              type="number"
              value={targetDays}
              onChange={(e) => setTargetDays(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              min="1"
              max="365"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              색상 선택
            </label>
            <div className="flex gap-2 flex-wrap">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-lg transition-all ${
                    selectedColor === color 
                      ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' 
                      : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-opacity-90 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            습관 추가하기
          </button>
        </form>
      </div>
    </div>
  )
}

export default HabitForm