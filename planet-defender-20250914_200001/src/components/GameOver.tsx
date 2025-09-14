import { Trophy, Radio, RotateCcw, Home } from 'lucide-react'

interface GameOverProps {
  score: number
  wave: number
  onRestart: () => void
}

export default function GameOver({ score, wave, onRestart }: GameOverProps) {
  const getRank = (score: number) => {
    if (score >= 10000) return { rank: 'S', color: 'text-yellow-400' }
    if (score >= 7500) return { rank: 'A', color: 'text-purple-400' }
    if (score >= 5000) return { rank: 'B', color: 'text-blue-400' }
    if (score >= 2500) return { rank: 'C', color: 'text-green-400' }
    return { rank: 'D', color: 'text-gray-400' }
  }

  const { rank, color } = getRank(score)

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50">
      <div className="bg-gradient-to-b from-space-dark to-space-blue rounded-2xl p-8 max-w-sm w-full border-2 border-laser-blue/50 neon-glow">
        <div className="text-center">
          <h2 className="text-3xl font-black text-planet-red mb-2 game-text-shadow">
            GAME OVER
          </h2>
          
          <div className={`text-6xl font-black ${color} my-6 animate-pulse-slow`}>
            {rank}
          </div>

          <div className="space-y-3 mb-6">
            <div className="bg-white/10 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-laser-yellow" />
                <span className="text-white/80">최종 점수</span>
              </div>
              <span className="text-white font-bold text-xl">
                {score.toLocaleString()}
              </span>
            </div>

            <div className="bg-white/10 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-laser-blue" />
                <span className="text-white/80">도달 웨이브</span>
              </div>
              <span className="text-white font-bold text-xl">
                {wave}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={onRestart}
              className="w-full py-3 bg-gradient-to-r from-planet-green to-emerald-600 text-white font-bold rounded-lg flex items-center justify-center gap-2 transform transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <RotateCcw className="w-5 h-5" />
              다시 도전
            </button>

            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-white/10 text-white font-bold rounded-lg flex items-center justify-center gap-2 transform transition-all duration-200 hover:bg-white/20 active:scale-95"
            >
              <Home className="w-5 h-5" />
              메인으로
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}