import { useState } from 'react'
import { Calculator, History, Star, Info } from 'lucide-react'
import { CategorySelector } from './components/CategorySelector'
import { Converter } from './components/Converter'
import { Favorites } from './components/Favorites'
import { RecentConversions } from './components/RecentConversions'

type Tab = 'converter' | 'favorites' | 'recent'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('converter')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-100 rounded-xl">
                <Calculator className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Unit Converter Pro</h1>
                <p className="text-xs text-gray-500">Fast & Accurate Conversions</p>
              </div>
            </div>
            <button
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
              aria-label="Info"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Category Selector */}
      <div className="sticky top-[72px] z-40 bg-white/95 backdrop-blur-sm border-b">
        <div className="max-w-6xl mx-auto py-3">
          <CategorySelector />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('converter')}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                transition-all duration-200
                ${activeTab === 'converter' 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
                }
              `}
            >
              <Calculator className="w-4 h-4" />
              <span className="hidden sm:inline">Converter</span>
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                transition-all duration-200
                ${activeTab === 'favorites' 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
                }
              `}
            >
              <Star className="w-4 h-4" />
              <span className="hidden sm:inline">Favorites</span>
            </button>
            <button
              onClick={() => setActiveTab('recent')}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                transition-all duration-200
                ${activeTab === 'recent' 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
                }
              `}
            >
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">Recent</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'converter' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <Converter />
              </div>
              <div className="space-y-6">
                <Favorites />
                <RecentConversions />
              </div>
            </div>
          )}
          
          {activeTab === 'favorites' && (
            <div className="max-w-2xl mx-auto">
              <Favorites />
            </div>
          )}
          
          {activeTab === 'recent' && (
            <div className="max-w-2xl mx-auto">
              <RecentConversions />
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 py-6 border-t text-center text-sm text-gray-500">
          <p>© 2024 Unit Converter Pro. All conversions are approximate.</p>
        </footer>
      </main>
    </div>
  )
}

export default App