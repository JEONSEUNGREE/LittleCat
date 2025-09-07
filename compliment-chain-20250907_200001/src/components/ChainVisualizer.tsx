import { Link2, TrendingUp, Users, Zap } from 'lucide-react'
import { useComplimentStore } from '../store/complimentStore'

export default function ChainVisualizer() {
  const { compliments } = useComplimentStore()

  // Sort compliments by chain count
  const topChains = [...compliments]
    .sort((a, b) => b.chainCount - a.chainCount)
    .slice(0, 5)

  const chainLevels = [
    { level: 1, name: '씨앗', min: 0, max: 5, color: 'from-green-400 to-green-500' },
    { level: 2, name: '새싹', min: 6, max: 15, color: 'from-blue-400 to-blue-500' },
    { level: 3, name: '꽃', min: 16, max: 30, color: 'from-purple-400 to-purple-500' },
    { level: 4, name: '나무', min: 31, max: 50, color: 'from-orange-400 to-orange-500' },
    { level: 5, name: '숲', min: 51, max: 999, color: 'from-pink-400 to-pink-500' }
  ]

  const getChainLevel = (count: number) => {
    return chainLevels.find(level => count >= level.min && count <= level.max) || chainLevels[0]
  }

  return (
    <div className="max-w-4xl mx-auto animate-slide-up">
      {/* Chain Explanation */}
      <div className="glass-card p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Link2 className="text-accent" size={28} />
          <h2 className="text-2xl font-bold">칭찬 체인</h2>
        </div>
        
        <p className="text-white/80 mb-6">
          칭찬이 연결되어 만들어지는 긍정의 체인입니다. 
          더 많이 공유될수록 체인이 성장해요!
        </p>

        {/* Chain Levels */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          {chainLevels.map((level) => (
            <div
              key={level.level}
              className="text-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div className={`h-12 bg-gradient-to-br ${level.color} rounded-lg mb-2`} />
              <p className="font-semibold text-sm">{level.name}</p>
              <p className="text-xs text-white/60">{level.min}+</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Chains */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <TrendingUp className="text-secondary" size={24} />
            인기 체인
          </h3>
          <span className="text-sm text-white/60">실시간 업데이트</span>
        </div>

        <div className="space-y-4">
          {topChains.map((compliment, index) => {
            const level = getChainLevel(compliment.chainCount)
            return (
              <div
                key={compliment.id}
                className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-white/30">
                      #{index + 1}
                    </span>
                    <div>
                      <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${level.color} text-xs font-semibold mb-2`}>
                        {level.name} 레벨
                      </div>
                      <p className="text-sm text-white/90">{compliment.content}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1 text-sm text-white/60">
                    <Link2 size={14} />
                    <span>{compliment.chainCount} 체인</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-white/60">
                    <Users size={14} />
                    <span>{compliment.reactions} 반응</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-white/60">
                    <Zap size={14} />
                    <span className="text-soft">활발함</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${level.color} transition-all duration-500`}
                    style={{ width: `${Math.min((compliment.chainCount / level.max) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {topChains.length === 0 && (
          <div className="text-center py-8 text-white/50">
            <Link2 size={48} className="mx-auto mb-3 opacity-30" />
            <p>아직 체인이 없어요</p>
            <p className="text-sm">첫 칭찬을 시작해보세요!</p>
          </div>
        )}
      </div>
    </div>
  )
}