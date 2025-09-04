import React from 'react'
import { Music2 } from 'lucide-react'
import MoodSelector from './components/MoodSelector'
import WaveVisualizer from './components/WaveVisualizer'
import DJControls from './components/DJControls'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex justify-center items-center space-x-3 mb-2">
            <Music2 size={36} className="text-purple-400 animate-pulse" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Mood Wave DJ
            </h1>
          </div>
          <p className="text-gray-400 text-sm sm:text-base">
            Transform your emotions into music waves
          </p>
        </header>

        {/* Main Content */}
        <main className="space-y-8 max-w-7xl mx-auto">
          {/* Mood Selector */}
          <section>
            <MoodSelector />
          </section>

          {/* Wave Visualizer */}
          <section>
            <WaveVisualizer />
          </section>

          {/* DJ Controls */}
          <section>
            <DJControls />
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>Feel the rhythm of your emotions</p>
        </footer>
      </div>
    </div>
  )
}

export default App