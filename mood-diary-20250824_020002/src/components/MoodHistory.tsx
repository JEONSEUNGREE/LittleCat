import React from 'react'
import { Calendar, Clock, Hash, Trash2 } from 'lucide-react'
import { useMoodStore } from '../store/useMoodStore'

export const MoodHistory: React.FC = () => {
  const { entries, deleteEntry } = useMoodStore()

  const formatDate = (date: Date) => {
    const d = new Date(date)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (d.toDateString() === today.toDateString()) {
      return '오늘'
    } else if (d.toDateString() === yesterday.toDateString()) {
      return '어제'
    } else {
      return d.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })
    }
  }

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  if (entries.length === 0) {
    return (
      <div className="mood-card p-8 text-center">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          아직 기록이 없어요
        </h3>
        <p className="text-gray-500 text-sm">
          첫 감정을 기록해보세요!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 px-1">감정 기록</h2>
      {entries.map((entry) => (
        <div key={entry.id} className="mood-card p-4 hover:shadow-lg transition-all duration-200">
          <div className="flex items-start justify-between">
            <div className="flex gap-4 flex-1">
              <div className="text-4xl">{entry.emoji}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-800">{entry.mood}</span>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar size={12} />
                    <span>{formatDate(entry.timestamp)}</span>
                    <Clock size={12} className="ml-2" />
                    <span>{formatTime(entry.timestamp)}</span>
                  </div>
                </div>
                {entry.note && (
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {entry.note}
                  </p>
                )}
                {entry.tags.length > 0 && (
                  <div className="flex items-center gap-1 flex-wrap">
                    <Hash size={12} className="text-gray-400" />
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => deleteEntry(entry.id)}
              className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
              aria-label="삭제"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}