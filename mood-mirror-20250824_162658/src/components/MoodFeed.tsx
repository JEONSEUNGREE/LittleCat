import React from 'react'
import { Heart, MessageCircle, Share2, Users } from 'lucide-react'
import useMoodStore, { Mood } from '../store/useMoodStore'

const MoodFeed: React.FC = () => {
  const { nearbyMoods } = useMoodStore()
  const [filter, setFilter] = React.useState<string>('all')

  React.useEffect(() => {
    const mockNearbyMoods: Mood[] = [
      {
        id: '1',
        emoji: '😊',
        label: 'Happy',
        color: 'bg-yellow-400',
        timestamp: Date.now() - 300000,
        userId: 'user456',
        isAnonymous: true,
        message: 'Just had a great coffee!'
      },
      {
        id: '2',
        emoji: '😰',
        label: 'Anxious',
        color: 'bg-orange-400',
        timestamp: Date.now() - 600000,
        userId: 'user789',
        isAnonymous: false,
        message: 'Big presentation coming up...'
      },
      {
        id: '3',
        emoji: '🥰',
        label: 'Loved',
        color: 'bg-pink-400',
        timestamp: Date.now() - 900000,
        userId: 'user101',
        isAnonymous: true,
        message: 'Received a surprise gift today!'
      }
    ]
    
    useMoodStore.getState().setNearbyMoods(mockNearbyMoods)
  }, [])

  const filteredMoods = filter === 'all' 
    ? nearbyMoods 
    : nearbyMoods.filter(m => m.label.toLowerCase() === filter)

  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    
    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    return `${minutes}m ago`
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Nearby Moods
        </h3>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">All Moods</option>
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="anxious">Anxious</option>
          <option value="loved">Loved</option>
        </select>
      </div>

      <div className="space-y-3">
        {filteredMoods.map((mood) => (
          <div
            key={mood.id}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-full ${mood.color} bg-opacity-20`}>
                  <span className="text-2xl">{mood.emoji}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-800">{mood.label}</span>
                    {mood.isAnonymous && (
                      <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full text-gray-600">
                        Anonymous
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{formatTime(mood.timestamp)}</p>
                </div>
              </div>
            </div>
            
            {mood.message && (
              <p className="mt-3 text-sm text-gray-700">{mood.message}</p>
            )}
            
            <div className="flex items-center gap-4 mt-4">
              <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors">
                <Heart className="w-4 h-4" />
                <span className="text-xs">12</span>
              </button>
              <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs">3</span>
              </button>
              <button className="flex items-center gap-1 text-gray-500 hover:text-green-500 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MoodFeed