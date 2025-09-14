import { Heart, Trophy, Radio } from 'lucide-react'

interface GameHUDProps {
  score: number
  lives: number
  wave: number
}

export default function GameHUD({ score, lives, wave }: GameHUDProps) {
  return (
    <div className="absolute top-0 left-0 right-0 p-4 z-20">
      <div className="flex justify-between items-start">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-laser-blue/30">
          <div className="flex items-center gap-2 text-white">
            <Trophy className="w-5 h-5 text-laser-yellow" />
            <span className="font-bold">{score.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-laser-blue/30">
          <div className="flex items-center gap-2 text-white">
            <Radio className="w-5 h-5 text-laser-blue animate-pulse" />
            <span className="font-bold">Wave {wave}</span>
          </div>
        </div>

        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-laser-blue/30">
          <div className="flex items-center gap-1">
            {[...Array(3)].map((_, i) => (
              <Heart
                key={i}
                className={`w-5 h-5 ${
                  i < lives
                    ? 'text-planet-red fill-planet-red'
                    : 'text-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}