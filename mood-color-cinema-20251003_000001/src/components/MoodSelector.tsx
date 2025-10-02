import { motion } from 'framer-motion'
import { useMoodStore, type Mood } from '../store/moodStore'
import { Heart, Frown, Zap, Wind, Flame, Star, Eye, Flower } from 'lucide-react'

const moods: { id: Mood; label: string; icon: React.ReactNode; gradient: string }[] = [
  { id: 'happy', label: '행복', icon: <Heart className="w-8 h-8" />, gradient: 'from-yellow-400 to-orange-400' },
  { id: 'sad', label: '슬픔', icon: <Frown className="w-8 h-8" />, gradient: 'from-blue-400 to-indigo-600' },
  { id: 'excited', label: '흥분', icon: <Zap className="w-8 h-8" />, gradient: 'from-red-400 to-pink-600' },
  { id: 'calm', label: '평온', icon: <Wind className="w-8 h-8" />, gradient: 'from-teal-400 to-cyan-600' },
  { id: 'angry', label: '분노', icon: <Flame className="w-8 h-8" />, gradient: 'from-red-600 to-red-800' },
  { id: 'romantic', label: '로맨틱', icon: <Star className="w-8 h-8" />, gradient: 'from-pink-400 to-purple-600' },
  { id: 'mysterious', label: '신비', icon: <Eye className="w-8 h-8" />, gradient: 'from-purple-600 to-indigo-900' },
  { id: 'peaceful', label: '평화', icon: <Flower className="w-8 h-8" />, gradient: 'from-green-400 to-emerald-600' }
]

export default function MoodSelector() {
  const { selectedMood, setMood } = useMoodStore()

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-center mb-6">지금의 감정을 선택하세요</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {moods.map((mood) => (
          <motion.button
            key={mood.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMood(mood.id)}
            className={`relative p-6 rounded-xl transition-all ${
              selectedMood === mood.id
                ? 'ring-4 ring-yellow-400 ring-offset-2 ring-offset-transparent'
                : ''
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${mood.gradient} rounded-xl opacity-90`} />
            <div className="relative flex flex-col items-center gap-2 text-white">
              {mood.icon}
              <span className="font-semibold text-sm md:text-base">{mood.label}</span>
            </div>
            {selectedMood === mood.id && (
              <motion.div
                layoutId="mood-selector"
                className="absolute inset-0 border-4 border-yellow-400 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {selectedMood && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center"
        >
          <p className="text-gray-300">
            선택된 감정: <span className="text-yellow-400 font-bold">
              {moods.find(m => m.id === selectedMood)?.label}
            </span>
          </p>
        </motion.div>
      )}
    </div>
  )
}