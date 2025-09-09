import React, { useEffect } from 'react'
import { useGameStore } from './store/gameStore'
import CreatureDisplay from './components/CreatureDisplay'
import ResourcePanel from './components/ResourcePanel'
import ControlPanel from './components/ControlPanel'
import { Sparkles, Dna } from 'lucide-react'

function App() {
  const { creatures, selectedCreature, selectCreature, tick } = useGameStore()

  useEffect(() => {
    const interval = setInterval(() => {
      tick()
    }, 1000)

    return () => clearInterval(interval)
  }, [tick])

  useEffect(() => {
    if (!selectedCreature && creatures.length > 0) {
      selectCreature(creatures[0])
    }
  }, [creatures, selectedCreature, selectCreature])

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-bg to-game-primary p-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-6 animate-float">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 flex items-center justify-center space-x-3">
            <Sparkles className="text-pixel-yellow animate-pulse" />
            <span className="bg-gradient-to-r from-pixel-green to-pixel-blue bg-clip-text text-transparent">
              Pixel Life Evolution
            </span>
            <Dna className="text-pixel-purple animate-pulse" />
          </h1>
          <p className="text-gray-400 text-sm">Click to collect DNA and evolve your pixel creatures!</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-game-primary rounded-xl p-4">
              <h2 className="text-white font-bold text-lg mb-4 text-center">Your Creatures</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {creatures.map((creature) => (
                  <CreatureDisplay
                    key={creature.id}
                    creature={creature}
                    onSelect={() => selectCreature(creature)}
                    isSelected={selectedCreature?.id === creature.id}
                  />
                ))}
              </div>
            </div>

            <ResourcePanel />
          </div>

          <div className="space-y-6">
            <ControlPanel />
            
            <div className="bg-game-primary rounded-xl p-4">
              <h3 className="text-white font-bold text-sm mb-3">How to Play</h3>
              <ul className="text-gray-400 text-xs space-y-2">
                <li className="flex items-start">
                  <span className="text-pixel-green mr-2">▸</span>
                  Click "Collect DNA" to gather resources
                </li>
                <li className="flex items-start">
                  <span className="text-pixel-blue mr-2">▸</span>
                  Feed creatures to gain experience and DNA
                </li>
                <li className="flex items-start">
                  <span className="text-pixel-purple mr-2">▸</span>
                  Evolve creatures to increase their level
                </li>
                <li className="flex items-start">
                  <span className="text-pixel-yellow mr-2">▸</span>
                  Buy new creatures to expand your ecosystem
                </li>
                <li className="flex items-start">
                  <span className="text-pixel-red mr-2">▸</span>
                  Enable Auto Evolve for passive progression
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App