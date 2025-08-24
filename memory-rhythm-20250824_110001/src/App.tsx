import { useState } from 'react'
import { Plus, Music, BarChart3, Settings, Play, Pause } from 'lucide-react'
import useMemoryStore from './store/memoryStore'
import CardDisplay from './components/CardDisplay'
import AddCardModal from './components/AddCardModal'
import StatsPanel from './components/StatsPanel'

type ViewMode = 'study' | 'stats' | 'settings'

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('study')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  
  const {
    cards,
    currentSession,
    selectedCategory,
    setSelectedCategory,
    getCategories,
    startSession,
    endSession
  } = useMemoryStore()
  
  const categories = getCategories()
  
  const handleStartSession = () => {
    if (!currentSession) {
      startSession()
    } else {
      endSession()
    }
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Music className="w-6 h-6 text-white" />
              <h1 className="text-xl font-bold text-white">Memory Rhythm</h1>
            </div>
            
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="p-2 bg-white/20 backdrop-blur-lg rounded-lg hover:bg-white/30 transition-colors"
            >
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {viewMode === 'study' && (
          <div className="max-w-lg mx-auto">
            {/* 카테고리 필터 */}
            <div className="mb-6">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                      selectedCategory === category
                        ? 'bg-white text-rhythm-600'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* 세션 컨트롤 */}
            <div className="mb-6 flex justify-center">
              <button
                onClick={handleStartSession}
                className={`px-6 py-3 rounded-full font-medium transition-colors flex items-center gap-2 ${
                  currentSession
                    ? 'bg-red-500/80 hover:bg-red-500 text-white'
                    : 'bg-green-500/80 hover:bg-green-500 text-white'
                }`}
              >
                {currentSession ? (
                  <>
                    <Pause className="w-5 h-5" />
                    학습 종료
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    학습 시작
                  </>
                )}
              </button>
            </div>
            
            {/* 카드 디스플레이 */}
            <CardDisplay />
          </div>
        )}
        
        {viewMode === 'stats' && (
          <div className="max-w-lg mx-auto">
            <StatsPanel />
          </div>
        )}
        
        {viewMode === 'settings' && (
          <div className="max-w-lg mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">설정</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white mb-2">기본 BPM</label>
                  <input
                    type="range"
                    min="60"
                    max="180"
                    defaultValue="120"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-white mb-2">자동 재생</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="autoplay"
                      className="w-4 h-4"
                    />
                    <label htmlFor="autoplay" className="text-white/80">
                      카드 전환 시 자동으로 리듬 재생
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-white mb-2">학습 알림</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="notifications"
                      className="w-4 h-4"
                    />
                    <label htmlFor="notifications" className="text-white/80">
                      매일 학습 알림 받기
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-white/60 text-sm">
                  총 카드 수: {cards.length}개
                </p>
                <p className="text-white/60 text-sm mt-1">
                  버전: 1.0.0
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Bottom Navigation */}
      <nav className="bg-white/10 backdrop-blur-lg border-t border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-2">
            <button
              onClick={() => setViewMode('study')}
              className={`p-3 rounded-lg transition-colors ${
                viewMode === 'study'
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Music className="w-6 h-6" />
            </button>
            
            <button
              onClick={() => setViewMode('stats')}
              className={`p-3 rounded-lg transition-colors ${
                viewMode === 'stats'
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <BarChart3 className="w-6 h-6" />
            </button>
            
            <button
              onClick={() => setViewMode('settings')}
              className={`p-3 rounded-lg transition-colors ${
                viewMode === 'settings'
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>
      
      {/* Add Card Modal */}
      <AddCardModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  )
}

export default App