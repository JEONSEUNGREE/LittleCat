import React from 'react'
import HeartVisualization from './components/HeartVisualization'
import ControlPanel from './components/ControlPanel'
import StatsDisplay from './components/StatsDisplay'
import { Heart } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-center gap-3">
            <Heart className="w-8 h-8 text-red-500 animate-pulse" />
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
              Heart Rhythm Visualizer
            </h1>
          </div>
          <p className="text-center text-gray-400 mt-2">
            Experience your heartbeat through beautiful visual patterns
          </p>
        </header>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Visualization Panel - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2 h-[400px] md:h-[500px] lg:h-[600px]">
            <HeartVisualization />
          </div>
          
          {/* Right Side Panel */}
          <div className="space-y-6">
            <ControlPanel />
            <StatsDisplay />
          </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Heart Rhythm Visualizer • Created with ❤️</p>
        </footer>
      </div>
    </div>
  )
}

export default App