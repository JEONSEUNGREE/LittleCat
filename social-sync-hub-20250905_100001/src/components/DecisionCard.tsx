import React from 'react'
import { Clock, Users, CheckCircle, AlertCircle } from 'lucide-react'
import { Decision } from '../store/useSyncStore'

interface DecisionCardProps {
  decision: Decision
  onSelect: () => void
  isActive: boolean
}

const DecisionCard: React.FC<DecisionCardProps> = ({ decision, onSelect, isActive }) => {
  const totalVotes = decision.options.reduce((sum, opt) => sum + opt.votes, 0)
  const timeLeft = new Date(decision.expiresAt).getTime() - Date.now()
  const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60))
  const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))

  const getStatusIcon = () => {
    switch (decision.status) {
      case 'active':
        return <Clock className="w-4 h-4 text-sync-accent" />
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'expired':
        return <AlertCircle className="w-4 h-4 text-red-500" />
    }
  }

  const getLeadingOption = () => {
    if (decision.options.length === 0) return null
    return decision.options.reduce((max, opt) => 
      opt.votes > max.votes ? opt : max
    , decision.options[0])
  }

  const leadingOption = getLeadingOption()

  return (
    <div 
      onClick={onSelect}
      className={`
        bg-white rounded-xl p-4 mb-4 shadow-md cursor-pointer
        transition-all duration-300 hover:shadow-lg hover:scale-[1.02]
        ${isActive ? 'ring-2 ring-sync-primary' : ''}
      `}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-lg text-sync-dark flex-1 mr-2">
          {decision.title}
        </h3>
        <div className="flex items-center gap-1">
          {getStatusIcon()}
          <span className="text-xs text-gray-600">
            {decision.status === 'active' && timeLeft > 0 && 
              `${hoursLeft}시간 ${minutesLeft}분`
            }
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        {decision.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            {decision.participants.length}명 참여중
          </span>
        </div>

        {leadingOption && totalVotes > 0 && (
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: leadingOption.color }}
            />
            <span className="text-sm font-medium text-sync-dark">
              {leadingOption.text} ({Math.round((leadingOption.votes / totalVotes) * 100)}%)
            </span>
          </div>
        )}
      </div>

      <div className="mt-3 flex gap-1">
        {decision.options.map(option => (
          <div 
            key={option.id}
            className="h-2 transition-all duration-300"
            style={{ 
              width: totalVotes > 0 ? `${(option.votes / totalVotes) * 100}%` : `${100 / decision.options.length}%`,
              backgroundColor: option.color,
              opacity: totalVotes > 0 ? 1 : 0.3
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default DecisionCard