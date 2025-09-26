import React from 'react'
import { MoodSelector } from './components/MoodSelector'
import { DJMixer } from './components/DJMixer'
import { Visualizer } from './components/Visualizer'
import { MoodHistory } from './components/MoodHistory'
import { Headphones, Sparkles } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 p-2 md:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-4 md:mb-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Headphones className="w-8 h-8 md:w-12 md:h-12" />
            Mood Mixer DJ
            <Sparkles className="w-8 h-8 md:w-12 md:h-12" />
          </h1>
          <p className="text-white/70 text-sm md:text-base">
            Mix your emotions into the perfect musical experience
          </p>
        </header>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Mood Selector */}
          <div className="lg:col-span-1">
            <MoodSelector />
          </div>

          {/* Center Column - Mixer and Visualizer */}
          <div className="lg:col-span-1 space-y-4">
            <DJMixer />
            <Visualizer />
          </div>

          {/* Right Column - History */}
          <div className="lg:col-span-1">
            <MoodHistory />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-6 text-center text-white/50 text-xs">
          <p>Feel the rhythm of your emotions • Mix your mood • Create your vibe</p>
        </footer>
      </div>
    </div>
  )
}

export default App