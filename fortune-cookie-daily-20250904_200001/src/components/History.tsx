import React from 'react'
import { Calendar, Star, Trash2 } from 'lucide-react'
import { useFortuneStore } from '../store/fortuneStore'

const History: React.FC = () => {
  const { history, favorites, toggleFavorite, clearHistory } = useFortuneStore()

  if (history.length === 0) {
    return (
      <div className="glass-card m-4 p-8 text-center">
        <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600 dark:text-gray-300">
          아직 열어본 포춘쿠키가 없습니다
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          포춘쿠키를 열어 행운을 확인해보세요!
        </p>
      </div>
    )
  }

  return (
    <div className="m-4">
      <div className="glass-card p-4 mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            포춘 히스토리
          </h2>
          <button
            onClick={clearHistory}
            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            title="전체 삭제"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-3 max-h-[60vh] overflow-y-auto">
        {history.map((fortune) => (
          <div
            key={fortune.id}
            className="glass-card p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="fortune-text text-sm md:text-base mb-2">
                  "{fortune.text}"
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {fortune.date}
                  </span>
                  <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 rounded">
                    {fortune.category}
                  </span>
                </div>
                {fortune.luckyNumbers && (
                  <div className="flex gap-1 mt-2">
                    {fortune.luckyNumbers.map((num, idx) => (
                      <span
                        key={idx}
                        className="text-xs w-6 h-6 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full"
                      >
                        {num}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => toggleFavorite(fortune.id)}
                className={`p-2 rounded-lg transition-colors ${
                  favorites.includes(fortune.id)
                    ? 'text-yellow-500'
                    : 'text-gray-400 hover:text-yellow-500'
                }`}
              >
                <Star
                  className="w-5 h-5"
                  fill={favorites.includes(fortune.id) ? 'currentColor' : 'none'}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default History