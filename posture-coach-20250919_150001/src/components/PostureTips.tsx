import { Lightbulb, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const tips = [
  {
    title: '모니터 높이 조절',
    description: '눈높이와 모니터 상단이 일치하도록 조절하세요',
    color: 'bg-blue-500'
  },
  {
    title: '등받이 활용',
    description: '의자 등받이에 등을 대고 앉아 척추를 지지하세요',
    color: 'bg-green-500'
  },
  {
    title: '발 위치',
    description: '발이 바닥에 평평하게 닿도록 의자 높이를 조절하세요',
    color: 'bg-purple-500'
  },
  {
    title: '팔꿈치 각도',
    description: '팔꿈치는 90도 각도를 유지하며 타이핑하세요',
    color: 'bg-orange-500'
  },
  {
    title: '정기적인 스트레칭',
    description: '매 시간마다 일어나서 목과 어깨를 스트레칭하세요',
    color: 'bg-pink-500'
  },
  {
    title: '눈 휴식',
    description: '20-20-20 규칙: 20분마다 20피트 거리를 20초간 보세요',
    color: 'bg-indigo-500'
  }
]

export default function PostureTips() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      nextTip()
    }, 10000) // Change tip every 10 seconds

    return () => clearInterval(interval)
  }, [currentTipIndex])

  const nextTip = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tips.length)
      setIsAnimating(false)
    }, 200)
  }

  const currentTip = tips[currentTipIndex]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          자세 교정 팁
        </h3>
        <Lightbulb className="w-5 h-5 text-yellow-500" />
      </div>

      <div className={`transition-opacity duration-200 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <div className={`p-4 rounded-xl ${currentTip.color} bg-opacity-10 dark:bg-opacity-20`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">
                {currentTip.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                {currentTip.description}
              </p>
            </div>
            <button
              onClick={nextTip}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors ml-4"
              aria-label="다음 팁"
            >
              <ChevronRight className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center mt-4 space-x-2">
        {tips.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAnimating(true)
              setTimeout(() => {
                setCurrentTipIndex(index)
                setIsAnimating(false)
              }, 200)
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentTipIndex
                ? 'bg-primary-500 w-6'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
            aria-label={`팁 ${index + 1}`}
          />
        ))}
      </div>

      <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
        <p className="text-sm text-yellow-800 dark:text-yellow-200 flex items-center">
          <span className="mr-2">💡</span>
          올바른 자세는 건강한 삶의 기초입니다
        </p>
      </div>
    </div>
  )
}