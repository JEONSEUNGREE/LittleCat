import { Receipt, RefreshCw } from 'lucide-react'
import { useBillStore } from '../store/billStore'

export default function Header() {
  const reset = useBillStore(state => state.reset)
  
  return (
    <header className="bg-primary text-white p-4 shadow-lg">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Receipt className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">Split Ease</h1>
            <p className="text-sm opacity-90">더치페이 간편 계산기</p>
          </div>
        </div>
        <button
          onClick={reset}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="hidden sm:inline">초기화</span>
        </button>
      </div>
    </header>
  )
}