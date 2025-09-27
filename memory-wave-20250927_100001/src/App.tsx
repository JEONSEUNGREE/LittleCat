import React from 'react'
import GameHeader from './components/GameHeader'
import GameBoard from './components/GameBoard'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader />
      <main className="flex-1 flex items-center justify-center p-4">
        <GameBoard />
      </main>
    </div>
  )
}

export default App