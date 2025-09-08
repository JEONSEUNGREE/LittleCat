import React from 'react'
import Header from './components/Header'
import GameBoard from './components/GameBoard'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <GameBoard />
      </main>
      <footer className="text-center py-4 text-gray-500 text-xs">
        <p>© 2025 Sound Puzzle Quest - 청각적 창의성을 자극하는 퍼즐 게임</p>
      </footer>
    </div>
  )
}

export default App