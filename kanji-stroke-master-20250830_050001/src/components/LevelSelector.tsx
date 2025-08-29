import { useKanjiStore } from '../store/kanjiStore'
import { Star, Lock } from 'lucide-react'

const LevelSelector = () => {
  const { currentLevel, setLevel, completedKanji, kanjiList } = useKanjiStore()
  
  const levels = [
    { level: 1, name: '기초', color: 'bg-green-500', unlocked: true },
    { level: 2, name: '초급', color: 'bg-blue-500', unlocked: completedKanji.length >= 3 },
    { level: 3, name: '중급', color: 'bg-purple-500', unlocked: completedKanji.length >= 6 },
  ]
  
  const getLevelProgress = (level: number) => {
    const levelKanji = kanjiList.filter(k => k.level === level)
    const completed = levelKanji.filter(k => completedKanji.includes(k.id))
    return {
      completed: completed.length,
      total: levelKanji.length,
      percentage: levelKanji.length > 0 ? (completed.length / levelKanji.length) * 100 : 0
    }
  }
  
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold text-gray-800 mb-2">레벨 선택</h2>
      
      <div className="grid grid-cols-3 gap-3">
        {levels.map(({ level, name, color, unlocked }) => {
          const progress = getLevelProgress(level)
          const isActive = currentLevel === level
          
          return (
            <button
              key={level}
              onClick={() => unlocked && setLevel(level)}
              disabled={!unlocked}
              className={`
                relative p-4 rounded-xl transition-all duration-200
                ${isActive ? 'ring-4 ring-primary-400 shadow-lg scale-105' : ''}
                ${unlocked ? 'hover:scale-105 hover:shadow-md cursor-pointer' : 'opacity-50 cursor-not-allowed'}
                ${isActive ? color : 'bg-gray-100'}
              `}
            >
              <div className="flex flex-col items-center space-y-2">
                {unlocked ? (
                  <>
                    <div className="flex">
                      {[...Array(3)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(progress.percentage / 34)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className={`font-bold text-sm ${isActive ? 'text-white' : 'text-gray-700'}`}>
                      {name}
                    </span>
                    <span className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                      {progress.completed}/{progress.total}
                    </span>
                  </>
                ) : (
                  <>
                    <Lock className="w-6 h-6 text-gray-400" />
                    <span className="font-bold text-sm text-gray-500">{name}</span>
                    <span className="text-xs text-gray-400">잠김</span>
                  </>
                )}
              </div>
              
              {unlocked && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-xl overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>
              )}
            </button>
          )
        })}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          💡 한자를 완성하여 다음 레벨을 잠금 해제하세요!
        </p>
      </div>
    </div>
  )
}

export default LevelSelector