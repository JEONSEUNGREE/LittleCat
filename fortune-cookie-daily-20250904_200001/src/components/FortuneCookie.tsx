import { useState } from 'react'
import { Sparkles, RefreshCw } from 'lucide-react'
import { useFortuneStore } from '../store/fortuneStore'

const FortuneCookie: React.FC = () => {
  const [isOpening, setIsOpening] = useState(false)
  const [showFortune, setShowFortune] = useState(false)
  const { currentFortune, generateNewFortune, hasOpenedToday } = useFortuneStore()

  const handleCookieClick = () => {
    if (isOpening || (hasOpenedToday && currentFortune)) return

    setIsOpening(true)
    generateNewFortune()
    
    setTimeout(() => {
      setShowFortune(true)
      setIsOpening(false)
    }, 500)
  }

  const handleNewFortune = () => {
    setShowFortune(false)
    setTimeout(() => {
      generateNewFortune()
      setIsOpening(true)
      setTimeout(() => {
        setShowFortune(true)
        setIsOpening(false)
      }, 500)
    }, 300)
  }

  return (
    <div className="flex flex-col items-center justify-center p-6">
      {!showFortune ? (
        <div
          onClick={handleCookieClick}
          className={`relative cursor-pointer transition-transform hover:scale-105 ${
            isOpening ? 'animate-cookie-crack' : ''
          }`}
        >
          <div className="cookie-shadow">
            <svg
              width="200"
              height="160"
              viewBox="0 0 200 160"
              className="w-48 h-40 md:w-56 md:h-44"
            >
              <ellipse
                cx="100"
                cy="80"
                rx="90"
                ry="70"
                fill="#F59E0B"
                stroke="#92400E"
                strokeWidth="2"
              />
              <path
                d="M 40 80 Q 100 60 160 80"
                fill="none"
                stroke="#92400E"
                strokeWidth="1.5"
                strokeDasharray="3,3"
              />
              <circle cx="60" cy="70" r="3" fill="#92400E" />
              <circle cx="140" cy="70" r="3" fill="#92400E" />
              <circle cx="80" cy="90" r="2.5" fill="#92400E" />
              <circle cx="120" cy="90" r="2.5" fill="#92400E" />
              <circle cx="100" cy="75" r="2" fill="#92400E" />
            </svg>
          </div>
          <div className="absolute -top-2 -right-2 animate-sparkle">
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </div>
        </div>
      ) : (
        <div className="animate-paper-unfold w-full max-w-md">
          <div className="glass-card p-6 md:p-8">
            <div className="text-center mb-6">
              <p className="fortune-text text-lg md:text-xl leading-relaxed">
                "{currentFortune?.text}"
              </p>
              <span className="inline-block mt-3 px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 rounded-full text-sm">
                {currentFortune?.category}
              </span>
            </div>
            
            {currentFortune?.luckyNumbers && (
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-purple-800/50 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-2">
                  오늘의 행운 번호
                </p>
                <div className="flex justify-center gap-2 flex-wrap">
                  {currentFortune.luckyNumbers.map((num, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center justify-center w-10 h-10 bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-300 rounded-full font-semibold shadow-md"
                    >
                      {num}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleNewFortune}
              className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              <RefreshCw className="w-5 h-5" />
              새로운 포춘쿠키 열기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FortuneCookie