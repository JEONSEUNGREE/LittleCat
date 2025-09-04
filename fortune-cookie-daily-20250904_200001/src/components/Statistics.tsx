import React from 'react'
import { TrendingUp, Award, Hash, Star } from 'lucide-react'
import { useFortuneStore } from '../store/fortuneStore'

const Statistics: React.FC = () => {
  const { history, streak, totalOpened, favorites } = useFortuneStore()

  const getCategoryStats = () => {
    const stats: Record<string, number> = {}
    history.forEach(fortune => {
      stats[fortune.category] = (stats[fortune.category] || 0) + 1
    })
    return Object.entries(stats).sort((a, b) => b[1] - a[1])
  }

  const getMostFrequentNumbers = () => {
    const numberFrequency: Record<number, number> = {}
    history.forEach(fortune => {
      fortune.luckyNumbers?.forEach(num => {
        numberFrequency[num] = (numberFrequency[num] || 0) + 1
      })
    })
    return Object.entries(numberFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([num]) => parseInt(num))
  }

  const categoryStats = getCategoryStats()
  const frequentNumbers = getMostFrequentNumbers()

  return (
    <div className="m-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">연속 일수</span>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {streak}일
          </p>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">총 오픈</span>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {totalOpened}개
          </p>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">즐겨찾기</span>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {favorites.length}개
          </p>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Hash className="w-5 h-5 text-purple-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">평균/일</span>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {streak > 0 ? (totalOpened / streak).toFixed(1) : '0'}
          </p>
        </div>
      </div>

      {categoryStats.length > 0 && (
        <div className="glass-card p-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">
            카테고리별 통계
          </h3>
          <div className="space-y-2">
            {categoryStats.map(([category, count]) => (
              <div key={category} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                      style={{ width: `${(count / history.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 w-8 text-right">
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {frequentNumbers.length > 0 && (
        <div className="glass-card p-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">
            자주 나온 행운 번호
          </h3>
          <div className="flex gap-2 flex-wrap">
            {frequentNumbers.map((num) => (
              <span
                key={num}
                className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold shadow-lg"
              >
                {num}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Statistics