import { useState } from 'react'
import { useMoodStore } from '../store/moodStore'
import { Heart, MessageCircle, Clock } from 'lucide-react'

function MoodFeed() {
  const { globalMoodFeed, addEmpathy } = useMoodStore()
  const [empathizedEntries, setEmpathizedEntries] = useState<Set<string>>(new Set())

  const handleEmpathy = (entryId: string) => {
    if (!empathizedEntries.has(entryId)) {
      addEmpathy(entryId)
      setEmpathizedEntries(new Set([...empathizedEntries, entryId]))
    }
  }

  const getTimeAgo = (timestamp: number) => {
    const minutes = Math.floor((Date.now() - timestamp) / 60000)
    if (minutes < 1) return '방금 전'
    if (minutes < 60) return `${minutes}분 전`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}시간 전`
    return `${Math.floor(hours / 24)}일 전`
  }

  return (
    <div className="space-y-4 pb-20">
      <h2 className="text-xl font-bold text-gray-800 mb-4">실시간 감정 피드</h2>
      
      {globalMoodFeed.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center">
          <p className="text-gray-500">아직 공유된 감정이 없어요</p>
          <p className="text-sm text-gray-400 mt-2">첫 번째로 감정을 공유해보세요!</p>
        </div>
      ) : (
        globalMoodFeed.map((entry) => (
          <div
            key={entry.id}
            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full flex items-center justify-center text-2xl">
                  {entry.mood.emoji}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{entry.userName}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock size={12} />
                    {getTimeAgo(entry.timestamp)}
                  </p>
                </div>
              </div>
              <span
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: `${entry.mood.color}20`,
                  color: entry.mood.color
                }}
              >
                {entry.mood.label}
              </span>
            </div>

            {entry.message && (
              <p className="text-gray-700 mb-3 pl-15">{entry.message}</p>
            )}

            <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
              <button
                onClick={() => handleEmpathy(entry.id)}
                className={`flex items-center gap-2 px-3 py-1 rounded-full transition-all ${
                  empathizedEntries.has(entry.id)
                    ? 'bg-red-100 text-red-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
                }`}
              >
                <Heart
                  size={16}
                  fill={empathizedEntries.has(entry.id) ? 'currentColor' : 'none'}
                />
                <span className="text-sm font-medium">{entry.empathyCount}</span>
              </button>
              
              <button className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-500 transition-all">
                <MessageCircle size={16} />
                <span className="text-sm">응원하기</span>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default MoodFeed