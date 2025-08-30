import { useState } from 'react'
import { Heart, Sparkles, Cloud, Sun, Moon, Star, Zap, Droplets } from 'lucide-react'
import { MOOD_TYPES, generateMoodId } from '../utils/moodUtils'
import useMoodStore from '../store/useMoodStore'
import type { Mood } from '../store/useMoodStore'

const MoodSelector: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [intensity, setIntensity] = useState(50)
  const [isAnimating, setIsAnimating] = useState(false)
  
  const { setCurrentMood, addToHistory, isSharing, addSharedMood } = useMoodStore()
  
  const moodIcons: Record<string, React.ReactNode> = {
    '행복': <Sun className="w-6 h-6" />,
    '평온': <Cloud className="w-6 h-6" />,
    '슬픔': <Droplets className="w-6 h-6" />,
    '신남': <Sparkles className="w-6 h-6" />,
    '불안': <Moon className="w-6 h-6" />,
    '평화': <Star className="w-6 h-6" />,
    '분노': <Zap className="w-6 h-6" />,
    '사랑': <Heart className="w-6 h-6" />
  }
  
  const handleMoodSelect = (emotion: string) => {
    setSelectedMood(emotion)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 500)
  }
  
  const handleConfirmMood = () => {
    if (!selectedMood) return
    
    const moodData = MOOD_TYPES.find(m => m.emotion === selectedMood)
    if (!moodData) return
    
    const newMood: Mood = {
      id: generateMoodId(),
      emotion: selectedMood,
      color: moodData.color,
      intensity,
      timestamp: new Date(),
      anonymous: true
    }
    
    setCurrentMood(newMood)
    addToHistory(newMood)
    
    if (isSharing) {
      addSharedMood(newMood)
    }
    
    setSelectedMood(null)
    setIntensity(50)
  }
  
  return (
    <div className="w-full max-w-md mx-auto p-6 glass-effect rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">
        지금 기분은 어떠신가요?
      </h2>
      
      <div className="grid grid-cols-4 gap-3 mb-6">
        {MOOD_TYPES.map((mood) => (
          <button
            key={mood.emotion}
            onClick={() => handleMoodSelect(mood.emotion)}
            className={`
              relative p-4 rounded-xl transition-all duration-300 transform
              ${selectedMood === mood.emotion 
                ? `bg-gradient-to-br ${mood.gradient} scale-110 shadow-lg` 
                : 'bg-white/10 hover:bg-white/20 hover:scale-105'}
              ${isAnimating && selectedMood === mood.emotion ? 'animate-pulse' : ''}
            `}
            style={{
              borderColor: selectedMood === mood.emotion ? mood.color : 'transparent',
              borderWidth: selectedMood === mood.emotion ? '2px' : '0px'
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <div className={`${selectedMood === mood.emotion ? 'text-white' : 'text-gray-300'}`}>
                {moodIcons[mood.emotion]}
              </div>
              <span className={`text-xs font-medium ${
                selectedMood === mood.emotion ? 'text-white' : 'text-gray-300'
              }`}>
                {mood.emotion}
              </span>
            </div>
          </button>
        ))}
      </div>
      
      {selectedMood && (
        <div className="space-y-4 animate-fadeIn">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              감정의 강도: {intensity}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${
                  MOOD_TYPES.find(m => m.emotion === selectedMood)?.color
                } ${intensity}%, #374151 ${intensity}%)`
              }}
            />
          </div>
          
          <button
            onClick={handleConfirmMood}
            className={`
              w-full py-3 px-6 rounded-xl font-medium text-white
              bg-gradient-to-r ${MOOD_TYPES.find(m => m.emotion === selectedMood)?.gradient}
              hover:shadow-lg transform hover:scale-105 transition-all duration-300
            `}
          >
            감정 기록하기
          </button>
        </div>
      )}
    </div>
  )
}

export default MoodSelector