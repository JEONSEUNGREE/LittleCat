import { useState } from 'react'
import { Brain, Home, Target, BarChart3, Menu, X, ChevronLeft } from 'lucide-react'
import Dashboard from './components/Dashboard'
import PalaceBuilder from './components/PalaceBuilder'
import MemoryTrainer from './components/MemoryTrainer'
import { useMemoryStore } from './store/useMemoryStore'

type View = 'dashboard' | 'palace' | 'training'

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { currentPalace } = useMemoryStore()

  const navigation = [
    { id: 'dashboard', label: '대시보드', icon: BarChart3 },
    { id: 'palace', label: '궁전 만들기', icon: Home },
    { id: 'training', label: '훈련', icon: Target },
  ]

  const handleNavigation = (view: View) => {
    if (view !== 'dashboard' && !currentPalace) {
      alert('먼저 궁전을 선택하세요!')
      return
    }
    setCurrentView(view)
    setIsMobileMenuOpen(false)
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />
      case 'palace':
        return <PalaceBuilder />
      case 'training':
        return <MemoryTrainer />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* 모바일 헤더 */}
      <div className="md:hidden bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-indigo-600" />
            <span className="font-bold text-gray-800">Memory Palace</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b shadow-lg absolute top-16 left-0 right-0 z-40">
          <div className="p-4">
            {navigation.map(item => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id as View)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    currentView === item.id
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* 데스크톱 사이드바 */}
        <div className="hidden md:flex flex-col w-64 bg-white border-r">
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-indigo-600" />
              <div>
                <h1 className="font-bold text-gray-800">Memory Palace</h1>
                <p className="text-xs text-gray-500">기억력 강화 트레이너</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4">
            {navigation.map(item => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id as View)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all mb-2 ${
                    currentView === item.id
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>

          {currentPalace && (
            <div className="p-4 border-t">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">현재 궁전</p>
                <p className="font-bold text-gray-800">{currentPalace.name}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
                  <span>{currentPalace.rooms.length} 방</span>
                  <span>
                    {currentPalace.rooms.reduce((acc, room) => acc + room.items.length, 0)} 아이템
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 메인 콘텐츠 */}
        <div className="flex-1 overflow-auto">
          {currentView !== 'dashboard' && (
            <button
              onClick={() => setCurrentView('dashboard')}
              className="md:hidden fixed bottom-4 right-4 bg-indigo-600 text-white p-3 rounded-full shadow-lg z-30 hover:bg-indigo-700 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          {renderView()}
        </div>
      </div>
    </div>
  )
}

export default App