import { useState } from 'react'
import { Users, UserPlus, X, Mic, MicOff } from 'lucide-react'
import { useMeetingStore } from '../store'

const ParticipantTracker = () => {
  const {
    participants,
    isRunning,
    addParticipant,
    removeParticipant,
    setActiveParticipant
  } = useMeetingStore()
  
  const [newParticipantName, setNewParticipantName] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const handleAddParticipant = (e: React.FormEvent) => {
    e.preventDefault()
    if (newParticipantName.trim()) {
      addParticipant(newParticipantName.trim())
      setNewParticipantName('')
      setShowAddForm(false)
    }
  }

  const totalSpeakTime = participants.reduce((acc, p) => acc + p.speakTime, 0)

  return (
    <div className="glass-effect rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Users className="w-5 h-5" />
          참가자 ({participants.length}명)
        </h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
        >
          <UserPlus className="w-5 h-5" />
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddParticipant} className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newParticipantName}
              onChange={(e) => setNewParticipantName(e.target.value)}
              placeholder="참가자 이름"
              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              추가
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false)
                setNewParticipantName('')
              }}
              className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-white rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {participants.map((participant) => {
          const percentage = totalSpeakTime > 0 ? (participant.speakTime / totalSpeakTime) * 100 : 0
          
          return (
            <div
              key={participant.id}
              className={`p-3 rounded-lg transition-all ${
                participant.isActive ? 'bg-white/20 ring-2 ring-white/40' : 'bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: participant.color }}
                  />
                  <span className="text-white font-medium">{participant.name}</span>
                  {participant.isActive && (
                    <Mic className="w-4 h-4 text-green-400 animate-pulse" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white/70 text-sm">
                    {formatTime(participant.speakTime)}
                  </span>
                  {isRunning && (
                    <button
                      onClick={() => setActiveParticipant(
                        participant.isActive ? null : participant.id
                      )}
                      className={`p-1.5 rounded transition-colors ${
                        participant.isActive 
                          ? 'bg-red-500/20 hover:bg-red-500/30' 
                          : 'bg-green-500/20 hover:bg-green-500/30'
                      }`}
                    >
                      {participant.isActive ? (
                        <MicOff className="w-4 h-4 text-white" />
                      ) : (
                        <Mic className="w-4 h-4 text-white" />
                      )}
                    </button>
                  )}
                  {!isRunning && (
                    <button
                      onClick={() => removeParticipant(participant.id)}
                      className="p-1.5 bg-red-500/20 hover:bg-red-500/30 rounded transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: participant.color
                  }}
                />
              </div>
              <div className="mt-1 text-xs text-white/50 text-right">
                {percentage.toFixed(1)}%
              </div>
            </div>
          )
        })}
        
        {participants.length === 0 && (
          <div className="text-center text-white/50 py-8">
            참가자를 추가해주세요
          </div>
        )}
      </div>
    </div>
  )
}

export default ParticipantTracker