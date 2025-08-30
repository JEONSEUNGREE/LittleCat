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
  Clock,
  MessageCircle
} from 'lucide-react'

const moodIcons: Record<MoodType, React.ReactNode> = {
  happy: <Smile size={24} />,
  sad: <Frown size={24} />,
  angry: <Angry size={24} />,
  calm: <Sparkles size={24} />,
  excited: <Zap size={24} />,
  anxious: <CloudRain size={24} />,
  neutral: <Meh size={24} />,
  love: <Heart size={24} />
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

function FriendsList() {
  const { friends } = useMoodStore()

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diff < 60) return '방금 전'
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`
    return `${Math.floor(diff / 86400)}일 전`
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold mb-2">친구들의 기분</h2>
        <p className="text-sm opacity-80">친구들과 감정을 공유해요</p>
      </div>

      <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
        {friends.map((friend) => (
          <div
            key={friend.id}
            className="bg-white/10 backdrop-blur rounded-2xl p-4 
                     transition-all duration-300 hover:bg-white/15
                     hover:shadow-lg animate-float"
            style={{ animationDelay: `${Math.random() * 2}s` }}
          >
            <div className="flex items-start gap-3">
              {/* Mood Icon */}
              <div className={`${moodColors[friend.mood]} p-2 rounded-full shadow-lg`}>
                <div className="text-white">
                  {moodIcons[friend.mood]}
                </div>
              </div>

              {/* Friend Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-white">{friend.name}</h3>
                  <span className="text-xs text-white/60 flex items-center gap-1">
                    <Clock size={12} />
                    {formatTime(friend.lastUpdate)}
                  </span>
                </div>
                
                {friend.message && (
                  <div className="flex items-start gap-1">
                    <MessageCircle size={14} className="text-white/50 mt-0.5" />
                    <p className="text-sm text-white/80">{friend.message}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Connection Status */}
      <div className="text-center mt-4">
        <p className="text-xs text-white/60">
          {friends.length}명의 친구와 연결됨
        </p>
      </div>
    </div>
  )
}

export default FriendsList