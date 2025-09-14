import React from 'react'
import { Check, X, Clock, Coins, Zap, Target, Scroll, BookOpen } from 'lucide-react'
import { Quest } from '../store/questStore'

interface QuestCardProps {
  quest: Quest
  onComplete: (questId: string) => void
  onDelete: (questId: string) => void
}

const QuestCard: React.FC<QuestCardProps> = ({ quest, onComplete, onDelete }) => {
  const getDifficultyColor = (difficulty: Quest['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500'
      case 'medium': return 'bg-yellow-500'
      case 'hard': return 'bg-orange-500'
      case 'epic': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  const getCategoryIcon = (category: Quest['category']) => {
    switch (category) {
      case 'daily': return <Clock className="w-4 h-4" />
      case 'main': return <Target className="w-4 h-4" />
      case 'side': return <Scroll className="w-4 h-4" />
      default: return <BookOpen className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: Quest['category']) => {
    switch (category) {
      case 'daily': return 'text-blue-400'
      case 'main': return 'text-red-400'
      case 'side': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className={`quest-card ${quest.completed ? 'opacity-60' : ''} transform transition-all hover:scale-[1.02]`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`${getCategoryColor(quest.category)} flex items-center gap-1 text-xs uppercase font-semibold`}>
              {getCategoryIcon(quest.category)}
              {quest.category}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${getDifficultyColor(quest.difficulty)}`}>
              {quest.difficulty}
            </span>
          </div>
          <h3 className={`text-white font-bold text-lg ${quest.completed ? 'line-through' : ''}`}>
            {quest.title}
          </h3>
          {quest.description && (
            <p className="text-gray-300 text-sm mt-1">{quest.description}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-3 text-sm">
          <span className="flex items-center gap-1 text-quest-gold">
            <Coins className="w-4 h-4" />
            {quest.goldReward}
          </span>
          <span className="flex items-center gap-1 text-quest-primary">
            <Zap className="w-4 h-4" />
            {quest.xpReward} XP
          </span>
        </div>

        <div className="flex gap-2">
          {!quest.completed && (
            <button
              onClick={() => onComplete(quest.id)}
              className="quest-button bg-quest-success hover:bg-green-600 text-white flex items-center gap-1"
              aria-label="Complete quest"
            >
              <Check className="w-4 h-4" />
              Complete
            </button>
          )}
          <button
            onClick={() => onDelete(quest.id)}
            className="quest-button bg-quest-danger/80 hover:bg-quest-danger text-white p-2"
            aria-label="Delete quest"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {quest.dueDate && (
        <div className="mt-2 pt-2 border-t border-white/10">
          <span className="text-xs text-gray-400">
            Due: {new Date(quest.dueDate).toLocaleDateString()}
          </span>
        </div>
      )}
    </div>
  )
}

export default QuestCard