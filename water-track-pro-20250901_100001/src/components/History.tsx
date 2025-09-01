import { Clock, Trash2, Droplets, Coffee, Wine, Milk } from 'lucide-react'
import { useWaterStore } from '../store/waterStore'

const iconMap: { [key: string]: any } = {
  water: Droplets,
  coffee: Coffee,
  juice: Wine,
  milk: Milk,
}

export default function History() {
  const { records, removeRecord } = useWaterStore()
  
  const formatTime = (date: Date) => {
    const d = new Date(date)
    return d.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const getIcon = (type: string) => {
    const Icon = iconMap[type] || Droplets
    return Icon
  }

  const sortedRecords = [...records].sort((a, b) => 
    new Date(b.time).getTime() - new Date(a.time).getTime()
  )

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">오늘의 기록</h3>
      
      {sortedRecords.length === 0 ? (
        <div className="text-center py-8">
          <Droplets className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">아직 기록이 없어요</p>
          <p className="text-sm text-gray-400 mt-1">물을 마시고 기록해보세요!</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {sortedRecords.map((record) => {
            const Icon = getIcon(record.type)
            return (
              <div
                key={record.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg">
                    <Icon className="w-5 h-5 text-water-500" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{record.amount}ml</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTime(record.time)}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => removeRecord(record.id)}
                  className="p-2 hover:bg-red-100 rounded-lg transition-colors group"
                >
                  <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                </button>
              </div>
            )
          })}
        </div>
      )}
      
      {records.length > 0 && (
        <div className="mt-4 p-3 bg-water-50 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">총 {records.length}회 기록</span>
            <span className="text-lg font-bold text-water-600">
              {records.reduce((sum, r) => sum + r.amount, 0)}ml
            </span>
          </div>
        </div>
      )}
    </div>
  )
}