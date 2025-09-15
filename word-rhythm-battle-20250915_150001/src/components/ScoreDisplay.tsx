import React from 'react'
import { Zap, Flame } from 'lucide-react'

interface ScoreDisplayProps {
  score: number
  combo: number
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, combo }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl font-bold mb-1">
        {score.toLocaleString()}
      </div>
      {combo > 0 && (
        <div className="flex items-center gap-1 text-yellow-400">
          {combo > 10 ? <Flame className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
          <span className="text-sm font-semibold">{combo}x Combo</span>
        </div>
      )}
    </div>
  )
}