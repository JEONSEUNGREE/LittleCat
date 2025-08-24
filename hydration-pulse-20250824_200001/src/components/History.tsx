import React from 'react'
import { Clock, Coffee, Droplet, Leaf, Wine, Milk } from 'lucide-react'
import { useHydrationStore } from '../store/hydrationStore'

const History: React.FC = () => {
  const getTodayHistory = useHydrationStore((state) => state.getTodayHistory)
  const history = getTodayHistory()
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'water': return Droplet
      case 'coffee': return Coffee
      case 'tea': return Leaf
      case 'juice': return Wine
      default: return Milk
    }
  }
  
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'water': return '물'
      case 'coffee': return '커피'
      case 'tea': return '차'
      case 'juice': return '주스'
      default: return '기타'
    }
  }
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'water': return 'bg-blue-100 text-blue-600'
      case 'coffee': return 'bg-amber-100 text-amber-600'
      case 'tea': return 'bg-green-100 text-green-600'
      case 'juice': return 'bg-orange-100 text-orange-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="text-gray-600" size={20} />
        <h2 className="text-lg md:text-xl font-bold text-gray-800">오늘의 기록</h2>
      </div>
      
      {history.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          아직 기록이 없어요. 물을 마셔보세요! 💧
        </p>
      ) : (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {history.reverse().map((entry) => {
            const Icon = getIcon(entry.type)
            const time = new Date(entry.timestamp).toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit'
            })
            
            return (
              <div
                key={entry.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${getTypeColor(entry.type)}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {entry.amount}ml {getTypeLabel(entry.type)}
                    </p>
                    <p className="text-xs text-gray-500">{time}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default History