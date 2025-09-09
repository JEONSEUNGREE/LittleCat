import React from 'react'
import { useGameStore } from '../store/gameStore'
import { Dna, TrendingUp, Beef, Plus, Zap, ToggleLeft, ToggleRight } from 'lucide-react'

const ControlPanel: React.FC = () => {
  const { 
    selectedCreature, 
    resources, 
    autoEvolve,
    collectDNA, 
    evolveCreature, 
    feedCreature, 
    buyCreature,
    toggleAutoEvolve 
  } = useGameStore()

  const canEvolve = selectedCreature && resources.dna >= selectedCreature.level * 10
  const canFeed = selectedCreature && resources.food >= 10
  const canBuyCreature = resources.dna >= useGameStore.getState().creatures.length * 50

  return (
    <div className="bg-game-primary rounded-xl p-4 space-y-4">
      <h2 className="text-white font-bold text-lg text-center">Control Center</h2>

      <div className="space-y-3">
        <button
          onClick={collectDNA}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-4 px-6 rounded-lg transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center space-x-2"
        >
          <Dna size={20} />
          <span>Collect DNA (+1)</span>
        </button>

        {selectedCreature && (
          <>
            <button
              onClick={() => feedCreature(selectedCreature.id)}
              disabled={!canFeed}
              className={`w-full ${
                canFeed 
                  ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800' 
                  : 'bg-gray-600 cursor-not-allowed opacity-50'
              } text-white font-bold py-3 px-6 rounded-lg transform transition-all duration-200 ${
                canFeed ? 'hover:scale-105 active:scale-95' : ''
              } shadow-lg flex items-center justify-center space-x-2`}
            >
              <Beef size={18} />
              <span>Feed (-10 Food)</span>
            </button>

            <button
              onClick={() => evolveCreature(selectedCreature.id)}
              disabled={!canEvolve}
              className={`w-full ${
                canEvolve 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 animate-pulse' 
                  : 'bg-gray-600 cursor-not-allowed opacity-50'
              } text-white font-bold py-3 px-6 rounded-lg transform transition-all duration-200 ${
                canEvolve ? 'hover:scale-105 active:scale-95' : ''
              } shadow-lg flex items-center justify-center space-x-2`}
            >
              <TrendingUp size={18} />
              <span>Evolve (-{selectedCreature.level * 10} DNA)</span>
            </button>
          </>
        )}

        <button
          onClick={buyCreature}
          disabled={!canBuyCreature}
          className={`w-full ${
            canBuyCreature 
              ? 'bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800' 
              : 'bg-gray-600 cursor-not-allowed opacity-50'
          } text-white font-bold py-3 px-6 rounded-lg transform transition-all duration-200 ${
            canBuyCreature ? 'hover:scale-105 active:scale-95' : ''
          } shadow-lg flex items-center justify-center space-x-2`}
        >
          <Plus size={18} />
          <span>New Creature (-{useGameStore.getState().creatures.length * 50} DNA)</span>
        </button>

        <div className="border-t border-gray-700 pt-3">
          <button
            onClick={toggleAutoEvolve}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
          >
            {autoEvolve ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
            <span>Auto Evolve: {autoEvolve ? 'ON' : 'OFF'}</span>
            <Zap size={16} className={autoEvolve ? 'text-yellow-400' : 'text-gray-400'} />
          </button>
        </div>
      </div>

      {selectedCreature && (
        <div className="border-t border-gray-700 pt-3">
          <p className="text-gray-400 text-xs text-center">
            Selected: {selectedCreature.name} (Lv.{selectedCreature.level})
          </p>
        </div>
      )}
    </div>
  )
}

export default ControlPanel