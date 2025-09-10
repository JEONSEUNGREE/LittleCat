import { Brain, TrendingUp } from 'lucide-react'

export default function Header() {
  return (
    <header className="glass-effect sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Decision Matrix Pro</h1>
              <p className="text-xs text-white/80">Smart decision making</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <p className="text-xs text-white/80">Confidence</p>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-green-300" />
                <span className="text-sm font-semibold text-white">High</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}