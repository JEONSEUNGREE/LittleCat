import { useStageStore, LightType, EffectType } from '../store/useStageStore'
import { 
  Lightbulb, 
  Sparkles, 
  Move, 
  Play, 
  Pause, 
  Save,
  FolderOpen,
  Palette,
  Sun,
  CloudRain,
  Zap,
  FlameKindling,
  Cloud,
  PartyPopper,
  Flame,
  Zap as Laser
} from 'lucide-react'
import { useState } from 'react'

export function ToolPanel() {
  const [sceneName, setSceneName] = useState('')
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  
  const {
    selectedTool,
    selectedLightType,
    selectedEffectType,
    isPlaying,
    savedScenes,
    currentScene,
    setSelectedTool,
    setSelectedLightType,
    setSelectedEffectType,
    setPlaying,
    saveScene,
    loadScene,
    updateBackgroundColor
  } = useStageStore()
  
  const lightTypes: { type: LightType; icon: JSX.Element; label: string }[] = [
    { type: 'spot', icon: <Sun size={20} />, label: 'Spotlight' },
    { type: 'wash', icon: <CloudRain size={20} />, label: 'Wash Light' },
    { type: 'beam', icon: <Zap size={20} />, label: 'Beam' },
    { type: 'strobe', icon: <FlameKindling size={20} />, label: 'Strobe' }
  ]
  
  const effectTypes: { type: EffectType; icon: JSX.Element; label: string }[] = [
    { type: 'smoke', icon: <Cloud size={20} />, label: 'Smoke' },
    { type: 'confetti', icon: <PartyPopper size={20} />, label: 'Confetti' },
    { type: 'pyro', icon: <Flame size={20} />, label: 'Pyro' },
    { type: 'laser', icon: <Laser size={20} />, label: 'Laser' }
  ]
  
  const handleSaveScene = () => {
    if (sceneName.trim()) {
      saveScene(sceneName)
      setSceneName('')
      setShowSaveDialog(false)
    }
  }
  
  return (
    <div className="w-full lg:w-80 bg-gray-900 border-t lg:border-t-0 lg:border-l border-gray-700 p-4 flex flex-col gap-4 overflow-y-auto">
      {/* Playback Controls */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Playback</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setPlaying(!isPlaying)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isPlaying 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            {isPlaying ? 'Stop' : 'Play'}
          </button>
        </div>
      </div>
      
      {/* Tool Selection */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Tools</h3>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setSelectedTool('light')}
            className={`p-3 rounded-lg transition-colors flex flex-col items-center gap-1 ${
              selectedTool === 'light' 
                ? 'bg-yellow-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Lightbulb size={24} />
            <span className="text-xs">Light</span>
          </button>
          <button
            onClick={() => setSelectedTool('effect')}
            className={`p-3 rounded-lg transition-colors flex flex-col items-center gap-1 ${
              selectedTool === 'effect' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Sparkles size={24} />
            <span className="text-xs">Effect</span>
          </button>
          <button
            onClick={() => setSelectedTool('move')}
            className={`p-3 rounded-lg transition-colors flex flex-col items-center gap-1 ${
              selectedTool === 'move' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Move size={24} />
            <span className="text-xs">Move</span>
          </button>
        </div>
      </div>
      
      {/* Light Type Selection */}
      {selectedTool === 'light' && (
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Light Type</h3>
          <div className="grid grid-cols-2 gap-2">
            {lightTypes.map(({ type, icon, label }) => (
              <button
                key={type}
                onClick={() => setSelectedLightType(type)}
                className={`p-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${
                  selectedLightType === type
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {icon}
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Effect Type Selection */}
      {selectedTool === 'effect' && (
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Effect Type</h3>
          <div className="grid grid-cols-2 gap-2">
            {effectTypes.map(({ type, icon, label }) => (
              <button
                key={type}
                onClick={() => setSelectedEffectType(type)}
                className={`p-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${
                  selectedEffectType === type
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {icon}
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Stage Settings */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Stage</h3>
        <div className="flex items-center gap-2">
          <Palette size={20} className="text-gray-400" />
          <label htmlFor="bgColor" className="text-sm text-gray-300">Background:</label>
          <input
            id="bgColor"
            type="color"
            value={currentScene.backgroundColor}
            onChange={(e) => updateBackgroundColor(e.target.value)}
            className="flex-1 h-8 rounded cursor-pointer"
          />
        </div>
      </div>
      
      {/* Scene Management */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Scenes</h3>
        
        {!showSaveDialog ? (
          <button
            onClick={() => setShowSaveDialog(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Save size={20} />
            Save Scene
          </button>
        ) : (
          <div className="space-y-2">
            <input
              type="text"
              value={sceneName}
              onChange={(e) => setSceneName(e.target.value)}
              placeholder="Scene name..."
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveScene}
                className="flex-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowSaveDialog(false)
                  setSceneName('')
                }}
                className="flex-1 px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        
        {savedScenes.length > 0 && (
          <div className="mt-3 space-y-1">
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Saved Scenes</div>
            {savedScenes.map(scene => (
              <button
                key={scene.id}
                onClick={() => loadScene(scene.id)}
                className="w-full flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors text-sm text-left"
              >
                <FolderOpen size={16} />
                {scene.name}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Current Scene Info */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-2 text-sm uppercase tracking-wider">Current Scene</h3>
        <div className="space-y-1 text-sm">
          <div className="text-gray-400">
            Lights: <span className="text-white font-medium">{currentScene.lights.length}</span>
          </div>
          <div className="text-gray-400">
            Effects: <span className="text-white font-medium">{currentScene.effects.length}</span>
          </div>
        </div>
      </div>
    </div>
  )
}