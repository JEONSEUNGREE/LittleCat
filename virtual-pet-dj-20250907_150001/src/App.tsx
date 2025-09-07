import React from 'react'
import VirtualPet from './components/VirtualPet'
import DJMixer from './components/DJMixer'
import MixHistory from './components/MixHistory'
import { Music2, Sparkles } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-purple-900/20 to-dark-bg p-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8 pt-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Music2 className="w-8 h-8 text-neon-purple animate-pulse" />
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue bg-clip-text text-transparent">
              Virtual Pet DJ
            </h1>
            <Sparkles className="w-8 h-8 text-neon-pink animate-pulse" />
          </div>
          <p className="text-gray-400 text-sm sm:text-base">
            Mix beats and grow your digital DJ companion!
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <VirtualPet />
            <MixHistory />
          </div>
          
          <div className="lg:col-span-2">
            <DJMixer />
          </div>
        </div>

        <footer className="text-center mt-8 pb-4">
          <p className="text-gray-500 text-xs">
            Virtual Pet DJ © 2025 • Mix, Play, and Level Up Your DJ Pet!
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App