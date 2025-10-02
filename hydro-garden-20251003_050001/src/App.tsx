import React from 'react'
import { Droplet, Sparkles } from 'lucide-react'
import WaterTracker from './components/WaterTracker'
import PlantGarden from './components/PlantGarden'
import Statistics from './components/Statistics'
import useHydrationStore from './store/useHydrationStore'

function App() {
  const { checkAndUpdateStreak } = useHydrationStore()
  const [activeTab, setActiveTab] = React.useState<'tracker' | 'garden' | 'stats'>('tracker')

  React.useEffect(() => {
    checkAndUpdateStreak()
    
    const interval = setInterval(() => {
      checkAndUpdateStreak()
    }, 60000)
    
    return () => clearInterval(interval)
  }, [checkAndUpdateStreak])

  return (
    <div className="min-h-screen pb-20">
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Droplet className="text-water-blue" />
            Hydro Garden
            <Sparkles className="text-yellow-500 w-5 h-5" />
          </h1>
          <p className="text-sm text-gray-600">물을 마시고 정원을 가꾸세요!</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="space-y-6">
          {activeTab === 'tracker' && <WaterTracker />}
          {activeTab === 'garden' && <PlantGarden />}
          {activeTab === 'stats' && <Statistics />}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-2">
            <button
              onClick={() => setActiveTab('tracker')}
              className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
                activeTab === 'tracker' 
                  ? 'text-water-blue bg-sky-light' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Droplet className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">수분 추적</span>
            </button>
            
            <button
              onClick={() => setActiveTab('garden')}
              className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
                activeTab === 'garden' 
                  ? 'text-leaf-green bg-green-50' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="text-2xl mb-1">🌱</span>
              <span className="text-xs font-medium">내 정원</span>
            </button>
            
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
                activeTab === 'stats' 
                  ? 'text-purple-600 bg-purple-50' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="text-2xl mb-1">📊</span>
              <span className="text-xs font-medium">통계</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default App