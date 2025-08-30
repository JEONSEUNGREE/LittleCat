import { useState } from 'react'
import { Palette, Activity, Users, Menu, X } from 'lucide-react'
import MoodSelector from './components/MoodSelector'
import MoodDisplay from './components/MoodDisplay'
import SharedMoodFeed from './components/SharedMoodFeed'

type TabType = 'select' | 'display' | 'feed'

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('select')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const tabs = [
    { id: 'select' as TabType, label: '감정 선택', icon: Palette },
    { id: 'display' as TabType, label: '내 감정', icon: Activity },
    { id: 'feed' as TabType, label: '감정 피드', icon: Users }
  ]
  
  return (
    <div className="min-h-screen mood-gradient">
      <div className="min-h-screen bg-black/30">
        {/* Header */}
        <header className="glass-effect border-b border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 animate-pulse" />
                <h1 className="text-2xl font-bold text-white">Mood Mirror</h1>
              </div>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-white p-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              
              {/* Desktop navigation */}
              <nav className="hidden md:flex gap-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                      ${activeTab === tab.id 
                        ? 'bg-white/20 text-white' 
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'}
                    `}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Mobile navigation */}
            {mobileMenuOpen && (
              <nav className="md:hidden mt-4 flex flex-col gap-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`
                      flex items-center gap-2 px-4 py-3 rounded-lg transition-all
                      ${activeTab === tab.id 
                        ? 'bg-white/20 text-white' 
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'}
                    `}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            )}
          </div>
        </header>
        
        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Tab content */}
            <div className="animate-fadeIn">
              {activeTab === 'select' && <MoodSelector />}
              {activeTab === 'display' && <MoodDisplay />}
              {activeTab === 'feed' && <SharedMoodFeed />}
            </div>
            
            {/* Info section */}
            <div className="mt-12 text-center text-gray-300 max-w-2xl mx-auto">
              <p className="text-sm leading-relaxed">
                Mood Mirror는 당신의 감정을 색상과 패턴으로 표현하는 익명 소셜 플랫폼입니다.
                비슷한 감정을 느끼는 사람들과 연결되고, 감정의 흐름을 시각적으로 경험해보세요.
              </p>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="mt-auto py-6 text-center text-gray-400 text-sm">
          <p>© 2024 Mood Mirror. 모든 감정은 익명으로 보호됩니다.</p>
        </footer>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}

export default App