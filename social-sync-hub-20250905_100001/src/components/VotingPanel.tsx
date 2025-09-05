import { useState } from 'react'
import { ChevronLeft, Users, Clock, Share2, Heart } from 'lucide-react'
import { Decision, useSyncStore } from '../store/useSyncStore'

interface VotingPanelProps {
  decision: Decision
  onBack: () => void
}

const VotingPanel: React.FC<VotingPanelProps> = ({ decision, onBack }) => {
  const { currentUser, voteOnOption } = useSyncStore()
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showParticipants, setShowParticipants] = useState(false)

  const totalVotes = decision.options.reduce((sum, opt) => sum + opt.votes, 0)
  const userVote = decision.options.find(opt => 
    currentUser && opt.voters.includes(currentUser.id)
  )

  const handleVote = (optionId: string) => {
    if (!currentUser) return
    setSelectedOption(optionId)
    voteOnOption(decision.id, optionId)
  }

  const timeLeft = new Date(decision.expiresAt).getTime() - Date.now()
  const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60))
  const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))

  return (
    <div className="min-h-screen bg-gradient-to-br from-sync-light to-white">
      <div className="max-w-md mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-white/50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-sync-dark" />
          </button>
          <button className="p-2 rounded-lg hover:bg-white/50 transition-colors">
            <Share2 className="w-5 h-5 text-sync-dark" />
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
          <h2 className="text-2xl font-bold text-sync-dark mb-2">
            {decision.title}
          </h2>
          <p className="text-gray-600 mb-4">
            {decision.description}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{hoursLeft}시간 {minutesLeft}분 남음</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{decision.participants.length}명 참여</span>
            </div>
          </div>

          <div className="space-y-3">
            {decision.options.map(option => {
              const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0
              const isSelected = userVote?.id === option.id

              return (
                <button
                  key={option.id}
                  onClick={() => handleVote(option.id)}
                  className={`
                    w-full p-4 rounded-xl relative overflow-hidden
                    transition-all duration-300 text-left
                    ${isSelected 
                      ? 'ring-2 ring-sync-primary shadow-md' 
                      : 'hover:shadow-md border border-gray-200'
                    }
                  `}
                  style={{ backgroundColor: `${option.color}20` }}
                >
                  <div 
                    className="absolute inset-0 opacity-30 transition-all duration-500"
                    style={{
                      background: `linear-gradient(to right, ${option.color} ${percentage}%, transparent ${percentage}%)`,
                    }}
                  />
                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-sync-dark">
                        {option.text}
                      </span>
                      {isSelected && (
                        <Heart className="w-4 h-4 text-sync-secondary fill-sync-secondary" />
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      {option.votes}표 ({Math.round(percentage)}%)
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <button
          onClick={() => setShowParticipants(!showParticipants)}
          className="w-full bg-white rounded-2xl p-4 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sync-dark">참여자 보기</span>
            <Users className="w-5 h-5 text-gray-500" />
          </div>
        </button>

        {showParticipants && (
          <div className="bg-white rounded-2xl p-4 mt-4 shadow-lg animate-slide-up">
            <div className="grid grid-cols-4 gap-3">
              {decision.participants.map(participant => (
                <div key={participant.id} className="text-center">
                  <div 
                    className="w-12 h-12 rounded-full mx-auto mb-1 flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: participant.avatar }}
                  >
                    {participant.name[0].toUpperCase()}
                  </div>
                  <span className="text-xs text-gray-600">{participant.name}</span>
                  {participant.hasVoted && (
                    <div className="text-xs text-green-500">✓</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default VotingPanel