import React from 'react'
import { BookOpen, Clock, BarChart3, Plus } from 'lucide-react'
import { useFlashCardStore } from '../store/flashCardStore'

interface DeckListProps {
  onSelectDeck: (deckId: string) => void
  onCreateDeck: () => void
}

export const DeckList: React.FC<DeckListProps> = ({ onSelectDeck, onCreateDeck }) => {
  const { decks, cards } = useFlashCardStore()

  const getDeckStats = (deckId: string) => {
    const deckCards = cards.filter(card => 
      decks.find(d => d.id === deckId)?.cards.includes(card.id)
    )
    
    const dueCards = deckCards.filter(card => {
      if (!card.nextReview) return true
      return new Date(card.nextReview) <= new Date()
    })
    
    const totalReviews = deckCards.reduce((sum, card) => sum + card.reviewCount, 0)
    const accuracy = deckCards.length > 0
      ? Math.round((deckCards.reduce((sum, card) => 
          sum + (card.reviewCount > 0 ? (card.correctCount / card.reviewCount) * 100 : 0), 0
        ) / deckCards.filter(c => c.reviewCount > 0).length) || 0)
      : 0
    
    return {
      totalCards: deckCards.length,
      dueCards: dueCards.length,
      totalReviews,
      accuracy
    }
  }

  return (
    <div className="p-4 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">나의 학습 덱</h1>
        <p className="text-gray-600">플래시카드로 효과적인 학습을 시작하세요</p>
      </div>

      <button
        onClick={onCreateDeck}
        className="w-full mb-4 bg-primary-500 text-white rounded-xl p-4 flex items-center justify-center gap-2 hover:bg-primary-600 transition-colors"
      >
        <Plus className="w-5 h-5" />
        <span className="font-medium">새 덱 만들기</span>
      </button>

      {decks.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">아직 덱이 없습니다</h3>
          <p className="text-gray-500">첫 번째 학습 덱을 만들어보세요!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {decks.map(deck => {
            const stats = getDeckStats(deck.id)
            
            return (
              <div
                key={deck.id}
                onClick={() => onSelectDeck(deck.id)}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{deck.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{deck.description}</p>
                  </div>
                  {stats.dueCards > 0 && (
                    <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
                      {stats.dueCards} 복습
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{stats.totalCards} 카드</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{stats.totalReviews} 학습</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{stats.accuracy}% 정답률</span>
                  </div>
                </div>

                {deck.lastStudied && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      마지막 학습: {new Date(deck.lastStudied).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}