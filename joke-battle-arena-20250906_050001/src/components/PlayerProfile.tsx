import { useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { User, Edit2, Save, Trophy, Target, Zap, Clock, BarChart, Smile } from 'lucide-react'

function PlayerProfile() {
  const { currentPlayer, setPlayer } = useGameStore()
  const [isEditing, setIsEditing] = useState(false)
  const [newName, setNewName] = useState(currentPlayer?.name || '')
  const [selectedAvatar, setSelectedAvatar] = useState(currentPlayer?.avatar || '😎')

  const avatarOptions = ['😎', '🤓', '🎯', '🎨', '🎭', '🎪', '🎤', '🎧', '🦄', '🐉', '👾', '🤖', '👽', '🎃', '🌟', '⚡']

  const stats = [
    { icon: Trophy, label: '총 승리', value: Math.floor((currentPlayer?.score || 0) / 100), color: 'text-yellow-400' },
    { icon: Target, label: '승률', value: '67%', color: 'text-green-400' },
    { icon: Zap, label: '연승', value: '5', color: 'text-orange-400' },
    { icon: Clock, label: '플레이 시간', value: '12h', color: 'text-blue-400' },
  ]

  const achievements = [
    { icon: '🏆', title: '첫 승리', desc: '첫 배틀에서 승리', unlocked: true },
    { icon: '🔥', title: '연승왕', desc: '5연승 달성', unlocked: true },
    { icon: '😂', title: '웃음 제조기', desc: '100명을 웃게 만들기', unlocked: false },
    { icon: '👑', title: '코미디 킹', desc: '랭킹 1위 달성', unlocked: false },
    { icon: '🌟', title: '인기스타', desc: '1000표 받기', unlocked: false },
    { icon: '🎭', title: '개그 마스터', desc: '모든 테마 우승', unlocked: false },
  ]

  const handleSaveProfile = () => {
    if (currentPlayer && newName.trim()) {
      setPlayer({
        ...currentPlayer,
        name: newName,
        avatar: selectedAvatar
      })
      setIsEditing(false)
    }
  }

  if (!currentPlayer) return null

  return (
    <div className="pb-20 animate-fadeIn">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-6 mb-6 border border-purple-400/30">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">내 프로필</h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-all"
            >
              <Edit2 size={20} />
            </button>
          ) : (
            <button
              onClick={handleSaveProfile}
              className="bg-gradient-to-r from-green-400 to-green-600 text-white p-2 rounded-lg hover:scale-105 transition-all"
            >
              <Save size={20} />
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white/70 mb-2">아바타 선택</label>
              <div className="grid grid-cols-8 gap-2">
                {avatarOptions.map((avatar) => (
                  <button
                    key={avatar}
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`text-3xl p-2 rounded-lg transition-all ${
                      selectedAvatar === avatar
                        ? 'bg-yellow-400/30 ring-2 ring-yellow-400'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-white/70 mb-2">닉네임</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full bg-black/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="새로운 닉네임 입력"
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <span className="text-6xl">{currentPlayer.avatar}</span>
            <div>
              <h3 className="text-2xl font-bold">{currentPlayer.name}</h3>
              <p className="text-yellow-400 font-bold text-xl">{currentPlayer.score} 포인트</p>
              <p className="text-white/70 text-sm">랭킹 #256</p>
            </div>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon className={stat.color} size={20} />
                <span className="text-sm text-white/70">{stat.label}</span>
              </div>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Battle History */}
      <div className="bg-white/10 rounded-2xl p-4 mb-6">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
          <BarChart size={20} />
          최근 배틀 기록
        </h3>
        <div className="space-y-2">
          {[
            { opponent: '웃음폭탄', result: 'WIN', score: '5-3', time: '5분 전' },
            { opponent: '개그맨', result: 'LOSE', score: '2-4', time: '1시간 전' },
            { opponent: '코미디킹', result: 'WIN', score: '6-2', time: '3시간 전' },
          ].map((battle, index) => (
            <div key={index} className="bg-black/20 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚔️</span>
                <div>
                  <p className="font-medium">vs {battle.opponent}</p>
                  <p className="text-xs text-white/50">{battle.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${battle.result === 'WIN' ? 'text-green-400' : 'text-red-400'}`}>
                  {battle.result}
                </p>
                <p className="text-sm text-white/70">{battle.score}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white/10 rounded-2xl p-4">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
          <Smile size={20} />
          업적
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`bg-black/20 rounded-lg p-3 ${
                achievement.unlocked ? '' : 'opacity-50 grayscale'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{achievement.icon}</span>
                {achievement.unlocked && (
                  <span className="text-xs bg-green-400/20 text-green-400 px-2 py-0.5 rounded-full">
                    달성
                  </span>
                )}
              </div>
              <p className="font-medium text-sm">{achievement.title}</p>
              <p className="text-xs text-white/50">{achievement.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PlayerProfile