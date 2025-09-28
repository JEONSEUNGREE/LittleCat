import { useState, useEffect } from 'react'
import { Send, Sparkles, AlertCircle } from 'lucide-react'
import useGameStore from '../store'

const StoryInput = () => {
  const { selectedEmojis, addSegment, clearSelectedEmojis, gameMode, currentStory } = useGameStore()
  const [storyText, setStoryText] = useState('')
  const [error, setError] = useState('')
  const [aiSuggestion, setAiSuggestion] = useState('')

  useEffect(() => {
    if (gameMode === 'collaborative' && currentStory.length > 0) {
      // Simple AI suggestion based on selected emojis
      const suggestions = {
        '😀': ['feeling happy', 'smiled brightly', 'joyful moment'],
        '🌟': ['magical star', 'shining brightly', 'wish upon a star'],
        '🐶': ['loyal dog', 'furry friend', 'wagging tail'],
        '🏠': ['cozy home', 'safe place', 'family gathering'],
        '🌈': ['after the rain', 'colorful sky', 'hope appeared'],
        '🎉': ['celebration time', 'party started', 'exciting event'],
        '💖': ['with love', 'heartfelt', 'deep affection'],
        '🚀': ['blast off', 'space adventure', 'journey begins'],
        '🌸': ['spring bloomed', 'beautiful flower', 'nature smiled'],
        '⚡': ['sudden flash', 'powerful energy', 'quick action']
      }
      
      const randomEmoji = selectedEmojis[Math.floor(Math.random() * selectedEmojis.length)]
      const emojiSuggestions = suggestions[randomEmoji as keyof typeof suggestions] || []
      if (emojiSuggestions.length > 0) {
        setAiSuggestion(`Try: "${emojiSuggestions[Math.floor(Math.random() * emojiSuggestions.length)]}"`)
      }
    }
  }, [selectedEmojis, gameMode, currentStory])

  const handleSubmit = () => {
    setError('')
    
    if (selectedEmojis.length === 0) {
      setError('Please select at least one emoji!')
      return
    }
    
    if (storyText.trim().length < 3) {
      setError('Story text must be at least 3 characters!')
      return
    }
    
    if (storyText.trim().length > 200) {
      setError('Story text must be less than 200 characters!')
      return
    }
    
    // Create story with selected emojis
    const emojiString = selectedEmojis.join('')
    addSegment(emojiString, storyText.trim())
    
    // Clear inputs
    setStoryText('')
    clearSelectedEmojis()
    setAiSuggestion('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-xl">
      <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
        <Sparkles className="w-5 h-5" />
        Create Your Story
      </h3>
      
      {selectedEmojis.length > 0 && (
        <div className="mb-3 p-3 bg-white/10 rounded-lg">
          <div className="text-white/80 text-sm mb-2">Your Story Emojis:</div>
          <div className="text-4xl">{selectedEmojis.join(' ')}</div>
        </div>
      )}
      
      {gameMode === 'collaborative' && aiSuggestion && (
        <div className="mb-3 p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
          <div className="text-blue-300 text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            AI Suggestion: {aiSuggestion}
          </div>
        </div>
      )}
      
      <textarea
        value={storyText}
        onChange={(e) => setStoryText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Write your story segment here..."
        maxLength={200}
        className="w-full h-32 px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/50 
                 border border-white/20 focus:border-white/40 focus:outline-none focus:ring-2 
                 focus:ring-white/20 transition-all resize-none"
      />
      
      <div className="flex items-center justify-between mt-2 mb-3">
        <span className="text-white/60 text-sm">
          {storyText.length}/200 characters
        </span>
        {error && (
          <span className="text-red-400 text-sm flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {error}
          </span>
        )}
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={selectedEmojis.length === 0 || storyText.trim().length < 3}
        className={`w-full py-3 px-4 font-bold text-white rounded-xl transition-all flex items-center justify-center gap-2 ${
          selectedEmojis.length === 0 || storyText.trim().length < 3
            ? 'bg-gray-600/50 cursor-not-allowed opacity-50'
            : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg transform hover:scale-[1.02]'
        }`}
      >
        <Send className="w-5 h-5" />
        Add to Story
      </button>
    </div>
  )
}

export default StoryInput