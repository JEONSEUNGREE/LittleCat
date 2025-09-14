import { useState } from 'react'
import { DrumPad } from './components/DrumPad'
import { MixerPanel } from './components/MixerPanel'
import { EffectsRack } from './components/EffectsRack'
import { SequencerGrid } from './components/SequencerGrid'
import { TransportControls } from './components/TransportControls'
import { Visualizer } from './components/Visualizer'
import { Music, Sliders, Grid3x3, Activity } from 'lucide-react'

function App() {
  const [activeView, setActiveView] = useState<'pad' | 'mixer' | 'sequencer' | 'effects'>('pad')

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-purple-950/20 to-dark-bg">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue bg-clip-text text-transparent text-neon-glow">
            Sound Mixer Studio
          </h1>
          <p className="text-center text-gray-400 mt-2">Create beats, mix sounds, make music</p>
        </header>

        {/* Visualizer */}
        <div className="mb-6">
          <Visualizer />
        </div>

        {/* Transport Controls */}
        <div className="mb-6">
          <TransportControls />
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-6 gap-2 flex-wrap">
          <button
            onClick={() => setActiveView('pad')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              activeView === 'pad' 
                ? 'bg-gradient-to-r from-neon-purple to-neon-pink text-white' 
                : 'glass-effect text-gray-300 hover:text-white'
            }`}
          >
            <Grid3x3 size={20} />
            <span className="hidden sm:inline">Drum Pad</span>
          </button>
          <button
            onClick={() => setActiveView('sequencer')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              activeView === 'sequencer' 
                ? 'bg-gradient-to-r from-neon-purple to-neon-pink text-white' 
                : 'glass-effect text-gray-300 hover:text-white'
            }`}
          >
            <Music size={20} />
            <span className="hidden sm:inline">Sequencer</span>
          </button>
          <button
            onClick={() => setActiveView('mixer')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              activeView === 'mixer' 
                ? 'bg-gradient-to-r from-neon-purple to-neon-pink text-white' 
                : 'glass-effect text-gray-300 hover:text-white'
            }`}
          >
            <Sliders size={20} />
            <span className="hidden sm:inline">Mixer</span>
          </button>
          <button
            onClick={() => setActiveView('effects')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              activeView === 'effects' 
                ? 'bg-gradient-to-r from-neon-purple to-neon-pink text-white' 
                : 'glass-effect text-gray-300 hover:text-white'
            }`}
          >
            <Activity size={20} />
            <span className="hidden sm:inline">Effects</span>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="glass-effect rounded-2xl p-6 min-h-[400px]">
          {activeView === 'pad' && <DrumPad />}
          {activeView === 'sequencer' && <SequencerGrid />}
          {activeView === 'mixer' && <MixerPanel />}
          {activeView === 'effects' && <EffectsRack />}
        </div>
      </div>
    </div>
  )
}

export default App