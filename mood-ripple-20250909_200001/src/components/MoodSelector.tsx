import { Heart, Smile, Frown, Cloud, Sun, Moon, Star, Zap } from 'lucide-react'
import { Mood } from '../store/useMoodStore'

interface MoodSelectorProps {
  onSelectMood: (mood: Mood) => void
}

const moods: Mood[] = [
  { emoji: '😊', label: '행복', color: '#FFD700', intensity: 0.8 },
  { emoji: '😌', label: '평온', color: '#87CEEB', intensity: 0.5 },
  { emoji: '😔', label: '우울', color: '#4682B4', intensity: 0.6 },
  { emoji: '😡', label: '화남', color: '#FF6347', intensity: 0.9 },
  { emoji: '😰', label: '불안', color: '#DDA0DD', intensity: 0.7 },
  { emoji: '🥰', label: '사랑', color: '#FF69B4', intensity: 0.9 },
  { emoji: '😴', label: '피곤', color: '#778899', intensity: 0.3 },
  { emoji: '🤔', label: '생각', color: '#9370DB', intensity: 0.5 },
]

export default function MoodSelector({ onSelectMood }: MoodSelectorProps) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl">
      <h2 className="text-2xl font-semibold text-white text-center mb-6">
        지금 기분은 어떠신가요?
      </h2>
      
      <div className="grid grid-cols-4 gap-4">
        {moods.map((mood) => (
          <button
            key={mood.label}
            onClick={() => onSelectMood(mood)}
            className="group relative flex flex-col items-center justify-center p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
            style={{
              borderColor: mood.color,
              borderWidth: '2px',
              borderStyle: 'solid'
            }}
          >
            <span className="text-3xl mb-2">{mood.emoji}</span>
            <span className="text-xs text-white/80">{mood.label}</span>
            
            <div 
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              style={{ backgroundColor: mood.color }}
            ></div>
          </button>
        ))}
      </div>
      
      <p className="text-center text-white/60 text-sm mt-6">
        선택한 감정이 주변 사람들과 공유됩니다
      </p>
    </div>
  )
}