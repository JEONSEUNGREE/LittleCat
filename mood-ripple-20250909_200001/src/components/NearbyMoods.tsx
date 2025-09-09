import { MapPin } from 'lucide-react'

interface NearbyMood {
  id: string
  emoji: string
  label: string
  color: string
  distance: number
  username: string
}

interface NearbyMoodsProps {
  moods: NearbyMood[]
}

export default function NearbyMoods({ moods }: NearbyMoodsProps) {
  if (moods.length === 0) return null
  
  return (
    <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-3xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5" />
        주변의 감정 파동
      </h3>
      
      <div className="space-y-3">
        {moods.slice(0, 5).map((mood) => (
          <div 
            key={mood.id}
            className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: `${mood.color}40`,
                  border: `2px solid ${mood.color}`
                }}
              >
                <span className="text-xl">{mood.emoji}</span>
              </div>
              <div>
                <p className="text-white font-medium text-sm">{mood.username}</p>
                <p className="text-white/60 text-xs">{mood.label}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-white/80 text-xs">
                {Math.round(mood.distance)}m
              </p>
              <div className="flex gap-1 mt-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-3 rounded-full"
                    style={{
                      backgroundColor: mood.color,
                      opacity: mood.distance < 30 ? 1 : mood.distance < 60 ? 0.6 : 0.3
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-center text-white/40 text-xs mt-4">
        비슷한 감정의 사람들과 익명으로 연결될 수 있어요
      </p>
    </div>
  )
}