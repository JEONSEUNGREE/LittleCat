import { useState, useEffect } from 'react'
import { useComplimentStore } from './store/complimentStore'
import ComplimentCard from './components/ComplimentCard'
import CreateCompliment from './components/CreateCompliment'
import ChainVisualizer from './components/ChainVisualizer'
import Header from './components/Header'
import { Heart, Sparkles, TrendingUp } from 'lucide-react'

function App() {
  const { compliments, fetchCompliments, stats } = useComplimentStore()
  const [activeView, setActiveView] = useState<'feed' | 'create' | 'chain'>('feed')

  useEffect(() => {
    fetchCompliments()
  }, [fetchCompliments])

  return (
    <div className="min-h-screen text-white">
      <Header />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-3">
            <button
              onClick={() => setActiveView('feed')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                activeView === 'feed' 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Heart size={20} />
              <span className="hidden sm:inline">피드</span>
            </button>
            <button
              onClick={() => setActiveView('create')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                activeView === 'create' 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Sparkles size={20} />
              <span className="hidden sm:inline">칭찬하기</span>
            </button>
            <button
              onClick={() => setActiveView('chain')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                activeView === 'chain' 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <TrendingUp size={20} />
              <span className="hidden sm:inline">체인</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Bar */}
        <div className="glass-card p-4 mb-8 animate-fade-in">
          <div className="flex justify-around text-center">
            <div>
              <p className="text-3xl font-bold text-warm">{stats.totalCompliments}</p>
              <p className="text-sm text-white/70">총 칭찬</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-secondary">{stats.activeChains}</p>
              <p className="text-sm text-white/70">활성 체인</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent">{stats.todayCompliments}</p>
              <p className="text-sm text-white/70">오늘의 칭찬</p>
            </div>
          </div>
        </div>

        {/* View Content */}
        <div className="animate-slide-up">
          {activeView === 'feed' && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {compliments.map(compliment => (
                <ComplimentCard key={compliment.id} compliment={compliment} />
              ))}
            </div>
          )}

          {activeView === 'create' && <CreateCompliment />}

          {activeView === 'chain' && <ChainVisualizer />}
        </div>
      </main>
    </div>
  )
}