import { useState, useEffect } from 'react'
import { Sun, Sparkles } from 'lucide-react'
import { dailyFortunes, luckyColors } from '../data/fortunes'
import { useFortuneStore } from '../store/fortuneStore'

export default function DailyFortune() {
  const [revealed, setRevealed] = useState(false)
  const setFortune = useFortuneStore((state) => state.setFortune)

  useEffect(() => {
    // Check if today's fortune was already revealed
    const today = new Date().toDateString()
    const lastRevealed = localStorage.getItem('lastFortuneDate')
    if (lastRevealed === today) {
      setRevealed(true)
    }
  }, [])

  const revealFortune = () => {
    if (revealed) return

    const fortune = dailyFortunes[Math.floor(Math.random() * dailyFortunes.length)]
    const today = new Date().toDateString()

    setFortune({
      type: 'daily',
      title: '오늘의 운세',
      message: fortune.fortune,
      advice: fortune.advice,
      luckyNumber: Math.floor(Math.random() * 99) + 1,
      luckyColor: luckyColors[Math.floor(Math.random() * luckyColors.length)],
      timestamp: Date.now()
    })

    localStorage.setItem('lastFortuneDate', today)
    setRevealed(true)
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Sun className="text-gold-400" />
          오늘의 운세
          <Sun className="text-gold-400" />
        </h2>
        <p className="text-mystic-200">
          {revealed ? '오늘의 운세를 확인했습니다' : '오늘 하루의 운세를 확인하세요'}
        </p>
      </div>

      <div className="flex justify-center">
        {!revealed ? (
          <button
            onClick={revealFortune}
            className="group relative px-12 py-6 bg-gradient-to-r from-mystic-600 to-mystic-700 hover:from-mystic-500 hover:to-mystic-600 rounded-xl transition-all duration-300 hover:scale-105 card-shadow"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="text-gold-400 group-hover:animate-spin" size={24} />
              <span className="text-xl font-semibold text-white">운세 확인하기</span>
              <Sparkles className="text-gold-400 group-hover:animate-spin" size={24} />
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gold-400/0 via-gold-400/20 to-gold-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ) : (
          <div className="text-center p-8 bg-mystic-800/50 backdrop-blur-sm rounded-xl border-2 border-mystic-600">
            <p className="text-mystic-200 mb-4">✨ 운세는 하루에 한 번만 확인할 수 있습니다 ✨</p>
            <p className="text-mystic-300 text-sm">내일 다시 찾아주세요</p>
          </div>
        )}
      </div>

      {revealed && (
        <div className="mt-8 text-center">
          <p className="text-mystic-300 text-sm">
            아래에서 운세 결과를 확인하세요
          </p>
        </div>
      )}
    </div>
  )
}
