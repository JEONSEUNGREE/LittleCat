import { useState } from 'react'
import { useMoodStore, Mood } from '../store/moodStore'
import { Sparkles, Send } from 'lucide-react'

const moods: Mood[] = [
  { id: 'happy', emoji: '😊', label: '행복해요', color: '#FFD700', timestamp: 0 },
  { id: 'calm', emoji: '😌', label: '평온해요', color: '#87CEEB', timestamp: 0 },
  { id: 'excited', emoji: '🤗', label: '신나요', color: '#FF6B6B', timestamp: 0 },
  { id: 'sad', emoji: '😔', label: '슬퍼요', color: '#6C7A89', timestamp: 0 },
  { id: 'anxious', emoji: '😰', label: '불안해요', color: '#9B59B6', timestamp: 0 },
  { id: 'grateful', emoji: '🙏', label: '감사해요', color: '#2ECC71', timestamp: 0 },
  { id: 'tired', emoji: '😴', label: '피곤해요', color: '#95A5A6', timestamp: 0 },
  { id: 'angry', emoji: '😠', label: '화나요', color: '#E74C3C', timestamp: 0 },
  { id: 'love', emoji: '🥰', label: '사랑스러워요', color: '#FF69B4', timestamp: 0 }
]

function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null)
  const [message, setMessage] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const { setUserMood, addMoodEntry } = useMoodStore()

  const handleShare = () => {
    if (!selectedMood) return

    const moodWithTimestamp = { ...selectedMood, timestamp: Date.now() }
    setUserMood(moodWithTimestamp)
    
    if (message.trim()) {
      addMoodEntry({
        userId: 'currentUser',
        userName: '나',
        mood: moodWithTimestamp,
        message: message.trim(),
        empathyCount: 0
      })
    }

    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setMessage('')
    }, 2000)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => setSelectedMood(mood)}
            className={`relative p-4 rounded-xl transition-all transform hover:scale-105 ${
              selectedMood?.id === mood.id
                ? 'bg-gradient-to-r from-purple-100 to-blue-100 shadow-lg scale-105 border-2 border-purple-300'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            {selectedMood?.id === mood.id && (
              <Sparkles className="absolute top-1 right-1 w-4 h-4 text-purple-500" />
            )}
            <div className="text-3xl mb-1">{mood.emoji}</div>
            <div className="text-xs text-gray-700 font-medium">{mood.label}</div>
          </button>
        ))}
      </div>

      {selectedMood && (
        <div className="space-y-3 animate-fade-in">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="지금 기분에 대해 더 이야기해주세요... (선택사항)"
            className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-300"
            rows={3}
          />
          
          <button
            onClick={handleShare}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2"
          >
            <Send size={18} />
            감정 공유하기
          </button>
        </div>
      )}

      {showSuccess && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg animate-bounce z-50">
          감정이 공유되었습니다! 🎉
        </div>
      )}
    </div>
  )
}

export default MoodSelector