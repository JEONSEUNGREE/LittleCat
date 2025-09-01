import { Calendar, Clock, Edit2, Trash2 } from 'lucide-react'
import { useHRVStore } from '../store/hrvStore'
import { useState } from 'react'

export default function HistoryView() {
  const { measurements } = useHRVStore()
  const [filter, setFilter] = useState<'all' | 'today' | 'week'>('all')

  const getFilteredMeasurements = () => {
    const now = new Date()
    switch (filter) {
      case 'today':
        return measurements.filter(m => 
          m.timestamp.toDateString() === now.toDateString()
        )
      case 'week':
        return measurements.filter(m => 
          m.timestamp.getTime() > now.getTime() - 7 * 24 * 60 * 60 * 1000
        )
      default:
        return measurements
    }
  }

  const filteredMeasurements = getFilteredMeasurements()

  const getStressColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'high': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const formatDate = (date: Date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return '오늘'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return '어제'
    } else {
      return date.toLocaleDateString('ko-KR', { 
        month: 'long', 
        day: 'numeric',
        weekday: 'short'
      })
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-dark">측정 기록</h2>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            전체
          </button>
          <button
            onClick={() => setFilter('today')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              filter === 'today' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            오늘
          </button>
          <button
            onClick={() => setFilter('week')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              filter === 'week' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            이번 주
          </button>
        </div>
      </div>

      {filteredMeasurements.length > 0 ? (
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {filteredMeasurements.map((measurement) => (
            <div
              key={measurement.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl font-bold text-dark">
                      {measurement.value}ms
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStressColor(measurement.stressLevel)}`}>
                      {measurement.stressLevel === 'low' ? '낮음' : 
                       measurement.stressLevel === 'medium' ? '보통' : '높음'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(measurement.timestamp)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>
                        {measurement.timestamp.toLocaleTimeString('ko-KR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                  {measurement.note && (
                    <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-600">
                      {measurement.note}
                    </div>
                  )}
                </div>
                <div className="flex space-x-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">측정 기록이 없습니다</p>
          <p className="text-sm text-gray-400 mt-2">
            측정 탭에서 HRV를 측정해보세요
          </p>
        </div>
      )}

      {filteredMeasurements.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">평균 HRV</p>
              <p className="text-xl font-bold text-dark">
                {Math.round(
                  filteredMeasurements.reduce((sum, m) => sum + m.value, 0) / 
                  filteredMeasurements.length
                )}ms
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">최고 HRV</p>
              <p className="text-xl font-bold text-green-600">
                {Math.max(...filteredMeasurements.map(m => m.value))}ms
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">최저 HRV</p>
              <p className="text-xl font-bold text-red-600">
                {Math.min(...filteredMeasurements.map(m => m.value))}ms
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">측정 횟수</p>
              <p className="text-xl font-bold text-dark">
                {filteredMeasurements.length}회
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}