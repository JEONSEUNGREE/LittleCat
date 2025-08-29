import { BookOpen, Trophy, RefreshCw } from 'lucide-react'
import { useKanjiStore } from '../store/kanjiStore'

const Header = () => {
  const { score, resetProgress } = useKanjiStore()
  
  return (
    <header className="glass-effect rounded-2xl p-4 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-8 h-8 text-primary-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">한자 필순</h1>
            <p className="text-sm text-gray-600">Kanji Stroke Master</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-accent-100 px-3 py-1 rounded-full">
            <Trophy className="w-5 h-5 text-accent-600" />
            <span className="font-bold text-accent-700">{score}</span>
          </div>
          
          <button
            onClick={resetProgress}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
            aria-label="초기화"
          >
            <RefreshCw className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header