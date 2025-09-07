import { useState } from 'react'
import { Send, Sparkles, Heart, Sun, Star, Coffee } from 'lucide-react'
import { useComplimentStore } from '../store/complimentStore'

const categories = [
  { name: '격려', icon: Heart, color: 'from-pink-400 to-red-400' },
  { name: '위로', icon: Sun, color: 'from-yellow-400 to-orange-400' },
  { name: '응원', icon: Star, color: 'from-purple-400 to-indigo-400' },
  { name: '감사', icon: Coffee, color: 'from-green-400 to-teal-400' }
]

const templates = [
  '당신은 정말 특별한 사람이에요',
  '오늘도 수고 많으셨어요',
  '당신의 노력이 빛날 거예요',
  '항상 응원하고 있어요',
  '당신은 충분히 잘하고 있어요'
]

export default function CreateCompliment() {
  const { addCompliment } = useComplimentStore()
  const [content, setContent] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('격려')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim()) {
      setIsSubmitting(true)
      addCompliment(content, selectedCategory)
      
      setTimeout(() => {
        setContent('')
        setIsSubmitting(false)
      }, 500)
    }
  }

  const useTemplate = (template: string) => {
    setContent(template)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-card p-8 animate-slide-up">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="text-soft" size={28} />
          <h2 className="text-2xl font-bold">칭찬 보내기</h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Category Selection */}
          <div className="mb-6">
            <label className="block text-sm text-white/70 mb-3">카테고리 선택</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon
                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`p-3 rounded-xl flex flex-col items-center gap-2 transition-all ${
                      selectedCategory === cat.name
                        ? 'bg-white/20 scale-105'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${cat.color}`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <span className="text-xs">{cat.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Content Input */}
          <div className="mb-6">
            <label className="block text-sm text-white/70 mb-3">
              따뜻한 칭찬 메시지
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="누군가를 행복하게 만들 칭찬을 적어주세요..."
              className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/40 resize-none"
              rows={4}
              maxLength={200}
            />
            <div className="flex justify-between mt-2">
              <span className="text-xs text-white/50">
                익명으로 전송됩니다
              </span>
              <span className="text-xs text-white/50">
                {content.length}/200
              </span>
            </div>
          </div>

          {/* Templates */}
          <div className="mb-6">
            <p className="text-sm text-white/70 mb-3">템플릿 사용하기</p>
            <div className="flex flex-wrap gap-2">
              {templates.map((template, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => useTemplate(template)}
                  className="px-3 py-1 text-xs bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                  {template}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!content.trim() || isSubmitting}
            className={`w-full btn-primary flex items-center justify-center gap-2 ${
              isSubmitting
                ? 'bg-green-500 text-white'
                : 'compliment-gradient text-white disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <>
                <Sparkles className="animate-spin" size={20} />
                <span>전송 완료!</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span>칭찬 보내기</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}