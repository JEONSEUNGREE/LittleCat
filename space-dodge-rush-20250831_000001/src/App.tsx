import { useEffect } from 'react'
import StarField from './components/StarField'
import Spaceship from './components/Spaceship'
import ObstacleField from './components/ObstacleField'
import GameUI from './components/GameUI'
import useGameStore from './store/gameStore'

function App() {
  const { score, level, nextLevel } = useGameStore()
  
  // Level progression
  useEffect(() => {
    const pointsForNextLevel = level * 100
    if (score >= pointsForNextLevel && score > 0) {
      nextLevel()
    }
  }, [score, level, nextLevel])
  
  return (
    <div className="game-container">
      <StarField />
      <ObstacleField />
      <Spaceship />
      <GameUI />
    </div>
  )
}

export default App