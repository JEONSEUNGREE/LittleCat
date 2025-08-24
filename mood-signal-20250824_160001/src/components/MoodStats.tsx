import React from 'react'
import { BarChart3, TrendingUp, Users, Heart } from 'lucide-react'
import { MoodEntry, MoodType } from '../store/useMoodStore'

interface MoodStatsProps {
  moodHistory: MoodEntry[]
  friendMoods: MoodEntry[]
}

const moodLabels: Record<MoodType, string> = {
  happy: '행복',
  calm: '평온',
  neutral: '보통',
  sad: '슬픔',
  angry: '화남',
  excited: '신남',
  anxious: '불안',
  loved: '사랑',
}

export const MoodStats: React.FC<MoodStatsProps> = ({ moodHistory, friendMoods }) => {
  const getMoodCounts = (entries: MoodEntry[]) => {
    const counts: Partial<Record<MoodType, number>> = {}
    entries.forEach(entry => {
      counts[entry.mood] = (counts[entry.mood] || 0) + 1
    })
    return counts
  }

  const userMoodCounts = getMoodCounts(moodHistory)

  const mostFrequentMood = React.useMemo(() => {
    const entries = Object.entries(userMoodCounts)
    if (entries.length === 0) return null
    return entries.reduce((a, b) => a[1] > b[1] ? a : b)[0] as MoodType
  }, [userMoodCounts])

  const totalReactions = friendMoods.reduce((sum, entry) => sum + Object.keys(entry.reactions).length, 0)

  const stats = [
    {
      icon: <BarChart3 className="w-5 h-5" />,
      label: '오늘의 기분 변화',
      value: `${moodHistory.filter(m => Date.now() - m.timestamp < 86400000).length}회`,
      color: 'bg-blue-500/20'
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: '가장 많은 기분',
      value: mostFrequentMood ? moodLabels[mostFrequentMood] : '-',
      color: 'bg-green-500/20'
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: '친구 활동',
      value: `${friendMoods.length}개`,
      color: 'bg-purple-500/20'
    },
    {
      icon: <Heart className="w-5 h-5" />,
      label: '받은 반응',
      value: `${totalReactions}개`,
      color: 'bg-pink-500/20'
    }
  ]

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
      <h2 className="text-xl font-bold text-white mb-4">무드 통계</h2>
      
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} backdrop-blur-sm rounded-lg p-4 hover:scale-105 transition-transform duration-200`}
          >
            <div className="flex items-center space-x-2 text-white/80 mb-2">
              {stat.icon}
              <span className="text-sm">{stat.label}</span>
            </div>
            <p className="text-white text-xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {moodHistory.length > 0 && (
        <div className="mt-6">
          <h3 className="text-white/80 text-sm font-medium mb-3">기분 분포</h3>
          <div className="space-y-2">
            {Object.entries(userMoodCounts).map(([mood, count]) => {
              const percentage = (count / moodHistory.length) * 100
              return (
                <div key={mood} className="flex items-center space-x-3">
                  <span className="text-white/60 text-sm w-12">{moodLabels[mood as MoodType]}</span>
                  <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-white/40 to-white/60 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-white/60 text-sm w-10 text-right">{count}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}