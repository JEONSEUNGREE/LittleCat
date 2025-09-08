import { Star, ChevronRight, RotateCw } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

export default function LevelComplete() {
  const { currentLevel, movesCount, bestScores, nextLevel, resetLevel, levels } = useGameStore()
  const isLastLevel = currentLevel === levels.length
  const previousBest = bestScores[currentLevel]
  const isNewRecord = !previousBest || movesCount < previousBest

  const getStarRating = () => {
    const level = levels.find(l => l.id === currentLevel)
    if (!level) return 0
    
    const perfectScore = level.maxMirrors
    const ratio = movesCount / perfectScore
    
    if (ratio <= 1.5) return 3
    if (ratio <= 2) return 2
    return 1
  }

  const stars = getStarRating()

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-maze-light to-maze-dark rounded-2xl p-6 max-w-sm w-full border-2 border-target-gold shadow-2xl animate-success-burst">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-target-gold mb-2">
            Level Complete!
          </h2>
          
          <div className="flex justify-center gap-2 my-4">
            {[1, 2, 3].map((i) => (
              <Star
                key={i}
                className={`w-10 h-10 ${
                  i <= stars ? 'text-target-gold fill-target-gold' : 'text-gray-600'
                }`}
              />
            ))}
          </div>

          <div className="space-y-2 my-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Moves Used:</span>
              <span className="font-bold text-white">{movesCount}</span>
            </div>
            
            {previousBest && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Previous Best:</span>
                <span className="font-bold text-white">{previousBest}</span>
              </div>
            )}

            {isNewRecord && (
              <div className="text-center py-2">
                <span className="text-target-gold font-bold animate-pulse">
                  NEW RECORD!
                </span>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={resetLevel}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <RotateCw className="w-5 h-5" />
              <span>Retry</span>
            </button>
            
            {!isLastLevel && (
              <button
                onClick={nextLevel}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-laser-red to-laser-glow hover:scale-105 rounded-lg transition-transform font-bold"
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {isLastLevel && (
            <div className="mt-4 text-center">
              <p className="text-target-gold font-bold">
                Congratulations! You've completed all levels!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}