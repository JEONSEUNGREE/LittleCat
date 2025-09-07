import React from 'react'
import GameCanvas from './components/GameCanvas'
import GameUI from './components/GameUI'

function App() {
  return (
    <div className="w-full h-screen relative bg-gradient-to-b from-indigo-950 via-purple-950 to-black">
      <GameCanvas />
      <GameUI />
    </div>
  )
}

export default App