import React, { useState } from 'react'
import { ListChecks, Plus, X, Clock, CheckCircle } from 'lucide-react'
import { useMeetingStore } from '../store'

const AgendaManager: React.FC = () => {
  const {
    agendaItems,
    activeAgendaId,
    isRunning,
    addAgendaItem,
    removeAgendaItem,
    setActiveAgenda
  } = useMeetingStore()
  
  const [showAddForm, setShowAddForm] = useState(false)
  const [newAgendaTitle, setNewAgendaTitle] = useState('')
  const [newAgendaTime, setNewAgendaTime] = useState('10')

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const handleAddAgenda = (e: React.FormEvent) => {
    e.preventDefault()
    if (newAgendaTitle.trim() && parseInt(newAgendaTime) > 0) {
      addAgendaItem(newAgendaTitle.trim(), parseInt(newAgendaTime) * 60)
      setNewAgendaTitle('')
      setNewAgendaTime('10')
      setShowAddForm(false)
    }
  }

  return (
    <div className="glass-effect rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <ListChecks className="w-5 h-5" />
          회의 안건
        </h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddAgenda} className="mb-4 space-y-2">
          <input
            type="text"
            value={newAgendaTitle}
            onChange={(e) => setNewAgendaTitle(e.target.value)}
            placeholder="안건 제목"
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            autoFocus
          />
          <div className="flex gap-2">
            <input
              type="number"
              value={newAgendaTime}
              onChange={(e) => setNewAgendaTime(e.target.value)}
              placeholder="시간 (분)"
              min="1"
              max="60"
              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
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
                setNewAgendaTitle('')
                setNewAgendaTime('10')
              }}
              className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-white rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {agendaItems.map((item) => {
          const progress = item.allocatedTime > 0 ? (item.usedTime / item.allocatedTime) * 100 : 0
          const isOverTime = item.usedTime > item.allocatedTime
          
          return (
            <div
              key={item.id}
              className={`p-4 rounded-lg transition-all ${
                item.isActive ? 'bg-white/20 ring-2 ring-white/40' : 'bg-white/10'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {item.isActive ? (
                      <Clock className="w-4 h-4 text-blue-400 animate-pulse" />
                    ) : progress >= 100 ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-white/30" />
                    )}
                    <h4 className="text-white font-medium">{item.title}</h4>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isRunning && (
                    <button
                      onClick={() => setActiveAgenda(
                        item.isActive ? null : item.id
                      )}
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        item.isActive 
                          ? 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-200' 
                          : 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-200'
                      }`}
                    >
                      {item.isActive ? '진행중' : '시작'}
                    </button>
                  )}
                  {!isRunning && (
                    <button
                      onClick={() => removeAgendaItem(item.id)}
                      className="p-1.5 bg-red-500/20 hover:bg-red-500/30 rounded transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-white/70">
                  <span>{formatTime(item.usedTime)}</span>
                  <span>할당: {formatTime(item.allocatedTime)}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isOverTime ? 'bg-red-500' : progress > 75 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(100, progress)}%` }}
                  />
                </div>
                {isOverTime && (
                  <div className="text-xs text-red-400 mt-1">
                    초과: {formatTime(item.usedTime - item.allocatedTime)}
                  </div>
                )}
              </div>
            </div>
          )
        })}
        
        {agendaItems.length === 0 && (
          <div className="text-center text-white/50 py-8">
            회의 안건을 추가해주세요
          </div>
        )}
      </div>
    </div>
  )
}

export default AgendaManager