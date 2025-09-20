import { Activity, Info, Settings } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const [showInfo, setShowInfo] = useState(false)
  
  return (
    <>
      <header className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="text-yellow-400" size={32} />
            <div>
              <h1 className="text-xl lg:text-2xl font-bold">Virtual Stage Director</h1>
              <p className="text-xs lg:text-sm text-purple-200">Create stunning stage performances</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="p-2 rounded-lg bg-purple-800 hover:bg-purple-700 transition-colors"
              aria-label="Info"
            >
              <Info size={20} />
            </button>
            <button
              className="p-2 rounded-lg bg-purple-800 hover:bg-purple-700 transition-colors"
              aria-label="Settings"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      </header>
      
      {showInfo && (
        <div className="bg-gray-800 text-gray-300 p-4 border-b border-gray-700">
          <h3 className="font-semibold text-white mb-2">How to Use:</h3>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Select a tool (Light, Effect, or Move) from the panel</li>
            <li>Click on the stage to place lights and effects</li>
            <li>Use Move tool to select and delete elements</li>
            <li>Press Play to see your creation come to life</li>
            <li>Save your scenes to revisit them later</li>
          </ul>
          <button
            onClick={() => setShowInfo(false)}
            className="mt-3 px-3 py-1 bg-purple-700 hover:bg-purple-600 text-white rounded text-sm transition-colors"
          >
            Got it!
          </button>
        </div>
      )}
    </>
  )
}