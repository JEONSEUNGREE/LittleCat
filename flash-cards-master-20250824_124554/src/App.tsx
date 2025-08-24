import React, { useState, useEffect } from 'react'
import { Brain, Plus, Home, BarChart3, Settings } from 'lucide-react'
import { useFlashCardStore } from './store/flashCardStore'
import { DeckList } from './components/DeckList'
import { StudyCard } from './components/StudyCard'
import { CreateCardModal } from './components/CreateCardModal'

type ViewMode = 'home' | 'study' | 'stats' | 'settings'

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('home')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null)
  
  const { 
    decks, 
    cards, 
    studySession, 
    startStudySession, 
    createDeck,
    getDueCards 
  } = useFlashCardStore()

  // Initialize with sample data if empty
  useEffect(() => {
    if (decks.length === 0) {
      const sampleDeckId = createDeck(
        '기본 학습 덱',
        '플래시카드 학습을 시작해보세요!'
      )
    }
  }, [])

  const handleSelectDeck = (deckId: string) => {
    setSelectedDeckId(deckId)
    startStudySession(deckId)
    setViewMode('study')
  }

  const handleCreateDeck = () => {
    const name = prompt('새 덱의 이름을 입력하세요:')
    if (name) {
      const description = prompt('덱 설명을 입력하세요 (선택사항):') || ''
      createDeck(name, description)
    }
  }

  const handleBackFromStudy = () => {
    setSelectedDeckId(null)
    setViewMode('home')
  }

  const getTotalStats = () => {
    const totalCards = cards.length
    const totalReviews = cards.reduce((sum, card) => sum + card.reviewCount, 0)
    const dueCards = getDueCards().length
    const accuracy = cards.filter(c => c.reviewCount > 0).length > 0
      ? Math.round(
          cards
            .filter(c => c.reviewCount > 0)
            .reduce((sum, card) => sum + (card.correctCount / card.reviewCount) * 100, 0) /
          cards.filter(c => c.reviewCount > 0).length
        )
      : 0

    return { totalCards, totalReviews, dueCards, accuracy }
  }

  const stats = getTotalStats()

  if (studySession?.isActive && viewMode === 'study') {
    return <StudyCard onBack={handleBackFromStudy} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-7 h-7 text-primary-500" />
            <h1 className="text-xl font-bold text-gray-900">Flash Cards Master</h1>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-16">
        {viewMode === 'home' && (
          <>
            {/* Stats Overview */}
            <div className="p-4 grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p className="text-2xl font-bold text-gray-900">{stats.totalCards}</p>
                <p className="text-sm text-gray-600">전체 카드</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p className="text-2xl font-bold text-primary-500">{stats.dueCards}</p>
                <p className="text-sm text-gray-600">복습 대기</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p className="text-2xl font-bold text-gray-900">{stats.totalReviews}</p>
                <p className="text-sm text-gray-600">총 학습</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <p className="text-2xl font-bold text-green-600">{stats.accuracy}%</p>
                <p className="text-sm text-gray-600">정답률</p>
              </div>
            </div>

            {/* Deck List */}
            <DeckList 
              onSelectDeck={handleSelectDeck}
              onCreateDeck={handleCreateDeck}
            />
          </>
        )}

        {viewMode === 'stats' && (
          <div className="p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">학습 통계</h2>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">전체 카드 수</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalCards}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">총 학습 횟수</p>
                  <p className="text-3xl font-bold text-primary-500">{stats.totalReviews}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">평균 정답률</p>
                  <p className="text-3xl font-bold text-green-600">{stats.accuracy}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">복습 필요</p>
                  <p className="text-3xl font-bold text-orange-500">{stats.dueCards}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'settings' && (
          <div className="p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">설정</h2>
            <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-700">알림 설정</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                </label>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-gray-700">다크 모드</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                </label>
              </div>
              <div className="py-3">
                <p className="text-gray-700 mb-2">버전 정보</p>
                <p className="text-sm text-gray-500">Flash Cards Master v1.0.0</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-4 gap-1">
          <button
            onClick={() => setViewMode('home')}
            className={`py-3 flex flex-col items-center gap-1 transition-colors ${
              viewMode === 'home' 
                ? 'text-primary-500' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">홈</span>
          </button>
          <button
            onClick={() => setViewMode('study')}
            disabled={!selectedDeckId}
            className={`py-3 flex flex-col items-center gap-1 transition-colors ${
              viewMode === 'study' 
                ? 'text-primary-500' 
                : 'text-gray-400 hover:text-gray-600'
            } ${!selectedDeckId ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Brain className="w-5 h-5" />
            <span className="text-xs">학습</span>
          </button>
          <button
            onClick={() => setViewMode('stats')}
            className={`py-3 flex flex-col items-center gap-1 transition-colors ${
              viewMode === 'stats' 
                ? 'text-primary-500' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs">통계</span>
          </button>
          <button
            onClick={() => setViewMode('settings')}
            className={`py-3 flex flex-col items-center gap-1 transition-colors ${
              viewMode === 'settings' 
                ? 'text-primary-500' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-xs">설정</span>
          </button>
        </div>
      </nav>

      {/* Create Card Modal */}
      <CreateCardModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        deckId={selectedDeckId || undefined}
      />
    </div>
  )
}

export default App