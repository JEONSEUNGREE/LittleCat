import { useState } from 'react'
import useMoodStore, { MoodType } from '../store/useMoodStore'
import { 
  Smile, 
  Frown, 
  Angry, 
  Heart, 
  Zap, 
  CloudRain, 
  Meh,
  Sparkles
} from 'lucide-react'

const moodConfig: Record<MoodType, { icon: React.ReactNode; label: string; color: string }> = {
  happy: { icon: <Smile size={32} />, label: '행복', color: 'bg-mood-happy' },
  sad: { icon: <Frown size={32} />, label: '슬픔', color: 'bg-mood-sad' },
  angry: { icon: <Angry size={32} />, label: '화남', color: 'bg-mood-angry' },
  calm: { icon: <Sparkles size={32} />, label: '평온', color: 'bg-mood-calm' },
  excited: { icon: <Zap size={32} />, label: '신남', color: 'bg-mood-excited' },
  anxious: { icon: <CloudRain size={32} />, label: '불안', color: 'bg-mood-anxious' },
  neutral: { icon: <Meh size={32} />, label: '보통', color: 'bg-mood-neutral' },
  love: { icon: <Heart size={32} />, label: '사랑', color: 'bg-mood-love' }
}

function MoodSelector() {
  const { currentMood, setMood } = useMoodStore()
  const [message, setMessage] = useState('')
  const [selectedMood, setSelectedMood] = useState<MoodType>(currentMood)

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood)
    setTimeout(() => {
      setMood(mood, message)
    }, 300)
  }

  const handleMessageSubmit = () => {
    setMood(selectedMood, message)
    setMessage('')
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">지금 기분은 어때요?</h2>
        <p className="text-sm opacity-80">감정을 선택하고 친구들과 공유하세요</p>
      </div>

      {/* Current Mood Display */}
      <div className="flex justify-center">
        <div className={`${moodConfig[currentMood].color} w-32 h-32 rounded-full flex items-center justify-center shadow-2xl animate-mood-shift`}>
          <div className="text-white">
            {moodConfig[currentMood].icon}
            <p className="text-sm mt-2 font-medium">{moodConfig[currentMood].label}</p>
          </div>
        </div>
      </div>

      {/* Mood Grid */}
      <div className="grid grid-cols-4 gap-3">
        {(Object.keys(moodConfig) as MoodType[]).map((mood) => (
          <button
            key={mood}
            onClick={() => handleMoodSelect(mood)}
            className={`
              ${moodConfig[mood].color} 
              ${selectedMood === mood ? 'ring-4 ring-white/50 scale-110' : 'scale-100'}
              p-3 rounded-2xl flex flex-col items-center justify-center
              transition-all duration-300 hover:scale-105 active:scale-95
              shadow-lg hover:shadow-xl
            `}
          >
            <div className="text-white">
              {moodConfig[mood].icon}
            </div>
            <span className="text-xs text-white mt-1">{moodConfig[mood].label}</span>
          </button>
        ))}
      </div>

      {/* Message Input */}
      <div className="space-y-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleMessageSubmit()}
          placeholder="기분을 한 줄로 표현해보세요..."
          className="w-full px-4 py-3 bg-white/20 backdrop-blur rounded-full 
                   placeholder-white/50 text-white focus:outline-none 
                   focus:ring-2 focus:ring-white/30 transition-all"
          maxLength={50}
        />
        <button
          onClick={handleMessageSubmit}
          className="w-full py-3 bg-white/20 hover:bg-white/30 
                   text-white rounded-full font-medium
                   transition-all duration-300 hover:shadow-lg
                   active:scale-95"
        >
          감정 공유하기
        </button>
      </div>
    </div>
  )
}

export default MoodSelector