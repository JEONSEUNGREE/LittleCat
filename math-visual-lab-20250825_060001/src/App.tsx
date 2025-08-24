import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import ConceptSelector from './components/ConceptSelector'
import ParameterControls from './components/ParameterControls'
import GraphCanvas from './components/GraphCanvas'
import InfoModal from './components/InfoModal'
import useStore from './store/useStore'

function App() {
  const [showInfo, setShowInfo] = useState(false)
  const { calculatePoints, updateEquation } = useStore()

  useEffect(() => {
    // Initialize with default values
    updateEquation()
    calculatePoints()
  }, [updateEquation, calculatePoints])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header onInfoClick={() => setShowInfo(true)} />
      
      <main className="container mx-auto px-4 py-6 max-w-6xl">
        <ConceptSelector />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <GraphCanvas />
          </div>
          
          <div className="lg:col-span-1">
            <ParameterControls />
          </div>
        </div>
      </main>

      <InfoModal isOpen={showInfo} onClose={() => setShowInfo(false)} />
      
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          border: none;
        }
        
        .slider:focus {
          outline: none;
        }
        
        .slider::-webkit-slider-thumb:hover {
          background: #2563EB;
          transform: scale(1.2);
        }
        
        .slider::-moz-range-thumb:hover {
          background: #2563EB;
          transform: scale(1.2);
        }
      `}</style>
    </div>
  )
}

export default App