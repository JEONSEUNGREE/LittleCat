import { useEffect, useRef } from 'react'
import useGameStore from '../store'
import { MessageSquare, RefreshCw } from 'lucide-react'

const StoryCanvas = () => {
  const { currentStory, resetStory, gameMode } = useGameStore()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [currentStory])

  const getPromptMessage = () => {
    if (currentStory.length === 0) {
      switch(gameMode) {
        case 'create':
          return "Start your story by selecting emojis and adding text!"
        case 'challenge':
          return "Complete the challenge: Create a story about an adventure!"
        case 'collaborative':
          return "Begin your collaborative story. AI will help you continue!"
        default:
          return "Begin your emoji story..."
      }
    }
    return null
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-xl h-[500px] flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-bold text-lg flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Story Canvas
        </h3>
        {currentStory.length > 0 && (
          <button
            onClick={resetStory}
            className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors group"
            title="Clear Story"
          >
            <RefreshCw className="w-4 h-4 text-red-300 group-hover:text-red-200" />
          </button>
        )}
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 bg-white/5 rounded-xl p-4 overflow-y-auto space-y-4"
      >
        {getPromptMessage() && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📖</div>
            <p className="text-white/60 text-lg">{getPromptMessage()}</p>
          </div>
        )}
        
        {currentStory.map((segment, index) => (
          <div 
            key={segment.id}
            className="animate-slide-up"
          >
            <div className="flex items-start gap-3">
              <div className="text-4xl min-w-[48px] text-center animate-bounce-slow">
                {segment.emoji}
              </div>
              <div className="flex-1">
                <div className="bg-white/10 rounded-xl p-3">
                  <p className="text-white leading-relaxed">{segment.text}</p>
                  <div className="flex items-center gap-2 mt-2 text-white/40 text-xs">
                    <span>{segment.author}</span>
                    <span>•</span>
                    <span>{new Date(segment.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {index < currentStory.length - 1 && (
              <div className="flex justify-center my-2">
                <div className="w-1 h-8 bg-gradient-to-b from-white/20 to-transparent"></div>
              </div>
            )}
          </div>
        ))}
        
        {currentStory.length > 0 && currentStory.length % 5 === 0 && (
          <div className="text-center py-4 animate-pulse">
            <p className="text-yellow-400 font-bold">🌟 Chapter Complete! Keep going! 🌟</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default StoryCanvas