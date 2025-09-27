import React, { useState } from 'react'
import { Sliders, Volume2, VolumeX, Sparkles } from 'lucide-react'
import { useTimerStore } from '../store/timerStore'

export const FlowControls: React.FC = () => {
  const { flowIntensity, adjustAdaptiveDuration } = useTimerStore()
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [autoAdjust, setAutoAdjust] = useState(true)

  const handleIntensityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value)
    adjustAdaptiveDuration(value)
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4 animate-fade-in">
      <h3 className="text-lg font-semibold flex items-center space-x-2">
        <Sliders className="w-5 h-5" />
        <span>Flow Controls</span>
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm opacity-80 block mb-2">
            Flow Intensity Adjustment
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={flowIntensity}
            onChange={handleIntensityChange}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
          <div className="flex justify-between text-xs opacity-60 mt-1">
            <span>Relaxed</span>
            <span>Balanced</span>
            <span>Intense</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`
              flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300
              ${soundEnabled ? 'bg-white/20' : 'bg-white/10 opacity-60'}
              hover:bg-white/30
            `}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="text-sm">Ambient Sound</span>
          </button>

          <button
            onClick={() => setAutoAdjust(!autoAdjust)}
            className={`
              flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300
              ${autoAdjust ? 'bg-white/20' : 'bg-white/10 opacity-60'}
              hover:bg-white/30
            `}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Auto Adjust</span>
          </button>
        </div>
      </div>
    </div>
  )
}