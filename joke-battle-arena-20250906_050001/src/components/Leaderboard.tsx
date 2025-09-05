import { useEffect } from 'react'
import { useGameStore } from '../store/gameStore'
import { Trophy, Medal, Award, TrendingUp, Star } from 'lucide-react'

function Leaderboard() {
  const { leaderboard, loadLeaderboard, isLoading, currentPlayer } = useGameStore()

  useEffect(() => {
    loadLeaderboard()
  }, [loadLeaderboard])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="text-yellow-400" size={24} />
      case 2:
        return <Medal className="text-gray-300" size={24} />
      case 3:
        return <Award className="text-orange-600" size={24} />
      default:
        return <span className="text-xl font-bold text-white/50">#{rank}</span>
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-500/20 to-yellow-400/20 border-yellow-400/30'
      case 2:
        return 'from-gray-400/20 to-gray-300/20 border-gray-300/30'
      case 3:
        return 'from-orange-600/20 to-orange-500/20 border-orange-500/30'
      default:
        return 'from-white/10 to-white/5 border-white/10'
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Trophy className="text-yellow-400 mx-auto mb-4 animate-pulse" size={60} />
          <p className="text-xl">랭킹 로딩중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-20 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          명예의 전당
        </h2>
        <p className="text-white/70">최고의 코미디언들을 만나보세요</p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-2 mb-8">
        {[1, 0, 2].map((index) => {
          const player = leaderboard[index]
          if (!player) return null
          const rank = index === 1 ? 1 : index === 0 ? 2 : 3
          
          return (
            <div
              key={player.id}
              className={`bg-gradient-to-br ${getRankColor(rank)} rounded-2xl p-4 text-center transform transition-all hover:scale-105 ${
                rank === 1 ? 'order-2 -mt-4' : rank === 2 ? 'order-1' : 'order-3'
              }`}
            >
              <div className="mb-2">{getRankIcon(rank)}</div>
              <span className="text-4xl mb-2 block">{player.avatar}</span>
              <p className="font-bold text-sm mb-1">{player.name}</p>
              <p className="text-2xl font-bold text-yellow-400">{player.score}</p>
              <p className="text-xs text-white/70">포인트</p>
            </div>
          )
        })}
      </div>

      {/* Leaderboard List */}
      <div className="space-y-3">
        {leaderboard.slice(3).map((player, index) => {
          const rank = index + 4
          const isCurrentPlayer = player.id === currentPlayer?.id
          
          return (
            <div
              key={player.id}
              className={`bg-gradient-to-r ${getRankColor(rank)} rounded-xl p-4 flex items-center gap-4 backdrop-blur-sm border ${
                isCurrentPlayer ? 'ring-2 ring-yellow-400' : ''
              }`}
            >
              <div className="w-10 text-center">{getRankIcon(rank)}</div>
              <span className="text-3xl">{player.avatar}</span>
              <div className="flex-1">
                <p className="font-bold flex items-center gap-2">
                  {player.name}
                  {isCurrentPlayer && <span className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-0.5 rounded-full">YOU</span>}
                </p>
                <div className="flex items-center gap-4 text-sm text-white/70">
                  <span className="flex items-center gap-1">
                    <Star size={14} />
                    {Math.floor(player.score / 100)} 승
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingUp size={14} />
                    연승 {Math.floor(Math.random() * 10)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-yellow-400">{player.score}</p>
                <p className="text-xs text-white/70">포인트</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Your Rank (if not in top 10) */}
      {currentPlayer && !leaderboard.find(p => p.id === currentPlayer.id) && (
        <div className="mt-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-4 border border-purple-400/30">
          <p className="text-center text-white/70 mb-2">내 순위</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-white/50">#256</span>
              <span className="text-3xl">{currentPlayer.avatar}</span>
              <p className="font-bold">{currentPlayer.name}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-yellow-400">{currentPlayer.score}</p>
              <p className="text-xs text-white/70">포인트</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Leaderboard