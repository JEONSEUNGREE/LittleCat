import { useState, useEffect } from 'react'
import { useKanjiStore } from './store/kanjiStore'
import Header from './components/Header'
import KanjiCanvas from './components/KanjiCanvas'
import LevelSelector from './components/LevelSelector'
import ProgressBar from './components/ProgressBar'
import ControlPanel from './components/ControlPanel'
import './App.css'

function App() {
  const { currentLevel, currentKanji, score, initializeApp } = useKanjiStore()
  const [isAnimating, setIsAnimating] = useState(false)
  
  useEffect(() => {
    initializeApp()
  }, [initializeApp])

  const handleAnimationToggle = () => {
    setIsAnimating(!isAnimating)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4 sm:p-6">
      <div className="max-w-md mx-auto">
        <Header />
        
        <div className="mt-6 space-y-4">
          <ProgressBar />
          
          <div className="glass-effect rounded-2xl p-4 shadow-xl">
            <LevelSelector />
          </div>
          
          <KanjiCanvas 
            kanji={currentKanji}
            isAnimating={isAnimating}
            onAnimationComplete={() => setIsAnimating(false)}
          />
          
          <ControlPanel 
            onAnimate={handleAnimationToggle}
            isAnimating={isAnimating}
          />
        </div>
        
        <div className="mt-6 text-center text-white text-sm">
          <p>점수: {score} | 레벨: {currentLevel}</p>
        </div>
      </div>
    </div>
  )
}

export default App