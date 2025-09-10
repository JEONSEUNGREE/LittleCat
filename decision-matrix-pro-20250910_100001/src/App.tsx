import { useState } from 'react'
import { Plus, Grid3x3, List, Settings } from 'lucide-react'
import useStore from './store/useStore'
import DecisionList from './components/DecisionList'
import MatrixView from './components/MatrixView'
import CreateDecision from './components/CreateDecision'
import Header from './components/Header'

type ViewMode = 'list' | 'matrix' | 'create'

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const { currentDecision } = useStore()

  const renderContent = () => {
    switch (viewMode) {
      case 'list':
        return <DecisionList onSelectDecision={() => setViewMode('matrix')} />
      case 'matrix':
        return currentDecision ? (
          <MatrixView onBack={() => setViewMode('list')} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-white">
            <Grid3x3 className="w-16 h-16 mb-4 opacity-50" />
            <p className="text-xl mb-4">No decision selected</p>
            <button
              onClick={() => setViewMode('list')}
              className="button-secondary"
            >
              Go to Decisions
            </button>
          </div>
        )
      case 'create':
        return <CreateDecision onComplete={() => setViewMode('matrix')} onCancel={() => setViewMode('list')} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500">
      <Header />
      
      <main className="container mx-auto px-4 py-6 pb-24 max-w-6xl">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-lg border-t border-white/20">
        <div className="flex justify-around items-center h-16">
          <button
            onClick={() => setViewMode('list')}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              viewMode === 'list' ? 'text-white' : 'text-white/60'
            }`}
          >
            <List className="w-6 h-6 mb-1" />
            <span className="text-xs">Decisions</span>
          </button>
          
          <button
            onClick={() => setViewMode('create')}
            className="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-lg transform -translate-y-2"
          >
            <Plus className="w-6 h-6 text-purple-600" />
          </button>
          
          <button
            onClick={() => setViewMode('matrix')}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              viewMode === 'matrix' ? 'text-white' : 'text-white/60'
            }`}
          >
            <Grid3x3 className="w-6 h-6 mb-1" />
            <span className="text-xs">Matrix</span>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default App