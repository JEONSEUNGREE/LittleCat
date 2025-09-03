import { useState } from 'react'
import { Send, X, Sparkles } from 'lucide-react'
import { Wish, useWishStore } from '../store/wishStore'

interface CreateWishProps {
  onClose: () => void
}

export const CreateWish: React.FC<CreateWishProps> = ({ onClose }) => {
  const [content, setContent] = useState('')
  const [category, setCategory] = useState<Wish['category']>('dream')
  const [isAnimating, setIsAnimating] = useState(false)
  const addWish = useWishStore((state) => state.addWish)

  const categories: { value: Wish['category']; label: string; emoji: string }[] = [
    { value: 'dream', label: '꿈', emoji: '✨' },
    { value: 'love', label: '사랑', emoji: '❤️' },
    { value: 'success', label: '성공', emoji: '🎯' },
    { value: 'health', label: '건강', emoji: '🌱' },
    { value: 'peace', label: '평화', emoji: '🕊️' },
    { value: 'other', label: '기타', emoji: '🌟' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim()) {
      setIsAnimating(true)
      setTimeout(() => {
        addWish(content, category)
        onClose()
      }, 500)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className={`w-full max-w-lg glass-effect rounded-3xl p-6 transform transition-all duration-500 ${
        isAnimating ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-300" />
            소원을 적어주세요
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white/80 mb-2">
              카테고리를 선택하세요
            </label>
            <div className="grid grid-cols-3 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${
                    category === cat.value
                      ? 'bg-white/30 border-2 border-white'
                      : 'bg-white/10 border-2 border-transparent hover:bg-white/20'
                  }`}
                >
                  <span className="text-2xl">{cat.emoji}</span>
                  <span className="text-xs text-white">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-white/80 mb-2">
              당신의 소원은 무엇인가요?
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="익명으로 안전하게 공유됩니다..."
              className="w-full h-32 p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 resize-none"
              maxLength={200}
            />
            <div className="mt-2 text-right">
              <span className="text-xs text-white/60">{content.length}/200</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={!content.trim()}
            className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
              content.trim()
                ? 'bg-gradient-to-r from-wish-purple to-wish-pink text-white hover:shadow-lg transform hover:scale-105'
                : 'bg-white/10 text-white/50 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
            소원 빌기
          </button>
        </form>
      </div>
    </div>
  )
}