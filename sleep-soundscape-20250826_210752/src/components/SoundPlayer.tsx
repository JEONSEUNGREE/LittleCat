import React, { useEffect, useState } from 'react'
import { Play, Pause, Moon, Sun, CloudRain, Volume2 } from 'lucide-react'
import { useSoundStore, SleepPhase } from '../store/soundStore'

const phaseIcons: Record<SleepPhase, React.ReactNode> = {
  'preparing': <Sun className="w-5 h-5" />,
  'falling-asleep': <CloudRain className="w-5 h-5" />,
  'deep-sleep': <Moon className="w-5 h-5" />,
  'wake-up': <Sun className="w-5 h-5" />
}

const phaseLabels: Record<SleepPhase, string> = {
  'preparing': '준비 단계',
  'falling-asleep': '입면 단계',
  'deep-sleep': '깊은 수면',
  'wake-up': '기상 단계'
}

export const SoundPlayer: React.FC = () => {
  const { isPlaying, currentPhase, masterVolume, togglePlay, setPhase, setMasterVolume } = useSoundStore()
  const [animationClass, setAnimationClass] = useState('')

  useEffect(() => {
    if (isPlaying) {
      setAnimationClass('animate-pulse-slow')
    } else {
      setAnimationClass('')
    }
  }, [isPlaying])

  const handlePhaseChange = (phase: SleepPhase) => {
    setPhase(phase)
  }

  return (
    <div className="bg-night-700/50 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
      <div className="flex flex-col items-center space-y-6">
        {/* Main Player Button */}
        <div className={`relative ${animationClass}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-50"></div>
          <button
            onClick={togglePlay}
            className="relative w-32 h-32 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
          >
            {isPlaying ? (
              <Pause className="w-12 h-12 text-white" />
            ) : (
              <Play className="w-12 h-12 text-white ml-2" />
            )}
          </button>
        </div>

        {/* Phase Selector */}
        <div className="w-full">
          <h3 className="text-sm font-medium text-night-200 mb-3 text-center">수면 단계</h3>
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(phaseIcons) as SleepPhase[]).map((phase) => (
              <button
                key={phase}
                onClick={() => handlePhaseChange(phase)}
                className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  currentPhase === phase
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'bg-night-600/50 text-night-300 hover:bg-night-600'
                }`}
              >
                {phaseIcons[phase]}
                <span className="text-sm">{phaseLabels[phase]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Master Volume */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-2">
            <Volume2 className="w-5 h-5 text-night-300" />
            <span className="text-sm text-night-300">{masterVolume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={masterVolume}
            onChange={(e) => setMasterVolume(Number(e.target.value))}
            className="w-full h-2 bg-night-600 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #7c3aed 0%, #7c3aed ${masterVolume}%, #362568 ${masterVolume}%, #362568 100%)`
            }}
          />
        </div>

        {/* Status */}
        <div className="text-center">
          <p className="text-night-200 text-sm">
            {isPlaying ? '사운드스케이프 재생 중...' : '재생 버튼을 눌러 시작하세요'}
          </p>
        </div>
      </div>
    </div>
  )
}