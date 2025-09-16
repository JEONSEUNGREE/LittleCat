import React from 'react'
import GameCanvas from './components/GameCanvas'
import ControlPanel from './components/ControlPanel'

function App() {
  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      <div className="flex-1 relative">
        <GameCanvas />
      </div>
      <ControlPanel />
    </div>
  )
}

export default App