import { useKanjiStore } from '../store/kanjiStore'
import { CheckCircle, Circle } from 'lucide-react'

const ProgressBar = () => {
  const { kanjiList, currentLevel, completedKanji, currentKanji, selectKanji } = useKanjiStore()
  
  const levelKanji = kanjiList.filter(k => k.level === currentLevel)
  const completionPercentage = levelKanji.length > 0 
    ? (completedKanji.filter(id => levelKanji.some(k => k.id === id)).length / levelKanji.length) * 100 
    : 0
  
  return (
    <div className="glass-effect rounded-2xl p-4 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">레벨 진행도</h3>
        <span className="text-sm font-bold text-primary-600">
          {Math.round(completionPercentage)}%
        </span>
      </div>
      
      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div
          className="absolute h-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all duration-500 ease-out"
          style={{ width: `${completionPercentage}%` }}
        />
        <div className="absolute inset-0 bg-white opacity-20 animate-pulse" />
      </div>
      
      <div className="flex flex-wrap gap-2">
        {levelKanji.map((kanji) => {
          const isCompleted = completedKanji.includes(kanji.id)
          const isCurrent = currentKanji?.id === kanji.id
          
          return (
            <button
              key={kanji.id}
              onClick={() => selectKanji(kanji)}
              className={`
                relative flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200
                ${isCurrent ? 'bg-primary-500 text-white ring-4 ring-primary-300 scale-110' : 
                  isCompleted ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}
                hover:scale-105 hover:shadow-md
              `}
            >
              <span className="font-bold text-lg">{kanji.character}</span>
              {isCompleted && (
                <CheckCircle className="absolute -top-1 -right-1 w-4 h-4 text-green-500 bg-white rounded-full" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ProgressBar