import { Sliders } from 'lucide-react'
import { useColorStore, HarmonyType } from '../store/colorStore'

const harmonyTypes: { type: HarmonyType; name: string; description: string }[] = [
  { type: 'complementary', name: '보색', description: '반대 색상의 대비' },
  { type: 'analogous', name: '유사색', description: '인접한 색상의 조화' },
  { type: 'triadic', name: '삼원색', description: '120도 간격 색상' },
  { type: 'tetradic', name: '사각색', description: '90도 간격 색상' },
  { type: 'monochromatic', name: '단색', description: '같은 색의 명도 변화' },
]

export function HarmonySelector() {
  const { harmonyType, setHarmonyType } = useColorStore()

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <Sliders className="w-5 h-5 text-indigo-500" />
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">색상 조화 유형</h2>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {harmonyTypes.map(({ type, name, description }) => (
          <button
            key={type}
            onClick={() => setHarmonyType(type)}
            className={`p-3 rounded-lg border-2 transition-all ${
              harmonyType === type
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                : 'border-gray-300 dark:border-gray-600 hover:border-indigo-300'
            }`}
          >
            <div className="text-sm font-medium text-gray-800 dark:text-white">{name}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}