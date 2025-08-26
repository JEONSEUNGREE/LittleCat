import React from 'react'
import { CloudRain, Trees, Wind, Zap, Music, Sparkles, X, Plus, Volume2 } from 'lucide-react'
import { useSoundStore, SoundType } from '../store/soundStore'

const soundIcons: Record<SoundType, React.ReactNode> = {
  'rain': <CloudRain className="w-5 h-5" />,
  'ocean': <Wind className="w-5 h-5" />,
  'forest': <Trees className="w-5 h-5" />,
  'white-noise': <Zap className="w-5 h-5" />,
  'meditation': <Music className="w-5 h-5" />,
  'space': <Sparkles className="w-5 h-5" />
}

const soundLabels: Record<SoundType, string> = {
  'rain': '빗소리',
  'ocean': '파도소리',
  'forest': '숲소리',
  'white-noise': '백색소음',
  'meditation': '명상음악',
  'space': '우주소리'
}

export const SoundMixer: React.FC = () => {
  const { soundLayers, toggleLayer, setLayerVolume, removeLayer, addLayer } = useSoundStore()
  const [showAddMenu, setShowAddMenu] = React.useState(false)

  const availableSounds = (Object.keys(soundIcons) as SoundType[]).filter(
    type => !soundLayers.some(layer => layer.type === type)
  )

  return (
    <div className="bg-night-700/50 backdrop-blur-lg rounded-3xl p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">사운드 믹서</h2>
        <button
          onClick={() => setShowAddMenu(!showAddMenu)}
          className="p-2 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5 text-purple-400" />
        </button>
      </div>

      {/* Add Sound Menu */}
      {showAddMenu && availableSounds.length > 0 && (
        <div className="mb-4 p-3 bg-night-800/50 rounded-lg animate-fade-in">
          <p className="text-sm text-night-300 mb-2">사운드 추가:</p>
          <div className="flex flex-wrap gap-2">
            {availableSounds.map(type => (
              <button
                key={type}
                onClick={() => {
                  addLayer(type)
                  setShowAddMenu(false)
                }}
                className="flex items-center space-x-1 px-3 py-1 bg-night-600 hover:bg-night-500 rounded-lg text-sm transition-colors"
              >
                {soundIcons[type]}
                <span>{soundLabels[type]}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        {soundLayers.map((layer) => (
          <div
            key={layer.id}
            className={`p-4 rounded-xl transition-all ${
              layer.isActive ? 'bg-night-600/50' : 'bg-night-800/30'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => toggleLayer(layer.id)}
                className={`flex items-center space-x-2 transition-colors ${
                  layer.isActive ? 'text-purple-400' : 'text-night-400'
                }`}
              >
                {soundIcons[layer.type]}
                <span className="font-medium">{soundLabels[layer.type]}</span>
              </button>
              <button
                onClick={() => removeLayer(layer.id)}
                className="p-1 text-night-400 hover:text-red-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {layer.isActive && (
              <div className="flex items-center space-x-3 animate-fade-in">
                <Volume2 className="w-4 h-4 text-night-400" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={layer.volume}
                  onChange={(e) => setLayerVolume(layer.id, Number(e.target.value))}
                  className="flex-1 h-1.5 bg-night-700 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${layer.volume}%, #271B4B ${layer.volume}%, #271B4B 100%)`
                  }}
                />
                <span className="text-xs text-night-400 w-10 text-right">{layer.volume}%</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {soundLayers.length === 0 && (
        <div className="text-center py-8 text-night-400">
          <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">사운드를 추가하여 시작하세요</p>
        </div>
      )}
    </div>
  )
}