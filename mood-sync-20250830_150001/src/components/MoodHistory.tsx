import useMoodStore, { MoodType } from '../store/useMoodStore'
import { 
  Smile, 
  Frown, 
  Angry, 
  Heart, 
  Zap, 
  CloudRain, 
  Meh,
  Sparkles,
  Calendar,
  TrendingUp
} from 'lucide-react'

const moodIcons: Record<MoodType, React.ReactNode> = {
  happy: <Smile size={20} />,
  sad: <Frown size={20} />,
  angry: <Angry size={20} />,
  calm: <Sparkles size={20} />,
  excited: <Zap size={20} />,
  anxious: <CloudRain size={20} />,
  neutral: <Meh size={20} />,
  love: <Heart size={20} />
}

const moodColors: Record<MoodType, string> = {
  happy: 'bg-mood-happy',
  sad: 'bg-mood-sad',
  angry: 'bg-mood-angry',
  calm: 'bg-mood-calm',
  excited: 'bg-mood-excited',
  anxious: 'bg-mood-anxious',
  neutral: 'bg-mood-neutral',
  love: 'bg-mood-love'
}

const moodLabels: Record<MoodType, string> = {
  happy: '행복',
  sad: '슬픔',
  angry: '화남',
  calm: '평온',
  excited: '신남',
  anxious: '불안',
  neutral: '보통',
  love: '사랑'
}

function MoodHistory() {
  const { moodHistory } = useMoodStore()

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  // Calculate mood statistics
  const moodStats = moodHistory.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1
    return acc
  }, {} as Record<MoodType, number>)

  const mostFrequentMood = Object.entries(moodStats).reduce((a, b) => 
    (moodStats[a[0] as MoodType] || 0) > (moodStats[b[0] as MoodType] || 0) ? a : b,
    ['neutral', 0] as [string, number]
  )[0] as MoodType

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold mb-2">감정 기록</h2>
        <p className="text-sm opacity-80">나의 감정 변화를 돌아보세요</p>
      </div>

      {/* Mood Statistics */}
      {moodHistory.length > 0 && (
        <div className="bg-white/10 backdrop-blur rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-white/80 flex items-center gap-1">
              <TrendingUp size={16} />
              최근 주요 감정
            </span>
            <div className={`${moodColors[mostFrequentMood]} px-3 py-1 rounded-full flex items-center gap-1`}>
              {moodIcons[mostFrequentMood]}
              <span className="text-xs text-white">{moodLabels[mostFrequentMood]}</span>
            </div>
          </div>
          
          {/* Mood Distribution */}
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(moodLabels) as MoodType[]).map((mood) => {
              const count = moodStats[mood] || 0
              if (count === 0) return null
              
              return (
                <div
                  key={mood}
                  className={`${moodColors[mood]} px-2 py-1 rounded-lg flex items-center gap-1`}
                >
                  {moodIcons[mood]}
                  <span className="text-xs text-white">{count}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* History List */}
      <div className="space-y-2 max-h-[280px] overflow-y-auto pr-2">
        {moodHistory.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="mx-auto mb-3 text-white/40" size={48} />
            <p className="text-white/60">아직 기록된 감정이 없어요</p>
            <p className="text-sm text-white/40 mt-1">감정을 선택하면 여기에 기록됩니다</p>
          </div>
        ) : (
          moodHistory.map((entry, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur rounded-xl p-3 
                       transition-all duration-300 hover:bg-white/15"
            >
              <div className="flex items-center gap-3">
                <div className={`${moodColors[entry.mood]} p-1.5 rounded-full`}>
                  {moodIcons[entry.mood]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">
                      {moodLabels[entry.mood]}
                    </span>
                    <span className="text-xs text-white/60">
                      {formatDate(entry.timestamp)}
                    </span>
                  </div>
                  {entry.message && (
                    <p className="text-xs text-white/70 mt-1">{entry.message}</p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default MoodHistory