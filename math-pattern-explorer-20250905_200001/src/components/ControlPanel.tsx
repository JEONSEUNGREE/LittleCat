import { usePatternStore, PatternType } from '../store/patternStore'
import { 
  Activity, 
  Palette, 
  Gauge, 
  Play, 
  Pause,
  Sparkles,
  TreePine,
  Infinity,
  CircleDot,
  Grid3x3
} from 'lucide-react'

const patterns: { value: PatternType; label: string; icon: React.ReactNode }[] = [
  { value: 'fibonacci', label: '피보나치 나선', icon: <Sparkles className="w-4 h-4" /> },
  { value: 'fractal', label: '프랙탈 트리', icon: <TreePine className="w-4 h-4" /> },
  { value: 'golden-ratio', label: '황금비', icon: <Infinity className="w-4 h-4" /> },
  { value: 'spiral', label: '나선 패턴', icon: <CircleDot className="w-4 h-4" /> },
  { value: 'mandelbrot', label: '만델브로트', icon: <Grid3x3 className="w-4 h-4" /> }
]

const ControlPanel = () => {
  const { 
    currentPattern,
    animationSpeed, 
    complexity, 
    colorScheme,
    isAnimating,
    setPattern,
    setAnimationSpeed,
    setComplexity,
    setColorScheme,
    toggleAnimation
  } = usePatternStore()

  return (
    <div className="info-card space-y-6">
      <h2 className="text-xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        패턴 컨트롤
      </h2>

      {/* Pattern Selection */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300 flex items-center gap-2">
          <Activity className="w-4 h-4" />
          패턴 선택
        </label>
        <div className="grid grid-cols-1 gap-2">
          {patterns.map((pattern) => (
            <button
              key={pattern.value}
              onClick={() => setPattern(pattern.value)}
              className={`
                flex items-center justify-between p-3 rounded-lg transition-all duration-200
                ${currentPattern === pattern.value 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg transform scale-105' 
                  : 'bg-white/10 hover:bg-white/20'}
              `}
            >
              <span className="flex items-center gap-2">
                {pattern.icon}
                {pattern.label}
              </span>
              {currentPattern === pattern.value && (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Animation Control */}
      <div className="space-y-2">
        <button
          onClick={toggleAnimation}
          className="w-full pattern-button flex items-center justify-center gap-2"
        >
          {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isAnimating ? '일시정지' : '재생'}
        </button>
      </div>

      {/* Speed Control */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300 flex items-center gap-2">
          <Gauge className="w-4 h-4" />
          애니메이션 속도: {animationSpeed}
        </label>
        <input
          type="range"
          min="10"
          max="100"
          value={animationSpeed}
          onChange={(e) => setAnimationSpeed(Number(e.target.value))}
          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${animationSpeed}%, rgba(255,255,255,0.2) ${animationSpeed}%, rgba(255,255,255,0.2) 100%)`
          }}
        />
      </div>

      {/* Complexity Control */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300 flex items-center gap-2">
          <Grid3x3 className="w-4 h-4" />
          복잡도: {complexity}
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={complexity}
          onChange={(e) => setComplexity(Number(e.target.value))}
          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${complexity * 10}%, rgba(255,255,255,0.2) ${complexity * 10}%, rgba(255,255,255,0.2) 100%)`
          }}
        />
      </div>

      {/* Color Scheme */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300 flex items-center gap-2">
          <Palette className="w-4 h-4" />
          색상 테마
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setColorScheme('rainbow')}
            className={`p-2 rounded-lg text-xs ${colorScheme === 'rainbow' ? 'bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500' : 'bg-white/10'}`}
          >
            무지개
          </button>
          <button
            onClick={() => setColorScheme('gradient')}
            className={`p-2 rounded-lg text-xs ${colorScheme === 'gradient' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-white/10'}`}
          >
            그라데이션
          </button>
          <button
            onClick={() => setColorScheme('monochrome')}
            className={`p-2 rounded-lg text-xs ${colorScheme === 'monochrome' ? 'bg-gradient-to-r from-gray-600 to-gray-400' : 'bg-white/10'}`}
          >
            단색
          </button>
        </div>
      </div>
    </div>
  )
}

export default ControlPanel