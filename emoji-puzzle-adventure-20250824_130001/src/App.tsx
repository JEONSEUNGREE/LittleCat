import GameHeader from './components/GameHeader'
import { useGameStore } from './store/gameStore'

function App() {
  const { currentLevel, score, lives, puzzles, currentPuzzle, initGame } = useGameStore()
  
  // 게임 초기화
  if (!currentPuzzle && puzzles.length > 0) {
    initGame();
  }

  return (
    <div className="game-container min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <GameHeader 
        level={currentLevel} 
        score={score} 
        lives={lives} 
        totalLevels={puzzles.length}
      />
      
      <main className="flex-1 flex flex-col justify-center items-center p-4">
        {lives > 0 && currentPuzzle && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">{currentPuzzle.question}</h2>
            <div className="bg-white/20 rounded-xl p-6 mb-4">
              <div className="grid grid-cols-4 gap-2 mb-4">
                {currentPuzzle.emojis.map((emoji, index) => (
                  <button
                    key={index}
                    className="text-3xl p-3 bg-white/30 rounded-lg hover:bg-white/40"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        {lives === 0 && (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">게임 오버!</h2>
            <p className="text-white mb-4">점수: {score}</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App