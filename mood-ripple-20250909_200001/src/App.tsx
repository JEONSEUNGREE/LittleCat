import { useState, useEffect } from 'react'
import MoodSelector from './components/MoodSelector'
import MoodRippleDisplay from './components/MoodRippleDisplay'
import NearbyMoods from './components/NearbyMoods'
import useMoodStore from './store/useMoodStore'
import './App.css'

function App() {
  const { currentMood, nearbyMoods, setCurrentMood, generateNearbyMoods } = useMoodStore()
  const [showSelector, setShowSelector] = useState(true)

  useEffect(() => {
    generateNearbyMoods()
    const interval = setInterval(() => {
      generateNearbyMoods()
    }, 5000)
    return () => clearInterval(interval)
  }, [generateNearbyMoods])

  const handleMoodSelect = (mood: typeof currentMood) => {
    setCurrentMood(mood)
    setShowSelector(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20"></div>
      
      <div className="relative z-10 w-full max-w-md">
        <h1 className="text-4xl font-bold text-white text-center mb-8 animate-float">
          Mood Ripple
        </h1>
        
        {showSelector ? (
          <MoodSelector onSelectMood={handleMoodSelect} />
        ) : (
          <>
            <MoodRippleDisplay mood={currentMood} />
            <button
              onClick={() => setShowSelector(true)}
              className="mt-6 w-full py-3 px-6 bg-white/20 backdrop-blur-md rounded-full text-white font-medium hover:bg-white/30 transition-all duration-300"
            >
              감정 변경하기
            </button>
          </>
        )}
        
        <NearbyMoods moods={nearbyMoods} />
      </div>
    </div>
  )
}