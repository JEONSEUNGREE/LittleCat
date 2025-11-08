import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { tarotCards, luckyColors } from '../data/fortunes'
import { useFortuneStore } from '../store/fortuneStore'

export default function TarotReading() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [isFlipping, setIsFlipping] = useState(false)
  const setFortune = useFortuneStore((state) => state.setFortune)

  const handleCardClick = (index: number) => {
    if (selectedCard !== null || isFlipping) return

    setIsFlipping(true)
    setSelectedCard(index)

    setTimeout(() => {
      const card = tarotCards[index]
      setFortune({
        type: 'tarot',
        title: card.name,
        message: card.meaning,
        advice: card.advice,
        luckyNumber: Math.floor(Math.random() * 99) + 1,
        luckyColor: luckyColors[Math.floor(Math.random() * luckyColors.length)],
        timestamp: Date.now()
      })
      setIsFlipping(false)
    }, 600)
  }

  const resetCards = () => {
    setSelectedCard(null)
    setIsFlipping(false)
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Sparkles className="text-gold-400" />
          타로 카드 운세
          <Sparkles className="text-gold-400" />
        </h2>
        <p className="text-mystic-200">
          {selectedCard === null ? '카드를 선택하여 운세를 확인하세요' : '당신의 카드입니다'}
        </p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
        {tarotCards.map((card, index) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(index)}
            disabled={selectedCard !== null && selectedCard !== index}
            className={`
              aspect-[2/3] rounded-lg transition-all duration-300
              ${selectedCard === index ? 'scale-110 animate-flip' : ''}
              ${selectedCard !== null && selectedCard !== index ? 'opacity-30 scale-95' : ''}
              ${selectedCard === null ? 'hover:scale-105 hover:shadow-lg hover:shadow-mystic-500/50' : ''}
            `}
          >
            <div className={`
              w-full h-full rounded-lg flex items-center justify-center
              ${selectedCard === index
                ? 'bg-gradient-to-br from-gold-400 to-gold-600 text-white'
                : 'bg-gradient-to-br from-mystic-800 to-mystic-900 border-2 border-mystic-600'}
            `}>
              {selectedCard === index ? (
                <div className="text-center p-2">
                  <div className="text-lg md:text-xl font-bold mb-1">{card.name}</div>
                  <Sparkles className="mx-auto" size={20} />
                </div>
              ) : (
                <div className="text-mystic-400">
                  <Sparkles size={24} />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {selectedCard !== null && (
        <div className="text-center">
          <button
            onClick={resetCards}
            className="px-6 py-3 bg-mystic-600 hover:bg-mystic-700 text-white rounded-lg transition-colors"
          >
            다시 선택하기
          </button>
        </div>
      )}
    </div>
  )
}
