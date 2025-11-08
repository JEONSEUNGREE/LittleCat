import { useState } from 'react'
import { Eye, Sparkles } from 'lucide-react'
import { crystalMessages, luckyColors } from '../data/fortunes'
import { useFortuneStore } from '../store/fortuneStore'

export default function CrystalBall() {
  const [isReading, setIsReading] = useState(false)
  const [hasRead, setHasRead] = useState(false)
  const setFortune = useFortuneStore((state) => state.setFortune)

  const handleClick = () => {
    if (isReading || hasRead) return

    setIsReading(true)

    setTimeout(() => {
      const message = crystalMessages[Math.floor(Math.random() * crystalMessages.length)]
      setFortune({
        type: 'crystal',
        title: '수정구슬의 예언',
        message: `${message.vision}\n\n${message.meaning}`,
        advice: message.advice,
        luckyNumber: Math.floor(Math.random() * 99) + 1,
        luckyColor: luckyColors[Math.floor(Math.random() * luckyColors.length)],
        timestamp: Date.now()
      })
      setIsReading(false)
      setHasRead(true)
    }, 2000)
  }

  const reset = () => {
    setHasRead(false)
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Eye className="text-mystic-400" />
          수정구슬 점술
          <Eye className="text-mystic-400" />
        </h2>
        <p className="text-mystic-200">
          {hasRead ? '당신의 운명이 보입니다' : '수정구슬을 응시하세요'}
        </p>
      </div>

      <div className="flex flex-col items-center gap-8">
        <button
          onClick={handleClick}
          disabled={isReading || hasRead}
          className={`
            relative w-64 h-64 md:w-80 md:h-80 rounded-full
            transition-all duration-500
            ${isReading ? 'animate-glow scale-105' : ''}
            ${hasRead ? 'opacity-50' : 'hover:scale-105 cursor-pointer'}
          `}
        >
          <div className={`
            w-full h-full rounded-full
            bg-gradient-to-br from-mystic-400/30 to-mystic-800/50
            backdrop-blur-sm border-4 border-mystic-500/50
            flex items-center justify-center
            ${isReading ? 'animate-pulse' : ''}
          `}>
            <div className="text-center">
              {isReading ? (
                <div className="flex flex-col items-center gap-4">
                  <Sparkles className="text-gold-400 animate-spin" size={48} />
                  <p className="text-white text-lg">읽는 중...</p>
                </div>
              ) : (
                <Eye className="text-mystic-300" size={64} />
              )}
            </div>
          </div>

          {/* Floating particles */}
          {!hasRead && (
            <>
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gold-400 rounded-full animate-float" />
              <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-mystic-400 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
              <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-gold-500 rounded-full animate-float" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-mystic-300 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
            </>
          )}
        </button>

        {hasRead && (
          <button
            onClick={reset}
            className="px-6 py-3 bg-mystic-600 hover:bg-mystic-700 text-white rounded-lg transition-colors"
          >
            다시 보기
          </button>
        )}
      </div>
    </div>
  )
}
