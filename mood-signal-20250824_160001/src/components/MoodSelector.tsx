import React from 'react'
import { Heart, Smile, Meh, Frown, Zap, Cloud, Star, AlertCircle } from 'lucide-react'
import { MoodType } from '../store/useMoodStore'

interface MoodSelectorProps {
  currentMood: MoodType
  onMoodSelect: (mood: MoodType) => void
}

const moodConfig: Record<MoodType, { icon: React.ReactNode; color: string; label: string }> = {
  happy: { 
    icon: <Smile className="w-8 h-8" />, 
    color: 'bg-mood-happy', 
    label: '행복' 
  },
  calm: { 
    icon: <Cloud className="w-8 h-8" />, 
    color: 'bg-mood-calm', 
    label: '평온' 
  },
  neutral: { 
    icon: <Meh className="w-8 h-8" />, 
    color: 'bg-mood-neutral', 
    label: '보통' 
  },
  sad: { 
    icon: <Frown className="w-8 h-8" />, 
    color: 'bg-mood-sad', 
    label: '슬픔' 
  },
  angry: { 
    icon: <AlertCircle className="w-8 h-8" />, 
    color: 'bg-mood-angry', 
    label: '화남' 
  },
  excited: { 
    icon: <Zap className="w-8 h-8" />, 
    color: 'bg-mood-excited', 
    label: '신남' 
  },
  anxious: { 
    icon: <Star className="w-8 h-8" />, 
    color: 'bg-mood-anxious', 
    label: '불안' 
  },
  loved: { 
    icon: <Heart className="w-8 h-8" />, 
    color: 'bg-mood-loved', 
    label: '사랑' 
  },
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({ currentMood, onMoodSelect }) => {
  const [showMessage, setShowMessage] = React.useState(false)
  const [message, setMessage] = React.useState('')

  const handleMoodSelect = (mood: MoodType) => {
    onMoodSelect(mood)
    setShowMessage(true)
    setTimeout(() => setShowMessage(false), 2000)
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
      <h2 className="text-xl font-bold text-white mb-4 text-center">지금 기분은 어때요?</h2>
      
      <div className="grid grid-cols-4 gap-3 mb-6">
        {(Object.keys(moodConfig) as MoodType[]).map((mood) => {
          const config = moodConfig[mood]
          const isSelected = currentMood === mood
          
          return (
            <button
              key={mood}
              onClick={() => handleMoodSelect(mood)}
              className={`
                relative p-4 rounded-xl transition-all duration-300 transform
                ${isSelected ? 'scale-110 shadow-lg' : 'scale-100 hover:scale-105'}
                ${config.color} 
                ${isSelected ? 'ring-4 ring-white/50' : 'opacity-80 hover:opacity-100'}
              `}
            >
              <div className="flex flex-col items-center space-y-1">
                <div className="text-white">{config.icon}</div>
                <span className="text-xs text-white font-medium">{config.label}</span>
              </div>
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full animate-pulse" />
              )}
            </button>
          )
        })}
      </div>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="기분을 표현해보세요... (선택사항)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
        />
        
        <button
          onClick={() => {
            onMoodSelect(currentMood)
            setMessage('')
            setShowMessage(true)
            setTimeout(() => setShowMessage(false), 2000)
          }}
          className="w-full py-3 bg-white/20 backdrop-blur-sm rounded-lg text-white font-medium hover:bg-white/30 transition-colors duration-200"
        >
          기분 공유하기
        </button>
      </div>

      {showMessage && (
        <div className="mt-4 p-3 bg-green-500/20 backdrop-blur-sm rounded-lg text-white text-center animate-slide-up">
          ✨ 기분이 공유되었어요!
        </div>
      )}
    </div>
  )
}