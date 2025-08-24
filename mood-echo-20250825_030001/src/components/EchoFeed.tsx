import React from 'react'
import { Heart, MessageCircle, Users } from 'lucide-react'
import useMoodStore from '../store/useMoodStore'

const EchoFeed: React.FC = () => {
  const { echoFeed, incrementEcho, currentMood } = useMoodStore()

  const handleEcho = (echoId: string) => {
    incrementEcho(echoId)
  }

  const getTimeAgo = (timestamp: Date) => {
    const seconds = Math.floor((new Date().getTime() - timestamp.getTime()) / 1000)
    
    if (seconds < 60) return 'just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Mood Echoes
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Users size={16} />
          <span>{echoFeed.length} echoes nearby</span>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {echoFeed.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No echoes yet. Share your mood to connect!
          </p>
        ) : (
          echoFeed.map((echo) => (
            <div
              key={echo.id}
              className="p-4 rounded-xl border transition-all duration-300 hover:shadow-md"
              style={{
                borderColor: echo.mood.color + '40',
                backgroundColor: echo.mood.color + '05'
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div 
                    className="p-3 rounded-full"
                    style={{ backgroundColor: echo.mood.color + '20' }}
                  >
                    <span className="text-2xl">{echo.mood.emoji}</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Anonymous
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {getTimeAgo(echo.timestamp)}
                      </span>
                    </div>
                    
                    {echo.message && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {echo.message}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleEcho(echo.id)}
                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <Heart 
                          size={16} 
                          className={echo.echoes > 0 ? 'fill-current text-red-500' : ''}
                        />
                        <span>{echo.echoes}</span>
                      </button>
                      
                      <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-500 transition-colors">
                        <MessageCircle size={16} />
                        <span>Connect</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                {currentMood?.id === echo.mood.id && (
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                    Same mood
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default EchoFeed