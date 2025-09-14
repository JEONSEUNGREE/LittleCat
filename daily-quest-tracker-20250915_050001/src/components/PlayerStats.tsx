import React from 'react'
import { Trophy, Coins, Zap, Flame, Shield, Star } from 'lucide-react'
import { useQuestStore } from '../store/questStore'

const PlayerStats: React.FC = () => {
  const playerStats = useQuestStore((state) => state.playerStats)
  
  const xpPercentage = (playerStats.currentXP / playerStats.xpToNextLevel) * 100

  return (
    <div className="quest-card bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-white/20">
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
        <div className="w-20 h-20 bg-gradient-to-br from-quest-gold to-quest-warning rounded-full flex items-center justify-center shadow-lg">
          <Shield className="w-10 h-10 text-white" />
        </div>
        
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-bold text-white mb-1">{playerStats.title}</h2>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="level-badge bg-quest-primary text-white">
              Level {playerStats.level}
            </span>
            <span className="text-quest-light text-sm">
              {playerStats.questsCompleted} Quests Completed
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-white text-sm mb-1">
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4" />
              Experience
            </span>
            <span>{playerStats.currentXP} / {playerStats.xpToNextLevel} XP</span>
          </div>
          <div className="xp-bar">
            <div 
              className="xp-fill"
              style={{ width: `${xpPercentage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          <div className="flex items-center gap-2 text-white">
            <Coins className="w-5 h-5 text-quest-gold" />
            <div>
              <div className="text-xs opacity-75">Gold</div>
              <div className="font-bold">{playerStats.totalGold}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-white">
            <Flame className="w-5 h-5 text-orange-500" />
            <div>
              <div className="text-xs opacity-75">Streak</div>
              <div className="font-bold">{playerStats.streak} days</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-white">
            <Trophy className="w-5 h-5 text-quest-success" />
            <div>
              <div className="text-xs opacity-75">Completed</div>
              <div className="font-bold">{playerStats.questsCompleted}</div>
            </div>
          </div>
        </div>

        {playerStats.achievements.length > 0 && (
          <div className="pt-3 border-t border-white/10">
            <h3 className="text-white text-sm font-semibold mb-2 flex items-center gap-1">
              <Star className="w-4 h-4" />
              Achievements
            </h3>
            <div className="flex flex-wrap gap-2">
              {playerStats.achievements.map((achievement, index) => (
                <span key={index} className="text-xs bg-white/10 text-white px-2 py-1 rounded">
                  {achievement}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}