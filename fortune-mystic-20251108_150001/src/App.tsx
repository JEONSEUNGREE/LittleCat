import { useState } from 'react'
import { Sparkles, Star, Eye, Sun } from 'lucide-react'
import TarotReading from './components/TarotReading'
import CrystalBall from './components/CrystalBall'
import DailyFortune from './components/DailyFortune'
import FortuneResult from './components/FortuneResult'

type TabType = 'tarot' | 'crystal' | 'daily'

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('daily')

  const tabs = [
    { id: 'daily' as TabType, label: '오늘의 운세', icon: Sun },
    { id: 'tarot' as TabType, label: '타로', icon: Star },
    { id: 'crystal' as TabType, label: '수정구슬', icon: Eye },
  ]

  return (
    <div className="min-h-screen py-8">
      {/* Header */}
      <header className="text-center mb-12 px-4">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Sparkles className="text-gold-400 animate-pulse" size={32} />
          <h1 className="text-4xl md:text-5xl font-bold text-white text-shadow">
            Fortune Mystic
          </h1>
          <Sparkles className="text-gold-400 animate-pulse" size={32} />
        </div>
        <p className="text-mystic-200 text-lg">
          신비로운 운세의 세계에 오신 것을 환영합니다
        </p>
      </header>

      {/* Navigation Tabs */}
      <nav className="max-w-2xl mx-auto mb-12 px-4">
        <div className="flex gap-2 bg-mystic-900/50 backdrop-blur-sm p-2 rounded-xl border border-mystic-700">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex-1 py-3 px-4 rounded-lg transition-all duration-300 font-semibold
                  flex items-center justify-center gap-2
                  ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-mystic-600 to-mystic-700 text-white shadow-lg'
                    : 'text-mystic-300 hover:text-white hover:bg-mystic-800/50'}
                `}
              >
                <Icon size={20} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="mb-12">
        {activeTab === 'daily' && <DailyFortune />}
        {activeTab === 'tarot' && <TarotReading />}
        {activeTab === 'crystal' && <CrystalBall />}
      </main>

      {/* Fortune Result Modal */}
      <FortuneResult />

      {/* Footer */}
      <footer className="text-center text-mystic-400 text-sm px-4">
        <p>✨ 운세는 재미로만 봐주세요 ✨</p>
      </footer>
    </div>
  )
}

export default App
