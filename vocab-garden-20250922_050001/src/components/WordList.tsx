import { useState } from 'react'
import { Plus, Book, Star, Calendar } from 'lucide-react'
import { useGardenStore } from '../store/useGardenStore'

const WordList: React.FC = () => {
  const { words, addWord } = useGardenStore()
  const [showAddForm, setShowAddForm] = useState(false)
  const [newWord, setNewWord] = useState('')
  const [newMeaning, setNewMeaning] = useState('')

  const handleAddWord = (e: React.FormEvent) => {
    e.preventDefault()
    if (newWord.trim() && newMeaning.trim()) {
      addWord({ word: newWord.trim(), meaning: newMeaning.trim() })
      setNewWord('')
      setNewMeaning('')
      setShowAddForm(false)
    }
  }

  const formatDate = (date?: Date) => {
    if (!date) return '학습 전'
    const d = new Date(date)
    return `${d.getMonth() + 1}/${d.getDate()}`
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Book className="w-6 h-6 text-purple-500" />
          내 단어장
        </h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="p-2 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors"
        >
          <Plus className="w-5 h-5 text-purple-600" />
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddWord} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="영어 단어"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              autoFocus
            />
            <input
              type="text"
              placeholder="한국어 뜻"
              value={newMeaning}
              onChange={(e) => setNewMeaning(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium"
            >
              추가
            </button>
          </div>
        </form>
      )}

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {words.map((word) => (
          <div
            key={word.id}
            className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              word.learned 
                ? 'bg-green-50 border-green-200' 
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {word.word}
                  </h3>
                  {word.learned && (
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  )}
                </div>
                <p className="text-gray-600">{word.meaning}</p>
              </div>
              <div className="text-right text-sm">
                <div className="flex items-center gap-1 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(word.lastReviewed)}</span>
                </div>
                <div className="flex gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < word.level ? 'bg-yellow-400' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          <strong>팁:</strong> 단어를 5단계까지 학습하면 완전히 익힌 것으로 표시됩니다!
        </p>
      </div>
    </div>
  )
}

export default WordList