import { Play, Pause, SkipForward, CheckCircle, RotateCcw } from 'lucide-react'
import { useKanjiStore } from '../store/kanjiStore'

interface ControlPanelProps {
  onAnimate: () => void
  isAnimating: boolean
}

const ControlPanel = ({ onAnimate, isAnimating }: ControlPanelProps) => {
  const { 
    currentKanji, 
    kanjiList, 
    currentLevel, 
    selectKanji, 
    markAsCompleted,
    completedKanji,
    clearUserStrokes 
  } = useKanjiStore()
  
  const handleNextKanji = () => {
    const levelKanji = kanjiList.filter(k => k.level === currentLevel)
    const currentIndex = levelKanji.findIndex(k => k.id === currentKanji?.id)
    if (currentIndex < levelKanji.length - 1) {
      selectKanji(levelKanji[currentIndex + 1])
    } else if (levelKanji.length > 0) {
      selectKanji(levelKanji[0])
    }
  }
  
  const handleComplete = () => {
    if (currentKanji && !completedKanji.includes(currentKanji.id)) {
      markAsCompleted(currentKanji.id)
      setTimeout(handleNextKanji, 500)
    }
  }
  
  const handleReset = () => {
    clearUserStrokes()
  }
  
  return (
    <div className="glass-effect rounded-2xl p-4 shadow-xl">
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onAnimate}
          className="btn-primary flex items-center justify-center space-x-2"
          disabled={!currentKanji}
        >
          {isAnimating ? (
            <>
              <Pause className="w-5 h-5" />
              <span>일시정지</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              <span>애니메이션</span>
            </>
          )}
        </button>
        
        <button
          onClick={handleReset}
          className="btn-secondary flex items-center justify-center space-x-2"
          disabled={!currentKanji}
        >
          <RotateCcw className="w-5 h-5" />
          <span>다시 쓰기</span>
        </button>
        
        <button
          onClick={handleComplete}
          className="btn-primary bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center space-x-2"
          disabled={!currentKanji || completedKanji.includes(currentKanji?.id || '')}
        >
          <CheckCircle className="w-5 h-5" />
          <span>완료</span>
        </button>
        
        <button
          onClick={handleNextKanji}
          className="btn-secondary flex items-center justify-center space-x-2"
          disabled={!currentKanji}
        >
          <SkipForward className="w-5 h-5" />
          <span>다음</span>
        </button>
      </div>
      
      <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">학습 팁:</span>
          <span className="text-purple-700 font-medium">획순에 따라 천천히 따라 쓰세요</span>
        </div>
      </div>
    </div>
  )
}

export default ControlPanel