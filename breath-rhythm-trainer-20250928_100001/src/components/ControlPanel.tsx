import { useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw, Volume2, VolumeX, Smartphone } from 'lucide-react'
import { useBreathStore } from '../store/breathStore'

const ControlPanel: React.FC = () => {
  const {
    isActive,
    pattern,
    cycleCount,
    soundEnabled,
    vibrationEnabled,
    currentPhase,
    startBreathing,
    stopBreathing,
    setPattern,
    resetCycles,
    toggleSound,
    toggleVibration,
    nextPhase,
    incrementCycle,
    customPattern
  } = useBreathStore()

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const getPatternTimings = () => {
    const patterns = {
      '4-4-4': { inhale: 4, hold: 4, exhale: 4, pause: 2 },
      '4-7-8': { inhale: 4, hold: 7, exhale: 8, pause: 2 },
      '5-5-5': { inhale: 5, hold: 5, exhale: 5, pause: 2 },
      'custom': { ...customPattern, pause: 2 }
    }
    return patterns[pattern]
  }

  useEffect(() => {
    if (isActive) {
      const timings = getPatternTimings()
      const phaseDuration = timings[currentPhase] * 1000

      timerRef.current = setTimeout(() => {
        if (currentPhase === 'pause') {
          incrementCycle()
        }
        nextPhase()
      }, phaseDuration)

      // Vibration effect
      if (vibrationEnabled && 'vibrate' in navigator) {
        if (currentPhase === 'inhale' || currentPhase === 'exhale') {
          navigator.vibrate(200)
        }
      }

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current)
        }
      }
    }
  }, [isActive, currentPhase, pattern, vibrationEnabled])

  const handleStartStop = () => {
    if (isActive) {
      stopBreathing()
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    } else {
      startBreathing()
    }
  }

  const handleReset = () => {
    stopBreathing()
    resetCycles()
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-lg p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Pattern selector */}
        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {(['4-4-4', '4-7-8', '5-5-5'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPattern(p)}
              className={`px-4 py-2 rounded-full transition-all ${
                pattern === p
                  ? 'bg-white text-purple-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {p} 패턴
            </button>
          ))}
        </div>

        {/* Main controls */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={handleStartStop}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all hover:scale-110"
          >
            {isActive ? (
              <Pause className="w-8 h-8 md:w-10 md:h-10 text-white" />
            ) : (
              <Play className="w-8 h-8 md:w-10 md:h-10 text-white" />
            )}
          </button>

          <button
            onClick={handleReset}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all hover:scale-110"
          >
            <RotateCcw className="w-6 h-6 md:w-7 md:h-7 text-white" />
          </button>
        </div>

        {/* Stats and settings */}
        <div className="flex items-center justify-between">
          <div className="text-white">
            <p className="text-sm md:text-base">사이클: {cycleCount}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={toggleSound}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
            >
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-white" />
              ) : (
                <VolumeX className="w-5 h-5 text-white" />
              )}
            </button>

            <button
              onClick={toggleVibration}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                vibrationEnabled
                  ? 'bg-white/30'
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              <Smartphone className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}