import { useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { 
  Play, 
  RotateCcw, 
  ChevronRight,
  Zap,
  Move,
  Wind,
  Trophy,
  Target
} from 'lucide-react'

const ControlPanel: React.FC = () => {
  const {
    gravity,
    elasticity,
    friction,
    level,
    score,
    isWin,
    launches,
    maxLaunches,
    setGravity,
    setElasticity,
    setFriction,
    launchBall,
    resetLevel,
    nextLevel,
    isPlaying,
  } = useGameStore()

  const [angle, setAngle] = useState(45)
  const [power, setPower] = useState(50)

  const handleLaunch = () => {
    if (!isPlaying && launches < maxLaunches && !isWin) {
      launchBall(angle, power)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-4xl mx-auto p-4">
        {/* Status Bar */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Trophy className="text-yellow-500" size={20} />
              <span className="font-bold">Level {level}</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="text-blue-500" size={20} />
              <span>Score: {score}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="text-purple-500" size={20} />
              <span>Launches: {launches}/{maxLaunches}</span>
            </div>
          </div>
          
          {isWin && (
            <button
              onClick={nextLevel}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Next Level <ChevronRight size={20} />
            </button>
          )}
        </div>

        {/* Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Launch Controls */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-20 text-sm font-medium">Angle</span>
              <input
                type="range"
                min="-90"
                max="90"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="flex-1"
                disabled={isPlaying}
              />
              <span className="w-12 text-sm text-right">{angle}°</span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="w-20 text-sm font-medium">Power</span>
              <input
                type="range"
                min="10"
                max="100"
                value={power}
                onChange={(e) => setPower(Number(e.target.value))}
                className="flex-1"
                disabled={isPlaying}
              />
              <span className="w-12 text-sm text-right">{power}%</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleLaunch}
                disabled={isPlaying || launches >= maxLaunches || isWin}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <Play size={20} />
                Launch
              </button>
              
              <button
                onClick={resetLevel}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <RotateCcw size={20} />
                Reset
              </button>
            </div>
          </div>

          {/* Physics Controls */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Move size={16} className="text-physics-blue" />
              <span className="w-16 text-sm font-medium">Gravity</span>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={gravity}
                onChange={(e) => setGravity(Number(e.target.value))}
                className="flex-1"
                disabled={isPlaying}
              />
              <span className="w-12 text-sm text-right">{gravity.toFixed(1)}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Zap size={16} className="text-physics-purple" />
              <span className="w-16 text-sm font-medium">Bounce</span>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={elasticity}
                onChange={(e) => setElasticity(Number(e.target.value))}
                className="flex-1"
                disabled={isPlaying}
              />
              <span className="w-12 text-sm text-right">{elasticity.toFixed(1)}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Wind size={16} className="text-physics-green" />
              <span className="w-16 text-sm font-medium">Friction</span>
              <input
                type="range"
                min="0.8"
                max="1"
                step="0.01"
                value={friction}
                onChange={(e) => setFriction(Number(e.target.value))}
                className="flex-1"
                disabled={isPlaying}
              />
              <span className="w-12 text-sm text-right">{friction.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Win Message */}
        {isWin && (
          <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg text-center">
            <p className="text-green-800 font-bold">Level Complete! Score: +{100 * (maxLaunches - launches + 1)}</p>
          </div>
        )}
        
        {/* Game Over Message */}
        {!isWin && launches >= maxLaunches && !isPlaying && (
          <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg text-center">
            <p className="text-red-800 font-bold">No more launches! Try adjusting the physics parameters.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ControlPanel