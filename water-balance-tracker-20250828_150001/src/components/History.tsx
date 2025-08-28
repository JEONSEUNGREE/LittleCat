import React from 'react'
import { Clock, Trash2, Droplet, Coffee, Leaf, Glass } from 'lucide-react'
import { useWaterStore } from '../store/useWaterStore'

const getIcon = (type: string) => {
  switch (type) {
    case 'coffee': return Coffee
    case 'tea': return Leaf
    case 'juice': return Glass
    default: return Droplet
  }
}

const getColor = (type: string) => {
  switch (type) {
    case 'coffee': return 'from-amber-600 to-amber-800'
    case 'tea': return 'from-green-500 to-green-700'
    case 'juice': return 'from-orange-400 to-orange-600'
    default: return 'from-blue-400 to-blue-600'
  }
}

const getLabel = (type: string) => {
  switch (type) {
    case 'coffee': return '커피'
    case 'tea': return '차'
    case 'juice': return '주스'
    case 'water': return '물'
    default: return '기타'
  }
}

export const History: React.FC = () => {
  const { getTodayEntries, removeEntry } = useWaterStore()
  const todayEntries = getTodayEntries()

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  if (todayEntries.length === 0) {
    return (
      <div className="min-h-screen p-4 pb-20">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">오늘의 기록</h2>
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Clock className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-500">아직 기록이 없어요</p>
          <p className="text-gray-400 text-sm mt-2">수분 섭취를 기록해보세요!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 pb-20">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">오늘의 기록</h2>
      
      <div className="max-w-md mx-auto space-y-3">
        {todayEntries.reverse().map((entry) => {
          const Icon = getIcon(entry.type)
          const color = getColor(entry.type)
          const label = getLabel(entry.type)
          
          return (
            <div 
              key={entry.id}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-4 hover:shadow-lg transition-shadow animate-drop"
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-800">{label}</span>
                  <span className="text-water-blue font-bold">{entry.amount}ml</span>
                </div>
                <div className="text-gray-500 text-sm flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatTime(entry.timestamp)}
                </div>
              </div>
              
              <button
                onClick={() => removeEntry(entry.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="max-w-md mx-auto mt-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4">
        <h3 className="font-semibold text-gray-800 mb-3">오늘의 요약</h3>
        <div className="space-y-2">
          {['water', 'coffee', 'tea', 'juice'].map(type => {
            const typeEntries = todayEntries.filter(e => e.type === type)
            if (typeEntries.length === 0) return null
            
            const total = typeEntries.reduce((sum, e) => sum + e.amount, 0)
            const Icon = getIcon(type)
            const color = getColor(type)
            const label = getLabel(type)
            
            return (
              <div key={type} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">{label}</span>
                </div>
                <span className="font-semibold text-gray-800">{total}ml</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}