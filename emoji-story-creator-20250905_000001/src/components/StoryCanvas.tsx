import { useStoryStore } from '../store/storyStore'
import { X, Sparkles, RefreshCw } from 'lucide-react'

export default function StoryCanvas() {
  const { selectedEmojis, currentStory, removeEmoji, isGenerating, generateStory, setStoryText } = useStoryStore()

  return (
    <div className="space-y-6">
      {/* Emoji Display Area */}
      <div className="min-h-[120px] bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-200 to-pink-200 rounded-full filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '1.5s' }}></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-600">Your Emoji Story</h3>
            <span className="text-xs text-gray-500">{selectedEmojis.length}/10 emojis</span>
          </div>
          
          {selectedEmojis.length === 0 ? (
            <div className="flex items-center justify-center h-16">
              <p className="text-gray-400 text-center">
                <Sparkles className="inline-block w-5 h-5 mr-1" />
                Select emojis to start your story
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {selectedEmojis.map((emoji, index) => (
                <div
                  key={index}
                  className="group relative inline-block animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <span className="text-4xl sm:text-5xl hover:scale-110 transition-transform cursor-pointer">
                    {emoji}
                  </span>
                  <button
                    onClick={() => removeEmoji(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Story Text Area */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-600">Generated Story</h3>
          <button
            onClick={generateStory}
            disabled={selectedEmojis.length < 2 || isGenerating}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              selectedEmojis.length >= 2 && !isGenerating
                ? 'bg-primary text-white hover:bg-secondary'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'Generating...' : 'Generate Story'}
          </button>
        </div>
        
        <textarea
          value={currentStory.text}
          onChange={(e) => setStoryText(e.target.value)}
          placeholder="Your story will appear here... You can also type your own!"
          className="w-full h-32 p-4 bg-gray-50 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>
    </div>
  )
}