import React, { useState } from 'react'
import { History, X, Calendar, Hash } from 'lucide-react'
import { useFortuneStore } from '../store/useFortuneStore'

export const FortuneHistory: React.FC = () => {
  const { fortuneHistory, clearHistory } = useFortuneStore()
  const [isOpen, setIsOpen] = useState(false)
  
  if (fortuneHistory.length === 0) return null
  
  return (
    <>
      {/* History button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-3 bg-fortune-gold text-white rounded-full shadow-lg hover:bg-fortune-red transition-colors animate-glow"
      >
        <History size={24} />
      </button>
      
      {/* History modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-fortune-dark flex items-center gap-2">
                <History size={20} />
                Fortune History
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* History list */}
            <div className="overflow-y-auto max-h-[60vh] p-4">
              {fortuneHistory.map((fortune) => (
                <div key={fortune.id} className="mb-4 p-3 bg-paper rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-fortune-red">
                      {fortune.category.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(fortune.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <p className="text-sm text-fortune-dark italic mb-2">
                    "{fortune.message}"
                  </p>
                  
                  <div className="flex items-center gap-1">
                    <Hash size={12} className="text-fortune-gold" />
                    <div className="flex gap-1">
                      {fortune.luckyNumbers.map((num) => (
                        <span 
                          key={num} 
                          className="text-xs px-2 py-1 bg-fortune-gold text-white rounded"
                        >
                          {num}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => {
                  clearHistory()
                  setIsOpen(false)
                }}
                className="w-full py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition-colors"
              >
                Clear History
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}