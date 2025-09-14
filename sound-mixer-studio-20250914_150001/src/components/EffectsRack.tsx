import { useSoundStore } from '../store/useSoundStore'
import { Zap, Waves, Radio, Filter, Disc } from 'lucide-react'

const effectsConfig = [
  { 
    key: 'reverb' as const, 
    label: 'Reverb', 
    icon: Waves, 
    color: 'from-blue-500 to-cyan-500',
    description: 'Add space and depth'
  },
  { 
    key: 'delay' as const, 
    label: 'Delay', 
    icon: Radio, 
    color: 'from-purple-500 to-pink-500',
    description: 'Echo and repeat'
  },
  { 
    key: 'distortion' as const, 
    label: 'Distortion', 
    icon: Zap, 
    color: 'from-red-500 to-orange-500',
    description: 'Add crunch and grit'
  },
  { 
    key: 'lowPass' as const, 
    label: 'Low Pass', 
    icon: Filter, 
    color: 'from-green-500 to-teal-500',
    description: 'Filter high frequencies'
  },
  { 
    key: 'highPass' as const, 
    label: 'High Pass', 
    icon: Disc, 
    color: 'from-yellow-500 to-amber-500',
    description: 'Filter low frequencies'
  }
]

export function EffectsRack() {
  const { effects, updateEffect } = useSoundStore()

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold mb-2">Effects Rack</h2>
        <p className="text-gray-400 text-sm">Shape your sound with professional effects</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {effectsConfig.map((effect) => {
          const Icon = effect.icon
          const value = effects[effect.key]
          
          return (
            <div key={effect.key} className="glass-effect rounded-xl p-6">
              <div className={`mb-4 p-3 rounded-lg bg-gradient-to-r ${effect.color} inline-block`}>
                <Icon size={24} className="text-white" />
              </div>
              
              <h3 className="font-semibold text-lg mb-1">{effect.label}</h3>
              <p className="text-gray-400 text-sm mb-4">{effect.description}</p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Amount</span>
                  <span className="font-mono text-sm bg-gray-800 px-2 py-1 rounded">
                    {value}%
                  </span>
                </div>
                
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={value}
                  onChange={(e) => updateEffect(effect.key, Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, ${effect.color.split(' ')[1]} 0%, ${effect.color.split(' ')[1]} ${value}%, #374151 ${value}%, #374151 100%)`
                  }}
                />
                
                <div className="flex gap-2">
                  <button
                    onClick={() => updateEffect(effect.key, 0)}
                    className="flex-1 py-1 px-3 text-xs bg-gray-700/50 hover:bg-gray-600/50 rounded transition-colors"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => updateEffect(effect.key, 50)}
                    className="flex-1 py-1 px-3 text-xs bg-gray-700/50 hover:bg-gray-600/50 rounded transition-colors"
                  >
                    50%
                  </button>
                  <button
                    onClick={() => updateEffect(effect.key, 100)}
                    className="flex-1 py-1 px-3 text-xs bg-gray-700/50 hover:bg-gray-600/50 rounded transition-colors"
                  >
                    Max
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-8 text-center">
        <button className="px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg font-semibold hover:scale-105 transition-transform">
          Reset All Effects
        </button>
      </div>
    </div>
  )
}