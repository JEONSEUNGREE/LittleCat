import { X, Palette, Activity, Eye } from 'lucide-react';
import useAudioStore from '../store/audioStore';

interface ControlPanelProps {
  onClose: () => void;
}

const ControlPanel = ({ onClose }: ControlPanelProps) => {
  const { 
    visualizationType, 
    sensitivity, 
    colorScheme,
    setVisualizationType, 
    setSensitivity,
    setColorScheme 
  } = useAudioStore();

  const visualizationTypes = [
    { value: 'waveform', label: 'Waveform', icon: '〰️' },
    { value: 'bars', label: 'Frequency Bars', icon: '📊' },
    { value: 'circular', label: 'Circular', icon: '⭕' },
    { value: 'particles', label: 'Particles', icon: '✨' }
  ] as const;

  const colorSchemes = [
    { value: 'neon', label: 'Neon', colors: ['#00d4ff', '#9945ff', '#ff00ff'] },
    { value: 'sunset', label: 'Sunset', colors: ['#ff6b6b', '#feca57', '#ff9ff3'] },
    { value: 'ocean', label: 'Ocean', colors: ['#00d2d3', '#01a3a4', '#5f27cd'] },
    { value: 'forest', label: 'Forest', colors: ['#10ac84', '#006ba6', '#ee5a24'] }
  ] as const;

  return (
    <div className="glass-effect rounded-xl p-6 w-80 max-w-[90vw] shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Eye size={20} className="text-neon-blue" />
          Settings
        </h2>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="space-y-6">
        {/* Visualization Type */}
        <div>
          <label className="text-sm text-gray-400 mb-3 block flex items-center gap-2">
            <Activity size={16} />
            Visualization Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {visualizationTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setVisualizationType(type.value as any)}
                className={`
                  p-3 rounded-lg text-sm font-medium transition-all duration-300
                  ${visualizationType === type.value 
                    ? 'bg-neon-blue text-dark-bg' 
                    : 'glass-effect hover:bg-white/10'
                  }
                `}
              >
                <span className="mr-1">{type.icon}</span>
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sensitivity */}
        <div>
          <label className="text-sm text-gray-400 mb-3 block">
            Sensitivity: {sensitivity}%
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={sensitivity}
            onChange={(e) => setSensitivity(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #00d4ff 0%, #00d4ff ${sensitivity}%, #374151 ${sensitivity}%, #374151 100%)`
            }}
          />
        </div>

        {/* Color Scheme */}
        <div>
          <label className="text-sm text-gray-400 mb-3 block flex items-center gap-2">
            <Palette size={16} />
            Color Scheme
          </label>
          <div className="grid grid-cols-2 gap-2">
            {colorSchemes.map((scheme) => (
              <button
                key={scheme.value}
                onClick={() => setColorScheme(scheme.value as any)}
                className={`
                  p-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2
                  ${colorScheme === scheme.value 
                    ? 'ring-2 ring-neon-blue bg-white/10' 
                    : 'glass-effect hover:bg-white/10'
                  }
                `}
              >
                <div className="flex gap-1">
                  {scheme.colors.map((color, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                {scheme.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;