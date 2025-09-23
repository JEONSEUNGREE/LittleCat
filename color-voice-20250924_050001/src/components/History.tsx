import React from 'react'
import { Clock, Trash2 } from 'lucide-react'
import useColorVoiceStore from '../store/useColorVoiceStore'

const History: React.FC = () => {
  const { history, clearHistory } = useColorVoiceStore()

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Clock className="w-6 h-6 text-green-600" />
          변환 기록
        </h2>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
            title="기록 삭제"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>아직 변환 기록이 없습니다</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {history.slice().reverse().map((item, index) => (
            <div
              key={`${item.timestamp}-${index}`}
              className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {item.type === 'color' ? (
                    <>
                      <div
                        className="w-8 h-8 rounded-full shadow-inner"
                        style={{ backgroundColor: (item.data as any).hex }}
                      />
                      <div>
                        <div className="font-medium text-gray-800">
                          {(item.data as any).hex}
                        </div>
                        <div className="text-sm text-gray-600">
                          {(item.data as any).frequency} Hz - {(item.data as any).note}{(item.data as any).octave}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                        <span className="text-white text-xs">♪</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">
                          {(item.data as any).frequency.toFixed(0)} Hz
                        </div>
                        <div className="text-sm text-gray-600">
                          {(item.data as any).note} - 
                          <span
                            className="inline-block w-3 h-3 rounded-full ml-2"
                            style={{ backgroundColor: (item.data as any).color }}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  {formatTime(item.timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default History