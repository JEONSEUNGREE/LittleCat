import React, { useState } from 'react'
import { X, Plus, Minus } from 'lucide-react'
import useMemoryStore from '../store/memoryStore'

interface AddCardModalProps {
  isOpen: boolean
  onClose: () => void
}

const AddCardModal: React.FC<AddCardModalProps> = ({ isOpen, onClose }) => {
  const [front, setFront] = useState('')
  const [back, setBack] = useState('')
  const [category, setCategory] = useState('')
  const [bpm, setBpm] = useState(120)
  const [rhythm, setRhythm] = useState<number[]>([1, 0, 1, 0])
  const [difficulty, setDifficulty] = useState(1)
  
  const { addCard, getCategories } = useMemoryStore()
  const categories = getCategories()
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!front || !back || !category) return
    
    addCard({
      front,
      back,
      category,
      bpm,
      rhythm,
      difficulty
    })
    
    // Reset form
    setFront('')
    setBack('')
    setCategory('')
    setBpm(120)
    setRhythm([1, 0, 1, 0])
    setDifficulty(1)
    onClose()
  }
  
  const toggleBeat = (index: number) => {
    const newRhythm = [...rhythm]
    newRhythm[index] = newRhythm[index] === 1 ? 0 : 1
    setRhythm(newRhythm)
  }
  
  const addBeat = () => {
    if (rhythm.length < 16) {
      setRhythm([...rhythm, 0])
    }
  }
  
  const removeBeat = () => {
    if (rhythm.length > 2) {
      setRhythm(rhythm.slice(0, -1))
    }
  }
  
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">새 카드 추가</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              질문 (앞면)
            </label>
            <input
              type="text"
              value={front}
              onChange={(e) => setFront(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rhythm-500"
              placeholder="예: 한국의 수도"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              답변 (뒷면)
            </label>
            <input
              type="text"
              value={back}
              onChange={(e) => setBack(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rhythm-500"
              placeholder="예: 서울"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              카테고리
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rhythm-500"
                placeholder="예: 지리"
                list="categories"
                required
              />
              <datalist id="categories">
                {categories.filter(cat => cat !== '전체').map(cat => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              리듬 패턴
            </label>
            <div className="flex items-center gap-2 mb-2">
              {rhythm.map((beat, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => toggleBeat(index)}
                  className={`w-8 h-12 rounded transition-colors ${
                    beat === 1
                      ? 'bg-rhythm-500 hover:bg-rhythm-600'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                />
              ))}
              <button
                type="button"
                onClick={addBeat}
                className="p-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
              <button
                type="button"
                onClick={removeBeat}
                className="p-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              BPM: {bpm}
            </label>
            <input
              type="range"
              min="60"
              max="180"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              난이도
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setDifficulty(level)}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    difficulty === level
                      ? 'bg-rhythm-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-rhythm-500 text-white rounded-lg hover:bg-rhythm-600 transition-colors"
            >
              추가
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCardModal