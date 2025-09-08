import { FlipHorizontal } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

export default function GameControls() {
  const { selectedMirrorType, toggleMirrorType, placedMirrors, currentLevel, levels } = useGameStore()
  const level = levels.find(l => l.id === currentLevel)
  
  if (!level) return null

  const remainingMirrors = level.maxMirrors - placedMirrors.length

  return (
    <div className="mt-6 w-full max-w-md">
      <div className="bg-maze-light/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Mirrors Left:</span>
            <div className="flex gap-1">
              {Array.from({ length: level.maxMirrors }).map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded flex items-center justify-center text-sm font-bold ${
                    i < remainingMirrors
                      ? 'bg-mirror-glass text-gray-700 border border-mirror-silver'
                      : 'bg-gray-700 text-gray-500 border border-gray-600'
                  }`}
                >
                  {i < remainingMirrors ? (i < placedMirrors.length ? '\\' : '/') : '×'}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={toggleMirrorType}
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-mirror-glass to-mirror-silver text-gray-800 rounded-lg font-bold hover:scale-105 transition-transform"
          >
            <span className="text-2xl">{selectedMirrorType}</span>
            <FlipHorizontal className="w-5 h-5" />
            <span className="text-2xl">{selectedMirrorType === '/' ? '\\' : '/'}</span>
          </button>
        </div>

        <div className="mt-3 text-center">
          <p className="text-xs text-gray-400">
            Tap button to switch mirror type
          </p>
        </div>
      </div>
    </div>
  )
}