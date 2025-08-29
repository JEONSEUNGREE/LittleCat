import { useState } from 'react'
import { TimeBlockGrid } from './components/TimeBlockGrid'
import { TaskPanel } from './components/TaskPanel'
import { Header } from './components/Header'
import { useTimeBlockStore } from './store/useTimeBlockStore'

function App() {
  const [currentView, setCurrentView] = useState<'day' | 'week'>('day')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Task Panel */}
          <div className="lg:col-span-3">
            <TaskPanel />
          </div>
          
          {/* Time Block Grid */}
          <div className="lg:col-span-9">
            <TimeBlockGrid view={currentView} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App