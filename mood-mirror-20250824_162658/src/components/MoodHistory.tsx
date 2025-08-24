import React from 'react'
import { Clock, TrendingUp, Calendar } from 'lucide-react'
import useMoodStore from '../store/useMoodStore'

const MoodHistory: React.FC = () => {
  const { moodHistory } = useMoodStore()

  const getMoodStats = () => {
    if (moodHistory.length === 0) return null
    
    const moodCounts = moodHistory.reduce((acc, mood) => {
      acc[mood.label] = (acc[mood.label] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    const mostFrequent = Object.entries(moodCounts)
      .sort(([, a], [, b]) => b - a)[0]
    
    return {
      total: moodHistory.length,
      mostFrequent: mostFrequent ? mostFrequent[0] : null,
      recentMood: moodHistory[0]?.label
    }
  }

  const stats = getMoodStats()

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    
    if (date.toDateString() === today.toDateString()) {
      return `Today, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-4">
      {stats && (
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Your Mood Insights
          </h3>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-xs opacity-90">Total Moods</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.mostFrequent || '-'}</p>
              <p className="text-xs opacity-90">Most Frequent</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.recentMood || '-'}</p>
              <p className="text-xs opacity-90">Current</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Your Mood Journey
        </h3>
        
        {moodHistory.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Start tracking your moods to see your journey
          </p>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {moodHistory.map((mood) => (
              <div
                key={mood.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className={`p-2 rounded-full ${mood.color} bg-opacity-20`}>
                  <span className="text-xl">{mood.emoji}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">{mood.label}</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(mood.timestamp)}
                    </span>
                  </div>
                  {mood.message && (
                    <p className="text-xs text-gray-600 mt-1 line-clamp-1">{mood.message}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MoodHistory