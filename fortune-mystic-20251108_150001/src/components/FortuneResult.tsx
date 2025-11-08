import { X, Star, Hash, Palette } from 'lucide-react'
import { useFortuneStore } from '../store/fortuneStore'

export default function FortuneResult() {
  const { currentFortune, clearFortune } = useFortuneStore()

  if (!currentFortune) return null

  const getTypeLabel = () => {
    switch (currentFortune.type) {
      case 'tarot': return '타로 카드'
      case 'crystal': return '수정구슬'
      case 'daily': return '오늘의 운세'
      default: return ''
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-mystic-900 to-mystic-800 rounded-2xl max-w-lg w-full p-6 md:p-8 card-shadow border-2 border-mystic-600 relative animate-[float_3s_ease-in-out_infinite]">
        <button
          onClick={clearFortune}
          className="absolute top-4 right-4 text-mystic-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <div className="inline-block px-4 py-1 bg-mystic-700 rounded-full text-mystic-200 text-sm mb-3">
            {getTypeLabel()}
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-gold-400 mb-2 text-shadow">
            {currentFortune.title}
          </h3>
        </div>

        <div className="space-y-4 mb-6">
          <div className="p-4 bg-mystic-800/50 rounded-lg">
            <p className="text-white leading-relaxed whitespace-pre-line">
              {currentFortune.message}
            </p>
          </div>

          <div className="p-4 bg-gold-900/20 rounded-lg border border-gold-600/30">
            <p className="text-sm text-gold-300 mb-1 font-semibold">조언</p>
            <p className="text-gold-100">
              {currentFortune.advice}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-mystic-800/50 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-mystic-400 mb-1">
              <Star size={16} />
              <span className="text-xs">행운도</span>
            </div>
            <p className="text-lg font-bold text-white">
              {Math.floor(Math.random() * 30) + 70}%
            </p>
          </div>

          <div className="bg-mystic-800/50 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-mystic-400 mb-1">
              <Hash size={16} />
              <span className="text-xs">행운의 숫자</span>
            </div>
            <p className="text-lg font-bold text-gold-400">
              {currentFortune.luckyNumber}
            </p>
          </div>

          <div className="bg-mystic-800/50 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-mystic-400 mb-1">
              <Palette size={16} />
              <span className="text-xs">행운의 색</span>
            </div>
            <p className="text-sm font-bold text-white">
              {currentFortune.luckyColor}
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={clearFortune}
            className="px-8 py-3 bg-gradient-to-r from-mystic-600 to-mystic-700 hover:from-mystic-500 hover:to-mystic-600 text-white rounded-lg transition-all duration-300 hover:scale-105 font-semibold"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  )
}
